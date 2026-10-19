# 05 Skyltar: tryck och uppsättning

Status: Mall klar. Föreningen lutar åt en bärbar karta i stället för fasta skyltar, inte beslutat
Ansvarig: Föreningen
Senast uppdaterad: 2026-10-19

## Mål

Varje godkänd plats har en tålig skylt som går att skanna i sol, regn och svag täckning, uppsatt med ägarens tillåtelse.

## Klart när

- [ ] En provskylt har suttit uppe och fungerat med flera olika telefoner
- [ ] Material och tryckeri är valda
- [ ] Alla godkända platser har skylt uppe och finns i `content/tryckta-skyltar.json`

## Väntar på beslut

### Bärbar karta eller fasta skyltar (föreningen, sedan Alf)

Ordförandens svar 2026-10-19 (E1, E2, E4): föreningen föredrar hittills att inte sätta upp skyltar som stör miljön, utan att ha QR-koderna på en bärbar karta, inplastad eller i hård plast, som besökare kan kvittera ut. Det är inte färdigtänkt. Blir det fasta skyltar ska de stå på egna stolpar, inte sitta på husen.

Vad det betyder här:

- **Sajten och adresserna påverkas inte.** QR-koderna pekar på samma adresser, och startsidan listar redan platserna med nummer.
- **Kartan kan vara informationsbladet** som Vindkraftsfonden ger pengar till ("informationsblad med QR-koder", se *Mål* i [PLAN.md](../PLAN.md)).
- **Skyltmallen behöver en kartvariant.** `/skyltar/` gör i dag en A5 per plats. En karta behöver ett underlag att rita på (föreningens karta över stigen, kartan från 1827 eller en ny skiss) och ett val: en QR-kod per plats, eller en kod till startsidan och numrerade platser.
- **Hur hittar besökaren nummer 7 på marken?** Med bara en karta behövs kanske små nummerpinnar vid platserna, eller tydliga landmärken på kartan.
- **Den som inte lånar kartan** får ingen information. En enda skylt vid parkeringen eller serveringen med en QR-kod till startsidan kan täcka det.

## Beslut

- 2026-10-17: Skylten genereras från innehållet på `/skyltar/` som A5, en per sida. QR-koden finns även som SVG för tryckerier.
- 2026-10-17: Skyltar för utkast märks *Provtryck, ej godkänd* och ska inte sättas upp.
- 2026-10-17: En uppsatt skylts adress ändras aldrig. Kontrollen stoppar varje ändring som skulle göra en uppsatt QR-kod oanvändbar.

## Att göra

- [ ] Vänta tills `info.arterasen.se` fungerar (initiativ 2) innan något trycks
- [ ] Provskylt i plastficka på en plats, eller en provkarta om kartan väljs. Testa med iPhone och Android, i sol och skugga. Fäboden går att nå så fort snön har smält, och fyra personer som bor nära kan hjälpa till att testa (E4). Namnen står i svaret, inte här.
- [ ] Be två tryckerier om pris på UV-tryck på aluminiumkomposit, A5, med UV-beständigt laminat. Länsstyrelsens leverantör kan vara ett alternativ (E1).
- [ ] Fråga husägarna om tillåtelse om det blir fasta skyltar. Egna stolpar, inte på husen (föreningen, E2). Ordföranden frågar ägarna.
- [ ] Ta reda på om länsstyrelsen har synpunkter, eftersom renoveringarna delvis betalas med deras bidrag. Ordföranden har kontakten och tar med dem i diskussionen om skyltar (E3).
- [ ] Redovisning till Vindkraftsfonden: kvitton och bilder som visar resultatet. Kvitton från privata leverantörer får vara egna (E1). Spara kvitton och ta bilder av kartan eller skyltarna på plats (föreningen).
- [ ] När skylten sitter uppe: flytta kortet till *Skylt uppsatt*. Claude lägger in den i `content/tryckta-skyltar.json`.
- [ ] Inför varje säsong: skanna alla skyltar och byt skadade

## Öppna frågor

- ~~Stolpar eller fäste på husen?~~ Stolpar (E2).
- Bärbar karta, fasta skyltar eller båda? Se *Väntar på beslut*.
- Hur många skyltar ryms i budgeten från Vindkraftsfonden? Svaret om bidraget (E1) nämner villkoren men inte beloppet.
- Ska skyltarna ha föreningens logotyp? Föreningen räknar kohuvudet på Facebooksidan som logotyp och funderar på en ny (D6). Behövs som fil, helst SVG eller stor PNG.

## Logg

- 2026-10-17: Skyltmall i A5 med QR 72 mm, felkorrigering Q, titlar på tre språk. Alla QR-koder kontrollavkodade (Claude).
- 2026-10-19: Ordförandens svar E1–E4 och D6 inlagda. Föreningen lutar åt en bärbar karta med QR-koder i stället för fasta skyltar, och fasta skyltar i så fall på stolpar. Inget i mallen ändrat än (Claude).
