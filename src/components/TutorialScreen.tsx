// First-run walkthrough, shown once after the safety notice.
//
// It has one job: make the player understand that ANY QR code in the world —
// a menu, a poster, a parcel label — turns into a painting here. Nothing else
// in the app communicates that, and without it the camera screen is a mystery.
//
// Four swipeable panels, then it hands over to the scanner.

import { QrCode, Sparkle, Storefront, Heart } from 'phosphor-react-native';
import React, { useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLocale } from '@/i18n';
import { t } from '@/data/ui';
import { PAINTINGS } from '@/game/parts';
import { COLLECTIONS } from '@/data/collections';
import { DAILY_SCAN_LIMIT } from '@/store/GameStore';
import { STARTER_SHARDS, SCAN_UPGRADE_STEP } from '@/game/shop';
import { COLORS, FONT, RADIUS, SPACING } from '@/theme/theme';

type Props = { onDone: () => void };

export function TutorialScreen({ onDone }: Props) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { locale } = useLocale();
  const ref = useRef<ScrollView>(null);
  const [page, setPage] = useState(0);

  const pages = [
    {
      icon: <QrCode size={54} color={COLORS.gold} weight="fill" />,
      title: t(locale, 'tut.1title'),
      body: t(locale, 'tut.1body'),
    },
    {
      icon: <Sparkle size={54} color={COLORS.gold} weight="fill" />,
      title: t(locale, 'tut.2title'),
      body: t(locale, 'tut.2body', { n: PAINTINGS.length, c: COLLECTIONS.length }),
    },
    {
      icon: <Storefront size={54} color={COLORS.gold} weight="fill" />,
      title: t(locale, 'tut.3title'),
      body: t(locale, 'tut.3body', { limit: DAILY_SCAN_LIMIT, gift: STARTER_SHARDS, step: SCAN_UPGRADE_STEP }),
    },
    {
      icon: <Heart size={54} color={COLORS.gold} weight="fill" />,
      title: t(locale, 'tut.4title'),
      body: t(locale, 'tut.4body'),
    },
  ];
  const last = page >= pages.length - 1;

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setPage(Math.round(e.nativeEvent.contentOffset.x / width));
  };
  const next = () => {
    if (last) onDone();
    else ref.current?.scrollTo({ x: width * (page + 1), animated: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={ref}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
      >
        {pages.map((p, i) => (
          <View key={i} style={[styles.page, { width, paddingTop: insets.top + SPACING.xxl }]}>
            <View style={styles.iconRing}>{p.icon}</View>
            <Text style={styles.title}>{p.title}</Text>
            <Text style={styles.body}>{p.body}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + SPACING.lg }]}>
        <View style={styles.dots}>
          {pages.map((_, i) => (
            <View key={i} style={[styles.dot, i === page && styles.dotOn]} />
          ))}
        </View>
        <Pressable style={styles.cta} onPress={next}>
          <Text style={styles.ctaText}>{last ? t(locale, 'tut.start') : t(locale, 'tut.next')}</Text>
        </Pressable>
        {!last && (
          <Pressable onPress={onDone} hitSlop={10}>
            <Text style={styles.skip}>{t(locale, 'tut.skip')}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  page: { flex: 1, alignItems: 'center', paddingHorizontal: SPACING.xl, gap: SPACING.lg },
  iconRing: {
    width: 108, height: 108, borderRadius: 54, alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(201,162,75,0.10)', borderWidth: 1, borderColor: 'rgba(201,162,75,0.45)',
    marginBottom: SPACING.sm,
  },
  title: {
    color: COLORS.text, fontSize: 24, fontWeight: '800',
    fontFamily: FONT.serif, textAlign: 'center',
  },
  body: { color: COLORS.textDim, fontSize: 15, lineHeight: 23, textAlign: 'center' },
  footer: { paddingHorizontal: SPACING.xl, gap: SPACING.md, alignItems: 'center' },
  dots: { flexDirection: 'row', gap: 7 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: COLORS.cardBorder },
  dotOn: { backgroundColor: COLORS.gold, width: 20 },
  cta: {
    alignSelf: 'stretch', backgroundColor: COLORS.gold, borderRadius: RADIUS.pill,
    paddingVertical: SPACING.md, alignItems: 'center',
  },
  ctaText: { color: '#0B0B0F', fontWeight: '800', fontSize: 16 },
  skip: { color: COLORS.textFaint, fontSize: 13 },
});
