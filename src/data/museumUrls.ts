// Official museum websites, keyed by the museum name exactly as it appears in
// details.ts (the Spanish base string). museumUrl() returns the official site
// when we know it, and otherwise falls back to a search of just the museum's
// name (which reliably surfaces the official site as the top result) — never a
// search of the artwork.
//
// Homepages only: we don't store a per-work collection URL, so this lands the
// user on the museum's own site rather than a Google results page.

export const MUSEUM_URLS: Record<string, string> = {
  // --- Spain ---
  'Museo del Prado': 'https://www.museodelprado.es',
  'Museo Nacional Thyssen-Bornemisza': 'https://www.museothyssen.org',
  'Museo Lázaro Galdiano': 'https://www.museolazarogaldiano.es',
  'Museo Sorolla': 'https://www.cultura.gob.es/msorolla',
  'iglesia de Santo Tomé': 'https://santotome.org', // El Greco, Burial of the Count of Orgaz (Toledo)
  // --- France ---
  'Museo del Louvre': 'https://www.louvre.fr',
  'Museo de Orsay': 'https://www.musee-orsay.fr',
  'Museo Marmottan Monet': 'https://www.marmottan.fr',
  'Musée du Petit Palais': 'https://www.petitpalais.paris.fr',
  'musée du Luxembourg': 'https://museeduluxembourg.fr',
  'Palais des Beaux-Arts de Lille': 'https://pba.lille.fr',
  'Museo de Bellas Artes de Ruan': 'https://mbarouen.fr',
  'Museo de Bellas Artes de Rennes': 'https://mba.rennes.fr',
  'Museo Fabre': 'https://museefabre.montpellier3m.fr',
  'Castillo de Malmaison': 'https://musees-nationaux-malmaison.fr',
  // --- UK / Ireland ---
  'National Gallery de Londres': 'https://www.nationalgallery.org.uk',
  'Tate Britain': 'https://www.tate.org.uk/visit/tate-britain',
  'Galerías nacionales de Escocia': 'https://www.nationalgalleries.org',
  'Instituto de Arte Courtauld': 'https://courtauld.ac.uk',
  'Courtauld Gallery': 'https://courtauld.ac.uk',
  'Museo de Victoria y Alberto': 'https://www.vam.ac.uk',
  'Chester Beatty Library': 'https://chesterbeatty.ie',
  // --- Netherlands ---
  'Rijksmuseum': 'https://www.rijksmuseum.nl',
  'Museo van Gogh': 'https://www.vangoghmuseum.nl',
  'Mauritshuis': 'https://www.mauritshuis.nl',
  'Museo Kröller-Müller': 'https://krollermuller.nl',
  'Kunstmuseum Den Haag': 'https://www.kunstmuseum.nl',
  // --- Italy / Vatican ---
  'Galería Uffizi': 'https://www.uffizi.it',
  'Galería Borghese': 'https://galleriaborghese.beniculturali.it',
  'Pinacoteca de Brera': 'https://pinacotecabrera.org',
  'Galería de la Academia de Venecia': 'https://www.gallerieaccademia.it',
  'Galería Doria-Pamphili': 'https://www.doriapamphilj.it',
  'Santa Maria delle Grazie': 'https://cenacolovinciano.org', // Leonardo's Last Supper, Milan
  'Galería Nacional de las Marcas': 'https://gallerianazionalemarche.it',
  'Galería Nacional de Arte Moderno': 'https://lagallerianazionale.com',
  'Museos Vaticanos': 'https://www.museivaticani.va',
  'Pinacoteca Vaticana': 'https://www.museivaticani.va',
  'Capilla Sixtina': 'https://www.museivaticani.va',
  'Palacio Apostólico Vaticano': 'https://www.museivaticani.va',
  'Museo Civico di Sansepolcro': 'https://www.museocivicosansepolcro.it',
  'Castillo de San Jorge (Mantua)': 'https://mantovaducale.beniculturali.it', // Camera degli Sposi, Palazzo Ducale
  'Palazzo Nasi': 'https://www.uffizi.it', // Raphael's Madonna of the Goldfinch now lives at the Uffizi
  "Ca' Pesaro": 'https://capesaro.visitmuve.it',
  'Capilla Brancacci': 'https://musefirenze.it', // Musei Civici Fiorentini / MUS.E
  // --- Germany / Austria / Switzerland ---
  'Museo de Historia del Arte de Viena': 'https://www.khm.at',
  'Galería Belvedere': 'https://www.belvedere.at',
  'Albertina': 'https://www.albertina.at',
  'Wien Museum': 'https://www.wienmuseum.at',
  'Museo Leopold': 'https://www.leopoldmuseum.org',
  'Neue Galerie': 'https://www.neuegalerie.org',
  'Colecciones de Pinturas del Estado de Baviera': 'https://www.pinakothek.de',
  'Antigua Galería Nacional de Berlín': 'https://www.smb.museum',
  'Nueva Galería Nacional de Berlín': 'https://www.smb.museum',
  'Kunsthalle de Hamburgo': 'https://www.hamburger-kunsthalle.de',
  'Galería de arte de Bremen': 'https://www.kunsthalle-bremen.de',
  'Museo Palacio de Arte de Düsseldorf': 'https://www.kunstpalast.de',
  'Palacio de Sanssouci': 'https://www.spsg.de',
  'Palacio de Weissenstein': 'https://www.schloss-weissenstein.de', // Schloss Weißenstein, Pommersfelden (Schönborn collection)
  'Kunsthaus Zürich': 'https://www.kunsthaus.ch',
  'Museo de Arte de Basilea': 'https://kunstmuseumbasel.ch',
  'Museo de Bellas Artes de Berna': 'https://www.kunstmuseumbern.ch',
  'Museo Oskar Reinhart': 'https://www.museumoskarreinhart.ch',
  'Kunstmuseum Winterthur': 'https://www.kmw.ch',
  // --- Belgium ---
  'Museos Reales de Bellas Artes de Bélgica': 'https://www.fine-arts-museum.be',
  'Palacio de Coudenberg': 'https://coudenberg.brussels',
  'Catedral de Amberes': 'https://www.dekathedraal.be',
  // --- Nordics ---
  'Museo Nacional de Estocolmo': 'https://www.nationalmuseum.se',
  'Museo de Bellas Artes de Gotemburgo': 'https://goteborgskonstmuseum.se',
  'Galería Nacional de Noruega': 'https://www.nasjonalmuseet.no',
  'Museo Nacional de Arte, Arquitectura y Diseño': 'https://www.nasjonalmuseet.no',
  'Museo Munch': 'https://www.munchmuseet.no',
  'Art Museums of Bergen': 'https://www.kodebergen.no',
  // --- Central / Eastern Europe ---
  'Museo de Bellas Artes de Budapest': 'https://www.szepmuveszeti.hu',
  'Museo Czartoryski': 'https://mnk.pl',
  'Trade Fair Palace': 'https://www.ngprague.cz',
  'Lobkowicz Palace': 'https://www.lobkowicz.com',
  // --- Russia ---
  'Museo del Hermitage': 'https://www.hermitagemuseum.org',
  'Galería Tretiakov': 'https://www.tretyakovgallery.ru',
  'Museo Pushkin': 'https://pushkinmuseum.art',
  'Museo Estatal Ruso': 'https://rusmuseum.ru',
  // --- United States ---
  'Museo Metropolitano de Arte': 'https://www.metmuseum.org',
  'Museo de Arte Moderno': 'https://www.moma.org',
  'Museo de Arte Moderno de San Francisco': 'https://www.sfmoma.org',
  'Galería Nacional de Arte': 'https://www.nga.gov',
  'Instituto de Arte de Chicago': 'https://www.artic.edu',
  'Museo de Bellas Artes de Boston': 'https://www.mfa.org',
  'Museo de Arte de Filadelfia': 'https://www.philamuseum.org',
  'Museo de Arte del Condado de Los Ángeles': 'https://www.lacma.org',
  'Museo de Arte de la Universidad de Princeton': 'https://artmuseum.princeton.edu',
  'Museo de Arte Allen Memorial': 'https://amam.oberlin.edu',
  'Museo de Arte de Columbus': 'https://www.columbusmuseum.org',
  'Museo de Arte de Indianápolis': 'https://discovernewfields.org',
  'Instituto de Arte de Mineápolis': 'https://new.artsmia.org',
  'Museo Solomon R. Guggenheim': 'https://www.guggenheim.org',
  'Colección Frick': 'https://www.frick.org',
  'Colección Phillips': 'https://www.phillipscollection.org',
  'Sociedad Hispánica de América': 'https://hispanicsociety.org',
  'New-York Historical Society': 'https://www.nyhistory.org',
  // --- Latin America ---
  'Museo Nacional de Bellas Artes': 'https://www.bellasartes.gob.ar',
  'Museu Nacional de Belas Artes': 'https://mnba.gov.br',
  'Museo Histórico Nacional': 'https://mhn.museus.gov.br', // Museu Histórico Nacional, Rio de Janeiro
  'Museo Paulista': 'https://museudoipiranga.org.br', // Museu do Ipiranga / USP
  'Pinacoteca del Estado de São Paulo': 'https://pinacoteca.org.br',
  'Museo de Arte de São Paulo': 'https://masp.org.br',
  'Museo Nacional de Arte': 'https://munal.mx',
  'Instituto Nacional de Bellas Artes y Literatura': 'https://inbal.gob.mx',
  'Museo Soumaya': 'https://www.museosoumaya.org',
  'Museo de Aguascalientes': 'https://www.aguascalientes.gob.mx/ica/',
  // --- Middle East ---
  'Museo de Israel': 'https://www.imj.org.il',
  // --- Asia ---
  'Museo Nacional de Tokio': 'https://www.tnm.jp',
  'Museo Nacional de Kioto': 'https://www.kyohaku.go.jp',
  'Nezu Art Museum': 'https://www.nezu-muse.or.jp',
  'MOA': 'https://www.moaart.or.jp',
};

/**
 * Official website for a museum by its base (Spanish) name. Falls back to a
 * search of just the museum name — which lands on the official site as the top
 * result — for venues we don't have a URL for (some churches, palaces, private
 * collections). Never searches the artwork itself.
 */
export function museumUrl(baseName?: string): string {
  if (baseName && MUSEUM_URLS[baseName]) return MUSEUM_URLS[baseName];
  return 'https://www.google.com/search?q=' + encodeURIComponent((baseName ?? '') + ' museo sitio oficial');
}
