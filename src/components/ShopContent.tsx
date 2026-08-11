// The shop's sections (boosters, scanning upgrades, room styles), with no outer
// scroll/header so it can be embedded under the Gift Shop tab's "Shop" toggle
// (and in the standalone /shop route). Buy with shards only. Frames are free and
// built in — chosen per-piece in My Room, not sold here.

import { useRouter } from 'expo-router';
import { ArrowClockwise, Check, Gauge, Gift, Sparkle, Stack } from 'phosphor-react-native';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image as ExpoImage } from 'expo-image';

import { Haptics, hNotify } from '@/game/prefs';
import { prefetchArtwork } from '@/game/prefetch';
import { ARTWORKS, ARTWORKS_BY_RARITY } from '@/data/artworks';
import { COLLECTIONS, collectionName } from '@/data/collections';
import { RARITY } from '@/game/rarity';
import { BOOSTERS, boosterOdds, COLLECTION_BOOSTER_COST, SKINS, FRAMES, SCAN_UPGRADE_STEP, MAX_SCAN_UPGRADES, SCAN_UPGRADES_TO_MAX } from '@/game/shop';
import { FRAME_ASSETS } from '@/data/frameAssets';
import { FINALE_COLLECTION } from '@/game/parts';
import { NineSliceFrame } from '@/components/NineSliceFrame';
import { useLocale } from '@/i18n';
import { t } from '@/data/ui';
import { useGame } from '@/store/GameStore';
import { COLORS, FONT, RADIUS, SPACING } from '@/theme/theme';

export function ShopContent() {
  const router = useRouter();
  const { locale } = useLocale();
  const {
    shards,
    owned,
    openBooster,
    openCollectionBooster,
    buySkin,
    setActiveSkin,
    ownedSkins,
    activeSkin,
    buyFrame,
    ownedFrames,
    activeFrame,
    setActiveFrame,
    scanLimit,
    scanUpgrades,
    nextScanUpgradeCost,
    upgradeScanLimit,
    resetCooldownCost,
    cooldownsActive,
    resetCooldowns,
  } = useGame();
  const atScanMax = scanUpgrades >= MAX_SCAN_UPGRADES;
  // The sixth and last purchase doesn't add +5 — it removes the cap entirely.
  const isFinalUpgrade = !atScanMax && scanUpgrades >= SCAN_UPGRADES_TO_MAX;

  const openReveal = (res: { artwork: { id: string }; isNew: boolean; count: number }) => {
    prefetchArtwork(res.artwork.id); // warm the reveal image so it appears instantly
    hNotify(Haptics.NotificationFeedbackType.Success);
    router.push({
      pathname: '/reveal',
      params: { id: res.artwork.id, isNew: res.isNew ? '1' : '0', count: String(res.count), source: 'booster' },
    });
  };
  const buyBooster = (rarity: (typeof BOOSTERS)[number]['rarity']) => {
    const res = openBooster(rarity);
    if (res) openReveal(res);
  };
  const buyCollection = (collectionId: string) => {
    const res = openCollectionBooster(collectionId);
    if (res) openReveal(res);
  };

  // Per-collection completion (have / total pieces), for the crate tiles.
  const collectionPools = useMemo(() => {
    const m: Record<string, { have: number; total: number }> = {};
    for (const c of COLLECTIONS) m[c.id] = { have: 0, total: 0 };
    for (const a of ARTWORKS) {
      const e = m[a.collectionId];
      if (!e) continue;
      e.total += 1;
      if (owned[a.id]) e.have += 1;
    }
    return m;
  }, [owned]);
  const onUpgradeScans = () => {
    if (shards >= nextScanUpgradeCost && upgradeScanLimit()) hNotify(Haptics.NotificationFeedbackType.Success);
  };
  const onResetCooldowns = () => {
    if (shards >= resetCooldownCost && cooldownsActive > 0 && resetCooldowns())
      hNotify(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <View>
      {/* Rarity boosters — a grid of tiles, each biased toward its tier */}
      <Text style={styles.sectionTitle}>{t(locale, 'shopc.boosters')}</Text>
      <Text style={styles.sectionNote}>{t(locale, 'shopc.boostersNote')}</Text>
      <View style={styles.grid}>
        {BOOSTERS.map((b) => {
          const color = RARITY[b.rarity].color;
          const odds = Math.round(boosterOdds(b) * 100);
          const affordable = shards >= b.cost;
          // The hidden finale is 'unique' too, but it isn't in any crate's pool.
          const pool = (ARTWORKS_BY_RARITY[b.rarity] ?? []).filter((a) => a.collectionId !== FINALE_COLLECTION);
          const have = pool.filter((a) => owned[a.id]).length;
          const missing = pool.length - have;
          return (
            <Pressable
              key={b.rarity}
              style={[styles.tile, { borderColor: color + '55' }, !affordable && styles.tileOff]}
              onPress={() => affordable && buyBooster(b.rarity)}
              disabled={!affordable}
            >
              <View style={styles.tileHead}>
                <View style={[styles.gemSm, { backgroundColor: color, shadowColor: color }]}>
                  <Gift size={16} color="#0B0B0F" weight="fill" />
                </View>
                <Text style={[styles.tileOdds, { color }]}>≈{odds}%</Text>
              </View>
              <Text style={styles.tileMeta} numberOfLines={2}>{t(locale, 'shopc.perTier')}</Text>
              <View style={styles.track}>
                <View style={[styles.fill, { width: `${odds}%`, backgroundColor: color }]} />
              </View>
              <Text style={styles.tileOwned}>
                <Text style={{ color, fontWeight: '800' }}>{have}</Text>/{pool.length} ·{' '}
                {missing === 0 ? t(locale, 'shopc.complete') : t(locale, 'shopc.toGo', { n: missing })}
              </Text>
              <View style={[styles.tilePrice, { backgroundColor: affordable ? color : COLORS.bgElevated }]}>
                <Sparkle size={12} color={affordable ? '#0B0B0F' : COLORS.textFaint} weight="fill" />
                <Text style={[styles.tilePriceText, { color: affordable ? '#0B0B0F' : COLORS.textFaint }]}>{b.cost}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      {/* Collection crates — one per collection, same price, guaranteed from-collection */}
      <Text style={styles.sectionTitle}>{t(locale, 'shopc.collections')}</Text>
      <Text style={styles.sectionNote}>{t(locale, 'shopc.collectionsNote')}</Text>
      <View style={styles.grid}>
        {COLLECTIONS.map((c) => {
          const affordable = shards >= COLLECTION_BOOSTER_COST;
          const p = collectionPools[c.id] ?? { have: 0, total: 0 };
          const missing = p.total - p.have;
          return (
            <Pressable
              key={c.id}
              style={[styles.tile, styles.colTile, !affordable && styles.tileOff]}
              onPress={() => affordable && buyCollection(c.id)}
              disabled={!affordable}
            >
              <View style={styles.tileHead}>
                <View style={styles.romanBadge}>
                  <Text style={styles.romanText}>{c.roman}</Text>
                </View>
                <Stack size={16} color={COLORS.gold} weight="fill" />
              </View>
              <Text style={styles.colName} numberOfLines={2}>{collectionName(c.id, locale)}</Text>
              <Text style={styles.tileOwned}>
                <Text style={{ color: COLORS.gold, fontWeight: '800' }}>{p.have}</Text>/{p.total} ·{' '}
                {missing === 0 ? t(locale, 'shopc.complete') : t(locale, 'shopc.toGo', { n: missing })}
              </Text>
              <View style={[styles.tilePrice, { backgroundColor: affordable ? COLORS.gold : COLORS.bgElevated }]}>
                <Sparkle size={12} color={affordable ? '#0B0B0F' : COLORS.textFaint} weight="fill" />
                <Text style={[styles.tilePriceText, { color: affordable ? '#0B0B0F' : COLORS.textFaint }]}>{COLLECTION_BOOSTER_COST}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      {/* Scanning upgrades */}
      <Text style={styles.sectionTitle}>{t(locale, 'shopc.scanning')}</Text>
      <Text style={styles.sectionNote}>{t(locale, 'shopc.scanningNote')}</Text>
      <View style={styles.list}>
        <View style={styles.row}>
          <View style={styles.utilIcon}>
            <Gauge size={26} color={COLORS.gold} weight="fill" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowName}>
              {isFinalUpgrade ? t(locale, 'shopc.unlimitedScans') : t(locale, 'shopc.increaseScans')}
            </Text>
            <Text style={styles.rowMeta}>
              {atScanMax
                ? t(locale, 'shopc.unlimitedOwned')
                : isFinalUpgrade
                  ? t(locale, 'shopc.unlimitedBody', { n: scanLimit })
                  : t(locale, 'shopc.nowPerDay', { n: scanLimit, step: SCAN_UPGRADE_STEP })}
            </Text>
          </View>
          {atScanMax ? (
            <View style={[styles.priceBtn, styles.priceBtnOff]}>
              <Text style={[styles.priceText, { color: COLORS.textFaint }]}>{t(locale, 'shopc.max')}</Text>
            </View>
          ) : (
            <Pressable
              style={[styles.priceBtn, shards < nextScanUpgradeCost && styles.priceBtnOff]}
              onPress={onUpgradeScans}
              disabled={shards < nextScanUpgradeCost}
            >
              <Sparkle size={12} color={shards >= nextScanUpgradeCost ? '#0B0B0F' : COLORS.textFaint} weight="fill" />
              <Text style={[styles.priceText, shards < nextScanUpgradeCost && { color: COLORS.textFaint }]}>
                {nextScanUpgradeCost}
              </Text>
            </Pressable>
          )}
        </View>

        <View style={styles.row}>
          <View style={styles.utilIcon}>
            <ArrowClockwise size={24} color={COLORS.gold} weight="bold" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowName}>{t(locale, 'shopc.resetCooldowns')}</Text>
            <Text style={styles.rowMeta}>
              {cooldownsActive > 0
                ? t(locale, 'shopc.codesResting', { n: cooldownsActive, s: cooldownsActive > 1 ? 's' : '' })
                : t(locale, 'shopc.noCooldowns')}
            </Text>
          </View>
          <Pressable
            style={[styles.priceBtn, (shards < resetCooldownCost || cooldownsActive === 0) && styles.priceBtnOff]}
            onPress={onResetCooldowns}
            disabled={shards < resetCooldownCost || cooldownsActive === 0}
          >
            <Sparkle
              size={12}
              color={shards >= resetCooldownCost && cooldownsActive > 0 ? '#0B0B0F' : COLORS.textFaint}
              weight="fill"
            />
            <Text
              style={[
                styles.priceText,
                (shards < resetCooldownCost || cooldownsActive === 0) && { color: COLORS.textFaint },
              ]}
            >
              {resetCooldownCost}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Room styles */}
      <Text style={styles.sectionTitle}>{t(locale, 'shopc.roomStyles')}</Text>
      <Text style={styles.sectionNote}>{t(locale, 'shopc.roomStylesNote')}</Text>
      <View style={styles.list}>
        {SKINS.map((s) => {
          const owned = !!ownedSkins[s.id];
          const active = activeSkin === s.id;
          return (
            <View key={s.id} style={styles.row}>
              <View style={[styles.roomPreview, { backgroundColor: s.wall }]}>
                {s.bg ? (
                  <ExpoImage source={s.bg} style={StyleSheet.absoluteFill} contentFit="cover" />
                ) : null}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowName}>{s.name}</Text>
                <Text style={styles.rowMeta}>{s.cost === 0 ? t(locale, 'shopc.starterFree') : t(locale, 'shopc.shardsCost', { n: s.cost })}</Text>
              </View>
              {active ? (
                <View style={[styles.priceBtn, styles.equipped]}>
                  <Check size={14} color={COLORS.gold} weight="bold" />
                  <Text style={styles.equippedText}>{t(locale, 'shopc.equipped')}</Text>
                </View>
              ) : owned ? (
                <Pressable style={styles.priceBtn} onPress={() => setActiveSkin(s.id)}>
                  <Text style={styles.priceText}>{t(locale, 'shopc.equip')}</Text>
                </Pressable>
              ) : (
                <Pressable
                  style={[styles.priceBtn, shards < s.cost && styles.priceBtnOff]}
                  onPress={() => shards >= s.cost && buySkin(s.id)}
                  disabled={shards < s.cost}
                >
                  <Sparkle size={12} color={shards >= s.cost ? '#0B0B0F' : COLORS.textFaint} weight="fill" />
                  <Text style={[styles.priceText, shards < s.cost && { color: COLORS.textFaint }]}>{s.cost}</Text>
                </Pressable>
              )}
            </View>
          );
        })}
      </View>

      {/* Frames — mounted around each piece in My Room */}
      <Text style={styles.sectionTitle}>{t(locale, 'shopc.frames')}</Text>
      <Text style={styles.sectionNote}>{t(locale, 'shopc.framesNote')}</Text>
      <View style={styles.list}>
        {FRAMES.filter((f) => f.id !== 'none').map((f) => {
          const owned = f.cost === 0 || !!ownedFrames[f.id];
          const active = activeFrame === f.id;
          const rat = f.ratio ?? 0.14;
          const inner = Math.round(48 / (1 + 2 * rat));
          const bp = Math.max(4, Math.round(inner * rat));
          return (
            <View key={f.id} style={[styles.row, active && styles.rowActive]}>
              <View style={styles.framePreviewOuter}>
                {FRAME_ASSETS[f.id] ? (
                  <NineSliceFrame
                    source={FRAME_ASSETS[f.id]}
                    insetX={f.insetX ?? 0.2}
                    insetY={f.insetY ?? 0.2}
                    border={bp}
                    width={inner}
                    height={inner}
                    radius={2}
                  >
                    <View style={{ flex: 1, backgroundColor: '#6B5B45' }} />
                  </NineSliceFrame>
                ) : f.id === 'none' ? (
                  <View style={{ width: 40, height: 40, borderRadius: 3, backgroundColor: '#6B5B45', borderWidth: 1, borderColor: COLORS.cardBorder }} />
                ) : (
                  <View
                    style={{
                      width: 40, height: 40,
                      borderWidth: Math.min(f.borderWidth, 7), borderRadius: f.radius,
                      borderColor: f.color ?? COLORS.gold, backgroundColor: COLORS.mat,
                      alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <View style={{ flex: 1, alignSelf: 'stretch', margin: 2, borderWidth: f.liner ? 1 : 0, borderColor: f.liner ?? 'transparent', backgroundColor: '#6B5B45' }} />
                  </View>
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowName}>{f.name}</Text>
                <Text style={styles.rowMeta}>{f.cost === 0 ? t(locale, 'shopc.starterFree') : t(locale, 'shopc.shardsCost', { n: f.cost })}</Text>
              </View>
              {active ? (
                <View style={[styles.priceBtn, styles.equipped]}>
                  <Check size={14} color={COLORS.gold} weight="bold" />
                  <Text style={styles.equippedText}>{t(locale, 'shopc.equipped')}</Text>
                </View>
              ) : owned ? (
                <Pressable style={styles.priceBtn} onPress={() => setActiveFrame(f.id)}>
                  <Text style={styles.priceText}>{t(locale, 'shopc.equip')}</Text>
                </Pressable>
              ) : (
                <Pressable
                  style={[styles.priceBtn, shards < f.cost && styles.priceBtnOff]}
                  onPress={() => shards >= f.cost && buyFrame(f.id)}
                  disabled={shards < f.cost}
                >
                  <Sparkle size={12} color={shards >= f.cost ? '#0B0B0F' : COLORS.textFaint} weight="fill" />
                  <Text style={[styles.priceText, shards < f.cost && { color: COLORS.textFaint }]}>{f.cost}</Text>
                </Pressable>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: COLORS.gold, fontSize: 12, fontWeight: '800', letterSpacing: 1.5,
    paddingHorizontal: SPACING.lg, marginTop: SPACING.xl, textTransform: 'uppercase',
  },
  sectionNote: {
    color: COLORS.textDim, fontSize: 13, paddingHorizontal: SPACING.lg,
    marginTop: 6, marginBottom: SPACING.md, lineHeight: 18,
  },
  list: { gap: SPACING.sm, paddingHorizontal: SPACING.lg },
  // Booster row with progress bar
  boosterRow: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    backgroundColor: COLORS.card, borderWidth: 1, borderRadius: RADIUS.md, padding: SPACING.md,
  },
  gem: {
    width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center',
    shadowOpacity: 0.6, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 4,
  },
  boosterName: { color: COLORS.text, fontSize: 15, fontWeight: '800' },
  boosterMeta: { color: COLORS.textDim, fontSize: 12, marginTop: 2 },
  boosterOwned: { color: COLORS.textFaint, fontSize: 11, marginTop: 6 },
  track: { height: 7, borderRadius: 4, backgroundColor: COLORS.mat, overflow: 'hidden', marginTop: 8 },
  fill: { height: '100%', borderRadius: 4 },
  buyBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4,
    borderRadius: RADIUS.pill, paddingVertical: SPACING.sm, paddingHorizontal: SPACING.md, minWidth: 62,
  },
  buyText: { fontWeight: '800', fontSize: 14 },
  // Tile grid (rarity + collection crates), 2 columns
  grid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, paddingHorizontal: SPACING.lg,
  },
  tile: {
    width: '48%', flexGrow: 1, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.md, padding: SPACING.md, gap: 6,
  },
  tileOff: { opacity: 0.55 },
  colTile: { borderColor: COLORS.gold + '44' },
  tileHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  gemSm: {
    width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center',
    shadowOpacity: 0.6, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 3,
  },
  tileOdds: { fontSize: 16, fontWeight: '800' },
  tileMeta: { color: COLORS.textDim, fontSize: 11, lineHeight: 14 },
  tileOwned: { color: COLORS.textFaint, fontSize: 11 },
  tilePrice: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4,
    borderRadius: RADIUS.pill, paddingVertical: SPACING.sm, marginTop: 2,
  },
  tilePriceText: { fontWeight: '800', fontSize: 14 },
  romanBadge: {
    minWidth: 32, height: 32, borderRadius: 16, paddingHorizontal: 8,
    backgroundColor: COLORS.mat, borderColor: COLORS.gold + '66', borderWidth: 1,
    alignItems: 'center', justifyContent: 'center',
  },
  romanText: { color: COLORS.gold, fontSize: 14, fontWeight: '800', fontFamily: FONT.serif },
  colName: { color: COLORS.text, fontSize: 14, fontWeight: '700', fontFamily: FONT.serif, minHeight: 36 },
  // Generic rows (utils, skins, frames)
  row: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    backgroundColor: COLORS.card, borderColor: COLORS.cardBorder, borderWidth: 1,
    borderRadius: RADIUS.md, padding: SPACING.sm,
  },
  rowActive: { borderColor: COLORS.gold, borderWidth: 1.5 },
  rowName: { color: COLORS.text, fontSize: 15, fontWeight: '700', fontFamily: FONT.serif },
  rowMeta: { color: COLORS.textDim, fontSize: 12, marginTop: 2 },
  utilIcon: {
    width: 54, height: 54, borderRadius: RADIUS.sm, backgroundColor: COLORS.mat,
    borderColor: COLORS.cardBorder, borderWidth: 1, alignItems: 'center', justifyContent: 'center',
  },
  roomPreview: {
    width: 52, height: 68, borderRadius: RADIUS.sm, overflow: 'hidden',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
  },
  framePreviewOuter: { width: 54, height: 54, alignItems: 'center', justifyContent: 'center' },
  priceBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: COLORS.gold,
    borderRadius: RADIUS.pill, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm,
  },
  priceBtnOff: { backgroundColor: COLORS.bgElevated },
  priceText: { color: '#0B0B0F', fontWeight: '800', fontSize: 13 },
  equipped: { backgroundColor: COLORS.card, borderColor: COLORS.gold, borderWidth: 1 },
  equippedText: { color: COLORS.gold, fontWeight: '700', fontSize: 13 },
});
