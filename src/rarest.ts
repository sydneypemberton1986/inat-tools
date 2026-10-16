import { Api } from './api/inaturalist';

const iNatApi = new Api({baseUrl: 'https://api.inaturalist.org/v2'});
const PER_PAGE = 10;
const userName = "observer_sydney"

// TODO tighten return type
async function getObservations(user_login: string): Promise<any> {
  const response = await iNatApi.observations.observationsList({
    user_login: [user_login],
    order_by: "observed_on",
    order: "desc",
    per_page: PER_PAGE,
    page: 0,
    fields: ["total_results"],
  });
  console.log("Observations:", response.data.results);
  return response;
}

// TODO tighten return type
async function getSpeciesCounts(user_login: string): Promise<any>{
  const response = await iNatApi.observations.speciesCountsList({
    user_login: [user_login],
    per_page: PER_PAGE,
    page: 0,
  })
  console.log("Species Counts:", response.data.results);
  return response;
}

await getSpeciesCounts(userName)
await getObservations(userName);
