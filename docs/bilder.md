# Bilder av Ärteråsen på nätet

Bilder som hittats på andra webbplatser, med fotograf och vad som gäller för att använda dem. Läs det här innan du letar efter bilder igen. Sammanställt 2026-10-18.

Reglerna i [AGENTS.md](../AGENTS.md) gäller: en bild används på sajten när vi vet vem som tagit den och har rätt att använda den. Det gäller två slags bilder:

- **Fri licens** (CC BY, CC BY-SA, CC0, public domain): används i utkasten direkt, utan att vänta på svar. Ange `fotograf`, `bildlicens` och `bildkalla` i platsens `sv.md`, så visas krediteringen under bilden. Museer med CC-licens behöver inte tillfrågas.
- **Tillåtelse från fotografen**: volontärens dokument säger att föreningen får använda bilden. Lars Bägerfeldts fria villkor (ej kommersiellt) räcker för utkasten, men han ska ha fått veta innan platsen godkänns.

En nutida bild där en person kan kännas igen kräver personens samtycke, oavsett licens. Kör alltid `npm run bild` innan en bild läggs in under `content/`.

Bilder med fri licens hämtas till [`material/`](../material/) av workflowen `hamta-material` (se [material/LASMIG.md](../material/LASMIG.md)). Övriga bilder står bara som länk här.

## Fria att använda med namn

Licensen tillåter användning, även på skyltar och sajten, om fotograf och museum anges. Krediteringen står i `material/hamta.json`, och alla filer ligger i `material/bilder/`. Kolumnen *Används* visar var bilden sitter i utkasten (2026-10-19).

DigitaltMuseums API, `https://api.dimu.org/api/solr/select?q=Ärteråsen&wt=json&rows=100&api.key=demo`, gav 24 träffar 2026-10-19. Alla finns här. API:t går att läsa med WebFetch.

| Bild | Fotograf, år | Licens | Används | Källa |
| --- | --- | --- | --- | --- |
| Ärteråsens fäbod 1916: kvinna med ko framför ett timmerhus, gärdesgård. Museet klassar huset som ladugård, inte som eldhus. | Karl-Erik Forsslund, 1916 | CC BY 4.0 (DM KEF02850) | Fäbodvallen, huvudbild | [DigitaltMuseum](https://digitaltmuseum.se/0210114730455) |
| Inne i ett eldhus, med bänkar och en gryta över elden. Repro av bild 11 i en bok av Sigurd Erixon: "Interiör av eldhus, »störhöis», dat. 1775. Ärteråsen, Ore sn, 1926." Beskuren till fotot. | Okänd fotograf 1926, repro Ernst Blom | Public Domain Mark (Vlm-Blom 2282). Fotot är från 1926, så skyddet för en vanlig fotografisk bild (50 år) har gått ut. Räknas det som ett konstnärligt fotografiskt verk gäller skyddet längre. Kontrollera vem som tog det innan Eldhusen godkänns. | Eldhusen, huvudbild | [DigitaltMuseum](https://digitaltmuseum.se/0210114263144) |
| Eldhus och mjölkbod med gavlarna mot varandra. Repro av fig. 31 i boken *Bondens gård*; bildtexten säger bara "Ore socken". | Foto Olof Ekberg, repro Ernst Blom, år okänt | Public Domain Mark för reprot (Vlm-Blom 2281). **Kontrollera Ekbergs upphovsrätt**: år och bok saknas hos museet. | Nej | [DigitaltMuseum](https://digitaltmuseum.se/0210114263141) |
| Vy över vallen med timmerhus och skog | Jennie Tiderman-Österberg, 2018 | CC BY 4.0 (DMTB 000000166) | Fäbodvallen | [DigitaltMuseum](https://digitaltmuseum.se/021018343956) |
| Utsikt över gärdesgård, hus och skog | Jennie Tiderman-Österberg, 2018 | CC BY 4.0 (DMTB 000000167) | Fäbodvallen | [DigitaltMuseum](https://digitaltmuseum.se/021018343957) |
| Ristningar inomhus | Jennie Tiderman-Österberg, 2018 | CC BY 4.0 (DMTB 000000168, 169, 171, 179, 182, 184) | Nej, reserv för Ristningarna | [DigitaltMuseum](https://digitaltmuseum.se/021018343958) |
| Timmervägg med redskap: såg, kedja | Jennie Tiderman-Österberg, 2018 | CC BY 4.0 (DMTB 000000170) | Eldhusen | [DigitaltMuseum](https://digitaltmuseum.se/021018343960) |
| Figurristningar inomhus: ryttare, djur, människofigurer, årtal | Jennie Tiderman-Österberg, 2018 | CC BY 4.0 (DMTB 000000172) | Ristningarna | [DigitaltMuseum](https://digitaltmuseum.se/021018343961) |
| Husknut | Jennie Tiderman-Österberg, 2018 | CC BY 4.0 (DMTB 000000173) | Eldhusen | [DigitaltMuseum](https://digitaltmuseum.se/021018343963) |
| Timmervägg | Jennie Tiderman-Österberg, 2018 | CC BY 4.0 (DMTB 000000174) | Nej | [DigitaltMuseum](https://digitaltmuseum.se/021018343965) |
| **Gavel med dörr, med "ILS 1662" högst upp**: mjölkboden som Bägerfeldt beskriver (skrift 67, s. 57–58). Beskuren till gaveln. | Jennie Tiderman-Österberg, 2018 | CC BY 4.0 (DMTB 000000175) | Ristningarna, huvudbild | [DigitaltMuseum](https://digitaltmuseum.se/021018343964) |
| Samma gavel med dörr, längre ifrån | Jennie Tiderman-Österberg, 2018 | CC BY 4.0 (DMTB 000000176) | Nej | [DigitaltMuseum](https://digitaltmuseum.se/021018343966) |
| Dörr med ristningar, utsida | Jennie Tiderman-Österberg, 2018 | CC BY 4.0 (DMTB 000000177) | Nej | [DigitaltMuseum](https://digitaltmuseum.se/021018343967) |
| Dörr med ristningar, insida: namn och årtal 1912–1915 | Jennie Tiderman-Österberg, 2018 | CC BY 4.0 (DMTB 000000178) | Ristningarna | [DigitaltMuseum](https://digitaltmuseum.se/021018343968) |
| Timmervägg med ristningar, bland annat 1756 | Jennie Tiderman-Österberg, 2018-06-20 | CC BY 4.0 (DMTB 000000180) | Ristningarna | [DigitaltMuseum](https://digitaltmuseum.se/021018343969) |
| Närbild på ristade initialer | Jennie Tiderman-Österberg, 2018 | CC BY 4.0 (DMTB 000000181) | Nej | [DigitaltMuseum](https://digitaltmuseum.se/021018343973) |
| Hölada | Jennie Tiderman-Österberg, 2018 | CC BY 4.0 (DMTB 000000183) | Fäbodvallen | [DigitaltMuseum](https://digitaltmuseum.se/021018343972) |
| Tupp vid ett hus | Jennie Tiderman-Österberg, 2018 | CC BY 4.0 (DMTB 000000185) | Nej | [DigitaltMuseum](https://digitaltmuseum.se/021018343977) |
| Fjällkor vid gärdesgård, och en person som namnges i museets titel. **Beskuren så att personen inte syns.** Hela bilden kräver personens samtycke. | Jennie Tiderman-Österberg, 2018-06-20 | CC BY 4.0 (DMTB 000000186) | Fjällkorna, huvudbild, beskuren | [DigitaltMuseum](https://digitaltmuseum.se/021018343976) |
| Fäbodristning på torrfura, bomärke, initialer och 1866. Från Ore socken, inte uttryckligen Ärteråsen. | Hansa Andersson, insamlad 2023 | CC BY 4.0 (DM 26652) | Nej, inte från Ärteråsen | [DigitaltMuseum](https://digitaltmuseum.se/0210214508679) |

Bilderna från 2018 är tagna inom Dalarnas museums projekt *Fäbodlandskap och vallmusik*, troligen samma dag (2018-06-20 för de som har datum).

## Föreningens egna bilder

Bilder på [arterasen.se](https://www.arterasen.se/). Ingen fotograf anges, och de flesta saknar bildtext, så beskrivningarna nedan bygger på filnamnen. Fråga föreningen vem som tagit dem och be om originalen i full storlek.

| Bild | Bild-URL |
| --- | --- |
| Karta över fäbodstigen Näset–Ärteråsen 7,6 km, två versioner. Hämtas till `material/foreningen/`. | [v2-1](https://images.staticjw.com/art/1614/fabodstigen-naset-arterasen-76-km-final-v2-1.jpg), [v2-12](https://images.staticjw.com/art/3420/fabodstigen-naset-arterasen-76-km-final-v2-12.jpg) |
| Sidhuvudet | [header.jpg](https://images.staticjw.com/art/1423/header.jpg) |
| Hemgång (korna går hem), 2018 | [hemgang-2-18.jpg](https://images.staticjw.com/art/7578/hemgang-2-18.jpg) |
| Hemgång | [hemgang.jpg](https://images.staticjw.com/art/6706/hemgang.jpg) |
| Karles lada | [karles-lada-klar.jpg](https://images.staticjw.com/art/6431/karles-lada-klar.jpg) |
| Ny gärdesgård med kor | [ny-gardesgard-med-kyor.jpg](https://images.staticjw.com/art/5329/ny-gardesgard-med-kyor.jpg) |
| Från serveringen | [fran-serveringen.jpg](https://images.staticjw.com/art/4471/fran-serveringen.jpg) |
| "Vi hittar vägen" | [vi-hittar-vagen.jpg](https://images.staticjw.com/art/4523/vi-hittar-vagen.jpg) |
| Umgänge | [umgange.jpg](https://images.staticjw.com/art/5831/umgange.jpg) |
| Stuga som hyrs ut, 2019 | [karlerikes-uthyres-2019-bild.jpg](https://images.staticjw.com/art/1352/karlerikes-uthyres-2019-bild.jpg) |
| Hund | [hund-redigerad.jpg](https://images.staticjw.com/art/2997/hund-redigerad.jpg) |
| Gudstjänst (på sidan om kulturveckan) | [gudstjanst-18.jpg](https://images.staticjw.com/art/5993/gudstjanst-18.jpg) |
| Fjällkor (sidan om Sunnanheds fjällkor) | [aimg-5682copy.jpg](https://images.staticjw.com/art/4722/aimg-5682copy.jpg) |
| Bilder med namngivna personer. Kräver samtycke. | [vilmer-o-korna.jpg](https://images.staticjw.com/art/8108/vilmer-o-korna.jpg), [barta.jpg](https://images.staticjw.com/art/9548/barta.jpg) |

Fotogalleriet på [arterasen.se/fotogalleri](https://www.arterasen.se/fotogalleri) har album som inte gick att läsa härifrån: *Tidigt 90-tal och framåt*, *Ögonblicksbilder*, *Sommaren 2012*, *Vinter*, *Kosläpp* (2013) och *Spelmanstämma*. Albumet från tidigt 90-tal kan vara värdefullt för historiska jämförelser.

## Lars Bägerfeldts bilder

Lars Bägerfeldt har fotograferat alla byggnader och ristningar på Ärteråsen, tiotusentals bilder 2016–2023 (skrift 84, s. 20). Hans villkor är att materialet får användas fritt så länge det inte sker i kommersiellt syfte (skrift 69, s. 2; skrift 70). Sajten är ideell, så bilderna får användas i utkasten utan att vänta på svar. Kontakta honom parallellt och be om originalfiler; han ska ha fått veta innan en plats med hans bild godkänns. Hans bilder har inte `bildlicens` i `sv.md`, eftersom villkoret inte är en CC-licens, och de omfattas inte av sajtens CC BY för texterna.

| Bilderbok | Länk |
| --- | --- |
| B3 FOTO. Ärteråsens fäbod 1: Runt eldhusen (2020-12-05) | [PDF](https://lasse345.wordpress.com/wp-content/uploads/2020/12/foto-arterasens-fabod-1-runt-eldhusen-2020-12-05.pdf) |
| B4 FOTO. Ärteråsens fäbod 2: Över tröskeln (2020-12-05) | [PDF](https://lasse345.wordpress.com/wp-content/uploads/2020/12/foto-arterasens-fabod-2-over-troskeln-2020-12-05.pdf) |
| B5 FOTO. Ärteråsens fäbod 3: Fähus, bodar, hölador (2020-12-05) | [PDF](https://lasse345.wordpress.com/wp-content/uploads/2020/12/foto-arterasens-fabod-3-fahus-bodar-holador-2020-12-05.pdf) |
| B6 FOTO. Ärteråsens fäbod 4: Ristningar (2021-11-25) | [PDF](https://lasse345.wordpress.com/wp-content/uploads/2021/11/foto-arterasens-fabod-4-ristningar-2021-11-25.pdf) |
| B7 FOTO. Fäbodar i Ore, hus och ristningar (2021-11-01) | [PDF](https://lasse345.wordpress.com/wp-content/uploads/2021/11/foto-fabodar-i-ore-hus-ristningar-2021-11-01.pdf) |
| B8 FOTO och BILD. Figurristningar i Ore, renritningar (2024-10-10) | [PDF](https://lasse345.wordpress.com/wp-content/uploads/2024/10/b8-bilder-figurristningar-i-ore-2024-10-10.pdf) |
| Bilder på DeviantArt | [deviantart.com/oldhouses](https://www.deviantart.com/oldhouses) |

Bilderböckerna hämtas inte till repot, de är troligen stora. B6 och B8 är mest intressanta för skylten om ristningarna.

## Får användas bara efter tillstånd

Upphovsrätten ligger hos fotografen. Fråga innan användning.

| Bild | Fotograf | Var |
| --- | --- | --- |
| Vid Ärteråsens fäbod | Yvonné Öhrnell (©) | [Rättviks kommun, Ärteråsen](https://www.rattvik.se/uppleva-och-gora/kultur/kulturarv/fabodar/arterasen.html), [bild-URL](https://www.rattvik.se/images/18.33c47a6914e03f1db977bfb/1481707023037/Yvonn%C3%A9-%C3%96hrnell--%C3%84rter%C3%A5sen--15.jpg) |
| Stigen upp till Ärteråsen | Yvonné Öhrnell | [Rättviks kommun, Näset–Ärteråsen](https://www.rattvik.se/uppleva-och-gora/rattvik-outdoor/vandra-pa-fabodstigar/naset-arterasen.html) |
| Drönarbild | Rania Rönntoft | [Visit Dalarna](https://visitdalarna.se/en/do/attractions/arterasens-summer-farm) |
| Tre bilder: vallen med utsikt, timmerhus, ko | ej angiven | Visit Dalarna, [1](https://images.citybreak.com/image.aspx?ImageId=6115122&fitaspect=1&width=750&height=460), [2](https://images.citybreak.com/image.aspx?ImageId=6115123&fitaspect=1&width=750&height=460), [3](https://images.citybreak.com/image.aspx?ImageId=6115124&fitaspect=1&width=750&height=460) |
| Tre bilder av fäboden | ej angiven | [furudal.nu](https://www.furudal.nu/sv/aktiviteter/arterasens-fabodar) |
| Siljansleden vid Ärteråsens fäbod | Bosse Bifrost | [Naturkartan](https://naturkartan.se/en/rattvik/siljansleden-rattvik-kommun), [bild-URL](https://uploads.naturkartan-cdn.se/b89e2f9349cd8bf606ee537f9c4cbbe9.jpg) |
| Fjällkor vid Ärteråsens fäbodar | Föreningen, samt Anders Johansson och Sara Danvind | [Länsstyrelsen 2025-06-27](https://www.lansstyrelsen.se/dalarna/om-oss/nyheter-och-press/aktuella-nyheter/nyheter---dalarna/2025-06-27-under-fabodveckan-visar-gammal-kunskap-vagen-framat.html), [Landsbygdsnytt 3/2025, s. 3](https://www.lansstyrelsen.se/download/18.3fcb6f8319931f7a95f94f95/1758549173634/Landsbygdsnytt_Nr3_2025.pdf) |
| Låtkurs i eldhus 2019 | troligen Gunilla Jacobsson (enligt filnamnet) | [Dalarnas Spelmansförbund](https://www.dalarnasspelmansforbund.se/kalender/2019/8/9/rtersens-fbod-furudal) |
| Ett 30-tal bilder från ett besök 2020, bl.a. eldhus och gärdesgårdar | bloggaren MoraOwe | [moraowe.com](https://moraowe.com/2020/09/04/besok-i-rattviksfaboden-arterasen/) |
| Bilder från besök | Swedish Spoon | [swedishspoon.com](https://swedishspoon.com/arterasen-summer-farm) |

## Inte genomsökt

- **Facebook** ([ArterasensFabod](https://www.facebook.com/ArterasensFabod)): kräver inloggning och gick inte att läsa från sessionen. Föreningens egna bilder därifrån är troligen de bästa. Be föreningen om original.
- **Instagram:** inget konto för föreningen hittades.
- **Wikimedia Commons och Wikipedia:** gick inte att läsa från sessionen. En sökning pekade på en artikel *Ärteråsens fäbodar* på svenska Wikipedia, men sidan gick inte att öppna.
- **Ores hembygdsförening** ([artikel om Ärteråsen och fäbodkulturen](https://www.hembygd.se/ore/news/20422)): sajten spärrar automatisk läsning.
