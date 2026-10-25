import {createApi} from './api/client.ts';
import {fetchAllPages} from './api/fetchAllPages.ts';
import type {Api} from './api/inaturalist';

declare global {
  interface ImportMeta {
    /** True when this module is the process entry point (set by Node/tsx). */
    readonly main: boolean;
  }
}

/** Minimal Node ambient: this vite project omits @types/node, but the CLI
 *  entry point at the bottom runs under tsx and needs argv. */
declare const process: {argv: readonly string[]};

/** iNaturalist caps a multi-taxon lookup (`/taxa/id1,id2,…`) at 30 ids. */
const TAXA_CHUNK = 30;

/** One of a user's observations, hanging off the taxon it was identified as. */
export interface Observation {
  id: number;
  date?: string | null;
  place?: string | null;
  photo?: string | null; // the 75px square thumbnail
  captive: boolean;
  introduced: boolean;
}

/** A taxon in the tree: its observations, child taxa, and rolled-up count. */
export interface TaxonNode {
  id: number;
  name: string;
  rank: string;
  common?: string;
  children: TaxonNode[];
  observations: Observation[];
  total: number;
}

type TaxonInfo = {name: string; rank: string; common?: string};

/**
 * Build a user's observations into a taxonomic forest: every observed taxon and
 * its ancestors as nested nodes, each observation hanging off the taxon it was
 * identified as, with observation counts rolled up to every level.
 */
export async function main(userLogin: string): Promise<TaxonNode[]> {
  const api = createApi();

  const observations = await fetchAllPages(api.observations.observationsList, {
    user_login: [userLogin],
    order_by: 'id', // immutable, cacheable pages (see rarest.ts)
    order: 'asc',
    fields: [
      'id', 'observed_on', 'place_guess', 'captive', 'photos.url',
      'taxon.id', 'taxon.name', 'taxon.rank', 'taxon.preferred_common_name',
      'taxon.introduced', 'taxon.ancestor_ids',
    ].join(','),
    per_page: 500,
    ttl: 86400,
  });

  // Each observed taxon contributes one root-to-self id path; ancestor names
  // come later from the taxa endpoint. Observations group under their taxon.
  const info = new Map<number, TaxonInfo>();
  const obsByTaxon = new Map<number, Observation[]>();
  const paths: number[][] = [];

  for (const obs of observations) {
    const taxon = obs.taxon;
    if (taxon?.id == null || obs.id == null) continue; // unidentified: nothing to hang it under
    if (!info.has(taxon.id)) {
      info.set(taxon.id, _info(taxon.id, taxon.name, taxon.rank, taxon.preferred_common_name));
      paths.push(_pathTo(taxon.id, taxon.ancestor_ids));
    }
    _push(obsByTaxon, taxon.id, {
      id: obs.id,
      date: obs.observed_on,
      place: obs.place_guess,
      photo: obs.photos?.[0]?.url ?? null,
      captive: obs.captive ?? false,
      introduced: taxon.introduced ?? false,
    });
  }

  await _resolveAncestors(api, paths, info);
  return _buildForest(paths, info, obsByTaxon);
}

/** Resolve name/rank/common for every path id not already known, in place. */
async function _resolveAncestors(api: Api<unknown>, paths: number[][], info: Map<number, TaxonInfo>) {
  const missing = [...new Set(paths.flat())].filter(id => !info.has(id));
  const chunks = Array.from(
    {length: Math.ceil(missing.length / TAXA_CHUNK)},
    (_, i) => missing.slice(i * TAXA_CHUNK, (i + 1) * TAXA_CHUNK),
  );
  const pages = await Promise.all(chunks.map(ids =>
    api.taxa.taxaDetail(ids, {fields: 'id,name,rank,preferred_common_name'})));
  for (const page of pages) {
    for (const t of page.data.results) {
      if (t?.id != null) info.set(t.id, _info(t.id, t.name, t.rank, t.preferred_common_name));
    }
  }
}

/** Weave the id paths into a forest, attaching observations and rolling up counts. */
function _buildForest(paths: number[][], info: Map<number, TaxonInfo>, obsByTaxon: Map<number, Observation[]>) {
  const nodes = new Map<number, TaxonNode>();
  const roots: TaxonNode[] = [];

  for (const path of paths) {
    let parent: TaxonNode | undefined;
    for (const id of path) {
      let node = nodes.get(id);
      if (!node) {
        const meta = info.get(id);
        node = {id, name: meta?.name ?? `taxon ${id}`, rank: meta?.rank ?? '', common: meta?.common, children: [], observations: [], total: 0};
        nodes.set(id, node);
        (parent?.children ?? roots).push(node);
      }
      parent = node;
    }
    // The last id in a path is the observed taxon itself.
    nodes.get(path[path.length - 1]!)!.observations = obsByTaxon.get(path[path.length - 1]!) ?? [];
  }

  roots.forEach(_rollUp);
  return roots;
}

/** Set `total` to a node's own observations plus every descendant's; return it. */
function _rollUp(node: TaxonNode): number {
  node.total = node.observations.length + node.children.reduce((sum, child) => sum + _rollUp(child), 0);
  return node.total;
}

/** The root-to-self id path for a taxon, tolerating a missing/self-less chain. */
function _pathTo(id: number, ancestorIds?: number[] | null): number[] {
  const path = ancestorIds?.length ? [...ancestorIds] : [id];
  if (path[path.length - 1] !== id) path.push(id);
  return path;
}

function _info(id: number, name?: string | null, rank?: string | null, common?: string | null): TaxonInfo {
  return {name: name ?? `taxon ${id}`, rank: rank ?? '', common: common ?? undefined};
}

function _push<K, V>(map: Map<K, V[]>, key: K, value: V): void {
  const list = map.get(key);
  if (list) list.push(value);
  else map.set(key, [value]);
}

if (import.meta.main) {
  const userLogin = process.argv[2];
  if (userLogin === undefined) {
    throw new Error('usage: tsx src/tree.ts <userLogin>');
  }
  console.log(JSON.stringify(await main(userLogin), null, 2));
}
