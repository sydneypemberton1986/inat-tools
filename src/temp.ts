import { Api } from './api/inaturalist';

// Initialize the generated API client
const inatApi = new Api({
  baseUrl: 'https://api.inaturalist.org/v2'
});

// Example: Fetch observations with full TypeScript autocomplete
async function fetchObservations() {
  try {
    const response = await inatApi.observations.observationsSearch({
      per_page: 5,
      quality_grade: ["research"]
    });

    console.log("Observations:", response.data.results);
  } catch (error) {
    console.error("API Error:", error);
  }
}

fetchObservations();
