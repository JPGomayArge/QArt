// Crisp, blocky pixelation for undiscovered pieces.
//
// iOS smooths any upscaled bitmap, so a small image always looks *blurred*
// rather than *pixelated*. Instead we bake a 12×12 grid of average colours per
// artwork (scripts/pixelate.mjs) and draw it as flat rectangles — hard edges,
// no image download, and it renders instantly offline.

import React, { useMemo } from 'react';
import Svg, { Rect } from 'react-native-svg';

export const MOSAIC_N = 12;

/**
 * LEGACY fallback for the old hex-grid format. Each rectangle is a native view,
 * so a full 12×12 grid (144) across a scrolling list is very expensive — we
 * sample every other cell (6×6 = 36) to keep it cheap. Once scripts/pixelate.mjs
 * has re-baked everything as PNG data URIs this path stops being used.
 */
export function Mosaic({ data, step = 2 }: { data: string; step?: number }) {
  const rects = useMemo(() => {
    const out: React.ReactNode[] = [];
    for (let y = 0; y < MOSAIC_N; y += step) {
      for (let x = 0; x < MOSAIC_N; x += step) {
        const i = y * MOSAIC_N + x;
        const h = data.slice(i * 3, i * 3 + 3);
        if (h.length < 3) continue;
        const fill = `#${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`;
        out.push(
          <Rect key={i} x={x} y={y} width={step * 1.02} height={step * 1.02} fill={fill} />
        );
      }
    }
    return out;
  }, [data, step]);

  return (
    <Svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${MOSAIC_N} ${MOSAIC_N}`}
      preserveAspectRatio="xMidYMid slice"
    >
      {rects}
    </Svg>
  );
}
