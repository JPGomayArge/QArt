#!/usr/bin/env node
// Audit every artwork: does it have a pixelated mosaic, and which info fields
// are filled (year, artist, technique, movement, country, museum, description)?
// Fully offline — reads the baked data files. Run it any time to verify:
//
//   node scripts/audit.mjs
//
// Prints a summary and writes scripts/audit.csv (open in Excel / Numbers).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

// Parse the artwork list (id, title, artist, rarity, collection, country).
const artSrc = read('src/data/artworks.ts');
const artworks = [];
const re =
  /\{ id: "((?:[^"\\]|\\.)*)", title: "((?:[^"\\]|\\.)*)"(?:, titleEn: "(?:(?:[^"\\]|\\.)*)")?, artist: "((?:[^"\\]|\\.)*)", rarity: "([a-z]+)", collectionId: "([^"]+)"(?:, [^}]*?country: "([^"]*)")?/g;
let m;
while ((m = re.exec(artSrc))) {
  artworks.push({
    id: JSON.parse(`"${m[1]}"`),
    title: JSON.parse(`"${m[2]}"`),
    artist: JSON.parse(`"${m[3]}"`),
    rarity: m[4],
    col: m[5],
    country: m[6] ? JSON.parse(`"${m[6]}"`) : '',
  });
}

const imgIds = new Set([...read('src/data/images.ts').matchAll(/^ {2}"([^"]+)":/gm)].map((x) => x[1]));
const mosaic = new Set();
for (const x of read('src/data/mosaics.ts').matchAll(/^ {2}"([^"]+)":\s*"(data:[^"]*)"/gm)) mosaic.add(x[1]);

const details = {};
for (const x of read('src/data/details.ts').matchAll(/^ {2}"([^"]+)":\s*(\{.*\}),\s*$/gm)) {
  try {
    details[x[1]] = JSON.parse(x[2]);
  } catch {}
}

// Curated per-artist fallback (fills movement/country the app shows even when
// Wikidata lacks them).
const artistInfo = {};
for (const x of read('src/data/artistInfo.ts').matchAll(/^ {2}'([^']+)':\s*\{([^}]*)\}/gm)) {
  artistInfo[x[1]] = { country: /country:/.test(x[2]), movement: /movement:/.test(x[2]) };
}

// Curated per-artwork fallback (year / technique / museum / about).
const detailInfo = {};
for (const x of read('src/data/detailInfo.ts').matchAll(/^ {2}'([^']+)':\s*\{([^}]*)\}/gm)) {
  detailInfo[x[1]] = {
    year: /year:/.test(x[2]),
    technique: /technique:/.test(x[2]),
    museum: /museum:/.test(x[2]),
    about: /about:/.test(x[2]),
  };
}

const FIELDS = ['year', 'technique', 'movement', 'country', 'museum', 'about'];
const missCount = Object.fromEntries(FIELDS.map((f) => [f, 0]));
let noImg = 0;
let noMos = 0;

const esc = (s) => `"${String(s ?? '').replace(/"/g, '""')}"`;
const lines = [
  ['id', 'collection', 'title', 'artist', 'rarity', 'mosaic', 'year', 'technique', 'movement', 'country', 'museum', 'aboutLen', 'missing'].join(','),
];

for (const a of artworks) {
  const d = details[a.id] || {};
  const ai = artistInfo[a.artist] || {};
  const dz = detailInfo[a.id] || {};
  const country = a.country || d.country || (ai.country ? 'fallback' : '');
  const has = {
    year: !!d.year || !!dz.year,
    technique: !!d.technique || !!dz.technique,
    movement: !!d.movement || !!ai.movement,
    country: !!country,
    museum: !!d.museum || !!dz.museum,
    about: (!!d.about && d.about.length >= 250) || !!dz.about,
  };
  const missing = FIELDS.filter((f) => !has[f]);
  for (const f of missing) missCount[f]++;
  if (!imgIds.has(a.id)) noImg++;
  const mos = mosaic.has(a.id);
  if (!mos) noMos++;
  lines.push(
    [a.id, a.col, a.title, a.artist, a.rarity, mos ? 'yes' : 'NO', d.year || '', d.technique || '', d.movement || '', country, d.museum || '', d.about ? d.about.length : 0, missing.join(' ')]
      .map(esc)
      .join(',')
  );
}

fs.writeFileSync(path.join(root, 'scripts/audit.csv'), lines.join('\n'), 'utf8');

console.log(`Artworks: ${artworks.length}`);
console.log(`  without image:  ${noImg}`);
console.log(`  without mosaic (pixelation): ${noMos}`);
console.log('  missing info fields:');
for (const f of FIELDS) console.log(`    ${f.padEnd(10)} ${missCount[f]}`);
console.log('\nWrote scripts/audit.csv');
