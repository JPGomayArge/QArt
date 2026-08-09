// Real-size AR — project a hung piece onto a real wall with ARKit (via
// ViroReact). Move your phone to detect a wall, tap to place the painting at its
// true physical size (from DIMENSIONS, cm→m), then drag to reposition. If the
// piece is bigger than the detected surface, it tells you to find more space.
//
// ViroReact is a NATIVE module and does NOT run in Expo Go. It requires:
//   npm install            (picks up @reactvision/react-viro from package.json)
//   npx expo prebuild --clean
//   npx expo run:ios -d "<your iPhone>"
// Until then this screen shows a "native build needed" message; the rest of the
// app keeps working because Viro is loaded defensively.

import { useRouter } from 'expo-router';
import { ArrowsClockwise, Cube, X } from 'phosphor-react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArtImage } from '@/components/ArtImage';
import { ARTWORK_BY_ID, type Artwork } from '@/data/artworks';
import { DIMENSIONS } from '@/data/dimensions';
import { resolveArtworkImage, sizedUrl, IMG_FULL } from '@/game/images';
import { titleFor } from '@/data/titles';
import { useLocale } from '@/i18n';
import { t } from '@/data/ui';
import { FRAME_BY_ID, DEFAULT_FRAME } from '@/game/shop';
import { useGame } from '@/store/GameStore';
import { COLORS, FONT } from '@/theme/theme';

// Load ViroReact defensively so a missing/native-less build doesn't crash the
// bundle. `req` (not the typed `require`) keeps Metro/TS from hard-resolving it.
let Viro: any = null;
try {
  const req: any = require;
  Viro = req('@reactvision/react-viro');
} catch {
  Viro = null;
}

// AR scene factory — only built when Viro is available.
function makeArScene() {
  const { ViroARScene, ViroARPlaneSelector, ViroAmbientLight, ViroNode, ViroQuad, ViroImage } = Viro;
  return function ArScene(props: any) {
    const selectorRef = useRef<any>(null);
    const p = props.sceneNavigator.viroAppProps ?? {};
    return (
      <ViroARScene
        anchorDetectionTypes={['PlanesVertical', 'PlanesHorizontal']}
        onAnchorFound={(a: any) => selectorRef.current?.handleAnchorFound(a)}
        onAnchorUpdated={(a: any) => selectorRef.current?.handleAnchorUpdated(a)}
        onAnchorRemoved={(a: any) => a && selectorRef.current?.handleAnchorRemoved(a)}
      >
        <ViroAmbientLight color="#ffffff" intensity={300} />
        <ViroARPlaneSelector
          ref={selectorRef}
          alignment="Both"
          hideOverlayOnSelection
          onPlaneSelected={(anchor: any) => p.onPlaced?.(anchor)}
        >
          <ViroNode dragType="FixedToWorld" onDrag={() => {}}>
            {p.borderM > 0 && (
              <ViroQuad
                width={p.wM + 2 * p.borderM}
                height={p.hM + 2 * p.borderM}
                position={[0, 0, -0.004]}
                materials={['artFrameMat']}
              />
            )}
            {!!p.uri && <ViroImage source={{ uri: p.uri }} width={p.wM} height={p.hM} position={[0, 0, 0]} />}
          </ViroNode>
        </ViroARPlaneSelector>
      </ViroARScene>
    );
  };
}

export default function ArRoomScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { room, roomFrames, roomHero, activeFrame } = useGame();
  const { locale } = useLocale();

  const [sel, setSel] = useState(0);
  const [inited, setInited] = useState(false);
  const [uri, setUri] = useState<string | null>(null);
  const [tooBig, setTooBig] = useState<{ w: number; h: number } | null>(null);
  const [navKey, setNavKey] = useState(0);

  const pieces = useMemo(() => room.map((id) => ARTWORK_BY_ID[id]).filter(Boolean) as Artwork[], [room]);
  if (!inited && pieces.length) {
    const i = roomHero ? pieces.findIndex((p) => p.id === roomHero) : 0;
    setSel(i >= 0 ? i : 0);
    setInited(true);
  }

  const piece = pieces.length ? pieces[Math.min(sel, pieces.length - 1)] : undefined;
  const f = piece
    ? FRAME_BY_ID[roomFrames[piece.id]] ?? FRAME_BY_ID[activeFrame] ?? FRAME_BY_ID[DEFAULT_FRAME]
    : FRAME_BY_ID[DEFAULT_FRAME];

  // Real physical size in metres (DIMENSIONS is [h, w] in cm).
  const d = piece ? DIMENSIONS[piece.id] : undefined;
  const hCm = d ? d[0] : 60;
  const wCm = d ? d[1] : 80;
  const wM = wCm / 100;
  const hM = hCm / 100;
  const bare = f.id === 'none';
  const frameColor = f.color ?? '#3A342A';
  const borderM = bare ? 0 : Math.max(0.02, Math.min(wM, hM) * 0.08);

  // Resolve the piece's image URL for the AR texture.
  useEffect(() => {
    let ok = true;
    setUri(null);
    setTooBig(null);
    if (piece) {
      resolveArtworkImage(piece).then((u) => {
        if (ok) setUri(u ? sizedUrl(u, IMG_FULL) : null);
      });
    }
    return () => {
      ok = false;
    };
  }, [piece?.id]);

  // Frame material follows the active frame's colour.
  useEffect(() => {
    if (Viro?.ViroMaterials) {
      Viro.ViroMaterials.createMaterials({ artFrameMat: { diffuseColor: frameColor } });
    }
  }, [frameColor]);

  const ArScene = useMemo(() => (Viro ? makeArScene() : null), []);

  const onPlaced = (anchor: any) => {
    const pw = anchor?.width ?? 0;
    const ph = anchor?.height ?? 0;
    if (pw && ph && (wM > pw || hM > ph)) setTooBig({ w: wCm, h: hCm });
    else setTooBig(null);
  };

  // --- Native build missing (or Expo Go) ---
  if (!Viro || !ArScene) {
    return (
      <View style={[styles.container, styles.center]}>
        <StatusBar hidden />
        <Cube size={44} color={COLORS.gold} weight="light" />
        <Text style={styles.buildTitle}>{t(locale, 'ar.buildTitle')}</Text>
        <Text style={styles.buildBody}>{t(locale, 'ar.buildBody')}</Text>
        <Pressable style={[styles.closeBtn, { top: insets.top + 10 }]} onPress={() => router.back()}>
          <X size={22} color="#F5F3EE" weight="bold" />
        </Pressable>
      </View>
    );
  }

  if (pieces.length === 0) {
    return (
      <View style={[styles.container, styles.center]}>
        <StatusBar hidden />
        <Text style={styles.buildBody}>{t(locale, 'ar.empty')}</Text>
        <Pressable style={[styles.closeBtn, { top: insets.top + 10 }]} onPress={() => router.back()}>
          <X size={22} color="#F5F3EE" weight="bold" />
        </Pressable>
      </View>
    );
  }

  const ViroARSceneNavigator = Viro.ViroARSceneNavigator;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ViroARSceneNavigator
        key={navKey}
        autofocus
        initialScene={{ scene: ArScene }}
        viroAppProps={{ uri, wM, hM, borderM, onPlaced }}
        style={StyleSheet.absoluteFill}
      />

      {/* Chrome */}
      <Pressable style={[styles.closeBtn, { top: insets.top + 10 }]} onPress={() => router.back()}>
        <X size={22} color="#F5F3EE" weight="bold" />
      </Pressable>
      <Pressable
        style={[styles.recenterBtn, { top: insets.top + 10 }]}
        onPress={() => {
          setTooBig(null);
          setNavKey((k) => k + 1);
        }}
      >
        <ArrowsClockwise size={16} color="#F5F3EE" weight="bold" />
        <Text style={styles.recenterText}>{t(locale, 'ar.reset')}</Text>
      </Pressable>

      {tooBig && (
        <View style={[styles.banner, { top: insets.top + 62 }]} pointerEvents="none">
          <Text style={styles.bannerText}>{t(locale, 'ar.tooBig', { w: tooBig.w, h: tooBig.h })}</Text>
        </View>
      )}

      <View style={[styles.bottom, { paddingBottom: insets.bottom + 10 }]} pointerEvents="box-none">
        <Text style={styles.hint}>{t(locale, 'ar.scan')}</Text>
        {piece && <Text style={styles.sub}>{titleFor(piece.id, locale, piece.title)} · {wCm}×{hCm} cm</Text>}
        {pieces.length > 1 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.strip}>
            {pieces.map((pc, i) => (
              <Pressable
                key={pc.id}
                onPress={() => {
                  setSel(i);
                  setTooBig(null);
                  setNavKey((k) => k + 1);
                }}
                style={[styles.thumb, i === sel && styles.thumbActive]}
              >
                <ArtImage artwork={pc} radius={4} showQrMark={false} instant />
              </Pressable>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', overflow: 'hidden' },
  center: { alignItems: 'center', justifyContent: 'center', padding: 32, gap: 12 },
  buildTitle: { color: '#F5F3EE', fontSize: 18, fontWeight: '800', fontFamily: FONT.serif, textAlign: 'center' },
  buildBody: { color: 'rgba(245,243,238,0.8)', fontSize: 14, textAlign: 'center', lineHeight: 21 },
  closeBtn: {
    position: 'absolute', left: 16, width: 42, height: 42, borderRadius: 21,
    backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center',
  },
  recenterBtn: {
    position: 'absolute', right: 16, flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, height: 42, borderRadius: 21, backgroundColor: 'rgba(0,0,0,0.45)',
  },
  recenterText: { color: '#F5F3EE', fontWeight: '700', fontSize: 13 },
  banner: {
    position: 'absolute', left: 20, right: 20, padding: 12, borderRadius: 12,
    backgroundColor: 'rgba(120,30,30,0.82)',
  },
  bannerText: { color: '#FCECEC', fontSize: 13, fontWeight: '600', textAlign: 'center', lineHeight: 18 },
  bottom: { position: 'absolute', left: 0, right: 0, bottom: 0, gap: 8 },
  hint: {
    color: '#F5F3EE', fontSize: 13, fontWeight: '700', textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.9)', textShadowRadius: 8,
  },
  sub: {
    color: 'rgba(245,243,238,0.85)', fontSize: 12, textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.9)', textShadowRadius: 8,
  },
  strip: { paddingHorizontal: 14, gap: 8, alignItems: 'center' },
  thumb: {
    width: 52, height: 64, borderRadius: 6, overflow: 'hidden',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.25)',
  },
  thumbActive: { borderColor: COLORS.gold },
});
