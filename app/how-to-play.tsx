import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  ArrowsClockwise,
  MagnifyingGlass,
  QrCode,
  ShieldCheck,
  Storefront,
} from 'phosphor-react-native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLocale } from '@/i18n';
import { t } from '@/data/ui';
import { COLORS, FONT, RADIUS, SPACING } from '@/theme/theme';

const SECTIONS: { icon: React.ReactNode; id: string }[] = [
  { icon: <QrCode size={22} color={COLORS.gold} weight="fill" />, id: 's1' },
  { icon: <ArrowsClockwise size={22} color={COLORS.gold} weight="fill" />, id: 's3' },
  { icon: <MagnifyingGlass size={22} color={COLORS.gold} weight="bold" />, id: 's4' },
  { icon: <Storefront size={22} color={COLORS.gold} weight="fill" />, id: 's5' },
  { icon: <ShieldCheck size={22} color={COLORS.success} weight="fill" />, id: 's6' },
];

export default function HowToPlayScreen() {
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
          <Text style={styles.kicker}>{t(locale, 'scan.kicker')}</Text>
          <Text style={styles.h1}>{t(locale, 'set.howToPlay')}</Text>
        </View>

        {SECTIONS.map((sec) => (
          <View key={sec.id} style={styles.card}>
            <View style={styles.cardHead}>
              {sec.icon}
              <Text style={styles.cardTitle}>{t(locale, 'htp.' + sec.id + 't')}</Text>
            </View>
            <Text style={styles.cardBody}>{t(locale, 'htp.' + sec.id + 'b')}</Text>
          </View>
        ))}
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
  head: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.sm },
  kicker: { color: COLORS.gold, fontSize: 12, fontWeight: '800', letterSpacing: 3 },
  h1: { color: COLORS.text, fontSize: 30, fontWeight: '700', marginTop: 4, fontFamily: FONT.serif },
  card: {
    marginHorizontal: SPACING.lg, marginTop: SPACING.md,
    backgroundColor: COLORS.card, borderColor: COLORS.cardBorder, borderWidth: 1,
    borderRadius: RADIUS.lg, padding: SPACING.lg,
  },
  cardHead: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, marginBottom: SPACING.sm },
  cardTitle: { color: COLORS.text, fontSize: 17, fontWeight: '800' },
  cardBody: { color: COLORS.textDim, fontSize: 14, lineHeight: 21 },
});
