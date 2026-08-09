# Art Hunt — Setup

Turn the world into an interactive museum. Scan any QR code, and its content is
reinterpreted (never opened) into a public-domain artwork for your collection.

## Run it (first time)

```bash
cd ArtHunt
npm install

# Make sure the native modules match Expo SDK 54 exactly:
npx expo install --fix

# Start (clears cache)
npx expo start -c
```

Then open **Expo Go** on your iPhone and scan the terminal QR.
This targets **Expo SDK 54**, which is the version the App Store build of
Expo Go runs — so it opens on the first try on a physical device.

> Camera QR scanning needs a real device (the iOS Simulator has no camera).
> On the Scan tab there's an **"Enter code manually"** option so you can test
> the full discover flow without a physical QR.

## Artwork images + metadata (public domain)

Everything visual and factual comes from **Wikimedia / Wikidata / Wikipedia**:

- Images: only free **Wikimedia Commons** files, matched via **Wikidata with
  creator verification** (we confirm the piece's author before using anything),
  so no wrong or non-free images.
- Metadata: year, movement, technique, country and museum come from **Wikidata**
  (factual data). The "about" paragraphs are a **Wikipedia extract (CC BY-SA)**,
  shown in-app with attribution.

**Copyright:** works whose author died fewer than ~70 years ago (Picasso, Dalí,
Magritte, Miró, Chagall…) are still protected — they have no free image and stay
on a stylized placeholder. That's intentional. Collection V was reworked to use
public-domain modernists (Klimt, Munch, Malevich, Kandinsky, Klee, Marc,
Boccioni, Matisse, Rousseau, Schiele, Mondrian) so every piece is showable.

Run this once (needs Node 18+, no dependencies) to bake images + metadata for
all 250 into `src/data/images.ts` and `src/data/details.ts`:

```bash
node scripts/fetch-images.mjs
```

It's gentle (paced + retries so Wikipedia won't rate-limit it) and MERGES with
what's already baked — safe to re-run to fill gaps. The app also resolves images
live on first view as a fallback, so most load even before you run it.

## What works offline

Your whole collection, duplicates, shards and trades live on-device
(AsyncStorage). Once images are baked (or cached after first view), everything
renders offline. Trading is fully in person (see below).

## Trading — in person, no Bluetooth, no internet

Bluetooth can't run inside Expo Go (it needs a native dev build). Instead,
Art Hunt trades **by QR, face to face**:

- **Give:** Trade tab → "Give away" → pick a spare → show its gift QR.
- **Receive:** the other person opens Trade → "Receive" (or the Scan tab) and
  scans it. The piece lands in their museum. Gift codes are checksum-validated,
  so a random QR can't be mistaken for a gift.

## Rarities (from ArtHunt1stWave.csv)

Common (150) · Rare (60) · Epic (25) · Legendary (10) · Unique (5).
A QR's SHA-256 hash picks a tier by weight (60 / 24 / 10 / 5 / 1 %), then a
piece within it. The same physical QR always reveals the same artwork.

## Known gaps / next steps

- Metadata (year, movement, technique, country, museum, about) is baked by
  `fetch-images.mjs` into `src/data/details.ts` and shown on the artwork page.
  Collection filters are still rarity / collection / owned-state; the new
  movement / country / technique fields can be turned into filters next.
- 5 collections shipped (the 6th + secret set can be added as an expansion).
- Copyrighted modern works (if any remain) show the placeholder by design.
