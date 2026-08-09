import { useRouter } from 'expo-router';
import { ArrowLeft } from 'phosphor-react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ARTWORKS, ARTWORK_BY_ID } from '@/data/artworks';
import { COLLECTIONS } from '@/data/collections';
import { loadTelemetry, type Telemetry } from '@/game/telemetry';
import { useGame } from '@/store/GameStore';
import { COLORS, FONT, RADIUS, SPACING } from '@/theme/theme';

// Developer-only, on-device analytics. Cross-user data needs an analytics
// backend — see src/game/telemetry.ts.
export default function InsightsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isOwned } = useGame();
  const [tel, setTel] = useState<Telemetry | null>(null);

  useEffect(() => {
    loadTelemetry().then((t) => setTel({ ...t }));
  }, []);

  const coverage = useMemo(() => {
    const never = ARTWORKS.filter((a) => !isOwned(a.id));
    const perCollection = COLLECTIONS.map((c) => {
      const inCol = ARTWORKS.filter((a) => a.collectionId === c.id);
      const missing = inCol.filter((a) => !isOwned(a.id)).length;
      return { name: c.name ?? c.id, total: inCol.length, missing };
    });
    return { discovered: ARTWORKS.length - never.length, total: ARTWORKS.length, never, perCollection };
  }, [isOwned]);

  const sortEntries = (r: Record<string, number>) =>
    Object.entries(r).sort((a, b) => b[1] - a[1]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + SPACING.xxl }} showsVerticalScrollIndicator={false}>
        <View style={{ height: insets.top + 52 }} />
        <View style={styles.head}>
          <Text style={styles.kicker}>DEVELOPER</Text>
          <Text style={styles.h1}>Insights</Text>
          <Text style={styles.note}>On-device only. For cross-user data, wire an analytics service (see telemetry.ts).</Text>
        </View>

        {/* Coverage */}
        <Text style={styles.sectionTitle}>Collection coverage</Text>
        <View style={styles.card}>
          <Row label="Discovered" value={`${coverage.discovered} / ${coverage.total}`} />
          <Divider />
          <Row label="Never appeared" value={String(coverage.never.length)} />
          <Divider />
          {coverage.perCollection.map((c, i) => (
            <View key={c.name}>
              {i > 0 && <Divider />}
              <Row label={c.name} value={c.missing === 0 ? 'complete' : `${c.missing} missing`} />
            </View>
          ))}
        </View>

        {/* Reveals by source */}
        <Text style={styles.sectionTitle}>Reveals by source</Text>
        <View style={styles.card}>
          {tel && sortEntries(tel.revealsBySource).length ? (
            sortEntries(tel.revealsBySource).map(([k, v], i) => (
              <View key={k}>
                {i > 0 && <Divider />}
                <Row label={k} value={String(v)} />
              </View>
            ))
          ) : (
            <Text style={styles.empty}>No reveals recorded yet.</Text>
          )}
        </View>

        {/* Museum link taps */}
        <Text style={styles.sectionTitle}>Museum links opened</Text>
        <View style={styles.card}>
          {tel && sortEntries(tel.museumOpens).length ? (
            sortEntries(tel.museumOpens)
              .slice(0, 15)
              .map(([k, v], i) => (
                <View key={k}>
                  {i > 0 && <Divider />}
                  <Row label={k} value={String(v)} />
                </View>
              ))
          ) : (
            <Text style={styles.empty}>No museum links opened yet.</Text>
          )}
        </View>

        {/* Special codes found */}
        <Text style={styles.sectionTitle}>Special codes found</Text>
        <View style={styles.card}>
          {tel && sortEntries(tel.specialHits).length ? (
            sortEntries(tel.specialHits).map(([id, v], i) => (
              <View key={id}>
                {i > 0 && <Divider />}
                <Row label={ARTWORK_BY_ID[id]?.title ?? id} value={String(v)} />
              </View>
            ))
          ) : (
            <Text style={styles.empty}>No special codes found yet.</Text>
          )}
        </View>
      </ScrollView>

      <View style={[styles.floatBar, { paddingTop: insets.top + SPACING.sm }]} pointerEvents="box-none">
        <Pressable style={styles.iconBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color={COLORS.text} />
        </Pressable>
      </View>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel} numberOfLines={1}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}
const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  floatBar: { position: 'absolute', top: 0, left: 0, right: 0, paddingHorizontal: SPACING.lg, paddingBottom: SPACING.sm, zIndex: 10 },
  iconBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(20,20,27,0.85)',
    borderColor: COLORS.cardBorder, borderWidth: 1, alignItems: 'center', justifyContent: 'center',
  },
  head: { paddingHorizontal: SPACING.lg },
  kicker: { color: COLORS.gold, fontSize: 12, fontWeight: '800', letterSpacing: 3 },
  h1: { color: COLORS.text, fontSize: 30, fontWeight: '700', marginTop: 4, fontFamily: FONT.serif },
  note: { color: COLORS.textFaint, fontSize: 12, marginTop: 6, lineHeight: 17 },
  sectionTitle: {
    color: COLORS.gold, fontSize: 12, fontWeight: '800', letterSpacing: 1.5,
    paddingHorizontal: SPACING.lg, marginTop: SPACING.xl, marginBottom: SPACING.sm, textTransform: 'uppercase',
  },
  card: {
    marginHorizontal: SPACING.lg, backgroundColor: COLORS.card, borderColor: COLORS.cardBorder,
    borderWidth: 1, borderRadius: RADIUS.lg, paddingHorizontal: SPACING.lg,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: SPACING.md, gap: SPACING.md },
  rowLabel: { color: COLORS.textDim, fontSize: 14, flexShrink: 1 },
  rowValue: { color: COLORS.text, fontSize: 14, fontWeight: '700' },
  divider: { height: 1, backgroundColor: COLORS.hairline },
  empty: { color: COLORS.textFaint, fontSize: 13, paddingVertical: SPACING.md },
});
