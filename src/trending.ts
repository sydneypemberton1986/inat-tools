import {createApi} from './api/client.ts';
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

const RADIUS_KM = 100;
const PER_GROUP = 10; // species listed per group

/** iNat iconic-taxon buckets paired with a plain-language label, in display order. */
const GROUPS = [
  ['Aves', 'Birds'], ['Mammalia', 'Mammals'], ['Reptilia', 'Reptiles'],
  ['Amphibia', 'Amphibians'], ['Actinopterygii', 'Fishes'], ['Mollusca', 'Mollusks'],
  ['Arachnida', 'Arachnids'], ['Insecta', 'Insects'], ['Plantae', 'Plants'],
  ['Fungi', 'Fungi & Lichens'],
] as const;

/** The iconic-taxon slugs we group by, e.g. "Aves" | "Mammalia" | …. */
type Iconic = (typeof GROUPS)[number][0];

/** One locally-active species, with how seasonal it is and whether you've logged it. */
export interface Species {
  id: number;
  name: string; // scientific
  common?: string;
  photo?: string; // square thumbnail
  count: number; // sightings in the area this month
  share: number | null; // this month ÷ all year, i.e. how seasonal it is here
  missing: boolean; // you haven't recorded it
}

export interface Group {
  label: string;
  species: Species[];
}

/** What's active near a location this month, grouped by iconic taxon. */
export interface Trending {
  month: number; // 1-12
  coverage: {total: number; have: number} | null; // area species, and how many you've logged
  groups: Group[];
}

/**
 * The species most reported within 100 km of a location in the current month,
 * grouped by iconic taxon, flagged by how seasonal each is and whether the user
 * has recorded it. Everything is scoped to the ~10 species shown per group, so
 * no full life-list fetch is needed.
 */
export async function main(
  userLogin: string,
  lat: number,
  lng: number,
  month = new Date().getMonth() + 1,
): Promise<Trending> {
  const api = createApi();
  const [coverage, groups] = await Promise.all([
    _coverage(api, userLogin, lat, lng),
    Promise.all(GROUPS.map(([iconic, label]) => _group(api, userLogin, lat, lng, month, iconic, label))),
  ]);
  return {month, coverage, groups: groups.filter(g => g.species.length > 0)};
}

/** How many of the area's species (all year) the user has recorded. */
async function _coverage(api: Api<unknown>, user: string, lat: number, lng: number) {
  try {
    const [total, unseen] = await Promise.all([
      _count(api, {lat, lng}),
      _count(api, {lat, lng, unobserved_by_user_id: user}),
    ]);
    return {total, have: total - unseen};
  } catch {
    return null;
  }
}

/** `total_results` for a species_counts query; `per_page: 0` asks for the count only. */
async function _count(api: Api<unknown>, query: {lat: number; lng: number; unobserved_by_user_id?: string}): Promise<number> {
  const page = await api.observations.speciesCountsList({...query, radius: RADIUS_KM, rank: ['species'], per_page: 0});
  return page.data.total_results ?? 0;
}

/** This month's top species for one iconic group, with season share and missing flag. */
async function _group(api: Api<unknown>, user: string, lat: number, lng: number, month: number, iconic: Iconic, label: string): Promise<Group> {
  try {
    const rows = (await api.observations.speciesCountsList({
      lat, lng, radius: RADIUS_KM, iconic_taxa: [iconic], month: [month], rank: ['species'], per_page: PER_GROUP,
      fields: 'count,taxon.id,taxon.name,taxon.preferred_common_name,taxon.default_photo.square_url',
    })).data.results;

    const ids = rows.map(r => r.taxon?.id).filter((id): id is number => id != null);
    const [totals, missing] = await Promise.all([_totals(api, lat, lng, ids), _missing(api, user, ids)]);
    const species = rows.map(r => _species(r, totals, missing)).filter((s): s is Species => s != null);
    return {label, species};
  } catch {
    return {label, species: []};
  }
}

/** All-year local totals for specific taxa, so each species' seasonality shows. */
async function _totals(api: Api<unknown>, lat: number, lng: number, ids: number[]): Promise<Map<number, number>> {
  if (!ids.length) return new Map();
  const rows = (await api.observations.speciesCountsList({
    lat, lng, radius: RADIUS_KM, taxon_id: ids, rank: ['species'], per_page: ids.length, fields: 'count,taxon.id',
  })).data.results;
  return new Map(rows.flatMap(r => (r.taxon?.id != null ? [[r.taxon.id, r.count ?? 0] as const] : [])));
}

/** Which of the given taxa the user has NOT recorded. */
async function _missing(api: Api<unknown>, user: string, ids: number[]): Promise<Set<number>> {
  if (!ids.length) return new Set();
  const rows = (await api.observations.speciesCountsList({
    taxon_id: ids, unobserved_by_user_id: user, rank: ['species'], per_page: ids.length, fields: 'taxon.id',
  })).data.results;
  return new Set(rows.flatMap(r => (r.taxon?.id != null ? [r.taxon.id] : [])));
}

function _species(row: {count?: number; taxon?: {id?: number; name?: string | null; preferred_common_name?: string | null; default_photo?: {square_url?: string | null} | null} | null}, totals: Map<number, number>, missing: Set<number>): Species | null {
  const taxon = row.taxon;
  if (taxon?.id == null) return null;
  const count = row.count ?? 0;
  const total = totals.get(taxon.id);
  return {
    id: taxon.id,
    name: taxon.name ?? '',
    common: taxon.preferred_common_name ?? undefined,
    photo: taxon.default_photo?.square_url ?? undefined,
    count,
    share: total ? count / total : null,
    missing: missing.has(taxon.id),
  };
}

if (import.meta.main) {
  const [userLogin, lat, lng] = process.argv.slice(2);
  if (!userLogin || !lat || !lng) {
    throw new Error('usage: tsx src/trending.ts <userLogin> <lat> <lng>');
  }
  console.log(JSON.stringify(await main(userLogin, Number(lat), Number(lng)), null, 2));
}
