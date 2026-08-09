#!/usr/bin/env node
/**
 * Bake verified public-domain images AND metadata/descriptions for every
 * artwork into src/data/images.ts and src/data/details.ts.
 *
 *   node scripts/fetch-images.mjs
 *
 * Strategy (high recall + correct):
 *   1) Search Wikipedia ARTICLES for "<title> <artist>" (es, then en) — this
 *      finds the piece even when its Wikidata label isn't Spanish.
 *   2) For each result, read its Wikidata item id and confirm the CREATOR's
 *      name matches the artist (by name, not by a fragile id lookup).
 *   3) Take the article's lead image (or the item's Commons P18) + metadata
 *      (year/movement/technique/country/museum) + a 2-paragraph Wikipedia
 *      extract (CC BY-SA, attributed).
 *
 * Copyright-safe: images come only from Wikimedia Commons (free). Works still
 * under copyright have no free image and stay on the in-app placeholder.
 *
 * Safe to re-run: MERGES; only processes artworks still missing an image.
 * Requires Node 18+ (global fetch). No dependencies.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { IMAGE_OVERRIDES } from './overrides.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const ARTWORKS_TS = path.join(root, 'src/data/artworks.ts');
const IMAGES_TS = path.join(root, 'src/data/images.ts');
const DETAILS_TS = path.join(root, 'src/data/details.ts');

const UA = 'QArt/1.0 (personal art-collecting app; educational use)';
const DELAY_MS = 350; // gentler pacing to avoid sustained rate-limiting
const MAX_RETRIES = 6;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Adaptive cooldown: after repeated rate-limit hits, back off harder so the
// rest of the run doesn't collapse into all-misses.
let rateLimitStreak = 0;

const PARTICLES = new Set([
  'de', 'del', 'la', 'el', 'da', 'di', 'van', 'der', 'von', 'the', 'il', 'los',
  'las', 'y', 'e', 'joven', 'viejo', 'of', "d'", 'le', 'san', 'santa', 'con',
  'sin', 'una', 'las', 'los', 'para',
]);

// --- parse catalog + existing baked data ---------------------------------
function loadArtworks() {
  const src = fs.readFileSync(ARTWORKS_TS, 'utf8');
  const re = /\{ id: "((?:[^"\\]|\\.)*)", title: "((?:[^"\\]|\\.)*)"(?:, titleEn: "((?:[^"\\]|\\.)*)")?, artist: "((?:[^"\\]|\\.)*)"/g;
  const out = [];
  let m;
  while ((m = re.exec(src))) {
    out.push({
      id: JSON.parse(`"${m[1]}"`),
      title: JSON.parse(`"${m[2]}"`),
      titleEn: m[3] ? JSON.parse(`"${m[3]}"`) : undefined,
      artist: JSON.parse(`"${m[4]}"`),
    });
  }
  return out;
}
function loadKV(file) {
  if (!fs.existsSync(file)) return {};
  const map = {};
  const re = /"([^"]+)":\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(fs.readFileSync(file, 'utf8')))) map[m[1]] = m[2];
  return map;
}
function loadDetailObjects(file) {
  if (!fs.existsSync(file)) return {};
  const src = fs.readFileSync(file, 'utf8');
  const i = src.indexOf('ARTWORK_DETAILS: Record<string, ArtworkDetail> = {');
  if (i < 0) return {};
  const body = src.slice(src.indexOf('{', i) + 1);
  const map = {};
  const re = /^\s{2}"([^"]+)":\s*(\{.*\}),\s*$/gm;
  let m;
  while ((m = re.exec(body))) {
    try { map[m[1]] = JSON.parse(m[2]); } catch {}
  }
  return map;
}

const baseTitle = (t) => {
  const m = t.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  return (m ? m[1] : t).trim();
};
// Generic art words that must NOT count as a distinctive title match in the
// loose pass (otherwise "Retrato de X" grabs any other portrait, etc.).
const GENERIC = new Set([
  'retrato', 'autorretrato', 'portrait', 'virgen', 'madonna', 'dama', 'mujer',
  'hombre', 'nino', 'niña', 'retablo', 'composicion', 'composición', 'naturaleza',
  'muerta', 'paisaje', 'sagrada', 'familia', 'anunciacion', 'anunciación',
  'crucifixion', 'crucifixión', 'adoracion', 'adoración', 'venus', 'cristo',
  'estudio', 'boceto', 'vista', 'escena', 'joven', 'dios', 'diosa',
]);
const tokensOf = (s, min) =>
  s.toLowerCase().replace(/[.,;:()]/g, ' ').split(/\s+/).filter((w) => w.length >= min && !PARTICLES.has(w));
const artistTokens = (a) => tokensOf(a, 3);
const titleTokens = (t) => tokensOf(baseTitle(t), 4).filter((w) => !GENERIC.has(w));
const norm = (s) =>
  (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();

async function getJson(url) {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' } });
      if (res.status === 429 || res.status === 503) {
        rateLimitStreak++;
        // Escalating backoff; if we're clearly throttled, pause much longer.
        const wait = Math.min(1200 * (attempt + 1), 6000) + (rateLimitStreak > 5 ? 20000 : 0);
        await sleep(wait);
        continue;
      }
      rateLimitStreak = Math.max(0, rateLimitStreak - 1);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      await sleep(700 * (attempt + 1));
    }
  }
  return null;
}

// Search Wikipedia articles; return [{title, lang, image, item}] by relevance.
async function wikiSearch(lang, query) {
  const url =
    `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&redirects=1` +
    `&generator=search&gsrnamespace=0&gsrlimit=8&gsrsearch=${encodeURIComponent(query)}` +
    `&prop=pageimages|pageprops&ppprop=wikibase_item&piprop=original|thumbnail&pithumbsize=1400&pilimit=max`;
  const pages = (await getJson(url))?.query?.pages;
  if (!pages) return [];
  return Object.values(pages)
    .sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
    .map((p) => ({
      title: p.title,
      lang,
      image: p.original?.source || p.thumbnail?.source || null,
      item: p.pageprops?.wikibase_item || null,
    }));
}

async function wbEntities(ids) {
  if (ids.length === 0) return {};
  const out = {};
  for (let i = 0; i < ids.length; i += 45) {
    const chunk = ids.slice(i, i + 45);
    const url =
      `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json` +
      `&props=claims|labels|sitelinks&languages=es|en&sitefilter=eswiki|enwiki&ids=${chunk.join('|')}`;
    Object.assign(out, (await getJson(url))?.entities ?? {});
    await sleep(DELAY_MS);
  }
  return out;
}

// Search Wikidata ITEMS directly (finds artworks that have a Commons image but
// no Wikipedia article of their own — common for 19th-c. Latin American and
// East-Asian works). Returns candidate QIDs by relevance.
async function wbSearch(query, lang) {
  if (!query) return [];
  const url =
    `https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&type=item` +
    `&limit=10&language=${lang}&uselang=${lang}&search=${encodeURIComponent(query)}`;
  const r = await getJson(url);
  return (r?.search ?? []).map((s) => s.id).filter(Boolean);
}

const labelCache = new Map();
async function labelsFor(qids) {
  const need = [...new Set(qids)].filter((q) => q && !labelCache.has(q));
  for (let i = 0; i < need.length; i += 45) {
    const chunk = need.slice(i, i + 45);
    const url =
      `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&props=labels&languages=es|en&ids=${chunk.join('|')}`;
    const ents = (await getJson(url))?.entities ?? {};
    for (const q of chunk) {
      const lb = ents[q]?.labels;
      labelCache.set(q, lb?.es?.value || lb?.en?.value || null);
    }
    await sleep(DELAY_MS);
  }
  const out = {};
  for (const q of qids) if (q) out[q] = labelCache.get(q) ?? null;
  return out;
}

const commonsUrl = (f) =>
  'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(f.replace(/ /g, '_')) + '?width=1400';
const claimIds = (ent, prop) =>
  (ent?.claims?.[prop] ?? []).map((c) => c?.mainsnak?.datavalue?.value?.id).filter(Boolean);
// String-valued claims (e.g. P856 official website) hold a plain string.
const claimStrings = (ent, prop) =>
  (ent?.claims?.[prop] ?? [])
    .map((c) => c?.mainsnak?.datavalue?.value)
    .filter((v) => typeof v === 'string');
function inceptionYear(ent) {
  const t = ent?.claims?.P571?.[0]?.mainsnak?.datavalue?.value?.time;
  const m = t && t.match(/^[+-](\d{4})/);
  return m ? m[1] : undefined;
}
async function wikiLeadImage(lang, title) {
  const url =
    `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&redirects=1` +
    `&prop=pageimages&piprop=original|thumbnail&pithumbsize=1400&pilimit=max&titles=${encodeURIComponent(title)}`;
  const pages = (await getJson(url))?.query?.pages;
  if (!pages) return null;
  const p = Object.values(pages)[0];
  return p?.original?.source || p?.thumbnail?.source || null;
}
async function wikipediaExtract(lang, title) {
  // exintro alone often returns just one short sentence; pull the fuller plain
  // text and keep the first few paragraphs, cut cleanly at a sentence end.
  const url =
    `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&redirects=1` +
    `&prop=extracts&explaintext=1&exsectionformat=plain&titles=${encodeURIComponent(title)}`;
  const pages = (await getJson(url))?.query?.pages;
  if (!pages) return null;
  let text = Object.values(pages)[0]?.extract;
  if (!text) return null;
  // Keep only the lead (before the first "== Section ==" heading).
  const headingAt = text.search(/\n={2,}/);
  if (headingAt > 0) text = text.slice(0, headingAt);
  const paras = text.split('\n').map((p) => p.trim()).filter(Boolean);
  // Keep the first three FULL paragraphs of the lead. Only a generous safety cap
  // trims (on a sentence boundary) so it never cuts mid-word.
  text = paras.slice(0, 3).join('\n\n');
  const CAP = 2800;
  if (text.length > CAP) {
    const cut = text.slice(0, CAP);
    const stop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('.\n'), cut.lastIndexOf('。'));
    text = stop > CAP * 0.5 ? cut.slice(0, stop + 1) : cut.replace(/\s+\S*$/, '') + '…';
  }
  return { about: text, aboutUrl: `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}` };
}

async function build(art) {
  const aTokens = artistTokens(art.artist);
  const tTokens = titleTokens(art.title);

  const queries = [
    ['es', `${art.title} ${art.artist}`],
    ['es', `${baseTitle(art.title)} ${art.artist}`],
  ];
  if (art.titleEn) queries.push(['en', `${art.titleEn} ${art.artist}`]);

  const cands = [];
  const seen = new Set();
  for (const [lang, q] of queries) {
    for (const r of await wikiSearch(lang, q)) {
      const k = lang + '|' + r.title;
      if (!seen.has(k)) { seen.add(k); cands.push(r); }
    }
    await sleep(DELAY_MS);
  }

  // Direct Wikidata search — catches artworks with no Wikipedia article. We try
  // the title in several languages since col-6 keeps titles in their original
  // tongue (Portuguese, Spanish, Japanese romaji, English).
  const wdIds = new Set();
  const wdQueries = [
    ['es', baseTitle(art.title)],
    ['en', art.titleEn || baseTitle(art.title)],
    ['pt', baseTitle(art.title)],
  ];
  for (const [lang, q] of wdQueries) {
    for (const id of await wbSearch(q, lang)) wdIds.add(id);
    await sleep(DELAY_MS);
  }

  if (cands.length === 0 && wdIds.size === 0) return null;

  const items = [...new Set([...cands.map((c) => c.item).filter(Boolean), ...wdIds])];
  const ents = await wbEntities(items);

  // Add Wikidata-only hits as candidates, using their label as the title.
  const wikiItems = new Set(cands.map((c) => c.item).filter(Boolean));
  for (const id of wdIds) {
    if (wikiItems.has(id)) continue;
    const e = ents[id];
    const label = e?.labels?.es?.value || e?.labels?.en?.value || '';
    cands.push({ title: label, lang: 'es', image: null, item: id });
  }

  // Resolve creator labels for all candidate items.
  const creatorQs = [];
  for (const q of items) for (const cid of claimIds(ents[q], 'P170')) creatorQs.push(cid);
  const creatorLabels = await labelsFor(creatorQs);
  // Accent/case-insensitive: match if a distinctive artist token (>=4 chars, e.g.
  // a surname) appears in the creator label, or two tokens do.
  const aNorm = norm(art.artist).split(' ').filter((w) => w.length >= 3);
  const creatorMatch = (item) =>
    claimIds(ents[item], 'P170').some((cid) => {
      const lb = norm(creatorLabels[cid] || '');
      if (!lb) return false;
      const hits = aNorm.filter((t) => lb.includes(t)).length;
      return aNorm.some((t) => t.length >= 4 && lb.includes(t)) || hits >= 2;
    });
  const hasCreator = (item) => claimIds(ents[item], 'P170').length > 0;
  const titleOverlap = (title) => tTokens.some((t) => title.toLowerCase().includes(t));

  let winner = null;
  // Pass 1: creator matches + article already has an image.
  for (const c of cands) if (c.item && c.image && creatorMatch(c.item)) { winner = c; break; }
  // Pass 2: creator matches; image from Commons P18 or the article lead.
  if (!winner) {
    for (const c of cands) {
      if (c.item && creatorMatch(c.item)) {
        const f = ents[c.item]?.claims?.P18?.[0]?.mainsnak?.datavalue?.value;
        const img = f ? commonsUrl(f) : c.image || (await wikiLeadImage(c.lang, c.title));
        if (img) { winner = { ...c, image: img }; break; }
      }
    }
  }
  // Pass 3: it's an artwork (has a creator) whose title overlaps + has image.
  if (!winner) {
    for (const c of cands) if (c.item && c.image && hasCreator(c.item) && titleOverlap(c.title)) { winner = c; break; }
  }
  // Pass 4: exact title match to a real artwork (covers accent/label misses).
  if (!winner) {
    const targets = [norm(baseTitle(art.title)), art.titleEn ? norm(art.titleEn) : ''].filter(Boolean);
    for (const c of cands) if (c.item && c.image && hasCreator(c.item) && targets.includes(norm(c.title))) { winner = c; break; }
  }
  // Pass 5: a Wikidata item whose LABEL exactly matches our title and that has a
  // Commons image (P18). Safe even when the creator label didn't line up.
  if (!winner) {
    const targets = [norm(baseTitle(art.title)), art.titleEn ? norm(art.titleEn) : ''].filter(Boolean);
    for (const c of cands) {
      if (!c.item) continue;
      const e = ents[c.item];
      const label = norm(e?.labels?.es?.value || e?.labels?.en?.value || c.title);
      const f = e?.claims?.P18?.[0]?.mainsnak?.datavalue?.value;
      if (f && targets.includes(label)) { winner = { ...c, image: commonsUrl(f) }; break; }
    }
  }
  if (!winner) return null;

  const ent = winner.item ? ents[winner.item] : null;
  const movementQ = ent ? claimIds(ent, 'P135')[0] : undefined;
  const techQ = ent ? claimIds(ent, 'P186') : [];
  // For an artwork, "country of origin" is P495; P17 is a fallback.
  const countryQ = ent ? claimIds(ent, 'P495')[0] || claimIds(ent, 'P17')[0] : undefined;
  // P195 (collection/institution) is the museum. P276 (location) is often just
  // the ROOM ("Salle des États", "Room 700"), so only fall back to it — and if
  // it turns out to be a room, walk up to its parent institution below.
  let museumQ = ent ? claimIds(ent, 'P195')[0] || claimIds(ent, 'P276')[0] : undefined;
  const labels = await labelsFor([movementQ, ...techQ, countryQ, museumQ].filter(Boolean));

  // Resolve the museum itself: its official site, its city and its country.
  let museumUrl, museumCity, museumCountry, museumOfficial;
  if (museumQ) {
    let mEnt = (await wbEntities([museumQ]))[museumQ];
    await sleep(DELAY_MS);

    // If we landed on a room/gallery (no Wikipedia page of its own), climb to
    // the institution it's part of (P361 "part of" / P276 "located in").
    const looksLikeRoom = (e) => !e?.sitelinks?.eswiki && !e?.sitelinks?.enwiki;
    for (let hop = 0; hop < 2 && mEnt && looksLikeRoom(mEnt); hop++) {
      const parentQ = claimIds(mEnt, 'P361')[0] || claimIds(mEnt, 'P276')[0];
      if (!parentQ) break;
      const parent = (await wbEntities([parentQ]))[parentQ];
      await sleep(DELAY_MS);
      if (!parent) break;
      museumQ = parentQ;
      mEnt = parent;
    }
    // Re-read the label for whatever entity we ended on.
    const nameMap = await labelsFor([museumQ]);
    labels[museumQ] = nameMap[museumQ] ?? labels[museumQ];
    // Prefer the museum's OWN website (Wikidata P856); Wikipedia is the fallback
    // so a museum without a registered site still gets a working link.
    const official = claimStrings(mEnt, 'P856').find((u) => /^https?:\/\//i.test(u));
    const es = mEnt?.sitelinks?.eswiki?.title;
    const en = mEnt?.sitelinks?.enwiki?.title;
    if (official) museumUrl = official;
    else if (es) museumUrl = `https://es.wikipedia.org/wiki/${encodeURIComponent(es.replace(/ /g, '_'))}`;
    else if (en) museumUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(en.replace(/ /g, '_'))}`;
    museumOfficial = !!official;
    const cityQ = claimIds(mEnt, 'P131')[0];
    const ctryQ = claimIds(mEnt, 'P17')[0];
    const mLabels = await labelsFor([cityQ, ctryQ].filter(Boolean));
    museumCity = cityQ ? mLabels[cityQ] || undefined : undefined;
    museumCountry = ctryQ ? mLabels[ctryQ] || undefined : undefined;
  }

  const detail = {
    titleEn: art.titleEn || ent?.labels?.en?.value || undefined,
    year: ent ? inceptionYear(ent) : undefined,
    movement: movementQ ? labels[movementQ] || undefined : undefined,
    technique: techQ.map((q) => labels[q]).filter(Boolean).join(', ') || undefined,
    country: countryQ ? labels[countryQ] || undefined : undefined,
    museum: museumQ ? labels[museumQ] || undefined : undefined,
    museumUrl,
    // true = museumUrl is the museum's own site; false = we checked and fell
    // back to Wikipedia. Absent means "never checked" (triggers a re-run).
    museumOfficial: museumQ ? !!museumOfficial : undefined,
    museumCity,
    museumCountry,
  };
  const wp = await wikipediaExtract(winner.lang, winner.title);
  if (wp) { detail.about = wp.about; detail.aboutUrl = wp.aboutUrl; }

  return { image: winner.image, detail };
}

function writeImages(map) {
  const entries = Object.keys(map).sort().map((id) => `  ${JSON.stringify(id)}: ${JSON.stringify(map[id])},`).join('\n');
  fs.writeFileSync(
    IMAGES_TS,
    `// Baked, verified public-domain image URLs (Wikimedia Commons), keyed by
// artwork id. Generated by scripts/fetch-images.mjs — do not edit by hand.
// Matched via Wikipedia + Wikidata creator verification; only free Commons images.
// Copyrighted works have no entry and fall back to the in-app placeholder.

export const ARTWORK_IMAGES: Record<string, string> = {\n${entries}\n};\n`,
    'utf8'
  );
}
function writeDetails(map) {
  const entries = Object.keys(map).sort().map((id) => `  ${JSON.stringify(id)}: ${JSON.stringify(map[id])},`).join('\n');
  fs.writeFileSync(
    DETAILS_TS,
    `// Baked artwork metadata + descriptions, keyed by artwork id.
// Generated by scripts/fetch-images.mjs — do not edit by hand.
// Facts from Wikidata; "about" is a Wikipedia extract (CC BY-SA, attributed via aboutUrl).

export type ArtworkDetail = {
  titleEn?: string;
  year?: string;
  movement?: string;
  technique?: string;
  country?: string;
  museum?: string;
  museumUrl?: string;
  museumOfficial?: boolean;
  museumCity?: string;
  museumCountry?: string;
  about?: string;
  aboutUrl?: string;
};

export const ARTWORK_DETAILS: Record<string, ArtworkDetail> = {\n${entries}\n};\n`,
    'utf8'
  );
}

async function main() {
  const artworks = loadArtworks();
  const images = loadKV(IMAGES_TS);
  const details = loadDetailObjects(DETAILS_TS);
  // By default we ONLY process artworks that still lack an image, plus museums
  // that never got any link. The "upgrade every museum link to its official
  // website" pass is opt-in (it would otherwise re-fetch the whole catalog):
  //   REFRESH_MUSEUMS=1 node scripts/fetch-images.mjs
  const REFRESH_MUSEUMS = process.env.REFRESH_MUSEUMS === '1';
  // Opt-in: re-pull a fuller Wikipedia description (and metadata) for pieces whose
  // "about" text is missing or very short:  REFRESH_DETAILS=1 node scripts/fetch-images.mjs
  const REFRESH_DETAILS = process.env.REFRESH_DETAILS === '1';
  const needsMuseum = (id) => {
    const d = details[id];
    if (!d || !d.museum) return false;
    if (!d.museumUrl) return true; // never resolved a link at all
    return REFRESH_MUSEUMS && d.museumOfficial === undefined; // opt-in upgrade
  };
  // Hand-mapped Commons files win and are never overwritten by the resolver.
  let overridden = 0;
  for (const [id, file] of Object.entries(IMAGE_OVERRIDES)) {
    images[id] = commonsUrl(file);
    overridden++;
  }
  const overrideIds = new Set(Object.keys(IMAGE_OVERRIDES));
  const needsDetails = (id) => {
    if (!REFRESH_DETAILS) return false;
    const d = details[id];
    return !d || !d.about || d.about.length < 300;
  };

  // Override pieces keep their hand-mapped image, but when refreshing details we
  // still fetch their metadata/description (never overwriting the image).
  const todo = artworks.filter((a) =>
    overrideIds.has(a.id)
      ? needsDetails(a.id)
      : !images[a.id] || needsMuseum(a.id) || needsDetails(a.id)
  );

  console.log(
    `Catalog ${artworks.length} · with image ${Object.keys(images).length} · overrides ${overridden} · to do ${todo.length}\n`
  );
  if (todo.length === 0) { console.log('Every artwork already has an image.'); return; }

  const noImage = [];
  let done = 0;
  for (const art of todo) {
    const isOverride = overrideIds.has(art.id);
    try {
      const res = await build(art);
      if (res) {
        if (res.image && !isOverride) images[art.id] = res.image; // keep override images
        if (res.detail) details[art.id] = res.detail;
        if (!res.image && !isOverride) noImage.push(art);
      } else if (!isOverride) {
        noImage.push(art);
      }
    } catch {
      if (!isOverride) noImage.push(art);
    }
    done++;
    process.stdout.write(`  ${done}/${todo.length} processed (${noImage.length} still without a free image)\r`);
    if (done % 15 === 0) { writeImages(images); writeDetails(details); }
  }
  console.log('\n');
  writeImages(images);
  writeDetails(details);

  console.log(`Images ${Object.keys(images).length}/${artworks.length} · Details ${Object.keys(details).length}/${artworks.length}`);
  if (noImage.length) {
    console.log(`\n${noImage.length} without a free image (copyright is expected; PD ones can be retried):`);
    for (const a of noImage) console.log(`  - ${a.title} — ${a.artist}  [${a.id}]`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
