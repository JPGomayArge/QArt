// Tip jar — TEMPORARILY STUBBED.
//
// The real in-app-purchase implementation needs a native module
// (`react-native-iap`, which on v14+ also pulls in `react-native-nitro-modules`).
// Those only work in a custom dev client / production build, never in Expo Go or
// a dev build that wasn't compiled with them — so importing the library here
// crashes the bundler at runtime.
//
// This stub keeps the same API so the rest of the app (Settings) compiles and
// runs. `available` is always false, so the "Support QArt" row falls back to the
// external donation link. When you're ready to ship the tip:
//   1. Install a dev-client-compatible IAP lib and rebuild the native client.
//   2. Restore the real useTipJar (see the reference implementation in git /
//      the previous version of this file) that calls initConnection/getProducts/
//      requestPurchase and grants TIP_SHARD_BONUS on a confirmed purchase.

import { useCallback } from 'react';

// The consumable product id to create in App Store Connect / Play Console.
export const TIP_PRODUCT_ID = 'com.jpgmzyl.qart.tip';

/** Shards silently granted after a successful tip. */
export const TIP_SHARD_BONUS = 1000;

type TipJar = {
  /** True once the store returned the product (always false while stubbed). */
  available: boolean;
  /** Localized price string — undefined while stubbed. */
  price?: string;
  /** Kick off the purchase (no-op while stubbed). */
  buy: () => void;
  /** True from tap until the purchase resolves. */
  busy: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useTipJar(_onPurchased: (bonus: number) => void): TipJar {
  const buy = useCallback(() => {}, []);
  return { available: false, price: undefined, buy, busy: false };
}
