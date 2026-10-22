import { test } from 'node:test';
import assert from 'node:assert/strict';

import { fetchAllPages, type Page, type PagingQuery } from './fetchAllPages.ts';
import type { HttpResponse } from './inaturalist.ts';

/** A fake endpoint serving `total` numbered items, `perPage` at a time; logs the pages asked for. */
const fakeEndpoint = (total: number, perPage: number) => {
  const pagesRequested: number[] = [];
  const endpoint = async (query?: PagingQuery) => {
    const page = query?.page ?? 1;
    pagesRequested.push(page);
    const start = (page - 1) * perPage;
    const results = Array.from({ length: Math.max(0, Math.min(perPage, total - start)) }, (_, i) => start + i);
    return { data: { total_results: total, page, per_page: perPage, results } } as HttpResponse<Page<number>>;
  };
  return { endpoint, pagesRequested };
};

test('returns every result, in order, across all pages', async () => {
  const { endpoint, pagesRequested } = fakeEndpoint(1142, 500);
  const all = await fetchAllPages(endpoint, {});
  assert.equal(all.length, 1142);
  assert.deepEqual(all.slice(0, 3), [0, 1, 2]);
  assert.equal(all.at(-1), 1141);
  assert.deepEqual(pagesRequested.toSorted(), [1, 2, 3]);
});

test('makes a single request when everything fits on one page', async () => {
  const { endpoint, pagesRequested } = fakeEndpoint(7, 500);
  assert.equal((await fetchAllPages(endpoint, {})).length, 7);
  assert.deepEqual(pagesRequested, [1]);
});

test('makes a single request when there are no results', async () => {
  const { endpoint, pagesRequested } = fakeEndpoint(0, 500);
  assert.deepEqual(await fetchAllPages(endpoint, {}), []);
  assert.deepEqual(pagesRequested, [1]);
});

test('keeps the caller’s other query fields on every page', async () => {
  const seen: unknown[] = [];
  const endpoint = async (query?: PagingQuery & { user_login: string[] }) => {
    seen.push(query?.user_login);
    return { data: { total_results: 4, page: query?.page ?? 1, per_page: 2, results: [] } } as unknown as HttpResponse<Page<never>>;
  };
  await fetchAllPages(endpoint, { user_login: ['observer_sydney'] });
  assert.deepEqual(seen, [['observer_sydney'], ['observer_sydney']]);
});
