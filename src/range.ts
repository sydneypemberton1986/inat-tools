import {createApi} from './api/client.ts';

// A single throttled client for this page's JSON lookups (autocomplete, taxon
// detail, observation bounds). The map's tile layers hit iNat's raster tile
// services directly and don't go through here.
const api = createApi();

const SUMMARY_FIELDS = 'id,name,rank,preferred_common_name,observations_count,default_photo.square_url';
const TAXON_FIELDS = [
  'id', 'name', 'rank', 'preferred_common_name', 'default_photo.square_url',
  'ancestors.id', 'ancestors.name', 'ancestors.rank',
  'children.id', 'children.name', 'children.rank', 'children.is_active',
  'children.observations_count', 'children.preferred_common_name', 'children.default_photo.square_url',
].join(',');

export interface Suggestion {
  id: number;
  name: string;
  rank: string;
  common?: string;
  photo?: string;
  observationsCount?: number;
}

export interface Child {
  id: number;
  name: string;
  rank: string;
  common?: string;
  photo?: string;
  observationsCount: number;
  isActive: boolean;
}

export interface Taxon {
  id: number;
  name: string;
  rank: string;
  common?: string;
  photo?: string;
  parent?: {id: number; name: string; rank: string};
  children: Child[];
}

export interface Bounds {
  swlat: number;
  swlng: number;
  nelat: number;
  nelng: number;
}

/** Typeahead search — the same /taxa/autocomplete the iNat site uses. */
export async function searchTaxa(q: string, perPage: number): Promise<Suggestion[]> {
  const res = await api.taxa.autocompleteList({q, per_page: perPage, fields: SUMMARY_FIELDS});
  return (res.data.results ?? []).flatMap(t => (t?.id == null ? [] : [{
    id: t.id,
    name: t.name ?? '',
    rank: t.rank ?? '',
    common: t.preferred_common_name ?? undefined,
    photo: t.default_photo?.square_url ?? undefined,
    observationsCount: t.observations_count ?? undefined,
  }]));
}

/** A taxon with its direct parent and active children (for the colored split). */
export async function fetchTaxon(id: number): Promise<Taxon | null> {
  const res = await api.taxa.taxaDetail([id], {fields: TAXON_FIELDS});
  const t = res.data.results?.[0];
  if (t?.id == null) return null;
  const parent = t.ancestors?.at(-1);
  return {
    id: t.id,
    name: t.name ?? '',
    rank: t.rank ?? '',
    common: t.preferred_common_name ?? undefined,
    photo: t.default_photo?.square_url ?? undefined,
    parent: parent?.id == null ? undefined : {id: parent.id, name: parent.name ?? '', rank: parent.rank ?? ''},
    children: (t.children ?? []).flatMap(c => (c?.id == null ? [] : [{
      id: c.id,
      name: c.name ?? '',
      rank: c.rank ?? '',
      common: c.preferred_common_name ?? undefined,
      photo: c.default_photo?.square_url ?? undefined,
      observationsCount: c.observations_count ?? 0,
      isActive: c.is_active !== false,
    }])),
  };
}

/** The bounding box of a taxon's observations, for fitting the map to it. */
export async function fetchBounds(id: number): Promise<Bounds | null> {
  // `return_bounds` / `total_bounds` aren't in the generated types; build the
  // query as a variable (no excess-property check) and read the extra field.
  const query = {taxon_id: [id], per_page: 0, return_bounds: 'true'};
  const res = await api.observations.observationsList(query);
  const b = (res.data as {total_bounds?: Partial<Bounds>}).total_bounds;
  if (b?.swlat == null || b.swlng == null || b.nelat == null || b.nelng == null) return null;
  return {swlat: b.swlat, swlng: b.swlng, nelat: b.nelat, nelng: b.nelng};
}
