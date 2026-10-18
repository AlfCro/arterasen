# Rapport 2026-10-19: Fler bilder och fakta

Arbetspass: 2026-10-19 00:06–00:30
Av: Claude
PR: #10
Initiativ: 01, 04

## Sammanfattning

Alla 24 museibilder av Ärteråsen på DigitaltMuseum är hämtade, och fyra av fem platser har nu bilder, upp till fyra per plats. Bland dem finns ett eldhus inifrån 1926 och gaveln där "ILS 1662", fäbodens äldsta årtal, syns högst upp. Alla platser har fått fler faktarader från källor som inte motsäger varandra. Källorna saknar fortfarande bild.

## Gjort

- **Bilderna:** DigitaltMuseums API gav 24 träffar på "Ärteråsen". De 19 som saknades lades i `material/hamta.json` och hämtades av `hamta-material`. Alla är CC BY 4.0 från Dalarnas museum utom två repron med Public Domain Mark från Västmanlands läns museum.
- **Flera bilder per plats:** nytt fält `fler_bilder` i `sv.md` med samma fält som huvudbilden, och `bild` plus `bildtext` i `en.md` och `de.md`. Bilderna visas under *Fler bilder* efter texten. `npm run check` kräver fotograf, bildtext på alla språk och källa vid fri licens, och varnar över fyra extra bilder. `npm run bild` tar ett valfritt namn, till exempel `bild-2`.
- **Bredd och höjd** läses ur JPEG-filen vid bygget, så att sidan reserverar platsen innan en bild laddas.
- **Per plats:**
  - Fäbodvallen: tre nya bilder (vallen, utsikten, en hölada). Nya fakta: fäbod åt Näset, omkring 200 djur, Dalarnas sju underverk 2020.
  - Eldhusen: huvudbild inifrån ett eldhus 1926, i ett hus daterat 1775, plus husknut och redskap. Texten beskriver nu inredningen (cirka 4 × 4 m, lavar, jordgolv, härd, ljore, kopparkittel) och att en stock har yttersta årsring 1646.
  - Ristningarna: ny huvudbild med "ILS 1662" på mjölkbodens gavel, plus figurristningar och en dörr med årtal från 1910-talet. Nya fakta: drygt 7 500 årtal, 66 figurristningar, 318 identifierade personer.
  - Källorna: två fakta till (källor som kan återupplivas, 30 000 kr från bygdepengen).
  - Fjällkorna: bild på fjällkor vid en gärdesgård, beskuren så att personen i museets bild inte syns. Fakta om rasen från NordGen och om djuren per fäbodgård förr från Bägerfeldt.
- **`npm run verify`** laddar nu alla bilder före skärmdumparna och felar om någon inte laddas. Testet av språkval väntar in sidbytet; det föll två av tre gånger med tyngre sidor.
- **Dokumentation:** `docs/bilder.md` listar alla 24 bilder och var de används, `docs/fakta.md` har de nya kontrollerade uppgifterna och ett avsnitt om fjällkon, `AGENTS.md` beskriver `fler_bilder` och DigitaltMuseums API, volontärsidorna och mallen säger att flera bilder går bra.

## Beslut

- **Bilden från 1926 används** (Claude). Museet märker den Public Domain Mark, och ett vanligt fotografi från 1926 är fritt efter 50 år. Fotografen är okänd och boken är Sigurd Erixons. Skulle bilden räknas som ett konstnärligt fotografiskt verk gäller längre skydd, så vem som tog den ska redas ut innan Eldhusen godkänns.
- **Fjällkobilden beskärs** i stället för att vänta på samtycke (Claude). Personen syns inte i det som visas. Hela bilden används fortfarande inte.
- **Ekbergs bild (Vlm-Blom 2281) används inte**, eftersom år och bok saknas (Claude).
- **Uppgifter i *Motsägelser* lämnas som de var**: 1400-talet, 22 eldhus, 36 brukare, 1954 och hundreglerna stod redan i utkasten och väntar på föreningens svar. Inga nya uppgifter från den listan har lagts till.
- **Visningen av fler bilder** (Claude, efter Alfs önskemål): i full bredd efter texten. Infört under *Beslut* i `plans/01-sajt.md`.

## Kontrollerat

- `npm run check`: 0 fel, 0 varningar. Brödtexterna är 118–200 ord, utom Källorna (73–93 ord), vars text inte ändrades.
- `npm run verify` tre gånger i rad utan fel. Skärmdumparna av Fäbodvallen, Eldhusen, Ristningarna och Fjällkorna granskade i 390 px: bilderna, bildtexterna, krediteringen och faktan syns.
- Nya uppgifter lästa i PDF-texten: skrift 88 s. 7 (eldhusets inredning), skrift 67 s. 15 och 17 (arbetet, djuren), skrift 67 s. 57–58 (ILS 1662). NordGens sida läst 2026-10-19.
- Alla bilder granskade med Read innan de valdes. Bildtexterna säger bara det som syns eller står hos museet.
- README.md stämmer med ändringarna (`npm run check:readme`).

## Väntar på

- [ ] Granska och merga PR #10 (Alf)
- [ ] Ta bort grenarna `claude/fria-bilder-licens` och, efter merge, `claude/fler-bilder-fakta` (Alf)
- [ ] En bild av en källa (föreningen)
- [ ] Ta reda på vem som tog bilden av eldhuset 1926 (vem som helst med tillgång till Erixons bok)
- [ ] Berätta för Lars Bägerfeldt att hans skrifter används i fyra utkast (Alf eller föreningen)

## Öppna frågor

- Är det i Erixons bok angivet vem som tog bilden 1926? (vem som helst med boken)
- Vill föreningen ha nyare bilder av eldhusen utifrån? Museets bilder från 2018 visar mest väggar och ristningar inomhus. (föreningen)

## Källor

- [DigitaltMuseum, sökning via API](https://api.dimu.org/api/solr/select?q=%C3%84rter%C3%A5sen&wt=json&rows=100&api.key=demo)
- [Interiör från eldhus på Ärteråsen, Västmanlands läns museum](https://digitaltmuseum.se/0210114263144)
- [Gavel med dörr, Ärteråsen 2018, Dalarnas museum](https://digitaltmuseum.se/021018343964)
- [NordGen, Swedish Mountain Cattle](https://www.nordgen.org/en/?p=18127)
- [Visit Dalarna, Här är Dalarnas sju underverk](https://www.visitdalarna.se/artikel/har-ar-dalarnas-sju-underverk)
- Lars Bägerfeldts skrifter 67, 84, 88 och 89, se [docs/kallor.md](../docs/kallor.md)
