import {createApi} from './api/client.ts';

const api = createApi();

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
  sw_latitude: number;
  sw_longitude: number;
  ne_latitude: number;
  ne_longitude: number;
}

/** Typeahead search — the same /taxa/autocomplete the iNat site uses. */
export async function searchTaxa(query: string, perPage: number): Promise<Suggestion[]> {
  const summary_fields = [
    'id',
    'name',
    'rank',
    'preferred_common_name',
    'observations_count',
    'default_photo.square_url',
  ];
  const response = await api.taxa.autocompleteList({
    q: query,
    per_page: perPage,
    fields: summary_fields.join(',')
  });
  return (response.data.results ?? []).flatMap(taxon => (taxon?.id == null ? [] : [{
    id: taxon.id,
    name: taxon.name ?? '',
    rank: taxon.rank ?? '',
    common: taxon.preferred_common_name ?? undefined,
    photo: taxon.default_photo?.square_url ?? undefined,
    observationsCount: taxon.observations_count ?? undefined,
  }]));
}

/** A taxon with its direct parent and active children (for the colored split). */
export async function fetchTaxon(id: number): Promise<Taxon | null> {
  const taxon_fields = [
    'ancestors.id',
    'ancestors.name',
    'ancestors.rank',
    'children.default_photo.square_url',
    'children.id',
    'children.is_active',
    'children.name',
    'children.observations_count',
    'children.preferred_common_name',
    'children.rank',
    'default_photo.square_url',
    'id',
    'name',
    'preferred_common_name',
    'rank',
  ]
  const response = await api.taxa.taxaDetail([id], {fields: taxon_fields.join(',')});
  const taxonDetail = response.data.results?.[0];
  if (taxonDetail?.id == null) return null;
  const parent = taxonDetail.ancestors?.at(-1);
  return {
    id: taxonDetail.id,
    name: taxonDetail.name ?? '',
    rank: taxonDetail.rank ?? '',
    common: taxonDetail.preferred_common_name ?? undefined,
    photo: taxonDetail.default_photo?.square_url ?? undefined,
    parent: parent?.id == null ? undefined : {id: parent.id, name: parent.name ?? '', rank: parent.rank ?? ''},
    children: (taxonDetail.children ?? []).flatMap(child => (child?.id == null ? [] : [{
      id: child.id,
      name: child.name ?? '',
      rank: child.rank ?? '',
      common: child.preferred_common_name ?? undefined,
      photo: child.default_photo?.square_url ?? undefined,
      observationsCount: child.observations_count ?? 0,
      isActive: child.is_active !== false,
    }])),
  };
}

export async function fetchBounds(taxon_id: number): Promise<Bounds | null> {
  const query = {
    taxon_id: [taxon_id],
    per_page: 0,
    return_bounds: 'true'
  };
  const response = await api.observations.observationsList(query);
  const totalBounds = (response.data as {total_bounds?: Partial<Bounds>}).total_bounds;
  if (
    totalBounds?.sw_latitude == null ||
    totalBounds.sw_longitude == null ||
    totalBounds.ne_latitude == null ||
    totalBounds.ne_longitude == null
  ) return null;
  return {
    sw_latitude: totalBounds.sw_latitude,
    sw_longitude: totalBounds.sw_longitude,
    ne_latitude: totalBounds.ne_latitude,
    ne_longitude: totalBounds.ne_longitude
  };
}
