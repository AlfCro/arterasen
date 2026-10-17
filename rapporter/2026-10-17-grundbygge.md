# Rapport 2026-10-17: Grundbygge

Arbetspass: 2026-10-17 21:44–22:35
Av: Claude
PR: #1
Initiativ: 01, 02, 03, 04, 05

## Sammanfattning

Grundbygget ligger i PR #1 och kontrollen i CI är grön: sajt, skyltar, arbetsflöde och planstruktur. Inget är publicerat ännu. Nästa steg är att Alf mergar, kopplar Trello och Google Drive till Claude och sätter upp Cloudflare och domänen.

## Gjort

- **Sajten.** En sida per plats på svenska, engelska och tyska. QR-koden pekar på `info.arterasen.se/<plats>/` och öppnar rätt språk. Sidorna sparas i telefonen vid första besöket, så att nästa skylt går att läsa utan täckning.
- **Skyltar.** A5 med nummer, namn på tre språk och QR-kod på 72 mm. Utkast märks *Provtryck*.
- **Godkännande.** Utkast syns bara i förhandsvisningar. Den publika sajten visar bara platser som är godkända på alla språk.
- **Skydd.** `npm run check` stoppar bygget om adressen till en uppsatt skylt skulle sluta fungera, och om texter saknar språk, har dubbla nummer, innehåller HTML eller har bilder utan fotograf.
- **Planstruktur.** `AGENTS.md` (med `CLAUDE.md` som importerar den) pekar på `PLAN.md`, som har fem initiativ med en delplan vardera i `plans/`. `docs/arbetsflode.md` beskriver hur Claude hanterar Trello-korten.
- **Interna sidor.** `/intern/` byggs från `docs/intern/`: hur man skriver, granskar och sätter upp skyltar, statustabell och en sida för ändringar i arbetssättet.
- **Innehåll.** Fem exempelplatser som utkast med källor: Fäbodvallen, Eldhusen, Ristningarna, Källorna och Fjällkorna. Uppgifter som inte gick att belägga ströks.
- **Överlämning.** Allt som behövs för att fortsätta i en ny session finns i repot:
  - `docs/fakta.md`: allt insamlat underlag med källor, obekräftade uppgifter och motsägelser
  - `npm run verify` (`tools/verify.mjs`): samma webbläsartester som kördes i det här passet
  - avsnittet *Miljön i Claude-sessioner* i `AGENTS.md`: GitHub-begränsningar, grund klon, kopplingar
  - rapporterna i `rapporter/`, länkade från `PLAN.md`

## Beslut

- **Trello + Google Drive** för volontärerna (Alf).
- **Cloudflare Pages** som hosting, med förhandsvisning per gren (Alf).
- **`info.arterasen.se`** som adress på skyltarna (Alf).
- **Claude publicerar direkt** efter godkännande på Trello, men bara ändringar under `content/`. Kod går via Alf (Alf).
- **Interna sidor på sajten** för all kommunikation om arbetssättet (Alf). Sidan är olistad men publik, så lösenord och telefonnummer hör inte hemma där. Frågor och diskussion sker som kommentarer på Trello-korten. Ändringar i arbetssättet skrivs upp på `/intern/nytt/`.
- **Jira-kopplingen** tillhör Lunds universitet och används inte för föreningen (Claude).
- **Typsnitt.** IM Fell English till rubriker med siffror från EB Garamond, eftersom IM Fells etta ser ut som ett I. Lexend till brödtext, eftersom Atkinson Hyperlegible har överstruken nolla som störde i årtal (Claude).
- **Rapporter.** Varje arbetspass avslutas med en rapport i `rapporter/` som länkas från `PLAN.md` (Alf).

## Kontrollerat

- `npm run check`, `npm run build`, `npm run build:preview` och `npm run dev`
- Skärmdumpar i 390 px i ljust och mörkt läge, statussidan i 1024 px och skyltarna som A5-PDF
- Alla fem QR-koderna avkodade från de renderade skyltarna till rätt adress
- I Chromium: offline (andra skanningen och språkbyte i flygplansläge), språkminne mellan skyltar, flyttad skylt och 404
- Skydden i `npm run check` provade med fyra trasiga indata, alla stoppades
- `npm run verify` går igenom utan fel
- `npm audit`: 0 sårbarheter, efter att gray-matter bytts mot `yaml` och sharp uppgraderats till 0.35.5

## Väntar på

- [ ] Granska och merga PR #1 (Alf)
- [ ] Ge GitHub Actions skrivrättighet under *Settings → Actions → General → Workflow permissions*, så att `granskning`-grenen kan uppdateras (Alf)
- [ ] Koppla Trello och Google Drive till Claude på claude.ai. Därefter skapar Claude tavlan, Drive-mappen och mallen och sätter upp den dagliga genomgången (Alf)
- [ ] Skapa ett Cloudflare-konto och koppla repot, cirka 15 minuter, se `plans/02-hosting.md` (Alf)
- [ ] Lägg in en post hos Loopia: underdomän `info`, typ CNAME, värde `arterasen-info.pages.dev` (domänägaren)
- [ ] Slå på automatisk förnyelse av arterasen.se hos Loopia. Om domänen löper ut slutar alla tryckta QR-koder att fungera (domänägaren)
- [ ] Faktagranska utkasten innan några skyltar trycks. Det blir det första testet av hela flödet (föreningen)

## Öppna frågor

- **Hundar:** arterasen.se säger vecka 32–33, Visit Dalarna säger förbjudet helt. Vad gäller? (föreningen)
- **Korna:** kommer de från Sunnanheds fjällkor, och får det stå? (föreningen)
- **36 brukare kring 1850:** stämmer det? (föreningen)
- **Äldsta ristningen 1662:** sitter den i den äldsta mjölkstugan, och syns den för besökare? (föreningen)
- **Fäbodstigen:** startpunkt och längd? (föreningen)
- **Godkännande:** vem får godkänna, och ska det vara en annan person än den som skrev? (Alf, föreningen)
- **Cloudflare-kontot:** vem i föreningen har reservinloggning? (Alf)

## Källor

- [Ärteråsen, startsida](https://www.arterasen.se/)
- [Om Ärteråsen](https://www.arterasen.se/om-arterasen)
- [Visit Dalarna, Ärteråsens fäbod](https://visitdalarna.se/en/do/attractions/arterasens-summer-farm)
- [Swedish Spoon, Ärteråsen summer farm](https://swedishspoon.com/arterasen-summer-farm)
- [Regeringen, Fäbodbruk på Unescos lista](https://regeringen.se/pressmeddelanden/2024/12/fabodbruk--en-del-av-mansklighetens-immateriella-kulturarv/)
