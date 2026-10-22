import type { HttpResponse, RequestParams } from './inaturalist';

/** The envelope every paged iNaturalist list endpoint returns. */
export interface Page<T> {
  total_results: number;
  page: number;
  per_page: number;
  results: T[];
}

/** Query fields that control paging; every list endpoint accepts these. */
export interface PagingQuery {
  page?: number;
  per_page?: number;
}

/** Any generated list method, e.g. `iNatApi.observations.speciesCountsList`. */
export type PagedEndpoint<Q extends PagingQuery, T> = (
  query?: Q,
  params?: RequestParams,
) => Promise<HttpResponse<Page<T>>>;

/**
 * Calls a paged endpoint for every page and returns all results as one array.
 *
 * Page 1 is fetched first to learn the total; the rest are requested together
 * and spaced out by the client's rate limiter. Page size comes from the
 * server's reply, so a `per_page` the server caps lower still works.
 */
export const fetchAllPages = async <Q extends PagingQuery, T>(
  endpoint: PagedEndpoint<Q, T>,
  query: NoInfer<Q>,
): Promise<T[]> => {
  const fetchPage = (page: number) => endpoint({ ...query, page });

  const first = (await fetchPage(1)).data;
  const pageCount = Math.ceil(first.total_results / first.per_page);
  const rest = await Promise.all(
    Array.from({ length: pageCount - 1 }, (_, i) => fetchPage(i + 2)),
  );

  return [first, ...rest.map((response) => response.data)].flatMap((page) => page.results);
};
