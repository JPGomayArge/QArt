// Multi-part artworks: some paintings (folding screens, triptychs...) are split
// into parts. Each part is its own collectible; owning one reveals that slice of
// the painting plus a teaser. Only when every part is collected does the piece
// assemble into the full image with its full story.

import { ARTWORKS, type Artwork } from '@/data/artworks';

export type OwnedMap = Record<string, { count: number; firstSeen: number }>;

const GROUPS: Record<string, Artwork[]> = {};
for (const a of ARTWORKS) {
  if (a.partGroup) {
    (GROUPS[a.partGroup] ??= []).push(a);
  }
}
for (const g of Object.keys(GROUPS)) {
  GROUPS[g].sort((a, b) => (a.partIndex ?? 0) - (b.partIndex ?? 0));
}

export function partsOf(group: string): Artwork[] {
  return GROUPS[group] ?? [];
}

/**
 * One entry per *painting*: a multi-part work counts once, not once per
 * fragment. Progress and totals are reported in paintings (300), while the
 * grids still show every collectible fragment (325).
 */
export const PAINTINGS: Artwork[] = ARTWORKS.filter((a) => !a.partGroup || a.partIndex === 1);

export function paintingsOf(collectionId: string): Artwork[] {
  return PAINTINGS.filter((a) => a.collectionId === collectionId);
}

/** A painting counts as discovered only once every fragment is in hand. */
export function isPaintingComplete(a: Artwork, owned: OwnedMap): boolean {
  return a.partGroup ? groupComplete(a.partGroup, owned) : !!owned[a.id];
}

export function partsOwned(group: string, owned: OwnedMap): number {
  return partsOf(group).filter((a) => !!owned[a.id]).length;
}

export function partsTotal(group: string): number {
  return partsOf(group).length;
}

/** True when every part of the group has been collected. */
export function groupComplete(group: string, owned: OwnedMap): boolean {
  const list = partsOf(group);
  return list.length > 0 && list.every((a) => !!owned[a.id]);
}

export type PartProgress = { isPart: boolean; have: number; total: number; complete: boolean };

/** Progress of the group this artwork belongs to (safe for non-part pieces). */
export function partProgress(artwork: Artwork, owned: OwnedMap): PartProgress {
  const g = artwork.partGroup;
  if (!g) return { isPart: false, have: 1, total: 1, complete: true };
  const total = partsTotal(g);
  const have = partsOwned(g, owned);
  return { isPart: true, have, total, complete: total > 0 && have >= total };
}

/** Is this artwork shown as an assembled whole? (non-part pieces always are) */
export function isAssembled(artwork: Artwork, owned: OwnedMap): boolean {
  if (!artwork.partGroup) return true;
  return groupComplete(artwork.partGroup, owned);
}

// --- Grid layout helpers -------------------------------------------------
// The grids show one card per *painting*. A multi-part work collapses into a
// single, full-width card that fills in as you collect its fragments.

export type PaintingCell =
  | { kind: 'single'; art: Artwork }
  | { kind: 'multi'; group: string; rep: Artwork; parts: Artwork[] };

/** Collapse a fragment list into painting cells (a group becomes one cell). */
export function toPaintingCells(list: Artwork[]): PaintingCell[] {
  const seen = new Set<string>();
  const cells: PaintingCell[] = [];
  for (const a of list) {
    if (a.partGroup) {
      if (seen.has(a.partGroup)) continue;
      seen.add(a.partGroup);
      const parts = partsOf(a.partGroup);
      cells.push({ kind: 'multi', group: a.partGroup, rep: parts[0] ?? a, parts });
    } else {
      cells.push({ kind: 'single', art: a });
    }
  }
  return cells;
}

export type GridRow =
  | { type: 'multi'; cell: Extract<PaintingCell, { kind: 'multi' }> }
  | { type: 'pair'; items: Artwork[] }
  | { type: 'label'; text: string };

/**
 * Pack cells into rows: multi-part paintings own a full row; singles pair up
 * two-per-row. To avoid an ugly half-empty cell next to a full-width row, a
 * multi-part is deferred until the current pair of singles is complete — so the
 * only possible gap is the very last row (a lone leftover single at the bottom).
 */
export function packRows(cells: PaintingCell[]): GridRow[] {
  const rows: GridRow[] = [];
  let buffer: Artwork[] = [];
  let deferred: Extract<PaintingCell, { kind: 'multi' }>[] = [];

  const flushDeferred = () => {
    for (const m of deferred) rows.push({ type: 'multi', cell: m });
    deferred = [];
  };

  for (const c of cells) {
    if (c.kind === 'multi') {
      if (buffer.length === 1) {
        deferred.push(c); // wait for the single to find a partner first
      } else {
        rows.push({ type: 'multi', cell: c });
      }
    } else {
      buffer.push(c.art);
      if (buffer.length === 2) {
        rows.push({ type: 'pair', items: buffer });
        buffer = [];
        flushDeferred();
      }
    }
  }
  // Emit any still-deferred rows, then a lone leftover single (only bottom gap).
  flushDeferred();
  if (buffer.length) rows.push({ type: 'pair', items: buffer });
  return rows;
}

export const rowKey = (r: GridRow) =>
  r.type === 'multi'
    ? `m:${r.cell.group}`
    : r.type === 'label'
      ? `l:${r.text}`
      : `p:${r.items.map((i) => i.id).join('-')}`;

/** Short teaser used while a multi-part piece is still incomplete. */
export function teaser(about: string | undefined, artwork: Artwork): string {
  const total = artwork.partTotal ?? 1;
  if (!about) {
    return `This is one of ${total} fragments. Find the rest to reveal the whole work and its story.`;
  }
  const firstSentence = about.split(/(?<=[.!?])\s/)[0] ?? about;
  return `${firstSentence}\n\nYou hold only part of this work — collect every fragment to read its full story.`;
}
