import {createApi} from './api/client.ts';
import {fetchAllPages} from './api/fetchAllPages.ts';
import type {Observation} from './api/inaturalist';

declare global {
  interface ImportMeta {
    /** True when this module is the process entry point (set by Node/tsx). */
    readonly main: boolean;
  }
}

/** Minimal Node ambient: this vite project omits @types/node, but the CLI
 *  entry point at the bottom runs under tsx and needs argv. */
declare const process: {argv: readonly string[]};

// v2 wants ONE comma-separated field spec; an array becomes repeated `fields=`
// params and the server drops all but one of them.
const TRIP_FIELDS = [
  'id',
  'uri',
  'quality_grade',
  'place_guess',
  'observed_on',
  'time_observed_at',
  'location',
  'geoprivacy',
  'taxon_geoprivacy',
  'photos.url',
  'taxon.id',
  'taxon.name',
  'taxon.preferred_common_name',
  'taxon.rank_level',
  'taxon.iconic_taxon_name',
  'taxon.observations_count',
].join(',');

/** Species or finer (species, subspecies, variety...) sit at rank_level <= 10.
 *  Coarser IDs like "Fungi" would otherwise masquerade as lifers. */
const SPECIES_RANK_LEVEL = 10;

/**
 * Fetch all observations for `userLogin` on `observedOn` (YYYY-MM-DD),
 * determine which taxa were observed for the very first time on that date,
 * and return a summary plus the observations sorted rarest-first.
 *
 * `onProgress` is called at each step of the (rate-limited, multi-request)
 * pipeline so the browser can show a progress indicator; the CLI ignores it.
 */
export async function main(
  userLogin: string,
  observedOn: string,
  onProgress: (message: string) => void = () => {},
) {
  const api = createApi();

  onProgress('Fetching observations…');
  const observations = await fetchAllPages(api.observations.observationsList, {
    user_login: [userLogin],
    observed_on: observedOn,
    // Ascending id => earlier pages stay immutable and cacheable; we re-sort
    // by rarity below so the output order is unaffected.
    order_by: 'id',
    order: 'asc',
    fields: TRIP_FIELDS,
    per_page: 200,
  });

  // Collect unique species/subspecies taxon IDs to check whether the user had
  // ever observed them before `observedOn`.
  const taxonIds = [
    ...new Set(
      observations
        .filter(o => (o.taxon?.rank_level ?? 100) <= SPECIES_RANK_LEVEL)
        .map(o => o.taxon?.id)
        .filter((id): id is number => id != null),
    ),
  ];

  const previouslySeenTaxonIds = new Set<number>();
  if (taxonIds.length > 0) {
    onProgress(`Found ${observations.length} observations · checking ${taxonIds.length} taxa for lifers…`);
    const priorCounts = await fetchAllPages(api.observations.speciesCountsList, {
      user_login: [userLogin],
      taxon_id: taxonIds,
      // Everything up to (and including) the day before the trip. A taxon
      // absent here, or present with count 0, is new on `observedOn`.
      d2: _dayBefore(observedOn),
      fields: 'taxon.id,count',
      per_page: 500,
      ttl: 86400,
    });
    for (const row of priorCounts) {
      if (row.taxon?.id != null && (row.count ?? 0) > 0) {
        previouslySeenTaxonIds.add(row.taxon.id);
      }
    }
  }

  // Walk chronologically so if a lifer is photographed twice on the same day,
  // the earliest sighting gets the "First time!" mark.
  const chronological = [...observations].sort(
    (a, b) =>
      (a.time_observed_at ?? '').localeCompare(b.time_observed_at ?? '') ||
      (a.id ?? 0) - (b.id ?? 0),
  );

  const firstObsIds = new Set<number>();
  const seenTodayTaxonIds = new Set<number>();
  for (const o of chronological) {
    const taxonId = o.taxon?.id;
    const isSpeciesOrFiner = (o.taxon?.rank_level ?? 100) <= SPECIES_RANK_LEVEL;
    if (
      o.id != null &&
      taxonId != null &&
      isSpeciesOrFiner &&
      !previouslySeenTaxonIds.has(taxonId) &&
      !seenTodayTaxonIds.has(taxonId)
    ) {
      seenTodayTaxonIds.add(taxonId);
      firstObsIds.add(o.id);
    }
  }

  onProgress('Building report…');

  // Sort rarest-first by global taxon.observations_count (unidentified last).
  const sorted = [...observations].sort(
    (a, b) =>
      (a.taxon?.observations_count ?? Infinity) - (b.taxon?.observations_count ?? Infinity),
  );

  const rows = sorted.map((o: Observation) => ({
    ...o,
    observations_count: o.taxon?.observations_count ?? null,
    is_first: o.id != null && firstObsIds.has(o.id),
    coords: _parseCoords(o.location),
    thumbnail_url: _thumbnailUrl(o.photos?.[0]?.url),
  }));

  return {
    summary: {
      total_observations: rows.length,
      unique_taxa: new Set(rows.map(r => r.taxon?.id).filter(id => id != null)).size,
      first_time_count: firstObsIds.size,
      research_grade_count: rows.filter(r => r.quality_grade === 'research').length,
    },
    rows,
  };
}

/** Which days in a month had observations, and which had a first-ever (lifer) sighting. */
export interface MonthActivity {
  /** 'YYYY-MM-DD' for every day the user observed anything. */
  observed: Set<string>;
  /** 'YYYY-MM-DD' for every day a taxon was seen for the very first time. */
  lifers: Set<string>;
}

/**
 * Summarize a calendar month for `userLogin` so the date picker can colour each
 * day: which days have observations, and which carry a lifer. Uses the same
 * prior-counts trick as `main` — taxa not seen before the month, taken in
 * chronological order, have their first in-month day marked as the lifer day.
 *
 * @param year  full year, e.g. 2026
 * @param month 1-12
 */
export async function monthActivity(userLogin: string, year: number, month: number): Promise<MonthActivity> {
  const api = createApi();
  const first = `${year}-${_pad(month)}-01`;
  const lastDom = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const last = `${year}-${_pad(month)}-${_pad(lastDom)}`;

  const observations = await fetchAllPages(api.observations.observationsList, {
    user_login: [userLogin],
    d1: first,
    d2: last,
    order_by: 'id',
    order: 'asc',
    fields: 'id,observed_on,time_observed_at,taxon.id,taxon.rank_level',
    per_page: 200,
    ttl: 86400,
  });

  const observed = new Set<string>();
  for (const o of observations) {
    if (o.observed_on) observed.add(o.observed_on);
  }

  const taxonIds = [
    ...new Set(
      observations
        .filter(o => (o.taxon?.rank_level ?? 100) <= SPECIES_RANK_LEVEL)
        .map(o => o.taxon?.id)
        .filter((id): id is number => id != null),
    ),
  ];

  const previouslySeenTaxonIds = new Set<number>();
  if (taxonIds.length > 0) {
    const priorCounts = await fetchAllPages(api.observations.speciesCountsList, {
      user_login: [userLogin],
      taxon_id: taxonIds,
      d2: _dayBefore(first),
      fields: 'taxon.id,count',
      per_page: 500,
      ttl: 86400,
    });
    for (const row of priorCounts) {
      if (row.taxon?.id != null && (row.count ?? 0) > 0) {
        previouslySeenTaxonIds.add(row.taxon.id);
      }
    }
  }

  // Chronological by day, then time, then id — so a taxon's earliest day in the
  // month is the one that gets the lifer mark.
  const chronological = [...observations].sort(
    (a, b) =>
      (a.observed_on ?? '').localeCompare(b.observed_on ?? '') ||
      (a.time_observed_at ?? '').localeCompare(b.time_observed_at ?? '') ||
      (a.id ?? 0) - (b.id ?? 0),
  );

  const lifers = new Set<string>();
  const seenThisMonth = new Set<number>();
  for (const o of chronological) {
    const taxonId = o.taxon?.id;
    const isSpeciesOrFiner = (o.taxon?.rank_level ?? 100) <= SPECIES_RANK_LEVEL;
    if (
      o.observed_on &&
      taxonId != null &&
      isSpeciesOrFiner &&
      !previouslySeenTaxonIds.has(taxonId) &&
      !seenThisMonth.has(taxonId)
    ) {
      seenThisMonth.add(taxonId);
      lifers.add(o.observed_on);
    }
  }

  return {observed, lifers};
}

/** Zero-pad a 1- or 2-digit number to width 2. */
function _pad(n: number): string {
  return String(n).padStart(2, '0');
}

/** The UTC day before `dateStr` (YYYY-MM-DD), as YYYY-MM-DD. */
function _dayBefore(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d - 1)).toISOString().slice(0, 10);
}

/** Parse iNat's "lat,lng" location string into a tuple, or null if unusable. */
function _parseCoords(location?: string | null): [number, number] | null {
  if (!location) return null;
  const [lat, lng] = location.split(',').map(Number);
  return Number.isFinite(lat) && Number.isFinite(lng) ? [lat, lng] : null;
}

/**
 * iNaturalist v2 only returns the 75px `square.jpg` URL, but every photo is
 * served at several sizes under the same path. Swap the size segment to get a
 * larger thumbnail.
 */
function _thumbnailUrl(squareUrl?: string | null, size = 'small'): string | undefined {
  return squareUrl?.replace(/\/square(\.\w+)(\?|$)/, `/${size}$1$2`);
}

if (import.meta.main) {
  const [userLogin, observedOn] = process.argv.slice(2);
  if (!userLogin || !observedOn) {
    throw new Error('usage: tsx src/tripReport.ts <userLogin> <YYYY-MM-DD>');
  }
  console.log(JSON.stringify(await main(userLogin, observedOn), null, 2));
}
