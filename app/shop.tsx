import { useRouter } from 'expo-router';
import { ArrowLeft, Sparkle } from 'phosphor-react-native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ShopContent } from '@/components/ShopContent';
import { useLocale } from '@/i18n';
import { t } from '@/data/ui';
import { useGame } from '@/store/GameStore';
import { COLORS, FONT, RADIUS, SPACING } from '@/theme/theme';

// Standalone shop route (kept for deep links). The Gift Shop tab embeds the same
// <ShopContent /> under its "Shop" toggle.
export default function ShopScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { shards } = useGame();
  const { locale } = useLocale();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + SPACING.xxl }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.topBar, { paddingTop: insets.top + SPACING.sm }]}>
          <Pressable style={styles.iconBtn} onPress={() => router.back()}>
            <ArrowLeft size={22} color={COLORS.text} />
          </Pressable>
          <View style={styles.shardPill}>
            <Sparkle size={15} color={COLORS.gold} weight="fill" />
            <Text style={styles.shardPillText}>{shards}</Text>
          </View>
        </View>

        <View style={styles.head}>
          <Text style={styles.kicker}>{t(locale, 'shop.kicker')}</Text>
          <Text style={styles.h1}>{t(locale, 'shop.h1')}</Text>
        </View>

        <ShopContent />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg, paddingBottom: SPACING.sm,
  },
  iconBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.card,
    borderColor: COLORS.cardBorder, borderWidth: 1, alignItems: 'center', justifyContent: 'center',
  },
  shardPill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: COLORS.card, borderColor: COLORS.cardBorder, borderWidth: 1,
    borderRadius: RADIUS.pill, paddingHorizontal: SPACING.md, paddingVertical: 8,
  },
  shardPillText: { color: COLORS.text, fontWeight: '800', fontSize: 15 },
  head: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.md },
  kicker: { color: COLORS.gold, fontSize: 12, fontWeight: '800', letterSpacing: 3 },
  h1: { color: COLORS.text, fontSize: 28, fontWeight: '700', marginTop: 4, fontFamily: FONT.serif },
});
