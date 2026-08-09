import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import {
  CaretRight,
  ChartBar,
  Check,
  Envelope,
  Translate,
  HandHeart,
  Info,
  ListMagnifyingGlass,
  MagicWand,
  Question,
  Ruler,
  ShareNetwork,
  ShieldCheck,
  SpeakerHigh,
  Sparkle,
  Star,
  Trash,
  Vibrate,
} from 'phosphor-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SafetyScreen } from '@/components/SafetyScreen';
import { LANGUAGES, useLocale } from '@/i18n';
import { t } from '@/data/ui';
import { useTipJar, TIP_SHARD_BONUS } from '@/game/tips';
import { loadSoundPref, setSoundEnabled } from '@/game/sound';
import {
  Haptics,
  hImpact,
  loadPrefs,
  setHapticsEnabled,
  setReduceMotion,
} from '@/game/prefs';
import { collectionStats, useGame } from '@/store/GameStore';
import { COLORS, FONT, RADIUS, SPACING } from '@/theme/theme';

// Fallback donation page, used until the in-app tip (IAP) is built natively.
const DONATION_URL = 'https://ko-fi.com/qart';
// TODO: update after the App Store listing is live.
const APP_STORE_URL = 'https://apps.apple.com/app/qart';
const SHARE_URL = 'https://apps.apple.com/app/qart';
// TODO: point this at your support inbox.
const CONTACT_EMAIL = 'j.pablo.gomez.ayala@gmail.com';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    owned,
    shards,
    totalScans,
    dailyLimitEnabled,
    setDailyLimitEnabled,
    qrCooldownEnabled,
    setQrCooldownEnabled,
    scanLimit,
    scansToday,
    devAddShards,
    addShards,
    unit,
    setUnit,
    resetAll,
  } = useGame();
  const { locale, setLocale } = useLocale();
  // Tip jar: a successful in-app tip silently grants a thank-you of shards.
  const tip = useTipJar(() => addShards(TIP_SHARD_BONUS));
  const [showSafety, setShowSafety] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [hapticsOn, setHapticsOn] = useState(true);
  const [reduceMotionOn, setReduceMotionOn] = useState(false);
  const [devUnlocked, setDevUnlocked] = useState(false);
  const versionTaps = useRef(0);

  useEffect(() => {
    loadSoundPref().then(setSoundOn);
    loadPrefs().then((p) => {
      setHapticsOn(p.hapticsOn);
      setReduceMotionOn(p.reduceMotion);
    });
  }, []);

  const toggleSound = (v: boolean) => {
    setSoundOn(v);
    setSoundEnabled(v);
  };
  const toggleHaptics = (v: boolean) => {
    setHapticsOn(v);
    setHapticsEnabled(v);
    if (v) hImpact(Haptics.ImpactFeedbackStyle.Medium); // let them feel it turn on
  };
  const toggleMotion = (v: boolean) => {
    setReduceMotionOn(v);
    setReduceMotion(v);
  };

  const onVersionTap = () => {
    if (devUnlocked) return;
    versionTaps.current += 1;
    if (versionTaps.current >= 7) {
      setDevUnlocked(true);
      Alert.alert(t(locale, 'set.devMode'), t(locale, 'set.devModeBody'));
    }
  };

  const shareApp = () => {
    Share.share({
      message: t(locale, 'set.shareMessage', { url: SHARE_URL }),
    }).catch(() => {});
  };

  const stats = collectionStats(owned);

  const confirmReset = () => {
    Alert.alert(
      t(locale, 'set.resetConfirmTitle'),
      t(locale, 'set.resetConfirmBody'),
      [
        { text: t(locale, 'common.cancel'), style: 'cancel' },
        { text: t(locale, 'set.reset'), style: 'destructive', onPress: resetAll },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + SPACING.xxl }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.head, { paddingTop: insets.top + SPACING.md }]}>
          <Text style={styles.kicker}>{t(locale, 'set.kicker')}</Text>
          <Text style={styles.h1}>{t(locale, 'set.title')}</Text>
        </View>

        {/* Language */}
        <Text style={styles.sectionTitle}>{t(locale, 'set.language')}</Text>
        <View style={styles.card}>
          <View style={styles.rowLeft}>
            <Translate size={20} color={COLORS.gold} weight="fill" />
            <Text style={styles.rowBody}>{t(locale, 'set.languageBody')}</Text>
          </View>
          <View style={styles.langWrap}>
            {LANGUAGES.map((l) => {
              const on = locale === l.code;
              return (
                <Pressable
                  key={l.code}
                  onPress={() => setLocale(l.code)}
                  style={[styles.langChip, on && { borderColor: COLORS.gold, backgroundColor: COLORS.gold + '18' }]}
                >
                  {on && <Check size={13} color={COLORS.gold} weight="bold" />}
                  <Text style={[styles.langChipText, on && { color: COLORS.gold }]}>{l.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Feedback: sound, haptics, motion */}
        <Text style={styles.sectionTitle}>{t(locale, 'set.feedback')}</Text>
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <SpeakerHigh size={22} color={COLORS.gold} weight="fill" />
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{t(locale, 'set.revealSounds')}</Text>
                <Text style={styles.rowBody}>{t(locale, 'set.revealSoundsBody')}</Text>
              </View>
            </View>
            <Switch
              value={soundOn}
              onValueChange={toggleSound}
              trackColor={{ false: COLORS.cardBorder, true: COLORS.gold }}
              thumbColor="#F5F3EE"
              ios_backgroundColor={COLORS.cardBorder}
            />
          </View>
        </View>

        <View style={[styles.card, { marginTop: SPACING.sm }]}>
          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <Vibrate size={22} color={COLORS.gold} weight="fill" />
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{t(locale, 'set.vibration')}</Text>
                <Text style={styles.rowBody}>{t(locale, 'set.vibrationBody')}</Text>
              </View>
            </View>
            <Switch
              value={hapticsOn}
              onValueChange={toggleHaptics}
              trackColor={{ false: COLORS.cardBorder, true: COLORS.gold }}
              thumbColor="#F5F3EE"
              ios_backgroundColor={COLORS.cardBorder}
            />
          </View>
        </View>

        <View style={[styles.card, { marginTop: SPACING.sm }]}>
          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <MagicWand size={22} color={COLORS.gold} weight="fill" />
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{t(locale, 'set.reduceMotion')}</Text>
                <Text style={styles.rowBody}>{t(locale, 'set.reduceMotionBody')}</Text>
              </View>
            </View>
            <Switch
              value={reduceMotionOn}
              onValueChange={toggleMotion}
              trackColor={{ false: COLORS.cardBorder, true: COLORS.gold }}
              thumbColor="#F5F3EE"
              ios_backgroundColor={COLORS.cardBorder}
            />
          </View>
        </View>

        <View style={[styles.card, { marginTop: SPACING.sm }]}>
          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <Ruler size={22} color={COLORS.gold} weight="fill" />
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{t(locale, 'set.units')}</Text>
                <Text style={styles.rowBody}>{t(locale, 'set.unitsBody')}</Text>
              </View>
            </View>
            <Switch
              value={unit === 'in'}
              onValueChange={(v) => setUnit(v ? 'in' : 'cm')}
              trackColor={{ false: COLORS.cardBorder, true: COLORS.gold }}
              thumbColor="#F5F3EE"
              ios_backgroundColor={COLORS.cardBorder}
            />
          </View>
        </View>

        {/* Safety */}
        <Text style={styles.sectionTitle}>{t(locale, 'set.safety')}</Text>
        <Pressable style={styles.card} onPress={() => setShowSafety(true)}>
          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <ShieldCheck size={22} color={COLORS.success} weight="fill" />
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{t(locale, 'set.safetyTitle')}</Text>
                <Text style={styles.rowBody}>{t(locale, 'set.safetyBody')}</Text>
              </View>
            </View>
            <CaretRight size={18} color={COLORS.textFaint} />
          </View>
        </Pressable>

        {/* Learn */}
        <Text style={styles.sectionTitle}>{t(locale, 'set.learn')}</Text>
        <Pressable style={styles.card} onPress={() => router.push('/how-to-play')}>
          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <Question size={22} color={COLORS.gold} weight="fill" />
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{t(locale, 'set.howToPlay')}</Text>
                <Text style={styles.rowBody}>{t(locale, 'set.howToPlayBody')}</Text>
              </View>
            </View>
            <CaretRight size={18} color={COLORS.textFaint} />
          </View>
        </Pressable>

        {/* Progress snapshot */}
        <Text style={styles.sectionTitle}>{t(locale, 'set.yourMuseum')}</Text>
        <View style={styles.card}>
          <StatRow label={t(locale, 'set.artworksDiscovered')} value={`${stats.discovered} / ${stats.total}`} />
          <Divider />
          <StatRow label={t(locale, 'set.artistsDiscovered')} value={`${stats.artistsDiscovered} / ${stats.totalArtists}`} />
          <Divider />
          <StatRow label={t(locale, 'col.duplicates')} value={String(stats.duplicates)} />
          <Divider />
          <StatRow label={t(locale, 'col.shards')} value={String(shards)} icon={<Sparkle size={15} color={COLORS.gold} weight="fill" />} />
          <Divider />
          <StatRow label={t(locale, 'set.totalScans')} value={String(totalScans)} />
        </View>

        {/* Support */}
        <Text style={styles.sectionTitle}>{t(locale, 'set.support')}</Text>
        <Pressable
          style={styles.card}
          onPress={tip.available ? tip.buy : () => Linking.openURL(DONATION_URL)}
          disabled={tip.busy}
        >
          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <HandHeart size={22} color={COLORS.danger} weight="fill" />
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{t(locale, 'set.supportTitle')}</Text>
                <Text style={styles.rowBody}>{t(locale, 'set.supportBody')}</Text>
              </View>
            </View>
            {tip.price ? (
              <Text style={styles.tipPrice}>{tip.price}</Text>
            ) : (
              <CaretRight size={18} color={COLORS.textFaint} />
            )}
          </View>
        </Pressable>
        <Pressable style={[styles.card, { marginTop: SPACING.sm }]} onPress={shareApp}>
          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <ShareNetwork size={22} color={COLORS.gold} weight="fill" />
              <Text style={styles.rowTitle}>{t(locale, 'set.shareTitle')}</Text>
            </View>
            <CaretRight size={18} color={COLORS.textFaint} />
          </View>
        </Pressable>
        <Pressable style={[styles.card, { marginTop: SPACING.sm }]} onPress={() => Linking.openURL(APP_STORE_URL)}>
          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <Star size={22} color={COLORS.gold} weight="fill" />
              <Text style={styles.rowTitle}>{t(locale, 'set.rateApp')}</Text>
            </View>
            <CaretRight size={18} color={COLORS.textFaint} />
          </View>
        </Pressable>

        {/* Contact */}
        <Text style={styles.sectionTitle}>{t(locale, 'set.contact')}</Text>
        <Pressable
          style={styles.card}
          onPress={() =>
            Linking.openURL(
              `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('QArt feedback')}`
            )
          }
        >
          <View style={styles.rowBetween}>
            <View style={styles.rowLeft}>
              <Envelope size={22} color={COLORS.gold} weight="fill" />
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{t(locale, 'set.contactTitle')}</Text>
                <Text style={styles.rowBody}>{t(locale, 'set.contactBody')}</Text>
              </View>
            </View>
            <CaretRight size={18} color={COLORS.textFaint} />
          </View>
        </Pressable>

        {/* About */}
        <Text style={styles.sectionTitle}>{t(locale, 'set.about')}</Text>
        <Pressable style={styles.card} onPress={onVersionTap}>
          <View style={styles.rowLeft}>
            <Info size={20} color={COLORS.textDim} />
            <Text style={styles.rowTitle}>{t(locale, 'set.version', { version: Constants.expoConfig?.version ?? '1.0.0' })}</Text>
          </View>
        </Pressable>

        {/* Developer — hidden until the version row is tapped 7×. */}
        {devUnlocked && (
          <>
            <Text style={styles.sectionTitle}>{t(locale, 'set.developer')}</Text>
            <View style={styles.card}>
              <View style={styles.rowBetween}>
                <View style={{ flex: 1, paddingRight: SPACING.md }}>
                  <Text style={styles.rowTitle}>{t(locale, 'set.limitScans', { n: scanLimit })}</Text>
                  <Text style={styles.rowBody}>{t(locale, 'set.limitScansBody')}</Text>
                </View>
                <Switch
                  value={dailyLimitEnabled}
                  onValueChange={setDailyLimitEnabled}
                  trackColor={{ false: COLORS.cardBorder, true: COLORS.gold }}
                  thumbColor="#F5F3EE"
                  ios_backgroundColor={COLORS.cardBorder}
                />
              </View>
              {dailyLimitEnabled && (
                <View style={styles.limitBar}>
                  <Text style={styles.limitText}>{t(locale, 'set.scansLeftToday', { left: Math.max(0, scanLimit - scansToday), limit: scanLimit })}</Text>
                </View>
              )}
            </View>

            <View style={[styles.card, { marginTop: SPACING.sm }]}>
              <View style={styles.rowBetween}>
                <View style={{ flex: 1, paddingRight: SPACING.md }}>
                  <Text style={styles.rowTitle}>{t(locale, 'set.cooldownTitle')}</Text>
                  <Text style={styles.rowBody}>{t(locale, 'set.cooldownBody')}</Text>
                </View>
                <Switch
                  value={qrCooldownEnabled}
                  onValueChange={setQrCooldownEnabled}
                  trackColor={{ false: COLORS.cardBorder, true: COLORS.gold }}
                  thumbColor="#F5F3EE"
                  ios_backgroundColor={COLORS.cardBorder}
                />
              </View>
            </View>

            <Pressable style={[styles.card, { marginTop: SPACING.sm }]} onPress={() => router.push('/dev-catalog')}>
              <View style={styles.rowBetween}>
                <View style={styles.rowLeft}>
                  <ListMagnifyingGlass size={20} color={COLORS.gold} weight="fill" />
                  <Text style={styles.rowTitle}>{t(locale, 'set.viewAllArtworks')}</Text>
                </View>
                <CaretRight size={18} color={COLORS.textFaint} />
              </View>
            </Pressable>

            <Pressable style={[styles.card, { marginTop: SPACING.sm }]} onPress={() => router.push('/insights')}>
              <View style={styles.rowBetween}>
                <View style={styles.rowLeft}>
                  <ChartBar size={20} color={COLORS.gold} weight="fill" />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.rowTitle}>{t(locale, 'set.insights')}</Text>
                    <Text style={styles.rowBody}>{t(locale, 'set.insightsBody')}</Text>
                  </View>
                </View>
                <CaretRight size={18} color={COLORS.textFaint} />
              </View>
            </Pressable>

            <Pressable style={[styles.card, { marginTop: SPACING.sm }]} onPress={() => devAddShards(1000)}>
              <View style={styles.rowBetween}>
                <View style={styles.rowLeft}>
                  <Sparkle size={20} color={COLORS.gold} weight="fill" />
                  <Text style={styles.rowTitle}>{t(locale, 'set.grantShards')}</Text>
                </View>
                <Text style={styles.rowBody}>{t(locale, 'set.grantShardsBody', { n: shards })}</Text>
              </View>
            </Pressable>

            <Pressable style={[styles.card, styles.dangerCard, { marginTop: SPACING.sm }]} onPress={confirmReset}>
              <View style={styles.rowLeft}>
                <Trash size={20} color={COLORS.danger} weight="fill" />
                <Text style={[styles.rowTitle, { color: COLORS.danger }]}>{t(locale, 'set.resetTitle')}</Text>
              </View>
            </Pressable>
          </>
        )}
      </ScrollView>

      <Modal visible={showSafety} animationType="slide" onRequestClose={() => setShowSafety(false)}>
        <SafetyScreen reviewMode onAcknowledge={() => setShowSafety(false)} onClose={() => setShowSafety(false)} />
      </Modal>
    </View>
  );
}

function StatRow({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.statValueWrap}>
        {icon}
        <Text style={styles.statValue}>{value}</Text>
      </View>
    </View>
  );
}

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  head: { paddingHorizontal: SPACING.lg },
  kicker: { color: COLORS.gold, fontSize: 12, fontWeight: '800', letterSpacing: 3 },
  h1: { color: COLORS.text, fontSize: 30, fontWeight: '700', marginTop: 2, fontFamily: FONT.serif },
  sectionTitle: {
    color: COLORS.gold,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
    marginBottom: SPACING.sm,
    textTransform: 'uppercase',
  },
  card: {
    marginHorizontal: SPACING.lg,
    backgroundColor: COLORS.card,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
  },
  dangerCard: { borderColor: COLORS.danger + '44' },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, flex: 1 },
  rowTitle: { color: COLORS.text, fontSize: 16, fontWeight: '700' },
  rowBody: { color: COLORS.textDim, fontSize: 13, marginTop: 3, lineHeight: 18 },
  tipPrice: { color: COLORS.gold, fontSize: 15, fontWeight: '800' },
  soundDivider: { height: 1, backgroundColor: COLORS.hairline, marginTop: SPACING.md },
  previewLabel: {
    color: COLORS.textFaint, fontSize: 11, fontWeight: '700', letterSpacing: 0.5,
    textTransform: 'uppercase', marginTop: SPACING.md,
  },
  soundBoard: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginTop: SPACING.sm },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 8, paddingHorizontal: 12,
    borderRadius: RADIUS.pill, borderWidth: 1, backgroundColor: COLORS.bgElevated,
  },
  chipText: { fontSize: 13, fontWeight: '700' },
  langWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginTop: SPACING.md },
  langChip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingVertical: 8, paddingHorizontal: 12,
    borderRadius: RADIUS.pill, borderWidth: 1, borderColor: COLORS.cardBorder, backgroundColor: COLORS.bgElevated,
  },
  langChipText: { color: COLORS.textDim, fontSize: 13, fontWeight: '700' },
  limitBar: {
    marginTop: SPACING.md,
    backgroundColor: COLORS.bgElevated,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  limitText: { color: COLORS.gold, fontSize: 13, fontWeight: '700' },
  statRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: SPACING.sm },
  statLabel: { color: COLORS.textDim, fontSize: 14 },
  statValueWrap: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statValue: { color: COLORS.text, fontSize: 15, fontWeight: '700' },
  divider: { height: 1, backgroundColor: COLORS.hairline },
});
