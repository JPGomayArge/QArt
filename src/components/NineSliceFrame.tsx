// Nine-slice picture frame. Wraps a piece (the painting) with a decorative
// frame PNG that fits ANY aspect ratio: the four corners stay fixed while the
// four edges stretch. The frame image must have a transparent hollow center and
// a symmetric border. `insetX`/`insetY` are the border thickness as a fraction
// of the source WIDTH and HEIGHT (they differ for non-square frame art) — this
// keeps the corner ornaments undistorted regardless of the source aspect.
//
// Layout: an outer box of (width+2b)×(height+2b). The painting fills the inner
// window; eight clipped Image copies of the same frame draw the ring around it.

import { Image as ExpoImage } from 'expo-image';
import React from 'react';
import { View, type ImageSourcePropType } from 'react-native';

type Props = {
  source: ImageSourcePropType;
  insetX: number; // border fraction of source width (left/right)
  insetY: number; // border fraction of source height (top/bottom)
  border: number; // rendered border thickness in px (uniform)
  width: number; // inner (painting) width in px
  height: number; // inner (painting) height in px
  radius?: number;
  children: React.ReactNode; // the painting (ArtImage)
};

export function NineSliceFrame({ source, insetX, insetY, border: b, width, height, radius = 0, children }: Props) {
  const fx = Math.min(Math.max(insetX, 0.04), 0.49);
  const fy = Math.min(Math.max(insetY, 0.04), 0.49);
  // Full frame image display size such that a corner renders as b×b; because
  // imgW/imgH = fy/fx = sourceW/sourceH, the frame is scaled uniformly (no warp).
  const imgW = b / fx;
  const imgH = b / fy;
  const Wt = width / (1 - 2 * fx); // frame width so its middle strip == inner width
  const Ht = height / (1 - 2 * fy); // frame height so its middle strip == inner height
  const img = { position: 'absolute' as const };
  const win = { position: 'absolute' as const, overflow: 'hidden' as const };

  return (
    <View style={{ width: width + b * 2, height: height + b * 2 }}>
      {/* Painting sits in the inner window */}
      <View style={{ position: 'absolute', left: b, top: b, width, height, borderRadius: radius, overflow: 'hidden' }}>
        {children}
      </View>

      {/* Corners (fixed) */}
      <View style={[win, { left: 0, top: 0, width: b, height: b }]}>
        <ExpoImage source={source} style={[img, { left: 0, top: 0, width: imgW, height: imgH }]} contentFit="fill" />
      </View>
      <View style={[win, { right: 0, top: 0, width: b, height: b }]}>
        <ExpoImage source={source} style={[img, { right: 0, top: 0, width: imgW, height: imgH }]} contentFit="fill" />
      </View>
      <View style={[win, { left: 0, bottom: 0, width: b, height: b }]}>
        <ExpoImage source={source} style={[img, { left: 0, bottom: 0, width: imgW, height: imgH }]} contentFit="fill" />
      </View>
      <View style={[win, { right: 0, bottom: 0, width: b, height: b }]}>
        <ExpoImage source={source} style={[img, { right: 0, bottom: 0, width: imgW, height: imgH }]} contentFit="fill" />
      </View>

      {/* Edges (stretched along one axis) */}
      <View style={[win, { left: b, top: 0, width, height: b }]}>
        <ExpoImage source={source} style={[img, { top: 0, left: -fx * Wt, width: Wt, height: imgH }]} contentFit="fill" />
      </View>
      <View style={[win, { left: b, bottom: 0, width, height: b }]}>
        <ExpoImage source={source} style={[img, { bottom: 0, left: -fx * Wt, width: Wt, height: imgH }]} contentFit="fill" />
      </View>
      <View style={[win, { left: 0, top: b, width: b, height }]}>
        <ExpoImage source={source} style={[img, { left: 0, top: -fy * Ht, width: imgW, height: Ht }]} contentFit="fill" />
      </View>
      <View style={[win, { right: 0, top: b, width: b, height }]}>
        <ExpoImage source={source} style={[img, { right: 0, top: -fy * Ht, width: imgW, height: Ht }]} contentFit="fill" />
      </View>
    </View>
  );
}
