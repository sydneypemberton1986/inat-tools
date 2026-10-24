import {Api, type Observation, type Taxon} from './api/inaturalist';
import pThrottle from 'p-throttle';
import {fetchAllPages} from "./api/fetchAllPages.ts";

export const iNatApi = new Api({
  baseUrl: 'https://api.inaturalist.org/v2',
  // https://www.inaturalist.org/pages/developers states
  // > We throttle API usage to a max of 100 requests per minute,
  // > though we ask that you try to keep it to 60 requests per minute or lower.

  customFetch: pThrottle({limit: 1, interval: 1000})(loggedFetch)
});


async function loggedFetch(input: RequestInfo | URL, init?: RequestInit) {
  const r = new Request(input, init);
  console.debug(r.method, r.url, r.body ? await r.clone().text() : '');
  return fetch(r);
}


interface CountedObservation extends Observation {
  id: number;
  taxon: Taxon & {observations_count: number};
}

const isCounted = (o: Observation): o is CountedObservation =>
  o.taxon?.observations_count != null;


export async function main(userLogin: string): Promise<any> {
  // const userLogin = "observer_sydney"

  const observationsWithCounts = (await fetchAllPages(iNatApi.observations.observationsList, {
    user_login: [userLogin],
    order_by: "observed_on",
    order: "desc",
    // v2 wants ONE comma-separated field spec; an array becomes repeated
    // `fields=` params and the server drops all but one of them.
    fields: "id,taxon.observations_count",
    per_page: 500,
  })).filter(isCounted);

  observationsWithCounts.sort((o1, o2) => o1.taxon.observations_count - o2.taxon.observations_count);
  const rarest = observationsWithCounts.slice(0, 100);
  const ids = rarest.map(o => o.id);

  const details = (await iNatApi.observations.observationsList({
    fields: [
      "id", // needed to join back to `rarest` (the server ignores our id order)
      "uri",
      "quality_grade",
      "place_guess",
      "observed_on",
      "taxon.name",
      "taxon.preferred_common_name",
      "photos.url", // the 75px `square.jpg`; see `thumbnailUrl` below
    ].join(","),
    id: ids,
    per_page: ids.length, // default is 30; make sure every id comes back
  })).data.results;

  // The `id: ids` query returns rows in the server's order, not ours, so join
  // by id to keep the rarity ordering (rarest first) from `rarest`, folding in
  // the observation count we already fetched.
  const byId = new Map(details.map(d => [d.id, d]));
  return rarest.map(o => {
    const detail = byId.get(o.id);
    return {
      ...detail,
      observations_count: o.taxon.observations_count,
      thumbnail_url: thumbnailUrl(detail?.photos?.[0]?.url),
    };
  });
}

/**
 * iNaturalist v2 only returns the 75px `square.jpg` URL, but every photo is
 * served at several sizes under the same path (square, thumb, small, medium,
 * large, original). Swap the size segment to get a larger thumbnail.
 */
const thumbnailUrl = (squareUrl?: string, size = "medium"): string | undefined =>
  squareUrl?.replace(/\/square(\.\w+)(\?|$)/, `/${size}$1$2`);