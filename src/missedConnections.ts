import {createApi} from './api/client.ts';

declare global {
  interface ImportMeta {
    /** True when this module is the process entry point (set by Node/tsx). */
    readonly main: boolean;
  }
}

/** Minimal Node ambient: this vite project omits @types/node, but the CLI
 *  entry point at the bottom runs under tsx and needs argv. */
declare const process: {argv: readonly string[]};

const DEFAULT_RADIUS_KM = 5; // "look around" distance
const DEFAULT_LIMIT = 30; // top N missed species

/** A species reported close by this month that the user has never recorded —
 *  one they keep just missing. */
export interface Missed {
  id: number;
  name: string; // scientific
  common?: string;
  photo?: string; // square thumbnail
  iconic?: string; // iconic taxon slug, e.g. "Aves"
  count: number; // reports within the radius this month
}

/** What's being seen right around you now that you haven't — go find it. */
export interface MissedConnections {
  month: number; // 1-12
  radiusKm: number;
  species: Missed[]; // most-reported first
}

/**
 * The species most reported within a small radius of a location in the current
 * month that the user has *never* recorded — the ones they keep crossing paths
 * with but missing. A single `species_counts` call does it: scope by
 * `lat`/`lng`/`radius`/`month`, keep only taxa `unobserved_by_user_id`, and the
 * server already returns them most-reported first.
 */
export async function main(
  userLogin: string,
  lat: number,
  lng: number,
  radiusKm = DEFAULT_RADIUS_KM,
  limit = DEFAULT_LIMIT,
  month = new Date().getMonth() + 1,
): Promise<MissedConnections> {
  const api = createApi();
  const rows = (await api.observations.speciesCountsList({
    lat,
    lng,
    radius: radiusKm,
    unobserved_by_user_id: userLogin,
    month: [month],
    rank: ['species'],
    per_page: limit,
    fields: 'count,taxon.id,taxon.name,taxon.preferred_common_name,taxon.default_photo.square_url,taxon.iconic_taxon_name',
  })).data.results;

  const species = rows.flatMap((r): Missed[] => {
    const taxon = r.taxon;
    if (taxon?.id == null) return [];
    return [{
      id: taxon.id,
      name: taxon.name ?? '',
      common: taxon.preferred_common_name ?? undefined,
      photo: taxon.default_photo?.square_url ?? undefined,
      iconic: taxon.iconic_taxon_name ?? undefined,
      count: r.count ?? 0,
    }];
  });

  return {month, radiusKm, species};
}

if (import.meta.main) {
  const [userLogin, lat, lng, radius] = process.argv.slice(2);
  if (!userLogin || !lat || !lng) {
    throw new Error('usage: tsx src/missedConnections.ts <userLogin> <lat> <lng> [radiusKm]');
  }
  console.log(JSON.stringify(
    await main(userLogin, Number(lat), Number(lng), radius ? Number(radius) : undefined),
    null, 2,
  ));
}
