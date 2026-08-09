// PostHog forwarder for cross-user, anonymous product analytics. It is fully
// defensive: if the SDK isn't installed, the API key isn't set, or the user has
// opted out, every call is a silent no-op. All events are device-level and
// anonymous — no accounts, no personal data.
//
// SETUP
//   1) npx expo install posthog-react-native
//   2) Create a PostHog project (posthog.com — EU host recommended) and put the
//      project API key in a .env file at the repo root:
//         EXPO_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxxxxxxxxxxxxxxxxx
//         EXPO_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
//   3) Reload. Events start flowing (unless the user opts out in Settings).
//
// EXPO_PUBLIC_* vars are embedded client-side (the key is a public write-only
// ingest key, not a secret), so this is safe.

import AsyncStorage from '@react-native-async-storage/async-storage';

const OPTOUT_KEY = 'qart.analytics.v1';
const POSTHOG_API_KEY = process.env.EXPO_PUBLIC_POSTHOG_KEY ?? '';
const POSTHOG_HOST = process.env.EXPO_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com';

let enabled = true; // opt-out, defaults to on
let client: any = null;

function start() {
  if (!enabled || !POSTHOG_API_KEY || client) return;
  try {
    const mod = require('posthog-react-native');
    const PostHog = mod.default ?? mod.PostHog ?? mod;
    client = new PostHog(POSTHOG_API_KEY, { host: POSTHOG_HOST });
  } catch {
    client = null; // SDK not installed yet — stay a no-op
  }
}

function stop() {
  try {
    client?.optOut?.();
  } catch {}
  client = null;
}

export function isAnalyticsEnabled() {
  return enabled;
}

export async function setAnalyticsEnabled(v: boolean) {
  enabled = v;
  try {
    await AsyncStorage.setItem(OPTOUT_KEY, v ? '1' : '0');
  } catch {}
  if (v) start();
  else stop();
}

export async function loadAnalyticsPref() {
  try {
    const v = await AsyncStorage.getItem(OPTOUT_KEY);
    if (v === '0') enabled = false;
  } catch {}
  if (enabled) start();
  return enabled;
}

/** Forward a telemetry event to PostHog (no-op unless enabled + configured). */
export function captureAnalytics(event: string, props: Record<string, any> = {}) {
  if (!enabled || !client) return;
  try {
    client.capture(event, props);
  } catch {}
}

// Load opt-out state (and start the client) on first import.
loadAnalyticsPref();
