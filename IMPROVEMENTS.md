# IMPROVEMENTS

A prioritized plan to improve the `inat-tools` codebase, for a future session to
execute top-down. North stars: **consistency, parsimony, best practices,
community standards.**

## Context

The `fresh` branch is a clean rewrite of the old vibe-coded site (on `main` /
`inat-viewer`). Five pages are migrated, each a `*.html` + `src/*.view.ts`, with
a `src/*.ts` data module for the four JSON-driven ones:

| Page | HTML | View | Data module |
|------|------|------|-------------|
| Home | `index.html` | — | — |
| Rarest | `rarest.html` | `src/rarest.view.ts` | `src/rarest.ts` |
| Taxonomy Tree | `tree.html` | `src/tree.view.ts` | `src/tree.ts` (+ `src/region.ts`) |
| Trending | `trending.html` | `src/trending.view.ts` | `src/trending.ts` |
| Lockable Map | `grid_viewer.html` | `src/grid_viewer.view.ts` | — (Leaflet tiles only) |
| Range Map | `range_viewer.html` | `src/range_viewer.view.ts` | `src/range.ts` |

Shared: `src/api/client.ts` (throttled, logging v2 client), `fetchAllPages.ts`,
generated `inaturalist.ts`. Map pages use `shared.css`; the rest use Pico classless.

## Findings (what's actually in the tree)

- **Duplication**: `el()` copied in all 4 list/tree/trending/range views;
  `byId()` in all 5 views; the `import.meta.main` guard + `declare const
  process`/`ImportMeta` ambients in 3 data modules; `taxonUrl`/`obsUrl` builders
  in 2 views; photo-URL handling done 3 different ways.
- **Broken/dead test**: `src/rarest.test.ts` imports `{ iNatApi }` (removed in
  the refactor) → fails `tsc`. Both test files use `node:test` but there is **no
  `test` script**, **no runner**, and **no `@types/node`** — so tests never run.
- **Two lockfiles**: `package-lock.json` + `pnpm-lock.yaml` (deploy uses pnpm).
- **No lint/format config**, **no CI check workflow** (only `deploy.yml`).
- Request logging (`console.error`) is always on, even in production.
- `vite.config.js` input list is hand-maintained; `observer_sydney` hardcoded in
  four HTML files.

---

## Plan (north stars in brackets)

### Tier 0 — Hygiene (fast, unblocks everything)

1. **Resolve the test story** [best practices, community standards]. Delete
   `package-lock.json` (pnpm is canonical). Adopt **vitest** (vite-native): add
   `test`/`test:run` scripts, convert the two `node:test` files, and **fix or
   delete** `rarest.test.ts` — its `iNatApi` export is gone; rewrite it against
   `createApi` in `client.ts`, where the throttle now lives.
2. **Add a CI check workflow** [best practices] — `.github/workflows/check.yml`
   running `tsc --noEmit`, lint, and tests on PR/push. Nothing currently guards
   the branches except the deploy build.

### Tier 1 — Parsimony: extract duplicated code [parsimony, consistency]

3. **`src/dom.ts`** — one `el()` and `byId()`, imported by all five views.
4. **`src/cli.ts`** — the `import.meta.main` guard + Node ambients in one place;
   data modules call `runCli(main)` instead of re-declaring `process`/`ImportMeta`
   three times.
5. **`src/inat.ts` (URL + photo helpers)** — `taxonUrl`, `obsUrl`, and one
   `photo(url, size)` helper. Then **standardize thumbnails**: rarest upsizes
   square→`small`, tree uses raw `square`, trending/range use `square_url`. Pick
   one convention and apply everywhere.

### Tier 2 — Best practices & community standards

6. **Formatter + linter** [community standards] — add **Biome** (single dep =
   format + lint, fast) or Prettier+ESLint. Add `format`/`lint` scripts; wire
   into the Tier-0 CI.
7. **Gate request logging** [best practices] behind `import.meta.env.DEV` so
   production consoles are quiet.
8. **`gen:api` script** [best practices] — the swagger-typescript-api regen
   command lives only in README prose; make it a `package.json` script.
9. **Real unit tests** [best practices] for the pure logic (no network):
   `region.ts` normalization, `fetchAllPages` paging, tree forest-building +
   roll-up, OKLCH palette, rarest's id-join. These are already pure functions.

### Tier 3 — Consistency polish [consistency]

10. **Standardize page scaffolding** — shared nav, observer input, and
    loading/error/empty states differ per page. Factor a tiny shared header/nav
    and consistent status handling. **Persist the last observer in
    `localStorage`** (shared across pages; removes the 4 hardcoded defaults).
11. **Auto-discover vite inputs** (glob the `*.html`) so adding a page is one
    file, not a config edit.
12. **README** — replace the "Record of Establishing Commands" scratchpad with a
    real architecture note: the data-module/view split, how to add a page, how to
    regen the client.

### Tier 4 — Optional / judgment calls

13. **Naming**: `grid_viewer`/`range_viewer` (snake_case) vs
    `rarest`/`tree`/`trending`; every data module exports `main`, which collides
    conceptually with the `import.meta.main` guard. Consider domain names
    (`rarestObservations`, etc.) and consistent file names — weigh against churn.
14. **a11y**: the range breadcrumb/drill uses `<a>` + click with no
    href/keyboard support — should be `<button>`.
15. **Consistent caching**: only rarest/tree use `ttl` + ascending-id paging;
    apply the same where it fits.

### Non-goals (parsimony cuts both ways)

- Don't touch generated `inaturalist.ts`.
- Don't introduce a UI framework or a component abstraction over five small
  views — the `el`/data-module split is the right altitude.

## Suggested sequencing

Tier 0 → 1 (these make everything else safe and smaller), then 2, then 3. Each
tier is independently commit-able; land small PRs.
