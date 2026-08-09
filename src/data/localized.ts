// Localized painting text, keyed by artwork id. Populated by the i18n fetch
// pipeline (Wikidata labels + Wikipedia extracts per language). Any field/lang
// that's missing falls back to the base (Spanish) catalog data, so the app works
// whether or not this file has been filled in yet.

import type { Locale } from '@/i18n';

type Loc = Partial<Record<Locale, string>>;
export type LocalizedEntry = {
  title?: Loc;
  about?: Loc;
  movement?: Loc;
  technique?: Loc;
  museum?: Loc;
  country?: Loc;
};

// Filled by scripts/fetch-i18n.mjs. Empty until then.
export const LOCALIZED: Record<string, LocalizedEntry> = {};

/** Localized value for a field, falling back to the base string. */
export function pick(
  id: string,
  field: keyof LocalizedEntry,
  locale: Locale,
  base?: string
): string | undefined {
  return LOCALIZED[id]?.[field]?.[locale] ?? base;
}
