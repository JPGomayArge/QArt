// Local image overrides, keyed by artwork id.
//
// Use this when the Wikimedia image for a piece is wrong or has an ugly frame
// and you want to ship your own cropped/cleaned version instead of the remote
// URL in images.ts. Any id listed here uses the bundled local file below and
// ignores ARTWORK_IMAGES for that piece.
//
// HOW TO ADD ONE (e.g. the cactus):
//   1. Crop the frame off the image and save it as a .jpg.
//   2. Put the file in:  assets/overrides/col-6-el-cactus.jpg
//   3. Uncomment the matching line below (the require path must point at a file
//      that actually exists, or the app won't build).
//
// The map is empty by default so nothing breaks until you opt a piece in.

import type { ImageSourcePropType } from 'react-native';

export const IMAGE_OVERRIDES: Record<string, ImageSourcePropType> = {
  'col-6-el-cactus': require('../../assets/overrides/col-6-el-cactus.jpg'),
};
