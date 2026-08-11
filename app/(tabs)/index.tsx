import { CameraView, useCameraPermissions } from 'expo-camera';
import { useFocusEffect, useRouter } from 'expo-router';
import { Eye, HourglassMedium, QrCode, ShieldCheck } from 'phosphor-react-native';
import React, { useCallback, useRef, useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Haptics, hNotify } from '@/game/prefs';
import { track } from '@/game/telemetry';
import { prefetchArtwork } from '@/game/prefetch';
import { parseGift } from '@/game/trade';
import { useLocale } from '@/i18n';
import { t } from '@/data/ui';
import { useGame } from '@/store/GameStore';
import { COLORS, FONT, RADIUS, SPACING } from '@/theme/theme';

// Human-friendly "time left" for a code's escalating cooldown.
function formatCooldown(ms: number): string {
  const s = Math.max(0, Math.ceil(ms / 1000));
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m`;
  return `${s}s`;
}

export default function ScanScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { scanQr, receiveArtwork, canScan, dailyLimitEnabled, scansToday, scanLimit } = useGame();
  const { locale } = useLocale();
  const [permission, requestPermission] = useCameraPermissions();
  const [isFocused, setIsFocused] = useState(true); // pause the camera when you're on another tab
  const busy = useRef(false);
  const [notice, setNotice] = useState<string | null>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Re-arm the scanner and track focus whenever this tab regains focus.
  useFocusEffect(
    useCallback(() => {
      busy.current = false;
      setIsFocused(true);
      return () => {
        busy.current = true;
        setIsFocused(false);
        if (noticeTimer.current) clearTimeout(noticeTimer.current);
      };
    }, [])
  );

  // Show a brief message, then re-arm (so the same code in frame doesn't loop).
  const showNotice = useCallback((msg: string) => {
    setNotice(msg);
    hNotify(Haptics.NotificationFeedbackType.Warning);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => {
      setNotice(null);
      busy.current = false;
    }, 1800);
  }, []);

  const handlePayload = useCallback(
    (raw: string) => {
      if (busy.current || !raw) return;
      busy.current = true;

      // Gift QRs are received; everything else is reinterpreted (never opened).
      const gift = parseGift(raw);
      let result;
      let source: 'trade' | 'scan' = 'scan';
      if (gift) {
        result = receiveArtwork(gift.id, gift.nonce);
        source = 'trade';
        if (!result) {
          // Unknown gift, or this gift was already received here.
          showNotice(t(locale, 'scan.giftAlready'));
          return;
        }
      } else {
        const outcome = scanQr(raw);
        if (!outcome.ok) {
          if (outcome.reason === 'cooldown') {
            const left = outcome.retryAt ? outcome.retryAt - Date.now() : 0;
            showNotice(t(locale, 'scan.cooldown', { t: formatCooldown(left) }));
          } else {
            busy.current = false; // daily limit — the limit screen handles it
          }
          return;
        }
        result = outcome.result;
        if (outcome.special) track('special', { id: result.artwork.id });
      }

      prefetchArtwork(result.artwork.id); // make sure the reveal has its image
      hNotify(
        result.isNew
          ? Haptics.NotificationFeedbackType.Success
          : Haptics.NotificationFeedbackType.Warning
      );
      router.push({
        pathname: '/reveal',
        params: {
          id: result.artwork.id,
          isNew: result.isNew ? '1' : '0',
          count: String(result.count),
          source,
        },
      });
    },
    [router, scanQr, receiveArtwork, showNotice, locale]
  );

  const header = (
    <View style={[styles.header, { paddingTop: insets.top + SPACING.md }]}>
      <Text style={styles.kicker}>{t(locale, 'scan.kicker')}</Text>
      <Text style={styles.title}>{t(locale, 'scan.title')}</Text>
    </View>
  );

  // --- Daily limit reached -------------------------------------------------
  if (dailyLimitEnabled && !canScan) {
    return (
      <View style={styles.container}>
        {header}
        <View style={styles.center}>
          <HourglassMedium size={64} color={COLORS.gold} weight="thin" />
          <Text style={styles.permTitle}>{t(locale, 'scan.limitTitle')}</Text>
          <Text style={styles.permBody}>
            {t(locale, 'scan.limitBody', { n: Number.isFinite(scanLimit) ? scanLimit : '∞' })}
          </Text>
        </View>
      </View>
    );
  }

  // --- Permission states ---------------------------------------------------
  if (!permission) {
    return <View style={styles.container}>{header}</View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        {header}
        <View style={styles.center}>
          <QrCode size={64} color={COLORS.gold} weight="thin" />
          <Text style={styles.permTitle}>{t(locale, 'scan.permTitle')}</Text>
          <Text style={styles.permBody}>
            {t(locale, 'scan.permBody')}
          </Text>
          {permission.canAskAgain ? (
            <Pressable style={styles.primaryBtn} onPress={requestPermission}>
              <Text style={styles.primaryBtnText}>{t(locale, 'common.enableCamera')}</Text>
            </Pressable>
          ) : (
            <>
              <Pressable style={styles.primaryBtn} onPress={() => Linking.openSettings()}>
                <Text style={styles.primaryBtnText}>{t(locale, 'scan.openSettings')}</Text>
              </Pressable>
              <Text style={[styles.permBody, { fontSize: 12, marginTop: 4 }]}>
                {t(locale, 'scan.permDeclined')}
              </Text>
            </>
          )}
        </View>
      </View>
    );
  }

  // --- Camera live ---------------------------------------------------------
  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        active={isFocused}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={({ data }) => handlePayload(data)}
      />
      <View style={styles.scrim} pointerEvents="none" />
      {header}

      <View style={styles.reticleWrap} pointerEvents="none">
        <View style={styles.reticle}>
          <View style={[styles.corner, styles.tl]} />
          <View style={[styles.corner, styles.tr]} />
          <View style={[styles.corner, styles.bl]} />
          <View style={[styles.corner, styles.br]} />
        </View>
        {notice ? (
          <View style={styles.notice}>
            <HourglassMedium size={18} color={COLORS.gold} weight="fill" />
            <Text style={styles.noticeText}>{notice}</Text>
          </View>
        ) : (
          <Text style={styles.hint}>{t(locale, 'scan.pointAny')}</Text>
        )}
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 80 }]}>
        {dailyLimitEnabled && (
          <Text style={styles.counter}>
            {t(locale, 'scan.scansLeft', { left: Math.max(0, scanLimit - scansToday), limit: scanLimit })}
          </Text>
        )}
        <View style={styles.safetyRow}>
          <ShieldCheck size={16} color={COLORS.success} weight="fill" />
          <Text style={styles.safetyText}>{t(locale, 'scan.safeLinks')}</Text>
        </View>
        <View style={styles.safetyRow}>
          <Eye size={16} color={COLORS.gold} weight="fill" />
          <Text style={styles.safetyText}>{t(locale, 'scan.stayAware')}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scrim: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.25)' },
  header: { paddingHorizontal: SPACING.xl, paddingBottom: SPACING.md },
  kicker: { color: COLORS.gold, fontSize: 12, fontWeight: '800', letterSpacing: 3 },
  title: { color: COLORS.text, fontSize: 24, fontWeight: '700', marginTop: 4, maxWidth: 300, fontFamily: FONT.serif },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: SPACING.xl, gap: SPACING.md },
  permTitle: { color: COLORS.text, fontSize: 20, fontWeight: '700', marginTop: SPACING.sm, textAlign: 'center' },
  permBody: { color: COLORS.textDim, fontSize: 14, textAlign: 'center', lineHeight: 20 },
  primaryBtn: {
    backgroundColor: COLORS.gold,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.pill,
    marginTop: SPACING.sm,
  },
  primaryBtnText: { color: '#0B0B0F', fontSize: 15, fontWeight: '800' },
  reticleWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: SPACING.lg },
  reticle: { width: 240, height: 240 },
  corner: { position: 'absolute', width: 34, height: 34, borderColor: COLORS.gold },
  tl: { top: 0, left: 0, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 8 },
  tr: { top: 0, right: 0, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 8 },
  bl: { bottom: 0, left: 0, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 8 },
  br: { bottom: 0, right: 0, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 8 },
  hint: { color: COLORS.text, fontSize: 14, fontWeight: '600', opacity: 0.9 },
  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(11,11,15,0.88)',
    borderColor: COLORS.gold,
    borderWidth: 1,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    marginHorizontal: SPACING.xl,
  },
  noticeText: { color: COLORS.text, fontSize: 13, fontWeight: '600', flexShrink: 1, textAlign: 'center' },
  footer: { paddingHorizontal: SPACING.xl, gap: SPACING.md, alignItems: 'center' },
  counter: { color: COLORS.gold, fontSize: 13, fontWeight: '700' },
  safetyRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  safetyText: { color: COLORS.textDim, fontSize: 12 },
});
