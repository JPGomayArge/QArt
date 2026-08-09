import { useRouter } from 'expo-router';
import { CaretRight, Heart } from 'phosphor-react-native';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArtImage } from '@/components/ArtImage';
import { ArtworkCard } from '@/components/ArtworkCard';
import { PartComposite, PartPaintingCard } from '@/components/PartPaintingCard';
import { ARTWORKS, ARTWORK_BY_ID, type Artwork } from '@/data/artworks';
import { COLLECTIONS, collectionName, type CollectionMeta } from '@/data/collections';
import { useLocale } from '@/i18n';
import { t } from '@/data/ui';
import { ARTWORK_DETAILS } from '@/data/details';
import { DETAIL_INFO } from '@/data/detailInfo';
import {
  paintingsOf,
  isPaintingComplete,
  partsOwned,
  toPaintingCells,
  packRows,
  rowKey,
  PAINTINGS,
  type GridRow,
  type PaintingCell,
} from '@/game/parts';
import { RARITY, RARITY_ORDER, rarityRank, type Rarity } from '@/game/rarity';
import { collectionStats, useGame } from '@/store/GameStore';
import { COLORS, FONT, RADIUS, SPACING } from '@/theme/theme';

type OwnedFilter = 'all' | 'owned' | 'missing';
type ViewMode = 'galleries' | 'index' | 'mine';
type SortKey = 'rarity' | 'year' | 'title' | 'artist' | 'recent';

const SORTS: { key: SortKey; labelKey: string }[] = [
  { key: 'rarity', labelKey: 'col.sort.rarity' },
  { key: 'year', labelKey: 'col.sort.year' },
  { key: 'title', labelKey: 'col.sort.title' },
  { key: 'artist', labelKey: 'col.sort.artist' },
  { key: 'recent', labelKey: 'col.sort.recent' },
];

// Numeric year for sorting, pulled from the curated/base detail text (e.g.
// "c. 1665", "1503–1519", "1490s"). Undated pieces sort to the end.
function yearOf(a: Artwork): number {
  const raw = DETAIL_INFO[a.id]?.year ?? ARTWORK_DETAILS[a.id]?.year;
  if (!raw) return Number.POSITIVE_INFINITY;
  const m = String(raw).match(/\d{3,4}/);
  return m ? parseInt(m[0], 10) : Number.POSITIVE_INFINITY;
}

export default function CollectionScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const router = useRouter();
  const { owned, isOwned, countOf, shards, isFavorite } = useGame();
  const { locale } = useLocale();

  const [view, setView] = useState<ViewMode>('galleries');
  const [rarity, setRarity] = useState<Rarity | null>(null);
  const [ownedFilter, setOwnedFilter] = useState<OwnedFilter>('all');
  const [favOnly, setFavOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>('rarity');

  const stats = useMemo(() => collectionStats(owned), [owned]);

  // Most-recently discovered pieces (by first-seen), for a quick "look what you
  // just found" strip on the galleries view.
  const recent = useMemo(
    () =>
      Object.entries(owned)
        .filter(([id]) => ARTWORK_BY_ID[id])
        .sort((a, b) => (b[1].firstSeen ?? 0) - (a[1].firstSeen ?? 0))
        .slice(0, 12)
        .map(([id]) => ARTWORK_BY_ID[id]),
    [owned]
  );

  const gap = SPACING.md;
  const cardWidth = (width - SPACING.lg * 2 - gap) / 2;

  const cmp = useMemo<Record<SortKey, (a: Artwork, b: Artwork) => number>>(
    () => ({
      // Rarity bands, and within each band multi-part works sit below the singles.
      rarity: (a, b) =>
        rarityRank(b.rarity) - rarityRank(a.rarity) ||
        (a.partGroup ? 1 : 0) - (b.partGroup ? 1 : 0) ||
        a.title.localeCompare(b.title),
      // Oldest → newest; undated pieces fall to the end.
      year: (a, b) => yearOf(a) - yearOf(b) || a.title.localeCompare(b.title),
      title: (a, b) => a.title.localeCompare(b.title),
      artist: (a, b) => a.artist.localeCompare(b.artist) || a.title.localeCompare(b.title),
      recent: (a, b) => (owned[b.id]?.firstSeen ?? 0) - (owned[a.id]?.firstSeen ?? 0),
    }),
    [owned]
  );

  // Index: one entry per painting; multi-part works get a full-width row that
  // fills in as you collect their fragments.
  const indexRows = useMemo(() => {
    let list = PAINTINGS.slice(); // representative per painting
    if (rarity) list = list.filter((a) => a.rarity === rarity);
    if (ownedFilter === 'owned') list = list.filter((a) => isPaintingComplete(a, owned));
    if (ownedFilter === 'missing') list = list.filter((a) => !isPaintingComplete(a, owned));
    if (favOnly) list = list.filter((a) => isFavorite(a.id));
    list.sort(cmp[sort]);
    return packRows(toPaintingCells(list));
  }, [rarity, ownedFilter, favOnly, sort, owned, cmp, isFavorite]);

  // "All my paintings": one tile per painting you hold at least part of.
  const mineCells = useMemo(() => {
    let list = PAINTINGS.filter((a) =>
      a.partGroup ? partsOwned(a.partGroup, owned) > 0 : isOwned(a.id)
    );
    if (rarity) list = list.filter((a) => a.rarity === rarity);
    if (favOnly) list = list.filter((a) => isFavorite(a.id));
    list.sort(cmp[sort]);
    return toPaintingCells(list);
  }, [rarity, favOnly, sort, owned, cmp, isOwned, isFavorite]);

  const mineWidth = (width - SPACING.lg * 2 - gap * 2) / 3;
  const fullWidth = width - SPACING.lg * 2;

  const header = (
    <View style={{ gap: SPACING.md }}>
      <View style={[styles.head, { paddingTop: insets.top + SPACING.md }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.kicker}>{t(locale, 'col.kicker')}</Text>
          <Text style={styles.h1}>{t(locale, 'col.title')}</Text>
        </View>
        <Pressable style={styles.roomBtn} onPress={() => router.push('/room')}>
          <Heart size={16} color={COLORS.gold} weight="fill" />
          <Text style={styles.roomBtnText}>{t(locale, 'col.myRoom')}</Text>
        </Pressable>
      </View>

      {/* Progress */}
      <View style={styles.progressCard}>
        <View style={styles.progressTop}>
          <Text style={styles.progressPct}>{Math.round(stats.percent * 100)}%</Text>
          <Text style={styles.progressSub}>
            {t(locale, 'col.discovered', { n: stats.discovered, total: stats.total })}
          </Text>
        </View>
        <View style={styles.bar}>
          <View style={[styles.barFill, { width: `${stats.percent * 100}%` }]} />
        </View>
        <View style={styles.statRow}>
          <Stat label={t(locale, 'col.artists')} value={`${stats.artistsDiscovered}/${stats.totalArtists}`} />
          <Stat label={t(locale, 'col.duplicates')} value={String(stats.duplicates)} />
          <Stat label={t(locale, 'col.shards')} value={String(shards)} />
        </View>
      </View>

      {/* View toggle */}
      <View style={styles.segment}>
        {(['galleries', 'index', 'mine'] as ViewMode[]).map((v) => (
          <Pressable
            key={v}
            onPress={() => setView(v)}
            style={[styles.segItem, view === v && styles.segItemActive]}
          >
            <Text style={[styles.segText, view === v && styles.segTextActive]}>
              {v === 'galleries' ? t(locale, 'col.galleries') : v === 'index' ? t(locale, 'col.index') : t(locale, 'col.myPaintings')}
            </Text>
          </Pressable>
        ))}
      </View>

      {view === 'galleries' && recent.length > 0 && (
        <View>
          <Text style={styles.recentTitle}>{t(locale, 'col.recentlyDiscovered')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recentRow}>
            {recent.map((a) => (
              <Pressable key={a.id} onPress={() => router.push(`/artwork/${a.id}`)}>
                <View style={[styles.recentThumb, { borderColor: RARITY[a.rarity].color + '99' }]}>
                  <ArtImage artwork={a} radius={4} showQrMark={false} />
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}

      {view === 'mine' && (
        <>
          <View style={styles.mineHead}>
            <Text style={styles.mineCount}>{t(locale, 'col.nPaintings', { n: mineCells.length })}</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
            <Text style={styles.sortLabel}>{t(locale, 'col.sort')}</Text>
            {SORTS.map((s) => (
              <Chip key={s.key} label={t(locale, s.labelKey)} active={sort === s.key} onPress={() => setSort(s.key)} />
            ))}
            <Pressable
              onPress={() => setFavOnly((x) => !x)}
              style={[styles.chip, favOnly && { backgroundColor: COLORS.danger + '22', borderColor: COLORS.danger }]}
            >
              <Heart size={15} color={favOnly ? COLORS.danger : COLORS.textDim} weight={favOnly ? 'fill' : 'regular'} />
            </Pressable>
            <View style={styles.sep} />
            {RARITY_ORDER.map((r) => (
              <Pressable
                key={r}
                onPress={() => setRarity(rarity === r ? null : r)}
                style={[styles.dotChip, rarity === r && { borderColor: RARITY[r].color, backgroundColor: RARITY[r].color + '22' }]}
              >
                <View style={[styles.dot, { backgroundColor: RARITY[r].color }]} />
              </Pressable>
            ))}
          </ScrollView>
        </>
      )}

      {view === 'index' && (
        <>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
            {(['all', 'owned', 'missing'] as OwnedFilter[]).map((f) => (
              <Chip key={f} label={t(locale, 'col.filter.' + f)} active={ownedFilter === f} onPress={() => setOwnedFilter(f)} />
            ))}
            <Pressable
              onPress={() => setFavOnly((x) => !x)}
              style={[styles.chip, favOnly && { backgroundColor: COLORS.danger + '22', borderColor: COLORS.danger }]}
            >
              <Heart size={15} color={favOnly ? COLORS.danger : COLORS.textDim} weight={favOnly ? 'fill' : 'regular'} />
            </Pressable>
            <View style={styles.sep} />
            {RARITY_ORDER.map((r) => (
              <Pressable
                key={r}
                onPress={() => setRarity(rarity === r ? null : r)}
                style={[styles.dotChip, rarity === r && { borderColor: RARITY[r].color, backgroundColor: RARITY[r].color + '22' }]}
              >
                <View style={[styles.dot, { backgroundColor: RARITY[r].color }]} />
              </Pressable>
            ))}
          </ScrollView>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
            <Text style={styles.sortLabel}>{t(locale, 'col.sort')}</Text>
            {SORTS.map((s) => (
              <Chip key={s.key} label={t(locale, s.labelKey)} active={sort === s.key} onPress={() => setSort(s.key)} />
            ))}
          </ScrollView>
        </>
      )}
      <View style={{ height: SPACING.xs }} />
    </View>
  );

  const renderIndexRow = ({ item: row }: { item: GridRow }) => {
    if (row.type === 'label') return null; // index view has no section labels
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
          <ArtworkCard
            key={a.id}
            artwork={a}
            owned={isOwned(a.id)}
            count={countOf(a.id)}
            width={cardWidth}
            favorite={isFavorite(a.id)}
          />
        ))}
        {row.items.length === 1 && <View style={{ width: cardWidth }} />}
      </View>
    );
  };

  const renderMineCell = ({ item: cell }: { item: PaintingCell }) => {
    const art = cell.kind === 'single' ? cell.art : cell.rep;
    const color = RARITY[art.rarity].color;
    return (
      <Pressable
        onPress={() => router.push(`/artwork/${art.id}`)}
        style={({ pressed }) => [
          styles.mineTile,
          { width: mineWidth, height: mineWidth * 1.15, borderColor: color + 'AA' },
          pressed && { opacity: 0.85 },
        ]}
      >
        {cell.kind === 'single' ? (
          <ArtImage artwork={art} radius={3} />
        ) : (
          <PartComposite parts={cell.parts} owned={owned} />
        )}
        <View style={[styles.mineDot, { backgroundColor: color }]} />
        {isFavorite(art.id) && (
          <View style={styles.mineHeart}>
            <Heart size={11} color={COLORS.danger} weight="fill" />
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        key={view}
        data={
          view === 'galleries'
            ? (COLLECTIONS as any[])
            : view === 'mine'
              ? (mineCells as any[])
              : (indexRows as any[])
        }
        keyExtractor={
          (view === 'galleries'
            ? (item: any) => item.id
            : view === 'mine'
              ? (item: PaintingCell) => (item.kind === 'single' ? item.art.id : item.group)
              : (item: GridRow) => rowKey(item)) as any
        }
        numColumns={view === 'mine' ? 3 : 1}
        ListHeaderComponent={header}
        columnWrapperStyle={view === 'mine' ? { gap, paddingHorizontal: SPACING.lg } : undefined}
        contentContainerStyle={{ gap, paddingBottom: insets.bottom + SPACING.xxl }}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {view === 'mine' ? t(locale, 'col.emptyMine') : t(locale, 'col.emptyFilters')}
          </Text>
        }
        renderItem={
          (view === 'galleries'
            ? ({ item }: any) => (
                <GalleryCard
                  collection={item}
                  isOwned={isOwned}
                  owned={owned}
                  onPress={() => router.push(`/collection/${item.id}`)}
                />
              )
            : view === 'mine'
              ? renderMineCell
              : renderIndexRow) as any
        }
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        updateCellsBatchingPeriod={80}
        windowSize={5}
        removeClippedSubviews
      />
    </View>
  );
}

function GalleryCard({
  collection,
  isOwned,
  owned,
  onPress,
}: {
  collection: CollectionMeta;
  isOwned: (id: string) => boolean;
  owned: Record<string, { count: number; firstSeen: number }>;
  onPress: () => void;
}) {
  const { locale } = useLocale();
  // Counted in paintings (a multi-part work counts once, when complete).
  const items = paintingsOf(collection.id);
  const have = items.filter((a) => isPaintingComplete(a, owned)).length;
  const pct = items.length ? have / items.length : 0;

  // Cover art rotates daily through this room's showpieces — its epic, legendary
  // and unique pieces — so it alternates instead of always showing the same one.
  // Prefers ones you actually own (shown sharp); falls back to hidden teasers.
  const featured = items
    .filter((a) => rarityRank(a.rarity) >= 2) // epic, legendary, unique
    .sort((a, b) => rarityRank(b.rarity) - rarityRank(a.rarity) || a.title.localeCompare(b.title));
  const featuredOwned = featured.filter((a) => isOwned(a.id));
  const pool = featuredOwned.length ? featuredOwned : featured.length ? featured : items;
  const dayIndex = Math.floor(Date.now() / 86400000);
  const cover = pool.length ? pool[dayIndex % pool.length] : undefined;
  const coverOwned = cover ? isOwned(cover.id) : false;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.galleryCard, pressed && { borderColor: COLORS.gold }]}
    >
      {cover && (
        <View style={[styles.coverFrame, { borderColor: RARITY[cover.rarity].color + '88' }]}>
          <ArtImage artwork={cover} hidden={!coverOwned} radius={4} showQrMark={false} />
        </View>
      )}
      <View style={{ flex: 1, gap: 6 }}>
        <Text style={styles.galleryRoman}>{t(locale, 'col.collectionRoman', { roman: collection.roman })}</Text>
        <Text style={styles.galleryName} numberOfLines={2}>
          {collectionName(collection.id, locale)}
        </Text>
        <Text style={styles.galleryCount}>
          {t(locale, 'col.onDisplay', { have, total: items.length })}
        </Text>
        <View style={styles.galleryBar}>
          <View style={[styles.galleryBarFill, { width: `${pct * 100}%` }]} />
        </View>
      </View>
      <View style={styles.galleryRight}>
        <Text style={styles.galleryPct}>{Math.round(pct * 100)}%</Text>
        <CaretRight size={14} color={COLORS.gold} weight="bold" />
      </View>
    </Pressable>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Chip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && { backgroundColor: COLORS.gold + '22', borderColor: COLORS.gold }]}>
      <Text style={[styles.chipText, active && { color: COLORS.gold }]}>{label}</Text>
    </Pressable>
  );
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  head: { paddingHorizontal: SPACING.lg, flexDirection: 'row', alignItems: 'flex-end', gap: SPACING.md },
  roomBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4,
    backgroundColor: COLORS.card, borderColor: COLORS.cardBorder, borderWidth: 1,
    borderRadius: RADIUS.pill, paddingHorizontal: SPACING.md, paddingVertical: 8,
  },
  roomBtnText: { color: COLORS.gold, fontWeight: '700', fontSize: 13 },
  kicker: { color: COLORS.gold, fontSize: 12, fontWeight: '800', letterSpacing: 3 },
  h1: { color: COLORS.text, fontSize: 30, fontWeight: '700', marginTop: 2, fontFamily: FONT.serif },
  progressCard: {
    marginHorizontal: SPACING.lg, backgroundColor: COLORS.card, borderColor: COLORS.cardBorder,
    borderWidth: 1, borderRadius: RADIUS.lg, padding: SPACING.lg, gap: SPACING.md,
  },
  progressTop: { flexDirection: 'row', alignItems: 'baseline', gap: SPACING.sm },
  progressPct: { color: COLORS.gold, fontSize: 34, fontWeight: '900' },
  progressSub: { color: COLORS.textDim, fontSize: 14 },
  bar: { height: 8, backgroundColor: COLORS.bgElevated, borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: COLORS.gold, borderRadius: 4 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: SPACING.xs },
  stat: { alignItems: 'center', flex: 1 },
  statValue: { color: COLORS.text, fontSize: 18, fontWeight: '800' },
  statLabel: { color: COLORS.textFaint, fontSize: 12, marginTop: 2 },
  segment: {
    flexDirection: 'row', marginHorizontal: SPACING.lg, backgroundColor: COLORS.bgElevated,
    borderRadius: RADIUS.pill, padding: 4,
  },
  segItem: { flex: 1, alignItems: 'center', paddingVertical: SPACING.sm, borderRadius: RADIUS.pill },
  segItemActive: { backgroundColor: COLORS.card },
  segText: { color: COLORS.textDim, fontWeight: '700', fontSize: 14 },
  segTextActive: { color: COLORS.gold },
  recentTitle: {
    color: COLORS.gold, fontSize: 12, fontWeight: '800', letterSpacing: 1.5,
    paddingHorizontal: SPACING.lg, textTransform: 'uppercase',
  },
  recentRow: { paddingHorizontal: SPACING.lg, gap: SPACING.sm, paddingTop: SPACING.sm },
  recentThumb: {
    width: 62, height: 74, borderRadius: RADIUS.sm, borderWidth: 2,
    backgroundColor: COLORS.mat, padding: 3,
  },
  chips: { paddingHorizontal: SPACING.lg, gap: SPACING.sm, alignItems: 'center' },
  sortLabel: { color: COLORS.textFaint, fontSize: 12, fontWeight: '700', marginRight: 2 },
  sep: { width: 1, height: 22, backgroundColor: COLORS.hairline, marginHorizontal: 4 },
  chip: {
    borderColor: COLORS.cardBorder, borderWidth: 1, borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.md, paddingVertical: 7, backgroundColor: COLORS.card,
  },
  chipText: { color: COLORS.textDim, fontSize: 13, fontWeight: '600' },
  dotChip: {
    borderColor: COLORS.cardBorder, borderWidth: 1, borderRadius: RADIUS.pill,
    paddingHorizontal: 12, paddingVertical: 9, backgroundColor: COLORS.card,
    alignItems: 'center', justifyContent: 'center',
  },
  dot: { width: 12, height: 12, borderRadius: 6 },
  // Gallery cards
  galleryCard: {
    marginHorizontal: SPACING.lg, backgroundColor: COLORS.card, borderColor: COLORS.cardBorder,
    borderWidth: 1, borderRadius: RADIUS.lg, padding: SPACING.md,
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
  },
  coverFrame: {
    width: 74, height: 84, borderWidth: 2, borderRadius: RADIUS.sm,
    padding: 3, backgroundColor: COLORS.mat,
  },
  galleryRoman: { color: COLORS.gold, fontSize: 11, fontWeight: '800', letterSpacing: 2 },
  galleryName: { color: COLORS.text, fontSize: 18, fontWeight: '700', fontFamily: FONT.serif },
  galleryBar: { height: 6, backgroundColor: COLORS.bgElevated, borderRadius: 3, overflow: 'hidden', marginTop: 2 },
  galleryBarFill: { height: '100%', backgroundColor: COLORS.gold, borderRadius: 3 },
  galleryCount: { color: COLORS.textDim, fontSize: 12 },
  galleryRight: { alignItems: 'center', gap: 2 },
  galleryPct: { color: COLORS.gold, fontSize: 16, fontWeight: '800' },
  empty: { color: COLORS.textFaint, textAlign: 'center', padding: SPACING.xxl },
  // "My paintings" gallery
  mineHead: { paddingHorizontal: SPACING.lg },
  mineCount: { color: COLORS.textDim, fontSize: 13, fontWeight: '600' },
  mineTile: {
    backgroundColor: COLORS.mat, borderWidth: 2, borderRadius: RADIUS.sm, padding: 3,
  },
  mineDot: { position: 'absolute', top: 5, right: 5, width: 9, height: 9, borderRadius: 5 },
  mineHeart: { position: 'absolute', bottom: 5, left: 5 },
});
