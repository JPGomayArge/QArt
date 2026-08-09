import { useLocalSearchParams, useRouter } from 'expo-router';
import { BookOpen, MagnifyingGlassPlus, Sparkle } from 'phosphor-react-native';
import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';

import { ArtImage } from '@/components/ArtImage';
import { ARTWORK_BY_ID } from '@/data/artworks';
import { COLLECTION_BY_ID, collectionFull } from '@/data/collections';
import { titleFor } from '@/data/titles';
import { useLocale } from '@/i18n';
import { t } from '@/data/ui';
import { IMG_DETAIL } from '@/game/images';
import { isExclusive } from '@/game/hash';
import { RARITY, rarityRank, SPECIAL_COLOR } from '@/game/rarity';
import { partProgress, useGame } from '@/store/GameStore';
import { playReveal } from '@/game/sound';
import { track } from '@/game/telemetry';
import { Haptics, hImpact, hNotify, isReduceMotion } from '@/game/prefs';
import { COLORS, FONT, RADIUS, SPACING } from '@/theme/theme';

export default function RevealScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string; isNew?: string; count?: string; source?: string }>();

  const { owned } = useGame();
  const { locale } = useLocale();
  const artwork = params.id ? ARTWORK_BY_ID[params.id] : undefined;
  const isNew = params.isNew === '1';
  const count = Number(params.count ?? '1');
  const rank = artwork ? rarityRank(artwork.rarity) : 0;
  const pp = artwork ? partProgress(artwork, owned) : null;
  const showPart = pp?.isPart && !pp.complete ? { index: artwork!.partIndex!, total: artwork!.partTotal! } : undefined;

  const reduced = isReduceMotion(); // calmer reveal: skip rings/sparks/sweep/aura

  const scale = useRef(new Animated.Value(0.7)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const glow = useRef(new Animated.Value(0)).current;

  // Radiating rings: more, brighter and faster the rarer the piece.
  const ringCount = rank + 1;
  const rings = useMemo(
    () => Array.from({ length: ringCount }, () => ({ s: new Animated.Value(0.55), o: new Animated.Value(0) })),
    [ringCount]
  );
  // Sparkle burst from epic upward; density grows with rarity.
  const sparkleCount = rank >= 2 ? 6 + (rank - 2) * 5 : 0;
  // A light sweeping across the canvas (legendary+) and a slow rotating aura
  // reserved for the very top tier — each tier should *feel* different, not
  // just look differently coloured.
  const sweep = useRef(new Animated.Value(0)).current;
  const spin = useRef(new Animated.Value(0)).current;
  const sparks = useMemo(
    () => Array.from({ length: sparkleCount }, (_, i) => ({ v: new Animated.Value(0), a: (i / sparkleCount) * Math.PI * 2 })),
    [sparkleCount]
  );

  useEffect(() => {
    if (!artwork) return;
    const buildup = rank * 90; // rarer pieces build suspense a touch longer

    // Track everything so we can shut it ALL down on unmount. Without this,
    // every reveal left its looping animations + timers running forever, which
    // piled up across scans and cooked the phone.
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const loops: Animated.CompositeAnimation[] = [];
    const later = (fn: () => void, ms: number) => {
      const t = setTimeout(fn, ms);
      timers.push(t);
      return t;
    };

    Animated.sequence([
      Animated.delay(buildup),
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 240, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1, friction: 5 - Math.min(rank, 2), tension: 80, useNativeDriver: true }),
      ]),
    ]).start();

    // Decorative animation layers — skipped entirely in "reduce motion" mode.
    if (!reduced) {
    // Glow pulse — drives an overlay's opacity (native driver, cheap) instead of
    // an animated shadowRadius (which re-rasterises the shadow every frame).
    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 1300 - rank * 120, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0, duration: 1300 - rank * 120, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    );
    loops.push(glowLoop);
    glowLoop.start();

    // Radiating rings.
    rings.forEach((r, i) => {
      const run = () =>
        Animated.parallel([
          Animated.timing(r.s, { toValue: 2.2, duration: 1600 - rank * 150, easing: Easing.out(Easing.quad), useNativeDriver: true }),
          Animated.sequence([
            Animated.timing(r.o, { toValue: 0.25 + rank * 0.12, duration: 200, useNativeDriver: true }),
            Animated.timing(r.o, { toValue: 0, duration: 1400 - rank * 150, useNativeDriver: true }),
          ]),
        ]);
      const loop = () => {
        if (cancelled) return;
        r.s.setValue(0.55);
        run().start(({ finished }) => finished && !cancelled && loop());
      };
      later(loop, buildup + i * ((1500 - rank * 120) / ringCount));
    });

    // Sparkle burst.
    const burst = () =>
      Animated.stagger(
        40,
        sparks.map((sp) => {
          sp.v.setValue(0);
          return Animated.timing(sp.v, { toValue: 1, duration: 900, easing: Easing.out(Easing.quad), useNativeDriver: true });
        })
      );
    if (sparkleCount) {
      const loopBurst = () => {
        if (cancelled) return;
        burst().start(({ finished }) => finished && !cancelled && later(loopBurst, 1400));
      };
      later(loopBurst, buildup + 150);
    }

    // Sweep of light across the piece (legendary+).
    if (rank >= 3) {
      const sweepLoop = () => {
        if (cancelled) return;
        Animated.sequence([
          Animated.timing(sweep, { toValue: 1, duration: 1100, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
          Animated.delay(1200 - rank * 150),
        ]).start(({ finished }) => {
          if (finished && !cancelled) {
            sweep.setValue(0);
            sweepLoop();
          }
        });
      };
      later(sweepLoop, buildup + 300);
    }

    // Slow rotating aura — top tier only.
    if (rank >= 4) {
      const spinLoop = Animated.loop(
        Animated.timing(spin, { toValue: 1, duration: 9000, easing: Easing.linear, useNativeDriver: true })
      );
      loops.push(spinLoop);
      spinLoop.start();
    }
    } // end !reduced

    // Haptics escalate with rarity (no-op if the user disabled them).
    {
      const seq: Array<() => void> = [];
      if (rank <= 1) seq.push(() => hNotify(isNew ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Warning));
      else if (rank === 2) seq.push(() => hImpact(Haptics.ImpactFeedbackStyle.Medium));
      else {
        seq.push(() => hImpact(Haptics.ImpactFeedbackStyle.Heavy));
        seq.push(() => hImpact(Haptics.ImpactFeedbackStyle.Heavy));
        seq.push(() => hNotify(Haptics.NotificationFeedbackType.Success));
      }
      seq.forEach((fn, i) => later(fn, buildup + i * 140));
    }

    // Reveal chime, synced with the pop (grander the rarer; soft tone for dupes).
    later(() => playReveal(rank, isNew), buildup);

    // Local analytics: what got revealed and where from.
    track('reveal', { id: artwork.id, rarity: artwork.rarity, source: params.source ?? 'scan' });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      loops.forEach((l) => l.stop());
      [opacity, scale, glow, sweep, spin].forEach((v) => v.stopAnimation());
      rings.forEach((r) => (r.s.stopAnimation(), r.o.stopAnimation()));
      sparks.forEach((sp) => sp.v.stopAnimation());
    };
  }, [artwork, rank]);

  if (!artwork) {
    return (
      <Pressable style={styles.backdrop} onPress={() => router.back()}>
        <Text style={styles.dim}>{t(locale, 'reveal.nothing')}</Text>
      </Pressable>
    );
  }

  const rarity = RARITY[artwork.rarity];
  const accent = isExclusive(artwork.id) ? SPECIAL_COLOR : rarity.color;
  const collection = COLLECTION_BY_ID[artwork.collectionId];
  const glowOpacity = glow.interpolate({ inputRange: [0, 1], outputRange: [0.2, 0.6 + rank * 0.06] });

  return (
    <View style={[styles.backdrop, { backgroundColor: `rgba(6,6,10,${0.9 + rank * 0.02})` }]}>
      <Animated.View style={{ opacity, transform: [{ translateY: -24 }], width: '100%', alignItems: 'center' }}>
        <View style={styles.statusRow}>
          <Sparkle size={18} color={accent} weight="fill" />
          <Text style={[styles.statusText, { color: accent }]}>
            {!isNew
              ? t(locale, 'reveal.anotherCopy', { count })
              : pp?.isPart
                ? pp.complete
                  ? t(locale, 'reveal.finalPart')
                  : t(locale, 'reveal.partOf', { index: artwork.partIndex ?? 0, total: pp.total, have: pp.have })
                : isExclusive(artwork.id)
                  ? t(locale, 'reveal.specialUnlock')
                  : t(locale, 'reveal.h' + (rank + 1))}
          </Text>
        </View>

        {/* Rings + sparks live in here so they radiate from the painting itself.
            The reveal pop scales from THIS block's centre = the frame's centre. */}
        <Animated.View style={{ transform: [{ scale }] }}>
        <View style={styles.frameZone}>
          {!reduced && (
          <View style={styles.ringLayer} pointerEvents="none">
            {/* Breathing halo — opacity pulse (native driver), static shadow. */}
            <Animated.View
              style={[
                styles.glowFrame,
                { borderColor: accent, shadowColor: accent, opacity: glowOpacity },
              ]}
            />
            {rank >= 4 && (
              <Animated.View
                style={[
                  styles.aura,
                  {
                    borderColor: accent,
                    transform: [
                      { rotate: spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) },
                    ],
                  },
                ]}
              />
            )}
            {rings.map((r, i) => (
              <Animated.View
                key={i}
                style={[styles.ring, { borderColor: accent, opacity: r.o, transform: [{ scale: r.s }] }]}
              />
            ))}
            {sparks.map((sp, i) => {
              const dist = 120 + rank * 20;
              const tx = sp.v.interpolate({ inputRange: [0, 1], outputRange: [0, Math.cos(sp.a) * dist] });
              const ty = sp.v.interpolate({ inputRange: [0, 1], outputRange: [0, Math.sin(sp.a) * dist] });
              const o = sp.v.interpolate({ inputRange: [0, 0.2, 1], outputRange: [0, 1, 0] });
              return (
                <Animated.View
                  key={`s${i}`}
                  style={[styles.spark, { backgroundColor: accent, opacity: o, transform: [{ translateX: tx }, { translateY: ty }] }]}
                />
              );
            })}
          </View>
          )}

          <Animated.View
            style={[
              styles.frame,
              { borderColor: accent, shadowColor: accent, shadowRadius: 14 + rank * 5, shadowOpacity: 0.8 },
            ]}
          >
            <Pressable
              style={{ flex: 1 }}
              onPress={() =>
                router.push({
                  pathname: '/viewer',
                  params: showPart
                    ? { id: artwork.id, part: `${showPart.index}:${showPart.total}` }
                    : { id: artwork.id },
                })
              }
            >
              <ArtImage artwork={artwork} radius={RADIUS.md} part={showPart} width={IMG_DETAIL} instant={!isNew} />
              {rank >= 3 && !reduced && (
                <Animated.View
                  pointerEvents="none"
                  style={[
                    styles.sweep,
                    {
                      opacity: sweep.interpolate({ inputRange: [0, 0.15, 0.85, 1], outputRange: [0, 0.9, 0.9, 0] }),
                      transform: [
                        { rotate: '18deg' },
                        { translateX: sweep.interpolate({ inputRange: [0, 1], outputRange: [-160, 320] }) },
                      ],
                    },
                  ]}
                />
              )}
              <View style={styles.zoomHint}>
                <MagnifyingGlassPlus size={14} color={COLORS.text} weight="bold" />
              </View>
            </Pressable>
          </Animated.View>
        </View>
        </Animated.View>

        <Text style={styles.title}>{titleFor(artwork.id, locale, artwork.title)}</Text>
        <Text style={styles.artist}>{artwork.artist}</Text>
        {collection && <Text style={styles.collection}>{collectionFull(artwork.collectionId, locale)}</Text>}

        <View style={styles.actions}>
          <Pressable style={[styles.primary, { backgroundColor: accent }]} onPress={() => router.replace(`/artwork/${artwork.id}`)}>
            <BookOpen size={18} color="#0B0B0F" weight="fill" />
            <Text style={styles.primaryText}>{t(locale, 'reveal.readStory')}</Text>
          </Pressable>
          <Pressable style={styles.secondary} onPress={() => router.back()}>
            <Text style={styles.secondaryText}>{t(locale, 'reveal.keepHunting')}</Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: SPACING.xl },
  dim: { color: COLORS.textDim },
  frameZone: { alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.lg },
  zoomHint: {
    position: 'absolute', right: 8, bottom: 8, width: 28, height: 28, borderRadius: 14,
    backgroundColor: 'rgba(11,11,15,0.65)', alignItems: 'center', justifyContent: 'center',
  },
  ringLayer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  ring: { position: 'absolute', width: 240, height: 300, borderWidth: 2, borderRadius: RADIUS.xl },
  glowFrame: {
    // Hug the frame exactly so the pulsing outline never protrudes past the
    // painting — the halo comes from the (outward) shadow, not a bigger border.
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: RADIUS.lg, borderWidth: 2,
    shadowRadius: 24, shadowOpacity: 1, shadowOffset: { width: 0, height: 0 },
  },
  aura: {
    position: 'absolute', width: 330, height: 330, borderWidth: 1.5,
    borderRadius: RADIUS.lg, opacity: 0.35, borderStyle: 'dashed',
  },
  sweep: {
    position: 'absolute', top: -60, bottom: -60, width: 46,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  spark: { position: 'absolute', width: 7, height: 7, borderRadius: 4 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: SPACING.lg },
  statusText: { fontSize: 14, fontWeight: '800', letterSpacing: 0.5 },
  frame: {
    width: 260,
    height: 300,
    borderWidth: 2,
    borderRadius: RADIUS.lg,
    padding: SPACING.sm,
    backgroundColor: COLORS.card,
    elevation: 16,
    overflow: 'hidden',
  },
  title: { color: COLORS.text, fontSize: 24, fontWeight: '700', textAlign: 'center', marginTop: SPACING.md, fontFamily: FONT.serif },
  artist: { color: COLORS.textDim, fontSize: 15, marginTop: 2 },
  collection: { color: COLORS.textFaint, fontSize: 12, marginTop: SPACING.sm, textAlign: 'center' },
  actions: { marginTop: SPACING.xl, width: '100%', gap: SPACING.sm },
  primary: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: SPACING.md, borderRadius: RADIUS.pill },
  primaryText: { color: '#0B0B0F', fontSize: 15, fontWeight: '800' },
  secondary: { alignItems: 'center', paddingVertical: SPACING.md },
  secondaryText: { color: COLORS.textDim, fontSize: 15, fontWeight: '600' },
});
