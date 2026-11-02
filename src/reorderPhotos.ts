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

/** One photo on an observation, keyed by its observation-photo UUID (the thing
 *  the reorder endpoint addresses), with its current position and a thumbnail. */
export interface ObsPhoto {
  uuid: string;
  url: string;
  position: number;
}

export interface ObsPhotos {
  obsUuid: string; // the observation's own UUID — required by the update body
  photos: ObsPhoto[]; // sorted by current position
}

/** Pull an observation id out of a raw id or an inaturalist.org URL. */
export function parseObsId(input: string): string {
  const m = input.trim().match(/observations\/(\d+)/);
  return m ? m[1]! : input.trim().replace(/\D/g, '');
}

/** Fetch an observation's photos: observation-photo UUID, position, thumbnail. */
export async function fetchPhotos(obsId: string): Promise<ObsPhotos> {
  const api = createApi();
  const obs = (await api.observations.observationsList({
    id: [obsId],
    fields: 'uuid,observation_photos.uuid,observation_photos.position,observation_photos.photo.url',
    per_page: 1,
  })).data.results[0];
  if (!obs) throw new Error(`No observation found for id ${obsId}`);

  const photos = (obs.observation_photos ?? [])
    .flatMap((op): ObsPhoto[] =>
      op.uuid ? [{uuid: op.uuid, url: _thumbnailUrl(op.photo?.url), position: op.position ?? 0}] : [])
    .sort((a, b) => a.position - b.position);

  return {obsUuid: obs.uuid, photos};
}

/**
 * Persist a new order by writing position 0..n-1 in the given UUID order.
 * Requires the user's API token (JWT from inaturalist.org/users/api_token).
 * Calls are serialized by the client's rate limiter.
 */
export async function saveOrder(obsUuid: string, orderedUuids: string[], token: string): Promise<void> {
  const api = createApi(token);
  for (let i = 0; i < orderedUuids.length; i++) {
    await api.observationPhotos.observationPhotosUpdate(orderedUuids[i]!, {
      observation_photo: {observation_id: obsUuid, position: i},
      fields: 'id',
    });
  }
}

/**
 * iNaturalist returns the 75px `square.jpg`; every photo is served at several
 * sizes under the same path. Swap the segment for a larger reorder preview.
 */
function _thumbnailUrl(squareUrl?: string | null, size = 'medium'): string {
  return squareUrl?.replace(/\/square(\.\w+)(\?|$)/, `/${size}$1$2`) ?? '';
}

if (import.meta.main) {
  const id = process.argv[2];
  if (!id) {
    throw new Error('usage: tsx src/reorderPhotos.ts <observationId|url>  (read-only: prints current photo order)');
  }
  console.log(JSON.stringify(await fetchPhotos(parseObsId(id)), null, 2));
}
