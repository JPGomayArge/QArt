// Resolve a public-domain image for an artwork, on-device.
//
//   1) Baked map (src/data/images.ts) — verified Wikimedia Commons URLs.
//   2) Persistent cache from a previous resolution.
//   3) Live: search Wikipedia for "<title> <artist>", read each result's
//      Wikidata item, confirm the CREATOR's name matches the artist, then use
//      that article's image. Copyrighted works have no free image and resolve
//      to nothing (placeholder). We never take an image without a creator match,
//      so we don't pull an unrelated or non-free picture.

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Artwork } from '@/data/artworks';
import { ARTWORK_IMAGES } from '@/data/images';

const memCache = new Map<string, string | null>();
const CACHE_PREFIX = 'arthunt.img.';

/**
 * Rewrite a Commons URL to a specific width. Originals are often 10–40 MB,
 * which is why pieces sometimes never appeared; serving a sized thumbnail makes
 * them load fast and lets us cache the whole catalog on the device.
 */
export function sizedUrl(url: string, w: number): string {
  if (!url) return url;
  if (url.includes('Special:FilePath/')) return url.replace(/\?.*$/, '') + `?width=${w}`;
  const m = url.match(/upload\.wikimedia\.org\/wikipedia\/commons\/(?:thumb\/)?[0-9a-f]\/[0-9a-f]{2}\/([^/?]+)/);
  if (m) return `https://commons.wikimedia.org/wiki/Special:FilePath/${m[1]}?width=${w}`;
  return url;
}

export const IMG_HIDDEN = 32; // low-res teaser for undiscovered pieces
export const IMG_CARD = 400; // grids / thumbnails
export const IMG_DETAIL = 900; // detail hero & reveal
export const IMG_FULL = 1280; // fullscreen viewer (Commons serves this reliably even for huge files)

const PARTICLES = new Set([
  'de', 'del', 'la', 'el', 'da', 'di', 'van', 'der', 'von', 'the', 'il', 'los',
  'las', 'y', 'e', 'of', 'san', 'santa', 'con', 'una', 'para',
]);
const GENERIC = new Set([
  'retrato', 'autorretrato', 'portrait', 'virgen', 'madonna', 'dama', 'mujer',
  'hombre', 'nino', 'niña', 'retablo', 'composicion', 'composición', 'naturaleza',
  'muerta', 'paisaje', 'sagrada', 'familia', 'anunciacion', 'anunciación',
  'crucifixion', 'crucifixión', 'adoracion', 'adoración', 'venus', 'cristo',
  'estudio', 'boceto', 'vista', 'escena', 'joven', 'dios', 'diosa',
]);
const tokensOf = (s: string, min: number) =>
  s.toLowerCase().replace(/[.,;:()]/g, ' ').split(/\s+/).filter((w) => w.length >= min && !PARTICLES.has(w));
const baseTitle = (t: string) => {
  const m = t.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  return (m ? m[1] : t).trim();
};

async function getJson(url: string): Promise<any | null> {
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

type Cand = { title: string; lang: string; image: string | null; item: string | null };

async function wikiSearch(lang: string, query: string): Promise<Cand[]> {
  const url =
    `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&redirects=1` +
    `&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=${encodeURIComponent(query)}` +
    `&prop=pageimages%7Cpageprops&ppprop=wikibase_item&piprop=original%7Cthumbnail&pithumbsize=1200&pilimit=max`;
  const pages = (await getJson(url))?.query?.pages;
  if (!pages) return [];
  return (Object.values(pages) as any[])
    .sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
    .map((p) => ({
      title: p.title as string,
      lang,
      image: (p.original?.source || p.thumbnail?.source || null) as string | null,
      item: (p.pageprops?.wikibase_item || null) as string | null,
    }));
}

async function wbEntities(ids: string[]): Promise<any> {
  if (ids.length === 0) return {};
  const url =
    `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&origin=*` +
    `&props=claims&ids=${ids.join('|')}`;
  return (await getJson(url))?.entities ?? {};
}

async function labelsFor(qids: string[]): Promise<Record<string, string>> {
  const ids = [...new Set(qids)].filter(Boolean);
  if (ids.length === 0) return {};
  const url =
    `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&origin=*` +
    `&props=labels&languages=es|en&ids=${ids.join('|')}`;
  const ents = (await getJson(url))?.entities ?? {};
  const out: Record<string, string> = {};
  for (const q of ids) {
    const lb = ents[q]?.labels;
    out[q] = lb?.es?.value || lb?.en?.value || '';
  }
  return out;
}

async function wikiLeadImage(lang: string, title: string): Promise<string | null> {
  const url =
    `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&redirects=1` +
    `&prop=pageimages&piprop=original%7Cthumbnail&pithumbsize=1200&pilimit=max&titles=${encodeURIComponent(title)}`;
  const pages = (await getJson(url))?.query?.pages;
  if (!pages) return null;
  const p: any = Object.values(pages)[0];
  return p?.original?.source || p?.thumbnail?.source || null;
}

const commonsUrl = (f: string) =>
  'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(f.replace(/ /g, '_')) + '?width=1200';
const creatorsOf = (ent: any): string[] =>
  (ent?.claims?.P170 ?? []).map((c: any) => c?.mainsnak?.datavalue?.value?.id).filter(Boolean);

async function resolveLive(art: Artwork): Promise<string | null> {
  const aTokens = tokensOf(art.artist, 3);
  const tTokens = tokensOf(baseTitle(art.title), 4).filter((w) => !GENERIC.has(w));

  const queries: Array<[string, string]> = [
    ['es', `${art.title} ${art.artist}`],
    ['es', `${baseTitle(art.title)} ${art.artist}`],
  ];
  if (art.titleEn) queries.push(['en', `${art.titleEn} ${art.artist}`]);

  const cands: Cand[] = [];
  const seen = new Set<string>();
  for (const [lang, q] of queries) {
    for (const r of await wikiSearch(lang, q)) {
      const k = lang + '|' + r.title;
      if (!seen.has(k)) {
        seen.add(k);
        cands.push(r);
      }
    }
  }
  if (cands.length === 0) return null;

  const items = [...new Set(cands.map((c) => c.item).filter(Boolean))] as string[];
  const ents = await wbEntities(items);
  const creatorQs: string[] = [];
  for (const q of items) creatorQs.push(...creatorsOf(ents[q]));
  const creatorLabels = await labelsFor(creatorQs);

  const creatorMatch = (item: string) =>
    creatorsOf(ents[item]).some((cid) => {
      const lb = (creatorLabels[cid] || '').toLowerCase();
      return aTokens.some((t) => lb.includes(t));
    });
  const hasCreator = (item: string) => creatorsOf(ents[item]).length > 0;
  const titleOverlap = (title: string) => tTokens.some((t) => title.toLowerCase().includes(t));

  // Pass 1: creator matches + article has an image.
  for (const c of cands) if (c.item && c.image && creatorMatch(c.item)) return c.image;
  // Pass 2: creator matches; image from Commons P18 or article lead.
  for (const c of cands) {
    if (c.item && creatorMatch(c.item)) {
      const f = ents[c.item]?.claims?.P18?.[0]?.mainsnak?.datavalue?.value;
      const img = f ? commonsUrl(f) : c.image || (await wikiLeadImage(c.lang, c.title));
      if (img) return img;
    }
  }
  // Pass 3: it's an artwork (has a creator) whose title overlaps + has image.
  for (const c of cands) if (c.item && c.image && hasCreator(c.item) && titleOverlap(c.title)) return c.image;
  return null;
}

export async function resolveArtworkImage(art: Artwork): Promise<string | null> {
  const baked = ARTWORK_IMAGES[art.id];
  if (baked) return baked;

  if (memCache.has(art.id)) return memCache.get(art.id) ?? null;

  try {
    const cached = await AsyncStorage.getItem(CACHE_PREFIX + art.id);
    if (cached !== null) {
      const val = cached === '' ? null : cached;
      memCache.set(art.id, val);
      return val;
    }
  } catch {
    // ignore
  }

  const found = await resolveLive(art);
  memCache.set(art.id, found);
  try {
    if (found) await AsyncStorage.setItem(CACHE_PREFIX + art.id, found);
  } catch {
    // ignore
  }
  return found;
}
