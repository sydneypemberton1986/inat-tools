import { Api } from './api/inaturalist';
import pThrottle from 'p-throttle';
import {fetchAllPages} from "./api/fetchAllPages.ts";

export const iNatApi = new Api({
  baseUrl: 'https://api.inaturalist.org/v2',
  // https://www.inaturalist.org/pages/developers states
  // > We throttle API usage to a max of 100 requests per minute,
  // > though we ask that you try to keep it to 60 requests per minute or lower.
  customFetch: pThrottle({limit: 1, interval: 1000})(fetch)
});
const userName = "observer_sydney"

async function getObservations(user_login: string): Promise<any> {
  const observations = await fetchAllPages(iNatApi.observations.observationsList, {
    user_login: [user_login],
    order_by: "observed_on",
    order: "desc",
    page: 0,
    fields: ["total_results"],
  });
  console.log("Observations:", observations);
  return observations;
}

async function getSpeciesCounts(user_login: string): Promise<any>{
  const speciesCounts = await fetchAllPages(iNatApi.observations.speciesCountsList, {
    user_login: [user_login],
    page: 0,
  })
  console.log("Species Counts:", speciesCounts);
  return speciesCounts;
}


export function main() {
    getSpeciesCounts(userName)
        .then(() => getObservations(userName))
        .catch(console.error);

}