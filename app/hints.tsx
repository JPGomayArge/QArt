import { useRouter } from 'expo-router';
import { ArrowLeft, MagnifyingGlass, Sparkle } from 'phosphor-react-native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SPECIAL_COLOR } from '@/game/rarity';
import { useLocale } from '@/i18n';
import { t } from '@/data/ui';
import { COLORS, FONT, RADIUS, SPACING } from '@/theme/theme';

// Player-facing clues for the QR-exclusive pieces. Each hint names the KIND of
// code to scan — never the painting it unlocks. Three per collection, in the
// same order they appear at the bottom of each collection wall.
const HINTS: { roman: string; num: number }[] = [
  { roman: 'I', num: 1 },
  { roman: 'II', num: 2 },
  { roman: 'III', num: 3 },
  { roman: 'IV', num: 4 },
  { roman: 'V', num: 5 },
  { roman: 'VI', num: 6 },
];

export default function HintsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { locale } = useLocale();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + SPACING.xxl }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: insets.top + 52 }} />

        <View style={styles.head}>
          <Text style={styles.kicker}>{t(locale, 'hints.kicker')}</Text>
          <Text style={styles.h1}>{t(locale, 'hints.title')}</Text>
          <Text style={styles.intro}>{t(locale, 'hints.intro')}</Text>
        </View>

        {HINTS.map((group) => (
          <View key={group.roman} style={styles.section}>
            <Text style={styles.sectionTitle}>{t(locale, 'col.collectionRoman', { roman: group.roman })}</Text>
            {[1, 2, 3].map((j) => (
              <View key={j} style={styles.hintCard}>
                <MagnifyingGlass size={20} color={SPECIAL_COLOR} weight="bold" />
                <Text style={styles.hintText}>{t(locale, 'hints.' + group.num + '.' + j)}</Text>
              </View>
            ))}
          </View>
        ))}

        <View style={styles.footNote}>
          <Sparkle size={16} color={COLORS.textFaint} weight="fill" />
          <Text style={styles.footText}>{t(locale, 'hints.foot')}</Text>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  floatBar: {
    position: 'absolute', top: 0, left: 0, right: 0,
    paddingHorizontal: SPACING.lg, paddingBottom: SPACING.sm, zIndex: 10,
  },
  iconBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(20,20,27,0.85)', borderColor: COLORS.cardBorder, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center',
  },
  head: { paddingHorizontal: SPACING.lg },
  kicker: { color: SPECIAL_COLOR, fontSize: 12, fontWeight: '800', letterSpacing: 3 },
  h1: { color: COLORS.text, fontSize: 28, fontWeight: '700', marginTop: 4, fontFamily: FONT.serif },
  intro: { color: COLORS.textDim, fontSize: 14, lineHeight: 20, marginTop: SPACING.md },
  section: { marginTop: SPACING.xl },
  sectionTitle: {
    color: COLORS.gold, fontSize: 12, fontWeight: '800', letterSpacing: 1.5,
    paddingHorizontal: SPACING.lg, marginBottom: SPACING.sm, textTransform: 'uppercase',
  },
  hintCard: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    marginHorizontal: SPACING.lg, marginBottom: SPACING.sm,
    backgroundColor: COLORS.card, borderColor: SPECIAL_COLOR + '33', borderWidth: 1,
    borderRadius: RADIUS.md, padding: SPACING.md,
  },
  hintText: { color: COLORS.text, fontSize: 14, lineHeight: 19, flex: 1 },
  footNote: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    marginHorizontal: SPACING.lg, marginTop: SPACING.xl,
  },
  footText: { color: COLORS.textFaint, fontSize: 12, flex: 1, lineHeight: 17 },
});
