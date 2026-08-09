import { ShieldCheck, LinkBreak, MagicWand, Lock, Eye } from 'phosphor-react-native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLocale } from '@/i18n';
import { t } from '@/data/ui';
import { COLORS, RADIUS, SPACING } from '@/theme/theme';

type Props = {
  onAcknowledge: () => void;
  // When shown from Settings (already acknowledged) we change the button label.
  reviewMode?: boolean;
  onClose?: () => void;
};

export function SafetyScreen({ onAcknowledge, reviewMode = false, onClose }: Props) {
  const insets = useSafeAreaInsets();
  const { locale } = useLocale();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + SPACING.xxl,
          paddingBottom: insets.bottom + SPACING.xl,
          paddingHorizontal: SPACING.xl,
          flexGrow: 1,
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.badge}>
          <ShieldCheck size={44} color={COLORS.gold} weight="fill" />
        </View>

        <Text style={styles.title}>{t(locale, 'safety.title')}</Text>
        <Text style={styles.subtitle}>{t(locale, 'safety.subtitle')}</Text>

        <View style={styles.points}>
          <Point
            icon={<LinkBreak size={22} color={COLORS.gold} weight="fill" />}
            title={t(locale, 'safety.p1t')}
            body={t(locale, 'safety.p1b')}
          />
          <Point
            icon={<MagicWand size={22} color={COLORS.gold} weight="fill" />}
            title={t(locale, 'safety.p2t')}
            body={t(locale, 'safety.p2b')}
          />
          <Point
            icon={<Lock size={22} color={COLORS.gold} weight="fill" />}
            title={t(locale, 'safety.p3t')}
            body={t(locale, 'safety.p3b')}
          />
          <Point
            icon={<Eye size={22} color={COLORS.gold} weight="fill" />}
            title={t(locale, 'safety.p4t')}
            body={t(locale, 'safety.p4b')}
          />
        </View>

        <Pressable style={styles.button} onPress={reviewMode ? onClose : onAcknowledge}>
          <Text style={styles.buttonText}>{reviewMode ? t(locale, 'safety.gotIt') : t(locale, 'safety.iUnderstand')}</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function Point({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <View style={styles.point}>
      <View style={styles.pointIcon}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={styles.pointTitle}>{title}</Text>
        <Text style={styles.pointBody}>{body}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  badge: {
    alignSelf: 'center',
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: COLORS.card,
    borderColor: COLORS.gold + '55',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  title: { color: COLORS.text, fontSize: 30, fontWeight: '900', textAlign: 'center' },
  subtitle: {
    color: COLORS.textDim,
    fontSize: 15,
    textAlign: 'center',
    marginTop: SPACING.sm,
    lineHeight: 21,
    paddingHorizontal: SPACING.md,
  },
  points: { marginTop: SPACING.xxl, gap: SPACING.lg },
  point: { flexDirection: 'row', gap: SPACING.md, alignItems: 'flex-start' },
  pointIcon: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.card,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointTitle: { color: COLORS.text, fontSize: 16, fontWeight: '700' },
  pointBody: { color: COLORS.textDim, fontSize: 14, lineHeight: 20, marginTop: 3 },
  button: {
    backgroundColor: COLORS.gold,
    borderRadius: RADIUS.pill,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    marginTop: SPACING.xxl,
  },
  buttonText: { color: '#0B0B0F', fontSize: 16, fontWeight: '800' },
});
