// Curated fallback for per-artwork details (year / technique / museum / about),
// keyed by artwork id. Used to fill the gaps Wikidata never returned (many are
// famous works whose resolver failed due to rate-limiting, plus works Wikipedia
// simply lacks a description for). Hand-authored, so the fetch scripts never
// overwrite it. These curated values take precedence over the scraped detail
// for the specific fields listed here (a few scraped values were plain wrong,
// e.g. an impossible year — those are corrected here).

export type DetailInfo = {
  year?: string;
  technique?: string;
  museum?: string;
  about?: string;
  // Only set to CORRECT a movement Wikidata scraped wrong; wins over the scrape.
  movement?: string;
};

export const DETAIL_INFO: Record<string, DetailInfo> = {
  // ===== Collection I — Renaissance =====
  'col-1-la-ultima-cena': {
    technique: 'temple y óleo sobre yeso',
    museum: 'Santa Maria delle Grazie, Milán',
  },
  'col-1-la-virgen-de-las-rocas': {
    year: '1486',
    technique: 'óleo sobre tabla (trasladado a lienzo)',
    museum: 'Museo del Louvre',
  },
  'col-1-la-venus-de-urbino': {
    about: `Desnudo de Tiziano (1538) que muestra a una joven Venus recostada en un interior veneciano, con una perrita a sus pies y sirvientas al fondo. Cumbre del desnudo femenino renacentista, inspiró innumerables obras posteriores, entre ellas la Olympia de Manet.`,
  },
  'col-1-la-torre-de-babel': {
    museum: 'Museo de Historia del Arte de Viena',
  },
  'col-1-san-sebastian': {
    technique: 'temple sobre tabla',
    museum: 'Museo del Louvre',
  },
  'col-1-la-anunciacion': {
    museum: 'Museo del Prado',
    about: `Tabla de Fra Angelico (h. 1426) con la Anunciación a la Virgen bajo un pórtico renacentista, junto a la escena de la expulsión de Adán y Eva del Paraíso. Obra maestra del primer Renacimiento florentino conservada en el Museo del Prado.`,
  },
  'col-1-retrato-de-erasmo-de-roterdam': {
    year: '1523',
    about: `Retrato del humanista Erasmo de Róterdam por Hans Holbein el Joven, que lo muestra de perfil escribiendo, absorto en su trabajo. Símbolo de la vida intelectual del Renacimiento nórdico y de la nueva dignidad del erudito.`,
  },

  // ===== Collection II — Impressionism / Post-Impressionism =====
  'col-2-nenufares': { technique: 'óleo sobre lienzo' },
  'col-2-el-dormitorio-en-arles': { museum: 'Museo van Gogh, Ámsterdam' },
  'col-2-los-jugadores-de-cartas': { technique: 'óleo sobre lienzo' },
  'col-2-el-boulevard-montmartre-de-noche': {
    year: '1897',
    technique: 'óleo sobre lienzo',
    museum: 'National Gallery de Londres',
    about: `Vista nocturna del bulevar parisino por Camille Pissarro (1897), parte de una serie pintada desde la ventana de su hotel. Capta el brillo de las farolas y el bullicio urbano con pincelada impresionista y una atmósfera húmeda y luminosa.`,
  },
  'col-2-acantilados-en-etretat': { technique: 'óleo sobre lienzo' },
  'col-2-almuerzo-de-los-remeros': {
    about: `Escena luminosa de Renoir (1881) con un grupo de amigos almorzando en una terraza a orillas del Sena. Celebra el ocio moderno con color vibrante y retratos llenos de vida; se conserva en la Colección Phillips de Washington.`,
  },
  'col-2-la-montana-sainte-victoire': {
    technique: 'óleo sobre lienzo',
    about: `Uno de los muchos estudios de Cézanne del monte Sainte-Victoire, en Provenza, que pintó una y otra vez para analizar la estructura del paisaje mediante planos de color. Estas obras anticiparon el cubismo.`,
  },
  'col-2-el-golfo-de-marsella-visto-desde-lestaqu': {
    year: '1885',
    technique: 'óleo sobre lienzo',
    museum: 'Museo Metropolitano de Arte',
    about: `Vista del golfo de Marsella desde L'Estaque por Cézanne (h. 1885), donde reduce mar, casas y montañas a planos geométricos de color. Un paso decisivo hacia la pintura moderna.`,
  },
  'col-2-inundacion-en-port-marly': {
    about: `Sisley (1876) retrata la crecida del Sena en Port-Marly, con casas reflejadas en el agua quieta bajo un cielo cambiante. Uno de sus temas favoritos y ejemplo puro del paisajismo impresionista.`,
  },
  'col-2-sendero-en-hampton-court': {
    about: `Paisaje impresionista de Alfred Sisley junto al Támesis en Hampton Court, pintado durante su estancia en Inglaterra en 1874, con especial atención a la luz y la atmósfera del entorno fluvial.`,
  },

  // ===== Collection III — Baroque / Neoclassicism / Romanticism =====
  'col-3-la-leccion-de-anatomia-del-dr-tulp': { museum: 'Mauritshuis, La Haya' },
  'col-3-el-juicio-de-paris-p1': { technique: 'óleo sobre tabla' },
  'col-3-el-juicio-de-paris-p2': { technique: 'óleo sobre tabla' },
  'col-3-la-muerte-de-germanico': {
    about: `Poussin (1627) representa la muerte del general romano Germánico, envenenado, rodeado de su familia y de soldados que juran venganza. Obra fundacional del clasicismo barroco, hoy en el Instituto de Arte de Mineápolis.`,
  },
  'col-3-belisario-pide-limosna': {
    about: `David (1781) muestra al general bizantino Belisario, ciego y mendicante, reconocido con asombro por un antiguo soldado. Alegoría neoclásica sobre la ingratitud del poder, conservada en Lille.`,
  },
  'col-3-el-triunfo-de-neptuno': {
    year: '1634',
    technique: 'óleo sobre lienzo',
    museum: 'Museo de Arte de Filadelfia',
    about: `Poussin (h. 1634) despliega el cortejo triunfal de Neptuno y Anfitrite entre tritones y nereidas, con ritmo clásico y erudición mitológica. Ejemplo brillante de su periodo romano.`,
  },
  'col-3-jael-y-sisara': {
    about: `Artemisia Gentileschi (1620) narra el momento bíblico en que Jael clava una estaca en la sien del general Sísara dormido. Ejemplo de sus heroínas decididas y de su intenso claroscuro; hoy en Budapest.`,
  },

  // ===== Collection IV — Landscape & the Contemplated World =====
  'col-4-la-joven-de-la-perla': { museum: 'Mauritshuis, La Haya' },
  'col-4-vista-de-delft': { museum: 'Mauritshuis, La Haya' },
  'col-4-el-viaje-de-la-vida-infancia': { technique: 'óleo sobre lienzo' },
  'col-4-el-viaje-de-la-vida-juventud': { technique: 'óleo sobre lienzo' },
  'col-4-campo-de-trigo': {
    year: '1826',
    museum: 'National Gallery de Londres',
    movement: 'Romanticismo',
    about: `Paisaje rural de John Constable que retrata los campos de su Suffolk natal, con un sendero, un rebaño y cielos cambiantes. Observación directa y amorosa de la naturaleza inglesa.`,
  },
  'col-4-recuerdo-de-mortefontaine': {
    year: '1864',
    technique: 'óleo sobre lienzo',
    museum: 'Museo del Louvre',
    about: `Paisaje lírico de Camille Corot (1864) con árboles vaporosos junto a un estanque al amanecer. Cima de su estilo tardío «de ensueño», un puente entre el clasicismo y el impresionismo.`,
  },
  'col-4-el-curso-del-imperio-consumacion': { technique: 'óleo sobre lienzo' },
  'col-4-el-incendio-de-la-camara-de-los-lores': {
    year: '1835',
    technique: 'óleo sobre lienzo',
    museum: 'Museo de Arte de Filadelfia',
    about: `Turner (1835) capta el incendio real del Parlamento de Londres en 1834 como un estallido de fuego y luz reflejado en el Támesis. La arquitectura casi se disuelve en pura atmósfera.`,
  },
  'col-4-viento-del-sur-cielo-despejado': { technique: 'grabado en madera (ukiyo-e)' },
  'col-4-cascada-de-amida': {
    year: '1832',
    technique: 'grabado en madera (ukiyo-e)',
    museum: 'Museo de Arte de Indianápolis',
  },
  'col-4-fuji-desde-kajikazawa': { museum: 'Museo Metropolitano de Arte' },
  'col-4-lluvia-repentina-sobre-el-puente-shin-oh': {
    technique: 'grabado en madera (ukiyo-e)',
    museum: 'Museo de Brooklyn',
  },
  'col-4-nihonbashi-al-amanecer': {
    technique: 'grabado en madera (ukiyo-e)',
    museum: 'Museo de Brooklyn',
  },
  'col-4-paso-de-hakone': {
    technique: 'grabado en madera (ukiyo-e)',
    museum: 'Instituto de Arte de Minneápolis',
  },
  'col-4-las-espigadoras': {
    year: '1857',
    technique: 'óleo sobre lienzo',
    museum: 'Museo de Orsay, París',
    about: `Millet (1857) muestra a tres campesinas recogiendo las espigas sobrantes tras la cosecha. Monumentaliza el trabajo humilde y se convirtió en emblema del realismo social del siglo XIX.`,
  },
  'col-4-otono-dorado': {
    year: '1895',
    technique: 'óleo sobre lienzo',
    museum: 'Galería Tretiakov, Moscú',
    about: `Isaac Levitán (1895) capta un bosque de abedules dorados junto a un río azul en pleno otoño ruso. Obra cumbre del «paisaje del estado de ánimo» que definió su arte.`,
  },
  'col-4-snap-the-whip': {
    about: `Winslow Homer (1872) retrata a un grupo de niños jugando a la cadena a la salida de una escuela rural. Imagen nostálgica de la infancia y la vida campesina estadounidense tras la Guerra Civil.`,
  },
  'col-4-breezing-up': {
    about: `Winslow Homer (1873-76) muestra a un pescador y tres muchachos navegando en una pequeña barca con viento fresco. Celebración optimista del mar y la juventud, hoy en la Galería Nacional de Arte de Washington.`,
  },

  // ===== Collection V — Rupture & the Avant-Garde =====
  'col-5-el-grito': { technique: 'temple y pastel sobre cartón' },
  'col-5-composicion-viii': {
    year: '1923',
    technique: 'óleo sobre lienzo',
    museum: 'Museo Solomon R. Guggenheim, Nueva York',
    about: `Kandinsky (1923) organiza círculos, líneas y ángulos en una composición abstracta de precisión casi musical. Síntesis serena de su etapa en la Bauhaus, frente al lirismo de sus obras anteriores.`,
  },
  'col-5-improvisacion-28': {
    year: '1912',
    technique: 'óleo sobre lienzo',
    museum: 'Museo Solomon R. Guggenheim, Nueva York',
    about: `De la serie de «Improvisaciones» de Kandinsky (1912): formas y colores casi liberados de toda referencia figurativa que buscan expresar emociones interiores, en la frontera de la abstracción.`,
  },
  'col-5-la-ciudad-que-emerge': {
    about: `Boccioni (1910) representa el ímpetu de la ciudad moderna mediante caballos y obreros en violento movimiento. Manifiesto pictórico del futurismo italiano, hoy en el MoMA de Nueva York.`,
  },
  'col-5-amarillo-rojo-azul': {
    year: '1925',
    technique: 'óleo sobre lienzo',
    museum: 'Centro Pompidou, París',
    about: `Kandinsky (1925) contrapone masas geométricas y colores primarios en una composición equilibrada de su periodo Bauhaus. Ejemplo de su teoría sobre la relación entre color y forma.`,
  },
  'col-5-circulos-en-un-circulo': {
    year: '1923',
    technique: 'óleo sobre lienzo',
    museum: 'Museo de Arte de Filadelfia',
    about: `Kandinsky (1923) encierra una malla de círculos de colores, cruzada por dos líneas rectas, dentro de un gran círculo. Estudio lúdico y riguroso de la forma pura, típico de la Bauhaus.`,
  },
  'col-5-castillo-y-sol': {
    year: '1928',
    technique: 'óleo sobre lienzo',
    museum: 'Colección privada',
    about: `Paul Klee (1928) compone un paisaje de castillo con mosaicos de rectángulos de color cálido coronados por un sol rojo. Ejemplo de su lenguaje a medio camino entre lo geométrico y lo poético.`,
  },
  'col-5-senecio': {
    year: '1922',
    technique: 'óleo sobre gasa entelada',
    museum: 'Kunstmuseum Basilea',
  },
  'col-5-la-maquina-del-gorjeo-twittering-machine': {
    technique: 'acuarela, tinta y óleo sobre papel',
  },
  'col-5-tigre': {
    year: '1912',
    technique: 'óleo sobre lienzo',
    museum: 'Lenbachhaus, Múnich',
  },
  'col-5-madonna': { technique: 'óleo sobre lienzo' },
  'col-5-elasticidad': {
    year: '1912',
    technique: 'óleo sobre lienzo',
    museum: 'Museo del Novecento, Milán',
    about: `Boccioni (1912) fragmenta un caballo y su jinete al galope en planos dinámicos que funden figura y entorno. Ejemplo del empeño futurista por plasmar la energía y la velocidad.`,
  },
  'col-5-impresion-iii-concierto': {
    year: '1911',
    technique: 'óleo sobre lienzo',
    museum: 'Lenbachhaus, Múnich',
    about: `Kandinsky (1911) traduce la impresión de un concierto de Schönberg en manchas de color: la gran forma negra del piano y el amarillo del sonido inundan la sala. Un paso decisivo hacia la abstracción.`,
  },
  'col-5-el-abrazo': { museum: 'Galería Belvedere, Viena' },
  'col-5-ad-parnassum': {
    about: `Paul Klee (1932) construye con miles de puntos de color un paisaje-mosaico coronado por un sol, homenaje al monte Parnaso. Obra maestra de su técnica «divisionista», conservada en Berna.`,
  },
  'col-5-pez-magico': {
    about: `Paul Klee (1925) sitúa peces, flores y una figura sobre un fondo oscuro casi submarino, con un reloj que insinúa el paso del tiempo. Escena onírica típica de su imaginación poética.`,
  },

  // ===== Collection VI — Around the World =====
  'col-6-wind-god-and-thunder-god-screens-p1': {
    year: '1630',
    technique: 'tinta y pan de oro sobre papel',
  },
  'col-6-wind-god-and-thunder-god-screens-p2': {
    year: '1630',
    technique: 'tinta y pan de oro sobre papel',
  },
  'col-6-red-and-white-plum-blossoms-p1': {
    technique: 'tinta, color y pan de oro sobre papel',
    about: `Biombo de Ogata Kōrin (h. 1715) con dos ciruelos en flor —uno rojo y uno blanco— flanqueando un arroyo estilizado de plata. Obra maestra de la escuela Rinpa y Tesoro Nacional de Japón.`,
  },
  'col-6-red-and-white-plum-blossoms-p2': {
    technique: 'tinta, color y pan de oro sobre papel',
    about: `Biombo de Ogata Kōrin (h. 1715) con dos ciruelos en flor —uno rojo y uno blanco— flanqueando un arroyo estilizado de plata. Obra maestra de la escuela Rinpa y Tesoro Nacional de Japón.`,
  },
  'col-6-lirios-p1': {
    year: '1705',
    technique: 'tinta y pan de oro sobre papel',
  },
  'col-6-lirios-p2': {
    year: '1705',
    technique: 'tinta y pan de oro sobre papel',
  },
  'col-6-cipreses-p1': {
    year: '1590',
    technique: 'tinta y pan de oro sobre papel',
    museum: 'Museo Nacional de Tokio',
    about: `Biombo atribuido a Kanō Eitoku (h. 1590) con un ciprés monumental de ramas retorcidas sobre fondo dorado. Cumbre del estilo grandioso de la escuela Kanō del periodo Momoyama.`,
  },
  'col-6-cipreses-p2': {
    year: '1590',
    technique: 'tinta y pan de oro sobre papel',
    museum: 'Museo Nacional de Tokio',
    about: `Biombo atribuido a Kanō Eitoku (h. 1590) con un ciprés monumental de ramas retorcidas sobre fondo dorado. Cumbre del estilo grandioso de la escuela Kanō del periodo Momoyama.`,
  },
  'col-6-cipreses-p3': {
    year: '1590',
    technique: 'tinta y pan de oro sobre papel',
    museum: 'Museo Nacional de Tokio',
    about: `Biombo atribuido a Kanō Eitoku (h. 1590) con un ciprés monumental de ramas retorcidas sobre fondo dorado. Cumbre del estilo grandioso de la escuela Kanō del periodo Momoyama.`,
  },
  'col-6-takiyasha-the-witch-and-the-skeleton-spe-p1': {
    technique: 'grabado en madera (ukiyo-e)',
    museum: 'Museo Británico, Londres',
  },
  'col-6-takiyasha-the-witch-and-the-skeleton-spe-p2': {
    technique: 'grabado en madera (ukiyo-e)',
    museum: 'Museo Británico, Londres',
  },
  'col-6-takiyasha-the-witch-and-the-skeleton-spe-p3': {
    technique: 'grabado en madera (ukiyo-e)',
    museum: 'Museo Británico, Londres',
  },
  'col-6-tres-bellezas-de-nuestro-tiempo': {
    year: '1793',
    technique: 'grabado en madera (ukiyo-e)',
    museum: 'Museo de Arte del Condado de Los Ángeles',
    about: `Utamaro (h. 1793) reúne a tres célebres bellezas de Edo en un retrato de medio cuerpo, tan idealizadas que solo el emblema de su kimono las distingue. Ejemplo depurado del género bijin-ga.`,
  },
  'col-6-el-cactus': {
    year: '1887',
    technique: 'óleo sobre lienzo',
    museum: 'Museo Nacional de Arte, Ciudad de México',
    about: `Estudio de paisaje del mexicano José María Velasco centrado en un nopal del valle de México. Muestra de su rigor casi científico para observar la flora y la luz del altiplano.`,
  },
  'col-6-el-suplicio-de-cuauhtemoc': {
    about: `Leandro Izaguirre (1893) recrea el tormento de Cuauhtémoc, último tlatoani mexica, sometido al fuego por los conquistadores mientras permanece impasible. Gran lienzo de historia de tono nacionalista.`,
  },
  'col-6-bodegon-con-alacran-y-rana': {
    year: '1874',
    technique: 'óleo sobre lámina',
    museum: 'Museo Nacional de Arte, Ciudad de México',
    about: `Bodegón del pintor popular guanajuatense Hermenegildo Bustos, con frutas junto a un alacrán y una rana. Muestra de su mirada minuciosa, directa y sin academicismos al mundo cotidiano.`,
  },
  'col-6-la-criolla-del-mango': {
    about: `Saturnino Herrán (1916) retrata a una joven criolla que ofrece un mango, con modelado firme y color cálido. Celebración modernista de los tipos y la identidad mestiza de México.`,
  },
  'col-6-la-critica': {
    year: '1906',
    technique: 'óleo sobre lienzo',
    museum: 'Museo Nacional de Arte, Ciudad de México',
    about: `Julio Ruelas (1906) plasma su angustia simbolista en la figura de un hombre con un enorme insecto perforándole el cráneo. Imagen del artista atormentado por la crítica.`,
  },
  'col-6-retrato-de-dona-dolores-tosta': {
    about: `Juan Cordero (1855) retrata con lujo académico a Dolores Tosta, esposa del presidente Santa Anna, entre cortinajes, joyas y sedas. Ejemplo del retrato de aparato del México del siglo XIX.`,
  },
  'col-6-la-primera-misa-en-brasil': {
    year: '1861',
    technique: 'óleo sobre lienzo',
    museum: 'Museo Nacional de Bellas Artes, Río de Janeiro',
    about: `Victor Meirelles (1861) imagina la primera misa celebrada en Brasil en 1500, ante indígenas y colonos portugueses en un claro selvático. Icono fundacional de la pintura histórica brasileña.`,
  },
  'col-6-batalha-do-avai': {
    about: `Pedro Américo (1877) representa con enorme dramatismo una batalla de la Guerra del Paraguay, en un torbellino de caballos, humo y cuerpos. Lienzo monumental hoy en el Museo Nacional de Bellas Artes de Río.`,
  },
  'col-6-caipira-picando-fumo': {
    about: `Almeida Júnior (1893) retrata a un campesino paulista («caipira») cortando tabaco, de pie y con dignidad. Hito del realismo brasileño centrado en la vida rural del interior.`,
  },
  'col-6-o-violeiro': {
    about: `Almeida Júnior (1899) muestra a un músico rural tocando la viola en el interior de una casa humilde del campo paulista, mientras otros escuchan. Escena costumbrista de gran naturalidad.`,
  },
  'col-6-a-carioca': {
    about: `Pedro Américo (1882) presenta un desnudo idealizado de una joven junto al agua, alegoría de Río de Janeiro. Aplica la técnica académica europea a un tema plenamente brasileño.`,
  },
  'col-6-arrufos': {
    about: `Belmiro de Almeida (1887) capta una escena íntima de enfado y reconciliación entre una pareja en un salón burgués. Obra destacada del realismo brasileño de fin de siglo por su finura psicológica.`,
  },
  'col-6-combate-naval-do-riachuelo': {
    about: `Victor Meirelles (1882-83) recrea la decisiva batalla naval de Riachuelo durante la Guerra del Paraguay, entre humo, fuego y navíos en combate. Gran pintura de historia de la marina brasileña.`,
  },
  'col-6-la-vuelta-del-malon': {
    about: `Ángel Della Valle (1892) retrata a un malón indígena que regresa con botín y una cautiva tras asaltar un poblado de la frontera pampeana. Icono del arte académico argentino del siglo XIX.`,
  },
  'col-6-la-sopa-de-los-pobres': {
    about: `Reinaldo Giudici (1884) muestra a mujeres y niños pobres esperando en una fila de caridad, con luz sombría y gesto resignado. Denuncia social realista conservada en el Museo Nacional de Bellas Artes de Buenos Aires.`,
  },
  'col-6-el-despertar-de-la-criada': {
    about: `Eduardo Sívori (1887) presenta el desnudo sin idealizar de una sirvienta al levantarse de su camastro. Obra pionera del naturalismo argentino que escandalizó por su crudeza cotidiana.`,
  },
  'col-6-un-alto-en-la-pulperia': {
    about: `Prilidiano Pueyrredón (h. 1860) retrata una escena de gauchos que descansan y beben en una pulpería rural. Testimonio costumbrista de la vida en la campaña bonaerense del siglo XIX.`,
  },
  'col-6-retrato-de-manuelita-rosas': {
    about: `Prilidiano Pueyrredón (1851) retrata a Manuelita Rosas, hija del gobernador Juan Manuel de Rosas, con un vestido rojo punzó. Uno de los retratos femeninos más célebres del arte argentino.`,
  },
  'col-6-los-mantones-de-manila': {
    about: `Fernando Fader (1914) despliega su pincelada suelta y colorista en una escena de figuras femeninas con mantones bordados. Muestra de su impresionismo aplicado a temas argentinos.`,
  },
  'col-6-nocturno': {
    about: `Martín Malharro, introductor del impresionismo en Argentina, capta la atmósfera de un paisaje al anochecer con pincelada vibrante y una sensibilidad nueva hacia la luz y el color.`,
  },
  'col-6-la-fundacion-de-santiago': { year: '1888' },
  'col-6-combate-naval-de-iquique': {
    technique: 'óleo sobre lienzo',
    museum: 'Museo Naval y Marítimo, Valparaíso',
  },
  'col-6-carta-de-amor': {
    year: '1898',
    technique: 'óleo sobre lienzo',
    museum: 'Museo Nacional de Bellas Artes, Santiago',
  },
  'col-6-zamacueca': {
    year: '1873',
    technique: 'óleo sobre lienzo',
    museum: 'Museo Histórico Nacional, Santiago',
    about: `Manuel Antonio Caro retrata una fiesta popular chilena en torno a la zamacueca, el baile de pareja tradicional, con músicos y espectadores. Escena costumbrista emblemática de la identidad chilena.`,
  },
  'col-6-el-huaso-y-la-lavandera': {
    about: `Mauricio Rugendas retrata el cortejo entre un huaso a caballo y una lavandera junto al río. Escena costumbrista que idealiza los tipos y las costumbres populares del Chile del siglo XIX.`,
  },
  'col-6-calle-de-limache': {
    year: '1900',
    about: `Juan Francisco González capta con pincelada suelta y luminosa una calle del pueblo de Limache. Muestra de su renovación casi impresionista del paisaje y la vida provinciana chilena.`,
  },
  'col-6-las-playeras': {
    year: '1908',
    technique: 'óleo sobre lienzo',
    museum: 'Museo Nacional de Bellas Artes, Santiago',
    about: `Celia Castro, pionera entre las pintoras chilenas, retrata a mujeres junto al mar en clave académica, con atención al ambiente costero y a la figura femenina.`,
  },
  'col-6-la-sevillana': {
    year: '1889',
    technique: 'óleo sobre lienzo',
    museum: 'Museo Nacional de Bellas Artes, Santiago',
    about: `Alfredo Valenzuela Puelma retrata a una mujer de tipo español con virtuosismo académico en las telas y las carnaciones. Muestra de su gusto por los temas costumbristas de raíz europea.`,
  },
  'col-6-coqueteria': {
    about: `Alfredo Valenzuela Puelma (1890) plasma una escena galante de coquetería con refinamiento académico en el modelado y los materiales, dentro del gusto europeísta de la pintura chilena decimonónica.`,
  },
  'col-6-paisaje-de-invierno': {
    about: `Paisaje de tinta en la tradición de Sesshū Tōyō, gran maestro japonés del suiboku, que reduce montañas nevadas y árboles a unos pocos trazos esenciales de enorme fuerza contemplativa.`,
  },
  'col-6-gallo-y-gallina-con-hortensias': {
    year: '1760',
    technique: 'tinta y color sobre seda',
    museum: 'Colección de la Casa Imperial de Japón',
    about: `Itō Jakuchū, maestro del periodo Edo, retrata un gallo y una gallina entre hortensias con detalle minucioso y color vivo. Parte de su célebre serie sobre el reino animal y vegetal.`,
  },
};
