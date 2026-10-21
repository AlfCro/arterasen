# Rapport 2026-10-21: Peka på kartan

Arbetspass: 2026-10-21 10:17–10:50
Av: Claude
PR: #19
Initiativ: 05

## Sammanfattning

Alf ville ha ett sätt för föreningen att säga var platserna ligger och vilka etiketter de ska ha, till exempel "320.144 Ristningar", gärna genom att klicka på en karta och få raden i urklipp, med numret. Det finns nu som fliken *Peka på kartan* på `/intern/karta/peka/`. Raderna klistras in på Trello-kortet, och Claude för in dem i `content/karta/lagen.json`. Det ersätter frågan om att rita på en utskrift och bifoga ett foto, som Claude inte kan läsa från sessionen.

## Gjort

- **Sidan** `/intern/karta/peka/` ([src/map-point.mjs](../src/map-point.mjs) och [src/map-point.js](../src/map-point.js)): underlaget med rutnät var 50:e punkt och siffror var hundrade längs över- och vänsterkanten, i samma bildpunkter som `lagen.json`. Ett tryck på kartan ger läget `x.y`, med ett sikte och läget utskrivet. Fälten *Vad ska stå på kartan?* (förslag med platsernas titlar) och *Nummer* (fylls i av sig självt för en känd plats). *Lägg till och kopiera* lägger raden `320.144 nr 3 Ristningarna` i urklipp. Listan sparas i webbläsaren, varje rad kan tas bort, och *Kopiera alla rader* kopierar allt på en gång. Går kopieringen inte visas texten markerad för att kopiera för hand.
- **Förstoring** med + och − upp till fyra gånger, centrerad på den valda punkten. I full bredd på en telefon träffar ett finger på ungefär ±10 m, och husen står 10–30 m isär.
- **Utan JavaScript** syns rutnätet med en instruktion att läsa av siffrorna och skriva raden själv.
- **Påhittade lägen visas inte** på sidan. När `exempel` är `false` visas lägena som de står, i samma radformat, så att föreningen kan rätta dem.
- **Etiketter** för sådant utan QR-kod: `etiketter` i `content/karta/lagen.json` med `text` och `lage`, ritade som en punkt med svensk text på båda uppslagen på `/intern/karta/`. Listan är tom; inget är utpekat än.
- **Kontroll** i `npm run check`: lägen för platser som inte finns, lägen utanför kartan och felaktiga etiketter stoppar bygget.
- **Test** i `npm run verify`: trycker på kartan vid 320.144, väljer den första platsen, kontrollerar läget, numret, raden i urklippet och att listan finns kvar efter omladdning. Två nya skärmdumpar i 390 px, ljust och mörkt.
- Fliken *Peka på kartan* i den interna menyn och en länk från *Karta, utkast*. Länken till Trello-kortet står i `site.config.json` under `intern.kartaKortUrl`.
- **Dokumentation:** avsnittet *Peka ut platserna* i [Skyltar](../docs/intern/30-skyltar.md), en punkt i [Nytt](../docs/intern/90-nytt.md), rutinen *Lägen på kartan* i [docs/arbetsflode.md](../docs/arbetsflode.md), [plans/05-skyltar.md](../plans/05-skyltar.md), PLAN.md, README och AGENTS.md.

## Beslut

- Alf 2026-10-21: föreningen pekar ut lägen och etiketter som text, med klick på en karta och raden i urklipp, numret med. Infört i *Beslut* i plans/05.
- Claude: **formatet** `x.y nr N Text`, med läget först som i Alfs exempel och `nr` framför numret så att en etikett som börjar med en siffra inte blandas ihop med numret. Läget är bildpunkter på `bas.svg`, så det går rakt in i `lagen.json` utan omräkning. Byts underlaget måste lägena räknas om.
- Claude: **varje tryck kopierar bara sin egen rad**, och *Kopiera alla rader* finns för den som pekar ut allt först. Annars skulle den som klistrar in efter varje plats få dubbletter.
- Claude: **etiketter för platser** följer platsens titel. En egen kortare text på kartan för en plats (till exempel *Ristningar* i stället för *Ristningarna*) går att lägga till om föreningen vill ha det.

## Kontrollerat

- Trycket ger rätt läge: i testet gav ett tryck på 320.144 läget 319.144 (en skärmpunkt är ungefär tre kartpunkter i 390 px). Efter förstoring till tre gånger hamnar den valda punkten mitt i rutan, och ett nytt tryck träffar inom några punkter.
- Etiketterna provade med två tillfälliga etiketter på båda uppslagen, inte committade. På uppslag 1 ritas de ovanpå strecken.
- Kontrollen provad med en okänd plats, ett läge utanför kartan och en trasig etikett: fyra fel, som väntat.
- Sidan i 390 px i ljust och mörkt läge, utan sidledsscroll, och med lägen som inte är påhittade (tillfälligt `exempel: false`).
- `npm run check`, `npm run check:readme`, `npm run build`, `npm run build:preview` och `npm run verify` gröna.
- README.md stämmer med ändringarna (`npm run check:readme`).

## Väntar på

- [ ] Alf: granska och merga PR #19
- [ ] Föreningen: peka ut platserna och etiketterna på `/intern/karta/peka/` och klistra in raderna på kortet [Karta med QR-koder (löst utkast)](https://trello.com/c/7QfVyuMu)
- [ ] Claude, när raderna kommer: föra in dem enligt *Lägen på kartan* i docs/arbetsflode.md

## Öppna frågor

- Ska etiketterna (parkering, servering) stå på tre språk, eller räcker svenska eller symboler? (föreningen)
- Kopieringen till urklipp är provad i Chromium. I Safari på iPhone kräver den https och ett tryck, vilket sidan har, men den är inte provad på en riktig telefon. (Alf, gärna på mobilen efter merge)
