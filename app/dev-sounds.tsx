// Developer only: every reveal cue in one place, so they can be compared
// back-to-back. Playing here ignores the mute setting on purpose — you are
// testing the audio, not playing the game.

import { useRouter } from 'expo-router';
import { ArrowLeft, Play } from 'phosphor-react-native';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLocale } from '@/i18n';
import { t } from '@/data/ui';
import { RARITY } from '@/game/rarity';
import { SPECIAL_COLOR } from '@/game/rarity';
import { previewSound, SOUND_KEYS, type SoundKey } from '@/game/sound';
import { COLORS, FONT, RADIUS, SPACING } from '@/theme/theme';

// Colour each cue like the moment it belongs to.
const TINT: Record<SoundKey, string> = {
  common: RARITY.common.color,
  rare: RARITY.rare.color,
  epic: RARITY.epic.color,
  legendary: RARITY.legendary.color,
  unique: RARITY.unique.color,
  special: SPECIAL_COLOR,
  finale: COLORS.gold,
  dupe: COLORS.textFaint,
};

export default function DevSoundsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { locale } = useLocale();
  const [playing, setPlaying] = useState<SoundKey | null>(null);

  const play = (k: SoundKey) => {
    setPlaying(k);
    previewSound(k);
    setTimeout(() => setPlaying((cur) => (cur === k ? null : cur)), 1200);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.topBar, { paddingTop: insets.top + SPACING.sm }]}>
        <Pressable style={styles.iconBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color={COLORS.text} />
        </Pressable>
        <Text style={styles.h1}>{t(locale, 'dev.sounds')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={{ padding: SPACING.lg, paddingBottom: insets.bottom + SPACING.xxl, gap: SPACING.sm }}
      >
        <Text style={styles.note}>{t(locale, 'dev.soundsBody')}</Text>

        {SOUND_KEYS.map((k) => (
          <Pressable
            key={k}
            style={[styles.row, { borderColor: TINT[k] + '55' }, playing === k && { borderColor: TINT[k] }]}
            onPress={() => play(k)}
          >
            <View style={[styles.dot, { backgroundColor: TINT[k] }]}>
              <Play size={14} color="#0B0B0F" weight="fill" />
            </View>
            <Text style={styles.name}>{t(locale, `snd.${k}` as any)}</Text>
            <Text style={styles.file}>{k}.wav</Text>
          </Pressable>
        ))}
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
  h1: { color: COLORS.text, fontSize: 17, fontWeight: '800', fontFamily: FONT.serif },
  note: { color: COLORS.textDim, fontSize: 13, lineHeight: 19, marginBottom: SPACING.xs },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    backgroundColor: COLORS.card, borderWidth: 1, borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.md,
  },
  dot: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  name: { color: COLORS.text, fontSize: 15, fontWeight: '700', flex: 1 },
  file: { color: COLORS.textFaint, fontSize: 11, fontFamily: 'Menlo' },
});
