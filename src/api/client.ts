import {Api} from './inaturalist';
import pThrottle from 'p-throttle';

/** A throttled, request-logging iNaturalist v2 client. */
export function createApi(): Api<unknown> {
  return new Api({
    baseUrl: 'https://api.inaturalist.org/v2',
    // https://www.inaturalist.org/pages/developers asks for <= 60 requests/min;
    // one per second keeps us well under their limit.
    customFetch: pThrottle({limit: 1, interval: 1000})(loggedFetch),
  });
}

/** `fetch`, but logs the method, URL, and body of each request first.
 *  Logs go to stderr (console.error) so they never pollute CLI stdout. */
async function loggedFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const request = new Request(input, init);
  console.error(request.method, request.url, request.body ? await request.clone().text() : '');
  return fetch(request);
}
