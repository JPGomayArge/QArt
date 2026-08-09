// Original, in-house descriptions of the art movements in the catalog.
// Keyed by a canonical slug; movementInfoFor() maps the many variant strings
// that appear in the data (e.g. "Alto Renacimiento", "pintura renacentista de
// Italia") onto one canonical entry. Hand-written — NOT from Wikipedia.
//
// Sectioned + scannable: a short `lead` (what it is), bulleted `hallmarks`
// (how to recognize it), an `origins` paragraph (when/where/why + context),
// a list of `figures` (key names), and a `legacy` note (why it matters).

import type { Locale } from '@/i18n';

export type MovementInfo = {
  title: string;
  /** What it is — one or two sentences. */
  lead: string;
  /** Quick-fact chips. */
  era?: string; // e.g. "14th–16th c."
  origin?: string; // e.g. "Italy"
  /** How to recognize it — short bullet points. */
  hallmarks: string[];
  /** When and where it emerged, and why — the context. */
  origins: string;
  /** Key figures (name — a few words). */
  figures: string[];
  /** Why it matters / what it led to. */
  legacy: string;
};

export const MOVEMENT_INFO: Record<string, MovementInfo> = {
  renacimiento: {
    title: 'Renaissance',
    lead:
      "The 'rebirth' of the art, learning and ideals of ancient Greece and Rome, which placed the harmoniously proportioned human being at the centre of art and sparked one of the most creative periods in history.",
    era: '14th–16th c.',
    origin: 'Italy',
    hallmarks: [
      'Convincing depth built with mathematical linear perspective',
      'Anatomically accurate, solid, weighty figures',
      'Light and shadow modelling for real presence',
      'Balance, harmony and idealized beauty',
      'Classical architecture, myth and history revived',
    ],
    origins:
      "The Renaissance took root in the wealthy, competitive city-states of 14th- and 15th-century Italy — above all Florence — and spread across Europe over the next two centuries. After the Middle Ages, scholars and artists consciously revived the culture of antiquity, and the philosophy of humanism prized human reason, dignity and potential. It was bankrolled by powerful patrons like the Medici bankers and the popes of Rome, who competed for prestige through art. The Early Renaissance began in Florence with Masaccio, Botticelli and Fra Angelico; around 1500 it reached its dazzling summit in the High Renaissance in Florence and Rome. In this new world the artist rose from anonymous medieval craftsman to celebrated individual genius, signing his work and remembered by name.",
    figures: [
      'Leonardo da Vinci — the universal genius (Mona Lisa)',
      'Michelangelo — heroic power in paint and marble',
      'Raphael — grace and harmony (School of Athens)',
      'Botticelli, Masaccio, Piero della Francesca — the Early Renaissance',
    ],
    legacy:
      "It permanently reshaped Western art, establishing perspective, proportion and the direct study of nature as its foundations. Its masterpieces — the Mona Lisa, the Sistine ceiling, the School of Athens — remain among the most revered and recognizable images ever made, and set the standard European art measured itself against for centuries.",
  },
  renacimientonorte: {
    title: 'Northern Renaissance',
    lead:
      "The Renaissance revival as it unfolded north of the Alps — absorbing Italian ideas of proportion and humanism but filtering them through a distinctly northern love of minute detail and close observation.",
    era: '15th–16th c.',
    origin: 'Germany & the Low Countries',
    hallmarks: [
      'Almost microscopic precision of hair, fabric and light',
      'Everyday objects loaded with hidden symbolism',
      'Rich, luminous colour from the new medium of oil',
      'Searching, unidealized realism, especially in portraits',
      'Printmaking that spread images across Europe',
    ],
    origins:
      "While the Renaissance blossomed in Italy, a parallel revival unfolded in Germany, Flanders and beyond. Where Italian artists idealized, northern ones scrutinized, rendering every hair and fabric fold with astonishing precision. Its leading figure, Albrecht Dürer, travelled to Italy, studied its theories of proportion, and fused them with northern craft — while pioneering printmaking, which carried images across the continent as never before. The movement was also shaped by the religious upheaval of the Reformation: as Protestantism spread, artists turned from religious altarpieces toward portraiture, landscape and scenes of daily life, laying the groundwork for later secular painting.",
    figures: [
      'Albrecht Dürer — fused Italian theory with northern craft',
      'Hans Holbein — piercing Tudor court portraits',
      'Jan van Eyck — luminous oil realism',
      'Pieter Bruegel — teeming panoramas of peasant life',
    ],
    legacy:
      "It gave Western art some of its most searching portraits and its enduring love of naturalistic detail and symbolic depth. That blend of precise observation and hidden meaning would echo powerfully through Dutch painting and far beyond.",
  },
  flamenco: {
    title: 'Early Netherlandish (Flemish Primitives)',
    lead:
      "The 15th-century Flemish painters who were among the first masters of oil paint, building luminous, jewel-like surfaces of a detail that astonished their contemporaries.",
    era: '15th c.',
    origin: 'Flanders',
    hallmarks: [
      'Thin, translucent oil glazes for glowing depth',
      'Dazzling detail — reflections, textures, distant landscapes',
      'Ordinary objects charged with religious symbolism',
      'Some of the first signed and dated paintings',
      'Small devotional panels and grand altarpieces',
    ],
    origins:
      "In the wealthy trading cities of 15th-century Flanders — Bruges, Ghent and Brussels — a group of painters transformed European art. Known as the Flemish Primitives (an old term meaning 'first,' not crude), they exploited oil paint as no one had, building up thin glazes that made reflections, fabrics and far horizons shimmer with life. They worked for the dukes of Burgundy and for prosperous merchants, producing altarpieces, portraits and devotional panels dense with meaning, where a candle, a dog or a mirror might carry symbolic weight. Jan van Eyck even signed and dated his works — an assertion of the artist's new status — and their innovations in oil quickly influenced Italy and the rest of Europe.",
    figures: [
      "Jan van Eyck — pioneer of the oil glaze (Arnolfini Portrait)",
      'Rogier van der Weyden — intense religious emotion',
      'Hieronymus Bosch — fantastical, moralizing visions',
    ],
    legacy:
      "The Flemish Primitives laid the technical and observational foundations of Western oil painting. Their marriage of breathtaking realism and hidden symbolism remains one of the great achievements of European art and shaped the Dutch tradition that followed.",
  },
  veneciana: {
    title: 'Venetian School',
    lead:
      "The painting of Venice, which prized 'colorito' — colour, light and sensuous painterly surface — over the firm drawing and design ('disegno') favoured in Florence and Rome.",
    era: '15th–16th c.',
    origin: 'Venice',
    hallmarks: [
      'Form built from glowing patches of warm colour, not hard outline',
      'Loose, sensuous brushwork in oil',
      'Rich fabrics, golden light and voluptuous flesh',
      'Atmosphere and mood over sharp precision',
      'Sensuous mythologies and grand portraits',
    ],
    origins:
      "Venice, the great maritime republic, developed a school of painting distinct from that of central Italy. Its wealth, its trade with the East and the special quality of its watery, luminous light all shaped a warm, colour-driven style, built not from hard contours but from glowing tone applied in loose oil strokes. Giovanni Bellini opened the way with soft, luminous light; Giorgione brought a new poetic mood; and Titian, the greatest of all, dominated European painting for half a century. Later Veronese and Tintoretto extended the tradition into grand spectacle. Venetian canvases were prized across Europe by kings, popes and collectors.",
    figures: [
      'Giovanni Bellini — founder, luminous colour',
      'Giorgione — poetic, atmospheric mood',
      'Titian — the supreme colourist',
      'Veronese, Tintoretto — grand spectacle',
    ],
    legacy:
      "The Venetian love of colour and free brushwork had immense influence. It fed directly into the Baroque of Rubens and Velázquez and, centuries later, helped inspire the loose, colour-driven painting of the Impressionists.",
  },
  manierismo: {
    title: 'Mannerism',
    lead:
      "The self-consciously elegant, artificial style of the generation after the High Renaissance, which prized sophistication, refinement and strangeness over natural balance.",
    era: 'c. 1520–1600',
    origin: 'Italy',
    hallmarks: [
      'Impossibly elongated limbs and twisting, unstable poses',
      'Crowded, ambiguous, compressed space',
      'Acidic, unexpected colour',
      'Conspicuous stylishness and cool, cerebral grace',
    ],
    origins:
      "Mannerism emerged in Italy around 1520, in the generation after the High Renaissance. Having inherited a seemingly perfect art from Leonardo, Michelangelo and Raphael, younger painters sought not further naturalism but a knowing, sophisticated elegance — beauty pushed toward tension and artifice. The word comes from the Italian 'maniera,' meaning style or manner: art made with conspicuous stylishness. It flourished in a turbulent age of religious crisis and the traumatic 1527 Sack of Rome, and its instability and unease can feel like a mirror of the anxieties of its time.",
    figures: [
      'Pontormo, Parmigianino — elegant elongation',
      'Bronzino — cool, polished court portraits',
      'El Greco — flame-like spiritual intensity',
    ],
    legacy:
      "Long dismissed as a decadent decline from the Renaissance, Mannerism is now valued for its inventiveness and psychological complexity. It bridges the serene ideal of the Renaissance and the dynamic drama of the Baroque.",
  },
  barroco: {
    title: 'Baroque',
    lead:
      "The dramatic, emotional art of the 17th century, which aimed above all to move the viewer — to overwhelm the senses and stir the emotions through movement, spectacle and intense light.",
    era: '17th–18th c.',
    origin: 'Italy, then all Europe',
    hallmarks: [
      'Strong contrasts of light and dark (chiaroscuro)',
      'Sweeping diagonal compositions and movement',
      'Theatrical gestures and vivid, immediate realism',
      'Grandeur meant to overwhelm the senses',
    ],
    origins:
      "The Baroque dominated European art through the 17th century and into the 18th. It was born partly of the Catholic Church's Counter-Reformation, which used emotionally powerful, accessible art to inspire faith against the plainer Protestant north; but it also served absolute monarchs and courts eager to project grandeur and power. The style took different forms across Europe — passionate and religious in Italy and Spain, opulent and sensuous in Flanders, restrained and intimate in the Dutch Republic — yet all shared a taste for dynamism and dramatic light, launched by Caravaggio's revolutionary spotlighting.",
    figures: [
      'Caravaggio — revolutionary dramatic lighting',
      'Rubens — surging Flemish energy',
      'Velázquez, Rembrandt — dazzling brush and depth',
    ],
    legacy:
      "The Baroque produced some of the most powerful images in Western art. Its command of light, emotion and movement shaped painting for generations and still defines our sense of theatrical, dramatic visual storytelling.",
  },
  neerlandes: {
    title: 'Dutch Golden Age',
    lead:
      "The astonishing 17th-century flowering of painting in the newly independent, Protestant and prosperous Dutch Republic, which made the everyday world the subject of high art.",
    era: '17th c.',
    origin: 'Dutch Republic',
    hallmarks: [
      'Everyday genres: portraits, landscapes, seascapes, still lifes, interiors',
      'Honest, closely observed natural light',
      'Modest domestic subjects treated with care',
      'Small-scale works made for ordinary homes',
    ],
    origins:
      "In the 17th century a small, newly independent nation created a vast body of art for a broad, largely middle-class public. Without the Church or grand courts as patrons, Dutch artists painted for ordinary homes, and pictures were bought and sold almost like any other commodity in a thriving open market. They perfected the genres of everyday life — portraits, landscapes, still lifes and quiet domestic interiors — prized for their honesty and closely observed light. This art reflected a confident, commercial, seafaring society that valued the visible world, cleanliness, prosperity and domestic virtue.",
    figures: [
      'Rembrandt — psychological depth and light',
      'Vermeer — serene, luminous interiors',
      'Frans Hals — dashing, lifelike energy',
    ],
    legacy:
      "The Dutch Golden Age elevated everyday subjects to high art and gave Western painting some of its most beloved images. Its intimate realism and subtle handling of light continue to move viewers four centuries on.",
  },
  espanol: {
    title: 'Spanish Golden Age',
    lead:
      "The intense, often austere art of Spain at the height of its empire, shaped by a devout Catholic court and Church during the 'Siglo de Oro.'",
    era: 'c. 1550–1660',
    origin: 'Spain',
    hallmarks: [
      'Stark realism and deep spiritual intensity',
      'Dramatic contrasts of light and shadow',
      'Grave, ceremonial mood, even in royal portraits',
      'Subjects ranging from ascetic austerity to rich sensuality',
    ],
    origins:
      "Spain's Siglo de Oro, roughly 1550 to 1660, coincided with the height of its empire and produced an art of great emotional and religious intensity. It served the Habsburg monarchy and the Counter-Reformation Church, decorating palaces, convents and cathedrals; even its royal portraits carry a note of solemn, ceremonial gravity distinct to Spain. Its masters range from El Greco, whose elongated figures reach toward the divine, to Velázquez, a court painter of unrivalled subtlety and truth, and Zurbarán and Ribera, who gave sacred subjects a grave, tangible realism.",
    figures: [
      'El Greco — elongated, ecstatic figures',
      'Velázquez — unrivalled truth and subtlety',
      'Zurbarán, Ribera — grave sacred realism',
    ],
    legacy:
      "The Spanish Golden Age gave the world some of its most profound religious painting and, in Velázquez, one of the greatest painters of all time — an artist whose honesty and technique would inspire Goya, Manet and Picasso alike.",
  },
  neoclasicismo: {
    title: 'Neoclassicism & Academic Art',
    lead:
      "A deliberate return to the noble simplicity and moral seriousness of ancient Greece and Rome, reacting against the frivolity of the Rococo and the excess of the late Baroque.",
    era: 'mid-18th–19th c.',
    origin: 'France & Italy',
    hallmarks: [
      'Clear, sculptural line and drawing',
      'Restrained, sober colour and balanced composition',
      'Elevated civic, heroic or moral subjects',
      'Feeling disciplined by order and reason',
    ],
    origins:
      "Neoclassicism arose in the mid-18th century, inspired by the recent excavations of Pompeii and Herculaneum, which put the ancient world vividly before European eyes. It sought virtue and reason rather than mere pleasure, and its supreme master, Jacques-Louis David, painted stern moral dramas that became emblems first of the French Revolution and then of Napoleon's empire. It became the official style of the art academies, which trained painters in rigorous drawing and idealized form, and this 'academic' art dominated the 19th-century salons before the modern avant-gardes challenged it.",
    figures: [
      'Jacques-Louis David — stern revolutionary dramas',
      'Ingres — cool, precise classicism',
    ],
    legacy:
      "Though later rebels rejected its rules, Neoclassicism defined what serious European painting looked like for a century. Its clarity, discipline and reverence for antiquity remain a lasting current in Western art.",
  },
  romanticismo: {
    title: 'Romanticism',
    lead:
      "A passionate revolt against Neoclassical order and Enlightenment reason, which championed emotion, imagination and the individual over rules and rationality.",
    era: 'late 18th–19th c.',
    origin: 'Europe',
    hallmarks: [
      'The sublime: awe, terror and wonder before wild nature',
      'Bold colour and charged, dynamic energy',
      'Storms, shipwrecks, ruins, exotic lands and heroic struggles',
      'The artist’s inner vision as the true source of art',
    ],
    origins:
      "Romanticism swept through European art in the late 18th and early 19th centuries, in an age of revolution, upheaval and new nationalism, and a longing for authenticity, mystery and the untamed. It reacted against the cool restraint of Neoclassicism, prizing feeling over rules and the artist's inner life above all. In France, Géricault and Delacroix painted turbulent scenes of drama and revolt; in Germany, Caspar David Friedrich turned lonely figures before vast landscapes into meditations on the soul; in Britain, Turner dissolved the world into light and atmosphere.",
    figures: [
      'Géricault, Delacroix — turbulent French drama',
      'Caspar David Friedrich — the solitary soul in nature',
      'Turner — the world dissolved into light',
    ],
    legacy:
      "Romanticism liberated colour, feeling and subjectivity in painting, and its exaltation of individual expression paved the way for much of modern art. Its images of nature's power and the solitary self still resonate deeply.",
  },
  realismo: {
    title: 'Realism',
    lead:
      "The insistence on depicting the ordinary world honestly, exactly as it is, rejecting both Neoclassical idealism and Romantic fantasy.",
    era: 'mid-19th c.',
    origin: 'France',
    hallmarks: [
      'Unglamorous subjects: peasants, labourers, washerwomen, daily life',
      'Humble subjects painted at grand, serious scale',
      'Truthful observation over embellishment',
      'A quiet dignity, sometimes with a note of social protest',
    ],
    origins:
      "Realism emerged in France around the 1840s and 1850s, in an era of political revolution and industrial change, when artists and writers grew newly attentive to social conditions and the lives of ordinary people. It turned to subjects formerly beneath 'serious' art — the rural and urban poor — and painted them at the large scale once reserved for gods and heroes, giving them a quiet dignity. Gustave Courbet led the movement with deliberate provocation, while Jean-François Millet gave rural toil a monumental, almost sacred gravity; the related current of Naturalism pushed even further toward unvarnished, scientific observation.",
    figures: [
      'Gustave Courbet — provocative leader',
      'Jean-François Millet — the monumental peasant',
    ],
    legacy:
      "By freeing painting from myth and idealization and rooting it in observed reality, Realism opened the door to modern art. Its honest attention to everyday life fed directly into Impressionism and the movements that followed.",
  },
  realismosocial: {
    title: 'Social Realism',
    lead:
      "Realism that turns its honest gaze specifically toward social and political reality — poverty, labour, inequality and injustice — using a plain, direct style to bear witness.",
    era: '19th–20th c.',
    origin: 'Worldwide',
    hallmarks: [
      'The poor, exploited and working people at the very centre',
      'A plain, unsentimental style that confronts hardship',
      'An appeal to empathy, awareness or conscience',
      'Labour and struggle where heroes or gods once stood',
    ],
    origins:
      "Social Realism is a current within realist art that appeared across the world from the 19th century onward, wherever industrialization, migration and inequality created visible suffering — including in Latin America, where painters recorded the lives of the urban poor and the dispossessed. Rather than idealize or entertain, it confronts the viewer with the unemployed, the exploited and the hungry. It is closely tied to broader movements for social reform, and its emotional force comes from placing everyday struggle at the heart of the picture.",
    figures: [
      'Ernesto de la Cárcova — Argentine social protest',
      'Reinaldo Giudici — the urban poor',
    ],
    legacy:
      "Social Realism gave art a moral and political voice, reminding viewers of realities easy to ignore. Its tradition of art as witness and conscience continued powerfully into the 20th century.",
  },
  realismoamericano: {
    title: 'American Realism & Regionalism',
    lead:
      "The drive, in the late 19th and early 20th centuries, to portray American life directly and truthfully, rather than through borrowed European ideals.",
    era: 'late 19th–20th c.',
    origin: 'United States',
    hallmarks: [
      'Everyday American scenes: streets, farms, sailors, workers',
      'Fresh, unsentimental observation',
      "Regionalism's focus on rural and heartland life",
      'Stillness and solitude in the modern city',
    ],
    origins:
      "As the United States grew into a world power, its artists sought a confident, independent visual identity rooted in the nation's own scenes and people. Realist painters depicted the everyday with fresh, unsentimental eyes — Winslow Homer's vigorous scenes of the sea and country boyhood are classic examples. In the 1930s, during the Depression, the related movement of Regionalism celebrated rural and small-town America as a homegrown answer to European modernism, while Edward Hopper distilled the whole current into images of stillness and modern loneliness.",
    figures: [
      'Winslow Homer — the sea and country life',
      "Grant Wood — Regionalist heartland ('American Gothic')",
      'Edward Hopper — modern loneliness',
    ],
    legacy:
      "Together these artists forged a confident, independent American art rooted in local scene and character, giving the young nation images that felt authentically its own.",
  },
  costumbrismo: {
    title: 'Costumbrismo',
    lead:
      "The affectionate artistic depiction of the customs, dress, 'types' and daily life of a particular place and people, treating the local and ordinary as worthy subjects.",
    era: '19th c.',
    origin: 'Spain & Latin America',
    hallmarks: [
      'Scenes of markets, festivals, folk dances and country taverns',
      "Regional costume and popular 'types'",
      'Warm, detailed, closely observed genre painting',
      'The gaucho, the huaso, the vendor, the rural dance',
    ],
    origins:
      "Costumbrismo flourished above all in 19th-century Spain and across Latin America. Rather than grand history or myth, its painters recorded the texture of a society — its work, leisure, rituals and characters — with warmth and detail. The movement rose alongside 19th-century nationalism, as newly independent nations sought to define their identity through their own land, people and traditions, and these images helped shape how societies pictured themselves.",
    figures: [
      "Manuel Antonio Caro — Chile's national dance",
      'José Agustín Arrieta — Mexican daily life',
    ],
    legacy:
      "Costumbrismo left an invaluable visual record of vanishing ways of life and popular culture. Warm, observant and rooted in place, it remains central to the national artistic heritage of many Spanish-speaking countries.",
  },
  hudson: {
    title: 'Hudson River School',
    lead:
      "The first major landscape movement in American art, which depicted the New World wilderness as vast, sublime and God-given.",
    era: '1820s–1870s',
    origin: 'United States',
    hallmarks: [
      'Grand, awe-inspiring scale',
      'Mountains, forests, rivers and luminous skies',
      'Glowing, dramatic light',
      'The untamed land as national and even divine',
    ],
    origins:
      "The Hudson River School took its name from the scenic Hudson River Valley of New York, where its founders first painted in the 1820s. It arose as the young United States expanded westward and forged a national identity, casting the wilderness as a source of pride and even divine destiny. Thomas Cole founded the movement and gave it a moral and spiritual dimension — some of his works quietly mourn the land's loss to development — while a later generation, including Frederic Church and Albert Bierstadt, pushed toward ever more spectacular panoramas of the New World and beyond.",
    figures: [
      'Thomas Cole — founder, moral and spiritual vision',
      'Frederic Church, Albert Bierstadt — vast panoramas',
    ],
    legacy:
      "The Hudson River School established landscape as a serious American subject and shaped how the nation saw its own land. Its sublime vision of the wilderness remains a cornerstone of American art.",
  },
  impresionismo: {
    title: 'Impressionism',
    lead:
      "A rebellion against academic painting that sought to capture the fleeting effects of light, colour and atmosphere in a single passing moment — one of the most beloved movements in the history of art.",
    era: '1860s–1880s',
    origin: 'Paris',
    hallmarks: [
      'Loose, broken brushstrokes',
      'Bright, unmixed colours',
      'Often painted quickly, outdoors, before the subject',
      'Modern subjects: cafés, boulevards, gardens, stations, leisure',
    ],
    origins:
      "Impressionism was born in Paris in the 1860s and 70s as a revolt against the rigid conventions of the official Salon and academic painting. Its artists worked quickly, often outdoors, using loose strokes and bright colour to record the immediate 'impression' of a scene rather than its fixed, precise detail, taking as their subject the modern world around them. The name came from a mocking review of Monet's 'Impression, Sunrise' at the group's first independent exhibition in 1874 — what critics dismissed as sketchy and unfinished, the artists embraced as a truer way of seeing.",
    figures: [
      'Claude Monet — light and atmosphere',
      'Renoir, Degas, Pissarro',
      'Morisot, Cassatt, Sisley, Caillebotte',
    ],
    legacy:
      "Impressionism transformed art by prizing perception, spontaneity and everyday modern life. It freed colour and brushwork from strict description and opened the door to the whole adventure of modern painting.",
  },
  posimpresionismo: {
    title: 'Post-Impressionism',
    lead:
      "The diverse art that built on Impressionism's bright colour but pushed beyond it toward greater structure, emotion, symbolism and personal expression.",
    era: '1880s–1900s',
    origin: 'France',
    hallmarks: [
      'Bright colour used for feeling and meaning, not just light',
      'Greater structure, symbolism and inner expression',
      'Highly personal, individual styles',
      'Beyond the fleeting optical moment',
    ],
    origins:
      "Post-Impressionism is the term for the varied art that emerged in France in the 1880s and 1890s, keeping Impressionism's colour but rejecting its focus on the momentary impression. Its artists never formed a single group; each moved in his own direction, convinced that painting should express more than the eye alone perceives — and their work was often misunderstood and undervalued in their lifetimes. Cézanne rebuilt nature from solid geometric planes; Van Gogh charged his canvases with intense colour and emotion; Seurat applied colour with scientific rigour; Gauguin flattened form in search of a symbolic art.",
    figures: [
      'Cézanne — form from geometric planes',
      'Van Gogh — intense colour and emotion',
      'Gauguin — flat, symbolic colour',
      'Seurat — scientific colour (Pointillism)',
    ],
    legacy:
      "Post-Impressionism was the crucial bridge to 20th-century modern art. Van Gogh, Cézanne and Gauguin in particular became towering influences on Expressionism, Cubism, Fauvism and nearly everything that followed.",
  },
  neoimpresionismo: {
    title: 'Neo-Impressionism (Pointillism)',
    lead:
      "A systematic, scientific development of Impressionism that built luminous images from countless small dots of pure, unmixed colour.",
    era: '1880s–1890s',
    origin: 'France',
    hallmarks: [
      'Pointillism: tiny separate dots of unmixed colour',
      'Colours blended by the eye, not on the palette',
      'A crystalline, still, ordered calm',
      'Painstaking, almost meditative method',
    ],
    origins:
      "Neo-Impressionism arose in France in the 1880s as a more rational, disciplined development of Impressionism. Where the Impressionists worked by instinct and spontaneity, its artists applied contemporary theories of colour and optics, placing dots of pure colour side by side so the eye would blend them into tones brighter, in theory, than mixed paint. Georges Seurat pioneered the approach; Paul Signac became its leading advocate and theorist. The movement reflected a late-19th-century faith in science and order, applied to the very act of perception, and building a large picture dot by dot was slow, almost meditative work.",
    figures: [
      'Georges Seurat — pioneer of the method',
      'Paul Signac — its leading advocate and theorist',
    ],
    legacy:
      "Though short-lived as a strict method, Neo-Impressionism influenced many later artists, including Matisse and the Fauves. Its bold, analytical use of pure colour helped push painting toward modern abstraction.",
  },
  simbolismo: {
    title: 'Symbolism',
    lead:
      "A turn inward — toward dreams, myth, emotion and imagination — reacting against the outward-looking Realism and Impressionism.",
    era: '1880s–1900s',
    origin: 'France & Belgium',
    hallmarks: [
      'Suggestion, mood and metaphor over literal depiction',
      'Themes of love, death, desire, mystery and the spiritual',
      'Enigmatic, often haunting, dreamlike imagery',
      'Subjectivity and the inner life',
    ],
    origins:
      "Symbolism arose in the 1880s, largely in France and Belgium but spreading across Europe. Where Realism and Impressionism looked outward at the visible world, Symbolism turned inward, using evocative imagery, mood and metaphor to hint at ideas and feelings that could not be shown literally. It paralleled Symbolist poetry and reflected an end-of-century mood of introspection, spiritual searching and unease, prizing the imagination over objective reality.",
    figures: [
      'Gustave Moreau, Odilon Redon — French visionaries',
      'Edvard Munch — anxiety and desire',
      'Gustav Klimt — sensuous, ornamental allegory',
    ],
    legacy:
      "Symbolism's emphasis on the imagination, the subconscious and the emotional power of the image had a deep influence on 20th-century art, feeding directly into Expressionism and, later, Surrealism.",
  },
  modernismo: {
    title: 'Modernisme / Art Nouveau',
    lead:
      "A turn-of-the-century decorative movement that sought a fresh, modern style free of historical imitation, drawing its forms from nature.",
    era: 'c. 1890–1910',
    origin: 'Europe',
    hallmarks: [
      "Sinuous, flowing 'whiplash' lines",
      'Organic plant and flower forms',
      'Elegant, ornamental pattern',
      'A total style uniting art, architecture, glass and design',
    ],
    origins:
      "Around 1900 a decorative movement swept Europe under many names — Art Nouveau in France, Modernisme in Catalonia, Jugendstil in Germany, the Secession style in Vienna. It flourished in a period of optimism, industrial progress and new urban leisure, and aimed to be beautiful, harmonious and thoroughly of its own moment. A total design movement, it united painting, architecture, jewellery, furniture and graphics; in painting it is embodied above all by Gustav Klimt, whose golden, patterned canvases fuse figure and ornament.",
    figures: [
      'Gustav Klimt — golden, patterned canvases',
      'Alphonse Mucha — flowing decorative posters',
    ],
    legacy:
      "Though its heyday was brief, Art Nouveau reshaped design and the decorative arts and helped modernize the visual language of Europe. Its flowing elegance remains instantly recognizable and endlessly influential.",
  },
  fovismo: {
    title: 'Fauvism',
    lead:
      "The first avant-garde movement of the 20th century — brief but explosive — built on the total liberation of colour from its duty to describe reality.",
    era: 'c. 1904–1908',
    origin: 'France',
    hallmarks: [
      'Pure, intense, often arbitrary colour straight from the tube',
      'A face might be green, a sky pink',
      'Bold, energetic brushstrokes',
      'Colour serving emotion and design, not description',
    ],
    origins:
      "Fauvism erupted in France around 1904–1908, building on the colour experiments of Van Gogh, Gauguin and the Neo-Impressionists and pushing them to a joyful extreme. Its painters used pure, intense colour to serve feeling and design rather than the appearance of things. The name came from a critic who, seeing their wild canvases at the 1905 Salon d'Automne, called the painters 'les fauves' — the wild beasts — an insult the artists proudly embraced.",
    figures: [
      'Henri Matisse — the leader',
      'André Derain, Maurice de Vlaminck',
    ],
    legacy:
      "Though it lasted only a few years, Fauvism was a decisive breakthrough. By freeing colour entirely from its duty to describe the world, it opened the way for Expressionism, abstraction and much of modern art.",
  },
  expresionismo: {
    title: 'Expressionism',
    lead:
      "The art of raw inner emotion, which deliberately distorts colour, line and form to show the world as it feels rather than as it looks.",
    era: 'early 20th c.',
    origin: 'Germany & Austria',
    hallmarks: [
      'Deliberately distorted, twisting forms',
      'Clashing colours and jagged, agitated brushwork',
      'Anxiety, passion, alienation and spiritual longing',
      'Subjective feeling over objective reality',
    ],
    origins:
      "Expressionism flourished above all in Germany and Austria in the early 20th century, growing from the tensions of a rapidly modernizing, anxious society on the brink of the First World War and drawing on the emotional force of Van Gogh, Munch and the Symbolists. Two key groups formed in Germany: Die Brücke (The Bridge), led by Kirchner, with its harsh, angular urban scenes; and Der Blaue Reiter (The Blue Rider), including Kandinsky and Franz Marc, which pursued spiritual and increasingly abstract art. In Austria, Egon Schiele pushed the body toward raw, anguished intensity.",
    figures: [
      "Kirchner — Die Brücke's harsh cities",
      'Kandinsky, Franz Marc — Der Blaue Reiter',
      'Egon Schiele — raw, anguished bodies',
    ],
    legacy:
      "Expressionism made the artist's inner feeling the true subject of art. Its emotional intensity and expressive distortion had a lasting impact, echoing through modern and contemporary painting.",
  },
  cubismo: {
    title: 'Cubism',
    lead:
      "One of the most radical revolutions in the history of Western art, which shattered objects into geometric facets and reassembled them, showing many viewpoints at once.",
    era: 'c. 1907–1914',
    origin: 'Paris',
    hallmarks: [
      'Objects fragmented into geometric planes',
      'Multiple viewpoints combined in one image',
      'The single fixed perspective abandoned',
      'Later: brighter colour, simpler shapes and collage',
    ],
    origins:
      "Cubism was pioneered in Paris by Pablo Picasso and Georges Braque between about 1907 and 1914. Abandoning the single, fixed perspective that had governed painting since the Renaissance, they treated the flat canvas as a new kind of space. Early 'Analytic' Cubism fragmented forms into near-abstract, monochrome grids; later 'Synthetic' Cubism reintroduced brighter colour, simpler shapes and even pasted materials (collage). The movement drew on Cézanne's structural painting and on African and Iberian sculpture, and reflected a modern world of new science, speed and shifting viewpoints.",
    figures: [
      'Pablo Picasso & Georges Braque — co-founders',
      'Juan Gris, Fernand Léger — later Cubists',
    ],
    legacy:
      "Cubism reinvented how a flat surface can represent form and space, and its ideas rippled outward into Futurism, abstraction and countless later movements. It is a foundation stone of 20th-century art.",
  },
  futurismo: {
    title: 'Futurism',
    lead:
      "An aggressive, forward-looking Italian avant-garde that rejected the past and glorified the speed, energy and machinery of the modern age.",
    era: 'c. 1909–1918',
    origin: 'Italy',
    hallmarks: [
      'Motion, speed and energy made visible on the canvas',
      "Figures fractured into repeated, overlapping planes and 'lines of force'",
      'Cars, machines, crowds and the electric city',
      'Fragmented forms borrowed from Cubism',
    ],
    origins:
      "Futurism was launched in 1909 with a fiery manifesto by the poet Filippo Marinetti. It worshipped speed, technology, industry and even violence and war, which it saw as forces sweeping away a stale old world. In painting, Umberto Boccioni and Giacomo Balla fractured moving figures into overlapping planes to make motion itself visible, drawing heavily on Cubism's fragmented forms. The movement extended beyond painting into sculpture, music and design, and was bound up with the turbulent politics of early-20th-century Italy.",
    figures: [
      'Umberto Boccioni — its leading artist and theorist',
      'Giacomo Balla — motion and light',
    ],
    legacy:
      "Though it faded after the First World War, Futurism's dynamic vision of movement and modernity influenced later art and design. Its attempt to paint pure speed and force remains one of modernism's boldest experiments.",
  },
  suprematismo: {
    title: 'Suprematism',
    lead:
      "A pioneering movement of pure geometric abstraction that left behind all reference to the visible world in favour of pure feeling and form.",
    era: 'from 1915',
    origin: 'Russia',
    hallmarks: [
      'Simple shapes: squares, circles, crosses and lines',
      'A limited range of colours on plain white grounds',
      'Forms floating free of gravity and objects',
      'The supremacy of pure feeling over depiction',
    ],
    origins:
      "Suprematism was founded by the Russian artist Kazimir Malevich in 1915, in the ferment surrounding the Russian Revolution. He reduced art to the barest elements — simple geometric shapes floating on white — asserting the supremacy of pure feeling and form over the depiction of objects. His stark 'Black Square' was meant as a 'zero of form,' a radical new beginning; he even hung it high in a corner, the traditional place for a religious icon. The movement was part of the explosion of avant-garde experiment in early Soviet Russia, when many believed abstract art could help build a new world and consciousness.",
    figures: [
      'Kazimir Malevich — founder',
      'El Lissitzky — carried its ideas into design',
    ],
    legacy:
      "Among the first fully abstract movements, Suprematism had a profound influence on the course of modern art and design. Its reduction of painting to pure geometry and feeling helped define abstraction itself.",
  },
  neoplasticismo: {
    title: 'Neo-Plasticism (De Stijl)',
    lead:
      "A rigorous abstract style reduced to straight lines, right angles and the three primary colours, in search of a universal harmony beneath the visible world.",
    era: 'from 1917',
    origin: 'Netherlands',
    hallmarks: [
      'Only horizontal and vertical black lines',
      'Flat planes of red, yellow and blue, with white, grey and black',
      'No curves, diagonals or recognizable objects',
      'Careful, precise balance of every proportion',
    ],
    origins:
      "Neo-Plasticism was the severe abstract style developed by the Dutch painter Piet Mondrian and championed by the De Stijl ('The Style') group he co-founded in the Netherlands in 1917. Mondrian believed that distilling painting to its absolute essentials could express a universal harmony and balance underlying the chaos of the visible world — a spiritual, almost utopian ambition rather than mere decoration. De Stijl extended these ideas beyond painting into architecture, furniture and design, aiming to reshape the whole visual environment according to pure, rational order.",
    figures: [
      'Piet Mondrian — its creator',
      'Theo van Doesburg — co-founder of De Stijl',
    ],
    legacy:
      "Neo-Plasticism became one of the most influential currents in modern art and design. Its clean geometry and primary colours shaped 20th-century architecture and graphic design, and remain instantly recognizable today.",
  },
  ukiyoe: {
    title: 'Ukiyo-e',
    lead:
      "Japanese woodblock prints and paintings of the 'floating world' — the fashionable, pleasure-seeking urban culture of the Edo period.",
    era: '17th–19th c.',
    origin: 'Japan (Edo)',
    hallmarks: [
      'Flat areas of colour and bold, elegant outlines',
      'Daring, asymmetrical, cropped compositions',
      'Cheap, popular prints made from carved wood blocks',
      'Beauties, actors, landscapes and legends',
    ],
    origins:
      "Ukiyo-e — 'pictures of the floating world' — flourished in Edo (old Tokyo) from the 17th to the 19th centuries. The 'floating world' referred to the theatres, entertainment districts, famous beauties, actors and travel of a vivid popular urban culture. Made cheaply from carved wood blocks, the prints were an affordable, popular art, and their masters ranged across portraits of courtesans and actors, dramatic landscapes and fantastical stories from myth and history.",
    figures: [
      'Utamaro — beauties (bijin-ga)',
      'Hokusai, Hiroshige — landscapes',
      'Kuniyoshi — warriors and legends',
    ],
    legacy:
      "When Japan opened to the West in the 19th century, ukiyo-e astonished European artists. This 'Japonisme' profoundly influenced the Impressionists and Post-Impressionists — Van Gogh, Monet, Degas and others — helping to shape the course of modern art.",
  },
  rinpa: {
    title: 'Rinpa School',
    lead:
      "A major tradition of classical Japanese painting celebrated for its bold, decorative beauty and lavish use of gold and silver.",
    era: 'from 17th c.',
    origin: 'Japan (Kyoto)',
    hallmarks: [
      'Simplified, stylized natural motifs as rhythmic pattern',
      'Lavish gold and silver leaf and flat, rich colour',
      "A soft 'pooled ink' technique for leaves and petals",
      'Large folding screens and panels on classical themes',
    ],
    origins:
      "Rinpa flourished from the 17th century onward, and unlike a family lineage it was a tradition passed on through admiration and imitation across generations. Its artists favoured simplified natural motifs — flowers, grasses, trees, birds and water — arranged as striking, rhythmic patterns, and often revisited themes from classical Japanese literature and poetry. Tawaraya Sōtatsu established the style, and Ogata Kōrin, whose screens of irises and plum blossoms are among its supreme achievements, carried it to its height.",
    figures: [
      'Tawaraya Sōtatsu — established the style',
      'Ogata Kōrin — irises and plum blossoms',
    ],
    legacy:
      "Rinpa's fusion of nature, pattern and precious materials had a lasting impact on Japanese design and later influenced Western decorative art and Art Nouveau. Its refined elegance remains a defining strand of Japanese aesthetics.",
  },
  hasegawa: {
    title: 'Hasegawa School',
    lead:
      "A school of Japanese painting founded in the late 16th century, celebrated above all for its atmospheric monochrome ink landscapes.",
    era: 'from late 16th c.',
    origin: 'Japan',
    hallmarks: [
      'Monochrome ink on plain paper',
      'Vast empty space used to suggest mist and silence',
      'Sparse, evocative brushwork rooted in Zen',
      'Also bold, gold-ground Momoyama screens',
    ],
    origins:
      "The Hasegawa school was founded by Hasegawa Tōhaku during the vibrant Momoyama period. Tōhaku absorbed the ideals of Chinese ink painting and the native Japanese tradition, developing a style of remarkable atmospheric subtlety — his 'Pine Trees' screens evoke a misty forest using only black ink and vast areas of empty paper, a supreme expression of suggestion, restraint and the Zen appreciation of emptiness. The school also produced richly coloured, gold-ground screens in the bold Momoyama taste, showing its range from spare ink to lavish decoration.",
    figures: [
      "Hasegawa Tōhaku — founder ('Pine Trees' screens)",
    ],
    legacy:
      "The Hasegawa school represents one of the high points of Japanese ink painting. Its balance of bold empty space and delicate, evocative brushwork is still revered as a model of contemplative beauty.",
  },
  naif: {
    title: 'Naïve Art',
    lead:
      "Art made by self-taught artists who work outside the academic tradition, without formal training in perspective, anatomy or the established rules of painting.",
    era: 'any era',
    origin: 'Worldwide',
    hallmarks: [
      'Flattened space and unconventional perspective',
      'Bright, often unrealistic colour',
      'Frank, meticulous, childlike attention to detail',
      'A dreamlike, poetic directness',
    ],
    origins:
      "Naïve artists appear all over the world and in every era, following their own vision rather than any school or fashion. Far from a weakness, their untrained directness — flattened space, unreal colour, equal childlike clarity given to everything — lends their work a dreamlike, often powerful quality. The most famous, Henri Rousseau, a French customs officer who never left France, conjured lush imaginary jungles that enchanted the Parisian avant-garde.",
    figures: [
      'Henri Rousseau — imaginary jungles',
    ],
    legacy:
      "In the 20th century modern artists came to prize naïve art precisely for its untrained freshness and imaginative freedom, seeing an authenticity that academic training could erase. It remains widely loved for its honesty and charm.",
  },
};

export const MOVEMENT_INFO_ES: Record<string, MovementInfo> = {
  renacimiento: {
    title: 'Renacimiento',
    lead:
      "El 'renacer' del arte, el saber y los ideales de la antigua Grecia y Roma, que puso al ser humano de proporciones armoniosas en el centro del arte y desató uno de los periodos más creativos de la historia.",
    era: 'ss. XIV–XVI',
    origin: 'Italia',
    hallmarks: [
      'Profundidad convincente lograda con perspectiva lineal matemática',
      'Figuras sólidas, con peso y anatomía precisa',
      'Modelado con luz y sombra para dar presencia real',
      'Equilibrio, armonía y belleza idealizada',
      'Arquitectura, mito e historia clásicos revividos',
    ],
    origins:
      "El Renacimiento arraigó en las ricas y competitivas ciudades-estado de la Italia de los siglos XIV y XV —sobre todo Florencia— y se extendió por Europa en los dos siglos siguientes. Tras la Edad Media, estudiosos y artistas revivieron conscientemente la cultura de la Antigüedad, y la filosofía del humanismo exaltó la razón, la dignidad y el potencial humanos. Lo financiaron mecenas poderosos como los banqueros Medici y los papas de Roma, que competían por el prestigio a través del arte. En este nuevo mundo el artista dejó de ser un artesano medieval anónimo para convertirse en genio individual célebre, que firmaba su obra.",
    figures: [
      'Leonardo da Vinci — el genio universal (la Gioconda)',
      'Miguel Ángel — poder heroico en pintura y mármol',
      'Rafael — gracia y armonía (La escuela de Atenas)',
      'Botticelli, Masaccio, Piero della Francesca — el primer Renacimiento',
    ],
    legacy:
      "Transformó para siempre el arte occidental, estableciendo la perspectiva, la proporción y el estudio directo de la naturaleza como sus cimientos. Sus obras maestras —la Gioconda, la bóveda Sixtina, La escuela de Atenas— siguen entre las imágenes más veneradas y reconocibles jamás creadas.",
  },
  renacimientonorte: {
    title: 'Renacimiento del Norte',
    lead:
      "El renacer renacentista tal como se dio al norte de los Alpes: absorbiendo las ideas italianas de proporción y humanismo, pero filtrándolas por un amor nórdico al detalle minucioso y la observación atenta.",
    era: 'ss. XV–XVI',
    origin: 'Alemania y los Países Bajos',
    hallmarks: [
      'Precisión casi microscópica del cabello, la tela y la luz',
      'Objetos cotidianos cargados de simbolismo oculto',
      'Color rico y luminoso gracias al nuevo medio del óleo',
      'Realismo indagador y sin idealizar, sobre todo en el retrato',
      'Grabado que difundió las imágenes por Europa',
    ],
    origins:
      "Mientras el Renacimiento florecía en Italia, un renacer paralelo se dio en Alemania, Flandes y más allá. Donde los italianos idealizaban, los nórdicos escrutaban, plasmando cada cabello y pliegue con precisión asombrosa. Su figura principal, Alberto Durero, viajó a Italia, estudió sus teorías de la proporción y las fundió con el oficio nórdico, a la vez que fue pionero del grabado. La Reforma protestante también moldeó el movimiento: al difundirse, los artistas pasaron de los retablos religiosos al retrato, el paisaje y las escenas cotidianas.",
    figures: [
      'Alberto Durero — fundió teoría italiana y oficio nórdico',
      'Hans Holbein — penetrantes retratos de la corte Tudor',
      'Jan van Eyck — luminoso realismo al óleo',
      'Pieter Bruegel — bulliciosos panoramas de vida campesina',
    ],
    legacy:
      "Legó al arte occidental algunos de sus retratos más indagadores y su amor perdurable por el detalle naturalista y el simbolismo. Esa mezcla resonaría con fuerza en la pintura holandesa y mucho más allá.",
  },
  flamenco: {
    title: 'Primitivos flamencos',
    lead:
      "Los pintores flamencos del siglo XV que estuvieron entre los primeros maestros del óleo, construyendo superficies luminosas, de un detalle que asombró a sus contemporáneos.",
    era: 's. XV',
    origin: 'Flandes',
    hallmarks: [
      'Veladuras de óleo finas y translúcidas de gran profundidad',
      'Detalle deslumbrante: reflejos, texturas, paisajes lejanos',
      'Objetos corrientes cargados de simbolismo religioso',
      'Algunas de las primeras pinturas firmadas y fechadas',
      'Pequeños paneles devocionales y grandes retablos',
    ],
    origins:
      "En las ricas ciudades comerciales de la Flandes del siglo XV —Brujas, Gante, Bruselas— un grupo de pintores transformó el arte europeo. Llamados 'primitivos' (término antiguo que significa 'primeros', no toscos), explotaron el óleo como nadie, con veladuras que hacían brillar reflejos, telas y horizontes. Trabajaban para los duques de Borgoña y prósperos mercaderes, produciendo retablos, retratos y paneles cargados de sentido, donde una vela o un espejo podían tener peso simbólico. Sus innovaciones influyeron pronto en Italia y el resto de Europa.",
    figures: [
      'Jan van Eyck — pionero de la veladura al óleo (retrato Arnolfini)',
      'Rogier van der Weyden — intensa emoción religiosa',
      'El Bosco — visiones fantásticas y moralizantes',
    ],
    legacy:
      "Los primitivos flamencos pusieron los cimientos técnicos y de observación de la pintura al óleo occidental. Su unión de realismo asombroso y simbolismo oculto es uno de los grandes logros del arte europeo y moldeó la tradición holandesa posterior.",
  },
  veneciana: {
    title: 'Escuela veneciana',
    lead:
      "La pintura de Venecia, que primó el 'colorito' —el color, la luz y la superficie sensual— sobre el dibujo y el diseño ('disegno') que preferían Florencia y Roma.",
    era: 'ss. XV–XVI',
    origin: 'Venecia',
    hallmarks: [
      'La forma construida con manchas de color cálido, no con contornos duros',
      'Pincelada suelta y sensual al óleo',
      'Telas ricas, luz dorada y carnes voluptuosas',
      'Atmósfera y clima por encima de la precisión nítida',
      'Mitologías sensuales y grandes retratos',
    ],
    origins:
      "Venecia, la gran república marítima, desarrolló una pintura distinta a la de Italia central. Su riqueza, su comercio con Oriente y la calidad especial de su luz acuosa moldearon un estilo cálido, guiado por el color y aplicado en trazos sueltos al óleo. Giovanni Bellini abrió el camino; Giorgione trajo un nuevo tono poético; y Tiziano, el más grande, dominó la pintura europea durante medio siglo. Después, Veronés y Tintoretto llevaron la tradición al gran espectáculo.",
    figures: [
      'Giovanni Bellini — fundador, color luminoso',
      'Giorgione — clima poético y atmosférico',
      'Tiziano — el colorista supremo',
      'Veronés, Tintoretto — el gran espectáculo',
    ],
    legacy:
      "El amor veneciano por el color y la pincelada libre tuvo una influencia inmensa. Alimentó directamente el Barroco de Rubens y Velázquez y, siglos después, ayudó a inspirar la pintura suelta y colorista de los impresionistas.",
  },
  manierismo: {
    title: 'Manierismo',
    lead:
      "El estilo conscientemente elegante y artificioso de la generación posterior al Alto Renacimiento, que primó la sofisticación, el refinamiento y la extrañeza sobre el equilibrio natural.",
    era: 'c. 1520–1600',
    origin: 'Italia',
    hallmarks: [
      'Miembros imposiblemente alargados y poses inestables y retorcidas',
      'Espacio abigarrado, ambiguo y comprimido',
      'Color ácido e inesperado',
      'Elegancia ostentosa y gracia fría y cerebral',
    ],
    origins:
      "El manierismo surgió en Italia hacia 1520, en la generación posterior al Alto Renacimiento. Heredado un arte en apariencia perfecto de Leonardo, Miguel Ángel y Rafael, los pintores jóvenes buscaron no más naturalismo, sino una elegancia sabia y sofisticada: la belleza llevada a la tensión y el artificio. La palabra viene del italiano 'maniera' (estilo). Floreció en una época turbulenta de crisis religiosa y del traumático saqueo de Roma de 1527, y su inestabilidad parece un espejo de la angustia de su tiempo.",
    figures: [
      'Pontormo, Parmigianino — alargamiento elegante',
      'Bronzino — fríos y pulidos retratos de corte',
      'El Greco — intensidad espiritual y flamígera',
    ],
    legacy:
      "Largo tiempo desdeñado como decadencia del Renacimiento, hoy se valora por su inventiva y complejidad psicológica. Es el puente entre el ideal sereno del Renacimiento y el drama dinámico del Barroco.",
  },
  barroco: {
    title: 'Barroco',
    lead:
      "El arte dramático y emocional del siglo XVII, que buscaba sobre todo conmover al espectador: abrumar los sentidos y agitar las emociones mediante movimiento, espectáculo y luz intensa.",
    era: 'ss. XVII–XVIII',
    origin: 'Italia, luego toda Europa',
    hallmarks: [
      'Fuertes contrastes de luz y sombra (claroscuro)',
      'Composiciones diagonales y llenas de movimiento',
      'Gestos teatrales y realismo vívido e inmediato',
      'Grandeza pensada para abrumar los sentidos',
    ],
    origins:
      "El Barroco dominó el arte europeo a lo largo del siglo XVII y parte del XVIII. Nació en parte de la Contrarreforma católica, que usaba un arte emotivo y accesible para inspirar la fe frente al norte protestante; pero también sirvió a monarcas absolutos ansiosos de proyectar grandeza y poder. Adoptó formas distintas por Europa —apasionado y religioso en Italia y España, opulento en Flandes, íntimo en la Holanda protestante—, pero todas compartieron el gusto por el dinamismo y la luz dramática que lanzó Caravaggio.",
    figures: [
      'Caravaggio — iluminación dramática revolucionaria',
      'Rubens — energía flamenca desbordante',
      'Velázquez, Rembrandt — pincel deslumbrante y hondura',
    ],
    legacy:
      "El Barroco produjo algunas de las imágenes más poderosas del arte occidental. Su dominio de la luz, la emoción y el movimiento moldeó la pintura durante generaciones y aún define nuestra idea del relato visual dramático.",
  },
  neerlandes: {
    title: 'Siglo de Oro neerlandés',
    lead:
      "El asombroso florecimiento pictórico del siglo XVII en la próspera, protestante y recién independiente República Holandesa, que hizo del mundo cotidiano el tema del gran arte.",
    era: 's. XVII',
    origin: 'República Holandesa',
    hallmarks: [
      'Géneros cotidianos: retratos, paisajes, marinas, bodegones, interiores',
      'Luz natural honesta y atentamente observada',
      'Temas domésticos modestos tratados con esmero',
      'Obras de pequeño formato para hogares corrientes',
    ],
    origins:
      "En el siglo XVII una nación pequeña y recién independiente creó un enorme cuerpo de arte para un público amplio, en su mayoría de clase media. Sin la Iglesia ni grandes cortes como mecenas, los artistas holandeses pintaban para hogares corrientes, y los cuadros se compraban y vendían casi como cualquier mercancía en un mercado abierto y pujante. Perfeccionaron los géneros de la vida cotidiana, apreciados por su honestidad y su luz observada.",
    figures: [
      'Rembrandt — hondura psicológica y luz',
      'Vermeer — interiores serenos y luminosos',
      'Frans Hals — energía viva y desenvuelta',
    ],
    legacy:
      "El Siglo de Oro neerlandés elevó los temas cotidianos a gran arte y dio a la pintura occidental algunas de sus imágenes más queridas. Su realismo íntimo y su sutil manejo de la luz siguen conmoviendo cuatro siglos después.",
  },
  espanol: {
    title: 'Siglo de Oro español',
    lead:
      "El arte intenso, a menudo austero, de la España en la cumbre de su imperio, moldeado por una corte y una Iglesia católicas y devotas.",
    era: 'c. 1550–1660',
    origin: 'España',
    hallmarks: [
      'Realismo crudo e intensa espiritualidad',
      'Fuertes contrastes de luz y sombra',
      'Tono grave y ceremonial, incluso en los retratos reales',
      'Temas que van de la austeridad ascética a la rica sensualidad',
    ],
    origins:
      "El Siglo de Oro español, de hacia 1550 a 1660, coincidió con la cumbre de su imperio y produjo un arte de gran intensidad emocional y religiosa. Sirvió a la monarquía de los Habsburgo y a la Iglesia de la Contrarreforma, decorando palacios, conventos y catedrales; incluso sus retratos reales llevan una gravedad ceremonial muy española. Sus maestros van de El Greco, cuyas figuras alargadas se elevan hacia lo divino, a Velázquez, pintor de corte de sutileza y verdad sin par.",
    figures: [
      'El Greco — figuras alargadas y extáticas',
      'Velázquez — verdad y sutileza inigualables',
      'Zurbarán, Ribera — grave realismo sacro',
    ],
    legacy:
      "El Siglo de Oro español dio al mundo algunas de sus pinturas religiosas más hondas y, en Velázquez, a uno de los mayores pintores de todos los tiempos, cuya honestidad y técnica inspirarían por igual a Goya, Manet y Picasso.",
  },
  neoclasicismo: {
    title: 'Neoclasicismo y arte académico',
    lead:
      "Un retorno deliberado a la noble simplicidad y la seriedad moral de la antigua Grecia y Roma, en reacción a la frivolidad del Rococó y el exceso del Barroco tardío.",
    era: 'mediados s. XVIII–XIX',
    origin: 'Francia e Italia',
    hallmarks: [
      'Línea clara y escultórica, dibujo firme',
      'Color sobrio y contenido, composición equilibrada',
      'Temas elevados: cívicos, heroicos o morales',
      'El sentimiento disciplinado por el orden y la razón',
    ],
    origins:
      "El neoclasicismo surgió a mediados del siglo XVIII, impulsado por las excavaciones de Pompeya y Herculano, que pusieron el mundo antiguo vívidamente ante los ojos europeos. Buscaba la virtud y la razón más que el mero placer, y su maestro supremo, Jacques-Louis David, pintó severos dramas morales que fueron emblema primero de la Revolución francesa y luego del imperio de Napoleón. Se volvió el estilo oficial de las academias, y este arte 'académico' dominó los salones del siglo XIX hasta que las vanguardias lo cuestionaron.",
    figures: [
      'Jacques-Louis David — severos dramas revolucionarios',
      'Ingres — clasicismo frío y preciso',
    ],
    legacy:
      "Aunque los rebeldes posteriores rechazaran sus reglas, el neoclasicismo definió durante un siglo qué era la pintura seria en Europa. Su claridad, disciplina y reverencia por la Antigüedad siguen siendo una corriente perdurable.",
  },
  romanticismo: {
    title: 'Romanticismo',
    lead:
      "Una revuelta apasionada contra el orden neoclásico y la razón ilustrada, que exaltó la emoción, la imaginación y el individuo por encima de las reglas.",
    era: 'finales s. XVIII–XIX',
    origin: 'Europa',
    hallmarks: [
      'Lo sublime: pavor, terror y asombro ante la naturaleza salvaje',
      'Color audaz y energía cargada y dinámica',
      'Tormentas, naufragios, ruinas, tierras exóticas y luchas heroicas',
      'La visión interior del artista como fuente verdadera del arte',
    ],
    origins:
      "El Romanticismo recorrió el arte europeo a finales del siglo XVIII y principios del XIX, en una época de revolución, agitación, nuevos nacionalismos y anhelo de autenticidad y misterio. Reaccionó contra la fría contención del neoclasicismo, primando el sentimiento y la vida interior del artista. En Francia, Géricault y Delacroix pintaron escenas turbulentas de drama y revuelta; en Alemania, Caspar David Friedrich convirtió figuras solitarias ante vastos paisajes en meditaciones sobre el alma; en Gran Bretaña, Turner disolvió el mundo en luz.",
    figures: [
      'Géricault, Delacroix — drama turbulento francés',
      'Caspar David Friedrich — el alma solitaria en la naturaleza',
      'Turner — el mundo disuelto en luz',
    ],
    legacy:
      "El Romanticismo liberó el color, el sentimiento y la subjetividad en la pintura, y su exaltación de la expresión individual abrió el camino a buena parte del arte moderno. Sus imágenes del poder de la naturaleza y del yo solitario aún resuenan hondo.",
  },
  realismo: {
    title: 'Realismo',
    lead:
      "La insistencia en representar el mundo ordinario con honestidad, tal como es, rechazando tanto el idealismo neoclásico como la fantasía romántica.",
    era: 'mediados s. XIX',
    origin: 'Francia',
    hallmarks: [
      'Temas nada glamurosos: campesinos, obreros, lavanderas, vida diaria',
      'Temas humildes pintados a gran escala, con seriedad',
      'Observación veraz por encima del adorno',
      'Una dignidad callada, a veces con nota de protesta social',
    ],
    origins:
      "El Realismo surgió en Francia hacia las décadas de 1840 y 1850, en una era de revolución política y cambio industrial, cuando artistas y escritores se volcaron en las condiciones sociales y la vida de la gente corriente. Llevó al lienzo temas antes indignos del arte 'serio' —los pobres del campo y la ciudad— y los pintó a la gran escala reservada a dioses y héroes, dándoles una dignidad callada. Courbet lideró el movimiento con provocación deliberada, y Millet dio al trabajo rural una gravedad monumental, casi sagrada.",
    figures: [
      'Gustave Courbet — líder provocador',
      'Jean-François Millet — el campesino monumental',
    ],
    legacy:
      "Al liberar la pintura del mito y la idealización y anclarla en la realidad observada, el Realismo abrió la puerta al arte moderno. Su atención honesta a la vida cotidiana alimentó directamente el Impresionismo y lo que vino después.",
  },
  realismosocial: {
    title: 'Realismo social',
    lead:
      "Un realismo que dirige su mirada honesta específicamente a la realidad social y política —la pobreza, el trabajo, la desigualdad, la injusticia— con un estilo llano y directo que da testimonio.",
    era: 'ss. XIX–XX',
    origin: 'Todo el mundo',
    hallmarks: [
      'Los pobres, los explotados y los trabajadores en el centro',
      'Un estilo llano y sin sentimentalismo que confronta la dureza',
      'Una llamada a la empatía, la conciencia o la denuncia',
      'El trabajo y la lucha donde antes estaban héroes o dioses',
    ],
    origins:
      "El realismo social es una corriente dentro del arte realista que apareció por todo el mundo desde el siglo XIX, allí donde la industrialización, la migración y la desigualdad generaban sufrimiento visible, incluida América Latina, donde los pintores retrataron a los pobres urbanos y los desposeídos. En vez de idealizar o entretener, confronta al espectador con los parados, los explotados y los hambrientos. Está muy ligado a los movimientos de reforma social.",
    figures: [
      'Ernesto de la Cárcova — protesta social argentina',
      'Reinaldo Giudici — los pobres de la ciudad',
    ],
    legacy:
      "El realismo social dio al arte una voz moral y política, recordando al espectador realidades fáciles de ignorar. Su tradición del arte como testigo y conciencia siguió con fuerza en el siglo XX.",
  },
  realismoamericano: {
    title: 'Realismo y Regionalismo estadounidense',
    lead:
      "El impulso, a finales del siglo XIX y principios del XX, de retratar la vida estadounidense de forma directa y veraz, en vez de a través de ideales europeos prestados.",
    era: 'finales s. XIX–XX',
    origin: 'Estados Unidos',
    hallmarks: [
      'Escenas cotidianas: calles, granjas, marineros, obreros',
      'Observación fresca y sin sentimentalismo',
      'El foco del Regionalismo en la vida rural y del interior del país',
      'Quietud y soledad en la ciudad moderna',
    ],
    origins:
      "A medida que Estados Unidos crecía como potencia, sus artistas buscaron una identidad visual propia y segura, arraigada en las escenas y gentes del país. Los realistas pintaron lo cotidiano con ojos frescos y sin sentimentalismo; las vigorosas escenas de mar e infancia rural de Winslow Homer son ejemplos clásicos. En los años treinta, durante la Depresión, el Regionalismo celebró la América rural y de pueblo como respuesta propia al modernismo europeo, mientras Edward Hopper destilaba la corriente en imágenes de quietud y soledad moderna.",
    figures: [
      'Winslow Homer — el mar y la vida rural',
      "Grant Wood — Regionalismo del interior ('American Gothic')",
      'Edward Hopper — la soledad moderna',
    ],
    legacy:
      "Juntos, estos artistas forjaron un arte estadounidense propio y seguro, arraigado en la escena y el carácter locales, dando a la joven nación imágenes que sentía auténticamente suyas.",
  },
  costumbrismo: {
    title: 'Costumbrismo',
    lead:
      "La representación afectuosa de las costumbres, el vestido, los 'tipos' y la vida diaria de un lugar y un pueblo concretos, tratando lo local y ordinario como tema digno.",
    era: 's. XIX',
    origin: 'España y América Latina',
    hallmarks: [
      'Escenas de mercados, fiestas, bailes populares y pulperías',
      "Traje regional y 'tipos' populares",
      'Pintura de género cálida, detallada y atentamente observada',
      'El gaucho, el huaso, el vendedor, el baile rural',
    ],
    origins:
      "El costumbrismo floreció sobre todo en la España y la América Latina del siglo XIX. En lugar de la gran historia o el mito, sus pintores registraron la textura de una sociedad —su trabajo, ocio, ritos y personajes— con calidez y detalle. El movimiento surgió junto al nacionalismo decimonónico, cuando las naciones recién independizadas buscaban definir su identidad a través de su propia tierra, gente y tradiciones.",
    figures: [
      'Manuel Antonio Caro — el baile nacional de Chile',
      'José Agustín Arrieta — la vida diaria mexicana',
    ],
    legacy:
      "El costumbrismo dejó un registro visual inestimable de modos de vida y cultura popular que desaparecían. Cálido, observador y arraigado en el lugar, sigue siendo central en el patrimonio artístico de muchos países hispanohablantes.",
  },
  hudson: {
    title: 'Escuela del río Hudson',
    lead:
      "El primer gran movimiento paisajístico del arte estadounidense, que representó la naturaleza salvaje del Nuevo Mundo como algo vasto, sublime y dado por Dios.",
    era: '1820–1870',
    origin: 'Estados Unidos',
    hallmarks: [
      'Escala grandiosa y sobrecogedora',
      'Montañas, bosques, ríos y cielos luminosos',
      'Luz resplandeciente y dramática',
      'La tierra indómita como algo nacional e incluso divino',
    ],
    origins:
      "La Escuela del río Hudson tomó su nombre del pintoresco valle de ese río en Nueva York, donde sus fundadores pintaron por primera vez en la década de 1820. Surgió cuando el joven Estados Unidos se expandía hacia el oeste y forjaba una identidad nacional, presentando lo salvaje como fuente de orgullo e incluso destino divino. Thomas Cole fundó el movimiento y le dio una dimensión moral —algunas de sus obras lamentan en voz baja la pérdida de la tierra ante el desarrollo—, mientras una generación posterior llevó el panorama a lo espectacular.",
    figures: [
      'Thomas Cole — fundador, visión moral y espiritual',
      'Frederic Church, Albert Bierstadt — vastos panoramas',
    ],
    legacy:
      "La Escuela del río Hudson estableció el paisaje como tema serio del arte estadounidense y moldeó cómo la nación veía su propia tierra. Su visión sublime de lo salvaje sigue siendo una piedra angular del arte de EE. UU.",
  },
  impresionismo: {
    title: 'Impresionismo',
    lead:
      "Una rebelión contra la pintura académica que buscó captar los efectos fugaces de la luz, el color y la atmósfera en un solo instante: uno de los movimientos más queridos de la historia del arte.",
    era: '1860–1880',
    origin: 'París',
    hallmarks: [
      'Pinceladas sueltas y fragmentadas',
      'Colores vivos y sin mezclar',
      'A menudo pintado deprisa, al aire libre, ante el motivo',
      'Temas modernos: cafés, bulevares, jardines, estaciones, ocio',
    ],
    origins:
      "El Impresionismo nació en el París de las décadas de 1860 y 70 como revuelta contra las rígidas convenciones del Salón oficial y la pintura académica. Sus artistas trabajaban deprisa, a menudo al aire libre, con pinceladas sueltas y color vivo para registrar la 'impresión' inmediata de una escena antes que su detalle fijo, tomando como tema el mundo moderno. El nombre vino de una reseña burlona de 'Impresión, sol naciente' de Monet en la primera exposición independiente del grupo, en 1874.",
    figures: [
      'Claude Monet — luz y atmósfera',
      'Renoir, Degas, Pissarro',
      'Morisot, Cassatt, Sisley, Caillebotte',
    ],
    legacy:
      "El Impresionismo transformó el arte al primar la percepción, la espontaneidad y la vida moderna cotidiana. Liberó el color y la pincelada de la mera descripción y abrió la puerta a toda la aventura de la pintura moderna.",
  },
  posimpresionismo: {
    title: 'Postimpresionismo',
    lead:
      "El arte diverso que partió del color vivo del Impresionismo pero lo empujó más allá, hacia mayor estructura, emoción, simbolismo y expresión personal.",
    era: '1880–1900',
    origin: 'Francia',
    hallmarks: [
      'Color vivo usado para el sentimiento y el sentido, no solo la luz',
      'Mayor estructura, simbolismo y expresión interior',
      'Estilos muy personales e individuales',
      'Más allá del instante óptico fugaz',
    ],
    origins:
      "Postimpresionismo es el término para el arte variado que surgió en la Francia de las décadas de 1880 y 90, que conservó el color del Impresionismo pero rechazó su foco en el instante. Sus artistas nunca formaron un grupo único; cada uno siguió su camino, convencidos de que la pintura debía expresar más de lo que el ojo solo percibe, y su obra a menudo fue incomprendida en vida. Cézanne reconstruyó la naturaleza con planos geométricos; Van Gogh cargó sus lienzos de color y emoción; Seurat aplicó el color con rigor científico; Gauguin aplanó la forma en busca de un arte simbólico.",
    figures: [
      'Cézanne — la forma con planos geométricos',
      'Van Gogh — color y emoción intensos',
      'Gauguin — color plano y simbólico',
      'Seurat — color científico (puntillismo)',
    ],
    legacy:
      "El Postimpresionismo fue el puente crucial hacia el arte moderno del siglo XX. Van Gogh, Cézanne y Gauguin, en particular, fueron influencias colosales sobre el expresionismo, el cubismo, el fovismo y casi todo lo que siguió.",
  },
  neoimpresionismo: {
    title: 'Neoimpresionismo (puntillismo)',
    lead:
      "Un desarrollo sistemático y científico del Impresionismo que construía imágenes luminosas a partir de incontables puntos pequeños de color puro y sin mezclar.",
    era: '1880–1890',
    origin: 'Francia',
    hallmarks: [
      'Puntillismo: diminutos puntos separados de color sin mezclar',
      'Colores mezclados por el ojo, no en la paleta',
      'Una calma cristalina, quieta y ordenada',
      'Un método minucioso, casi meditativo',
    ],
    origins:
      "El Neoimpresionismo surgió en la Francia de la década de 1880 como un desarrollo más racional y disciplinado del Impresionismo. Donde los impresionistas trabajaban por instinto, sus artistas aplicaron teorías del color y la óptica, colocando puntos de color puro uno junto a otro para que el ojo los mezclara en tonos, en teoría, más brillantes que la pintura mezclada. Seurat fue el pionero; Signac, su principal defensor y teórico. El movimiento reflejaba una fe finisecular en la ciencia y el orden.",
    figures: [
      'Georges Seurat — pionero del método',
      'Paul Signac — su principal defensor y teórico',
    ],
    legacy:
      "Aunque efímero como método estricto, el Neoimpresionismo influyó en muchos artistas posteriores, incluidos Matisse y los fauvistas. Su uso audaz y analítico del color puro ayudó a empujar la pintura hacia la abstracción.",
  },
  simbolismo: {
    title: 'Simbolismo',
    lead:
      "Un giro hacia dentro —hacia el sueño, el mito, la emoción y la imaginación— en reacción al Realismo y el Impresionismo, volcados hacia fuera.",
    era: '1880–1900',
    origin: 'Francia y Bélgica',
    hallmarks: [
      'Sugerencia, clima y metáfora antes que la representación literal',
      'Temas de amor, muerte, deseo, misterio y lo espiritual',
      'Imágenes enigmáticas, a menudo inquietantes y oníricas',
      'La subjetividad y la vida interior',
    ],
    origins:
      "El Simbolismo surgió en la década de 1880, sobre todo en Francia y Bélgica, extendiéndose por Europa. Donde el Realismo y el Impresionismo miraban hacia fuera, al mundo visible, el Simbolismo se volvió hacia dentro, usando imágenes evocadoras, clima y metáfora para insinuar ideas y sentimientos que no podían mostrarse de forma literal. Fue paralelo a la poesía simbolista y reflejó un ánimo finisecular de introspección, búsqueda espiritual e inquietud.",
    figures: [
      'Gustave Moreau, Odilon Redon — visionarios franceses',
      'Edvard Munch — angustia y deseo',
      'Gustav Klimt — alegoría sensual y ornamental',
    ],
    legacy:
      "El énfasis del Simbolismo en la imaginación, el subconsciente y el poder emocional de la imagen influyó hondo en el arte del siglo XX, alimentando directamente el expresionismo y, después, el surrealismo.",
  },
  modernismo: {
    title: 'Modernismo / Art Nouveau',
    lead:
      "Un movimiento decorativo de fin de siglo que buscó un estilo nuevo y moderno, libre de imitación histórica, tomando sus formas de la naturaleza.",
    era: 'c. 1890–1910',
    origin: 'Europa',
    hallmarks: [
      "Líneas sinuosas y ondulantes 'de latigazo'",
      'Formas orgánicas de plantas y flores',
      'Patrón elegante y ornamental',
      'Un estilo total que une arte, arquitectura, vidrio y diseño',
    ],
    origins:
      "Hacia 1900 un movimiento decorativo recorrió Europa con muchos nombres: Art Nouveau en Francia, Modernisme en Cataluña, Jugendstil en Alemania, la Secesión en Viena. Floreció en una época de optimismo, progreso industrial y nuevo ocio urbano, y buscó ser bello, armonioso y enteramente de su tiempo. Movimiento de diseño total, unió pintura, arquitectura, joyería, mobiliario y grafismo; en pintura lo encarna sobre todo Gustav Klimt.",
    figures: [
      'Gustav Klimt — lienzos dorados y ornamentales',
      'Alphonse Mucha — carteles decorativos y fluidos',
    ],
    legacy:
      "Aunque su auge fue breve, el Art Nouveau reformó el diseño y las artes decorativas y ayudó a modernizar el lenguaje visual de Europa. Su elegancia fluida sigue siendo reconocible al instante.",
  },
  fovismo: {
    title: 'Fovismo',
    lead:
      "El primer movimiento de vanguardia del siglo XX —breve pero explosivo—, construido sobre la liberación total del color de su deber de describir la realidad.",
    era: 'c. 1904–1908',
    origin: 'Francia',
    hallmarks: [
      'Color puro, intenso y a menudo arbitrario, directo del tubo',
      'Una cara podía ser verde; un cielo, rosa',
      'Pinceladas audaces y enérgicas',
      'El color al servicio de la emoción y el diseño, no de la descripción',
    ],
    origins:
      "El fovismo estalló en Francia hacia 1904–1908, partiendo de los experimentos de color de Van Gogh, Gauguin y los neoimpresionistas y llevándolos a un extremo gozoso. Sus pintores usaban color puro e intenso al servicio del sentimiento antes que de la apariencia de las cosas. El nombre vino de un crítico que, al ver sus lienzos salvajes en el Salón de Otoño de 1905, llamó a los pintores 'les fauves' —las fieras—, un insulto que los artistas asumieron con orgullo.",
    figures: [
      'Henri Matisse — el líder',
      'André Derain, Maurice de Vlaminck',
    ],
    legacy:
      "Aunque duró solo unos años, el fovismo fue un avance decisivo. Al liberar el color por completo de su deber de describir el mundo, abrió el camino al expresionismo, la abstracción y buena parte del arte moderno.",
  },
  expresionismo: {
    title: 'Expresionismo',
    lead:
      "El arte de la emoción interior en bruto, que deforma deliberadamente el color, la línea y la forma para mostrar el mundo tal como se siente, no como se ve.",
    era: 'principios s. XX',
    origin: 'Alemania y Austria',
    hallmarks: [
      'Formas retorcidas y deliberadamente deformadas',
      'Colores chocantes y pincelada crispada y agitada',
      'Angustia, pasión, alienación y anhelo espiritual',
      'El sentimiento subjetivo por encima de la realidad objetiva',
    ],
    origins:
      "El expresionismo floreció sobre todo en la Alemania y la Austria de principios del siglo XX, nacido de las tensiones de una sociedad que se modernizaba a toda prisa al borde de la Primera Guerra Mundial, y bebiendo de la fuerza emocional de Van Gogh, Munch y los simbolistas. En Alemania se formaron dos grupos clave: Die Brücke (El Puente), con Kirchner y sus duras escenas urbanas; y Der Blaue Reiter (El Jinete Azul), con Kandinsky y Franz Marc, hacia lo espiritual y abstracto. En Austria, Egon Schiele llevó el cuerpo a una intensidad angustiada.",
    figures: [
      'Kirchner — las duras ciudades de Die Brücke',
      'Kandinsky, Franz Marc — Der Blaue Reiter',
      'Egon Schiele — cuerpos crudos y angustiados',
    ],
    legacy:
      "El expresionismo hizo del sentimiento interior del artista el verdadero tema del arte. Su intensidad emocional y su distorsión expresiva tuvieron un impacto duradero, resonando en la pintura moderna y contemporánea.",
  },
  cubismo: {
    title: 'Cubismo',
    lead:
      "Una de las revoluciones más radicales de la historia del arte occidental, que fragmentó los objetos en facetas geométricas y los recompuso, mostrando muchos puntos de vista a la vez.",
    era: 'c. 1907–1914',
    origin: 'París',
    hallmarks: [
      'Objetos fragmentados en planos geométricos',
      'Múltiples puntos de vista combinados en una imagen',
      'Abandono de la perspectiva única y fija',
      'Después: color más vivo, formas simples y collage',
    ],
    origins:
      "El cubismo fue creado en París por Pablo Picasso y Georges Braque entre hacia 1907 y 1914. Abandonando la perspectiva única y fija que regía la pintura desde el Renacimiento, trataron el lienzo plano como un nuevo tipo de espacio. El cubismo 'analítico' inicial fragmentaba las formas en rejillas casi abstractas y monocromas; el 'sintético' posterior reintrodujo color más vivo, formas simples y hasta materiales pegados (collage). Bebió de la pintura estructural de Cézanne y de la escultura africana e ibérica.",
    figures: [
      'Pablo Picasso y Georges Braque — cofundadores',
      'Juan Gris, Fernand Léger — cubistas posteriores',
    ],
    legacy:
      "El cubismo reinventó cómo una superficie plana puede representar la forma y el espacio, y sus ideas se propagaron al futurismo, la abstracción y un sinfín de movimientos. Es una piedra angular del arte del siglo XX.",
  },
  futurismo: {
    title: 'Futurismo',
    lead:
      "Una vanguardia italiana agresiva y volcada al porvenir, que rechazó el pasado y glorificó la velocidad, la energía y la máquina de la era moderna.",
    era: 'c. 1909–1918',
    origin: 'Italia',
    hallmarks: [
      'El movimiento, la velocidad y la energía hechos visibles',
      "Figuras fragmentadas en planos superpuestos y 'líneas de fuerza'",
      'Autos, máquinas, multitudes y la ciudad eléctrica',
      'Formas fragmentadas tomadas del cubismo',
    ],
    origins:
      "El futurismo se lanzó en 1909 con un manifiesto encendido del poeta Filippo Marinetti. Adoró la velocidad, la técnica, la industria e incluso la violencia y la guerra, que veía como fuerzas que barrían un viejo mundo rancio. En pintura, Umberto Boccioni y Giacomo Balla fragmentaban las figuras en movimiento en planos superpuestos para hacer visible el propio movimiento, bebiendo del cubismo. El movimiento se extendió a la escultura, la música y el diseño.",
    figures: [
      'Umberto Boccioni — su artista y teórico principal',
      'Giacomo Balla — movimiento y luz',
    ],
    legacy:
      "Aunque decayó tras la Primera Guerra Mundial, la visión dinámica del futurismo influyó en el arte y el diseño posteriores. Su intento de pintar la pura velocidad y fuerza sigue siendo uno de los experimentos más audaces del modernismo.",
  },
  suprematismo: {
    title: 'Suprematismo',
    lead:
      "Un movimiento pionero de abstracción geométrica pura que dejó atrás toda referencia al mundo visible en favor del puro sentimiento y la pura forma.",
    era: 'desde 1915',
    origin: 'Rusia',
    hallmarks: [
      'Formas simples: cuadrados, círculos, cruces y líneas',
      'Una gama limitada de colores sobre fondos blancos',
      'Formas que flotan libres de la gravedad y los objetos',
      'La supremacía del puro sentimiento sobre la representación',
    ],
    origins:
      "El suprematismo fue fundado por el ruso Kazimir Malévich en 1915, en la efervescencia en torno a la Revolución rusa. Redujo el arte a los elementos más básicos —formas geométricas simples que flotan sobre blanco—, afirmando la supremacía del puro sentimiento y la forma sobre la representación de objetos. Su austero 'Cuadrado negro' pretendía ser un 'grado cero de la forma', un nuevo comienzo radical; incluso lo colgó en alto, en un rincón, el lugar tradicional de un icono religioso.",
    figures: [
      'Kazimir Malévich — fundador',
      'El Lissitzky — llevó sus ideas al diseño',
    ],
    legacy:
      "Entre los primeros movimientos plenamente abstractos, el suprematismo tuvo una influencia profunda en el rumbo del arte y el diseño modernos. Su reducción de la pintura a pura geometría y sentimiento ayudó a definir la abstracción misma.",
  },
  neoplasticismo: {
    title: 'Neoplasticismo (De Stijl)',
    lead:
      "Un estilo abstracto riguroso reducido a líneas rectas, ángulos rectos y los tres colores primarios, en busca de una armonía universal bajo el mundo visible.",
    era: 'desde 1917',
    origin: 'Países Bajos',
    hallmarks: [
      'Solo líneas negras horizontales y verticales',
      'Planos planos de rojo, amarillo y azul, con blanco, gris y negro',
      'Sin curvas, diagonales ni objetos reconocibles',
      'Un equilibrio cuidado y preciso de cada proporción',
    ],
    origins:
      "El neoplasticismo fue el severo estilo abstracto desarrollado por el pintor holandés Piet Mondrian y defendido por el grupo De Stijl ('El Estilo'), que cofundó en los Países Bajos en 1917. Mondrian creía que destilar la pintura a sus elementos absolutos podía expresar una armonía y un equilibrio universales bajo el caos del mundo visible: una ambición espiritual, casi utópica, más que mera decoración. De Stijl llevó estas ideas más allá de la pintura, a la arquitectura y el diseño.",
    figures: [
      'Piet Mondrian — su creador',
      'Theo van Doesburg — cofundador de De Stijl',
    ],
    legacy:
      "El neoplasticismo se volvió una de las corrientes más influyentes del arte y el diseño modernos. Su geometría limpia y sus colores primarios moldearon la arquitectura y el diseño gráfico del siglo XX, y siguen siendo reconocibles al instante.",
  },
  ukiyoe: {
    title: 'Ukiyo-e',
    lead:
      "Estampas y pinturas japonesas del 'mundo flotante': la cultura urbana elegante y hedonista del periodo Edo.",
    era: 'ss. XVII–XIX',
    origin: 'Japón (Edo)',
    hallmarks: [
      'Zonas planas de color y contornos audaces y elegantes',
      'Composiciones atrevidas, asimétricas y recortadas',
      'Estampas baratas y populares hechas con bloques de madera',
      'Beldades, actores, paisajes y leyendas',
    ],
    origins:
      "El ukiyo-e —'imágenes del mundo flotante'— floreció en Edo (el viejo Tokio) del siglo XVII al XIX. El 'mundo flotante' aludía a los teatros, los barrios de placer, las beldades célebres, los actores y los viajes de una vívida cultura urbana popular. Hechas de forma barata con bloques de madera tallados, las estampas fueron un arte asequible y popular, con temas que iban de cortesanas y actores a paisajes y relatos fantásticos.",
    figures: [
      'Utamaro — beldades (bijin-ga)',
      'Hokusai, Hiroshige — paisajes',
      'Kuniyoshi — guerreros y leyendas',
    ],
    legacy:
      "Cuando Japón se abrió a Occidente en el siglo XIX, el ukiyo-e asombró a los artistas europeos. Este 'japonismo' influyó hondo en impresionistas y postimpresionistas —Van Gogh, Monet, Degas y otros—, ayudando a moldear el rumbo del arte moderno.",
  },
  rinpa: {
    title: 'Escuela Rinpa',
    lead:
      "Una gran tradición de la pintura japonesa clásica, célebre por su belleza decorativa audaz y su uso lujoso del oro y la plata.",
    era: 'desde s. XVII',
    origin: 'Japón (Kioto)',
    hallmarks: [
      'Motivos naturales simplificados como patrón rítmico',
      'Lujoso pan de oro y plata y color plano y rico',
      "Una suave técnica de 'tinta encharcada' para hojas y pétalos",
      'Grandes biombos y paneles sobre temas clásicos',
    ],
    origins:
      "La Rinpa floreció desde el siglo XVII y, a diferencia de un linaje familiar, fue una tradición transmitida por admiración e imitación a lo largo de generaciones. Sus artistas prefirieron motivos naturales simplificados —flores, hierbas, árboles, aves y agua— dispuestos como patrones rítmicos, y a menudo revisitaron temas de la literatura clásica japonesa. Sōtatsu estableció el estilo, y Ogata Kōrin, cuyos biombos de lirios y ciruelos están entre sus cumbres, lo llevó a su apogeo.",
    figures: [
      'Tawaraya Sōtatsu — estableció el estilo',
      'Ogata Kōrin — lirios y ciruelos en flor',
    ],
    legacy:
      "La fusión Rinpa de naturaleza, patrón y materiales preciosos tuvo un impacto duradero en el diseño japonés y luego influyó en el arte decorativo occidental y el Art Nouveau. Su elegancia refinada sigue siendo una vertiente definitoria de la estética japonesa.",
  },
  hasegawa: {
    title: 'Escuela Hasegawa',
    lead:
      "Una escuela de pintura japonesa fundada a finales del siglo XVI, célebre sobre todo por sus atmosféricos paisajes a tinta monocroma.",
    era: 'desde finales s. XVI',
    origin: 'Japón',
    hallmarks: [
      'Tinta monocroma sobre papel',
      'Vastos espacios vacíos para sugerir niebla y silencio',
      'Pincelada parca y evocadora, de raíz zen',
      'También audaces biombos de fondo dorado del periodo Momoyama',
    ],
    origins:
      "La escuela Hasegawa fue fundada por Hasegawa Tōhaku durante el vibrante periodo Momoyama. Tōhaku absorbió los ideales de la pintura china a tinta y la tradición japonesa, desarrollando un estilo de notable sutileza atmosférica: sus biombos de 'Pinos' evocan un bosque brumoso usando solo tinta negra y vastos espacios de papel vacío, suprema expresión de la sugerencia, la contención y el aprecio zen por el vacío. La escuela también produjo biombos de fondo dorado al gusto Momoyama.",
    figures: [
      "Hasegawa Tōhaku — fundador (biombos de 'Pinos')",
    ],
    legacy:
      "La escuela Hasegawa representa una de las cumbres de la pintura japonesa a tinta. Su equilibrio entre el vacío audaz y la pincelada delicada y evocadora se venera aún como modelo de belleza contemplativa.",
  },
  naif: {
    title: 'Arte naíf',
    lead:
      "Arte hecho por artistas autodidactas que trabajan al margen de la tradición académica, sin formación en perspectiva, anatomía ni las reglas establecidas de la pintura.",
    era: 'cualquier época',
    origin: 'Todo el mundo',
    hallmarks: [
      'Espacio aplanado y perspectiva no convencional',
      'Color vivo, a menudo poco realista',
      'Atención franca, minuciosa e infantil al detalle',
      'Una franqueza onírica y poética',
    ],
    origins:
      "Los artistas naíf aparecen por todo el mundo y en toda época, siguiendo su propia visión antes que escuela o moda alguna. Lejos de ser un defecto, su franqueza sin formación —espacio aplanado, color irreal, la misma claridad infantil dada a todo— presta a su obra una cualidad onírica, a menudo poderosa. El más famoso, Henri Rousseau, un aduanero francés que nunca salió de Francia, conjuró selvas imaginarias que encantaron a la vanguardia parisina.",
    figures: [
      'Henri Rousseau — selvas imaginarias',
    ],
    legacy:
      "En el siglo XX los artistas modernos apreciaron el arte naíf justamente por su frescura sin formación y su libertad imaginativa, viendo una autenticidad que la enseñanza académica podía borrar. Sigue siendo muy querido por su honestidad y su encanto.",
  },
};

/** French movement descriptions (falls back to English). */
export const MOVEMENT_INFO_FR: Record<string, MovementInfo> = {
  renacimiento: {
    title: 'Renaissance',
    lead:
      "La « renaissance » de l'art, du savoir et des idéaux de la Grèce et de la Rome antiques, qui plaça l'être humain aux proportions harmonieuses au centre de l'art et déclencha l'une des périodes les plus créatives de l'histoire.",
    era: 'XIVe–XVIe s.',
    origin: 'Italie',
    hallmarks: [
      'Une profondeur convaincante bâtie par la perspective linéaire mathématique',
      'Des figures anatomiquement justes, solides et pleines de poids',
      'Un modelé par la lumière et l\'ombre pour une présence réelle',
      'Équilibre, harmonie et beauté idéalisée',
      'Architecture, mythes et histoire classiques ressuscités',
    ],
    origins:
      "La Renaissance prit racine dans les cités-États riches et rivales de l'Italie des XIVe et XVe siècles — Florence avant tout — et se répandit à travers l'Europe au cours des deux siècles suivants. Après le Moyen Âge, savants et artistes ressuscitèrent consciemment la culture de l'Antiquité, et la philosophie de l'humanisme prisa la raison, la dignité et le potentiel humains. Elle fut financée par de puissants mécènes comme les banquiers Médicis et les papes de Rome, qui rivalisaient de prestige par l'art. La première Renaissance débuta à Florence avec Masaccio, Botticelli et Fra Angelico ; vers 1500 elle atteignit son sommet éblouissant, la Haute Renaissance, à Florence et à Rome. Dans ce monde nouveau, l'artiste passa d'anonyme artisan médiéval à génie individuel célébré, signant son œuvre et retenu par son nom.",
    figures: [
      'Léonard de Vinci — le génie universel (la Joconde)',
      'Michel-Ange — la puissance héroïque en peinture et en marbre',
      'Raphaël — grâce et harmonie (L\'École d\'Athènes)',
      'Botticelli, Masaccio, Piero della Francesca — la première Renaissance',
    ],
    legacy:
      "Elle refaçonna durablement l'art occidental, établissant la perspective, la proportion et l'étude directe de la nature comme ses fondements. Ses chefs-d'œuvre — la Joconde, le plafond de la Sixtine, L'École d'Athènes — demeurent parmi les images les plus vénérées et reconnaissables jamais créées, et fixèrent l'étalon auquel l'art européen se mesura pendant des siècles.",
  },
  renacimientonorte: {
    title: 'Renaissance du Nord',
    lead:
      "Le renouveau de la Renaissance tel qu'il se déploya au nord des Alpes — absorbant les idées italiennes de proportion et d'humanisme mais les filtrant à travers un amour tout nordique du détail minutieux et de l'observation attentive.",
    era: 'XVe–XVIe s.',
    origin: 'Allemagne et Pays-Bas',
    hallmarks: [
      'Une précision presque microscopique des cheveux, des étoffes et de la lumière',
      'Des objets du quotidien chargés de symbolisme caché',
      'Une couleur riche et lumineuse issue du nouveau médium de l\'huile',
      'Un réalisme scrutateur et non idéalisé, surtout dans les portraits',
      'La gravure, qui diffusa les images à travers l\'Europe',
    ],
    origins:
      "Tandis que la Renaissance s'épanouissait en Italie, un renouveau parallèle se déployait en Allemagne, en Flandre et au-delà. Là où les artistes italiens idéalisaient, ceux du Nord scrutaient, rendant chaque cheveu et chaque pli d'étoffe avec une précision stupéfiante. Sa figure de proue, Albrecht Dürer, voyagea en Italie, en étudia les théories de la proportion et les fondit avec le savoir-faire nordique — tout en étant pionnier de la gravure, qui porta les images à travers le continent comme jamais auparavant. Le mouvement fut aussi façonné par le bouleversement religieux de la Réforme : à mesure que le protestantisme se répandait, les artistes délaissèrent les retables religieux au profit du portrait, du paysage et des scènes de la vie quotidienne, préparant le terrain de la peinture profane ultérieure.",
    figures: [
      'Albrecht Dürer — la théorie italienne fondue au savoir-faire nordique',
      'Hans Holbein — de perçants portraits de la cour des Tudors',
      'Jan van Eyck — le réalisme lumineux de l\'huile',
      'Pieter Bruegel — des panoramas grouillants de la vie paysanne',
    ],
    legacy:
      "Elle donna à l'art occidental certains de ses portraits les plus scrutateurs et son amour durable du détail naturaliste et de la profondeur symbolique. Ce mélange d'observation précise et de sens caché résonnera puissamment à travers la peinture hollandaise et bien au-delà.",
  },
  flamenco: {
    title: 'Primitifs flamands',
    lead:
      "Les peintres flamands du XVe siècle qui furent parmi les premiers maîtres de la peinture à l'huile, bâtissant des surfaces lumineuses et précieuses d'un détail qui stupéfia leurs contemporains.",
    era: 'XVe s.',
    origin: 'Flandre',
    hallmarks: [
      'De fins glacis d\'huile translucides pour une profondeur rayonnante',
      'Un détail éblouissant — reflets, textures, paysages lointains',
      'Des objets ordinaires chargés de symbolisme religieux',
      'Certaines des premières peintures signées et datées',
      'Petits panneaux de dévotion et grands retables',
    ],
    origins:
      "Dans les riches villes marchandes de la Flandre du XVe siècle — Bruges, Gand et Bruxelles — un groupe de peintres transforma l'art européen. Connus sous le nom de primitifs flamands (un vieux terme signifiant « premiers », non « grossiers »), ils exploitèrent la peinture à l'huile comme personne, superposant de fins glacis qui faisaient scintiller de vie reflets, étoffes et horizons lointains. Ils travaillaient pour les ducs de Bourgogne et pour de prospères marchands, produisant retables, portraits et panneaux de dévotion denses de sens, où une bougie, un chien ou un miroir pouvaient porter une charge symbolique. Jan van Eyck alla jusqu'à signer et dater ses œuvres — affirmation du nouveau statut de l'artiste — et leurs innovations dans l'huile influencèrent vite l'Italie et le reste de l'Europe.",
    figures: [
      'Jan van Eyck — pionnier du glacis à l\'huile (Les Époux Arnolfini)',
      'Rogier van der Weyden — l\'intense émotion religieuse',
      'Jérôme Bosch — des visions fantastiques et moralisatrices',
    ],
    legacy:
      "Les primitifs flamands posèrent les fondements techniques et d'observation de la peinture à l'huile occidentale. Leur mariage d'un réalisme à couper le souffle et d'un symbolisme caché reste l'une des grandes réussites de l'art européen et façonna la tradition hollandaise qui suivit.",
  },
  veneciana: {
    title: 'École vénitienne',
    lead:
      "La peinture de Venise, qui prisa le « colorito » — la couleur, la lumière et la surface picturale sensuelle — au-dessus du dessin ferme et de la conception (« disegno ») en faveur à Florence et à Rome.",
    era: 'XVe–XVIe s.',
    origin: 'Venise',
    hallmarks: [
      'Une forme bâtie de taches de couleur chaude et rayonnante, non de contours durs',
      'Une touche libre et sensuelle à l\'huile',
      'Étoffes riches, lumière dorée et chairs voluptueuses',
      'L\'atmosphère et l\'ambiance plutôt que la précision aiguë',
      'Mythologies sensuelles et grands portraits',
    ],
    origins:
      "Venise, la grande république maritime, développa une école de peinture distincte de celle de l'Italie centrale. Sa richesse, son commerce avec l'Orient et la qualité particulière de sa lumière aquatique et lumineuse façonnèrent tous un style chaud, mené par la couleur, bâti non de contours durs mais de tons rayonnants appliqués en touches d'huile libres. Giovanni Bellini ouvrit la voie avec une lumière douce et lumineuse ; Giorgione apporta une nouvelle ambiance poétique ; et Titien, le plus grand de tous, domina la peinture européenne pendant un demi-siècle. Plus tard Véronèse et le Tintoret prolongèrent la tradition dans le grand spectacle. Les toiles vénitiennes étaient prisées dans toute l'Europe par les rois, les papes et les collectionneurs.",
    figures: [
      'Giovanni Bellini — fondateur, couleur lumineuse',
      'Giorgione — une ambiance poétique et atmosphérique',
      'Titien — le coloriste suprême',
      'Véronèse, le Tintoret — le grand spectacle',
    ],
    legacy:
      "L'amour vénitien de la couleur et de la touche libre eut une influence immense. Il nourrit directement le baroque de Rubens et de Vélasquez et, des siècles plus tard, contribua à inspirer la peinture libre et menée par la couleur des impressionnistes.",
  },
  manierismo: {
    title: 'Maniérisme',
    lead:
      "Le style consciemment élégant et artificiel de la génération suivant la Haute Renaissance, qui prisa la sophistication, le raffinement et l'étrangeté au détriment de l'équilibre naturel.",
    era: 'v. 1520–1600',
    origin: 'Italie',
    hallmarks: [
      'Des membres impossiblement allongés et des poses torses et instables',
      'Un espace encombré, ambigu et comprimé',
      'Une couleur acide et inattendue',
      'Une élégance ostentatoire et une grâce froide et cérébrale',
    ],
    origins:
      "Le maniérisme émergea en Italie vers 1520, dans la génération suivant la Haute Renaissance. Ayant hérité d'un art apparemment parfait de Léonard, Michel-Ange et Raphaël, les jeunes peintres ne cherchèrent pas plus de naturalisme mais une élégance savante et sophistiquée — une beauté poussée vers la tension et l'artifice. Le mot vient de l'italien « maniera », le style ou la manière : un art fait avec une élégance ostentatoire. Il fleurit à une époque troublée de crise religieuse et du traumatisant sac de Rome de 1527, et son instabilité et son malaise peuvent sembler un miroir des angoisses de son temps.",
    figures: [
      'Pontormo, Parmigianino — l\'élégant allongement',
      'Bronzino — de froids portraits de cour polis',
      'Le Greco — une intensité spirituelle en forme de flamme',
    ],
    legacy:
      "Longtemps rejeté comme un déclin décadent de la Renaissance, le maniérisme est aujourd'hui prisé pour son inventivité et sa complexité psychologique. Il fait le pont entre l'idéal serein de la Renaissance et le drame dynamique du baroque.",
  },
  barroco: {
    title: 'Baroque',
    lead:
      "L'art dramatique et émotionnel du XVIIe siècle, qui visa avant tout à émouvoir le spectateur — à submerger les sens et à remuer les émotions par le mouvement, le spectacle et une lumière intense.",
    era: 'XVIIe–XVIIIe s.',
    origin: 'Italie, puis toute l\'Europe',
    hallmarks: [
      'De forts contrastes d\'ombre et de lumière (clair-obscur)',
      'De vastes compositions en diagonale et du mouvement',
      'Des gestes théâtraux et un réalisme vif et immédiat',
      'Une grandeur destinée à submerger les sens',
    ],
    origins:
      "Le baroque domina l'art européen tout au long du XVIIe siècle et jusqu'au XVIIIe. Il naquit en partie de la Contre-Réforme de l'Église catholique, qui usa d'un art émotionnellement puissant et accessible pour inspirer la foi face au nord protestant plus sobre ; mais il servit aussi les monarques absolus et les cours désireux d'afficher grandeur et puissance. Le style prit des formes différentes à travers l'Europe — passionné et religieux en Italie et en Espagne, opulent et sensuel en Flandre, retenu et intime dans la République hollandaise — mais tous partageaient un goût du dynamisme et de la lumière dramatique, lancé par l'éclairage révolutionnaire du Caravage.",
    figures: [
      'Le Caravage — un éclairage dramatique révolutionnaire',
      'Rubens — l\'énergie flamande jaillissante',
      'Vélasquez, Rembrandt — la touche et la profondeur éblouissantes',
    ],
    legacy:
      "Le baroque produisit certaines des images les plus puissantes de l'art occidental. Sa maîtrise de la lumière, de l'émotion et du mouvement façonna la peinture pour des générations et définit encore notre sens du récit visuel théâtral et dramatique.",
  },
  neerlandes: {
    title: 'Siècle d\'or hollandais',
    lead:
      "L'éclosion stupéfiante de la peinture au XVIIe siècle dans la République hollandaise, nouvellement indépendante, protestante et prospère, qui fit du monde quotidien le sujet du grand art.",
    era: 'XVIIe s.',
    origin: 'République hollandaise',
    hallmarks: [
      'Des genres du quotidien : portraits, paysages, marines, natures mortes, intérieurs',
      'Une lumière naturelle honnête et attentivement observée',
      'De modestes sujets domestiques traités avec soin',
      'De petites œuvres faites pour les foyers ordinaires',
    ],
    origins:
      "Au XVIIe siècle, une petite nation nouvellement indépendante créa un vaste corpus d'art pour un large public, largement bourgeois. Sans l'Église ni les grandes cours pour mécènes, les artistes hollandais peignaient pour les foyers ordinaires, et les tableaux s'achetaient et se vendaient presque comme n'importe quelle marchandise dans un marché ouvert florissant. Ils perfectionnèrent les genres de la vie quotidienne — portraits, paysages, natures mortes et intérieurs domestiques paisibles — prisés pour leur honnêteté et leur lumière attentivement observée. Cet art reflétait une société confiante, marchande et marine qui valorisait le monde visible, la propreté, la prospérité et la vertu domestique.",
    figures: [
      'Rembrandt — profondeur psychologique et lumière',
      'Vermeer — de sereins intérieurs lumineux',
      'Frans Hals — une énergie fringante et vivante',
    ],
    legacy:
      "Le siècle d'or hollandais éleva les sujets du quotidien au rang de grand art et donna à la peinture occidentale certaines de ses images les plus aimées. Son réalisme intime et son subtil traitement de la lumière continuent d'émouvoir les spectateurs quatre siècles plus tard.",
  },
  espanol: {
    title: 'Siècle d\'or espagnol',
    lead:
      "L'art intense, souvent austère, de l'Espagne à l'apogée de son empire, façonné par une cour et une Église catholiques ferventes durant le « Siglo de Oro ».",
    era: 'v. 1550–1660',
    origin: 'Espagne',
    hallmarks: [
      'Un réalisme cru et une profonde intensité spirituelle',
      'De dramatiques contrastes d\'ombre et de lumière',
      'Une ambiance grave et cérémonielle, jusque dans les portraits royaux',
      'Des sujets allant de l\'austérité ascétique à la riche sensualité',
    ],
    origins:
      "Le Siglo de Oro espagnol, en gros de 1550 à 1660, coïncida avec l'apogée de son empire et produisit un art d'une grande intensité émotionnelle et religieuse. Il servit la monarchie des Habsbourg et l'Église de la Contre-Réforme, décorant palais, couvents et cathédrales ; même ses portraits royaux portent une note de gravité solennelle et cérémonielle propre à l'Espagne. Ses maîtres vont du Greco, dont les figures allongées tendent vers le divin, à Vélasquez, peintre de cour d'une subtilité et d'une vérité inégalées, et à Zurbarán et Ribera, qui donnèrent aux sujets sacrés un réalisme grave et tangible.",
    figures: [
      'Le Greco — des figures allongées et extatiques',
      'Vélasquez — une vérité et une subtilité inégalées',
      'Zurbarán, Ribera — un grave réalisme sacré',
    ],
    legacy:
      "Le siècle d'or espagnol donna au monde certaines de ses peintures religieuses les plus profondes et, en Vélasquez, l'un des plus grands peintres de tous les temps — un artiste dont l'honnêteté et la technique inspireraient aussi bien Goya que Manet et Picasso.",
  },
  neoclasicismo: {
    title: 'Néoclassicisme et art académique',
    lead:
      "Un retour délibéré à la noble simplicité et au sérieux moral de la Grèce et de la Rome antiques, en réaction contre la frivolité du rococo et l'excès du baroque tardif.",
    era: 'mil.-XVIIIe–XIXe s.',
    origin: 'France et Italie',
    hallmarks: [
      'Une ligne et un dessin clairs et sculpturaux',
      'Une couleur retenue et sobre, une composition équilibrée',
      'Des sujets civiques, héroïques ou moraux élevés',
      'Le sentiment discipliné par l\'ordre et la raison',
    ],
    origins:
      "Le néoclassicisme surgit au milieu du XVIIIe siècle, inspiré par les fouilles récentes de Pompéi et d'Herculanum, qui mirent le monde antique vivement sous les yeux de l'Europe. Il chercha la vertu et la raison plutôt que le seul plaisir, et son maître suprême, Jacques-Louis David, peignit d'austères drames moraux qui devinrent les emblèmes d'abord de la Révolution française, puis de l'empire de Napoléon. Il devint le style officiel des académies d'art, qui formaient les peintres au dessin rigoureux et à la forme idéalisée, et cet art « académique » domina les salons du XIXe siècle avant que les avant-gardes modernes ne le défient.",
    figures: [
      'Jacques-Louis David — d\'austères drames révolutionnaires',
      'Ingres — un classicisme froid et précis',
    ],
    legacy:
      "Bien que des rebelles ultérieurs aient rejeté ses règles, le néoclassicisme définit à quoi ressembla la peinture européenne sérieuse pendant un siècle. Sa clarté, sa discipline et sa révérence pour l'Antiquité demeurent un courant durable de l'art occidental.",
  },
  romanticismo: {
    title: 'Romantisme',
    lead:
      "Une révolte passionnée contre l'ordre néoclassique et la raison des Lumières, qui défendit l'émotion, l'imagination et l'individu contre les règles et la rationalité.",
    era: 'fin XVIIIe–XIXe s.',
    origin: 'Europe',
    hallmarks: [
      'Le sublime : effroi, terreur et émerveillement devant la nature sauvage',
      'Une couleur audacieuse et une énergie chargée et dynamique',
      'Tempêtes, naufrages, ruines, terres exotiques et luttes héroïques',
      'La vision intérieure de l\'artiste comme véritable source de l\'art',
    ],
    origins:
      "Le romantisme déferla sur l'art européen à la fin du XVIIIe et au début du XIXe siècle, dans une époque de révolution, de bouleversement et de nationalisme nouveau, et d'un désir d'authenticité, de mystère et de sauvage indompté. Il réagit contre la froide retenue du néoclassicisme, prisant le sentiment au-dessus des règles et la vie intérieure de l'artiste par-dessus tout. En France, Géricault et Delacroix peignirent des scènes turbulentes de drame et de révolte ; en Allemagne, Caspar David Friedrich fit de figures solitaires devant de vastes paysages des méditations sur l'âme ; en Grande-Bretagne, Turner dissolvait le monde dans la lumière et l'atmosphère.",
    figures: [
      'Géricault, Delacroix — le drame turbulent français',
      'Caspar David Friedrich — l\'âme solitaire dans la nature',
      'Turner — le monde dissous dans la lumière',
    ],
    legacy:
      "Le romantisme libéra la couleur, le sentiment et la subjectivité en peinture, et son exaltation de l'expression individuelle ouvrit la voie à une grande part de l'art moderne. Ses images de la puissance de la nature et du moi solitaire résonnent encore profondément.",
  },
  realismo: {
    title: 'Réalisme',
    lead:
      "L'exigence de dépeindre le monde ordinaire honnêtement, exactement tel qu'il est, rejetant à la fois l'idéalisme néoclassique et la fantaisie romantique.",
    era: 'mil.-XIXe s.',
    origin: 'France',
    hallmarks: [
      'Des sujets sans gloire : paysans, ouvriers, lavandières, vie quotidienne',
      'D\'humbles sujets peints à une échelle grande et sérieuse',
      'L\'observation véridique au lieu de l\'embellissement',
      'Une dignité tranquille, parfois avec une note de protestation sociale',
    ],
    origins:
      "Le réalisme émergea en France vers les années 1840 et 1850, à une époque de révolution politique et de mutation industrielle, où artistes et écrivains devinrent nouvellement attentifs aux conditions sociales et à la vie des gens ordinaires. Il se tourna vers des sujets jadis indignes de l'art « sérieux » — les pauvres des campagnes et des villes — et les peignit à la grande échelle jadis réservée aux dieux et aux héros, leur donnant une dignité tranquille. Gustave Courbet mena le mouvement par une provocation délibérée, tandis que Jean-François Millet donna au labeur rural une gravité monumentale, presque sacrée ; le courant apparenté du naturalisme poussa plus loin encore vers une observation sans fard et scientifique.",
    figures: [
      'Gustave Courbet — le meneur provocateur',
      'Jean-François Millet — le paysan monumental',
    ],
    legacy:
      "En libérant la peinture du mythe et de l'idéalisation et en l'enracinant dans la réalité observée, le réalisme ouvrit la porte à l'art moderne. Son attention honnête à la vie quotidienne nourrit directement l'impressionnisme et les mouvements qui suivirent.",
  },
  realismosocial: {
    title: 'Réalisme social',
    lead:
      "Un réalisme qui tourne son regard honnête spécifiquement vers la réalité sociale et politique — pauvreté, travail, inégalité et injustice — usant d'un style simple et direct pour témoigner.",
    era: 'XIXe–XXe s.',
    origin: 'Monde entier',
    hallmarks: [
      'Les pauvres, les exploités et les travailleurs au centre même',
      'Un style simple et sans sentimentalité qui affronte la misère',
      'Un appel à l\'empathie, à la prise de conscience ou à la conscience',
      'Le travail et la lutte là où se tenaient jadis héros et dieux',
    ],
    origins:
      "Le réalisme social est un courant de l'art réaliste apparu à travers le monde à partir du XIXe siècle, partout où l'industrialisation, la migration et l'inégalité créaient une souffrance visible — y compris en Amérique latine, où des peintres consignèrent la vie des pauvres des villes et des dépossédés. Plutôt que d'idéaliser ou de divertir, il confronte le spectateur aux chômeurs, aux exploités et aux affamés. Il est étroitement lié aux mouvements plus larges de réforme sociale, et sa force émotionnelle vient de placer la lutte quotidienne au cœur du tableau.",
    figures: [
      'Ernesto de la Cárcova — la protestation sociale argentine',
      'Reinaldo Giudici — les pauvres des villes',
    ],
    legacy:
      "Le réalisme social donna à l'art une voix morale et politique, rappelant aux spectateurs des réalités faciles à ignorer. Sa tradition de l'art comme témoin et conscience se poursuivit puissamment au XXe siècle.",
  },
  realismoamericano: {
    title: 'Réalisme et régionalisme américains',
    lead:
      "L'élan, à la fin du XIXe et au début du XXe siècle, de dépeindre la vie américaine directement et véridiquement, plutôt qu'à travers des idéaux européens empruntés.",
    era: 'fin XIXe–XXe s.',
    origin: 'États-Unis',
    hallmarks: [
      'Des scènes américaines du quotidien : rues, fermes, marins, ouvriers',
      'Une observation fraîche et sans sentimentalité',
      'L\'attention du régionalisme à la vie rurale et du cœur du pays',
      'L\'immobilité et la solitude dans la ville moderne',
    ],
    origins:
      "À mesure que les États-Unis devenaient une puissance mondiale, leurs artistes cherchèrent une identité visuelle confiante et indépendante, enracinée dans les scènes et les gens du pays. Les peintres réalistes dépeignirent le quotidien d'un œil frais et sans sentimentalité — les scènes vigoureuses de la mer et de l'enfance campagnarde de Winslow Homer en sont des exemples classiques. Dans les années 1930, pendant la Dépression, le mouvement apparenté du régionalisme célébra l'Amérique rurale et des petites villes comme une réponse locale au modernisme européen, tandis qu'Edward Hopper distilla tout ce courant en images d'immobilité et de solitude moderne.",
    figures: [
      'Winslow Homer — la mer et la vie campagnarde',
      'Grant Wood — le cœur du pays régionaliste (« American Gothic »)',
      'Edward Hopper — la solitude moderne',
    ],
    legacy:
      "Ensemble ces artistes forgèrent un art américain confiant et indépendant, enraciné dans le décor et le caractère locaux, donnant à la jeune nation des images qui lui semblaient authentiquement siennes.",
  },
  costumbrismo: {
    title: 'Costumbrisme',
    lead:
      "La représentation artistique affectueuse des coutumes, du costume, des « types » et de la vie quotidienne d'un lieu et d'un peuple donnés, traitant le local et l'ordinaire comme des sujets dignes.",
    era: 'XIXe s.',
    origin: 'Espagne et Amérique latine',
    hallmarks: [
      'Des scènes de marchés, de fêtes, de danses populaires et de tavernes de campagne',
      'Le costume régional et les « types » populaires',
      'Une peinture de genre chaleureuse, détaillée et attentivement observée',
      'Le gaucho, le huaso, le marchand, la danse rurale',
    ],
    origins:
      "Le costumbrisme fleurit avant tout dans l'Espagne du XIXe siècle et à travers l'Amérique latine. Plutôt que la grande histoire ou le mythe, ses peintres consignèrent la texture d'une société — son travail, ses loisirs, ses rituels et ses personnages — avec chaleur et détail. Le mouvement s'éleva de concert avec le nationalisme du XIXe siècle, tandis que des nations nouvellement indépendantes cherchaient à définir leur identité par leur propre terre, leur peuple et leurs traditions, et ces images contribuèrent à façonner l'image que les sociétés se faisaient d'elles-mêmes.",
    figures: [
      'Manuel Antonio Caro — la danse nationale du Chili',
      'José Agustín Arrieta — la vie quotidienne mexicaine',
    ],
    legacy:
      "Le costumbrisme laissa un inestimable témoignage visuel de modes de vie disparus et de la culture populaire. Chaleureux, observateur et enraciné dans le lieu, il reste central dans le patrimoine artistique national de nombreux pays hispanophones.",
  },
  hudson: {
    title: 'École de la Hudson River',
    lead:
      "Le premier grand mouvement paysagiste de l'art américain, qui dépeignit la nature sauvage du Nouveau Monde comme vaste, sublime et don de Dieu.",
    era: '1820–1870',
    origin: 'États-Unis',
    hallmarks: [
      'Une échelle grandiose et impressionnante',
      'Montagnes, forêts, rivières et ciels lumineux',
      'Une lumière rayonnante et dramatique',
      'La terre indomptée comme nationale et même divine',
    ],
    origins:
      "L'école de la Hudson River tira son nom de la pittoresque vallée de l'Hudson, dans l'État de New York, où ses fondateurs peignirent d'abord dans les années 1820. Elle surgit tandis que les jeunes États-Unis s'étendaient vers l'ouest et forgeaient une identité nationale, faisant de la nature sauvage une source de fierté et même de destinée divine. Thomas Cole fonda le mouvement et lui donna une dimension morale et spirituelle — certaines de ses œuvres pleurent en sourdine la perte de la terre au profit du développement — tandis qu'une génération ultérieure, dont Frederic Church et Albert Bierstadt, poussa vers des panoramas toujours plus spectaculaires du Nouveau Monde et au-delà.",
    figures: [
      'Thomas Cole — fondateur, vision morale et spirituelle',
      'Frederic Church, Albert Bierstadt — de vastes panoramas',
    ],
    legacy:
      "L'école de la Hudson River établit le paysage comme un sujet américain sérieux et façonna la manière dont la nation voyait sa propre terre. Sa vision sublime de la nature sauvage reste une pierre angulaire de l'art américain.",
  },
  impresionismo: {
    title: 'Impressionnisme',
    lead:
      "Une rébellion contre la peinture académique qui chercha à saisir les effets fugaces de la lumière, de la couleur et de l'atmosphère en un seul instant qui passe — l'un des mouvements les plus aimés de l'histoire de l'art.",
    era: '1860–1880',
    origin: 'Paris',
    hallmarks: [
      'Des touches libres et fragmentées',
      'Des couleurs vives et non mélangées',
      'Souvent peint vite, en plein air, devant le sujet',
      'Des sujets modernes : cafés, boulevards, jardins, gares, loisirs',
    ],
    origins:
      "L'impressionnisme naquit à Paris dans les années 1860 et 1870 en révolte contre les conventions rigides du Salon officiel et de la peinture académique. Ses artistes travaillaient vite, souvent en plein air, usant de touches libres et de couleurs vives pour consigner l'« impression » immédiate d'une scène plutôt que son détail fixe et précis, prenant pour sujet le monde moderne qui les entourait. Le nom vint d'une critique moqueuse d'« Impression, soleil levant » de Monet à la première exposition indépendante du groupe en 1874 — ce que les critiques rejetaient comme esquissé et inachevé, les artistes l'embrassèrent comme une façon plus vraie de voir.",
    figures: [
      'Claude Monet — la lumière et l\'atmosphère',
      'Renoir, Degas, Pissarro',
      'Morisot, Cassatt, Sisley, Caillebotte',
    ],
    legacy:
      "L'impressionnisme transforma l'art en prisant la perception, la spontanéité et la vie moderne du quotidien. Il libéra la couleur et la touche de la description stricte et ouvrit la porte à toute l'aventure de la peinture moderne.",
  },
  posimpresionismo: {
    title: 'Postimpressionnisme',
    lead:
      "L'art divers qui bâtit sur la couleur vive de l'impressionnisme mais le dépassa vers plus de structure, d'émotion, de symbolisme et d'expression personnelle.",
    era: '1880–1900',
    origin: 'France',
    hallmarks: [
      'La couleur vive au service du sentiment et du sens, non de la seule lumière',
      'Plus de structure, de symbolisme et d\'expression intérieure',
      'Des styles hautement personnels et individuels',
      'Au-delà de l\'instant optique fugace',
    ],
    origins:
      "Le postimpressionnisme est le terme désignant l'art varié qui émergea en France dans les années 1880 et 1890, gardant la couleur de l'impressionnisme mais rejetant son attachement à l'impression momentanée. Ses artistes ne formèrent jamais un groupe unique ; chacun suivit sa propre direction, convaincu que la peinture devait exprimer plus que ce que l'œil seul perçoit — et leur œuvre fut souvent incomprise et sous-estimée de leur vivant. Cézanne rebâtit la nature à partir de plans géométriques solides ; Van Gogh chargea ses toiles d'une couleur et d'une émotion intenses ; Seurat appliqua la couleur avec une rigueur scientifique ; Gauguin aplatit la forme en quête d'un art symbolique.",
    figures: [
      'Cézanne — la forme à partir de plans géométriques',
      'Van Gogh — couleur et émotion intenses',
      'Gauguin — une couleur plate et symbolique',
      'Seurat — la couleur scientifique (pointillisme)',
    ],
    legacy:
      "Le postimpressionnisme fut le pont crucial vers l'art moderne du XXe siècle. Van Gogh, Cézanne et Gauguin en particulier devinrent des influences majeures sur l'expressionnisme, le cubisme, le fauvisme et presque tout ce qui suivit.",
  },
  neoimpresionismo: {
    title: 'Néo-impressionnisme (pointillisme)',
    lead:
      "Un développement systématique et scientifique de l'impressionnisme qui bâtit des images lumineuses à partir d'innombrables petits points de couleur pure et non mélangée.",
    era: '1880–1890',
    origin: 'France',
    hallmarks: [
      'Le pointillisme : de minuscules points séparés de couleur non mélangée',
      'Des couleurs mélangées par l\'œil, non sur la palette',
      'Un calme cristallin, immobile et ordonné',
      'Une méthode minutieuse, presque méditative',
    ],
    origins:
      "Le néo-impressionnisme surgit en France dans les années 1880 comme un développement plus rationnel et discipliné de l'impressionnisme. Là où les impressionnistes travaillaient par instinct et spontanéité, ses artistes appliquaient les théories contemporaines de la couleur et de l'optique, plaçant des points de couleur pure côte à côte pour que l'œil les mélange en tons plus vifs, en théorie, que la peinture mélangée. Georges Seurat fut pionnier de l'approche ; Paul Signac en devint le principal défenseur et théoricien. Le mouvement reflétait une foi de la fin du XIXe siècle dans la science et l'ordre, appliquée à l'acte même de la perception, et bâtir un grand tableau point par point était un travail lent, presque méditatif.",
    figures: [
      'Georges Seurat — pionnier de la méthode',
      'Paul Signac — son principal défenseur et théoricien',
    ],
    legacy:
      "Bien que de courte durée comme méthode stricte, le néo-impressionnisme influença de nombreux artistes ultérieurs, dont Matisse et les fauves. Son usage audacieux et analytique de la couleur pure aida à pousser la peinture vers l'abstraction moderne.",
  },
  simbolismo: {
    title: 'Symbolisme',
    lead:
      "Un repli vers l'intérieur — vers les rêves, le mythe, l'émotion et l'imagination — en réaction contre le réalisme et l'impressionnisme tournés vers l'extérieur.",
    era: '1880–1900',
    origin: 'France et Belgique',
    hallmarks: [
      'La suggestion, l\'ambiance et la métaphore plutôt que la représentation littérale',
      'Des thèmes d\'amour, de mort, de désir, de mystère et de spiritualité',
      'Une imagerie énigmatique, souvent hantée, onirique',
      'La subjectivité et la vie intérieure',
    ],
    origins:
      "Le symbolisme surgit dans les années 1880, surtout en France et en Belgique mais se répandant à travers l'Europe. Là où le réalisme et l'impressionnisme regardaient au-dehors, vers le monde visible, le symbolisme se tourna vers l'intérieur, usant d'une imagerie évocatrice, d'ambiance et de métaphore pour suggérer des idées et des sentiments qui ne pouvaient être montrés littéralement. Il allait de pair avec la poésie symboliste et reflétait une ambiance de fin de siècle d'introspection, de quête spirituelle et de malaise, prisant l'imagination au-dessus de la réalité objective.",
    figures: [
      'Gustave Moreau, Odilon Redon — les visionnaires français',
      'Edvard Munch — angoisse et désir',
      'Gustav Klimt — une allégorie sensuelle et ornementale',
    ],
    legacy:
      "L'accent du symbolisme sur l'imagination, l'inconscient et la puissance émotionnelle de l'image eut une influence profonde sur l'art du XXe siècle, nourrissant directement l'expressionnisme et, plus tard, le surréalisme.",
  },
  modernismo: {
    title: 'Modernisme / Art nouveau',
    lead:
      "Un mouvement décoratif du tournant du siècle qui chercha un style frais et moderne, libre de l'imitation historique, puisant ses formes dans la nature.",
    era: 'v. 1890–1910',
    origin: 'Europe',
    hallmarks: [
      'Des lignes sinueuses et fluides « en coup de fouet »',
      'Des formes organiques de plantes et de fleurs',
      'Un motif élégant et ornemental',
      'Un style total unissant art, architecture, verre et design',
    ],
    origins:
      "Vers 1900 un mouvement décoratif déferla sur l'Europe sous bien des noms — Art nouveau en France, Modernisme en Catalogne, Jugendstil en Allemagne, style Sécession à Vienne. Il fleurit dans une période d'optimisme, de progrès industriel et de nouveaux loisirs urbains, et visait à être beau, harmonieux et pleinement de son moment. Mouvement de design total, il unit peinture, architecture, joaillerie, mobilier et arts graphiques ; en peinture, il est incarné avant tout par Gustav Klimt, dont les toiles dorées et à motifs fondent la figure et l'ornement.",
    figures: [
      'Gustav Klimt — des toiles dorées et à motifs',
      'Alphonse Mucha — des affiches décoratives fluides',
    ],
    legacy:
      "Bien que son apogée fût bref, l'Art nouveau refaçonna le design et les arts décoratifs et contribua à moderniser le langage visuel de l'Europe. Son élégance fluide reste instantanément reconnaissable et sans fin influente.",
  },
  fovismo: {
    title: 'Fauvisme',
    lead:
      "Le premier mouvement d'avant-garde du XXe siècle — bref mais explosif — bâti sur la libération totale de la couleur de son devoir de décrire la réalité.",
    era: 'v. 1904–1908',
    origin: 'France',
    hallmarks: [
      'Une couleur pure, intense, souvent arbitraire, sortie tout droit du tube',
      'Un visage peut être vert, un ciel rose',
      'Des touches audacieuses et énergiques',
      'La couleur au service de l\'émotion et du dessin, non de la description',
    ],
    origins:
      "Le fauvisme éclata en France vers 1904-1908, bâtissant sur les expériences de couleur de Van Gogh, Gauguin et des néo-impressionnistes et les poussant à un extrême joyeux. Ses peintres usaient d'une couleur pure et intense au service du sentiment et du dessin plutôt que de l'apparence des choses. Le nom vint d'un critique qui, voyant leurs toiles sauvages au Salon d'automne de 1905, traita les peintres de « fauves » — une insulte que les artistes embrassèrent fièrement.",
    figures: [
      'Henri Matisse — le meneur',
      'André Derain, Maurice de Vlaminck',
    ],
    legacy:
      "Bien qu'il n'ait duré que quelques années, le fauvisme fut une percée décisive. En libérant entièrement la couleur de son devoir de décrire le monde, il ouvrit la voie à l'expressionnisme, à l'abstraction et à une grande part de l'art moderne.",
  },
  expresionismo: {
    title: 'Expressionnisme',
    lead:
      "L'art de l'émotion intérieure brute, qui déforme délibérément la couleur, la ligne et la forme pour montrer le monde tel qu'il se ressent plutôt que tel qu'il paraît.",
    era: 'début XXe s.',
    origin: 'Allemagne et Autriche',
    hallmarks: [
      'Des formes délibérément déformées et torses',
      'Des couleurs qui s\'entrechoquent et une touche dentelée et agitée',
      'Angoisse, passion, aliénation et aspiration spirituelle',
      'Le sentiment subjectif au-dessus de la réalité objective',
    ],
    origins:
      "L'expressionnisme fleurit avant tout en Allemagne et en Autriche au début du XXe siècle, naissant des tensions d'une société qui se modernisait vite, angoissée et au bord de la Première Guerre mondiale, et puisant dans la force émotionnelle de Van Gogh, de Munch et des symbolistes. Deux groupes clés se formèrent en Allemagne : Die Brücke (Le Pont), mené par Kirchner, avec ses scènes urbaines dures et anguleuses ; et Der Blaue Reiter (Le Cavalier bleu), incluant Kandinsky et Franz Marc, qui poursuivait un art spirituel et de plus en plus abstrait. En Autriche, Egon Schiele poussa le corps vers une intensité crue et angoissée.",
    figures: [
      'Kirchner — les villes dures de Die Brücke',
      'Kandinsky, Franz Marc — Der Blaue Reiter',
      'Egon Schiele — des corps crus et angoissés',
    ],
    legacy:
      "L'expressionnisme fit du sentiment intérieur de l'artiste le véritable sujet de l'art. Son intensité émotionnelle et sa déformation expressive eurent un impact durable, résonnant à travers la peinture moderne et contemporaine.",
  },
  cubismo: {
    title: 'Cubisme',
    lead:
      "L'une des révolutions les plus radicales de l'histoire de l'art occidental, qui brisa les objets en facettes géométriques et les réassembla, montrant plusieurs points de vue à la fois.",
    era: 'v. 1907–1914',
    origin: 'Paris',
    hallmarks: [
      'Des objets fragmentés en plans géométriques',
      'Plusieurs points de vue combinés en une seule image',
      'L\'abandon de la perspective unique et fixe',
      'Plus tard : couleur plus vive, formes plus simples et collage',
    ],
    origins:
      "Le cubisme fut inventé à Paris par Pablo Picasso et Georges Braque entre 1907 et 1914 environ. Abandonnant la perspective unique et fixe qui gouvernait la peinture depuis la Renaissance, ils traitèrent la toile plate comme un espace d'un genre nouveau. Le premier cubisme « analytique » fragmenta les formes en grilles quasi abstraites et monochromes ; le cubisme « synthétique » ultérieur réintroduisit une couleur plus vive, des formes plus simples et même des matériaux collés (le collage). Le mouvement puisa dans la peinture structurelle de Cézanne et dans la sculpture africaine et ibérique, et reflétait un monde moderne de science nouvelle, de vitesse et de points de vue changeants.",
    figures: [
      'Pablo Picasso et Georges Braque — cofondateurs',
      'Juan Gris, Fernand Léger — cubistes ultérieurs',
    ],
    legacy:
      "Le cubisme réinventa la manière dont une surface plate peut représenter la forme et l'espace, et ses idées se propagèrent au futurisme, à l'abstraction et à d'innombrables mouvements ultérieurs. C'est une pierre de fondation de l'art du XXe siècle.",
  },
  futurismo: {
    title: 'Futurisme',
    lead:
      "Une avant-garde italienne agressive et tournée vers l'avenir qui rejeta le passé et glorifia la vitesse, l'énergie et la machinerie de l'âge moderne.",
    era: 'v. 1909–1918',
    origin: 'Italie',
    hallmarks: [
      'Le mouvement, la vitesse et l\'énergie rendus visibles sur la toile',
      'Des figures fracturées en plans répétés et superposés et en « lignes de force »',
      'Voitures, machines, foules et la ville électrique',
      'Des formes fragmentées empruntées au cubisme',
    ],
    origins:
      "Le futurisme fut lancé en 1909 par un manifeste enflammé du poète Filippo Marinetti. Il vénérait la vitesse, la technologie, l'industrie et même la violence et la guerre, qu'il voyait comme des forces balayant un vieux monde éculé. En peinture, Umberto Boccioni et Giacomo Balla fracturèrent des figures en mouvement en plans superposés pour rendre le mouvement lui-même visible, puisant largement dans les formes fragmentées du cubisme. Le mouvement s'étendit au-delà de la peinture à la sculpture, à la musique et au design, et fut lié à la politique turbulente de l'Italie du début du XXe siècle.",
    figures: [
      'Umberto Boccioni — son principal artiste et théoricien',
      'Giacomo Balla — le mouvement et la lumière',
    ],
    legacy:
      "Bien qu'il se soit estompé après la Première Guerre mondiale, la vision dynamique du mouvement et de la modernité du futurisme influença l'art et le design ultérieurs. Sa tentative de peindre la vitesse et la force pures reste l'une des expériences les plus audacieuses du modernisme.",
  },
  suprematismo: {
    title: 'Suprématisme',
    lead:
      "Un mouvement pionnier d'abstraction géométrique pure qui abandonna toute référence au monde visible au profit du sentiment et de la forme purs.",
    era: 'à partir de 1915',
    origin: 'Russie',
    hallmarks: [
      'Des formes simples : carrés, cercles, croix et lignes',
      'Une gamme limitée de couleurs sur des fonds blancs unis',
      'Des formes flottant libres de la gravité et des objets',
      'La suprématie du pur sentiment sur la représentation',
    ],
    origins:
      "Le suprématisme fut fondé par l'artiste russe Kazimir Malévitch en 1915, dans le ferment entourant la Révolution russe. Il réduisit l'art aux éléments les plus nus — de simples formes géométriques flottant sur du blanc — affirmant la suprématie du pur sentiment et de la forme sur la représentation des objets. Son austère « Carré noir » se voulait un « zéro de la forme », un recommencement radical ; il l'accrocha même en hauteur dans un coin, la place traditionnelle d'une icône religieuse. Le mouvement fit partie de l'explosion d'expérimentation d'avant-garde de la Russie soviétique naissante, quand beaucoup croyaient que l'art abstrait pouvait aider à bâtir un monde et une conscience nouveaux.",
    figures: [
      'Kazimir Malévitch — fondateur',
      'El Lissitzky — porta ses idées dans le design',
    ],
    legacy:
      "Parmi les premiers mouvements pleinement abstraits, le suprématisme eut une influence profonde sur le cours de l'art et du design modernes. Sa réduction de la peinture à la pure géométrie et au sentiment aida à définir l'abstraction elle-même.",
  },
  neoplasticismo: {
    title: 'Néoplasticisme (De Stijl)',
    lead:
      "Un style abstrait rigoureux réduit aux lignes droites, aux angles droits et aux trois couleurs primaires, en quête d'une harmonie universelle sous le monde visible.",
    era: 'à partir de 1917',
    origin: 'Pays-Bas',
    hallmarks: [
      'Seulement des lignes noires horizontales et verticales',
      'Des plans plats de rouge, jaune et bleu, avec blanc, gris et noir',
      'Ni courbes, ni diagonales, ni objets reconnaissables',
      'Un équilibre soigné et précis de chaque proportion',
    ],
    origins:
      "Le néoplasticisme fut le style abstrait austère développé par le peintre hollandais Piet Mondrian et défendu par le groupe De Stijl (« Le Style ») qu'il cofonda aux Pays-Bas en 1917. Mondrian croyait que distiller la peinture à ses absolus essentiels pouvait exprimer une harmonie et un équilibre universels sous-tendant le chaos du monde visible — une ambition spirituelle, presque utopique, plutôt qu'une simple décoration. De Stijl étendit ces idées au-delà de la peinture, à l'architecture, au mobilier et au design, visant à refaçonner tout l'environnement visuel selon un ordre pur et rationnel.",
    figures: [
      'Piet Mondrian — son créateur',
      'Theo van Doesburg — cofondateur de De Stijl',
    ],
    legacy:
      "Le néoplasticisme devint l'un des courants les plus influents de l'art et du design modernes. Sa géométrie nette et ses couleurs primaires façonnèrent l'architecture et le graphisme du XXe siècle, et restent instantanément reconnaissables aujourd'hui.",
  },
  ukiyoe: {
    title: 'Ukiyo-e',
    lead:
      "Estampes sur bois et peintures japonaises du « monde flottant » — la culture urbaine à la mode et en quête de plaisir de l'époque d'Edo.",
    era: 'XVIIe–XIXe s.',
    origin: 'Japon (Edo)',
    hallmarks: [
      'Des aplats de couleur et des contours nets et élégants',
      'Des compositions audacieuses, asymétriques et recadrées',
      'Des estampes populaires et bon marché tirées de blocs de bois gravés',
      'Beautés, acteurs, paysages et légendes',
    ],
    origins:
      "L'ukiyo-e — « images du monde flottant » — fleurit à Edo (l'ancien Tokyo) du XVIIe au XIXe siècle. Le « monde flottant » désignait les théâtres, les quartiers de divertissement, les beautés célèbres, les acteurs et les voyages d'une culture urbaine populaire éclatante. Faites à bas coût à partir de blocs de bois gravés, les estampes étaient un art populaire et abordable, et leurs maîtres allaient des portraits de courtisanes et d'acteurs aux paysages dramatiques et aux histoires fantastiques tirées du mythe et de l'histoire.",
    figures: [
      'Utamaro — les beautés (bijin-ga)',
      'Hokusai, Hiroshige — les paysages',
      'Kuniyoshi — guerriers et légendes',
    ],
    legacy:
      "Quand le Japon s'ouvrit à l'Occident au XIXe siècle, l'ukiyo-e stupéfia les artistes européens. Ce « japonisme » influença profondément les impressionnistes et les postimpressionnistes — Van Gogh, Monet, Degas et d'autres — contribuant à façonner le cours de l'art moderne.",
  },
  rinpa: {
    title: 'École Rinpa',
    lead:
      "Une tradition majeure de la peinture japonaise classique célébrée pour sa beauté décorative audacieuse et son usage somptueux de l'or et de l'argent.",
    era: 'à partir du XVIIe s.',
    origin: 'Japon (Kyoto)',
    hallmarks: [
      'Des motifs naturels simplifiés et stylisés en motif rythmique',
      'Une somptueuse feuille d\'or et d\'argent et une couleur plate et riche',
      'Une douce technique de « l\'encre en flaque » pour les feuilles et les pétales',
      'Grands paravents et panneaux sur des thèmes classiques',
    ],
    origins:
      "Le Rinpa fleurit à partir du XVIIe siècle et, à la différence d'une lignée familiale, ce fut une tradition transmise par l'admiration et l'imitation à travers les générations. Ses artistes privilégiaient les motifs naturels simplifiés — fleurs, herbes, arbres, oiseaux et eau — disposés en motifs saisissants et rythmiques, et revisitaient souvent des thèmes de la littérature et de la poésie japonaises classiques. Tawaraya Sōtatsu établit le style, et Ogata Kōrin, dont les paravents d'iris et de fleurs de prunier comptent parmi ses sommets, le porta à son apogée.",
    figures: [
      'Tawaraya Sōtatsu — établit le style',
      'Ogata Kōrin — iris et fleurs de prunier',
    ],
    legacy:
      "La fusion par le Rinpa de la nature, du motif et des matériaux précieux eut un impact durable sur le design japonais et influença plus tard l'art décoratif occidental et l'Art nouveau. Son élégance raffinée reste un fil déterminant de l'esthétique japonaise.",
  },
  hasegawa: {
    title: 'École Hasegawa',
    lead:
      "Une école de peinture japonaise fondée à la fin du XVIe siècle, célébrée avant tout pour ses paysages atmosphériques à l'encre monochrome.",
    era: 'à partir de la fin du XVIe s.',
    origin: 'Japon',
    hallmarks: [
      'De l\'encre monochrome sur papier nu',
      'De vastes espaces vides pour suggérer la brume et le silence',
      'Une touche sobre et évocatrice enracinée dans le zen',
      'Aussi de hardis paravents à fond d\'or de l\'époque Momoyama',
    ],
    origins:
      "L'école Hasegawa fut fondée par Hasegawa Tōhaku durant la vibrante période Momoyama. Tōhaku absorba les idéaux de la peinture à l'encre chinoise et la tradition japonaise native, développant un style d'une remarquable subtilité atmosphérique — ses paravents des « Pins » évoquent une forêt embrumée à l'aide de la seule encre noire et de vastes étendues de papier vide, expression suprême de la suggestion, de la retenue et de l'appréciation zen du vide. L'école produisit aussi de riches paravents colorés à fond d'or dans le goût hardi de Momoyama, montrant son ampleur, de l'encre sobre à la décoration somptueuse.",
    figures: [
      'Hasegawa Tōhaku — fondateur (paravents des « Pins »)',
    ],
    legacy:
      "L'école Hasegawa représente l'un des points culminants de la peinture japonaise à l'encre. Son équilibre entre un hardi espace vide et une touche délicate et évocatrice est encore vénéré comme un modèle de beauté contemplative.",
  },
  naif: {
    title: 'Art naïf',
    lead:
      "Un art fait par des artistes autodidactes qui travaillent hors de la tradition académique, sans formation formelle en perspective, en anatomie ou aux règles établies de la peinture.",
    era: 'toute époque',
    origin: 'Monde entier',
    hallmarks: [
      'Un espace aplati et une perspective non conventionnelle',
      'Une couleur vive, souvent irréaliste',
      'Une attention franche, minutieuse et enfantine au détail',
      'Une franchise onirique et poétique',
    ],
    origins:
      "Les artistes naïfs apparaissent partout dans le monde et à toute époque, suivant leur propre vision plutôt qu'une école ou une mode. Loin d'être une faiblesse, leur franchise sans formation — espace aplati, couleur irréelle, même clarté enfantine donnée à tout — confère à leur œuvre une qualité onirique, souvent puissante. Le plus célèbre, Henri Rousseau, un douanier français qui ne quitta jamais la France, conjura de luxuriantes jungles imaginaires qui enchantèrent l'avant-garde parisienne.",
    figures: [
      'Henri Rousseau — des jungles imaginaires',
    ],
    legacy:
      "Au XXe siècle, les artistes modernes en vinrent à priser l'art naïf précisément pour sa fraîcheur sans formation et sa liberté imaginative, y voyant une authenticité que la formation académique pouvait effacer. Il reste largement aimé pour son honnêteté et son charme.",
  },
};

/** Italian movement descriptions (falls back to English). */
export const MOVEMENT_INFO_IT: Record<string, MovementInfo> = {
  renacimiento: {
    title: 'Rinascimento',
    lead:
      "La « rinascita » dell'arte, del sapere e degli ideali dell'antica Grecia e di Roma, che pose l'essere umano dalle proporzioni armoniose al centro dell'arte e accese uno dei periodi più creativi della storia.",
    era: 'XIV–XVI sec.',
    origin: 'Italia',
    hallmarks: [
      'Una profondità convincente costruita con la prospettiva lineare matematica',
      'Figure anatomicamente esatte, solide e piene di peso',
      'Un modellato di luce e ombra per una presenza reale',
      'Equilibrio, armonia e bellezza idealizzata',
      'Architettura, mito e storia classici fatti rivivere',
    ],
    origins:
      "Il Rinascimento mise radici nelle ricche e rivali città-stato dell'Italia del Tre e Quattrocento — Firenze soprattutto — e si diffuse per l'Europa nei due secoli successivi. Dopo il Medioevo, studiosi e artisti fecero rivivere consapevolmente la cultura dell'antichità, e la filosofia dell'umanesimo pregiava la ragione, la dignità e il potenziale dell'uomo. Fu finanziato da potenti mecenati come i banchieri Medici e i papi di Roma, che gareggiavano in prestigio attraverso l'arte. Il primo Rinascimento cominciò a Firenze con Masaccio, Botticelli e Beato Angelico; intorno al 1500 raggiunse il suo abbagliante culmine nel pieno Rinascimento a Firenze e a Roma. In questo mondo nuovo l'artista passò da anonimo artigiano medievale a celebrato genio individuale, che firmava la propria opera ed era ricordato per nome.",
    figures: [
      'Leonardo da Vinci — il genio universale (la Gioconda)',
      'Michelangelo — la potenza eroica in pittura e nel marmo',
      'Raffaello — grazia e armonia (La Scuola di Atene)',
      'Botticelli, Masaccio, Piero della Francesca — il primo Rinascimento',
    ],
    legacy:
      "Rimodellò per sempre l'arte occidentale, fissando la prospettiva, la proporzione e lo studio diretto della natura come suoi fondamenti. I suoi capolavori — la Gioconda, la volta Sistina, la Scuola di Atene — restano tra le immagini più venerate e riconoscibili mai create, e fissarono lo standard con cui l'arte europea si misurò per secoli.",
  },
  renacimientonorte: {
    title: 'Rinascimento nordico',
    lead:
      "La rinascita rinascimentale come si svolse a nord delle Alpi — assorbendo le idee italiane di proporzione e umanesimo ma filtrandole attraverso un amore tutto nordico per il dettaglio minuto e l'osservazione ravvicinata.",
    era: 'XV–XVI sec.',
    origin: 'Germania e Paesi Bassi',
    hallmarks: [
      'Una precisione quasi microscopica di capelli, tessuti e luce',
      'Oggetti quotidiani carichi di simbolismo nascosto',
      'Un colore ricco e luminoso dal nuovo mezzo dell\'olio',
      'Un realismo scrutatore e non idealizzato, soprattutto nei ritratti',
      'La stampa, che diffuse le immagini per l\'Europa',
    ],
    origins:
      "Mentre il Rinascimento fioriva in Italia, una rinascita parallela si svolgeva in Germania, nelle Fiandre e oltre. Dove gli artisti italiani idealizzavano, quelli del Nord scrutavano, rendendo ogni capello e piega di stoffa con precisione stupefacente. La sua figura di spicco, Albrecht Dürer, viaggiò in Italia, ne studiò le teorie della proporzione e le fuse con l'artigianato nordico — mentre faceva da pioniere alla stampa, che portò le immagini attraverso il continente come mai prima. Il movimento fu plasmato anche dallo sconvolgimento religioso della Riforma: con il diffondersi del protestantesimo, gli artisti si volsero dalle pale d'altare religiose verso il ritratto, il paesaggio e le scene di vita quotidiana, gettando le basi della pittura profana successiva.",
    figures: [
      'Albrecht Dürer — la teoria italiana fusa con l\'artigianato nordico',
      'Hans Holbein — penetranti ritratti della corte dei Tudor',
      'Jan van Eyck — il realismo luminoso dell\'olio',
      'Pieter Bruegel — brulicanti panorami di vita contadina',
    ],
    legacy:
      "Diede all'arte occidentale alcuni dei suoi ritratti più scrutatori e il suo durevole amore per il dettaglio naturalistico e la profondità simbolica. Quella miscela di osservazione precisa e senso nascosto avrebbe risuonato con forza nella pittura olandese e ben oltre.",
  },
  flamenco: {
    title: 'Primitivi fiamminghi',
    lead:
      "I pittori fiamminghi del Quattrocento che furono tra i primi maestri della pittura a olio, costruendo superfici luminose e preziose di un dettaglio che sbalordì i contemporanei.",
    era: 'XV sec.',
    origin: 'Fiandre',
    hallmarks: [
      'Sottili velature d\'olio traslucide per una profondità radiosa',
      'Un dettaglio abbagliante — riflessi, texture, paesaggi lontani',
      'Oggetti comuni carichi di simbolismo religioso',
      'Alcuni dei primi dipinti firmati e datati',
      'Piccole tavole devozionali e grandi pale d\'altare',
    ],
    origins:
      "Nelle ricche città mercantili delle Fiandre del Quattrocento — Bruges, Gand e Bruxelles — un gruppo di pittori trasformò l'arte europea. Noti come primitivi fiamminghi (un vecchio termine che significa « primi », non « rozzi »), sfruttarono la pittura a olio come nessuno, sovrapponendo sottili velature che facevano scintillare di vita riflessi, tessuti e orizzonti lontani. Lavoravano per i duchi di Borgogna e per prosperi mercanti, producendo pale d'altare, ritratti e tavole devozionali dense di significato, dove una candela, un cane o uno specchio potevano portare un peso simbolico. Jan van Eyck arrivò a firmare e datare le sue opere — un'affermazione del nuovo status dell'artista — e le loro innovazioni nell'olio influenzarono presto l'Italia e il resto d'Europa.",
    figures: [
      'Jan van Eyck — pioniere della velatura a olio (Ritratto dei coniugi Arnolfini)',
      'Rogier van der Weyden — l\'intensa emozione religiosa',
      'Hieronymus Bosch — visioni fantastiche e moraleggianti',
    ],
    legacy:
      "I primitivi fiamminghi posero le fondamenta tecniche e d'osservazione della pittura a olio occidentale. Il loro connubio di realismo mozzafiato e simbolismo nascosto resta una delle grandi conquiste dell'arte europea e plasmò la tradizione olandese che seguì.",
  },
  veneciana: {
    title: 'Scuola veneziana',
    lead:
      "La pittura di Venezia, che pregiava il « colorito » — il colore, la luce e la superficie pittorica sensuale — sul disegno fermo e la progettazione (« disegno ») prediletti a Firenze e a Roma.",
    era: 'XV–XVI sec.',
    origin: 'Venezia',
    hallmarks: [
      'Una forma costruita da macchie di colore caldo e radioso, non da contorni duri',
      'Una pennellata libera e sensuale a olio',
      'Tessuti ricchi, luce dorata e carni voluttuose',
      'Atmosfera e clima più che precisione aguzza',
      'Sensuali mitologie e grandi ritratti',
    ],
    origins:
      "Venezia, la grande repubblica marinara, sviluppò una scuola di pittura distinta da quella dell'Italia centrale. La sua ricchezza, il suo commercio con l'Oriente e la qualità particolare della sua luce acquatica e luminosa plasmarono tutti uno stile caldo, guidato dal colore, costruito non da contorni duri ma da toni radiosi stesi in pennellate d'olio libere. Giovanni Bellini aprì la via con una luce morbida e luminosa; Giorgione portò un nuovo clima poetico; e Tiziano, il più grande di tutti, dominò la pittura europea per mezzo secolo. Più tardi Veronese e Tintoretto estesero la tradizione al grande spettacolo. Le tele veneziane erano pregiate in tutta Europa da re, papi e collezionisti.",
    figures: [
      'Giovanni Bellini — fondatore, colore luminoso',
      'Giorgione — un clima poetico e atmosferico',
      'Tiziano — il colorista supremo',
      'Veronese, Tintoretto — il grande spettacolo',
    ],
    legacy:
      "L'amore veneziano per il colore e la pennellata libera ebbe un'influenza immensa. Alimentò direttamente il barocco di Rubens e Velázquez e, secoli dopo, contribuì a ispirare la pittura libera e guidata dal colore degli impressionisti.",
  },
  manierismo: {
    title: 'Manierismo',
    lead:
      "Lo stile consapevolmente elegante e artificioso della generazione dopo il pieno Rinascimento, che pregiava la raffinatezza, l'eleganza e la stranezza sull'equilibrio naturale.",
    era: 'c. 1520–1600',
    origin: 'Italia',
    hallmarks: [
      'Arti impossibilmente allungati e pose contorte e instabili',
      'Uno spazio affollato, ambiguo e compresso',
      'Un colore acido e inatteso',
      'Un\'eleganza vistosa e una grazia fredda e cerebrale',
    ],
    origins:
      "Il Manierismo emerse in Italia intorno al 1520, nella generazione dopo il pieno Rinascimento. Ereditata un'arte apparentemente perfetta da Leonardo, Michelangelo e Raffaello, i pittori più giovani cercarono non ulteriore naturalismo ma un'eleganza sapiente e raffinata — una bellezza spinta verso la tensione e l'artificio. La parola viene dall'italiano « maniera », lo stile o modo: un'arte fatta con vistosa eleganza. Fiorì in un'epoca turbolenta di crisi religiosa e del traumatico Sacco di Roma del 1527, e la sua instabilità e inquietudine possono sembrare uno specchio delle angosce del suo tempo.",
    figures: [
      'Pontormo, Parmigianino — l\'elegante allungamento',
      'Bronzino — freddi ritratti di corte levigati',
      'El Greco — un\'intensità spirituale simile a una fiamma',
    ],
    legacy:
      "A lungo liquidato come un decadente declino dal Rinascimento, il Manierismo è oggi apprezzato per la sua inventiva e complessità psicologica. Fa da ponte tra l'ideale sereno del Rinascimento e il drammatico dinamismo del barocco.",
  },
  barroco: {
    title: 'Barocco',
    lead:
      "L'arte drammatica ed emotiva del Seicento, che mirava soprattutto a commuovere lo spettatore — a travolgere i sensi e agitare le emozioni attraverso il movimento, lo spettacolo e una luce intensa.",
    era: 'XVII–XVIII sec.',
    origin: 'Italia, poi tutta Europa',
    hallmarks: [
      'Forti contrasti di luce e ombra (chiaroscuro)',
      'Ampie composizioni in diagonale e movimento',
      'Gesti teatrali e un realismo vivo e immediato',
      'Una grandiosità intesa a travolgere i sensi',
    ],
    origins:
      "Il barocco dominò l'arte europea per tutto il Seicento e fino al Settecento. Nacque in parte dalla Controriforma della Chiesa cattolica, che usò un'arte emotivamente potente e accessibile per ispirare la fede contro il più sobrio nord protestante; ma servì anche monarchi assoluti e corti ansiose di proiettare grandiosità e potere. Lo stile prese forme diverse per l'Europa — appassionato e religioso in Italia e Spagna, opulento e sensuale nelle Fiandre, sobrio e intimo nella Repubblica olandese — ma tutti condivisero un gusto per il dinamismo e la luce drammatica, avviato dall'illuminazione rivoluzionaria di Caravaggio.",
    figures: [
      'Caravaggio — un\'illuminazione drammatica rivoluzionaria',
      'Rubens — la travolgente energia fiamminga',
      'Velázquez, Rembrandt — pennello e profondità abbaglianti',
    ],
    legacy:
      "Il barocco produsse alcune delle immagini più potenti dell'arte occidentale. La sua padronanza della luce, dell'emozione e del movimento plasmò la pittura per generazioni e definisce ancora il nostro senso del racconto visivo teatrale e drammatico.",
  },
  neerlandes: {
    title: 'Secolo d\'oro olandese',
    lead:
      "La stupefacente fioritura seicentesca della pittura nella Repubblica olandese, appena indipendente, protestante e prospera, che fece del mondo quotidiano il soggetto della grande arte.",
    era: 'XVII sec.',
    origin: 'Repubblica olandese',
    hallmarks: [
      'Generi quotidiani: ritratti, paesaggi, marine, nature morte, interni',
      'Una luce naturale onesta e attentamente osservata',
      'Modesti soggetti domestici trattati con cura',
      'Opere di piccolo formato fatte per le case comuni',
    ],
    origins:
      "Nel Seicento una piccola nazione appena indipendente creò un vasto corpo d'arte per un pubblico ampio, in gran parte borghese. Senza la Chiesa né grandi corti come mecenati, gli artisti olandesi dipingevano per le case comuni, e i quadri si compravano e vendevano quasi come qualsiasi altra merce in un fiorente mercato aperto. Perfezionarono i generi della vita quotidiana — ritratti, paesaggi, nature morte e quieti interni domestici — pregiati per la loro onestà e la luce attentamente osservata. Quest'arte rifletteva una società fiduciosa, mercantile e marinara che valorizzava il mondo visibile, la pulizia, la prosperità e la virtù domestica.",
    figures: [
      'Rembrandt — profondità psicologica e luce',
      'Vermeer — sereni interni luminosi',
      'Frans Hals — un\'energia brillante e viva',
    ],
    legacy:
      "Il secolo d'oro olandese elevò i soggetti quotidiani a grande arte e diede alla pittura occidentale alcune delle sue immagini più amate. Il suo realismo intimo e il sottile trattamento della luce continuano a commuovere gli spettatori quattro secoli dopo.",
  },
  espanol: {
    title: 'Secolo d\'oro spagnolo',
    lead:
      "L'arte intensa, spesso austera, della Spagna all'apice del suo impero, plasmata da una corte e una Chiesa cattoliche ferventi durante il « Siglo de Oro ».",
    era: 'c. 1550–1660',
    origin: 'Spagna',
    hallmarks: [
      'Un realismo crudo e una profonda intensità spirituale',
      'Drammatici contrasti di luce e ombra',
      'Un clima grave e cerimoniale, anche nei ritratti reali',
      'Soggetti dall\'austerità ascetica alla ricca sensualità',
    ],
    origins:
      "Il Siglo de Oro spagnolo, all'incirca dal 1550 al 1660, coincise con l'apice del suo impero e produsse un'arte di grande intensità emotiva e religiosa. Servì la monarchia asburgica e la Chiesa della Controriforma, decorando palazzi, conventi e cattedrali; persino i suoi ritratti reali portano una nota di gravità solenne e cerimoniale propria della Spagna. I suoi maestri vanno da El Greco, le cui figure allungate tendono verso il divino, a Velázquez, pittore di corte di ineguagliata sottigliezza e verità, e a Zurbarán e Ribera, che diedero ai soggetti sacri un realismo grave e tangibile.",
    figures: [
      'El Greco — figure allungate ed estatiche',
      'Velázquez — verità e sottigliezza ineguagliate',
      'Zurbarán, Ribera — un grave realismo sacro',
    ],
    legacy:
      "Il secolo d'oro spagnolo diede al mondo alcuni dei suoi dipinti religiosi più profondi e, in Velázquez, uno dei più grandi pittori di ogni tempo — un artista la cui onestà e tecnica avrebbero ispirato tanto Goya quanto Manet e Picasso.",
  },
  neoclasicismo: {
    title: 'Neoclassicismo e arte accademica',
    lead:
      "Un ritorno deliberato alla nobile semplicità e alla serietà morale dell'antica Grecia e di Roma, in reazione contro la frivolezza del rococò e l'eccesso del tardo barocco.",
    era: 'metà XVIII–XIX sec.',
    origin: 'Francia e Italia',
    hallmarks: [
      'Una linea e un disegno chiari e scultorei',
      'Un colore sobrio e trattenuto, una composizione equilibrata',
      'Soggetti civici, eroici o morali elevati',
      'Il sentimento disciplinato dall\'ordine e dalla ragione',
    ],
    origins:
      "Il Neoclassicismo sorse a metà Settecento, ispirato dai recenti scavi di Pompei ed Ercolano, che misero il mondo antico vividamente davanti agli occhi dell'Europa. Cercò la virtù e la ragione più che il mero piacere, e il suo maestro supremo, Jacques-Louis David, dipinse severi drammi morali che divennero emblemi prima della Rivoluzione francese e poi dell'impero di Napoleone. Divenne lo stile ufficiale delle accademie d'arte, che formavano i pittori nel disegno rigoroso e nella forma idealizzata, e quest'arte « accademica » dominò i salon dell'Ottocento prima che le avanguardie moderne la sfidassero.",
    figures: [
      'Jacques-Louis David — severi drammi rivoluzionari',
      'Ingres — un classicismo freddo e preciso',
    ],
    legacy:
      "Benché ribelli successivi ne respingessero le regole, il Neoclassicismo definì l'aspetto della pittura europea seria per un secolo. La sua chiarezza, disciplina e reverenza per l'antichità restano una corrente duratura dell'arte occidentale.",
  },
  romanticismo: {
    title: 'Romanticismo',
    lead:
      "Una rivolta appassionata contro l'ordine neoclassico e la ragione illuminista, che difese l'emozione, l'immaginazione e l'individuo contro le regole e la razionalità.",
    era: 'fine XVIII–XIX sec.',
    origin: 'Europa',
    hallmarks: [
      'Il sublime: soggezione, terrore e stupore davanti alla natura selvaggia',
      'Un colore audace e un\'energia carica e dinamica',
      'Tempeste, naufragi, rovine, terre esotiche e lotte eroiche',
      'La visione interiore dell\'artista come vera fonte dell\'arte',
    ],
    origins:
      "Il Romanticismo travolse l'arte europea alla fine del Settecento e all'inizio dell'Ottocento, in un'epoca di rivoluzione, sconvolgimento e nuovo nazionalismo, e di un desiderio di autenticità, mistero e selvaggio indomito. Reagì contro la fredda sobrietà del Neoclassicismo, pregiando il sentimento sulle regole e la vita interiore dell'artista sopra ogni cosa. In Francia, Géricault e Delacroix dipinsero scene turbolente di dramma e rivolta; in Germania, Caspar David Friedrich trasformò figure solitarie davanti a vasti paesaggi in meditazioni sull'anima; in Gran Bretagna, Turner dissolveva il mondo in luce e atmosfera.",
    figures: [
      'Géricault, Delacroix — il turbolento dramma francese',
      'Caspar David Friedrich — l\'anima solitaria nella natura',
      'Turner — il mondo dissolto nella luce',
    ],
    legacy:
      "Il Romanticismo liberò il colore, il sentimento e la soggettività nella pittura, e la sua esaltazione dell'espressione individuale aprì la via a gran parte dell'arte moderna. Le sue immagini della potenza della natura e del sé solitario risuonano ancora profondamente.",
  },
  realismo: {
    title: 'Realismo',
    lead:
      "L'insistenza nel raffigurare il mondo comune onestamente, esattamente com'è, respingendo sia l'idealismo neoclassico sia la fantasia romantica.",
    era: 'metà XIX sec.',
    origin: 'Francia',
    hallmarks: [
      'Soggetti senza gloria: contadini, operai, lavandaie, vita quotidiana',
      'Umili soggetti dipinti a una scala grande e seria',
      'L\'osservazione veritiera anziché l\'abbellimento',
      'Una quieta dignità, talvolta con una nota di protesta sociale',
    ],
    origins:
      "Il Realismo emerse in Francia intorno agli anni 1840 e 1850, in un'epoca di rivoluzione politica e mutamento industriale, quando artisti e scrittori divennero nuovamente attenti alle condizioni sociali e alla vita della gente comune. Si volse a soggetti un tempo indegni dell'arte « seria » — i poveri delle campagne e delle città — e li dipinse alla grande scala un tempo riservata a dèi ed eroi, dando loro una quieta dignità. Gustave Courbet guidò il movimento con provocazione deliberata, mentre Jean-François Millet diede al lavoro rurale una gravità monumentale, quasi sacra; la corrente affine del naturalismo spinse ancora più in là verso un'osservazione schietta e scientifica.",
    figures: [
      'Gustave Courbet — il capofila provocatore',
      'Jean-François Millet — il contadino monumentale',
    ],
    legacy:
      "Liberando la pittura dal mito e dall'idealizzazione e radicandola nella realtà osservata, il Realismo aprì la porta all'arte moderna. La sua onesta attenzione alla vita quotidiana alimentò direttamente l'impressionismo e i movimenti che seguirono.",
  },
  realismosocial: {
    title: 'Realismo sociale',
    lead:
      "Un realismo che volge il suo sguardo onesto specificamente alla realtà sociale e politica — povertà, lavoro, disuguaglianza e ingiustizia — usando uno stile semplice e diretto per testimoniare.",
    era: 'XIX–XX sec.',
    origin: 'Tutto il mondo',
    hallmarks: [
      'I poveri, gli sfruttati e i lavoratori al centro stesso',
      'Uno stile semplice e senza sentimentalismo che affronta la miseria',
      'Un appello all\'empatia, alla consapevolezza o alla coscienza',
      'Il lavoro e la lotta là dove un tempo stavano eroi o dèi',
    ],
    origins:
      "Il Realismo sociale è una corrente dell'arte realista comparsa in tutto il mondo a partire dall'Ottocento, ovunque l'industrializzazione, la migrazione e la disuguaglianza creassero sofferenza visibile — compresa l'America latina, dove i pittori registrarono la vita dei poveri delle città e dei diseredati. Anziché idealizzare o intrattenere, mette lo spettatore di fronte ai disoccupati, agli sfruttati e agli affamati. È strettamente legato ai più ampi movimenti di riforma sociale, e la sua forza emotiva viene dal porre la lotta quotidiana al cuore del quadro.",
    figures: [
      'Ernesto de la Cárcova — la protesta sociale argentina',
      'Reinaldo Giudici — i poveri delle città',
    ],
    legacy:
      "Il Realismo sociale diede all'arte una voce morale e politica, ricordando agli spettatori realtà facili da ignorare. La sua tradizione dell'arte come testimone e coscienza proseguì con forza nel Novecento.",
  },
  realismoamericano: {
    title: 'Realismo e Regionalismo americano',
    lead:
      "La spinta, tra fine Ottocento e inizio Novecento, a raffigurare la vita americana in modo diretto e veritiero, anziché attraverso ideali europei presi in prestito.",
    era: 'fine XIX–XX sec.',
    origin: 'Stati Uniti',
    hallmarks: [
      'Scene americane quotidiane: strade, fattorie, marinai, operai',
      'Un\'osservazione fresca e senza sentimentalismo',
      'L\'attenzione del Regionalismo alla vita rurale e del cuore del paese',
      'L\'immobilità e la solitudine nella città moderna',
    ],
    origins:
      "Mentre gli Stati Uniti diventavano una potenza mondiale, i loro artisti cercarono un'identità visiva fiduciosa e indipendente, radicata nelle scene e nelle persone del paese. I pittori realisti raffiguravano il quotidiano con occhio fresco e senza sentimentalismo — le vigorose scene del mare e dell'infanzia campestre di Winslow Homer ne sono esempi classici. Negli anni Trenta, durante la Depressione, il movimento affine del Regionalismo celebrò l'America rurale e delle piccole città come risposta locale al modernismo europeo, mentre Edward Hopper distillò tutta quella corrente in immagini di immobilità e solitudine moderna.",
    figures: [
      'Winslow Homer — il mare e la vita campestre',
      'Grant Wood — il cuore del paese regionalista (« American Gothic »)',
      'Edward Hopper — la solitudine moderna',
    ],
    legacy:
      "Insieme questi artisti forgiarono un'arte americana fiduciosa e indipendente, radicata nell'ambiente e nel carattere locali, dando alla giovane nazione immagini che sentiva autenticamente sue.",
  },
  costumbrismo: {
    title: 'Costumbrismo',
    lead:
      "L'affettuosa raffigurazione artistica dei costumi, dell'abbigliamento, dei « tipi » e della vita quotidiana di un luogo e di un popolo, trattando il locale e l'ordinario come soggetti degni.",
    era: 'XIX sec.',
    origin: 'Spagna e America latina',
    hallmarks: [
      'Scene di mercati, feste, danze popolari e taverne di campagna',
      'Il costume regionale e i « tipi » popolari',
      'Una calda pittura di genere, dettagliata e attentamente osservata',
      'Il gaucho, l\'huaso, il venditore, la danza rurale',
    ],
    origins:
      "Il Costumbrismo fiorì soprattutto nella Spagna dell'Ottocento e in tutta l'America latina. Anziché la grande storia o il mito, i suoi pittori registrarono la trama di una società — il suo lavoro, i suoi svaghi, i suoi riti e personaggi — con calore e dettaglio. Il movimento sorse insieme al nazionalismo ottocentesco, mentre nazioni appena indipendenti cercavano di definire la loro identità attraverso la propria terra, il proprio popolo e le proprie tradizioni, e queste immagini contribuirono a plasmare il modo in cui le società si raffiguravano.",
    figures: [
      'Manuel Antonio Caro — la danza nazionale del Cile',
      'José Agustín Arrieta — la vita quotidiana messicana',
    ],
    legacy:
      "Il Costumbrismo lasciò un'inestimabile testimonianza visiva di modi di vita scomparsi e della cultura popolare. Caldo, osservatore e radicato nel luogo, resta centrale nel patrimonio artistico nazionale di molti paesi ispanofoni.",
  },
  hudson: {
    title: 'Hudson River School',
    lead:
      "Il primo grande movimento paesaggistico dell'arte americana, che raffigurò la natura selvaggia del Nuovo Mondo come vasta, sublime e donata da Dio.",
    era: '1820–1870',
    origin: 'Stati Uniti',
    hallmarks: [
      'Una scala grandiosa e maestosa',
      'Montagne, foreste, fiumi e cieli luminosi',
      'Una luce radiosa e drammatica',
      'La terra indomita come nazionale e persino divina',
    ],
    origins:
      "La Hudson River School prese il nome dalla scenografica valle dell'Hudson, nello Stato di New York, dove i suoi fondatori dipinsero per la prima volta negli anni 1820. Sorse mentre i giovani Stati Uniti si espandevano verso ovest e forgiavano un'identità nazionale, facendo della natura selvaggia una fonte di orgoglio e persino di destino divino. Thomas Cole fondò il movimento e gli diede una dimensione morale e spirituale — alcune sue opere piangono in sordina la perdita della terra a favore dello sviluppo — mentre una generazione successiva, tra cui Frederic Church e Albert Bierstadt, spinse verso panorami sempre più spettacolari del Nuovo Mondo e oltre.",
    figures: [
      'Thomas Cole — fondatore, visione morale e spirituale',
      'Frederic Church, Albert Bierstadt — vasti panorami',
    ],
    legacy:
      "La Hudson River School stabilì il paesaggio come soggetto americano serio e plasmò il modo in cui la nazione vedeva la propria terra. La sua visione sublime della natura selvaggia resta una pietra angolare dell'arte americana.",
  },
  impresionismo: {
    title: 'Impressionismo',
    lead:
      "Una ribellione contro la pittura accademica che cercò di cogliere gli effetti fugaci di luce, colore e atmosfera in un singolo istante che passa — uno dei movimenti più amati della storia dell'arte.",
    era: '1860–1880',
    origin: 'Parigi',
    hallmarks: [
      'Pennellate libere e frammentate',
      'Colori vivi e non mescolati',
      'Spesso dipinto in fretta, all\'aperto, davanti al soggetto',
      'Soggetti moderni: caffè, boulevard, giardini, stazioni, svaghi',
    ],
    origins:
      "L'Impressionismo nacque a Parigi negli anni 1860 e 1870 come rivolta contro le rigide convenzioni del Salon ufficiale e della pittura accademica. I suoi artisti lavoravano in fretta, spesso all'aperto, usando pennellate libere e colore vivo per registrare l'« impressione » immediata di una scena anziché il suo dettaglio fisso e preciso, prendendo a soggetto il mondo moderno intorno a loro. Il nome venne da una recensione beffarda di « Impressione, sole nascente » di Monet alla prima mostra indipendente del gruppo nel 1874 — ciò che i critici liquidavano come abbozzato e incompiuto, gli artisti lo abbracciarono come un modo più vero di vedere.",
    figures: [
      'Claude Monet — la luce e l\'atmosfera',
      'Renoir, Degas, Pissarro',
      'Morisot, Cassatt, Sisley, Caillebotte',
    ],
    legacy:
      "L'Impressionismo trasformò l'arte pregiando la percezione, la spontaneità e la vita moderna quotidiana. Liberò il colore e la pennellata dalla descrizione stretta e aprì la porta a tutta l'avventura della pittura moderna.",
  },
  posimpresionismo: {
    title: 'Postimpressionismo',
    lead:
      "L'arte varia che costruì sul colore vivo dell'impressionismo ma lo superò verso una maggiore struttura, emozione, simbolismo ed espressione personale.",
    era: '1880–1900',
    origin: 'Francia',
    hallmarks: [
      'Il colore vivo usato per il sentimento e il significato, non solo per la luce',
      'Più struttura, simbolismo ed espressione interiore',
      'Stili altamente personali e individuali',
      'Oltre l\'istante ottico fugace',
    ],
    origins:
      "Il Postimpressionismo è il termine per l'arte varia emersa in Francia negli anni 1880 e 1890, che mantenne il colore dell'impressionismo ma ne respinse l'attenzione all'impressione momentanea. I suoi artisti non formarono mai un gruppo unico; ciascuno si mosse in una propria direzione, convinto che la pittura dovesse esprimere più di quanto il solo occhio percepisca — e la loro opera fu spesso fraintesa e sottovalutata in vita. Cézanne ricostruì la natura da solidi piani geometrici; Van Gogh caricò le sue tele di colore ed emozione intensi; Seurat applicò il colore con rigore scientifico; Gauguin appiattì la forma in cerca di un'arte simbolica.",
    figures: [
      'Cézanne — la forma da piani geometrici',
      'Van Gogh — colore ed emozione intensi',
      'Gauguin — un colore piatto e simbolico',
      'Seurat — il colore scientifico (puntinismo)',
    ],
    legacy:
      "Il Postimpressionismo fu il ponte cruciale verso l'arte moderna del Novecento. Van Gogh, Cézanne e Gauguin in particolare divennero influenze enormi sull'espressionismo, il cubismo, il fauvismo e quasi tutto ciò che seguì.",
  },
  neoimpresionismo: {
    title: 'Neoimpressionismo (puntinismo)',
    lead:
      "Uno sviluppo sistematico e scientifico dell'impressionismo che costruì immagini luminose da innumerevoli piccoli punti di colore puro e non mescolato.",
    era: '1880–1890',
    origin: 'Francia',
    hallmarks: [
      'Il puntinismo: minuscoli punti separati di colore non mescolato',
      'Colori mescolati dall\'occhio, non sulla tavolozza',
      'Una calma cristallina, immobile e ordinata',
      'Un metodo minuzioso, quasi meditativo',
    ],
    origins:
      "Il Neoimpressionismo sorse in Francia negli anni 1880 come sviluppo più razionale e disciplinato dell'impressionismo. Dove gli impressionisti lavoravano per istinto e spontaneità, i suoi artisti applicavano le teorie contemporanee del colore e dell'ottica, ponendo punti di colore puro fianco a fianco perché l'occhio li fondesse in toni più vivi, in teoria, della pittura mescolata. Georges Seurat fu pioniere dell'approccio; Paul Signac ne divenne il principale sostenitore e teorico. Il movimento rifletteva una fede di fine Ottocento nella scienza e nell'ordine, applicata all'atto stesso della percezione, e costruire un grande quadro punto per punto era un lavoro lento, quasi meditativo.",
    figures: [
      'Georges Seurat — pioniere del metodo',
      'Paul Signac — il suo principale sostenitore e teorico',
    ],
    legacy:
      "Benché di breve durata come metodo rigoroso, il Neoimpressionismo influenzò molti artisti successivi, tra cui Matisse e i fauves. Il suo uso audace e analitico del colore puro contribuì a spingere la pittura verso l'astrazione moderna.",
  },
  simbolismo: {
    title: 'Simbolismo',
    lead:
      "Un volgersi verso l'interno — verso sogni, mito, emozione e immaginazione — in reazione contro il Realismo e l'Impressionismo rivolti verso l'esterno.",
    era: '1880–1900',
    origin: 'Francia e Belgio',
    hallmarks: [
      'La suggestione, il clima e la metafora più che la raffigurazione letterale',
      'Temi di amore, morte, desiderio, mistero e spiritualità',
      'Un\'immaginazione enigmatica, spesso inquietante, onirica',
      'La soggettività e la vita interiore',
    ],
    origins:
      "Il Simbolismo sorse negli anni 1880, soprattutto in Francia e Belgio ma diffondendosi per l'Europa. Dove il Realismo e l'Impressionismo guardavano all'esterno, al mondo visibile, il Simbolismo si volse all'interno, usando un'immagine evocativa, il clima e la metafora per alludere a idee e sentimenti che non potevano essere mostrati letteralmente. Andava di pari passo con la poesia simbolista e rifletteva un clima di fine secolo di introspezione, ricerca spirituale e inquietudine, pregiando l'immaginazione sulla realtà oggettiva.",
    figures: [
      'Gustave Moreau, Odilon Redon — i visionari francesi',
      'Edvard Munch — angoscia e desiderio',
      'Gustav Klimt — un\'allegoria sensuale e ornamentale',
    ],
    legacy:
      "L'accento del Simbolismo sull'immaginazione, sull'inconscio e sulla forza emotiva dell'immagine ebbe una profonda influenza sull'arte del Novecento, alimentando direttamente l'espressionismo e, più tardi, il surrealismo.",
  },
  modernismo: {
    title: 'Modernismo / Art Nouveau',
    lead:
      "Un movimento decorativo di fine secolo che cercò uno stile fresco e moderno, libero dall'imitazione storica, traendo le sue forme dalla natura.",
    era: 'c. 1890–1910',
    origin: 'Europa',
    hallmarks: [
      'Linee sinuose e fluenti « a colpo di frusta »',
      'Forme organiche di piante e fiori',
      'Un motivo elegante e ornamentale',
      'Uno stile totale che unisce arte, architettura, vetro e design',
    ],
    origins:
      "Intorno al 1900 un movimento decorativo travolse l'Europa sotto molti nomi — Art Nouveau in Francia, Modernismo in Catalogna, Jugendstil in Germania, stile Secessione a Vienna. Fiorì in un periodo di ottimismo, progresso industriale e nuovo svago urbano, e mirava a essere bello, armonioso e pienamente del proprio momento. Movimento di design totale, unì pittura, architettura, gioielleria, mobilio e grafica; in pittura è incarnato soprattutto da Gustav Klimt, le cui tele dorate e a motivi fondono figura e ornamento.",
    figures: [
      'Gustav Klimt — tele dorate e a motivi',
      'Alphonse Mucha — fluenti manifesti decorativi',
    ],
    legacy:
      "Benché il suo apogeo fosse breve, l'Art Nouveau rimodellò il design e le arti decorative e contribuì a modernizzare il linguaggio visivo dell'Europa. La sua fluente eleganza resta immediatamente riconoscibile e infinitamente influente.",
  },
  fovismo: {
    title: 'Fauvismo',
    lead:
      "Il primo movimento d'avanguardia del Novecento — breve ma esplosivo — costruito sulla totale liberazione del colore dal suo dovere di descrivere la realtà.",
    era: 'c. 1904–1908',
    origin: 'Francia',
    hallmarks: [
      'Colore puro, intenso, spesso arbitrario, direttamente dal tubetto',
      'Un volto può essere verde, un cielo rosa',
      'Pennellate audaci ed energiche',
      'Il colore al servizio dell\'emozione e del disegno, non della descrizione',
    ],
    origins:
      "Il Fauvismo esplose in Francia intorno al 1904-1908, costruendo sugli esperimenti di colore di Van Gogh, Gauguin e dei neoimpressionisti e spingendoli a un estremo gioioso. I suoi pittori usavano un colore puro e intenso al servizio del sentimento e del disegno anziché dell'apparenza delle cose. Il nome venne da un critico che, vedendo le loro tele selvagge al Salon d'Automne del 1905, chiamò i pittori « les fauves » — le bestie selvagge — un insulto che gli artisti abbracciarono con orgoglio.",
    figures: [
      'Henri Matisse — il capofila',
      'André Derain, Maurice de Vlaminck',
    ],
    legacy:
      "Benché durasse solo pochi anni, il Fauvismo fu una svolta decisiva. Liberando del tutto il colore dal suo dovere di descrivere il mondo, aprì la via all'espressionismo, all'astrazione e a gran parte dell'arte moderna.",
  },
  expresionismo: {
    title: 'Espressionismo',
    lead:
      "L'arte dell'emozione interiore cruda, che deforma deliberatamente colore, linea e forma per mostrare il mondo come si sente anziché come appare.",
    era: 'inizio XX sec.',
    origin: 'Germania e Austria',
    hallmarks: [
      'Forme deliberatamente deformate e contorte',
      'Colori che stridono e una pennellata frastagliata e agitata',
      'Angoscia, passione, alienazione e anelito spirituale',
      'Il sentimento soggettivo sulla realtà oggettiva',
    ],
    origins:
      "L'Espressionismo fiorì soprattutto in Germania e Austria all'inizio del Novecento, nascendo dalle tensioni di una società che si modernizzava in fretta, ansiosa e sull'orlo della Prima guerra mondiale, e attingendo alla forza emotiva di Van Gogh, Munch e dei simbolisti. In Germania si formarono due gruppi chiave: Die Brücke (Il Ponte), guidato da Kirchner, con le sue dure e spigolose scene urbane; e Der Blaue Reiter (Il Cavaliere azzurro), con Kandinsky e Franz Marc, che perseguiva un'arte spirituale e sempre più astratta. In Austria, Egon Schiele spinse il corpo verso un'intensità cruda e angosciata.",
    figures: [
      'Kirchner — le dure città di Die Brücke',
      'Kandinsky, Franz Marc — Der Blaue Reiter',
      'Egon Schiele — corpi crudi e angosciati',
    ],
    legacy:
      "L'Espressionismo fece del sentimento interiore dell'artista il vero soggetto dell'arte. La sua intensità emotiva e la sua deformazione espressiva ebbero un impatto duraturo, risuonando nella pittura moderna e contemporanea.",
  },
  cubismo: {
    title: 'Cubismo',
    lead:
      "Una delle rivoluzioni più radicali della storia dell'arte occidentale, che frantumò gli oggetti in faccette geometriche e li riassemblò, mostrando più punti di vista insieme.",
    era: 'c. 1907–1914',
    origin: 'Parigi',
    hallmarks: [
      'Oggetti frammentati in piani geometrici',
      'Più punti di vista combinati in un\'unica immagine',
      'Abbandonata la prospettiva unica e fissa',
      'Più tardi: colore più vivo, forme più semplici e collage',
    ],
    origins:
      "Il Cubismo fu inventato a Parigi da Pablo Picasso e Georges Braque tra il 1907 e il 1914 circa. Abbandonando la prospettiva unica e fissa che governava la pittura dal Rinascimento, trattarono la tela piatta come uno spazio di nuovo genere. Il primo cubismo « analitico » frammentava le forme in griglie quasi astratte e monocrome; il cubismo « sintetico » successivo reintrodusse un colore più vivo, forme più semplici e persino materiali incollati (il collage). Il movimento attinse alla pittura strutturale di Cézanne e alla scultura africana e iberica, e rifletteva un mondo moderno di nuova scienza, velocità e punti di vista mutevoli.",
    figures: [
      'Pablo Picasso e Georges Braque — cofondatori',
      'Juan Gris, Fernand Léger — cubisti successivi',
    ],
    legacy:
      "Il Cubismo reinventò il modo in cui una superficie piatta può rappresentare forma e spazio, e le sue idee si propagarono al futurismo, all'astrazione e a innumerevoli movimenti successivi. È una pietra di fondazione dell'arte del Novecento.",
  },
  futurismo: {
    title: 'Futurismo',
    lead:
      "Un'avanguardia italiana aggressiva e proiettata al futuro che respinse il passato e glorificò la velocità, l'energia e la macchina dell'età moderna.",
    era: 'c. 1909–1918',
    origin: 'Italia',
    hallmarks: [
      'Il movimento, la velocità e l\'energia resi visibili sulla tela',
      'Figure fratturate in piani ripetuti e sovrapposti e in « linee di forza »',
      'Automobili, macchine, folle e la città elettrica',
      'Forme frammentate prese in prestito dal cubismo',
    ],
    origins:
      "Il Futurismo fu lanciato nel 1909 con un infuocato manifesto del poeta Filippo Marinetti. Venerava la velocità, la tecnologia, l'industria e persino la violenza e la guerra, che vedeva come forze che spazzavano via un vecchio mondo stantio. In pittura, Umberto Boccioni e Giacomo Balla fratturavano figure in movimento in piani sovrapposti per rendere visibile il movimento stesso, attingendo largamente alle forme frammentate del cubismo. Il movimento si estese oltre la pittura alla scultura, alla musica e al design, e fu legato alla turbolenta politica dell'Italia del primo Novecento.",
    figures: [
      'Umberto Boccioni — il suo principale artista e teorico',
      'Giacomo Balla — il movimento e la luce',
    ],
    legacy:
      "Benché si spegnesse dopo la Prima guerra mondiale, la visione dinamica del movimento e della modernità del Futurismo influenzò l'arte e il design successivi. Il suo tentativo di dipingere la pura velocità e forza resta uno degli esperimenti più audaci del modernismo.",
  },
  suprematismo: {
    title: 'Suprematismo',
    lead:
      "Un movimento pionieristico di pura astrazione geometrica che lasciò ogni riferimento al mondo visibile a favore del puro sentimento e della pura forma.",
    era: 'dal 1915',
    origin: 'Russia',
    hallmarks: [
      'Forme semplici: quadrati, cerchi, croci e linee',
      'Una gamma limitata di colori su fondi bianchi lisci',
      'Forme che fluttuano libere dalla gravità e dagli oggetti',
      'La supremazia del puro sentimento sulla raffigurazione',
    ],
    origins:
      "Il Suprematismo fu fondato dall'artista russo Kazimir Malevič nel 1915, nel fermento intorno alla Rivoluzione russa. Ridusse l'arte agli elementi più nudi — semplici forme geometriche che fluttuano sul bianco — affermando la supremazia del puro sentimento e della pura forma sulla raffigurazione degli oggetti. Il suo austero « Quadrato nero » era inteso come « zero della forma », un radicale nuovo inizio; lo appese persino in alto in un angolo, il luogo tradizionale di un'icona sacra. Il movimento fece parte dell'esplosione di sperimentazione d'avanguardia della nascente Russia sovietica, quando molti credevano che l'arte astratta potesse aiutare a costruire un mondo e una coscienza nuovi.",
    figures: [
      'Kazimir Malevič — fondatore',
      'El Lissitzky — portò le sue idee nel design',
    ],
    legacy:
      "Tra i primi movimenti pienamente astratti, il Suprematismo ebbe una profonda influenza sul corso dell'arte e del design moderni. La sua riduzione della pittura a pura geometria e sentimento contribuì a definire l'astrazione stessa.",
  },
  neoplasticismo: {
    title: 'Neoplasticismo (De Stijl)',
    lead:
      "Uno stile astratto rigoroso ridotto a linee rette, angoli retti e i tre colori primari, in cerca di un'armonia universale sotto il mondo visibile.",
    era: 'dal 1917',
    origin: 'Paesi Bassi',
    hallmarks: [
      'Solo linee nere orizzontali e verticali',
      'Piani piatti di rosso, giallo e blu, con bianco, grigio e nero',
      'Né curve, né diagonali, né oggetti riconoscibili',
      'Un equilibrio attento e preciso di ogni proporzione',
    ],
    origins:
      "Il Neoplasticismo fu lo stile astratto severo sviluppato dal pittore olandese Piet Mondrian e sostenuto dal gruppo De Stijl (« Lo Stile ») che egli cofondò nei Paesi Bassi nel 1917. Mondrian credeva che distillare la pittura ai suoi assoluti essenziali potesse esprimere un'armonia e un equilibrio universali sotto il caos del mondo visibile — un'ambizione spirituale, quasi utopica, più che una semplice decorazione. De Stijl estese queste idee oltre la pittura, all'architettura, al mobilio e al design, mirando a rimodellare l'intero ambiente visivo secondo un ordine puro e razionale.",
    figures: [
      'Piet Mondrian — il suo creatore',
      'Theo van Doesburg — cofondatore di De Stijl',
    ],
    legacy:
      "Il Neoplasticismo divenne una delle correnti più influenti dell'arte e del design moderni. La sua geometria netta e i suoi colori primari plasmarono l'architettura e la grafica del Novecento, e restano immediatamente riconoscibili oggi.",
  },
  ukiyoe: {
    title: 'Ukiyo-e',
    lead:
      "Stampe xilografiche e dipinti giapponesi del « mondo fluttuante » — la cultura urbana alla moda e in cerca di piacere del periodo Edo.",
    era: 'XVII–XIX sec.',
    origin: 'Giappone (Edo)',
    hallmarks: [
      'Campiture piatte di colore e contorni netti ed eleganti',
      'Composizioni audaci, asimmetriche e ritagliate',
      'Stampe popolari e a buon mercato tratte da blocchi di legno incisi',
      'Bellezze, attori, paesaggi e leggende',
    ],
    origins:
      "L'ukiyo-e — « immagini del mondo fluttuante » — fiorì a Edo (l'antica Tokyo) dal Seicento all'Ottocento. Il « mondo fluttuante » indicava i teatri, i quartieri di divertimento, le bellezze celebri, gli attori e i viaggi di una vivace cultura urbana popolare. Realizzate a buon mercato da blocchi di legno incisi, le stampe erano un'arte popolare e accessibile, e i loro maestri spaziavano dai ritratti di cortigiane e attori ai paesaggi drammatici e alle storie fantastiche di mito e storia.",
    figures: [
      'Utamaro — le bellezze (bijin-ga)',
      'Hokusai, Hiroshige — i paesaggi',
      'Kuniyoshi — guerrieri e leggende',
    ],
    legacy:
      "Quando il Giappone si aprì all'Occidente nell'Ottocento, l'ukiyo-e sbalordì gli artisti europei. Questo « giapponismo » influenzò profondamente gli impressionisti e i postimpressionisti — Van Gogh, Monet, Degas e altri — contribuendo a plasmare il corso dell'arte moderna.",
  },
  rinpa: {
    title: 'Scuola Rinpa',
    lead:
      "Una grande tradizione della pittura giapponese classica celebrata per la sua audace bellezza decorativa e per l'uso sfarzoso dell'oro e dell'argento.",
    era: 'dal XVII sec.',
    origin: 'Giappone (Kyoto)',
    hallmarks: [
      'Motivi naturali semplificati e stilizzati come motivo ritmico',
      'Sfarzosa foglia d\'oro e d\'argento e colore piatto e ricco',
      'Una morbida tecnica dell\'« inchiostro raccolto » per foglie e petali',
      'Grandi paraventi e pannelli su temi classici',
    ],
    origins:
      "Il Rinpa fiorì dal Seicento in poi e, a differenza di una stirpe familiare, fu una tradizione trasmessa attraverso l'ammirazione e l'imitazione di generazione in generazione. I suoi artisti prediligevano motivi naturali semplificati — fiori, erbe, alberi, uccelli e acqua — disposti in motivi sorprendenti e ritmici, e rivisitavano spesso temi della letteratura e della poesia giapponesi classiche. Tawaraya Sōtatsu fondò lo stile, e Ogata Kōrin, i cui paraventi di iris e fiori di susino sono tra i suoi vertici, lo portò all'apogeo.",
    figures: [
      'Tawaraya Sōtatsu — fondò lo stile',
      'Ogata Kōrin — iris e fiori di susino',
    ],
    legacy:
      "La fusione Rinpa di natura, motivo e materiali preziosi ebbe un impatto duraturo sul design giapponese e influenzò più tardi l'arte decorativa occidentale e l'Art Nouveau. La sua raffinata eleganza resta un filo determinante dell'estetica giapponese.",
  },
  hasegawa: {
    title: 'Scuola Hasegawa',
    lead:
      "Una scuola di pittura giapponese fondata alla fine del Cinquecento, celebrata soprattutto per i suoi atmosferici paesaggi a inchiostro monocromo.",
    era: 'dalla fine del XVI sec.',
    origin: 'Giappone',
    hallmarks: [
      'Inchiostro monocromo su carta nuda',
      'Vasti spazi vuoti per suggerire la nebbia e il silenzio',
      'Una pennellata sobria ed evocativa radicata nello zen',
      'Anche audaci paraventi a fondo d\'oro del periodo Momoyama',
    ],
    origins:
      "La scuola Hasegawa fu fondata da Hasegawa Tōhaku durante il vibrante periodo Momoyama. Tōhaku assorbì gli ideali della pittura a inchiostro cinese e la tradizione giapponese autoctona, sviluppando uno stile di notevole sottigliezza atmosferica — i suoi paraventi dei « Pini » evocano una foresta nebbiosa usando solo inchiostro nero e vaste distese di carta vuota, un'espressione suprema della suggestione, della sobrietà e dell'apprezzamento zen del vuoto. La scuola produsse anche paraventi riccamente colorati a fondo d'oro nel gusto audace di Momoyama, mostrando la sua ampiezza, dall'inchiostro sobrio alla decorazione sfarzosa.",
    figures: [
      'Hasegawa Tōhaku — fondatore (paraventi dei « Pini »)',
    ],
    legacy:
      "La scuola Hasegawa rappresenta uno dei punti più alti della pittura giapponese a inchiostro. Il suo equilibrio tra audace spazio vuoto e delicata pennellata evocativa è ancora venerato come modello di bellezza contemplativa.",
  },
  naif: {
    title: 'Arte naïf',
    lead:
      "Un'arte fatta da artisti autodidatti che lavorano fuori dalla tradizione accademica, senza formazione formale in prospettiva, anatomia o nelle regole stabilite della pittura.",
    era: 'ogni epoca',
    origin: 'Tutto il mondo',
    hallmarks: [
      'Uno spazio appiattito e una prospettiva non convenzionale',
      'Un colore vivo, spesso irrealistico',
      'Un\'attenzione schietta, minuziosa e infantile al dettaglio',
      'Una schiettezza onirica e poetica',
    ],
    origins:
      "Gli artisti naïf compaiono in tutto il mondo e in ogni epoca, seguendo la propria visione anziché una scuola o una moda. Lungi dall'essere una debolezza, la loro schiettezza senza formazione — spazio appiattito, colore irreale, pari chiarezza infantile data a ogni cosa — conferisce alla loro opera una qualità onirica, spesso potente. Il più celebre, Henri Rousseau, un doganiere francese che non lasciò mai la Francia, evocò lussureggianti giungle immaginarie che incantarono l'avanguardia parigina.",
    figures: [
      'Henri Rousseau — giungle immaginarie',
    ],
    legacy:
      "Nel Novecento gli artisti moderni giunsero ad apprezzare l'arte naïf proprio per la sua freschezza senza formazione e la sua libertà immaginativa, vedendovi un'autenticità che la formazione accademica poteva cancellare. Resta ampiamente amata per la sua onestà e il suo fascino.",
  },
};

/** German movement descriptions (filled batch by batch; falls back to English). */
export const MOVEMENT_INFO_DE: Record<string, MovementInfo> = {
  renacimiento: {
    title: 'Renaissance',
    lead:
      "Die «Wiedergeburt» der Kunst, des Wissens und der Ideale des antiken Griechenland und Rom, die den harmonisch proportionierten Menschen ins Zentrum der Kunst stellte und eine der schöpferischsten Epochen der Geschichte entfachte.",
    era: '14.–16. Jh.',
    origin: 'Italien',
    hallmarks: [
      'Überzeugende Tiefe durch die mathematische Linearperspektive',
      'Anatomisch genaue, feste, gewichtige Figuren',
      'Licht- und Schattenmodellierung für echte Präsenz',
      'Gleichgewicht, Harmonie und idealisierte Schönheit',
      'Klassische Architektur, Mythos und Geschichte wiederbelebt',
    ],
    origins:
      "Die Renaissance schlug Wurzeln in den reichen, konkurrierenden Stadtstaaten Italiens des 14. und 15. Jahrhunderts – vor allem in Florenz – und verbreitete sich in den folgenden zwei Jahrhunderten über Europa. Nach dem Mittelalter belebten Gelehrte und Künstler bewusst die Kultur der Antike wieder, und die Philosophie des Humanismus schätzte die Vernunft, die Würde und das Potenzial des Menschen. Finanziert wurde sie von mächtigen Mäzenen wie den Medici-Bankiers und den Päpsten Roms, die im Prestige durch Kunst wetteiferten. Die Frührenaissance begann in Florenz mit Masaccio, Botticelli und Fra Angelico; um 1500 erreichte sie ihren blendenden Höhepunkt in der Hochrenaissance in Florenz und Rom. In dieser neuen Welt stieg der Künstler vom anonymen mittelalterlichen Handwerker zum gefeierten individuellen Genie auf, das sein Werk signierte und namentlich in Erinnerung blieb.",
    figures: [
      'Leonardo da Vinci — das universale Genie (Mona Lisa)',
      'Michelangelo — heroische Kraft in Farbe und Marmor',
      'Raffael — Anmut und Harmonie (Schule von Athen)',
      'Botticelli, Masaccio, Piero della Francesca — die Frührenaissance',
    ],
    legacy:
      "Sie formte die westliche Kunst dauerhaft um und verankerte Perspektive, Proportion und das unmittelbare Studium der Natur als ihre Grundlagen. Ihre Meisterwerke — die Mona Lisa, die Sixtinische Decke, die Schule von Athen — zählen bis heute zu den am meisten verehrten und wiedererkennbaren Bildern und setzten den Maßstab, an dem sich die europäische Kunst jahrhundertelang maß.",
  },
  renacimientonorte: {
    title: 'Nördliche Renaissance',
    lead:
      "Die Wiederbelebung der Renaissance, wie sie sich nördlich der Alpen entfaltete — italienische Ideen von Proportion und Humanismus aufnehmend, doch durch eine ausgeprägt nordische Liebe zum minuziösen Detail und zur genauen Beobachtung gefiltert.",
    era: '15.–16. Jh.',
    origin: 'Deutschland & die Niederlande',
    hallmarks: [
      'Nahezu mikroskopische Genauigkeit von Haar, Stoff und Licht',
      'Alltagsgegenstände voll verborgener Symbolik',
      'Reiche, leuchtende Farbe aus dem neuen Medium Öl',
      'Forschender, unidealisierter Realismus, besonders in den Bildnissen',
      'Druckgrafik, die Bilder über Europa verbreitete',
    ],
    origins:
      "Während die Renaissance in Italien erblühte, entfaltete sich eine parallele Wiederbelebung in Deutschland, Flandern und darüber hinaus. Wo die italienischen Künstler idealisierten, prüften die nördlichen genau und gaben jedes Haar und jede Stofffalte mit erstaunlicher Präzision wieder. Ihre führende Gestalt, Albrecht Dürer, reiste nach Italien, studierte dessen Proportionstheorien und verschmolz sie mit dem nordischen Handwerk — zugleich wurde er Pionier der Druckgrafik, die Bilder wie nie zuvor über den Kontinent trug. Die Strömung wurde auch von der religiösen Umwälzung der Reformation geprägt: Als sich der Protestantismus ausbreitete, wandten sich die Künstler von religiösen Altarbildern ab dem Bildnis, der Landschaft und Szenen des täglichen Lebens zu und legten so den Grund für die spätere weltliche Malerei.",
    figures: [
      'Albrecht Dürer — verschmolz italienische Theorie mit nordischem Handwerk',
      'Hans Holbein — durchdringende Bildnisse des Tudor-Hofes',
      'Jan van Eyck — leuchtender Öl-Realismus',
      'Pieter Bruegel — wimmelnde Panoramen des Bauernlebens',
    ],
    legacy:
      "Sie schenkte der westlichen Kunst einige ihrer forschendsten Bildnisse und ihre bleibende Liebe zum naturalistischen Detail und zur symbolischen Tiefe. Diese Verbindung von präziser Beobachtung und verborgenem Sinn sollte kraftvoll durch die holländische Malerei und weit darüber hinaus nachhallen.",
  },
  flamenco: {
    title: 'Altniederländische Malerei (Flämische Primitive)',
    lead:
      "Die flämischen Maler des 15. Jahrhunderts, die zu den ersten Meistern der Ölmalerei zählten und leuchtende, juwelenhafte Oberflächen von einer Detailfülle schufen, die ihre Zeitgenossen in Erstaunen versetzte.",
    era: '15. Jh.',
    origin: 'Flandern',
    hallmarks: [
      'Dünne, durchscheinende Öllasuren für glühende Tiefe',
      'Blendendes Detail — Spiegelungen, Texturen, ferne Landschaften',
      'Gewöhnliche Gegenstände mit religiöser Symbolik aufgeladen',
      'Einige der ersten signierten und datierten Gemälde',
      'Kleine Andachtstafeln und großartige Altarbilder',
    ],
    origins:
      "In den reichen Handelsstädten des Flanderns des 15. Jahrhunderts — Brügge, Gent und Brüssel — verwandelte eine Gruppe von Malern die europäische Kunst. Bekannt als die Flämischen Primitiven (ein alter Begriff für «erste», nicht «grob»), nutzten sie das Öl wie niemand zuvor und bauten dünne Lasuren auf, die Spiegelungen, Stoffe und ferne Horizonte lebendig schimmern ließen. Sie arbeiteten für die Herzöge von Burgund und für wohlhabende Kaufleute und schufen Altarbilder, Bildnisse und Andachtstafeln voller Bedeutung, in denen eine Kerze, ein Hund oder ein Spiegel symbolisches Gewicht tragen konnte. Jan van Eyck signierte und datierte seine Werke sogar — eine Behauptung des neuen Ranges des Künstlers — und ihre Neuerungen im Öl beeinflussten rasch Italien und das übrige Europa.",
    figures: [
      'Jan van Eyck — Pionier der Öllasur (Arnolfini-Hochzeit)',
      'Rogier van der Weyden — intensive religiöse Emotion',
      'Hieronymus Bosch — fantastische, moralisierende Visionen',
    ],
    legacy:
      "Die Flämischen Primitiven legten die technischen und beobachtenden Grundlagen der westlichen Ölmalerei. Ihre Verbindung von atemberaubendem Realismus und verborgener Symbolik bleibt eine der großen Errungenschaften der europäischen Kunst und prägte die nachfolgende holländische Tradition.",
  },
  veneciana: {
    title: 'Venezianische Schule',
    lead:
      "Die Malerei Venedigs, die das «colorito» — Farbe, Licht und sinnliche malerische Oberfläche — höher schätzte als die feste Zeichnung und Komposition («disegno»), die in Florenz und Rom bevorzugt wurden.",
    era: '15.–16. Jh.',
    origin: 'Venedig',
    hallmarks: [
      'Form aus glühenden Flecken warmer Farbe, nicht aus hartem Umriss',
      'Lockerer, sinnlicher Pinselstrich in Öl',
      'Reiche Stoffe, goldenes Licht und üppiges Fleisch',
      'Atmosphäre und Stimmung vor scharfer Präzision',
      'Sinnliche Mythologien und großartige Bildnisse',
    ],
    origins:
      "Venedig, die große Seerepublik, entwickelte eine von Mittelitalien verschiedene Malschule. Ihr Reichtum, ihr Handel mit dem Osten und die besondere Qualität ihres wässrigen, leuchtenden Lichts prägten einen warmen, farbgetriebenen Stil, aufgebaut nicht aus harten Konturen, sondern aus glühendem Ton in lockeren Ölstrichen. Giovanni Bellini öffnete den Weg mit weichem, leuchtendem Licht; Giorgione brachte eine neue poetische Stimmung; und Tizian, der größte von allen, beherrschte ein halbes Jahrhundert lang die europäische Malerei. Später führten Veronese und Tintoretto die Tradition zum großen Schauspiel fort. Venezianische Leinwände wurden in ganz Europa von Königen, Päpsten und Sammlern geschätzt.",
    figures: [
      'Giovanni Bellini — Begründer, leuchtende Farbe',
      'Giorgione — poetische, atmosphärische Stimmung',
      'Tizian — der oberste Kolorist',
      'Veronese, Tintoretto — das große Schauspiel',
    ],
    legacy:
      "Die venezianische Liebe zu Farbe und freiem Pinselstrich hatte immensen Einfluss. Sie floss unmittelbar in den Barock von Rubens und Velázquez ein und half Jahrhunderte später, die lockere, farbgetriebene Malerei der Impressionisten anzuregen.",
  },
  manierismo: {
    title: 'Manierismus',
    lead:
      "Der selbstbewusst elegante, künstliche Stil der Generation nach der Hochrenaissance, der Verfeinerung, Raffinesse und Fremdheit über das natürliche Gleichgewicht stellte.",
    era: 'ca. 1520–1600',
    origin: 'Italien',
    hallmarks: [
      'Unmöglich verlängerte Glieder und verdrehte, instabile Posen',
      'Überfüllter, mehrdeutiger, gedrängter Raum',
      'Säuerliche, unerwartete Farbe',
      'Auffällige Stilisiertheit und kühle, zerebrale Anmut',
    ],
    origins:
      "Der Manierismus entstand in Italien um 1520, in der Generation nach der Hochrenaissance. Da sie von Leonardo, Michelangelo und Raffael eine scheinbar vollkommene Kunst geerbt hatten, suchten die jüngeren Maler nicht weiteren Naturalismus, sondern eine wissende, raffinierte Eleganz — Schönheit, die zu Spannung und Künstlichkeit hin getrieben wurde. Das Wort kommt vom italienischen «maniera», Stil oder Art: Kunst, mit auffälliger Stilisiertheit gemacht. Er blühte in einer turbulenten Zeit religiöser Krise und der traumatischen Plünderung Roms 1527, und seine Instabilität und Unruhe können wie ein Spiegel der Ängste seiner Zeit wirken.",
    figures: [
      'Pontormo, Parmigianino — elegante Verlängerung',
      'Bronzino — kühle, polierte Hofbildnisse',
      'El Greco — flammenhafte spirituelle Intensität',
    ],
    legacy:
      "Lange als dekadenter Niedergang von der Renaissance abgetan, wird der Manierismus heute für seine Erfindungsgabe und psychologische Komplexität geschätzt. Er schlägt die Brücke zwischen dem heiteren Ideal der Renaissance und dem dynamischen Drama des Barock.",
  },
  barroco: {
    title: 'Barock',
    lead:
      "Die dramatische, gefühlvolle Kunst des 17. Jahrhunderts, die vor allem den Betrachter bewegen wollte — die Sinne zu überwältigen und die Gefühle durch Bewegung, Schauspiel und intensives Licht zu erregen.",
    era: '17.–18. Jh.',
    origin: 'Italien, dann ganz Europa',
    hallmarks: [
      'Starke Kontraste von Licht und Dunkel (Chiaroscuro)',
      'Ausschwingende diagonale Kompositionen und Bewegung',
      'Theatralische Gesten und lebendiger, unmittelbarer Realismus',
      'Pracht, die die Sinne überwältigen soll',
    ],
    origins:
      "Der Barock beherrschte die europäische Kunst durch das 17. Jahrhundert und bis ins 18. Er entstand zum Teil aus der Gegenreformation der katholischen Kirche, die emotional kraftvolle, zugängliche Kunst nutzte, um den Glauben gegen den schlichteren protestantischen Norden zu beleben; er diente aber auch absoluten Monarchen und Höfen, die nach Pracht und Machtprojektion strebten. Der Stil nahm quer durch Europa verschiedene Formen an — leidenschaftlich und religiös in Italien und Spanien, opulent und sinnlich in Flandern, zurückhaltend und intim in der Niederländischen Republik — doch alle teilten die Vorliebe für Dynamik und dramatisches Licht, angestoßen von Caravaggios revolutionärer Beleuchtung.",
    figures: [
      'Caravaggio — revolutionäre dramatische Beleuchtung',
      'Rubens — aufwallende flämische Energie',
      'Velázquez, Rembrandt — blendender Pinsel und Tiefe',
    ],
    legacy:
      "Der Barock brachte einige der kraftvollsten Bilder der westlichen Kunst hervor. Seine Beherrschung von Licht, Emotion und Bewegung prägte die Malerei über Generationen und bestimmt bis heute unser Gefühl für theatralisches, dramatisches visuelles Erzählen.",
  },
  neerlandes: {
    title: 'Niederländisches Goldenes Zeitalter',
    lead:
      "Die erstaunliche Blüte der Malerei im 17. Jahrhundert in der neu unabhängigen, protestantischen und wohlhabenden Niederländischen Republik, die die alltägliche Welt zum Gegenstand der hohen Kunst machte.",
    era: '17. Jh.',
    origin: 'Niederländische Republik',
    hallmarks: [
      'Alltagsgattungen: Bildnisse, Landschaften, Marinen, Stillleben, Interieurs',
      'Ehrliches, genau beobachtetes natürliches Licht',
      'Bescheidene häusliche Motive mit Sorgfalt behandelt',
      'Kleinformatige Werke für gewöhnliche Wohnungen',
    ],
    origins:
      "Im 17. Jahrhundert schuf eine kleine, neu unabhängige Nation eine riesige Menge Kunst für ein breites, überwiegend bürgerliches Publikum. Ohne Kirche oder große Höfe als Mäzene malten die niederländischen Künstler für gewöhnliche Wohnungen, und Bilder wurden fast wie jede andere Ware auf einem florierenden offenen Markt gekauft und verkauft. Sie vollendeten die Gattungen des Alltags — Bildnisse, Landschaften, Stillleben und stille häusliche Interieurs —, geschätzt für ihre Ehrlichkeit und ihr genau beobachtetes Licht. Diese Kunst spiegelte eine selbstbewusste, kommerzielle, seefahrende Gesellschaft, die die sichtbare Welt, Sauberkeit, Wohlstand und häusliche Tugend schätzte.",
    figures: [
      'Rembrandt — psychologische Tiefe und Licht',
      'Vermeer — heitere, leuchtende Interieurs',
      'Frans Hals — schwungvolle, lebensechte Energie',
    ],
    legacy:
      "Das Niederländische Goldene Zeitalter erhob alltägliche Motive zur hohen Kunst und schenkte der westlichen Malerei einige ihrer beliebtesten Bilder. Sein intimer Realismus und sein feiner Umgang mit dem Licht bewegen die Betrachter noch vier Jahrhunderte später.",
  },
  espanol: {
    title: 'Spanisches Goldenes Zeitalter',
    lead:
      "Die intensive, oft strenge Kunst Spaniens auf dem Höhepunkt seines Reiches, geprägt von einem frommen katholischen Hof und einer Kirche während des «Siglo de Oro».",
    era: 'ca. 1550–1660',
    origin: 'Spanien',
    hallmarks: [
      'Schroffer Realismus und tiefe spirituelle Intensität',
      'Dramatische Kontraste von Licht und Schatten',
      'Ernste, feierliche Stimmung, selbst in Königsbildnissen',
      'Motive von asketischer Strenge bis zu reicher Sinnlichkeit',
    ],
    origins:
      "Spaniens Siglo de Oro, etwa 1550 bis 1660, fiel mit dem Höhepunkt seines Reiches zusammen und brachte eine Kunst von großer emotionaler und religiöser Intensität hervor. Sie diente der Habsburgermonarchie und der gegenreformatorischen Kirche und schmückte Paläste, Klöster und Kathedralen; selbst ihre Königsbildnisse tragen einen für Spanien eigentümlichen Zug feierlicher, zeremonieller Ernsthaftigkeit. Ihre Meister reichen von El Greco, dessen verlängerte Figuren zum Göttlichen streben, bis zu Velázquez, einem Hofmaler von unübertroffener Feinheit und Wahrheit, sowie Zurbarán und Ribera, die sakralen Motiven einen ernsten, greifbaren Realismus gaben.",
    figures: [
      'El Greco — verlängerte, ekstatische Figuren',
      'Velázquez — unübertroffene Wahrheit und Feinheit',
      'Zurbarán, Ribera — ernster sakraler Realismus',
    ],
    legacy:
      "Das Spanische Goldene Zeitalter schenkte der Welt einige ihrer tiefsten religiösen Malerei und in Velázquez einen der größten Maler aller Zeiten — einen Künstler, dessen Ehrlichkeit und Technik Goya, Manet und Picasso gleichermaßen inspirierten.",
  },
  neoclasicismo: {
    title: 'Neoklassizismus & akademische Kunst',
    lead:
      "Eine bewusste Rückkehr zur edlen Einfalt und moralischen Ernsthaftigkeit des antiken Griechenland und Rom, als Reaktion gegen die Frivolität des Rokoko und den Überschwang des Spätbarock.",
    era: 'Mitte 18.–19. Jh.',
    origin: 'Frankreich & Italien',
    hallmarks: [
      'Klare, skulpturale Linie und Zeichnung',
      'Zurückhaltende, nüchterne Farbe und ausgewogene Komposition',
      'Erhabene bürgerliche, heroische oder moralische Themen',
      'Vom Ordnung und Vernunft gebändigtes Gefühl',
    ],
    origins:
      "Der Neoklassizismus entstand Mitte des 18. Jahrhunderts, angeregt durch die jüngsten Ausgrabungen von Pompeji und Herculaneum, die die antike Welt den europäischen Augen lebhaft vor Augen führten. Er suchte Tugend und Vernunft statt bloßen Vergnügens, und sein oberster Meister, Jacques-Louis David, malte strenge moralische Dramen, die zunächst zu Sinnbildern der Französischen Revolution und dann des Kaiserreichs Napoleons wurden. Er wurde zum offiziellen Stil der Kunstakademien, die die Maler in strenger Zeichnung und idealisierter Form ausbildeten, und diese «akademische» Kunst beherrschte die Salons des 19. Jahrhunderts, bevor die modernen Avantgarden sie herausforderten.",
    figures: [
      'Jacques-Louis David — strenge revolutionäre Dramen',
      'Ingres — kühler, präziser Klassizismus',
    ],
    legacy:
      "Obwohl spätere Rebellen seine Regeln verwarfen, bestimmte der Neoklassizismus ein Jahrhundert lang, wie ernsthafte europäische Malerei aussah. Seine Klarheit, Disziplin und Ehrfurcht vor der Antike bleiben eine bleibende Strömung in der westlichen Kunst.",
  },
  romanticismo: {
    title: 'Romantik',
    lead:
      "Eine leidenschaftliche Auflehnung gegen die neoklassizistische Ordnung und die aufklärerische Vernunft, die das Gefühl, die Vorstellungskraft und das Individuum über Regeln und Rationalität stellte.",
    era: 'spätes 18.–19. Jh.',
    origin: 'Europa',
    hallmarks: [
      'Das Erhabene: Ehrfurcht, Schrecken und Staunen vor der wilden Natur',
      'Kühne Farbe und aufgeladene, dynamische Energie',
      'Stürme, Schiffbrüche, Ruinen, exotische Länder und heroische Kämpfe',
      'Die innere Vision des Künstlers als wahre Quelle der Kunst',
    ],
    origins:
      "Die Romantik durchzog die europäische Kunst im späten 18. und frühen 19. Jahrhundert, in einer Zeit der Revolution, des Umbruchs und des neuen Nationalismus und einer Sehnsucht nach Authentizität, Geheimnis und dem Ungezähmten. Sie reagierte gegen die kühle Zurückhaltung des Neoklassizismus und schätzte das Gefühl über Regeln und das innere Leben des Künstlers über alles. In Frankreich malten Géricault und Delacroix turbulente Szenen von Drama und Aufruhr; in Deutschland verwandelte Caspar David Friedrich einsame Gestalten vor weiten Landschaften in Meditationen über die Seele; in Britannien löste Turner die Welt in Licht und Atmosphäre auf.",
    figures: [
      'Géricault, Delacroix — turbulentes französisches Drama',
      'Caspar David Friedrich — die einsame Seele in der Natur',
      'Turner — die in Licht aufgelöste Welt',
    ],
    legacy:
      "Die Romantik befreite Farbe, Gefühl und Subjektivität in der Malerei, und ihre Erhebung des individuellen Ausdrucks bahnte einem großen Teil der modernen Kunst den Weg. Ihre Bilder von der Macht der Natur und dem einsamen Selbst wirken bis heute tief nach.",
  },
  realismo: {
    title: 'Realismus',
    lead:
      "Das Beharren darauf, die gewöhnliche Welt ehrlich darzustellen, genau wie sie ist, unter Ablehnung sowohl des neoklassizistischen Idealismus als auch der romantischen Fantasie.",
    era: 'Mitte 19. Jh.',
    origin: 'Frankreich',
    hallmarks: [
      'Glanzlose Motive: Bauern, Arbeiter, Wäscherinnen, Alltagsleben',
      'Bescheidene Motive in großem, ernstem Maßstab gemalt',
      'Wahrhaftige Beobachtung statt Verschönerung',
      'Eine stille Würde, mitunter mit einem Ton sozialen Protests',
    ],
    origins:
      "Der Realismus entstand in Frankreich um die 1840er und 1850er Jahre, in einer Zeit politischer Revolution und industriellen Wandels, als Künstler und Schriftsteller neu auf die sozialen Verhältnisse und das Leben gewöhnlicher Menschen achteten. Er wandte sich Motiven zu, die einst der «ernsten» Kunst unwürdig waren — den Armen auf dem Land und in der Stadt — und malte sie in dem großen Maßstab, der einst Göttern und Helden vorbehalten war, und gab ihnen eine stille Würde. Gustave Courbet führte die Bewegung mit bewusster Provokation an, während Jean-François Millet der ländlichen Mühsal eine monumentale, fast sakrale Schwere gab; die verwandte Strömung des Naturalismus trieb noch weiter zur ungeschminkten, wissenschaftlichen Beobachtung.",
    figures: [
      'Gustave Courbet — provokanter Anführer',
      'Jean-François Millet — der monumentale Bauer',
    ],
    legacy:
      "Indem er die Malerei vom Mythos und der Idealisierung befreite und in der beobachteten Wirklichkeit verankerte, öffnete der Realismus der modernen Kunst die Tür. Seine ehrliche Aufmerksamkeit für das Alltagsleben floss unmittelbar in den Impressionismus und die nachfolgenden Bewegungen ein.",
  },
  realismosocial: {
    title: 'Sozialer Realismus',
    lead:
      "Realismus, der seinen ehrlichen Blick eigens auf die soziale und politische Wirklichkeit richtet — Armut, Arbeit, Ungleichheit und Ungerechtigkeit — und in einem schlichten, direkten Stil Zeugnis ablegt.",
    era: '19.–20. Jh.',
    origin: 'Weltweit',
    hallmarks: [
      'Die Armen, Ausgebeuteten und Arbeitenden im absoluten Mittelpunkt',
      'Ein schlichter, unsentimentaler Stil, der die Not konfrontiert',
      'Ein Appell an Mitgefühl, Bewusstsein oder Gewissen',
      'Arbeit und Kampf, wo einst Helden oder Götter standen',
    ],
    origins:
      "Der Soziale Realismus ist eine Strömung innerhalb der realistischen Kunst, die vom 19. Jahrhundert an weltweit auftrat, wo immer Industrialisierung, Migration und Ungleichheit sichtbares Leid schufen — auch in Lateinamerika, wo Maler das Leben der städtischen Armen und Entrechteten festhielten. Statt zu idealisieren oder zu unterhalten, konfrontiert er den Betrachter mit den Arbeitslosen, Ausgebeuteten und Hungernden. Er ist eng mit breiteren Bewegungen für soziale Reform verbunden, und seine emotionale Kraft kommt daher, dass er den alltäglichen Kampf ins Zentrum des Bildes stellt.",
    figures: [
      'Ernesto de la Cárcova — argentinischer Sozialprotest',
      'Reinaldo Giudici — die städtischen Armen',
    ],
    legacy:
      "Der Soziale Realismus gab der Kunst eine moralische und politische Stimme und erinnerte die Betrachter an leicht zu übersehende Wirklichkeiten. Seine Tradition der Kunst als Zeugnis und Gewissen setzte sich kraftvoll ins 20. Jahrhundert fort.",
  },
  realismoamericano: {
    title: 'Amerikanischer Realismus & Regionalismus',
    lead:
      "Das Bestreben im späten 19. und frühen 20. Jahrhundert, das amerikanische Leben unmittelbar und wahrhaftig darzustellen, statt durch geliehene europäische Ideale.",
    era: 'spätes 19.–20. Jh.',
    origin: 'Vereinigte Staaten',
    hallmarks: [
      'Alltägliche amerikanische Szenen: Straßen, Farmen, Seeleute, Arbeiter',
      'Frische, unsentimentale Beobachtung',
      'Der regionalistische Fokus auf das ländliche und das Herzland',
      'Stille und Einsamkeit in der modernen Stadt',
    ],
    origins:
      "Als die Vereinigten Staaten zur Weltmacht heranwuchsen, suchten ihre Künstler eine selbstbewusste, unabhängige visuelle Identität, verwurzelt in den eigenen Szenen und Menschen der Nation. Realistische Maler stellten den Alltag mit frischem, unsentimentalem Blick dar — Winslow Homers kraftvolle Szenen des Meeres und der ländlichen Jugend sind klassische Beispiele. In den 1930er Jahren, während der Depression, feierte die verwandte Bewegung des Regionalismus das ländliche Amerika der Kleinstädte als heimische Antwort auf die europäische Moderne, während Edward Hopper die ganze Strömung zu Bildern von Stille und moderner Einsamkeit destillierte.",
    figures: [
      'Winslow Homer — das Meer und das Landleben',
      'Grant Wood — das regionalistische Herzland («American Gothic»)',
      'Edward Hopper — moderne Einsamkeit',
    ],
    legacy:
      "Gemeinsam schmiedeten diese Künstler eine selbstbewusste, unabhängige amerikanische Kunst, verwurzelt in lokaler Szene und lokalem Charakter, und gaben der jungen Nation Bilder, die sich authentisch als ihre eigenen anfühlten.",
  },
  costumbrismo: {
    title: 'Costumbrismo',
    lead:
      "Die liebevolle künstlerische Darstellung der Sitten, der Tracht, der «Typen» und des Alltagslebens eines bestimmten Ortes und Volkes, die das Lokale und Gewöhnliche als würdige Motive behandelt.",
    era: '19. Jh.',
    origin: 'Spanien & Lateinamerika',
    hallmarks: [
      'Szenen von Märkten, Festen, Volkstänzen und Landtavernen',
      'Regionale Tracht und volkstümliche «Typen»',
      'Warme, detaillierte, genau beobachtete Genremalerei',
      'Der Gaucho, der Huaso, der Händler, der ländliche Tanz',
    ],
    origins:
      "Der Costumbrismo blühte vor allem im Spanien des 19. Jahrhunderts und in ganz Lateinamerika. Statt großer Geschichte oder Mythos hielten seine Maler die Textur einer Gesellschaft — ihre Arbeit, Muße, Rituale und Gestalten — mit Wärme und Detail fest. Die Strömung entstand neben dem Nationalismus des 19. Jahrhunderts, als neu unabhängige Nationen ihre Identität durch das eigene Land, Volk und die eigenen Traditionen zu bestimmen suchten, und diese Bilder halfen zu prägen, wie sich Gesellschaften selbst vorstellten.",
    figures: [
      'Manuel Antonio Caro — Chiles Nationaltanz',
      'José Agustín Arrieta — das mexikanische Alltagsleben',
    ],
    legacy:
      "Der Costumbrismo hinterließ ein unschätzbares visuelles Zeugnis verschwindender Lebensweisen und volkstümlicher Kultur. Warm, beobachtend und im Ort verwurzelt, bleibt er zentral für das nationale künstlerische Erbe vieler spanischsprachiger Länder.",
  },
  hudson: {
    title: 'Hudson River School',
    lead:
      "Die erste bedeutende Landschaftsbewegung der amerikanischen Kunst, die die Wildnis der Neuen Welt als weit, erhaben und gottgegeben darstellte.",
    era: '1820er–1870er',
    origin: 'Vereinigte Staaten',
    hallmarks: [
      'Großartiger, ehrfurchtgebietender Maßstab',
      'Berge, Wälder, Flüsse und leuchtende Himmel',
      'Glühendes, dramatisches Licht',
      'Das ungezähmte Land als national und sogar göttlich',
    ],
    origins:
      "Die Hudson River School nahm ihren Namen vom malerischen Hudson-Tal in New York, wo ihre Begründer in den 1820er Jahren zuerst malten. Sie entstand, als sich die jungen Vereinigten Staaten nach Westen ausdehnten und eine nationale Identität schmiedeten, und stellte die Wildnis als Quelle des Stolzes und sogar göttlicher Bestimmung dar. Thomas Cole begründete die Bewegung und gab ihr eine moralische und spirituelle Dimension — einige seiner Werke betrauern still den Verlust des Landes an die Erschließung —, während eine spätere Generation, darunter Frederic Church und Albert Bierstadt, zu immer spektakuläreren Panoramen der Neuen Welt und darüber hinaus vorstieß.",
    figures: [
      'Thomas Cole — Begründer, moralische und spirituelle Vision',
      'Frederic Church, Albert Bierstadt — weite Panoramen',
    ],
    legacy:
      "Als Begründerin der Hudson River School etablierte Cole die Landschaft als ernstes amerikanisches Motiv und prägte, wie die Nation ihr eigenes Land sah. Ihre erhabene Vision der Wildnis bleibt ein Eckstein der amerikanischen Kunst.",
  },
  impresionismo: {
    title: 'Impressionismus',
    lead:
      "Eine Auflehnung gegen die akademische Malerei, die die flüchtigen Wirkungen von Licht, Farbe und Atmosphäre in einem einzigen vorübergehenden Augenblick einzufangen suchte — eine der beliebtesten Bewegungen der Kunstgeschichte.",
    era: '1860er–1880er',
    origin: 'Paris',
    hallmarks: [
      'Lockere, gebrochene Pinselstriche',
      'Helle, ungemischte Farben',
      'Oft rasch, im Freien, vor dem Motiv gemalt',
      'Moderne Motive: Cafés, Boulevards, Gärten, Bahnhöfe, Muße',
    ],
    origins:
      "Der Impressionismus entstand in Paris in den 1860er und 70er Jahren als Auflehnung gegen die starren Konventionen des offiziellen Salons und der akademischen Malerei. Seine Künstler arbeiteten rasch, oft im Freien, und nutzten lockere Striche und helle Farbe, um den unmittelbaren «Eindruck» einer Szene festzuhalten statt ihr festes, präzises Detail, und nahmen die moderne Welt um sie herum zum Motiv. Der Name stammt von einer spöttischen Kritik über Monets «Impression, Sonnenaufgang» auf der ersten unabhängigen Ausstellung der Gruppe 1874 — was die Kritiker als skizzenhaft und unfertig abtaten, umarmten die Künstler als eine wahrhaftigere Art des Sehens.",
    figures: [
      'Claude Monet — Licht und Atmosphäre',
      'Renoir, Degas, Pissarro',
      'Morisot, Cassatt, Sisley, Caillebotte',
    ],
    legacy:
      "Der Impressionismus verwandelte die Kunst, indem er Wahrnehmung, Spontaneität und das moderne Alltagsleben schätzte. Er befreite Farbe und Pinselstrich von der strengen Beschreibung und öffnete die Tür zum ganzen Abenteuer der modernen Malerei.",
  },
  posimpresionismo: {
    title: 'Postimpressionismus',
    lead:
      "Die vielfältige Kunst, die auf der hellen Farbe des Impressionismus aufbaute, aber über ihn hinaus zu größerer Struktur, Emotion, Symbolik und persönlichem Ausdruck strebte.",
    era: '1880er–1900er',
    origin: 'Frankreich',
    hallmarks: [
      'Helle Farbe für Gefühl und Bedeutung, nicht nur für Licht',
      'Größere Struktur, Symbolik und innerer Ausdruck',
      'Höchst persönliche, individuelle Stile',
      'Über den flüchtigen optischen Augenblick hinaus',
    ],
    origins:
      "Postimpressionismus ist der Begriff für die vielfältige Kunst, die in Frankreich in den 1880er und 1890er Jahren entstand und die Farbe des Impressionismus beibehielt, aber seinen Fokus auf den augenblicklichen Eindruck verwarf. Ihre Künstler bildeten nie eine einzige Gruppe; jeder ging seinen eigenen Weg, überzeugt, dass die Malerei mehr ausdrücken sollte als das Auge allein wahrnimmt — und ihr Werk wurde zu Lebzeiten oft missverstanden und unterschätzt. Cézanne baute die Natur aus festen geometrischen Flächen neu auf; Van Gogh lud seine Leinwände mit intensiver Farbe und Emotion auf; Seurat trug die Farbe mit wissenschaftlicher Strenge auf; Gauguin flachte die Form auf der Suche nach einer symbolischen Kunst ab.",
    figures: [
      'Cézanne — Form aus geometrischen Flächen',
      'Van Gogh — intensive Farbe und Emotion',
      'Gauguin — flache, symbolische Farbe',
      'Seurat — wissenschaftliche Farbe (Pointillismus)',
    ],
    legacy:
      "Der Postimpressionismus war die entscheidende Brücke zur modernen Kunst des 20. Jahrhunderts. Besonders Van Gogh, Cézanne und Gauguin wurden zu überragenden Einflüssen auf Expressionismus, Kubismus, Fauvismus und nahezu alles Folgende.",
  },
  neoimpresionismo: {
    title: 'Neoimpressionismus (Pointillismus)',
    lead:
      "Eine systematische, wissenschaftliche Weiterentwicklung des Impressionismus, die leuchtende Bilder aus zahllosen kleinen Punkten reiner, ungemischter Farbe aufbaute.",
    era: '1880er–1890er',
    origin: 'Frankreich',
    hallmarks: [
      'Pointillismus: winzige getrennte Punkte ungemischter Farbe',
      'Farben, vom Auge gemischt, nicht auf der Palette',
      'Eine kristalline, stille, geordnete Ruhe',
      'Mühsame, fast meditative Methode',
    ],
    origins:
      "Der Neoimpressionismus entstand in Frankreich in den 1880er Jahren als rationalere, disziplinierte Weiterentwicklung des Impressionismus. Wo die Impressionisten nach Instinkt und Spontaneität arbeiteten, wandten seine Künstler zeitgenössische Theorien von Farbe und Optik an und setzten Punkte reiner Farbe nebeneinander, damit das Auge sie zu Tönen mischt, die theoretisch heller sind als gemischte Farbe. Georges Seurat war Pionier des Ansatzes; Paul Signac wurde sein führender Fürsprecher und Theoretiker. Die Bewegung spiegelte einen Glauben des späten 19. Jahrhunderts an Wissenschaft und Ordnung, angewandt auf den Akt des Wahrnehmens selbst, und ein großes Bild Punkt für Punkt aufzubauen war langsame, fast meditative Arbeit.",
    figures: [
      'Georges Seurat — Pionier der Methode',
      'Paul Signac — ihr führender Fürsprecher und Theoretiker',
    ],
    legacy:
      "Obwohl als strenge Methode kurzlebig, beeinflusste der Neoimpressionismus viele spätere Künstler, darunter Matisse und die Fauves. Sein kühner, analytischer Gebrauch reiner Farbe half, die Malerei zur modernen Abstraktion hin zu treiben.",
  },
  simbolismo: {
    title: 'Symbolismus',
    lead:
      "Eine Wendung nach innen — zu Traum, Mythos, Emotion und Vorstellungskraft — als Reaktion gegen den nach außen gerichteten Realismus und Impressionismus.",
    era: '1880er–1900er',
    origin: 'Frankreich & Belgien',
    hallmarks: [
      'Andeutung, Stimmung und Metapher statt wörtlicher Darstellung',
      'Themen von Liebe, Tod, Begierde, Geheimnis und dem Geistigen',
      'Rätselhafte, oft verstörende, traumhafte Bilder',
      'Subjektivität und das innere Leben',
    ],
    origins:
      "Der Symbolismus entstand in den 1880er Jahren, weitgehend in Frankreich und Belgien, breitete sich aber über Europa aus. Wo Realismus und Impressionismus nach außen auf die sichtbare Welt blickten, wandte sich der Symbolismus nach innen und nutzte evokative Bilder, Stimmung und Metapher, um Ideen und Gefühle anzudeuten, die nicht wörtlich gezeigt werden konnten. Er lief parallel zur symbolistischen Dichtung und spiegelte eine Stimmung des Jahrhundertendes von Introspektion, spiritueller Suche und Unruhe, die die Vorstellungskraft über die objektive Wirklichkeit stellte.",
    figures: [
      'Gustave Moreau, Odilon Redon — französische Visionäre',
      'Edvard Munch — Angst und Begierde',
      'Gustav Klimt — sinnliche, ornamentale Allegorie',
    ],
    legacy:
      "Die Betonung von Vorstellungskraft, Unterbewusstsein und der emotionalen Kraft des Bildes durch den Symbolismus hatte tiefen Einfluss auf die Kunst des 20. Jahrhunderts und floss unmittelbar in den Expressionismus und später in den Surrealismus ein.",
  },
  modernismo: {
    title: 'Jugendstil / Art nouveau',
    lead:
      "Eine dekorative Bewegung um die Jahrhundertwende, die einen frischen, modernen Stil frei von historischer Nachahmung suchte und ihre Formen aus der Natur schöpfte.",
    era: 'ca. 1890–1910',
    origin: 'Europa',
    hallmarks: [
      'Geschwungene, fließende «Peitschenhieb»-Linien',
      'Organische Pflanzen- und Blumenformen',
      'Elegantes, ornamentales Muster',
      'Ein Gesamtstil, der Kunst, Architektur, Glas und Design vereinte',
    ],
    origins:
      "Um 1900 durchzog eine dekorative Bewegung Europa unter vielen Namen — Art nouveau in Frankreich, Modernisme in Katalonien, Jugendstil in Deutschland, der Sezessionsstil in Wien. Sie blühte in einer Zeit des Optimismus, des industriellen Fortschritts und der neuen städtischen Muße und wollte schön, harmonisch und ganz von ihrem eigenen Augenblick sein. Als Gesamtdesign-Bewegung vereinte sie Malerei, Architektur, Schmuck, Möbel und Grafik; in der Malerei verkörpert sie vor allem Gustav Klimt, dessen goldene, gemusterte Leinwände Figur und Ornament verschmelzen.",
    figures: [
      'Gustav Klimt — goldene, gemusterte Leinwände',
      'Alphonse Mucha — fließende dekorative Plakate',
    ],
    legacy:
      "Obwohl ihre Blütezeit kurz war, formte der Art nouveau das Design und die dekorativen Künste um und half, die visuelle Sprache Europas zu modernisieren. Seine fließende Eleganz bleibt sofort wiedererkennbar und endlos einflussreich.",
  },
  fovismo: {
    title: 'Fauvismus',
    lead:
      "Die erste Avantgardebewegung des 20. Jahrhunderts — kurz, aber explosiv — aufgebaut auf der völligen Befreiung der Farbe von ihrer Pflicht, die Wirklichkeit zu beschreiben.",
    era: 'ca. 1904–1908',
    origin: 'Frankreich',
    hallmarks: [
      'Reine, intensive, oft willkürliche Farbe direkt aus der Tube',
      'Ein Gesicht mochte grün sein, ein Himmel rosa',
      'Kühne, energiegeladene Pinselstriche',
      'Farbe im Dienst von Emotion und Gestaltung, nicht der Beschreibung',
    ],
    origins:
      "Der Fauvismus brach in Frankreich um 1904–1908 aus, aufbauend auf den Farbexperimenten von Van Gogh, Gauguin und den Neoimpressionisten und diese zu einem jubelnden Extrem treibend. Seine Maler nutzten reine, intensive Farbe im Dienst des Gefühls und der Gestaltung statt des Aussehens der Dinge. Der Name stammt von einem Kritiker, der beim Anblick ihrer wilden Leinwände auf dem Salon d'Automne 1905 die Maler «les fauves» — die wilden Tiere — nannte, eine Beleidigung, die die Künstler stolz annahmen.",
    figures: [
      'Henri Matisse — der Anführer',
      'André Derain, Maurice de Vlaminck',
    ],
    legacy:
      "Obwohl er nur wenige Jahre währte, war der Fauvismus ein entscheidender Durchbruch. Indem er die Farbe völlig von ihrer Pflicht befreite, die Welt zu beschreiben, öffnete er den Weg für den Expressionismus, die Abstraktion und einen großen Teil der modernen Kunst.",
  },
  expresionismo: {
    title: 'Expressionismus',
    lead:
      "Die Kunst der rohen inneren Emotion, die Farbe, Linie und Form bewusst verzerrt, um die Welt zu zeigen, wie sie sich anfühlt, statt wie sie aussieht.",
    era: 'frühes 20. Jh.',
    origin: 'Deutschland & Österreich',
    hallmarks: [
      'Bewusst verzerrte, verdrehte Formen',
      'Aufeinanderprallende Farben und zackiger, erregter Pinselstrich',
      'Angst, Leidenschaft, Entfremdung und geistige Sehnsucht',
      'Subjektives Gefühl über objektiver Wirklichkeit',
    ],
    origins:
      "Der Expressionismus blühte vor allem in Deutschland und Österreich im frühen 20. Jahrhundert, aus den Spannungen einer sich rasch modernisierenden, ängstlichen Gesellschaft am Rande des Ersten Weltkriegs erwachsend und aus der emotionalen Kraft von Van Gogh, Munch und den Symbolisten schöpfend. Zwei Schlüsselgruppen bildeten sich in Deutschland: Die Brücke, angeführt von Kirchner, mit ihren schroffen, kantigen Stadtszenen; und Der Blaue Reiter, darunter Kandinsky und Franz Marc, der eine geistige und zunehmend abstrakte Kunst verfolgte. In Österreich trieb Egon Schiele den Körper zu roher, gequälter Intensität.",
    figures: [
      'Kirchner — die schroffen Städte der Brücke',
      'Kandinsky, Franz Marc — Der Blaue Reiter',
      'Egon Schiele — rohe, gequälte Körper',
    ],
    legacy:
      "Der Expressionismus machte das innere Gefühl des Künstlers zum wahren Gegenstand der Kunst. Seine emotionale Intensität und expressive Verzerrung hatten bleibende Wirkung und hallen durch die moderne und zeitgenössische Malerei nach.",
  },
  cubismo: {
    title: 'Kubismus',
    lead:
      "Eine der radikalsten Revolutionen der westlichen Kunstgeschichte, die Gegenstände in geometrische Facetten zersplitterte und sie neu zusammensetzte, um viele Blickpunkte zugleich zu zeigen.",
    era: 'ca. 1907–1914',
    origin: 'Paris',
    hallmarks: [
      'In geometrische Flächen zersplitterte Gegenstände',
      'Mehrere Blickpunkte in einem Bild vereint',
      'Die einzige feste Perspektive aufgegeben',
      'Später: hellere Farbe, einfachere Formen und Collage',
    ],
    origins:
      "Der Kubismus wurde in Paris von Pablo Picasso und Georges Braque zwischen etwa 1907 und 1914 begründet. Indem sie die einzige feste Perspektive aufgaben, die die Malerei seit der Renaissance beherrscht hatte, behandelten sie die flache Leinwand als eine neue Art von Raum. Der frühe «analytische» Kubismus zersplitterte die Formen in nahezu abstrakte, monochrome Gitter; der spätere «synthetische» Kubismus führte hellere Farbe, einfachere Formen und sogar aufgeklebte Materialien (Collage) wieder ein. Die Bewegung schöpfte aus Cézannes struktureller Malerei und der afrikanischen und iberischen Skulptur und spiegelte eine moderne Welt neuer Wissenschaft, Geschwindigkeit und wechselnder Blickpunkte.",
    figures: [
      'Pablo Picasso & Georges Braque — Mitbegründer',
      'Juan Gris, Fernand Léger — spätere Kubisten',
    ],
    legacy:
      "Der Kubismus erfand neu, wie eine flache Fläche Form und Raum darstellen kann, und seine Ideen strahlten in den Futurismus, die Abstraktion und zahllose spätere Bewegungen aus. Er ist ein Grundstein der Kunst des 20. Jahrhunderts.",
  },
  futurismo: {
    title: 'Futurismus',
    lead:
      "Eine aggressive, zukunftsgewandte italienische Avantgarde, die die Vergangenheit verwarf und die Geschwindigkeit, Energie und Maschinerie des modernen Zeitalters verherrlichte.",
    era: 'ca. 1909–1918',
    origin: 'Italien',
    hallmarks: [
      'Bewegung, Geschwindigkeit und Energie auf der Leinwand sichtbar gemacht',
      'Figuren in wiederholte, überlagerte Flächen und «Kraftlinien» zerbrochen',
      'Autos, Maschinen, Menschenmengen und die elektrische Stadt',
      'Aus dem Kubismus entlehnte zersplitterte Formen',
    ],
    origins:
      "Der Futurismus wurde 1909 mit einem feurigen Manifest des Dichters Filippo Marinetti ins Leben gerufen. Er vergötterte Geschwindigkeit, Technik, Industrie und sogar Gewalt und Krieg, die er als Kräfte sah, die eine schale alte Welt hinwegfegten. In der Malerei zerbrachen Umberto Boccioni und Giacomo Balla bewegte Figuren in überlagerte Flächen, um die Bewegung selbst sichtbar zu machen, stark aus den zersplitterten Formen des Kubismus schöpfend. Die Bewegung reichte über die Malerei hinaus in Skulptur, Musik und Design und war mit der turbulenten Politik Italiens des frühen 20. Jahrhunderts verwoben.",
    figures: [
      'Umberto Boccioni — sein führender Künstler und Theoretiker',
      'Giacomo Balla — Bewegung und Licht',
    ],
    legacy:
      "Obwohl er nach dem Ersten Weltkrieg verblasste, beeinflusste die dynamische Vision von Bewegung und Moderne des Futurismus die spätere Kunst und das Design. Sein Versuch, reine Geschwindigkeit und Kraft zu malen, bleibt eines der kühnsten Experimente der Moderne.",
  },
  suprematismo: {
    title: 'Suprematismus',
    lead:
      "Eine wegweisende Bewegung reiner geometrischer Abstraktion, die jeden Bezug zur sichtbaren Welt zugunsten reinen Gefühls und reiner Form hinter sich ließ.",
    era: 'ab 1915',
    origin: 'Russland',
    hallmarks: [
      'Einfache Formen: Quadrate, Kreise, Kreuze und Linien',
      'Eine begrenzte Farbpalette auf schlichtem weißem Grund',
      'Formen, die frei von Schwerkraft und Gegenständen schweben',
      'Der Vorrang reinen Gefühls vor der Darstellung',
    ],
    origins:
      "Der Suprematismus wurde 1915 vom russischen Künstler Kasimir Malewitsch im Gärungsprozess rund um die Russische Revolution begründet. Er reduzierte die Kunst auf die kargsten Elemente — einfache geometrische Formen, die auf Weiß schweben — und behauptete den Vorrang reinen Gefühls und reiner Form vor der Darstellung von Gegenständen. Sein schroffes «Schwarzes Quadrat» war als «Nullpunkt der Form» gedacht, ein radikaler Neubeginn; er hängte es sogar hoch in eine Ecke, den traditionellen Platz einer religiösen Ikone. Die Bewegung war Teil der Explosion avantgardistischen Experiments im frühen Sowjetrussland, als viele glaubten, abstrakte Kunst könne helfen, eine neue Welt und ein neues Bewusstsein zu bauen.",
    figures: [
      'Kasimir Malewitsch — Begründer',
      'El Lissitzky — trug seine Ideen ins Design',
    ],
    legacy:
      "Als eine der ersten vollständig abstrakten Bewegungen hatte der Suprematismus tiefen Einfluss auf den Lauf der modernen Kunst und des Designs. Seine Reduktion der Malerei auf reine Geometrie und reines Gefühl half, die Abstraktion selbst zu bestimmen.",
  },
  neoplasticismo: {
    title: 'Neoplastizismus (De Stijl)',
    lead:
      "Ein strenger abstrakter Stil, reduziert auf gerade Linien, rechte Winkel und die drei Primärfarben, auf der Suche nach einer universalen Harmonie unter der sichtbaren Welt.",
    era: 'ab 1917',
    origin: 'Niederlande',
    hallmarks: [
      'Nur waagerechte und senkrechte schwarze Linien',
      'Flache Flächen aus Rot, Gelb und Blau, mit Weiß, Grau und Schwarz',
      'Keine Kurven, Diagonalen oder erkennbaren Gegenstände',
      'Sorgfältiges, präzises Gleichgewicht jeder Proportion',
    ],
    origins:
      "Der Neoplastizismus war der strenge abstrakte Stil, entwickelt vom niederländischen Maler Piet Mondrian und vertreten von der Gruppe De Stijl («Der Stil»), die er 1917 in den Niederlanden mitbegründete. Mondrian glaubte, die Malerei auf ihre absoluten Grundelemente zu destillieren und diese mit großer Sorgfalt auszubalancieren, könne eine universale Harmonie und ein Gleichgewicht ausdrücken, das dem Chaos der sichtbaren Welt zugrunde liegt — ein geistiger, fast utopischer Anspruch, keine bloße Dekoration. De Stijl trug diese Ideen über die Malerei hinaus in Architektur, Möbel und Design und wollte die ganze visuelle Umwelt nach reiner, rationaler Ordnung umgestalten.",
    figures: [
      'Piet Mondrian — sein Schöpfer',
      'Theo van Doesburg — Mitbegründer von De Stijl',
    ],
    legacy:
      "Der Neoplastizismus wurde zu einer der einflussreichsten Strömungen der modernen Kunst und des Designs. Seine klare Geometrie und ihre Primärfarben prägten die Architektur und das Grafikdesign des 20. Jahrhunderts und bleiben bis heute sofort wiedererkennbar.",
  },
  ukiyoe: {
    title: 'Ukiyo-e',
    lead:
      "Japanische Holzschnitte und Malerei der «fließenden Welt» — der modischen, vergnügungssüchtigen städtischen Kultur der Edo-Zeit.",
    era: '17.–19. Jh.',
    origin: 'Japan (Edo)',
    hallmarks: [
      'Flache Farbflächen und kühne, elegante Umrisse',
      'Kühne, asymmetrische, angeschnittene Kompositionen',
      'Billige, populäre Drucke von geschnitzten Holzblöcken',
      'Schönheiten, Schauspieler, Landschaften und Legenden',
    ],
    origins:
      "Das Ukiyo-e — «Bilder der fließenden Welt» — blühte in Edo (dem alten Tokio) vom 17. bis zum 19. Jahrhundert. Die «fließende Welt» meinte die Theater, Vergnügungsviertel, berühmten Schönheiten, Schauspieler und Reisen einer lebhaften populären Stadtkultur. Billig von geschnitzten Holzblöcken hergestellt, waren die Drucke eine erschwingliche, populäre Kunst, und ihre Meister reichten von Bildnissen von Kurtisanen und Schauspielern über dramatische Landschaften bis zu fantastischen Geschichten aus Mythos und Geschichte.",
    figures: [
      'Utamaro — Schönheiten (Bijin-ga)',
      'Hokusai, Hiroshige — Landschaften',
      'Kuniyoshi — Krieger und Legenden',
    ],
    legacy:
      "Als sich Japan im 19. Jahrhundert dem Westen öffnete, versetzte das Ukiyo-e die europäischen Künstler in Erstaunen. Dieser «Japonismus» beeinflusste die Impressionisten und Postimpressionisten — Van Gogh, Monet, Degas und andere — tiefgreifend und half, den Lauf der modernen Kunst zu prägen.",
  },
  rinpa: {
    title: 'Rinpa-Schule',
    lead:
      "Eine bedeutende Tradition der klassischen japanischen Malerei, gefeiert für ihre kühne, dekorative Schönheit und ihren üppigen Gebrauch von Gold und Silber.",
    era: 'ab 17. Jh.',
    origin: 'Japan (Kyoto)',
    hallmarks: [
      'Vereinfachte, stilisierte Naturmotive als rhythmisches Muster',
      'Üppiges Gold- und Silberblatt und flache, reiche Farbe',
      'Eine weiche «verlaufene Tusche»-Technik für Blätter und Blüten',
      'Große Faltschirme und Tafeln mit klassischen Themen',
    ],
    origins:
      "Rinpa blühte vom 17. Jahrhundert an und war, anders als eine Familienlinie, eine über Generationen durch Bewunderung und Nachahmung weitergegebene Tradition. Ihre Künstler bevorzugten vereinfachte Naturmotive — Blumen, Gräser, Bäume, Vögel und Wasser —, angeordnet als eindrucksvolle, rhythmische Muster, und griffen oft Themen der klassischen japanischen Literatur und Dichtung wieder auf. Tawaraya Sōtatsu begründete den Stil, und Ogata Kōrin, dessen Schirme von Schwertlilien und Pflaumenblüten zu ihren höchsten Errungenschaften zählen, führte ihn zu seinem Höhepunkt.",
    figures: [
      'Tawaraya Sōtatsu — begründete den Stil',
      'Ogata Kōrin — Schwertlilien und Pflaumenblüten',
    ],
    legacy:
      "Die Verbindung von Natur, Muster und kostbaren Materialien im Rinpa hatte bleibende Wirkung auf das japanische Design und beeinflusste später die westliche dekorative Kunst und den Art nouveau. Seine verfeinerte Eleganz bleibt ein prägender Strang der japanischen Ästhetik.",
  },
  hasegawa: {
    title: 'Hasegawa-Schule',
    lead:
      "Eine im späten 16. Jahrhundert begründete Schule der japanischen Malerei, vor allem gefeiert für ihre atmosphärischen monochromen Tuschelandschaften.",
    era: 'ab spätem 16. Jh.',
    origin: 'Japan',
    hallmarks: [
      'Monochrome Tusche auf schlichtem Papier',
      'Weiter leerer Raum, um Nebel und Stille anzudeuten',
      'Sparsamer, evokativer Pinselstrich im Zen verwurzelt',
      'Auch kühne Momoyama-Schirme auf Goldgrund',
    ],
    origins:
      "Die Hasegawa-Schule wurde von Hasegawa Tōhaku während der lebendigen Momoyama-Zeit begründet. Tōhaku nahm die Ideale der chinesischen Tuschmalerei und der heimischen japanischen Tradition auf und entwickelte einen Stil von bemerkenswerter atmosphärischer Feinheit — seine «Kiefern»-Schirme beschwören einen nebligen Wald allein mit schwarzer Tusche und weiten Flächen leeren Papiers, ein höchster Ausdruck der Andeutung, der Zurückhaltung und der Zen-Wertschätzung der Leere. Die Schule schuf auch reich gefärbte Schirme auf Goldgrund im kühnen Momoyama-Geschmack und zeigte so ihre Bandbreite von der sparsamen Tusche bis zur üppigen Dekoration.",
    figures: [
      'Hasegawa Tōhaku — Begründer («Kiefern»-Schirme)',
    ],
    legacy:
      "Die Hasegawa-Schule stellt einen der Höhepunkte der japanischen Tuschmalerei dar. Ihr Gleichgewicht aus kühnem leerem Raum und zartem, evokativem Pinselstrich wird noch heute als Vorbild kontemplativer Schönheit verehrt.",
  },
  naif: {
    title: 'Naive Kunst',
    lead:
      "Kunst von autodidaktischen Künstlern, die außerhalb der akademischen Tradition arbeiten, ohne formale Ausbildung in Perspektive, Anatomie oder den etablierten Regeln der Malerei.",
    era: 'jede Epoche',
    origin: 'Weltweit',
    hallmarks: [
      'Abgeflachter Raum und unkonventionelle Perspektive',
      'Helle, oft unrealistische Farbe',
      'Aufrichtige, minuziöse, kindliche Aufmerksamkeit fürs Detail',
      'Eine traumhafte, poetische Direktheit',
    ],
    origins:
      "Naive Künstler treten überall auf der Welt und in jeder Epoche auf und folgen ihrer eigenen Vision statt einer Schule oder Mode. Weit entfernt von einer Schwäche verleiht ihre ungeschulte Direktheit — abgeflachter Raum, unwirkliche Farbe, allem gleiche kindliche Klarheit gegeben — ihrem Werk eine traumhafte, oft kraftvolle Qualität. Der berühmteste, Henri Rousseau, ein französischer Zollbeamter, der Frankreich nie verließ, beschwor üppige imaginäre Dschungel, die die Pariser Avantgarde bezauberten.",
    figures: [
      'Henri Rousseau — imaginäre Dschungel',
    ],
    legacy:
      "Im 20. Jahrhundert schätzten die modernen Künstler die naive Kunst gerade für ihre ungeschulte Frische und imaginative Freiheit und sahen darin eine Authentizität, die die akademische Ausbildung auslöschen konnte. Sie bleibt für ihre Ehrlichkeit und ihren Charme weithin geliebt.",
  },
};

/** Portuguese movement descriptions (filled batch by batch; falls back to English). */
export const MOVEMENT_INFO_PT: Record<string, MovementInfo> = {
  renacimiento: {
    title: 'Renascimento',
    lead:
      "O «renascer» da arte, do saber e dos ideais da Grécia e da Roma antigas, que colocou o ser humano de proporções harmoniosas no centro da arte e acendeu um dos períodos mais criativos da história.",
    era: 'séc. XIV–XVI',
    origin: 'Itália',
    hallmarks: [
      'Profundidade convincente construída com a perspectiva linear matemática',
      'Figuras anatomicamente exatas, sólidas e com peso',
      'Modelado de luz e sombra para uma presença real',
      'Equilíbrio, harmonia e beleza idealizada',
      'Arquitetura, mito e história clássicos revividos',
    ],
    origins:
      "O Renascimento criou raízes nas ricas e competitivas cidades-estado da Itália dos séculos XIV e XV — Florença acima de tudo — e espalhou-se pela Europa nos dois séculos seguintes. Depois da Idade Média, estudiosos e artistas reviveram conscientemente a cultura da Antiguidade, e a filosofia do humanismo prezava a razão, a dignidade e o potencial do homem. Foi financiado por poderosos mecenas como os banqueiros Médici e os papas de Roma, que competiam por prestígio através da arte. O primeiro Renascimento começou em Florença com Masaccio, Botticelli e Fra Angelico; por volta de 1500 alcançou o seu deslumbrante ápice no Alto Renascimento em Florença e Roma. Neste mundo novo o artista passou de anônimo artesão medieval a célebre gênio individual, que assinava a sua obra e era lembrado pelo nome.",
    figures: [
      'Leonardo da Vinci — o gênio universal (Mona Lisa)',
      'Michelangelo — potência heroica na pintura e no mármore',
      'Rafael — graça e harmonia (Escola de Atenas)',
      'Botticelli, Masaccio, Piero della Francesca — o primeiro Renascimento',
    ],
    legacy:
      "Remodelou para sempre a arte ocidental, fixando a perspectiva, a proporção e o estudo direto da natureza como seus alicerces. Suas obras-primas — a Mona Lisa, o teto da Sistina, a Escola de Atenas — continuam entre as imagens mais veneradas e reconhecíveis já criadas, e fixaram o padrão com que a arte europeia se mediu por séculos.",
  },
  renacimientonorte: {
    title: 'Renascimento do Norte',
    lead:
      "O renascer renascentista tal como se desenrolou ao norte dos Alpes — absorvendo as ideias italianas de proporção e humanismo, mas filtrando-as através de um amor nitidamente nórdico pelo detalhe minucioso e a observação atenta.",
    era: 'séc. XV–XVI',
    origin: 'Alemanha e Países Baixos',
    hallmarks: [
      'Precisão quase microscópica de cabelos, tecidos e luz',
      'Objetos cotidianos carregados de simbolismo oculto',
      'Cor rica e luminosa do novo meio do óleo',
      'Realismo perscrutador e não idealizado, sobretudo nos retratos',
      'Gravura que espalhou imagens pela Europa',
    ],
    origins:
      "Enquanto o Renascimento florescia na Itália, um renascer paralelo desenrolava-se na Alemanha, na Flandres e além. Onde os artistas italianos idealizavam, os do norte esquadrinhavam, representando cada fio de cabelo e prega de tecido com precisão assombrosa. Sua figura maior, Albrecht Dürer, viajou à Itália, estudou suas teorias de proporção e fundiu-as com o ofício nórdico — ao mesmo tempo em que foi pioneiro da gravura, que levou imagens pelo continente como nunca antes. O movimento também foi moldado pela convulsão religiosa da Reforma: à medida que o protestantismo se espalhava, os artistas voltaram-se dos retábulos religiosos para o retrato, a paisagem e as cenas da vida cotidiana, lançando as bases da pintura secular posterior.",
    figures: [
      'Albrecht Dürer — fundiu a teoria italiana com o ofício nórdico',
      'Hans Holbein — penetrantes retratos da corte Tudor',
      'Jan van Eyck — luminoso realismo a óleo',
      'Pieter Bruegel — panoramas fervilhantes da vida camponesa',
    ],
    legacy:
      "Deu à arte ocidental alguns de seus retratos mais perscrutadores e seu duradouro amor pelo detalhe naturalista e a profundidade simbólica. Essa mescla de observação precisa e sentido oculto ecoaria com força pela pintura holandesa e muito além.",
  },
  flamenco: {
    title: 'Primitivos flamengos',
    lead:
      "Os pintores flamengos do século XV que estiveram entre os primeiros mestres da pintura a óleo, construindo superfícies luminosas e preciosas de um detalhe que assombrava seus contemporâneos.",
    era: 'séc. XV',
    origin: 'Flandres',
    hallmarks: [
      'Finas velaturas a óleo translúcidas para uma profundidade resplandecente',
      'Detalhe deslumbrante — reflexos, texturas, paisagens distantes',
      'Objetos comuns carregados de simbolismo religioso',
      'Algumas das primeiras pinturas assinadas e datadas',
      'Pequenos painéis devocionais e grandiosos retábulos',
    ],
    origins:
      "Nas ricas cidades comerciais da Flandres do século XV — Bruges, Gante e Bruxelas — um grupo de pintores transformou a arte europeia. Conhecidos como os primitivos flamengos (um termo antigo que significa «primeiros», não rústicos), exploraram a pintura a óleo como ninguém, construindo finas velaturas que faziam reflexos, tecidos e horizontes distantes cintilar de vida. Trabalhavam para os duques da Borgonha e para prósperos mercadores, produzindo retábulos, retratos e painéis devocionais densos de sentido, onde uma vela, um cão ou um espelho podiam carregar peso simbólico. Jan van Eyck chegou a assinar e datar suas obras — uma afirmação do novo estatuto do artista — e suas inovações no óleo logo influenciaram a Itália e o resto da Europa.",
    figures: [
      'Jan van Eyck — pioneiro da velatura a óleo (Retrato Arnolfini)',
      'Rogier van der Weyden — intensa emoção religiosa',
      'Hieronymus Bosch — visões fantásticas e moralizantes',
    ],
    legacy:
      "Os primitivos flamengos lançaram os alicerces técnicos e de observação da pintura a óleo ocidental. Seu casamento de realismo de tirar o fôlego e simbolismo oculto continua sendo uma das grandes conquistas da arte europeia e moldou a tradição holandesa que se seguiu.",
  },
  veneciana: {
    title: 'Escola veneziana',
    lead:
      "A pintura de Veneza, que prezava o «colorito» — cor, luz e superfície pictórica sensual — mais que o desenho firme e a composição («disegno») preferidos em Florença e Roma.",
    era: 'séc. XV–XVI',
    origin: 'Veneza',
    hallmarks: [
      'Forma construída com manchas resplandecentes de cor quente, não com contorno duro',
      'Pincelada solta e sensual a óleo',
      'Tecidos ricos, luz dourada e carne voluptuosa',
      'Atmosfera e clima acima da precisão nítida',
      'Mitologias sensuais e grandiosos retratos',
    ],
    origins:
      "Veneza, a grande república marítima, desenvolveu uma escola de pintura distinta da Itália central. Sua riqueza, seu comércio com o Oriente e a qualidade especial de sua luz aquosa e luminosa moldaram um estilo quente e guiado pela cor, construído não a partir de contornos duros mas de tons resplandecentes aplicados em pinceladas soltas de óleo. Giovanni Bellini abriu caminho com uma luz suave e luminosa; Giorgione trouxe um novo clima poético; e Ticiano, o maior de todos, dominou a pintura europeia por meio século. Mais tarde Veronese e Tintoretto estenderam a tradição ao grande espetáculo. As telas venezianas eram cobiçadas por toda a Europa por reis, papas e colecionadores.",
    figures: [
      'Giovanni Bellini — fundador, cor luminosa',
      'Giorgione — clima poético e atmosférico',
      'Ticiano — o supremo colorista',
      'Veronese, Tintoretto — o grande espetáculo',
    ],
    legacy:
      "O amor veneziano pela cor e a pincelada livre teve influência imensa. Alimentou diretamente o Barroco de Rubens e Velázquez e, séculos depois, ajudou a inspirar a pintura solta e guiada pela cor dos impressionistas.",
  },
  manierismo: {
    title: 'Maneirismo',
    lead:
      "O estilo deliberadamente elegante e artificial da geração posterior ao Alto Renascimento, que prezava a sofisticação, o refinamento e a estranheza acima do equilíbrio natural.",
    era: 'c. 1520–1600',
    origin: 'Itália',
    hallmarks: [
      'Membros impossivelmente alongados e poses retorcidas e instáveis',
      'Espaço apinhado, ambíguo e comprimido',
      'Cor ácida e inesperada',
      'Elegância ostensiva e graça fria e cerebral',
    ],
    origins:
      "O Maneirismo surgiu na Itália por volta de 1520, na geração seguinte ao Alto Renascimento. Tendo herdado uma arte aparentemente perfeita de Leonardo, Michelangelo e Rafael, os pintores mais jovens buscaram não mais naturalismo mas uma elegância sabida e sofisticada — a beleza empurrada rumo à tensão e ao artifício. A palavra vem do italiano «maniera», que significa estilo ou modo: arte feita com elegância ostensiva. Floresceu numa época turbulenta de crise religiosa e do traumático Saque de Roma de 1527, e sua instabilidade e inquietude podem parecer um espelho das angústias de seu tempo.",
    figures: [
      'Pontormo, Parmigianino — elegante alongamento',
      'Bronzino — frios e polidos retratos de corte',
      'El Greco — intensidade espiritual em forma de chama',
    ],
    legacy:
      "Por muito tempo desprezado como um declínio decadente do Renascimento, o Maneirismo é hoje valorizado por sua inventividade e complexidade psicológica. Faz a ponte entre o ideal sereno do Renascimento e o drama dinâmico do Barroco.",
  },
  barroco: {
    title: 'Barroco',
    lead:
      "A arte dramática e emocional do século XVII, que buscava acima de tudo comover o espectador — sobrecarregar os sentidos e agitar as emoções através do movimento, do espetáculo e da luz intensa.",
    era: 'séc. XVII–XVIII',
    origin: 'Itália, depois toda a Europa',
    hallmarks: [
      'Fortes contrastes de luz e sombra (claro-escuro)',
      'Composições diagonais arrebatadoras e movimento',
      'Gestos teatrais e realismo vívido e imediato',
      'Grandiosidade destinada a sobrecarregar os sentidos',
    ],
    origins:
      "O Barroco dominou a arte europeia ao longo do século XVII e adentrou o XVIII. Nasceu em parte da Contrarreforma da Igreja Católica, que usava uma arte emocionalmente potente e acessível para inspirar a fé contra o norte protestante mais sóbrio; mas também serviu monarcas absolutos e cortes ávidas por projetar grandiosidade e poder. O estilo assumiu formas diferentes pela Europa — apaixonado e religioso na Itália e na Espanha, opulento e sensual na Flandres, contido e íntimo na República Holandesa — mas todos compartilhavam o gosto pelo dinamismo e pela luz dramática, lançado pela iluminação revolucionária de Caravaggio.",
    figures: [
      'Caravaggio — iluminação dramática revolucionária',
      'Rubens — impetuosa energia flamenga',
      'Velázquez, Rembrandt — pincel deslumbrante e profundidade',
    ],
    legacy:
      "O Barroco produziu algumas das imagens mais potentes da arte ocidental. Seu domínio da luz, da emoção e do movimento moldou a pintura por gerações e ainda define nosso senso de narrativa visual teatral e dramática.",
  },
  neerlandes: {
    title: 'Século de Ouro holandês',
    lead:
      "O assombroso florescimento da pintura no século XVII na recém-independente, protestante e próspera República Holandesa, que fez do mundo cotidiano o tema da alta arte.",
    era: 'séc. XVII',
    origin: 'República Holandesa',
    hallmarks: [
      'Gêneros cotidianos: retratos, paisagens, marinhas, naturezas-mortas, interiores',
      'Luz natural honesta e atentamente observada',
      'Modestos temas domésticos tratados com cuidado',
      'Obras de pequena escala feitas para casas comuns',
    ],
    origins:
      "No século XVII uma nação pequena e recém-independente criou um vasto conjunto de arte para um público amplo e majoritariamente de classe média. Sem a Igreja ou grandes cortes como mecenas, os artistas holandeses pintavam para casas comuns, e os quadros eram comprados e vendidos quase como qualquer outra mercadoria num florescente mercado aberto. Aperfeiçoaram os gêneros da vida cotidiana — retratos, paisagens, naturezas-mortas e quietos interiores domésticos — prezados por sua honestidade e sua luz atentamente observada. Essa arte refletia uma sociedade confiante, comercial e marítima que valorizava o mundo visível, a limpeza, a prosperidade e a virtude doméstica.",
    figures: [
      'Rembrandt — profundidade psicológica e luz',
      'Vermeer — serenos e luminosos interiores',
      'Frans Hals — energia arrojada e viva',
    ],
    legacy:
      "O Século de Ouro holandês elevou temas cotidianos à alta arte e deu à pintura ocidental algumas de suas imagens mais amadas. Seu realismo íntimo e seu manejo sutil da luz continuam a comover os espectadores quatro séculos depois.",
  },
  espanol: {
    title: 'Século de Ouro espanhol',
    lead:
      "A arte intensa e muitas vezes austera da Espanha no auge de seu império, moldada por uma corte e uma Igreja católicas devotas durante o «Siglo de Oro».",
    era: 'c. 1550–1660',
    origin: 'Espanha',
    hallmarks: [
      'Realismo cru e profunda intensidade espiritual',
      'Contrastes dramáticos de luz e sombra',
      'Clima grave e cerimonial, mesmo nos retratos reais',
      'Temas que vão da austeridade ascética à rica sensualidade',
    ],
    origins:
      "O Siglo de Oro espanhol, aproximadamente de 1550 a 1660, coincidiu com o auge de seu império e produziu uma arte de grande intensidade emocional e religiosa. Serviu à monarquia dos Habsburgo e à Igreja da Contrarreforma, decorando palácios, conventos e catedrais; até seus retratos reais carregam uma nota de gravidade solene e cerimonial própria da Espanha. Seus mestres vão de El Greco, cujas figuras alongadas se estendem rumo ao divino, a Velázquez, um pintor de corte de sutileza e verdade incomparáveis, e Zurbarán e Ribera, que deram aos temas sagrados um realismo grave e tangível.",
    figures: [
      'El Greco — figuras alongadas e extáticas',
      'Velázquez — verdade e sutileza incomparáveis',
      'Zurbarán, Ribera — grave realismo sacro',
    ],
    legacy:
      "O Século de Ouro espanhol deu ao mundo algumas de suas mais profundas pinturas religiosas e, em Velázquez, um dos maiores pintores de todos os tempos — um artista cuja honestidade e técnica inspirariam Goya, Manet e Picasso por igual.",
  },
  neoclasicismo: {
    title: 'Neoclassicismo e arte acadêmica',
    lead:
      "Um retorno deliberado à nobre simplicidade e à seriedade moral da Grécia e da Roma antigas, reagindo contra a frivolidade do Rococó e o excesso do Barroco tardio.",
    era: 'meados do séc. XVIII–XIX',
    origin: 'França e Itália',
    hallmarks: [
      'Linha e desenho claros e escultóricos',
      'Cor contida e sóbria e composição equilibrada',
      'Temas cívicos, heroicos ou morais elevados',
      'Sentimento disciplinado pela ordem e a razão',
    ],
    origins:
      "O Neoclassicismo surgiu em meados do século XVIII, inspirado pelas recentes escavações de Pompeia e Herculano, que puseram o mundo antigo vividamente diante dos olhos europeus. Buscava a virtude e a razão em vez do mero prazer, e seu supremo mestre, Jacques-Louis David, pintou severos dramas morais que se tornaram emblemas primeiro da Revolução Francesa e depois do império de Napoleão. Tornou-se o estilo oficial das academias de arte, que formavam os pintores no desenho rigoroso e na forma idealizada, e essa arte «acadêmica» dominou os salões do século XIX antes que as vanguardas modernas a desafiassem.",
    figures: [
      'Jacques-Louis David — severos dramas revolucionários',
      'Ingres — classicismo frio e preciso',
    ],
    legacy:
      "Embora os rebeldes posteriores rejeitassem suas regras, o Neoclassicismo definiu como era a pintura europeia séria por um século. Sua clareza, disciplina e reverência pela Antiguidade continuam sendo uma corrente duradoura na arte ocidental.",
  },
  romanticismo: {
    title: 'Romantismo',
    lead:
      "Uma revolta apaixonada contra a ordem neoclássica e a razão iluminista, que defendeu a emoção, a imaginação e o indivíduo acima das regras e da racionalidade.",
    era: 'fins do séc. XVIII–XIX',
    origin: 'Europa',
    hallmarks: [
      'O sublime: temor, terror e assombro diante da natureza selvagem',
      'Cor ousada e energia carregada e dinâmica',
      'Tempestades, naufrágios, ruínas, terras exóticas e lutas heroicas',
      'A visão interior do artista como verdadeira fonte da arte',
    ],
    origins:
      "O Romantismo varreu a arte europeia no fim do século XVIII e início do XIX, numa época de revolução, convulsão e novo nacionalismo, e de um anseio por autenticidade, mistério e o indomado. Reagiu contra a fria contenção do Neoclassicismo, prezando o sentimento acima das regras e a vida interior do artista acima de tudo. Na França, Géricault e Delacroix pintaram cenas turbulentas de drama e revolta; na Alemanha, Caspar David Friedrich transformou figuras solitárias diante de vastas paisagens em meditações sobre a alma; na Grã-Bretanha, Turner dissolveu o mundo em luz e atmosfera.",
    figures: [
      'Géricault, Delacroix — turbulento drama francês',
      'Caspar David Friedrich — a alma solitária na natureza',
      'Turner — o mundo dissolvido em luz',
    ],
    legacy:
      "O Romantismo libertou a cor, o sentimento e a subjetividade na pintura, e sua exaltação da expressão individual abriu caminho para grande parte da arte moderna. Suas imagens do poder da natureza e do eu solitário ainda ressoam profundamente.",
  },
  realismo: {
    title: 'Realismo',
    lead:
      "A insistência em representar o mundo comum com honestidade, exatamente como é, rejeitando tanto o idealismo neoclássico quanto a fantasia romântica.",
    era: 'meados do séc. XIX',
    origin: 'França',
    hallmarks: [
      'Temas sem glamour: camponeses, trabalhadores, lavadeiras, vida cotidiana',
      'Temas humildes pintados em escala grandiosa e séria',
      'Observação verdadeira acima do embelezamento',
      'Uma quieta dignidade, às vezes com uma nota de protesto social',
    ],
    origins:
      "O Realismo surgiu na França por volta das décadas de 1840 e 1850, numa era de revolução política e mudança industrial, quando artistas e escritores se tornaram novamente atentos às condições sociais e às vidas das pessoas comuns. Voltou-se para temas antes indignos da arte «séria» — os pobres rurais e urbanos — e os pintou na grande escala outrora reservada a deuses e heróis, dando-lhes uma quieta dignidade. Gustave Courbet liderou o movimento com provocação deliberada, enquanto Jean-François Millet deu ao labor rural uma gravidade monumental, quase sagrada; a corrente afim do Naturalismo empurrou ainda mais rumo à observação crua e científica.",
    figures: [
      'Gustave Courbet — líder provocador',
      'Jean-François Millet — o camponês monumental',
    ],
    legacy:
      "Ao libertar a pintura do mito e da idealização e enraizá-la na realidade observada, o Realismo abriu a porta para a arte moderna. Sua atenção honesta à vida cotidiana alimentou diretamente o Impressionismo e os movimentos que se seguiram.",
  },
  realismosocial: {
    title: 'Realismo social',
    lead:
      "O realismo que volta seu olhar honesto especificamente para a realidade social e política — pobreza, trabalho, desigualdade e injustiça — usando um estilo simples e direto para dar testemunho.",
    era: 'séc. XIX–XX',
    origin: 'Mundial',
    hallmarks: [
      'Os pobres, os explorados e os trabalhadores no centro absoluto',
      'Um estilo simples e sem sentimentalismo que confronta a dureza',
      'Um apelo à empatia, à consciência ou à percepção',
      'Trabalho e luta onde antes estavam heróis ou deuses',
    ],
    origins:
      "O Realismo social é uma corrente dentro da arte realista que apareceu pelo mundo a partir do século XIX, onde quer que a industrialização, a migração e a desigualdade criassem sofrimento visível — inclusive na América Latina, onde pintores registraram as vidas dos pobres urbanos e dos despossuídos. Em vez de idealizar ou entreter, confronta o espectador com os desempregados, os explorados e os famintos. Está estreitamente ligado a movimentos mais amplos de reforma social, e sua força emocional vem de colocar a luta cotidiana no coração do quadro.",
    figures: [
      'Ernesto de la Cárcova — protesto social argentino',
      'Reinaldo Giudici — os pobres urbanos',
    ],
    legacy:
      "O Realismo social deu à arte uma voz moral e política, lembrando aos espectadores realidades fáceis de ignorar. Sua tradição da arte como testemunho e consciência prosseguiu com força pelo século XX.",
  },
  realismoamericano: {
    title: 'Realismo e Regionalismo americanos',
    lead:
      "O impulso, no fim do século XIX e início do XX, de retratar a vida americana de modo direto e verdadeiro, em vez de através de ideais europeus emprestados.",
    era: 'fins do séc. XIX–XX',
    origin: 'Estados Unidos',
    hallmarks: [
      'Cenas americanas cotidianas: ruas, fazendas, marinheiros, trabalhadores',
      'Observação fresca e sem sentimentalismo',
      'O foco regionalista na vida rural e do interior',
      'Imobilidade e solidão na cidade moderna',
    ],
    origins:
      "À medida que os Estados Unidos cresciam como potência mundial, seus artistas buscaram uma identidade visual confiante e independente enraizada nas próprias cenas e gentes da nação. Os pintores realistas representavam o cotidiano com olhos frescos e sem sentimentalismo — as vigorosas cenas do mar e da infância no campo de Winslow Homer são exemplos clássicos. Na década de 1930, durante a Depressão, o movimento afim do Regionalismo celebrou a América rural e das cidadezinhas como uma resposta caseira ao modernismo europeu, enquanto Edward Hopper destilou toda a corrente em imagens de imobilidade e solidão moderna.",
    figures: [
      'Winslow Homer — o mar e a vida no campo',
      'Grant Wood — o interior regionalista («American Gothic»)',
      'Edward Hopper — a solidão moderna',
    ],
    legacy:
      "Juntos esses artistas forjaram uma arte americana confiante e independente enraizada na cena e no caráter locais, dando à jovem nação imagens que pareciam autenticamente suas.",
  },
  costumbrismo: {
    title: 'Costumbrismo',
    lead:
      "A representação artística afetuosa dos costumes, do traje, dos «tipos» e da vida cotidiana de um lugar e um povo específicos, tratando o local e o comum como temas dignos.",
    era: 'séc. XIX',
    origin: 'Espanha e América Latina',
    hallmarks: [
      'Cenas de mercados, festas, danças populares e tabernas rurais',
      'Traje regional e «tipos» populares',
      'Pintura de gênero calorosa, detalhada e atentamente observada',
      'O gaúcho, o huaso, o vendedor, a dança rural',
    ],
    origins:
      "O Costumbrismo floresceu sobretudo na Espanha do século XIX e por toda a América Latina. Em vez da grande história ou do mito, seus pintores registravam a textura de uma sociedade — seu trabalho, lazer, rituais e personagens — com calor e detalhe. O movimento surgiu ao lado do nacionalismo do século XIX, à medida que nações recém-independentes buscavam definir sua identidade através da própria terra, gente e tradições, e essas imagens ajudaram a moldar como as sociedades se imaginavam a si mesmas.",
    figures: [
      'Manuel Antonio Caro — a dança nacional do Chile',
      'José Agustín Arrieta — a vida cotidiana mexicana',
    ],
    legacy:
      "O Costumbrismo deixou um inestimável registro visual de modos de vida em desaparecimento e da cultura popular. Caloroso, observador e enraizado no lugar, continua central para o patrimônio artístico nacional de muitos países de língua espanhola.",
  },
  hudson: {
    title: 'Escola do Rio Hudson',
    lead:
      "O primeiro grande movimento paisagístico da arte americana, que representou a natureza selvagem do Novo Mundo como vasta, sublime e dádiva de Deus.",
    era: '1820–1870',
    origin: 'Estados Unidos',
    hallmarks: [
      'Escala grandiosa e assombrosa',
      'Montanhas, florestas, rios e céus luminosos',
      'Luz resplandecente e dramática',
      'A terra indomada como algo nacional e até divino',
    ],
    origins:
      "A Escola do Rio Hudson tomou o nome do cênico vale do rio Hudson, em Nova York, onde seus fundadores pintaram pela primeira vez na década de 1820. Surgiu à medida que os jovens Estados Unidos se expandiam para o oeste e forjavam uma identidade nacional, apresentando a natureza selvagem como fonte de orgulho e até de destino divino. Thomas Cole fundou o movimento e deu-lhe uma dimensão moral e espiritual — algumas de suas obras lamentam em silêncio a perda da terra para o desenvolvimento — enquanto uma geração posterior, incluindo Frederic Church e Albert Bierstadt, empurrou rumo a panoramas cada vez mais espetaculares do Novo Mundo e além.",
    figures: [
      'Thomas Cole — fundador, visão moral e espiritual',
      'Frederic Church, Albert Bierstadt — vastos panoramas',
    ],
    legacy:
      "A Escola do Rio Hudson estabeleceu a paisagem como tema americano sério e moldou como a nação via a própria terra. Sua visão sublime da natureza selvagem continua sendo uma pedra angular da arte americana.",
  },
  impresionismo: {
    title: 'Impressionismo',
    lead:
      "Uma rebelião contra a pintura acadêmica que buscava captar os efeitos fugazes da luz, da cor e da atmosfera num único instante passageiro — um dos movimentos mais amados da história da arte.",
    era: '1860–1880',
    origin: 'Paris',
    hallmarks: [
      'Pinceladas soltas e quebradas',
      'Cores vivas e não misturadas',
      'Muitas vezes pintado depressa, ao ar livre, diante do tema',
      'Temas modernos: cafés, bulevares, jardins, estações, lazer',
    ],
    origins:
      "O Impressionismo nasceu em Paris nas décadas de 1860 e 70 como uma revolta contra as rígidas convenções do Salão oficial e da pintura acadêmica. Seus artistas trabalhavam depressa, muitas vezes ao ar livre, usando pinceladas soltas e cor viva para registrar a «impressão» imediata de uma cena em vez de seu detalhe fixo e preciso, tomando como tema o mundo moderno ao seu redor. O nome veio de uma resenha zombeteira de «Impressão, Nascer do Sol» de Monet na primeira exposição independente do grupo, em 1874 — o que os críticos desprezaram como esboçado e inacabado, os artistas abraçaram como uma forma mais verdadeira de ver.",
    figures: [
      'Claude Monet — luz e atmosfera',
      'Renoir, Degas, Pissarro',
      'Morisot, Cassatt, Sisley, Caillebotte',
    ],
    legacy:
      "O Impressionismo transformou a arte ao prezar a percepção, a espontaneidade e a vida moderna cotidiana. Libertou a cor e a pincelada da descrição estrita e abriu a porta para toda a aventura da pintura moderna.",
  },
  posimpresionismo: {
    title: 'Pós-Impressionismo',
    lead:
      "A arte diversa que se construiu sobre a cor viva do Impressionismo mas foi além dele rumo a maior estrutura, emoção, simbolismo e expressão pessoal.",
    era: '1880–1900',
    origin: 'França',
    hallmarks: [
      'Cor viva usada para o sentimento e o sentido, não só para a luz',
      'Maior estrutura, simbolismo e expressão interior',
      'Estilos altamente pessoais e individuais',
      'Além do fugaz momento óptico',
    ],
    origins:
      "Pós-Impressionismo é o termo para a arte variada que surgiu na França nas décadas de 1880 e 1890, mantendo a cor do Impressionismo mas rejeitando seu foco na impressão momentânea. Seus artistas nunca formaram um único grupo; cada um seguiu sua própria direção, convencido de que a pintura deveria exprimir mais do que o olho sozinho percebe — e sua obra foi muitas vezes incompreendida e subvalorizada em vida. Cézanne reconstruiu a natureza a partir de sólidos planos geométricos; Van Gogh carregou suas telas de cor e emoção intensas; Seurat aplicou a cor com rigor científico; Gauguin achatou a forma em busca de uma arte simbólica.",
    figures: [
      'Cézanne — a forma a partir de planos geométricos',
      'Van Gogh — cor e emoção intensas',
      'Gauguin — cor plana e simbólica',
      'Seurat — cor científica (Pontilhismo)',
    ],
    legacy:
      "O Pós-Impressionismo foi a ponte crucial para a arte moderna do século XX. Van Gogh, Cézanne e Gauguin em particular tornaram-se influências colossais sobre o Expressionismo, o Cubismo, o Fauvismo e quase tudo o que se seguiu.",
  },
  neoimpresionismo: {
    title: 'Neoimpressionismo (Pontilhismo)',
    lead:
      "Um desenvolvimento sistemático e científico do Impressionismo que construía imagens luminosas a partir de incontáveis pequenos pontos de cor pura e não misturada.",
    era: '1880–1890',
    origin: 'França',
    hallmarks: [
      'Pontilhismo: minúsculos pontos separados de cor não misturada',
      'Cores misturadas pelo olho, não na paleta',
      'Uma calma cristalina, imóvel e ordenada',
      'Método laborioso, quase meditativo',
    ],
    origins:
      "O Neoimpressionismo surgiu na França na década de 1880 como um desenvolvimento mais racional e disciplinado do Impressionismo. Onde os impressionistas trabalhavam por instinto e espontaneidade, seus artistas aplicavam teorias contemporâneas da cor e da óptica, colocando pontos de cor pura lado a lado para que o olho os misturasse em tons mais vivos, em teoria, que a tinta misturada. Georges Seurat foi pioneiro da abordagem; Paul Signac tornou-se seu principal defensor e teórico. O movimento refletia uma fé de fim do século XIX na ciência e na ordem, aplicada ao próprio ato de perceber, e construir um grande quadro ponto a ponto era um trabalho lento, quase meditativo.",
    figures: [
      'Georges Seurat — pioneiro do método',
      'Paul Signac — seu principal defensor e teórico',
    ],
    legacy:
      "Embora efêmero como método estrito, o Neoimpressionismo influenciou muitos artistas posteriores, incluindo Matisse e os fauves. Seu uso ousado e analítico da cor pura ajudou a empurrar a pintura rumo à abstração moderna.",
  },
  simbolismo: {
    title: 'Simbolismo',
    lead:
      "Uma volta para dentro — rumo aos sonhos, ao mito, à emoção e à imaginação — reagindo contra o Realismo e o Impressionismo voltados para fora.",
    era: '1880–1900',
    origin: 'França e Bélgica',
    hallmarks: [
      'Sugestão, clima e metáfora acima da representação literal',
      'Temas de amor, morte, desejo, mistério e o espiritual',
      'Imagens enigmáticas, muitas vezes perturbadoras e oníricas',
      'Subjetividade e vida interior',
    ],
    origins:
      "O Simbolismo surgiu na década de 1880, em grande parte na França e na Bélgica, mas espalhando-se pela Europa. Onde o Realismo e o Impressionismo olhavam para fora, para o mundo visível, o Simbolismo voltava-se para dentro, usando imagens evocativas, clima e metáfora para insinuar ideias e sentimentos que não podiam ser mostrados literalmente. Foi paralelo à poesia simbolista e refletiu um clima de fim de século de introspecção, busca espiritual e inquietação, prezando a imaginação acima da realidade objetiva.",
    figures: [
      'Gustave Moreau, Odilon Redon — visionários franceses',
      'Edvard Munch — angústia e desejo',
      'Gustav Klimt — alegoria sensual e ornamental',
    ],
    legacy:
      "A ênfase do Simbolismo na imaginação, no subconsciente e no poder emocional da imagem teve profunda influência sobre a arte do século XX, alimentando diretamente o Expressionismo e, mais tarde, o Surrealismo.",
  },
  modernismo: {
    title: 'Modernisme / Art Nouveau',
    lead:
      "Um movimento decorativo da virada do século que buscava um estilo fresco e moderno livre da imitação histórica, extraindo suas formas da natureza.",
    era: 'c. 1890–1910',
    origin: 'Europa',
    hallmarks: [
      'Linhas sinuosas e fluentes em «chicotada»',
      'Formas orgânicas de plantas e flores',
      'Padrão elegante e ornamental',
      'Um estilo total que unia arte, arquitetura, vidro e design',
    ],
    origins:
      "Por volta de 1900 um movimento decorativo varreu a Europa sob muitos nomes — Art Nouveau na França, Modernisme na Catalunha, Jugendstil na Alemanha, o estilo da Secessão em Viena. Floresceu num período de otimismo, progresso industrial e novo lazer urbano, e visava ser belo, harmonioso e inteiramente de seu próprio momento. Um movimento de design total, unia pintura, arquitetura, joalheria, mobiliário e artes gráficas; na pintura é encarnado acima de tudo por Gustav Klimt, cujas telas douradas e ornamentadas fundem figura e ornamento.",
    figures: [
      'Gustav Klimt — telas douradas e ornamentadas',
      'Alphonse Mucha — fluentes cartazes decorativos',
    ],
    legacy:
      "Embora seu apogeu tenha sido breve, o Art Nouveau remodelou o design e as artes decorativas e ajudou a modernizar a linguagem visual da Europa. Sua elegância fluente continua instantaneamente reconhecível e infinitamente influente.",
  },
  fovismo: {
    title: 'Fauvismo',
    lead:
      "O primeiro movimento de vanguarda do século XX — breve mas explosivo — construído sobre a libertação total da cor de seu dever de descrever a realidade.",
    era: 'c. 1904–1908',
    origin: 'França',
    hallmarks: [
      'Cor pura, intensa e muitas vezes arbitrária, direto do tubo',
      'Um rosto podia ser verde, um céu rosa',
      'Pinceladas ousadas e enérgicas',
      'Cor a serviço da emoção e do design, não da descrição',
    ],
    origins:
      "O Fauvismo irrompeu na França por volta de 1904–1908, construindo sobre as experiências de cor de Van Gogh, Gauguin e os neoimpressionistas e empurrando-as a um extremo jubiloso. Seus pintores usavam cor pura e intensa a serviço do sentimento e do design em vez da aparência das coisas. O nome veio de um crítico que, ao ver suas telas selvagens no Salão de Outono de 1905, chamou os pintores de «les fauves» — as feras — um insulto que os artistas abraçaram com orgulho.",
    figures: [
      'Henri Matisse — o líder',
      'André Derain, Maurice de Vlaminck',
    ],
    legacy:
      "Embora tenha durado só alguns anos, o Fauvismo foi um avanço decisivo. Ao libertar inteiramente a cor de seu dever de descrever o mundo, abriu caminho para o Expressionismo, a abstração e grande parte da arte moderna.",
  },
  expresionismo: {
    title: 'Expressionismo',
    lead:
      "A arte da emoção interior crua, que deliberadamente distorce a cor, a linha e a forma para mostrar o mundo tal como se sente, e não como se vê.",
    era: 'início do séc. XX',
    origin: 'Alemanha e Áustria',
    hallmarks: [
      'Formas deliberadamente distorcidas e retorcidas',
      'Cores estridentes e pincelada dentada e agitada',
      'Angústia, paixão, alienação e anseio espiritual',
      'Sentimento subjetivo acima da realidade objetiva',
    ],
    origins:
      "O Expressionismo floresceu sobretudo na Alemanha e na Áustria no início do século XX, crescendo das tensões de uma sociedade que se modernizava depressa e, angustiada, à beira da Primeira Guerra Mundial, e valendo-se da força emocional de Van Gogh, Munch e os simbolistas. Formaram-se dois grupos-chave na Alemanha: Die Brücke (A Ponte), liderado por Kirchner, com suas cenas urbanas ásperas e angulosas; e Der Blaue Reiter (O Cavaleiro Azul), incluindo Kandinsky e Franz Marc, que buscava uma arte espiritual e cada vez mais abstrata. Na Áustria, Egon Schiele empurrou o corpo rumo a uma intensidade crua e angustiada.",
    figures: [
      'Kirchner — as cidades ásperas do Die Brücke',
      'Kandinsky, Franz Marc — Der Blaue Reiter',
      'Egon Schiele — corpos crus e angustiados',
    ],
    legacy:
      "O Expressionismo fez do sentimento interior do artista o verdadeiro tema da arte. Sua intensidade emocional e sua distorção expressiva tiveram um impacto duradouro, ecoando pela pintura moderna e contemporânea.",
  },
  cubismo: {
    title: 'Cubismo',
    lead:
      "Uma das revoluções mais radicais da história da arte ocidental, que estilhaçou os objetos em facetas geométricas e os remontou, mostrando muitos pontos de vista ao mesmo tempo.",
    era: 'c. 1907–1914',
    origin: 'Paris',
    hallmarks: [
      'Objetos fragmentados em planos geométricos',
      'Múltiplos pontos de vista combinados numa só imagem',
      'A perspectiva única e fixa abandonada',
      'Mais tarde: cor mais viva, formas mais simples e colagem',
    ],
    origins:
      "O Cubismo foi pioneiramente criado em Paris por Pablo Picasso e Georges Braque entre cerca de 1907 e 1914. Abandonando a perspectiva única e fixa que governara a pintura desde o Renascimento, trataram a tela plana como um novo tipo de espaço. O «Cubismo analítico» inicial fragmentava as formas em grades quase abstratas e monocromáticas; o «Cubismo sintético» posterior reintroduziu cor mais viva, formas mais simples e até materiais colados (colagem). O movimento valeu-se da pintura estrutural de Cézanne e da escultura africana e ibérica, e refletia um mundo moderno de nova ciência, velocidade e pontos de vista cambiantes.",
    figures: [
      'Pablo Picasso e Georges Braque — cofundadores',
      'Juan Gris, Fernand Léger — cubistas posteriores',
    ],
    legacy:
      "O Cubismo reinventou como uma superfície plana pode representar forma e espaço, e suas ideias irradiaram para o Futurismo, a abstração e incontáveis movimentos posteriores. É uma pedra angular da arte do século XX.",
  },
  futurismo: {
    title: 'Futurismo',
    lead:
      "Uma vanguarda italiana agressiva e voltada para o futuro que rejeitou o passado e glorificou a velocidade, a energia e as máquinas da era moderna.",
    era: 'c. 1909–1918',
    origin: 'Itália',
    hallmarks: [
      'Movimento, velocidade e energia tornados visíveis na tela',
      'Figuras fraturadas em planos repetidos e sobrepostos e «linhas de força»',
      'Automóveis, máquinas, multidões e a cidade elétrica',
      'Formas fragmentadas tomadas do Cubismo',
    ],
    origins:
      "O Futurismo foi lançado em 1909 com um manifesto ardente do poeta Filippo Marinetti. Adorava a velocidade, a tecnologia, a indústria e até a violência e a guerra, que via como forças que varriam um mundo velho e estagnado. Na pintura, Umberto Boccioni e Giacomo Balla fraturavam figuras em movimento em planos sobrepostos para tornar visível o próprio movimento, valendo-se muito das formas fragmentadas do Cubismo. O movimento estendeu-se além da pintura à escultura, à música e ao design, e esteve ligado à política turbulenta da Itália do início do século XX.",
    figures: [
      'Umberto Boccioni — seu principal artista e teórico',
      'Giacomo Balla — movimento e luz',
    ],
    legacy:
      "Embora tenha esmaecido após a Primeira Guerra Mundial, a visão dinâmica de movimento e modernidade do Futurismo influenciou a arte e o design posteriores. Sua tentativa de pintar a pura velocidade e força continua sendo uma das experiências mais ousadas do modernismo.",
  },
  suprematismo: {
    title: 'Suprematismo',
    lead:
      "Um movimento pioneiro de pura abstração geométrica que deixou para trás toda referência ao mundo visível em favor do puro sentimento e da forma.",
    era: 'a partir de 1915',
    origin: 'Rússia',
    hallmarks: [
      'Formas simples: quadrados, círculos, cruzes e linhas',
      'Uma gama limitada de cores sobre fundos brancos lisos',
      'Formas flutuando livres da gravidade e dos objetos',
      'A supremacia do puro sentimento sobre a representação',
    ],
    origins:
      "O Suprematismo foi fundado pelo artista russo Kazimir Malevich em 1915, no fervor em torno da Revolução Russa. Ele reduziu a arte aos elementos mais escassos — formas geométricas simples flutuando sobre o branco — afirmando a supremacia do puro sentimento e da forma sobre a representação de objetos. Seu cru «Quadrado Negro» pretendia ser um «zero da forma», um novo começo radical; ele até o pendurou no alto de um canto, o lugar tradicional de um ícone religioso. O movimento fez parte da explosão de experimentação vanguardista na Rússia soviética inicial, quando muitos acreditavam que a arte abstrata podia ajudar a construir um mundo e uma consciência novos.",
    figures: [
      'Kazimir Malevich — fundador',
      'El Lissitzky — levou suas ideias ao design',
    ],
    legacy:
      "Entre os primeiros movimentos plenamente abstratos, o Suprematismo teve profunda influência sobre o rumo da arte e do design modernos. Sua redução da pintura à pura geometria e ao sentimento ajudou a definir a própria abstração.",
  },
  neoplasticismo: {
    title: 'Neoplasticismo (De Stijl)',
    lead:
      "Um estilo abstrato rigoroso reduzido a linhas retas, ângulos retos e as três cores primárias, em busca de uma harmonia universal sob o mundo visível.",
    era: 'a partir de 1917',
    origin: 'Países Baixos',
    hallmarks: [
      'Apenas linhas pretas horizontais e verticais',
      'Planos chapados de vermelho, amarelo e azul, com branco, cinza e preto',
      'Sem curvas, diagonais ou objetos reconhecíveis',
      'Equilíbrio cuidadoso e preciso de cada proporção',
    ],
    origins:
      "O Neoplasticismo foi o severo estilo abstrato desenvolvido pelo pintor holandês Piet Mondrian e defendido pelo grupo De Stijl («O Estilo») que ele cofundou nos Países Baixos em 1917. Mondrian acreditava que destilar a pintura a seus elementos absolutos podia exprimir uma harmonia e um equilíbrio universais subjacentes ao caos do mundo visível — uma ambição espiritual, quase utópica, mais que mera decoração. O De Stijl estendeu essas ideias além da pintura à arquitetura, ao mobiliário e ao design, visando remodelar todo o ambiente visual segundo uma ordem pura e racional.",
    figures: [
      'Piet Mondrian — seu criador',
      'Theo van Doesburg — cofundador do De Stijl',
    ],
    legacy:
      "O Neoplasticismo tornou-se uma das correntes mais influentes da arte e do design modernos. Sua geometria limpa e suas cores primárias moldaram a arquitetura e o design gráfico do século XX, e continuam instantaneamente reconhecíveis hoje.",
  },
  ukiyoe: {
    title: 'Ukiyo-e',
    lead:
      "Xilogravuras e pinturas japonesas do «mundo flutuante» — a cultura urbana da moda e em busca do prazer do período Edo.",
    era: 'séc. XVII–XIX',
    origin: 'Japão (Edo)',
    hallmarks: [
      'Áreas chapadas de cor e contornos ousados e elegantes',
      'Composições ousadas, assimétricas e recortadas',
      'Estampas baratas e populares feitas de blocos de madeira entalhados',
      'Beldades, atores, paisagens e lendas',
    ],
    origins:
      "O ukiyo-e — «imagens do mundo flutuante» — floresceu em Edo (a antiga Tóquio) do século XVII ao XIX. O «mundo flutuante» referia-se aos teatros, distritos de entretenimento, célebres beldades, atores e viagens de uma vívida cultura urbana popular. Feitas a baixo custo de blocos de madeira entalhados, as estampas eram uma arte acessível e popular, e seus mestres percorriam retratos de cortesãs e atores, paisagens dramáticas e histórias fantásticas do mito e da história.",
    figures: [
      'Utamaro — beldades (bijin-ga)',
      'Hokusai, Hiroshige — paisagens',
      'Kuniyoshi — guerreiros e lendas',
    ],
    legacy:
      "Quando o Japão se abriu ao Ocidente no século XIX, o ukiyo-e assombrou os artistas europeus. Esse «Japonisme» influenciou profundamente os impressionistas e pós-impressionistas — Van Gogh, Monet, Degas e outros — ajudando a moldar o rumo da arte moderna.",
  },
  rinpa: {
    title: 'Escola Rinpa',
    lead:
      "Uma grande tradição da pintura japonesa clássica celebrada por sua beleza ousada e decorativa e seu uso pródigo de ouro e prata.",
    era: 'a partir do séc. XVII',
    origin: 'Japão (Quioto)',
    hallmarks: [
      'Motivos naturais simplificados e estilizados como padrão rítmico',
      'Pródiga folha de ouro e prata e cor chapada e rica',
      'Uma suave técnica de «tinta espraiada» para folhas e pétalas',
      'Grandes biombos dobráveis e painéis com temas clássicos',
    ],
    origins:
      "O Rinpa floresceu a partir do século XVII e, ao contrário de uma linhagem familiar, foi uma tradição transmitida pela admiração e imitação através das gerações. Seus artistas preferiam motivos naturais simplificados — flores, ervas, árvores, aves e água — dispostos como padrões marcantes e rítmicos, e muitas vezes retomavam temas da literatura e da poesia japonesas clássicas. Tawaraya Sōtatsu estabeleceu o estilo, e Ogata Kōrin, cujos biombos de íris e flores de ameixeira estão entre suas conquistas supremas, levou-o ao seu apogeu.",
    figures: [
      'Tawaraya Sōtatsu — estabeleceu o estilo',
      'Ogata Kōrin — íris e flores de ameixeira',
    ],
    legacy:
      "A fusão de natureza, padrão e materiais preciosos do Rinpa teve impacto duradouro no design japonês e mais tarde influenciou a arte decorativa ocidental e o Art Nouveau. Sua elegância refinada continua sendo um traço definidor da estética japonesa.",
  },
  hasegawa: {
    title: 'Escola Hasegawa',
    lead:
      "Uma escola de pintura japonesa fundada no fim do século XVI, celebrada acima de tudo por suas atmosféricas paisagens a tinta monocromática.",
    era: 'a partir de fins do séc. XVI',
    origin: 'Japão',
    hallmarks: [
      'Tinta monocromática sobre papel liso',
      'Vasto espaço vazio usado para sugerir névoa e silêncio',
      'Pincelada esparsa e evocativa enraizada no Zen',
      'Também ousados biombos de fundo dourado do período Momoyama',
    ],
    origins:
      "A escola Hasegawa foi fundada por Hasegawa Tōhaku durante o vibrante período Momoyama. Tōhaku absorveu os ideais da pintura a tinta chinesa e a tradição japonesa nativa, desenvolvendo um estilo de notável sutileza atmosférica — seus biombos «Pinheiros» evocam uma floresta enevoada usando apenas tinta preta e vastas áreas de papel vazio, uma expressão suprema da sugestão, da contenção e do apreço Zen pelo vazio. A escola também produziu biombos de fundo dourado ricamente coloridos no ousado gosto Momoyama, mostrando seu alcance da tinta esparsa à pródiga decoração.",
    figures: [
      'Hasegawa Tōhaku — fundador (biombos «Pinheiros»)',
    ],
    legacy:
      "A escola Hasegawa representa um dos pontos altos da pintura a tinta japonesa. Seu equilíbrio entre o ousado espaço vazio e a pincelada delicada e evocativa ainda é venerado como modelo de beleza contemplativa.",
  },
  naif: {
    title: 'Arte naïf',
    lead:
      "Arte feita por artistas autodidatas que trabalham fora da tradição acadêmica, sem formação formal em perspectiva, anatomia ou nas regras estabelecidas da pintura.",
    era: 'qualquer época',
    origin: 'Mundial',
    hallmarks: [
      'Espaço achatado e perspectiva não convencional',
      'Cor viva, muitas vezes irrealista',
      'Atenção franca, minuciosa e infantil ao detalhe',
      'Uma franqueza onírica e poética',
    ],
    origins:
      "Os artistas naïf aparecem por todo o mundo e em todas as épocas, seguindo sua própria visão em vez de qualquer escola ou moda. Longe de ser uma fraqueza, sua franqueza sem formação — espaço achatado, cor irreal, igual clareza infantil dada a tudo — confere à sua obra uma qualidade onírica, muitas vezes potente. O mais famoso, Henri Rousseau, um funcionário aduaneiro francês que nunca deixou a França, evocou exuberantes selvas imaginárias que encantaram a vanguarda parisiense.",
    figures: [
      'Henri Rousseau — selvas imaginárias',
    ],
    legacy:
      "No século XX os artistas modernos passaram a prezar a arte naïf justamente por seu frescor sem formação e sua liberdade imaginativa, vendo uma autenticidade que o treinamento acadêmico podia apagar. Continua amplamente amada por sua honestidade e seu charme.",
  },
};

/** The movement description for a locale, falling back to English. */
export function movementInfo(key?: string, locale: Locale = 'en'): MovementInfo | undefined {
  if (!key) return undefined;
  return (
    (locale === 'de' && MOVEMENT_INFO_DE[key]) ||
    (locale === 'pt' && MOVEMENT_INFO_PT[key]) ||
    (locale === 'it' && MOVEMENT_INFO_IT[key]) ||
    (locale === 'fr' && MOVEMENT_INFO_FR[key]) ||
    (locale === 'es' && MOVEMENT_INFO_ES[key]) ||
    MOVEMENT_INFO[key]
  );
}

/** Map any of the catalog's movement strings onto a canonical slug. */
export function movementKeyFor(raw?: string): string | undefined {
  if (!raw) return undefined;
  const s = raw.toLowerCase();
  return (
    /na[íi]f/.test(s) ? 'naif' :
    /ukiyo/.test(s) ? 'ukiyoe' :
    /rinpa/.test(s) ? 'rinpa' :
    /hasegawa/.test(s) ? 'hasegawa' :
    /suprematismo/.test(s) ? 'suprematismo' :
    /neoplasticismo/.test(s) ? 'neoplasticismo' :
    /futurismo/.test(s) ? 'futurismo' :
    /cubismo/.test(s) ? 'cubismo' :
    /fovismo/.test(s) ? 'fovismo' :
    /jinete azul|expresionismo/.test(s) ? 'expresionismo' :
    /puntillismo|neoimpresionismo/.test(s) ? 'neoimpresionismo' :
    /posimpresionismo|pont-aven/.test(s) ? 'posimpresionismo' :
    /impresionismo/.test(s) ? 'impresionismo' :
    /simbolismo/.test(s) ? 'simbolismo' :
    /modernismo/.test(s) ? 'modernismo' :
    /r[íi]o hudson/.test(s) ? 'hudson' :
    /realismo social/.test(s) ? 'realismosocial' :
    /costumbrismo/.test(s) ? 'costumbrismo' :
    /regionalismo|realismo americano/.test(s) ? 'realismoamericano' :
    /realismo|naturalismo/.test(s) ? 'realismo' :
    /rom[áa]ntic/.test(s) ? 'romanticismo' :
    /neoclasic|clasicismo|academic/.test(s) ? 'neoclasicismo' :
    /siglo de oro neerland/.test(s) ? 'neerlandes' :
    /siglo de oro/.test(s) ? 'espanol' :
    /barroc/.test(s) ? 'barroco' :
    /manierismo/.test(s) ? 'manierismo' :
    /veneciana/.test(s) ? 'veneciana' :
    /primitivo flamenco/.test(s) ? 'flamenco' :
    /renacimiento alem[áa]n|renacimiento n[óo]rdico/.test(s) ? 'renacimientonorte' :
    /renacimiento|renacentista/.test(s) ? 'renacimiento' :
    undefined
  );
}

/** Map any of the catalog's movement strings onto a canonical description. */
export function movementInfoFor(raw?: string): MovementInfo | undefined {
  const key = movementKeyFor(raw);
  return key ? MOVEMENT_INFO[key] : undefined;
}
