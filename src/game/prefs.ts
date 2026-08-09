// Lightweight user preferences that don't belong in the game save: haptics on/off
// and a "reduce motion" flag for calmer reveals. Persisted to AsyncStorage and
// read synchronously after first load (mirrors src/game/sound.ts).

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

const K_HAPTICS = 'qart.haptics.v1';
const K_MOTION = 'qart.motion.v1';

let hapticsOn = true;
let reduceMotion = false;

export async function loadPrefs() {
  try {
    const [h, m] = await Promise.all([
      AsyncStorage.getItem(K_HAPTICS),
      AsyncStorage.getItem(K_MOTION),
    ]);
    if (h === '0') hapticsOn = false;
    if (m === '1') reduceMotion = true;
  } catch {}
  return { hapticsOn, reduceMotion };
}

export function isHapticsEnabled() {
  return hapticsOn;
}
export async function setHapticsEnabled(v: boolean) {
  hapticsOn = v;
  try {
    await AsyncStorage.setItem(K_HAPTICS, v ? '1' : '0');
  } catch {}
}

export function isReduceMotion() {
  return reduceMotion;
}
export async function setReduceMotion(v: boolean) {
  reduceMotion = v;
  try {
    await AsyncStorage.setItem(K_MOTION, v ? '1' : '0');
  } catch {}
}

// Haptics wrappers — no-op when disabled or on web. Use these everywhere instead
// of calling expo-haptics directly, so the toggle actually works.
export function hImpact(style: Haptics.ImpactFeedbackStyle) {
  if (!hapticsOn || Platform.OS === 'web') return;
  Haptics.impactAsync(style).catch(() => {});
}
export function hNotify(type: Haptics.NotificationFeedbackType) {
  if (!hapticsOn || Platform.OS === 'web') return;
  Haptics.notificationAsync(type).catch(() => {});
}

export { Haptics };

// Load saved prefs on first import.
loadPrefs();
