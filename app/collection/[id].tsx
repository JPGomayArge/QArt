import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Crown, Sparkle } from 'phosphor-react-native';
import React, { useMemo } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArtImage } from '@/components/ArtImage';
import { PartPaintingCard } from '@/components/PartPaintingCard';
import { ARTWORKS, type Artwork } from '@/data/artworks';
import { COLLECTION_BY_ID, collectionName } from '@/data/collections';
import { titleFor } from '@/data/titles';
import { useLocale } from '@/i18n';
import { t } from '@/data/ui';
import {
  paintingsOf,
  isPaintingComplete,
  toPaintingCells,
  packRows,
  rowKey,
  type GridRow,
} from '@/game/parts';
import { isExclusive } from '@/game/hash';
import { RARITY, rarityRank, SPECIAL_COLOR } from '@/game/rarity';
import { useGame } from '@/store/GameStore';
import { COLORS, FONT, RADIUS, SPACING } from '@/theme/theme';

// Thicker frames for rarer pieces, so the jewels read as the room's centerpieces.
const frameWidth = (rank: number) => 1.5 + rank; // common 1.5 → unique 5.5

export default function ExhibitionScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isOwned, owned } = useGame();
  const { locale } = useLocale();

  const collection = id ? COLLECTION_BY_ID[id] : undefined;

  // Build the wall's rows. Easter-egg (QR-exclusive) pieces are pulled out into
  // their own section at the very bottom so they read as "different". Collection
  // VI is additionally grouped by country of origin.
  const { rows, centerpiece } = useMemo(() => {
    const sortArts = (arr: Artwork[]) =>
      arr.slice().sort((a, b) => {
        const r = rarityRank(b.rarity) - rarityRank(a.rarity);
        if (r !== 0) return r;
        const m = (a.partGroup ? 1 : 0) - (b.partGroup ? 1 : 0);
        if (m !== 0) return m;
        return a.title.localeCompare(b.title);
      });

    const all = ARTWORKS.filter((a) => a.collectionId === id);
    const normal = all.filter((a) => !isExclusive(a.id));
    const specials = all.filter((a) => isExclusive(a.id));
    const out: GridRow[] = [];
    let center: Artwork | undefined;

    if (id === 'col-6') {
      // Group everything by country; easter eggs sit at the END of their own
      // country (their special frame/badge makes them discernible).
      const sortCountry = (arr: Artwork[]) =>
        arr.slice().sort((a, b) => {
          const ex = (isExclusive(a.id) ? 1 : 0) - (isExclusive(b.id) ? 1 : 0);
          if (ex !== 0) return ex;
          const r = rarityRank(b.rarity) - rarityRank(a.rarity);
          if (r !== 0) return r;
          const m = (a.partGroup ? 1 : 0) - (b.partGroup ? 1 : 0);
          if (m !== 0) return m;
          return a.title.localeCompare(b.title);
        });
      const byCountry: Record<string, Artwork[]> = {};
      for (const a of all) (byCountry[a.country || 'Other'] ??= []).push(a);
      for (const country of Object.keys(byCountry).sort()) {
        out.push({ type: 'label', text: country });
        out.push(...packRows(toPaintingCells(sortCountry(byCountry[country]))));
      }
      // No bottom "Special" section for col-6 — they live within their country.
    } else {
      const cells = toPaintingCells(sortArts(normal));
      const singles = cells.filter((c) => c.kind === 'single');
      center = singles[0]?.kind === 'single' ? singles[0].art : undefined;
      const rest = cells.filter((c) => !(c.kind === 'single' && c.art.id === center?.id));
      out.push(...packRows(rest));

      if (specials.length) {
        out.push({ type: 'label', text: '__SPECIAL__' });
        out.push(...packRows(toPaintingCells(sortArts(specials))));
      }
    }
    return { rows: out, centerpiece: center };
  }, [id]);

  if (!collection) {
    return (
      <View style={styles.container}>
        <Text style={styles.dim}>{t(locale, 'collDetail.roomNotFound')}</Text>
      </View>
    );
  }

  // Progress is counted in paintings; the wall still shows every fragment.
  const paintings = paintingsOf(collection.id);
  const have = paintings.filter((a) => isPaintingComplete(a, owned)).length;
  const total = paintings.length;
  const pct = total ? have / total : 0;
  const jewels = paintings.filter((p) => rarityRank(p.rarity) >= 3); // legendary + unique
  const jewelsHave = jewels.filter((p) => isPaintingComplete(p, owned)).length;

  const gap = SPACING.md;
  const cardWidth = (width - SPACING.lg * 2 - gap) / 2;
  const fullWidth = width - SPACING.lg * 2;

  const header = (
    <View>
      {/* Spacer so the head clears the floating back button below. */}
      <View style={{ height: insets.top + 52 }} />

      <View style={styles.head}>
        <Text style={styles.kicker}>{t(locale, 'col.collectionRoman', { roman: collection.roman })}</Text>
        <Text style={styles.h1}>{collectionName(collection.id, locale)}</Text>

        <View style={styles.progressRow}>
          <View style={styles.bar}>
            <View style={[styles.barFill, { width: `${pct * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {have}/{total}
          </Text>
        </View>
        <View style={styles.jewelRow}>
          <Crown size={14} color={COLORS.gold} weight="fill" />
          <Text style={styles.jewelText}>
            {t(locale, 'collDetail.jewels', { have: jewelsHave, total: jewels.length })}
          </Text>
        </View>
      </View>

      {centerpiece && (
        <>
          <Text style={styles.wallLabel}>{t(locale, 'collDetail.centerpiece')}</Text>
          <Centerpiece artwork={centerpiece} owned={isOwned(centerpiece.id)} onPress={() => router.push(`/artwork/${centerpiece.id}`)} />
          <Text style={styles.wallLabel}>{t(locale, 'collDetail.theCollection')}</Text>
        </>
      )}
    </View>
  );

  const renderRow = ({ item: row }: { item: GridRow }) => {
    if (row.type === 'label') {
      const special = row.text === '__SPECIAL__';
      const label = special
        ? t(locale, 'collDetail.special')
        : row.text === 'Other'
          ? t(locale, 'collDetail.other')
          : row.text;
      return (
        <Text style={[styles.wallLabel, special && { color: SPECIAL_COLOR }]}>
          {special ? '✦ ' : ''}
          {label}
        </Text>
      );
    }
    if (row.type === 'multi') {
      const have = row.cell.parts.filter((p) => isOwned(p.id)).length;
      return (
        <View style={{ paddingHorizontal: SPACING.lg }}>
          <PartPaintingCard
            parts={row.cell.parts}
            rep={row.cell.rep}
            owned={owned}
            width={fullWidth}
            onPress={have > 0 ? () => router.push(`/artwork/${row.cell.rep.id}`) : undefined}
          />
        </View>
      );
    }
    return (
      <View style={{ flexDirection: 'row', gap, paddingHorizontal: SPACING.lg }}>
        {row.items.map((a) => (
          <FramedPiece
            key={a.id}
            artwork={a}
            owned={isOwned(a.id)}
            width={cardWidth}
            onPress={() => isOwned(a.id) && router.push(`/artwork/${a.id}`)}
          />
        ))}
        {row.items.length === 1 && <View style={{ width: cardWidth }} />}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rows}
        keyExtractor={rowKey}
        ListHeaderComponent={header}
        contentContainerStyle={{ gap, paddingBottom: insets.bottom + SPACING.xxl }}
        renderItem={renderRow}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={80}
        windowSize={5}
        removeClippedSubviews
      />

      {/* Floating back — always in view without scrolling to the top. */}
      <View style={[styles.topBar, styles.floatBar, { paddingTop: insets.top + SPACING.sm }]} pointerEvents="box-none">
        <Pressable style={styles.iconBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color={COLORS.text} />
        </Pressable>
      </View>
    </View>
  );
}

function Centerpiece({ artwork, owned, onPress }: { artwork: Artwork; owned: boolean; onPress: () => void }) {
  const { locale } = useLocale();
  const rarity = RARITY[artwork.rarity];
  const accent = isExclusive(artwork.id) ? SPECIAL_COLOR : rarity.color;
  return (
    <Pressable
      onPress={() => owned && onPress()}
      style={[styles.centerFrame, { borderColor: owned ? accent : COLORS.cardBorder }]}
    >
      <View style={[styles.centerMat, { height: 260 }]}>
        <ArtImage artwork={artwork} hidden={!owned} radius={RADIUS.sm} />
      </View>
      <View style={styles.placard}>
        <View style={[styles.placardDot, { backgroundColor: accent }]} />
        <View style={{ flex: 1 }}>
          <Text style={styles.placardTitle} numberOfLines={1}>
            {owned ? titleFor(artwork.id, locale, artwork.title) : t(locale, 'card.undiscovered')}
          </Text>
          <Text style={styles.placardArtist} numberOfLines={1}>
            {owned ? artwork.artist : t(locale, 'collDetail.pieceAwaits')}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

function FramedPiece({
  artwork,
  owned,
  width,
  onPress,
}: {
  artwork: Artwork;
  owned: boolean;
  width: number;
  onPress: () => void;
}) {
  const { locale } = useLocale();
  const rarity = RARITY[artwork.rarity];
  const exclusive = isExclusive(artwork.id);
  const accent = exclusive ? SPECIAL_COLOR : rarity.color;
  const bw = exclusive ? 3 : frameWidth(rarityRank(artwork.rarity));
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.frame,
        // Easter eggs keep their special frame even while undiscovered, so you
        // can tell them apart from ordinary pieces at a glance.
        { width, borderWidth: bw, borderColor: owned ? accent : exclusive ? accent + '88' : COLORS.cardBorder },
        pressed && owned && { opacity: 0.85 },
      ]}
    >
      <View style={[styles.mat, { height: width * 1.1 }]}>
        <ArtImage artwork={artwork} hidden={!owned} radius={4} showQrMark={false} />
        {exclusive && (
          <View style={[styles.eggTag, { backgroundColor: accent }]}>
            <Text style={styles.eggTagText}>{'✦ ' + t(locale, 'card.special')}</Text>
          </View>
        )}
      </View>
      <View style={styles.placardSmall}>
        {owned ? (
          <>
            <Text style={styles.placardTitleSm} numberOfLines={1}>
              {titleFor(artwork.id, locale, artwork.title)}
            </Text>
            <Text style={styles.placardArtistSm} numberOfLines={1}>
              {artwork.artist}
            </Text>
          </>
        ) : (
          <View style={styles.emptyPlacard}>
            <Sparkle size={12} color={exclusive ? accent : COLORS.textFaint} />
            <Text style={[styles.emptyPlacardText, exclusive && { color: accent }]}>
              {exclusive ? t(locale, 'collDetail.specialScan') : t(locale, 'card.undiscovered')}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.wall },
  dim: { color: COLORS.textDim, textAlign: 'center', marginTop: 80 },
  topBar: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.sm },
  floatBar: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.md },
  kicker: { color: COLORS.gold, fontSize: 12, fontWeight: '800', letterSpacing: 3 },
  h1: { color: COLORS.text, fontSize: 28, fontWeight: '700', marginTop: 4, fontFamily: FONT.serif },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, marginTop: SPACING.lg },
  bar: { flex: 1, height: 8, backgroundColor: COLORS.bgElevated, borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: COLORS.gold, borderRadius: 4 },
  progressText: { color: COLORS.text, fontSize: 14, fontWeight: '800' },
  jewelRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: SPACING.sm },
  jewelText: { color: COLORS.textDim, fontSize: 13 },
  wallLabel: {
    color: COLORS.gold,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
    marginBottom: SPACING.sm,
  },
  centerFrame: {
    marginHorizontal: SPACING.lg,
    backgroundColor: COLORS.card,
    borderWidth: 4,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
  },
  centerMat: {
    backgroundColor: COLORS.mat,
    borderRadius: RADIUS.sm,
    padding: SPACING.sm,
  },
  placard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.bgElevated,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    marginTop: SPACING.sm,
  },
  placardDot: { width: 10, height: 10, borderRadius: 5 },
  placardTitle: { color: COLORS.text, fontSize: 16, fontWeight: '600', fontFamily: FONT.serif },
  placardArtist: { color: COLORS.textDim, fontSize: 13, marginTop: 1 },
  frame: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.sm,
    padding: SPACING.xs,
  },
  mat: {
    backgroundColor: COLORS.mat,
    borderRadius: 4,
    padding: 6,
  },
  eggTag: {
    position: 'absolute', top: SPACING.sm, left: SPACING.sm,
    borderRadius: RADIUS.pill, paddingHorizontal: 7, paddingVertical: 2,
  },
  eggTagText: { color: '#0B0B0F', fontSize: 8, fontWeight: '900', letterSpacing: 0.8 },
  placardSmall: { paddingHorizontal: SPACING.sm, paddingVertical: SPACING.sm, minHeight: 44 },
  placardTitleSm: { color: COLORS.text, fontSize: 13, fontWeight: '600', fontFamily: FONT.serif },
  placardArtistSm: { color: COLORS.textDim, fontSize: 11, marginTop: 1 },
  emptyPlacard: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 4 },
  emptyPlacardText: { color: COLORS.textFaint, fontSize: 11, fontStyle: 'italic' },
});
