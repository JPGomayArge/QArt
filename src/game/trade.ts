// In-person, offline trading via QR codes.
// Device A displays a "gift" QR for one of its spare artworks; Device B scans
// it in QArt and receives that artwork. No internet, no Bluetooth.

import { ARTWORK_BY_ID } from '@/data/artworks';
import { sha256, normalizePayload } from '@/game/hash';

const PREFIX = 'QART1|GIFT|';
// Casual anti-forgery only: an offline app can't truly keep a secret (it ships
// in the binary), so this stops idle tampering, not a determined attacker.
const SECRET = 'qart-gift-1f3a9c';

function checksum(id: string, nonce: string): string {
  return sha256(normalizePayload('gift|' + id + '|' + nonce + '|' + SECRET)).slice(0, 10);
}

export type Gift = { id: string; nonce: string };

// Each gift carries a unique nonce so the receiver can consume it exactly once.
export function encodeGift(artworkId: string): string {
  const nonce = sha256(normalizePayload(artworkId + '|' + Date.now() + '|' + Math.random())).slice(0, 12);
  return `${PREFIX}${artworkId}|${nonce}|${checksum(artworkId, nonce)}`;
}

export function parseGift(raw: string): Gift | null {
  if (!raw || !raw.startsWith(PREFIX)) return null;
  const [id, nonce, sum] = raw.slice(PREFIX.length).split('|');
  if (!id || !nonce || !sum) return null;
  if (checksum(id, nonce) !== sum) return null;
  if (!ARTWORK_BY_ID[id]) return null;
  return { id, nonce };
}
