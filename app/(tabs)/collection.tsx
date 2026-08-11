import { useRouter } from 'expo-router';
import { CaretRight, Heart, Sparkle } from 'phosphor-react-native';
import React, { useMemo, useState, useEffect} from 'react';
import {
  Modal,
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
import { titleFor } from '@/data/titles';
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
  FINALE_ID,
  type GridRow,
  type PaintingCell,
} from '@/game/parts';
import { RARITY, RARITY_ORDER, rarityRank, artworkRank, FINALE_COLOR, type Rarity } from '@/game/rarity';
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
  const { owned, isOwned, countOf, shards, isFavorite, finaleSeen, markFinaleSeen } = useGame();
  const { locale } = useLocale();

  const [view, setView] = useState<ViewMode>('galleries');
  const [rarity, setRarity] = useState<Rarity | null>(null);
  const [ownedFilter, setOwnedFilter] = useState<OwnedFilter>('all');
  const [favOnly, setFavOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>('rarity');

  const stats = useMemo(() => collectionStats(owned), [owned]);

  // The finale reveal: fires once, the first time the 300 are all complete.
  const [showFinale, setShowFinale] = useState(false);
  useEffect(() => {
    if (stats.perfect && !finaleSeen) setShowFinale(true);
  }, [stats.perfect, finaleSeen]);
  const closeFinale = () => {
    setShowFinale(false);
    markFinaleSeen();
  };

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
      // The Muse outranks unique: artworkRank puts her above the whole ladder.
      rarity: (a, b) =>
        artworkRank(b.id, b.rarity) - artworkRank(a.id, a.rarity) ||
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
    // The finale joins the index only once it's yours — before that it doesn't
    // exist as far as the catalogue is concerned.
    const finale = ARTWORK_BY_ID[FINALE_ID];
    let list = PAINTINGS.concat(finale && owned[FINALE_ID] ? [finale] : []);
    if (rarity) list = list.filter((a) => a.rarity === rarity);
    if (ownedFilter === 'owned') list = list.filter((a) => isPaintingComplete(a, owned));
    if (ownedFilter === 'missing') list = list.filter((a) => !isPaintingComplete(a, owned));
    if (favOnly) list = list.filter((a) => isFavorite(a.id));
    list.sort(cmp[sort]);
    return packRows(toPaintingCells(list));
  }, [rarity, ownedFilter, favOnly, sort, owned, cmp, isFavorite]);

  // "All my paintings": one tile per painting you hold at least part of.
  const mineCells = useMemo(() => {
    const finale = ARTWORK_BY_ID[FINALE_ID];
    let list = PAINTINGS.concat(finale && owned[FINALE_ID] ? [finale] : []).filter((a) =>
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
          {/* floor, not round: 299/300 must read 99%, never a premature 100%. */}
          <Text style={styles.progressPct}>
            {stats.discovered >= stats.total ? 100 : Math.min(99, Math.floor(stats.percent * 100))}%
          </Text>
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

        {/* The 301st piece: a slot that only exists once the 300 are complete —
            empty and waiting while it's still out there, then the piece itself. */}
        {stats.perfect && (
          <Pressable
            style={[styles.finaleSlot, stats.hasFinale && styles.finaleSlotFound]}
            disabled={!stats.hasFinale}
            onPress={() => router.push(`/artwork/${FINALE_ID}`)}
          >
            {/* Centring collapses ArtImage's flex:1, so only centre the placeholder icon. */}
            <View style={[styles.finaleThumb, !stats.hasFinale && styles.finaleThumbEmpty]}>
              {stats.hasFinale && ARTWORK_BY_ID[FINALE_ID] ? (
                <ArtImage artwork={ARTWORK_BY_ID[FINALE_ID]} radius={RADIUS.sm} showQrMark={false} instant />
              ) : (
                <Sparkle size={20} color={COLORS.gold} weight="fill" />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.finaleSlotTitle} numberOfLines={1}>
                {stats.hasFinale && ARTWORK_BY_ID[FINALE_ID]
                  ? // just "The Muse" — the sitter's name doesn't fit next to the thumb
                    titleFor(FINALE_ID, locale, ARTWORK_BY_ID[FINALE_ID].title).split('—')[0].trim()
                  : t(locale, 'finale.slotTitle')}
              </Text>
              <Text style={styles.finaleSlotSub}>
                {stats.hasFinale ? t(locale, 'finale.slotFound') : t(locale, 'finale.slotHint')}
              </Text>
            </View>
            {stats.hasFinale && <CaretRight size={16} color={COLORS.gold} />}
          </Pressable>
        )}
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
                <View
                  style={[
                    styles.recentThumb,
                    { borderColor: RARITY[a.rarity].color + '99' },
                    // The Muse never wears a rarity colour — she's her own tier.
                    a.id === FINALE_ID && styles.recentThumbFinale,
                  ]}
                >
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
    const isFin = art.id === FINALE_ID;
    const color = isFin ? FINALE_COLOR : RARITY[art.rarity].color;
    return (
      <Pressable
        onPress={() => router.push(`/artwork/${art.id}`)}
        style={({ pressed }) => [
          styles.mineTile,
          { width: mineWidth, height: mineWidth * 1.15, borderColor: color + 'AA' },
          // She reads as the top of the ladder: a solid white edge that glows.
          isFin && styles.mineTileFinale,
          pressed && { opacity: 0.85 },
        ]}
      >
        {cell.kind === 'single' ? (
          <ArtImage artwork={art} radius={3} />
        ) : (
          <PartComposite parts={cell.parts} owned={owned} />
        )}
        <View style={[styles.mineDot, { backgroundColor: color }, isFin && styles.mineDotFinale]} />
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

      {/* Shown once, the moment the 300 are complete: the catalogue was never 300. */}
      <Modal visible={showFinale} transparent animationType="fade" onRequestClose={closeFinale}>
        <View style={styles.finaleBackdrop}>
          <View style={styles.finaleCard}>
            <Sparkle size={34} color={COLORS.gold} weight="fill" />
            <Text style={styles.finaleTitle}>{t(locale, 'finale.title')}</Text>
            <Text style={styles.finaleBody}>{t(locale, 'finale.body')}</Text>
            <Text style={styles.finaleCounter}>{t(locale, 'finale.counter')}</Text>
            <Pressable style={styles.finaleBtn} onPress={closeFinale}>
              <Text style={styles.finaleBtnText}>{t(locale, 'finale.cta')}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  // A finished collection gets the same golden treatment as the 301st piece.
  const complete = items.length > 0 && have >= items.length;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.galleryCard,
        complete && styles.galleryCardDone,
        pressed && { borderColor: COLORS.gold },
      ]}
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
        <Text style={[styles.galleryPct, complete && styles.galleryPctDone]}>
          {complete ? 100 : Math.min(99, Math.floor(pct * 100))}%
        </Text>
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
  // The Muse: a solid, lit white edge so she's unmistakable in a grid of 300.
  mineTileFinale: { borderWidth: 3, borderColor: '#FFFFFF', backgroundColor: 'rgba(255,255,255,0.14)' },
  recentThumbFinale: { borderWidth: 3, borderColor: '#FFFFFF', backgroundColor: 'rgba(255,255,255,0.14)' },
  mineDot: { position: 'absolute', top: 5, right: 5, width: 9, height: 9, borderRadius: 5 },
  mineDotFinale: { width: 12, height: 12, borderRadius: 6, borderWidth: 1, borderColor: 'rgba(0,0,0,0.35)' },
  mineHeart: { position: 'absolute', bottom: 5, left: 5 },
  finaleBackdrop: {
    flex: 1, backgroundColor: 'rgba(6,6,10,0.88)',
    alignItems: 'center', justifyContent: 'center', padding: SPACING.lg,
  },
  finaleCard: {
    width: '100%', maxWidth: 420, alignItems: 'center', gap: SPACING.md,
    backgroundColor: COLORS.card, borderColor: COLORS.gold, borderWidth: 1,
    borderRadius: RADIUS.lg, padding: SPACING.xl,
  },
  finaleTitle: {
    color: COLORS.gold, fontSize: 22, fontWeight: '800',
    fontFamily: FONT.serif, textAlign: 'center',
  },
  finaleBody: { color: COLORS.text, fontSize: 14, lineHeight: 21, textAlign: 'center' },
  finaleCounter: { color: COLORS.textDim, fontSize: 13, fontWeight: '700', textAlign: 'center' },
  finaleBtn: {
    marginTop: SPACING.xs, backgroundColor: COLORS.gold, borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.xl, paddingVertical: SPACING.md,
  },
  finaleBtnText: { color: '#0B0B0F', fontWeight: '800', fontSize: 15 },
  finaleSlot: {
    marginTop: SPACING.sm, flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    borderRadius: RADIUS.md, padding: SPACING.sm,
    borderWidth: 1, borderStyle: 'dashed', borderColor: 'rgba(201,162,75,0.55)',
    backgroundColor: 'rgba(201,162,75,0.07)',
  },
  finaleSlotFound: { borderStyle: 'solid', borderColor: '#FFFFFF', backgroundColor: 'rgba(255,255,255,0.10)' },
  finaleThumb: {
    width: 84, height: 96, borderRadius: RADIUS.sm, overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.55)',
  },
  finaleThumbEmpty: { alignItems: 'center', justifyContent: 'center' },
  galleryCardDone: {
    borderColor: COLORS.gold,
    backgroundColor: 'rgba(201,162,75,0.10)',
  },
  galleryPctDone: { color: COLORS.gold },
  finaleSlotTitle: { color: '#FFFFFF', fontSize: 14, fontWeight: '800', fontFamily: FONT.serif },
  finaleSlotSub: { color: COLORS.textDim, fontSize: 12, marginTop: 2 },
});
