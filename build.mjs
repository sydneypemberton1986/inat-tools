// Bundle every viewer entry (src/*.ts) into dist/ as a standalone ES module.
//
// Each page loads its own <script type="module" src="…js">, so we emit one
// bundle per entry rather than a shared chunk. Entries are auto-discovered by
// globbing src/*.ts, so adding a viewer needs no edit here — just drop a new
// src/<name>.ts and reference dist/<name>.js from its HTML page.
//
// The Leaflet global (`L`) stays a CDN <script>; the viewers only `declare` its
// type, never import it, so nothing pulls Leaflet into these bundles.
import { build } from "esbuild";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const SRC_DIR = "src";
const entryPoints = readdirSync(SRC_DIR)
  .filter((name) => name.endsWith(".ts"))
  .map((name) => join(SRC_DIR, name));

await build({
  entryPoints,
  outdir: "dist",
  bundle: true,
  format: "esm",
  target: "es2022",
  sourcemap: true,
  logLevel: "info",
});
