// Real-size AR with a center reticle (ARKit via ViroReact).
//
// Flow:
//   1. Camera live. A frame-shaped reticle sits in the screen centre, matching
//      the SELECTED piece's aspect ratio.
//   2. Pick a piece from the carousel — the reticle changes shape to match.
//   3. The reticle turns GREEN when the centre ray hits a wall big enough for the
//      piece at real size; grey when there isn't room. Tap "Hang here" to place
//      it, at true physical size, anchored where you aimed.
//   4. Placed pieces keep their world position — they stay put as you move.
//
// ViroReact is a NATIVE module (no Expo Go). Requires: npm install →
// npx expo prebuild --clean → npx expo run:ios. Until then this screen shows a
// "native build needed" message (Viro is loaded defensively).

import { useRouter } from 'expo-router';
import { Cube, Trash, X } from 'phosphor-react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArtImage } from '@/components/ArtImage';
import { ARTWORK_BY_ID, type Artwork } from '@/data/artworks';
import * as FileSystem from 'expo-file-system/legacy';
import { DIMENSIONS } from '@/data/dimensions';
import { FRAME_ASSETS } from '@/data/frameAssets';
import { IMAGE_OVERRIDES } from '@/data/imageOverrides';
import { resolveArtworkImage, sizedUrl } from '@/game/images';
import { titleFor } from '@/data/titles';
import { useLocale } from '@/i18n';
import { t } from '@/data/ui';
import { FRAME_BY_ID, DEFAULT_FRAME } from '@/game/shop';
import { useGame } from '@/store/GameStore';
import { COLORS, FONT } from '@/theme/theme';

// Direct require (literal) so Metro bundles it; try/catch guards a build without
// the native module linked in.
let Viro: any = null;
try {
  Viro = require('@reactvision/react-viro');
} catch {
  Viro = null;
}

type Placed = {
  key: string;
  pieceId: string; // painting looked up live from the uris map (fills in when ready)
  position: number[];
  rotation: number[];
  wM: number;
  hM: number;
  borderM: number;
  frameId: string;
};

// AR scene factory — only built when Viro is available.
function makeArScene() {
  const { ViroARScene, ViroAmbientLight, ViroNode, ViroQuad, ViroImage } = Viro;
  const insetOf = (id: string): [number, number] => {
    const fd = FRAME_BY_ID[id];
    return [fd?.insetX ?? 0.12, fd?.insetY ?? 0.15];
  };
  const shiftOf = (id: string) => FRAME_BY_ID[id]?.shiftY ?? 0.012;
  return function ArScene(props: any) {
    const p = props.sceneNavigator.viroAppProps ?? {};
    const last = useRef({ key: '' });

    const onHitTest = (evt: any) => {
      const src = evt?.hitTestResults ? evt : evt?.nativeEvent ?? evt;
      const results: any[] = src?.hitTestResults ?? [];
      const cam = src?.cameraOrientation?.position as number[] | undefined;
      const camRot = src?.cameraOrientation?.rotation as number[] | undefined;
      const hit =
        results.find((r) => r.type === 'ExistingPlaneUsingExtent') ||
        results.find((r) => r.type === 'ExistingPlane');
      let status: 'aim' | 'ok' = 'aim';
      let target: any = null;
      let dist = 0;
      if (hit) {
        status = 'ok';
        // Freeze the piece facing the way you're looking right now: yaw only, so
        // it hangs upright and STAYS put (no billboard spinning as you walk up).
        const yaw = camRot ? camRot[1] : 0;
        target = { position: hit.transform.position, rotation: [0, yaw, 0] };
        const hp = hit.transform.position as number[];
        if (cam) dist = Math.hypot(hp[0] - cam[0], hp[1] - cam[1], hp[2] - cam[2]);
      }
      const key = `${status}|${Math.round(dist * 20)}`;
      if (key !== last.current.key) {
        last.current = { key };
        p.onHit?.({ status, target, dist });
      }
    };

    return (
      <ViroARScene
        anchorDetectionTypes={['PlanesVertical', 'PlanesHorizontal']}
        onCameraARHitTest={onHitTest}
      >
        <ViroAmbientLight color="#ffffff" intensity={320} />
        {((p.placed as Placed[]) ?? []).map((it) => {
          const frameSrc = it.frameId !== 'none' ? FRAME_ASSETS[it.frameId] : null;
          const [ix, iy] = insetOf(it.frameId);
          const fw = it.wM / (1 - 2 * ix); // frame art extends beyond the opening
          const fh = it.hM / (1 - 2 * iy);
          // A hand-cropped local override (frameless cactus, Manuelita…) wins over
          // the downloaded Wikimedia scan, which still has its gilt frame.
          const local = IMAGE_OVERRIDES[it.pieceId];
          const uri = (p.uris ?? {})[it.pieceId] as string | undefined; // fills in when downloaded
          return (
            // Fixed rotation (captured when hung) — the piece stays anchored so
            // you can walk up and inspect it instead of it turning to follow you.
            <ViroNode key={it.key} position={it.position} rotation={it.rotation}>
              {/* canvas fallback (shows even if the photo is slow) */}
              <ViroQuad width={it.wM} height={it.hM} position={[0, 0, 0.002]} materials={['arBase']} />
              {/* frame art BEHIND — its opaque border shows around the painting; its
                  transparent centre is hidden behind the opaque painting (so it
                  can't depth-occlude it). */}
              {frameSrc && <ViroImage source={frameSrc} width={fw} height={fh} position={[0, 0, 0.004]} />}
              {/* The painting IN FRONT, filling the frame opening. The opening sits
                  slightly above centre (bottom border is thicker), so lift the
                  canvas by the frame's shiftY and overscan a hair to seal the edge. */}
              {(local || uri) && (
                <ViroImage
                  source={local ?? { uri: uri! }}
                  width={it.wM * 1.02}
                  height={it.hM * 1.02}
                  position={[0, shiftOf(it.frameId) * fh, 0.006]}
                />
              )}
            </ViroNode>
          );
        })}
      </ViroARScene>
    );
  };
}

export default function ArRoomScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width: W, height: H } = useWindowDimensions();
  const { room, roomFrames, roomHero, activeFrame } = useGame();
  const { locale } = useLocale();

  const [sel, setSel] = useState(0);
  const [inited, setInited] = useState(false);
  const [uris, setUris] = useState<Record<string, string>>({}); // pieceId -> local file uri
  const [hit, setHit] = useState<{ status: 'aim' | 'ok'; target: { position: number[]; rotation: number[] } | null; dist: number }>({ status: 'aim', target: null, dist: 0 });
  const [placed, setPlaced] = useState<Placed[]>([]);

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

  const d = piece ? DIMENSIONS[piece.id] : undefined;
  const hCm = d ? d[0] : 60;
  const wCm = d ? d[1] : 80;
  const wM = wCm / 100;
  const hM = hCm / 100;
  const bare = f.id === 'none';
  const frameColor = f.color ?? '#3A342A';
  const borderM = bare ? 0 : Math.max(0.02, Math.min(wM, hM) * 0.08);

  // Viro's native loader needs a LOCAL file. Download via Special:FilePath
  // (sizedUrl) — the same endpoint the rest of the app uses; it serves a scaled
  // image and never 400s (caps at the original size). Results land in `uris`,
  // so even already-hung frames fill in the moment their painting arrives.
  const pieceId = piece?.id;
  const alive = useRef(true);
  const inFlight = useRef<Set<string>>(new Set());
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  // One downloader, tied to the SCREEN rather than to the current selection —
  // switching pieces in the carousel must never cancel a download in progress
  // (that was the "hung it and it stayed blank" bug).
  const fetchOne = useCallback(async (id: string) => {
    const dir = FileSystem.cacheDirectory;
    if (!dir || inFlight.current.has(id)) return;
    inFlight.current.add(id);
    try {
      const art = ARTWORK_BY_ID[id];
      const u = art ? await resolveArtworkImage(art) : null;
      if (!u) return;
      const dest = dir + 'ar_' + id.replace(/[^a-z0-9]/gi, '_') + '.jpg';
      const res = await FileSystem.downloadAsync(sizedUrl(u, 1200), dest);
      if (alive.current && res.status === 200) {
        setUris((prev) => (prev[id] ? prev : { ...prev, [id]: res.uri }));
      }
    } catch {
      // offline or a bad URL — we simply retry the next time it's selected
    } finally {
      inFlight.current.delete(id);
    }
  }, []);

  // Always prioritise the selected piece, then warm the rest in the background.
  useEffect(() => {
    if (pieceId && !uris[pieceId]) fetchOne(pieceId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pieceId, uris[pieceId ?? '']]);

  useEffect(() => {
    (async () => {
      for (const p of pieces) {
        if (!alive.current) return;
        if (!uris[p.id]) await fetchOne(p.id);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pieces]);

  // Ensure the base + this frame's material exist (idempotent).
  useEffect(() => {
    if (Viro?.ViroMaterials) {
      Viro.ViroMaterials.createMaterials({ arBase: { diffuseColor: '#E8E1D2', cullMode: 'None' } });
    }
  }, []);

  const ArScene = useMemo(() => (Viro ? makeArScene() : null), []);
  const onHit = useCallback((h: any) => setHit(h ?? { status: 'aim', target: null, dist: 0 }), []);
  // Freeze the props handed to the AR scene so it only updates when the piece or
  // the placed set changes — NOT on every distance tick. Constant re-renders were
  // restarting the painting's image load, so it never finished.
  const viroProps = useMemo(() => ({ wM, hM, placed, uris, onHit }), [wM, hM, placed, uris, onHit]);

  // Real-scale reticle: project the piece's true size (metres) to screen pixels
  // at the current aim distance, like a tape-measure. AR_VFOV is the camera's
  // vertical field of view (approx; tune if the projected size feels off).
  // iPhone rear camera in portrait: the LONG (vertical) axis spans roughly 63°.
  // A too-small value here inflates the reticle and makes pieces look oversized.
  const AR_VFOV = (63 * Math.PI) / 180;
  const halfTan = Math.tan(AR_VFOV / 2);
  let retW: number;
  let retH: number;
  let tooClose = false;
  if (hit.dist > 0.05) {
    const pxPerM = H / (2 * hit.dist * halfTan);
    retW = wM * pxPerM;
    retH = hM * pxPerM;
    if (retH > H * 0.92 || retW > W * 0.96) tooClose = true;
  } else {
    // No distance yet — fall back to an aspect-only indicator.
    const longCm = Math.max(wCm, hCm);
    const k = Math.max(0.6, Math.min(1.5, longCm / 110));
    if (wCm >= hCm) {
      retW = 200 * k;
      retH = retW * (hCm / wCm);
    } else {
      retH = 200 * k;
      retW = retH * (wCm / hCm);
    }
  }
  // Cap what we draw so it doesn't run wildly off-screen (still signals "big").
  const drawW = Math.min(retW, W * 1.1);
  const drawH = Math.min(retH, H * 1.05);

  // "tooClose" is only a hint that the piece won't fit ON SCREEN from here — it
  // must NOT block hanging: in a real room you often can't step back far enough
  // to frame a large canvas, yet it fits the wall just fine.
  const effStatus: 'aim' | 'tooclose' | 'ok' =
    hit.status === 'ok' ? (tooClose ? 'tooclose' : 'ok') : 'aim';
  // Don't let anyone hang a piece whose picture hasn't downloaded yet: that's
  // what produced a blank white canvas on the wall.
  const imageReady = !!pieceId && (!!IMAGE_OVERRIDES[pieceId] || !!uris[pieceId]);
  const canPlace = hit.status === 'ok' && !!hit.target && imageReady;

  const place = () => {
    if (!canPlace || !piece || !hit.target) return;
    setPlaced((prev) => [
      ...prev,
      { key: `${piece.id}:${Date.now()}`, pieceId: piece.id, position: hit.target!.position, rotation: hit.target!.rotation, wM, hM, borderM, frameId: f.id },
    ]);
  };

  // --- Native build missing ---
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

  const retColor = effStatus === 'ok' ? '#54C98A' : effStatus === 'tooclose' ? '#E7B15A' : 'rgba(255,255,255,0.75)';

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ViroARSceneNavigator
        autofocus
        // No occlusionMode on purpose: LiDAR depth occlusion works, but its
        // ~256x192 depth map leaves a blocky, laggy edge around your hand that
        // hurts the illusion more than the effect helps.
        initialScene={{ scene: ArScene }}
        viroAppProps={viroProps}
        style={StyleSheet.absoluteFill}
      />

      {/* Center reticle — marks the screen-centre hang point. Absolutely centred
          via transform (transparent inside, only the perimeter shows). */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: drawW,
          height: drawH,
          transform: [{ translateX: -drawW / 2 }, { translateY: -drawH / 2 }],
          borderWidth: 3,
          borderColor: retColor,
          borderRadius: 4,
          backgroundColor: 'transparent',
        }}
      />
      <View
        pointerEvents="none"
        style={{ position: 'absolute', top: '50%', left: '50%', width: 6, height: 6, borderRadius: 3, transform: [{ translateX: -3 }, { translateY: -3 }], backgroundColor: retColor }}
      />

      {/* Chrome */}
      <Pressable style={[styles.closeBtn, { top: insets.top + 10 }]} onPress={() => router.back()}>
        <X size={22} color="#F5F3EE" weight="bold" />
      </Pressable>
      {placed.length > 0 && (
        <Pressable style={[styles.clearBtn, { top: insets.top + 10 }]} onPress={() => setPlaced([])}>
          <Trash size={16} color="#F5F3EE" weight="bold" />
          <Text style={styles.clearText}>{t(locale, 'ar.clear')}</Text>
        </Pressable>
      )}

      <View style={[styles.bottom, { paddingBottom: insets.bottom + 12 }]} pointerEvents="box-none">
        <Text style={styles.hint}>
          {!imageReady
            ? t(locale, 'ar.loading')
            : effStatus === 'ok'
            ? t(locale, 'ar.aim')
            : effStatus === 'tooclose'
            ? t(locale, 'ar.stepBack')
            : t(locale, 'ar.findWall')}
        </Text>
        {piece && <Text style={styles.sub}>{titleFor(piece.id, locale, piece.title)} · {wCm}×{hCm} cm</Text>}

        <Pressable
          disabled={!canPlace}
          onPress={place}
          style={[styles.placeBtn, !canPlace && styles.placeBtnOff]}
        >
          <Text style={[styles.placeText, !canPlace && { color: 'rgba(11,11,15,0.4)' }]}>{t(locale, 'ar.place')}</Text>
        </Pressable>

        {pieces.length > 1 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.strip}>
            {pieces.map((pc, i) => (
              <Pressable key={pc.id} onPress={() => setSel(i)} style={[styles.thumb, i === sel && styles.thumbActive]}>
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
  reticleWrap: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  dot: { position: 'absolute', width: 6, height: 6, borderRadius: 3 },
  closeBtn: {
    position: 'absolute', left: 16, width: 42, height: 42, borderRadius: 21,
    backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center',
  },
  clearBtn: {
    position: 'absolute', right: 16, flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, height: 42, borderRadius: 21, backgroundColor: 'rgba(0,0,0,0.45)',
  },
  clearText: { color: '#F5F3EE', fontWeight: '700', fontSize: 13 },
  bottom: { position: 'absolute', left: 0, right: 0, bottom: 0, gap: 10, alignItems: 'center' },
  hint: {
    color: '#F5F3EE', fontSize: 14, fontWeight: '700', textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.9)', textShadowRadius: 8,
  },
  sub: {
    color: 'rgba(245,243,238,0.85)', fontSize: 12, textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.9)', textShadowRadius: 8,
  },
  placeBtn: {
    backgroundColor: COLORS.gold, borderRadius: 26, paddingHorizontal: 34, paddingVertical: 13,
  },
  placeBtnOff: { backgroundColor: 'rgba(255,255,255,0.25)' },
  placeText: { color: '#0B0B0F', fontWeight: '800', fontSize: 16 },
  strip: { paddingHorizontal: 14, gap: 8, alignItems: 'center' },
  thumb: {
    width: 50, height: 62, borderRadius: 6, overflow: 'hidden',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.25)',
  },
  thumbActive: { borderColor: COLORS.gold },
});
