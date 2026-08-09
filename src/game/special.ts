// Special (QR-exclusive) artworks.
//
// These pieces are OUTSIDE the normal scan lottery. Each unlocks only when the
// scanned QR's payload matches one of its rules (a site domain, an article
// slug, or a distinctive token). We never open the payload — we just test the
// text and reinterpret a match into the specific artwork.
//
// A rule matches if ANY of its patterns is found in the scanned text (checked
// both as-is and with accents stripped). Keep patterns specific (full domains /
// slugs) to avoid unlocking on unrelated codes.

export type SpecialRule = { artworkId: string; patterns: RegExp[] };

export const SPECIAL_RULES: SpecialRule[] = [
  // ---- Collection I ----
  {
    artworkId: 'col-1-la-escuela-de-atenas', // universities
    patterns: [/harvard\.edu/, /unam\.mx/, /ox\.ac\.uk/, /\bub\.edu/, /u-tokyo\.ac\.jp/, /paris-saclay/],
  },
  {
    artworkId: 'col-1-la-torre-de-babel', // language authorities
    patterns: [/rae\.es/, /oed\.com/, /academie-francaise\.fr/, /accademiadellacrusca/, /ninjal\.ac\.jp/],
  },
  {
    artworkId: 'col-2-noche-estrellada-sobre-el-rodano', // space agencies -> Starry Night over the Rhône
    patterns: [/nasa\.gov/, /esa\.int/, /jaxa\.jp/, /roscosmos/, /isro\.gov/, /cnsa\.gov/],
  },

  // ---- Collection II ----
  {
    artworkId: 'col-2-ensayo-de-ballet', // great composers (wikipedia)
    patterns: [/beethoven/, /mozart/, /tchaikovsky|chaikov|chaykov/, /debussy/, /vivaldi/, /chopin/, /brahms/, /\bbach\b/],
  },
  {
    artworkId: 'col-6-carta-de-amor', // QArt's own "share the app" code
    patterns: [/qart\.app/, /qart\.link/, /getqart/, /arthunt/],
  },
  {
    artworkId: 'col-2-el-cuna', // AI assistants
    patterns: [/claude\.ai/, /anthropic\.com/, /chatgpt\.com/, /openai\.com/, /gemini\.google/, /bard\.google/, /copilot\.microsoft/, /cortana/],
  },

  // ---- Collection III ----
  {
    artworkId: 'col-3-la-leccion-de-anatomia-del-dr-tulp', // medical / humanitarian
    patterns: [/redcross\.org/, /icrc\.org/, /cruzroja/, /msf\.org/, /medecinssansfrontieres/, /doctorswithoutborders/, /who\.int/, /\boms\b/],
  },
  {
    artworkId: 'col-3-saturno-devorando-a-su-hijo', // Museo del Prado
    patterns: [/museodelprado/],
  },
  {
    artworkId: 'col-3-et-in-arcadia-ego', // Musée du Louvre
    patterns: [/louvre\.fr/, /\blouvre\b/],
  },

  // ---- Collection IV ----
  {
    artworkId: 'col-4-viento-del-sur-cielo-despejado', // the first QR code in history
    patterns: [/qrcode\.com/, /denso-?wave/, /first-?qr/, /primer-?qr/],
  },
  {
    artworkId: 'col-4-snap-the-whip', // The Met
    patterns: [/metmuseum/],
  },
  {
    artworkId: 'col-4-la-novena-ola', // Wikipedia: Earth
    patterns: [/wiki\/earth\b/, /wiki\/tierra\b/, /wiki\/planeta_tierra/],
  },

  // ---- Collection V ----
  {
    artworkId: 'col-5-blanco-sobre-blanco', // a 404 error code
    patterns: [/\b404\b/, /error[_\- ]?404/, /404[_\- ]?error/, /not[_\- ]?found/],
  },
  {
    artworkId: 'col-5-circulos-en-un-circulo', // Wikipedia: Pi
    patterns: [/wiki\/pi\b/, /π/, /wiki\/numero_?pi/, /wiki\/n[uú]mero_?π/],
  },
  {
    artworkId: 'col-5-broadway-boogie-woogie', // Wikipedia: QR code
    patterns: [/wiki\/qr[_ ]?code/, /wiki\/codigo_?qr/, /wiki\/c[oó]digo_?qr/],
  },

  // ---- Collection VI ----
  {
    artworkId: 'col-1-la-transfiguracion', // Vatican Museums -> Raphael's Transfiguration
    patterns: [/museivaticani/, /vatican\.va/, /vaticanmuseums/],
  },
  {
    artworkId: 'col-6-la-ofrenda', // UNESCO
    patterns: [/unesco/],
  },
  {
    artworkId: 'col-6-gallo-y-gallina-con-hortensias', // Wikipedia: DNA
    patterns: [/wiki\/adn\b/, /wiki\/dna\b/, /deoxyribonucleic/, /wiki\/[aá]cido_desoxirribonucleico/],
  },
];

export const EXCLUSIVE_IDS: ReadonlySet<string> = new Set(SPECIAL_RULES.map((r) => r.artworkId));

/** Returns the artwork id a scanned code unlocks, or undefined for normal codes. */
export function matchSpecial(raw: string): string | undefined {
  if (!raw) return undefined;
  let p = raw.toLowerCase();
  try {
    p = decodeURIComponent(p);
  } catch {
    // keep the raw lowercase form
  }
  const pa = p.normalize('NFD').replace(/[̀-ͯ]/g, ''); // accents stripped
  for (const rule of SPECIAL_RULES) {
    if (rule.patterns.some((re) => re.test(p) || re.test(pa))) return rule.artworkId;
  }
  return undefined;
}
