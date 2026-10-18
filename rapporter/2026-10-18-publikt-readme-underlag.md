# Rapport 2026-10-18: Publikt repo, README och frågor till föreningen

Arbetspass: 2026-10-18 07:32–07:55
Av: Claude
PR: #4
Initiativ: 02, 03, 04

## Sammanfattning

Repot är publikt sedan i morse, och det som förutsatte ett privat repo är rättat. README var flera arbetspass efter och är omskriven med ett avsnitt om läget just nu. En ny kontroll i CI, `npm run check:readme`, stoppar framöver en PR där README har halkat efter. Frågorna till föreningen är samlade i ett underlag till ordföranden, som en självständig HTML-fil som skickades till Alf och som inte ligger i repot.

## Gjort

- **Publikt repo.** `material/LASMIG.md` sa att inget i mappen publiceras; nu står det att allt där syns på GitHub och att bara filer som får spridas läggs dit. Nytt avsnitt *Repot är publikt* i `AGENTS.md`. Två onödiga personuppgifter omskrivna: vem i Alfs familj som står på domänen (`plans/02-hosting.md`) och Alfs arbetsgivare (`AGENTS.md`, `plans/03-innehallsflode.md`). Volontärerna får veta att deras texter syns för alla när Claude har gjort en sida av dem (`docs/intern/10-skriva.md`, `docs/intern/90-nytt.md`).
- **`plans/02-hosting.md`:** nytt avsnitt *GitHub nu när repot är publikt* med regel för `main`, licens, mejladress i commits och en bild med osäker upphovsrätt. Huvudsajten arterasen.se visade sig vara byggd i N.nu, vilket står under *Förutsättningar*.
- **README** omskriven: läget just nu, innehåll i repot, alla kommandon, de tre workflowerna, rättigheter och kontakt.
- **README hålls uppdaterad:** `tools/check-readme.mjs` (`npm run check:readme`) kräver att README nämner varje npm-skript, varje mapp och varje workflow, att relativa länkar fungerar och att *Läget just nu* inte är äldre än PLAN.md. Körs i workflowen `check`. Regeln står i `AGENTS.md` steg 4, i PR-mallen och i rapportmallen.
- **Underlag till ordföranden:** `arterasen-qr-fragor-till-ordforanden-2026-10-18.html`, skickad till Alf. 387 kB med typsnitt och bilder inbäddade. Innehåll nedan under *Öppna frågor*. Mottagaren kan skriva svar i rutor och samla dem till ett mejl.

## Beslut

- **Underlag till enskilda personer läggs inte i repot** när repot är publikt. De skickas som fil till Alf eller skrivs som Claude Docs (Claude, `AGENTS.md`). Alf bad om en självständig HTML-fil.
- **Ingen licensfil** läggs till förrän Alf och föreningen har bestämt (Claude). Frågan står i underlaget och i `plans/02-hosting.md`.
- Personuppgifterna i `plans/02-hosting.md` och `AGENTS.md` är omskrivna utan att besluten ändrats. Alf kan återställa dem i PR:en om han vill ha dem kvar.

## Kontrollerat

- `npm run check`, `npm run check:readme`, `npm run build` och `npm run verify` gröna.
- `check:readme` på gamla README gav 11 fel (fem kommandon, två mappar, tre workflows, inget läge). Mot en kopia med påhittade fel hittade den saknat kommando, ny mapp, trasig länk och för gammalt läge.
- Git-historiken genomsökt efter lösenord, nycklar, telefonnummer och mejladresser: inget hittat. Alfs mejladress finns i fyra merge-commits som gjorts i webbläsaren.
- Workflowerna granskade för publikt repo: ingen `pull_request_target`, `check` har bara läsrättighet, skrivande workflows körs bara på push.
- Underlaget renderat i Chromium i 390 px ljust och mörkt och i 1280 px: inga skriptfel, inga externa anrop, ingen sidledsscroll, alla fyra typsnitt laddade. Svarsrutorna sparas vid omladdning och *Samla svaren* ger rätt text. Utskrift till A4 granskad.
- Fakta i underlaget kontrollerade mot `docs/fakta.md` och `docs/bilder.md`. Att Brita Eriksdotters föräldrar hade fäbodgård 2 är en verktygssammanfattning av Bägerfeldt och står som "ska kontrolleras".
- README.md stämmer med ändringarna (`npm run check:readme`).

## Väntar på

- [ ] Granska och merga PR #4 (Alf)
- [ ] Skicka underlaget till ordföranden (Alf)
- [ ] Regel för `main` under *Settings → Rules → Rulesets*: blockera force push och radering, kräv grön `check`, inget krav på granskare (Alf). Gick inte att sätta härifrån.
- [ ] Bestäm om bilden Vlm-Blom 2281 ska tas bort ur `material/` (Alf)
- [ ] Bestäm licens för kod och texter (Alf, föreningen)
- [ ] Svar på underlaget (ordföranden och föreningen)

## Öppna frågor

Frågorna i underlaget till ordföranden, i korthet. De fem viktigaste är A1, A2, A3, B1 och E1.

- **A. Domän och konton:** A1 vem sköter arterasen.se (N.nu) och har Cloudflare-kontot. A2 ska domänen stå på föreningen, vem betalar, automatisk förnyelse. A3 info.arterasen.se och utkast.arterasen.se. A4 gemensam mejladress för föreningen. A5 andra person med inloggning. A6 Google-konto för föreningen.
- **B. Källor och tillstånd:** B1 Lars Bägerfeldt (fakta, foton, kopiorna i det publika repot). B2 fotografer och original för hemsidans bilder och fotogalleriet. B3 Facebooksidans innehåll. B4 museibilden från 2018 där ordföranden syns med fjällkorna. B5 Sunnanheds fjällkor på skylten. B6 Ores hembygdsförening och berättare i bygden. B7 Brita Eriksdotter på skylten om ristningarna.
- **C. Fakta:** C1 fäbodens ålder. C2 antal eldhus vid storhetstiden. C3 36 brukare eller 36 ägare 1827. C4 1953 eller 1954. C5 hundar. C6 fäbodstigens längd och start. C7 300 eller 500 m från parkeringen. C8 var ristningen från 1662 sitter och om den syns. C9 vilka källor som rinner.
- **D. Beslut:** D1 platslista och numrering. D2 vem som godkänner. D3 skribenter och granskare av engelska och tyska. D4 licens för texterna. D5 besöksstatistik utan kakor. D6 logotyp.
- **E. Skyltar och pengar:** E1 Vindkraftsfonden: budget, villkor, tidsfrist, kontakt på kommunen, koppling till informationsbladen. E2 husägare och markägare. E3 länsstyrelsen. E4 provskylt våren 2027.

## Källor

- [arterasen.se/kontakt](https://www.arterasen.se/kontakt): ingen webbansvarig namngiven, metataggen anger N.nu
- Övriga källor till underlaget: [docs/fakta.md](../docs/fakta.md), [docs/kallor.md](../docs/kallor.md), [docs/bilder.md](../docs/bilder.md)
