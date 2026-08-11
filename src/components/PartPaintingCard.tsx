// A multi-part painting shown as ONE card that fills in as you collect its
// fragments. Each fragment is a vertical slice of the same image; reuniting
// them left-to-right reconstructs the whole work. While incomplete the card
// still shows how many parts compose it, so you know what's left to hunt.

import { Sparkle } from 'phosphor-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ArtImage } from '@/components/ArtImage';
import type { Artwork } from '@/data/artworks';
import type { OwnedMap } from '@/game/parts';
import { titleFor } from '@/data/titles';
import { useLocale } from '@/i18n';
import { t } from '@/data/ui';
import { RARITY, rarityRank } from '@/game/rarity';
import { COLORS, FONT, RADIUS, SPACING } from '@/theme/theme';

const ROW_RATIO = 0.58; // painting height / full-row width

/** The sliced image itself: owned parts show real slices, the rest stay hidden. */
export function PartComposite({
  parts,
  owned,
  divided,
  width,
  revealBlur = false,
}: {
  parts: Artwork[];
  owned: OwnedMap;
  divided?: boolean;
  /** Pixel width each slice requests (larger = sharper when zoomed). */
  width?: number;
  /** Show un-owned parts as the real image, blurred (aligns perfectly with the
   *  owned slices) instead of the pixelated mosaic (which has its own aspect and
   *  would misalign when zoomed). Use this in the fullscreen viewer. */
  revealBlur?: boolean;
}) {
  const total = parts.length;
  // Once every fragment is in hand the work is whole again, so the seams go away
  // by default. Callers can still force them with `divided`.
  const allOwned = parts.every((p) => !!owned[p.id]);
  const showSeams = divided ?? !allOwned;
  return (
    <View style={styles.compositeRow}>
      {parts.map((p, i) => {
        const own = !!owned[p.id];
        return (
          <View
            key={p.id}
            style={[
              styles.cell,
              showSeams && i < total - 1 && styles.cellDivider,
              // Fractional cell widths (e.g. a third of an odd pixel count) leave a
              // hairline of background showing between slices, which reads as a
              // stray dark line on an assembled painting. Overlap by a pixel.
              !showSeams && i < total - 1 && styles.cellBleed,
            ]}
          >
            <ArtImage
              artwork={p}
              hidden={!own && !revealBlur}
              blur={!own && revealBlur ? 26 : 0}
              dim={!own && revealBlur}
              part={{ index: i + 1, total }}
              radius={0}
              showQrMark={false}
              width={width}
            />
          </View>
        );
      })}
    </View>
  );
}

export function PartPaintingCard({
  parts,
  rep,
  owned,
  width,
  onPress,
}: {
  parts: Artwork[];
  rep: Artwork;
  owned: OwnedMap;
  width: number;
  onPress?: () => void;
}) {
  const { locale } = useLocale();
  const total = parts.length;
  const have = parts.filter((p) => !!owned[p.id]).length;
  const complete = have === total;
  const rarity = RARITY[rep.rarity];
  const repTitle = titleFor(rep.id, locale, rep.title);
  const bw = 1.5 + rarityRank(rep.rarity);
  const imgH = (width - SPACING.xs * 2) * ROW_RATIO;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.frame,
        { width, borderWidth: bw, borderColor: complete ? rarity.color : COLORS.cardBorder },
        pressed && onPress && { opacity: 0.9 },
      ]}
    >
      <View style={[styles.mat, { height: imgH }]}>
        <PartComposite parts={parts} owned={owned} divided={!complete} />
        <View style={styles.partBadge}>
          <Text style={styles.partBadgeText}>
            {t(locale, 'part.badge', { have, total })}
          </Text>
        </View>
      </View>

      <View style={styles.placard}>
        {complete ? (
          <>
            <Text style={styles.title} numberOfLines={1}>
              {repTitle}
            </Text>
            <Text style={styles.artist} numberOfLines={1}>
              {rep.artist}
            </Text>
          </>
        ) : have > 0 ? (
          <>
            <Text style={styles.title} numberOfLines={1}>
              {repTitle}
            </Text>
            <Text style={styles.hint}>
              {t(locale, 'part.reunite', { n: total - have, s: total - have > 1 ? 's' : '' })}
            </Text>
          </>
        ) : (
          <View style={styles.emptyRow}>
            <Sparkle size={13} color={COLORS.textFaint} />
            <Text style={styles.emptyText}>
              {t(locale, 'part.undiscovered', { total })}
            </Text>
          </View>
        )}
        <View style={[styles.strip, { backgroundColor: rarity.color, opacity: complete ? 0.85 : 0.4 }]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  compositeRow: { flexDirection: 'row', flex: 1, borderRadius: 4, overflow: 'hidden' },
  cell: { flex: 1, overflow: 'hidden' },
  cellDivider: { borderRightWidth: 1, borderColor: 'rgba(0,0,0,0.45)' },
  cellBleed: { marginRight: -1 },
  frame: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.sm,
    padding: SPACING.xs,
  },
  mat: {
    backgroundColor: COLORS.mat,
    borderRadius: 4,
    padding: 6,
  },
  partBadge: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: 'rgba(11,11,15,0.72)',
    borderRadius: RADIUS.pill,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  partBadgeText: { color: COLORS.text, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  placard: { paddingHorizontal: SPACING.sm, paddingVertical: SPACING.sm, minHeight: 44 },
  title: { color: COLORS.text, fontSize: 14, fontWeight: '600', fontFamily: FONT.serif },
  artist: { color: COLORS.textDim, fontSize: 12, marginTop: 1 },
  hint: { color: COLORS.gold, fontSize: 11, marginTop: 2 },
  emptyRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 4 },
  emptyText: { color: COLORS.textFaint, fontSize: 12, fontStyle: 'italic' },
  strip: { height: 3, borderRadius: 2, marginTop: 8 },
});
