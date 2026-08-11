// Developer view: the whole catalog, unlocked or not, so you can audit every
// piece — check the image is the right painting, see what's missing metadata,
// and decide which works to split into parts.

import { useRouter } from 'expo-router';
import { ArrowLeft, Minus, Plus } from 'phosphor-react-native';
import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArtImage } from '@/components/ArtImage';
import { ARTWORKS, type Artwork } from '@/data/artworks';
import { COLLECTIONS, COLLECTION_BY_ID } from '@/data/collections';
import { ARTWORK_DETAILS } from '@/data/details';
import { ARTWORK_IMAGES } from '@/data/images';
import { MOSAICS } from '@/data/mosaics';
import { IMG_CARD } from '@/game/images';
import { RARITY, FINALE_COLOR } from '@/game/rarity';
import { FINALE_ID } from '@/game/parts';
import { useGame } from '@/store/GameStore';
import { COLORS, FONT, RADIUS, SPACING } from '@/theme/theme';

type Filter = 'all' | 'noImage' | 'noAbout' | 'noMuseum' | 'noMosaic' | 'parts';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'noImage', label: 'No image' },
  { key: 'noMosaic', label: 'No mosaic' },
  { key: 'noAbout', label: 'No text' },
  { key: 'noMuseum', label: 'No museum' },
  { key: 'parts', label: 'Parts' },
];

export default function DevCatalogScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isOwned, devToggleOwned } = useGame();
  const [filter, setFilter] = useState<Filter>('all');
  const [collectionId, setCollectionId] = useState<string | null>(null);

  const data = useMemo(() => {
    let list = ARTWORKS.slice();
    if (collectionId) list = list.filter((a) => a.collectionId === collectionId);
    if (filter === 'noImage') list = list.filter((a) => !ARTWORK_IMAGES[a.id]);
    if (filter === 'noMosaic') list = list.filter((a) => ARTWORK_IMAGES[a.id] && !MOSAICS[a.id]);
    if (filter === 'noAbout') list = list.filter((a) => !ARTWORK_DETAILS[a.id]?.about);
    if (filter === 'noMuseum') list = list.filter((a) => !ARTWORK_DETAILS[a.id]?.museum);
    if (filter === 'parts') list = list.filter((a) => !!a.partGroup);
    return list;
  }, [filter, collectionId]);

  const totals = useMemo(
    () => ({
      total: ARTWORKS.length,
      images: ARTWORKS.filter((a) => ARTWORK_IMAGES[a.id]).length,
      mosaics: ARTWORKS.filter((a) => MOSAICS[a.id]).length,
      about: ARTWORKS.filter((a) => ARTWORK_DETAILS[a.id]?.about).length,
      museum: ARTWORKS.filter((a) => ARTWORK_DETAILS[a.id]?.museum).length,
    }),
    []
  );

  const header = (
    <View style={{ gap: SPACING.md }}>
      <View style={[styles.topBar, { paddingTop: insets.top + SPACING.sm }]}>
        <Pressable style={styles.iconBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color={COLORS.text} />
        </Pressable>
      </View>
      <View style={styles.head}>
        <Text style={styles.kicker}>DEVELOPER</Text>
        <Text style={styles.h1}>All artworks</Text>
        <Text style={styles.stats}>
          {totals.total} pieces · {totals.images} images · {totals.mosaics} mosaics ·{' '}
          {totals.about} texts · {totals.museum} museums
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {FILTERS.map((f) => (
          <Pressable
            key={f.key}
            onPress={() => setFilter(f.key)}
            style={[styles.chip, filter === f.key && { borderColor: COLORS.gold, backgroundColor: COLORS.gold + '22' }]}
          >
            <Text style={[styles.chipText, filter === f.key && { color: COLORS.gold }]}>{f.label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        <Pressable
          onPress={() => setCollectionId(null)}
          style={[styles.chip, !collectionId && { borderColor: COLORS.gold, backgroundColor: COLORS.gold + '22' }]}
        >
          <Text style={[styles.chipText, !collectionId && { color: COLORS.gold }]}>All rooms</Text>
        </Pressable>
        {COLLECTIONS.map((c) => (
          <Pressable
            key={c.id}
            onPress={() => setCollectionId(collectionId === c.id ? null : c.id)}
            style={[styles.chip, collectionId === c.id && { borderColor: COLORS.gold, backgroundColor: COLORS.gold + '22' }]}
          >
            <Text style={[styles.chipText, collectionId === c.id && { color: COLORS.gold }]}>{c.roman}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Text style={styles.showing}>
        Showing {data.length} · tap = full screen · hold = details · +/− adds or removes it
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(a) => a.id}
        ListHeaderComponent={header}
        contentContainerStyle={{ paddingBottom: insets.bottom + SPACING.xxl, gap: SPACING.sm }}
        renderItem={({ item }: { item: Artwork }) => {
          const d = ARTWORK_DETAILS[item.id];
          const hasImage = !!ARTWORK_IMAGES[item.id];
          // The Muse sits above every rarity, so she never wears a rarity colour.
          const tone = item.id === FINALE_ID ? FINALE_COLOR : RARITY[item.rarity].color;
          return (
            <Pressable
              style={styles.row}
              // Straight to the full-screen viewer: it always shows the real
              // image, owned or not, which is the whole point of auditing.
              onPress={() => router.push({ pathname: '/viewer', params: { id: item.id } })}
              onLongPress={() => router.push({ pathname: '/artwork/[id]', params: { id: item.id, dev: '1' } })}
            >
              <View style={[styles.thumb, { borderColor: tone + '88' }]}>
                {/* never hidden here — auditing needs the real picture */}
                <ArtImage artwork={item} hidden={false} radius={3} width={IMG_CARD} />
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.artist} numberOfLines={1}>
                  {item.artist}
                </Text>
                <Text style={styles.meta} numberOfLines={1}>
                  {COLLECTION_BY_ID[item.collectionId]?.roman} · {d?.year ?? '—'} ·{' '}
                  {d?.museum ?? 'no museum'}
                </Text>
                <View style={styles.badges}>
                  {!hasImage && <Badge label="no image" color={COLORS.danger} />}
                  {hasImage && !MOSAICS[item.id] && <Badge label="no mosaic" color="#C98A4B" />}
                  {!d?.about && <Badge label="no text" color="#8A7ACB" />}
                  {item.partGroup && (
                    <Badge label={`part ${item.partIndex}/${item.partTotal}`} color={COLORS.success} />
                  )}
                </View>
              </View>
              <View style={styles.rowRight}>
                <View style={[styles.dot, { backgroundColor: tone }]} />
                {/* Grant / revoke the piece to test flows without scanning */}
                <Pressable
                  hitSlop={8}
                  onPress={() => devToggleOwned(item.id)}
                  style={[
                    styles.ownBtn,
                    isOwned(item.id)
                      ? { borderColor: COLORS.success, backgroundColor: COLORS.success + '22' }
                      : { borderColor: COLORS.cardBorder },
                  ]}
                >
                  {isOwned(item.id) ? (
                    <Minus size={14} color={COLORS.success} weight="bold" />
                  ) : (
                    <Plus size={14} color={COLORS.textDim} weight="bold" />
                  )}
                </Pressable>
              </View>
            </Pressable>
          );
        }}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={5}
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <View style={[styles.badge, { borderColor: color + '88', backgroundColor: color + '1A' }]}>
      <Text style={[styles.badgeText, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  topBar: { paddingHorizontal: SPACING.lg },
  iconBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.card,
    borderColor: COLORS.cardBorder, borderWidth: 1, alignItems: 'center', justifyContent: 'center',
  },
  head: { paddingHorizontal: SPACING.lg },
  kicker: { color: COLORS.gold, fontSize: 12, fontWeight: '800', letterSpacing: 3 },
  h1: { color: COLORS.text, fontSize: 28, fontWeight: '700', marginTop: 2, fontFamily: FONT.serif },
  stats: { color: COLORS.textDim, fontSize: 12, marginTop: 6 },
  chips: { paddingHorizontal: SPACING.lg, gap: SPACING.sm },
  chip: {
    borderColor: COLORS.cardBorder, borderWidth: 1, borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.md, paddingVertical: 7, backgroundColor: COLORS.card,
  },
  chipText: { color: COLORS.textDim, fontSize: 13, fontWeight: '600' },
  showing: { color: COLORS.textFaint, fontSize: 12, paddingHorizontal: SPACING.lg },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    marginHorizontal: SPACING.lg, backgroundColor: COLORS.card,
    borderColor: COLORS.cardBorder, borderWidth: 1, borderRadius: RADIUS.md, padding: SPACING.sm,
  },
  thumb: { width: 84, height: 96, borderRadius: RADIUS.sm, borderWidth: 1, padding: 2, backgroundColor: COLORS.mat },
  title: { color: COLORS.text, fontSize: 14, fontWeight: '700' },
  artist: { color: COLORS.textDim, fontSize: 12 },
  meta: { color: COLORS.textFaint, fontSize: 11 },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 3 },
  badge: { borderWidth: 1, borderRadius: RADIUS.pill, paddingHorizontal: 6, paddingVertical: 1 },
  badgeText: { fontSize: 10, fontWeight: '700' },
  dot: { width: 10, height: 10, borderRadius: 5 },
  rowRight: { alignItems: 'center', gap: SPACING.sm },
  ownBtn: {
    width: 30, height: 30, borderRadius: 15, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center',
  },
});
