# Ärteråsen QR-information

QR-skyltar för besökare på Ärteråsens fäbod i Ore, Rättviks kommun. Varje skylt leder till en kort text om platsen på svenska, engelska eller tyska, beroende på besökarens telefon. Sajten byggs för Ärteråsens Kulturförening och ska vara på plats till säsongen 2027.

Repot är publikt. Allt här, även utkast och underlag, syns för alla.

- **Publik sajt:** https://info.arterasen.se/ (bara godkända platser, ingen är godkänd än)
- **Utkast:** https://utkast.arterasen.se/ visar alla platser, också de som inte är godkända. Det är granskningsversionen som föreningen läser.
- **För volontärerna:** `/intern/` på sajten beskriver hur man skriver, granskar och sätter upp skyltar. Källan är [docs/intern/](docs/intern/).
- **Arbetsplan:** [PLAN.md](PLAN.md) med en delplan per initiativ i [plans/](plans/)
- **Rapporter:** vad som gjorts och vad som väntar, ett arbetspass i taget, i [rapporter/](rapporter/)
- **För AI-agenter:** [AGENTS.md](AGENTS.md)
- **Drift och konton:** beskrivs i ett separat, privat repo, `AlfCro/arterasen-config`. Se [Drift och konfiguration](#drift-och-konfiguration).

## Läget just nu

Senast uppdaterad: 2026-10-19

- **Sajten** ligger på nätet sedan 2026-10-18: `info.arterasen.se` och `utkast.arterasen.se`, två Cloudflare Pages-projekt som bygger `main`. DNS för arterasen.se ligger i ett Cloudflare-konto som Alf har skapat och där föreningen får egna administratörer. Huvudsajten hos N.nu ligger kvar. Domänen förnyas automatiskt hos Name ISP.
- **Texterna:** fem platser finns som utkast på tre språk: Fäbodvallen, Eldhusen, Ristningarna, Källorna och Fjällkorna. Ingen är godkänd av föreningen. Flera fakta motsäger varandra mellan källorna och väntar på svar.
- **Fritt material används direkt i utkasten** sedan 2026-10-18: bilder och uppgifter med fri licens eller fria villkor väntar inte på svar. Sedan 2026-10-19 har fyra av fem platser museibilder, upp till fyra extra bilder per plats och fler faktarader. Källorna saknar fortfarande bild. Ristningarna, Eldhusen och Fjällkorna bygger också på Lars Bägerfeldts skrifter. Upphovspersonen kontaktas parallellt, och för en privatperson ska det vara gjort innan platsen godkänns.
- **Licens** sedan 2026-10-18: MIT för koden och CC BY 4.0 för texterna, se [LICENSER.md](LICENSER.md).
- **Underlaget** om fäboden är samlat i [docs/fakta.md](docs/fakta.md), [docs/kallor.md](docs/kallor.md) och [docs/bilder.md](docs/bilder.md). Fria museibilder och Lars Bägerfeldts skrifter ligger i [material/](material/).
- **Fler skyltar:** tolv förslag ur Lars Bägerfeldts skrifter sedan 2026-10-19, med innehåll, placering och sidhänvisningar, i [docs/underlag/2026-10-19-fler-skyltar.html](docs/underlag/2026-10-19-fler-skyltar.html). Föreningen väljer vilka som blir skyltar.
- **Volontärflödet** med Trello och Google Drive är inte i gång. Kopplingarna till Claude saknas.
- **Väntar på föreningen:** svar om konton, källor, bilder och fakta. Frågorna skickades till ordföranden 2026-10-18.

Detaljer, vem som gör vad och tidslinje: [PLAN.md](PLAN.md) och den senaste rapporten.

## Så fungerar det

```
Volontär skriver i Google Drive ──► Trello-kort "Klar för Claude"
        ▲                                     │
        │                                     ▼
  kommentar på kortet              Claude gör sida + översätter,
        │                          lägger förhandsvisning på kortet
        │                                     │
        └──────── "Granska" ◄─────────────────┘
                     │ föreningen godkänner
                     ▼
              Claude publicerar ──► info.arterasen.se ──► skylt skrivs ut
```

Allt innehåll ligger som Markdown i `content/`. En liten Node-generator i `src/` bygger statiska sidor, QR-ingångar och utskrivbara skyltar till `dist/`. Cloudflare Pages bygger `main` två gånger: till den publika sajten `info.arterasen.se` och, med utkast synliga, till `utkast.arterasen.se`. Varje annan gren får en egen förhandsvisning under `arterasen-info.pages.dev`. En merge till `main` publicerar alltså. Sidorna fungerar utan JavaScript och sparas för offlinebruk vid första besöket, eftersom täckningen på fäboden är svag.

## Innehåll i repot

| Sökväg | Vad |
| --- | --- |
| `content/` | Texterna: en mapp per plats i `content/platser/` med `sv.md`, `en.md` och `de.md`, startsidan, mallen och [listan över uppsatta skyltar](content/tryckta-skyltar.json) |
| `docs/` | Faktaunderlag, källor och bilder om fäboden, agentens arbetsflöde, mallen för Google Drive, `docs/intern/` som blir `/intern/` på sajten, och underlag till föreningen i [docs/underlag/](docs/underlag/) |
| `material/` | Kopior av fria bilder och skrifter, med licens per fil i [material/hamta.json](material/hamta.json). Syns på GitHub. En bild som ska visas på sajten krymps först till `content/` med `npm run bild`. Se [material/LASMIG.md](material/LASMIG.md). |
| `plans/` | En delplan per initiativ: mål, beslut, att göra, öppna frågor och logg |
| `rapporter/` | En rapport per arbetspass |
| `src/` | Generatorn, mallar, stil och service worker. Inga ramverk. |
| `tools/` | Webbläsartest, förhandsvisning som artifact, hämtning av material och kontrollen av den här filen |
| [site.config.json](site.config.json) | Adress, språk, textlicens och länkar till Trello och Drive |
| [LICENSE](LICENSE), [LICENSER.md](LICENSER.md) | MIT för koden, CC BY 4.0 för texterna, och undantagen |

## Utveckling

Kräver Node 20 eller senare. CI och Cloudflare använder versionen i [.node-version](.node-version).

```sh
npm ci
npm run dev        # http://localhost:8080, utkast syns
```

| Kommando | Vad det gör |
| --- | --- |
| `npm run dev` | Lokal förhandsvisning med utkast, källor och banner synliga |
| `npm run check` | Validerar allt innehåll. Måste vara grönt. |
| `npm run check:readme` | Kontrollerar att den här filen stämmer med repot, se sista avsnittet |
| `npm run build` | Produktion till `dist/`: bara platser som har status `klar` på alla språk |
| `npm run build:preview` | Som `utkast.arterasen.se`: utkast, källor och banner syns. Används av Pages-projektet för utkasten. |
| `npm run build:cf` | Används av Pages-projektet för den publika sajten. Väljer produktion på `main` och förhandsvisning på andra grenar. |
| `npm run ny -- <slug> "<Titel>"` | Ny plats från mallen |
| `npm run bild -- <fil> <slug> [namn]` | Krymper ett foto och tar bort GPS och annan metadata. Utan namn blir det platsens huvudbild `bild.jpg`, med till exempel `bild-2` en extra bild under `fler_bilder`. |
| `npm run verify -- --out=<mapp>` | Webbläsartest: skärmdumpar i mobilbredd, skyltar som PDF, QR-avkodning och offline. Kräver Chromium för Playwright. |
| `npm run hamta` | Laddar ner filerna i `material/hamta.json`. Körs normalt av workflowen `hamta-material`. |

Testa QR-koderna med en telefon i samma nätverk:

```sh
SITE_URL=http://<din-dators-ip>:8080/ npm run dev
```

Öppna sedan `/skyltar/` och skanna en kod.

## Lägga till en plats

```sh
npm run ny -- karles-lada "Karles lada"
npm run bild -- ~/Bilder/lada.jpg karles-lada
```

Fyll i `content/platser/karles-lada/{sv,en,de}.md`. Platsen syns bara i förhandsvisningar tills `status: klar` står i alla tre filerna. Normalt sköter Claude detta utifrån Trello-korten, se [docs/arbetsflode.md](docs/arbetsflode.md).

## GitHub Actions

| Workflow | Körs | Gör |
| --- | --- | --- |
| `check` | Varje PR och push till `main` | `npm run check`, `npm run check:readme`, produktionsbygge och förhandsbygge |
| `hamta-material` | Push till andra grenar än `main` när `material/hamta.json` ändras | Hämtar filerna och committar dem till samma gren |

Ändringar som bara rör `content/` får Claude merga själv när `check` är grön. Allt annat granskas och mergas av Alf.

## Viktigt

- En QR-adress som sitter på en uppsatt skylt får aldrig sluta fungera. Uppsatta skyltar registreras i `content/tryckta-skyltar.json`, och `npm run check` stoppar varje ändring som skulle bryta en av dem.
- Domänen arterasen.se måste förnyas varje år. Går den ut slutar alla tryckta QR-koder att fungera.
- Inga lösenord, telefonnummer eller mejladresser i repot. Privatpersoner nämns bara om de har sagt ja.

## Rättigheter

Koden har licensen [MIT](LICENSE) och texterna [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.sv). Du får alltså återanvända båda, också kommersiellt, om du anger Ärteråsens Kulturförening som källa. Detaljer och undantag: [LICENSER.md](LICENSER.md).

Bilderna på sajten har egna villkor, som står under varje bild och i platsens `sv.md`. Filerna i `material/` har också egna villkor, per fil i `material/hamta.json`: museibilder med CC BY 4.0 eller Public Domain Mark, och Lars Bägerfeldts skrifter som får användas fritt i icke-kommersiellt syfte.

## Drift och konfiguration

Uppgifter om driften står inte i det här repot utan i ett privat repo, `AlfCro/arterasen-config`: DNS-zonen för arterasen.se, inställningarna i Cloudflare och för Pages-projekten, vem som har inloggning var, och checklistor för ändringar. Det är privat eftersom det beskriver konton och personer, och det innehåller inga lösenord eller nycklar. Alf ger åtkomst till den som behöver det för föreningens räkning.

Det som behövs för att förstå och bygga sajten finns här: adresserna och byggkommandona ovan, [site.config.json](site.config.json) och planerna för [hosting](plans/02-hosting.md).

## Kontakt

- Om fäboden och föreningen: [arterasen.se/kontakt](https://www.arterasen.se/kontakt)
- Om sajten och koden: skapa ett ärende (issue) här på GitHub

## Den här filen

README uppdateras i samma PR som ändrar något den beskriver: kommandon, mappar, workflows, adresser eller läget. `npm run check:readme` körs i workflowen `check` och stoppar en PR där ett kommando, en mapp eller en workflow saknas här, där en länk är trasig, eller där *Läget just nu* är äldre än PLAN.md.
