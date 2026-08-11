import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Bank } from 'phosphor-react-native';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArtImage } from '@/components/ArtImage';
import { ARTWORK_DETAILS } from '@/data/details';
import { museumInfo } from '@/data/museumInfo';
import { useLocale } from '@/i18n';
import { PAINTINGS, isPaintingComplete } from '@/game/parts';
import { RARITY } from '@/game/rarity';
import { useGame } from '@/store/GameStore';
import { COLORS, FONT, RADIUS, SPACING } from '@/theme/theme';

export default function MuseumScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name: string }>();
  const museum = name ? decodeURIComponent(name) : '';
  const { owned: ownedMap } = useGame();
  const { locale } = useLocale();
  const info = museumInfo(museum, locale);
  const es = locale === 'es';
  const fr = locale === 'fr';
  const it = locale === 'it';
  const pt = locale === 'pt';
  const de = locale === 'de';
  const L = {
    kicker: de ? 'MUSEUM' : pt ? 'MUSEU' : it ? 'MUSEO' : fr ? 'MUSÉE' : es ? 'MUSEO' : 'MUSEUM',
    highlights: de ? 'Höhepunkte' : pt ? 'Destaques' : it ? 'Da non perdere' : fr ? 'À ne pas manquer' : es ? 'Imprescindibles' : 'Highlights',
    about: de ? 'Über das Museum' : pt ? 'Sobre o museu' : it ? 'Sul museo' : fr ? 'À propos du musée' : es ? 'Sobre el museo' : 'About the museum',
    facts: de ? 'Gut zu wissen' : pt ? 'Bom saber' : it ? 'Buono a sapersi' : fr ? 'Bon à savoir' : es ? 'Para saber' : 'Good to know',
    inApp: (n: number, t: number) =>
      de ? `In der App · ${n}/${t} gesammelt` : pt ? `No app · ${n}/${t} coletadas` : it ? `Nell'app · ${n}/${t} collezionate` : fr ? `Dans l'app · ${n}/${t} collectionnées` : es ? `En la app · ${n}/${t} coleccionadas` : `In the app · ${n}/${t} collected`,
  };

  const works = useMemo(
    () => PAINTINGS.filter((a) => ARTWORK_DETAILS[a.id]?.museum === museum),
    [museum],
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
          <Bank size={26} color={COLORS.gold} weight="fill" />
          <Text style={styles.kicker}>{L.kicker}</Text>
        </View>
        <Text style={styles.title}>{museum}</Text>

        {info ? (
          <>
            {[info.city, info.founded].filter(Boolean).length > 0 && (
              <View style={styles.chipRow}>
                {[info.city, info.founded].filter(Boolean).map((c) => (
                  <View key={c as string} style={styles.chip}>
                    <Text style={styles.chipText}>{c}</Text>
                  </View>
                ))}
              </View>
            )}

            <Text style={styles.lead}>{info.lead}</Text>

            <Text style={styles.sectionHead}>{L.highlights}</Text>
            {info.highlights.map((h, i) => (
              <View key={i} style={styles.factRow}>
                <View style={styles.factDot} />
                <Text style={styles.factText}>{h}</Text>
              </View>
            ))}

            <Text style={styles.sectionHead}>{L.about}</Text>
            <Text style={styles.body}>{info.about}</Text>

            {info.facts && info.facts.length > 0 && (
              <>
                <Text style={styles.sectionHead}>{L.facts}</Text>
                {info.facts.map((f, i) => (
                  <View key={i} style={styles.factRow}>
                    <View style={styles.factDot} />
                    <Text style={styles.factText}>{f}</Text>
                  </View>
                ))}
              </>
            )}
          </>
        ) : null}

        {works.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>
              {L.inApp(works.filter((a) => isPaintingComplete(a, ownedMap)).length, works.length)}
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
  title: { color: COLORS.text, fontSize: 28, fontWeight: '700', fontFamily: FONT.serif, marginBottom: SPACING.sm },
  bio: { color: COLORS.textDim, fontSize: 16, lineHeight: 25 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: SPACING.md },
  chip: {
    backgroundColor: COLORS.gold + '1F', borderColor: COLORS.gold + '55', borderWidth: 1,
    borderRadius: RADIUS.pill, paddingHorizontal: 10, paddingVertical: 4,
  },
  chipText: { color: COLORS.gold, fontSize: 11, fontWeight: '700' },
  lead: { color: COLORS.text, fontSize: 16, lineHeight: 25 },
  sectionHead: {
    color: COLORS.gold, fontSize: 12, fontWeight: '800', letterSpacing: 1.5,
    marginTop: SPACING.xl, marginBottom: SPACING.sm, textTransform: 'uppercase',
  },
  body: { color: COLORS.textDim, fontSize: 15, lineHeight: 24, marginBottom: SPACING.sm },
  factRow: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.sm, alignItems: 'flex-start' },
  factDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.gold, marginTop: 8 },
  factText: { color: COLORS.textDim, fontSize: 15, lineHeight: 23, flex: 1 },
  sectionTitle: {
    color: COLORS.gold, fontSize: 12, fontWeight: '800', letterSpacing: 1.5,
    marginTop: SPACING.xl, marginBottom: SPACING.sm, textTransform: 'uppercase',
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
