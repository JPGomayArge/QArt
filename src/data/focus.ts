// Per-artwork crop focus.
//
// Cards and thumbnails crop with `cover`, which keeps the CENTRE of a painting.
// That's wrong whenever the subject sits off-centre — a face in the left third,
// a head near the top edge — and the thumbnail ends up showing an elbow.
//
// Each entry below nudges the crop toward what actually matters. Values follow
// expo-image's `contentPosition`: 'top' | 'bottom' | 'left' | 'right' | 'center',
// or an object like { top: 0, left: '25%' } for finer control.
//
// HOW TO ADD ONE: find the artwork id, then say which edge the subject sits on.

import type { ImageContentPosition } from 'expo-image';

export const FOCUS: Record<string, ImageContentPosition> = {
  // --- faces sitting in the left third ---
  'col-1-la-venus-de-urbino': 'left', // Venus's face is far left
  'col-1-venus-y-marte': 'left', // keep Venus, not Mars's feet
  'col-3-agnus-dei-p1': 'left', // the lamb's head
  'col-3-agnus-dei-p2': 'left',
  'col-5-el-sueno': 'left', // the reclining woman

  // --- subject near the top edge ---
  'col-1-adan-y-eva-p1': 'top', // show faces, not torsos
  'col-1-adan-y-eva-p2': 'top',
  'col-1-la-gioconda-mona-lisa': { left: '50%', top: '16%' }, // her face sits high
  'col-5-retrato-de-adele-bloch-bauer-i': { left: '50%', top: '12%' }, // the golden lady
  'col-2-mujeres-de-tahiti-p1': { left: '50%', top: '38%' }, // nudged up a touch
  'col-2-mujeres-de-tahiti-p2': { left: '50%', top: '38%' },
  'col-3-saturno-devorando-a-su-hijo': 'top', // Saturn's head
  'col-6-a-carioca': 'top',

  // --- subject sitting to the right ---
  // The majas read better pulled slightly back from the very edge: 'right' cropped
  // too hard, so we stop at 82% and keep a little of the body in frame.
  'col-3-la-maja-desnuda': { left: '82%', top: '50%' },
  'col-3-la-maja-vestida': { left: '82%', top: '50%' },
  'col-5-la-gitana-dormida': 'right',
};

/** Crop focus for a piece, defaulting to centre. */
export function focusFor(id: string): ImageContentPosition {
  return FOCUS[id] ?? 'center';
}

/**
 * Vertical half of the focus only. Fragments of a multi-part work are cropped
 * horizontally by hand (each slice is positioned by its index), so they can only
 * honour the up/down part — but they DO need it, or a triptych keeps showing
 * torsos where the faces should be.
 */
export function focusTopFor(id: string): ImageContentPosition {
  const f = FOCUS[id];
  if (!f) return 'center';
  if (f === 'top') return { left: '50%', top: '0%' };
  if (f === 'bottom') return { left: '50%', top: '100%' };
  if (typeof f === 'object' && 'top' in f && f.top !== undefined) {
    return { left: '50%', top: f.top as any };
  }
  return 'center';
}
