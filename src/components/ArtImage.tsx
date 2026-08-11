// Shows an artwork's public-domain image (resolved from Wikipedia and cached).
// Undiscovered pieces are shown "hidden": the real image, heavily obscured
// (blur + veil + a faint QR watermark) so you can sense it but not identify it
// for certain — a teaser that motivates hunting it down.

import { Image } from 'expo-image';
import { QrCode } from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Mosaic } from '@/components/Mosaic';
import { titleFor } from '@/data/titles';
import { useLocale } from '@/i18n';
import type { Artwork } from '@/data/artworks';
import { ARTWORK_IMAGES } from '@/data/images';
import { IMAGE_OVERRIDES } from '@/data/imageOverrides';
import { focusFor, focusTopFor } from '@/data/focus';
import { MOSAICS } from '@/data/mosaics';
import { resolveArtworkImage, sizedUrl, IMG_HIDDEN, IMG_CARD } from '@/game/images';
import { RARITY } from '@/game/rarity';
import { COLORS, RADIUS } from '@/theme/theme';

type Props = {
  artwork: Artwork;
  radius?: number;
  hidden?: boolean; // undiscovered -> obscured teaser
  dim?: boolean;
  blur?: number; // extra blur on top of the low-res when hidden
  // Show one slice of a multi-part painting. When the set is complete, pass
  // undefined to show the whole assembled work.
  part?: { index: number; total: number };
  /** Pixel width to request (keeps loads fast + cacheable). */
  width?: number;
  /** The QR watermark is an extra SVG per tile — skip it in dense grids. */
  showQrMark?: boolean;
  /** Show the whole artwork (letterboxed) instead of filling+cropping. */
  contain?: boolean;
  /**
   * Skip the pixelated mosaic placeholder (and the fade) and show the real,
   * sharp image straight away. Used when the piece is already owned — e.g. a
   * duplicate scan — where the full image is already cached and there's no
   * "discovery" to build up to.
   */
  instant?: boolean;
};

export function ArtImage({
  artwork,
  radius = RADIUS.md,
  hidden = false,
  dim = false,
  blur = 0,
  part,
  width = IMG_CARD,
  showQrMark = true,
  contain = false,
  instant = false,
}: Props) {
  // Most pieces have a baked URL: resolve synchronously so a 50-item grid
  // doesn't spawn 50 promises + state updates on mount.
  const baked = ARTWORK_IMAGES[artwork.id] ?? null;
  const [uri, setUri] = useState<string | null>(baked);
  const [loading, setLoading] = useState(!baked);
  const rarity = RARITY[artwork.rarity];
  const { locale } = useLocale();

  useEffect(() => {
    if (baked) return; // nothing to look up
    let alive = true;
    setLoading(true);
    resolveArtworkImage(artwork)
      .then((u) => {
        if (alive) {
          setUri(u);
          setLoading(false);
        }
      })
      .catch(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [artwork, baked]);

  const slicePart = part && part.total > 1;
  const sliceStyle = slicePart
    ? { width: `${part!.total * 100}%` as const, left: `${-(part!.index - 1) * 100}%` as const }
    : null;

  // Undiscovered + we have a baked mosaic: crisp blocks, nothing downloaded.
  const mosaic = hidden ? MOSAICS[artwork.id] : undefined;
  if (mosaic) {
    const baked = mosaic.startsWith('data:'); // pre-rendered PNG = one view
    return (
      <View style={{ borderRadius: radius, overflow: 'hidden', flex: 1 }}>
        {baked ? (
          <Image
            source={{ uri: mosaic }}
            style={slicePart ? [styles.slice, sliceStyle] : styles.image}
            contentFit="cover"
            transition={0}
          />
        ) : (
          <Mosaic data={mosaic} />
        )}
        {showQrMark && (
          <View style={styles.qrMark} pointerEvents="none">
            <QrCode size={46} color="rgba(255,255,255,0.16)" weight="fill" />
          </View>
        )}
      </View>
    );
  }

  // No image available (e.g. copyrighted): keep a tasteful placeholder.
  if (!uri) {
    return (
      <View
        style={[
          styles.placeholder,
          { borderRadius: radius, borderColor: rarity.color + '55', backgroundColor: rarity.glow },
        ]}
      >
        {loading ? (
          <ActivityIndicator color={rarity.color} />
        ) : hidden ? (
          <QrCode size={30} color={COLORS.textFaint} weight="thin" />
        ) : (
          <Text style={[styles.placeholderText, { color: rarity.color }]} numberOfLines={3}>
            {titleFor(artwork.id, locale, artwork.title)}
          </Text>
        )}
      </View>
    );
  }

  // A locally-bundled, hand-cleaned image (e.g. frame cropped off) wins over the
  // remote Commons URL. It's a required asset (a number), so it bypasses sizedUrl.
  const override = IMAGE_OVERRIDES[artwork.id];
  const src = sizedUrl(uri, hidden ? IMG_HIDDEN : width);
  // Instant, in-app placeholder: the baked mosaic (a data: URI, no network). It
  // shows immediately so a freshly-scanned piece goes pixelated → sharp instead of
  // sitting on a blank frame while the real image downloads from Commons. Uses the
  // same contentFit as the image, so it never letterboxes (no black bars).
  const fit = contain ? 'contain' : 'cover';
  // `instant` (already-owned pieces) skips the mosaic teaser and the fade so the
  // sharp image appears directly instead of animating pixelated → sharp.
  const phData = !hidden && !instant ? MOSAICS[artwork.id] : undefined;
  const placeholder = phData && phData.startsWith('data:') ? { uri: phData } : undefined;
  const transition = instant ? 0 : 220;

  return (
    <View style={{ borderRadius: radius, overflow: 'hidden', flex: 1 }}>
      {slicePart ? (
        <Image
          source={override ?? { uri: src }}
          placeholder={placeholder}
          placeholderContentFit="cover"
          style={[styles.slice, sliceStyle, dim && { opacity: 0.5 }]}
          contentFit="cover"
          // Slices are cropped horizontally by sliceStyle, so only the vertical
          // half of the focus applies here (see focusTopFor).
          contentPosition={focusTopFor(artwork.id)}
          transition={transition}
          cachePolicy="disk"
          blurRadius={blur}
        />
      ) : (
        <Image
          source={override ?? { uri: src }}
          placeholder={placeholder}
          placeholderContentFit={fit}
          style={[styles.image, dim && { opacity: 0.5 }]}
          contentFit={fit}
          // Crop toward the subject: `cover` keeps the centre, which cuts off
          // faces that sit near an edge (see focus.ts).
          contentPosition={contain ? 'center' : focusFor(artwork.id)}
          transition={transition}
          cachePolicy="disk"
          blurRadius={blur}
        />
      )}
      {hidden && (
        <>
          <View style={[styles.veil, { backgroundColor: rarity.glow }]} />
          <View style={styles.scrim} />
          <View style={styles.qrMark} pointerEvents="none">
            <QrCode size={46} color="rgba(255,255,255,0.14)" weight="fill" />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', height: '100%', backgroundColor: COLORS.bgElevated },
  slice: { position: 'absolute', top: 0, bottom: 0, height: '100%', backgroundColor: COLORS.bgElevated },
  veil: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.45 },
  scrim: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.28)' },
  qrMark: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  placeholder: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  placeholderText: { fontSize: 12, textAlign: 'center', fontWeight: '600' },
});
