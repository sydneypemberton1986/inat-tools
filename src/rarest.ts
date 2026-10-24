import {Api, type Observation, type Taxon} from './api/inaturalist';
import pThrottle from 'p-throttle';
import {fetchAllPages} from './api/fetchAllPages.ts';

declare global {
  interface ImportMeta {
    /** True when this module is the process entry point (set by Node/tsx). */
    readonly main: boolean;
  }
}

/** Minimal Node ambient: this vite project omits @types/node, but the CLI
 *  entry point at the bottom runs under tsx and needs argv. */
declare const process: {argv: readonly string[]};

/**
 * Fetch a user's observations, keep the rarest 100 (by how many times the
 * taxon has been observed globally), and return them rarest-first with display
 * details, the global observation count, and a thumbnail URL.
 */
export async function main(userLogin: string) {
  const api = _createApi();

  const observationsWithCounts = (await fetchAllPages(api.observations.observationsList, {
    user_login: [userLogin],
    order_by: 'observed_on',
    order: 'desc',
    // v2 wants ONE comma-separated field spec; an array becomes repeated
    // `fields=` params and the server drops all but one of them.
    fields: 'id,taxon.observations_count',
    per_page: 500,
  })).filter(_isCounted);

  observationsWithCounts.sort((a, b) => a.taxon.observations_count - b.taxon.observations_count);
  const rarest = observationsWithCounts.slice(0, 100);
  const ids = rarest.map(o => o.id);

  const details = (await api.observations.observationsList({
    fields: [
      'id', // needed to join back to `rarest` (the server ignores our id order)
      'uri',
      'quality_grade',
      'place_guess',
      'observed_on',
      'taxon.name',
      'taxon.preferred_common_name',
      'photos.url', // the 75px `square.jpg`; see `_thumbnailUrl` below
    ].join(','),
    id: ids,
    per_page: ids.length, // default is 30; make sure every id comes back
  })).data.results;

  // The `id: ids` query returns rows in the server's order, not ours, so join
  // by id to keep the rarity ordering (rarest first), folding in the count.
  const byId = new Map(details.map(d => [d.id, d]));
  return rarest.map(o => {
    const detail = byId.get(o.id);
    return {
      ...detail,
      observations_count: o.taxon.observations_count,
      thumbnail_url: _thumbnailUrl(detail?.photos?.[0]?.url),
    };
  });
}

/** Build an API client whose requests are throttled and logged. */
function _createApi(): Api<unknown> {
  return new Api({
    baseUrl: 'https://api.inaturalist.org/v2',
    // https://www.inaturalist.org/pages/developers states
    // > We throttle API usage to a max of 100 requests per minute,
    // > though we ask that you try to keep it to 60 requests per minute or lower.
    customFetch: pThrottle({limit: 1, interval: 1000})(_loggedFetch),
  });
}

/** `fetch`, but logs the method, URL, and body of each request first. */
async function _loggedFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const request = new Request(input, init);
  console.debug(request.method, request.url, request.body ? await request.clone().text() : '');
  return fetch(request);
}

interface _CountedObservation extends Observation {
  id: number;
  taxon: Taxon & {observations_count: number};
}

/** Narrow to observations that carry an id and a global observation count. */
function _isCounted(o: Observation): o is _CountedObservation {
  return o.taxon?.observations_count != null;
}

/**
 * iNaturalist v2 only returns the 75px `square.jpg` URL, but every photo is
 * served at several sizes under the same path (square, thumb, small, medium,
 * large, original). Swap the size segment to get a larger thumbnail.
 */
function _thumbnailUrl(squareUrl?: string | null, size = 'medium'): string | undefined {
  return squareUrl?.replace(/\/square(\.\w+)(\?|$)/, `/${size}$1$2`);
}

if (import.meta.main) {
  const userLogin = process.argv[2];
  if (userLogin === undefined) {
    throw new Error('usage: tsx src/rarest.ts <userLogin>');
  }
  console.log(JSON.stringify(await main(userLogin), null, 2));
}
