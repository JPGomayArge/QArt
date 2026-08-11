// Offline-first game state, persisted to AsyncStorage.
// Tracks the player's collection, duplicate counts, booster shards and stats.

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { ARTWORK_BY_ID, ARTWORKS, type Artwork } from '@/data/artworks';
import { qrToArtwork, boosterDrop, collectionDrop, sha256, normalizePayload, specialArtworkId } from '@/game/hash';
import { matchesFinale } from '@/game/special';
import { RARITY, type Rarity } from '@/game/rarity';
import { PAINTINGS, isPaintingComplete, FINALE_ID, FINALE_COLLECTION } from '@/game/parts';
import {
  BOOSTERS,
  SKINS,
  DEFAULT_SKIN,
  FRAMES,
  FRAME_BY_ID,
  DEFAULT_FRAME,
  ARTWORK_PRICE,
  COLLECTION_BOOSTER_COST,
  RESET_COOLDOWN_COST,
  SCAN_UPGRADE_STEP,
  MAX_SCAN_UPGRADES,
  hasUnlimitedScans,
  STARTER_SHARDS,
  scanUpgradePrice,
} from '@/game/shop';

const STORAGE_KEY = 'arthunt.save.v1';
export const ROOM_MAX = 10; // max pieces on the private wall in My Room
export const BOOSTER_COST = 20; // shards needed to open a booster
// Scans/day when the limit is enabled. The tutorial gifts exactly the shards for
// the first upgrade, so a new player effectively starts the game at 30.
export const DAILY_SCAN_LIMIT = 25;
const DAY_MS = 24 * 60 * 60 * 1000;
export const MAX_COOLDOWN_DAYS = 7;
// Cooldown grows as a code is re-scanned, but gently: it climbs one day every
// TWO scans and stops at a week. The old 1-per-scan climb to 14 days meant a
// code yielded ~11 scans in two months; this gives ~16, which matters far more
// than the daily cap for a player who only meets a handful of codes a day.
export const cooldownDaysFor = (scans: number) =>
  Math.min(MAX_COOLDOWN_DAYS, Math.max(1, Math.ceil(scans / 2)));

// Fragments granted the first time a piece is discovered. Duplicates alone used
// to be the only source, which made shards scarcest exactly when a new player
// needed them most.
export const DISCOVERY_REWARD: Record<Rarity, number> = {
  common: 3,
  rare: 8,
  epic: 15,
  legendary: 40,
  unique: 100,
};

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

type OwnedEntry = { count: number; firstSeen: number };

type SaveData = {
  version: 1;
  deviceId: string;
  owned: Record<string, OwnedEntry>;
  shards: number;
  totalScans: number;
  totalTrades: number;
  boostersOpened: number;
  // Gift nonces already received, so a gift QR can't be scanned twice here.
  consumedGifts: Record<string, true>;
  // Preferred unit for painting dimensions
  unit: 'cm' | 'in';
  // My Room: scale hung pieces by their real-world dimensions
  scaleReal: boolean;
  // First-run safety acknowledgement
  safetyAck: boolean;
  // Daily scan limit
  dailyLimitEnabled: boolean;
  scanDay: string;
  scanCountToday: number;
  // Per-code cooldown: a given QR can only be scanned once every 24h.
  qrCooldownEnabled: boolean;
  scanCooldowns: Record<string, number>; // qrHash -> last scan (ms)
  scanCounts: Record<string, number>; // qrHash -> times scanned (drives escalation + which piece)
  // Permanent daily-scan-limit upgrades bought in the shop.
  scanUpgrades: number;
  // Favorites (artwork ids the player starred)
  favorites: Record<string, true>;
  // My Room: an ordered, curated wall of up to ROOM_MAX favorited pieces.
  room: string[];
  // Per-piece frame override in My Room (artworkId -> frameId). Falls back to the
  // active frame when unset. The room *skin* stays universal.
  roomFrames: Record<string, string>;
  // The "main exhibit" piece of the room (artworkId). Empty = default to first.
  roomHero: string;
  // Cosmetics for the favorites room
  ownedSkins: Record<string, true>;
  activeSkin: string;
  ownedFrames: Record<string, true>;
  activeFrame: string;
  // One-time migration marker: paid frames used to be free (all owned). We reset
  // ownership once so the priced frames become purchasable again.
  framesReset?: boolean;
  // Shown once, the moment the 300 are complete: congratulates the player and
  // points them at the hidden 301st piece.
  finaleSeen?: boolean;
  // First-run walkthrough (what a QR becomes, rarity, shards, your room).
  tutorialSeen?: boolean;
  /** Dev only: let the finale code work without holding all 300. */
  devFinaleAnytime?: boolean;
};

export type DiscoverResult = {
  artwork: Artwork;
  rarity: Rarity;
  isNew: boolean;
  count: number;
  duplicate: boolean;
};

// A scan can succeed, hit the daily limit, or hit a specific code's cooldown.
export type ScanOutcome =
  | { ok: true; result: DiscoverResult; special: boolean }
  | { ok: false; reason: 'limit' | 'cooldown'; retryAt?: number };

type GameContextValue = {
  ready: boolean;
  deviceId: string;
  owned: Record<string, OwnedEntry>;
  shards: number;
  totalScans: number;
  totalTrades: number;
  boostersOpened: number;
  // safety + limits
  safetyAck: boolean;
  dailyLimitEnabled: boolean;
  qrCooldownEnabled: boolean;
  scanLimit: number; // effective daily cap (base + upgrades)
  scansToday: number;
  canScan: boolean;
  scanUpgrades: number;
  nextScanUpgradeCost: number;
  resetCooldownCost: number;
  cooldownsActive: number; // codes currently on cooldown
  /** Developer view: raw per-code cooldown timestamps and scan counts. */
  scanCooldowns: Record<string, number>;
  scanCounts: Record<string, number>;
  /** Developer: clear the cooldown on a single code. */
  devClearCooldown: (qrHash: string) => void;
  favorites: Record<string, true>;
  room: string[];
  roomFrames: Record<string, string>;
  roomHero: string;
  ownedSkins: Record<string, true>;
  activeSkin: string;
  ownedFrames: Record<string, true>;
  activeFrame: string;
  /** Whether the "you completed the 300" message has already been shown. */
  finaleSeen: boolean;
  // queries
  isOwned: (id: string) => boolean;
  countOf: (id: string) => number;
  spareOf: (id: string) => number; // count - 1
  isFavorite: (id: string) => boolean;
  isInRoom: (id: string) => boolean;
  // mutations
  scanQr: (raw: string) => ScanOutcome;
  openBooster: (rarity: Rarity) => DiscoverResult | null; // null if not enough shards
  openCollectionBooster: (collectionId: string) => DiscoverResult | null; // guarantees a piece from that collection
  convertSpareToShards: (id: string) => number; // returns shards gained (0 if none)
  giveArtwork: (id: string) => boolean; // decrement one spare (producing a trade QR)
  receiveArtwork: (id: string, giftNonce?: string) => DiscoverResult | null;
  toggleFavorite: (id: string) => void;
  toggleRoom: (id: string) => void; // add/remove a favorited piece from the wall (max ROOM_MAX)
  setPieceFrame: (id: string, frameId: string) => void; // per-piece frame in My Room
  setRoomHero: (id: string) => void; // pick the room's main exhibit (toggles off if same)
  buySkin: (id: string) => boolean;
  setActiveSkin: (id: string) => void;
  markFinaleSeen: () => void;
  /** First-run walkthrough. */
  tutorialSeen: boolean;
  markTutorialSeen: () => void;
  /** Developer: show the first-run walkthrough again. */
  replayTutorial: () => void;
  buyFrame: (id: string) => boolean;
  setActiveFrame: (id: string) => void;
  /** Buy a specific artwork with shards (Painting of the Day). */
  buyArtwork: (id: string) => DiscoverResult | null;
  /** Shop: clear all QR cooldowns (costs shards). Returns false if it can't. */
  resetCooldowns: () => boolean;
  /** Shop: buy a permanent +scans/day upgrade. Returns false if not enough shards. */
  upgradeScanLimit: () => boolean;
  /** Developer only: grant or revoke a piece to test flows quickly. */
  devToggleOwned: (id: string) => void;
  /** Dev: grant or revoke all 300 paintings (every fragment), finale excluded. */
  devSetAllOwned: (owned: boolean) => void;
  devFinaleAnytime: boolean;
  devToggleFinaleAnytime: () => void;
  devAddShards: (n: number) => void;
  /** Grant shards (e.g. a silent thank-you after an in-app tip). Persisted. */
  addShards: (n: number) => void;
  acknowledgeSafety: () => void;
  setDailyLimitEnabled: (v: boolean) => void;
  setQrCooldownEnabled: (v: boolean) => void;
  /** Preferred unit for painting dimensions (cm or inches). */
  unit: 'cm' | 'in';
  setUnit: (u: 'cm' | 'in') => void;
  /** My Room: scale pieces to their real relative sizes. */
  scaleReal: boolean;
  setScaleReal: (v: boolean) => void;
  resetAll: () => void;
};

const GameContext = createContext<GameContextValue | null>(null);

function newDeviceId(): string {
  return sha256(normalizePayload('dev' + Date.now() + Math.random())).slice(0, 12);
}

function emptySave(): SaveData {
  return {
    version: 1,
    deviceId: newDeviceId(),
    owned: {},
    shards: STARTER_SHARDS, // enough for the first (very cheap) scan upgrade — a shop tutorial
    totalScans: 0,
    totalTrades: 0,
    boostersOpened: 0,
    consumedGifts: {},
    safetyAck: false,
    dailyLimitEnabled: true, // ON for production; toggle off in Settings ▸ Developer while testing
    scanDay: today(),
    scanCountToday: 0,
    qrCooldownEnabled: true, // real mechanic: a code can't be farmed
    scanCooldowns: {},
    scanCounts: {},
    scanUpgrades: 0,
    favorites: {},
    room: [],
    roomFrames: {},
    roomHero: '',
    ownedSkins: { [DEFAULT_SKIN]: true },
    activeSkin: DEFAULT_SKIN,
    ownedFrames: Object.fromEntries(FRAMES.filter((f) => f.cost === 0).map((f) => [f.id, true])),
    activeFrame: DEFAULT_FRAME,
    framesReset: true, // fresh saves already start with only the free frames owned
    finaleSeen: false,
    tutorialSeen: false,
    devFinaleAnytime: false,
    unit: 'cm',
    scaleReal: false,
  };
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [save, setSave] = useState<SaveData>(emptySave);
  const [ready, setReady] = useState(false);
  const boosterCounter = useRef(0);
  // Always-fresh mirror of `save`. Scan checks (cooldown, daily limit) read this
  // instead of the render closure so rapid consecutive scans see the latest
  // counts immediately — otherwise a fast re-scan could slip past the cooldown.
  const saveRef = useRef(save);
  useEffect(() => {
    saveRef.current = save;
  }, [save]);

  // Load once.
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw && alive) {
          const parsed = JSON.parse(raw) as SaveData;
          if (parsed && parsed.version === 1) {
            const merged = { ...emptySave(), ...parsed };
            // Drop entries for artworks that no longer exist (ids get renamed
            // when the catalog is curated). Otherwise stale duplicates would be
            // counted in the stats but never appear in Trade.
            merged.owned = Object.fromEntries(
              Object.entries(merged.owned ?? {}).filter(([id]) => ARTWORK_BY_ID[id])
            );
            merged.favorites = Object.fromEntries(
              Object.entries(merged.favorites ?? {}).filter(([id]) => ARTWORK_BY_ID[id])
            );
            // The room can only hold existing, still-favorited pieces (capped).
            merged.room = (merged.room ?? [])
              .filter((id) => ARTWORK_BY_ID[id] && merged.favorites[id])
              .slice(0, ROOM_MAX);
            // The main exhibit must still be on the wall, else clear it.
            if (merged.roomHero && !merged.room.includes(merged.roomHero)) merged.roomHero = '';
            // One-time: frames used to be free (older saves own them all). Reset
            // ownership to just the currently-free frames so the priced ones are
            // purchasable. Runs once, then the flag persists so real purchases stick.
            if (!merged.framesReset) {
              merged.ownedFrames = Object.fromEntries(
                Object.entries(merged.ownedFrames ?? {}).filter(([id]) => FRAME_BY_ID[id]?.cost === 0)
              );
              if (!merged.ownedFrames[merged.activeFrame]) merged.activeFrame = DEFAULT_FRAME;
              merged.framesReset = true;
            }
            setSave(merged);
          }
        }
      } catch {
        // corrupt save -> start fresh, keep going
      } finally {
        if (alive) setReady(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Persist on change (after initial load).
  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(save)).catch(() => {});
  }, [save, ready]);

  const recordDrop = useCallback(
    (
      artwork: Artwork,
      opts: {
        incScan?: boolean;
        incTrade?: boolean;
        incBooster?: boolean;
        cooldownKey?: string; // stamp this code's last-scan time in the same update
        giftNonce?: string; // mark this gift as consumed so it can't be re-scanned
      } = {}
    ) => {
      // Compute the outcome from the always-fresh mirror. React does NOT guarantee
      // the setSave updater runs synchronously, so deriving `result` inside it and
      // returning it afterwards was racy — that's why boosters sometimes reported a
      // duplicate as brand-new. The mirror is kept in sync at the end of every update.
      const mirror = saveRef.current;
      const curMirror = mirror.owned[artwork.id];
      const isNewNow = !curMirror;
      const result: DiscoverResult = {
        artwork,
        rarity: artwork.rarity,
        isNew: isNewNow,
        count: (curMirror?.count ?? 0) + 1,
        duplicate: !isNewNow,
      };
      setSave((prev) => {
        const cur = prev.owned[artwork.id];
        const count = (cur?.count ?? 0) + 1;
        // Roll the daily scan counter over at midnight, then increment on scans.
        const day = today();
        const sameDay = prev.scanDay === day;
        const scanCountToday = opts.incScan
          ? (sameDay ? prev.scanCountToday : 0) + 1
          : sameDay
            ? prev.scanCountToday
            : 0;
        const scanCooldowns = opts.cooldownKey
          ? { ...prev.scanCooldowns, [opts.cooldownKey]: Date.now() }
          : prev.scanCooldowns;
        const scanCounts = opts.cooldownKey
          ? { ...prev.scanCounts, [opts.cooldownKey]: (prev.scanCounts[opts.cooldownKey] ?? 0) + 1 }
          : prev.scanCounts;
        const consumedGifts = opts.giftNonce
          ? { ...prev.consumedGifts, [opts.giftNonce]: true as const }
          : prev.consumedGifts;
        // A brand-new piece pays a small finder's fee, so shards flow from the
        // very first days instead of only once duplicates start piling up.
        const discovery = !cur ? DISCOVERY_REWARD[artwork.rarity] ?? 0 : 0;
        const next = {
          ...prev,
          shards: prev.shards + discovery,
          owned: {
            ...prev.owned,
            [artwork.id]: { count, firstSeen: cur?.firstSeen ?? Date.now() },
          },
          totalScans: prev.totalScans + (opts.incScan ? 1 : 0),
          totalTrades: prev.totalTrades + (opts.incTrade ? 1 : 0),
          boostersOpened: prev.boostersOpened + (opts.incBooster ? 1 : 0),
          scanDay: day,
          scanCountToday,
          scanCooldowns,
          scanCounts,
          consumedGifts,
        };
        // Keep the mirror in sync synchronously so the very next scan (before
        // React re-renders) already sees this code's updated count + timestamp.
        saveRef.current = next;
        return next;
      });
      return result;
    },
    []
  );

  // Effective daily cap = base + permanent upgrades bought in the shop.
  const effectiveScanLimit = hasUnlimitedScans(save.scanUpgrades)
    ? Infinity
    : DAILY_SCAN_LIMIT + save.scanUpgrades * SCAN_UPGRADE_STEP;
  // How many scans have been used today (0 after a day rollover).
  const scansToday = save.scanDay === today() ? save.scanCountToday : 0;
  const canScan = !save.dailyLimitEnabled || scansToday < effectiveScanLimit;

  const scanQr = useCallback(
    (raw: string): ScanOutcome => {
      const s = saveRef.current; // always-fresh, even between renders
      const qrHash = sha256(normalizePayload(raw)) || sha256('_fb' + raw.length);
      const count = s.scanCounts[qrHash] ?? 0;

      // The 301st piece: its code is only meaningful to a player who already
      // holds all 300. For anyone else it stays an ordinary code and falls
      // through to the lottery below, so the ending can't be stumbled upon.
      //
      // It is checked BEFORE the daily cap and the anti-farm cooldown, and is
      // exempt from both: the ending must never answer "come back tomorrow".
      // Without this, a player who had already scanned that code once (as an
      // ordinary code, before completing the 300) would be locked out of the
      // finale for up to a week.
      if (
        matchesFinale(raw) &&
        ARTWORK_BY_ID[FINALE_ID] &&
        (s.devFinaleAnytime || PAINTINGS.every((p) => isPaintingComplete(p, s.owned)))
      ) {
        const result = recordDrop(ARTWORK_BY_ID[FINALE_ID], { incScan: true, cooldownKey: qrHash });
        return { ok: true, result, special: true };
      }

      const usedToday = s.scanDay === today() ? s.scanCountToday : 0;
      const limit = hasUnlimitedScans(s.scanUpgrades)
        ? Infinity
        : DAILY_SCAN_LIMIT + s.scanUpgrades * SCAN_UPGRADE_STEP;
      if (s.dailyLimitEnabled && usedToday >= limit) {
        return { ok: false, reason: 'limit' };
      }

      // Escalating anti-farm cooldown: 1 day after the first scan, 2 after the
      // second… up to 14. `count` = how many times this code has been scanned.
      if (s.qrCooldownEnabled && count > 0) {
        const last = s.scanCooldowns[qrHash] ?? 0;
        // The final upgrade halves every cooldown on top of lifting the daily cap.
        const factor = hasUnlimitedScans(s.scanUpgrades) ? 0.5 : 1;
        const windowMs = cooldownDaysFor(count) * DAY_MS * factor;
        if (last && Date.now() - last < windowMs) {
          return { ok: false, reason: 'cooldown', retryAt: last + windowMs };
        }
      }

      // Special codes unlock one exact piece, outside the lottery.
      const specialId = specialArtworkId(raw);
      if (specialId && ARTWORK_BY_ID[specialId]) {
        const result = recordDrop(ARTWORK_BY_ID[specialId], { incScan: true, cooldownKey: qrHash });
        return { ok: true, result, special: true };
      }

      // Normal lottery: rarity by epoch, and a DIFFERENT piece each re-scan
      // (per-scan random nonce so the same code never repeats its painting).
      const drop = qrToArtwork(raw, {
        userSeed: s.deviceId,
        scanIndex: count,
        nonce: `${Date.now()}:${Math.random()}`,
      });
      const result = recordDrop(drop.artwork, { incScan: true, cooldownKey: qrHash });
      return { ok: true, result, special: false };
    },
    [
      recordDrop,
      save.dailyLimitEnabled,
      save.scanDay,
      save.scanCountToday,
      save.qrCooldownEnabled,
      save.scanCooldowns,
      save.scanCounts,
      save.deviceId,
      save.scanUpgrades,
    ]
  );

  const toggleFavorite = useCallback((id: string) => {
    setSave((prev) => {
      const favorites = { ...prev.favorites };
      let room = prev.room;
      let roomHero = prev.roomHero;
      if (favorites[id]) {
        delete favorites[id];
        room = prev.room.filter((x) => x !== id); // un-favoriting also takes it off the wall
        if (roomHero === id) roomHero = '';
      } else {
        // Only fully-collected pieces can be favorited — so a half-assembled
        // multi-part work never hangs "complete" on the wall.
        const art = ARTWORK_BY_ID[id];
        if (!art || !isPaintingComplete(art, prev.owned)) return prev;
        favorites[id] = true;
      }
      return { ...prev, favorites, room, roomHero };
    });
  }, []);

  // Add/remove a favorited piece from the private wall (max ROOM_MAX). Only
  // favorited pieces are eligible.
  const toggleRoom = useCallback((id: string) => {
    setSave((prev) => {
      if (prev.room.includes(id)) {
        return {
          ...prev,
          room: prev.room.filter((x) => x !== id),
          roomHero: prev.roomHero === id ? '' : prev.roomHero, // removing the main exhibit clears it
        };
      }
      if (!prev.favorites[id] || prev.room.length >= ROOM_MAX) return prev; // ineligible or full
      return { ...prev, room: [...prev.room, id] };
    });
  }, []);

  const setPieceFrame = useCallback((id: string, frameId: string) => {
    setSave((prev) => ({ ...prev, roomFrames: { ...prev.roomFrames, [id]: frameId } }));
  }, []);

  // Pick (or clear, if re-tapped) the room's main exhibit. Must be on the wall.
  const setRoomHero = useCallback((id: string) => {
    setSave((prev) => {
      if (!prev.room.includes(id)) return prev;
      return { ...prev, roomHero: prev.roomHero === id ? '' : id };
    });
  }, []);

  const acknowledgeSafety = useCallback(
    () => setSave((prev) => ({ ...prev, safetyAck: true })),
    []
  );

  const setDailyLimitEnabled = useCallback(
    (v: boolean) => setSave((prev) => ({ ...prev, dailyLimitEnabled: v })),
    []
  );

  const setQrCooldownEnabled = useCallback(
    (v: boolean) => setSave((prev) => ({ ...prev, qrCooldownEnabled: v })),
    []
  );

  const setUnit = useCallback(
    (u: 'cm' | 'in') => setSave((prev) => ({ ...prev, unit: u })),
    []
  );

  const setScaleReal = useCallback(
    (v: boolean) => setSave((prev) => ({ ...prev, scaleReal: v })),
    []
  );

  // Shop: clear every QR cooldown AND reset escalation, so codes are fresh again.
  const resetCooldowns = useCallback((): boolean => {
    // Decide + clear against the always-fresh mirror. scanQr reads saveRef.current
    // for its cooldown check, so if we only updated React state the just-cleared
    // codes would still register as "resting" until the next render — which is why
    // some codes kept asking you to wait right after paying to reset.
    const s = saveRef.current;
    if (s.shards < RESET_COOLDOWN_COST || Object.keys(s.scanCooldowns).length === 0) return false;
    saveRef.current = { ...s, shards: s.shards - RESET_COOLDOWN_COST, scanCooldowns: {}, scanCounts: {} };
    setSave((prev) => ({ ...prev, shards: prev.shards - RESET_COOLDOWN_COST, scanCooldowns: {}, scanCounts: {} }));
    return true;
  }, []);

  // Shop: permanent +5/day scan-limit upgrade; price climbs with each purchase.
  const upgradeScanLimit = useCallback((): boolean => {
    let ok = false;
    setSave((prev) => {
      if (prev.scanUpgrades >= MAX_SCAN_UPGRADES) return prev; // daily ceiling reached
      const price = scanUpgradePrice(prev.scanUpgrades);
      if (prev.shards < price) return prev;
      ok = true;
      return { ...prev, shards: prev.shards - price, scanUpgrades: prev.scanUpgrades + 1 };
    });
    return ok;
  }, []);

  const openBooster = useCallback(
    (rarity: Rarity): DiscoverResult | null => {
      const def = BOOSTERS.find((b) => b.rarity === rarity);
      // Read the always-fresh mirror, not the render closure — otherwise two quick
      // buys could see stale shards and this returned null, so no reveal appeared.
      const s = saveRef.current;
      if (!def || s.shards < def.cost) return null;
      boosterCounter.current += 1;
      const seed = 'booster|' + rarity + '|' + s.deviceId + '|' + Date.now() + '|' + boosterCounter.current;
      const drop = boosterDrop(seed, rarity, def.multiplier);
      saveRef.current = { ...s, shards: Math.max(0, s.shards - def.cost) };
      setSave((prev) => ({ ...prev, shards: Math.max(0, prev.shards - def.cost) }));
      return recordDrop(drop.artwork, { incBooster: true });
    },
    [recordDrop]
  );

  const openCollectionBooster = useCallback(
    (collectionId: string): DiscoverResult | null => {
      const s = saveRef.current;
      if (s.shards < COLLECTION_BOOSTER_COST) return null;
      boosterCounter.current += 1;
      const seed = 'colbooster|' + collectionId + '|' + s.deviceId + '|' + Date.now() + '|' + boosterCounter.current;
      const drop = collectionDrop(seed, collectionId);
      saveRef.current = { ...s, shards: Math.max(0, s.shards - COLLECTION_BOOSTER_COST) };
      setSave((prev) => ({ ...prev, shards: Math.max(0, prev.shards - COLLECTION_BOOSTER_COST) }));
      return recordDrop(drop.artwork, { incBooster: true });
    },
    [recordDrop]
  );

  const buySkin = useCallback((id: string): boolean => {
    const def = SKINS.find((s) => s.id === id);
    if (!def) return false;
    let ok = false;
    setSave((prev) => {
      if (prev.ownedSkins[id]) return prev;
      if (prev.shards < def.cost) return prev;
      ok = true;
      return {
        ...prev,
        shards: prev.shards - def.cost,
        ownedSkins: { ...prev.ownedSkins, [id]: true },
        activeSkin: id, // equip on purchase
      };
    });
    return ok;
  }, []);

  const setActiveSkin = useCallback((id: string) => {
    setSave((prev) => (prev.ownedSkins[id] ? { ...prev, activeSkin: id } : prev));
  }, []);

  const markTutorialSeen = useCallback(() => {
    setSave((prev) => (prev.tutorialSeen ? prev : { ...prev, tutorialSeen: true }));
  }, []);

  const replayTutorial = useCallback(() => {
    setSave((prev) => ({ ...prev, tutorialSeen: false }));
  }, []);

  const markFinaleSeen = useCallback(() => {
    setSave((prev) => (prev.finaleSeen ? prev : { ...prev, finaleSeen: true }));
  }, []);

  const buyFrame = useCallback((id: string): boolean => {
    const def = FRAMES.find((f) => f.id === id);
    if (!def) return false;
    let ok = false;
    setSave((prev) => {
      if (prev.ownedFrames[id]) return prev;
      if (prev.shards < def.cost) return prev;
      ok = true;
      return {
        ...prev,
        shards: prev.shards - def.cost,
        ownedFrames: { ...prev.ownedFrames, [id]: true },
        activeFrame: id,
      };
    });
    return ok;
  }, []);

  const buyArtwork = useCallback(
    (id: string): DiscoverResult | null => {
      const art = ARTWORK_BY_ID[id];
      if (!art) return null;
      const price = ARTWORK_PRICE[art.rarity];
      if (save.shards < price) return null;
      setSave((prev) => ({ ...prev, shards: Math.max(0, prev.shards - price) }));
      return recordDrop(art, {});
    },
    [save.shards, recordDrop]
  );

  const setActiveFrame = useCallback((id: string) => {
    setSave((prev) => (prev.ownedFrames[id] ? { ...prev, activeFrame: id } : prev));
  }, []);

  const convertSpareToShards = useCallback((id: string): number => {
    const art = ARTWORK_BY_ID[id];
    if (!art) return 0;
    let gained = 0;
    setSave((prev) => {
      const cur = prev.owned[id];
      if (!cur || cur.count <= 1) return prev;
      gained = RARITY[art.rarity].tradeValue;
      return {
        ...prev,
        owned: { ...prev.owned, [id]: { ...cur, count: cur.count - 1 } },
        shards: prev.shards + gained,
      };
    });
    return gained;
  }, []);

  const giveArtwork = useCallback((id: string): boolean => {
    let ok = false;
    setSave((prev) => {
      const cur = prev.owned[id];
      if (!cur || cur.count <= 1) return prev;
      ok = true;
      return {
        ...prev,
        owned: { ...prev.owned, [id]: { ...cur, count: cur.count - 1 } },
        totalTrades: prev.totalTrades + 1,
      };
    });
    return ok;
  }, []);

  const receiveArtwork = useCallback(
    (id: string, giftNonce?: string): DiscoverResult | null => {
      const art = ARTWORK_BY_ID[id];
      if (!art) return null;
      // A gift QR is single-use on this device — you can't scan it again to farm copies.
      if (giftNonce && save.consumedGifts[giftNonce]) return null;
      return recordDrop(art, { incTrade: true, giftNonce });
    },
    [recordDrop, save.consumedGifts]
  );

  // Developer helper: add/remove a piece without scanning, for testing.
  const devClearCooldown = useCallback((qrHash: string) => {
    setSave((prev) => {
      if (!prev.scanCooldowns[qrHash]) return prev;
      const next = { ...prev.scanCooldowns };
      delete next[qrHash];
      return { ...prev, scanCooldowns: next };
    });
  }, []);

  const devToggleOwned = useCallback((id: string) => {
    setSave((prev) => {
      const owned = { ...prev.owned };
      if (owned[id]) delete owned[id];
      else owned[id] = { count: 1, firstSeen: Date.now() };
      return { ...prev, owned };
    });
  }, []);

  // Grant or revoke the whole catalogue in one tap. Testing the finale used to
  // mean tapping 300+ rows in the catalogue, which nobody was ever going to do —
  // so the ending went untested. The finale itself is never granted here: it has
  // to be earned by scanning its code, which is the flow worth testing.
  const devSetAllOwned = useCallback((own: boolean) => {
    setSave((prev) => {
      const owned = { ...prev.owned };
      for (const a of ARTWORKS) {
        if (a.collectionId === FINALE_COLLECTION) continue;
        if (own) owned[a.id] ??= { count: 1, firstSeen: Date.now() };
        else delete owned[a.id];
      }
      return { ...prev, owned };
    });
  }, []);

  const devToggleFinaleAnytime = useCallback(() => {
    setSave((prev) => ({ ...prev, devFinaleAnytime: !prev.devFinaleAnytime }));
  }, []);

  const devAddShards = useCallback((n: number) => {
    setSave((prev) => ({ ...prev, shards: Math.max(0, prev.shards + n) }));
  }, []);

  // Public shard grant (in-app tip thank-you). Same effect as devAddShards but
  // part of the normal, shipped surface rather than the developer tools.
  const addShards = useCallback((n: number) => {
    setSave((prev) => ({ ...prev, shards: Math.max(0, prev.shards + n) }));
  }, []);

  const resetAll = useCallback(() => setSave(emptySave()), []);

  const value = useMemo<GameContextValue>(
    () => ({
      ready,
      deviceId: save.deviceId,
      owned: save.owned,
      shards: save.shards,
      totalScans: save.totalScans,
      totalTrades: save.totalTrades,
      boostersOpened: save.boostersOpened,
      safetyAck: save.safetyAck,
      dailyLimitEnabled: save.dailyLimitEnabled,
      qrCooldownEnabled: save.qrCooldownEnabled,
      scanLimit: effectiveScanLimit,
      scansToday,
      canScan,
      scanUpgrades: save.scanUpgrades,
      nextScanUpgradeCost: scanUpgradePrice(save.scanUpgrades),
      resetCooldownCost: RESET_COOLDOWN_COST,
      cooldownsActive: Object.keys(save.scanCooldowns).filter((h) => {
        const last = save.scanCooldowns[h];
        return last && Date.now() - last < cooldownDaysFor(save.scanCounts[h] ?? 1) * DAY_MS;
      }).length,
      favorites: save.favorites,
      room: save.room,
      roomFrames: save.roomFrames,
      roomHero: save.roomHero,
      ownedSkins: save.ownedSkins,
      activeSkin: save.activeSkin,
      ownedFrames: save.ownedFrames,
      activeFrame: save.activeFrame,
      isOwned: (id) => !!save.owned[id],
      countOf: (id) => save.owned[id]?.count ?? 0,
      spareOf: (id) => Math.max(0, (save.owned[id]?.count ?? 0) - 1),
      isFavorite: (id) => !!save.favorites[id],
      isInRoom: (id) => save.room.includes(id),
      scanQr,
      openBooster,
      openCollectionBooster,
      convertSpareToShards,
      giveArtwork,
      receiveArtwork,
      toggleFavorite,
      toggleRoom,
      setPieceFrame,
      setRoomHero,
      buySkin,
      setActiveSkin,
      finaleSeen: save.finaleSeen ?? false,
      markFinaleSeen,
      tutorialSeen: save.tutorialSeen ?? false,
      markTutorialSeen,
      replayTutorial,
      buyFrame,
      setActiveFrame,
      buyArtwork,
      resetCooldowns,
      upgradeScanLimit,
      scanCooldowns: save.scanCooldowns,
      scanCounts: save.scanCounts,
      devClearCooldown,
      devToggleOwned,
      devSetAllOwned,
      devFinaleAnytime: save.devFinaleAnytime ?? false,
      devToggleFinaleAnytime,
      devAddShards,
      addShards,
      acknowledgeSafety,
      setDailyLimitEnabled,
      setQrCooldownEnabled,
      unit: save.unit ?? 'cm',
      setUnit,
      scaleReal: save.scaleReal ?? false,
      setScaleReal,
      resetAll,
    }),
    [
      ready,
      save,
      scansToday,
      canScan,
      scanQr,
      openBooster,
      openCollectionBooster,
      convertSpareToShards,
      giveArtwork,
      receiveArtwork,
      toggleFavorite,
      toggleRoom,
      setPieceFrame,
      setRoomHero,
      buySkin,
      setActiveSkin,
      buyFrame,
      setActiveFrame,
      buyArtwork,
      resetCooldowns,
      upgradeScanLimit,
      devToggleOwned,
      devSetAllOwned,
      save.devFinaleAnytime,
      devToggleFinaleAnytime,
      devAddShards,
      addShards,
      acknowledgeSafety,
      setDailyLimitEnabled,
      setQrCooldownEnabled,
      setUnit,
      setScaleReal,
      resetAll,
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}

// --- Derived collection stats (pure helpers) ------------------------------

// Progress of a multi-part painting: how many of its parts the player owns,
// and whether the full work is assembled.
export function partProgress(art: Artwork, owned: Record<string, OwnedEntry>) {
  if (!art.partGroup || !art.partTotal) {
    return { isPart: false, have: 1, total: 1, complete: true };
  }
  const parts = ARTWORKS.filter((a) => a.partGroup === art.partGroup);
  const have = parts.filter((a) => owned[a.id]).length;
  return { isPart: true, have, total: art.partTotal, complete: have >= art.partTotal };
}

export function collectionStats(owned: Record<string, OwnedEntry>) {
  const discoveredIds = new Set(Object.keys(owned));
  // Counted in *paintings*: a multi-part work is one piece, complete only when
  // every fragment has been found.
  const base = PAINTINGS.length; // the 300
  const found = PAINTINGS.filter((p) => isPaintingComplete(p, owned)).length;
  // The 301st only EXISTS once the 300 are complete: until then the counter
  // reads x/300, then flips to 300/301 and finally 301/301.
  const perfect = found >= base;
  const hasFinale = !!owned[FINALE_ID];
  const total = base + (perfect ? 1 : 0);
  const discovered = found + (perfect && hasFinale ? 1 : 0);
  // Artists follow the same rule as the pieces: the finale's painter doesn't
  // exist until the 300 are done, so the tally never reads 112 / 111.
  const baseArtists = new Set(
    ARTWORKS.filter((a) => a.collectionId !== FINALE_COLLECTION).map((a) => a.artist)
  );
  const artists = new Set(
    ARTWORKS.filter((a) => discoveredIds.has(a.id))
      .map((a) => a.artist)
      .filter((name) => baseArtists.has(name) || (perfect && hasFinale))
  );
  const totalArtists = new Set(baseArtists);
  if (perfect) {
    for (const a of ARTWORKS) if (a.collectionId === FINALE_COLLECTION) totalArtists.add(a.artist);
  }
  let duplicates = 0;
  for (const id of discoveredIds) duplicates += Math.max(0, (owned[id]?.count ?? 1) - 1);
  return {
    discovered,
    total,
    percent: total ? discovered / total : 0,
    artistsDiscovered: artists.size,
    totalArtists: totalArtists.size,
    duplicates,
    /** True the moment the base 300 are all complete. */
    perfect,
    /** True once the hidden finale has been unlocked too. */
    hasFinale,
  };
}
