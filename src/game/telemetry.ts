// Lightweight, LOCAL telemetry. It records aggregates on-device so you (the dev)
// can see what's being engaged with while testing — which museum links get
// tapped, which special codes get found, where reveals come from, and (combined
// with the collection) which pieces have never appeared.
//
// IMPORTANT: this is per-device only. To gather this ACROSS users for planning
// expansions you need an analytics backend (PostHog, Firebase, Amplitude…). The
// `track()` calls below are the instrumentation points — wiring a real service
// later is just a matter of forwarding them from here (and adding a privacy
// policy + network access).

import AsyncStorage from '@react-native-async-storage/async-storage';

import { captureAnalytics } from '@/game/analytics';

declare const __DEV__: boolean;

const KEY = 'qart.telemetry.v1';

export type Telemetry = {
  events: number;
  museumOpens: Record<string, number>;
  specialHits: Record<string, number>;
  revealsBySource: Record<string, number>;
};

let agg: Telemetry = { events: 0, museumOpens: {}, specialHits: {}, revealsBySource: {} };

function persist() {
  AsyncStorage.setItem(KEY, JSON.stringify(agg)).catch(() => {});
}

export async function loadTelemetry(): Promise<Telemetry> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (raw) agg = { ...agg, ...JSON.parse(raw) };
  } catch {}
  return agg;
}

export function getTelemetry(): Telemetry {
  return agg;
}

export function track(event: string, props: Record<string, any> = {}) {
  agg.events += 1;
  if (event === 'museum_open' && props.museum)
    agg.museumOpens[props.museum] = (agg.museumOpens[props.museum] ?? 0) + 1;
  if (event === 'special' && props.id)
    agg.specialHits[props.id] = (agg.specialHits[props.id] ?? 0) + 1;
  if (event === 'reveal' && props.source)
    agg.revealsBySource[props.source] = (agg.revealsBySource[props.source] ?? 0) + 1;
  if (typeof __DEV__ !== 'undefined' && __DEV__) console.log('[track]', event, props);
  persist();
  // Cross-user analytics (PostHog) — no-op unless configured + opted in.
  captureAnalytics(event, props);
}

loadTelemetry();
