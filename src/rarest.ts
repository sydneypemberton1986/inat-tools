import { Api } from './api/inaturalist';

export const iNatApi = new Api({baseUrl: 'https://api.inaturalist.org/v2'});
const userName = "observer_sydney"

async function getObservations(user_login: string): Promise<any> {
  const response = await iNatApi.observations.observationsList({
    user_login: [user_login],
    order_by: "observed_on",
    order: "desc",
    page: 0,
    fields: ["total_results"],
  });
  console.log("Observations:", response.data.results);
  return response;
}

async function getSpeciesCounts(user_login: string): Promise<any>{
  const response = await iNatApi.observations.speciesCountsList({
    user_login: [user_login],
    page: 0,
  })
  console.log("Species Counts:", response.data.results);
  return response;
}


export function main() {
    getSpeciesCounts(userName)
        .then(() => getObservations(userName))
        .catch(console.error);
}
