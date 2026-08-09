// Custom nine-slice frame art, keyed by frame id (see FRAMES in game/shop.ts).
// Each entry is a PNG with a transparent hollow center and a symmetric border.
// A frame listed here renders as a real decorative frame via <NineSliceFrame>;
// frames without an entry fall back to the built-in drawn border.
//
// HOW TO ADD ONE:
//   1. Drop the PNG in  assets/frames/<id>.png
//   2. Add its line below (the require path must resolve or the app won't build).
//   3. Tune its insetX/insetY/ratio in FRAMES (game/shop.ts) if needed.

import type { ImageSourcePropType } from 'react-native';

export const FRAME_ASSETS: Record<string, ImageSourcePropType> = {
  classic: require('../../assets/frames/classic.png'),
  wood: require('../../assets/frames/wood.png'),
  clearwood: require('../../assets/frames/clearwood.png'),
  black: require('../../assets/frames/black.png'),
  modern: require('../../assets/frames/modern.png'),
  copper: require('../../assets/frames/copper.png'),
  silver: require('../../assets/frames/silver.png'),
  crimson: require('../../assets/frames/crimson.png'),
  modernblack: require('../../assets/frames/modernblack.png'),
  old: require('../../assets/frames/old.png'),
  retro: require('../../assets/frames/retro.png'),
  vintage: require('../../assets/frames/vintage.png'),
};
