// Rarity model for QArt.
// The CSV taxonomy is: Común, Rara, Épica, Legendaria, Única.
// UI labels are English (v1 ships in English).

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary' | 'unique';

export const RARITY_ORDER: Rarity[] = [
  'common',
  'rare',
  'epic',
  'legendary',
  'unique',
];

export type RarityMeta = {
  key: Rarity;
  label: string;
  // Probability weight used when a QR hash decides which tier drops.
  // Rarer tiers are exponentially less likely, regardless of pool size.
  weight: number;
  color: string;
  glow: string;
  // Booster value: how many duplicate "points" a spare of this rarity is worth.
  tradeValue: number;
};

export const RARITY: Record<Rarity, RarityMeta> = {
  common: { key: 'common', label: 'Common', weight: 0.6, color: '#9CA3AF', glow: 'rgba(156,163,175,0.35)', tradeValue: 5 },
  rare: { key: 'rare', label: 'Rare', weight: 0.24, color: '#4EA8DE', glow: 'rgba(78,168,222,0.45)', tradeValue: 15 },
  epic: { key: 'epic', label: 'Epic', weight: 0.1, color: '#A970FF', glow: 'rgba(169,112,255,0.5)', tradeValue: 30 },
  legendary: { key: 'legendary', label: 'Legendary', weight: 0.05, color: '#F2A63B', glow: 'rgba(242,166,59,0.55)', tradeValue: 75 },
  unique: { key: 'unique', label: 'Unique', weight: 0.01, color: '#FF4D6D', glow: 'rgba(255,77,109,0.6)', tradeValue: 250 },
};

export const RARITY_META: RarityMeta[] = RARITY_ORDER.map((r) => RARITY[r]);

// Special (QR-exclusive) pieces don't carry a rarity — they get their own
// distinctive frame instead, so they read as "outside the lottery".
export const SPECIAL_LABEL = 'Special';
export const SPECIAL_COLOR = '#5CE1E6';
/** The 301st piece answers to no rarity: its colour is plain, luminous white. */
export const FINALE_COLOR = '#FFFFFF';
export const FINALE_GLOW = 'rgba(255,255,255,0.55)';
export const SPECIAL_GLOW = 'rgba(92,225,230,0.5)';

export function rarityRank(r: Rarity): number {
  return RARITY_ORDER.indexOf(r);
}

// The 301st piece isn't part of the rarity lottery, so it has no tier of its
// own — but wherever pieces are ranked it must sit ABOVE unique, not beside it.
// The id is inlined here (rather than imported from parts.ts) to keep this
// module a leaf with no cycles.
const FINALE = 'final-la-musa';

/** Sort rank including the finale, which outranks every rarity. */
export function artworkRank(id: string, r: Rarity): number {
  return id === FINALE ? RARITY_ORDER.length : rarityRank(r);
}
