import { useRouter } from 'expo-router';
import { Heart } from 'phosphor-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Artwork } from '@/data/artworks';
import { ArtImage } from '@/components/ArtImage';
import { isExclusive } from '@/game/hash';
import { titleFor } from '@/data/titles';
import { useLocale } from '@/i18n';
import { t } from '@/data/ui';
import { RARITY, SPECIAL_COLOR } from '@/game/rarity';
import { COLORS, FONT, RADIUS, SPACING } from '@/theme/theme';

type Props = {
  artwork: Artwork;
  owned: boolean;
  count?: number;
  width: number;
  favorite?: boolean;
};

function ArtworkCardBase({ artwork, owned, count = 0, width, favorite = false }: Props) {
  const router = useRouter();
  const { locale } = useLocale();
  const rarity = RARITY[artwork.rarity];
  const exclusive = isExclusive(artwork.id);
  const accent = exclusive ? SPECIAL_COLOR : rarity.color;
  const spare = Math.max(0, count - 1);

  return (
    <Pressable
      onPress={() => owned && router.push(`/artwork/${artwork.id}`)}
      style={({ pressed }) => [
        styles.card,
        { width, borderColor: owned ? accent + '44' : COLORS.cardBorder },
        exclusive && owned && { borderColor: accent, borderWidth: 2 },
        pressed && owned && { opacity: 0.85 },
      ]}
    >
      <View style={[styles.imageWrap, { height: width * 1.15 }]}>
        <ArtImage artwork={artwork} hidden={!owned} radius={RADIUS.sm} showQrMark={false} />
        {owned && spare > 0 && (
          <View style={[styles.dupBadge, { backgroundColor: rarity.color }]}>
            <Text style={styles.dupText}>x{spare + 1}</Text>
          </View>
        )}
        {owned && favorite && (
          <View style={styles.favBadge}>
            <Heart size={14} color={COLORS.danger} weight="fill" />
          </View>
        )}
        {owned && exclusive && (
          <View style={[styles.specialBadge, { backgroundColor: accent }]}>
            <Text style={styles.specialText}>{t(locale, 'card.special')}</Text>
          </View>
        )}
      </View>
      <View style={styles.meta}>
        {owned ? (
          <>
            <Text style={styles.title} numberOfLines={1}>
              {titleFor(artwork.id, locale, artwork.title)}
            </Text>
            <Text style={styles.artist} numberOfLines={1}>
              {artwork.artist}
            </Text>
          </>
        ) : (
          <Text style={styles.locked} numberOfLines={1}>
            {t(locale, 'card.undiscovered')}
          </Text>
        )}
        <View style={[styles.rarityStrip, { backgroundColor: accent }]} />
      </View>
    </Pressable>
  );
}

// Memoised: a 300-item grid shouldn't re-render every card when unrelated state
// (shards, favourites of other pieces…) changes.
export const ArtworkCard = React.memo(ArtworkCardBase);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageWrap: { width: '100%', padding: SPACING.xs },
  dupBadge: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  dupText: { color: '#0B0B0F', fontSize: 11, fontWeight: '800' },
  favBadge: {
    position: 'absolute',
    top: SPACING.sm,
    left: SPACING.sm,
    backgroundColor: 'rgba(11,11,15,0.7)',
    borderRadius: RADIUS.pill,
    padding: 5,
  },
  specialBadge: {
    position: 'absolute',
    bottom: SPACING.sm,
    left: SPACING.sm,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  specialText: { color: '#0B0B0F', fontSize: 9, fontWeight: '900', letterSpacing: 1 },

  meta: { paddingHorizontal: SPACING.sm, paddingBottom: SPACING.sm, gap: 2 },
  title: { color: COLORS.text, fontSize: 13, fontWeight: '600', fontFamily: FONT.serif },
  artist: { color: COLORS.textDim, fontSize: 11 },
  locked: { color: COLORS.textFaint, fontSize: 12, fontStyle: 'italic', paddingVertical: 6 },
  rarityStrip: { height: 3, borderRadius: 2, marginTop: 6, opacity: 0.8 },
});
