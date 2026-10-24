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


/** An observation that came back with the id and taxon count the rarity sort needs. */
interface CountedObservation extends Observation {
  id: number;
  taxon: Taxon & {observations_count: number};
}

const isCounted = (o: Observation): o is CountedObservation =>
  o.taxon?.observations_count != null;


export async function main(): Promise<any> {
  const userLogin = "observer_sydney"

  const observationsWithCounts = (await fetchAllPages(iNatApi.observations.observationsList, {
    user_login: [userLogin],
    order_by: "observed_on",
    order: "desc",
    fields: ["id","taxon.observations_count"],
    per_page: 500,
  })).filter(isCounted);

  observationsWithCounts.sort((o1, o2) => o1.taxon.observations_count - o2.taxon.observations_count);
  const ids = observationsWithCounts.slice(0,100).map(o => o.id);

  return await iNatApi.observations.observationsList({
    fields: [
      "uri",
      "quality_grade",
      "place_guess",
      "observed_on",
      "taxon.name",
      "taxon.preferred_common_name",
      // TODO: thumbnail
    ],
    id: ids,
  });
}