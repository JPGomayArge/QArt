import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { RARITY, type Rarity } from '@/game/rarity';
import { useLocale } from '@/i18n';
import { t } from '@/data/ui';
import { RADIUS } from '@/theme/theme';

export function RarityBadge({ rarity, small = false }: { rarity: Rarity; small?: boolean }) {
  const meta = RARITY[rarity];
  const { locale } = useLocale();
  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: meta.glow, borderColor: meta.color + '99' },
        small && styles.badgeSmall,
      ]}
    >
      <View style={[styles.dot, { backgroundColor: meta.color }]} />
      <Text style={[styles.label, { color: meta.color }, small && styles.labelSmall]}>
        {t(locale, 'rarity.' + rarity)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 6,
  },
  badgeSmall: { paddingHorizontal: 7, paddingVertical: 2, gap: 4 },
  dot: { width: 7, height: 7, borderRadius: 4 },
  label: { fontSize: 12, fontWeight: '700', letterSpacing: 0.4 },
  labelSmall: { fontSize: 10 },
});
