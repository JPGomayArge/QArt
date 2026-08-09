// Display order & numbering are decoupled from the internal ids (col-1…col-6),
// which stay fixed so saved collections and all per-artwork data keep working.
// The array order below is the order shown in the app; `roman`/`full` label them.
// `name`/`full` stay in the base language (Spanish); localized names live in
// COLLECTION_NAMES and are resolved with collectionName()/collectionFull().

import type { Locale } from '@/i18n';

export type CollectionMeta = { id: string; roman: string; name: string; full: string; };

export const COLLECTIONS: CollectionMeta[] = [
  { id: "col-1", roman: "I", name: "El Renacer del Mundo", full: "Colección I — El Renacer del Mundo" },
  { id: "col-3", roman: "II", name: "Poder y Claroscuro", full: "Colección II — Poder y Claroscuro" },
  { id: "col-2", roman: "III", name: "Luz y Color (Impresionismo y Postimpresionismo)", full: "Colección III — Luz y Color (Impresionismo y Postimpresionismo)" },
  { id: "col-5", roman: "IV", name: "Ruptura y Vanguardia", full: "Colección IV — Ruptura y Vanguardia" },
  { id: "col-4", roman: "V", name: "El Mundo Contemplado", full: "Colección V — El Mundo Contemplado" },
  { id: "col-6", roman: "VI", name: "Around the World", full: "Colección VI — Around the World" },
];

export const COLLECTION_BY_ID: Record<string, CollectionMeta> =
  Object.fromEntries(COLLECTIONS.map((c) => [c.id, c]));

// Per-locale display names, keyed by collection id.
const COLLECTION_NAMES: Record<string, Record<Locale, string>> = {
  'col-1': {
    en: 'The Rebirth of the World', es: 'El Renacer del Mundo', fr: 'La Renaissance du monde',
    it: 'La Rinascita del mondo', pt: 'O Renascer do Mundo', de: 'Die Wiedergeburt der Welt',
  },
  'col-3': {
    en: 'Power and Chiaroscuro', es: 'Poder y Claroscuro', fr: 'Pouvoir et clair-obscur',
    it: 'Potere e chiaroscuro', pt: 'Poder e Claro-escuro', de: 'Macht und Helldunkel',
  },
  'col-2': {
    en: 'Light and Colour (Impressionism & Post-Impressionism)',
    es: 'Luz y Color (Impresionismo y Postimpresionismo)',
    fr: 'Lumière et couleur (impressionnisme et postimpressionnisme)',
    it: 'Luce e colore (impressionismo e postimpressionismo)',
    pt: 'Luz e Cor (Impressionismo e Pós-Impressionismo)',
    de: 'Licht und Farbe (Impressionismus und Postimpressionismus)',
  },
  'col-5': {
    en: 'Rupture and the Avant-Garde', es: 'Ruptura y Vanguardia', fr: 'Rupture et avant-garde',
    it: 'Rottura e avanguardia', pt: 'Ruptura e Vanguarda', de: 'Bruch und Avantgarde',
  },
  'col-4': {
    en: 'The Contemplated World', es: 'El Mundo Contemplado', fr: 'Le Monde contemplé',
    it: 'Il mondo contemplato', pt: 'O Mundo Contemplado', de: 'Die betrachtete Welt',
  },
  'col-6': {
    en: 'Around the World', es: 'Alrededor del mundo', fr: 'Autour du monde',
    it: 'Intorno al mondo', pt: 'Ao Redor do Mundo', de: 'Rund um die Welt',
  },
};

const COLLECTION_WORD: Record<Locale, string> = {
  en: 'Collection', es: 'Colección', fr: 'Collection', it: 'Collezione', pt: 'Coleção', de: 'Sammlung',
};

/** Localized short name, e.g. "The Rebirth of the World". Falls back to base. */
export function collectionName(id: string, locale: Locale): string {
  return COLLECTION_NAMES[id]?.[locale] ?? COLLECTION_BY_ID[id]?.name ?? '';
}

/** Localized full label, e.g. "Collection I — The Rebirth of the World". */
export function collectionFull(id: string, locale: Locale): string {
  const meta = COLLECTION_BY_ID[id];
  if (!meta) return '';
  return `${COLLECTION_WORD[locale]} ${meta.roman} — ${collectionName(id, locale)}`;
}
