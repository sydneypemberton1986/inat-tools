// A single typed facade over every iNaturalist API endpoint this repo touches.
//
// The same handful of calls are hand-rolled across the codebase — the Python
// downloader (inat_download.py), the seasonal panel baked into render_tree.py,
// and the browser viewers (rarest.html, range_viewer.html, grid_viewer.html).
// This module is the one place that knows the base URLs, the response shapes,
// the 30-id taxa batching cap, and the polite retry/backoff. It has no
// dependencies and runs in a browser or in Node 18+ (both provide `fetch`).
//
// Call-site map (what each method replaces):
//   getObservations / iterateObservations  — inat_download._fetch_observations,
//                                             rarest.fetchObservations
//   observationBounds                       — range_viewer.fitToTaxon
//   speciesCounts / iterateSpeciesCounts    — rarest.fetchTaxa
//   speciesCountsTotal                      — render_tree.countAt
//   getTaxon                                — range_viewer.fetchTaxon
//   getTaxa                                 — inat_download._resolve_taxa
//   autocompleteTaxa                        — range_viewer.resolveTaxonId,
//                                             range_viewer.fetchSuggestions
//   gridTileUrl / taxonRangeTileUrl         — grid_viewer, range_viewer tile layers
//   observationUrl / taxonUrl               — the www.inaturalist.org deep links

// ---------------------------------------------------------------------------
// Response shapes (only the fields the callers actually read).
// ---------------------------------------------------------------------------

export interface Photo {
  // 75px square thumbnail; `url` is the observation photo, `square_url` the taxon default.
  url?: string;
  square_url?: string;
}

export interface Taxon {
  id: number;
  name?: string;
  rank?: string;
  preferred_common_name?: string;
  // Root-to-parent id chain, "/"-joined, self excluded (observations endpoint only).
  ancestry?: string;
  // Global count used to rank rarity.
  observations_count?: number;
  default_photo?: Photo;
  // Place-relative flag iNat computes for the queried place; a taxon fact per observation.
  introduced?: boolean;
}

export interface User {
  id?: number;
  login?: string;
  name?: string;
}

export interface Observation {
  id: number;
  taxon?: Taxon;
  observed_on?: string | null;
  place_guess?: string | null;
  photos?: Photo[];
  quality_grade?: 'research' | 'needs_id' | 'casual';
  // Wild-or-not flag; absent reads as wild.
  captive?: boolean;
  user?: User;
}

export interface SpeciesCount {
  count: number;
  taxon: Taxon;
}

export interface Bounds {
  swlat: number;
  swlng: number;
  nelat: number;
  nelng: number;
}

// Every list endpoint returns this envelope; `total_bounds` only when return_bounds=true.
export interface Paginated<T> {
  total_results: number;
  page: number;
  per_page: number;
  results: T[];
  total_bounds?: Bounds | null;
}

// ---------------------------------------------------------------------------
// Request params (a typed superset of the query strings the callers build).
// ---------------------------------------------------------------------------

export interface ObservationsParams {
  user_id?: string;
  user_login?: string;
  // A single id or a list; joined with commas on the wire.
  taxon_id?: number | number[];
  without_taxon_id?: number | number[];
  order_by?: 'observed_on' | 'created_at' | 'id';
  order?: 'asc' | 'desc';
  quality_grade?: 'research' | 'needs_id' | 'casual';
  captive?: boolean;
  // ISO timestamp; only observations changed since are returned (incremental sync).
  updated_since?: string;
  return_bounds?: boolean;
  per_page?: number;
  page?: number;
  [key: string]: string | number | boolean | number[] | undefined;
}

export interface SpeciesCountsParams {
  user_login?: string;
  lat?: number;
  lng?: number;
  radius?: number; // km
  iconic_taxa?: string;
  taxon_id?: number | number[];
  rank?: string;
  month?: number;
  per_page?: number;
  page?: number;
  [key: string]: string | number | boolean | number[] | undefined;
}

export interface InatApiOptions {
  baseUrl?: string;
  tilesBaseUrl?: string;
  webBaseUrl?: string;
  userAgent?: string;
  // Polite pause after each successful request. The bulk downloader sets 700ms;
  // interactive viewers leave it at 0.
  rateLimitMs?: number;
  maxRetries?: number;
  // Injectable for tests / non-global-fetch environments.
  fetch?: typeof fetch;
}

const DEFAULTS = {
  baseUrl: 'https://api.inaturalist.org/v1',
  tilesBaseUrl: 'https://tiles.inaturalist.org/v1',
  webBaseUrl: 'https://www.inaturalist.org',
  userAgent: 'inat-viewer',
  rateLimitMs: 0,
  maxRetries: 4,
};

// iNaturalist caps a multi-taxon lookup (/taxa/id1,id2,...) at 30 ids per request.
const TAXA_LOOKUP_BATCH = 30;
// The observations endpoint stops paging past a 10,000-record offset.
const MAX_OBSERVATION_OFFSET = 10_000;

const sleep = (ms: number): Promise<void> =>
  ms > 0 ? new Promise((resolve) => setTimeout(resolve, ms)) : Promise.resolve();

export class InatApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
    readonly url?: string,
  ) {
    super(message);
    this.name = 'InatApiError';
  }
}

export class InatApi {
  private readonly baseUrl: string;
  private readonly tilesBaseUrl: string;
  private readonly webBaseUrl: string;
  private readonly userAgent: string;
  private readonly rateLimitMs: number;
  private readonly maxRetries: number;
  private readonly fetchImpl: typeof fetch;

  constructor(options: InatApiOptions = {}) {
    this.baseUrl = options.baseUrl ?? DEFAULTS.baseUrl;
    this.tilesBaseUrl = options.tilesBaseUrl ?? DEFAULTS.tilesBaseUrl;
    this.webBaseUrl = options.webBaseUrl ?? DEFAULTS.webBaseUrl;
    this.userAgent = options.userAgent ?? DEFAULTS.userAgent;
    this.rateLimitMs = options.rateLimitMs ?? DEFAULTS.rateLimitMs;
    this.maxRetries = options.maxRetries ?? DEFAULTS.maxRetries;
    const f = options.fetch ?? (globalThis.fetch as typeof fetch | undefined);
    if (!f) throw new Error('No fetch available; pass options.fetch');
    this.fetchImpl = f;
  }

  // -------------------------------------------------------------------------
  // Observations
  // -------------------------------------------------------------------------

  /** One page of observations. */
  getObservations(params: ObservationsParams): Promise<Paginated<Observation>> {
    return this.get<Paginated<Observation>>('observations', params);
  }

  /**
   * Walk every observation page for a query, newest first. Stops at the last
   * page or the API's 10,000-record offset ceiling, whichever comes first.
   */
  async *iterateObservations(
    params: ObservationsParams,
  ): AsyncGenerator<Observation, void, void> {
    const perPage = params.per_page ?? 200;
    let page = params.page ?? 1;
    while (true) {
      const data = await this.getObservations({ ...params, per_page: perPage, page });
      if (!data.results.length) return;
      yield* data.results;
      if (page * perPage >= data.total_results) return;
      if (page * perPage >= MAX_OBSERVATION_OFFSET) return;
      page += 1;
    }
  }

  /** Collect all observations for a query into one array. */
  async getAllObservations(params: ObservationsParams): Promise<Observation[]> {
    const all: Observation[] = [];
    for await (const obs of this.iterateObservations(params)) all.push(obs);
    return all;
  }

  /**
   * The geographic bounds of a taxon's observations, or null if none. Asks for
   * the count only (per_page=0) plus the bounds envelope — no records fetched.
   */
  async observationBounds(taxonId: number): Promise<Bounds | null> {
    const data = await this.getObservations({
      taxon_id: taxonId,
      per_page: 0,
      return_bounds: true,
    });
    const b = data.total_bounds;
    return b && b.swlat != null ? b : null;
  }

  // -------------------------------------------------------------------------
  // Species counts (per-taxon tallies for a user or a place/season)
  // -------------------------------------------------------------------------

  /** One page of species_counts. */
  speciesCounts(params: SpeciesCountsParams): Promise<Paginated<SpeciesCount>> {
    return this.get<Paginated<SpeciesCount>>('observations/species_counts', params);
  }

  /** Walk every species_counts page for a query. */
  async *iterateSpeciesCounts(
    params: SpeciesCountsParams,
  ): AsyncGenerator<SpeciesCount, void, void> {
    const perPage = params.per_page ?? 500;
    let page = params.page ?? 1;
    let seen = 0;
    let total = Infinity;
    while (seen < total) {
      const data = await this.speciesCounts({ ...params, per_page: perPage, page });
      total = data.total_results;
      if (!data.results.length) return;
      yield* data.results;
      seen += data.results.length;
      page += 1;
    }
  }

  /** Collect all species_counts rows for a query into one array. */
  async getAllSpeciesCounts(params: SpeciesCountsParams): Promise<SpeciesCount[]> {
    const all: SpeciesCount[] = [];
    for await (const row of this.iterateSpeciesCounts(params)) all.push(row);
    return all;
  }

  /** How many species match a query — the count only (per_page=0). */
  async speciesCountsTotal(params: SpeciesCountsParams): Promise<number> {
    const data = await this.speciesCounts({ ...params, per_page: 0 });
    return data.total_results ?? 0;
  }

  // -------------------------------------------------------------------------
  // Taxa
  // -------------------------------------------------------------------------

  /** Full detail for one taxon, or null if the id is unknown. */
  async getTaxon(id: number): Promise<Taxon | null> {
    const data = await this.get<Paginated<Taxon>>(`taxa/${id}`);
    return data.results?.[0] ?? null;
  }

  /**
   * Detail for many taxa in as few calls as possible. Ids are de-duplicated,
   * sorted, and split into 30-id chunks (the endpoint's cap). Returned in the
   * API's order; ids the API doesn't know are simply absent.
   */
  async getTaxa(ids: Iterable<number>): Promise<Taxon[]> {
    const unique = [...new Set(ids)].sort((a, b) => a - b);
    const resolved: Taxon[] = [];
    for (let start = 0; start < unique.length; start += TAXA_LOOKUP_BATCH) {
      const chunk = unique.slice(start, start + TAXA_LOOKUP_BATCH);
      const data = await this.get<Paginated<Taxon>>(`taxa/${chunk.join(',')}`);
      resolved.push(...(data.results ?? []));
    }
    return resolved;
  }

  /** Name-search suggestions for a typeahead. */
  async autocompleteTaxa(query: string, perPage = 8): Promise<Taxon[]> {
    const data = await this.get<Paginated<Taxon>>('taxa/autocomplete', {
      q: query,
      per_page: perPage,
    });
    return data.results ?? [];
  }

  // -------------------------------------------------------------------------
  // Tile-layer URL templates (for Leaflet et al.). These return {z}/{x}/{y}
  // templates, not fetched data — the map library fills in the coordinates.
  // -------------------------------------------------------------------------

  /**
   * UTFGrid-style observation density tiles from the API. Filter by user,
   * taxon, or an excluded taxon (the "everything but" remainder layer).
   */
  gridTileUrl(
    filter: {
      userLogin?: string;
      taxonId?: number;
      withoutTaxonId?: number;
      color?: string;
    } = {},
  ): string {
    const query: string[] = [];
    if (filter.userLogin) query.push(`user_login=${encodeURIComponent(filter.userLogin)}`);
    if (filter.taxonId != null) query.push(`taxon_id=${filter.taxonId}`);
    if (filter.withoutTaxonId != null) query.push(`without_taxon_id=${filter.withoutTaxonId}`);
    if (filter.color) query.push(`color=${encodeURIComponent(filter.color)}`);
    const suffix = query.length ? `?${query.join('&')}` : '';
    return `${this.baseUrl}/grid/{z}/{x}/{y}.png${suffix}`;
  }

  /**
   * Official taxon-range polygon tiles (tiles.inaturalist.org). These only
   * exist for taxa iNat has range data for; fall back to gridTileUrl otherwise.
   */
  taxonRangeTileUrl(id: number, color = 'red'): string {
    return `${this.tilesBaseUrl}/taxon_ranges/${id}/{z}/{x}/{y}.png?color=${encodeURIComponent(color)}`;
  }

  // -------------------------------------------------------------------------
  // www.inaturalist.org deep links (human-facing pages, not the API).
  // -------------------------------------------------------------------------

  observationUrl(id: number): string {
    return `${this.webBaseUrl}/observations/${id}`;
  }

  taxonUrl(id: number): string {
    return `${this.webBaseUrl}/taxa/${id}`;
  }

  // -------------------------------------------------------------------------
  // Transport: build the URL, retry on 429/5xx and network blips with the same
  // backoff as the Python client, and pause politely between successful calls.
  // -------------------------------------------------------------------------

  private async get<T>(
    path: string,
    params: Record<string, string | number | boolean | number[] | undefined> = {},
  ): Promise<T> {
    const url = `${this.baseUrl}/${path}${buildQuery(params)}`;
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      let reason: string;
      try {
        const response = await this.fetchImpl(url, {
          headers: { 'User-Agent': this.userAgent, Accept: 'application/json' },
        });
        // 4xx (other than rate-limit) are permanent; surface them immediately.
        if (response.status < 500 && response.status !== 429) {
          if (!response.ok) {
            throw new InatApiError(`iNat API returned ${response.status}`, response.status, url);
          }
          await sleep(this.rateLimitMs);
          return (await response.json()) as T;
        }
        reason = `HTTP ${response.status}`;
        if (attempt === this.maxRetries) {
          throw new InatApiError(`iNat API returned ${response.status}`, response.status, url);
        }
      } catch (err) {
        if (err instanceof InatApiError) throw err;
        reason = (err as Error).name || 'network error';
        if (attempt === this.maxRetries) throw err;
      }
      const backoff = (this.rateLimitMs || 700) * 2 ** attempt;
      // eslint-disable-next-line no-console
      console.warn(`  request failed (${reason}); retrying in ${(backoff / 1000).toFixed(1)}s...`);
      await sleep(backoff);
    }
    throw new Error('unreachable'); // loop either returns or throws
  }
}

// ---------------------------------------------------------------------------
// Small helpers usable without a client instance.
// ---------------------------------------------------------------------------

/**
 * Reduce free-form input — a bare id, a name, or any iNat taxa URL / #anchor —
 * to something resolvable. Returns { id } when an id is present, else { query }.
 */
export function parseTaxonInput(raw: string): { id: number } | { query: string } | null {
  const text = raw.trim();
  if (!text) return null;
  const urlMatch = text.match(/taxa\/(\d+)/);
  if (urlMatch) return { id: parseInt(urlMatch[1], 10) };
  if (/^\d+$/.test(text)) return { id: parseInt(text, 10) };
  return { query: text };
}

/** Root-to-leaf ancestor ids from a taxon's "/"-joined `ancestry` string. */
export function ancestorIds(taxon: Pick<Taxon, 'ancestry'>): number[] {
  return (taxon.ancestry ?? '').split('/').filter(Boolean).map((a) => parseInt(a, 10));
}

function buildQuery(
  params: Record<string, string | number | boolean | number[] | undefined>,
): string {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(params)) {
    if (value == null) continue;
    const encoded = Array.isArray(value)
      ? value.join(',') // taxon_id lists go over the wire comma-joined
      : String(value);
    parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(encoded)}`);
  }
  return parts.length ? `?${parts.join('&')}` : '';
}
