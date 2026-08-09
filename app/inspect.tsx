// Inspect mode — "lean in" close-up of a hung piece. Reached by double-tapping a
// work in My Room. Shows the framed painting large, in front of the same room
// backdrop, with pinch-to-zoom and drag to move across the surface. It keeps the
// frame and the wall so it feels like stepping up to the piece, not a bare viewer.

import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowsClockwise, X } from 'phosphor-react-native';
import React, { useMemo, useRef } from 'react';
import {
  Animated,
  PanResponder,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArtImage } from '@/components/ArtImage';
import { NineSliceFrame } from '@/components/NineSliceFrame';
import { ARTWORK_BY_ID } from '@/data/artworks';
import { DIMENSIONS } from '@/data/dimensions';
import { FRAME_ASSETS } from '@/data/frameAssets';
import { titleFor } from '@/data/titles';
import { IMG_DETAIL } from '@/game/images';
import { useLocale } from '@/i18n';
import { SKIN_BY_ID, DEFAULT_SKIN, FRAME_BY_ID, DEFAULT_FRAME } from '@/game/shop';
import { useGame } from '@/store/GameStore';
import { COLORS, FONT } from '@/theme/theme';

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export default function InspectScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width: W, height: H } = useWindowDimensions();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { roomFrames, activeFrame, activeSkin } = useGame();
  const { locale } = useLocale();

  const artwork = id ? ARTWORK_BY_ID[id] : undefined;
  const skin = SKIN_BY_ID[activeSkin] ?? SKIN_BY_ID[DEFAULT_SKIN];
  const f = artwork
    ? FRAME_BY_ID[roomFrames[artwork.id]] ?? FRAME_BY_ID[activeFrame] ?? FRAME_BY_ID[DEFAULT_FRAME]
    : FRAME_BY_ID[DEFAULT_FRAME];

  // Zoom + pan (committed values in refs).
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scaleAV = useRef(new Animated.Value(1)).current;
  const off = useRef({ x: 0, y: 0 }).current;
  const scl = useRef({ v: 1 }).current;
  const g = useRef({ mode: '' as '' | 'pan' | 'pinch', dist: 0, sScale: 1, sx: 0, sy: 0, tx: 0, ty: 0 }).current;

  const responder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt) => {
          const ts = evt.nativeEvent.touches;
          g.dist = 0;
          if (ts.length < 2) {
            g.mode = 'pan';
            g.sx = off.x;
            g.sy = off.y;
            g.tx = ts[0].pageX;
            g.ty = ts[0].pageY;
          } else {
            g.mode = 'pinch';
          }
        },
        onPanResponderMove: (evt) => {
          const ts = evt.nativeEvent.touches;
          if (ts.length >= 2) {
            g.mode = 'pinch';
            const dist = Math.hypot(ts[0].pageX - ts[1].pageX, ts[0].pageY - ts[1].pageY);
            if (!g.dist) {
              g.dist = dist;
              g.sScale = scl.v;
            }
            const ns = clamp((g.sScale * dist) / g.dist, 1, 6);
            scl.v = ns;
            scaleAV.setValue(ns);
          } else {
            if (g.mode !== 'pan') {
              g.mode = 'pan';
              g.dist = 0;
              g.sx = off.x;
              g.sy = off.y;
              g.tx = ts[0].pageX;
              g.ty = ts[0].pageY;
            }
            const nx = g.sx + (ts[0].pageX - g.tx);
            const ny = g.sy + (ts[0].pageY - g.ty);
            off.x = nx;
            off.y = ny;
            pan.setValue({ x: nx, y: ny });
          }
        },
        onPanResponderRelease: () => {
          g.mode = '';
          g.dist = 0;
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const reset = () => {
    off.x = 0;
    off.y = 0;
    scl.v = 1;
    Animated.parallel([
      Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: true, speed: 14, bounciness: 4 }),
      Animated.spring(scaleAV, { toValue: 1, useNativeDriver: true, speed: 14, bounciness: 4 }),
    ]).start();
  };

  if (!artwork) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <StatusBar hidden />
        <Pressable style={[styles.closeBtn, { top: insets.top + 10 }]} onPress={() => router.back()}>
          <X size={22} color="#F5F3EE" weight="bold" />
        </Pressable>
      </View>
    );
  }

  // Framed piece geometry — large, to fill most of the height ("up close").
  const d = DIMENSIONS[artwork.id];
  const aspect = d ? d[1] / d[0] : 0.8; // width / height
  let ph = H * 0.6;
  let pw = ph * aspect;
  const maxPw = W * 0.86;
  if (pw > maxPw) {
    pw = maxPw;
    ph = pw / aspect;
  }
  const bare = f.id === 'none';
  const frameArt = !bare ? FRAME_ASSETS[f.id] : undefined;
  if (frameArt) {
    const s = 1 / (1 + 2 * (f.ratio ?? 0.14));
    pw *= s;
    ph *= s;
  }
  const b9 = frameArt ? Math.max(12, Math.round(Math.min(pw, ph) * (f.ratio ?? 0.14))) : 0;
  const fb = bare || frameArt ? 0 : Math.max(f.borderWidth, 4);

  return (
    <View style={[styles.container, { backgroundColor: skin.wall }]}>
      <StatusBar hidden />

      {/* Room backdrop — the same wall, so it feels like stepping up to it */}
      {skin.bg ? (
        <ExpoImage source={skin.bg} style={StyleSheet.absoluteFill} contentFit="cover" blurRadius={2} />
      ) : (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: skin.wall }]} />
      )}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.35)' }]} />

      {/* Framed piece with pinch-zoom + pan */}
      <View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center' }]} {...responder.panHandlers}>
        <Animated.View style={{ transform: [{ translateX: pan.x }, { translateY: pan.y }, { scale: scaleAV }] }}>
          <View style={styles.shadow}>
            {frameArt ? (
              <NineSliceFrame
                source={frameArt}
                insetX={f.insetX ?? 0.2}
                insetY={f.insetY ?? 0.2}
                border={b9}
                width={pw}
                height={ph}
                radius={2}
              >
                <ArtImage artwork={artwork} radius={2} showQrMark={false} instant width={IMG_DETAIL} />
              </NineSliceFrame>
            ) : (
              <View
                style={{
                  width: pw + fb * 2,
                  height: ph + fb * 2,
                  padding: fb,
                  borderRadius: bare ? 1 : 3,
                  backgroundColor: bare ? 'transparent' : f.color ?? skin.frame,
                }}
              >
                <View style={{ flex: 1, borderRadius: 1, overflow: 'hidden', borderWidth: !bare && f.liner ? 2 : 0, borderColor: f.liner ?? 'transparent' }}>
                  <ArtImage artwork={artwork} radius={1} showQrMark={false} instant width={IMG_DETAIL} />
                </View>
              </View>
            )}
          </View>
        </Animated.View>
      </View>

      {/* Chrome */}
      <Pressable style={[styles.closeBtn, { top: insets.top + 10 }]} onPress={() => router.back()}>
        <X size={22} color="#F5F3EE" weight="bold" />
      </Pressable>
      <Pressable style={[styles.recenterBtn, { top: insets.top + 10 }]} onPress={reset}>
        <ArrowsClockwise size={18} color="#F5F3EE" weight="bold" />
      </Pressable>

      <View style={[styles.caption, { bottom: insets.bottom + 22 }]} pointerEvents="none">
        <Text style={styles.title} numberOfLines={1}>{titleFor(artwork.id, locale, artwork.title)}</Text>
        <Text style={styles.meta} numberOfLines={1}>{artwork.artist}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0F', overflow: 'hidden' },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 16 },
    elevation: 16,
  },
  closeBtn: {
    position: 'absolute', left: 16, width: 42, height: 42, borderRadius: 21,
    backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center',
  },
  recenterBtn: {
    position: 'absolute', right: 16, width: 42, height: 42, borderRadius: 21,
    backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center',
  },
  caption: { position: 'absolute', left: 0, right: 0, alignItems: 'center', gap: 2 },
  title: {
    color: '#F5F3EE', fontSize: 17, fontFamily: FONT.serif, fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.9)', textShadowRadius: 8,
  },
  meta: {
    color: 'rgba(245,243,238,0.85)', fontSize: 13,
    textShadowColor: 'rgba(0,0,0,0.9)', textShadowRadius: 8,
  },
});
