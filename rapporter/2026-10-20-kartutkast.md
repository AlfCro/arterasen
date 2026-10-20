# Rapport 2026-10-20: Kartutkast

Arbetspass: 2026-10-20 23:02–23:35
Av: Claude
PR: grenen `claude/karta-utkast`
Initiativ: 05

## Sammanfattning

Alf frågade hur en laminerad karta med QR-koder kan lösas visuellt. Underlaget fanns redan: Lars Bägerfeldts karta över husen i dag, skrift 66 s. 51. Den är omritad som SVG, och ett löst utkast med två uppslag i A4 ligger på `/intern/karta/`. Lägena är påhittade tills föreningen har pekat ut platserna, och frågorna står på ett nytt Trello-kort.

## Gjort

- **Underlaget:** `tools/karta-vektorisera.py` ritar om bilden på s. 51 genom färgsegmentering: öppen mark som en utjämnad yta, 48 hus som roterade rektanglar, höjdkurvorna i skogen som linjer. Bägerfeldts gula markeringar runt eldhusen fylls i efter omgivningen. Resultatet är `content/karta/bas.svg`, 11 kB, i sajtens färger.
- **Lägena:** `content/karta/lagen.json`, i bildpunkter på underlaget, med `"exempel": true`. Alla nio lägen är påhittade.
- **Sidan:** `src/map.mjs`, fliken *Karta, utkast* på `/intern/karta/`. Uppslag 1 är allt på ett blad: kartan i mitten, en ruta med QR-kod (25 mm) per plats runt om och ett streck in till platsens cirkel. Rutorna fördelas i vinkelordning runt kartans mitt med en liten DP, så att strecken sällan korsar varandra. Uppslag 2 är en större karta med siffror och en lista fram, och ett rutnät med koder (36 mm) bak. Båda har en kod till startsidan med texten att skanna den först där det finns täckning. Varje blad är stämplat *Löst utkast · lägena är påhittade*. I produktion visas bara godkända platser, annars en länk till utkastet.
- **Utskrift:** namngiven sida `@page karta` i A4, så att skyltarna fortfarande skrivs ut i A5.
- **`npm run verify`** avkodar nu också alla QR-koder på kartan, i utkastet och i produktion, och sparar `karta.pdf`.
- **Trello:** kortet [Karta med QR-koder (löst utkast)](https://trello.com/c/7QfVyuMu/23-karta-med-qr-koder-l%C3%B6st-utkast) överst i *Idéer och frågor*, med länk till förhandsvisningen och fem frågor.
- `/intern/`: avsnittet *Karta i stället för skyltar?* i [Skyltar](../docs/intern/30-skyltar.md) och en punkt i [Nytt](../docs/intern/90-nytt.md).
- [plans/05-skyltar.md](../plans/05-skyltar.md), PLAN.md, README och AGENTS.md.

## Beslut

- Alf 2026-10-20: lägga ett utkast under `/intern/`, tydligt märkt som löst utkast.
- Claude: **koderna sitter inte på platserna** utan i rutor runt kartan med streck in. Husen står 10–30 m isär och en läsbar kod behöver drygt 2 cm, så koder på platserna skulle täcka vallen. Kan ändras.
- Claude: **lägena står i `content/karta/lagen.json`, inte i `sv.md`**, så länge de inte är utpekade av föreningen. Ingen norrpil, eftersom det inte är kontrollerat att Bägerfeldts bild har norr uppåt.

## Kontrollerat

- Underlaget jämfört med originalbilden: vallens form, husen och höjdkurvorna stämmer i stort. Hus som skyms av Bägerfeldts markeringar kan saknas eller ha fel form.
- Alla 20 QR-koder på sidan avkodade med jsQR, i utkastet (leder till `utkast.arterasen.se`) och i produktion med alla platser godkända (leder till `info.arterasen.se`).
- PDF ur Chrome: tre sidor A4. Sidan i 390 px utan sidledsscroll, bladen förminskade.
- `npm run check`, `npm run check:readme`, `npm run build`, `npm run build:preview` och `npm run verify` gröna.
- README.md stämmer med ändringarna (`npm run check:readme`).

## Väntar på

- [ ] Alf: granska och merga PR:en
- [ ] Föreningen: peka ut platserna på kartan, välja uppslag och svara på frågorna på Trello-kortet
- [ ] Alf eller föreningen: fråga Lars Bägerfeldt vilken karta bilden bygger på

## Öppna frågor

Till föreningen, på Trello-kortet:

1. Var är varje plats? Rita på en utskrift och bifoga en bild.
2. Uppslag 1 eller 2?
3. Stämmer husen, saknas något eller finns något som är borta?
4. Vad mer ska synas: serveringen, parkeringen, var stigen kommer in, utsiktstornet?
5. Behåller gästerna kartan eller lämnar de tillbaka den?

Till Alf:

- Bägerfeldts bild ser ut att bygga på en karta från Lantmäteriet. Lantmäteriets öppna data är CC0, men alla produkter är inte öppna. Ska vi fråga honom innan något trycks, eller rita underlaget från OpenStreetMap eller en egen skiss?
- Bägerfeldt har en egen numrering av husen och bokstäverna från 1827 i texten kring kartan. Kan den hjälpa föreningen att peka ut platserna, till exempel som en utskrift med hans nummer?

## Källor

- Lars Bägerfeldt, *Historisk vandring runt Ärteråsens fäbod* (2025-12-26), s. 50–51, `material/skrifter/bagerfeldt-66-historisk-vandring-runt-arterasens-fabod-2025-12-26.pdf`
- [Lantmäteriet: öppna data](https://lantmateriet.se/en/geodata/geodata-products/open-data)
- [Lantmäteriet: ortofoto](https://lantmateriet.se/en/geodata/geodata-products/product-list/orthophoto)
