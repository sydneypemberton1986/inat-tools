# iNat Tools

## Run

```shell
pnpm install
pnpm run dev
```

Then open the printed URL and visit `/rarest.html`.

## Record of Establishing Commands

```shell
# TODO establish repo

pnpm create vite inat-tools --template vanilla-ts

cd inat-tools
pnpm install
pnpm run dev

# TODO Install the correct .github/workflows, vite.config.js, generate and commit pnpm-lock.yaml

pnpm add --save-dev swagger-typescript-api

pnpm exec swagger-typescript-api generate --path https://api.inaturalist.org/v2/api-docs --output ./src/api --name inaturalist.ts

pnpm add p-throttle

npx tsx
```
```ts
const { main, iNatApi } = await import('./src/rarest.ts')

main()

let res = await iNatApi.observations.speciesCountsList({ user_login: ['observer_sydney'], per_page: 2 })
res.data.total_results
```
