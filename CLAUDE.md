# Art Hunt

Scan QR codes in the real world; each is reinterpreted (never opened) into a
public-domain artwork you collect. A "Pokédex of art." Core loop: go out → find
a QR → scan → reveal → read its story → add to collection → exhibit → trade
spares → repeat.

## Stack

- Expo SDK 54 / RN 0.81.5, runs in App-Store Expo Go (dev on physical iPhone).
- expo-router (file-based, `app/`), TypeScript, English UI, no emojis,
  phosphor-react-native icons. Dark "museum at night" theme.
- State: `src/store/GameStore.tsx` React context, persisted to AsyncStorage
  (`arthunt.save.v1`). Offline-first.

## Layout

- `app/(tabs)/` — Scan (index), Collection, Discover, Trade.
- `app/reveal.tsx` — transparent-modal reveal after a discovery.
- `app/artwork/[id].tsx` — detail + story + Wikipedia link + spare→shards.
- `src/data/*` — AUTO-GENERATED from `ArtHunt1stWave.csv` (250 works, 5
  collections). Regenerate if the CSV changes; don't hand-edit.
- `src/game/hash.ts` — pure-JS SHA-256 + `qrToArtwork` (weighted-by-rarity,
  deterministic). `src/game/trade.ts` — QR gift encode/parse w/ checksum.
  `src/game/images.ts` — on-device Wikipedia image resolver + cache.

## Key decisions

- **Security:** QR payloads are hashed into a catalog index; we never navigate
  to their URL. A malicious QR is just a seed.
- **Rarity weights:** common .60 / rare .24 / epic .10 / legendary .05 /
  unique .01. Pools: 150/60/25/10/5. Verified distribution matches.
- **Trading = in-person QR**, not Bluetooth (BLE needs a dev build, breaks
  Expo Go). Bluetooth reserved for a future dev-client build.
- **Booster economy:** spare duplicates → shards (by rarity value); 20 shards
  opens a booster (a fresh weighted drop).

## Workflow with the user (JP)

- I hand over files; JP replaces them locally, runs `npx expo start -c`, tests
  on iPhone, we iterate.
- English UI first. Verify pure logic with esbuild+node before handoff.

## Roadmap / open threads

1. Enrich catalog: movement / country / technique / museum / year / history
   columns → unlock the remaining Collection filters (already wired).
2. 6th collection + secret set (expansions).
3. Set-completion cosmetic rewards for the museum.
4. Optional dev-client build later → Bluetooth trade, richer audio/native.
