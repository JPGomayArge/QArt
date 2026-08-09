import { Asset } from 'expo-asset';
import { Image } from 'expo-image';
import * as FileSystem from 'expo-file-system/legacy';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as MediaLibrary from 'expo-media-library';
import { Check, DownloadSimple, X } from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image as RNImage,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArtImage } from '@/components/ArtImage';
import { PartComposite } from '@/components/PartPaintingCard';
import { ARTWORK_BY_ID } from '@/data/artworks';
import { IMAGE_OVERRIDES } from '@/data/imageOverrides';
import { titleFor } from '@/data/titles';
import { useLocale } from '@/i18n';
import { t } from '@/data/ui';
import { resolveArtworkImage, sizedUrl, IMG_FULL, IMG_DETAIL } from '@/game/images';
import { partsOf } from '@/game/parts';
import { partProgress, useGame } from '@/store/GameStore';
import { COLORS, RADIUS, SPACING } from '@/theme/theme';

export default function ViewerScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const { id, part } = useLocalSearchParams<{ id: string; part?: string }>();
  const { isOwned, owned } = useGame();
  const { locale } = useLocale();
  const artwork = id ? ARTWORK_BY_ID[id] : undefined;
  // A locally-bundled, hand-cleaned image (frame cropped off) wins over the
  // remote Commons URL — including here in the full-screen zoom + save.
  const override = artwork ? IMAGE_OVERRIDES[artwork.id] : undefined;
  const [uri, setUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgReady, setImgReady] = useState(false);
  const [aspect, setAspect] = useState<number | null>(null); // natural w/h of the full image
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Multi-part handling:
  //  - `part` given (opened from a fresh discovery): show ONLY that slice.
  //  - incomplete multi-part (opened from the info tab): show the whole work as
  //    a composite — collected parts sharp, the rest still pixelated.
  const pp = artwork ? partProgress(artwork, owned) : null;
  const single = part
    ? { index: Number(part.split(':')[0]), total: Number(part.split(':')[1]) }
    : undefined;
  const showComposite = !single && !!artwork?.partGroup && !!pp && !pp.complete;
  const parts = artwork?.partGroup ? partsOf(artwork.partGroup) : [];

  useEffect(() => {
    let alive = true;
    if (artwork)
      resolveArtworkImage(artwork)
        .then((u) => {
          if (!alive) return;
          setUri(u);
          setLoading(false);
          // Learn the real aspect ratio so multi-part slices line up exactly.
          if (u) RNImage.getSize(sizedUrl(u, IMG_DETAIL), (w, h) => alive && h > 0 && setAspect(w / h), () => {});
        })
        .catch(() => alive && setLoading(false));
    else setLoading(false);
    return () => {
      alive = false;
    };
  }, [artwork]);

  // Save the artwork you're looking at to the phone's photo library.
  const saveToPhone = async () => {
    if (!uri && !override) return;
    try {
      setSaving(true);
      // Write-only permission: on iOS this shows the lighter "add to photos" prompt.
      const perm = await MediaLibrary.requestPermissionsAsync(true);
      if (!perm.granted) {
        Alert.alert(t(locale, 'viewer.photosTitle'), t(locale, 'viewer.photosBody'));
        return;
      }
      let fileUri: string;
      if (override) {
        // Bundled local override: resolve its on-device file path instead of downloading.
        const asset = Asset.fromModule(override as number);
        await asset.downloadAsync();
        fileUri = asset.localUri ?? asset.uri;
      } else {
        const target = `${FileSystem.cacheDirectory}qart-${artwork?.id ?? Date.now()}.jpg`;
        const dl = await FileSystem.downloadAsync(sizedUrl(uri!, IMG_FULL), target);
        if (!dl?.uri || (dl.status && dl.status >= 400)) throw new Error(`Download failed (${dl?.status ?? '?'})`);
        fileUri = dl.uri;
      }
      // expo-media-library 57 replaced saveToLibraryAsync (now throws) with Asset.create().
      // Cast: the new `Asset` class is present at runtime but this project's module
      // resolution doesn't surface it on the namespace type.
      await (MediaLibrary as any).Asset.create(fileUri);
      setSaved(true);
    } catch (e: any) {
      // Surface the real reason so it's fixable (e.g. a missing native module in
      // an out-of-date dev build shows "Cannot find native module …").
      Alert.alert(t(locale, 'viewer.couldNotSave'), e?.message ? String(e.message) : t(locale, 'viewer.saveError'));
    } finally {
      setSaving(false);
    }
  };

  // Saving only makes sense for a whole image you own (not a partial work).
  const canSave = (!!uri || !!override) && !single && !showComposite && !!artwork && isOwned(artwork.id);

  // Fit the piece to the screen using its real aspect ratio, so multi-part
  // slices reconstruct without stretching or misaligned edges.
  const A = aspect ?? 1.3; // full image w/h (fallback: mild landscape)
  const total = single?.total ?? parts.length ?? 1;

  const cMaxW = width;
  const cMaxH = height * 0.72;
  let cW = cMaxW;
  let cH = cW / A;
  if (cH > cMaxH) {
    cH = cMaxH;
    cW = cH * A;
  }
  const compositeBox = { width: cW, height: cH };

  const pA = A / (total || 1); // one slice is 1/total of the width
  const sMaxW = width * 0.92;
  const sMaxH = height * 0.82;
  let sH = sMaxH;
  let sW = sH * pA;
  if (sW > sMaxW) {
    sW = sMaxW;
    sH = sW / pA;
  }
  const singleBox = { width: sW, height: sH };

  const renderContent = () => {
    if (!artwork) return null;
    if (single) {
      return (
        <View style={[styles.box, singleBox]}>
          <ArtImage
            artwork={artwork}
            hidden={!isOwned(artwork.id)}
            part={single}
            radius={RADIUS.sm}
            width={IMG_FULL}
            showQrMark={false}
          />
        </View>
      );
    }
    if (showComposite) {
      return (
        <View style={[styles.box, compositeBox]}>
          <PartComposite parts={parts} owned={owned} width={IMG_DETAIL} />
        </View>
      );
    }
    if (uri || override) {
      return (
        <View style={{ width, height: height * 0.9, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={override ?? { uri: sizedUrl(uri!, IMG_FULL) }}
            style={StyleSheet.absoluteFill}
            contentFit="contain"
            transition={150}
            cachePolicy="memory-disk"
            recyclingKey={artwork.id}
            onLoad={() => setImgReady(true)}
            onError={() => setImgReady(true)}
          />
          {!imgReady && <ActivityIndicator color={COLORS.gold} size="large" />}
        </View>
      );
    }
    return loading ? (
      <ActivityIndicator color={COLORS.gold} size="large" />
    ) : (
      <Text style={styles.dim}>{t(locale, 'viewer.noImage')}</Text>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={StyleSheet.absoluteFill}
        contentContainerStyle={styles.center}
        maximumZoomScale={4}
        minimumZoomScale={1}
        centerContent
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>

      {artwork && (
        <View style={[styles.caption, { bottom: insets.bottom + SPACING.xl }]} pointerEvents="box-none">
          <Text style={styles.capTitle}>{titleFor(artwork.id, locale, artwork.title)}</Text>
          <Text style={styles.capArtist}>{artwork.artist}</Text>
          {showComposite && (
            <Text style={styles.capHint}>
              {t(locale, 'viewer.partsCollected', { have: pp!.have, total: pp!.total })}
            </Text>
          )}

          {canSave && (
            <Pressable style={styles.saveBtn} onPress={saveToPhone} disabled={saving || saved}>
              {saved ? (
                <Check size={17} color={COLORS.success} weight="bold" />
              ) : (
                <DownloadSimple size={17} color={COLORS.text} weight="bold" />
              )}
              <Text style={[styles.saveText, saved && { color: COLORS.success }]}>
                {saving ? t(locale, 'viewer.saving') : saved ? t(locale, 'viewer.saved') : t(locale, 'viewer.saveToPhone')}
              </Text>
            </Pressable>
          )}
        </View>
      )}

      <Pressable style={[styles.close, { top: insets.top + SPACING.sm }]} onPress={() => router.back()}>
        <X size={22} color={COLORS.text} weight="bold" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: { flexGrow: 1, alignItems: 'center', justifyContent: 'center' },
  box: { backgroundColor: '#000', borderRadius: RADIUS.sm, overflow: 'hidden' },
  dim: { color: COLORS.textDim },
  close: {
    position: 'absolute',
    right: SPACING.lg,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(30,30,36,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  caption: { position: 'absolute', left: 0, right: 0, alignItems: 'center', paddingHorizontal: SPACING.lg, gap: SPACING.sm },
  capTitle: { color: COLORS.text, fontSize: 16, fontWeight: '700', textAlign: 'center' },
  capArtist: { color: COLORS.textDim, fontSize: 13, marginTop: 2 },
  capHint: { color: COLORS.gold, fontSize: 12, marginTop: 2, textAlign: 'center' },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(30,30,36,0.9)',
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    marginTop: SPACING.sm,
  },
  saveText: { color: COLORS.text, fontSize: 14, fontWeight: '700' },
});
