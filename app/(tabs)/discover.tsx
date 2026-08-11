import { useRouter } from 'expo-router';
import { Bank, CalendarBlank, CaretRight, GlobeHemisphereWest, Lightbulb, MagnifyingGlass, PaintBrush, Sparkle, X } from 'phosphor-react-native';
import React, { useMemo, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArtImage } from '@/components/ArtImage';
import { PartComposite } from '@/components/PartPaintingCard';
import { ARTWORKS, ARTWORKS_BY_RARITY, type Artwork } from '@/data/artworks';
import { COLLECTIONS, COLLECTION_BY_ID, collectionName } from '@/data/collections';
import { t } from '@/data/ui';
import { titleFor } from '@/data/titles';
import { ARTWORK_DETAILS } from '@/data/details';
import { ARTIST_INFO } from '@/data/artistInfo';
import { ARTIST_BIOS } from '@/data/artistBios';
import { artistProfile } from '@/data/artistProfiles';
import { museumInfo } from '@/data/museumInfo';
import { MOVEMENT_INFO, MOVEMENT_INFO_ES, movementInfo, movementKeyFor } from '@/data/movementInfo';
import { useLocale } from '@/i18n';
import { pickDaily, isExclusive } from '@/game/hash';
import { IMG_CARD } from '@/game/images';
import { Haptics, hNotify } from '@/game/prefs';
import { PAINTINGS, partsOf, isPaintingComplete, FINALE_COLLECTION } from '@/game/parts';
import { RARITY } from '@/game/rarity';
import { ARTWORK_PRICE } from '@/game/shop';
import { useGame } from '@/store/GameStore';
import { COLORS, FONT, RADIUS, SPACING } from '@/theme/theme';

// --- rotation keys -------------------------------------------------------
function dayKey(d: Date) {
  return d.toISOString().slice(0, 10);
}
function weekKey(d: Date) {
  const start = new Date(d.getFullYear(), 0, 1);
  const day = Math.floor((d.getTime() - start.getTime()) / 86400000);
  return `${d.getFullYear()}-W${Math.floor(day / 7)}`;
}
function fortnightKey(d: Date) {
  const start = new Date(d.getFullYear(), 0, 1);
  const day = Math.floor((d.getTime() - start.getTime()) / 86400000);
  return `${d.getFullYear()}-F${Math.floor(day / 15)}`;
}
function monthKey(d: Date) {
  return `${d.getFullYear()}-M${d.getMonth()}`;
}
// First paragraph only — the rotating cards show a teaser and link to the full page.
function firstPara(s: string) {
  return s.split('\n\n')[0];
}

export default function DiscoverScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isOwned, owned: ownedMap, shards, buyArtwork } = useGame();
  const { locale } = useLocale();
  const [showCurio, setShowCurio] = useState(true);
  const [query, setQuery] = useState('');

  // One thumbnail for a painting: a multi-part work shows as a single composite
  // (owned fragments sharp, the rest pixelated) instead of separate cards.
  const thumbImg = (a: Artwork) =>
    a.partGroup ? (
      <PartComposite parts={partsOf(a.partGroup)} owned={ownedMap} width={IMG_CARD} />
    ) : (
      <ArtImage artwork={a} hidden={!isOwned(a.id)} radius={RADIUS.sm} />
    );

  // Search index over every painting: title, artist, movement, technique,
  // museum and country of origin (accent-insensitive).
  const searchIndex = useMemo(() => {
    const strip = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    return PAINTINGS.map((a) => {
      const d = ARTWORK_DETAILS[a.id];
      const info = ARTIST_INFO[a.artist] ?? {};
      const hay = strip(
        [
          a.title,
          a.titleEn,
          a.artist,
          d?.movement ?? info.movement,
          d?.technique,
          d?.museum,
          a.country ?? d?.country ?? info.country,
        ]
          .filter(Boolean)
          .join(' ')
      );
      return { art: a, hay };
    });
  }, []);

  const q = query.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  // A piece is "unlocked" if the player owns it (or any part of a multi-part work).
  const unlocked = (a: Artwork) =>
    a.partGroup ? partsOf(a.partGroup).some((p) => !!ownedMap[p.id]) : isOwned(a.id);
  // Search only surfaces pieces the player has actually discovered.
  const results = q.length >= 2 ? searchIndex.filter((x) => x.hay.includes(q) && unlocked(x.art)).slice(0, 40) : null;
  const searching = q.length >= 2;

  // If the query looks like a movement, surface a card to learn about it.
  const movementHit = useMemo(() => {
    if (q.length < 3) return null;
    const strip = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    let key = movementKeyFor(query);
    if (!key) {
      for (const [k, info] of Object.entries(MOVEMENT_INFO)) {
        if (strip(info.title).includes(q)) { key = k; break; }
      }
    }
    if (!key) {
      // also match the Spanish movement titles
      for (const [k, info] of Object.entries(MOVEMENT_INFO_ES)) {
        if (strip(info.title).includes(q)) { key = k; break; }
      }
    }
    if (!key) return null;
    const info = movementInfo(key, locale);
    return info ? { key, title: info.title, lead: info.lead } : null;
  }, [q, query, locale]);

  // If the query matches an artist, surface a card that opens their profile.
  const artistHit = useMemo(() => {
    if (q.length < 3) return null;
    const strip = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const names = Array.from(new Set(PAINTINGS.map((a) => a.artist)));
    // prefer a name whose start matches, else any containing the query
    return (
      names.find((n) => strip(n).startsWith(q)) ?? names.find((n) => strip(n).includes(q)) ?? null
    );
  }, [q]);

  // If the query matches a country of origin, surface a card to see its pieces.
  const countryHit = useMemo(() => {
    if (q.length < 3) return null;
    const strip = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const countries = Array.from(
      new Set(
        PAINTINGS.map((a) => a.country ?? ARTWORK_DETAILS[a.id]?.country ?? ARTIST_INFO[a.artist]?.country).filter(
          Boolean
        ) as string[]
      )
    );
    return countries.find((c) => strip(c).startsWith(q)) ?? countries.find((c) => strip(c).includes(q)) ?? null;
  }, [q]);

  const now = new Date();
  const dKey = dayKey(now);
  const wKey = weekKey(now);
  const fKey = fortnightKey(now);
  const mKey = monthKey(now);

  const {
    artOfDay, artistOfWeek, artistWorks, museum, museumWorks, curiosity,
    movementKey, movementWorks,
  } = useMemo(() => {
    // Painting of the day is a whole single work (never a QR-only or a fragment).
    const artOfDay = pickDaily(
      ARTWORKS.filter((a) => !isExclusive(a.id) && !a.partGroup),
      dKey,
      'artwork'
    );

    const artists = Array.from(new Set(ARTWORKS.map((a) => a.artist))).sort();
    const artistOfWeek = pickDaily(artists, wKey, 'artist');
    // One entry per painting (multi-part collapses to a single card).
    const artistWorks = PAINTINGS.filter((a) => a.artist === artistOfWeek);

    // Museums actually represented in the app (from the baked Wikidata facts).
    const byMuseum: Record<string, Artwork[]> = {};
    for (const a of PAINTINGS) {
      const m = ARTWORK_DETAILS[a.id]?.museum;
      if (m && m.length > 2) (byMuseum[m] ??= []).push(a);
    }
    const museums = Object.keys(byMuseum)
      .filter((m) => byMuseum[m].length >= 2)
      .sort();
    const museum = museums.length ? pickDaily(museums, fKey, 'museum') : null;
    const museumWorks = museum ? byMuseum[museum] : [];

    // Movement of the month: pick one canonical movement and its paintings.
    const withKey = PAINTINGS.map((a) => ({
      a,
      k: movementKeyFor(ARTWORK_DETAILS[a.id]?.movement ?? ARTIST_INFO[a.artist]?.movement),
    }));
    const availKeys = Array.from(new Set(withKey.map((x) => x.k).filter(Boolean))) as string[];
    const movementKey = availKeys.length ? pickDaily(availKeys.sort(), mKey, 'movement') : null;
    const movementWorks = movementKey ? withKey.filter((x) => x.k === movementKey).map((x) => x.a) : [];

    // Counts exclude the hidden 301st piece, so nothing here hints at it.
    const shown = ARTWORKS.filter((a) => a.collectionId !== FINALE_COLLECTION);
    const curiosities = [
      t(locale, 'disc.curio1', { n: PAINTINGS.length, c: COLLECTIONS.length }),
      t(locale, 'disc.curio2', { n: shown.filter((a) => a.rarity === 'unique').length }),
      t(locale, 'disc.curio3'),
      t(locale, 'disc.curio4', { n: new Set(shown.map((a) => a.artist)).size }),
      t(locale, 'disc.curio5'),
      t(locale, 'disc.qr1'),
      t(locale, 'disc.qr2'),
      t(locale, 'disc.qr3'),
      t(locale, 'disc.qr4'),
      t(locale, 'disc.qr5'),
      t(locale, 'disc.qr6'),
      t(locale, 'disc.qart1'),
      t(locale, 'disc.qart2'),
      t(locale, 'disc.qart3'),
      t(locale, 'disc.qart4'),
      t(locale, 'disc.qart5'),
      t(locale, 'disc.art1'),
      t(locale, 'disc.art2'),
      t(locale, 'disc.art3'),
      t(locale, 'disc.art4'),
      t(locale, 'disc.art5'),
      t(locale, 'disc.art6'),
    ];
    const curiosity = pickDaily(curiosities, dKey, 'curio');
    return {
      artOfDay, artistOfWeek, artistWorks, museum, museumWorks, curiosity,
      movementKey, movementWorks,
    };
  }, [dKey, wKey, fKey, mKey, locale]);

  const owned = isOwned(artOfDay.id);
  const price = ARTWORK_PRICE[artOfDay.rarity];
  const canAfford = shards >= price;
  const rarity = RARITY[artOfDay.rarity];

  const doBuy = () => {
    const res = buyArtwork(artOfDay.id);
    if (res) {
      hNotify(Haptics.NotificationFeedbackType.Success);
      router.push({
        pathname: '/reveal',
        params: { id: res.artwork.id, isNew: res.isNew ? '1' : '0', count: String(res.count), source: 'shop' },
      });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: insets.bottom + SPACING.xxl }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.head, { paddingTop: insets.top + SPACING.md }]}>
        <Text style={styles.kicker}>{t(locale, 'disc.kicker')}</Text>
        <Text style={styles.h1}>{t(locale, 'disc.title')}</Text>
        <View style={styles.dateRow}>
          <CalendarBlank size={15} color={COLORS.textFaint} />
          <Text style={styles.date}>{formatDate(dKey, locale)}</Text>
        </View>
      </View>

      {/* ---------- Search ---------- */}
      <View style={styles.searchWrap}>
        <MagnifyingGlass size={18} color={COLORS.textFaint} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={t(locale, 'disc.searchPlaceholder')}
          placeholderTextColor={COLORS.textFaint}
          style={styles.searchInput}
          autoCorrect={false}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery('')} hitSlop={10}>
            <X size={17} color={COLORS.textFaint} weight="bold" />
          </Pressable>
        )}
      </View>

      {searching && (
        <View>
          {movementHit && (
            <>
              <Text style={styles.sectionTitle}>{t(locale, 'art.meta.movement')}</Text>
              <Pressable
                style={styles.movementHit}
                onPress={() => router.push(`/movement/${movementHit.key}`)}
              >
                <PaintBrush size={22} color={COLORS.gold} weight="fill" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.movementHitTitle}>{movementHit.title}</Text>
                  <Text style={styles.movementHitSub} numberOfLines={2}>
                    {movementHit.lead}
                  </Text>
                </View>
                <CaretRight size={16} color={COLORS.gold} weight="bold" />
              </Pressable>
            </>
          )}
          {artistHit && (
            <>
              <Text style={styles.sectionTitle}>{t(locale, 'art.meta.artist')}</Text>
              <Pressable
                style={styles.movementHit}
                onPress={() => router.push(`/artist/${encodeURIComponent(artistHit)}`)}
              >
                <PaintBrush size={22} color={COLORS.gold} weight="fill" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.movementHitTitle}>{artistHit}</Text>
                  {(() => {
                    const bio = artistProfile(artistHit, locale)?.lead ?? ARTIST_BIOS[artistHit];
                    return bio ? (
                      <Text style={styles.movementHitSub} numberOfLines={2}>
                        {bio.split(/(?<=[.!?])\s/)[0]}
                      </Text>
                    ) : null;
                  })()}
                </View>
                <CaretRight size={16} color={COLORS.gold} weight="bold" />
              </Pressable>
            </>
          )}
          {countryHit && (
            <>
              <Text style={styles.sectionTitle}>{t(locale, 'art.meta.country')}</Text>
              <Pressable
                style={styles.movementHit}
                onPress={() => router.push(`/country/${encodeURIComponent(countryHit)}`)}
              >
                <GlobeHemisphereWest size={22} color={COLORS.gold} weight="fill" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.movementHitTitle}>{countryHit}</Text>
                  <Text style={styles.movementHitSub} numberOfLines={2}>
                    {t(locale, 'disc.seeCountry', { country: countryHit })}
                  </Text>
                </View>
                <CaretRight size={16} color={COLORS.gold} weight="bold" />
              </Pressable>
            </>
          )}
          <Text style={styles.sectionTitle}>
            {t(locale, 'disc.results', { n: results!.length, s: results!.length === 1 ? '' : 's', i: results!.length === 1 ? 'o' : 'i', se: results!.length === 1 ? '' : 'se' })}
          </Text>
          {results!.length === 0 ? (
            <Text style={styles.empty}>{t(locale, 'disc.noResults', { q: query.trim() })}</Text>
          ) : (
            <View style={{ gap: SPACING.sm, paddingHorizontal: SPACING.lg }}>
              {results!.map(({ art }) => {
                const d = ARTWORK_DETAILS[art.id];
                const fi = ARTIST_INFO[art.artist] ?? {};
                const sub = [art.country ?? d?.country ?? fi.country, d?.movement ?? fi.movement]
                  .filter(Boolean)
                  .join(' · ');
                return (
                  <Pressable
                    key={art.id}
                    style={styles.resultRow}
                    onPress={() => router.push(`/artwork/${art.id}`)}
                  >
                    <View style={[styles.resultThumb, { borderColor: RARITY[art.rarity].color + '66' }]}>
                      {thumbImg(art)}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.resultTitle} numberOfLines={1}>{titleFor(art.id, locale, art.title)}</Text>
                      <Text style={styles.resultArtist} numberOfLines={1}>{art.artist}</Text>
                      {!!sub && <Text style={styles.resultSub} numberOfLines={1}>{sub}</Text>}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          )}
        </View>
      )}

      {!searching && (
        <>
      {/* ---------- Did you know? (dismissable, pinned to the top) ---------- */}
      {showCurio && (
        <View style={styles.curioCard}>
          <Lightbulb size={22} color={COLORS.gold} weight="fill" />
          <Text style={styles.curioText}>{curiosity}</Text>
          <Pressable onPress={() => setShowCurio(false)} hitSlop={10} style={styles.curioClose}>
            <X size={18} color={COLORS.textFaint} weight="bold" />
          </Pressable>
        </View>
      )}

      {/* ---------- Painting of the day (buyable) ---------- */}
      <Text style={styles.sectionTitle}>{t(locale, 'disc.paintingOfDay')}</Text>
      <View style={[styles.dayCard, { borderColor: rarity.color + '55' }]}>
        <Pressable style={styles.dayTop} onPress={() => router.push(`/artwork/${artOfDay.id}`)}>
          <View style={[styles.dayFrame, { borderColor: rarity.color }]}>
            <ArtImage artwork={artOfDay} hidden={!owned} radius={RADIUS.sm} />
          </View>
          <View style={styles.dayMeta}>
            <Text style={styles.dayTitle} numberOfLines={2}>
              {titleFor(artOfDay.id, locale, artOfDay.title)}
            </Text>
            <Text style={styles.dayArtist} numberOfLines={1}>
              {artOfDay.artist}
            </Text>
            <Text style={styles.dayCollection} numberOfLines={1}>
              {collectionName(artOfDay.collectionId, locale)}
            </Text>
          </View>
        </Pressable>

        {owned ? (
          <View style={styles.ownedRow}>
            <Sparkle size={15} color={COLORS.success} weight="fill" />
            <Text style={styles.ownedText}>{t(locale, 'disc.alreadyOwned')}</Text>
          </View>
        ) : (
          <Pressable
            style={[styles.buyBtn, { backgroundColor: canAfford ? rarity.color : COLORS.bgElevated }]}
            onPress={() => canAfford && doBuy()}
            disabled={!canAfford}
          >
            <Sparkle size={15} color={canAfford ? '#0B0B0F' : COLORS.textFaint} weight="fill" />
            <Text style={[styles.buyText, { color: canAfford ? '#0B0B0F' : COLORS.textFaint }]}>
              {canAfford ? t(locale, 'disc.acquire', { price }) : t(locale, 'disc.shardsNeeded', { price, have: shards })}
            </Text>
          </Pressable>
        )}
        <Text style={styles.dayNote}>{t(locale, 'disc.dayNote')}</Text>
      </View>

      {/* ---------- Artist of the week ---------- */}
      <Text style={styles.sectionTitle}>{t(locale, 'disc.artistOfWeek')}</Text>
      <View style={styles.card}>
        <Pressable
          style={styles.cardHeader}
          onPress={() => router.push(`/artist/${encodeURIComponent(artistOfWeek)}`)}
        >
          <PaintBrush size={22} color={COLORS.gold} weight="fill" />
          <Text style={[styles.cardTitle, { flex: 1 }]}>{artistOfWeek}</Text>
          <CaretRight size={16} color={COLORS.gold} weight="bold" />
        </Pressable>
        {(() => {
          const bio = artistProfile(artistOfWeek, locale)?.lead ?? ARTIST_BIOS[artistOfWeek];
          return bio ? <Text style={styles.cardBio}>{firstPara(bio)}</Text> : null;
        })()}
        <Text style={styles.cardBody}>
          {t(locale, 'disc.piecesInApp', { n: artistWorks.length, s: artistWorks.length === 1 ? '' : 's', e: artistWorks.length === 1 ? 'a' : 'e', m: artistWorks.filter((a) => isPaintingComplete(a, ownedMap)).length })}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: SPACING.md }}>
          <View style={{ flexDirection: 'row', gap: SPACING.sm }}>
            {artistWorks.map((a) => (
              <Pressable key={a.id} style={styles.thumbWrap} onPress={() => router.push(`/artwork/${a.id}`)}>
                <View style={[styles.thumb, { borderColor: RARITY[a.rarity].color + '66' }]}>
                  {thumbImg(a)}
                </View>
                <Text style={styles.thumbLabel} numberOfLines={1}>
                  {isPaintingComplete(a, ownedMap) ? titleFor(a.id, locale, a.title) : '—'}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* ---------- Museum of the fortnight ---------- */}
      {museum && (
        <>
          <Text style={styles.sectionTitle}>{t(locale, 'disc.museumOfFortnight')}</Text>
          <View style={styles.card}>
            <Pressable
              style={styles.cardHeader}
              onPress={() => router.push(`/museum/${encodeURIComponent(museum)}`)}
            >
              <Bank size={22} color={COLORS.gold} weight="fill" />
              <Text style={[styles.cardTitle, { flex: 1 }]}>{museum}</Text>
              <CaretRight size={16} color={COLORS.gold} weight="bold" />
            </Pressable>
            {!!museumInfo(museum, locale) && <Text style={styles.cardBio}>{museumInfo(museum, locale)!.lead}</Text>}
            <Text style={styles.cardBody}>
              {t(locale, 'disc.worksFromMuseum', { n: museumWorks.length, s: museumWorks.length === 1 ? '' : 's', e: museumWorks.length === 1 ? 'a' : 'e', m: museumWorks.filter((a) => isPaintingComplete(a, ownedMap)).length })}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: SPACING.md }}>
              <View style={{ flexDirection: 'row', gap: SPACING.sm }}>
                {museumWorks.map((a) => (
                  <Pressable key={a.id} style={styles.thumbWrap} onPress={() => router.push(`/artwork/${a.id}`)}>
                    <View style={[styles.thumb, { borderColor: RARITY[a.rarity].color + '66' }]}>
                      {thumbImg(a)}
                    </View>
                    <Text style={styles.thumbLabel} numberOfLines={1}>
                      {isPaintingComplete(a, ownedMap) ? titleFor(a.id, locale, a.title) : '—'}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>
        </>
      )}

      {/* ---------- Movement of the month ---------- */}
      {movementKey && MOVEMENT_INFO[movementKey] && (
        <>
          <Text style={styles.sectionTitle}>{t(locale, 'disc.movementOfMonth')}</Text>
          <View style={styles.card}>
            <Pressable
              style={styles.cardHeader}
              onPress={() => router.push(`/movement/${movementKey}`)}
            >
              <PaintBrush size={22} color={COLORS.gold} weight="fill" />
              <Text style={[styles.cardTitle, { flex: 1 }]}>{(movementInfo(movementKey, locale) ?? MOVEMENT_INFO[movementKey]).title}</Text>
              <CaretRight size={16} color={COLORS.gold} weight="bold" />
            </Pressable>
            <Text style={styles.movementAbout}>{(movementInfo(movementKey, locale) ?? MOVEMENT_INFO[movementKey]).lead}</Text>
            {movementWorks.length > 0 && (
              <>
                <Text style={styles.cardBody}>
                  {t(locale, 'disc.worksInStyle', { n: movementWorks.length, s: movementWorks.length === 1 ? '' : 's', e: movementWorks.length === 1 ? 'a' : 'e', m: movementWorks.filter((a) => isPaintingComplete(a, ownedMap)).length })}
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: SPACING.md }}>
                  <View style={{ flexDirection: 'row', gap: SPACING.sm }}>
                    {movementWorks.slice(0, 20).map((a) => (
                      <Pressable key={a.id} style={styles.thumbWrap} onPress={() => router.push(`/artwork/${a.id}`)}>
                        <View style={[styles.thumb, { borderColor: RARITY[a.rarity].color + '66' }]}>
                          {thumbImg(a)}
                        </View>
                        <Text style={styles.thumbLabel} numberOfLines={1}>
                          {isPaintingComplete(a, ownedMap) ? titleFor(a.id, locale, a.title) : '—'}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </ScrollView>
              </>
            )}
          </View>
        </>
      )}
        </>
      )}
    </ScrollView>
  );
}

const DATE_LOCALES: Record<string, string> = {
  en: 'en-US', es: 'es-ES', fr: 'fr-FR', it: 'it-IT', pt: 'pt-PT', de: 'de-DE',
};
function formatDate(iso: string, locale: string) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString(DATE_LOCALES[locale] ?? 'en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  head: { paddingHorizontal: SPACING.lg },
  kicker: { color: COLORS.gold, fontSize: 12, fontWeight: '800', letterSpacing: 3 },
  h1: { color: COLORS.text, fontSize: 30, fontWeight: '700', marginTop: 2, fontFamily: FONT.serif },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  date: { color: COLORS.textFaint, fontSize: 13 },
  sectionTitle: {
    color: COLORS.gold, fontSize: 12, fontWeight: '800', letterSpacing: 1.5,
    paddingHorizontal: SPACING.lg, marginTop: SPACING.xl, marginBottom: SPACING.sm, textTransform: 'uppercase',
  },
  dayCard: {
    marginHorizontal: SPACING.lg, backgroundColor: COLORS.card, borderWidth: 1,
    borderRadius: RADIUS.lg, padding: SPACING.md, gap: SPACING.md,
  },
  dayTop: { flexDirection: 'row', gap: SPACING.md },
  dayFrame: {
    width: 110, height: 130, borderWidth: 2, borderRadius: RADIUS.md, padding: 4,
    backgroundColor: COLORS.mat,
  },
  dayMeta: { flex: 1, justifyContent: 'center', gap: 3 },
  dayTitle: { color: COLORS.text, fontSize: 19, fontWeight: '700', fontFamily: FONT.serif },
  dayArtist: { color: COLORS.textDim, fontSize: 14 },
  dayCollection: { color: COLORS.textFaint, fontSize: 12, marginTop: 2 },
  buyBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    borderRadius: RADIUS.pill, paddingVertical: SPACING.md,
  },
  buyText: { fontWeight: '800', fontSize: 14 },
  ownedRow: { flexDirection: 'row', alignItems: 'center', gap: 6, justifyContent: 'center', paddingVertical: SPACING.sm },
  ownedText: { color: COLORS.success, fontSize: 13, fontWeight: '700' },
  dayNote: { color: COLORS.textFaint, fontSize: 11, textAlign: 'center' },
  card: {
    marginHorizontal: SPACING.lg, backgroundColor: COLORS.card, borderColor: COLORS.cardBorder,
    borderWidth: 1, borderRadius: RADIUS.lg, padding: SPACING.lg,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  cardTitle: { color: COLORS.text, fontSize: 18, fontWeight: '700', flexShrink: 1, fontFamily: FONT.serif },
  cardBio: { color: COLORS.text, fontSize: 14, lineHeight: 20, marginTop: SPACING.sm },
  movementAbout: { color: COLORS.text, fontSize: 15, lineHeight: 23, marginTop: SPACING.sm },
  cardBody: { color: COLORS.textFaint, fontSize: 12, marginTop: SPACING.sm },
  thumbWrap: { width: 84 },
  thumb: {
    width: 84, height: 96, borderRadius: RADIUS.sm, backgroundColor: COLORS.mat,
    padding: 3, borderWidth: 1,
  },
  thumbLabel: { color: COLORS.textFaint, fontSize: 10, marginTop: 4 },
  curioCard: {
    marginHorizontal: SPACING.lg, marginTop: SPACING.lg,
    backgroundColor: COLORS.card, borderColor: COLORS.gold + '44',
    borderWidth: 1, borderRadius: RADIUS.lg, padding: SPACING.lg,
    flexDirection: 'row', gap: SPACING.md, alignItems: 'center',
  },
  curioText: { color: COLORS.textDim, fontSize: 14, lineHeight: 20, flex: 1 },
  curioClose: { padding: 2 },
  searchWrap: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    marginHorizontal: SPACING.lg, marginTop: SPACING.lg,
    backgroundColor: COLORS.card, borderColor: COLORS.cardBorder, borderWidth: 1,
    borderRadius: RADIUS.pill, paddingHorizontal: SPACING.md, paddingVertical: Platform.OS === 'ios' ? SPACING.md : 2,
  },
  searchInput: { flex: 1, color: COLORS.text, fontSize: 15, paddingVertical: SPACING.sm },
  resultRow: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    backgroundColor: COLORS.card, borderColor: COLORS.cardBorder, borderWidth: 1,
    borderRadius: RADIUS.md, padding: SPACING.sm,
  },
  movementHit: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    marginHorizontal: SPACING.lg, marginBottom: SPACING.md,
    backgroundColor: COLORS.card, borderColor: COLORS.gold + '55', borderWidth: 1,
    borderRadius: RADIUS.md, padding: SPACING.md,
  },
  movementHitTitle: { color: COLORS.text, fontSize: 16, fontWeight: '700', fontFamily: FONT.serif },
  movementHitSub: { color: COLORS.textDim, fontSize: 12, marginTop: 2, lineHeight: 17 },
  resultThumb: { width: 48, height: 56, borderRadius: RADIUS.sm, backgroundColor: COLORS.mat, padding: 2, borderWidth: 1 },
  resultTitle: { color: COLORS.text, fontSize: 14, fontWeight: '700', fontFamily: FONT.serif },
  resultArtist: { color: COLORS.textDim, fontSize: 12, marginTop: 1 },
  resultSub: { color: COLORS.textFaint, fontSize: 11, marginTop: 2 },
  empty: { color: COLORS.textFaint, fontSize: 14, textAlign: 'center', paddingHorizontal: SPACING.lg, paddingVertical: SPACING.lg },
});
