import { test } from 'node:test';
import assert from 'node:assert/strict';

/** iNaturalist asks for at most ~1 request per second. */
const MIN_GAP_MS = 1000;

/** setTimeout can fire a millisecond or two early; don't fail on that. */
const TIMER_SLACK_MS = 15;

const requestTimes: number[] = [];

/** Stand-in for the network: records when each request starts, returns an empty page. */
const fakeFetch = async (): Promise<Response> => {
  requestTimes.push(Date.now());
  return Response.json({ total_results: 0, page: 1, per_page: 0, results: [] });
};

test('iNatApi starts requests at least 1 second apart, even when fired all at once', async () => {
  globalThis.fetch = fakeFetch as typeof fetch;
  // Dynamic import so the client is built *after* fetch is replaced;
  // rarest.ts captures `fetch` when it is first loaded.
  const { iNatApi } = await import('./rarest.ts');

  await Promise.all(
    [1, 2, 3].map((page) =>
      iNatApi.observations.speciesCountsList({ user_login: ['someone'], page }),
    ),
  );

  const gaps = requestTimes.slice(1).map((time, i) => time - requestTimes[i]);
  assert.equal(requestTimes.length, 3);
  for (const gap of gaps) {
    assert.ok(gap >= MIN_GAP_MS - TIMER_SLACK_MS, `requests were only ${gap}ms apart: ${gaps}`);
  }
});
