// Reveal sound effects. One classical-harp cue per rarity (grander the rarer),
// plus a soft tone for duplicates. Uses expo-audio.
//
// expo-audio ships a NATIVE module (present in Expo Go and in any build made
// AFTER the package was added, but NOT in an older dev client). We load it
// defensively: if the native side is missing, sound is silently disabled
// instead of crashing the screens that import this.
//
// Playback: we keep ONE pre-loaded ("warm") player ready per sound. Firing a
// cue plays the warm player — already decoded, so it starts instantly — and
// immediately mints a fresh replacement in the background for next time. This
// fixes the occasional lag where a just-created player had to decode the file
// before its first play (the "sometimes the sound arrives late" glitch), while
// still avoiding the busy-player problem of reusing a single instance. Swap the
// files in assets/sounds/ to customise — keep the names.

import AsyncStorage from '@react-native-async-storage/async-storage';

type PlayerLike = { play: () => void; seekTo?: (s: number) => void; remove?: () => void };

let createAudioPlayer: ((source: number) => PlayerLike) | null = null;
let setAudioModeAsync: ((mode: Record<string, unknown>) => Promise<void>) | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require('expo-audio');
  createAudioPlayer = mod.createAudioPlayer;
  setAudioModeAsync = mod.setAudioModeAsync;
} catch {
  createAudioPlayer = null; // native module not in this client — no sound
}

// Play even when the iOS ring switch is on silent, and mix with other audio.
try {
  setAudioModeAsync?.({ playsInSilentMode: true, interruptionMode: 'mixWithOthers' });
} catch {}

const SOURCES = {
  common: require('../../assets/sounds/common.wav'),
  rare: require('../../assets/sounds/rare.wav'),
  epic: require('../../assets/sounds/epic.wav'),
  legendary: require('../../assets/sounds/legendary.wav'),
  unique: require('../../assets/sounds/unique.wav'),
  dupe: require('../../assets/sounds/dupe.wav'),
} as const;

type Key = keyof typeof SOURCES;
// rarityRank: 0 common · 1 rare · 2 epic · 3 legendary · 4 unique
const BY_RANK: Key[] = ['common', 'rare', 'epic', 'legendary', 'unique'];

let enabled = true;

// Hold strong references to in-flight players so JS GC can't collect them
// mid-playback; each is dropped shortly after its cue would have ended.
const inFlight = new Set<PlayerLike>();

// One decoded-and-ready player per sound, so the next play starts with no lag.
const warm = new Map<Key, PlayerLike>();

function mint(key: Key): PlayerLike | null {
  if (!createAudioPlayer) return null;
  try {
    return createAudioPlayer(SOURCES[key]);
  } catch {
    return null;
  }
}

/** Pre-create (and thus pre-load) a player for every sound. Safe to call twice. */
export function warmSounds() {
  if (!createAudioPlayer) return;
  for (const key of SOUND_KEYS) {
    if (!warm.has(key)) {
      const p = mint(key);
      if (p) warm.set(key, p);
    }
  }
}

function fire(key: Key) {
  if (!createAudioPlayer) return;
  try {
    // Prefer the warm, already-decoded player; fall back to a fresh one.
    const p = warm.get(key) ?? mint(key);
    if (!p) return;
    warm.delete(key);
    // Mint the next replacement now so it has time to load before the next cue.
    setTimeout(() => {
      if (!warm.has(key)) {
        const next = mint(key);
        if (next) warm.set(key, next);
      }
    }, 0);
    inFlight.add(p);
    try {
      p.seekTo?.(0);
    } catch {}
    p.play();
    setTimeout(() => {
      inFlight.delete(p);
      try {
        p.remove?.();
      } catch {}
    }, 6000); // longest cue (unique) is ~4.4s + reverb tail
  } catch {
    // audio is best-effort; never let it break a reveal
  }
}

/** Play the chime for a reveal. `rank` is rarityRank; dupes get a soft tone. */
export function playReveal(rank: number, isNew: boolean) {
  if (!enabled) return;
  fire(!isNew ? 'dupe' : BY_RANK[Math.max(0, Math.min(rank, 4))] ?? 'common');
}

// Ordered list of every sound, for a preview board in Settings.
export const SOUND_KEYS = ['common', 'rare', 'epic', 'legendary', 'unique', 'dupe'] as const;
export type SoundKey = (typeof SOUND_KEYS)[number];

/** Play one specific sound on demand — always audible (ignores the mute toggle). */
export function previewSound(key: SoundKey) {
  fire(key);
}

export function isSoundEnabled() {
  return enabled;
}

export async function setSoundEnabled(v: boolean) {
  enabled = v;
  try {
    await AsyncStorage.setItem('qart.sound.v1', v ? '1' : '0');
  } catch {}
}

/** Restore the saved preference. Returns the effective value. */
export async function loadSoundPref() {
  try {
    const v = await AsyncStorage.getItem('qart.sound.v1');
    if (v === '0') enabled = false;
  } catch {}
  return enabled;
}

// Load the saved mute state as soon as the module is first imported.
loadSoundPref();
// Pre-warm every cue at startup so the first scan plays with no decode lag.
warmSounds();
