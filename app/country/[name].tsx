import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, GlobeHemisphereWest } from 'phosphor-react-native';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArtImage } from '@/components/ArtImage';
import { ARTIST_INFO } from '@/data/artistInfo';
import { ARTWORK_DETAILS } from '@/data/details';
import { PAINTINGS, isPaintingComplete } from '@/game/parts';
import { RARITY } from '@/game/rarity';
import { useLocale } from '@/i18n';
import { useGame } from '@/store/GameStore';
import { COLORS, FONT, RADIUS, SPACING } from '@/theme/theme';

// A painting's country of origin, using the same fallback chain as search.
function countryOf(a: (typeof PAINTINGS)[number]): string | undefined {
  return a.country ?? ARTWORK_DETAILS[a.id]?.country ?? (ARTIST_INFO[a.artist] as any)?.country;
}

export default function CountryScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name: string }>();
  const country = name ? decodeURIComponent(name) : '';
  const { owned: ownedMap } = useGame();
  const { locale } = useLocale();
  const es = locale === 'es';

  const works = useMemo(
    () => PAINTINGS.filter((a) => countryOf(a) === country),
    [country],
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 64,
          paddingBottom: insets.bottom + SPACING.xxl,
          paddingHorizontal: SPACING.lg,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <GlobeHemisphereWest size={26} color={COLORS.gold} weight="fill" />
          <Text style={styles.kicker}>{locale === 'de' ? 'HERKUNFTSLAND' : locale === 'pt' ? 'PAÍS DE ORIGEM' : locale === 'it' ? 'PAESE D\'ORIGINE' : locale === 'fr' ? 'PAYS D\'ORIGINE' : es ? 'PAÍS DE ORIGEN' : 'COUNTRY OF ORIGIN'}</Text>
        </View>
        <Text style={styles.title}>{country}</Text>

        {works.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>
              {locale === 'de'
                ? `In der App · ${works.filter((a) => isPaintingComplete(a, ownedMap)).length}/${works.length} gesammelt`
                : locale === 'pt'
                ? `No app · ${works.filter((a) => isPaintingComplete(a, ownedMap)).length}/${works.length} coletadas`
                : locale === 'it'
                ? `Nell'app · ${works.filter((a) => isPaintingComplete(a, ownedMap)).length}/${works.length} collezionate`
                : locale === 'fr'
                ? `Dans l'app · ${works.filter((a) => isPaintingComplete(a, ownedMap)).length}/${works.length} collectionnées`
                : es
                ? `En la app · ${works.filter((a) => isPaintingComplete(a, ownedMap)).length}/${works.length} coleccionadas`
                : `In the app · ${works.filter((a) => isPaintingComplete(a, ownedMap)).length}/${works.length} collected`}
            </Text>
            <View style={styles.grid}>
              {works.map((a) => {
                const done = isPaintingComplete(a, ownedMap);
                return (
                  <Pressable
                    key={a.id}
                    style={styles.tile}
                    disabled={!done}
                    onPress={done ? () => router.push(`/artwork/${a.id}`) : undefined}
                  >
                    <View style={[styles.tileFrame, { borderColor: RARITY[a.rarity].color + '66' }]}>
                      <ArtImage artwork={a} hidden={!done} radius={RADIUS.sm} showQrMark={false} />
                    </View>
                    <Text style={styles.tileLabel} numberOfLines={1}>
                      {done ? a.title : '—'}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </>
        )}
      </ScrollView>

      <Pressable style={[styles.close, { top: insets.top + SPACING.sm }]} onPress={() => router.back()}>
        <ArrowLeft size={22} color={COLORS.text} weight="bold" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: 4 },
  kicker: { color: COLORS.gold, fontSize: 12, fontWeight: '800', letterSpacing: 3 },
  title: { color: COLORS.text, fontSize: 28, fontWeight: '700', fontFamily: FONT.serif, marginBottom: SPACING.md },
  sectionTitle: {
    color: COLORS.gold, fontSize: 12, fontWeight: '800', letterSpacing: 1.5,
    marginTop: SPACING.sm, marginBottom: SPACING.sm, textTransform: 'uppercase',
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  tile: { width: '31%' },
  tileFrame: {
    width: '100%', aspectRatio: 0.85, borderRadius: RADIUS.sm, backgroundColor: COLORS.mat,
    padding: 3, borderWidth: 1,
  },
  tileLabel: { color: COLORS.textFaint, fontSize: 10, marginTop: 4 },
  close: {
    position: 'absolute', left: SPACING.lg, width: 42, height: 42, borderRadius: 21,
    backgroundColor: 'rgba(30,30,36,0.85)', alignItems: 'center', justifyContent: 'center',
  },
});
