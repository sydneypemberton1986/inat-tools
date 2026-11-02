import {Api} from './inaturalist';
import pThrottle from 'p-throttle';

/**
 * A throttled, request-logging iNaturalist v2 client. Pass an API token (the
 * JWT from inaturalist.org/users/api_token) to authenticate write calls; it is
 * sent as a Bearer header and never logged.
 */
export function createApi(token?: string): Api<unknown> {
  // https://www.inaturalist.org/pages/developers asks for <= 60 requests/min;
  // one per second keeps us well under their limit.
  const throttled = pThrottle({limit: 1, interval: 1000})(loggedFetch);
  const customFetch = token
    ? (input: RequestInfo | URL, init?: RequestInit) =>
        throttled(input, {...init, headers: {...init?.headers, Authorization: `Bearer ${token}`}})
    : throttled;
  return new Api({baseUrl: 'https://api.inaturalist.org/v2', customFetch});
}

/** `fetch`, but logs the method, URL, and body of each request first.
 *  Logs go to stderr (console.error) so they never pollute CLI stdout. */
async function loggedFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const request = new Request(input, init);
  console.error(request.method, request.url, request.body ? await request.clone().text() : '');
  return fetch(request);
}
