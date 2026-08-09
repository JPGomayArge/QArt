// Manual image overrides: id -> exact Wikimedia Commons file name.
//
// Filenames here are VERIFIED via search on commons.wikimedia.org (not guessed).
// The URL is built deterministically (Special:FilePath), so no network lookups.
//
// fetch-images.mjs applies these FIRST and never overwrites them. You can also
// bake them straight into images.ts with:  node scripts/apply-overrides.mjs
//
// For multi-part works, every fragment id points at the SAME file.

export const IMAGE_OVERRIDES = {
  // --- Fixes for wrong / framed / tilted / duplicated images ---
  'col-1-la-venus-de-urbino': 'Tiziano - Venere di Urbino - Google Art Project.jpg',
  'col-2-el-circo': 'Georges Seurat - The Circus - Google Art Project.jpg',
  'col-2-nenufares': 'Claude Monet - Blue Water Lilies - Google Art Project.jpg',
  'col-2-el-puente-japones': 'Claude Monet - Water Lilies and Japanese Bridge.jpg',
  'col-2-las-planchadoras': "Edgar Degas - Repasseuses - Musée d'Orsay.jpg",
  'col-2-acantilados-en-etretat': 'Claude Monet - The Cliff of Aval, Etrétat - Google Art Project.jpg',
  'col-4-los-acantilados-de-etretat': 'The Manneporte near Étretat.JPG',
  'col-6-un-alto-en-la-pulperia': 'Un alto en la pulpería - Prilidiano Pueyrredón.jpg',
  'col-4-el-curso-del-imperio-consumacion': 'Cole Thomas The Consummation The Course of the Empire 1836.jpg',
  'col-4-el-viaje-de-la-vida-infancia': 'Thomas Cole - The Voyage of Life Childhood, 1842 (National Gallery of Art).jpg',
  'col-4-el-viaje-de-la-vida-juventud': 'Thomas Cole - The Voyage of Life Youth, 1842 (National Gallery of Art).jpg',
  'col-4-lluvia-repentina-sobre-el-puente-shin-oh': 'Hiroshige, Sudden shower over Shin-Ōhashi bridge and Atake, 1857.jpg',
  'col-5-el-encantador-de-serpientes-p1': 'Henri Rousseau, known as le Douanier - The Snake Charmer - Google Art Project.jpg',
  'col-5-el-encantador-de-serpientes-p2': 'Henri Rousseau, known as le Douanier - The Snake Charmer - Google Art Project.jpg',
  'col-5-el-abrazo': 'Egon Schiele - Die Umarmung - 4438 - Österreichische Galerie Belvedere.jpg',
  'col-5-tigre': 'Marc, Franz - The Tiger - Google Art Project.jpg',
  'col-2-bailarina-verde': 'Edgar Degas - Balançant danseurs.jpg',
  'col-4-nihonbashi-al-amanecer': 'Hiroshige-53-Stations-Hoeido-01-Nihonbashi-BM-01.jpg',
  'col-4-flatford-mill': 'John Constable - Flatford Mill.jpg',

  // --- Previously missing (verified) ---
  'col-2-el-boulevard-montmartre-de-noche': 'Camille Pissarro, The Boulevard Montmartre at Night, 1897.jpg',
  'col-2-el-golfo-de-marsella-visto-desde-lestaqu':
    "Paul Cézanne - The Bay of Marseilles, Seen from L'Estaque - Google Art Project.jpg",
  'col-3-el-triunfo-de-neptuno': 'Nicolas Poussin - Le Triomphe de Neptune ou La Naissance de Vénus.jpg',

  // --- Replacements for cross-collection / near-duplicate works ---
  'col-3-el-martirio-de-san-felipe': 'José de Ribera - Martyrdom of St Philip - WGA19360.jpg',
  'col-3-el-recien-nacido': 'Georges de La Tour - Newlyborn infant - Musée des Beaux-Arts de Rennes.jpg',
  'col-4-recuerdo-de-mortefontaine': 'Jean-Baptiste-Camille Corot - Souvenir of Mortefontaine - WGA5292.jpg',
  'col-5-potsdamer-platz': 'Ernst Ludwig Kirchner - Potsdamer Platz.jpg',

  // --- col-4 new PD works replacing the copyrighted Wyeth pieces ---
  'col-4-la-novena-ola': 'Hovhannes Aivazovsky - The Ninth Wave - Google Art Project.jpg',
  'col-4-las-espigadoras': 'Jean-François Millet - Gleaners - Google Art Project.jpg',
  'col-4-el-carro-de-heno': 'John Constable The Hay Wain.jpg',
  'col-4-otono-dorado': 'Levitan Zolotaya Osen.jpg',

  // --- col-5 (verified) ---
  'col-5-composicion-viii':
    'Vassily Kandinsky, 1923 - Composition 8, huile sur toile, 140 cm x 201 cm, Musée Guggenheim, New York.jpg',
  'col-5-circulos-en-un-circulo': 'Vassily Kandinsky, 1923 - Circles in a Circle.jpg',
  'col-5-improvisacion-28': 'Vasily Kandinsky Improvisation 28 (second version).jpg',
  'col-5-amarillo-rojo-azul': 'Kandinsky - Jaune Rouge Bleu.jpg',
  'col-5-castillo-y-sol': 'Burg und Sonne - Klee.jpg',
  'col-5-elasticidad':
    'Umberto Boccioni, 1912, Elasticity (Elasticità), oil on canvas, 100 x 100 cm, Museo del Novecento.jpg',
  'col-5-impresion-iii-concierto': 'Wassily Kandinsky - Impression III (Concert) - Google Art Project.jpg',

  // --- col-6 (verified) ---
  'col-6-el-suplicio-de-cuauhtemoc': 'El suplicio de Cuauhtémoc.jpg',
  'col-6-moema': 'Victor Meirelles - Moema.jpg',
  'col-6-batalha-do-avai': 'Pedro Américo - Batalha do Avaí.jpg',
  'col-6-caipira-picando-fumo': 'Almeida Júnior - Caipira Cutting Tobacco - Google Art Project.jpg',
  'col-6-o-violeiro': 'Almeida Júnior - O Violeiro (1899).jpg',
  'col-6-a-carioca': 'Pedro Américo - A carioca - 1882.jpg',
  'col-6-la-primera-misa-en-brasil': 'Meirelles-primeiramissa2.jpg',
  'col-6-combate-naval-do-riachuelo': 'Victor Meirelles - Combate Naval do Riachuelo.JPG',
  'col-6-maraba': 'Rodolfo Amoedo - Marabá, 1882.JPG',
  'col-6-arrufos': 'Belmiro de Almeida - Arrufos, 1887.jpg',
  'col-6-el-cactus': 'Cardon cactus by Velasco 1887.jpg',
  'col-6-fray-bartolome-de-las-casas': 'Félix Parra - Fray Bartolomé de las Casas - Google Art Project.jpg',
  'col-6-la-criolla-del-mango': 'La criolla del mango. 1916. Saturnino Herrán.jpg',
  'col-6-retrato-de-dona-dolores-tosta': 'Juan Cordero - Portrait of Doña Dolores Tosta de Santa Anna - Google Art Project.jpg',
  'col-6-la-critica': 'Julio Ruelas - Criticism - Google Art Project.jpg',
  'col-6-la-sopa-de-los-pobres': 'Giudici Reynaldo - La sopa de los pobres (Venecia).jpg',
  'col-6-el-despertar-de-la-criada': 'Eduardo Sivori - El despertar de la criada - Google Art Project.jpg',
  'col-6-retrato-de-manuelita-rosas': 'Prilidiano Pueyrredon - Retrato de Manuelita Rosas - Google Art Project.jpg',
  'col-6-combate-naval-de-iquique': 'Combate Naval Iquique-Thomas Somerscales.jpg',

  // --- col-6 Japanese ---
  'col-6-tres-bellezas-de-nuestro-tiempo':
    'Kitagawa Utamaro - Toji san bijin (Three Beauties of the Present Day)From Bijin-ga (Pictures of Beautiful Women), published by Tsutaya Juzaburo - Google Art Project.jpg',
  'col-6-paisaje-de-invierno': 'Sesshu Toyo - Landscape of four seasons- winter - Google Art Project.jpg',
  // Multi-part screens: every fragment points at the same full image.
  'col-6-red-and-white-plum-blossoms-p1': 'Ogata Korin - RED AND WHITE PLUM BLOSSOMS (National Treasure) - Google Art Project.jpg',
  'col-6-red-and-white-plum-blossoms-p2': 'Ogata Korin - RED AND WHITE PLUM BLOSSOMS (National Treasure) - Google Art Project.jpg',
  'col-6-cipreses-p1': 'Kano Eitoku - Cypress Trees.jpg',
  'col-6-cipreses-p2': 'Kano Eitoku - Cypress Trees.jpg',
  'col-6-cipreses-p3': 'Kano Eitoku - Cypress Trees.jpg',
  'col-6-zamacueca': 'Zamacueca-Chile.jpg',
  'col-6-gallo-y-gallina-con-hortensias': 'Itō Jakuchū - Rooster and Hen with Hydrangeas (Colorful Realm of Living Beings).jpg',
  'col-6-nocturno': 'Martín Malharro - Nocturno - Google Art Project.jpg',
  'col-6-calle-de-limache': '"Calle de Limache".jpg',
  'col-6-los-mantones-de-manila': 'Fernando Fader - Los mantones de Manila - Google Art Project.jpg',
  'col-6-la-lavandera': 'Prilidiano Pueyrredon - Lavanderas en el bajo de Belgrano - Google Art Project.jpg',
  'col-6-el-huaso-y-la-lavandera': 'ElHuasoYLaLavandera.jpg',

  // --- col-6 replacements for works whose own image couldn't be found ---
  'col-6-bodegon-con-alacran-y-rana': 'Hermenegildo Bustos - Still life with fruit (with scorpion and frog) - Google Art Project.jpg',
  'col-6-el-costeno': 'José Agustín Arrieta - El Costeño - The Young Man from the Coast - LA2391 - Hispanic Society of America.jpg',
  'col-6-carta-de-amor': 'Pedro Lira - Carta de amor.jpg',
  'col-6-las-playeras': 'Las playeras, de Celia Castrop.jpg',
  'col-6-la-sevillana': 'La Sevillana (1890) - Alfredo Valenzuela Puelma (National Museum of Fine Arts, Santiago de Chile).jpg',
  'col-6-coqueteria': 'Alfredo Valenzuela Puelma - Coquetería.jpg',
};
