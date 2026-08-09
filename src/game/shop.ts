// Local shop: rarity-biased boosters and exhibition-room reskins.
// Everything is bought with shards (earned by converting duplicate spares).

import { RARITY, RARITY_ORDER, type Rarity } from '@/game/rarity';

export type BoosterDef = {
  rarity: Rarity; // the color/tier it favors (shown implicitly via color)
  name: string;
  cost: number; // shards
  multiplier: number; // how strongly it biases the odds toward `rarity`
};

// A booster raises the odds of its tier a lot, but never to 100%.
// Higher-tier crates are cheaper than the lottery would imply, but their
// featured-tier odds are deliberately low — a Unique Crate lands a unique ~10%
// of the time, so it's a real gamble, not a shortcut.
// Multipliers are tuned so each crate lands its own tier at ~75/66/50/25/10%.
export const BOOSTERS: BoosterDef[] = [
  { rarity: 'common', name: 'Common Crate', cost: 15, multiplier: 2.0 },
  { rarity: 'rare', name: 'Rare Crate', cost: 30, multiplier: 6.147 },
  { rarity: 'epic', name: 'Epic Crate', cost: 75, multiplier: 9.0 },
  { rarity: 'legendary', name: 'Legendary Crate', cost: 150, multiplier: 6.333 },
  { rarity: 'unique', name: 'Unique Crate', cost: 250, multiplier: 11.0 },
];

// Collection crates: one per collection, all the SAME price. Each guarantees a
// piece from that collection (rarity rolls naturally — no rarity guarantee).
export const COLLECTION_BOOSTER_COST = 100; // shards — uniform across all collections

// Approximate probability that a booster yields its own tier (for display).
export function boosterOdds(def: BoosterDef): number {
  const w: Record<Rarity, number> = {
    common: RARITY.common.weight,
    rare: RARITY.rare.weight,
    epic: RARITY.epic.weight,
    legendary: RARITY.legendary.weight,
    unique: RARITY.unique.weight,
  };
  w[def.rarity] *= def.multiplier;
  const total = RARITY_ORDER.reduce((s, r) => s + w[r], 0);
  return w[def.rarity] / total;
}

// Price of buying a specific artwork outright (Painting of the Day), by rarity.
// Deliberately expensive vs. boosters: buying a known piece is a luxury.
export const ARTWORK_PRICE: Record<Rarity, number> = {
  common: 30,
  rare: 85,
  epic: 210,
  legendary: 480,
  unique: 1100,
};

// --- Utility purchases -----------------------------------------------------

// Consumable: clear every active QR cooldown so codes can be scanned again now.
export const RESET_COOLDOWN_COST = 150; // shards — a genuinely useful convenience

// Permanent upgrade: each purchase raises the daily scan cap by SCAN_UPGRADE_STEP,
// and the price climbs with every one you've already bought. The FIRST one is
// deliberately tiny (and the player starts with exactly enough shards to buy it)
// so it doubles as a hands-on tutorial for the shop.
export const SCAN_UPGRADE_STEP = 5; // extra scans per upgrade
export const SCAN_UPGRADE_BASE = 20; // price of the first upgrade
export const SCAN_UPGRADE_GROWTH = 1.5; // gentler climb: 20,30,45,68,101,152,228,342
export const MAX_SCAN_UPGRADES = 8; // caps the daily ceiling (10 + 8*5 = 50/day)
export const STARTER_SHARDS = SCAN_UPGRADE_BASE; // gifted on first launch = first upgrade

/** Price of the next scan-limit upgrade given how many are already owned. */
export function scanUpgradePrice(purchased: number): number {
  return Math.round(SCAN_UPGRADE_BASE * Math.pow(SCAN_UPGRADE_GROWTH, purchased));
}

export type SkinDef = {
  id: string;
  name: string;
  wall: string; // representative color (used on edit/pick screens)
  frame: string; // frame accent
  text: string; // readable text color for this room
  cost: number; // shards (0 = owned by default)
  bg?: any; // require()'d gallery background image (the immersive room)
  bgHero?: any; // alternate background used only for the room's main exhibit
  wallY?: number; // 0..1 — vertical centre of the hanging wall in the image
  wallH?: number; // 0..1 — max painting height (fraction of screen) that fits the wall
};

// Reskins for the player's own room — real gallery renders you hang art in.
// ids/names match the source room images so the shop shows what you're buying.
// All reskins cost the same; Classical is the free starter. The lighter "start"
// rooms hang a touch lower (wallY 0.40) so the piece sits on the eye-line; the
// darker rooms at the end keep 0.37.
const SKIN_PRICE = 120;
export const SKINS: SkinDef[] = [
  { id: 'classical', name: 'Classical', wall: '#E4DCCB', frame: '#A98C4F', text: '#2A2620', cost: 0, bg: require('../../assets/rooms/classical.jpg'), bgHero: require('../../assets/rooms/classical-hero.jpg'), wallY: 0.40, wallH: 0.36 },
  { id: 'simplified', name: 'Simplified', wall: '#E7E0D4', frame: '#8A7A55', text: '#2E2A22', cost: SKIN_PRICE, bg: require('../../assets/rooms/simplified.jpg'), bgHero: require('../../assets/rooms/simplified-hero.jpg'), wallY: 0.40, wallH: 0.36 },
  { id: 'simple', name: 'Simple', wall: '#4A453E', frame: '#B79A6A', text: '#ECE6DA', cost: SKIN_PRICE, bg: require('../../assets/rooms/simple.jpg'), bgHero: require('../../assets/rooms/simple-hero.jpg'), wallY: 0.40, wallH: 0.36 },
  { id: 'concrete', name: 'Concrete', wall: '#6A625A', frame: '#B08D57', text: '#EDE6D8', cost: SKIN_PRICE, bg: require('../../assets/rooms/concrete.jpg'), bgHero: require('../../assets/rooms/concrete-hero.jpg'), wallY: 0.40, wallH: 0.36 },
  { id: 'novo', name: 'Novo', wall: '#4A4238', frame: '#C7A46A', text: '#EFE7D8', cost: SKIN_PRICE, bg: require('../../assets/rooms/novo.jpg'), bgHero: require('../../assets/rooms/novo-hero.jpg'), wallY: 0.40, wallH: 0.36 },
  { id: 'terracota', name: 'Terracotta', wall: '#7A4A2E', frame: '#C98A5A', text: '#F2E4D6', cost: SKIN_PRICE, bg: require('../../assets/rooms/terracota.jpg'), bgHero: require('../../assets/rooms/terracota-hero.jpg'), wallY: 0.40, wallH: 0.36 },
  { id: 'deepblue', name: 'Deep Blue', wall: '#1B2740', frame: '#C9A24B', text: '#EAF0FA', cost: SKIN_PRICE, bg: require('../../assets/rooms/deepblue.jpg'), bgHero: require('../../assets/rooms/deepblue-hero.jpg'), wallY: 0.37, wallH: 0.36 },
  { id: 'industrial', name: 'Industrial', wall: '#45423E', frame: '#B0A48E', text: '#ECE8E0', cost: SKIN_PRICE, bg: require('../../assets/rooms/industrial.jpg'), bgHero: require('../../assets/rooms/industrial-hero.jpg'), wallY: 0.37, wallH: 0.36 },
  { id: 'elegant', name: 'Elegant', wall: '#2A3128', frame: '#C9A24B', text: '#EDE8DC', cost: SKIN_PRICE, bg: require('../../assets/rooms/elegant.jpg'), bgHero: require('../../assets/rooms/elegant-hero.jpg'), wallY: 0.37, wallH: 0.36 },
  { id: 'atelier', name: 'Atelier', wall: '#5E4E3C', frame: '#C9A46A', text: '#F0E7D8', cost: SKIN_PRICE, bg: require('../../assets/rooms/atelier.jpg'), bgHero: require('../../assets/rooms/atelier-hero.jpg'), wallY: 0.37, wallH: 0.36 },
];

export const SKIN_BY_ID: Record<string, SkinDef> = Object.fromEntries(SKINS.map((s) => [s.id, s]));
export const DEFAULT_SKIN = 'classical';

// Frame styles for how pieces are mounted in your room. Rendered purely with
// border width / radius / optional color override — no images needed.
export type FrameDef = {
  id: string;
  name: string;
  cost: number; // shards (0 = owned by default)
  borderWidth: number;
  radius: number;
  color?: string; // overrides the skin's frame accent when set
  liner?: string; // thin inner fillet line between mat and canvas (adds depth)
  // Custom nine-slice art (see frameAssets.ts). When a PNG is registered for
  // this id, it renders as a real decorative frame instead of the drawn border.
  // insetX/insetY = border thickness as a fraction of the source width/height.
  insetX?: number;
  insetY?: number;
  ratio?: number; // rendered border thickness as a fraction of the piece's shorter side
};

export const FRAMES: FrameDef[] = [
  { id: 'none', name: 'None', cost: 0, borderWidth: 0, radius: 0 },
  { id: 'classic', name: 'Classic', cost: 0, borderWidth: 4, radius: 4, color: '#8A7A55', liner: '#D8C48F', insetX: 0.106, insetY: 0.17, ratio: 0.12 },
  { id: 'wood', name: 'Wood', cost: 80, borderWidth: 6, radius: 3, color: '#6B4A2A', insetX: 0.117, insetY: 0.187, ratio: 0.13 },
  { id: 'clearwood', name: 'Light Wood', cost: 80, borderWidth: 6, radius: 3, color: '#B9986A', insetX: 0.163, insetY: 0.17, ratio: 0.15 },
  { id: 'black', name: 'Black', cost: 110, borderWidth: 8, radius: 0, color: '#141218', insetX: 0.143, insetY: 0.21, ratio: 0.14 },
  { id: 'modern', name: 'Modern', cost: 120, borderWidth: 3, radius: 1, color: '#2A2730', insetX: 0.107, insetY: 0.118, ratio: 0.1 },
  { id: 'modernblack', name: 'Modern Black', cost: 120, borderWidth: 3, radius: 1, color: '#161418', insetX: 0.084, insetY: 0.124, ratio: 0.1 },
  { id: 'crimson', name: 'Crimson', cost: 130, borderWidth: 6, radius: 2, color: '#6E2A2A', liner: '#C98A8A', insetX: 0.092, insetY: 0.146, ratio: 0.11 },
  { id: 'retro', name: 'Retro', cost: 130, borderWidth: 6, radius: 2, color: '#7A6A3A', insetX: 0.097, insetY: 0.157, ratio: 0.12 },
  { id: 'old', name: 'Antique', cost: 140, borderWidth: 7, radius: 2, color: '#5E4A2E', liner: '#C9A46A', insetX: 0.117, insetY: 0.173, ratio: 0.13 },
  { id: 'copper', name: 'Copper', cost: 160, borderWidth: 8, radius: 3, color: '#8C5A3B', insetX: 0.144, insetY: 0.15, ratio: 0.13 },
  { id: 'vintage', name: 'Vintage', cost: 180, borderWidth: 9, radius: 3, color: '#6E5326', liner: '#E7C877', insetX: 0.152, insetY: 0.18, ratio: 0.15 },
  { id: 'silver', name: 'Silver', cost: 200, borderWidth: 9, radius: 3, color: '#9AA0A6', insetX: 0.107, insetY: 0.14, ratio: 0.13 },
];

export const FRAME_BY_ID: Record<string, FrameDef> = Object.fromEntries(FRAMES.map((f) => [f.id, f]));
export const DEFAULT_FRAME = 'classic';
