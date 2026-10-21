# 05 Skyltar: tryck och uppsättning

Status: Mall klar. Föreningen lutar åt laminerade A5 som delas ut, med en karta, i stället för fasta skyltar. Inte beslutat. Löst utkast till en karta med QR-koder på `/intern/karta/` sedan 2026-10-20, och en sida där föreningen pekar ut platserna, `/intern/karta/peka/`, sedan 2026-10-21
Ansvarig: Föreningen
Senast uppdaterad: 2026-10-21

## Mål

Varje godkänd plats har en tålig skylt som går att skanna i sol, regn och svag täckning, uppsatt med ägarens tillåtelse.

## Klart när

- [ ] En provskylt har suttit uppe och fungerat med flera olika telefoner
- [ ] Material och tryckeri är valda
- [ ] Alla godkända platser har skylt uppe och finns i `content/tryckta-skyltar.json`

## Väntar på beslut

### Bärbar karta eller fasta skyltar (föreningen, sedan Alf)

Ordförandens svar 2026-10-19 (E1, E2, E4): föreningen föredrar hittills att inte sätta upp skyltar som stör miljön, utan att ha QR-koderna på en bärbar karta, inplastad eller i hård plast, som besökare kan kvittera ut. Det är inte färdigtänkt. Blir det fasta skyltar ska de stå på egna stolpar, inte sitta på husen.

2026-10-20 (Alf, från föreningen, inte helt bestämt): föreningen vill nog inte sätta upp fasta skyltar, utan dela ut laminerade A5 med QR-koder till gästerna. I så fall behöver de kombineras med en karta.

Vad det betyder här:

- **Sajten och adresserna påverkas inte.** QR-koderna pekar på samma adresser, och startsidan listar redan platserna med nummer.
- **Kartan kan vara informationsbladet** som Vindkraftsfonden ger pengar till ("informationsblad med QR-koder", se *Mål* i [PLAN.md](../PLAN.md)).
- **Skyltmallen behöver en kartvariant.** `/skyltar/` gör i dag en A5 per plats. En karta behöver ett underlag att rita på (föreningens karta över stigen, kartan från 1827 eller en ny skiss) och ett val: en QR-kod per plats, eller en kod till startsidan och numrerade platser.
- **Numret låses inte än** (Alf 2026-10-20). Blad som delas ut trycks om billigt, så en ny ordning kostar lite. Frågan tas upp när numren är bestämda.
- **Hur hittar besökaren nummer 7 på marken?** Med bara en karta behövs kanske små nummerpinnar vid platserna, eller tydliga landmärken på kartan.
- **Den som inte lånar kartan** får ingen information. En enda skylt vid parkeringen eller serveringen med en QR-kod till startsidan kan täcka det.

### Utkast till kartan (2026-10-20)

Alf frågade hur det visuella ska lösas. Ett löst utkast finns på `/intern/karta/` (fliken *Karta, utkast*) och på Trello-kortet [Karta med QR-koder (löst utkast)](https://trello.com/c/7QfVyuMu/23-karta-med-qr-koder-l%C3%B6st-utkast). Inget i det är beslutat.

- **Underlaget** är Bägerfeldts karta över husen i dag, skrift 66 s. 51: hus, öppen mark, skogskant, höjdkurvor och skala. Den är omritad som SVG i sajtens färger med `tools/karta-vektorisera.py` (färgsegmentering, hus som roterade rektanglar), inte inklistrad. Resultatet ligger i `content/karta/bas.svg`. Husen är maskinritade och kan ha små fel; hus som skyms av Bägerfeldts markeringar kan saknas.
- **Lägena** står i `content/karta/lagen.json` som bildpunkter på underlaget. Där står `"exempel": true` tills föreningen har pekat ut platserna; så länge är alla lägen påhittade och varje blad stämplat *Löst utkast · lägena är påhittade*. Lägena hör inte till `sv.md`, eftersom de inte är fakta än.
- **QR-koderna sitter inte på platserna.** Husen står 10–30 m isär, och en kod behöver drygt 2 cm. I stället: numrerade cirklar på kartan och koderna i rutor runt om, med ett streck in till cirkeln. Rutorna fördelas efter vinkeln runt kartans mitt, så att strecken sällan korsar varandra.
- **Två uppslag i A4:** (1) allt på ett blad, kartan i mitten och 15 rutor runt om, och (2) större karta med siffror fram och ett rutnät med koder bak. Båda har en större kod till startsidan med texten att skanna den först där det finns täckning, så att service workern sparar alla sidor.
- **QR 25 mm** i rutorna, 36 mm på baksidan, felkorrigering Q som på skyltarna. Alla koder avkodas av `npm run verify`, i utkastet och i produktion.
- I produktionsbygget visar sidan bara godkända platser, som `/skyltar/`, och länkar annars till utkastet.

### Peka ut platserna (2026-10-21)

Alf: föreningen behöver kunna säga var platserna ligger och vilka etiketter de ska ha, utan att Claude behöver se ett foto av en utskrift (foton når inte sessionen, se [plans/03](03-innehallsflode.md)). Lösningen är fliken *Peka på kartan*, `/intern/karta/peka/` ([src/map-point.mjs](../src/map-point.mjs) och [src/map-point.js](../src/map-point.js)):

- Underlaget med ett rutnät i samma bildpunkter som `lagen.json`, siffror var hundrade punkt längs över- och vänsterkanten.
- **Tryck på kartan** ger läget, till exempel `320.144` (x.y). Volontären skriver vad som ska stå där, med förslag på platsernas titlar, och numret, som fylls i av sig självt för en känd plats. *Lägg till och kopiera* lägger raden `320.144 nr 3 Ristningarna` i urklipp. Alla rader kan kopieras på en gång, och listan sparas i webbläsaren.
- **+ och −** förstorar kartan upp till fyra gånger, centrerat på den valda punkten. Husen står 10–30 m isär och ett finger träffar på ±10 m i full bredd, så förstoringen behövs i telefonen.
- **Utan JavaScript** finns rutnätet kvar, och raden skrivs för hand.
- Påhittade lägen visas inte. När `exempel` är `false` visar sidan lägena som de står, med samma radformat, så att föreningen kan rätta dem.
- **Etiketter** för sådant utan QR-kod (parkering, servering) står i `lagen.json` under `etiketter` med `text` och `lage`, och ritas som en punkt med svensk text på båda uppslagen.
- `npm run check` stoppar okända platser och lägen utanför kartan, och `npm run verify` trycker på kartan och kontrollerar raden i urklippet.
- Raderna förs in av Claude enligt *Lägen på kartan* i [docs/arbetsflode.md](../docs/arbetsflode.md).

## Beslut

- 2026-10-17: Skylten genereras från innehållet på `/skyltar/` som A5, en per sida. QR-koden finns även som SVG för tryckerier.
- 2026-10-17: Skyltar för utkast märks *Provtryck, ej godkänd* och ska inte sättas upp.
- 2026-10-17: En uppsatt skylts adress ändras aldrig. Kontrollen stoppar varje ändring som skulle göra en uppsatt QR-kod oanvändbar.
- 2026-10-21: **Föreningen pekar ut lägen och etiketter som text**, rader som `320.144 nr 3 Ristningarna` från `/intern/karta/peka/` på Trello-kortet, i stället för foton av en utskrift (Alf). Lägena är bildpunkter på `content/karta/bas.svg`; byts underlaget behöver de räknas om.
- 2026-10-20: **QR-koderna i utkastbyggen leder till utkastet** (Alf). På `utkast.arterasen.se` leder de dit, på en grens förhandsvisning till den förhandsvisningen. Produktionen leder som förut till `info.arterasen.se`. Eftersom en sådan kod aldrig får sitta uppe är alla skyltar i ett utkastbygge märkta *Provtryck*, också för godkända platser (*Provtryck från utkastet*), och SVG-filerna för tryckeriet länkas bara från den publika `/skyltar/`.

## Att göra

- [ ] Vänta tills `info.arterasen.se` fungerar (initiativ 2) innan något trycks
- [ ] Provskylt i plastficka på en plats, eller en provkarta om kartan väljs. Testa med iPhone och Android, i sol och skugga. Fäboden går att nå så fort snön har smält, och fyra personer som bor nära kan hjälpa till att testa (E4). Namnen står i svaret, inte här.
- [ ] Be två tryckerier om pris på UV-tryck på aluminiumkomposit, A5, med UV-beständigt laminat. Länsstyrelsens leverantör kan vara ett alternativ (E1).
- [ ] Fråga husägarna om tillåtelse om det blir fasta skyltar. Egna stolpar, inte på husen (föreningen, E2). Ordföranden frågar ägarna.
- [ ] Ta reda på om länsstyrelsen har synpunkter, eftersom renoveringarna delvis betalas med deras bidrag. Ordföranden har kontakten och tar med dem i diskussionen om skyltar (E3).
- [ ] Redovisning till Vindkraftsfonden: kvitton och bilder som visar resultatet. Kvitton från privata leverantörer får vara egna (E1). Spara kvitton och ta bilder av kartan eller skyltarna på plats (föreningen).
- [ ] När skylten sitter uppe: flytta kortet till *Skylt uppsatt*. Claude lägger in den i `content/tryckta-skyltar.json`.
- [ ] Inför varje säsong: skanna alla skyltar och byt skadade
- [ ] Kartan: föreningen pekar ut var varje plats är på `/intern/karta/peka/` och klistrar in raderna på Trello-kortet *Karta med QR-koder*. Claude för in lägena i `content/karta/lagen.json` och sätter `exempel` till `false` när alla är utpekade.
- [ ] Kartan: välja uppslag 1 eller 2, och vad mer som ska synas (serveringen, parkeringen, stigens början, utsiktstornet). Sådant pekas ut på samma sätt och blir `etiketter`.
- [x] Kartan: ett sätt för föreningen att peka ut platser och etiketter som Claude kan läsa, `/intern/karta/peka/` (2026-10-21)
- [ ] Kartan: fråga Bägerfeldt vilken karta hans bild bygger på, innan något trycks (se *Öppna frågor*)

## Öppna frågor

- ~~Stolpar eller fäste på husen?~~ Stolpar (E2).
- Bärbar karta, fasta skyltar eller båda? Se *Väntar på beslut*.
- Hur många skyltar ryms i budgeten från Vindkraftsfonden? Svaret om bidraget (E1) nämner villkoren men inte beloppet.
- **Kartans underlag:** Bägerfeldts bild ser ut att bygga på en karta från Lantmäteriet. Lantmäteriets öppna data är CC0, men alla produkter är inte öppna (ortofoto kräver avgift och licens). Vilken karta han utgick från behöver vara känt innan kartan trycks. Är den inte fri finns OpenStreetMap eller en egen skiss som alternativ.
- **Etiketter på tre språk?** Etiketterna (parkering, servering) står bara på svenska på kartan. Räcker det, eller ska de ha engelska och tyska, eller symboler?
- **Norr uppåt?** Bägerfeldts bild har ingen norrpil. Kartan från 1827 är vriden så att norr är uppåt i hans skrift, och den nutida är troligen det också, men det är inte kontrollerat. Ingen norrpil i utkastet.
- Ska skyltarna ha föreningens logotyp? Föreningen räknar kohuvudet på Facebooksidan som logotyp och funderar på en ny (D6). Behövs som fil, helst SVG eller stor PNG.

## Logg

- 2026-10-17: Skyltmall i A5 med QR 72 mm, felkorrigering Q, titlar på tre språk. Alla QR-koder kontrollavkodade (Claude).
- 2026-10-19: Ordförandens svar E1–E4 och D6 inlagda. Föreningen lutar åt en bärbar karta med QR-koder i stället för fasta skyltar, och fasta skyltar i så fall på stolpar. Inget i mallen ändrat än (Claude).
- 2026-10-20: QR-koderna i utkastbyggen leder till utkastet, alla skyltar där märkta *Provtryck*. `npm run verify` avkodar nu skyltarna i både utkast- och produktionsbygget (Claude).
- 2026-10-20: Föreningen lutar åt laminerade A5 med QR-koder som delas ut till gästerna, kombinerade med en karta, inte helt bestämt (Alf). Numret låses inte förrän numren är bestämda (Claude).
- 2026-10-20: Löst utkast till en karta med QR-koder på `/intern/karta/`, två uppslag i A4, underlaget omritat ur Bägerfeldts skrift 66 s. 51, påhittade lägen. Trello-kortet *Karta med QR-koder (löst utkast)* med fem frågor till föreningen (Claude, på Alfs förslag).
- 2026-10-21: Fliken *Peka på kartan* på `/intern/karta/peka/`: tryck på kartan, skriv etikett och nummer, raden `320.144 nr 3 Ristningarna` kopieras för Trello. `etiketter` i `lagen.json` för sådant utan QR-kod, ritade på båda uppslagen. Kontroll av `lagen.json` i `npm run check` och test i `npm run verify` (Claude, på Alfs förslag).
