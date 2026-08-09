// Brief, in-house explanations of the painting techniques/media in the catalog,
// shown when the "Technique" row on the artwork detail is tapped. Keyed by a
// canonical slug; techniqueKeyFor() maps the many material strings in the data
// (e.g. "óleo sobre tabla", "temple y pastel sobre cartón") onto one entry.
//
// Bilingual: English base + a Spanish record. techniqueInfo(key, locale) picks
// the Spanish version when available and falls back to English.

import type { Locale } from '@/i18n';

export type TechniqueInfo = { title: string; about: string };

export const TECHNIQUE_INFO: Record<string, TechniqueInfo> = {
  oleo: {
    title: 'Oil paint',
    about:
      "Pigments bound in a drying oil (usually linseed), painted onto a canvas or a wooden panel. Oil dries slowly, so it can be blended smoothly and built up in thin, translucent layers called glazes, giving deep, luminous colour. Perfected in 15th-century Flanders, it became the dominant medium of Western painting for centuries.",
  },
  temple: {
    title: 'Tempera',
    about:
      "Pigment bound with egg yolk and painted on a wooden panel prepared with white gesso. Tempera dries almost instantly to a crisp, matte finish, so artists built up form with fine, precise hatched strokes rather than blending. It was the main medium for panel painting before oil largely replaced it around 1500.",
  },
  fresco: {
    title: 'Wall painting',
    about:
      "Painting made directly onto a wall. In true fresco the colour is applied onto fresh wet plaster, so as it dries the pigment becomes part of the wall itself, making it very durable. Because the plaster sets fast, the artist must work quickly, section by section — the method behind many of the greatest murals in history.",
  },
  pastel: {
    title: 'Pastel',
    about:
      "Sticks of pure powdered pigment bound with just enough gum to hold their shape, drawn directly onto paper or board. The colour sits on the surface as loose, velvety dust, giving soft, glowing tones and a fresh immediacy. It sits between drawing and painting, and is prized for capturing light and skin.",
  },
  acuarela: {
    title: 'Watercolour',
    about:
      "Pigment bound in a water-soluble gum and thinned with water, painted on paper. Because the paint is transparent, the white of the paper shines through to create highlights, giving luminous, airy effects. Quick and portable, it is ideal for capturing fleeting light and atmosphere.",
  },
  grabado: {
    title: 'Woodblock print (ukiyo-e)',
    about:
      "A Japanese print made by carving a design into blocks of wood, inking them and pressing paper onto them — a separate block for each colour. It was a collaborative, commercial craft: the artist designed, a carver cut the blocks and a printer produced many identical, affordable impressions. This is why famous images like 'The Great Wave' exist in many copies.",
  },
  tintaoro: {
    title: 'Ink & gold on paper',
    about:
      "Classical Japanese painting in ink and mineral colours on paper, often over a ground of gold leaf, typically on folding screens or sliding doors. The flat gold catches the light in a dim interior and makes the painted motifs glow, while the ink allows both bold outlines and soft, pooled washes.",
  },
  tintaseda: {
    title: 'Ink & colour on silk',
    about:
      "East Asian painting in ink and delicate mineral pigments on fine silk, usually mounted as a hanging scroll. The smooth, absorbent silk takes subtle washes and precise detail, and suits the meticulous, jewel-like rendering of birds, flowers and figures.",
  },
};

export const TECHNIQUE_INFO_ES: Record<string, TechniqueInfo> = {
  oleo: {
    title: 'Óleo',
    about:
      "Pigmentos ligados con un aceite secante (normalmente de linaza), aplicados sobre lienzo o tabla de madera. El óleo seca despacio, por lo que puede fundirse con suavidad y construirse en capas finas y translúcidas llamadas veladuras, dando un color profundo y luminoso. Perfeccionado en la Flandes del siglo XV, fue el medio dominante de la pintura occidental durante siglos.",
  },
  temple: {
    title: 'Temple',
    about:
      "Pigmento ligado con yema de huevo y pintado sobre una tabla de madera preparada con yeso blanco. El temple seca casi al instante en un acabado nítido y mate, así que la forma se construía con trazos finos y precisos en vez de fundir los tonos. Fue el principal medio de la pintura sobre tabla antes de que el óleo lo reemplazara hacia 1500.",
  },
  fresco: {
    title: 'Pintura mural',
    about:
      "Pintura realizada directamente sobre un muro. En el fresco verdadero el color se aplica sobre el yeso fresco y húmedo, de modo que al secar el pigmento se integra en la propia pared, haciéndolo muy duradero. Como el yeso fragua rápido, el artista debe trabajar deprisa, sección por sección: el método detrás de muchos de los grandes murales de la historia.",
  },
  pastel: {
    title: 'Pastel',
    about:
      "Barras de pigmento puro en polvo ligado con apenas la goma justa para mantener su forma, aplicadas directamente sobre papel o cartón. El color queda en la superficie como un polvo aterciopelado, dando tonos suaves y luminosos y una frescura inmediata. Está a medio camino entre el dibujo y la pintura, y se aprecia por captar la luz y la piel.",
  },
  acuarela: {
    title: 'Acuarela',
    about:
      "Pigmento ligado con una goma soluble en agua y diluido con agua, pintado sobre papel. Como la pintura es transparente, el blanco del papel brilla a través de ella para crear las luces, dando efectos luminosos y aéreos. Rápida y portátil, es ideal para captar la luz y la atmósfera fugaces.",
  },
  grabado: {
    title: 'Grabado en madera (ukiyo-e)',
    about:
      "Estampa japonesa hecha tallando un diseño en bloques de madera, entintándolos y presionando el papel sobre ellos, con un bloque distinto para cada color. Era un oficio colaborativo y comercial: el artista diseñaba, un tallador cortaba los bloques y un impresor producía muchas estampas idénticas y asequibles. Por eso imágenes famosas como 'La gran ola' existen en muchas copias.",
  },
  tintaoro: {
    title: 'Tinta y oro sobre papel',
    about:
      "Pintura clásica japonesa en tinta y colores minerales sobre papel, a menudo sobre un fondo de pan de oro, normalmente en biombos plegables o puertas correderas. El oro liso atrapa la luz en un interior en penumbra y hace resplandecer los motivos pintados, mientras que la tinta permite tanto contornos firmes como suaves aguadas difuminadas.",
  },
  tintaseda: {
    title: 'Tinta y color sobre seda',
    about:
      "Pintura de Asia oriental en tinta y delicados pigmentos minerales sobre seda fina, montada normalmente como rollo colgante. La seda, lisa y absorbente, admite aguadas sutiles y detalle preciso, y se presta a la representación minuciosa y refinada de aves, flores y figuras.",
  },
};

export const TECHNIQUE_INFO_FR: Record<string, TechniqueInfo> = {
  oleo: {
    title: 'Peinture à l\'huile',
    about:
      "Des pigments liés à une huile siccative (généralement de lin), appliqués sur une toile ou un panneau de bois. L'huile sèche lentement, on peut donc la fondre en douceur et la superposer en fines couches translucides appelées glacis, donnant une couleur profonde et lumineuse. Perfectionnée dans la Flandre du XVe siècle, elle devint le médium dominant de la peinture occidentale pendant des siècles.",
  },
  temple: {
    title: 'Tempera',
    about:
      "Un pigment lié au jaune d'œuf et peint sur un panneau de bois préparé au gesso blanc. La tempera sèche presque instantanément en un fini net et mat ; les artistes construisaient donc la forme par de fines hachures précises plutôt qu'en fondant les tons. Ce fut le principal médium de la peinture sur panneau avant que l'huile ne la remplace largement vers 1500.",
  },
  fresco: {
    title: 'Peinture murale',
    about:
      "Une peinture réalisée directement sur un mur. Dans la vraie fresque, la couleur est appliquée sur l'enduit frais et humide, de sorte qu'en séchant le pigment s'intègre au mur lui-même, ce qui la rend très durable. Comme l'enduit prend vite, l'artiste doit travailler rapidement, section par section : la méthode derrière bon nombre des plus grandes fresques de l'histoire.",
  },
  pastel: {
    title: 'Pastel',
    about:
      "Des bâtonnets de pigment pur en poudre liés avec juste assez de gomme pour tenir leur forme, appliqués directement sur papier ou carton. La couleur repose à la surface comme une poussière veloutée, donnant des tons doux et lumineux et une fraîcheur immédiate. Il se situe entre le dessin et la peinture, et est prisé pour rendre la lumière et la peau.",
  },
  acuarela: {
    title: 'Aquarelle',
    about:
      "Un pigment lié à une gomme soluble dans l'eau et dilué à l'eau, peint sur papier. Comme la peinture est transparente, le blanc du papier transparaît pour créer les rehauts, donnant des effets lumineux et aériens. Rapide et transportable, elle est idéale pour saisir la lumière et l'atmosphère fugaces.",
  },
  grabado: {
    title: 'Estampe sur bois (ukiyo-e)',
    about:
      "Une estampe japonaise réalisée en gravant un motif dans des blocs de bois, en les encrant et en y pressant le papier — un bloc distinct pour chaque couleur. C'était un artisanat collaboratif et commercial : l'artiste concevait, un graveur taillait les blocs et un imprimeur produisait de nombreuses épreuves identiques et abordables. C'est pourquoi des images célèbres comme 'La Grande Vague' existent en de multiples exemplaires.",
  },
  tintaoro: {
    title: 'Encre et or sur papier',
    about:
      "Peinture japonaise classique à l'encre et aux couleurs minérales sur papier, souvent sur un fond de feuille d'or, généralement sur des paravents pliants ou des portes coulissantes. L'or lisse capte la lumière dans un intérieur sombre et fait rayonner les motifs peints, tandis que l'encre permet aussi bien des contours francs que de douces lavis fondus.",
  },
  tintaseda: {
    title: 'Encre et couleur sur soie',
    about:
      "Peinture d'Asie orientale à l'encre et aux délicats pigments minéraux sur soie fine, montée généralement en rouleau suspendu. La soie, lisse et absorbante, accueille des lavis subtils et un détail précis, et se prête au rendu minutieux et précieux des oiseaux, des fleurs et des figures.",
  },
};

export const TECHNIQUE_INFO_IT: Record<string, TechniqueInfo> = {
  oleo: {
    title: 'Pittura a olio',
    about:
      "Pigmenti legati con un olio essiccativo (di solito di lino), stesi su tela o tavola di legno. L'olio asciuga lentamente, così può essere sfumato con dolcezza e costruito in strati sottili e traslucidi detti velature, dando un colore profondo e luminoso. Perfezionata nelle Fiandre del Quattrocento, divenne il mezzo dominante della pittura occidentale per secoli.",
  },
  temple: {
    title: 'Tempera',
    about:
      "Pigmento legato con tuorlo d'uovo e dipinto su una tavola di legno preparata con gesso bianco. La tempera asciuga quasi all'istante in una finitura netta e opaca, perciò la forma si costruiva con tratteggi sottili e precisi anziché sfumando i toni. Fu il mezzo principale della pittura su tavola prima che l'olio la sostituisse in gran parte intorno al 1500.",
  },
  fresco: {
    title: 'Pittura murale',
    about:
      "Pittura eseguita direttamente su un muro. Nel vero affresco il colore si stende sull'intonaco fresco e umido, così che asciugandosi il pigmento diventa parte del muro stesso, rendendolo molto durevole. Poiché l'intonaco si fissa in fretta, l'artista deve lavorare rapidamente, sezione per sezione: il metodo dietro molti dei più grandi affreschi della storia.",
  },
  pastel: {
    title: 'Pastello',
    about:
      "Bastoncini di puro pigmento in polvere legato con appena la gomma sufficiente a mantenere la forma, applicati direttamente su carta o cartone. Il colore resta in superficie come una polvere vellutata, dando toni morbidi e luminosi e una freschezza immediata. Sta a metà tra il disegno e la pittura, ed è apprezzato per rendere la luce e la pelle.",
  },
  acuarela: {
    title: 'Acquerello',
    about:
      "Pigmento legato con una gomma solubile in acqua e diluito con acqua, dipinto su carta. Poiché il colore è trasparente, il bianco della carta traspare creando le luci, dando effetti luminosi e ariosi. Rapido e trasportabile, è ideale per cogliere la luce e l'atmosfera fugaci.",
  },
  grabado: {
    title: 'Xilografia (ukiyo-e)',
    about:
      "Una stampa giapponese realizzata incidendo un disegno in blocchi di legno, inchiostrandoli e premendovi sopra la carta — un blocco distinto per ogni colore. Era un mestiere collaborativo e commerciale: l'artista disegnava, un intagliatore incideva i blocchi e uno stampatore produceva molte impronte identiche e a buon mercato. Per questo immagini celebri come 'La grande onda' esistono in molte copie.",
  },
  tintaoro: {
    title: 'Inchiostro e oro su carta',
    about:
      "Pittura giapponese classica a inchiostro e colori minerali su carta, spesso su un fondo di foglia d'oro, di norma su paraventi pieghevoli o porte scorrevoli. L'oro liscio cattura la luce in un interno in penombra e fa risplendere i motivi dipinti, mentre l'inchiostro consente sia contorni decisi sia morbide velature sfumate.",
  },
  tintaseda: {
    title: 'Inchiostro e colore su seta',
    about:
      "Pittura dell'Asia orientale a inchiostro e delicati pigmenti minerali su seta fine, di solito montata come rotolo da appendere. La seta, liscia e assorbente, accoglie velature sottili e dettagli precisi, e si presta alla resa minuziosa e preziosa di uccelli, fiori e figure.",
  },
};

/** German technique explanations (filled batch by batch; falls back to English). */
export const TECHNIQUE_INFO_DE: Record<string, TechniqueInfo> = {
  oleo: {
    title: 'Ölmalerei',
    about:
      "In einem trocknenden Öl (meist Leinöl) gebundene Pigmente, aufgetragen auf Leinwand oder Holztafel. Öl trocknet langsam, lässt sich also weich verblenden und in dünnen, durchscheinenden Schichten – Lasuren – aufbauen, was tiefe, leuchtende Farbe ergibt. Im Flandern des 15. Jahrhunderts vervollkommnet, wurde es über Jahrhunderte zum vorherrschenden Medium der westlichen Malerei.",
  },
  temple: {
    title: 'Tempera',
    about:
      "Mit Eigelb gebundenes Pigment, gemalt auf eine mit weißem Gesso grundierte Holztafel. Tempera trocknet fast augenblicklich zu einer klaren, matten Oberfläche, weshalb die Künstler die Form mit feinen, präzisen Schraffuren aufbauten, statt zu verblenden. Es war das Hauptmedium der Tafelmalerei, bevor das Öl es um 1500 weitgehend verdrängte.",
  },
  fresco: {
    title: 'Wandmalerei',
    about:
      "Malerei direkt auf eine Wand. Beim echten Fresko wird die Farbe auf den frischen, nassen Putz aufgetragen, sodass das Pigment beim Trocknen Teil der Wand selbst wird und sehr haltbar ist. Weil der Putz schnell abbindet, muss der Künstler rasch arbeiten, Abschnitt für Abschnitt – die Methode hinter vielen der größten Wandbilder der Geschichte.",
  },
  pastel: {
    title: 'Pastell',
    about:
      "Stäbchen aus reinem, pulverisiertem Pigment, gerade so viel Bindemittel enthaltend, dass sie ihre Form behalten, unmittelbar auf Papier oder Karton aufgetragen. Die Farbe sitzt als loser, samtiger Staub auf der Oberfläche und ergibt weiche, leuchtende Töne und eine frische Unmittelbarkeit. Es steht zwischen Zeichnung und Malerei und wird für das Einfangen von Licht und Haut geschätzt.",
  },
  acuarela: {
    title: 'Aquarell',
    about:
      "In einem wasserlöslichen Gummi gebundenes und mit Wasser verdünntes Pigment, auf Papier gemalt. Da die Farbe transparent ist, scheint das Weiß des Papiers hindurch und erzeugt die Lichter, was leuchtende, luftige Effekte ergibt. Schnell und tragbar, ist es ideal, um flüchtiges Licht und Atmosphäre einzufangen.",
  },
  grabado: {
    title: 'Holzschnitt (Ukiyo-e)',
    about:
      "Ein japanischer Druck, hergestellt, indem ein Entwurf in Holzblöcke geschnitten, diese eingefärbt und Papier darauf gepresst wird – ein eigener Block für jede Farbe. Es war ein gemeinschaftliches, kommerzielles Handwerk: der Künstler entwarf, ein Schneider schnitt die Blöcke und ein Drucker erzeugte viele identische, erschwingliche Abzüge. Deshalb existieren berühmte Bilder wie «Die große Welle» in vielen Exemplaren.",
  },
  tintaoro: {
    title: 'Tusche & Gold auf Papier',
    about:
      "Klassische japanische Malerei in Tusche und Mineralfarben auf Papier, oft über einem Grund aus Blattgold, meist auf Faltschirmen oder Schiebetüren. Das flache Gold fängt in einem düsteren Innenraum das Licht ein und lässt die gemalten Motive leuchten, während die Tusche sowohl kräftige Umrisse als auch weiche, verlaufende Lavierungen erlaubt.",
  },
  tintaseda: {
    title: 'Tusche & Farbe auf Seide',
    about:
      "Ostasiatische Malerei in Tusche und zarten Mineralpigmenten auf feiner Seide, meist als Hängerolle montiert. Die glatte, saugfähige Seide nimmt feine Lavierungen und präzise Details auf und eignet sich für die minuziöse, kostbare Wiedergabe von Vögeln, Blumen und Figuren.",
  },
};

/** Portuguese technique explanations (filled batch by batch; falls back to English). */
export const TECHNIQUE_INFO_PT: Record<string, TechniqueInfo> = {
  oleo: {
    title: 'Óleo',
    about:
      "Pigmentos ligados a um óleo secante (geralmente de linhaça), aplicados sobre tela ou painel de madeira. O óleo seca devagar, por isso pode ser mesclado com suavidade e construído em camadas finas e translúcidas chamadas velaturas, dando cor profunda e luminosa. Aperfeiçoado na Flandres do século XV, tornou-se o meio dominante da pintura ocidental por séculos.",
  },
  temple: {
    title: 'Têmpera',
    about:
      "Pigmento ligado à gema de ovo e pintado sobre um painel de madeira preparado com gesso branco. A têmpera seca quase instantaneamente num acabamento nítido e fosco, por isso os artistas construíam a forma com traços finos e precisos em hachura em vez de mesclar. Foi o principal meio da pintura sobre painel antes de o óleo a substituir em grande parte por volta de 1500.",
  },
  fresco: {
    title: 'Pintura mural',
    about:
      "Pintura feita diretamente sobre uma parede. No afresco verdadeiro a cor é aplicada sobre o reboco fresco e úmido, de modo que, ao secar, o pigmento passa a fazer parte da própria parede, tornando-a muito durável. Como o reboco endurece depressa, o artista deve trabalhar rapidamente, seção por seção — o método por trás de muitos dos maiores murais da história.",
  },
  pastel: {
    title: 'Pastel',
    about:
      "Bastões de puro pigmento em pó ligados com apenas a goma suficiente para manter a forma, desenhados diretamente sobre papel ou cartão. A cor assenta na superfície como uma poeira solta e aveludada, dando tons suaves e luminosos e uma imediatez fresca. Situa-se entre o desenho e a pintura, e é apreciado por captar a luz e a pele.",
  },
  acuarela: {
    title: 'Aquarela',
    about:
      "Pigmento ligado a uma goma solúvel em água e diluído com água, pintado sobre papel. Como a tinta é transparente, o branco do papel transparece para criar os realces, dando efeitos luminosos e leves. Rápida e portátil, é ideal para captar a luz fugaz e a atmosfera.",
  },
  grabado: {
    title: 'Xilogravura (ukiyo-e)',
    about:
      "Uma estampa japonesa feita esculpindo um desenho em blocos de madeira, entintando-os e pressionando o papel sobre eles — um bloco separado para cada cor. Era um ofício colaborativo e comercial: o artista desenhava, um entalhador cortava os blocos e um impressor produzia muitas impressões idênticas e acessíveis. É por isso que imagens famosas como «A Grande Onda» existem em muitas cópias.",
  },
  tintaoro: {
    title: 'Tinta e ouro sobre papel',
    about:
      "Pintura japonesa clássica em tinta e cores minerais sobre papel, muitas vezes sobre um fundo de folha de ouro, tipicamente em biombos dobráveis ou portas de correr. O ouro plano capta a luz num interior escuro e faz resplandecer os motivos pintados, enquanto a tinta permite tanto contornos nítidos quanto suaves aguadas espraiadas.",
  },
  tintaseda: {
    title: 'Tinta e cor sobre seda',
    about:
      "Pintura do Leste Asiático em tinta e delicados pigmentos minerais sobre seda fina, geralmente montada como um rolo suspenso. A seda lisa e absorvente recebe aguadas sutis e detalhes precisos, e presta-se à representação minuciosa e preciosa de aves, flores e figuras.",
  },
};

/** The technique explanation for a locale, falling back to English. */
export function techniqueInfo(key?: string, locale: Locale = 'en'): TechniqueInfo | undefined {
  if (!key) return undefined;
  return (
    (locale === 'de' && TECHNIQUE_INFO_DE[key]) ||
    (locale === 'pt' && TECHNIQUE_INFO_PT[key]) ||
    (locale === 'it' && TECHNIQUE_INFO_IT[key]) ||
    (locale === 'fr' && TECHNIQUE_INFO_FR[key]) ||
    (locale === 'es' && TECHNIQUE_INFO_ES[key]) ||
    TECHNIQUE_INFO[key]
  );
}

/** Map any of the catalog's material strings onto a canonical technique slug. */
export function techniqueKeyFor(raw?: string): string | undefined {
  if (!raw) return undefined;
  const s = raw.toLowerCase();
  return (
    /ukiyo|grabado en madera|xilograf/.test(s) ? 'grabado' :
    /pan de oro|oro sobre papel/.test(s) ? 'tintaoro' :
    /sobre seda|color sobre seda/.test(s) ? 'tintaseda' :
    /acuarela/.test(s) ? 'acuarela' :
    /pastel/.test(s) ? 'pastel' :
    /yeso|muro|pared|fresco/.test(s) ? 'fresco' :
    /temple|tempera/.test(s) ? 'temple' :
    /[óo]leo/.test(s) ? 'oleo' :
    /tinta/.test(s) ? 'tintaoro' :
    undefined
  );
}

/** Map any material string onto its brief explanation. */
export function techniqueInfoFor(raw?: string): TechniqueInfo | undefined {
  const key = techniqueKeyFor(raw);
  return key ? TECHNIQUE_INFO[key] : undefined;
}
