import {Api, type Observation} from './api/inaturalist';
import pThrottle from 'p-throttle';
import {fetchAllPages} from "./api/fetchAllPages.ts";


const loggedFetch: typeof fetch = async (...args) => {
  const r = new Request(...args);
  console.debug(r.method, r.url, r.body ? await r.clone().text() : '');
  return fetch(r);
}

export const iNatApi = new Api({
  baseUrl: 'https://api.inaturalist.org/v2',
  // https://www.inaturalist.org/pages/developers states
  // > We throttle API usage to a max of 100 requests per minute,
  // > though we ask that you try to keep it to 60 requests per minute or lower.

  customFetch: pThrottle({limit: 1, interval: 1000})(loggedFetch)
});

export async function getObservations(user_login: string): Promise<any> {
  return await fetchAllPages(iNatApi.observations.observationsList, {
    user_login: [user_login],
    order_by: "observed_on",
    order: "desc",
    fields: ["taxon.observations_count"],
    per_page: 500,
  });
}



export async function main(): Promise<any> {
  const userName = "observer_sydney"

  const observations = await getObservations(userName);
  observations.sort((o1: Observation, o2: Observation) => (o1.taxon?.observations_count ?? 0) - (o2.taxon?.observations_count ?? 0));
  return observations
}