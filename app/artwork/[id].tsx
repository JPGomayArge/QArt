import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  ArrowSquareOut,
  Bank,
  Heart,
  Lightbulb,
  MagnifyingGlassPlus,
  Sparkle,
  Stack as StackIcon,
} from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArtImage } from '@/components/ArtImage';
import { ARTWORK_BY_ID } from '@/data/artworks';
import { ARTWORK_DETAILS } from '@/data/details';
import { museumUrl } from '@/data/museumUrls';
import { ARTWORK_FACTS, factFor } from '@/data/facts';
import { ARTIST_INFO } from '@/data/artistInfo';
import { DETAIL_INFO } from '@/data/detailInfo';
import { aboutTextFor } from '@/data/aboutText';
import { movementKeyFor, movementInfo } from '@/data/movementInfo';
import { techniqueKeyFor, techniqueInfo } from '@/data/techniqueInfo';
import { COLLECTION_BY_ID, collectionName, collectionFull } from '@/data/collections';
import { titleFor } from '@/data/titles';
import { t } from '@/data/ui';
import { resolveArtworkImage, IMG_DETAIL } from '@/game/images';
import { partProgress, teaser, FINALE_ID } from '@/game/parts';
import { partsOf } from '@/game/parts';
import { PartComposite } from '@/components/PartPaintingCard';
import { isExclusive } from '@/game/hash';
import { useLocale } from '@/i18n';
import { pick } from '@/data/localized';
import { track } from '@/game/telemetry';
import { RARITY, SPECIAL_COLOR, FINALE_COLOR } from '@/game/rarity';
import { useGame } from '@/store/GameStore';
import { formatDimensions } from '@/data/dimensions';
import { COLORS, FONT, RADIUS, SPACING } from '@/theme/theme';

export default function ArtworkDetail() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  // `dev=1` comes from the developer catalog: show the real picture even if the
  // piece hasn't been discovered, so it can be audited.
  const { id, dev } = useLocalSearchParams<{ id: string; dev?: string }>();
  const auditMode = dev === '1';
  const artwork = id ? ARTWORK_BY_ID[id] : undefined;
  const { owned: ownedMap, countOf, spareOf, convertSpareToShards, isFavorite, toggleFavorite, unit } = useGame();
  const { locale } = useLocale();
  const [hero, setHero] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    if (artwork) resolveArtworkImage(artwork).then((u) => alive && setHero(u));
    return () => {
      alive = false;
    };
  }, [artwork]);

  if (!artwork) {
    return (
      <View style={styles.container}>
        <Text style={styles.dim}>{t(locale, 'art.notFound')}</Text>
      </View>
    );
  }

  const rarity = RARITY[artwork.rarity];
  const exclusive = isExclusive(artwork.id);
  const finale = artwork.id === FINALE_ID; // its own colour: luminous white
  const accent = finale ? FINALE_COLOR : exclusive ? SPECIAL_COLOR : rarity.color;
  const collection = COLLECTION_BY_ID[artwork.collectionId];
  const detail = ARTWORK_DETAILS[artwork.id] ?? {};
  const spare = spareOf(artwork.id);
  const owned = countOf(artwork.id);
  const pp = partProgress(artwork, ownedMap);
  // A single piece is always "whole"; a multi-part work is only whole once every
  // fragment is collected. Gates About / Fact / Where-it-lives.
  const whole = !pp.isPart || pp.complete;
  const sliceThis = owned > 0 && pp.isPart && !pp.complete ? { index: artwork.partIndex!, total: artwork.partTotal! } : undefined;
  // A multi-part work is shown (and zoomable) based on the WHOLE group, not just
  // this fragment — so owning part 2 still lets you open and see what you have.
  const showComposite = pp.isPart && !pp.complete && !auditMode;
  const groupParts = artwork.partGroup ? partsOf(artwork.partGroup) : [];
  const canZoom = auditMode || (pp.isPart ? pp.have > 0 : owned > 0);
  const titleEn = detail.titleEn ?? artwork.titleEn;
  const showEn = titleEn && titleEn.toLowerCase() !== artwork.title.toLowerCase();

  const info = ARTIST_INFO[artwork.artist] ?? {};
  const di = DETAIL_INFO[artwork.id] ?? {};
  const originCountry = artwork.country ?? detail.country ?? info.country;
  const movement = di.movement ?? detail.movement ?? info.movement;
  // Curated fallback fills the gaps Wikidata never returned (and corrects a few
  // wrong scrapes). Curated value wins for the specific fields it defines.
  const year = di.year ?? detail.year;
  const technique = di.technique ?? detail.technique;
  const museumBase = di.museum ?? detail.museum;
  // Localized overrides (fall back to the base catalog text when not translated).
  // OUR structured text (description / history), localized with fallback to
  // English (and to a short placeholder for pieces without our text yet).
  const aboutT = aboutTextFor(artwork.id, locale);
  const movKey = movementKeyFor(movement);
  const techKey = techniqueKeyFor(technique);
  // Movement/technique display names come from our translated info tables (title
  // field); fall back to the localized-catalog value, then the base string.
  const movementL = (movKey && movementInfo(movKey, locale)?.title) || pick(artwork.id, 'movement', locale, movement);
  const techniqueL = (techKey && techniqueInfo(techKey, locale)?.title) || pick(artwork.id, 'technique', locale, technique);
  const museum = pick(artwork.id, 'museum', locale, museumBase);
  const titleL = titleFor(artwork.id, locale, artwork.title);
  const museumPlace = [detail.museumCity, detail.museumCountry].filter(Boolean).join(', ');
  // Open the museum's own official website (falls back to a name-only search for
  // the few venues we don't have a URL for — never a search of the artwork).
  const museumLink = museumUrl(museumBase ?? museum);

  // Rows with an `onPress` are tappable and open an info page.
  const dims = formatDimensions(artwork.id, unit);
  const meta: { k: string; v?: string; onPress?: () => void }[] = [
    { k: t(locale, 'art.meta.collection'), v: collection ? collectionFull(collection.id, locale) : undefined },
    { k: t(locale, 'art.meta.artist'), v: artwork.artist, onPress: () => router.push(`/artist/${encodeURIComponent(artwork.artist)}`) },
    { k: t(locale, 'art.meta.year'), v: year },
    { k: t(locale, 'art.meta.movement'), v: movementL, onPress: movKey ? () => router.push(`/movement/${movKey}`) : undefined },
    { k: t(locale, 'art.meta.technique'), v: techniqueL, onPress: techKey ? () => router.push(`/technique/${techKey}`) : undefined },
    ...(dims ? [{ k: t(locale, 'art.meta.dimensions'), v: dims }] : []),
    { k: t(locale, 'art.meta.country'), v: originCountry, onPress: originCountry ? () => router.push(`/country/${encodeURIComponent(originCountry)}`) : undefined },
  ];

  return (
    <View style={styles.container}>
      {hero && (
        <Image source={{ uri: hero }} style={styles.bgBlur} contentFit="cover" blurRadius={18} />
      )}
      <View style={[styles.bgScrim]} />

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + SPACING.xxl }}
        showsVerticalScrollIndicator={false}
      >
        {/* Spacer so content clears the floating bar overlay below. */}
        <View style={{ height: insets.top + 52 }} />

        <View style={styles.heroWrap}>
          <Pressable
            style={[styles.heroFrame, { borderColor: accent }]}
            onPress={() =>
              canZoom && router.push({ pathname: '/viewer', params: { id: artwork.id } })
            }
          >
            {showComposite ? (
              <PartComposite parts={groupParts} owned={ownedMap} width={IMG_DETAIL} />
            ) : (
              <ArtImage
                artwork={artwork}
                hidden={owned === 0 && !auditMode}
                radius={RADIUS.md}
                part={sliceThis}
                width={IMG_DETAIL}
              />
            )}
            {canZoom && (
              <View style={styles.zoomHint}>
                <MagnifyingGlassPlus size={14} color={COLORS.text} weight="bold" />
              </View>
            )}
          </Pressable>
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>{titleL}</Text>
          {showEn && <Text style={styles.titleEn}>{titleEn}</Text>}
          <Text style={styles.artist}>{artwork.artist}</Text>

          {exclusive && (
            <View style={[styles.specialCard, { borderColor: accent }]}>
              <Sparkle size={18} color={accent} weight="fill" />
              <Text style={[styles.specialCardText, { color: accent }]}>
                {t(locale, 'art.special')}
              </Text>
            </View>
          )}

          {pp.isPart && (
            <View style={[styles.partCard, { borderColor: (pp.complete ? COLORS.success : rarity.color) + '66' }]}>
              <StackIcon size={20} color={pp.complete ? COLORS.success : rarity.color} weight="fill" />
              <Text style={styles.partText}>
                {pp.complete
                  ? t(locale, 'art.completeAll')
                  : t(locale, 'art.partOf', { index: artwork.partIndex ?? 0, total: pp.total, have: pp.have })}
              </Text>
            </View>
          )}

          {spare > 0 && (
            <View style={[styles.spareCard, { borderColor: rarity.color + '55' }]}>
              <View style={styles.spareLeft}>
                <StackIcon size={20} color={rarity.color} weight="fill" />
                <Text style={styles.spareText}>
                  {t(locale, 'art.copiesSpares', { owned, spare, s: spare > 1 ? 's' : '' })}
                </Text>
              </View>
              <Pressable
                style={[styles.spareBtn, { backgroundColor: rarity.color }]}
                onPress={() => convertSpareToShards(artwork.id)}
              >
                <Sparkle size={15} color="#0B0B0F" weight="fill" />
                <Text style={styles.spareBtnText}>+{rarity.tradeValue}</Text>
              </Pressable>
            </View>
          )}

          <Text style={styles.sectionTitle}>{t(locale, 'art.details')}</Text>
          <View style={styles.metaCard}>
            {meta.map(({ k, v, onPress }, i) => {
              const tappable = !!onPress && !!v && v.length > 0;
              const inner = (
                <>
                  <Text style={styles.metaKey}>{k}</Text>
                  <View style={styles.metaValWrap}>
                    <Text style={[styles.metaVal, tappable && styles.metaValLink]} numberOfLines={2}>
                      {v && v.length ? v : '—'}
                    </Text>
                  </View>
                </>
              );
              return tappable ? (
                <Pressable
                  key={k}
                  onPress={onPress}
                  style={[styles.metaRow, i < meta.length - 1 && styles.metaDivider]}
                >
                  {inner}
                </Pressable>
              ) : (
                <View key={k} style={[styles.metaRow, i < meta.length - 1 && styles.metaDivider]}>
                  {inner}
                </View>
              );
            })}
          </View>

          {/* Where it lives — links to the museum's own site via a scoped search */}
          {/* About / Fact / Where it lives only make sense for the whole work —
              for a multi-part piece they appear once every fragment is collected. */}
          {whole && museum && (
            <>
              <Text style={styles.sectionTitle}>{t(locale, 'art.whereItLives')}</Text>
              <Pressable
                style={styles.museumCard}
                onPress={() => {
                  track('museum_open', { museum });
                  Linking.openURL(museumLink);
                }}
              >
                <Bank size={22} color={COLORS.gold} weight="fill" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.museumName}>{museum}</Text>
                  {!!museumPlace && <Text style={styles.museumPlace}>{museumPlace}</Text>}
                  <Text style={styles.museumLink}>{t(locale, 'art.viewOnMuseum')}</Text>
                </View>
                <ArrowSquareOut size={18} color={COLORS.textFaint} />
              </Pressable>
            </>
          )}

          {whole && ARTWORK_FACTS[artwork.id] && canZoom && (
            <View style={styles.factCard}>
              <Lightbulb size={20} color={COLORS.gold} weight="fill" />
              <View style={{ flex: 1 }}>
                <Text style={styles.factLabel}>{t(locale, 'art.fact')}</Text>
                <Text style={styles.factText}>{factFor(artwork.id, locale)}</Text>
              </View>
            </View>
          )}

          {whole && (
            aboutT ? (
              <>
                <Text style={styles.sectionTitle}>{t(locale, 'art.description')}</Text>
                <Text style={styles.about}>{aboutT.description}</Text>
                <Text style={styles.sectionTitle}>{t(locale, 'art.history')}</Text>
                <Text style={styles.about}>{aboutT.history}</Text>
              </>
            ) : (
              <>
                <Text style={styles.sectionTitle}>{t(locale, 'art.aboutThis')}</Text>
                <Text style={styles.about}>
                  {t(locale, 'art.aboutFallback', {
                    title: titleL,
                    collection: collection ? collectionName(collection.id, locale) : t(locale, 'art.thisCollection'),
                  })}
                </Text>
              </>
            )
          )}

        </View>
      </ScrollView>

      {/* Floating bar — back + favourite stay in view without scrolling up. */}
      <View style={[styles.topBar, styles.floatBar, { paddingTop: insets.top + SPACING.sm }]} pointerEvents="box-none">
        <Pressable style={styles.iconBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color={COLORS.text} />
        </Pressable>
        {/* Only complete pieces can be favorited (they hang in My Room). */}
        {(pp.isPart ? pp.complete : owned > 0) && (
          <Pressable style={styles.iconBtn} onPress={() => toggleFavorite(artwork.id)}>
            <Heart
              size={22}
              color={isFavorite(artwork.id) ? COLORS.danger : COLORS.text}
              weight={isFavorite(artwork.id) ? 'fill' : 'regular'}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  dim: { color: COLORS.textDim, textAlign: 'center', marginTop: 80 },
  bgBlur: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.35 },
  bgScrim: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(11,11,15,0.82)' },
  topBar: {
    paddingHorizontal: SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  floatBar: { position: 'absolute', top: 0, left: 0, right: 0, paddingBottom: SPACING.sm, zIndex: 10 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(20,20,27,0.85)',
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroWrap: { alignItems: 'center', marginTop: SPACING.sm },
  heroFrame: {
    width: 300,
    height: 340,
    borderWidth: 2,
    borderRadius: RADIUS.lg,
    padding: SPACING.sm,
    backgroundColor: COLORS.card,
  },
  zoomHint: {
    position: 'absolute',
    right: SPACING.md,
    bottom: SPACING.md,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(11,11,15,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { paddingHorizontal: SPACING.xl, marginTop: SPACING.xl, gap: SPACING.sm },
  title: { color: COLORS.text, fontSize: 28, fontWeight: '700', marginTop: SPACING.sm, fontFamily: FONT.serif },
  titleEn: { color: COLORS.textFaint, fontSize: 15, fontStyle: 'italic', marginTop: 2 },
  artist: { color: COLORS.textDim, fontSize: 16, marginTop: 2 },
  partCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginTop: SPACING.md,
  },
  partText: { color: COLORS.textDim, fontSize: 13, flex: 1, lineHeight: 18 },
  specialCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginTop: SPACING.md,
  },
  specialCardText: { fontSize: 13, flex: 1, lineHeight: 18, fontWeight: '600' },
  factCard: {
    flexDirection: 'row', gap: SPACING.md, alignItems: 'flex-start',
    backgroundColor: COLORS.gold + '14', borderColor: COLORS.gold + '55', borderWidth: 1,
    borderRadius: RADIUS.md, padding: SPACING.md, marginTop: SPACING.lg,
  },
  factLabel: { color: COLORS.gold, fontSize: 11, fontWeight: '800', letterSpacing: 1, textTransform: 'uppercase' },
  factText: { color: COLORS.text, fontSize: 14, lineHeight: 20, marginTop: 3 },
  spareCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginTop: SPACING.md,
  },
  spareLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  spareText: { color: COLORS.text, fontSize: 14, fontWeight: '600' },
  spareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill,
  },
  spareBtnText: { color: '#0B0B0F', fontWeight: '800', fontSize: 13 },
  sectionTitle: {
    color: COLORS.gold,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginTop: SPACING.xl,
    textTransform: 'uppercase',
  },
  metaCard: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
  },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: SPACING.md, gap: SPACING.lg },
  metaDivider: { borderBottomColor: COLORS.hairline, borderBottomWidth: 1 },
  metaKey: { color: COLORS.textFaint, fontSize: 14 },
  metaValWrap: { flexDirection: 'row', alignItems: 'center', gap: 6, flexShrink: 1, justifyContent: 'flex-end' },
  metaVal: { color: COLORS.text, fontSize: 14, fontWeight: '600', flexShrink: 1, textAlign: 'right' },
  metaValLink: { textDecorationLine: 'underline', textDecorationColor: COLORS.textFaint },
  museumCard: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    backgroundColor: COLORS.card, borderColor: COLORS.cardBorder, borderWidth: 1,
    borderRadius: RADIUS.md, padding: SPACING.md,
  },
  museumName: { color: COLORS.text, fontSize: 15, fontWeight: '700' },
  museumPlace: { color: COLORS.textDim, fontSize: 13, marginTop: 2 },
  museumLink: { color: COLORS.gold, fontSize: 11, marginTop: 4, letterSpacing: 0.3 },
  movementCard: {
    backgroundColor: COLORS.card, borderColor: COLORS.cardBorder, borderWidth: 1,
    borderRadius: RADIUS.md, padding: SPACING.md,
  },
  movementName: { color: COLORS.text, fontSize: 15, fontWeight: '700', marginBottom: 4 },
  movementAbout: { color: COLORS.textDim, fontSize: 14, lineHeight: 21 },
  aboutLabel: {
    color: COLORS.gold, fontSize: 12, fontWeight: '800', letterSpacing: 0.8,
    marginTop: SPACING.md, marginBottom: 4, textTransform: 'uppercase',
  },
  about: { color: COLORS.textDim, fontSize: 15, lineHeight: 22 },
  attribution: { color: COLORS.textFaint, fontSize: 12, fontStyle: 'italic', marginTop: SPACING.sm },
  wikiBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.card,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    borderRadius: RADIUS.pill,
    paddingVertical: SPACING.md,
    marginTop: SPACING.lg,
  },
  wikiBtnText: { color: COLORS.text, fontSize: 15, fontWeight: '600' },
});
