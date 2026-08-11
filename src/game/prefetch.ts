// Warm the on-device image cache so the app works offline and a scan never
// lands on an empty frame.
//
// Deliberately gentle: an aggressive prefetch of the whole catalog cooked the
// phone. We only pre-cache the tiny teasers (a few KB each) plus the pieces you
// actually own, in small chunks with pauses, and only after the UI has settled.

import { Image } from 'expo-image';

import { ARTWORKS } from '@/data/artworks';
import { ARTWORK_IMAGES } from '@/data/images';
import { sizedUrl, IMG_CARD, IMG_DETAIL } from '@/game/images';

let warmed = false;

async function prefetchAll(urls: string[], chunk: number, pauseMs: number) {
  for (let i = 0; i < urls.length; i += chunk) {
    try {
      await Image.prefetch(urls.slice(i, i + chunk), { cachePolicy: 'disk' });
    } catch {
      // offline or a bad URL — skip; we'll try again next launch
    }
    await new Promise((r) => setTimeout(r, pauseMs));
  }
}

/**
 * Warm the pieces hanging in My Room at the exact size the wall renders them.
 * Without this, opening the room kicks off ten fresh downloads and the walls
 * come up blank; with it they're already on disk. Runs first and fast (at most
 * ROOM_MAX pieces), before the broader collection warm-up.
 */
export async function warmRoom(roomIds: string[]) {
  const urls: string[] = [];
  for (const id of roomIds) {
    const url = ARTWORK_IMAGES[id];
    if (url) urls.push(sizedUrl(url, IMG_DETAIL));
  }
  await prefetchAll(urls, 3, 120);
}

export async function warmImageCache(ownedIds: string[]) {
  if (warmed) return;
  warmed = true;

  // Let the first screens render before doing any background work.
  await new Promise((r) => setTimeout(r, 4000));

  // Only what you actually own needs downloading: undiscovered pieces render
  // from the baked mosaics, so they cost no network and no decoding at all.
  const ownedSet = new Set(ownedIds);
  const ownedCards: string[] = [];
  for (const a of ARTWORKS) {
    const url = ARTWORK_IMAGES[a.id];
    if (url && ownedSet.has(a.id)) ownedCards.push(sizedUrl(url, IMG_CARD));
  }
  await prefetchAll(ownedCards, 4, 400);
}

/**
 * Called right after a discovery so the reveal always has its image ready.
 * The reveal hero renders at IMG_DETAIL (900px), so we MUST warm that exact size —
 * prefetching only the 400px card left a new piece re-downloading at reveal time.
 * The detail size is requested first (it's what shows immediately); the card size
 * follows for the collection grid.
 */
export function prefetchArtwork(id: string) {
  const url = ARTWORK_IMAGES[id];
  if (!url) return;
  Image.prefetch([sizedUrl(url, IMG_DETAIL)], { cachePolicy: 'disk' }).catch(() => {});
  Image.prefetch([sizedUrl(url, IMG_CARD)], { cachePolicy: 'disk' }).catch(() => {});
}
