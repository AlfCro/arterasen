# 05 Skyltar: tryck och uppsättning

Status: Mall klar
Ansvarig: Föreningen
Senast uppdaterad: 2026-10-17

## Mål

Varje godkänd plats har en tålig skylt som går att skanna i sol, regn och svag täckning, uppsatt med ägarens tillåtelse.

## Klart när

- [ ] En provskylt har suttit uppe och fungerat med flera olika telefoner
- [ ] Material och tryckeri är valda
- [ ] Alla godkända platser har skylt uppe och finns i `content/tryckta-skyltar.json`

## Beslut

- 2026-10-17: Skylten genereras från innehållet på `/skyltar/` som A5, en per sida. QR-koden finns även som SVG för tryckerier.
- 2026-10-17: Skyltar för utkast märks *Provtryck, ej godkänd* och ska inte sättas upp.
- 2026-10-17: En uppsatt skylts adress ändras aldrig. Kontrollen stoppar varje ändring som skulle göra en uppsatt QR-kod oanvändbar.

## Att göra

- [ ] Vänta tills `info.arterasen.se` fungerar (initiativ 2) innan något trycks
- [ ] Provskylt i plastficka på en plats. Testa med iPhone och Android, i sol och skugga.
- [ ] Be två tryckerier om pris på UV-tryck på aluminiumkomposit, A5, med UV-beständigt laminat
- [ ] Fråga husägarna om tillåtelse. Helst egna stolpar så att ingen skruvar i gammalt timmer.
- [ ] Ta reda på om länsstyrelsen har synpunkter, eftersom renoveringarna delvis betalas med deras bidrag
- [ ] När skylten sitter uppe: flytta kortet till *Skylt uppsatt*. Claude lägger in den i `content/tryckta-skyltar.json`.
- [ ] Inför varje säsong: skanna alla skyltar och byt skadade

## Öppna frågor

- Stolpar eller fäste på husen?
- Hur många skyltar ryms i budgeten från Vindkraftsfonden?
- Ska skyltarna ha föreningens logotyp? Skicka i så fall en fil.

## Logg

- 2026-10-17: Skyltmall i A5 med QR 72 mm, felkorrigering Q, titlar på tre språk. Alla QR-koder kontrollavkodade (Claude).
