import {Api} from './api/inaturalist';
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
    fields: ["all"],
    // https://api.inaturalist.org/v1/observations?user_login=nickmoncaleano&taxon_id=68884,63058,127685,130893,117433,48206,47602,416512,46017,6930,48372,47562,47380,922110,54743&per_page=200&page=1&order_by=observed_on&order=desc
  //   https://api.inaturalist.org/v2/observations?fields=(taxon:(observations_count))
  });
}

export async function getSpeciesCounts(user_login: string): Promise<any>{
  return await fetchAllPages(iNatApi.observations.speciesCountsList, {
    user_login: [user_login],
    fields: ["all"],
    // https://api.inaturalist.org/v1/observations/species_counts?user_login=nickmoncaleano&per_page=500&page=1
  });
}


export async function main() {
  const userName = "observer_sydney"

    getSpeciesCounts(userName)
        .then(() => getObservations(userName))
        .catch(console.error);

}