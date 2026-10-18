# Rapport 2026-10-18: Fritt material i utkasten och egna licenser

Arbetspass: 2026-10-18 23:12–23:40
Av: Claude
PR: #9
Initiativ: 02, 04

## Sammanfattning

Fritt licensierat material väntar inte längre på svar från föreningen. Två utkast har fått museibilder med fotograf, licens och källa under bilden, och Ristningarna är omskriven med Lars Bägerfeldts uppgifter. Repot har nu tillåtande licenser, MIT för koden och CC BY 4.0 för texterna, och README säger att drift och konton beskrivs i ett privat repo.

## Gjort

- **Bilder i utkasten:** Fäbodvallen fick Karl-Erik Forsslunds bild från 1916 och Ristningarna en timmervägg med ristningar fotograferad av Jennie Tiderman-Österberg 2018, båda CC BY 4.0 från Dalarnas museum. Krympta med `npm run bild`.
- **Kreditering:** nya fält `bildlicens` och `bildkalla` i `sv.md`. Under bilden står fotografen länkad till museets sida och licensen länkad till Creative Commons, på besökarens språk. `npm run check` stoppar en okänd licens och en fri licens utan källa (`FREE_LICENSES` i `src/content.mjs`). Mallen har fälten.
- **Ristningarna omskriven** på tre språk med Bägerfeldts uppgifter, kontrollerade mot PDF-texten: 10 746 ristningar, var de sitter, ett sextiotal figurristningar, att "ILS 1662" sitter ovanför dörren på utsidan av en mjölkbod och är Jon Larssons i Tillhed, och Brita Eriksdotters ristningar 1847–1859. Källorna i förhandsvisningen visar nu titel och sidor som länk.
- **Licenser:** `LICENSE` (MIT), `LICENSER.md` (vad som gäller för vad, undantagen för bilder, `material/` och typsnitt), `package.json` säger `MIT`, `contentLicense` i `site.config.json`, och en rad i sidfoten på alla tre språk.
- **Volontärerna:** `docs/intern/10-skriva.md`, Drive-mallen och `docs/intern/90-nytt.md` säger att texter publiceras under CC BY 4.0 och att museibilder kan användas. Drive-mallen frågar också om någon person syns i bilden.
- **Privata konfigurationsrepot:** README har en punkt överst och ett avsnitt *Drift och konfiguration* om `AlfCro/arterasen-config`: vad som står där och varför det är privat.
- **Regler:** `AGENTS.md`, `docs/bilder.md`, `docs/arbetsflode.md` och `material/LASMIG.md` beskriver den nya ordningen. `docs/bilder.md` visar var varje museibild används.
- **Rättat:** `docs/bilder.md` beskrev bilden från 1916 som ett eldhus. Museet klassar huset som ladugård; texten säger nu bara timmerhus.

## Beslut

- **Fritt material används i utkasten utan att vänta** (Alf). Upphovspersonen kontaktas parallellt. En privatperson, som Bägerfeldt, ska ha fått veta och inte ha sagt nej innan platsen godkänns. Museer med CC-licens tillfrågas inte. Infört i `plans/04-innehall.md`.
- **Licenser: MIT för koden, CC BY 4.0 för texterna** (Alf). Ingen volontärtext fanns ännu, så inget har licensierats för någon annans räkning. Infört i `plans/02-hosting.md`.
- **Det privata repot nämns i det publika** (Alf).
- Bilder som inte används ännu (Claude): Vlm-Blom 2281, eftersom museets sida inte anger år eller bok och Olof Ekbergs rätt till originalfotot är oklar. DMTB 000000186, eftersom personen på bilden namnges och inte har sagt ja; det är en samtyckesfråga, inte en licensfråga. DM 26652, eftersom den inte är från Ärteråsen.
- Bägerfeldts egna bilder får `bildlicens` utelämnad, eftersom hans villkor (fritt, ej kommersiellt) inte är en CC-licens och inte omfattas av sajtens CC BY (Claude).

## Kontrollerat

- `npm run check`: 0 fel, 0 varningar. `npm run build` och `npm run build:preview` gick igenom.
- `npm run verify`: skärmdumpar i 390 px av alla sidor, skyltar avkodade, offline, 404. Fäbodvallen och Ristningarna granskade: bilden, krediteringen och licensraden syns och radbryts rätt.
- Bägerfeldts uppgifter i Ristningarna lästa i PDF-texten (skrift 67 s. 6 och 57–58, skrift 70, skrift 72 s. 19–31). Nya kontrollerade uppgifter markerade ✓ i `docs/fakta.md`.
- Museets uppgifter för bilderna lästa på DigitaltMuseum: CC BY 4.0, fotograf och den kreditering museet begär. Ristningarnas brödtext är 165 ord på svenska, 200 på engelska och 179 på tyska.
- Typsnittens licens (OFL-1.1) läst ur npm-paketen.
- README.md stämmer med ändringarna (`npm run check:readme`).

## Väntar på

- [ ] Granska och merga PR #9 (Alf). Bilderna och licensraden syns på `utkast.arterasen.se` efter merge.
- [ ] Berätta för Lars Bägerfeldt att hans skrifter används i utkastet om ristningarna och att kopior ligger i repot, och fråga om originalbilder (Alf eller föreningen). Senast innan Ristningarna godkänns.
- [ ] Underlaget till ordföranden är inte skickat än. Fyra frågor har ändrats sedan det skrevs (Alf): B1 Bägerfeldt är nu ett besked och en fråga om bilder, B7 Brita Eriksdotter används redan, C8 är delvis besvarad (se nedan), och D4 licens är ett besked. Claude kan göra en ny version om Alf skickar filen.

## Öppna frågor

- Är mjölkboden med "ILS 1662" den som föreningen kallar den äldsta mjölkstugan, och får besökare gå fram till den? (föreningen)
- Får museibilden från 2018 där en person syns med fjällkorna användas på skylten om fjällkorna? (personen själv, fråga B4)
- Olof Ekbergs bild av eldhus och mjölkbod: vilken bok och vilket år? Är fotot äldre än 50 år räcker det troligen, men det har inte gått att belägga. (vem som helst med tillgång till boken *Bondens gård*)

## Källor

- [Ärteråsens fäbod 1916, DigitaltMuseum](https://digitaltmuseum.se/0210114730455/rattvik-ore-arterasen-arterasens-fabod-1916)
- [Timmervägg med ristningar, inomhus, Ärteråsen 2018, DigitaltMuseum](https://digitaltmuseum.se/021018343969/timmervagg-med-ristningar-inomhus-arterasen-ore-2018)
- [Eldhus och mjölkbod på Ärteråsen, DigitaltMuseum](https://digitaltmuseum.se/0210114263141/eldhus-och-mjolkbod-pa-arterasen)
- Lars Bägerfeldts skrifter 67, 70 och 72, se [docs/kallor.md](../docs/kallor.md) och `material/skrifter/`
- [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.sv)
