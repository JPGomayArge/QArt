// QR -> Artwork mapping.
//
// SECURITY / DESIGN NOTE:
// We NEVER navigate to whatever a QR code contains. We read the raw payload
// string, hash it, and reinterpret that hash into our own catalog. A malicious
// "https://evil.example" QR is harmless here: it just becomes a seed.
//
// RANDOMNESS MODEL (Pokémon-style):
//  - The QR decides the RARITY tier, and that tier changes every 15 days
//    (an "epoch"), so a code that gives a rare this fortnight may give a common
//    the next — keeping codes fresh.
//  - The SPECIFIC painting within that tier is drawn using the player's unique
//    seed (their device id, like a trainer ID). Two players scanning the same
//    code get different paintings; the same player gets a *new* one once the
//    epoch rolls over.
//  - A handful of codes are "special": they map to one exact artwork and sit
//    outside the lottery entirely (see special.ts).

import { ARTWORKS, ARTWORKS_BY_RARITY, ARTWORK_BY_ID, type Artwork } from '@/data/artworks';
import { RARITY_ORDER, type Rarity } from '@/game/rarity';
import { EXCLUSIVE_IDS, matchSpecial } from '@/game/special';

// --- Pure-JS SHA-256 (no native deps, works in Expo Go) -------------------

function rightRotate(value: number, amount: number): number {
  return (value >>> amount) | (value << (32 - amount));
}

export function sha256(ascii: string): string {
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  let result = '';

  const words: number[] = [];
  const asciiBitLength = ascii.length * 8;

  // Reusable state
  let hash: number[] = [];
  const k: number[] = [];
  let primeCounter = 0;

  const isComposite: Record<number, number> = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (let i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }

  ascii += '\x80';
  while ((ascii.length % 64) - 56) ascii += '\x00';
  for (let i = 0; i < ascii.length; i++) {
    const j = ascii.charCodeAt(i);
    if (j >> 8) return ''; // ASCII only guard (payloads are normalized upstream)
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words.length] = (asciiBitLength / maxWord) | 0;
  words[words.length] = asciiBitLength;

  for (let j = 0; j < words.length; ) {
    const w = words.slice(j, (j += 16));
    const oldHash = hash;
    hash = hash.slice(0, 8);

    for (let i = 0; i < 64; i++) {
      const w15 = w[i - 15];
      const w2 = w[i - 2];

      const a = hash[0];
      const e = hash[4];
      const temp1 =
        hash[7] +
        (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
        ((e & hash[5]) ^ (~e & hash[6])) +
        k[i] +
        (w[i] =
          i < 16
            ? w[i]
            : (w[i - 16] +
                (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
                w[i - 7] +
                (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) |
              0);

      const temp2 =
        (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
        ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));

      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }

    for (let i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }

  for (let i = 0; i < 8; i++) {
    for (let j = 3; j + 1; j--) {
      const b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? '0' : '') + b.toString(16);
    }
  }
  return result;
}

// --- Payload normalization -------------------------------------------------

// Collapse URL-like payloads to a canonical "root" so trivial variations of the
// SAME code don't count as new ones. We drop the scheme (http/https), a leading
// "www.", the query string (?…), the fragment (#…) and trailing slashes, and
// lowercase the host. This stops farming by appending ?1, #a, etc. — every such
// variant maps to one code (one cooldown, one painting). Different PATHS stay
// distinct (a real poster at /a is a different code than one at /b). Non-URL
// payloads fall through unchanged.
/**
 * Reduce a URL to its DOMAIN, dropping the path, query and fragment.
 *
 * Every link from the same site is therefore the same code: the thousands of
 * distinct instagram.com/p/… posters in the world all behave as one QR, sharing
 * one painting and one cooldown. Without this, anyone could mint unlimited
 * "new" codes just by changing the path.
 *
 * "www." is stripped so www.site.com and site.com match, and a leading "m." or
 * "mobile." too, since those are the same site on a phone.
 */
function canonicalUrl(s: string): string | null {
  const m = s.match(/^(?:[a-z][a-z0-9+.\-]*:\/\/)?((?:[a-z0-9\-]+\.)+[a-z]{2,})(?:[\/?#]|$)/i);
  if (!m) return null;
  return m[1].toLowerCase().replace(/^(?:www|m|mobile)\./, '');
}

// Normalize so visually-equal QRs map to the same artwork regardless of casing
// or trailing whitespace, and non-ASCII bytes still contribute deterministically.
export function normalizePayload(raw: string): string {
  const trimmed = (raw ?? '').trim();
  let s = (canonicalUrl(trimmed) ?? trimmed).toLowerCase();
  // Fold any non-ASCII to a stable ascii escape so sha256() stays ASCII-safe.
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    out += c < 128 ? s[i] : '_' + c.toString(16);
  }
  return out || '_empty';
}

// --- QR -> Artwork ---------------------------------------------------------

function hexSlice(hex: string, start: number, len: number): number {
  return parseInt(hex.slice(start, start + len), 16) >>> 0;
}

export type Drop = {
  artwork: Artwork;
  rarity: Rarity;
  seed: string;
  qrHash: string; // stable hash of the normalized payload (cooldown key)
};

// --- Epochs (biweekly rarity refresh) --------------------------------------

export const EPOCH_DAYS = 15;
const DAY_MS = 86_400_000;
const EPOCH_ANCHOR = Date.UTC(2025, 0, 1); // fixed reference point

/** Which 15-day epoch a moment falls in. Rarity mapping is stable within one. */
export function epochIndex(now: number = Date.now()): number {
  return Math.floor((now - EPOCH_ANCHOR) / (EPOCH_DAYS * DAY_MS));
}

// --- Special (exclusive) codes + lottery pools -----------------------------

// Artworks reachable ONLY via their dedicated QR — kept out of every draw.
export function isExclusive(id: string): boolean {
  return EXCLUSIVE_IDS.has(id);
}

/** Returns the artwork id a special code unlocks, or undefined for normal codes. */
export function specialArtworkId(raw: string): string | undefined {
  return matchSpecial(raw);
}

// Lottery pools = catalog minus exclusives, indexed by rarity.
const LOTTERY_BY_RARITY: Record<Rarity, Artwork[]> = RARITY_ORDER.reduce(
  (acc, r) => {
    acc[r] = (ARTWORKS_BY_RARITY[r] ?? []).filter((a) => !EXCLUSIVE_IDS.has(a.id));
    return acc;
  },
  {} as Record<Rarity, Artwork[]>
);

// --- QR -> Artwork ---------------------------------------------------------

export type QrOptions = {
  /** The player's unique seed (device id) — personalises which piece you draw. */
  userSeed?: string;
  /** How many times this code has already been scanned — each scan yields a
   *  DIFFERENT painting within the code's rarity. */
  scanIndex?: number;
  /** A per-scan random token so the SAME code gives a different painting of its
   *  rarity every time it's scanned. Omit for deterministic (e.g. previews). */
  nonce?: string;
  /** Override "now" for testing. */
  now?: number;
};

export function qrToArtwork(raw: string, opts: QrOptions = {}): Drop {
  const seed = normalizePayload(raw);
  const qrHash = sha256(seed) || sha256('_fallback' + seed.length);
  const epoch = epochIndex(opts.now);
  const userSeed = opts.userSeed ?? 'anon';
  const scanIndex = opts.scanIndex ?? 0;

  // 1) Rarity is a function of the code + the current epoch (refreshes every 15d).
  const hR = sha256(qrHash + '|r|' + epoch);
  const roll = hexSlice(hR, 0, 8) / 0xffffffff; // [0,1)
  let acc = 0;
  let tier: Rarity = 'common';
  for (const r of RARITY_ORDER) {
    acc += RARITY_WEIGHTS[r];
    if (roll < acc) {
      tier = r;
      break;
    }
  }

  // 2) The specific piece is drawn from the player's seed plus a per-scan nonce,
  //    so each scan of the same code gives a different painting of that tier
  //    (and two players get different pieces). Fall back to common if empty.
  let pool = LOTTERY_BY_RARITY[tier];
  if (!pool || pool.length === 0) {
    tier = 'common';
    pool = LOTTERY_BY_RARITY.common;
  }
  const hP = sha256(qrHash + '|p|' + scanIndex + '|' + (opts.nonce ?? '') + '|' + userSeed);
  const idx = hexSlice(hP, 0, 8) % pool.length;
  const artwork = pool[idx];

  return { artwork, rarity: artwork.rarity, seed, qrHash };
}

// Weights pulled once so we don't import the whole meta object in the hot path.
import { RARITY } from '@/game/rarity';
const RARITY_WEIGHTS: Record<Rarity, number> = {
  common: RARITY.common.weight,
  rare: RARITY.rare.weight,
  epic: RARITY.epic.weight,
  legendary: RARITY.legendary.weight,
  unique: RARITY.unique.weight,
};

// Booster draw: bias the odds toward a target rarity (multiplier), then draw an
// artwork. Higher tiers become much more likely but are never guaranteed.
export function boosterDrop(seed: string, targetRarity: Rarity, multiplier: number): Drop {
  const norm = normalizePayload(seed);
  const h = sha256(norm) || sha256('_fb' + norm.length);
  const weights: Record<Rarity, number> = { ...RARITY_WEIGHTS };
  weights[targetRarity] = weights[targetRarity] * multiplier;
  const total = RARITY_ORDER.reduce((s, r) => s + weights[r], 0);
  const roll = (hexSlice(h, 0, 8) / 0xffffffff) * total;
  let acc = 0;
  let tier: Rarity = 'common';
  for (const r of RARITY_ORDER) {
    acc += weights[r];
    if (roll < acc) {
      tier = r;
      break;
    }
  }
  // Boosters draw from the lottery pool too — exclusives stay QR-only.
  let pool = LOTTERY_BY_RARITY[tier];
  if (!pool || pool.length === 0) {
    tier = 'common';
    pool = LOTTERY_BY_RARITY.common;
  }
  const artwork = pool[hexSlice(h, 8, 8) % pool.length];
  return { artwork, rarity: artwork.rarity, seed: norm, qrHash: h };
}

// Collection crate pools: the catalog grouped by collection, minus exclusives
// (those stay QR-only, like the rarity lottery).
const LOTTERY_BY_COLLECTION: Record<string, Artwork[]> = ARTWORKS.reduce(
  (acc, a) => {
    if (isExclusive(a.id)) return acc;
    (acc[a.collectionId] ??= []).push(a);
    return acc;
  },
  {} as Record<string, Artwork[]>
);

// Collection crate: ALWAYS yields a piece from `collectionId`. Rarity is NOT
// biased — each piece is weighted only by its natural rarity weight, so a unique
// from that collection stays as rare as it should be. The guarantee is "from
// this collection", not "of any given tier".
export function collectionDrop(seed: string, collectionId: string): Drop {
  const norm = normalizePayload(seed);
  const h = sha256(norm) || sha256('_fb' + norm.length);
  let pool = LOTTERY_BY_COLLECTION[collectionId];
  if (!pool || pool.length === 0) pool = LOTTERY_BY_RARITY.common; // safety net
  const weights = pool.map((a) => RARITY_WEIGHTS[a.rarity]);
  const total = weights.reduce((s, w) => s + w, 0);
  const roll = (hexSlice(h, 0, 8) / 0xffffffff) * total;
  let acc = 0;
  let artwork = pool[0];
  for (let i = 0; i < pool.length; i++) {
    acc += weights[i];
    if (roll < acc) {
      artwork = pool[i];
      break;
    }
  }
  return { artwork, rarity: artwork.rarity, seed: norm, qrHash: h };
}

// Used by "Discover" for deterministic daily picks.
export function pickDaily<T>(list: T[], dayKey: string, salt: string): T {
  const h = sha256(normalizePayload(dayKey + '|' + salt));
  return list[hexSlice(h, 0, 8) % list.length];
}

export { ARTWORK_BY_ID };
