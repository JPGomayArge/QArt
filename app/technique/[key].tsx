import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, PaintBrushBroad } from 'phosphor-react-native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { techniqueInfo } from '@/data/techniqueInfo';
import { useLocale } from '@/i18n';
import { COLORS, FONT, RADIUS, SPACING } from '@/theme/theme';

export default function TechniqueScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { locale } = useLocale();
  const { key } = useLocalSearchParams<{ key: string }>();
  const info = techniqueInfo(key, locale);

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
              <PaintBrushBroad size={26} color={COLORS.gold} weight="fill" />
              <Text style={styles.kicker}>{locale === 'de' ? 'TECHNIK' : locale === 'pt' ? 'TÉCNICA' : locale === 'it' ? 'TECNICA' : locale === 'fr' ? 'TECHNIQUE' : locale === 'es' ? 'TÉCNICA' : 'TECHNIQUE'}</Text>
            </View>
            <Text style={styles.title}>{info.title}</Text>
            {info.about.split('\n\n').map((p, i) => (
              <Text key={i} style={styles.body}>{p}</Text>
            ))}
          </>
        ) : (
          <Text style={styles.dim}>{locale === 'de' ? 'Keine Informationen zu dieser Technik.' : locale === 'pt' ? 'Nenhuma informação sobre esta técnica.' : locale === 'it' ? 'Nessuna informazione su questa tecnica.' : locale === 'fr' ? 'Aucune information sur cette technique.' : locale === 'es' ? 'No hay información de esta técnica.' : 'No information for this technique.'}</Text>
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
  body: { color: COLORS.textDim, fontSize: 16, lineHeight: 25, marginBottom: SPACING.md },
  dim: { color: COLORS.textFaint, fontSize: 15 },
  close: {
    position: 'absolute', left: SPACING.lg, width: 42, height: 42, borderRadius: 21,
    backgroundColor: 'rgba(30,30,36,0.85)', alignItems: 'center', justifyContent: 'center',
  },
});
