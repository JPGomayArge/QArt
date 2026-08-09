// Detailed, sectioned profiles for the museums in the catalog, shown on the
// museum screen and (as a short teaser) on the "Museum of the fortnight" card in
// Discover. Keyed by the museum name as it appears in details.ts. Missing keys
// simply show no profile. Hand-written in-house.
//
// Bilingual: English base + a Spanish record. museumInfo(name, locale) picks the
// Spanish version when available and falls back to English.

import type { Locale } from '@/i18n';

export type MuseumInfo = {
  /** What it is — one or two sentences (also the card teaser). */
  lead: string;
  /** Quick-fact chips. */
  city?: string; // e.g. "Madrid, Spain"
  founded?: string; // e.g. "1819"
  /** Key works and collection strengths — short bullet points. */
  highlights: string[];
  /** History and character of the museum — a short paragraph. */
  about: string;
  /** Optional lesser-known nuggets. */
  facts?: string[];
};

export const MUSEUM_INFO: Record<string, MuseumInfo> = {
  'Museo del Prado': {
    lead:
      "Spain's national art museum in Madrid, and one of the greatest picture galleries in the world.",
    city: 'Madrid, Spain',
    founded: '1819',
    highlights: [
      'The finest holdings anywhere of Velázquez, Goya and El Greco',
      "Velázquez's 'Las Meninas' and Goya's 'Third of May 1808'",
      "Goya's private, nightmarish 'Black Paintings'",
      'Masterpieces by Titian, Bosch, Rubens and Dürer',
    ],
    about:
      "The Prado grew out of the Spanish royal collection, assembled by Habsburg and Bourbon kings over centuries who were among the greatest patrons in Europe — which is why it holds so many Titians, Bosch panels and Rubens works alongside its Spanish masters. It opened to the public in 1819 in a building originally meant to house a natural-history museum. Rather than an encyclopedic survey, it offers unmatched depth in a few supreme artists, and today it anchors a 'golden triangle' of Madrid museums with the nearby Reina Sofía and Thyssen-Bornemisza.",
    facts: [
      "Its collection began as the private picture gallery of the Spanish kings.",
      "It holds roughly 50 works by Rubens and around 40 by Goya.",
      "The building was first designed to be a natural-science museum, not an art gallery.",
    ],
  },
  'Museo de Orsay': {
    lead:
      "A Paris museum housed in a grand former railway station on the Seine, holding the world's finest collection of Impressionist and Post-Impressionist art.",
    city: 'Paris, France',
    founded: '1986',
    highlights: [
      'Monet, Renoir, Degas, Van Gogh, Cézanne and Gauguin',
      "Van Gogh's self-portraits and 'Starry Night over the Rhône'",
      'French painting, sculpture and design from 1848 to 1914',
      'Bridges the Louvre (older art) and the Pompidou (modern art)',
    ],
    about:
      "The Orsay occupies the Gare d'Orsay, a Beaux-Arts train station of 1900 that was saved from demolition and reborn as a museum in 1986. Its collection was assembled to fill the historical gap between the old masters of the Louvre and the modern art of the Centre Pompidou, making it the essential home of later-19th-century French art. Beneath its great glass vault, the giant original station clock still looks out over the Seine, and the museum draws some of the largest crowds of any gallery in the world.",
    facts: [
      "The building was a working railway station before becoming a museum.",
      "You can still look out through the enormous original station clock.",
      "It was created partly because the Louvre and Pompidou left a gap in the story of French art.",
    ],
  },
  'National Gallery de Londres': {
    lead:
      "Britain's national collection of Western European painting, on Trafalgar Square in London, offering a superb, compact survey from the Middle Ages to 1900.",
    city: 'London, UK',
    founded: '1824',
    highlights: [
      "Van Eyck's 'Arnolfini Portrait'",
      'Works by Leonardo, Titian and Velázquez',
      "Turner's 'The Fighting Temeraire'",
      "Free entry to one of the world's great collections",
    ],
    about:
      "The National Gallery was founded in 1824 when the government bought a banker's collection of just 38 pictures, and it was deliberately built in the very heart of London so people of every class could reach it on foot. Unlike museums grown from royal hoards, it was assembled from the start as a public collection for the nation, chosen for quality rather than quantity. It has always been free to enter, and its relatively small size is prized as a virtue — nearly every picture is a masterpiece.",
    facts: [
      "It began with just 38 paintings bought from a private collector.",
      "It has always been free and centrally placed so everyone could visit.",
      "It was never a royal collection — it was created for the public from the outset.",
    ],
  },
  'Museo del Louvre': {
    lead:
      "The world's largest and most visited art museum, in a former royal palace in Paris, spanning antiquity to the 19th century.",
    city: 'Paris, France',
    founded: '1793',
    highlights: [
      "Home of the 'Mona Lisa'",
      'Leonardo, David, Delacroix and Vermeer',
      'Ancient icons like the Venus de Milo and Winged Victory',
      'Over 30,000 works on display across former palace halls',
    ],
    about:
      "The Louvre began as a medieval fortress, became the palace of the French kings, and was opened as a public museum in 1793 during the Revolution, displaying the former royal and church collections seized by the new state. Napoleon swelled it enormously with art taken across conquered Europe, much of it later returned. The glass Pyramid entrance, designed by I. M. Pei, was added in 1989 amid controversy and is now an icon in its own right. So vast is the collection that seeing every work for even a few seconds would take many days.",
    facts: [
      "It was a fortress and then a royal palace before it was ever a museum.",
      "Napoleon filled it with art looted from across Europe, much later returned.",
      "It receives the most visitors of any art museum on Earth.",
    ],
  },
  'Museo Nacional de Bellas Artes': {
    lead:
      "Argentina's national fine-arts museum in Buenos Aires, holding the country's most important art collection.",
    city: 'Buenos Aires, Argentina',
    founded: '1895',
    highlights: [
      "De la Cárcova's 'Without Bread and Without Work'",
      'The founding works of Argentine painting: Della Valle, Sívori, Pueyrredón',
      'European old masters and French Impressionists',
      'Free entry to the national collection',
    ],
    about:
      "Founded in 1895 and later moved into a converted pumping station, the museum brings together European art — from the old masters to Impressionism — with the foundational canvases of Argentine national painting. It traces how a young country, swelled by European immigration, built an art of its own, from gaucho scenes and portraits to bold works of social protest. It is the single most important place to understand the birth of Argentine art.",
    facts: [
      "It is the single most important home of 19th-century Argentine painting.",
      "Its building was converted from a former water-pumping station.",
    ],
  },
  'Galería Uffizi': {
    lead:
      "Florence's great Renaissance treasure house and one of the oldest museums in the world, in a 16th-century palace built for the Medici.",
    city: 'Florence, Italy',
    founded: '1765 (public)',
    highlights: [
      "Botticelli's 'Birth of Venus' and 'Primavera'",
      'Leonardo, Michelangelo, Raphael and Titian',
      'The unrivalled survey of Italian Renaissance art',
      'A famous corridor of ancient sculpture',
    ],
    about:
      "The Uffizi ('offices') was built in the 1560s to house the administrative offices of Florentine government, and gradually filled with the Medici family's extraordinary art collection. When the Medici line died out, the last heiress, Anna Maria Luisa, bequeathed the whole collection to the city of Florence in 1743 on the condition that it never leave the city — a gift that made the Uffizi one of the earliest true public museums. Its rooms trace the Renaissance from its Florentine cradle to its High Renaissance summit.",
    facts: [
      "The building was originally government offices — hence the name 'Uffizi.'",
      "The last Medici heiress left the collection to Florence on the condition it stay there forever.",
      "Its long history makes it one of the oldest museums in the world.",
    ],
  },
  'Museo de Arte Moderno': {
    lead:
      "The Museum of Modern Art (MoMA) in New York, one of the most influential museums of modern and contemporary art in the world.",
    city: 'New York, USA',
    founded: '1929',
    highlights: [
      "Van Gogh's 'The Starry Night'",
      'Picasso, Matisse, Mondrian and Malevich',
      "Hopper's 'Gas' and 20th-century icons",
      'Design, film and photography as well as painting',
    ],
    about:
      "MoMA was founded in 1929, just days after the Wall Street Crash, by a small group of patrons led by Abby Aldrich Rockefeller, at a time when established American museums largely ignored living artists. Through its exhibitions, publications and acquisitions it did more than any other institution to define the very story of modern art, treating architecture, design, film and photography as seriously as painting. It has expanded several times into its landmark home in midtown Manhattan.",
    facts: [
      "It opened just days after the 1929 stock-market crash.",
      "Its founders championed modern art when other museums still refused it.",
      "Its collection spans design, film and photography, not only fine art.",
    ],
  },
  'Galería Nacional de Arte': {
    lead:
      "The National Gallery of Art in Washington, D.C., the United States' national collection, free to the public.",
    city: 'Washington, D.C., USA',
    founded: '1937',
    highlights: [
      "Leonardo's 'Ginevra de' Benci' — the only Leonardo in the Americas",
      'European old masters paired with deep American holdings',
      'A vast collection built almost entirely from donations',
      'Free entry, funded by private gifts',
    ],
    about:
      "The National Gallery was founded in 1937 with a landmark gift of art and money from the financier Andrew Mellon, who insisted the museum bear the nation's name rather than his own so other collectors would be encouraged to give. That strategy worked: it grew through the donations of America's great collectors into one of the world's finest galleries. Free to enter, it pairs European old masters with an exceptional survey of American art.",
    facts: [
      "It holds the only painting by Leonardo da Vinci in the Americas.",
      "Its founder refused to put his own name on it, to encourage other donors.",
      "Almost its entire collection has come from private gifts, not purchases.",
    ],
  },
  'Instituto de Arte de Chicago': {
    lead:
      "One of the oldest and largest art museums in the United States, with an encyclopedic collection especially rich in Impressionism and American art.",
    city: 'Chicago, USA',
    founded: '1879',
    highlights: [
      "Seurat's 'A Sunday on La Grande Jatte'",
      "Hopper's 'Nighthawks'",
      "Grant Wood's 'American Gothic'",
      'One of the finest Impressionist collections outside Paris',
    ],
    about:
      "Founded in 1879 as both a museum and a school, the Art Institute grew alongside booming late-19th-century Chicago and moved into its landmark building for the 1893 World's Fair, guarded ever since by two famous bronze lions on Michigan Avenue. Early gifts from local collectors — many of whom had bought Impressionist works directly from Paris dealers — gave it one of the greatest holdings of the movement anywhere. Its school remains among the most respected art colleges in America.",
    facts: [
      "Two bronze lions have flanked its entrance since 1893.",
      "It is a working art school as well as a museum.",
      "Its Impressionist strength came from Chicago collectors buying straight from Paris.",
    ],
  },
  'Rijksmuseum': {
    lead:
      "The national museum of the Netherlands, in Amsterdam, dedicated to Dutch art and history and to the glory of the Dutch Golden Age.",
    city: 'Amsterdam, Netherlands',
    founded: '1800',
    highlights: [
      "Rembrandt's monumental 'The Night Watch'",
      "Vermeer's 'The Milkmaid' and 'The Little Street'",
      'Masterpieces by Frans Hals and the Golden Age painters',
      'A grand purpose-built home reopened after a decade',
    ],
    about:
      "The Rijksmuseum ('State Museum') traces its origins to 1800, when the Dutch state began a national collection, and it moved into its grand, cathedral-like building by architect Pierre Cuypers in 1885. After a sweeping ten-year renovation it reopened in 2013, with 'The Night Watch' restored to the place of honour at the end of its long Gallery of Honour. In 2019–21 the painting underwent a much-publicized public restoration, watched behind glass by visitors and online audiences worldwide.",
    facts: [
      "'The Night Watch' hangs in a specially designed hall built around it.",
      "The museum reopened in 2013 after a ten-year renovation.",
      "'The Night Watch' was recently restored in full public view, behind glass.",
    ],
  },
  'Museo Metropolitano de Arte': {
    lead:
      "The Metropolitan Museum of Art in New York, one of the largest and most encyclopedic museums on Earth, spanning five thousand years of world culture.",
    city: 'New York, USA',
    founded: '1870',
    highlights: [
      'European old masters and deep American painting',
      'Outstanding Asian, ancient and Islamic art',
      'An entire ancient Egyptian temple, the Temple of Dendur',
      'Millions of visitors a year on the edge of Central Park',
    ],
    about:
      "Founded in 1870 by a group of civic leaders, businessmen and artists who wanted to bring art and art education to the American people, 'the Met' had no collection at all at first and grew through gifts and purchases into a vast encyclopedic museum on the edge of Central Park. Its holdings range from Egyptian temples and Greek sculpture to European painting, American art and the art of Asia, Africa and the Americas. It is among the most-visited museums in the world.",
    facts: [
      "Its collection spans some 5,000 years across every part of the world.",
      "It even contains an entire ancient Egyptian temple, the Temple of Dendur.",
      "It started in 1870 with no artworks at all.",
    ],
  },
  'Museo de Bellas Artes de Boston': {
    lead:
      "The Museum of Fine Arts, Boston, one of the largest museums in the United States, renowned for its French Impressionism and its Asian art.",
    city: 'Boston, USA',
    founded: '1870',
    highlights: [
      'French Impressionism and American painting',
      'One of the greatest collections of Japanese art outside Japan',
      'Ancient Egyptian and Nubian holdings',
      'Nearly half a million works across all cultures',
    ],
    about:
      "Founded in 1870 and opened in 1876, the MFA built exceptional collections through the gifts of Boston's cultured elite, several of whom had close ties to Japan just as it was opening to the world — giving the museum some of the earliest and finest Western holdings of Japanese art. Its Egyptian collection grew from decades of joint archaeological expeditions, and its Impressionist and American galleries are among the best in the country.",
    facts: [
      "It has one of the greatest collections of Japanese art outside Japan.",
      "Its Egyptian holdings came from its own archaeological digs.",
    ],
  },
  'Museo del Hermitage': {
    lead:
      "One of the largest and oldest museums in the world, in Saint Petersburg, founded by Catherine the Great and housed largely in the former imperial Winter Palace.",
    city: 'Saint Petersburg, Russia',
    founded: '1764',
    highlights: [
      "Rembrandt's 'Return of the Prodigal Son'",
      "Major works by Matisse, including his 'Dance'",
      'A vast sweep of European painting and antiquities',
      'Galleries stretching for many kilometres',
    ],
    about:
      "The Hermitage began in 1764 as Catherine the Great's private collection, kept in a secluded retreat beside the Winter Palace — a 'hermitage' from which it takes its name. Catherine bought entire European collections wholesale to rival the royal galleries of the West, and after the 1917 Revolution the museum absorbed great private collections, including outstanding modern French paintings. It now sprawls across a complex of palace buildings so large that walking every gallery covers many kilometres.",
    facts: [
      "It began as the private art hoard of Empress Catherine the Great.",
      "She bought whole European collections at once to outshine Western royalty.",
      "Its galleries are so vast that seeing them all means walking for miles.",
    ],
  },
  'Museu Nacional de Belas Artes': {
    lead:
      "Brazil's national museum of fine arts, in Rio de Janeiro, holding the most important collection of Brazilian art.",
    city: 'Rio de Janeiro, Brazil',
    founded: '1937',
    highlights: [
      'Grand 19th-century academic and history paintings',
      'Pedro Américo, Victor Meirelles and their peers',
      "Works that shaped the nation's image of itself",
      'A survey of Brazilian art into the modern era',
    ],
    about:
      "The museum's roots reach back to the royal art school established after the Portuguese court fled Napoleon and settled in Brazil in the early 19th century, bringing a group of French artists to found an academy. Its collection is the great home of imperial Brazilian painting — the vast history canvases and Romantic scenes through which a young nation pictured its origins — housed since 1937 in a grand Rio building.",
    facts: [
      "Its origins lie in an art academy founded by French artists invited to Brazil in 1816.",
      "It holds the defining images of Brazil's founding as a nation.",
    ],
  },
  'Museo Nacional de Arte': {
    lead:
      "The Museo Nacional de Arte (MUNAL) in Mexico City, holding Mexico's national collection from the colonial era to the early 20th century.",
    city: 'Mexico City, Mexico',
    founded: '1982',
    highlights: [
      "Velasco's luminous panoramas of the Valley of Mexico",
      'Herrán, Izaguirre and the academic masters',
      'Colonial-era to early-modern Mexican art',
      'A magnificent former government palace setting',
    ],
    about:
      "MUNAL is housed in a magnificent early-20th-century palace in the historic centre of Mexico City, built under the dictator Porfirio Díaz as the Ministry of Communications and later converted into a museum that opened in 1982. Its galleries trace Mexican art from the colonial period to the eve of the muralist movement, showing how painters like Velasco and Herrán forged a national artistic identity out of the country's land, history and peoples.",
    facts: [
      "It occupies a lavish former government palace in the historic centre.",
      "Its collection stops around the dawn of the famous Mexican muralists.",
    ],
  },
  'Museo de Historia del Arte de Viena': {
    lead:
      "The Kunsthistorisches Museum in Vienna, built for the imperial Habsburg collection and among the world's foremost art museums.",
    city: 'Vienna, Austria',
    founded: '1891',
    highlights: [
      'The largest collection of Bruegel paintings anywhere',
      "Bruegel's 'Tower of Babel' and 'Hunters in the Snow'",
      'Masterpieces by Titian, Velázquez, Vermeer and Rubens',
      'A palatial building with a Klimt-decorated staircase',
    ],
    about:
      "Opened in 1891 to display the vast art collection of the Habsburg emperors, the 'Museum of Art History' is a palace of a building on Vienna's grand Ringstrasse, its very staircase decorated by the young Gustav Klimt. Centuries of imperial collecting — the Habsburgs ruled much of Europe — gave it extraordinary depth, above all the world's greatest concentration of Pieter Bruegel the Elder, whose surviving output is tiny and precious.",
    facts: [
      "It holds about a dozen of the roughly forty surviving Bruegel panels.",
      "It was purpose-built to show off the Habsburg imperial collection.",
      "A young Gustav Klimt helped decorate its grand staircase.",
    ],
  },
  'Museo de Arte de Filadelfia': {
    lead:
      "The Philadelphia Museum of Art, one of the largest in the United States, famous to many for the grand entrance steps of its temple-like building.",
    city: 'Philadelphia, USA',
    founded: '1876',
    highlights: [
      'Major works by Cézanne and Poussin',
      "Klee's masterpiece 'Ad Parnassum'",
      'Strong European, American and modern holdings',
      "The world-famous 'Rocky Steps'",
    ],
    about:
      "The museum was founded in connection with the 1876 Centennial Exhibition — America's first great World's Fair, held in Philadelphia — and moved into its monumental Greek-revival building on a hilltop in 1928. Its steps became world-famous through the film 'Rocky,' complete with a bronze statue nearby, but inside lie deep collections of European, American and modern art, including a celebrated group of works by Cézanne and Duchamp.",
    facts: [
      "Its front steps are known worldwide as the 'Rocky Steps.'",
      "It grew out of America's first great World's Fair in 1876.",
      "A bronze 'Rocky' statue stands near the foot of the steps.",
    ],
  },
  'Museo van Gogh': {
    lead:
      "The Van Gogh Museum in Amsterdam, home to the largest collection of Vincent van Gogh's work in the world.",
    city: 'Amsterdam, Netherlands',
    founded: '1973',
    highlights: [
      "'The Potato Eaters,' 'Sunflowers' and 'The Bedroom'",
      'The late fields and hundreds of drawings',
      "Van Gogh's letters to his brother Theo",
      'Works by his contemporaries for context',
    ],
    about:
      "The museum is built around the collection kept by Van Gogh's devoted brother Theo, an art dealer, and preserved after both brothers' deaths by Theo's widow and son, who safeguarded the paintings, drawings and their extraordinary correspondence. Opened in 1973, it lets visitors follow the artist's whole short, intense career in one place — from the dark early Dutch works to the blazing colour of his final years — and is one of the most visited museums in the Netherlands.",
    facts: [
      "The collection survived because Van Gogh's family kept it together for decades.",
      "It holds many of his handwritten letters as well as his art.",
      "It traces his entire career from dark beginnings to his final blazing works.",
    ],
  },
  'Catedral de Amberes': {
    lead:
      "The Cathedral of Our Lady in Antwerp, a towering Gothic church and the artistic heart of Rubens's home city.",
    city: 'Antwerp, Belgium',
    founded: 'built 14th–16th c.',
    highlights: [
      "Rubens's 'The Elevation of the Cross'",
      "Rubens's 'The Descent from the Cross'",
      'Altarpieces still in the setting they were made for',
      'The tallest Gothic spire in the Low Countries',
    ],
    about:
      "Unlike the other institutions here, this is a working cathedral rather than a museum — the largest Gothic church in the Low Countries, centuries in the building. It holds several monumental altarpieces by Peter Paul Rubens, Antwerp's most famous son, in the very spaces they were painted for, offering a rare chance to see Baroque masterpieces in their original setting rather than a gallery. Rubens is buried in another church in the same city.",
    facts: [
      "It is a living cathedral, not a museum — the Rubens works hang where he intended.",
      "Its spire is the tallest church tower in the Low Countries.",
      "Rubens was born and buried in Antwerp, the city these altarpieces adorn.",
    ],
  },
  'Galería Tretiakov': {
    lead:
      "The State Tretyakov Gallery in Moscow, the foremost collection of Russian art, from medieval icons to the avant-garde.",
    city: 'Moscow, Russia',
    founded: '1856',
    highlights: [
      "Levitan's landscapes and Russian masterpieces",
      "Malevich's 'Black Square'",
      'Centuries of Russian painting and religious icons',
      "Andrei Rublev's revered icon of the Trinity",
    ],
    about:
      "The gallery grew from the private collection of the merchant Pavel Tretyakov, who from 1856 set out, almost single-handedly, to build a national collection of Russian art at a time when Russia's elite prized European work. He bought directly from living artists and gave the whole collection to the city of Moscow in 1892. It remains the essential home of Russian painting, spanning medieval icons, 19th-century realism and the revolutionary avant-garde.",
    facts: [
      "It was founded by a single merchant devoted to collecting Russian art.",
      "He donated the entire collection to the city of Moscow in 1892.",
      "It ranges from ancient religious icons to Malevich's radical abstraction.",
    ],
  },
  'Galería Nacional de Noruega': {
    lead:
      "The former National Gallery of Norway in Oslo, now part of the National Museum, holding the country's most important art collection.",
    city: 'Oslo, Norway',
    founded: '1837',
    highlights: [
      "The most famous version of Munch's 'The Scream'",
      "Munch's 'The Dance of Life'",
      "Norway's principal historic art holdings",
      'Norwegian Romantic landscapes',
    ],
    about:
      "Long Norway's chief art museum, the National Gallery held the nation's collection from 1837 until its holdings were folded into the vast new National Museum that opened in Oslo in 2022. Its best-known treasures are the versions of Edvard Munch's masterpieces, the pride of Norwegian art, displayed alongside the Romantic landscapes through which Norway asserted its national identity in the 19th century.",
    facts: [
      "Its holdings are now part of Oslo's huge new National Museum, opened in 2022.",
      "'The Scream' has been the target of two famous art thefts.",
    ],
  },
  'Museo Nacional de Tokio': {
    lead:
      "The Tokyo National Museum, Japan's oldest and largest museum, holding the world's greatest collection of Japanese art and antiquities.",
    city: 'Tokyo, Japan',
    founded: '1872',
    highlights: [
      "Tōhaku's 'Pine Trees'",
      "Eitoku's 'Cypress Trees'",
      "Sesshū's 'Winter Landscape'",
      'Over a hundred designated National Treasures',
    ],
    about:
      "Founded in 1872 and set in Tokyo's Ueno Park, the museum safeguards the artistic heritage of Japan across painting, sculpture, ceramics, textiles and swords, including well over a hundred works officially designated National Treasures. Because Japanese screens and hanging scrolls are fragile and light-sensitive, its greatest paintings are shown only in rotation, for a few weeks at a time, so no two visits are quite the same.",
    facts: [
      "It holds over a hundred officially designated National Treasures.",
      "Its most precious paintings are displayed only briefly, on rotation.",
      "It is the oldest national museum in Japan.",
    ],
  },
  'Galería Borghese': {
    lead:
      "The Galleria Borghese in Rome, housed in a splendid villa built for a great early-17th-century collector, with an extraordinary concentration of Baroque masterpieces.",
    city: 'Rome, Italy',
    founded: 'collection from the 1600s',
    highlights: [
      "Bernini's virtuoso marble sculptures",
      'Several Caravaggios',
      "Titian's 'Sacred and Profane Love'",
      "A jewel-box villa set in Rome's largest park",
    ],
    about:
      "The collection was assembled by Cardinal Scipione Borghese, a nephew of the pope and a ruthless, passionate patron who acquired art by almost any means — including seizing works he coveted. He was the great early champion of the young Bernini and Caravaggio, and his villa and its treasures have stayed remarkably intact for four centuries. Because the setting is intimate, visits today are by timed ticket in two-hour slots to limit the crowds.",
    facts: [
      "Its founder, a cardinal, sometimes seized art he wanted by force or intrigue.",
      "He was the first great patron of both Bernini and Caravaggio.",
      "Entry is by timed two-hour ticket to protect the small villa.",
    ],
  },
  'Colecciones de Pinturas del Estado de Baviera': {
    lead:
      "The Bavarian State Painting Collections, whose crown jewel is the Alte Pinakothek in Munich, one of the oldest picture galleries in the world.",
    city: 'Munich, Germany',
    founded: '1836',
    highlights: [
      "Dürer's self-portrait",
      'Superb German, Flemish and Dutch old masters',
      'A great group of works by Rubens',
      'Rembrandt and the northern schools',
    ],
    about:
      "The Alte Pinakothek opened in 1836 to display the picture collections of the Wittelsbach dynasty, who ruled Bavaria for centuries and were avid collectors. Its purpose-built galleries, with skylit halls designed for viewing paintings, became a model imitated by museums across Europe. The Bavarian State Painting Collections it anchors also run a family of other Munich galleries covering the 19th century to the present.",
    facts: [
      "Its collection was built by the Wittelsbach dynasty over several centuries.",
      "Its 1836 building influenced the design of later museums across Europe.",
      "It holds one of the finest Rubens collections outside Antwerp.",
    ],
  },
  'Museo Marmottan Monet': {
    lead:
      "The Musée Marmottan Monet in Paris, home to the world's largest collection of works by Claude Monet.",
    city: 'Paris, France',
    founded: '1934',
    highlights: [
      "'Impression, Sunrise' — the painting that named Impressionism",
      'Many late water lilies from Giverny',
      'Works by Morisot and other Impressionists',
      'An intimate mansion setting near the Bois de Boulogne',
    ],
    about:
      "Once a private mansion and former hunting lodge, the Marmottan became a museum in 1934 and was transformed when Monet's son Michel left it the artist's personal holdings — the largest anywhere. It also holds a major collection of Berthe Morisot. Its greatest treasure, 'Impression, Sunrise,' was among the works stolen in a notorious 1985 armed robbery and later recovered.",
    facts: [
      "It owns 'Impression, Sunrise,' the painting that gave the movement its name.",
      "Monet's own son bequeathed the great trove of his father's work.",
      "That famous canvas was stolen in a 1985 heist and later recovered.",
    ],
  },
  'Museo Kröller-Müller': {
    lead:
      "The Kröller-Müller Museum in the Netherlands, set in a national park, built around the collection of an early champion of Van Gogh.",
    city: 'Otterlo, Netherlands',
    founded: '1938',
    highlights: [
      'The second-largest Van Gogh collection in the world',
      "Van Gogh's 'Café Terrace at Night'",
      'A celebrated open-air sculpture garden',
      'Works by Seurat, Mondrian and modern masters',
    ],
    about:
      "Helene Kröller-Müller was one of the first collectors to grasp Van Gogh's importance, amassing nearly 300 of his works when he was still little appreciated. She and her husband gave their vast collection to the Dutch state, and the museum opened in 1938 amid the woods and heath of the Hoge Veluwe national park. Visitors often explore the park on free white bicycles, and the museum's large sculpture garden is among the finest in Europe.",
    facts: [
      "Its founder was among the very first major collectors of Van Gogh.",
      "It sits inside a national park you can explore on free white bikes.",
      "Its sculpture garden is one of the largest in Europe.",
    ],
  },
  'Galerías nacionales de Escocia': {
    lead:
      "The National Galleries of Scotland in Edinburgh, holding the nation's collection of fine art from the old masters to Impressionism.",
    city: 'Edinburgh, UK',
    founded: '1859',
    highlights: [
      "Gauguin's 'Vision after the Sermon'",
      'Scottish and European old masters',
      'Impressionist and later works',
      'The finest survey of Scottish art anywhere',
    ],
    about:
      "The National Galleries of Scotland are spread across several linked buildings in the heart of Edinburgh, including the neoclassical National Gallery on the Mound and the portrait and modern-art galleries. Grown from a mid-19th-century national collection, they combine key European works with the deepest holdings of Scottish art in existence, and are free to enter.",
    facts: [
      "They span several linked galleries in the centre of Edinburgh.",
      "They hold the finest collection of Scottish art in the world.",
    ],
  },
  'Palais des Beaux-Arts de Lille': {
    lead:
      "The Palais des Beaux-Arts in Lille, one of the largest art museums in France outside Paris.",
    city: 'Lille, France',
    founded: '1801',
    highlights: [
      "A principal version of David's 'Belisarius Begging for Alms'",
      'A rich collection of European painting',
      'Old masters and 19th-century French art',
      'Goya, Rubens and the Flemish schools',
    ],
    about:
      "The museum was created in 1801 as part of a Napoleonic decree that sent major works from the national collection out to a handful of provincial French cities, spreading great art beyond Paris. It moved into its grand Belle Époque palace in 1892 and holds an exceptional range of European painting, especially strong in Flemish and French art given Lille's position near the Belgian border.",
    facts: [
      "It was founded under Napoleon to bring great art to the French regions.",
      "Its holdings are especially rich in Flemish art, thanks to Lille's border location.",
    ],
  },
  'Antigua Galería Nacional de Berlín': {
    lead:
      "The Alte Nationalgalerie on Berlin's Museum Island, holding 19th-century art and a great home of German Romanticism.",
    city: 'Berlin, Germany',
    founded: '1876',
    highlights: [
      'Key works by Caspar David Friedrich',
      "Friedrich's 'The Abbey in the Oakwood'",
      'German Romantic and Impressionist painting',
      'A temple-like building on a UNESCO island',
    ],
    about:
      "Opened in 1876, the 'Old National Gallery' is a temple-like building on Berlin's Museum Island, a cluster of five museums together listed as a UNESCO World Heritage Site. It gathers 19th-century art with German Romanticism at its heart, above all the visionary landscapes of Caspar David Friedrich, alongside German and French Impressionism. It was heavily damaged in the Second World War and painstakingly restored.",
    facts: [
      "It stands on Berlin's Museum Island, a UNESCO World Heritage site.",
      "It was badly damaged in WWII and later carefully rebuilt.",
    ],
  },
  'Kunsthalle de Hamburgo': {
    lead:
      "The Hamburger Kunsthalle, one of Germany's largest art museums, celebrated for its German Romanticism.",
    city: 'Hamburg, Germany',
    founded: '1869',
    highlights: [
      "Friedrich's 'Wanderer above the Sea of Fog'",
      "Friedrich's 'The Sea of Ice'",
      'Art from the Middle Ages to the present',
      'Old masters, Romanticism and modern art',
    ],
    about:
      "Founded in 1869 by the city's art association, the Kunsthalle spans several connected buildings and covers art from medieval altarpieces to contemporary work. It is above all a place of pilgrimage for lovers of Caspar David Friedrich, holding the single most famous image of Romanticism, the 'Wanderer above the Sea of Fog,' which has become an icon reproduced around the world.",
    facts: [
      "It holds the 'Wanderer,' the single most famous image of Romanticism.",
      "Its buildings range from a 19th-century hall to a stark modern cube.",
    ],
  },
  'Museo Munch': {
    lead:
      "The Munch Museum (MUNCH) in Oslo, dedicated to Edvard Munch, who bequeathed the bulk of his work to the city.",
    city: 'Oslo, Norway',
    founded: '1963',
    highlights: [
      "Versions of 'The Scream,' 'Madonna,' 'Vampire' and 'Anxiety'",
      'Thousands of paintings, prints and drawings',
      "The definitive collection of Munch's art",
      'A dramatic new waterfront tower',
    ],
    about:
      "When Munch died in 1944 he left his enormous personal holdings — over 26,000 works — to the city of Oslo, the foundation of this museum. It opened in 1963 and moved in 2021 into a striking 13-storey tower on Oslo's waterfront, making it the definitive home of his art. Because he kept so many versions and prints of his key images, the museum can show the evolution of a single motif like 'The Scream' across a lifetime.",
    facts: [
      "Munch left the city over 26,000 of his own works.",
      "It reopened in 2021 in a dramatic new 13-storey waterfront building.",
      "It can trace how Munch reworked a single image across many versions.",
    ],
  },
  'Kunsthaus Zürich': {
    lead:
      "The Kunsthaus Zürich, the leading art museum of Switzerland's largest city, strong in modern art.",
    city: 'Zurich, Switzerland',
    founded: '1910',
    highlights: [
      'Works by Munch and the Expressionists',
      'A classic Mondrian composition',
      'The largest Munch collection outside Norway',
      'Old masters through to contemporary art',
    ],
    about:
      "Run by a long-standing local art society, the Kunsthaus opened its main building in 1910 and expanded greatly with a major new wing in 2021, making it one of the largest art museums in Switzerland. It holds an important collection of modern art — including the biggest group of Munch works outside Norway — alongside old masters, Swiss art and a notable collection of Alberto Giacometti.",
    facts: [
      "A major 2021 extension made it one of the largest art museums in Switzerland.",
      "It holds the largest collection of Munch outside Norway.",
    ],
  },
  'Museo Leopold': {
    lead:
      "The Leopold Museum in Vienna, built on a great private collection and holding the world's largest trove of Egon Schiele.",
    city: 'Vienna, Austria',
    founded: '2001',
    highlights: [
      "The world's largest collection of Egon Schiele",
      'Major works by Gustav Klimt',
      'A home of Viennese modernism (Vienna 1900)',
      'Design and decorative arts of the era',
    ],
    about:
      "The ophthalmologist Rudolf Leopold spent five decades assembling a vast collection of Austrian modern art, especially Egon Schiele, buying his works when the artist was still shocking and undervalued. In 2001 the collection became a public museum in Vienna's MuseumsQuartier, a sleek white cube devoted to the ferment of 'Vienna 1900,' the city's brilliant, anxious turn-of-the-century culture.",
    facts: [
      "It was built on the lifelong collection of a single Viennese eye doctor.",
      "It holds more works by Egon Schiele than anywhere else on Earth.",
      "It is a key museum of the 'Vienna 1900' era.",
    ],
  },
  'Galería Belvedere': {
    lead:
      "The Belvedere in Vienna, a magnificent Baroque palace holding the Austrian national collection and, above all, the art of Gustav Klimt.",
    city: 'Vienna, Austria',
    founded: '1781 (public)',
    highlights: [
      "Klimt's golden masterpiece 'The Kiss'",
      'The largest Klimt collection in the world',
      'Key works by Egon Schiele',
      'A sweep of Austrian art in a Baroque palace',
    ],
    about:
      "Built in the early 18th century as the summer palace of the military hero Prince Eugene of Savoy, the Belvedere opened its imperial picture collection to the public in 1781 — among the very first public museums in the world, years before the Louvre. Today it is best known as the home of Gustav Klimt, holding the world's largest collection of his work, including 'The Kiss,' which has hung there since it was painted.",
    facts: [
      "It opened to the public in 1781, among the first museums to do so.",
      "'The Kiss' has hung here since it was painted.",
      "It holds the largest collection of Klimt in the world.",
    ],
  },
  'Museo Nacional de Arte, Arquitectura y Diseño': {
    lead:
      "The National Museum in Oslo, holding Norway's principal collection of art, architecture and design.",
    city: 'Oslo, Norway',
    founded: '2003 (merger)',
    highlights: [
      "The most famous versions of Munch's masterpieces, including 'The Scream'",
      "Norway's national art holdings",
      'Art, architecture and design together',
      'A vast new purpose-built home',
    ],
    about:
      "Formed by merging several older Norwegian institutions, the National Museum brought the nation's art, architecture and design collections under one roof and opened its huge new building in Oslo in 2022 — among the largest art museums in the Nordic countries. Its highlights include the best-known versions of Edvard Munch's masterpieces, displayed in a specially secured room after the earlier thefts of 'The Scream.'",
    facts: [
      "Its huge new building, opened in 2022, is among the largest in the Nordic countries.",
      "It unites art, architecture and design in a single institution.",
    ],
  },
  'Pinacoteca del Estado de São Paulo': {
    lead:
      "The Pinacoteca de São Paulo, the oldest art museum in the city, holding one of the most important collections of Brazilian art.",
    city: 'São Paulo, Brazil',
    founded: '1905',
    highlights: [
      "Almeida Júnior's 'Caipira Shredding Tobacco'",
      "Almeida Júnior's 'The Guitar Player'",
      'A deep survey of Brazilian art',
      'A restored early-20th-century building',
    ],
    about:
      "Founded in 1905 in a repurposed school building near the city's old railway station, the Pinacoteca focuses on Brazilian art from the 19th century to the present. Its handsome brick building was elegantly restored in the 1990s by the architect Paulo Mendes da Rocha, and its collection is especially rich in the painters, like Almeida Júnior, who first turned art toward genuinely Brazilian subjects.",
    facts: [
      "It is São Paulo's oldest art museum.",
      "Its building was renovated by the Pritzker-winning architect Paulo Mendes da Rocha.",
    ],
  },
  'Nezu Art Museum': {
    lead:
      "The Nezu Museum in Tokyo, built around a businessman's collection and set amid a famous traditional garden.",
    city: 'Tokyo, Japan',
    founded: '1941',
    highlights: [
      "Ogata Kōrin's National Treasure 'Irises' screens",
      'Renowned Japanese and East Asian art',
      'A celebrated strolling garden with teahouses',
      'A modern building by architect Kengo Kuma',
    ],
    about:
      "The museum grew from the collection of the industrialist Nezu Kaichirō and opened in 1941, rebuilt in 2009 in a serene modern building by the architect Kengo Kuma. Its Kōrin 'Irises' screens, a National Treasure, are traditionally displayed each spring — timed so that visitors can then step out into the museum's celebrated garden and see the real irises in bloom.",
    facts: [
      "Its famous 'Irises' screens are shown each spring to match the blooming garden.",
      "Its landscaped garden with teahouses is a rare oasis in central Tokyo.",
      "The current building is by the renowned architect Kengo Kuma.",
    ],
  },
  'MOA': {
    lead:
      "The MOA Museum of Art in Atami, Japan, overlooking the sea, holding a distinguished collection of Japanese and East Asian art.",
    city: 'Atami, Japan',
    founded: '1982',
    highlights: [
      "Ogata Kōrin's National Treasure 'Red and White Plum Blossoms'",
      'Masterpieces of the Rinpa school',
      'Japanese and East Asian art',
      'A dramatic hillside building above the coast',
    ],
    about:
      "Perched high on a hillside above the coastal hot-spring resort of Atami, with sweeping views over the sea, the MOA opened in 1982 and is reached through a striking series of long escalators cut into the mountain. It centres on its supreme Rinpa treasure by Kōrin, and rotates its most delicate works to protect them, displaying the 'Plum Blossoms' screens around plum-blossom season.",
    facts: [
      "It sits on a hillside with panoramic views over the sea at Atami.",
      "Visitors ascend to it through long escalators bored into the mountain.",
    ],
  },
  'Museo Nacional de Kioto': {
    lead:
      "The Kyoto National Museum, one of Japan's principal museums, dedicated to the pre-modern art and heritage of the old imperial capital.",
    city: 'Kyoto, Japan',
    founded: '1897',
    highlights: [
      'Numerous National Treasures of painting, sculpture and craft',
      'Pre-modern Japanese art',
      "Treasures entrusted by Kyoto's temples and shrines",
      'A historic 1897 building and a modern wing',
    ],
    about:
      "Founded in 1897, the Kyoto National Museum safeguards and displays the artistic heritage of Kyoto, which was Japan's imperial capital for over a thousand years. Much of its collection is entrusted to it by the city's ancient temples and shrines, and it plays a leading role in conserving Japan's cultural treasures, pairing its original Meiji-era brick hall with a sleek modern exhibition wing.",
    facts: [
      "Much of its holdings come from Kyoto's ancient temples and shrines.",
      "Kyoto was Japan's capital for more than a thousand years.",
    ],
  },
};

export const MUSEUM_INFO_ES: Record<string, MuseumInfo> = {
  'Museo del Prado': {
    lead:
      "El museo de arte nacional de España, en Madrid, y una de las mayores pinacotecas del mundo.",
    city: 'Madrid, España',
    founded: '1819',
    highlights: [
      'Los mejores fondos del mundo de Velázquez, Goya y El Greco',
      "'Las meninas' de Velázquez y 'El 3 de mayo de 1808' de Goya",
      "Las privadas y pesadillescas 'Pinturas negras' de Goya",
      'Obras maestras de Tiziano, El Bosco, Rubens y Durero',
    ],
    about:
      "El Prado nació de la colección real española, reunida durante siglos por los reyes Habsburgo y Borbón, de los mayores mecenas de Europa; por eso guarda tantos Tiziano, tablas del Bosco y obras de Rubens junto a sus maestros españoles. Abrió al público en 1819, en un edificio pensado en origen para un museo de ciencias naturales. Más que un recorrido enciclopédico, ofrece una profundidad sin igual en unos pocos maestros supremos, y hoy ancla el 'triángulo del arte' madrileño con el Reina Sofía y el Thyssen-Bornemisza.",
    facts: [
      'Su colección empezó como la pinacoteca privada de los reyes de España.',
      'Guarda unas 50 obras de Rubens y cerca de 40 de Goya.',
      'El edificio se diseñó primero para ser un museo de ciencias, no de arte.',
    ],
  },
  'Museo de Orsay': {
    lead:
      "Un museo de París instalado en una antigua y grandiosa estación de tren junto al Sena, con la mejor colección del mundo de arte impresionista y postimpresionista.",
    city: 'París, Francia',
    founded: '1986',
    highlights: [
      'Monet, Renoir, Degas, Van Gogh, Cézanne y Gauguin',
      "Autorretratos de Van Gogh y 'Noche estrellada sobre el Ródano'",
      'Pintura, escultura y diseño franceses de 1848 a 1914',
      'Puente entre el Louvre (arte antiguo) y el Pompidou (arte moderno)',
    ],
    about:
      "El Orsay ocupa la Gare d'Orsay, una estación de tren estilo Beaux-Arts de 1900 salvada de la demolición y renacida como museo en 1986. Su colección se reunió para llenar el vacío histórico entre los maestros antiguos del Louvre y el arte moderno del Centro Pompidou, convirtiéndolo en la casa esencial del arte francés de finales del XIX. Bajo su gran bóveda de vidrio, el enorme reloj original de la estación aún se asoma al Sena.",
    facts: [
      'El edificio era una estación de tren en funcionamiento antes de ser museo.',
      'Todavía puedes mirar a través del enorme reloj original de la estación.',
      'Se creó en parte porque el Louvre y el Pompidou dejaban un hueco en el relato del arte francés.',
    ],
  },
  'National Gallery de Londres': {
    lead:
      "La colección nacional británica de pintura europea occidental, en Trafalgar Square, con un espléndido y compacto recorrido de la Edad Media a 1900.",
    city: 'Londres, Reino Unido',
    founded: '1824',
    highlights: [
      "El 'Retrato Arnolfini' de Van Eyck",
      'Obras de Leonardo, Tiziano y Velázquez',
      "'El Temerario' de Turner",
      'Entrada gratuita a una de las grandes colecciones del mundo',
    ],
    about:
      "La National Gallery se fundó en 1824, cuando el gobierno compró la colección de un banquero de solo 38 cuadros, y se levantó a propósito en pleno corazón de Londres para que gente de toda clase pudiera llegar a pie. A diferencia de los museos nacidos de tesoros reales, se concibió desde el inicio como colección pública para la nación, elegida por calidad más que por cantidad. Siempre ha sido de entrada gratuita, y su tamaño relativamente pequeño se aprecia como una virtud.",
    facts: [
      'Empezó con solo 38 cuadros comprados a un coleccionista privado.',
      'Siempre ha sido gratuita y céntrica para que todos pudieran visitarla.',
      'Nunca fue una colección real: se creó para el público desde el principio.',
    ],
  },
  'Museo del Louvre': {
    lead:
      "El museo de arte más grande y visitado del mundo, en un antiguo palacio real de París, que abarca de la Antigüedad al siglo XIX.",
    city: 'París, Francia',
    founded: '1793',
    highlights: [
      "Casa de la 'Gioconda'",
      'Leonardo, David, Delacroix y Vermeer',
      'Iconos antiguos como la Venus de Milo y la Victoria de Samotracia',
      'Más de 30.000 obras expuestas en las salas del antiguo palacio',
    ],
    about:
      "El Louvre empezó como fortaleza medieval, se convirtió en palacio de los reyes de Francia y abrió como museo público en 1793, durante la Revolución, exhibiendo las antiguas colecciones reales y las incautadas. Napoleón lo engrandeció enormemente con arte tomado por toda Europa, mucho después devuelto. La entrada de la Pirámide de vidrio, de I. M. Pei, se añadió en 1989 entre polémicas y hoy es un icono en sí misma.",
    facts: [
      'Fue fortaleza y luego palacio real antes de ser museo.',
      'Napoleón lo llenó de arte saqueado por Europa, mucho luego devuelto.',
      'Recibe más visitantes que ningún otro museo de arte del planeta.',
    ],
  },
  'Museo Nacional de Bellas Artes': {
    lead:
      "El museo nacional de bellas artes de Argentina, en Buenos Aires, con la colección de arte más importante del país.",
    city: 'Buenos Aires, Argentina',
    founded: '1895',
    highlights: [
      "'Sin pan y sin trabajo' de De la Cárcova",
      'Las obras fundacionales de la pintura argentina: Della Valle, Sívori, Pueyrredón',
      'Maestros antiguos europeos e impresionistas franceses',
      'Entrada gratuita a la colección nacional',
    ],
    about:
      "Fundado en 1895 y trasladado luego a una antigua estación de bombeo de agua reconvertida, el museo reúne el arte europeo —de los maestros antiguos al Impresionismo— con los lienzos fundacionales de la pintura nacional argentina. Traza cómo un país joven, henchido por la inmigración europea, construyó un arte propio, de las escenas de gauchos y los retratos a obras audaces de protesta social.",
    facts: [
      'Es la casa más importante de la pintura argentina del siglo XIX.',
      'Su edificio se reconvirtió de una antigua estación de bombeo de agua.',
    ],
  },
  'Galería Uffizi': {
    lead:
      "El gran tesoro renacentista de Florencia y uno de los museos más antiguos del mundo, en un palacio del siglo XVI construido para los Medici.",
    city: 'Florencia, Italia',
    founded: '1765 (al público)',
    highlights: [
      "'El nacimiento de Venus' y 'La primavera' de Botticelli",
      'Leonardo, Miguel Ángel, Rafael y Tiziano',
      'El recorrido sin igual del arte del Renacimiento italiano',
      'Un famoso corredor de escultura antigua',
    ],
    about:
      "Los Uffizi ('oficinas') se levantaron en la década de 1560 para albergar las oficinas del gobierno florentino, y poco a poco se llenaron con la extraordinaria colección de los Medici. Al extinguirse la dinastía, la última heredera, Ana María Luisa, legó toda la colección a Florencia en 1743 con la condición de que nunca saliera de la ciudad, lo que hizo de los Uffizi uno de los primeros museos públicos.",
    facts: [
      "El edificio era en origen oficinas de gobierno: de ahí el nombre 'Uffizi'.",
      'La última heredera Medici lo legó a Florencia con la condición de que jamás saliera de la ciudad.',
      'Su larga historia lo hace uno de los museos más antiguos del mundo.',
    ],
  },
  'Museo de Arte Moderno': {
    lead:
      "El Museo de Arte Moderno (MoMA) de Nueva York, uno de los museos de arte moderno y contemporáneo más influyentes del mundo.",
    city: 'Nueva York, EE. UU.',
    founded: '1929',
    highlights: [
      "'La noche estrellada' de Van Gogh",
      'Picasso, Matisse, Mondrian y Malévich',
      "'Gas' de Hopper e iconos del siglo XX",
      'Diseño, cine y fotografía además de pintura',
    ],
    about:
      "El MoMA se fundó en 1929, apenas días después del crac de Wall Street, por un pequeño grupo de mecenas encabezado por Abby Aldrich Rockefeller, cuando los museos estadounidenses consolidados aún ignoraban a los artistas vivos. A través de sus exposiciones, publicaciones y adquisiciones hizo más que ninguna otra institución por definir el relato mismo del arte moderno, tomándose tan en serio la arquitectura, el diseño, el cine y la fotografía como la pintura.",
    facts: [
      'Abrió apenas días después del crac bursátil de 1929.',
      'Sus fundadores defendieron el arte moderno cuando otros museos aún lo rechazaban.',
      'Su colección abarca diseño, cine y fotografía, no solo bellas artes.',
    ],
  },
  'Galería Nacional de Arte': {
    lead:
      "La National Gallery of Art en Washington D. C., la colección nacional de Estados Unidos, de entrada gratuita.",
    city: 'Washington D. C., EE. UU.',
    founded: '1937',
    highlights: [
      "'Ginebra de' Benci' de Leonardo — el único Leonardo de América",
      'Maestros antiguos europeos junto a hondos fondos estadounidenses',
      'Una vasta colección formada casi por completo con donaciones',
      'Entrada gratuita, financiada con donaciones privadas',
    ],
    about:
      "La National Gallery se fundó en 1937 con una donación histórica de arte y dinero del financiero Andrew Mellon, que insistió en que el museo llevara el nombre de la nación y no el suyo para animar a otros coleccionistas a donar. La estrategia funcionó: creció con las donaciones de los grandes coleccionistas de EE. UU. hasta ser una de las mejores galerías del mundo. Gratuita, combina maestros antiguos europeos con un recorrido excepcional del arte estadounidense.",
    facts: [
      'Guarda la única pintura de Leonardo da Vinci de toda América.',
      'Su fundador se negó a poner su propio nombre para animar a otros donantes.',
      'Casi toda su colección llegó por donaciones privadas, no por compras.',
    ],
  },
  'Instituto de Arte de Chicago': {
    lead:
      "Uno de los museos de arte más antiguos y grandes de Estados Unidos, con una colección enciclopédica especialmente rica en Impresionismo y arte estadounidense.",
    city: 'Chicago, EE. UU.',
    founded: '1879',
    highlights: [
      "'Un domingo en la Grande Jatte' de Seurat",
      "'Nighthawks' de Hopper",
      "'American Gothic' de Grant Wood",
      'Una de las mejores colecciones impresionistas fuera de París',
    ],
    about:
      "Fundado en 1879 a la vez como museo y escuela, el Art Institute creció junto al pujante Chicago de finales del XIX y se instaló en su edificio emblemático para la Exposición Universal de 1893, custodiado desde entonces por dos famosos leones de bronce en Michigan Avenue. Donaciones tempranas de coleccionistas locales —muchos que compraban obras impresionistas directamente a marchantes de París— le dieron uno de los mayores fondos del movimiento.",
    facts: [
      'Dos leones de bronce flanquean su entrada desde 1893.',
      'Es a la vez museo y escuela de arte en activo.',
      'Su fuerza impresionista viene de coleccionistas de Chicago que compraban directo en París.',
    ],
  },
  'Rijksmuseum': {
    lead:
      "El museo nacional de los Países Bajos, en Ámsterdam, dedicado al arte y la historia holandeses y a la gloria del Siglo de Oro.",
    city: 'Ámsterdam, Países Bajos',
    founded: '1800',
    highlights: [
      "'La ronda de noche', el monumental Rembrandt",
      "'La lechera' y 'La callejuela' de Vermeer",
      'Obras maestras de Frans Hals y los pintores del Siglo de Oro',
      'Una grandiosa sede reabierta tras una década de obras',
    ],
    about:
      "El Rijksmuseum ('museo del Estado') remonta sus orígenes a 1800 y se trasladó a su grandioso edificio, casi catedralicio, del arquitecto Pierre Cuypers, en 1885. Tras una profunda renovación de diez años reabrió en 2013, con 'La ronda de noche' devuelta al lugar de honor al fondo de su Galería de Honor. En 2019-21 el cuadro pasó por una restauración pública muy comentada, observada tras un cristal por visitantes de todo el mundo.",
    facts: [
      "'La ronda de noche' cuelga en una sala diseñada especialmente para ella.",
      'El museo reabrió en 2013 tras una renovación de diez años.',
      "'La ronda de noche' se restauró hace poco a la vista del público, tras un cristal.",
    ],
  },
  'Museo Metropolitano de Arte': {
    lead:
      "El Metropolitan Museum of Art de Nueva York, uno de los museos más grandes y enciclopédicos del planeta, que abarca cinco mil años de cultura mundial.",
    city: 'Nueva York, EE. UU.',
    founded: '1870',
    highlights: [
      'Maestros antiguos europeos y hondos fondos de pintura estadounidense',
      'Sobresaliente arte asiático, antiguo e islámico',
      'Un templo egipcio entero, el Templo de Dendur',
      'Millones de visitantes al año junto a Central Park',
    ],
    about:
      "Fundado en 1870 por un grupo de líderes cívicos, empresarios y artistas que querían llevar el arte y su enseñanza al pueblo estadounidense, 'el Met' no tenía colección alguna al principio y creció con donaciones y compras hasta ser un vasto museo enciclopédico al borde de Central Park. Sus fondos van de templos egipcios y escultura griega a la pintura europea, el arte estadounidense y el de Asia, África y las Américas.",
    facts: [
      'Su colección abarca unos 5.000 años de todos los rincones del mundo.',
      'Contiene incluso un templo egipcio entero, el Templo de Dendur.',
      'Empezó en 1870 sin ninguna obra de arte.',
    ],
  },
  'Museo de Bellas Artes de Boston': {
    lead:
      "El Museum of Fine Arts de Boston, uno de los mayores de Estados Unidos, célebre por su Impresionismo francés y su arte asiático.",
    city: 'Boston, EE. UU.',
    founded: '1870',
    highlights: [
      'Impresionismo francés y pintura estadounidense',
      'Una de las mayores colecciones de arte japonés fuera de Japón',
      'Fondos del antiguo Egipto y Nubia',
      'Casi medio millón de obras de todas las culturas',
    ],
    about:
      "Fundado en 1870 y abierto en 1876, el MFA formó colecciones excepcionales gracias a las donaciones de la culta élite de Boston, varios de cuyos miembros tenían estrechos lazos con Japón justo cuando este se abría al mundo, lo que le dio de los primeros y mejores fondos de arte japonés en Occidente. Su colección egipcia creció con décadas de excavaciones propias.",
    facts: [
      'Tiene una de las mayores colecciones de arte japonés fuera de Japón.',
      'Sus fondos egipcios provienen de sus propias excavaciones arqueológicas.',
    ],
  },
  'Museo del Hermitage': {
    lead:
      "Uno de los museos más grandes y antiguos del mundo, en San Petersburgo, fundado por Catalina la Grande e instalado en gran parte en el antiguo Palacio de Invierno imperial.",
    city: 'San Petersburgo, Rusia',
    founded: '1764',
    highlights: [
      "'El regreso del hijo pródigo' de Rembrandt",
      "Grandes obras de Matisse, entre ellas 'La danza'",
      'Un vasto recorrido de la pintura europea y las antigüedades',
      'Galerías que se extienden kilómetros',
    ],
    about:
      "El Hermitage empezó en 1764 como colección privada de Catalina la Grande, guardada en un retiro apartado junto al Palacio de Invierno —un 'ermitage' del que toma su nombre—. Catalina compraba colecciones europeas enteras para rivalizar con las galerías reales de Occidente, y tras la Revolución de 1917 el museo absorbió grandes colecciones privadas, incluidas destacadas pinturas francesas modernas. Hoy se extiende por un complejo de edificios palaciegos tan vasto que recorrer todas sus salas supone kilómetros.",
    facts: [
      'Empezó como el tesoro artístico privado de la emperatriz Catalina la Grande.',
      'Ella compraba colecciones europeas enteras para eclipsar a la realeza occidental.',
      'Sus galerías son tan vastas que verlas todas supone caminar kilómetros.',
    ],
  },
  'Museu Nacional de Belas Artes': {
    lead:
      "El museo nacional de bellas artes de Brasil, en Río de Janeiro, con la colección de arte brasileño más importante.",
    city: 'Río de Janeiro, Brasil',
    founded: '1937',
    highlights: [
      'Grandes pinturas académicas y de historia del siglo XIX',
      'Pedro Américo, Victor Meirelles y sus contemporáneos',
      'Obras que moldearon la imagen que la nación tenía de sí misma',
      'Un recorrido del arte brasileño hasta la era moderna',
    ],
    about:
      "Las raíces del museo se remontan a la escuela de arte real fundada tras la huida de la corte portuguesa a Brasil a inicios del siglo XIX, que trajo a un grupo de artistas franceses para fundar una academia. Su colección es la gran casa de la pintura del Brasil imperial: los enormes lienzos de historia y las escenas románticas con que un país joven imaginó sus orígenes.",
    facts: [
      'Sus orígenes están en una academia fundada por artistas franceses invitados a Brasil en 1816.',
      'Guarda las imágenes que definen la fundación de Brasil como nación.',
    ],
  },
  'Museo Nacional de Arte': {
    lead:
      "El Museo Nacional de Arte (MUNAL) en la Ciudad de México, con la colección nacional del arte del país desde la época colonial hasta inicios del siglo XX.",
    city: 'Ciudad de México, México',
    founded: '1982',
    highlights: [
      'Los luminosos panoramas del Valle de México de Velasco',
      'Herrán, Izaguirre y los maestros académicos',
      'Arte mexicano de la época colonial a la moderna',
      'Un magnífico antiguo palacio de gobierno como sede',
    ],
    about:
      "El MUNAL ocupa un magnífico palacio de inicios del siglo XX en el centro histórico de la Ciudad de México, construido bajo el dictador Porfirio Díaz como Secretaría de Comunicaciones y luego convertido en museo, abierto en 1982. Sus salas trazan el arte mexicano de la época colonial a las vísperas del muralismo, mostrando cómo pintores como Velasco y Herrán forjaron una identidad artística nacional.",
    facts: [
      'Ocupa un lujoso antiguo palacio de gobierno en el centro histórico.',
      'Su colección se detiene hacia el amanecer de los célebres muralistas mexicanos.',
    ],
  },
  'Museo de Historia del Arte de Viena': {
    lead:
      "El Kunsthistorisches Museum de Viena, levantado para la colección imperial de los Habsburgo, entre los principales museos de arte del mundo.",
    city: 'Viena, Austria',
    founded: '1891',
    highlights: [
      'La mayor colección de pinturas de Bruegel del mundo',
      "'La torre de Babel' y 'Los cazadores en la nieve' de Bruegel",
      'Obras maestras de Tiziano, Velázquez, Vermeer y Rubens',
      'Un edificio palaciego con una escalera decorada por Klimt',
    ],
    about:
      "Abierto en 1891 para exhibir la vasta colección de los emperadores Habsburgo, el 'Museo de Historia del Arte' es un edificio palaciego en la gran Ringstrasse de Viena, con la escalera decorada por el joven Gustav Klimt. Siglos de coleccionismo imperial —los Habsburgo gobernaron buena parte de Europa— le dieron una hondura extraordinaria, sobre todo la mayor concentración del mundo de Pieter Bruegel el Viejo, cuya obra conservada es escasa y preciosa.",
    facts: [
      'Guarda una docena de las cuarenta tablas de Bruegel que sobreviven.',
      'Se construyó a propósito para lucir la colección imperial de los Habsburgo.',
      'Un joven Gustav Klimt ayudó a decorar su gran escalera.',
    ],
  },
  'Museo de Arte de Filadelfia': {
    lead:
      "El Philadelphia Museum of Art, uno de los mayores de Estados Unidos, famoso para muchos por la gran escalinata de su edificio de aire templario.",
    city: 'Filadelfia, EE. UU.',
    founded: '1876',
    highlights: [
      'Grandes obras de Cézanne y Poussin',
      "La obra maestra de Klee, 'Ad Parnassum'",
      'Ricos fondos europeos, estadounidenses y modernos',
      "Las mundialmente famosas 'escaleras de Rocky'",
    ],
    about:
      "El museo se fundó en relación con la Exposición del Centenario de 1876 —la primera gran Exposición Universal de EE. UU., celebrada en Filadelfia— y se trasladó a su monumental edificio neogriego, en lo alto de una colina, en 1928. Sus escalones se hicieron mundialmente famosos por la película 'Rocky', con una estatua de bronce cerca, pero dentro guarda hondas colecciones de arte europeo, estadounidense y moderno, incluido un célebre conjunto de Cézanne y Duchamp.",
    facts: [
      "Su escalinata se conoce en el mundo entero como las 'escaleras de Rocky'.",
      'Surgió de la primera gran Exposición Universal de EE. UU., en 1876.',
      "Una estatua de bronce de 'Rocky' está al pie de la escalinata.",
    ],
  },
  'Museo van Gogh': {
    lead:
      "El Museo Van Gogh de Ámsterdam, sede de la mayor colección del mundo de la obra de Vincent van Gogh.",
    city: 'Ámsterdam, Países Bajos',
    founded: '1973',
    highlights: [
      "'Los comedores de patatas', 'Los girasoles' y 'El dormitorio'",
      'Los campos finales y cientos de dibujos',
      'Las cartas de Van Gogh a su hermano Theo',
      'Obras de sus contemporáneos como contexto',
    ],
    about:
      "El museo se construyó en torno a la colección que conservó el devoto hermano de Van Gogh, Theo, marchante de arte, y que tras la muerte de ambos preservaron la viuda y el hijo de Theo, salvaguardando las pinturas, los dibujos y su extraordinaria correspondencia. Abierto en 1973, permite seguir toda la corta e intensa carrera del artista en un solo lugar, de las oscuras obras holandesas al color ardiente de sus últimos años.",
    facts: [
      'La colección sobrevivió porque la familia de Van Gogh la mantuvo unida durante décadas.',
      'Guarda muchas de sus cartas manuscritas además de su arte.',
      'Recorre toda su carrera, de los oscuros inicios a sus últimas obras ardientes.',
    ],
  },
  'Catedral de Amberes': {
    lead:
      "La Catedral de Nuestra Señora de Amberes, una imponente iglesia gótica y el corazón artístico de la ciudad natal de Rubens.",
    city: 'Amberes, Bélgica',
    founded: 'construida ss. XIV–XVI',
    highlights: [
      "'La elevación de la cruz' de Rubens",
      "'El descendimiento de la cruz' de Rubens",
      'Retablos que siguen en el lugar para el que se hicieron',
      'La aguja gótica más alta de los Países Bajos',
    ],
    about:
      "A diferencia de las demás instituciones aquí, esta es una catedral en activo, no un museo: la mayor iglesia gótica de los Países Bajos, siglos en construcción. Guarda varios retablos monumentales de Pedro Pablo Rubens, el hijo más famoso de Amberes, en los mismos espacios para los que se pintaron, una rara ocasión de ver obras maestras del Barroco en su emplazamiento original. Rubens está enterrado en otra iglesia de la misma ciudad.",
    facts: [
      'Es una catedral viva, no un museo: los Rubens cuelgan donde él quiso.',
      'Su aguja es la torre de iglesia más alta de los Países Bajos.',
      'Rubens nació y fue enterrado en Amberes, la ciudad que adornan estos retablos.',
    ],
  },
  'Galería Tretiakov': {
    lead:
      "La Galería Estatal Tretiakov de Moscú, la principal colección de arte ruso, de los iconos medievales a la vanguardia.",
    city: 'Moscú, Rusia',
    founded: '1856',
    highlights: [
      'Los paisajes de Levitán y obras maestras rusas',
      "El 'Cuadrado negro' de Malévich",
      'Siglos de pintura rusa e iconos religiosos',
      'El venerado icono de la Trinidad de Andréi Rubliov',
    ],
    about:
      "La galería nació de la colección privada del comerciante Pável Tretiakov, quien desde 1856 se propuso, casi en solitario, formar una colección nacional de arte ruso cuando la élite prefería la obra europea. Compraba directamente a los artistas vivos y donó toda la colección a la ciudad de Moscú en 1892. Sigue siendo la casa esencial de la pintura rusa, de los iconos medievales al realismo del XIX y la vanguardia revolucionaria.",
    facts: [
      'La fundó un solo comerciante entregado a coleccionar arte ruso.',
      'Donó toda la colección a la ciudad de Moscú en 1892.',
      'Va de antiguos iconos religiosos a la abstracción radical de Malévich.',
    ],
  },
  'Galería Nacional de Noruega': {
    lead:
      "La antigua Galería Nacional de Noruega en Oslo, hoy parte del Museo Nacional, con la colección de arte más importante del país.",
    city: 'Oslo, Noruega',
    founded: '1837',
    highlights: [
      "La versión más famosa de 'El grito' de Munch",
      "'La danza de la vida' de Munch",
      'Los principales fondos históricos del arte noruego',
      'Paisajes románticos noruegos',
    ],
    about:
      "Fue durante mucho tiempo el principal museo de arte de Noruega, custodio de la colección nacional desde 1837 hasta que sus fondos se integraron en el vasto Museo Nacional inaugurado en Oslo en 2022. Sus tesoros más conocidos son las versiones de las obras maestras de Edvard Munch, orgullo del arte noruego, junto a los paisajes románticos con que Noruega afirmó su identidad nacional en el siglo XIX.",
    facts: [
      'Sus fondos hoy forman parte del enorme nuevo Museo Nacional de Oslo, abierto en 2022.',
      "'El grito' ha sido blanco de dos famosos robos de arte.",
    ],
  },
  'Museo Nacional de Tokio': {
    lead:
      "El Museo Nacional de Tokio, el más antiguo y grande de Japón, con la mayor colección del mundo de arte y antigüedades japonesas.",
    city: 'Tokio, Japón',
    founded: '1872',
    highlights: [
      "'Pinos' de Tōhaku",
      "'Cipreses' de Eitoku",
      "'Paisaje de invierno' de Sesshū",
      'Más de cien Tesoros Nacionales designados',
    ],
    about:
      "Fundado en 1872 y situado en el parque Ueno de Tokio, el museo custodia el patrimonio artístico de Japón en pintura, escultura, cerámica, textiles y espadas, incluidas más de cien obras designadas Tesoro Nacional. Como los biombos y rollos japoneses son frágiles y sensibles a la luz, sus mejores pinturas solo se exhiben por rotación, unas pocas semanas cada vez, de modo que no hay dos visitas iguales.",
    facts: [
      'Guarda más de cien obras oficialmente designadas Tesoro Nacional.',
      'Sus pinturas más preciadas solo se muestran brevemente, por rotación.',
      'Es el museo nacional más antiguo de Japón.',
    ],
  },
  'Galería Borghese': {
    lead:
      "La Galería Borghese de Roma, en una espléndida villa construida para un gran coleccionista de inicios del siglo XVII, con una concentración extraordinaria de obras maestras del Barroco.",
    city: 'Roma, Italia',
    founded: 'colección desde el s. XVII',
    highlights: [
      'Las virtuosas esculturas en mármol de Bernini',
      'Varios Caravaggios',
      "'Amor sagrado y amor profano' de Tiziano",
      'Una villa-joyero en el mayor parque de Roma',
    ],
    about:
      "La colección la reunió el cardenal Scipione Borghese, sobrino del papa y mecenas apasionado y despiadado que adquiría arte casi por cualquier medio, incluso incautando obras que codiciaba. Fue el gran primer protector del joven Bernini y de Caravaggio, y su villa y sus tesoros han permanecido notablemente intactos durante cuatro siglos. Como el marco es íntimo, hoy se visita con entrada por franja horaria para limitar el gentío.",
    facts: [
      'Su fundador, un cardenal, a veces se apoderaba por la fuerza o la intriga del arte que quería.',
      'Fue el primer gran mecenas tanto de Bernini como de Caravaggio.',
      'La entrada es con reserva de dos horas para proteger la pequeña villa.',
    ],
  },
  'Colecciones de Pinturas del Estado de Baviera': {
    lead:
      "Las Colecciones de Pinturas del Estado de Baviera, cuya joya es la Alte Pinakothek de Múnich, una de las pinacotecas más antiguas del mundo.",
    city: 'Múnich, Alemania',
    founded: '1836',
    highlights: [
      'El autorretrato de Durero',
      'Espléndidos maestros antiguos alemanes, flamencos y holandeses',
      'Un gran conjunto de obras de Rubens',
      'Rembrandt y las escuelas del norte',
    ],
    about:
      "La Alte Pinakothek abrió en 1836 para exhibir las colecciones de pintura de la dinastía Wittelsbach, que gobernó Baviera durante siglos y fue ávida coleccionista. Sus galerías, con salas cenitales pensadas para contemplar cuadros, sirvieron de modelo imitado por museos de toda Europa. Las Colecciones de Pinturas del Estado de Baviera que encabeza gestionan además otras galerías muniquesas del siglo XIX a la actualidad.",
    facts: [
      'Su colección la formó la dinastía Wittelsbach durante varios siglos.',
      'Su edificio de 1836 influyó en el diseño de museos posteriores en toda Europa.',
      'Guarda una de las mejores colecciones de Rubens fuera de Amberes.',
    ],
  },
  'Museo Marmottan Monet': {
    lead:
      "El Museo Marmottan Monet de París, sede de la mayor colección del mundo de obras de Claude Monet.",
    city: 'París, Francia',
    founded: '1934',
    highlights: [
      "'Impresión, sol naciente' — el cuadro que dio nombre al Impresionismo",
      'Muchos nenúfares tardíos de Giverny',
      'Obras de Morisot y otros impresionistas',
      'Un marco íntimo de mansión junto al Bois de Boulogne',
    ],
    about:
      "Antes mansión privada y antiguo pabellón de caza, el Marmottan se hizo museo en 1934 y se transformó cuando el hijo de Monet, Michel, le legó los fondos personales del artista, los mayores que existen. Guarda además una gran colección de Berthe Morisot. Su mayor tesoro, 'Impresión, sol naciente', estuvo entre las obras robadas en un célebre atraco a mano armada en 1985 y luego recuperado.",
    facts: [
      "Posee 'Impresión, sol naciente', el cuadro que dio nombre al movimiento.",
      'El propio hijo de Monet legó el gran tesoro de la obra de su padre.',
      'Ese famoso lienzo fue robado en un atraco de 1985 y luego recuperado.',
    ],
  },
  'Museo Kröller-Müller': {
    lead:
      "El Museo Kröller-Müller de los Países Bajos, dentro de un parque nacional, formado en torno a la colección de una temprana defensora de Van Gogh.",
    city: 'Otterlo, Países Bajos',
    founded: '1938',
    highlights: [
      'La segunda mayor colección de Van Gogh del mundo',
      "'Terraza de café por la noche' de Van Gogh",
      'Un célebre jardín de esculturas al aire libre',
      'Obras de Seurat, Mondrian y maestros modernos',
    ],
    about:
      "Helene Kröller-Müller fue de las primeras coleccionistas en captar la importancia de Van Gogh, reuniendo casi 300 de sus obras cuando aún se le apreciaba poco. Ella y su marido donaron su vasta colección al Estado holandés, y el museo abrió en 1938 entre los bosques y brezales del parque nacional Hoge Veluwe. Los visitantes suelen recorrer el parque en bicicletas blancas gratuitas, y su gran jardín de esculturas es de los mejores de Europa.",
    facts: [
      'Su fundadora fue de las primerísimas grandes coleccionistas de Van Gogh.',
      'Está dentro de un parque nacional que puedes recorrer en bicis blancas gratuitas.',
      'Su jardín de esculturas es uno de los mayores de Europa.',
    ],
  },
  'Galerías nacionales de Escocia': {
    lead:
      "Las Galerías Nacionales de Escocia, en Edimburgo, con la colección de bellas artes del país, de los maestros antiguos al Impresionismo.",
    city: 'Edimburgo, Reino Unido',
    founded: '1859',
    highlights: [
      "'Visión después del sermón' de Gauguin",
      'Maestros antiguos escoceses y europeos',
      'Obras impresionistas y posteriores',
      'El mejor recorrido del arte escocés que existe',
    ],
    about:
      "Las Galerías Nacionales de Escocia se reparten en varios edificios enlazados en el corazón de Edimburgo, entre ellos la neoclásica National Gallery en el Mound y las galerías de retrato y arte moderno. Nacidas de una colección nacional de mediados del siglo XIX, combinan obras europeas clave con los fondos más profundos de arte escocés que existen, y son de entrada gratuita.",
    facts: [
      'Abarcan varias galerías enlazadas en el centro de Edimburgo.',
      'Guardan la mejor colección de arte escocés del mundo.',
    ],
  },
  'Palais des Beaux-Arts de Lille': {
    lead:
      "El Palais des Beaux-Arts de Lille, uno de los mayores museos de arte de Francia fuera de París.",
    city: 'Lille, Francia',
    founded: '1801',
    highlights: [
      "Una versión principal de 'Belisario pidiendo limosna' de David",
      'Una rica colección de pintura europea',
      'Maestros antiguos y arte francés del siglo XIX',
      'Goya, Rubens y las escuelas flamencas',
    ],
    about:
      "El museo se creó en 1801 como parte de un decreto napoleónico que envió obras importantes de la colección nacional a un puñado de ciudades francesas de provincia, difundiendo el gran arte más allá de París. Se trasladó a su grandioso palacio de la Belle Époque en 1892 y guarda un conjunto excepcional de pintura europea, especialmente rico en arte flamenco por la cercanía de Lille a la frontera belga.",
    facts: [
      'Se fundó bajo Napoleón para llevar el gran arte a las provincias francesas.',
      'Sus fondos son especialmente ricos en arte flamenco, por su ubicación fronteriza.',
    ],
  },
  'Antigua Galería Nacional de Berlín': {
    lead:
      "La Alte Nationalgalerie, en la Isla de los Museos de Berlín, con arte del siglo XIX y una gran casa del Romanticismo alemán.",
    city: 'Berlín, Alemania',
    founded: '1876',
    highlights: [
      'Obras clave de Caspar David Friedrich',
      "'La abadía en el robledal' de Friedrich",
      'Pintura romántica alemana e impresionista',
      'Un edificio de aire templario en una isla Patrimonio de la Humanidad',
    ],
    about:
      "Abierta en 1876, la 'Antigua Galería Nacional' es un edificio de aire templario en la Isla de los Museos de Berlín, un conjunto de cinco museos declarado Patrimonio de la Humanidad por la Unesco. Reúne arte del siglo XIX con el Romanticismo alemán en el centro, sobre todo los paisajes visionarios de Caspar David Friedrich, junto al impresionismo alemán y francés. Quedó muy dañada en la Segunda Guerra Mundial y se restauró con esmero.",
    facts: [
      'Se alza en la Isla de los Museos de Berlín, Patrimonio de la Humanidad.',
      'Quedó muy dañada en la Segunda Guerra Mundial y luego se reconstruyó con cuidado.',
    ],
  },
  'Kunsthalle de Hamburgo': {
    lead:
      "La Hamburger Kunsthalle, uno de los mayores museos de arte de Alemania, célebre por su Romanticismo alemán.",
    city: 'Hamburgo, Alemania',
    founded: '1869',
    highlights: [
      "'El caminante sobre el mar de nubes' de Friedrich",
      "'El mar de hielo' de Friedrich",
      'Arte de la Edad Media al presente',
      'Maestros antiguos, Romanticismo y arte moderno',
    ],
    about:
      "Fundada en 1869 por la asociación de arte de la ciudad, la Kunsthalle se reparte en varios edificios conectados y abarca el arte desde los retablos medievales hasta lo contemporáneo. Es sobre todo lugar de peregrinación para los amantes de Caspar David Friedrich, pues guarda la imagen más famosa del Romanticismo, 'El caminante sobre el mar de nubes', convertida en un icono reproducido por todo el mundo.",
    facts: [
      "Guarda 'El caminante', la imagen más famosa del Romanticismo.",
      'Sus edificios van de una sala del siglo XIX a un austero cubo moderno.',
    ],
  },
  'Museo Munch': {
    lead:
      "El Museo Munch (MUNCH) de Oslo, dedicado a Edvard Munch, que legó el grueso de su obra a la ciudad.",
    city: 'Oslo, Noruega',
    founded: '1963',
    highlights: [
      "Versiones de 'El grito', 'Madonna', 'Vampiro' y 'Ansiedad'",
      'Miles de pinturas, grabados y dibujos',
      'La colección definitiva del arte de Munch',
      'Una espectacular nueva torre junto al agua',
    ],
    about:
      "Cuando Munch murió en 1944 legó sus enormes fondos personales —más de 26.000 obras— a la ciudad de Oslo, cimiento de este museo. Abrió en 1963 y se trasladó en 2021 a una llamativa torre de 13 plantas junto al agua de Oslo, convirtiéndose en la casa definitiva de su arte. Como conservó tantas versiones y grabados de sus imágenes clave, el museo puede mostrar la evolución de un mismo motivo como 'El grito' a lo largo de toda una vida.",
    facts: [
      'Munch legó a la ciudad más de 26.000 obras propias.',
      'Reabrió en 2021 en un espectacular nuevo edificio de 13 plantas junto al agua.',
      'Puede rastrear cómo Munch rehizo una misma imagen en muchas versiones.',
    ],
  },
  'Kunsthaus Zürich': {
    lead:
      "El Kunsthaus Zürich, el principal museo de arte de la mayor ciudad de Suiza, fuerte en arte moderno.",
    city: 'Zúrich, Suiza',
    founded: '1910',
    highlights: [
      'Obras de Munch y los expresionistas',
      'Una composición clásica de Mondrian',
      'La mayor colección de Munch fuera de Noruega',
      'De los maestros antiguos al arte contemporáneo',
    ],
    about:
      "Gestionado por una veterana sociedad de arte local, el Kunsthaus abrió su edificio principal en 1910 y se amplió mucho con una gran ala nueva en 2021, convirtiéndose en uno de los mayores museos de arte de Suiza. Guarda una importante colección de arte moderno —incluido el mayor conjunto de obras de Munch fuera de Noruega— junto a maestros antiguos, arte suizo y una notable colección de Giacometti.",
    facts: [
      'Una gran ampliación de 2021 lo hizo uno de los mayores museos de arte de Suiza.',
      'Guarda la mayor colección de Munch fuera de Noruega.',
    ],
  },
  'Museo Leopold': {
    lead:
      "El Museo Leopold de Viena, formado sobre una gran colección privada, con el mayor conjunto del mundo de obras de Egon Schiele.",
    city: 'Viena, Austria',
    founded: '2001',
    highlights: [
      'La mayor colección del mundo de Egon Schiele',
      'Grandes obras de Gustav Klimt',
      "Una casa del modernismo vienés ('Viena 1900')",
      'Diseño y artes decorativas de la época',
    ],
    about:
      "El oftalmólogo Rudolf Leopold dedicó cinco décadas a reunir una vasta colección de arte moderno austríaco, sobre todo de Egon Schiele, comprando sus obras cuando el artista aún escandalizaba y estaba infravalorado. En 2001 la colección se convirtió en museo público en el MuseumsQuartier de Viena, un elegante cubo blanco dedicado a la efervescencia de la 'Viena 1900'.",
    facts: [
      'Se formó sobre la colección de toda una vida de un solo oftalmólogo vienés.',
      'Guarda más obras de Egon Schiele que ningún otro lugar del mundo.',
      "Es un museo clave de la era 'Viena 1900'.",
    ],
  },
  'Galería Belvedere': {
    lead:
      "El Belvedere de Viena, un magnífico palacio barroco con la colección nacional austríaca y, sobre todo, el arte de Gustav Klimt.",
    city: 'Viena, Austria',
    founded: '1781 (al público)',
    highlights: [
      "La obra maestra dorada de Klimt, 'El beso'",
      'La mayor colección de Klimt del mundo',
      'Obras clave de Egon Schiele',
      'Un recorrido del arte austríaco en un palacio barroco',
    ],
    about:
      "Levantado a inicios del siglo XVIII como palacio de verano del héroe militar Príncipe Eugenio de Saboya, el Belvedere abrió su colección imperial de pintura al público en 1781, entre los primerísimos museos públicos del mundo, años antes que el Louvre. Hoy se le conoce sobre todo como la casa de Gustav Klimt, con la mayor colección de su obra, incluido 'El beso', que cuelga allí desde que se pintó.",
    facts: [
      'Abrió al público en 1781, de los primeros museos en hacerlo.',
      "'El beso' cuelga aquí desde que se pintó.",
      'Guarda la mayor colección de Klimt del mundo.',
    ],
  },
  'Museo Nacional de Arte, Arquitectura y Diseño': {
    lead:
      "El Museo Nacional de Oslo, con la principal colección de arte, arquitectura y diseño de Noruega.",
    city: 'Oslo, Noruega',
    founded: '2003 (fusión)',
    highlights: [
      "Las versiones más famosas de las obras maestras de Munch, incluido 'El grito'",
      'Los fondos de arte nacional de Noruega',
      'Arte, arquitectura y diseño juntos',
      'Una vasta sede nueva hecha a medida',
    ],
    about:
      "Formado por la fusión de varias instituciones noruegas más antiguas, el Museo Nacional reunió las colecciones de arte, arquitectura y diseño del país bajo un mismo techo y abrió su enorme edificio nuevo en Oslo en 2022, entre los mayores museos de arte de los países nórdicos. Sus joyas incluyen las versiones más conocidas de las obras maestras de Edvard Munch, en una sala especialmente protegida tras los robos de 'El grito'.",
    facts: [
      'Su enorme edificio nuevo, abierto en 2022, está entre los mayores de los países nórdicos.',
      'Une arte, arquitectura y diseño en una sola institución.',
    ],
  },
  'Pinacoteca del Estado de São Paulo': {
    lead:
      "La Pinacoteca de São Paulo, el museo de arte más antiguo de la ciudad, con una de las colecciones de arte brasileño más importantes.",
    city: 'São Paulo, Brasil',
    founded: '1905',
    highlights: [
      "'Caipira picando tabaco' de Almeida Júnior",
      "'El violero' de Almeida Júnior",
      'Un hondo recorrido del arte brasileño',
      'Un edificio restaurado de inicios del siglo XX',
    ],
    about:
      "Fundada en 1905 en un antiguo edificio escolar cerca de la vieja estación de tren, la Pinacoteca se centra en el arte brasileño del siglo XIX al presente. Su elegante edificio de ladrillo fue restaurado con maestría en los años noventa por el arquitecto Paulo Mendes da Rocha, y su colección es especialmente rica en los pintores, como Almeida Júnior, que primero volcaron el arte hacia temas genuinamente brasileños.",
    facts: [
      'Es el museo de arte más antiguo de São Paulo.',
      'Su edificio lo renovó el arquitecto Paulo Mendes da Rocha, premio Pritzker.',
    ],
  },
  'Nezu Art Museum': {
    lead:
      "El Museo Nezu de Tokio, formado en torno a la colección de un empresario y rodeado de un famoso jardín tradicional.",
    city: 'Tokio, Japón',
    founded: '1941',
    highlights: [
      "Los biombos de 'Lirios' de Ogata Kōrin, Tesoro Nacional",
      'Célebre arte japonés y de Asia oriental',
      'Un jardín de paseo célebre, con casas de té',
      'Un edificio moderno del arquitecto Kengo Kuma',
    ],
    about:
      "El museo creció de la colección del industrial Nezu Kaichirō y abrió en 1941, reconstruido en 2009 en un sereno edificio moderno del arquitecto Kengo Kuma. Sus biombos de 'Lirios' de Kōrin, Tesoro Nacional, se exhiben tradicionalmente cada primavera, coincidiendo con la floración, para que los visitantes salgan luego al célebre jardín y vean los lirios reales en flor.",
    facts: [
      "Sus famosos biombos de 'Lirios' se muestran cada primavera al florecer el jardín.",
      'Su jardín paisajístico con casas de té es un raro oasis en el centro de Tokio.',
      'El edificio actual es del renombrado arquitecto Kengo Kuma.',
    ],
  },
  'MOA': {
    lead:
      "El MOA Museum of Art en Atami, Japón, asomado al mar, con una distinguida colección de arte japonés y de Asia oriental.",
    city: 'Atami, Japón',
    founded: '1982',
    highlights: [
      "'Ciruelos rojos y blancos' de Ogata Kōrin, Tesoro Nacional",
      'Obras maestras de la escuela Rinpa',
      'Arte japonés y de Asia oriental',
      'Un espectacular edificio en la ladera sobre la costa',
    ],
    about:
      "Encaramado en lo alto de una ladera sobre el balneario costero de aguas termales de Atami, con amplias vistas al mar, el MOA abrió en 1982 y se alcanza por una llamativa sucesión de largas escaleras mecánicas excavadas en la montaña. Se centra en su supremo tesoro Rinpa de Kōrin y rota sus obras más delicadas para protegerlas, exhibiendo los biombos de 'Ciruelos' hacia la temporada de floración del ciruelo.",
    facts: [
      'Se alza en una ladera con vistas panorámicas al mar en Atami.',
      'Se sube a él por largas escaleras mecánicas horadadas en la montaña.',
    ],
  },
  'Museo Nacional de Kioto': {
    lead:
      "El Museo Nacional de Kioto, uno de los principales de Japón, dedicado al arte premoderno y el patrimonio de la antigua capital imperial.",
    city: 'Kioto, Japón',
    founded: '1897',
    highlights: [
      'Numerosos Tesoros Nacionales de pintura, escultura y artesanía',
      'Arte japonés premoderno',
      'Tesoros confiados por los templos y santuarios de Kioto',
      'Un edificio histórico de 1897 y un ala moderna',
    ],
    about:
      "Fundado en 1897, el Museo Nacional de Kioto salvaguarda y exhibe el patrimonio artístico de Kioto, capital imperial de Japón durante más de mil años. Buena parte de su colección se la confían los antiguos templos y santuarios de la ciudad, y desempeña un papel destacado en la conservación de los tesoros culturales de Japón, combinando su pabellón de ladrillo de la era Meiji con una elegante ala de exposiciones moderna.",
    facts: [
      'Buena parte de sus fondos proviene de los antiguos templos y santuarios de Kioto.',
      'Kioto fue capital de Japón durante más de mil años.',
    ],
  },
};

/** French museum profiles (falls back to English). */
export const MUSEUM_INFO_FR: Record<string, MuseumInfo> = {
  'Museo del Prado': {
    lead:
      "Le musée national d'art de l'Espagne, à Madrid, et l'une des plus grandes pinacothèques du monde.",
    city: 'Madrid, Espagne',
    founded: '1819',
    highlights: [
      'Le plus bel ensemble au monde de Vélasquez, Goya et le Greco',
      "« Les Ménines » de Vélasquez et « Tres de Mayo » de Goya",
      'Les « Peintures noires » privées et cauchemardesques de Goya',
      'Des chefs-d\'œuvre de Titien, Bosch, Rubens et Dürer',
    ],
    about:
      "Le Prado est né de la collection royale espagnole, assemblée au fil des siècles par les rois Habsbourg et Bourbon, parmi les plus grands mécènes d'Europe — d'où ses nombreux Titien, panneaux de Bosch et œuvres de Rubens aux côtés de ses maîtres espagnols. Il ouvrit au public en 1819 dans un bâtiment d'abord destiné à abriter un musée d'histoire naturelle. Plutôt qu'un panorama encyclopédique, il offre une profondeur inégalée dans quelques artistes suprêmes, et il ancre aujourd'hui un « triangle d'or » de musées madrilènes avec le Reina Sofía et le Thyssen-Bornemisza voisins.",
    facts: [
      'Sa collection commença comme la galerie privée des rois d\'Espagne.',
      'Il conserve une cinquantaine d\'œuvres de Rubens et une quarantaine de Goya.',
      "Le bâtiment fut d'abord conçu pour être un musée de sciences naturelles, non une galerie d'art.",
    ],
  },
  'Museo de Orsay': {
    lead:
      "Un musée parisien installé dans une ancienne et grandiose gare au bord de la Seine, abritant la plus belle collection au monde d'art impressionniste et postimpressionniste.",
    city: 'Paris, France',
    founded: '1986',
    highlights: [
      'Monet, Renoir, Degas, Van Gogh, Cézanne et Gauguin',
      "Les autoportraits de Van Gogh et « La Nuit étoilée sur le Rhône »",
      'Peinture, sculpture et design français de 1848 à 1914',
      'Un pont entre le Louvre (art ancien) et le Pompidou (art moderne)',
    ],
    about:
      "L'Orsay occupe la gare d'Orsay, une gare Beaux-Arts de 1900 sauvée de la démolition et renée en musée en 1986. Sa collection fut assemblée pour combler le vide historique entre les maîtres anciens du Louvre et l'art moderne du Centre Pompidou, ce qui en fait la demeure essentielle de l'art français de la fin du XIXe siècle. Sous sa grande voûte de verre, l'immense horloge d'origine de la gare veille encore sur la Seine, et le musée attire l'une des plus grandes affluences de toutes les galeries du monde.",
    facts: [
      'Le bâtiment était une gare en activité avant de devenir un musée.',
      "On peut encore regarder au travers de l'énorme horloge d'origine de la gare.",
      "Il fut créé en partie parce que le Louvre et le Pompidou laissaient un vide dans l'histoire de l'art français.",
    ],
  },
  'National Gallery de Londres': {
    lead:
      "La collection nationale britannique de peinture européenne, sur Trafalgar Square à Londres, offrant un superbe panorama compact du Moyen Âge à 1900.",
    city: 'Londres, Royaume-Uni',
    founded: '1824',
    highlights: [
      "« Les Époux Arnolfini » de Van Eyck",
      'Des œuvres de Léonard, Titien et Vélasquez',
      "« Le Téméraire » de Turner",
      'Entrée gratuite à l\'une des grandes collections du monde',
    ],
    about:
      "La National Gallery fut fondée en 1824 quand le gouvernement acheta la collection d'un banquier, à peine 38 tableaux, et elle fut délibérément bâtie au cœur même de Londres pour que les gens de toute classe puissent l'atteindre à pied. À la différence des musées nés de trésors royaux, elle fut assemblée dès le départ comme une collection publique pour la nation, choisie pour la qualité plutôt que la quantité. Elle a toujours été gratuite, et sa taille relativement modeste est prisée comme une vertu — presque chaque tableau est un chef-d'œuvre.",
    facts: [
      'Elle débuta avec seulement 38 tableaux achetés à un collectionneur privé.',
      "Elle a toujours été gratuite et placée au centre pour que tous puissent la visiter.",
      "Elle ne fut jamais une collection royale — elle fut créée d'emblée pour le public.",
    ],
  },
  'Museo del Louvre': {
    lead:
      "Le plus grand musée d'art du monde et le plus visité, dans un ancien palais royal à Paris, couvrant de l'Antiquité au XIXe siècle.",
    city: 'Paris, France',
    founded: '1793',
    highlights: [
      "La demeure de « La Joconde »",
      'Léonard, David, Delacroix et Vermeer',
      'Des icônes antiques comme la Vénus de Milo et la Victoire de Samothrace',
      'Plus de 30 000 œuvres exposées dans les anciennes salles du palais',
    ],
    about:
      "Le Louvre commença comme une forteresse médiévale, devint le palais des rois de France, et fut ouvert comme musée public en 1793 pendant la Révolution, exposant les anciennes collections royales et ecclésiastiques saisies par le nouvel État. Napoléon le gonfla énormément d'œuvres prises à travers l'Europe conquise, dont une grande part fut plus tard restituée. La Pyramide de verre de l'entrée, conçue par I. M. Pei, fut ajoutée en 1989 au milieu de la controverse et est aujourd'hui une icône à part entière. La collection est si vaste que voir chaque œuvre ne serait-ce que quelques secondes prendrait de nombreux jours.",
    facts: [
      "Ce fut une forteresse puis un palais royal avant d'être un musée.",
      "Napoléon le remplit d'art pillé à travers l'Europe, en grande partie restitué depuis.",
      "Il reçoit le plus de visiteurs de tous les musées d'art de la Terre.",
    ],
  },
  'Museo Nacional de Bellas Artes': {
    lead:
      "Le musée national des beaux-arts d'Argentine, à Buenos Aires, abritant la plus importante collection d'art du pays.",
    city: 'Buenos Aires, Argentine',
    founded: '1895',
    highlights: [
      "« Sans pain et sans travail » de De la Cárcova",
      'Les œuvres fondatrices de la peinture argentine : Della Valle, Sívori, Pueyrredón',
      'Des maîtres anciens européens et des impressionnistes français',
      'Entrée gratuite à la collection nationale',
    ],
    about:
      "Fondé en 1895 et installé plus tard dans une ancienne station de pompage reconvertie, le musée réunit l'art européen — des maîtres anciens à l'impressionnisme — et les toiles fondatrices de la peinture nationale argentine. Il retrace comment un jeune pays, gonflé par l'immigration européenne, se bâtit un art propre, des scènes de gauchos et des portraits aux œuvres hardies de protestation sociale. C'est le lieu le plus important pour comprendre la naissance de l'art argentin.",
    facts: [
      "C'est la demeure la plus importante de la peinture argentine du XIXe siècle.",
      "Son bâtiment fut converti à partir d'une ancienne station de pompage d'eau.",
    ],
  },
  'Galería Uffizi': {
    lead:
      "Le grand écrin de trésors de la Renaissance à Florence et l'un des plus anciens musées du monde, dans un palais du XVIe siècle bâti pour les Médicis.",
    city: 'Florence, Italie',
    founded: '1765 (public)',
    highlights: [
      "« La Naissance de Vénus » et « Le Printemps » de Botticelli",
      'Léonard, Michel-Ange, Raphaël et Titien',
      'Le panorama inégalé de l\'art de la Renaissance italienne',
      'Un célèbre corridor de sculpture antique',
    ],
    about:
      "Les Offices (« Uffizi ») furent bâtis dans les années 1560 pour abriter les bureaux administratifs du gouvernement florentin, et se remplirent peu à peu de l'extraordinaire collection d'art de la famille Médicis. Quand la lignée des Médicis s'éteignit, la dernière héritière, Anna Maria Luisa, légua toute la collection à la ville de Florence en 1743 à condition qu'elle ne quitte jamais la ville — un don qui fit des Offices l'un des tout premiers vrais musées publics. Ses salles retracent la Renaissance, de son berceau florentin à son sommet, la Haute Renaissance.",
    facts: [
      "Le bâtiment abritait à l'origine des bureaux du gouvernement — d'où le nom « Uffizi ».",
      "La dernière héritière Médicis légua la collection à Florence à condition qu'elle y reste à jamais.",
      "Sa longue histoire en fait l'un des plus anciens musées du monde.",
    ],
  },
  'Museo de Arte Moderno': {
    lead:
      "Le Museum of Modern Art (MoMA) à New York, l'un des musées d'art moderne et contemporain les plus influents du monde.",
    city: 'New York, États-Unis',
    founded: '1929',
    highlights: [
      "« La Nuit étoilée » de Van Gogh",
      'Picasso, Matisse, Mondrian et Malévitch',
      "« Gas » de Hopper et des icônes du XXe siècle",
      'Le design, le cinéma et la photographie autant que la peinture',
    ],
    about:
      "Le MoMA fut fondé en 1929, quelques jours à peine après le krach de Wall Street, par un petit groupe de mécènes mené par Abby Aldrich Rockefeller, à une époque où les musées américains établis ignoraient largement les artistes vivants. Par ses expositions, ses publications et ses acquisitions, il fit plus que toute autre institution pour définir l'histoire même de l'art moderne, traitant l'architecture, le design, le cinéma et la photographie aussi sérieusement que la peinture. Il s'est agrandi plusieurs fois dans sa demeure emblématique de Midtown Manhattan.",
    facts: [
      "Il ouvrit quelques jours à peine après le krach boursier de 1929.",
      "Ses fondateurs défendirent l'art moderne quand d'autres musées le refusaient encore.",
      "Sa collection couvre le design, le cinéma et la photographie, pas seulement les beaux-arts.",
    ],
  },
  'Galería Nacional de Arte': {
    lead:
      "La National Gallery of Art à Washington, la collection nationale des États-Unis, gratuite pour le public.",
    city: 'Washington, États-Unis',
    founded: '1937',
    highlights: [
      "« Ginevra de\' Benci » de Léonard — le seul Léonard des Amériques",
      'Des maîtres anciens européens associés à un profond fonds américain',
      'Une vaste collection bâtie presque entièrement sur des dons',
      'Entrée gratuite, financée par des dons privés',
    ],
    about:
      "La National Gallery fut fondée en 1937 grâce à un don marquant d'œuvres et d'argent du financier Andrew Mellon, qui insista pour que le musée porte le nom de la nation plutôt que le sien, afin d'encourager d'autres collectionneurs à donner. La stratégie porta ses fruits : le musée grandit par les dons des grands collectionneurs américains pour devenir l'une des plus belles galeries du monde. Gratuit, il associe les maîtres anciens européens à un panorama exceptionnel de l'art américain.",
    facts: [
      "Il abrite le seul tableau de Léonard de Vinci des Amériques.",
      "Son fondateur refusa d'y mettre son propre nom, pour encourager d'autres donateurs.",
      "Presque toute sa collection provient de dons privés, non d'achats.",
    ],
  },
  'Instituto de Arte de Chicago': {
    lead:
      "L'un des plus anciens et des plus grands musées d'art des États-Unis, à la collection encyclopédique particulièrement riche en impressionnisme et en art américain.",
    city: 'Chicago, États-Unis',
    founded: '1879',
    highlights: [
      "« Un dimanche après-midi à l'île de la Grande Jatte » de Seurat",
      "« Nighthawks » de Hopper",
      "« American Gothic » de Grant Wood",
      "L'une des plus belles collections impressionnistes hors de Paris",
    ],
    about:
      "Fondé en 1879 à la fois comme musée et comme école, l'Art Institute grandit avec le Chicago florissant de la fin du XIXe siècle et s'installa dans son bâtiment emblématique pour l'Exposition universelle de 1893, gardé depuis par deux célèbres lions de bronze sur Michigan Avenue. Les premiers dons de collectionneurs locaux — dont beaucoup avaient acheté des œuvres impressionnistes directement aux marchands parisiens — lui donnèrent l'un des plus grands fonds du mouvement au monde. Son école reste parmi les plus respectées d'Amérique.",
    facts: [
      'Deux lions de bronze flanquent son entrée depuis 1893.',
      "C'est une école d'art en activité autant qu'un musée.",
      'Sa force impressionniste vient de collectionneurs de Chicago achetant directement à Paris.',
    ],
  },
  'Rijksmuseum': {
    lead:
      "Le musée national des Pays-Bas, à Amsterdam, consacré à l'art et à l'histoire hollandais et à la gloire du siècle d'or.",
    city: 'Amsterdam, Pays-Bas',
    founded: '1800',
    highlights: [
      "La monumentale « Ronde de nuit » de Rembrandt",
      "« La Laitière » et « La Ruelle » de Vermeer",
      'Des chefs-d\'œuvre de Frans Hals et des peintres du siècle d\'or',
      'Une grande demeure sur mesure rouverte après une décennie',
    ],
    about:
      "Le Rijksmuseum (« musée d'État ») remonte à 1800, quand l'État hollandais entreprit une collection nationale, et s'installa dans son grand bâtiment en forme de cathédrale de l'architecte Pierre Cuypers en 1885. Après une rénovation totale de dix ans, il rouvrit en 2013, « La Ronde de nuit » rendue à sa place d'honneur au bout de sa longue galerie d'honneur. En 2019-21 le tableau fit l'objet d'une restauration publique très médiatisée, observée derrière une vitre par les visiteurs et le public du monde entier en ligne.",
    facts: [
      "« La Ronde de nuit » est accrochée dans une salle spécialement conçue autour d'elle.",
      "Le musée rouvrit en 2013 après une rénovation de dix ans.",
      "« La Ronde de nuit » fut récemment restaurée en public, derrière une vitre.",
    ],
  },
  'Museo Metropolitano de Arte': {
    lead:
      "Le Metropolitan Museum of Art à New York, l'un des plus grands et des plus encyclopédiques musées de la Terre, couvrant cinq mille ans de culture mondiale.",
    city: 'New York, États-Unis',
    founded: '1870',
    highlights: [
      'Des maîtres anciens européens et une profonde peinture américaine',
      'Un art asiatique, antique et islamique remarquable',
      'Un temple égyptien antique entier, le temple de Dendour',
      'Des millions de visiteurs par an en bordure de Central Park',
    ],
    about:
      "Fondé en 1870 par un groupe de notables, d'hommes d'affaires et d'artistes qui voulaient apporter l'art et son éducation au peuple américain, le « Met » n'avait au départ aucune collection et grandit par dons et achats pour devenir un vaste musée encyclopédique en bordure de Central Park. Ses fonds vont des temples égyptiens et de la sculpture grecque à la peinture européenne, à l'art américain et à l'art d'Asie, d'Afrique et des Amériques. Il compte parmi les musées les plus visités du monde.",
    facts: [
      "Sa collection couvre quelque 5 000 ans à travers toutes les parties du monde.",
      "Il renferme même un temple égyptien antique entier, le temple de Dendour.",
      "Il débuta en 1870 sans aucune œuvre d'art.",
    ],
  },
  'Museo de Bellas Artes de Boston': {
    lead:
      "Le Museum of Fine Arts de Boston, l'un des plus grands musées des États-Unis, réputé pour son impressionnisme français et son art asiatique.",
    city: 'Boston, États-Unis',
    founded: '1870',
    highlights: [
      'L\'impressionnisme français et la peinture américaine',
      'L\'une des plus grandes collections d\'art japonais hors du Japon',
      'Des fonds de l\'Égypte et de la Nubie antiques',
      'Près d\'un demi-million d\'œuvres de toutes les cultures',
    ],
    about:
      "Fondé en 1870 et ouvert en 1876, le MFA bâtit des collections exceptionnelles grâce aux dons de l'élite cultivée de Boston, dont plusieurs avaient des liens étroits avec le Japon au moment même où il s'ouvrait au monde — donnant au musée l'un des plus anciens et des plus beaux fonds occidentaux d'art japonais. Sa collection égyptienne naquit de décennies d'expéditions archéologiques conjointes, et ses galeries impressionnistes et américaines comptent parmi les meilleures du pays.",
    facts: [
      "Il possède l'une des plus grandes collections d'art japonais hors du Japon.",
      "Ses fonds égyptiens proviennent de ses propres fouilles archéologiques.",
    ],
  },
  'Museo del Hermitage': {
    lead:
      "L'un des plus grands et des plus anciens musées du monde, à Saint-Pétersbourg, fondé par Catherine la Grande et logé en grande partie dans l'ancien Palais d'Hiver impérial.",
    city: 'Saint-Pétersbourg, Russie',
    founded: '1764',
    highlights: [
      "« Le Retour du fils prodigue » de Rembrandt",
      'Des œuvres majeures de Matisse, dont sa « Danse »',
      'Un vaste panorama de peinture européenne et d\'antiquités',
      'Des galeries s\'étendant sur de nombreux kilomètres',
    ],
    about:
      "L'Ermitage naquit en 1764 comme collection privée de Catherine la Grande, gardée dans un retrait isolé à côté du Palais d'Hiver — un « ermitage » dont il tire son nom. Catherine achetait des collections européennes entières en bloc pour rivaliser avec les galeries royales de l'Occident, et après la Révolution de 1917 le musée absorba de grandes collections privées, dont d'exceptionnelles peintures françaises modernes. Il s'étale aujourd'hui sur un complexe de bâtiments palatiaux si vaste que parcourir toutes les galeries représente de nombreux kilomètres.",
    facts: [
      "Il débuta comme le trésor d'art privé de l'impératrice Catherine la Grande.",
      "Elle achetait des collections européennes entières d'un coup pour éclipser les royautés occidentales.",
      "Ses galeries sont si vastes que les voir toutes signifie marcher des kilomètres.",
    ],
  },
  'Museu Nacional de Belas Artes': {
    lead:
      "Le musée national des beaux-arts du Brésil, à Rio de Janeiro, abritant la plus importante collection d'art brésilien.",
    city: 'Rio de Janeiro, Brésil',
    founded: '1937',
    highlights: [
      'De grandes peintures académiques et d\'histoire du XIXe siècle',
      'Pedro Américo, Victor Meirelles et leurs pairs',
      "Des œuvres qui façonnèrent l'image que la nation se faisait d'elle-même",
      'Un panorama de l\'art brésilien jusqu\'à l\'ère moderne',
    ],
    about:
      "Les racines du musée remontent à l'école d'art royale établie après que la cour portugaise, fuyant Napoléon, se fut installée au Brésil au début du XIXe siècle, amenant un groupe d'artistes français pour fonder une académie. Sa collection est la grande demeure de la peinture brésilienne impériale — les vastes toiles d'histoire et les scènes romantiques par lesquelles une jeune nation se représenta ses origines — logée depuis 1937 dans un grand bâtiment de Rio.",
    facts: [
      "Ses origines tiennent à une académie d'art fondée par des artistes français invités au Brésil en 1816.",
      "Il abrite les images fondatrices de la naissance du Brésil comme nation.",
    ],
  },
  'Museo Nacional de Arte': {
    lead:
      "Le Museo Nacional de Arte (MUNAL) à Mexico, abritant la collection nationale du Mexique, de l'époque coloniale au début du XXe siècle.",
    city: 'Mexico, Mexique',
    founded: '1982',
    highlights: [
      'Les panoramas lumineux de la vallée de Mexico de Velasco',
      'Herrán, Izaguirre et les maîtres académiques',
      'De l\'art mexicain colonial au début de l\'ère moderne',
      'Un magnifique ancien palais gouvernemental',
    ],
    about:
      "Le MUNAL est logé dans un magnifique palais du début du XXe siècle, dans le centre historique de Mexico, bâti sous le dictateur Porfirio Díaz comme ministère des Communications puis converti en musée ouvert en 1982. Ses galeries retracent l'art mexicain de la période coloniale à la veille du mouvement muraliste, montrant comment des peintres comme Velasco et Herrán forgèrent une identité artistique nationale à partir de la terre, de l'histoire et des peuples du pays.",
    facts: [
      "Il occupe un fastueux ancien palais gouvernemental du centre historique.",
      "Sa collection s'arrête à l'aube des célèbres muralistes mexicains.",
    ],
  },
  'Museo de Historia del Arte de Viena': {
    lead:
      "Le Kunsthistorisches Museum de Vienne, bâti pour la collection impériale des Habsbourg et parmi les tout premiers musées d'art du monde.",
    city: 'Vienne, Autriche',
    founded: '1891',
    highlights: [
      'La plus grande collection de tableaux de Bruegel au monde',
      "« La Tour de Babel » et « Les Chasseurs dans la neige » de Bruegel",
      'Des chefs-d\'œuvre de Titien, Vélasquez, Vermeer et Rubens',
      'Un bâtiment palatial à l\'escalier décoré par Klimt',
    ],
    about:
      "Ouvert en 1891 pour exposer la vaste collection d'art des empereurs Habsbourg, le « musée d'histoire de l'art » est un palais sur la grande Ringstrasse de Vienne, dont l'escalier même fut décoré par le jeune Gustav Klimt. Des siècles de collection impériale — les Habsbourg régnèrent sur une grande part de l'Europe — lui donnèrent une profondeur extraordinaire, surtout la plus grande concentration au monde de Pieter Bruegel l'Ancien, dont l'œuvre survivante est minime et précieuse.",
    facts: [
      "Il détient une douzaine des quelque quarante panneaux de Bruegel subsistants.",
      "Il fut bâti sur mesure pour montrer la collection impériale des Habsbourg.",
      "Un jeune Gustav Klimt contribua à décorer son grand escalier.",
    ],
  },
  'Museo de Arte de Filadelfia': {
    lead:
      "Le Philadelphia Museum of Art, l'un des plus grands des États-Unis, célèbre pour les grandes marches d'entrée de son bâtiment en forme de temple.",
    city: 'Philadelphie, États-Unis',
    founded: '1876',
    highlights: [
      'Des œuvres majeures de Cézanne et Poussin',
      "Le chef-d'œuvre de Klee « Ad Parnassum »",
      'De solides fonds européens, américains et modernes',
      'Les célèbres « marches de Rocky »',
    ],
    about:
      "Le musée fut fondé en lien avec l'Exposition du centenaire de 1876 — la première grande Exposition universelle d'Amérique, tenue à Philadelphie — et s'installa dans son monumental bâtiment néogrec au sommet d'une colline en 1928. Ses marches devinrent mondialement célèbres grâce au film « Rocky », avec une statue de bronze à proximité, mais à l'intérieur s'étendent de profondes collections d'art européen, américain et moderne, dont un groupe célèbre d'œuvres de Cézanne et Duchamp.",
    facts: [
      "Ses marches d'entrée sont connues dans le monde entier comme les « marches de Rocky ».",
      "Il est né de la première grande Exposition universelle d'Amérique, en 1876.",
      "Une statue de bronze de « Rocky » se dresse au bas des marches.",
    ],
  },
  'Museo van Gogh': {
    lead:
      "Le musée Van Gogh à Amsterdam, qui abrite la plus grande collection au monde d'œuvres de Vincent van Gogh.",
    city: 'Amsterdam, Pays-Bas',
    founded: '1973',
    highlights: [
      "« Les Mangeurs de pommes de terre », « Les Tournesols » et « La Chambre »",
      'Les champs tardifs et des centaines de dessins',
      "Les lettres de Van Gogh à son frère Theo",
      'Des œuvres de ses contemporains pour le contexte',
    ],
    about:
      "Le musée est bâti autour de la collection conservée par le frère dévoué de Van Gogh, Theo, marchand d'art, et préservée après la mort des deux frères par la veuve et le fils de Theo, qui protégèrent les peintures, les dessins et leur extraordinaire correspondance. Ouvert en 1973, il permet de suivre en un seul lieu toute la carrière courte et intense de l'artiste — des sombres œuvres hollandaises des débuts à la couleur flamboyante de ses dernières années — et c'est l'un des musées les plus visités des Pays-Bas.",
    facts: [
      "La collection survécut parce que la famille de Van Gogh la garda unie pendant des décennies.",
      "Il conserve nombre de ses lettres manuscrites en plus de son art.",
      "Il retrace toute sa carrière, de ses débuts sombres à ses dernières œuvres flamboyantes.",
    ],
  },
  'Catedral de Amberes': {
    lead:
      "La cathédrale Notre-Dame d'Anvers, une imposante église gothique et le cœur artistique de la ville natale de Rubens.",
    city: 'Anvers, Belgique',
    founded: 'construite XIVe–XVIe s.',
    highlights: [
      "« L'Érection de la Croix » de Rubens",
      "« La Descente de croix » de Rubens",
      'Des retables encore dans le cadre pour lequel ils furent faits',
      'La plus haute flèche gothique des Pays-Bas historiques',
    ],
    about:
      "À la différence des autres institutions ici, il s'agit d'une cathédrale en activité et non d'un musée — la plus grande église gothique des anciens Pays-Bas, bâtie sur des siècles. Elle abrite plusieurs retables monumentaux de Pierre Paul Rubens, le plus célèbre fils d'Anvers, dans les espaces mêmes pour lesquels ils furent peints, offrant une rare occasion de voir des chefs-d'œuvre baroques dans leur cadre d'origine plutôt qu'en galerie. Rubens est inhumé dans une autre église de la même ville.",
    facts: [
      "C'est une cathédrale vivante, non un musée — les Rubens sont là où il le voulait.",
      "Sa flèche est le plus haut clocher des anciens Pays-Bas.",
      "Rubens naquit et fut inhumé à Anvers, la ville que ces retables ornent.",
    ],
  },
  'Galería Tretiakov': {
    lead:
      "La Galerie Tretiakov à Moscou, la première collection d'art russe, des icônes médiévales à l'avant-garde.",
    city: 'Moscou, Russie',
    founded: '1856',
    highlights: [
      'Les paysages de Levitan et des chefs-d\'œuvre russes',
      "Le « Carré noir » de Malévitch",
      'Des siècles de peinture russe et d\'icônes religieuses',
      "La vénérée icône de la Trinité d'Andreï Roublev",
    ],
    about:
      "La galerie naquit de la collection privée du marchand Pavel Tretiakov qui, à partir de 1856, entreprit, presque à lui seul, de bâtir une collection nationale d'art russe à une époque où l'élite russe prisait l'œuvre européenne. Il achetait directement aux artistes vivants et donna toute la collection à la ville de Moscou en 1892. Elle reste la demeure essentielle de la peinture russe, couvrant les icônes médiévales, le réalisme du XIXe siècle et l'avant-garde révolutionnaire.",
    facts: [
      "Elle fut fondée par un seul marchand voué à collectionner l'art russe.",
      "Il fit don de toute la collection à la ville de Moscou en 1892.",
      "Elle va des anciennes icônes religieuses à l'abstraction radicale de Malévitch.",
    ],
  },
  'Galería Nacional de Noruega': {
    lead:
      "L'ancienne Galerie nationale de Norvège à Oslo, aujourd'hui partie du Musée national, abritant la plus importante collection d'art du pays.",
    city: 'Oslo, Norvège',
    founded: '1837',
    highlights: [
      "La version la plus célèbre du « Cri » de Munch",
      "« La Danse de la vie » de Munch",
      'Les principaux fonds d\'art historique de Norvège',
      'Des paysages romantiques norvégiens',
    ],
    about:
      "Longtemps le principal musée d'art de Norvège, la Galerie nationale abrita la collection de la nation de 1837 jusqu'à ce que ses fonds soient intégrés au vaste nouveau Musée national ouvert à Oslo en 2022. Ses trésors les plus connus sont les versions des chefs-d'œuvre d'Edvard Munch, la fierté de l'art norvégien, exposées aux côtés des paysages romantiques par lesquels la Norvège affirma son identité nationale au XIXe siècle.",
    facts: [
      "Ses fonds font désormais partie de l'immense nouveau Musée national d'Oslo, ouvert en 2022.",
      "« Le Cri » a été la cible de deux vols d'art célèbres.",
    ],
  },
  'Museo Nacional de Tokio': {
    lead:
      "Le Musée national de Tokyo, le plus ancien et le plus grand musée du Japon, abritant la plus grande collection au monde d'art et d'antiquités japonais.",
    city: 'Tokyo, Japon',
    founded: '1872',
    highlights: [
      "Les « Pins » de Tōhaku",
      "Les « Cyprès » d'Eitoku",
      "Le « Paysage d'hiver » de Sesshū",
      'Plus d\'une centaine de Trésors nationaux désignés',
    ],
    about:
      "Fondé en 1872 et situé dans le parc d'Ueno à Tokyo, le musée sauvegarde le patrimoine artistique du Japon à travers la peinture, la sculpture, la céramique, le textile et les sabres, dont bien plus d'une centaine d'œuvres officiellement désignées Trésors nationaux. Comme les paravents et les rouleaux suspendus japonais sont fragiles et sensibles à la lumière, ses plus grandes peintures ne sont montrées que par roulement, quelques semaines à la fois, si bien que deux visites ne se ressemblent jamais tout à fait.",
    facts: [
      "Il détient plus d'une centaine de Trésors nationaux officiellement désignés.",
      "Ses peintures les plus précieuses ne sont exposées que brièvement, par roulement.",
      "C'est le plus ancien musée national du Japon.",
    ],
  },
  'Galería Borghese': {
    lead:
      "La Galleria Borghese à Rome, logée dans une splendide villa bâtie pour un grand collectionneur du début du XVIIe siècle, avec une extraordinaire concentration de chefs-d'œuvre baroques.",
    city: 'Rome, Italie',
    founded: 'collection à partir du XVIIe s.',
    highlights: [
      'Les sculptures de marbre virtuoses du Bernin',
      'Plusieurs Caravage',
      "« Amour sacré et Amour profane » de Titien",
      'Une villa-écrin dans le plus grand parc de Rome',
    ],
    about:
      "La collection fut assemblée par le cardinal Scipione Borghese, neveu du pape et mécène impitoyable et passionné qui acquérait l'art par presque tous les moyens — y compris en saisissant les œuvres qu'il convoitait. Il fut le grand premier défenseur des jeunes Bernin et Caravage, et sa villa et ses trésors sont restés remarquablement intacts pendant quatre siècles. Le cadre étant intime, les visites se font aujourd'hui par billet horodaté par créneaux de deux heures pour limiter l'affluence.",
    facts: [
      "Son fondateur, un cardinal, saisissait parfois par la force ou l'intrigue l'art qu'il désirait.",
      "Il fut le premier grand mécène du Bernin comme du Caravage.",
      "L'entrée se fait par billet horodaté de deux heures pour protéger la petite villa.",
    ],
  },
  'Colecciones de Pinturas del Estado de Baviera': {
    lead:
      "Les Collections de peinture de l'État de Bavière, dont le joyau est l'Alte Pinakothek à Munich, l'une des plus anciennes pinacothèques du monde.",
    city: 'Munich, Allemagne',
    founded: '1836',
    highlights: [
      "L'autoportrait de Dürer",
      'De superbes maîtres anciens allemands, flamands et hollandais',
      'Un grand ensemble d\'œuvres de Rubens',
      'Rembrandt et les écoles du Nord',
    ],
    about:
      "L'Alte Pinakothek ouvrit en 1836 pour exposer les collections de peinture de la dynastie des Wittelsbach, qui régna sur la Bavière pendant des siècles et fut d'avides collectionneurs. Ses galeries bâties sur mesure, aux salles éclairées par le haut et conçues pour regarder les tableaux, devinrent un modèle imité par les musées de toute l'Europe. Les Collections de peinture de l'État de Bavière qu'elle ancre gèrent aussi une famille d'autres galeries munichoises couvrant du XIXe siècle à nos jours.",
    facts: [
      "Sa collection fut bâtie par la dynastie des Wittelsbach sur plusieurs siècles.",
      "Son bâtiment de 1836 influença la conception de musées ultérieurs à travers l'Europe.",
      "Il détient l'une des plus belles collections de Rubens hors d'Anvers.",
    ],
  },
  'Museo Marmottan Monet': {
    lead:
      "Le musée Marmottan Monet à Paris, qui abrite la plus grande collection au monde d'œuvres de Claude Monet.",
    city: 'Paris, France',
    founded: '1934',
    highlights: [
      "« Impression, soleil levant » — le tableau qui donna son nom à l'impressionnisme",
      'De nombreux nymphéas tardifs de Giverny',
      'Des œuvres de Morisot et d\'autres impressionnistes',
      'Un cadre intime d\'hôtel particulier près du bois de Boulogne',
    ],
    about:
      "Autrefois hôtel particulier et ancien pavillon de chasse, le Marmottan devint musée en 1934 et se transforma quand le fils de Monet, Michel, lui légua les œuvres personnelles de l'artiste — les plus nombreuses au monde. Il abrite aussi une importante collection de Berthe Morisot. Son plus grand trésor, « Impression, soleil levant », fut parmi les œuvres volées lors d'un vol à main armée retentissant en 1985, puis retrouvé.",
    facts: [
      "Il possède « Impression, soleil levant », le tableau qui donna son nom au mouvement.",
      "Le propre fils de Monet légua le grand trésor de l'œuvre de son père.",
      "Cette toile célèbre fut volée lors d'un casse en 1985 puis retrouvée.",
    ],
  },
  'Museo Kröller-Müller': {
    lead:
      "Le musée Kröller-Müller aux Pays-Bas, situé dans un parc national, bâti autour de la collection d'une des premières championnes de Van Gogh.",
    city: 'Otterlo, Pays-Bas',
    founded: '1938',
    highlights: [
      'La deuxième plus grande collection de Van Gogh au monde',
      "« Terrasse du café le soir » de Van Gogh",
      'Un célèbre jardin de sculptures en plein air',
      'Des œuvres de Seurat, Mondrian et des maîtres modernes',
    ],
    about:
      "Helene Kröller-Müller fut l'une des premières collectionneuses à saisir l'importance de Van Gogh, amassant près de 300 de ses œuvres alors qu'il était encore peu apprécié. Elle et son mari donnèrent leur vaste collection à l'État hollandais, et le musée ouvrit en 1938 au milieu des bois et de la lande du parc national de la Hoge Veluwe. Les visiteurs explorent souvent le parc sur des vélos blancs gratuits, et le grand jardin de sculptures du musée compte parmi les plus beaux d'Europe.",
    facts: [
      "Sa fondatrice fut parmi les tout premiers grands collectionneurs de Van Gogh.",
      "Il se trouve dans un parc national que l'on peut explorer sur des vélos blancs gratuits.",
      "Son jardin de sculptures est l'un des plus grands d'Europe.",
    ],
  },
  'Galerías nacionales de Escocia': {
    lead:
      "Les National Galleries of Scotland à Édimbourg, abritant la collection nationale de beaux-arts, des maîtres anciens à l'impressionnisme.",
    city: 'Édimbourg, Royaume-Uni',
    founded: '1859',
    highlights: [
      "« Vision après le sermon » de Gauguin",
      'Des maîtres anciens écossais et européens',
      'Des œuvres impressionnistes et ultérieures',
      'Le plus beau panorama d\'art écossais au monde',
    ],
    about:
      "Les National Galleries of Scotland se répartissent sur plusieurs bâtiments reliés au cœur d'Édimbourg, dont la National Gallery néoclassique sur le Mound et les galeries de portraits et d'art moderne. Nées d'une collection nationale du milieu du XIXe siècle, elles associent des œuvres européennes clés aux plus profonds fonds d'art écossais qui existent, et l'entrée est gratuite.",
    facts: [
      "Elles s'étendent sur plusieurs galeries reliées au centre d'Édimbourg.",
      "Elles détiennent la plus belle collection d'art écossais au monde.",
    ],
  },
  'Palais des Beaux-Arts de Lille': {
    lead:
      "Le Palais des Beaux-Arts de Lille, l'un des plus grands musées d'art de France hors de Paris.",
    city: 'Lille, France',
    founded: '1801',
    highlights: [
      "Une version principale de « Bélisaire demandant l'aumône » de David",
      'Une riche collection de peinture européenne',
      'Des maîtres anciens et de l\'art français du XIXe siècle',
      'Goya, Rubens et les écoles flamandes',
    ],
    about:
      "Le musée fut créé en 1801 dans le cadre d'un décret napoléonien qui envoya des œuvres majeures de la collection nationale vers une poignée de villes françaises de province, diffusant le grand art au-delà de Paris. Il s'installa dans son grand palais Belle Époque en 1892 et abrite un éventail exceptionnel de peinture européenne, particulièrement riche en art flamand et français, du fait de la position de Lille près de la frontière belge.",
    facts: [
      "Il fut fondé sous Napoléon pour porter le grand art dans les régions françaises.",
      "Ses fonds sont particulièrement riches en art flamand, grâce à la position frontalière de Lille.",
    ],
  },
  'Antigua Galería Nacional de Berlín': {
    lead:
      "L'Alte Nationalgalerie sur l'île aux Musées de Berlin, abritant l'art du XIXe siècle et une grande demeure du romantisme allemand.",
    city: 'Berlin, Allemagne',
    founded: '1876',
    highlights: [
      'Des œuvres clés de Caspar David Friedrich',
      "« L'Abbaye dans une forêt de chênes » de Friedrich",
      'Peinture romantique et impressionniste allemande',
      'Un bâtiment en forme de temple sur une île de l\'UNESCO',
    ],
    about:
      "Ouverte en 1876, l'« Ancienne Galerie nationale » est un bâtiment en forme de temple sur l'île aux Musées de Berlin, un ensemble de cinq musées inscrit ensemble au patrimoine mondial de l'UNESCO. Elle rassemble l'art du XIXe siècle, avec le romantisme allemand en son cœur, avant tout les paysages visionnaires de Caspar David Friedrich, aux côtés de l'impressionnisme allemand et français. Elle fut gravement endommagée pendant la Seconde Guerre mondiale et minutieusement restaurée.",
    facts: [
      "Elle se dresse sur l'île aux Musées de Berlin, site du patrimoine mondial de l'UNESCO.",
      "Elle fut gravement endommagée durant la Seconde Guerre mondiale puis soigneusement reconstruite.",
    ],
  },
  'Kunsthalle de Hamburgo': {
    lead:
      "La Hamburger Kunsthalle, l'un des plus grands musées d'art d'Allemagne, célèbre pour son romantisme allemand.",
    city: 'Hambourg, Allemagne',
    founded: '1869',
    highlights: [
      "« Le Voyageur au-dessus de la mer de nuages » de Friedrich",
      "« La Mer de glace » de Friedrich",
      'De l\'art du Moyen Âge à nos jours',
      'Maîtres anciens, romantisme et art moderne',
    ],
    about:
      "Fondée en 1869 par l'association artistique de la ville, la Kunsthalle s'étend sur plusieurs bâtiments reliés et couvre l'art des retables médiévaux à l'œuvre contemporaine. C'est avant tout un lieu de pèlerinage pour les amoureux de Caspar David Friedrich, abritant l'image la plus célèbre du romantisme, « Le Voyageur au-dessus de la mer de nuages », devenue une icône reproduite dans le monde entier.",
    facts: [
      "Elle abrite « Le Voyageur », l'image la plus célèbre du romantisme.",
      "Ses bâtiments vont d'une salle du XIXe siècle à un cube moderne épuré.",
    ],
  },
  'Museo Munch': {
    lead:
      "Le musée Munch (MUNCH) à Oslo, consacré à Edvard Munch, qui légua l'essentiel de son œuvre à la ville.",
    city: 'Oslo, Norvège',
    founded: '1963',
    highlights: [
      "Des versions du « Cri », de « Madone », de « Vampire » et d'« Angoisse »",
      'Des milliers de peintures, d\'estampes et de dessins',
      "La collection définitive de l'art de Munch",
      'Une spectaculaire nouvelle tour au bord de l\'eau',
    ],
    about:
      "À la mort de Munch en 1944, il légua ses énormes fonds personnels — plus de 26 000 œuvres — à la ville d'Oslo, fondement de ce musée. Il ouvrit en 1963 et déménagea en 2021 dans une saisissante tour de 13 étages au bord de l'eau à Oslo, devenant la demeure définitive de son art. Comme il conserva tant de versions et d'estampes de ses images clés, le musée peut montrer l'évolution d'un seul motif comme « Le Cri » à travers toute une vie.",
    facts: [
      "Munch légua à la ville plus de 26 000 de ses propres œuvres.",
      "Il rouvrit en 2021 dans un spectaculaire nouveau bâtiment de 13 étages au bord de l'eau.",
      "Il peut retracer comment Munch retravailla une même image à travers de nombreuses versions.",
    ],
  },
  'Kunsthaus Zürich': {
    lead:
      "Le Kunsthaus Zürich, le principal musée d'art de la plus grande ville de Suisse, riche en art moderne.",
    city: 'Zurich, Suisse',
    founded: '1910',
    highlights: [
      'Des œuvres de Munch et des expressionnistes',
      'Une composition classique de Mondrian',
      'La plus grande collection de Munch hors de Norvège',
      'Des maîtres anciens jusqu\'à l\'art contemporain',
    ],
    about:
      "Géré par une société d'art locale de longue date, le Kunsthaus ouvrit son bâtiment principal en 1910 et s'agrandit fortement avec une importante nouvelle aile en 2021, devenant l'un des plus grands musées d'art de Suisse. Il abrite une importante collection d'art moderne — dont le plus grand ensemble d'œuvres de Munch hors de Norvège — aux côtés de maîtres anciens, d'art suisse et d'une remarquable collection d'Alberto Giacometti.",
    facts: [
      "Une importante extension en 2021 en fit l'un des plus grands musées d'art de Suisse.",
      "Il abrite la plus grande collection de Munch hors de Norvège.",
    ],
  },
  'Museo Leopold': {
    lead:
      "Le musée Leopold à Vienne, bâti sur une grande collection privée et abritant le plus grand trésor d'Egon Schiele au monde.",
    city: 'Vienne, Autriche',
    founded: '2001',
    highlights: [
      "La plus grande collection d'Egon Schiele au monde",
      'Des œuvres majeures de Gustav Klimt',
      'Une demeure du modernisme viennois (Vienne 1900)',
      'Le design et les arts décoratifs de l\'époque',
    ],
    about:
      "L'ophtalmologue Rudolf Leopold passa cinq décennies à assembler une vaste collection d'art moderne autrichien, surtout Egon Schiele, achetant ses œuvres quand l'artiste choquait encore et était sous-estimé. En 2001 la collection devint un musée public dans le MuseumsQuartier de Vienne, un cube blanc épuré voué au ferment de « Vienne 1900 », la brillante et anxieuse culture de la ville au tournant du siècle.",
    facts: [
      "Il fut bâti sur la collection de toute une vie d'un seul ophtalmologue viennois.",
      "Il détient plus d'œuvres d'Egon Schiele que partout ailleurs sur Terre.",
      "C'est un musée clé de l'époque « Vienne 1900 ».",
    ],
  },
  'Galería Belvedere': {
    lead:
      "Le Belvédère à Vienne, un magnifique palais baroque abritant la collection nationale autrichienne et, avant tout, l'art de Gustav Klimt.",
    city: 'Vienne, Autriche',
    founded: '1781 (public)',
    highlights: [
      "Le chef-d'œuvre doré de Klimt « Le Baiser »",
      'La plus grande collection de Klimt au monde',
      'Des œuvres clés d\'Egon Schiele',
      'Un panorama de l\'art autrichien dans un palais baroque',
    ],
    about:
      "Bâti au début du XVIIIe siècle comme palais d'été du héros militaire le prince Eugène de Savoie, le Belvédère ouvrit sa collection impériale de tableaux au public en 1781 — parmi les tout premiers musées publics du monde, des années avant le Louvre. Il est aujourd'hui surtout connu comme la demeure de Gustav Klimt, abritant la plus grande collection au monde de son œuvre, dont « Le Baiser », qui y est accroché depuis sa création.",
    facts: [
      "Il ouvrit au public en 1781, parmi les premiers musées à le faire.",
      "« Le Baiser » y est accroché depuis sa création.",
      "Il abrite la plus grande collection de Klimt au monde.",
    ],
  },
  'Museo Nacional de Arte, Arquitectura y Diseño': {
    lead:
      "Le Musée national à Oslo, abritant la principale collection norvégienne d'art, d'architecture et de design.",
    city: 'Oslo, Norvège',
    founded: '2003 (fusion)',
    highlights: [
      "Les versions les plus célèbres des chefs-d'œuvre de Munch, dont « Le Cri »",
      'Les fonds d\'art national de Norvège',
      'L\'art, l\'architecture et le design réunis',
      'Une vaste demeure neuve bâtie sur mesure',
    ],
    about:
      "Formé par la fusion de plusieurs institutions norvégiennes plus anciennes, le Musée national réunit sous un même toit les collections d'art, d'architecture et de design de la nation et ouvrit son immense nouveau bâtiment à Oslo en 2022 — parmi les plus grands musées d'art des pays nordiques. Parmi ses fleurons figurent les versions les plus connues des chefs-d'œuvre d'Edvard Munch, exposées dans une salle spécialement sécurisée après les vols antérieurs du « Cri ».",
    facts: [
      "Son immense nouveau bâtiment, ouvert en 2022, est parmi les plus grands des pays nordiques.",
      "Il réunit art, architecture et design dans une seule institution.",
    ],
  },
  'Pinacoteca del Estado de São Paulo': {
    lead:
      "La Pinacoteca de São Paulo, le plus ancien musée d'art de la ville, abritant l'une des plus importantes collections d'art brésilien.",
    city: 'São Paulo, Brésil',
    founded: '1905',
    highlights: [
      "« Caipira coupant du tabac » d'Almeida Júnior",
      "« Le Joueur de viole » d'Almeida Júnior",
      'Un profond panorama de l\'art brésilien',
      'Un bâtiment restauré du début du XXe siècle',
    ],
    about:
      "Fondée en 1905 dans un ancien bâtiment scolaire réaménagé près de l'ancienne gare de la ville, la Pinacoteca se concentre sur l'art brésilien du XIXe siècle à nos jours. Son beau bâtiment de brique fut élégamment restauré dans les années 1990 par l'architecte Paulo Mendes da Rocha, et sa collection est particulièrement riche en peintres, comme Almeida Júnior, qui les premiers tournèrent l'art vers des sujets véritablement brésiliens.",
    facts: [
      "C'est le plus ancien musée d'art de São Paulo.",
      "Son bâtiment fut rénové par l'architecte lauréat du prix Pritzker Paulo Mendes da Rocha.",
    ],
  },
  'Nezu Art Museum': {
    lead:
      "Le musée Nezu à Tokyo, bâti autour de la collection d'un homme d'affaires et niché au cœur d'un célèbre jardin traditionnel.",
    city: 'Tokyo, Japon',
    founded: '1941',
    highlights: [
      "Les paravents « Iris », Trésor national, d'Ogata Kōrin",
      'Un art japonais et est-asiatique renommé',
      'Un célèbre jardin de promenade avec maisons de thé',
      'Un bâtiment moderne de l\'architecte Kengo Kuma',
    ],
    about:
      "Le musée naquit de la collection de l'industriel Nezu Kaichirō et ouvrit en 1941, reconstruit en 2009 dans un serein bâtiment moderne de l'architecte Kengo Kuma. Ses paravents « Iris » de Kōrin, un Trésor national, sont traditionnellement exposés chaque printemps — au moment où les visiteurs peuvent ensuite sortir dans le célèbre jardin du musée et voir les vrais iris en fleur.",
    facts: [
      "Ses célèbres paravents « Iris » sont montrés chaque printemps pour coïncider avec le jardin en fleur.",
      "Son jardin paysager avec maisons de thé est une rare oasis au cœur de Tokyo.",
      "Le bâtiment actuel est de l'illustre architecte Kengo Kuma.",
    ],
  },
  'MOA': {
    lead:
      "Le MOA Museum of Art à Atami, au Japon, surplombant la mer, abritant une collection remarquable d'art japonais et est-asiatique.",
    city: 'Atami, Japon',
    founded: '1982',
    highlights: [
      "« Pruniers rouges et blancs », Trésor national, d'Ogata Kōrin",
      'Des chefs-d\'œuvre de l\'école Rinpa',
      'De l\'art japonais et est-asiatique',
      'Un spectaculaire bâtiment à flanc de colline au-dessus de la côte',
    ],
    about:
      "Perché haut sur une colline au-dessus de la station thermale côtière d'Atami, avec de vastes vues sur la mer, le MOA ouvrit en 1982 et se rejoint par une saisissante série de longs escaliers mécaniques creusés dans la montagne. Il est centré sur son trésor Rinpa suprême de Kōrin, et fait tourner ses œuvres les plus délicates pour les protéger, exposant les paravents des « Pruniers » à la saison des fleurs de prunier.",
    facts: [
      "Il se dresse à flanc de colline avec des vues panoramiques sur la mer à Atami.",
      "Les visiteurs y accèdent par de longs escaliers mécaniques creusés dans la montagne.",
    ],
  },
  'Museo Nacional de Kioto': {
    lead:
      "Le Musée national de Kyoto, l'un des principaux musées du Japon, consacré à l'art et au patrimoine prémodernes de l'ancienne capitale impériale.",
    city: 'Kyoto, Japon',
    founded: '1897',
    highlights: [
      'De nombreux Trésors nationaux de peinture, de sculpture et d\'artisanat',
      'De l\'art japonais prémoderne',
      'Des trésors confiés par les temples et sanctuaires de Kyoto',
      'Un bâtiment historique de 1897 et une aile moderne',
    ],
    about:
      "Fondé en 1897, le Musée national de Kyoto sauvegarde et expose le patrimoine artistique de Kyoto, qui fut la capitale impériale du Japon pendant plus de mille ans. Une grande part de sa collection lui est confiée par les anciens temples et sanctuaires de la ville, et il joue un rôle de premier plan dans la conservation des trésors culturels du Japon, associant sa halle de brique d'origine de l'ère Meiji à une élégante aile d'exposition moderne.",
    facts: [
      "Une grande part de ses fonds provient des anciens temples et sanctuaires de Kyoto.",
      "Kyoto fut la capitale du Japon pendant plus de mille ans.",
    ],
  },
};

/** Italian museum profiles (falls back to English). */
export const MUSEUM_INFO_IT: Record<string, MuseumInfo> = {
  'Museo del Prado': {
    lead:
      "Il museo d'arte nazionale della Spagna, a Madrid, e una delle più grandi pinacoteche del mondo.",
    city: 'Madrid, Spagna',
    founded: '1819',
    highlights: [
      'Il più bel nucleo al mondo di Velázquez, Goya ed El Greco',
      "« Las Meninas » di Velázquez e « Tres de Mayo » di Goya",
      'Le « Pitture nere » private e da incubo di Goya',
      'Capolavori di Tiziano, Bosch, Rubens e Dürer',
    ],
    about:
      "Il Prado nacque dalla collezione reale spagnola, messa insieme nei secoli dai re asburgici e borbonici, tra i più grandi mecenati d'Europa — per questo custodisce tanti Tiziano, tavole di Bosch e opere di Rubens accanto ai suoi maestri spagnoli. Aprì al pubblico nel 1819 in un edificio pensato in origine per ospitare un museo di storia naturale. Anziché un panorama enciclopedico, offre una profondità ineguagliata in pochi artisti supremi, e oggi àncora un « triangolo d'oro » di musei madrileni con il vicino Reina Sofía e il Thyssen-Bornemisza.",
    facts: [
      'La sua collezione cominciò come la quadreria privata dei re di Spagna.',
      'Custodisce una cinquantina di opere di Rubens e una quarantina di Goya.',
      "L'edificio fu progettato dapprima per essere un museo di scienze naturali, non una pinacoteca.",
    ],
  },
  'Museo de Orsay': {
    lead:
      "Un museo parigino ospitato in una grandiosa ex stazione ferroviaria sulla Senna, che custodisce la più bella collezione al mondo di arte impressionista e postimpressionista.",
    city: 'Parigi, Francia',
    founded: '1986',
    highlights: [
      'Monet, Renoir, Degas, Van Gogh, Cézanne e Gauguin',
      "Gli autoritratti di Van Gogh e « Notte stellata sul Rodano »",
      'Pittura, scultura e design francese dal 1848 al 1914',
      'Un ponte tra il Louvre (arte antica) e il Pompidou (arte moderna)',
    ],
    about:
      "L'Orsay occupa la Gare d'Orsay, una stazione Beaux-Arts del 1900 salvata dalla demolizione e rinata come museo nel 1986. La sua collezione fu messa insieme per colmare il vuoto storico tra i maestri antichi del Louvre e l'arte moderna del Centre Pompidou, il che ne fa la sede essenziale dell'arte francese di fine Ottocento. Sotto la sua grande volta di vetro, l'enorme orologio originale della stazione veglia ancora sulla Senna, e il museo attira una delle maggiori affluenze di ogni galleria al mondo.",
    facts: [
      "L'edificio era una stazione ferroviaria attiva prima di diventare un museo.",
      "Si può ancora guardare attraverso l'enorme orologio originale della stazione.",
      "Fu creato in parte perché il Louvre e il Pompidou lasciavano un vuoto nella storia dell'arte francese.",
    ],
  },
  'National Gallery de Londres': {
    lead:
      "La collezione nazionale britannica di pittura europea, in Trafalgar Square a Londra, che offre uno splendido panorama compatto dal Medioevo al 1900.",
    city: 'Londra, Regno Unito',
    founded: '1824',
    highlights: [
      "Il « Ritratto dei coniugi Arnolfini » di Van Eyck",
      'Opere di Leonardo, Tiziano e Velázquez',
      "« Il Temerario » di Turner",
      'Ingresso gratuito a una delle grandi collezioni del mondo',
    ],
    about:
      "La National Gallery fu fondata nel 1824 quando il governo acquistò la collezione di un banchiere, appena 38 quadri, e fu deliberatamente costruita nel cuore stesso di Londra perché gente di ogni classe potesse raggiungerla a piedi. A differenza dei musei nati da tesori reali, fu messa insieme fin dall'inizio come collezione pubblica per la nazione, scelta per la qualità più che per la quantità. È sempre stata a ingresso gratuito, e le sue dimensioni relativamente contenute sono apprezzate come una virtù — quasi ogni quadro è un capolavoro.",
    facts: [
      'Cominciò con appena 38 dipinti comprati da un collezionista privato.',
      "È sempre stata gratuita e collocata al centro perché tutti potessero visitarla.",
      "Non fu mai una collezione reale — fu creata fin dall'inizio per il pubblico.",
    ],
  },
  'Museo del Louvre': {
    lead:
      "Il museo d'arte più grande e visitato del mondo, in un ex palazzo reale a Parigi, che spazia dall'antichità al XIX secolo.",
    city: 'Parigi, Francia',
    founded: '1793',
    highlights: [
      "La dimora della « Gioconda »",
      'Leonardo, David, Delacroix e Vermeer',
      'Icone antiche come la Venere di Milo e la Nike di Samotracia',
      'Oltre 30.000 opere esposte nelle antiche sale del palazzo',
    ],
    about:
      "Il Louvre cominciò come fortezza medievale, divenne il palazzo dei re di Francia e fu aperto come museo pubblico nel 1793 durante la Rivoluzione, esponendo le antiche collezioni reali ed ecclesiastiche confiscate dal nuovo Stato. Napoleone lo gonfiò enormemente con opere prese in tutta l'Europa conquistata, gran parte poi restituite. L'ingresso a Piramide di vetro, progettato da I. M. Pei, fu aggiunto nel 1989 tra le polemiche ed è oggi un'icona a sé stante. Tanto è vasta la collezione che vedere ogni opera anche solo per pochi secondi richiederebbe molti giorni.",
    facts: [
      "Fu una fortezza e poi un palazzo reale prima ancora di essere un museo.",
      "Napoleone lo riempì di arte saccheggiata in tutta Europa, gran parte poi restituita.",
      "Riceve più visitatori di ogni altro museo d'arte della Terra.",
    ],
  },
  'Museo Nacional de Bellas Artes': {
    lead:
      "Il museo nazionale di belle arti dell'Argentina, a Buenos Aires, che custodisce la più importante collezione d'arte del paese.",
    city: 'Buenos Aires, Argentina',
    founded: '1895',
    highlights: [
      "« Senza pane e senza lavoro » di De la Cárcova",
      'Le opere fondatrici della pittura argentina: Della Valle, Sívori, Pueyrredón',
      'Maestri antichi europei e impressionisti francesi',
      'Ingresso gratuito alla collezione nazionale',
    ],
    about:
      "Fondato nel 1895 e poi trasferito in un'ex stazione di pompaggio riadattata, il museo riunisce l'arte europea — dai maestri antichi all'impressionismo — con le tele fondatrici della pittura nazionale argentina. Ripercorre come un giovane paese, gonfiato dall'immigrazione europea, si costruì un'arte propria, dalle scene di gaucho e i ritratti alle audaci opere di protesta sociale. È il luogo più importante per capire la nascita dell'arte argentina.",
    facts: [
      "È la sede più importante della pittura argentina dell'Ottocento.",
      "Il suo edificio fu ricavato da un'ex stazione di pompaggio dell'acqua.",
    ],
  },
  'Galería Uffizi': {
    lead:
      "Il grande scrigno di tesori del Rinascimento a Firenze e uno dei musei più antichi del mondo, in un palazzo cinquecentesco costruito per i Medici.",
    city: 'Firenze, Italia',
    founded: '1765 (pubblico)',
    highlights: [
      "« La Nascita di Venere » e « La Primavera » di Botticelli",
      'Leonardo, Michelangelo, Raffaello e Tiziano',
      'Il panorama ineguagliato dell\'arte del Rinascimento italiano',
      'Un celebre corridoio di scultura antica',
    ],
    about:
      "Gli Uffizi furono costruiti negli anni 1560 per ospitare gli uffici amministrativi del governo fiorentino, e si riempirono a poco a poco della straordinaria collezione d'arte della famiglia Medici. Quando la stirpe dei Medici si estinse, l'ultima erede, Anna Maria Luisa, lasciò l'intera collezione alla città di Firenze nel 1743 a condizione che non lasciasse mai la città — un dono che fece degli Uffizi uno dei primissimi veri musei pubblici. Le sue sale ripercorrono il Rinascimento, dalla sua culla fiorentina al suo apice, il pieno Rinascimento.",
    facts: [
      "L'edificio ospitava in origine uffici di governo — da cui il nome « Uffizi ».",
      "L'ultima erede Medici lasciò la collezione a Firenze a condizione che vi restasse per sempre.",
      "La sua lunga storia ne fa uno dei musei più antichi del mondo.",
    ],
  },
  'Museo de Arte Moderno': {
    lead:
      "Il Museum of Modern Art (MoMA) di New York, uno dei musei d'arte moderna e contemporanea più influenti del mondo.",
    city: 'New York, Stati Uniti',
    founded: '1929',
    highlights: [
      "« Notte stellata » di Van Gogh",
      'Picasso, Matisse, Mondrian e Malevič',
      "« Gas » di Hopper e icone del Novecento",
      'Design, cinema e fotografia oltre alla pittura',
    ],
    about:
      "Il MoMA fu fondato nel 1929, appena pochi giorni dopo il crollo di Wall Street, da un piccolo gruppo di mecenati guidato da Abby Aldrich Rockefeller, in un'epoca in cui i musei americani affermati ignoravano in gran parte gli artisti viventi. Attraverso le sue mostre, pubblicazioni e acquisizioni fece più di ogni altra istituzione per definire la storia stessa dell'arte moderna, trattando architettura, design, cinema e fotografia con la stessa serietà della pittura. Si è ampliato più volte nella sua sede emblematica di Midtown Manhattan.",
    facts: [
      "Aprì appena pochi giorni dopo il crollo di borsa del 1929.",
      "I suoi fondatori difesero l'arte moderna quando altri musei ancora la rifiutavano.",
      "La sua collezione abbraccia design, cinema e fotografia, non solo le belle arti.",
    ],
  },
  'Galería Nacional de Arte': {
    lead:
      "La National Gallery of Art a Washington, la collezione nazionale degli Stati Uniti, gratuita per il pubblico.",
    city: 'Washington, Stati Uniti',
    founded: '1937',
    highlights: [
      "« Ginevra de\' Benci » di Leonardo — l'unico Leonardo delle Americhe",
      'Maestri antichi europei affiancati da un profondo nucleo americano',
      'Una vasta collezione costruita quasi interamente su donazioni',
      'Ingresso gratuito, finanziato da doni privati',
    ],
    about:
      "La National Gallery fu fondata nel 1937 grazie a un cospicuo dono di opere e denaro del finanziere Andrew Mellon, che insistette perché il museo portasse il nome della nazione anziché il suo, così da incoraggiare altri collezionisti a donare. La strategia funzionò: il museo crebbe con le donazioni dei grandi collezionisti americani fino a diventare una delle più belle gallerie del mondo. Gratuito, affianca i maestri antichi europei a un panorama eccezionale dell'arte americana.",
    facts: [
      "Custodisce l'unico dipinto di Leonardo da Vinci delle Americhe.",
      "Il suo fondatore rifiutò di darle il proprio nome, per incoraggiare altri donatori.",
      "Quasi tutta la sua collezione proviene da doni privati, non da acquisti.",
    ],
  },
  'Instituto de Arte de Chicago': {
    lead:
      "Uno dei musei d'arte più antichi e grandi degli Stati Uniti, con una collezione enciclopedica particolarmente ricca di impressionismo e arte americana.",
    city: 'Chicago, Stati Uniti',
    founded: '1879',
    highlights: [
      "« Una domenica pomeriggio all'isola della Grande-Jatte » di Seurat",
      "« Nighthawks » di Hopper",
      "« American Gothic » di Grant Wood",
      "Una delle più belle collezioni impressioniste fuori Parigi",
    ],
    about:
      "Fondato nel 1879 come museo e insieme come scuola, l'Art Institute crebbe con la Chicago fiorente di fine Ottocento e si trasferì nel suo edificio emblematico per l'Esposizione universale del 1893, custodito da allora da due celebri leoni di bronzo su Michigan Avenue. I primi doni di collezionisti locali — molti dei quali avevano comprato opere impressioniste direttamente dai mercanti parigini — gli diedero uno dei più grandi nuclei del movimento al mondo. La sua scuola resta tra i più rispettati college d'arte d'America.",
    facts: [
      'Due leoni di bronzo affiancano il suo ingresso dal 1893.',
      "È una scuola d'arte attiva oltre che un museo.",
      'La sua forza impressionista venne da collezionisti di Chicago che compravano direttamente a Parigi.',
    ],
  },
  'Rijksmuseum': {
    lead:
      "Il museo nazionale dei Paesi Bassi, ad Amsterdam, dedicato all'arte e alla storia olandesi e alla gloria del secolo d'oro.",
    city: 'Amsterdam, Paesi Bassi',
    founded: '1800',
    highlights: [
      "La monumentale « Ronda di notte » di Rembrandt",
      "« La lattaia » e « La stradina » di Vermeer",
      'Capolavori di Frans Hals e dei pittori del secolo d\'oro',
      'Una grande sede costruita ad hoc, riaperta dopo un decennio',
    ],
    about:
      "Il Rijksmuseum (« museo di Stato ») risale al 1800, quando lo Stato olandese avviò una collezione nazionale, e si trasferì nel suo grande edificio a forma di cattedrale dell'architetto Pierre Cuypers nel 1885. Dopo una radicale ristrutturazione di dieci anni riaprì nel 2013, con « La Ronda di notte » restituita al posto d'onore in fondo alla sua lunga Galleria d'onore. Nel 2019-21 il dipinto fu oggetto di un restauro pubblico molto seguito, osservato da dietro un vetro dai visitatori e dal pubblico di tutto il mondo online.",
    facts: [
      "« La Ronda di notte » è appesa in una sala appositamente progettata attorno a essa.",
      "Il museo riaprì nel 2013 dopo un restauro di dieci anni.",
      "« La Ronda di notte » è stata di recente restaurata in pubblico, dietro un vetro.",
    ],
  },
  'Museo Metropolitano de Arte': {
    lead:
      "Il Metropolitan Museum of Art di New York, uno dei musei più grandi ed enciclopedici della Terra, che abbraccia cinquemila anni di cultura mondiale.",
    city: 'New York, Stati Uniti',
    founded: '1870',
    highlights: [
      'Maestri antichi europei e una profonda pittura americana',
      'Un notevole arte asiatica, antica e islamica',
      'Un intero tempio egizio antico, il Tempio di Dendur',
      'Milioni di visitatori all\'anno ai margini di Central Park',
    ],
    about:
      "Fondato nel 1870 da un gruppo di notabili, uomini d'affari e artisti che volevano portare l'arte e la sua educazione al popolo americano, il « Met » non aveva all'inizio alcuna collezione e crebbe per doni e acquisti fino a diventare un vasto museo enciclopedico ai margini di Central Park. I suoi fondi spaziano dai templi egizi e dalla scultura greca alla pittura europea, all'arte americana e all'arte di Asia, Africa e Americhe. È tra i musei più visitati del mondo.",
    facts: [
      "La sua collezione abbraccia circa 5.000 anni in ogni parte del mondo.",
      "Contiene persino un intero tempio egizio antico, il Tempio di Dendur.",
      "Cominciò nel 1870 senza alcuna opera d'arte.",
    ],
  },
  'Museo de Bellas Artes de Boston': {
    lead:
      "Il Museum of Fine Arts di Boston, uno dei musei più grandi degli Stati Uniti, rinomato per il suo impressionismo francese e la sua arte asiatica.",
    city: 'Boston, Stati Uniti',
    founded: '1870',
    highlights: [
      'L\'impressionismo francese e la pittura americana',
      'Una delle più grandi collezioni d\'arte giapponese fuori dal Giappone',
      'Fondi dell\'Egitto e della Nubia antichi',
      'Quasi mezzo milione di opere di ogni cultura',
    ],
    about:
      "Fondato nel 1870 e aperto nel 1876, il MFA costruì collezioni eccezionali grazie ai doni dell'élite colta di Boston, molti dei quali avevano stretti legami con il Giappone proprio mentre si apriva al mondo — dando al museo alcuni dei più antichi e belli nuclei occidentali d'arte giapponese. La sua collezione egizia nacque da decenni di spedizioni archeologiche congiunte, e le sue gallerie impressioniste e americane sono tra le migliori del paese.",
    facts: [
      "Ha una delle più grandi collezioni d'arte giapponese fuori dal Giappone.",
      "I suoi fondi egizi provengono dai suoi stessi scavi archeologici.",
    ],
  },
  'Museo del Hermitage': {
    lead:
      "Uno dei musei più grandi e antichi del mondo, a San Pietroburgo, fondato da Caterina la Grande e ospitato in gran parte nell'ex Palazzo d'Inverno imperiale.",
    city: 'San Pietroburgo, Russia',
    founded: '1764',
    highlights: [
      "« Il ritorno del figliol prodigo » di Rembrandt",
      'Opere maggiori di Matisse, tra cui la sua « Danza »',
      'Un vasto panorama di pittura europea e antichità',
      'Gallerie che si estendono per molti chilometri',
    ],
    about:
      "L'Ermitage nacque nel 1764 come collezione privata di Caterina la Grande, custodita in un rifugio appartato accanto al Palazzo d'Inverno — un « ermitaggio » da cui prende il nome. Caterina comprava intere collezioni europee in blocco per rivaleggiare con le gallerie reali dell'Occidente, e dopo la Rivoluzione del 1917 il museo assorbì grandi collezioni private, tra cui eccezionali dipinti francesi moderni. Oggi si estende su un complesso di edifici palaziali così vasto che percorrere tutte le gallerie significa camminare per molti chilometri.",
    facts: [
      "Nacque come raccolta d'arte privata dell'imperatrice Caterina la Grande.",
      "Comprava intere collezioni europee in una volta per eclissare le regalità occidentali.",
      "Le sue gallerie sono così vaste che vederle tutte significa camminare per chilometri.",
    ],
  },
  'Museu Nacional de Belas Artes': {
    lead:
      "Il museo nazionale di belle arti del Brasile, a Rio de Janeiro, che custodisce la più importante collezione d'arte brasiliana.",
    city: 'Rio de Janeiro, Brasile',
    founded: '1937',
    highlights: [
      'Grandi dipinti accademici e di storia dell\'Ottocento',
      'Pedro Américo, Victor Meirelles e i loro pari',
      "Opere che plasmarono l'immagine che la nazione aveva di sé",
      'Un panorama dell\'arte brasiliana fino all\'era moderna',
    ],
    about:
      "Le radici del museo risalgono alla scuola d'arte reale fondata dopo che la corte portoghese, in fuga da Napoleone, si stabilì in Brasile all'inizio dell'Ottocento, portando un gruppo di artisti francesi a fondare un'accademia. La sua collezione è la grande sede della pittura brasiliana imperiale — le vaste tele di storia e le scene romantiche attraverso cui una giovane nazione si raffigurò le proprie origini — ospitata dal 1937 in un grande edificio di Rio.",
    facts: [
      "Le sue origini stanno in un'accademia d'arte fondata da artisti francesi invitati in Brasile nel 1816.",
      "Custodisce le immagini determinanti della nascita del Brasile come nazione.",
    ],
  },
  'Museo Nacional de Arte': {
    lead:
      "Il Museo Nacional de Arte (MUNAL) di Città del Messico, che custodisce la collezione nazionale del Messico dall'epoca coloniale al primo Novecento.",
    city: 'Città del Messico, Messico',
    founded: '1982',
    highlights: [
      'I luminosi panorami della valle del Messico di Velasco',
      'Herrán, Izaguirre e i maestri accademici',
      'Dall\'arte messicana coloniale al primo moderno',
      'Una magnifica cornice di ex palazzo governativo',
    ],
    about:
      "Il MUNAL è ospitato in un magnifico palazzo del primo Novecento nel centro storico di Città del Messico, costruito sotto il dittatore Porfirio Díaz come ministero delle Comunicazioni e poi convertito in museo, aperto nel 1982. Le sue gallerie ripercorrono l'arte messicana dal periodo coloniale alla vigilia del movimento muralista, mostrando come pittori come Velasco e Herrán forgiarono un'identità artistica nazionale dalla terra, dalla storia e dai popoli del paese.",
    facts: [
      "Occupa un fastoso ex palazzo governativo nel centro storico.",
      "La sua collezione si ferma all'alba dei celebri muralisti messicani.",
    ],
  },
  'Museo de Historia del Arte de Viena': {
    lead:
      "Il Kunsthistorisches Museum di Vienna, costruito per la collezione imperiale asburgica e tra i primi musei d'arte del mondo.",
    city: 'Vienna, Austria',
    founded: '1891',
    highlights: [
      'La più grande collezione di dipinti di Bruegel al mondo',
      "« La Torre di Babele » e « Cacciatori nella neve » di Bruegel",
      'Capolavori di Tiziano, Velázquez, Vermeer e Rubens',
      'Un edificio palaziale con uno scalone decorato da Klimt',
    ],
    about:
      "Aperto nel 1891 per esporre la vasta collezione d'arte degli imperatori asburgici, il « museo di storia dell'arte » è un edificio-palazzo sulla grande Ringstrasse di Vienna, il cui stesso scalone fu decorato dal giovane Gustav Klimt. Secoli di collezionismo imperiale — gli Asburgo regnarono su gran parte dell'Europa — gli diedero una profondità straordinaria, soprattutto la più grande concentrazione al mondo di Pieter Bruegel il Vecchio, la cui opera superstite è esigua e preziosa.",
    facts: [
      "Custodisce una dozzina dei circa quaranta pannelli di Bruegel superstiti.",
      "Fu costruito ad hoc per mostrare la collezione imperiale asburgica.",
      "Un giovane Gustav Klimt contribuì a decorare il suo grande scalone.",
    ],
  },
  'Museo de Arte de Filadelfia': {
    lead:
      "Il Philadelphia Museum of Art, uno dei più grandi degli Stati Uniti, celebre per la grande scalinata d'ingresso del suo edificio a forma di tempio.",
    city: 'Filadelfia, Stati Uniti',
    founded: '1876',
    highlights: [
      'Opere maggiori di Cézanne e Poussin',
      "Il capolavoro di Klee « Ad Parnassum »",
      'Solidi fondi europei, americani e moderni',
      'I mondialmente celebri « gradini di Rocky »',
    ],
    about:
      "Il museo fu fondato in connessione con l'Esposizione del centenario del 1876 — la prima grande Esposizione universale d'America, tenutasi a Filadelfia — e si trasferì nel suo monumentale edificio neogreco in cima a una collina nel 1928. I suoi gradini divennero mondialmente celebri grazie al film « Rocky », con tanto di statua di bronzo lì vicino, ma all'interno si stendono profonde collezioni d'arte europea, americana e moderna, tra cui un celebre nucleo di opere di Cézanne e Duchamp.",
    facts: [
      "I suoi gradini d'ingresso sono noti in tutto il mondo come i « gradini di Rocky ».",
      "Nacque dalla prima grande Esposizione universale d'America, nel 1876.",
      "Una statua di bronzo di « Rocky » si erge ai piedi dei gradini.",
    ],
  },
  'Museo van Gogh': {
    lead:
      "Il Van Gogh Museum di Amsterdam, sede della più grande collezione al mondo di opere di Vincent van Gogh.",
    city: 'Amsterdam, Paesi Bassi',
    founded: '1973',
    highlights: [
      "« I mangiatori di patate », « I girasoli » e « La camera »",
      'I campi tardi e centinaia di disegni',
      "Le lettere di Van Gogh al fratello Theo",
      'Opere dei suoi contemporanei per il contesto',
    ],
    about:
      "Il museo è costruito attorno alla collezione conservata dal fratello devoto di Van Gogh, Theo, mercante d'arte, e preservata dopo la morte di entrambi i fratelli dalla vedova e dal figlio di Theo, che salvaguardarono i dipinti, i disegni e la loro straordinaria corrispondenza. Aperto nel 1973, permette di seguire in un solo luogo l'intera carriera breve e intensa dell'artista — dalle cupe opere olandesi degli esordi al colore fiammeggiante degli ultimi anni — ed è uno dei musei più visitati dei Paesi Bassi.",
    facts: [
      "La collezione sopravvisse perché la famiglia di Van Gogh la tenne unita per decenni.",
      "Custodisce molte sue lettere manoscritte oltre alla sua arte.",
      "Ripercorre tutta la sua carriera, dagli esordi cupi alle ultime opere fiammeggianti.",
    ],
  },
  'Catedral de Amberes': {
    lead:
      "La Cattedrale di Nostra Signora ad Anversa, un'imponente chiesa gotica e il cuore artistico della città natale di Rubens.",
    city: 'Anversa, Belgio',
    founded: 'costruita XIV–XVI sec.',
    highlights: [
      "« L'Innalzamento della Croce » di Rubens",
      "« La Deposizione dalla Croce » di Rubens",
      'Pale d\'altare ancora nella cornice per cui furono fatte',
      'La più alta guglia gotica dei Paesi Bassi storici',
    ],
    about:
      "A differenza delle altre istituzioni qui, si tratta di una cattedrale attiva e non di un museo — la più grande chiesa gotica degli antichi Paesi Bassi, costruita in secoli. Custodisce diverse monumentali pale d'altare di Pieter Paul Rubens, il più celebre figlio di Anversa, negli spazi stessi per cui furono dipinte, offrendo una rara occasione di vedere capolavori barocchi nella loro cornice originaria anziché in una galleria. Rubens è sepolto in un'altra chiesa della stessa città.",
    facts: [
      "È una cattedrale viva, non un museo — i Rubens sono dove lui li voleva.",
      "La sua guglia è il più alto campanile degli antichi Paesi Bassi.",
      "Rubens nacque e fu sepolto ad Anversa, la città che queste pale ornano.",
    ],
  },
  'Galería Tretiakov': {
    lead:
      "La Galleria Tret'jakov di Mosca, la prima collezione d'arte russa, dalle icone medievali all'avanguardia.",
    city: 'Mosca, Russia',
    founded: '1856',
    highlights: [
      'I paesaggi di Levitan e capolavori russi',
      "Il « Quadrato nero » di Malevič",
      'Secoli di pittura russa e icone religiose',
      "La venerata icona della Trinità di Andrej Rublëv",
    ],
    about:
      "La galleria nacque dalla collezione privata del mercante Pavel Tret'jakov, che dal 1856 si propose, quasi da solo, di costruire una collezione nazionale d'arte russa in un'epoca in cui l'élite russa pregiava l'opera europea. Comprava direttamente dagli artisti viventi e donò l'intera collezione alla città di Mosca nel 1892. Resta la sede essenziale della pittura russa, dalle icone medievali al realismo dell'Ottocento all'avanguardia rivoluzionaria.",
    facts: [
      "Fu fondata da un solo mercante votato a collezionare l'arte russa.",
      "Donò l'intera collezione alla città di Mosca nel 1892.",
      "Va dalle antiche icone religiose all'astrazione radicale di Malevič.",
    ],
  },
  'Galería Nacional de Noruega': {
    lead:
      "L'ex Galleria nazionale di Norvegia a Oslo, oggi parte del Museo nazionale, che custodisce la più importante collezione d'arte del paese.",
    city: 'Oslo, Norvegia',
    founded: '1837',
    highlights: [
      "La versione più celebre de « L'urlo » di Munch",
      "« La danza della vita » di Munch",
      'I principali fondi d\'arte storica della Norvegia',
      'Paesaggi romantici norvegesi',
    ],
    about:
      "A lungo il principale museo d'arte della Norvegia, la Galleria nazionale custodì la collezione della nazione dal 1837 finché i suoi fondi furono integrati nel vasto nuovo Museo nazionale aperto a Oslo nel 2022. I suoi tesori più noti sono le versioni dei capolavori di Edvard Munch, il vanto dell'arte norvegese, esposte accanto ai paesaggi romantici attraverso cui la Norvegia affermò la sua identità nazionale nell'Ottocento.",
    facts: [
      "I suoi fondi fanno ora parte dell'immenso nuovo Museo nazionale di Oslo, aperto nel 2022.",
      "« L'urlo » è stato bersaglio di due celebri furti d'arte.",
    ],
  },
  'Museo Nacional de Tokio': {
    lead:
      "Il Museo nazionale di Tokyo, il più antico e grande museo del Giappone, che custodisce la più grande collezione al mondo di arte e antichità giapponesi.",
    city: 'Tokyo, Giappone',
    founded: '1872',
    highlights: [
      "I « Pini » di Tōhaku",
      "I « Cipressi » di Eitoku",
      "Il « Paesaggio invernale » di Sesshū",
      'Oltre un centinaio di Tesori nazionali designati',
    ],
    about:
      "Fondato nel 1872 e collocato nel parco di Ueno a Tokyo, il museo salvaguarda il patrimonio artistico del Giappone attraverso pittura, scultura, ceramica, tessuti e spade, comprese ben oltre un centinaio di opere ufficialmente designate Tesori nazionali. Poiché i paraventi e i rotoli da appendere giapponesi sono fragili e sensibili alla luce, i suoi dipinti più grandi sono esposti solo a rotazione, per poche settimane alla volta, così che due visite non si somigliano mai del tutto.",
    facts: [
      "Custodisce oltre un centinaio di Tesori nazionali ufficialmente designati.",
      "I suoi dipinti più preziosi sono esposti solo brevemente, a rotazione.",
      "È il più antico museo nazionale del Giappone.",
    ],
  },
  'Galería Borghese': {
    lead:
      "La Galleria Borghese a Roma, ospitata in una splendida villa costruita per un grande collezionista del primo Seicento, con una straordinaria concentrazione di capolavori barocchi.",
    city: 'Roma, Italia',
    founded: 'collezione dal Seicento',
    highlights: [
      'Le virtuose sculture in marmo del Bernini',
      'Diversi Caravaggio',
      "« Amor sacro e Amor profano » di Tiziano",
      'Una villa-scrigno nel più grande parco di Roma',
    ],
    about:
      "La collezione fu messa insieme dal cardinale Scipione Borghese, nipote del papa e mecenate spietato e appassionato che acquisiva l'arte con quasi ogni mezzo — compreso il sequestro di opere che bramava. Fu il grande primo sostenitore dei giovani Bernini e Caravaggio, e la sua villa con i suoi tesori è rimasta notevolmente intatta per quattro secoli. Poiché la cornice è intima, oggi le visite avvengono con biglietto a orario in fasce di due ore per limitare l'affollamento.",
    facts: [
      "Il suo fondatore, un cardinale, talvolta sequestrava con la forza o l'intrigo l'arte che desiderava.",
      "Fu il primo grande mecenate sia del Bernini sia di Caravaggio.",
      "L'ingresso è con biglietto a orario di due ore per proteggere la piccola villa.",
    ],
  },
  'Colecciones de Pinturas del Estado de Baviera': {
    lead:
      "Le Collezioni di pittura dello Stato di Baviera, il cui gioiello è l'Alte Pinakothek di Monaco, una delle più antiche pinacoteche del mondo.",
    city: 'Monaco di Baviera, Germania',
    founded: '1836',
    highlights: [
      "L'autoritratto di Dürer",
      'Superbi maestri antichi tedeschi, fiamminghi e olandesi',
      'Un grande nucleo di opere di Rubens',
      'Rembrandt e le scuole del Nord',
    ],
    about:
      "L'Alte Pinakothek aprì nel 1836 per esporre le collezioni di pittura della dinastia dei Wittelsbach, che regnò sulla Baviera per secoli e fu di avidi collezionisti. Le sue gallerie costruite ad hoc, con sale a lucernario progettate per guardare i dipinti, divennero un modello imitato dai musei di tutta Europa. Le Collezioni di pittura dello Stato di Baviera che essa àncora gestiscono anche una famiglia di altre gallerie monacensi, dall'Ottocento a oggi.",
    facts: [
      "La sua collezione fu costruita dalla dinastia dei Wittelsbach in diversi secoli.",
      "Il suo edificio del 1836 influenzò il progetto di musei successivi in tutta Europa.",
      "Custodisce una delle più belle collezioni di Rubens fuori Anversa.",
    ],
  },
  'Museo Marmottan Monet': {
    lead:
      "Il Musée Marmottan Monet a Parigi, sede della più grande collezione al mondo di opere di Claude Monet.",
    city: 'Parigi, Francia',
    founded: '1934',
    highlights: [
      "« Impressione, sole nascente » — il quadro che diede il nome all'impressionismo",
      'Molte ninfee tarde di Giverny',
      'Opere di Morisot e di altri impressionisti',
      'Una cornice intima di dimora signorile presso il Bois de Boulogne',
    ],
    about:
      "Un tempo dimora signorile ed ex padiglione di caccia, il Marmottan divenne museo nel 1934 e si trasformò quando il figlio di Monet, Michel, gli lasciò le opere personali dell'artista — le più numerose al mondo. Custodisce anche un'importante collezione di Berthe Morisot. Il suo tesoro più grande, « Impressione, sole nascente », fu tra le opere rubate in una clamorosa rapina a mano armata del 1985, poi ritrovate.",
    facts: [
      "Possiede « Impressione, sole nascente », il quadro che diede il nome al movimento.",
      "Fu il figlio stesso di Monet a lasciare il grande tesoro dell'opera del padre.",
      "Quella celebre tela fu rubata in un colpo del 1985 e poi ritrovata.",
    ],
  },
  'Museo Kröller-Müller': {
    lead:
      "Il museo Kröller-Müller nei Paesi Bassi, situato in un parco nazionale, costruito attorno alla collezione di una prima sostenitrice di Van Gogh.",
    city: 'Otterlo, Paesi Bassi',
    founded: '1938',
    highlights: [
      'La seconda più grande collezione di Van Gogh al mondo',
      "« Terrazza del caffè la sera » di Van Gogh",
      'Un celebre giardino di sculture all\'aperto',
      'Opere di Seurat, Mondrian e maestri moderni',
    ],
    about:
      "Helene Kröller-Müller fu una delle prime collezioniste a cogliere l'importanza di Van Gogh, mettendo insieme quasi 300 sue opere quando era ancora poco apprezzato. Lei e il marito donarono la loro vasta collezione allo Stato olandese, e il museo aprì nel 1938 tra i boschi e la brughiera del parco nazionale dell'Hoge Veluwe. I visitatori esplorano spesso il parco su biciclette bianche gratuite, e il grande giardino di sculture del museo è tra i più belli d'Europa.",
    facts: [
      "La sua fondatrice fu tra i primissimi grandi collezionisti di Van Gogh.",
      "Sorge in un parco nazionale che si può esplorare su biciclette bianche gratuite.",
      "Il suo giardino di sculture è tra i più grandi d'Europa.",
    ],
  },
  'Galerías nacionales de Escocia': {
    lead:
      "Le National Galleries of Scotland a Edimburgo, che custodiscono la collezione nazionale di belle arti, dai maestri antichi all'impressionismo.",
    city: 'Edimburgo, Regno Unito',
    founded: '1859',
    highlights: [
      "« Visione dopo il sermone » di Gauguin",
      'Maestri antichi scozzesi ed europei',
      'Opere impressioniste e successive',
      'Il più bel panorama d\'arte scozzese al mondo',
    ],
    about:
      "Le National Galleries of Scotland si distribuiscono su diversi edifici collegati nel cuore di Edimburgo, tra cui la National Gallery neoclassica sul Mound e le gallerie del ritratto e dell'arte moderna. Nate da una collezione nazionale di metà Ottocento, uniscono opere europee chiave ai più profondi fondi d'arte scozzese esistenti, e l'ingresso è gratuito.",
    facts: [
      "Si estendono su diverse gallerie collegate nel centro di Edimburgo.",
      "Custodiscono la più bella collezione d'arte scozzese al mondo.",
    ],
  },
  'Palais des Beaux-Arts de Lille': {
    lead:
      "Il Palais des Beaux-Arts di Lille, uno dei più grandi musei d'arte di Francia fuori Parigi.",
    city: 'Lille, Francia',
    founded: '1801',
    highlights: [
      "Una versione principale de « Belisario che chiede l'elemosina » di David",
      'Una ricca collezione di pittura europea',
      'Maestri antichi e arte francese dell\'Ottocento',
      'Goya, Rubens e le scuole fiamminghe',
    ],
    about:
      "Il museo fu creato nel 1801 nell'ambito di un decreto napoleonico che inviò opere maggiori della collezione nazionale verso una manciata di città francesi di provincia, diffondendo la grande arte oltre Parigi. Si trasferì nel suo grande palazzo Belle Époque nel 1892 e custodisce un ventaglio eccezionale di pittura europea, particolarmente ricco d'arte fiamminga e francese, vista la posizione di Lille presso il confine belga.",
    facts: [
      "Fu fondato sotto Napoleone per portare la grande arte nelle regioni francesi.",
      "I suoi fondi sono particolarmente ricchi d'arte fiamminga, grazie alla posizione di confine di Lille.",
    ],
  },
  'Antigua Galería Nacional de Berlín': {
    lead:
      "L'Alte Nationalgalerie sull'Isola dei Musei di Berlino, che custodisce l'arte dell'Ottocento e una grande sede del romanticismo tedesco.",
    city: 'Berlino, Germania',
    founded: '1876',
    highlights: [
      'Opere chiave di Caspar David Friedrich',
      "« L'abbazia nel querceto » di Friedrich",
      'Pittura romantica e impressionista tedesca',
      'Un edificio a forma di tempio su un\'isola dell\'UNESCO',
    ],
    about:
      "Aperta nel 1876, l'« Antica Galleria nazionale » è un edificio a forma di tempio sull'Isola dei Musei di Berlino, un insieme di cinque musei iscritto insieme nel patrimonio mondiale dell'UNESCO. Riunisce l'arte dell'Ottocento con il romanticismo tedesco al suo cuore, soprattutto i paesaggi visionari di Caspar David Friedrich, accanto all'impressionismo tedesco e francese. Fu gravemente danneggiata durante la Seconda guerra mondiale e minuziosamente restaurata.",
    facts: [
      "Sorge sull'Isola dei Musei di Berlino, sito del patrimonio mondiale dell'UNESCO.",
      "Fu gravemente danneggiata durante la Seconda guerra mondiale e poi accuratamente ricostruita.",
    ],
  },
  'Kunsthalle de Hamburgo': {
    lead:
      "La Hamburger Kunsthalle, uno dei più grandi musei d'arte della Germania, celebre per il suo romanticismo tedesco.",
    city: 'Amburgo, Germania',
    founded: '1869',
    highlights: [
      "« Viandante sul mare di nebbia » di Friedrich",
      "« Il mare di ghiaccio » di Friedrich",
      'Arte dal Medioevo a oggi',
      'Maestri antichi, romanticismo e arte moderna',
    ],
    about:
      "Fondata nel 1869 dall'associazione artistica cittadina, la Kunsthalle si estende su diversi edifici collegati e copre l'arte dalle pale d'altare medievali all'opera contemporanea. È soprattutto un luogo di pellegrinaggio per gli amanti di Caspar David Friedrich, custodendo l'immagine più celebre del romanticismo, « Viandante sul mare di nebbia », divenuta un'icona riprodotta in tutto il mondo.",
    facts: [
      "Custodisce il « Viandante », l'immagine più celebre del romanticismo.",
      "I suoi edifici vanno da una sala ottocentesca a un cubo moderno essenziale.",
    ],
  },
  'Museo Munch': {
    lead:
      "Il museo Munch (MUNCH) a Oslo, dedicato a Edvard Munch, che lasciò il grosso della sua opera alla città.",
    city: 'Oslo, Norvegia',
    founded: '1963',
    highlights: [
      "Versioni de « L'urlo », « Madonna », « Vampiro » e « Angoscia »",
      'Migliaia di dipinti, stampe e disegni',
      "La collezione definitiva dell'arte di Munch",
      'Una spettacolare nuova torre sul lungomare',
    ],
    about:
      "Alla morte di Munch nel 1944, egli lasciò i suoi enormi fondi personali — oltre 26.000 opere — alla città di Oslo, fondamento di questo museo. Aprì nel 1963 e si trasferì nel 2021 in una spettacolare torre di 13 piani sul lungomare di Oslo, diventando la sede definitiva della sua arte. Poiché conservò così tante versioni e stampe delle sue immagini chiave, il museo può mostrare l'evoluzione di un solo motivo come « L'urlo » lungo tutta una vita.",
    facts: [
      "Munch lasciò alla città oltre 26.000 sue opere.",
      "Riaprì nel 2021 in un spettacolare nuovo edificio di 13 piani sul lungomare.",
      "Può ripercorrere come Munch rielaborò una stessa immagine in molte versioni.",
    ],
  },
  'Kunsthaus Zürich': {
    lead:
      "Il Kunsthaus Zürich, il principale museo d'arte della più grande città della Svizzera, ricco d'arte moderna.",
    city: 'Zurigo, Svizzera',
    founded: '1910',
    highlights: [
      'Opere di Munch e degli espressionisti',
      'Una composizione classica di Mondrian',
      'La più grande collezione di Munch fuori dalla Norvegia',
      'Dai maestri antichi all\'arte contemporanea',
    ],
    about:
      "Gestito da una società d'arte locale di lunga data, il Kunsthaus aprì il suo edificio principale nel 1910 e si ampliò fortemente con un'importante nuova ala nel 2021, diventando uno dei più grandi musei d'arte della Svizzera. Custodisce un'importante collezione d'arte moderna — compreso il più grande nucleo di opere di Munch fuori dalla Norvegia — accanto a maestri antichi, arte svizzera e una notevole collezione di Alberto Giacometti.",
    facts: [
      "Un'importante estensione del 2021 ne fece uno dei più grandi musei d'arte della Svizzera.",
      "Custodisce la più grande collezione di Munch fuori dalla Norvegia.",
    ],
  },
  'Museo Leopold': {
    lead:
      "Il Leopold Museum di Vienna, costruito su una grande collezione privata e sede del più grande tesoro di Egon Schiele al mondo.",
    city: 'Vienna, Austria',
    founded: '2001',
    highlights: [
      "La più grande collezione di Egon Schiele al mondo",
      'Opere maggiori di Gustav Klimt',
      'Una sede del modernismo viennese (Vienna 1900)',
      'Design e arti decorative dell\'epoca',
    ],
    about:
      "L'oculista Rudolf Leopold passò cinque decenni a mettere insieme una vasta collezione d'arte moderna austriaca, soprattutto Egon Schiele, comprando le sue opere quando l'artista ancora scandalizzava ed era sottovalutato. Nel 2001 la collezione divenne un museo pubblico nel MuseumsQuartier di Vienna, un elegante cubo bianco votato al fermento di « Vienna 1900 », la brillante e ansiosa cultura della città a cavallo del secolo.",
    facts: [
      "Fu costruito sulla collezione di una vita di un solo oculista viennese.",
      "Custodisce più opere di Egon Schiele di ogni altro luogo sulla Terra.",
      "È un museo chiave dell'epoca « Vienna 1900 ».",
    ],
  },
  'Galería Belvedere': {
    lead:
      "Il Belvedere di Vienna, un magnifico palazzo barocco che custodisce la collezione nazionale austriaca e, soprattutto, l'arte di Gustav Klimt.",
    city: 'Vienna, Austria',
    founded: '1781 (pubblico)',
    highlights: [
      "Il capolavoro dorato di Klimt « Il bacio »",
      'La più grande collezione di Klimt al mondo',
      'Opere chiave di Egon Schiele',
      'Un panorama dell\'arte austriaca in un palazzo barocco',
    ],
    about:
      "Costruito all'inizio del Settecento come palazzo estivo dell'eroe militare il principe Eugenio di Savoia, il Belvedere aprì la sua collezione imperiale di quadri al pubblico nel 1781 — tra i primissimi musei pubblici del mondo, anni prima del Louvre. Oggi è soprattutto noto come la sede di Gustav Klimt, custodendo la più grande collezione al mondo della sua opera, tra cui « Il bacio », lì appeso fin da quando fu dipinto.",
    facts: [
      "Aprì al pubblico nel 1781, tra i primi musei a farlo.",
      "« Il bacio » vi è appeso fin da quando fu dipinto.",
      "Custodisce la più grande collezione di Klimt al mondo.",
    ],
  },
  'Museo Nacional de Arte, Arquitectura y Diseño': {
    lead:
      "Il Museo nazionale di Oslo, che custodisce la principale collezione norvegese di arte, architettura e design.",
    city: 'Oslo, Norvegia',
    founded: '2003 (fusione)',
    highlights: [
      "Le versioni più celebri dei capolavori di Munch, tra cui « L'urlo »",
      'I fondi d\'arte nazionale della Norvegia',
      'Arte, architettura e design insieme',
      'Una vasta nuova sede costruita ad hoc',
    ],
    about:
      "Formato dalla fusione di diverse istituzioni norvegesi più antiche, il Museo nazionale riunì sotto un solo tetto le collezioni di arte, architettura e design della nazione e aprì il suo immenso nuovo edificio a Oslo nel 2022 — tra i più grandi musei d'arte dei paesi nordici. Tra i suoi fiori all'occhiello ci sono le versioni più note dei capolavori di Edvard Munch, esposte in una sala appositamente protetta dopo i precedenti furti de « L'urlo ».",
    facts: [
      "Il suo immenso nuovo edificio, aperto nel 2022, è tra i più grandi dei paesi nordici.",
      "Riunisce arte, architettura e design in un'unica istituzione.",
    ],
  },
  'Pinacoteca del Estado de São Paulo': {
    lead:
      "La Pinacoteca de São Paulo, il più antico museo d'arte della città, che custodisce una delle più importanti collezioni d'arte brasiliana.",
    city: 'São Paulo, Brasile',
    founded: '1905',
    highlights: [
      "« Caipira che trita tabacco » di Almeida Júnior",
      "« Il suonatore di viola » di Almeida Júnior",
      'Un profondo panorama dell\'arte brasiliana',
      'Un edificio restaurato del primo Novecento',
    ],
    about:
      "Fondata nel 1905 in un ex edificio scolastico riadattato presso la vecchia stazione ferroviaria della città, la Pinacoteca si concentra sull'arte brasiliana dall'Ottocento a oggi. Il suo bell'edificio in mattoni fu elegantemente restaurato negli anni Novanta dall'architetto Paulo Mendes da Rocha, e la sua collezione è particolarmente ricca dei pittori, come Almeida Júnior, che per primi volsero l'arte verso soggetti autenticamente brasiliani.",
    facts: [
      "È il più antico museo d'arte di São Paulo.",
      "Il suo edificio fu ristrutturato dall'architetto vincitore del Pritzker Paulo Mendes da Rocha.",
    ],
  },
  'Nezu Art Museum': {
    lead:
      "Il museo Nezu a Tokyo, costruito attorno alla collezione di un uomo d'affari e immerso in un celebre giardino tradizionale.",
    city: 'Tokyo, Giappone',
    founded: '1941',
    highlights: [
      "I paraventi « Iris », Tesoro nazionale, di Ogata Kōrin",
      'Rinomata arte giapponese ed est-asiatica',
      'Un celebre giardino di passeggio con case da tè',
      'Un edificio moderno dell\'architetto Kengo Kuma',
    ],
    about:
      "Il museo nacque dalla collezione dell'industriale Nezu Kaichirō e aprì nel 1941, ricostruito nel 2009 in un sereno edificio moderno dell'architetto Kengo Kuma. I suoi paraventi « Iris » di Kōrin, un Tesoro nazionale, sono tradizionalmente esposti ogni primavera — nel momento in cui i visitatori possono poi uscire nel celebre giardino del museo e vedere i veri iris in fiore.",
    facts: [
      "I suoi celebri paraventi « Iris » sono mostrati ogni primavera in coincidenza con il giardino in fiore.",
      "Il suo giardino paesaggistico con case da tè è una rara oasi nel cuore di Tokyo.",
      "L'edificio attuale è dell'illustre architetto Kengo Kuma.",
    ],
  },
  'MOA': {
    lead:
      "Il MOA Museum of Art di Atami, in Giappone, affacciato sul mare, che custodisce una notevole collezione d'arte giapponese ed est-asiatica.",
    city: 'Atami, Giappone',
    founded: '1982',
    highlights: [
      "« Susini rossi e bianchi », Tesoro nazionale, di Ogata Kōrin",
      'Capolavori della scuola Rinpa',
      'Arte giapponese ed est-asiatica',
      'Uno spettacolare edificio a mezza costa sopra la costa',
    ],
    about:
      "Arroccato in alto su una collina sopra la località termale costiera di Atami, con ampie vedute sul mare, il MOA aprì nel 1982 e si raggiunge attraverso una spettacolare serie di lunghe scale mobili scavate nella montagna. È incentrato sul suo supremo tesoro Rinpa di Kōrin, e fa ruotare le sue opere più delicate per proteggerle, esponendo i paraventi dei « Susini » nella stagione dei fiori di susino.",
    facts: [
      "Sorge a mezza costa con vedute panoramiche sul mare di Atami.",
      "I visitatori vi salgono attraverso lunghe scale mobili scavate nella montagna.",
    ],
  },
  'Museo Nacional de Kioto': {
    lead:
      "Il Museo nazionale di Kyoto, uno dei principali musei del Giappone, dedicato all'arte e al patrimonio premoderni dell'antica capitale imperiale.",
    city: 'Kyoto, Giappone',
    founded: '1897',
    highlights: [
      'Numerosi Tesori nazionali di pittura, scultura e artigianato',
      'Arte giapponese premoderna',
      'Tesori affidati dai templi e santuari di Kyoto',
      'Un edificio storico del 1897 e un\'ala moderna',
    ],
    about:
      "Fondato nel 1897, il Museo nazionale di Kyoto salvaguarda ed espone il patrimonio artistico di Kyoto, che fu la capitale imperiale del Giappone per oltre mille anni. Gran parte della sua collezione gli è affidata dagli antichi templi e santuari della città, ed esso svolge un ruolo di primo piano nella conservazione dei tesori culturali del Giappone, affiancando la sua sala originaria in mattoni dell'era Meiji a un'elegante ala espositiva moderna.",
    facts: [
      "Gran parte dei suoi fondi proviene dagli antichi templi e santuari di Kyoto.",
      "Kyoto fu la capitale del Giappone per oltre mille anni.",
    ],
  },
};

/** German museum profiles (filled batch by batch; falls back to English). */
export const MUSEUM_INFO_DE: Record<string, MuseumInfo> = {
  'Museo del Prado': {
    lead:
      "Spaniens nationales Kunstmuseum in Madrid und eine der größten Gemäldegalerien der Welt.",
    city: 'Madrid, Spanien',
    founded: '1819',
    highlights: [
      'Der weltweit beste Bestand an Velázquez, Goya und El Greco',
      "Velázquez' «Las Meninas» und Goyas «Der dritte Mai 1808»",
      'Goyas private, albtraumhafte «Schwarze Gemälde»',
      'Meisterwerke von Tizian, Bosch, Rubens und Dürer',
    ],
    about:
      "Der Prado wuchs aus der spanischen königlichen Sammlung, über Jahrhunderte von Habsburger und Bourbonen zusammengetragen, die zu den größten Mäzenen Europas zählten — deshalb besitzt er so viele Tizians, Bosch-Tafeln und Rubens-Werke neben seinen spanischen Meistern. Er öffnete 1819 in einem ursprünglich für ein naturkundliches Museum bestimmten Gebäude. Statt eines enzyklopädischen Überblicks bietet er unübertroffene Tiefe in wenigen überragenden Künstlern und bildet heute mit dem nahen Reina Sofía und Thyssen-Bornemisza ein «goldenes Dreieck» der Madrider Museen.",
    facts: [
      "Seine Sammlung begann als die private Gemäldegalerie der spanischen Könige.",
      "Er besitzt rund 50 Werke von Rubens und etwa 40 von Goya.",
      "Das Gebäude wurde zunächst als naturwissenschaftliches Museum entworfen, nicht als Kunstgalerie.",
    ],
  },
  'Museo de Orsay': {
    lead:
      "Ein Pariser Museum in einem großartigen ehemaligen Bahnhof an der Seine, das die weltweit beste Sammlung impressionistischer und postimpressionistischer Kunst beherbergt.",
    city: 'Paris, Frankreich',
    founded: '1986',
    highlights: [
      'Monet, Renoir, Degas, Van Gogh, Cézanne und Gauguin',
      "Van Goghs Selbstbildnisse und «Sternennacht über der Rhône»",
      'Französische Malerei, Skulptur und Design von 1848 bis 1914',
      'Verbindet den Louvre (ältere Kunst) und das Pompidou (moderne Kunst)',
    ],
    about:
      "Das Orsay belegt die Gare d'Orsay, einen Beaux-Arts-Bahnhof von 1900, der vor dem Abriss gerettet und 1986 als Museum wiedergeboren wurde. Seine Sammlung wurde zusammengestellt, um die historische Lücke zwischen den Alten Meistern des Louvre und der modernen Kunst des Centre Pompidou zu füllen, und macht es zur wesentlichen Heimat der französischen Kunst des späten 19. Jahrhunderts. Unter seinem großen Glasgewölbe blickt die riesige originale Bahnhofsuhr noch immer über die Seine, und das Museum zieht einige der größten Besuchermengen aller Galerien der Welt an.",
    facts: [
      "Das Gebäude war ein in Betrieb befindlicher Bahnhof, bevor es Museum wurde.",
      "Man kann noch immer durch die enorme originale Bahnhofsuhr hinausblicken.",
      "Es entstand zum Teil, weil der Louvre und das Pompidou eine Lücke in der Geschichte der französischen Kunst ließen.",
    ],
  },
  'National Gallery de Londres': {
    lead:
      "Die nationale Sammlung westeuropäischer Malerei Großbritanniens am Trafalgar Square in London, ein hervorragender, kompakter Überblick vom Mittelalter bis 1900.",
    city: 'London, Vereinigtes Königreich',
    founded: '1824',
    highlights: [
      "Van Eycks «Arnolfini-Hochzeit»",
      'Werke von Leonardo, Tizian und Velázquez',
      "Turners «Die kämpfende Temeraire»",
      'Freier Eintritt in eine der großen Sammlungen der Welt',
    ],
    about:
      "Die National Gallery wurde 1824 gegründet, als die Regierung die Sammlung eines Bankiers von nur 38 Bildern kaufte, und wurde bewusst mitten in London errichtet, damit Menschen jeder Schicht sie zu Fuß erreichen konnten. Anders als aus königlichen Beständen gewachsene Museen wurde sie von Anfang an als öffentliche Sammlung für die Nation zusammengestellt, ausgewählt nach Qualität statt Menge. Der Eintritt war stets frei, und ihre relativ geringe Größe gilt als Tugend — nahezu jedes Bild ist ein Meisterwerk.",
    facts: [
      "Sie begann mit nur 38 Gemälden, die einem privaten Sammler abgekauft wurden.",
      "Sie war stets frei und zentral gelegen, damit jeder sie besuchen konnte.",
      "Sie war nie eine königliche Sammlung — sie wurde von Anfang an für die Öffentlichkeit geschaffen.",
    ],
  },
  'Museo del Louvre': {
    lead:
      "Das größte und meistbesuchte Kunstmuseum der Welt, in einem ehemaligen Königspalast in Paris, von der Antike bis zum 19. Jahrhundert reichend.",
    city: 'Paris, Frankreich',
    founded: '1793',
    highlights: [
      "Heimat der «Mona Lisa»",
      'Leonardo, David, Delacroix und Vermeer',
      'Antike Ikonen wie die Venus von Milo und die Nike von Samothrake',
      'Über 30.000 ausgestellte Werke in den Sälen des ehemaligen Palastes',
    ],
    about:
      "Der Louvre begann als mittelalterliche Festung, wurde zum Palast der französischen Könige und öffnete 1793 während der Revolution als öffentliches Museum, das die vom neuen Staat beschlagnahmten ehemaligen königlichen und kirchlichen Sammlungen zeigte. Napoleon vergrößerte ihn enorm mit Kunst aus dem eroberten Europa, vieles davon später zurückgegeben. Der gläserne Pyramideneingang, entworfen von I. M. Pei, wurde 1989 unter Kontroversen hinzugefügt und ist heute selbst eine Ikone. So riesig ist die Sammlung, dass jedes Werk auch nur wenige Sekunden lang zu sehen viele Tage dauern würde.",
    facts: [
      "Er war eine Festung und dann ein Königspalast, ehe er je ein Museum war.",
      "Napoleon füllte ihn mit über ganz Europa geraubter Kunst, vieles später zurückgegeben.",
      "Er empfängt die meisten Besucher aller Kunstmuseen der Erde.",
    ],
  },
  'Museo Nacional de Bellas Artes': {
    lead:
      "Argentiniens nationales Museum der schönen Künste in Buenos Aires, das die wichtigste Kunstsammlung des Landes beherbergt.",
    city: 'Buenos Aires, Argentinien',
    founded: '1895',
    highlights: [
      "De la Cárcovas «Ohne Brot und ohne Arbeit»",
      'Die Gründungswerke der argentinischen Malerei: Della Valle, Sívori, Pueyrredón',
      'Europäische Alte Meister und französische Impressionisten',
      'Freier Eintritt in die nationale Sammlung',
    ],
    about:
      "1895 gegründet und später in eine umgebaute Pumpstation verlegt, vereint das Museum europäische Kunst — von den Alten Meistern bis zum Impressionismus — mit den grundlegenden Leinwänden der argentinischen Nationalmalerei. Es zeichnet nach, wie ein junges, von europäischer Einwanderung angeschwollenes Land eine eigene Kunst aufbaute, von Gaucho-Szenen und Bildnissen bis zu kühnen Werken des sozialen Protests. Es ist der wichtigste Ort, um die Geburt der argentinischen Kunst zu verstehen.",
    facts: [
      "Es ist die wichtigste Heimat der argentinischen Malerei des 19. Jahrhunderts.",
      "Sein Gebäude wurde aus einer ehemaligen Wasserpumpstation umgebaut.",
    ],
  },
  'Galería Uffizi': {
    lead:
      "Das große Renaissance-Schatzhaus von Florenz und eines der ältesten Museen der Welt, in einem für die Medici errichteten Palast des 16. Jahrhunderts.",
    city: 'Florenz, Italien',
    founded: '1765 (öffentlich)',
    highlights: [
      "Botticellis «Geburt der Venus» und «Primavera»",
      'Leonardo, Michelangelo, Raffael und Tizian',
      'Der unübertroffene Überblick über die italienische Renaissancekunst',
      'Ein berühmter Korridor antiker Skulptur',
    ],
    about:
      "Die Uffizien («Ämter») wurden in den 1560er Jahren errichtet, um die Verwaltungsbüros der florentinischen Regierung zu beherbergen, und füllten sich allmählich mit der außergewöhnlichen Kunstsammlung der Familie Medici. Als die Medici-Linie erlosch, vermachte die letzte Erbin, Anna Maria Luisa, die ganze Sammlung 1743 der Stadt Florenz unter der Bedingung, dass sie die Stadt nie verlasse — eine Schenkung, die die Uffizien zu einem der frühesten wahren öffentlichen Museen machte. Ihre Säle zeichnen die Renaissance von ihrer florentinischen Wiege bis zu ihrem Hochrenaissance-Gipfel nach.",
    facts: [
      "Das Gebäude war ursprünglich Regierungsbüros — daher der Name «Uffizi».",
      "Die letzte Medici-Erbin hinterließ die Sammlung Florenz unter der Bedingung, dass sie für immer dort bleibe.",
      "Ihre lange Geschichte macht sie zu einem der ältesten Museen der Welt.",
    ],
  },
  'Museo de Arte Moderno': {
    lead:
      "Das Museum of Modern Art (MoMA) in New York, eines der einflussreichsten Museen moderner und zeitgenössischer Kunst der Welt.",
    city: 'New York, USA',
    founded: '1929',
    highlights: [
      "Van Goghs «Die Sternennacht»",
      'Picasso, Matisse, Mondrian und Malewitsch',
      "Hoppers «Gas» und Ikonen des 20. Jahrhunderts",
      'Design, Film und Fotografie ebenso wie Malerei',
    ],
    about:
      "Das MoMA wurde 1929, nur Tage nach dem Börsenkrach, von einer kleinen Gruppe von Mäzenen unter Abby Aldrich Rockefeller gegründet, zu einer Zeit, als die etablierten amerikanischen Museen lebende Künstler weitgehend ignorierten. Durch seine Ausstellungen, Publikationen und Erwerbungen tat es mehr als jede andere Institution, um die Geschichte der modernen Kunst überhaupt zu bestimmen, und behandelte Architektur, Design, Film und Fotografie so ernst wie die Malerei. Es wurde mehrfach in sein markantes Domizil in Midtown Manhattan erweitert.",
    facts: [
      "Es eröffnete nur Tage nach dem Börsenkrach von 1929.",
      "Seine Gründer setzten sich für moderne Kunst ein, als andere Museen sie noch ablehnten.",
      "Seine Sammlung umfasst Design, Film und Fotografie, nicht nur die schönen Künste.",
    ],
  },
  'Galería Nacional de Arte': {
    lead:
      "Die National Gallery of Art in Washington, D.C., die nationale Sammlung der Vereinigten Staaten, für die Öffentlichkeit frei.",
    city: 'Washington, D.C., USA',
    founded: '1937',
    highlights: [
      "Leonardos «Ginevra de' Benci» — der einzige Leonardo in Amerika",
      'Europäische Alte Meister neben tiefen amerikanischen Beständen',
      'Eine riesige, fast ganz aus Schenkungen aufgebaute Sammlung',
      'Freier Eintritt, finanziert durch private Gaben',
    ],
    about:
      "Die National Gallery wurde 1937 mit einer bedeutenden Schenkung von Kunst und Geld des Finanziers Andrew Mellon gegründet, der darauf bestand, dass das Museum den Namen der Nation statt seinen eigenen trage, damit andere Sammler zum Geben ermutigt würden. Die Strategie ging auf: Sie wuchs durch die Schenkungen der großen amerikanischen Sammler zu einer der schönsten Galerien der Welt. Bei freiem Eintritt verbindet sie europäische Alte Meister mit einem außergewöhnlichen Überblick über die amerikanische Kunst.",
    facts: [
      "Sie besitzt das einzige Gemälde von Leonardo da Vinci in Amerika.",
      "Ihr Gründer weigerte sich, seinen eigenen Namen darauf zu setzen, um andere Spender zu ermutigen.",
      "Fast ihre gesamte Sammlung stammt aus privaten Gaben, nicht aus Käufen.",
    ],
  },
  'Instituto de Arte de Chicago': {
    lead:
      "Eines der ältesten und größten Kunstmuseen der Vereinigten Staaten, mit einer enzyklopädischen Sammlung, besonders reich an Impressionismus und amerikanischer Kunst.",
    city: 'Chicago, USA',
    founded: '1879',
    highlights: [
      "Seurats «Ein Sonntagnachmittag auf der Insel La Grande Jatte»",
      "Hoppers «Nighthawks»",
      "Grant Woods «American Gothic»",
      'Eine der schönsten impressionistischen Sammlungen außerhalb von Paris',
    ],
    about:
      "1879 zugleich als Museum und Schule gegründet, wuchs das Art Institute mit dem boomenden Chicago des späten 19. Jahrhunderts und zog für die Weltausstellung von 1893 in sein markantes Gebäude, seither von zwei berühmten Bronzelöwen an der Michigan Avenue bewacht. Frühe Schenkungen lokaler Sammler — viele hatten impressionistische Werke direkt von Pariser Händlern gekauft — bescherten ihm einen der größten Bestände der Bewegung überhaupt. Seine Schule zählt weiterhin zu den angesehensten Kunsthochschulen Amerikas.",
    facts: [
      "Zwei Bronzelöwen flankieren seit 1893 seinen Eingang.",
      "Es ist neben dem Museum eine aktive Kunstschule.",
      "Seine impressionistische Stärke kam von Chicagoer Sammlern, die direkt aus Paris kauften.",
    ],
  },
  'Rijksmuseum': {
    lead:
      "Das Nationalmuseum der Niederlande in Amsterdam, der niederländischen Kunst und Geschichte und dem Ruhm des Goldenen Zeitalters gewidmet.",
    city: 'Amsterdam, Niederlande',
    founded: '1800',
    highlights: [
      "Rembrandts monumentale «Nachtwache»",
      "Vermeers «Die Milchmagd» und «Die kleine Straße»",
      'Meisterwerke von Frans Hals und den Malern des Goldenen Zeitalters',
      'Ein großartiges eigens errichtetes Domizil, nach einem Jahrzehnt wiedereröffnet',
    ],
    about:
      "Das Rijksmuseum («Staatsmuseum») geht auf 1800 zurück, als der niederländische Staat eine nationale Sammlung begann, und zog 1885 in sein großartiges, kathedralenartiges Gebäude des Architekten Pierre Cuypers. Nach einer umfassenden zehnjährigen Renovierung eröffnete es 2013 wieder, mit der «Nachtwache» am Ehrenplatz am Ende ihrer langen Ehrengalerie. 2019–21 durchlief das Gemälde eine vielbeachtete öffentliche Restaurierung, hinter Glas von Besuchern und Online-Publikum weltweit beobachtet.",
    facts: [
      "«Die Nachtwache» hängt in einem eigens um sie herum gestalteten Saal.",
      "Das Museum eröffnete 2013 nach einer zehnjährigen Renovierung wieder.",
      "«Die Nachtwache» wurde kürzlich hinter Glas vor aller Augen restauriert.",
    ],
  },
  'Museo Metropolitano de Arte': {
    lead:
      "Das Metropolitan Museum of Art in New York, eines der größten und enzyklopädischsten Museen der Erde, das fünftausend Jahre Weltkultur umspannt.",
    city: 'New York, USA',
    founded: '1870',
    highlights: [
      'Europäische Alte Meister und tiefe amerikanische Malerei',
      'Herausragende asiatische, antike und islamische Kunst',
      'Ein ganzer altägyptischer Tempel, der Dendur-Tempel',
      'Millionen Besucher jährlich am Rand des Central Park',
    ],
    about:
      "1870 von einer Gruppe von Bürgern, Geschäftsleuten und Künstlern gegründet, die dem amerikanischen Volk Kunst und Kunsterziehung bringen wollten, hatte «das Met» zunächst gar keine Sammlung und wuchs durch Schenkungen und Käufe zu einem riesigen enzyklopädischen Museum am Rand des Central Park. Seine Bestände reichen von ägyptischen Tempeln und griechischer Skulptur bis zur europäischen Malerei, amerikanischen Kunst und der Kunst Asiens, Afrikas und der Amerikas. Es zählt zu den meistbesuchten Museen der Welt.",
    facts: [
      "Seine Sammlung umspannt rund 5.000 Jahre über alle Teile der Welt.",
      "Es enthält sogar einen ganzen altägyptischen Tempel, den Dendur-Tempel.",
      "Es begann 1870 ganz ohne Kunstwerke.",
    ],
  },
  'Museo de Bellas Artes de Boston': {
    lead:
      "Das Museum of Fine Arts, Boston, eines der größten Museen der Vereinigten Staaten, berühmt für seinen französischen Impressionismus und seine asiatische Kunst.",
    city: 'Boston, USA',
    founded: '1870',
    highlights: [
      'Französischer Impressionismus und amerikanische Malerei',
      'Eine der größten Sammlungen japanischer Kunst außerhalb Japans',
      'Altägyptische und nubische Bestände',
      'Fast eine halbe Million Werke aus allen Kulturen',
    ],
    about:
      "1870 gegründet und 1876 eröffnet, baute das MFA außergewöhnliche Sammlungen durch die Schenkungen der kultivierten Bostoner Elite auf, von der mehrere enge Verbindungen zu Japan hatten, gerade als es sich der Welt öffnete — was dem Museum einige der frühesten und schönsten westlichen Bestände japanischer Kunst bescherte. Seine ägyptische Sammlung wuchs aus jahrzehntelangen gemeinsamen archäologischen Expeditionen, und seine impressionistischen und amerikanischen Säle zählen zu den besten des Landes.",
    facts: [
      "Es hat eine der größten Sammlungen japanischer Kunst außerhalb Japans.",
      "Seine ägyptischen Bestände stammten aus eigenen archäologischen Grabungen.",
    ],
  },
  'Museo del Hermitage': {
    lead:
      "Eines der größten und ältesten Museen der Welt, in Sankt Petersburg, von Katharina der Großen gegründet und größtenteils im ehemaligen kaiserlichen Winterpalast untergebracht.",
    city: 'Sankt Petersburg, Russland',
    founded: '1764',
    highlights: [
      "Rembrandts «Rückkehr des verlorenen Sohnes»",
      "Bedeutende Werke von Matisse, darunter «Der Tanz»",
      'Ein weiter Bogen europäischer Malerei und Antiken',
      'Galerien, die sich über viele Kilometer erstrecken',
    ],
    about:
      "Der Hermitage begann 1764 als private Sammlung Katharinas der Großen, in einem abgeschiedenen Rückzugsort neben dem Winterpalast verwahrt — einer «Eremitage», von der er seinen Namen hat. Katharina kaufte ganze europäische Sammlungen auf einmal, um mit den königlichen Galerien des Westens zu wetteifern, und nach der Revolution von 1917 nahm das Museum große Privatsammlungen auf, darunter herausragende moderne französische Gemälde. Heute erstreckt es sich über einen Komplex von Palastgebäuden, der so groß ist, dass ein Gang durch jede Galerie viele Kilometer bedeutet.",
    facts: [
      "Er begann als der private Kunstschatz der Kaiserin Katharina der Großen.",
      "Sie kaufte ganze europäische Sammlungen auf einmal, um den westlichen Adel zu überstrahlen.",
      "Seine Galerien sind so weitläufig, dass sie alle zu sehen einen kilometerlangen Marsch bedeutet.",
    ],
  },
  'Museu Nacional de Belas Artes': {
    lead:
      "Brasiliens nationales Museum der schönen Künste in Rio de Janeiro, das die wichtigste Sammlung brasilianischer Kunst beherbergt.",
    city: 'Rio de Janeiro, Brasilien',
    founded: '1937',
    highlights: [
      'Großartige akademische und Historienmalerei des 19. Jahrhunderts',
      'Pedro Américo, Victor Meirelles und ihre Zeitgenossen',
      'Werke, die das Selbstbild der Nation prägten',
      'Ein Überblick über die brasilianische Kunst bis in die Moderne',
    ],
    about:
      "Die Wurzeln des Museums reichen zur königlichen Kunstschule zurück, die gegründet wurde, nachdem der portugiesische Hof vor Napoleon geflohen und Anfang des 19. Jahrhunderts in Brasilien angekommen war und eine Gruppe französischer Künstler mitbrachte, um eine Akademie zu gründen. Seine Sammlung ist die große Heimat der kaiserlichen brasilianischen Malerei — der riesigen Historienleinwände und romantischen Szenen, durch die sich eine junge Nation ihre Ursprünge vorstellte — seit 1937 in einem großartigen Gebäude in Rio untergebracht.",
    facts: [
      "Seine Ursprünge liegen in einer Kunstakademie, die 1816 von nach Brasilien eingeladenen französischen Künstlern gegründet wurde.",
      "Es besitzt die prägenden Bilder der Gründung Brasiliens als Nation.",
    ],
  },
  'Museo Nacional de Arte': {
    lead:
      "Das Museo Nacional de Arte (MUNAL) in Mexiko-Stadt, das Mexikos nationale Sammlung von der Kolonialzeit bis zum frühen 20. Jahrhundert beherbergt.",
    city: 'Mexiko-Stadt, Mexiko',
    founded: '1982',
    highlights: [
      "Velascos leuchtende Panoramen des Tals von Mexiko",
      'Herrán, Izaguirre und die akademischen Meister',
      'Mexikanische Kunst von der Kolonialzeit bis zur frühen Moderne',
      'Ein prachtvoller ehemaliger Regierungspalast als Domizil',
    ],
    about:
      "Das MUNAL ist in einem prachtvollen Palast des frühen 20. Jahrhunderts im historischen Zentrum von Mexiko-Stadt untergebracht, unter dem Diktator Porfirio Díaz als Kommunikationsministerium errichtet und später in ein 1982 eröffnetes Museum umgewandelt. Seine Säle zeichnen die mexikanische Kunst von der Kolonialzeit bis zum Vorabend der Muralisten-Bewegung nach und zeigen, wie Maler wie Velasco und Herrán aus dem Land, der Geschichte und den Völkern des Landes eine nationale künstlerische Identität schmiedeten.",
    facts: [
      "Es belegt einen üppigen ehemaligen Regierungspalast im historischen Zentrum.",
      "Seine Sammlung endet ungefähr am Beginn der berühmten mexikanischen Muralisten.",
    ],
  },
  'Museo de Historia del Arte de Viena': {
    lead:
      "Das Kunsthistorische Museum in Wien, für die kaiserliche Habsburger Sammlung errichtet und zu den führenden Kunstmuseen der Welt gehörend.",
    city: 'Wien, Österreich',
    founded: '1891',
    highlights: [
      'Die größte Bruegel-Sammlung überhaupt',
      "Bruegels «Turmbau zu Babel» und «Jäger im Schnee»",
      'Meisterwerke von Tizian, Velázquez, Vermeer und Rubens',
      'Ein palastartiges Gebäude mit einem von Klimt geschmückten Treppenhaus',
    ],
    about:
      "1891 eröffnet, um die riesige Kunstsammlung der Habsburger Kaiser zu zeigen, ist das «Kunsthistorische Museum» ein palastartiges Gebäude an der großartigen Wiener Ringstraße, dessen Treppenhaus vom jungen Gustav Klimt geschmückt wurde. Jahrhunderte kaiserlichen Sammelns — die Habsburger beherrschten weite Teile Europas — bescherten ihm außergewöhnliche Tiefe, vor allem die weltweit größte Konzentration von Pieter Bruegel dem Älteren, dessen erhaltenes Werk winzig und kostbar ist.",
    facts: [
      "Es besitzt etwa ein Dutzend der rund vierzig erhaltenen Bruegel-Tafeln.",
      "Es wurde eigens errichtet, um die kaiserliche Habsburger Sammlung zu zeigen.",
      "Ein junger Gustav Klimt half, sein großartiges Treppenhaus zu schmücken.",
    ],
  },
  'Museo de Arte de Filadelfia': {
    lead:
      "Das Philadelphia Museum of Art, eines der größten der Vereinigten Staaten, vielen berühmt für die große Eingangstreppe seines tempelartigen Gebäudes.",
    city: 'Philadelphia, USA',
    founded: '1876',
    highlights: [
      'Bedeutende Werke von Cézanne und Poussin',
      "Klees Meisterwerk «Ad Parnassum»",
      'Starke europäische, amerikanische und moderne Bestände',
      "Die weltberühmten «Rocky-Stufen»",
    ],
    about:
      "Das Museum wurde im Zusammenhang mit der Centennial-Ausstellung von 1876 gegründet — Amerikas erster großer Weltausstellung, in Philadelphia abgehalten — und zog 1928 in sein monumentales Gebäude im Stil der griechischen Wiedergeburt auf einem Hügel. Seine Stufen wurden durch den Film «Rocky» weltberühmt, samt einer Bronzestatue in der Nähe, doch im Inneren liegen tiefe Sammlungen europäischer, amerikanischer und moderner Kunst, darunter eine gefeierte Werkgruppe von Cézanne und Duchamp.",
    facts: [
      "Seine Vordertreppe ist weltweit als die «Rocky-Stufen» bekannt.",
      "Es entstand aus Amerikas erster großer Weltausstellung 1876.",
      "Eine Bronzestatue des «Rocky» steht nahe dem Fuß der Treppe.",
    ],
  },
  'Museo van Gogh': {
    lead:
      "Das Van Gogh Museum in Amsterdam, Heimat der weltweit größten Sammlung von Vincent van Goghs Werk.",
    city: 'Amsterdam, Niederlande',
    founded: '1973',
    highlights: [
      "«Die Kartoffelesser», «Sonnenblumen» und «Das Schlafzimmer»",
      'Die späten Felder und Hunderte von Zeichnungen',
      "Van Goghs Briefe an seinen Bruder Theo",
      'Werke seiner Zeitgenossen zum Kontext',
    ],
    about:
      "Das Museum ist um die Sammlung aufgebaut, die Van Goghs treuer Bruder Theo, ein Kunsthändler, bewahrte und die nach dem Tod beider Brüder von Theos Witwe und Sohn erhalten wurde, die die Gemälde, Zeichnungen und ihren außergewöhnlichen Briefwechsel schützten. 1973 eröffnet, lässt es die Besucher die ganze kurze, intensive Laufbahn des Künstlers an einem Ort verfolgen — von den dunklen frühen holländischen Werken bis zur lodernden Farbe seiner letzten Jahre — und ist eines der meistbesuchten Museen der Niederlande.",
    facts: [
      "Die Sammlung überlebte, weil Van Goghs Familie sie jahrzehntelang zusammenhielt.",
      "Es besitzt viele seiner handgeschriebenen Briefe ebenso wie seine Kunst.",
      "Es zeichnet seine ganze Laufbahn nach, von den dunklen Anfängen bis zu seinen letzten lodernden Werken.",
    ],
  },
  'Catedral de Amberes': {
    lead:
      "Die Liebfrauenkathedrale in Antwerpen, eine hoch aufragende gotische Kirche und das künstlerische Herz von Rubens' Heimatstadt.",
    city: 'Antwerpen, Belgien',
    founded: 'erbaut 14.–16. Jh.',
    highlights: [
      "Rubens' «Die Kreuzaufrichtung»",
      "Rubens' «Die Kreuzabnahme»",
      'Altarbilder noch im Rahmen, für den sie geschaffen wurden',
      'Der höchste gotische Turm der Niederlande',
    ],
    about:
      "Anders als die anderen Häuser hier ist dies eine aktive Kathedrale und kein Museum — die größte gotische Kirche der Niederlande, über Jahrhunderte erbaut. Sie besitzt mehrere monumentale Altarbilder von Peter Paul Rubens, Antwerpens berühmtestem Sohn, an genau den Orten, für die sie gemalt wurden, und bietet die seltene Gelegenheit, barocke Meisterwerke in ihrem ursprünglichen Rahmen statt in einer Galerie zu sehen. Rubens ist in einer anderen Kirche derselben Stadt begraben.",
    facts: [
      "Es ist eine lebendige Kathedrale, kein Museum — die Rubens-Werke hängen dort, wo er es beabsichtigte.",
      "Ihr Turm ist der höchste Kirchturm der Niederlande.",
      "Rubens wurde in Antwerpen geboren und begraben, der Stadt, die diese Altarbilder schmücken.",
    ],
  },
  'Galería Tretiakov': {
    lead:
      "Die Staatliche Tretjakow-Galerie in Moskau, die führende Sammlung russischer Kunst, von mittelalterlichen Ikonen bis zur Avantgarde.",
    city: 'Moskau, Russland',
    founded: '1856',
    highlights: [
      "Levitans Landschaften und russische Meisterwerke",
      "Malewitschs «Schwarzes Quadrat»",
      'Jahrhunderte russischer Malerei und religiöser Ikonen',
      "Andrei Rubljows verehrte Ikone der Dreifaltigkeit",
    ],
    about:
      "Die Galerie wuchs aus der privaten Sammlung des Kaufmanns Pawel Tretjakow, der sich ab 1856 fast im Alleingang vornahm, eine nationale Sammlung russischer Kunst aufzubauen, zu einer Zeit, als die russische Elite europäische Werke schätzte. Er kaufte direkt von lebenden Künstlern und schenkte die ganze Sammlung 1892 der Stadt Moskau. Sie bleibt die wesentliche Heimat der russischen Malerei und umspannt mittelalterliche Ikonen, den Realismus des 19. Jahrhunderts und die revolutionäre Avantgarde.",
    facts: [
      "Sie wurde von einem einzigen, dem Sammeln russischer Kunst gewidmeten Kaufmann gegründet.",
      "Er schenkte die gesamte Sammlung 1892 der Stadt Moskau.",
      "Sie reicht von antiken religiösen Ikonen bis zu Malewitschs radikaler Abstraktion.",
    ],
  },
  'Galería Nacional de Noruega': {
    lead:
      "Die ehemalige Nationalgalerie Norwegens in Oslo, heute Teil des Nationalmuseums, die die wichtigste Kunstsammlung des Landes beherbergt.",
    city: 'Oslo, Norwegen',
    founded: '1837',
    highlights: [
      "Die berühmteste Fassung von Munchs «Der Schrei»",
      "Munchs «Der Tanz des Lebens»",
      "Norwegens wichtigste historische Kunstbestände",
      'Norwegische romantische Landschaften',
    ],
    about:
      "Lange Norwegens wichtigstes Kunstmuseum, beherbergte die Nationalgalerie die Sammlung der Nation von 1837, bis ihre Bestände in das riesige neue Nationalmuseum eingegliedert wurden, das 2022 in Oslo eröffnete. Ihre bekanntesten Schätze sind die Fassungen von Edvard Munchs Meisterwerken, der Stolz der norwegischen Kunst, ausgestellt neben den romantischen Landschaften, durch die Norwegen im 19. Jahrhundert seine nationale Identität behauptete.",
    facts: [
      "Ihre Bestände sind heute Teil des riesigen neuen Nationalmuseums von Oslo, 2022 eröffnet.",
      "«Der Schrei» war Ziel zweier berühmter Kunstdiebstähle.",
    ],
  },
  'Museo Nacional de Tokio': {
    lead:
      "Das Nationalmuseum Tokio, Japans ältestes und größtes Museum, das die weltweit bedeutendste Sammlung japanischer Kunst und Antiken beherbergt.",
    city: 'Tokio, Japan',
    founded: '1872',
    highlights: [
      "Tōhakus «Kiefern»",
      "Eitokus «Zypressen»",
      "Sesshūs «Winterlandschaft»",
      'Über hundert ausgewiesene Nationalschätze',
    ],
    about:
      "1872 gegründet und im Ueno-Park von Tokio gelegen, bewahrt das Museum das künstlerische Erbe Japans in Malerei, Skulptur, Keramik, Textilien und Schwertern, darunter weit über hundert offiziell als Nationalschätze ausgewiesene Werke. Da japanische Schirme und Hängerollen zerbrechlich und lichtempfindlich sind, werden seine größten Gemälde nur im Wechsel gezeigt, jeweils für wenige Wochen, sodass keine zwei Besuche ganz gleich sind.",
    facts: [
      "Es besitzt über hundert offiziell ausgewiesene Nationalschätze.",
      "Seine kostbarsten Gemälde werden nur kurz und im Wechsel gezeigt.",
      "Es ist das älteste Nationalmuseum Japans.",
    ],
  },
  'Galería Borghese': {
    lead:
      "Die Galleria Borghese in Rom, in einer prächtigen Villa untergebracht, die für einen großen Sammler des frühen 17. Jahrhunderts errichtet wurde, mit einer außergewöhnlichen Konzentration barocker Meisterwerke.",
    city: 'Rom, Italien',
    founded: 'Sammlung ab dem 17. Jh.',
    highlights: [
      "Berninis virtuose Marmorskulpturen",
      'Mehrere Caravaggios',
      "Tizians «Himmlische und irdische Liebe»",
      'Eine Schmuckkästchen-Villa im größten Park Roms',
    ],
    about:
      "Die Sammlung wurde vom Kardinal Scipione Borghese zusammengetragen, einem Neffen des Papstes und einem rücksichtslosen, leidenschaftlichen Mäzen, der Kunst mit nahezu allen Mitteln erwarb — auch durch die Beschlagnahme von Werken, die er begehrte. Er war der große frühe Förderer des jungen Bernini und Caravaggio, und seine Villa und ihre Schätze blieben über vier Jahrhunderte bemerkenswert unversehrt. Da das Ambiente intim ist, erfolgen die Besuche heute mit zeitgebundenen Karten in Zwei-Stunden-Fenstern, um die Menge zu begrenzen.",
    facts: [
      "Ihr Gründer, ein Kardinal, beschlagnahmte begehrte Kunst mitunter mit Gewalt oder Intrige.",
      "Er war der erste große Förderer sowohl Berninis als auch Caravaggios.",
      "Der Eintritt erfolgt mit zeitgebundener Zwei-Stunden-Karte, um die kleine Villa zu schützen.",
    ],
  },
  'Colecciones de Pinturas del Estado de Baviera': {
    lead:
      "Die Bayerischen Staatsgemäldesammlungen, deren Kronjuwel die Alte Pinakothek in München ist, eine der ältesten Gemäldegalerien der Welt.",
    city: 'München, Deutschland',
    founded: '1836',
    highlights: [
      "Dürers Selbstbildnis",
      'Hervorragende deutsche, flämische und holländische Alte Meister',
      'Eine große Werkgruppe von Rubens',
      'Rembrandt und die nordischen Schulen',
    ],
    about:
      "Die Alte Pinakothek eröffnete 1836, um die Gemäldesammlungen der Wittelsbacher-Dynastie zu zeigen, die Bayern jahrhundertelang beherrschte und leidenschaftlich sammelte. Ihre eigens errichteten Galerien mit oberlichtbeleuchteten Sälen zur Betrachtung von Gemälden wurden zum Vorbild, das Museen in ganz Europa nachahmten. Die Bayerischen Staatsgemäldesammlungen, die sie ankert, führen auch eine Familie weiterer Münchner Galerien vom 19. Jahrhundert bis zur Gegenwart.",
    facts: [
      "Ihre Sammlung wurde von der Wittelsbacher-Dynastie über mehrere Jahrhunderte aufgebaut.",
      "Ihr Gebäude von 1836 beeinflusste die Gestaltung späterer Museen in ganz Europa.",
      "Sie besitzt eine der schönsten Rubens-Sammlungen außerhalb Antwerpens.",
    ],
  },
  'Museo Marmottan Monet': {
    lead:
      "Das Musée Marmottan Monet in Paris, Heimat der weltweit größten Sammlung von Werken Claude Monets.",
    city: 'Paris, Frankreich',
    founded: '1934',
    highlights: [
      "«Impression, Sonnenaufgang» — das Gemälde, das dem Impressionismus den Namen gab",
      'Viele späte Seerosen aus Giverny',
      'Werke von Morisot und anderen Impressionisten',
      'Ein intimes Herrenhaus nahe dem Bois de Boulogne',
    ],
    about:
      "Einst ein privates Herrenhaus und ehemaliges Jagdschloss, wurde die Marmottan 1934 zum Museum und verwandelte sich, als Monets Sohn Michel ihr die persönlichen Bestände des Künstlers hinterließ — die größten überhaupt. Sie besitzt auch eine bedeutende Sammlung von Berthe Morisot. Ihr größter Schatz, «Impression, Sonnenaufgang», gehörte zu den Werken, die bei einem berüchtigten bewaffneten Raub 1985 gestohlen und später wiedergefunden wurden.",
    facts: [
      "Es besitzt «Impression, Sonnenaufgang», das Gemälde, das der Bewegung ihren Namen gab.",
      "Monets eigener Sohn vermachte den großen Schatz des väterlichen Werks.",
      "Diese berühmte Leinwand wurde 1985 bei einem Raub gestohlen und später wiedergefunden.",
    ],
  },
  'Museo Kröller-Müller': {
    lead:
      "Das Kröller-Müller-Museum in den Niederlanden, in einem Nationalpark gelegen, um die Sammlung einer frühen Verfechterin Van Goghs aufgebaut.",
    city: 'Otterlo, Niederlande',
    founded: '1938',
    highlights: [
      'Die zweitgrößte Van-Gogh-Sammlung der Welt',
      "Van Goghs «Caféterrasse am Abend»",
      'Ein gefeierter Freilicht-Skulpturengarten',
      'Werke von Seurat, Mondrian und modernen Meistern',
    ],
    about:
      "Helene Kröller-Müller war eine der ersten Sammlerinnen, die Van Goghs Bedeutung erfasste, und trug fast 300 seiner Werke zusammen, als er noch wenig geschätzt war. Sie und ihr Mann schenkten ihre riesige Sammlung dem niederländischen Staat, und das Museum eröffnete 1938 inmitten der Wälder und Heiden des Nationalparks De Hoge Veluwe. Besucher erkunden den Park oft auf kostenlosen weißen Fahrrädern, und der große Skulpturengarten des Museums zählt zu den schönsten Europas.",
    facts: [
      "Seine Gründerin gehörte zu den allerersten großen Sammlern Van Goghs.",
      "Es liegt in einem Nationalpark, den man auf kostenlosen weißen Rädern erkunden kann.",
      "Sein Skulpturengarten ist einer der größten Europas.",
    ],
  },
  'Galerías nacionales de Escocia': {
    lead:
      "Die National Galleries of Scotland in Edinburgh, die die nationale Sammlung der schönen Künste von den Alten Meistern bis zum Impressionismus beherbergen.",
    city: 'Edinburgh, Vereinigtes Königreich',
    founded: '1859',
    highlights: [
      "Gauguins «Vision nach der Predigt»",
      'Schottische und europäische Alte Meister',
      'Impressionistische und spätere Werke',
      'Der schönste Überblick über die schottische Kunst überhaupt',
    ],
    about:
      "Die National Galleries of Scotland verteilen sich über mehrere verbundene Gebäude im Herzen von Edinburgh, darunter die neoklassizistische National Gallery am Mound sowie die Porträt- und Moderne-Galerien. Aus einer nationalen Sammlung der Mitte des 19. Jahrhunderts gewachsen, verbinden sie wichtige europäische Werke mit den tiefsten Beständen schottischer Kunst überhaupt und sind bei freiem Eintritt.",
    facts: [
      "Sie umfassen mehrere verbundene Galerien im Zentrum von Edinburgh.",
      "Sie besitzen die schönste Sammlung schottischer Kunst der Welt.",
    ],
  },
  'Palais des Beaux-Arts de Lille': {
    lead:
      "Der Palais des Beaux-Arts in Lille, eines der größten Kunstmuseen Frankreichs außerhalb von Paris.",
    city: 'Lille, Frankreich',
    founded: '1801',
    highlights: [
      "Eine Hauptfassung von Davids «Belisar erbittet Almosen»",
      'Eine reiche Sammlung europäischer Malerei',
      'Alte Meister und französische Kunst des 19. Jahrhunderts',
      'Goya, Rubens und die flämischen Schulen',
    ],
    about:
      "Das Museum entstand 1801 im Rahmen eines napoleonischen Dekrets, das bedeutende Werke aus der nationalen Sammlung in eine Handvoll französischer Provinzstädte sandte und so große Kunst über Paris hinaus verbreitete. 1892 zog es in seinen großartigen Belle-Époque-Palast und beherbergt eine außergewöhnliche Bandbreite europäischer Malerei, besonders stark in flämischer und französischer Kunst dank Lilles Lage nahe der belgischen Grenze.",
    facts: [
      "Es wurde unter Napoleon gegründet, um große Kunst in die französischen Regionen zu bringen.",
      "Seine Bestände sind dank Lilles Grenzlage besonders reich an flämischer Kunst.",
    ],
  },
  'Antigua Galería Nacional de Berlín': {
    lead:
      "Die Alte Nationalgalerie auf der Berliner Museumsinsel, die Kunst des 19. Jahrhunderts beherbergt und eine große Heimat der deutschen Romantik ist.",
    city: 'Berlin, Deutschland',
    founded: '1876',
    highlights: [
      'Schlüsselwerke von Caspar David Friedrich',
      "Friedrichs «Die Abtei im Eichwald»",
      'Deutsche romantische und impressionistische Malerei',
      'Ein tempelartiges Gebäude auf einer UNESCO-Insel',
    ],
    about:
      "1876 eröffnet, ist die «Alte Nationalgalerie» ein tempelartiges Gebäude auf der Berliner Museumsinsel, einem Verbund von fünf Museen, die zusammen als UNESCO-Weltkulturerbe gelistet sind. Sie versammelt Kunst des 19. Jahrhunderts mit der deutschen Romantik im Kern, vor allem die visionären Landschaften Caspar David Friedrichs, neben deutschem und französischem Impressionismus. Sie wurde im Zweiten Weltkrieg schwer beschädigt und minuziös wiederhergestellt.",
    facts: [
      "Sie steht auf der Berliner Museumsinsel, einem UNESCO-Weltkulturerbe.",
      "Sie wurde im Zweiten Weltkrieg schwer beschädigt und später sorgfältig wieder aufgebaut.",
    ],
  },
  'Kunsthalle de Hamburgo': {
    lead:
      "Die Hamburger Kunsthalle, eines der größten Kunstmuseen Deutschlands, gefeiert für ihre deutsche Romantik.",
    city: 'Hamburg, Deutschland',
    founded: '1869',
    highlights: [
      "Friedrichs «Wanderer über dem Nebelmeer»",
      "Friedrichs «Das Eismeer»",
      'Kunst vom Mittelalter bis zur Gegenwart',
      'Alte Meister, Romantik und moderne Kunst',
    ],
    about:
      "1869 vom Kunstverein der Stadt gegründet, umfasst die Kunsthalle mehrere verbundene Gebäude und deckt Kunst von mittelalterlichen Altarbildern bis zu zeitgenössischen Werken ab. Sie ist vor allem ein Wallfahrtsort für Liebhaber Caspar David Friedrichs und besitzt das berühmteste Bild der Romantik, den «Wanderer über dem Nebelmeer», der zu einer weltweit reproduzierten Ikone wurde.",
    facts: [
      "Sie besitzt den «Wanderer», das berühmteste einzelne Bild der Romantik.",
      "Ihre Gebäude reichen von einem Saal des 19. Jahrhunderts bis zu einem strengen modernen Kubus.",
    ],
  },
  'Museo Munch': {
    lead:
      "Das Munch-Museum (MUNCH) in Oslo, Edvard Munch gewidmet, der den Großteil seines Werks der Stadt vermachte.",
    city: 'Oslo, Norwegen',
    founded: '1963',
    highlights: [
      "Fassungen von «Der Schrei», «Madonna», «Vampir» und «Angst»",
      'Tausende Gemälde, Grafiken und Zeichnungen',
      "Die maßgebliche Sammlung von Munchs Kunst",
      'Ein markanter neuer Turm am Wasser',
    ],
    about:
      "Als Munch 1944 starb, hinterließ er seine enormen persönlichen Bestände — über 26.000 Werke — der Stadt Oslo, dem Fundament dieses Museums. Es eröffnete 1963 und zog 2021 in einen markanten 13-stöckigen Turm an der Uferpromenade Oslos und wurde so zur maßgeblichen Heimat seiner Kunst. Da er so viele Fassungen und Grafiken seiner Schlüsselbilder aufbewahrte, kann das Museum die Entwicklung eines einzigen Motivs wie «Der Schrei» über ein ganzes Leben zeigen.",
    facts: [
      "Munch hinterließ der Stadt über 26.000 seiner eigenen Werke.",
      "Es eröffnete 2021 in einem markanten neuen 13-stöckigen Gebäude am Wasser wieder.",
      "Es kann nachzeichnen, wie Munch ein einzelnes Bild über viele Fassungen umarbeitete.",
    ],
  },
  'Kunsthaus Zürich': {
    lead:
      "Das Kunsthaus Zürich, das führende Kunstmuseum der größten Stadt der Schweiz, stark in moderner Kunst.",
    city: 'Zürich, Schweiz',
    founded: '1910',
    highlights: [
      'Werke von Munch und den Expressionisten',
      'Eine klassische Mondrian-Komposition',
      'Die größte Munch-Sammlung außerhalb Norwegens',
      'Alte Meister bis zur zeitgenössischen Kunst',
    ],
    about:
      "Von einer langjährigen lokalen Kunstgesellschaft geführt, eröffnete das Kunsthaus 1910 sein Hauptgebäude und erweiterte sich 2021 stark um einen großen neuen Flügel, was es zu einem der größten Kunstmuseen der Schweiz machte. Es besitzt eine bedeutende Sammlung moderner Kunst — darunter die größte Werkgruppe von Munch außerhalb Norwegens — neben Alten Meistern, Schweizer Kunst und einer bemerkenswerten Sammlung von Alberto Giacometti.",
    facts: [
      "Eine große Erweiterung 2021 machte es zu einem der größten Kunstmuseen der Schweiz.",
      "Es besitzt die größte Munch-Sammlung außerhalb Norwegens.",
    ],
  },
  'Museo Leopold': {
    lead:
      "Das Leopold Museum in Wien, auf einer großen Privatsammlung aufgebaut, das den weltweit größten Schatz an Egon Schiele beherbergt.",
    city: 'Wien, Österreich',
    founded: '2001',
    highlights: [
      "Die weltweit größte Sammlung von Egon Schiele",
      'Bedeutende Werke von Gustav Klimt',
      'Eine Heimat der Wiener Moderne (Wien 1900)',
      'Design und Kunsthandwerk der Epoche',
    ],
    about:
      "Der Augenarzt Rudolf Leopold trug über fünf Jahrzehnte eine riesige Sammlung österreichischer moderner Kunst zusammen, vor allem Egon Schiele, und kaufte dessen Werke, als der Künstler noch schockierend und unterschätzt war. 2001 wurde die Sammlung zu einem öffentlichen Museum im Wiener MuseumsQuartier, einem eleganten weißen Kubus, der der Gärung von «Wien 1900» gewidmet ist, der brillanten, angstvollen Kultur der Stadt um die Jahrhundertwende.",
    facts: [
      "Es wurde auf der lebenslangen Sammlung eines einzigen Wiener Augenarztes aufgebaut.",
      "Es besitzt mehr Werke von Egon Schiele als jeder andere Ort der Erde.",
      "Es ist ein Schlüsselmuseum der Epoche «Wien 1900».",
    ],
  },
  'Galería Belvedere': {
    lead:
      "Das Belvedere in Wien, ein prächtiger Barockpalast, der die österreichische nationale Sammlung und vor allem die Kunst Gustav Klimts beherbergt.",
    city: 'Wien, Österreich',
    founded: '1781 (öffentlich)',
    highlights: [
      "Klimts goldenes Meisterwerk «Der Kuss»",
      'Die größte Klimt-Sammlung der Welt',
      'Schlüsselwerke von Egon Schiele',
      'Ein Überblick über die österreichische Kunst in einem Barockpalast',
    ],
    about:
      "Im frühen 18. Jahrhundert als Sommerpalast des Feldherrn Prinz Eugen von Savoyen errichtet, öffnete das Belvedere 1781 seine kaiserliche Gemäldesammlung für die Öffentlichkeit — unter den allerersten öffentlichen Museen der Welt, Jahre vor dem Louvre. Heute ist es am bekanntesten als Heimat von Gustav Klimt und besitzt die weltweit größte Sammlung seines Werks, darunter «Der Kuss», der dort seit seiner Entstehung hängt.",
    facts: [
      "Es öffnete 1781 für die Öffentlichkeit, unter den ersten Museen, die dies taten.",
      "«Der Kuss» hängt hier seit seiner Entstehung.",
      "Es besitzt die größte Klimt-Sammlung der Welt.",
    ],
  },
  'Museo Nacional de Arte, Arquitectura y Diseño': {
    lead:
      "Das Nationalmuseum in Oslo, das Norwegens wichtigste Sammlung von Kunst, Architektur und Design beherbergt.",
    city: 'Oslo, Norwegen',
    founded: '2003 (Fusion)',
    highlights: [
      "Die berühmtesten Fassungen von Munchs Meisterwerken, darunter «Der Schrei»",
      "Norwegens nationale Kunstbestände",
      'Kunst, Architektur und Design vereint',
      'Ein riesiges neues, eigens errichtetes Domizil',
    ],
    about:
      "Durch die Fusion mehrerer älterer norwegischer Institutionen entstanden, brachte das Nationalmuseum die Kunst-, Architektur- und Designsammlungen der Nation unter ein Dach und eröffnete 2022 sein riesiges neues Gebäude in Oslo — unter den größten Kunstmuseen der nordischen Länder. Zu seinen Höhepunkten zählen die bekanntesten Fassungen von Edvard Munchs Meisterwerken, ausgestellt in einem eigens gesicherten Raum nach den früheren Diebstählen von «Der Schrei».",
    facts: [
      "Sein riesiges neues Gebäude, 2022 eröffnet, zählt zu den größten der nordischen Länder.",
      "Es vereint Kunst, Architektur und Design in einer einzigen Institution.",
    ],
  },
  'Pinacoteca del Estado de São Paulo': {
    lead:
      "Die Pinacoteca de São Paulo, das älteste Kunstmuseum der Stadt, das eine der wichtigsten Sammlungen brasilianischer Kunst beherbergt.",
    city: 'São Paulo, Brasilien',
    founded: '1905',
    highlights: [
      "Almeida Júniors «Caipira beim Tabakschneiden»",
      "Almeida Júniors «Der Gitarrenspieler»",
      'Ein tiefer Überblick über die brasilianische Kunst',
      'Ein restauriertes Gebäude des frühen 20. Jahrhunderts',
    ],
    about:
      "1905 in einem umgenutzten Schulgebäude nahe dem alten Bahnhof der Stadt gegründet, konzentriert sich die Pinacoteca auf brasilianische Kunst vom 19. Jahrhundert bis zur Gegenwart. Ihr schönes Backsteingebäude wurde in den 1990er Jahren vom Architekten Paulo Mendes da Rocha elegant restauriert, und ihre Sammlung ist besonders reich an den Malern, wie Almeida Júnior, die die Kunst zuerst zu genuin brasilianischen Motiven wandten.",
    facts: [
      "Es ist São Paulos ältestes Kunstmuseum.",
      "Ihr Gebäude wurde vom Pritzker-Preisträger Paulo Mendes da Rocha renoviert.",
    ],
  },
  'Nezu Art Museum': {
    lead:
      "Das Nezu-Museum in Tokio, um die Sammlung eines Geschäftsmanns aufgebaut und inmitten eines berühmten traditionellen Gartens gelegen.",
    city: 'Tokio, Japan',
    founded: '1941',
    highlights: [
      "Ogata Kōrins «Schwertlilien»-Schirme, ein Nationalschatz",
      'Renommierte japanische und ostasiatische Kunst',
      'Ein gefeierter Wandelgarten mit Teehäusern',
      'Ein modernes Gebäude des Architekten Kengo Kuma',
    ],
    about:
      "Das Museum wuchs aus der Sammlung des Industriellen Nezu Kaichirō und eröffnete 1941, 2009 in einem ruhigen modernen Gebäude des Architekten Kengo Kuma neu errichtet. Seine «Schwertlilien»-Schirme von Kōrin, ein Nationalschatz, werden traditionell jeden Frühling gezeigt — so getaktet, dass die Besucher danach in den gefeierten Garten des Museums treten und die echten Schwertlilien in Blüte sehen können.",
    facts: [
      "Seine berühmten «Schwertlilien»-Schirme werden jeden Frühling passend zum blühenden Garten gezeigt.",
      "Sein gestalteter Garten mit Teehäusern ist eine seltene Oase im Zentrum Tokios.",
      "Das heutige Gebäude stammt vom renommierten Architekten Kengo Kuma.",
    ],
  },
  'MOA': {
    lead:
      "Das MOA Museum of Art in Atami, Japan, mit Blick aufs Meer, das eine erlesene Sammlung japanischer und ostasiatischer Kunst beherbergt.",
    city: 'Atami, Japan',
    founded: '1982',
    highlights: [
      "Ogata Kōrins «Rote und weiße Pflaumenblüten», ein Nationalschatz",
      'Meisterwerke der Rinpa-Schule',
      'Japanische und ostasiatische Kunst',
      'Ein markantes Hanggebäude über der Küste',
    ],
    about:
      "Hoch an einem Hang über dem Küsten-Thermalort Atami gelegen, mit weitem Blick über das Meer, eröffnete das MOA 1982 und ist über eine markante Reihe langer, in den Berg geschnittener Rolltreppen erreichbar. Es zentriert sich um seinen überragenden Rinpa-Schatz von Kōrin und zeigt seine empfindlichsten Werke im Wechsel, um sie zu schützen, und stellt die «Pflaumenblüten»-Schirme zur Pflaumenblütezeit aus.",
    facts: [
      "Es liegt an einem Hang mit Panoramablick über das Meer bei Atami.",
      "Besucher steigen über lange, in den Berg gebohrte Rolltreppen zu ihm hinauf.",
    ],
  },
  'Museo Nacional de Kioto': {
    lead:
      "Das Nationalmuseum Kyoto, eines der wichtigsten Museen Japans, der vormodernen Kunst und dem Erbe der alten Kaiserhauptstadt gewidmet.",
    city: 'Kyoto, Japan',
    founded: '1897',
    highlights: [
      'Zahlreiche Nationalschätze der Malerei, Skulptur und des Kunsthandwerks',
      'Vormoderne japanische Kunst',
      "Von Kyotos Tempeln und Schreinen anvertraute Schätze",
      'Ein historisches Gebäude von 1897 und ein moderner Flügel',
    ],
    about:
      "1897 gegründet, bewahrt und zeigt das Nationalmuseum Kyoto das künstlerische Erbe Kyotos, das über tausend Jahre lang Japans Kaiserhauptstadt war. Ein Großteil seiner Sammlung wird ihm von den alten Tempeln und Schreinen der Stadt anvertraut, und es spielt eine führende Rolle bei der Bewahrung der Kulturschätze Japans, indem es seine ursprüngliche Backsteinhalle aus der Meiji-Zeit mit einem eleganten modernen Ausstellungsflügel verbindet.",
    facts: [
      "Ein Großteil seiner Bestände stammt aus Kyotos alten Tempeln und Schreinen.",
      "Kyoto war über tausend Jahre lang die Hauptstadt Japans.",
    ],
  },
};

/** Portuguese museum profiles (filled batch by batch; falls back to English). */
export const MUSEUM_INFO_PT: Record<string, MuseumInfo> = {
  'Museo del Prado': {
    lead:
      "O museu nacional de arte da Espanha, em Madri, e uma das maiores galerias de pintura do mundo.",
    city: 'Madri, Espanha',
    founded: '1819',
    highlights: [
      'O melhor acervo do mundo de Velázquez, Goya e El Greco',
      "«As Meninas» de Velázquez e «O Três de Maio de 1808» de Goya",
      "As privadas e pesadelares «Pinturas Negras» de Goya",
      'Obras-primas de Ticiano, Bosch, Rubens e Dürer',
    ],
    about:
      "O Prado cresceu a partir da coleção real espanhola, reunida ao longo de séculos por reis Habsburgo e Bourbon que estavam entre os maiores mecenas da Europa — daí abrigar tantos Ticianos, painéis de Bosch e obras de Rubens ao lado de seus mestres espanhóis. Abriu ao público em 1819 num edifício originalmente destinado a abrigar um museu de história natural. Em vez de um panorama enciclopédico, oferece profundidade incomparável em uns poucos artistas supremos, e hoje ancora um «triângulo de ouro» de museus de Madri com o vizinho Reina Sofía e o Thyssen-Bornemisza.",
    facts: [
      "Sua coleção começou como a galeria de pintura particular dos reis espanhóis.",
      "Abriga cerca de 50 obras de Rubens e uns 40 de Goya.",
      "O edifício foi primeiro projetado para ser um museu de ciências naturais, não uma galeria de arte.",
    ],
  },
  'Museo de Orsay': {
    lead:
      "Um museu de Paris instalado numa grandiosa antiga estação ferroviária às margens do Sena, que abriga a melhor coleção de arte impressionista e pós-impressionista do mundo.",
    city: 'Paris, França',
    founded: '1986',
    highlights: [
      'Monet, Renoir, Degas, Van Gogh, Cézanne e Gauguin',
      "Os autorretratos de Van Gogh e «Noite Estrelada sobre o Ródano»",
      'Pintura, escultura e design franceses de 1848 a 1914',
      'Faz a ponte entre o Louvre (arte mais antiga) e o Pompidou (arte moderna)',
    ],
    about:
      "O Orsay ocupa a Gare d'Orsay, uma estação ferroviária Beaux-Arts de 1900 que foi salva da demolição e renasceu como museu em 1986. Sua coleção foi reunida para preencher a lacuna histórica entre os antigos mestres do Louvre e a arte moderna do Centre Pompidou, tornando-o a casa essencial da arte francesa do fim do século XIX. Sob sua grande abóbada de vidro, o gigantesco relógio original da estação ainda contempla o Sena, e o museu atrai algumas das maiores multidões de qualquer galeria do mundo.",
    facts: [
      "O edifício era uma estação ferroviária em funcionamento antes de se tornar museu.",
      "Ainda se pode olhar para fora através do enorme relógio original da estação.",
      "Foi criado em parte porque o Louvre e o Pompidou deixavam uma lacuna na história da arte francesa.",
    ],
  },
  'National Gallery de Londres': {
    lead:
      "A coleção nacional britânica de pintura da Europa Ocidental, na Trafalgar Square, em Londres, oferecendo um soberbo e compacto panorama da Idade Média a 1900.",
    city: 'Londres, Reino Unido',
    founded: '1824',
    highlights: [
      "O «Retrato Arnolfini» de Van Eyck",
      'Obras de Leonardo, Ticiano e Velázquez',
      "«O Temerário Combatente» de Turner",
      'Entrada gratuita a uma das grandes coleções do mundo',
    ],
    about:
      "A National Gallery foi fundada em 1824, quando o governo comprou a coleção de um banqueiro de apenas 38 quadros, e foi deliberadamente construída no coração de Londres para que pessoas de toda classe pudessem alcançá-la a pé. Ao contrário dos museus nascidos de tesouros reais, foi reunida desde o início como uma coleção pública para a nação, escolhida pela qualidade e não pela quantidade. Sempre foi de entrada gratuita, e seu tamanho relativamente pequeno é prezado como uma virtude — quase todo quadro é uma obra-prima.",
    facts: [
      "Começou com apenas 38 pinturas compradas de um colecionador particular.",
      "Sempre foi gratuita e centralmente localizada para que todos pudessem visitá-la.",
      "Nunca foi uma coleção real — foi criada para o público desde o início.",
    ],
  },
  'Museo del Louvre': {
    lead:
      "O maior e mais visitado museu de arte do mundo, num antigo palácio real em Paris, abrangendo da Antiguidade ao século XIX.",
    city: 'Paris, França',
    founded: '1793',
    highlights: [
      "Casa da «Mona Lisa»",
      'Leonardo, David, Delacroix e Vermeer',
      'Ícones antigos como a Vênus de Milo e a Vitória Alada',
      'Mais de 30 000 obras expostas pelos salões do antigo palácio',
    ],
    about:
      "O Louvre começou como uma fortaleza medieval, tornou-se o palácio dos reis franceses e foi aberto como museu público em 1793, durante a Revolução, exibindo as antigas coleções reais e eclesiásticas confiscadas pelo novo Estado. Napoleão engordou-o enormemente com arte tomada pela Europa conquistada, muita dela depois devolvida. A entrada em pirâmide de vidro, projetada por I. M. Pei, foi acrescentada em 1989 em meio a polêmicas e hoje é um ícone por direito próprio. Tão vasta é a coleção que ver cada obra por apenas alguns segundos levaria muitos dias.",
    facts: [
      "Foi uma fortaleza e depois um palácio real antes de algum dia ser museu.",
      "Napoleão o encheu de arte saqueada por toda a Europa, muito depois devolvida.",
      "Recebe o maior número de visitantes de qualquer museu de arte do planeta.",
    ],
  },
  'Museo Nacional de Bellas Artes': {
    lead:
      "O museu nacional de belas-artes da Argentina, em Buenos Aires, que abriga a mais importante coleção de arte do país.",
    city: 'Buenos Aires, Argentina',
    founded: '1895',
    highlights: [
      "«Sem Pão e Sem Trabalho» de De la Cárcova",
      'As obras fundadoras da pintura argentina: Della Valle, Sívori, Pueyrredón',
      'Antigos mestres europeus e impressionistas franceses',
      'Entrada gratuita à coleção nacional',
    ],
    about:
      "Fundado em 1895 e depois transferido para uma antiga estação de bombeamento convertida, o museu reúne a arte europeia — dos antigos mestres ao Impressionismo — com as telas fundadoras da pintura nacional argentina. Traça como um país jovem, inchado pela imigração europeia, construiu uma arte própria, de cenas de gaúchos e retratos a obras ousadas de protesto social. É o lugar mais importante para compreender o nascimento da arte argentina.",
    facts: [
      "É a casa mais importante da pintura argentina do século XIX.",
      "Seu edifício foi convertido de uma antiga estação de bombeamento de água.",
    ],
  },
  'Galería Uffizi': {
    lead:
      "A grande casa-tesouro renascentista de Florença e um dos museus mais antigos do mundo, num palácio do século XVI construído para os Médici.",
    city: 'Florença, Itália',
    founded: '1765 (público)',
    highlights: [
      "«O Nascimento de Vênus» e «Primavera» de Botticelli",
      'Leonardo, Michelangelo, Rafael e Ticiano',
      'O panorama incomparável da arte renascentista italiana',
      'Um famoso corredor de escultura antiga',
    ],
    about:
      "O Uffizi («escritórios») foi construído na década de 1560 para abrigar os escritórios administrativos do governo florentino, e aos poucos se encheu da extraordinária coleção de arte da família Médici. Quando a linhagem Médici se extinguiu, a última herdeira, Anna Maria Luisa, legou toda a coleção à cidade de Florença em 1743 com a condição de que jamais deixasse a cidade — uma doação que fez do Uffizi um dos primeiros verdadeiros museus públicos. Suas salas traçam o Renascimento de seu berço florentino ao ápice do Alto Renascimento.",
    facts: [
      "O edifício era originalmente escritórios do governo — daí o nome «Uffizi».",
      "A última herdeira Médici deixou a coleção a Florença com a condição de que ficasse lá para sempre.",
      "Sua longa história faz dele um dos museus mais antigos do mundo.",
    ],
  },
  'Museo de Arte Moderno': {
    lead:
      "O Museu de Arte Moderna (MoMA) de Nova York, um dos museus de arte moderna e contemporânea mais influentes do mundo.",
    city: 'Nova York, EUA',
    founded: '1929',
    highlights: [
      "«A Noite Estrelada» de Van Gogh",
      'Picasso, Matisse, Mondrian e Malevich',
      "«Gas» de Hopper e ícones do século XX",
      'Design, cinema e fotografia além da pintura',
    ],
    about:
      "O MoMA foi fundado em 1929, apenas dias após a Quebra da Bolsa, por um pequeno grupo de mecenas liderado por Abby Aldrich Rockefeller, numa época em que os museus americanos consagrados em grande parte ignoravam os artistas vivos. Através de suas exposições, publicações e aquisições fez mais que qualquer outra instituição para definir a própria história da arte moderna, tratando arquitetura, design, cinema e fotografia com a mesma seriedade que a pintura. Expandiu-se várias vezes em sua icônica sede em midtown Manhattan.",
    facts: [
      "Abriu apenas dias após a quebra da bolsa de 1929.",
      "Seus fundadores defenderam a arte moderna quando outros museus ainda a recusavam.",
      "Sua coleção abrange design, cinema e fotografia, não só belas-artes.",
    ],
  },
  'Galería Nacional de Arte': {
    lead:
      "A National Gallery of Art em Washington, D.C., a coleção nacional dos Estados Unidos, gratuita ao público.",
    city: 'Washington, D.C., EUA',
    founded: '1937',
    highlights: [
      "«Ginevra de' Benci» de Leonardo — o único Leonardo nas Américas",
      'Antigos mestres europeus emparelhados com um profundo acervo americano',
      'Uma vasta coleção construída quase inteiramente de doações',
      'Entrada gratuita, financiada por doações privadas',
    ],
    about:
      "A National Gallery foi fundada em 1937 com uma doação marcante de arte e dinheiro do financista Andrew Mellon, que insistiu que o museu levasse o nome da nação e não o seu, para que outros colecionadores fossem encorajados a doar. A estratégia funcionou: cresceu através das doações dos grandes colecionadores americanos até se tornar uma das mais belas galerias do mundo. Gratuita, emparelha antigos mestres europeus com um panorama excepcional da arte americana.",
    facts: [
      "Abriga a única pintura de Leonardo da Vinci nas Américas.",
      "Seu fundador recusou pôr seu próprio nome nela, para encorajar outros doadores.",
      "Quase toda a sua coleção veio de doações privadas, não de compras.",
    ],
  },
  'Instituto de Arte de Chicago': {
    lead:
      "Um dos museus de arte mais antigos e maiores dos Estados Unidos, com uma coleção enciclopédica especialmente rica em Impressionismo e arte americana.",
    city: 'Chicago, EUA',
    founded: '1879',
    highlights: [
      "«Uma Tarde de Domingo na Ilha de La Grande Jatte» de Seurat",
      "«Nighthawks» de Hopper",
      "«American Gothic» de Grant Wood",
      'Uma das melhores coleções impressionistas fora de Paris',
    ],
    about:
      "Fundado em 1879 como museu e escola, o Art Institute cresceu ao lado da pujante Chicago do fim do século XIX e mudou-se para seu edifício icônico para a Feira Mundial de 1893, guardado desde então por dois famosos leões de bronze na Michigan Avenue. Doações iniciais de colecionadores locais — muitos dos quais compraram obras impressionistas diretamente de marchands de Paris — deram-lhe um dos maiores acervos do movimento em qualquer lugar. Sua escola continua entre as mais respeitadas faculdades de arte da América.",
    facts: [
      "Dois leões de bronze flanqueiam sua entrada desde 1893.",
      "É uma escola de arte em funcionamento além de museu.",
      "Sua força impressionista veio de colecionadores de Chicago comprando direto de Paris.",
    ],
  },
  'Rijksmuseum': {
    lead:
      "O museu nacional dos Países Baixos, em Amsterdã, dedicado à arte e à história holandesas e à glória do Século de Ouro holandês.",
    city: 'Amsterdã, Países Baixos',
    founded: '1800',
    highlights: [
      "A monumental «Ronda Noturna» de Rembrandt",
      "«A Leiteira» e «A Ruazinha» de Vermeer",
      'Obras-primas de Frans Hals e dos pintores do Século de Ouro',
      'Uma grandiosa sede construída para o fim, reaberta após uma década',
    ],
    about:
      "O Rijksmuseum («Museu do Estado») remonta a 1800, quando o Estado holandês começou uma coleção nacional, e mudou-se para seu grandioso edifício catedralesco do arquiteto Pierre Cuypers em 1885. Após uma ampla renovação de dez anos, reabriu em 2013, com «A Ronda Noturna» restaurada ao lugar de honra no fim de sua longa Galeria de Honra. Em 2019–21 a pintura passou por uma restauração pública muito divulgada, observada atrás de vidro por visitantes e públicos on-line do mundo todo.",
    facts: [
      "«A Ronda Noturna» é exibida num salão especialmente projetado ao seu redor.",
      "O museu reabriu em 2013 após uma renovação de dez anos.",
      "«A Ronda Noturna» foi recentemente restaurada à vista de todos, atrás de vidro.",
    ],
  },
  'Museo Metropolitano de Arte': {
    lead:
      "O Metropolitan Museum of Art de Nova York, um dos museus maiores e mais enciclopédicos do planeta, abrangendo cinco mil anos de cultura mundial.",
    city: 'Nova York, EUA',
    founded: '1870',
    highlights: [
      'Antigos mestres europeus e uma profunda pintura americana',
      'Notável arte asiática, antiga e islâmica',
      'Um templo egípcio antigo inteiro, o Templo de Dendur',
      'Milhões de visitantes por ano na borda do Central Park',
    ],
    about:
      "Fundado em 1870 por um grupo de líderes cívicos, empresários e artistas que queriam levar a arte e a educação artística ao povo americano, «o Met» não tinha coleção alguma no início e cresceu através de doações e compras até se tornar um vasto museu enciclopédico na borda do Central Park. Seu acervo vai de templos egípcios e escultura grega à pintura europeia, à arte americana e às artes da Ásia, da África e das Américas. Está entre os museus mais visitados do mundo.",
    facts: [
      "Sua coleção abrange cerca de 5 000 anos por todas as partes do mundo.",
      "Contém até um templo egípcio antigo inteiro, o Templo de Dendur.",
      "Começou em 1870 sem nenhuma obra de arte.",
    ],
  },
  'Museo de Bellas Artes de Boston': {
    lead:
      "O Museum of Fine Arts, Boston, um dos maiores museus dos Estados Unidos, renomado por seu Impressionismo francês e sua arte asiática.",
    city: 'Boston, EUA',
    founded: '1870',
    highlights: [
      'Impressionismo francês e pintura americana',
      'Uma das maiores coleções de arte japonesa fora do Japão',
      'Acervo egípcio e núbio antigo',
      'Quase meio milhão de obras de todas as culturas',
    ],
    about:
      "Fundado em 1870 e aberto em 1876, o MFA construiu coleções excepcionais através das doações da elite culta de Boston, vários de cujos membros tinham laços estreitos com o Japão justamente quando ele se abria ao mundo — dando ao museu alguns dos primeiros e mais belos acervos ocidentais de arte japonesa. Sua coleção egípcia cresceu de décadas de expedições arqueológicas conjuntas, e suas galerias impressionistas e americanas estão entre as melhores do país.",
    facts: [
      "Tem uma das maiores coleções de arte japonesa fora do Japão.",
      "Seu acervo egípcio veio de suas próprias escavações arqueológicas.",
    ],
  },
  'Museo del Hermitage': {
    lead:
      "Um dos maiores e mais antigos museus do mundo, em São Petersburgo, fundado por Catarina, a Grande, e instalado em grande parte no antigo Palácio de Inverno imperial.",
    city: 'São Petersburgo, Rússia',
    founded: '1764',
    highlights: [
      "«O Retorno do Filho Pródigo» de Rembrandt",
      "Grandes obras de Matisse, incluindo «A Dança»",
      'Um vasto panorama de pintura e antiguidades europeias',
      'Galerias que se estendem por muitos quilômetros',
    ],
    about:
      "O Hermitage começou em 1764 como a coleção particular de Catarina, a Grande, mantida num recolhido retiro ao lado do Palácio de Inverno — um «eremitério» (hermitage) do qual toma o nome. Catarina comprava coleções europeias inteiras de uma só vez para rivalizar com as galerias reais do Ocidente, e depois da Revolução de 1917 o museu absorveu grandes coleções particulares, incluindo notáveis pinturas francesas modernas. Hoje se espalha por um complexo de edifícios palacianos tão grande que percorrer todas as galerias cobre muitos quilômetros.",
    facts: [
      "Começou como o acervo de arte particular da imperatriz Catarina, a Grande.",
      "Ela comprava coleções europeias inteiras de uma vez para ofuscar a realeza ocidental.",
      "Suas galerias são tão vastas que vê-las todas significa caminhar quilômetros.",
    ],
  },
  'Museu Nacional de Belas Artes': {
    lead:
      "O museu nacional de belas-artes do Brasil, no Rio de Janeiro, que abriga a mais importante coleção de arte brasileira.",
    city: 'Rio de Janeiro, Brasil',
    founded: '1937',
    highlights: [
      'Grandiosas pinturas acadêmicas e históricas do século XIX',
      'Pedro Américo, Victor Meirelles e seus pares',
      'Obras que moldaram a imagem que a nação tinha de si',
      'Um panorama da arte brasileira até a era moderna',
    ],
    about:
      "As raízes do museu remontam à escola real de arte estabelecida depois que a corte portuguesa fugiu de Napoleão e se instalou no Brasil no início do século XIX, trazendo um grupo de artistas franceses para fundar uma academia. Sua coleção é a grande casa da pintura brasileira imperial — as vastas telas históricas e cenas românticas através das quais uma jovem nação imaginou suas origens — abrigada desde 1937 num grandioso edifício do Rio.",
    facts: [
      "Suas origens estão numa academia de arte fundada por artistas franceses convidados ao Brasil em 1816.",
      "Abriga as imagens definidoras da fundação do Brasil como nação.",
    ],
  },
  'Museo Nacional de Arte': {
    lead:
      "O Museo Nacional de Arte (MUNAL) na Cidade do México, que abriga a coleção nacional mexicana da era colonial ao início do século XX.",
    city: 'Cidade do México, México',
    founded: '1982',
    highlights: [
      "Os luminosos panoramas do Vale do México de Velasco",
      'Herrán, Izaguirre e os mestres acadêmicos',
      'Arte mexicana da era colonial ao início do modernismo',
      'Um magnífico antigo palácio de governo como sede',
    ],
    about:
      "O MUNAL está instalado num magnífico palácio do início do século XX no centro histórico da Cidade do México, construído sob o ditador Porfirio Díaz como o Ministério das Comunicações e mais tarde convertido num museu que abriu em 1982. Suas galerias traçam a arte mexicana do período colonial à véspera do movimento muralista, mostrando como pintores como Velasco e Herrán forjaram uma identidade artística nacional a partir da terra, da história e dos povos do país.",
    facts: [
      "Ocupa um suntuoso antigo palácio de governo no centro histórico.",
      "Sua coleção se detém por volta do alvorecer dos famosos muralistas mexicanos.",
    ],
  },
  'Museo de Historia del Arte de Viena': {
    lead:
      "O Kunsthistorisches Museum em Viena, construído para a coleção imperial dos Habsburgo e entre os principais museus de arte do mundo.",
    city: 'Viena, Áustria',
    founded: '1891',
    highlights: [
      'A maior coleção de pinturas de Bruegel de qualquer lugar',
      "«A Torre de Babel» e «Os Caçadores na Neve» de Bruegel",
      'Obras-primas de Ticiano, Velázquez, Vermeer e Rubens',
      'Um edifício palaciano com uma escadaria decorada por Klimt',
    ],
    about:
      "Aberto em 1891 para exibir a vasta coleção de arte dos imperadores Habsburgo, o «Museu de História da Arte» é um edifício palaciano na grandiosa Ringstrasse de Viena, com a própria escadaria decorada pelo jovem Gustav Klimt. Séculos de colecionismo imperial — os Habsburgo governaram grande parte da Europa — deram-lhe uma profundidade extraordinária, acima de tudo a maior concentração do mundo de Pieter Bruegel, o Velho, cuja produção sobrevivente é minúscula e preciosa.",
    facts: [
      "Abriga cerca de uma dúzia dos aproximadamente quarenta painéis de Bruegel sobreviventes.",
      "Foi construído para o fim de exibir a coleção imperial dos Habsburgo.",
      "Um jovem Gustav Klimt ajudou a decorar sua grandiosa escadaria.",
    ],
  },
  'Museo de Arte de Filadelfia': {
    lead:
      "O Philadelphia Museum of Art, um dos maiores dos Estados Unidos, famoso para muitos pela grandiosa escadaria de entrada de seu edifício semelhante a um templo.",
    city: 'Filadélfia, EUA',
    founded: '1876',
    highlights: [
      'Grandes obras de Cézanne e Poussin',
      "A obra-prima «Ad Parnassum» de Klee",
      'Fortes acervos europeu, americano e moderno',
      "A mundialmente famosa «escadaria do Rocky»",
    ],
    about:
      "O museu foi fundado em conexão com a Exposição do Centenário de 1876 — a primeira grande Feira Mundial da América, realizada na Filadélfia — e mudou-se para seu monumental edifício de estilo grego no alto de uma colina em 1928. Sua escadaria tornou-se mundialmente famosa pelo filme «Rocky», completa com uma estátua de bronze por perto, mas dentro há coleções profundas de arte europeia, americana e moderna, incluindo um célebre conjunto de obras de Cézanne e Duchamp.",
    facts: [
      "Sua escadaria da frente é conhecida no mundo todo como a «escadaria do Rocky».",
      "Cresceu a partir da primeira grande Feira Mundial da América, em 1876.",
      "Uma estátua de bronze do «Rocky» fica perto do pé da escadaria.",
    ],
  },
  'Museo van Gogh': {
    lead:
      "O Van Gogh Museum em Amsterdã, casa da maior coleção da obra de Vincent van Gogh no mundo.",
    city: 'Amsterdã, Países Baixos',
    founded: '1973',
    highlights: [
      "«Os Comedores de Batatas», «Os Girassóis» e «O Quarto»",
      'Os campos tardios e centenas de desenhos',
      "As cartas de Van Gogh ao irmão Theo",
      'Obras de seus contemporâneos para contexto',
    ],
    about:
      "O museu é construído em torno da coleção mantida pelo devoto irmão de Van Gogh, Theo, um marchand, e preservada após a morte de ambos os irmãos pela viúva e pelo filho de Theo, que salvaguardaram as pinturas, os desenhos e a extraordinária correspondência. Aberto em 1973, permite aos visitantes acompanhar toda a curta e intensa carreira do artista num só lugar — das sombrias obras holandesas iniciais à cor ardente de seus últimos anos — e é um dos museus mais visitados dos Países Baixos.",
    facts: [
      "A coleção sobreviveu porque a família de Van Gogh a manteve unida por décadas.",
      "Abriga muitas de suas cartas manuscritas além de sua arte.",
      "Traça toda a sua carreira, dos começos sombrios às suas últimas obras ardentes.",
    ],
  },
  'Catedral de Amberes': {
    lead:
      "A Catedral de Nossa Senhora em Antuérpia, uma imponente igreja gótica e o coração artístico da cidade natal de Rubens.",
    city: 'Antuérpia, Bélgica',
    founded: 'construída séc. XIV–XVI',
    highlights: [
      "«A Elevação da Cruz» de Rubens",
      "«A Descida da Cruz» de Rubens",
      'Retábulos ainda no cenário para o qual foram feitos',
      'A mais alta torre gótica dos Países Baixos',
    ],
    about:
      "Ao contrário das outras instituições aqui, esta é uma catedral em funcionamento e não um museu — a maior igreja gótica dos Países Baixos, séculos em construção. Abriga vários retábulos monumentais de Peter Paul Rubens, o filho mais famoso de Antuérpia, nos próprios espaços para os quais foram pintados, oferecendo uma rara chance de ver obras-primas barrocas em seu cenário original em vez de numa galeria. Rubens está sepultado em outra igreja da mesma cidade.",
    facts: [
      "É uma catedral viva, não um museu — as obras de Rubens estão onde ele pretendia.",
      "Sua torre é a mais alta torre de igreja dos Países Baixos.",
      "Rubens nasceu e foi sepultado em Antuérpia, a cidade que estes retábulos adornam.",
    ],
  },
  'Galería Tretiakov': {
    lead:
      "A Galeria Estatal Tretiakov em Moscou, a principal coleção de arte russa, dos ícones medievais à vanguarda.",
    city: 'Moscou, Rússia',
    founded: '1856',
    highlights: [
      "As paisagens de Levitan e obras-primas russas",
      "«Quadrado Negro» de Malevich",
      'Séculos de pintura russa e ícones religiosos',
      "O venerado ícone da Trindade de Andrei Rublev",
    ],
    about:
      "A galeria cresceu da coleção particular do mercador Pavel Tretiakov, que a partir de 1856 se propôs, quase sozinho, a construir uma coleção nacional de arte russa numa época em que a elite da Rússia prezava a obra europeia. Ele comprava diretamente de artistas vivos e doou toda a coleção à cidade de Moscou em 1892. Continua sendo a casa essencial da pintura russa, abrangendo ícones medievais, o realismo do século XIX e a revolucionária vanguarda.",
    facts: [
      "Foi fundada por um único mercador dedicado a colecionar arte russa.",
      "Ele doou toda a coleção à cidade de Moscou em 1892.",
      "Vai de antigos ícones religiosos à abstração radical de Malevich.",
    ],
  },
  'Galería Nacional de Noruega': {
    lead:
      "A antiga Galeria Nacional da Noruega em Oslo, hoje parte do Museu Nacional, que abriga a mais importante coleção de arte do país.",
    city: 'Oslo, Noruega',
    founded: '1837',
    highlights: [
      "A versão mais famosa de «O Grito» de Munch",
      "«A Dança da Vida» de Munch",
      'O principal acervo histórico de arte da Noruega',
      'Paisagens românticas norueguesas',
    ],
    about:
      "Por muito tempo o principal museu de arte da Noruega, a Galeria Nacional abrigou a coleção da nação de 1837 até que seu acervo foi incorporado ao vasto novo Museu Nacional que abriu em Oslo em 2022. Seus tesouros mais conhecidos são as versões das obras-primas de Edvard Munch, o orgulho da arte norueguesa, exibidas ao lado das paisagens românticas através das quais a Noruega afirmou sua identidade nacional no século XIX.",
    facts: [
      "Seu acervo agora faz parte do enorme novo Museu Nacional de Oslo, aberto em 2022.",
      "«O Grito» foi alvo de dois famosos roubos de arte.",
    ],
  },
  'Museo Nacional de Tokio': {
    lead:
      "O Museu Nacional de Tóquio, o museu mais antigo e maior do Japão, que abriga a maior coleção de arte e antiguidades japonesas do mundo.",
    city: 'Tóquio, Japão',
    founded: '1872',
    highlights: [
      "«Pinheiros» de Tōhaku",
      "«Ciprestes» de Eitoku",
      "«Paisagem de Inverno» de Sesshū",
      'Mais de cem Tesouros Nacionais designados',
    ],
    about:
      "Fundado em 1872 e situado no Parque Ueno de Tóquio, o museu salvaguarda o patrimônio artístico do Japão em pintura, escultura, cerâmica, têxteis e espadas, incluindo bem mais de cem obras oficialmente designadas Tesouros Nacionais. Como os biombos e rolos suspensos japoneses são frágeis e sensíveis à luz, suas maiores pinturas são exibidas apenas em rodízio, por algumas semanas de cada vez, de modo que duas visitas nunca são iguais.",
    facts: [
      "Abriga mais de cem Tesouros Nacionais oficialmente designados.",
      "Suas pinturas mais preciosas são exibidas apenas brevemente, em rodízio.",
      "É o mais antigo museu nacional do Japão.",
    ],
  },
  'Galería Borghese': {
    lead:
      "A Galleria Borghese em Roma, instalada numa esplêndida vila construída para um grande colecionador do início do século XVII, com uma extraordinária concentração de obras-primas barrocas.",
    city: 'Roma, Itália',
    founded: 'coleção a partir do séc. XVII',
    highlights: [
      "As virtuosas esculturas em mármore de Bernini",
      'Vários Caravaggios',
      "«Amor Sacro e Amor Profano» de Ticiano",
      'Uma vila-joia situada no maior parque de Roma',
    ],
    about:
      "A coleção foi reunida pelo cardeal Scipione Borghese, sobrinho do papa e um mecenas implacável e apaixonado que adquiria arte por quase todos os meios — inclusive apreendendo obras que cobiçava. Foi o grande primeiro patrono do jovem Bernini e de Caravaggio, e sua vila e seus tesouros permaneceram notavelmente intactos por quatro séculos. Como o cenário é íntimo, as visitas hoje são por ingresso com hora marcada em turnos de duas horas, para limitar as multidões.",
    facts: [
      "Seu fundador, um cardeal, às vezes apreendia à força ou por intriga a arte que queria.",
      "Foi o primeiro grande patrono tanto de Bernini quanto de Caravaggio.",
      "A entrada é por ingresso cronometrado de duas horas para proteger a pequena vila.",
    ],
  },
  'Colecciones de Pinturas del Estado de Baviera': {
    lead:
      "As Coleções Estatais de Pintura da Baviera, cuja joia da coroa é a Alte Pinakothek em Munique, uma das mais antigas galerias de pintura do mundo.",
    city: 'Munique, Alemanha',
    founded: '1836',
    highlights: [
      "O autorretrato de Dürer",
      'Soberbos antigos mestres alemães, flamengos e holandeses',
      'Um grande conjunto de obras de Rubens',
      'Rembrandt e as escolas do norte',
    ],
    about:
      "A Alte Pinakothek abriu em 1836 para exibir as coleções de pintura da dinastia Wittelsbach, que governou a Baviera por séculos e era ávida colecionadora. Suas galerias construídas para o fim, com salões iluminados por claraboias projetados para a apreciação de pinturas, tornaram-se um modelo imitado por museus de toda a Europa. As Coleções Estatais de Pintura da Baviera que ela ancora também administram uma família de outras galerias de Munique que cobrem do século XIX ao presente.",
    facts: [
      "Sua coleção foi construída pela dinastia Wittelsbach ao longo de vários séculos.",
      "Seu edifício de 1836 influenciou o projeto de museus posteriores por toda a Europa.",
      "Abriga uma das mais belas coleções de Rubens fora de Antuérpia.",
    ],
  },
  'Museo Marmottan Monet': {
    lead:
      "O Musée Marmottan Monet em Paris, casa da maior coleção de obras de Claude Monet do mundo.",
    city: 'Paris, França',
    founded: '1934',
    highlights: [
      "«Impressão, Nascer do Sol» — a pintura que deu nome ao Impressionismo",
      'Muitas ninfeias tardias de Giverny',
      'Obras de Morisot e outros impressionistas',
      'Um íntimo cenário de mansão perto do Bois de Boulogne',
    ],
    about:
      "Outrora uma mansão particular e antigo pavilhão de caça, a Marmottan tornou-se museu em 1934 e transformou-se quando o filho de Monet, Michel, lhe legou o acervo pessoal do artista — o maior de qualquer lugar. Abriga também uma grande coleção de Berthe Morisot. Seu maior tesouro, «Impressão, Nascer do Sol», esteve entre as obras roubadas num notório assalto à mão armada de 1985 e mais tarde recuperado.",
    facts: [
      "É dona de «Impressão, Nascer do Sol», a pintura que deu nome ao movimento.",
      "O próprio filho de Monet legou o grande tesouro da obra do pai.",
      "Essa famosa tela foi roubada num assalto de 1985 e mais tarde recuperada.",
    ],
  },
  'Museo Kröller-Müller': {
    lead:
      "O Museu Kröller-Müller nos Países Baixos, situado num parque nacional, construído em torno da coleção de uma das primeiras defensoras de Van Gogh.",
    city: 'Otterlo, Países Baixos',
    founded: '1938',
    highlights: [
      'A segunda maior coleção de Van Gogh do mundo',
      "«Terraço do Café à Noite» de Van Gogh",
      'Um célebre jardim de esculturas ao ar livre',
      'Obras de Seurat, Mondrian e mestres modernos',
    ],
    about:
      "Helene Kröller-Müller foi uma das primeiras colecionadoras a compreender a importância de Van Gogh, reunindo quase 300 de suas obras quando ele ainda era pouco apreciado. Ela e o marido doaram sua vasta coleção ao Estado holandês, e o museu abriu em 1938 em meio às matas e charnecas do parque nacional Hoge Veluwe. Os visitantes muitas vezes exploram o parque em bicicletas brancas gratuitas, e o grande jardim de esculturas do museu está entre os mais belos da Europa.",
    facts: [
      "Sua fundadora foi uma das primeiras grandes colecionadoras de Van Gogh.",
      "Fica dentro de um parque nacional que se pode explorar em bicicletas brancas gratuitas.",
      "Seu jardim de esculturas é um dos maiores da Europa.",
    ],
  },
  'Galerías nacionales de Escocia': {
    lead:
      "As National Galleries of Scotland em Edimburgo, que abrigam a coleção nacional de belas-artes, dos antigos mestres ao Impressionismo.",
    city: 'Edimburgo, Reino Unido',
    founded: '1859',
    highlights: [
      "«Visão após o Sermão» de Gauguin",
      'Antigos mestres escoceses e europeus',
      'Obras impressionistas e posteriores',
      'O melhor panorama da arte escocesa de qualquer lugar',
    ],
    about:
      "As National Galleries of Scotland espalham-se por vários edifícios interligados no coração de Edimburgo, incluindo a neoclássica National Gallery no Mound e as galerias de retrato e arte moderna. Nascidas de uma coleção nacional de meados do século XIX, combinam obras europeias-chave com o mais profundo acervo de arte escocesa existente, e são de entrada gratuita.",
    facts: [
      "Abrangem várias galerias interligadas no centro de Edimburgo.",
      "Abrigam a melhor coleção de arte escocesa do mundo.",
    ],
  },
  'Palais des Beaux-Arts de Lille': {
    lead:
      "O Palais des Beaux-Arts em Lille, um dos maiores museus de arte da França fora de Paris.",
    city: 'Lille, França',
    founded: '1801',
    highlights: [
      "Uma versão principal de «Belisário Pedindo Esmola» de David",
      'Uma rica coleção de pintura europeia',
      'Antigos mestres e arte francesa do século XIX',
      'Goya, Rubens e as escolas flamengas',
    ],
    about:
      "O museu foi criado em 1801 como parte de um decreto napoleônico que enviou grandes obras da coleção nacional a um punhado de cidades provincianas francesas, espalhando a grande arte para além de Paris. Mudou-se para seu grandioso palácio Belle Époque em 1892 e abriga uma variedade excepcional de pintura europeia, especialmente forte em arte flamenga e francesa dada a posição de Lille perto da fronteira belga.",
    facts: [
      "Foi fundado sob Napoleão para levar a grande arte às regiões francesas.",
      "Seu acervo é especialmente rico em arte flamenga, graças à localização fronteiriça de Lille.",
    ],
  },
  'Antigua Galería Nacional de Berlín': {
    lead:
      "A Alte Nationalgalerie na Ilha dos Museus de Berlim, que abriga arte do século XIX e é uma grande casa do Romantismo alemão.",
    city: 'Berlim, Alemanha',
    founded: '1876',
    highlights: [
      'Obras-chave de Caspar David Friedrich',
      "«A Abadia no Carvalhal» de Friedrich",
      'Pintura romântica e impressionista alemã',
      'Um edifício semelhante a um templo numa ilha da UNESCO',
    ],
    about:
      "Aberta em 1876, a «Antiga Galeria Nacional» é um edifício semelhante a um templo na Ilha dos Museus de Berlim, um conjunto de cinco museus listado como Patrimônio Mundial da UNESCO. Reúne arte do século XIX com o Romantismo alemão em seu cerne, acima de tudo as paisagens visionárias de Caspar David Friedrich, ao lado do Impressionismo alemão e francês. Foi gravemente danificada na Segunda Guerra Mundial e restaurada minuciosamente.",
    facts: [
      "Fica na Ilha dos Museus de Berlim, Patrimônio Mundial da UNESCO.",
      "Foi muito danificada na Segunda Guerra Mundial e depois cuidadosamente reconstruída.",
    ],
  },
  'Kunsthalle de Hamburgo': {
    lead:
      "A Hamburger Kunsthalle, um dos maiores museus de arte da Alemanha, celebrado por seu Romantismo alemão.",
    city: 'Hamburgo, Alemanha',
    founded: '1869',
    highlights: [
      "«Caminhante sobre o Mar de Névoa» de Friedrich",
      "«O Mar de Gelo» de Friedrich",
      'Arte da Idade Média ao presente',
      'Antigos mestres, Romantismo e arte moderna',
    ],
    about:
      "Fundada em 1869 pela associação artística da cidade, a Kunsthalle abrange vários edifícios conectados e cobre a arte de retábulos medievais a obras contemporâneas. É acima de tudo um lugar de peregrinação para os amantes de Caspar David Friedrich, abrigando a imagem mais famosa do Romantismo, o «Caminhante sobre o Mar de Névoa», que se tornou um ícone reproduzido pelo mundo todo.",
    facts: [
      "Abriga o «Caminhante», a imagem mais famosa do Romantismo.",
      "Seus edifícios vão de um salão do século XIX a um austero cubo moderno.",
    ],
  },
  'Museo Munch': {
    lead:
      "O Museu Munch (MUNCH) em Oslo, dedicado a Edvard Munch, que legou o grosso de sua obra à cidade.",
    city: 'Oslo, Noruega',
    founded: '1963',
    highlights: [
      "Versões de «O Grito», «Madonna», «Vampiro» e «Ansiedade»",
      'Milhares de pinturas, gravuras e desenhos',
      "A coleção definitiva da arte de Munch",
      'Uma dramática nova torre à beira-mar',
    ],
    about:
      "Quando Munch morreu em 1944, deixou seu enorme acervo pessoal — mais de 26 000 obras — à cidade de Oslo, o alicerce deste museu. Abriu em 1963 e mudou-se em 2021 para uma marcante torre de 13 andares na orla de Oslo, tornando-se a casa definitiva de sua arte. Como ele guardou tantas versões e gravuras de suas imagens-chave, o museu pode mostrar a evolução de um único motivo como «O Grito» ao longo de uma vida.",
    facts: [
      "Munch deixou à cidade mais de 26 000 de suas próprias obras.",
      "Reabriu em 2021 num dramático novo edifício de 13 andares à beira-mar.",
      "Pode traçar como Munch reelaborou uma única imagem em muitas versões.",
    ],
  },
  'Kunsthaus Zürich': {
    lead:
      "A Kunsthaus Zürich, o principal museu de arte da maior cidade da Suíça, forte em arte moderna.",
    city: 'Zurique, Suíça',
    founded: '1910',
    highlights: [
      'Obras de Munch e dos expressionistas',
      'Uma composição clássica de Mondrian',
      'A maior coleção de Munch fora da Noruega',
      'Dos antigos mestres à arte contemporânea',
    ],
    about:
      "Administrada por uma antiga sociedade artística local, a Kunsthaus abriu seu edifício principal em 1910 e expandiu-se muito com uma grande nova ala em 2021, tornando-se um dos maiores museus de arte da Suíça. Abriga uma importante coleção de arte moderna — incluindo o maior conjunto de obras de Munch fora da Noruega — ao lado de antigos mestres, arte suíça e uma notável coleção de Alberto Giacometti.",
    facts: [
      "Uma grande ampliação em 2021 fez dela um dos maiores museus de arte da Suíça.",
      "Abriga a maior coleção de Munch fora da Noruega.",
    ],
  },
  'Museo Leopold': {
    lead:
      "O Museu Leopold em Viena, construído sobre uma grande coleção particular e que abriga o maior tesouro de Egon Schiele do mundo.",
    city: 'Viena, Áustria',
    founded: '2001',
    highlights: [
      "A maior coleção de Egon Schiele do mundo",
      'Grandes obras de Gustav Klimt',
      'Uma casa do modernismo vienense (Viena 1900)',
      'Design e artes decorativas da época',
    ],
    about:
      "O oftalmologista Rudolf Leopold passou cinco décadas reunindo uma vasta coleção de arte moderna austríaca, especialmente Egon Schiele, comprando suas obras quando o artista ainda era chocante e subvalorizado. Em 2001 a coleção tornou-se um museu público no MuseumsQuartier de Viena, um elegante cubo branco dedicado ao fervor de «Viena 1900», a brilhante e angustiada cultura da cidade na virada do século.",
    facts: [
      "Foi construído sobre a coleção de toda uma vida de um único oftalmologista vienense.",
      "Abriga mais obras de Egon Schiele que qualquer outro lugar do planeta.",
      "É um museu-chave da era «Viena 1900».",
    ],
  },
  'Galería Belvedere': {
    lead:
      "O Belvedere em Viena, um magnífico palácio barroco que abriga a coleção nacional austríaca e, acima de tudo, a arte de Gustav Klimt.",
    city: 'Viena, Áustria',
    founded: '1781 (público)',
    highlights: [
      "A obra-prima dourada «O Beijo» de Klimt",
      'A maior coleção de Klimt do mundo',
      'Obras-chave de Egon Schiele',
      'Um panorama da arte austríaca num palácio barroco',
    ],
    about:
      "Construído no início do século XVIII como o palácio de verão do herói militar príncipe Eugênio de Saboia, o Belvedere abriu sua coleção imperial de pintura ao público em 1781 — entre os primeiros museus públicos do mundo, anos antes do Louvre. Hoje é mais conhecido como a casa de Gustav Klimt, abrigando a maior coleção de sua obra no mundo, incluindo «O Beijo», que está pendurado ali desde que foi pintado.",
    facts: [
      "Abriu ao público em 1781, entre os primeiros museus a fazê-lo.",
      "«O Beijo» está pendurado aqui desde que foi pintado.",
      "Abriga a maior coleção de Klimt do mundo.",
    ],
  },
  'Museo Nacional de Arte, Arquitectura y Diseño': {
    lead:
      "O Museu Nacional em Oslo, que abriga a principal coleção norueguesa de arte, arquitetura e design.",
    city: 'Oslo, Noruega',
    founded: '2003 (fusão)',
    highlights: [
      "As versões mais famosas das obras-primas de Munch, incluindo «O Grito»",
      'O acervo nacional de arte da Noruega',
      'Arte, arquitetura e design juntos',
      'Uma vasta nova sede construída para o fim',
    ],
    about:
      "Formado pela fusão de várias instituições norueguesas mais antigas, o Museu Nacional reuniu as coleções de arte, arquitetura e design da nação sob um só teto e abriu seu enorme novo edifício em Oslo em 2022 — entre os maiores museus de arte dos países nórdicos. Seus destaques incluem as versões mais conhecidas das obras-primas de Edvard Munch, exibidas numa sala especialmente protegida após os roubos anteriores de «O Grito».",
    facts: [
      "Seu enorme novo edifício, aberto em 2022, está entre os maiores dos países nórdicos.",
      "Une arte, arquitetura e design numa única instituição.",
    ],
  },
  'Pinacoteca del Estado de São Paulo': {
    lead:
      "A Pinacoteca de São Paulo, o mais antigo museu de arte da cidade, que abriga uma das mais importantes coleções de arte brasileira.",
    city: 'São Paulo, Brasil',
    founded: '1905',
    highlights: [
      "«Caipira Picando Fumo» de Almeida Júnior",
      "«O Violeiro» de Almeida Júnior",
      'Um profundo panorama da arte brasileira',
      'Um edifício restaurado do início do século XX',
    ],
    about:
      "Fundada em 1905 num edifício escolar reaproveitado perto da antiga estação ferroviária da cidade, a Pinacoteca concentra-se na arte brasileira do século XIX ao presente. Seu belo edifício de tijolos foi elegantemente restaurado nos anos 1990 pelo arquiteto Paulo Mendes da Rocha, e sua coleção é especialmente rica nos pintores, como Almeida Júnior, que primeiro voltaram a arte para temas genuinamente brasileiros.",
    facts: [
      "É o mais antigo museu de arte de São Paulo.",
      "Seu edifício foi reformado pelo arquiteto laureado com o Pritzker Paulo Mendes da Rocha.",
    ],
  },
  'Nezu Art Museum': {
    lead:
      "O Museu Nezu em Tóquio, construído em torno da coleção de um empresário e situado em meio a um famoso jardim tradicional.",
    city: 'Tóquio, Japão',
    founded: '1941',
    highlights: [
      "Os biombos «Íris», Tesouro Nacional, de Ogata Kōrin",
      'Renomada arte japonesa e do Leste Asiático',
      'Um célebre jardim de passeio com casas de chá',
      'Um edifício moderno do arquiteto Kengo Kuma',
    ],
    about:
      "O museu cresceu da coleção do industrial Nezu Kaichirō e abriu em 1941, reconstruído em 2009 num sereno edifício moderno do arquiteto Kengo Kuma. Seus biombos «Íris» de Kōrin, um Tesouro Nacional, são tradicionalmente exibidos a cada primavera — cronometrados para que os visitantes possam então sair ao célebre jardim do museu e ver os íris reais em flor.",
    facts: [
      "Seus famosos biombos «Íris» são exibidos a cada primavera para coincidir com o jardim em flor.",
      "Seu jardim paisagístico com casas de chá é um raro oásis no centro de Tóquio.",
      "O edifício atual é do renomado arquiteto Kengo Kuma.",
    ],
  },
  'MOA': {
    lead:
      "O MOA Museum of Art em Atami, Japão, com vista para o mar, que abriga uma distinta coleção de arte japonesa e do Leste Asiático.",
    city: 'Atami, Japão',
    founded: '1982',
    highlights: [
      "«Ameixeiras Vermelhas e Brancas em Flor», Tesouro Nacional, de Ogata Kōrin",
      'Obras-primas da escola Rinpa',
      'Arte japonesa e do Leste Asiático',
      'Um dramático edifício na encosta acima da costa',
    ],
    about:
      "Empoleirado no alto de uma encosta acima do balneário termal costeiro de Atami, com vistas amplas sobre o mar, o MOA abriu em 1982 e é alcançado através de uma marcante série de longas escadas rolantes escavadas na montanha. Centra-se em seu supremo tesouro Rinpa de Kōrin, e faz rodízio de suas obras mais delicadas para protegê-las, exibindo os biombos «Ameixeiras em Flor» na época da floração da ameixeira.",
    facts: [
      "Fica numa encosta com vistas panorâmicas sobre o mar em Atami.",
      "Os visitantes sobem até ele por longas escadas rolantes perfuradas na montanha.",
    ],
  },
  'Museo Nacional de Kioto': {
    lead:
      "O Museu Nacional de Quioto, um dos principais museus do Japão, dedicado à arte e ao patrimônio pré-modernos da antiga capital imperial.",
    city: 'Quioto, Japão',
    founded: '1897',
    highlights: [
      'Numerosos Tesouros Nacionais de pintura, escultura e artesanato',
      'Arte japonesa pré-moderna',
      'Tesouros confiados pelos templos e santuários de Quioto',
      'Um histórico edifício de 1897 e uma ala moderna',
    ],
    about:
      "Fundado em 1897, o Museu Nacional de Quioto salvaguarda e exibe o patrimônio artístico de Quioto, que foi a capital imperial do Japão por mais de mil anos. Grande parte de sua coleção lhe é confiada pelos antigos templos e santuários da cidade, e ele desempenha um papel de destaque na conservação dos tesouros culturais do Japão, emparelhando seu salão de tijolos original da era Meiji com uma elegante ala de exposições moderna.",
    facts: [
      "Grande parte de seu acervo vem dos antigos templos e santuários de Quioto.",
      "Quioto foi a capital do Japão por mais de mil anos.",
    ],
  },
};

/** The museum profile for a locale, falling back to English. */
export function museumInfo(name?: string, locale: Locale = 'en'): MuseumInfo | undefined {
  if (!name) return undefined;
  return (
    (locale === 'de' && MUSEUM_INFO_DE[name]) ||
    (locale === 'pt' && MUSEUM_INFO_PT[name]) ||
    (locale === 'it' && MUSEUM_INFO_IT[name]) ||
    (locale === 'fr' && MUSEUM_INFO_FR[name]) ||
    (locale === 'es' && MUSEUM_INFO_ES[name]) ||
    MUSEUM_INFO[name]
  );
}
