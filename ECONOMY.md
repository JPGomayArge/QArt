# QArt — Economy design

The single currency is **shards**. This doc is the reference for keeping the
economy fun and balanced. All numbers live in `src/game/shop.ts`,
`src/game/rarity.ts` and `src/store/GameStore.tsx`.

## 1. How shards are earned (the anchor)

Shards come from **converting duplicate spares**. Value per rarity
(`rarity.ts › tradeValue`):

| Rarity | Odds (lottery) | Shards per spare |
|---|---|---|
| Common | 60% | 1 |
| Rare | 24% | 3 |
| Epic | 10% | 8 |
| Legendary | 5% | 20 |
| Unique | 1% | 60 |

**Steady-state earn rate** (collection mostly full, so almost every scan is a
duplicate): `0.6·1 + 0.24·3 + 0.10·8 + 0.05·20 + 0.01·60 ≈ 3.7 shards/scan`.
At 10 scans/day that is **≈ 37 shards/day** (less early on, when scans give new
pieces instead of spares). Every sink below is measured against this rate.

## 2. Guiding principles

1. **For REPEATABLE purchases, gambling (boosters) is the value path.** A booster
   can be bought any time, so it should stay the efficient route to a tier. This
   rule does **not** apply to the Painting of the Day: it offers one specific,
   non-repeatable piece per day (each piece recurs only ~once a year), so its
   scarcity comes from availability, not price. Price it as an attainable saving
   goal, not a punishment.
2. **First shop interaction is a gift.** The player starts with exactly enough
   shards for the first (tiny) scan upgrade, so they learn the shop on day one.
3. **Sinks scale with the fantasy.** Higher tiers cost dramatically more — the
   unique crate is an 11-day goal, a unique painting a month-long one. Long
   aspirational sinks are what keep a collection game alive.
4. **Anti-farm sinks stay expensive.** Resetting cooldowns undermines the
   anti-farm system, so it must feel costly.

## 3. Sinks — current values & notes

### Boosters (`shop.ts › BOOSTERS`)
Bias the draw toward a tier (never 100%).

| Crate | Cost | P(tier) | Expected cost to hit tier |
|---|---|---|---|
| Common | 12 | ~71% | ~17 |
| Rare | 28 | ~56% | ~50 |
| Epic | 70 | ~50% | ~140 |
| Legendary | 170 | ~46% | ~372 |
| Unique | 420 | ~26% | ~1640 |

- **Common Crate is near-useless** (base common is already 60%). Recommend
  removing it, or repurposing as a cheap "guaranteed Rare+" starter crate.

### Painting of the Day (`shop.ts › ARTWORK_PRICE`)
One specific featured piece per day, chosen deterministically from ~300 works,
so each piece recurs only **~once a year**. It is NOT farmable per-piece, so it
is exempt from the "buy > gamble" rule — price it as a saving goal.

Cost in days at the realistic ~3.7 shards/scan average:

| Rarity | Buy price | Endgame (50 scans, ~185/day) | Early (10 scans, ~37/day) |
|---|---|---|---|
| Common | 30 | <1 day | ~1 day |
| Rare | 85 | <1 day | ~2 days |
| Epic | 210 | ~1 day | ~6 days |
| Legendary | 480 | ~3 days | ~13 days |
| Unique | 1100 | ~6 days | ~30 days |

Verdict: fine as-is. Unique is ~6 days for an endgame saver — a satisfying goal
for a piece that only appears ~once a year, not a wall. Do **not** raise it.

### Utility
- **Reset all cooldowns:** 150 shards. Keep expensive (protects anti-farm). ✔
- **Daily scan upgrade** (`scanUpgradePrice`): **NEW curve** — base 10, ×2 →
  `10, 20, 40, 80, 160, 320, 640, 1280`. Step **+5 scans**, capped at
  **8 upgrades** (10 → 50 scans/day max). Player starts with **10 shards**
  (`STARTER_SHARDS`) = exactly the first upgrade.

### Cosmetics (`shop.ts › SKINS / FRAMES`)
Skins 140–320, frames 90–260. Pure sinks, no gameplay effect — fine as-is.

## 4. Open decisions

- **Common Crate:** remove, or turn into a "Starter — guaranteed Rare+"?
- **Base daily scans (10):** raise to ~15 so new players feel less constrained
  before their first upgrade? (lever, not required)

Resolved: Painting of the Day prices stay as-is — availability (once a year per
piece), not price, is the scarcity lever. Boosters remain the only "buy > gamble"
category.

## 5. Changed in code already
- Scan-upgrade curve → base 10, ×2, cap 8 (`shop.ts`).
- Starter gift → 10 shards on first launch (`GameStore.emptySave`).
