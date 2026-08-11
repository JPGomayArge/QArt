// Enriched biographies for every artist in the catalog, shown on the
// "Artist of the week" card in Discover (and anywhere else we teach). Keyed by
// the exact artist string used in the catalog; short-name variants alias the
// same text. Hand-written in-house — a solid paragraph each.

// Artists that appear under two name strings share one bio via a const.
const monet =
  "Claude Monet (1840–1926) was the founder and heart of French Impressionism — indeed the movement took its name from his painting 'Impression, Sunrise.' Obsessed with capturing the fleeting effects of light and atmosphere, he painted the same subjects (haystacks, cathedrals, his water-lily pond at Giverny) again and again at different hours and seasons. His late, near-abstract water lilies pushed painting to the edge of pure colour.";
const vanGogh =
  "Vincent van Gogh (1853–1890) was a Dutch Post-Impressionist whose intense colour and swirling, emotional brushwork made him one of the most influential and beloved artists in history. He painted feverishly for only about a decade, producing masterpieces like The Starry Night and the Sunflowers, yet sold almost nothing and struggled with mental illness, dying at 37. His letters and his art reveal a searching, passionate soul.";
const vermeer =
  "Johannes Vermeer (1632–1675) was a Dutch Golden Age master of quiet, luminous domestic scenes. Working slowly in Delft, he left only about 35 known paintings, prized for their serene stillness, jewel-like colour and subtle, almost magical rendering of daylight. Little known in his lifetime, he is now celebrated for works like Girl with a Pearl Earring and The Milkmaid.";
const friedrich =
  "Caspar David Friedrich (1774–1840) was the greatest German Romantic landscape painter. He turned nature — misty mountains, frozen seas, ruined abbeys — into meditations on the soul, faith, solitude and the sublime, often placing a small figure before an immense view. His haunting 'Wanderer above the Sea of Fog' has become the very emblem of Romanticism.";
const constable =
  "John Constable (1776–1837) was an English Romantic landscape painter devoted to the rural countryside of his native Suffolk. Working from close observation of skies, weather and light, he brought a fresh naturalism to landscape in works like The Hay Wain. Little celebrated at home in his lifetime, he caused a sensation in France and deeply influenced the Barbizon painters and the Impressionists.";
const turner =
  "J. M. W. Turner (1775–1851) was an English Romantic painter often called the greatest of all landscape and marine artists. He dissolved ships, storms, sunsets and even railways into radiant veils of light and atmosphere, growing so free and near-abstract that his late work looks astonishingly modern. His mastery of colour and the sublime made him a giant of British art.";
const hokusai =
  "Katsushika Hokusai (1760–1849) was the most celebrated of all Japanese ukiyo-e artists, a restless master who reportedly used over thirty names across a long career. His series 'Thirty-six Views of Mount Fuji' — above all 'The Great Wave off Kanagawa' — became the most famous images in Japanese art and, through Japonisme, deeply influenced Western modernism.";

export const ARTIST_BIOS: Record<string, string> = {
  // --- Renaissance ---
  'Leonardo da Vinci':
    "Leonardo da Vinci (1452–1519) was the archetypal 'Renaissance man' — painter, scientist, engineer, anatomist and inventor. Though he completed few paintings, they include the two most famous pictures in the world, the Mona Lisa and The Last Supper. His soft, smoky sfumato, his restless curiosity and his notebooks of inventions and studies redefined what an artist could be.",
  'Rafael':
    "Raphael (1483–1520) was, with Leonardo and Michelangelo, one of the three giants of the High Renaissance. Prodigiously gifted and admired for his grace and harmony, he painted serene Madonnas and, in the Vatican, the majestic fresco The School of Athens. He died at just 37 at the height of his fame, having set an ideal of balanced beauty that ruled European art for centuries.",
  'Miguel Ángel':
    "Michelangelo Buonarroti (1475–1564) was an Italian sculptor, painter and architect of superhuman ambition, a defining figure of the High Renaissance. He considered himself first a sculptor — the David and the Pietà are his — yet he also painted the vast Sistine Chapel ceiling and its Last Judgment. His powerful, muscular figures embody the era's heroic vision of humanity.",
  'Sandro Botticelli':
    "Sandro Botticelli (c. 1445–1510) was a Florentine painter of the Early Renaissance, working under Medici patronage. He is celebrated for lyrical, flowing mythologies like The Birth of Venus and Primavera, whose graceful line and dreamlike beauty are unmistakable. Late in life, under the preacher Savonarola's influence, he turned to a more austere religious art.",
  'Tiziano':
    "Titian (c. 1488–1576) was the towering master of the Venetian school and one of the most influential painters in history. Supreme colourist and portraitist, he served emperors, kings and popes across a long career, producing sensuous mythologies, powerful portraits and moving religious works. His free, expressive brushwork shaped European painting for generations.",
  'Giorgione':
    "Giorgione (c. 1477–1510) was a pioneering Venetian painter who died young, leaving only a handful of enigmatic works. He invented a new kind of poetic, atmospheric painting in which mood and landscape matter more than any clear story, as in the mysterious 'Tempest.' His innovations profoundly shaped the young Titian and Venetian art.",
  'Giovanni Bellini':
    "Giovanni Bellini (c. 1430–1516) was the founder of the Venetian Renaissance school and teacher of both Giorgione and Titian. Over a very long career he mastered the new medium of oil, bringing luminous colour, soft light and tender feeling to his many Madonnas and altarpieces, and laying the foundations for Venice's golden age of painting.",
  'Giovanni Bellini y Tiziano':
    "This work unites two generations of Venetian genius: the aged Giovanni Bellini, founder of the Venetian school, and his brilliant pupil Titian, who completed or reworked parts of the picture. It stands as a bridge between Bellini's serene late style and Titian's bolder, more sensuous art.",
  'Andrea Mantegna':
    "Andrea Mantegna (c. 1431–1506) was a northern Italian Renaissance painter famed for his passion for classical antiquity and his daring experiments with perspective. His figures have a hard, sculptural clarity, and works like the radically foreshortened 'Lamentation over the Dead Christ' still astonish. He spent much of his career at the Gonzaga court in Mantua.",
  'Piero della Francesca':
    "Piero della Francesca (c. 1415–1492) was an Early Renaissance master who was also a gifted mathematician. His paintings are celebrated for their serene stillness, luminous light, and perfect geometric order, as in 'The Flagellation of Christ.' Overlooked for centuries, he is now regarded as one of the greatest and most quietly profound painters of the age.",
  'Masaccio':
    "Masaccio (1401–1428) was a Florentine painter who, despite dying at only about 27, helped launch the Renaissance. He brought convincing weight, depth and scientific perspective to fresco, giving his figures real solidity and gravity. His Brancacci Chapel frescoes were studied by generations of artists, including the young Michelangelo.",
  'Fra Angelico':
    "Fra Angelico (c. 1395–1455) was a Dominican friar and painter whose luminous, devout works fuse the gold-ground sweetness of the late Gothic with the new Renaissance sense of space. Renowned for the purity and gentleness of his art — as in his many Annunciations — he was beatified by the Catholic Church centuries later.",
  'Alberto Durero':
    "Albrecht Dürer (1471–1528) was the greatest artist of the German Renaissance, a master of both painting and printmaking. He traveled to Italy to absorb its theories of proportion and perspective and fused them with a northern love of detail. His engravings and woodcuts spread his fame across Europe, and his self-portraits asserted a bold new status for the artist.",
  'Hans Holbein el Joven':
    "Hans Holbein the Younger (c. 1497–1543) was a German-born master of the Northern Renaissance, famed for portraits of piercing precision and psychological truth. As painter at the court of Henry VIII of England, he recorded the Tudor world in unforgettable images, including the enigmatic double portrait 'The Ambassadors' with its hidden skull.",
  'El Bosco':
    "Hieronymus Bosch (c. 1450–1516) was an Early Netherlandish painter of astonishing and unsettling imagination. His fantastical religious pictures — above all 'The Garden of Earthly Delights' — teem with bizarre creatures, hybrid monsters and vivid visions of sin and hell. Deeply moralizing yet endlessly inventive, he was later hailed as a forerunner of Surrealism.",
  'Jan van Eyck':
    "Jan van Eyck (c. 1390–1441) was an Early Netherlandish master and one of the pioneers of oil painting. Working in Flanders, he built luminous, jewel-like surfaces of almost hallucinatory detail, as in the Arnolfini Portrait. He often signed and dated his work, an assertion of the artist's new importance.",
  'Rogier van der Weyden':
    "Rogier van der Weyden (c. 1399–1464) was, with Van Eyck, a leading Early Netherlandish painter. He was celebrated for the intense emotion and expressive grief of his religious scenes, such as the 'Descent from the Cross,' whose compressed, life-size figures moved viewers across Europe. His influence spread widely through copies and followers.",
  'Pieter Bruegel el Viejo':
    "Pieter Bruegel the Elder (c. 1525–1569) was the greatest Netherlandish painter of his generation, famed for teeming panoramic scenes of peasant life, proverbs and the changing seasons. Works like 'The Hunters in the Snow' and 'The Tower of Babel' combine sweeping landscapes with sharp, humane observation of ordinary humanity.",

  // --- Impressionism & Post-Impressionism ---
  'Claude Monet': monet,
  'Monet': monet,
  'Pierre-Auguste Renoir':
    "Pierre-Auguste Renoir (1841–1919) was a leading French Impressionist, celebrated for his warm, sensuous scenes of Parisian leisure and his radiant nudes and portraits. Works like 'Bal du moulin de la Galette' and 'Luncheon of the Boating Party' glow with dappled light and joyful sociability. In later life he moved toward a fuller, more classical style.",
  'Camille Pissarro':
    "Camille Pissarro (1830–1903) was the eldest of the Impressionists and a mentor to Cézanne and Gauguin. A committed painter of rural life and, later, of the modern city, he was the only artist to exhibit in all eight Impressionist shows. His steady dedication and generous spirit made him a father figure to the movement.",
  'Alfred Sisley':
    "Alfred Sisley (1839–1899) was an Impressionist of English descent who worked in France and devoted himself almost entirely to landscape. The most consistent of the group in his focus on skies, rivers and weather, he painted subtle, serene scenes like the floods at Port-Marly. He sold little and lived in poverty, gaining full recognition only after his death.",
  'Berthe Morisot':
    "Berthe Morisot (1841–1895) was a founding member of the Impressionists and one of its most inventive painters. Working within the domestic world open to women of her class, she made intimate scenes of women and children feel modern and alive, prized for their exceptionally free, sketchy brushwork. She was central to the group, married to Manet's brother Eugène.",
  'Edgar Degas':
    "Edgar Degas (1834–1917) was a French artist linked to Impressionism but distinct in his love of drawing, indoor scenes and unusual, off-center compositions influenced by photography and Japanese prints. He is best known for his ballet dancers, whom he showed backstage and in rehearsal, and for his unsentimental scenes of working women.",
  'Gustave Caillebotte':
    "Gustave Caillebotte (1848–1894) was a French painter of independent means who both exhibited with the Impressionists and generously supported them by buying their work. His own art, with its crisp realism, bold perspective and modern subjects like 'Paris Street; Rainy Day,' stands a little apart. His donated collection helped bring Impressionism into French museums.",
  'Mary Cassatt':
    "Mary Cassatt (1844–1926) was an American painter who settled in Paris and joined the Impressionists at Degas's invitation. She is celebrated above all for her tender, unsentimental images of mothers and children and of women in modern life. Deeply influenced by Japanese prints, she also helped introduce Impressionism to American collectors.",
  'Vincent van Gogh': vanGogh,
  'Van Gogh': vanGogh,
  'Paul Cézanne':
    "Paul Cézanne (1839–1906) was a French Post-Impressionist often called the 'father of modern art.' Working in near-isolation in Provence, he rebuilt nature from patches of colour and interlocking planes, subtly shifting viewpoints in his still lifes, portraits and views of Mont Sainte-Victoire. His structural approach directly inspired Cubism and much of what followed.",
  'Paul Gauguin':
    "Paul Gauguin (1848–1903) was a French Post-Impressionist who abandoned a business career — and later Europe itself — in search of a simpler, more 'primitive' life and art, settling in Brittany and then Tahiti. He rejected naturalism for flat areas of bold, symbolic colour, as in his Tahitian scenes. His work was central to Symbolism and modern art.",
  'Georges Seurat':
    "Georges Seurat (1859–1891) was a French Post-Impressionist and the founder of Neo-Impressionism. He developed Pointillism, building images from countless tiny dots of pure colour based on scientific theories of optics, most famously in 'A Sunday on La Grande Jatte.' He died at only 31, but his rigorous, luminous method deeply influenced modern art.",

  // --- Baroque, Neoclassicism, Romanticism ---
  'Eugène Delacroix':
    "Eugène Delacroix (1798–1863) was the leading painter of French Romanticism. He set passionate colour, movement and exotic or heroic subjects against the cool restraint of Neoclassicism, as in 'Liberty Leading the People.' A brilliant colourist inspired by a trip to North Africa, he became a hero to later artists from the Impressionists to Matisse.",
  'Diego Velázquez':
    "Diego Velázquez (1599–1660) was the supreme painter of the Spanish Golden Age and court artist to Philip IV. His unrivaled honesty, subtlety and dazzling, economical brushwork are seen at their height in 'Las Meninas' and the merciless portrait of Pope Innocent X. Often ranked among the greatest painters ever, he inspired Goya, Manet and Picasso.",
  'Rembrandt':
    "Rembrandt van Rijn (1606–1669) was the greatest painter of the Dutch Golden Age, a master of light, shadow and human emotion. He brought unmatched psychological depth to portraits, biblical scenes and dozens of searching self-portraits. Famous and prosperous early on, he later suffered bankruptcy and loss, which only deepened the compassion of his art.",
  'Francisco de Goya':
    "Francisco de Goya (1746–1828) was a Spanish painter and printmaker who bridged the old masters and modern art. Court painter turned unflinching witness, he moved from elegant portraits to the horrors of war in 'The Third of May 1808' and the nightmarish, private 'Black Paintings' of his deaf, disillusioned old age. His fearless honesty shaped modern art.",
  'Théodore Géricault':
    "Théodore Géricault (1791–1824) was a French pioneer of Romanticism who, despite dying at only 32, left a lasting mark. His vast 'Raft of the Medusa' turned a real, scandalous shipwreck into monumental tragedy and an implicit political protest, thrilling and shocking Paris. His dramatic energy and studies of the marginalized opened new paths for art.",
  'Jacques-Louis David':
    "Jacques-Louis David (1748–1825) was the leading painter of Neoclassicism and the defining artist of the French Revolution and Napoleon's empire. His severe, sculptural, morally charged canvases — 'The Oath of the Horatii,' 'The Death of Marat,' 'The Coronation of Napoleon' — were both masterpieces and powerful propaganda. He shaped European academic art for decades.",
  'Caravaggio':
    "Caravaggio (1571–1610) revolutionized European painting with his dramatic, theatrical light and shocking realism. Rejecting idealization, he painted saints and gods as ordinary, worn people caught in beams of light, as in 'The Calling of Saint Matthew.' His violent, brilliant life and sudden death matched his art, and his influence swept across the Baroque.",
  'Artemisia Gentileschi':
    "Artemisia Gentileschi (1593–c. 1656) was the most celebrated woman painter of the Baroque, a rare professional success in a man's world. A follower of Caravaggio, she painted powerful, often violent biblical heroines — above all her ferocious 'Judith Slaying Holofernes.' Her life, including a rape and the public trial that followed, has become inseparable from her fearless art.",
  'El Greco':
    "El Greco (1541–1614), born on Crete, trained in Venice and settled in Toledo, Spain, where he forged one of the most personal styles in art. His elongated, flame-like figures, cool acidic colour and spiritual intensity — as in 'The Burial of the Count of Orgaz' — were unique in his time and thrilled later modern artists.",
  'Peter Paul Rubens':
    "Peter Paul Rubens (1577–1640) was the dominant painter of the Flemish Baroque and one of the most successful artists in history. Learned, diplomatic and immensely productive, he ran a vast workshop and produced dynamic, sensuous works full of movement, colour and full-bodied figures, from religious altarpieces to mythologies and hunts.",
  'Nicolas Poussin':
    "Nicolas Poussin (1594–1665) was the greatest French painter of the 17th century, though he spent most of his life in Rome. The master of a cool, cerebral classicism, he composed grave, balanced scenes from myth, history and scripture, as in 'Et in Arcadia ego.' He became the model of intellectual, orderly painting for the French academy.",
  'José de Ribera':
    "José de Ribera (1591–1652) was a Spanish painter who spent his career in Naples, then under Spanish rule. A powerful follower of Caravaggio, he combined harsh, dramatic light with an unflinching realism of aging flesh and physical suffering, especially in his intense scenes of martyrdom.",
  'Georges de La Tour':
    "Georges de La Tour (1593–1652) was a French Baroque painter celebrated for his serene, candlelit night scenes. Reducing his religious and everyday subjects to simple, sculptural forms glowing from a single hidden flame, he achieved a profound stillness and calm. Forgotten for centuries, he was rediscovered only in the 20th century.",
  'Francisco de Zurbarán':
    "Francisco de Zurbarán (1598–1664) was a Spanish Baroque painter known for the austere, powerful realism of his religious works, made largely for monasteries. His still, solemn saints and his tender studies of a bound lamb ('Agnus Dei') have a quiet, contemplative intensity that has made him a favourite of modern eyes.",
  'Johannes Vermeer': vermeer,
  'Vermeer': vermeer,

  // --- The Contemplated World (landscape & genre) ---
  'Caspar David Friedrich': friedrich,
  'Friedrich': friedrich,
  'Grant Wood':
    "Grant Wood (1891–1942) was an American Regionalist painter from Iowa who celebrated the rural Midwest. His crisp, stylized 'American Gothic' — a stern farmer and woman before a farmhouse — became one of the most famous and parodied images in American culture, an emblem of heartland steadfastness (and gentle satire).",
  'Iván Aivazovski':
    "Ivan Aivazovsky (1817–1900) was a Russian-Armenian Romantic painter and the most famous marine artist of his age. Astonishingly prolific, he painted thousands of dramatic, luminous seascapes; his best-known, 'The Ninth Wave,' pits shipwrecked survivors against a towering wave and a glowing dawn. His mastery of light and water made him a legend.",
  'John Constable': constable,
  'Constable': constable,
  'Edward Hopper':
    "Edward Hopper (1882–1967) was an American Realist who became the great poet of modern loneliness. His still, sunlit scenes of diners, gas stations, hotel rooms and empty streets — above all 'Nighthawks' — capture the quiet isolation of 20th-century life. His spare compositions and dramatic light give the ordinary an enduring, haunting mood.",
  'Camille Corot':
    "Camille Corot (1796–1875) was a French landscape painter who bridged Neoclassicism and Impressionism. Beloved and influential, he painted both crisp, sunlit views of Italy and soft, silvery, dreamlike 'souvenirs' from memory. His fresh outdoor studies helped point the way toward the Impressionists, several of whom he mentored.",
  'Thomas Cole':
    "Thomas Cole (1801–1848) was an English-born American painter who founded the Hudson River School, the first major American landscape movement. He depicted the New World wilderness as sublime and God-given, and in ambitious allegorical series like 'The Course of Empire' and 'The Voyage of Life' turned landscape into moral drama.",
  'J. M. W. Turner': turner,
  'Turner': turner,
  'Hokusai': hokusai,
  'Katsushika Hokusai': hokusai,
  'Utagawa Hiroshige':
    "Utagawa Hiroshige (1797–1858) was, with Hokusai, one of the last great masters of Japanese ukiyo-e. He specialized in poetic landscape prints, above all his series of the highway stations of the Tōkaidō and 'One Hundred Famous Views of Edo.' His atmospheric scenes of rain, snow and travel were widely copied in the West — Van Gogh painted oil versions of them.",
  'Jean-François Millet':
    "Jean-François Millet (1814–1875) was a French Realist and a founder of the Barbizon school who devoted his art to peasants and rural labour. Works like 'The Gleaners' and 'The Angelus' gave the rural poor a monumental dignity that unsettled bourgeois viewers. His images of humble toil deeply influenced Van Gogh.",
  'Isaac Levitán':
    "Isaac Levitan (1860–1900) was Russia's greatest 'mood landscape' painter. A friend of the writer Chekhov, he captured the emotional atmosphere of the Russian countryside — its seasons, rivers and quiet melancholy — in works like the radiant 'Golden Autumn.' He raised landscape to a deeply lyrical, national art before his early death.",
  'Winslow Homer':
    "Winslow Homer (1836–1910) was one of the foremost American painters of the 19th century. Beginning as a Civil War illustrator, he became a masterful realist of American life and, above all, of the sea — its fishermen, sailors and elemental power. His vigorous, unsentimental scenes helped forge a confident, independent American art.",
  'Joaquín Sorolla':
    "Joaquín Sorolla (1863–1923) was a Spanish painter and the great master of sunlight, a style he called 'luminism.' With brilliant, rapid brushwork he captured the dazzle of the Mediterranean — figures on beaches, white dresses and children in the surf — in works of joyful, shimmering light. He was hugely celebrated in his day across Europe and America.",

  // --- Rupture and the Avant-Garde ---
  'Edvard Munch':
    "Edvard Munch (1863–1944) was a Norwegian Symbolist and forerunner of Expressionism who mined his own anguish for art. His 'Frieze of Life' explored love, jealousy, illness, anxiety and death; its centerpiece, 'The Scream,' became the universal image of modern dread. His raw emotion and bold colour opened the way for German Expressionism.",
  'Wassily Kandinsky':
    "Wassily Kandinsky (1866–1944) was a Russian-born painter and theorist widely credited as a pioneer of pure abstraction. Believing colour and form could stir the soul directly, like music, he moved from turbulent early 'Compositions' to a crisp geometric language during his years teaching at the Bauhaus. His writings shaped abstract art worldwide.",
  'Gustav Klimt':
    "Gustav Klimt (1862–1918) was the leading painter of the Vienna Secession and the era's most glamorous artist. His shimmering 'Golden Period' works, like 'The Kiss' and the portrait of Adele Bloch-Bauer, fuse sensuous figures with lavish gold leaf and mosaic-like ornament. Erotic, decorative and daring, his art defined turn-of-the-century Vienna.",
  'Piet Mondrian':
    "Piet Mondrian (1872–1944) was a Dutch painter who journeyed from naturalistic landscapes to the strictest abstraction. Co-founder of De Stijl, he reduced painting to black lines, right angles and the primary colours, seeking a universal harmony. His late New York work, like 'Broadway Boogie Woogie,' set that grid dancing, and his style transformed modern design.",
  'Henri Matisse':
    "Henri Matisse (1869–1954) was, with Picasso, one of the two giants of 20th-century art. Leader of the Fauves, he unleashed pure, joyful colour freed from any duty to describe reality, in works like 'Dance' and 'The Red Room.' Across a long career — ending in his brilliant cut-paper collages — he pursued balance, serenity and the sheer delight of colour.",
  'Umberto Boccioni':
    "Umberto Boccioni (1882–1916) was the leading painter and sculptor of Italian Futurism. He sought to capture the dynamism, speed and energy of the modern machine age, fracturing figures and objects into 'lines of force' to make movement visible. His theoretical writings shaped the movement; he died young in the First World War.",
  'Ernst Ludwig Kirchner':
    "Ernst Ludwig Kirchner (1880–1938) was a leader of Die Brücke, the first group of German Expressionists. His jagged, acid-coloured scenes of Berlin street life and its anxious, mask-like figures capture the nervous energy of the modern city on the eve of war. Persecuted by the Nazis as 'degenerate,' he took his own life in 1938.",
  'Paul Klee':
    "Paul Klee (1879–1940) was a Swiss-German painter of boundless invention who taught alongside Kandinsky at the Bauhaus. Blending abstraction, colour theory, music and a playful, poetic imagination, he built pictures from mosaics of colour and whimsical signs, as in 'Twittering Machine' and 'Ad Parnassum.' Few artists have been so inventive or so gently profound.",
  'Franz Marc':
    "Franz Marc (1880–1916) was a German Expressionist and co-founder of Der Blaue Reiter (The Blue Rider). He painted animals — especially his glowing blue horses — as symbols of a spiritual purity he felt humans had lost, assigning colours symbolic meaning. His crystalline, colourful style was cut short when he was killed in the First World War at 36.",
  'Kazimir Malévich':
    "Kazimir Malevich (1879–1935) was a Russian avant-garde artist and the founder of Suprematism, one of the first movements of pure abstraction. His radical 'Black Square' (1915), a black shape on white, was meant as a 'zero of form,' a new beginning for art. His geometric abstraction had a profound impact on modern art and design.",
  'Henri Rousseau':
    "Henri Rousseau (1844–1910) was a French self-taught 'naïve' painter who worked as a customs officer (earning the nickname 'Le Douanier'). Never having left France, he conjured lush, dreamlike jungles from botanical gardens and imagination, as in 'The Dream.' Mocked in his day, his flat, poetic strangeness enchanted the avant-garde and the Surrealists.",
  'Egon Schiele':
    "Egon Schiele (1890–1918) was an Austrian Expressionist and protégé of Klimt, known for his raw, unsettling and intensely erotic figures. His gaunt, twisting bodies and jagged line probe desire, anxiety and mortality with startling honesty. He died at just 28 in the 1918 flu pandemic, days after his pregnant wife.",
  'August Macke':
    "August Macke (1887-1914) was a German Expressionist and a leading member of Der Blaue Reiter alongside Franz Marc and Paul Klee. He painted ordinary modern leisure - strollers in parks, women at shop windows - in luminous planes of pure colour learned from Delaunay. He was killed in the opening weeks of the First World War, aged 27.",

  // --- Japan ---
  'Tawaraya Sōtatsu':
    "Tawaraya Sōtatsu (c. 1570–c. 1640) was a Japanese painter who, with the calligrapher Kōetsu, founded the great decorative Rinpa tradition. His bold, elegant designs — above all the 'Wind God and Thunder God' screens on shimmering gold — set the pattern for Rinpa art and were revered and copied by later masters like Kōrin.",
  'Ogata Kōrin':
    "Ogata Kōrin (1658–1716) was a Japanese painter and designer, the greatest master of the Rinpa school. Building on Sōtatsu, he created dazzling, boldly simplified images of nature on gold-ground screens, such as his 'Red and White Plum Blossoms' and 'Irises.' His refined, patterned elegance became a defining strand of Japanese art and design.",
  'Hasegawa Tōhaku':
    "Hasegawa Tōhaku (1539–1610) was one of the greatest painters of Japan's Momoyama period and founder of the Hasegawa school. He is revered above all for his 'Pine Trees' screens, which evoke a misty forest using only black ink and vast empty space — a supreme expression of Zen-inflected restraint and suggestion.",
  'Kanō Eitoku':
    "Kanō Eitoku (1543–1590) was the leading painter of Japan's Momoyama era and head of the powerful Kanō school. He decorated the castles of the great warlords with grand, gold-ground screens of bold scale and vigorous line, such as his monumental 'Cypress Trees,' embodying the confident, opulent taste of Japan's age of unification.",
  'Utagawa Kuniyoshi':
    "Utagawa Kuniyoshi (1797–1861) was a Japanese ukiyo-e master famous for dynamic, imaginative prints of warriors, legends and the supernatural. His inventive designs — like the giant skeleton spectre menacing a samurai — blend dramatic energy with occasional glimpses of Western technique, and remain among the most striking images in the genre.",
  'Kitagawa Utamaro':
    "Kitagawa Utamaro (c. 1753–1806) was the supreme Japanese master of 'bijin-ga,' pictures of beautiful women. His elegant, idealized portraits of courtesans and famous beauties of Edo, often on shimmering mica grounds, elevated the woodblock print to refined high art and made him one of ukiyo-e's most admired names.",
  'Sesshū Tōyō':
    "Sesshū Tōyō (1420–1506) was a Zen monk and the greatest master of Japanese ink landscape painting. After studying in China, he forged a bold, powerful personal style, ranging from atmospheric mists to the sharp, near-abstract angularity of his 'Winter Landscape.' He is one of the most revered figures in all of Japanese art.",
  'Itō Jakuchū':
    "Itō Jakuchū (1716–1800) was an eccentric, independent Kyoto painter famed for his dazzlingly detailed and colourful studies of the natural world — especially roosters and other birds. Combining meticulous observation with an almost mystical devotion to living things, his jewel-like, obsessive works are now among the most beloved in Japanese art.",

  // --- Mexico ---
  'José María Velasco':
    "José María Velasco (1840–1912) was Mexico's greatest 19th-century landscape painter and also a trained naturalist. His luminous, scientifically precise panoramas of the Valley of Mexico turned the country's light, space and flora into an emblem of national identity. He was a teacher of the young Diego Rivera.",
  'Leandro Izaguirre':
    "Leandro Izaguirre (1867–1941) was a Mexican academic painter best known for his monumental history painting 'The Torture of Cuauhtémoc' (1892–93). Part of a wave of nationalist art that celebrated Mexico's indigenous past, it cast the last Aztec emperor as a stoic hero and martyr.",
  'Saturnino Herrán':
    "Saturnino Herrán (1887–1918) was a pioneer of a modern, distinctly Mexican art before the muralist movement. He dignified the country's indigenous and mestizo people and their traditions — as in 'The Offering,' a Day of the Dead scene — with monumental tenderness. He died young but shaped the search for a national identity in art.",
  'Hermenegildo Bustos':
    "Hermenegildo Bustos (1832–1907) was a self-taught painter and farmer from provincial Guanajuato, Mexico. Working outside academic circles, he produced piercingly honest portraits of his townspeople and vivid still lifes, sometimes with a scorpion or frog among the fruit. His plain, exacting realism is now much admired.",
  'Félix Parra':
    "Félix Parra (1845–1919) was a Mexican academic painter who used the colonial past to shape a national conscience. His painting of the friar Bartolomé de las Casas defending a dying indigenous man honours the 16th-century champion of native peoples against Spanish cruelty.",
  'José Agustín Arrieta':
    "José Agustín Arrieta (1803–1874) was a Mexican painter from Puebla, celebrated for his 'costumbrista' scenes and still lifes of everyday life. His warm, detailed images of markets, food, kitchens and popular 'types' are a vivid record of 19th-century Mexican daily culture.",
  'Julio Ruelas':
    "Julio Ruelas (1870–1907) was the leading Mexican Symbolist, whose morbid, fantastical imagery filled the influential magazine Revista Moderna around 1900. His dark, dreamlike works — like 'The Critic,' a grotesque parasite clamped to a man's head — reflect a haunted, decadent imagination.",
  'Juan Cordero':
    "Juan Cordero (1822–1884) was a leading Mexican academic painter trained in Rome. He produced grand religious and history works and sumptuous society portraits, such as that of Doña Dolores Tosta, wife of the politician Santa Anna, bringing European polish to the aspirations of Mexico's 19th-century elite.",

  // --- Brazil ---
  'Victor Meirelles':
    "Victor Meirelles (1832–1903) was one of Brazil's foremost 19th-century academic painters. His grand history paintings — above all 'The First Mass in Brazil' and the Romantic 'Moema' — helped forge images of national origin and identity for the young empire.",
  'Pedro Américo':
    "Pedro Américo (1843–1905) was a leading Brazilian academic painter, a prodigy who studied in Europe. He specialized in vast, theatrical history and battle paintings, including the iconic 'Independence or Death,' the definitive image of Brazil's founding moment, and the huge 'Battle of Avaí.'",
  'Almeida Júnior':
    "Almeida Júnior (1850–1899) was a pioneering Brazilian painter who broke from grand history painting to portray the ordinary rural people of the São Paulo interior. His scenes of the 'caipira' (backwoodsman) — shredding tobacco, playing the guitar — gave everyday country life a natural dignity, founding a genuinely Brazilian genre painting.",
  'Rodolfo Amoedo':
    "Rodolfo Amoedo (1857–1941) was a Brazilian academic painter and influential teacher. Working in the Indianist current that mythologized Brazil's indigenous past, he painted idealized figures such as 'Marabá,' a melancholy woman of mixed blood drawn from Romantic poetry.",
  'Belmiro de Almeida':
    "Belmiro de Almeida (1858–1935) was a versatile Brazilian painter who helped turn art toward modern life. His witty, closely observed scene of an upper-class couple's lovers' quarrel, 'Sulking' (Arrufos), marked a move away from grand historical subjects toward everyday manners and psychology.",

  // --- Argentina ---
  'Ernesto de la Cárcova':
    "Ernesto de la Cárcova (1866–1927) was an Argentine painter and educator whose 'Without Bread and Without Work' (1894) is considered the first great work of social protest in Argentine art. Its unflinching image of a poor family and a looming strike captured the tensions of a rapidly industrializing Buenos Aires.",
  'Ángel Della Valle':
    "Ángel Della Valle (1852–1903) was an Argentine painter, best known for 'The Return of the Raiding Party' (1892), a dramatic and now much-debated image of frontier conflict on the pampa. It helped establish a national school of painting focused on Argentine subjects.",
  'Cándido López':
    "Cándido López (1840–1902) was an Argentine soldier-painter who fought in the Paraguayan War and lost his right hand at the battle of Curupaytí, then taught himself to paint with his left. His panoramic, faux-naïf battle scenes, made from memory, are a unique eyewitness record and are treasured as national heritage.",
  'Reinaldo Giudici':
    "Reinaldo Giudici (1853–1921) was an Italian-born Argentine painter. His sympathetic image of the urban poor lining up for charity, 'The Soup of the Poor' (1884), reflected the social concerns of a Buenos Aires swelling with immigrants and hardship.",
  'Eduardo Sívori':
    "Eduardo Sívori (1847–1918) was a pioneer of Realism in Argentine art. His plain, unglamorous nude of a working girl, 'The Servant's Awakening' (1887), shocked audiences used to idealized figures and became a milestone of naturalism in Argentina.",
  'Prilidiano Pueyrredón':
    "Prilidiano Pueyrredón (1823–1870) was one of Argentina's first major painters, as well as an engineer and architect. He recorded the world of the gaucho and the pampa and painted elegant portraits, including the celebrated red-gowned portrait of Manuelita Rosas — foundational images of 19th-century Argentine life.",
  'Fernando Fader':
    "Fernando Fader (1882–1935) was a leading figure who brought Impressionist colour and light to Argentine painting in the early 20th century. His loose, luminous landscapes and scenes of provincial life helped modernize the country's art.",
  'Martín Malharro':
    "Martín Malharro (1865–1911) is credited with introducing Impressionism and Post-Impressionism to Argentina around the turn of the 20th century. His atmospheric landscapes, like the moonlit 'Nocturno,' broke with academic tradition and pointed Argentine art toward modernism.",

  // --- Chile & itinerant ---
  'Alfredo Valenzuela Puelma':
    "Alfredo Valenzuela Puelma (1856–1908) was one of Chile's most celebrated 19th-century academic painters, part of the founding generation of Chilean art. Trained in Paris, he excelled at polished nudes, Orientalist scenes and refined genre pictures such as 'The Merchant's Pearl.'",
  'Celia Castro':
    "Celia Castro (1860–1930) was one of the first prominent women painters in Chile, working in the late 19th century when the field was almost entirely male. Her genre scenes, like women and children on the beach, are valued both as art and as milestones for women in Chilean painting.",
  'Pedro Lira':
    "Pedro Lira (1845–1912) was a central figure of Chilean painting — an artist, teacher, critic and organizer who did much to build the country's art world. He produced grand history paintings like 'The Founding of Santiago' as well as refined portraits and intimate genre scenes.",
  'Thomas Somerscales':
    "Thomas Somerscales (1842–1927) was an English marine painter who lived for many years in Chile. His crisp, luminous seascapes of the naval battles of the War of the Pacific effectively founded Chilean marine painting and chronicled the country's naval heroes.",
  'Manuel Antonio Caro':
    "Manuel Antonio Caro (1835–1903) was a Chilean painter of history and 'costumbrista' scenes. His depiction of the 'Zamacueca,' Chile's national courtship dance, celebrated popular custom and helped define a sense of national identity through everyday culture.",
  'Mauricio Rugendas':
    "Johann Moritz Rugendas (1802–1858) was a widely travelled German painter who spent years in Chile and across Latin America in the 1830s–40s. His countless studies of the region's people, landscapes and customs are invaluable, affectionate documents of 19th-century Latin American life.",
  'Juan Francisco González':
    "Juan Francisco González (1853–1933) was a key modernizer of Chilean painting around 1900. He loosened rigid academic technique toward a free, luminous, almost Impressionist handling, and his unpretentious scenes of towns, gardens and everyday life broke new ground for Chilean art.",
  'Édouard Manet':
    "Édouard Manet (1832-1883) was a French painter whose blunt, flatly lit scenes of modern Paris broke with academic tradition and set the stage for Impressionism. Scandals over 'Olympia' and 'Le Déjeuner sur l'herbe' made him the reluctant leader of a new generation.",
  'Albert Bierstadt':
    "Albert Bierstadt (1830-1902) was a German-born American painter of the Hudson River School, famous for vast, luminous canvases of the American West that were exhibited as paid spectacles and shaped how the nation pictured its frontier.",
  'Amedeo Modigliani':
    "Amedeo Modigliani (1884-1920) was an Italian painter and sculptor working in Paris, instantly recognisable for elongated necks, tilted mask-like faces and almond eyes often left blank. He died at 35 after years of illness and poverty.",
  'Samuel F. B. Morse':
    "Samuel F. B. Morse (1791-1872) was a leading American painter who studied in London and Paris, then abandoned art after being passed over for a major commission. He devoted the rest of his life to the electric telegraph and to Morse code, the system of dots and dashes that carries his name.",
};
