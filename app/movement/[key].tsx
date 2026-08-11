import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, PaintBrush } from 'phosphor-react-native';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArtImage } from '@/components/ArtImage';
import { ARTIST_INFO } from '@/data/artistInfo';
import { ARTWORK_DETAILS } from '@/data/details';
import { DETAIL_INFO } from '@/data/detailInfo';
import { movementInfo, movementKeyFor } from '@/data/movementInfo';
import { useLocale } from '@/i18n';
import { PAINTINGS, isPaintingComplete } from '@/game/parts';
import { RARITY } from '@/game/rarity';
import { useGame } from '@/store/GameStore';
import { COLORS, FONT, RADIUS, SPACING } from '@/theme/theme';

// Resolve a painting's movement string using the SAME fallback chain the detail
// screen uses, so the two stay in sync.
function movementOf(a: (typeof PAINTINGS)[number]): string | undefined {
  const di = DETAIL_INFO[a.id] ?? {};
  const detail = ARTWORK_DETAILS[a.id] ?? {};
  const info = ARTIST_INFO[a.artist] ?? {};
  return (di as any).movement ?? (detail as any).movement ?? (info as any).movement;
}

export default function MovementScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { key } = useLocalSearchParams<{ key: string }>();
  const { locale } = useLocale();
  const info = movementInfo(key, locale);
  const { owned: ownedMap } = useGame();
  const es = locale === 'es';
  const fr = locale === 'fr';
  const it = locale === 'it';
  const pt = locale === 'pt';
  const de = locale === 'de';
  const L = {
    kicker: de ? 'STRÖMUNG' : pt ? 'CORRENTE' : it ? 'CORRENTE' : fr ? 'COURANT' : es ? 'CORRIENTE' : 'MOVEMENT',
    hallmarks: de ? 'Woran man sie erkennt' : pt ? 'Como reconhecê-la' : it ? 'Come riconoscerla' : fr ? 'Comment le reconnaître' : es ? 'Cómo reconocerla' : 'How to recognize it',
    origins: de ? 'Ursprung & Kontext' : pt ? 'Origens e contexto' : it ? 'Origini e contesto' : fr ? 'Origines et contexte' : es ? 'Orígenes y contexto' : 'Origins & context',
    figures: de ? 'Wichtige Vertreter' : pt ? 'Figuras principais' : it ? 'Figure principali' : fr ? 'Figures majeures' : es ? 'Principales exponentes' : 'Key figures',
    legacy: de ? 'Warum sie zählt' : pt ? 'Por que importa' : it ? 'Perché è importante' : fr ? "Pourquoi c'est important" : es ? 'Por qué importa' : 'Why it matters',
    inStyle: (n: number, t: number) =>
      de ? `In diesem Stil · ${n}/${t} gesammelt` : pt ? `Neste estilo · ${n}/${t} coletadas` : it ? `In questo stile · ${n}/${t} collezionate` : fr ? `Dans ce style · ${n}/${t} collectionnées` : es ? `En este estilo · ${n}/${t} coleccionadas` : `In this style · ${n}/${t} collected`,
  };

  // Works in the catalog that belong to this movement (one representative per work).
  const works = useMemo(
    () => (key ? PAINTINGS.filter((a) => movementKeyFor(movementOf(a)) === key) : []),
    [key],
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
        {info ? (
          <>
            <View style={styles.header}>
              <PaintBrush size={26} color={COLORS.gold} weight="fill" />
              <Text style={styles.kicker}>{L.kicker}</Text>
            </View>
            <Text style={styles.title}>{info.title}</Text>

            {[info.era, info.origin].filter(Boolean).length > 0 && (
              <View style={styles.chipRow}>
                {[info.era, info.origin].filter(Boolean).map((c) => (
                  <View key={c as string} style={styles.chip}>
                    <Text style={styles.chipText}>{c}</Text>
                  </View>
                ))}
              </View>
            )}

            <Text style={styles.lead}>{info.lead}</Text>

            <Text style={styles.sectionHead}>{L.hallmarks}</Text>
            {info.hallmarks.map((h, i) => (
              <View key={i} style={styles.factRow}>
                <View style={styles.factDot} />
                <Text style={styles.factText}>{h}</Text>
              </View>
            ))}

            <Text style={styles.sectionHead}>{L.origins}</Text>
            <Text style={styles.body}>{info.origins}</Text>

            <Text style={styles.sectionHead}>{L.figures}</Text>
            {info.figures.map((f, i) => (
              <View key={i} style={styles.factRow}>
                <View style={styles.factDot} />
                <Text style={styles.factText}>{f}</Text>
              </View>
            ))}

            <Text style={styles.sectionHead}>{L.legacy}</Text>
            <Text style={styles.body}>{info.legacy}</Text>

            {works.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>
                  {L.inStyle(works.filter((a) => isPaintingComplete(a, ownedMap)).length, works.length)}
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
          </>
        ) : (
          <Text style={styles.dim}>No information for this movement.</Text>
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
  title: { color: COLORS.text, fontSize: 30, fontWeight: '700', fontFamily: FONT.serif, marginBottom: SPACING.sm },
  para: { color: COLORS.textDim, fontSize: 16, lineHeight: 25, marginBottom: SPACING.md },
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
  dim: { color: COLORS.textFaint, fontSize: 15 },
  close: {
    position: 'absolute', left: SPACING.lg, width: 42, height: 42, borderRadius: 21,
    backgroundColor: 'rgba(30,30,36,0.85)', alignItems: 'center', justifyContent: 'center',
  },
});
