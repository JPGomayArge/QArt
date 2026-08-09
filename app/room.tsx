import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  CaretLeft,
  CaretRight,
  Check,
  Crown,
  Heart,
  Info,
  LockSimple,
  Camera,
  MagnifyingGlassPlus,
  PaintRoller,
  PencilSimple,
  Storefront,
  X,
} from 'phosphor-react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  FlatList,
  Image as RNImage,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArtImage } from '@/components/ArtImage';
import { NineSliceFrame } from '@/components/NineSliceFrame';
import { DIMENSIONS } from '@/data/dimensions';
import { FRAME_ASSETS } from '@/data/frameAssets';
import { ARTWORK_BY_ID, type Artwork } from '@/data/artworks';
import { titleFor } from '@/data/titles';
import { useLocale } from '@/i18n';
import { t } from '@/data/ui';
import { ARTWORK_DETAILS } from '@/data/details';
import { DETAIL_INFO } from '@/data/detailInfo';
import { resolveArtworkImage, sizedUrl, IMG_DETAIL } from '@/game/images';
import { Haptics, hImpact, hNotify } from '@/game/prefs';
import { SKIN_BY_ID, DEFAULT_SKIN, FRAME_BY_ID, DEFAULT_FRAME, FRAMES, SKINS } from '@/game/shop';
import { ROOM_MAX, useGame } from '@/store/GameStore';
import { COLORS, FONT, RADIUS, SPACING } from '@/theme/theme';

const ASPECTS: Record<string, number> = {};
const LIGHT = '#F5F3EE';
const STRIP_THUMB_W = 60;
const STRIP_STEP = STRIP_THUMB_W + 8; // thumb + gap (SPACING.sm)
const BAR_COLLAPSE_H = 138; // height of the collapsible strip area
// Real-scale tuning. The reference is the largest of the (up to 10) pieces you
// actually have on exhibition, so a modest wall already scales gently. GAMMA = 1
// is faithful linear cm scaling; lower softens it. SCALE_MIN is a floor so that
// IF you hang a true giant (a mural/fresco), the small works still stay visible.
const SCALE_GAMMA = 1;
const SCALE_MIN = 0.25;

export default function RoomScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width: W, height: Hs } = useWindowDimensions();
  const {
    favorites,
    room,
    roomFrames,
    roomHero,
    activeSkin,
    activeFrame,
    ownedSkins,
    toggleRoom,
    isInRoom,
    setPieceFrame,
    setRoomHero,
    setActiveSkin,
    ownedFrames,
    scaleReal,
    setScaleReal,
  } = useGame();
  const { locale } = useLocale();
  const [editing, setEditing] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [sel, setSel] = useState(0);
  const [, bump] = useState(0);
  const listRef = useRef<FlatList<Artwork>>(null);
  const stripRef = useRef<ScrollView>(null);
  // Single tap on a hung piece opens the zoom viewer; a double tap (within the
  // window) enters Inspect mode — the framed piece up close over the wall.
  const lastTap = useRef(0);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onArtTap = (artId: string) => {
    const now = Date.now();
    if (now - lastTap.current < 280) {
      if (tapTimer.current) {
        clearTimeout(tapTimer.current);
        tapTimer.current = null;
      }
      lastTap.current = 0;
      router.push({ pathname: '/inspect', params: { id: artId } });
    } else {
      lastTap.current = now;
      if (tapTimer.current) clearTimeout(tapTimer.current);
      tapTimer.current = setTimeout(() => {
        tapTimer.current = null;
        router.push({ pathname: '/viewer', params: { id: artId } });
      }, 280);
    }
  };

  // Bottom-bar collapse: an Animated value (1 = open, 0 = hidden) that follows the
  // finger during the drag and settles on release, so the swipe feels fluid.
  const collapse = useRef(new Animated.Value(1)).current;
  const collapsedRef = useRef(false);
  // A slow, continuous shimmer for the main exhibit's aura.
  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1700, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1700, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);
  const settle = (toOpen: boolean) => {
    collapsedRef.current = !toOpen;
    Animated.timing(collapse, {
      toValue: toOpen ? 1 : 0,
      duration: 180,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };
  const barPan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 6 && Math.abs(g.dy) > Math.abs(g.dx),
      onPanResponderMove: (_, g) => {
        const base = collapsedRef.current ? 0 : 1;
        collapse.setValue(Math.max(0, Math.min(1, base - g.dy / BAR_COLLAPSE_H)));
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > 40) settle(false);
        else if (g.dy < -40) settle(true);
        else settle(!collapsedRef.current);
      },
    })
  ).current;

  const skin = SKIN_BY_ID[activeSkin] ?? SKIN_BY_ID[DEFAULT_SKIN];
  const frameFor = (id: string) => FRAME_BY_ID[roomFrames[id]] ?? FRAME_BY_ID[activeFrame] ?? FRAME_BY_ID[DEFAULT_FRAME];

  const favs = useMemo(
    () => Object.keys(favorites).map((id) => ARTWORK_BY_ID[id]).filter(Boolean) as Artwork[],
    [favorites]
  );
  const pieces = useMemo(() => room.map((id) => ARTWORK_BY_ID[id]).filter(Boolean) as Artwork[], [room]);
  // Largest real dimension (cm) among the hung pieces — the reference for
  // real-scale display. Pieces without a known size (e.g. Camera degli Sposi)
  // are treated as the largest.
  const maxDimCm = useMemo(() => {
    let m = 0;
    for (const p of pieces) {
      const d = DIMENSIONS[p.id];
      if (d) m = Math.max(m, d[0], d[1]);
    }
    return m || 100;
  }, [pieces]);
  const mySkins = useMemo(() => SKINS.filter((s) => ownedSkins[s.id]), [ownedSkins]);
  const myFrames = FRAMES; // frames are free & built in — every one is available
  const full = room.length >= ROOM_MAX;
  const idx = pieces.length ? Math.min(sel, pieces.length - 1) : 0;
  const hero = pieces[idx];
  const mainIndex = roomHero ? room.indexOf(roomHero) : -1;

  // On entry, open the room on its main exhibit (if one is set).
  const didInit = useRef(false);
  useEffect(() => {
    if (!didInit.current && pieces.length && mainIndex >= 0) {
      didInit.current = true;
      setSel(mainIndex);
    }
  }, [pieces.length, mainIndex]);

  // Infinite loop: render three copies of the wall and keep the viewer parked in
  // the middle one, jumping silently when they cross into an edge copy. So you can
  // swipe forever in either direction and it wraps seamlessly.
  const N = pieces.length;
  const loop = N > 1;
  const loopData = loop ? [...pieces, ...pieces, ...pieces] : pieces;
  const startIndex = (loop ? N : 0) + (mainIndex >= 0 ? mainIndex : 0);
  // The filmstrip only needs to loop when its thumbs overflow the screen.
  const stripLoop = loop && N * STRIP_STEP > W;
  const thumbs = stripLoop ? loopData : pieces;

  // Seamless infinite filmstrip: keep the viewer inside the middle copy, jumping a
  // whole copy back when they scroll into an edge (identical thumbs = no visible cut).
  const onStripScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!stripLoop) return;
    const x = e.nativeEvent.contentOffset.x;
    const span = N * STRIP_STEP;
    if (x < span * 0.5) stripRef.current?.scrollTo({ x: x + span, animated: false });
    else if (x > span * 2.5) stripRef.current?.scrollTo({ x: x - span, animated: false });
  };

  // Jump straight to a real piece (carousel taps).
  const go = (i: number) => {
    const t = ((i % N) + N) % N;
    listRef.current?.scrollToIndex({ index: (loop ? N : 0) + t, animated: true });
    setSel(t);
  };
  // Step one piece over (arrows) — wraps around when looping.
  const nav = (d: number) => {
    if (loop) listRef.current?.scrollToIndex({ index: N + idx + d, animated: true });
    else go(Math.max(0, Math.min(N - 1, idx + d)));
  };

  useEffect(() => {
    let alive = true;
    pieces.forEach((a) => {
      if (ASPECTS[a.id]) return;
      resolveArtworkImage(a).then((u) => {
        if (!u || !alive) return;
        RNImage.getSize(sizedUrl(u, 900), (w, h) => {
          if (alive && h > 0) {
            ASPECTS[a.id] = w / h;
            bump((x) => x + 1);
          }
        }, () => {});
      });
    });
    return () => {
      alive = false;
    };
  }, [pieces]);

  // Keep the active thumbnail centered in the filmstrip as the selection moves,
  // so you always see where you are (and the ends) instead of endless scrolling.
  useEffect(() => {
    const centerIdx = stripLoop ? N + idx : idx;
    stripRef.current?.scrollTo({ x: Math.max(0, centerIdx * STRIP_STEP - W / 2 + STRIP_STEP / 2 + 40), animated: true });
  }, [idx, W, stripLoop, N]);

  const topBar = (
    <View style={[styles.topBar, { paddingTop: insets.top + SPACING.sm }]}>
      {editing ? (
        <View style={{ width: 40, height: 40 }} />
      ) : (
        <Pressable style={[styles.iconBtn, { borderColor: skin.frame + '77' }]} onPress={() => router.back()}>
          <ArrowLeft size={22} color={skin.text} />
        </Pressable>
      )}
      <View style={styles.topRight}>
        {!editing && pieces.length > 0 && hero && (
          <Pressable
            style={[styles.iconBtn, { borderColor: skin.frame + '77' }]}
            onPress={() => router.push(`/artwork/${hero.id}`)}
          >
            <Info size={20} color={skin.frame} weight="fill" />
          </Pressable>
        )}
        {!editing && pieces.length > 0 && (
          <Pressable
            style={[styles.iconBtn, { borderColor: skin.frame + '77' }]}
            onPress={() => router.push('/ar-room')}
          >
            <Camera size={19} color={skin.frame} weight="fill" />
          </Pressable>
        )}
        {!editing && pieces.length > 0 && (
          <Pressable style={[styles.iconBtn, { borderColor: skin.frame + '77' }]} onPress={() => setCustomize(true)}>
            <PaintRoller size={19} color={skin.frame} weight="fill" />
          </Pressable>
        )}
        <Pressable
          style={[styles.iconBtn, { borderColor: skin.frame, backgroundColor: editing ? skin.frame : 'rgba(0,0,0,0.3)' }]}
          onPress={() => setEditing((v) => !v)}
        >
          {editing ? <Check size={19} color={skin.wall} weight="bold" /> : <PencilSimple size={19} color={skin.frame} weight="fill" />}
        </Pressable>
      </View>
    </View>
  );

  const customizeModal = (
    <Modal visible={customize} transparent animationType="slide" onRequestClose={() => setCustomize(false)}>
      <Pressable style={styles.sheetBackdrop} onPress={() => setCustomize(false)} />
      <View style={[styles.sheet, { paddingBottom: insets.bottom + SPACING.lg }]}>
        <View style={styles.sheetHandle} />
        <View style={styles.sheetHead}>
          <Text style={styles.sheetTitle}>{t(locale, 'room.customize')}</Text>
          <Pressable onPress={() => setCustomize(false)} hitSlop={10}>
            <X size={20} color={LIGHT} />
          </Pressable>
        </View>

        <Text style={styles.sheetLabel}>{t(locale, 'room.room')}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sheetRow}>
          {mySkins.map((s) => (
            <Pressable key={s.id} onPress={() => setActiveSkin(s.id)} style={{ alignItems: 'center', gap: 5 }}>
              <View style={[styles.roomThumb, { borderColor: activeSkin === s.id ? COLORS.gold : 'transparent' }]}>
                {s.bg ? <ExpoImage source={s.bg} style={StyleSheet.absoluteFill} contentFit="cover" /> : <View style={{ flex: 1, backgroundColor: s.wall }} />}
                {activeSkin === s.id && (
                  <View style={styles.roomCheck}>
                    <Check size={12} color="#0B0B0F" weight="bold" />
                  </View>
                )}
              </View>
              <Text style={styles.swatchName} numberOfLines={1}>{s.name}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={[styles.sheetLabel, { marginTop: SPACING.lg }]}>{t(locale, 'room.frameForPiece')}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sheetRow}>
          {myFrames.map((f) => {
            const on = hero && frameFor(hero.id).id === f.id;
            const owned = f.cost === 0 || !!ownedFrames[f.id];
            // Owned frames apply to the current piece; locked ones send you to the shop.
            const onPress = () => {
              if (!owned) {
                setCustomize(false);
                router.push('/shop');
              } else if (hero) {
                setPieceFrame(hero.id, f.id);
              }
            };
            return (
              <Pressable key={f.id} onPress={onPress} style={{ alignItems: 'center', gap: 5 }}>
                <View style={[styles.frameSwatchOuter, on && { borderColor: COLORS.gold }]}>
                  {FRAME_ASSETS[f.id] ? (
                    <ExpoImage source={FRAME_ASSETS[f.id]} style={{ width: 44, height: 44, opacity: owned ? 1 : 0.4 }} contentFit="contain" />
                  ) : (
                    <View style={{ width: 34, height: 34, borderWidth: Math.min(f.borderWidth, 7), borderRadius: f.radius, borderColor: f.color ?? COLORS.gold, backgroundColor: COLORS.mat, alignItems: 'center', justifyContent: 'center', opacity: owned ? 1 : 0.4 }}>
                      <View style={{ flex: 1, alignSelf: 'stretch', margin: 2, borderWidth: f.liner ? 1 : 0, borderColor: f.liner ?? 'transparent', backgroundColor: '#6B5B45' }} />
                    </View>
                  )}
                  {!owned && (
                    <View style={styles.frameLock}>
                      <LockSimple size={13} color="#F5F3EE" weight="fill" />
                    </View>
                  )}
                </View>
                <Text style={styles.swatchName} numberOfLines={1}>{owned ? f.name : `${f.name} · ${f.cost}`}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.scaleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sheetLabel}>{t(locale, 'room.trueScale')}</Text>
            <Text style={styles.scaleBody}>{t(locale, 'room.trueScaleBody')}</Text>
          </View>
          <Switch
            value={scaleReal}
            onValueChange={setScaleReal}
            trackColor={{ false: 'rgba(255,255,255,0.2)', true: COLORS.gold }}
            thumbColor="#F5F3EE"
            ios_backgroundColor="rgba(255,255,255,0.2)"
          />
        </View>

        <Pressable
          style={styles.shopLink}
          onPress={() => {
            setCustomize(false);
            router.push('/shop');
          }}
        >
          <Storefront size={17} color={COLORS.gold} weight="fill" />
          <Text style={styles.shopLinkText}>{t(locale, 'room.getMoreRooms')}</Text>
        </Pressable>
      </View>
    </Modal>
  );

  // ---- Empty states -------------------------------------------------------
  if (favs.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: skin.wall }]}>
        {topBar}
        <View style={styles.empty}>
          <Heart size={54} color={skin.frame} weight="thin" />
          <Text style={[styles.emptyText, { color: skin.text }]}>
            {t(locale, 'room.emptyFavs', { max: ROOM_MAX })}
          </Text>
        </View>
      </View>
    );
  }

  // ---- Edit mode ----------------------------------------------------------
  if (editing) {
    const gap = SPACING.md;
    const pickW = (W - SPACING.lg * 2 - gap * 2) / 3;
    return (
      <View style={[styles.container, { backgroundColor: skin.wall }]}>
        {topBar}
        <View style={styles.editHead}>
          <Text style={[styles.kicker, { color: skin.frame }]}>{t(locale, 'room.myRoom')}</Text>
          <Text style={[styles.h1, { color: skin.text }]}>{t(locale, 'room.chooseWall')}</Text>
          <Text style={[styles.sub, { color: skin.text, opacity: 0.7 }]}>
            {t(locale, 'room.editSub', { n: room.length, max: ROOM_MAX })}
          </Text>
        </View>
        <FlatList
          data={favs}
          keyExtractor={(a) => a.id}
          numColumns={3}
          columnWrapperStyle={{ gap, paddingHorizontal: SPACING.lg }}
          contentContainerStyle={{ gap, paddingBottom: insets.bottom + SPACING.xxl, paddingTop: SPACING.md }}
          renderItem={({ item }) => {
            const on = isInRoom(item.id);
            const disabled = !on && full;
            return (
              <Pressable
                onPress={() => toggleRoom(item.id)}
                disabled={disabled}
                style={({ pressed }) => [
                  styles.pickTile,
                  { width: pickW, height: pickW * 1.15, borderColor: on ? skin.frame : 'transparent' },
                  disabled && { opacity: 0.35 },
                  pressed && { opacity: 0.85 },
                ]}
              >
                <ArtImage artwork={item} radius={4} showQrMark={false} />
                {on && (
                  <View style={[styles.pickCheck, { backgroundColor: skin.frame }]}>
                    <Check size={13} color={skin.wall} weight="bold" />
                  </View>
                )}
                {on && (
                  <Pressable
                    onPress={() => {
                      const willSet = roomHero !== item.id;
                      setRoomHero(item.id);
                      if (willSet) hNotify(Haptics.NotificationFeedbackType.Success);
                      else hImpact(Haptics.ImpactFeedbackStyle.Light);
                    }}
                    hitSlop={8}
                    style={[
                      styles.crownBtn,
                      { backgroundColor: roomHero === item.id ? skin.frame : 'rgba(11,11,15,0.6)' },
                    ]}
                  >
                    <Crown size={13} color={roomHero === item.id ? skin.wall : '#F5F3EE'} weight="fill" />
                  </Pressable>
                )}
              </Pressable>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  if (pieces.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: skin.wall }]}>
        {topBar}
        <View style={styles.empty}>
          <PencilSimple size={48} color={skin.frame} weight="thin" />
          <Text style={[styles.emptyText, { color: skin.text }]}>
            {t(locale, 'room.emptyWall', { max: ROOM_MAX, n: favs.length, s: favs.length === 1 ? '' : 's' })}
          </Text>
        </View>
      </View>
    );
  }

  // ---- The room: swipe along your exhibition, each piece on its own wall ---
  const cap = skin.wallH ?? 0.42;
  const centerY = Hs * (skin.wallY ?? 0.36);
  const isMainSel = !!hero && hero.id === roomHero;
  const selYear = hero ? DETAIL_INFO[hero.id]?.year ?? ARTWORK_DETAILS[hero.id]?.year : undefined;
  return (
    <View style={[styles.container, { backgroundColor: skin.wall }]}>
      <FlatList
        ref={listRef}
        data={loopData}
        keyExtractor={(a, i) => `${a.id}:${i}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={startIndex}
        getItemLayout={(_, i) => ({ length: W, offset: W * i, index: i })}
        onScrollToIndexFailed={(info) => {
          // Guard against the RN crash when an index isn't laid out yet.
          listRef.current?.scrollToOffset({ offset: W * info.index, animated: false });
        }}
        onMomentumScrollEnd={(e) => {
          const raw = Math.round(e.nativeEvent.contentOffset.x / W);
          if (!loop) {
            setSel(raw);
            return;
          }
          const real = ((raw % N) + N) % N;
          setSel(real);
          // Re-center to the middle copy if we've drifted into an edge copy.
          if (raw < N || raw >= 2 * N) {
            listRef.current?.scrollToOffset({ offset: (N + real) * W, animated: false });
          }
        }}
        renderItem={({ item, index }) => {
          const f = frameFor(item.id);
          const main = item.id === roomHero;
          const scaleUp = main ? 1.06 : 1; // the main exhibit gets a touch more wall
          const a = ASPECTS[item.id] || 1.25;
          let pw = W * 0.72 * scaleUp,
            ph = pw / a;
          const mh = Hs * cap * scaleUp;
          if (ph > mh) {
            ph = mh;
            pw = ph * a;
          }
          // Real-scale mode: size every piece relative to the room's largest work.
          // Pure linear cm scaling makes small pieces microscopic next to a mural,
          // so we soften it with a gamma curve (SCALE_GAMMA) and a floor
          // (SCALE_MIN) — big works still read big, small ones stay visible.
          // Pieces with no known size (Camera degli Sposi) are shown as the largest.
          if (scaleReal) {
            const d = DIMENSIONS[item.id];
            const rH = d ? d[0] : maxDimCm;
            const rW = d ? d[1] : maxDimCm;
            const rMax = Math.max(rH, rW);
            const factor = Math.max(SCALE_MIN, Math.pow(rMax / maxDimCm, SCALE_GAMMA));
            const targetMax = Math.min(W * 0.8, mh) * factor; // px for the longer side
            if (rW >= rH) {
              pw = targetMax;
              ph = targetMax * (rH / rW);
            } else {
              ph = targetMax;
              pw = targetMax * (rW / rH);
            }
            if (pw > W * 0.92) {
              const k = (W * 0.92) / pw;
              pw *= k;
              ph *= k;
            }
          }
          const bare = f.id === 'none'; // "None" frame — hang the bare canvas
          // Custom nine-slice art frame (if a PNG is registered for this frame).
          const frameArt = !bare ? FRAME_ASSETS[f.id] : undefined;
          // The frame adds thickness AROUND the canvas, so a framed piece would
          // grow past its wall footprint and look oversized. Shrink the canvas so
          // the whole framed unit (canvas + border) fits the same footprint the
          // bare canvas would occupy — keeps the piece in proportion to the room.
          if (frameArt) {
            const s = 1 / (1 + 2 * (f.ratio ?? 0.14));
            pw *= s;
            ph *= s;
          }
          const b9 = frameArt ? Math.max(12, Math.round(Math.min(pw, ph) * (f.ratio ?? 0.14))) : 0;
          const fb = bare || frameArt ? 0 : Math.max(f.borderWidth, 4);
          const pad = bare || frameArt ? 0 : 8;
          const oW = pw + pad * 2 + fb * 2 + b9 * 2;
          const oH = ph + pad * 2 + fb * 2 + b9 * 2;
          const bg = main && skin.bgHero ? skin.bgHero : skin.bg;
          const litId = `lit${index}`;
          const spotId = `spot${index}`;
          // A warm "picture light" pool aimed at where the piece actually hangs,
          // so the lighting lands on the art instead of being cut behind it.
          const liteCy = ((centerY - oH * 0.32) / Hs) * 100;
          const liteRx = Math.min(52, (oW / W) * 58);
          return (
            <View style={{ width: W, height: '100%' }}>
              {bg && <ExpoImage source={bg} style={StyleSheet.absoluteFill} contentFit="cover" />}
              {/* Picture light: warm glow centered above the hung piece */}
              <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
                <Defs>
                  <RadialGradient id={litId} cx="50%" cy={`${liteCy}%`} rx={`${liteRx}%`} ry="34%">
                    <Stop offset="0%" stopColor="#FFF3D6" stopOpacity={0.28} />
                    <Stop offset="55%" stopColor="#FFF3D6" stopOpacity={0.08} />
                    <Stop offset="100%" stopColor="#FFF3D6" stopOpacity={0} />
                  </RadialGradient>
                </Defs>
                <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${litId})`} />
              </Svg>
              {/* Spotlight: darken the room around the main exhibit so it pops */}
              {main && (
                <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
                  <Defs>
                    <RadialGradient id={spotId} cx="50%" cy={`${(skin.wallY ?? 0.36) * 100}%`} rx="72%" ry="54%">
                      <Stop offset="0%" stopColor="#000000" stopOpacity={0} />
                      <Stop offset="66%" stopColor="#000000" stopOpacity={0.14} />
                      <Stop offset="100%" stopColor="#000000" stopOpacity={0.6} />
                    </RadialGradient>
                  </Defs>
                  <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${spotId})`} />
                </Svg>
              )}
              {/* Living aura around the main exhibit — a slow themed shimmer */}
              {main && (
                <Animated.View
                  style={[StyleSheet.absoluteFill, { opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.25, 0.6] }) }]}
                  pointerEvents="none"
                >
                  <Svg style={StyleSheet.absoluteFill}>
                    <Defs>
                      <RadialGradient id={`aura${index}`} cx="50%" cy={`${(skin.wallY ?? 0.36) * 100}%`} rx="48%" ry="36%">
                        <Stop offset="0%" stopColor={skin.frame} stopOpacity={0.5} />
                        <Stop offset="60%" stopColor={skin.frame} stopOpacity={0.12} />
                        <Stop offset="100%" stopColor={skin.frame} stopOpacity={0} />
                      </RadialGradient>
                    </Defs>
                    <Rect x="0" y="0" width="100%" height="100%" fill={`url(#aura${index})`} />
                  </Svg>
                </Animated.View>
              )}
              {/* The framed piece, hung on the wall */}
              <Pressable
                onPress={() => onArtTap(item.id)}
                style={{ position: 'absolute', top: centerY - oH / 2, left: (W - oW) / 2 }}
              >
                {frameArt ? (
                  <View style={{ shadowColor: '#000', shadowOpacity: 0.55, shadowRadius: 18, shadowOffset: { width: 0, height: 14 } }}>
                    <NineSliceFrame source={frameArt} insetX={f.insetX ?? 0.2} insetY={f.insetY ?? 0.2} border={b9} width={pw} height={ph} radius={2}>
                      <ArtImage artwork={item} radius={2} showQrMark={false} width={IMG_DETAIL} />
                    </NineSliceFrame>
                  </View>
                ) : (
                  <View
                    style={{
                      borderColor: bare ? 'transparent' : f.color ?? skin.frame,
                      borderWidth: fb,
                      borderRadius: f.radius,
                      padding: pad,
                      backgroundColor: bare ? '#000' : COLORS.mat,
                      shadowColor: '#000',
                      shadowOpacity: bare ? 0.45 : 0.55,
                      shadowRadius: bare ? 14 : 18,
                      shadowOffset: { width: 0, height: bare ? 10 : 14 },
                    }}
                  >
                    <View style={{ width: pw, height: ph, borderRadius: bare ? 1 : 2, overflow: 'hidden', backgroundColor: COLORS.mat, borderWidth: !bare && f.liner ? 2 : 0, borderColor: f.liner ?? 'transparent' }}>
                      {/* cover (not contain): the box is already the painting's aspect, so
                          it shows the whole piece — and cover never letterboxes, so no
                          black bars even while the exact aspect is still resolving. */}
                      <ArtImage artwork={item} radius={2} showQrMark={false} width={IMG_DETAIL} />
                    </View>
                  </View>
                )}
              </Pressable>
            </View>
          );
        }}
      />

      <View style={styles.pagerTop}>{topBar}</View>

      {/* Bottom: grab handle + title, then the collapsible exhibition filmstrip */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + SPACING.sm }]}>
        <View style={styles.barGrab} {...barPan.panHandlers}>
          <View style={styles.barHandle} />
          <Text style={styles.barTitle} numberOfLines={1}>{titleFor(hero.id, locale, hero.title)}</Text>
          <Text style={styles.barMeta} numberOfLines={1}>
            {hero.artist}
            {selYear ? ` · ${selYear}` : ''}
          </Text>
        </View>
        <Animated.View
          style={{
            alignSelf: 'stretch',
            alignItems: 'center',
            overflow: 'hidden',
            opacity: collapse,
            height: collapse.interpolate({ inputRange: [0, 1], outputRange: [0, BAR_COLLAPSE_H] }),
          }}
        >
          <View style={styles.stripRow}>
            {pieces.length > 1 && (
              <Pressable hitSlop={14} onPress={() => nav(-1)} style={styles.stripArrow}>
                <CaretLeft size={24} color="rgba(245,243,238,0.85)" weight="bold" />
              </Pressable>
            )}
            <ScrollView
              ref={stripRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={onStripScroll}
              style={{ flex: 1 }}
              contentContainerStyle={styles.strip}
            >
              {thumbs.map((a, i) => {
                const real = i % N;
                const on = real === idx;
                return (
                  <Pressable key={`${a.id}:${i}`} onPress={() => go(real)}>
                    <View
                      style={[
                        styles.stripThumb,
                        { borderColor: on ? COLORS.gold : 'rgba(255,255,255,0.22)' },
                        on && { borderWidth: 2, transform: [{ translateY: -4 }] },
                      ]}
                    >
                      <ArtImage artwork={a} radius={2} showQrMark={false} />
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
            {pieces.length > 1 && (
              <Pressable hitSlop={14} onPress={() => nav(1)} style={styles.stripArrow}>
                <CaretRight size={24} color="rgba(245,243,238,0.85)" weight="bold" />
              </Pressable>
            )}
          </View>
          {/* Below the filmstrip: MAIN EXHIBIT centered, magnifier on the right.
              Fixed height so every page is the same size. */}
          <View style={styles.bottomRow}>
            {isMainSel && (
              <View style={[styles.mainPlaque, { borderColor: skin.frame }]}>
                <Crown size={11} color={skin.frame} weight="fill" />
                <Text style={[styles.mainPlaqueText, { color: skin.frame }]}>{t(locale, 'room.mainExhibit')}</Text>
              </View>
            )}
            <Pressable
              onPress={() => router.push({ pathname: '/viewer', params: { id: hero.id } })}
              hitSlop={10}
              style={styles.lupaBtn}
            >
              <MagnifyingGlassPlus size={17} color="rgba(245,243,238,0.9)" weight="bold" />
            </Pressable>
          </View>
        </Animated.View>
      </View>

      {customizeModal}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg, paddingBottom: SPACING.sm,
  },
  topRight: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  iconBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1, alignItems: 'center', justifyContent: 'center',
  },
  pill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderWidth: 1, borderRadius: RADIUS.pill, paddingHorizontal: SPACING.md, paddingVertical: 8,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  pillText: { fontWeight: '800', fontSize: 13 },
  editHead: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.sm },
  kicker: { fontSize: 12, fontWeight: '800', letterSpacing: 3 },
  h1: { fontSize: 28, fontWeight: '700', marginTop: 4, fontFamily: FONT.serif },
  sub: { fontSize: 13, marginTop: 4 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: SPACING.xxl, gap: SPACING.lg },
  emptyText: { fontSize: 15, textAlign: 'center', lineHeight: 22, opacity: 0.9 },
  pagerTop: { position: 'absolute', top: 0, left: 0, right: 0 },
  wallHeading: { fontSize: 15, fontWeight: '700', paddingHorizontal: SPACING.lg, marginBottom: SPACING.md, fontFamily: FONT.serif },
  hangWrap: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: SPACING.lg, paddingHorizontal: SPACING.lg, paddingTop: SPACING.sm },
  hangTitle: { fontSize: 11, fontWeight: '600', marginTop: 6, textAlign: 'center', fontFamily: FONT.serif },
  canvasShadow: {
    borderRadius: 1, backgroundColor: '#000',
    shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 16, shadowOffset: { width: 0, height: 12 },
  },
  zoomHint: {
    position: 'absolute', right: 14, bottom: 14, width: 26, height: 26, borderRadius: 13,
    backgroundColor: 'rgba(11,11,15,0.6)', alignItems: 'center', justifyContent: 'center',
  },
  arrow: {
    position: 'absolute', paddingHorizontal: SPACING.sm, paddingVertical: SPACING.md,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.6, shadowRadius: 5, shadowOffset: { width: 0, height: 1 },
  },
  wallLabel: { position: 'absolute', left: 0, right: 0, alignItems: 'center', paddingHorizontal: SPACING.xxl },
  wallLabelTitle: { fontSize: 19, fontWeight: '700', fontFamily: FONT.serif, textAlign: 'center' },
  wallLabelArtist: { fontSize: 13, marginTop: 2, opacity: 0.75, textAlign: 'center' },
  wallLabelAdded: { fontSize: 11, marginTop: 3, opacity: 0.55, textAlign: 'center' },
  bottomBar: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(6,6,10,0.62)', paddingTop: SPACING.lg, paddingHorizontal: SPACING.lg,
    borderTopLeftRadius: RADIUS.xl, borderTopRightRadius: RADIUS.xl, alignItems: 'center',
  },
  barGrab: { alignItems: 'center', alignSelf: 'stretch', paddingBottom: 2 },
  barHandle: {
    width: 44, height: 5, borderRadius: 3, backgroundColor: 'rgba(245,243,238,0.35)', marginBottom: SPACING.sm,
  },
  mainPlaque: {
    flexDirection: 'row', alignItems: 'center', gap: 5, alignSelf: 'center',
    borderWidth: 1, borderRadius: RADIUS.pill, paddingHorizontal: 10, paddingVertical: 3,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  mainPlaqueText: { fontSize: 10, fontWeight: '800', letterSpacing: 1.5 },
  bottomRow: { height: 36, marginTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch' },
  barTitle: { color: LIGHT, fontSize: 19, fontWeight: '700', fontFamily: FONT.serif, textAlign: 'center' },
  barMeta: { color: 'rgba(245,243,238,0.75)', fontSize: 13, marginTop: 2, textAlign: 'center' },
  lupaBtn: {
    position: 'absolute', right: 4, width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.08)',
  },
  barAdded: { color: 'rgba(245,243,238,0.5)', fontSize: 11, marginTop: 3 },
  stripRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xs, width: '100%' },
  stripArrow: { paddingHorizontal: 2, alignItems: 'center', justifyContent: 'center' },
  strip: { gap: SPACING.sm, alignItems: 'center', paddingVertical: SPACING.sm, flexGrow: 1, justifyContent: 'center' },
  stripThumb: {
    width: STRIP_THUMB_W, height: 72, borderRadius: RADIUS.sm, borderWidth: 1, padding: 2,
    backgroundColor: COLORS.mat, overflow: 'hidden',
  },
  pickTile: {
    backgroundColor: COLORS.mat, borderRadius: RADIUS.sm, borderWidth: 2, padding: 3, overflow: 'hidden',
  },
  pickCheck: {
    position: 'absolute', top: 6, right: 6, width: 22, height: 22, borderRadius: 11,
    alignItems: 'center', justifyContent: 'center',
  },
  crownBtn: {
    position: 'absolute', top: 6, left: 6, width: 24, height: 24, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  // Customize sheet
  sheetBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  sheet: {
    backgroundColor: '#15131A', borderTopLeftRadius: RADIUS.xl, borderTopRightRadius: RADIUS.xl,
    paddingHorizontal: SPACING.lg, paddingTop: SPACING.sm,
  },
  sheetHandle: { alignSelf: 'center', width: 40, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.25)', marginBottom: SPACING.md },
  sheetHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: SPACING.md },
  sheetTitle: { color: LIGHT, fontSize: 20, fontWeight: '800', fontFamily: FONT.serif },
  sheetLabel: { color: COLORS.gold, fontSize: 11, fontWeight: '800', letterSpacing: 1.5, marginBottom: SPACING.sm },
  scaleRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, marginTop: SPACING.lg },
  scaleBody: { color: 'rgba(245,243,238,0.7)', fontSize: 12, lineHeight: 16 },
  sheetRow: { gap: SPACING.md, paddingVertical: 2 },
  roomThumb: {
    width: 90, height: 64, borderRadius: RADIUS.sm, borderWidth: 2, overflow: 'hidden', backgroundColor: '#000',
  },
  roomCheck: { position: 'absolute', top: 4, right: 4, width: 18, height: 18, borderRadius: 9, backgroundColor: COLORS.gold, alignItems: 'center', justifyContent: 'center' },
  frameLock: { position: 'absolute', top: -4, right: -4, width: 20, height: 20, borderRadius: 10, backgroundColor: 'rgba(11,11,15,0.85)', borderWidth: 1, borderColor: COLORS.gold, alignItems: 'center', justifyContent: 'center' },
  frameSwatchOuter: {
    width: 48, height: 48, borderRadius: RADIUS.sm, borderWidth: 2, borderColor: 'transparent',
    alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.06)',
  },
  swatchName: { color: 'rgba(245,243,238,0.7)', fontSize: 10, maxWidth: 90, textAlign: 'center' },
  shopLink: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    borderWidth: 1, borderColor: COLORS.gold, borderRadius: RADIUS.pill, paddingVertical: SPACING.md, marginTop: SPACING.xl,
  },
  shopLinkText: { color: COLORS.gold, fontWeight: '800', fontSize: 14 },
});
