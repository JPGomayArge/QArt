import { CameraView, useCameraPermissions } from 'expo-camera';
import { useFocusEffect, useRouter } from 'expo-router';
import { Gift, HandHeart, QrCode, Sparkle, X } from 'phosphor-react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArtImage } from '@/components/ArtImage';
import { ShopContent } from '@/components/ShopContent';
import { ARTWORK_BY_ID, type Artwork } from '@/data/artworks';
import { encodeGift, parseGift } from '@/game/trade';
import { Haptics, hNotify } from '@/game/prefs';
import { RARITY } from '@/game/rarity';
import { useLocale } from '@/i18n';
import { t } from '@/data/ui';
import { titleFor } from '@/data/titles';
import { useGame } from '@/store/GameStore';
import { COLORS, FONT, RADIUS, SPACING } from '@/theme/theme';

type Mode = 'gift' | 'shop';

export default function GiftShopScreen() {
  const insets = useSafeAreaInsets();
  const { owned, shards, spareOf, giveArtwork, receiveArtwork, convertSpareToShards } = useGame();
  const { locale } = useLocale();

  const [mode, setMode] = useState<Mode>('gift');
  const [receiving, setReceiving] = useState(false);
  // The gift's code is generated ONCE (stable nonce) when it's created.
  const [giftFor, setGiftFor] = useState<{ art: Artwork; code: string } | null>(null);

  const spares = useMemo(() => {
    return Object.keys(owned)
      .map((id) => ({ art: ARTWORK_BY_ID[id], spare: spareOf(id) }))
      .filter((x) => x.art && x.spare > 0)
      .sort((a, b) => b.spare - a.spare);
  }, [owned, spareOf]);

  const spareCount = spares.reduce((s, x) => s + x.spare, 0);
  const convertValue = spares.reduce((s, x) => s + x.spare * RARITY[x.art.rarity].tradeValue, 0);

  const startGift = (art: Artwork) => {
    Alert.alert(
      t(locale, 'trade.giveAwayTitle', { title: art.title }),
      t(locale, 'trade.giveAwayBody'),
      [
        { text: t(locale, 'common.cancel'), style: 'cancel' },
        {
          text: t(locale, 'trade.giveAway'),
          onPress: () => {
            if (giveArtwork(art.id)) setGiftFor({ art, code: encodeGift(art.id) });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Fixed header: title + shards, then the Gift / Shop toggle */}
      <View style={[styles.head, { paddingTop: insets.top + SPACING.md }]}>
        <View style={styles.headRow}>
          <View>
            <Text style={styles.kicker}>{t(locale, 'trade.kicker')}</Text>
            <Text style={styles.h1}>{t(locale, 'trade.title')}</Text>
          </View>
          <View style={styles.shardPill}>
            <Sparkle size={16} color={COLORS.gold} weight="fill" />
            <Text style={styles.shardPillText}>{shards}</Text>
          </View>
        </View>

        <View style={styles.segment}>
          {(['gift', 'shop'] as Mode[]).map((m) => (
            <Pressable
              key={m}
              onPress={() => setMode(m)}
              style={[styles.segItem, mode === m && styles.segItemActive]}
            >
              <Text style={[styles.segText, mode === m && styles.segTextActive]}>
                {m === 'gift' ? t(locale, 'trade.gift') : t(locale, 'trade.shop')}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {mode === 'gift' ? (
        <FlatList
          data={spares}
          keyExtractor={(x) => x.art.id}
          contentContainerStyle={{ paddingBottom: insets.bottom + SPACING.xxl }}
          ListHeaderComponent={
            <View>
              {/* Receive a gift — reveals the camera in place */}
              <Pressable
                style={[styles.receiveToggle, receiving && styles.receiveToggleOn]}
                onPress={() => setReceiving((v) => !v)}
              >
                <QrCode size={18} color={receiving ? COLORS.gold : '#0B0B0F'} weight="fill" />
                <Text style={[styles.receiveToggleText, receiving && { color: COLORS.gold }]}>
                  {receiving ? t(locale, 'trade.closeCamera') : t(locale, 'trade.receiveGift')}
                </Text>
              </Pressable>

              {receiving && <ReceivePanel onReceive={receiveArtwork} />}

              {/* Sellable / giftable duplicates */}
              <Text style={styles.giveLabel}>{t(locale, 'trade.yourDuplicates')}</Text>
              {spares.length === 0 ? (
                <View style={styles.emptyBox}>
                  <Gift size={38} color={COLORS.textFaint} weight="thin" />
                  <Text style={styles.emptyTitle}>{t(locale, 'trade.noDupesTitle')}</Text>
                  <Text style={styles.emptyBody}>{t(locale, 'trade.noDupesBody')}</Text>
                </View>
              ) : (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryText}>{t(locale, 'trade.spares', { n: spareCount, s: spareCount > 1 ? 's' : '' })}</Text>
                  <View style={styles.summaryWorth}>
                    <Sparkle size={13} color={COLORS.gold} weight="fill" />
                    <Text style={styles.summaryWorthText}>{t(locale, 'trade.ifConverted', { n: convertValue })}</Text>
                  </View>
                </View>
              )}
            </View>
          }
          renderItem={({ item }) => (
            <SpareRow
              art={item.art}
              spare={item.spare}
              onGift={() => startGift(item.art)}
              onConvert={() => convertSpareToShards(item.art.id)}
            />
          )}
        />
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + SPACING.xxl }} showsVerticalScrollIndicator={false}>
          <ShopContent />
        </ScrollView>
      )}

      {/* Gift QR modal */}
      <Modal visible={!!giftFor} transparent animationType="fade" onRequestClose={() => setGiftFor(null)}>
        {giftFor && (
          <View style={styles.modalBackdrop}>
            <View style={styles.qrCard}>
              <Pressable style={styles.closeBtn} onPress={() => setGiftFor(null)}>
                <X size={20} color={COLORS.textDim} />
              </Pressable>
              <View style={styles.qrGiftTag}>
                <Gift size={14} color={COLORS.gold} weight="fill" />
                <Text style={styles.qrGiftTagText}>{t(locale, 'trade.giftTag')}</Text>
              </View>
              <Text style={styles.qrTitle}>{titleFor(giftFor.art.id, locale, giftFor.art.title)}</Text>
              <Text style={styles.qrArtist}>{giftFor.art.artist}</Text>
              <View style={styles.qrBox}>
                <QRCode value={giftFor.code} size={200} color="#0B0B0F" backgroundColor="#F5F3EE" />
              </View>
              <Text style={styles.qrHint}>{t(locale, 'trade.qrHint')}</Text>
              <Pressable style={styles.givenBtn} onPress={() => setGiftFor(null)}>
                <Text style={styles.givenBtnText}>{t(locale, 'common.done')}</Text>
              </Pressable>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}

function SpareRow({
  art,
  spare,
  onGift,
  onConvert,
}: {
  art: Artwork;
  spare: number;
  onGift: () => void;
  onConvert: () => void;
}) {
  const { locale } = useLocale();
  const rarity = RARITY[art.rarity];
  return (
    <View style={styles.row}>
      <View style={[styles.accent, { backgroundColor: rarity.color }]} />
      <View style={[styles.thumbWrap, { borderColor: rarity.color + '55' }]}>
        <ArtImage artwork={art} radius={RADIUS.sm} />
        {spare > 1 && (
          <View style={[styles.spareBadge, { backgroundColor: rarity.color }]}>
            <Text style={styles.spareBadgeText}>×{spare}</Text>
          </View>
        )}
      </View>
      <View style={{ flex: 1, gap: 3 }}>
        <Text style={styles.rowTitle} numberOfLines={1}>
          {titleFor(art.id, locale, art.title)}
        </Text>
        <Text style={styles.rowArtist} numberOfLines={1}>
          {art.artist}
        </Text>
        <View style={styles.rowMeta}>
          <View style={[styles.rarityDot, { backgroundColor: rarity.color }]} />
          <Text style={styles.rarityLabel}>{t(locale, 'rarity.' + art.rarity)}</Text>
        </View>
      </View>
      <View style={styles.rowActions}>
        <Pressable style={[styles.giftBtn, { backgroundColor: rarity.color }]} onPress={onGift}>
          <Gift size={16} color="#0B0B0F" weight="fill" />
          <Text style={styles.giftBtnText}>{t(locale, 'trade.gift')}</Text>
        </Pressable>
        <Pressable style={styles.convertBtn} onPress={onConvert}>
          <Sparkle size={13} color={COLORS.gold} weight="fill" />
          <Text style={styles.convertText}>+{rarity.tradeValue}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function ReceivePanel({ onReceive }: { onReceive: (id: string, nonce?: string) => any }) {
  const router = useRouter();
  const { locale } = useLocale();
  const [permission, requestPermission] = useCameraPermissions();
  const [isFocused, setIsFocused] = useState(false);
  const busy = useRef(false);

  useFocusEffect(
    useCallback(() => {
      busy.current = false;
      setIsFocused(true);
      return () => {
        busy.current = true;
        setIsFocused(false);
      };
    }, [])
  );

  const onScan = (raw: string) => {
    if (busy.current) return;
    const gift = parseGift(raw);
    if (!gift) return; // ignore non-gift codes in receive mode
    busy.current = true;
    const res = onReceive(gift.id, gift.nonce);
    if (res) {
      hNotify(Haptics.NotificationFeedbackType.Success);
      router.push({
        pathname: '/reveal',
        params: { id: res.artwork.id, isNew: res.isNew ? '1' : '0', count: String(res.count), source: 'trade' },
      });
    } else {
      setTimeout(() => (busy.current = false), 1200);
    }
  };

  if (!permission?.granted) {
    return (
      <View style={styles.receiveBox}>
        <HandHeart size={36} color={COLORS.textFaint} weight="thin" />
        <Text style={styles.receiveBody}>{t(locale, 'trade.cameraNeeded')}</Text>
        <Pressable style={styles.receiveBtn} onPress={requestPermission}>
          <Text style={styles.receiveBtnText}>{t(locale, 'common.enableCamera')}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.receiveBox}>
      <View style={styles.receiveCamera}>
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          active={isFocused}
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          onBarcodeScanned={({ data }) => onScan(data)}
        />
        <View style={styles.receiveReticle} pointerEvents="none">
          <View style={[styles.rCorner, styles.rtl]} />
          <View style={[styles.rCorner, styles.rtr]} />
          <View style={[styles.rCorner, styles.rbl]} />
          <View style={[styles.rCorner, styles.rbr]} />
        </View>
      </View>
      <Text style={styles.receiveBody}>{t(locale, 'trade.pointAtGift')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  head: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.md },
  headRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  kicker: { color: COLORS.gold, fontSize: 12, fontWeight: '800', letterSpacing: 3 },
  h1: { color: COLORS.text, fontSize: 30, fontWeight: '800', marginTop: 2, fontFamily: FONT.serif },
  shardPill: {
    flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4,
    backgroundColor: COLORS.gold + '18', borderColor: COLORS.gold + '55', borderWidth: 1,
    borderRadius: RADIUS.pill, paddingHorizontal: SPACING.md, paddingVertical: 8,
  },
  shardPillText: { color: COLORS.text, fontWeight: '800', fontSize: 16 },

  segment: {
    flexDirection: 'row',
    marginTop: SPACING.lg,
    backgroundColor: COLORS.bgElevated,
    borderRadius: RADIUS.pill,
    padding: 4,
  },
  segItem: { flex: 1, alignItems: 'center', paddingVertical: SPACING.sm, borderRadius: RADIUS.pill },
  segItemActive: { backgroundColor: COLORS.card },
  segText: { color: COLORS.textDim, fontWeight: '700', fontSize: 15 },
  segTextActive: { color: COLORS.gold },

  // Receive
  receiveToggle: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    marginHorizontal: SPACING.lg, marginTop: SPACING.lg,
    backgroundColor: COLORS.gold, borderRadius: RADIUS.pill, paddingVertical: SPACING.md,
    borderWidth: 1, borderColor: COLORS.gold,
  },
  receiveToggleOn: { backgroundColor: COLORS.card, borderColor: COLORS.gold },
  receiveToggleText: { color: '#0B0B0F', fontWeight: '800', fontSize: 15 },
  receiveBox: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, gap: SPACING.md, alignItems: 'center' },
  receiveBody: { color: COLORS.textFaint, fontSize: 13, textAlign: 'center' },
  receiveBtn: { backgroundColor: COLORS.gold, paddingHorizontal: SPACING.xl, paddingVertical: SPACING.md, borderRadius: RADIUS.pill },
  receiveBtnText: { color: '#0B0B0F', fontWeight: '800', fontSize: 14 },
  receiveCamera: {
    width: '100%', height: 280, borderRadius: RADIUS.lg, overflow: 'hidden',
    backgroundColor: '#000', borderColor: COLORS.cardBorder, borderWidth: 1,
  },
  receiveReticle: { position: 'absolute', top: 44, left: 44, right: 44, bottom: 44 },
  rCorner: { position: 'absolute', width: 30, height: 30, borderColor: COLORS.gold },
  rtl: { top: 0, left: 0, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 8 },
  rtr: { top: 0, right: 0, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 8 },
  rbl: { bottom: 0, left: 0, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 8 },
  rbr: { bottom: 0, right: 0, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 8 },

  giveLabel: {
    color: COLORS.gold, fontSize: 12, fontWeight: '800', letterSpacing: 1.5,
    paddingHorizontal: SPACING.lg, marginTop: SPACING.xl, textTransform: 'uppercase',
  },
  summaryRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg, marginTop: SPACING.sm, marginBottom: 2,
  },
  summaryText: { color: COLORS.textDim, fontSize: 13, fontWeight: '700' },
  summaryWorth: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  summaryWorthText: { color: COLORS.gold, fontSize: 13, fontWeight: '700' },

  emptyBox: { alignItems: 'center', gap: SPACING.sm, paddingHorizontal: SPACING.xl, paddingVertical: SPACING.xl },
  emptyTitle: { color: COLORS.text, fontSize: 17, fontWeight: '800', marginTop: SPACING.sm },
  emptyBody: { color: COLORS.textFaint, fontSize: 13, textAlign: 'center', lineHeight: 19 },

  // Spare row
  row: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    backgroundColor: COLORS.card, borderColor: COLORS.cardBorder, borderWidth: 1,
    borderRadius: RADIUS.md, padding: SPACING.sm, paddingLeft: SPACING.md,
    marginHorizontal: SPACING.lg, marginTop: SPACING.sm, overflow: 'hidden',
  },
  accent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4 },
  thumbWrap: { width: 54, height: 64, borderRadius: RADIUS.sm, backgroundColor: COLORS.bgElevated, padding: 3, borderWidth: 1 },
  spareBadge: {
    position: 'absolute', top: -6, right: -6, minWidth: 22, height: 22, borderRadius: 11,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5, borderWidth: 2, borderColor: COLORS.card,
  },
  spareBadgeText: { color: '#0B0B0F', fontWeight: '900', fontSize: 11 },
  rowTitle: { color: COLORS.text, fontSize: 14, fontWeight: '700' },
  rowArtist: { color: COLORS.textDim, fontSize: 12 },
  rowMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  rarityDot: { width: 8, height: 8, borderRadius: 4 },
  rarityLabel: { color: COLORS.textFaint, fontSize: 12, fontWeight: '600' },
  rowActions: { gap: 6, alignItems: 'stretch', width: 76 },
  giftBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5,
    paddingVertical: SPACING.sm, borderRadius: RADIUS.pill,
  },
  giftBtnText: { color: '#0B0B0F', fontWeight: '800', fontSize: 13 },
  convertBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4,
    borderColor: COLORS.cardBorder, borderWidth: 1, paddingVertical: 6, borderRadius: RADIUS.pill,
  },
  convertText: { color: COLORS.gold, fontWeight: '700', fontSize: 12 },

  // Gift modal
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(6,6,10,0.9)', alignItems: 'center', justifyContent: 'center', padding: SPACING.xl },
  qrCard: {
    backgroundColor: COLORS.card, borderColor: COLORS.cardBorder, borderWidth: 1, borderRadius: RADIUS.xl,
    padding: SPACING.xl, alignItems: 'center', gap: SPACING.sm, width: '100%', maxWidth: 320,
  },
  closeBtn: { position: 'absolute', top: SPACING.md, right: SPACING.md, padding: 4 },
  qrGiftTag: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: COLORS.gold + '1E', borderColor: COLORS.gold + '55', borderWidth: 1,
    paddingHorizontal: SPACING.md, paddingVertical: 5, borderRadius: RADIUS.pill, marginTop: SPACING.sm,
  },
  qrGiftTagText: { color: COLORS.gold, fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  qrTitle: { color: COLORS.text, fontSize: 18, fontWeight: '800', textAlign: 'center', marginTop: SPACING.sm },
  qrArtist: { color: COLORS.textDim, fontSize: 13 },
  qrBox: { backgroundColor: '#F5F3EE', padding: SPACING.md, borderRadius: RADIUS.md, marginTop: SPACING.md },
  qrHint: { color: COLORS.textFaint, fontSize: 13, textAlign: 'center', marginTop: SPACING.sm },
  givenBtn: {
    marginTop: SPACING.md, backgroundColor: COLORS.bgElevated, borderColor: COLORS.cardBorder, borderWidth: 1,
    paddingHorizontal: SPACING.xl, paddingVertical: SPACING.md, borderRadius: RADIUS.pill,
  },
  givenBtnText: { color: COLORS.text, fontWeight: '700', fontSize: 14 },
});
