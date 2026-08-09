// Immersive ("VR-lite") view of My Room. A fixed viewpoint inside a wide
// panoramic wall lined with your favorite works: move the phone (gyroscope) to
// look around, or drag with a finger as a fallback. Not stereoscopic VR — it's
// the low-cost "look around" museum feel without a 3D engine.
//
// Requires the native module `expo-sensors` (DeviceMotion). Install with:
//   npx expo install expo-sensors
// then rebuild the dev client. Without a gyroscope the drag fallback still works.

import { useRouter } from 'expo-router';
import { ArrowsClockwise, X } from 'phosphor-react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { ARTWORK_BY_ID, type Artwork } from '@/data/artworks';
import { DIMENSIONS } from '@/data/dimensions';
import { FRAME_ASSETS } from '@/data/frameAssets';
import { titleFor } from '@/data/titles';
import { useLocale } from '@/i18n';
import { t } from '@/data/ui';
import { SKIN_BY_ID, DEFAULT_SKIN, FRAME_BY_ID, DEFAULT_FRAME } from '@/game/shop';
import { useGame } from '@/store/GameStore';
import { FONT } from '@/theme/theme';

// Load the gyroscope defensively: if the native module isn't in the current
// build (e.g. Expo Go or an old dev client), fall back to drag-only instead of
// crashing. Rebuild the native app (npx expo run:ios / EAS) to enable the gyro.
let DeviceMotion: any = null;
try {
  const req: any = require;
  DeviceMotion = req('expo-sensors').DeviceMotion;
} catch {
  DeviceMotion = null;
}

// --- Look-around tuning (safe to tweak after testing on device) ---------------
const SENSOR_MS = 20; // ~50 Hz gyro updates
const SMOOTH = 0.22; // low-pass factor (0..1) — higher = snappier, lower = calmer
const SIGN_X = -1; // flip if turning right reveals the wrong side
const SIGN_Y = 1; // flip if tilting up/down feels inverted
const DRAG_GAIN = 1; // finger-drag sensitivity relative to pixels

export default function VrRoomScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width: W, height: H } = useWindowDimensions();
  const { room, roomFrames, roomHero, activeFrame, activeSkin } = useGame();
  const { locale } = useLocale();
  const [hasSensor, setHasSensor] = useState(false);

  const skin = SKIN_BY_ID[activeSkin] ?? SKIN_BY_ID[DEFAULT_SKIN];
  const frameFor = (id: string) =>
    FRAME_BY_ID[roomFrames[id]] ?? FRAME_BY_ID[activeFrame] ?? FRAME_BY_ID[DEFAULT_FRAME];

  // Pieces on the wall, with the main exhibit pulled to the centre so it's what
  // you face when you enter.
  const pieces = useMemo(() => {
    const list = room.map((id) => ARTWORK_BY_ID[id]).filter(Boolean) as Artwork[];
    if (roomHero) {
      const h = list.findIndex((p) => p.id === roomHero);
      if (h > 0) {
        const [hero] = list.splice(h, 1);
        list.splice(Math.floor(list.length / 2), 0, hero);
      }
    }
    return list;
  }, [room, roomHero]);

  // World is wider/taller than the screen; we translate it to "look around".
  const maxX = W * 1.4;
  const maxY = H * 0.28;
  const worldW = W + maxX * 2;
  const worldH = H + maxY * 2;
  const K_X = maxX / 0.7; // reach the horizontal edge at ~40° of yaw
  const K_Y = maxY / 0.5; // reach the vertical edge at ~29° of pitch

  const pos = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const sensor = useRef({ x: 0, y: 0 }); // gyro contribution
  const drag = useRef({ x: 0, y: 0 }); // accumulated finger drag
  const smooth = useRef({ x: 0, y: 0 }); // low-passed final value
  const base = useRef<{ a: number; b: number } | null>(null); // gyro origin

  const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v));
  const apply = () => {
    const tx = clamp(sensor.current.x + drag.current.x, maxX);
    const ty = clamp(sensor.current.y + drag.current.y, maxY);
    smooth.current.x += (tx - smooth.current.x) * SMOOTH;
    smooth.current.y += (ty - smooth.current.y) * SMOOTH;
    pos.setValue({ x: smooth.current.x, y: smooth.current.y });
  };

  // Gyroscope look.
  useEffect(() => {
    let sub: { remove: () => void } | null = null;
    let alive = true;
    DeviceMotion?.isAvailableAsync?.().then((ok: boolean) => {
      if (!alive || !ok) return;
      setHasSensor(true);
      DeviceMotion.setUpdateInterval(SENSOR_MS);
      sub = DeviceMotion.addListener((data: any) => {
        const r = data?.rotation;
        if (!r) return;
        if (!base.current) base.current = { a: r.alpha, b: r.beta };
        let dA = r.alpha - base.current.a;
        // Unwrap so crossing ±π doesn't snap the view around.
        dA = Math.atan2(Math.sin(dA), Math.cos(dA));
        const dB = r.beta - base.current.b;
        sensor.current.x = SIGN_X * dA * K_X;
        sensor.current.y = SIGN_Y * dB * K_Y;
        apply();
      });
    }).catch(() => {});
    return () => {
      alive = false;
      sub?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [K_X, K_Y]);

  // Finger-drag fallback (and fine adjustment on top of the gyro).
  const panStart = useRef({ x: 0, y: 0 });
  const panMoved = useRef(false);
  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 3 || Math.abs(g.dy) > 3,
      onPanResponderGrant: () => {
        panStart.current = { ...drag.current };
        panMoved.current = false;
      },
      onPanResponderMove: (_, g) => {
        if (Math.abs(g.dx) > 4 || Math.abs(g.dy) > 4) panMoved.current = true;
        drag.current.x = panStart.current.x + g.dx * DRAG_GAIN;
        drag.current.y = panStart.current.y + g.dy * DRAG_GAIN;
        apply();
      },
    })
  ).current;

  const recenter = () => {
    base.current = null;
    drag.current = { x: 0, y: 0 };
    sensor.current = { x: 0, y: 0 };
    Animated.spring(pos, { toValue: { x: 0, y: 0 }, useNativeDriver: true, speed: 12, bounciness: 4 }).start();
    smooth.current = { x: 0, y: 0 };
  };

  const openPiece = (id: string) => {
    if (panMoved.current) return; // ignore taps that were really drags
    router.push({ pathname: '/viewer', params: { id } });
  };

  if (pieces.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: skin.wall }]}>
        <StatusBar hidden />
        <View style={styles.empty}>
          <Text style={[styles.emptyText, { color: skin.text }]}>{t(locale, 'vr.empty')}</Text>
          <Pressable style={[styles.closeBtn, { top: insets.top + 10 }]} onPress={() => router.back()}>
            <X size={22} color="#F5F3EE" weight="bold" />
          </Pressable>
        </View>
      </View>
    );
  }

  // Painting geometry (fixed viewpoint). Height is uniform; width follows each
  // work's real aspect (from DIMENSIONS) so proportions stay honest.
  const wallY = worldH * 0.46;
  const gapStart = worldW * 0.12;
  const gapEnd = worldW * 0.88;
  const span = gapEnd - gapStart;
  const n = pieces.length;

  return (
    <View style={[styles.container, { backgroundColor: skin.wall }]} {...pan.panHandlers}>
      <StatusBar hidden />

      <Animated.View
        style={{
          position: 'absolute',
          left: -maxX,
          top: -maxY,
          width: worldW,
          height: worldH,
          transform: [{ translateX: pos.x }, { translateY: pos.y }],
        }}
      >
        {/* The room walls: the skin image stretched across the whole panorama. */}
        {skin.bg ? (
          <ExpoImage source={skin.bg} style={StyleSheet.absoluteFill} contentFit="cover" />
        ) : (
          <View style={[StyleSheet.absoluteFill, { backgroundColor: skin.wall }]} />
        )}

        {pieces.map((p, i) => {
          const f = frameFor(p.id);
          const d = DIMENSIONS[p.id];
          const aspect = d ? d[1] / d[0] : 0.8; // width / height
          const main = p.id === roomHero;
          let ph = H * (main ? 0.4 : 0.34);
          let pw = ph * aspect;
          const maxPw = W * 0.7;
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
          const b9 = frameArt ? Math.max(10, Math.round(Math.min(pw, ph) * (f.ratio ?? 0.14))) : 0;
          const fb = bare || frameArt ? 0 : Math.max(f.borderWidth, 4);
          const oW = pw + fb * 2 + b9 * 2;
          const oH = ph + fb * 2 + b9 * 2;
          const cx = n === 1 ? worldW / 2 : gapStart + (span * i) / (n - 1);

          return (
            <Pressable
              key={p.id}
              onPress={() => openPiece(p.id)}
              style={{ position: 'absolute', left: cx - oW / 2, top: wallY - oH / 2, width: oW, height: oH }}
            >
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
                    <ArtImage artwork={p} radius={2} showQrMark={false} instant width={Math.round(pw)} />
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
                    <View style={{ flex: 1, borderRadius: 1, overflow: 'hidden', borderWidth: !bare && f.liner ? 1.5 : 0, borderColor: f.liner ?? 'transparent' }}>
                      <ArtImage artwork={p} radius={1} showQrMark={false} instant width={Math.round(pw)} />
                    </View>
                  </View>
                )}
              </View>
              {main && (
                <Text numberOfLines={1} style={[styles.label, { width: oW }]}>
                  {titleFor(p.id, locale, p.title)}
                </Text>
              )}
            </Pressable>
          );
        })}
      </Animated.View>

      {/* Chrome */}
      <Pressable style={[styles.closeBtn, { top: insets.top + 10 }]} onPress={() => router.back()}>
        <X size={22} color="#F5F3EE" weight="bold" />
      </Pressable>
      <Pressable style={[styles.recenterBtn, { top: insets.top + 10 }]} onPress={recenter}>
        <ArrowsClockwise size={18} color="#F5F3EE" weight="bold" />
        <Text style={styles.recenterText}>{t(locale, 'vr.recenter')}</Text>
      </Pressable>
      <View style={[styles.hintWrap, { bottom: insets.bottom + 24 }]} pointerEvents="none">
        <Text style={styles.hint}>{t(locale, hasSensor ? 'vr.hint' : 'vr.hintDrag')}</Text>
        <Text style={styles.hintSub}>{t(locale, 'vr.tapToInspect')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, overflow: 'hidden' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  emptyText: { fontSize: 16, textAlign: 'center', fontFamily: FONT.serif, lineHeight: 24 },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
  label: {
    marginTop: 8,
    textAlign: 'center',
    color: '#F5F3EE',
    fontFamily: FONT.serif,
    fontSize: 13,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowRadius: 6,
  },
  closeBtn: {
    position: 'absolute',
    left: 16,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recenterBtn: {
    position: 'absolute',
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  recenterText: { color: '#F5F3EE', fontWeight: '700', fontSize: 13 },
  hintWrap: { position: 'absolute', left: 0, right: 0, alignItems: 'center', gap: 3 },
  hint: {
    color: '#F5F3EE',
    fontSize: 14,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowRadius: 8,
  },
  hintSub: {
    color: 'rgba(245,243,238,0.85)',
    fontSize: 12,
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowRadius: 8,
  },
});
