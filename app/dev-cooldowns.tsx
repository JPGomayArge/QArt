// Developer only: every QR code the player has scanned, with how many times it
// has been used, how long its cooldown runs and when it frees up.
//
// Codes are stored hashed (we never keep the payload), so a row is identified by
// the first characters of its hash — enough to tell them apart while testing.

import { useRouter } from 'expo-router';
import { ArrowLeft, Clock, LockSimpleOpen } from 'phosphor-react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLocale } from '@/i18n';
import { t } from '@/data/ui';
import { cooldownDaysFor, MAX_COOLDOWN_DAYS, useGame } from '@/store/GameStore';
import { COLORS, FONT, RADIUS, SPACING } from '@/theme/theme';

const DAY_MS = 24 * 60 * 60 * 1000;

function human(ms: number): string {
  if (ms <= 0) return '0m';
  const d = Math.floor(ms / DAY_MS);
  const h = Math.floor((ms % DAY_MS) / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export default function DevCooldownsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { scanCooldowns, scanCounts, qrCooldownEnabled, devClearCooldown, resetCooldowns } = useGame();
  const { locale } = useLocale();

  // Tick every 30s so the remaining time counts down while the screen is open.
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  const rows = useMemo(() => {
    const ids = new Set([...Object.keys(scanCounts), ...Object.keys(scanCooldowns)]);
    return [...ids]
      .map((hash) => {
        const scans = scanCounts[hash] ?? 0;
        const last = scanCooldowns[hash] ?? 0;
        const windowMs = cooldownDaysFor(scans) * DAY_MS;
        const readyAt = last ? last + windowMs : 0;
        const remaining = readyAt ? Math.max(0, readyAt - now) : 0;
        return { hash, scans, last, windowMs, readyAt, remaining };
      })
      .sort((a, b) => b.remaining - a.remaining || b.scans - a.scans);
  }, [scanCooldowns, scanCounts, now]);

  const locked = rows.filter((r) => r.remaining > 0).length;

  return (
    <View style={styles.container}>
      <View style={[styles.topBar, { paddingTop: insets.top + SPACING.sm }]}>
        <Pressable style={styles.iconBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color={COLORS.text} />
        </Pressable>
        <Text style={styles.h1}>{t(locale, 'dev.cooldowns')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: SPACING.lg, paddingBottom: insets.bottom + SPACING.xxl, gap: SPACING.sm }}>
        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            {t(locale, 'dev.cdSummary', { n: rows.length, locked })}
          </Text>
          <Text style={styles.summarySub}>
            {qrCooldownEnabled ? t(locale, 'dev.cdOn', { max: MAX_COOLDOWN_DAYS }) : t(locale, 'dev.cdOff')}
          </Text>
          {locked > 0 && (
            <Pressable style={styles.clearAll} onPress={() => resetCooldowns()}>
              <LockSimpleOpen size={15} color="#0B0B0F" weight="bold" />
              <Text style={styles.clearAllText}>{t(locale, 'dev.cdClearAll')}</Text>
            </Pressable>
          )}
        </View>

        {rows.length === 0 && <Text style={styles.empty}>{t(locale, 'dev.cdEmpty')}</Text>}

        {rows.map((r) => {
          const ready = r.remaining <= 0;
          return (
            <View key={r.hash} style={[styles.row, ready && styles.rowReady]}>
              <View style={{ flex: 1, gap: 3 }}>
                <Text style={styles.hash}>{r.hash.slice(0, 16)}…</Text>
                <Text style={styles.meta}>
                  {t(locale, 'dev.cdScans', { n: r.scans })} · {t(locale, 'dev.cdWindow', { d: Math.round(r.windowMs / DAY_MS) })}
                </Text>
                {r.last > 0 && (
                  <Text style={styles.meta}>
                    {t(locale, 'dev.cdLast')}: {new Date(r.last).toLocaleString()}
                  </Text>
                )}
              </View>
              <View style={{ alignItems: 'flex-end', gap: 6 }}>
                {ready ? (
                  <Text style={styles.ready}>{t(locale, 'dev.cdReady')}</Text>
                ) : (
                  <>
                    <View style={styles.pill}>
                      <Clock size={13} color={COLORS.gold} weight="fill" />
                      <Text style={styles.pillText}>{human(r.remaining)}</Text>
                    </View>
                    <Pressable onPress={() => devClearCooldown(r.hash)} hitSlop={8}>
                      <Text style={styles.clearOne}>{t(locale, 'dev.cdClearOne')}</Text>
                    </Pressable>
                  </>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg, paddingBottom: SPACING.sm,
  },
  iconBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.card,
    borderColor: COLORS.cardBorder, borderWidth: 1, alignItems: 'center', justifyContent: 'center',
  },
  h1: { color: COLORS.text, fontSize: 17, fontWeight: '800', fontFamily: FONT.serif },
  summary: {
    backgroundColor: COLORS.card, borderColor: COLORS.cardBorder, borderWidth: 1,
    borderRadius: RADIUS.md, padding: SPACING.md, gap: 6,
  },
  summaryText: { color: COLORS.text, fontSize: 15, fontWeight: '700' },
  summarySub: { color: COLORS.textDim, fontSize: 12, lineHeight: 17 },
  clearAll: {
    marginTop: SPACING.xs, alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: COLORS.gold, borderRadius: RADIUS.pill, paddingHorizontal: SPACING.md, paddingVertical: 7,
  },
  clearAllText: { color: '#0B0B0F', fontWeight: '800', fontSize: 12 },
  empty: { color: COLORS.textFaint, fontSize: 14, textAlign: 'center', marginTop: SPACING.xl },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    backgroundColor: COLORS.card, borderColor: COLORS.cardBorder, borderWidth: 1,
    borderRadius: RADIUS.md, padding: SPACING.md,
  },
  rowReady: { borderColor: 'rgba(84,201,138,0.5)' },
  hash: { color: COLORS.text, fontSize: 13, fontWeight: '700', fontFamily: 'Menlo' },
  meta: { color: COLORS.textDim, fontSize: 11 },
  pill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(201,162,75,0.14)', borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.sm, paddingVertical: 4,
  },
  pillText: { color: COLORS.gold, fontSize: 12, fontWeight: '800' },
  ready: { color: '#54C98A', fontSize: 12, fontWeight: '800' },
  clearOne: { color: COLORS.textFaint, fontSize: 11, textDecorationLine: 'underline' },
});
