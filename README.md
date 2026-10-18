# Ärteråsen QR-information

QR-skyltar för besökare på Ärteråsens fäbod i Ore, Rättviks kommun. Varje skylt leder till en kort text om platsen på svenska, engelska eller tyska, beroende på besökarens telefon. Sajten byggs för Ärteråsens Kulturförening och ska vara på plats till säsongen 2027.

Repot är publikt. Allt här, även utkast och underlag, syns för alla.

- **Publik sajt:** https://info.arterasen.se/ (inte i gång än, se [plans/02-hosting.md](plans/02-hosting.md))
- **För volontärerna:** `/intern/` på sajten beskriver hur man skriver, granskar och sätter upp skyltar. Källan är [docs/intern/](docs/intern/).
- **Arbetsplan:** [PLAN.md](PLAN.md) med en delplan per initiativ i [plans/](plans/)
- **Rapporter:** vad som gjorts och vad som väntar, ett arbetspass i taget, i [rapporter/](rapporter/)
- **För AI-agenter:** [AGENTS.md](AGENTS.md)

## Läget just nu

Senast uppdaterad: 2026-10-18

- **Sajten** är byggd och testad i webbläsare, men ligger inte på nätet. DNS för arterasen.se ligger sedan 2026-10-18 i ett Cloudflare-konto som Alf har skapat och där föreningen får egna administratörer. Huvudsajten hos N.nu svarar som förut. Nästa steg är Pages-projektet i samma konto och adressen `info.arterasen.se`. Domänen förnyas automatiskt hos Name ISP.
- **Texterna:** fem platser finns som utkast på tre språk: Fäbodvallen, Eldhusen, Ristningarna, Källorna och Fjällkorna. Ingen är godkänd av föreningen. Flera fakta motsäger varandra mellan källorna och väntar på svar.
- **Underlaget** om fäboden är samlat i [docs/fakta.md](docs/fakta.md), [docs/kallor.md](docs/kallor.md) och [docs/bilder.md](docs/bilder.md). Fria museibilder och Lars Bägerfeldts skrifter ligger i [material/](material/).
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

Allt innehåll ligger som Markdown i `content/`. En liten Node-generator i `src/` bygger statiska sidor, QR-ingångar och utskrivbara skyltar till `dist/`. Cloudflare Pages ska bygga `main` till den publika sajten och varje annan gren till en egen förhandsvisning. Sidorna fungerar utan JavaScript och sparas för offlinebruk vid första besöket, eftersom täckningen på fäboden är svag.

## Innehåll i repot

| Sökväg | Vad |
| --- | --- |
| `content/` | Texterna: en mapp per plats i `content/platser/` med `sv.md`, `en.md` och `de.md`, startsidan, mallen och [listan över uppsatta skyltar](content/tryckta-skyltar.json) |
| `docs/` | Faktaunderlag, källor och bilder om fäboden, agentens arbetsflöde, mallen för Google Drive, och `docs/intern/` som blir `/intern/` på sajten |
| `material/` | Kopior av fria bilder och skrifter, med licens per fil i [material/hamta.json](material/hamta.json). Syns på GitHub men aldrig på sajten. Se [material/LASMIG.md](material/LASMIG.md). |
| `plans/` | En delplan per initiativ: mål, beslut, att göra, öppna frågor och logg |
| `rapporter/` | En rapport per arbetspass |
| `src/` | Generatorn, mallar, stil och service worker. Inga ramverk. |
| `tools/` | Webbläsartest, förhandsvisning som artifact, hämtning av material och kontrollen av den här filen |
| [site.config.json](site.config.json) | Adress, språk och länkar till Trello och Drive |

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
| `npm run build:preview` | Som granskningsversionen: utkast, källor och banner syns |
| `npm run build:cf` | Används av Cloudflare Pages. Väljer produktion eller förhandsvisning efter grenen. |
| `npm run ny -- <slug> "<Titel>"` | Ny plats från mallen |
| `npm run bild -- <fil> <slug>` | Krymper ett foto och tar bort GPS och annan metadata |
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
| `granskning` | Push till `main` | Speglar `main` till grenen `granskning`, som Cloudflare bygger som förhandsvisning med utkast |
| `hamta-material` | Push till andra grenar än `main` när `material/hamta.json` ändras | Hämtar filerna och committar dem till samma gren |

Ändringar som bara rör `content/` får Claude merga själv när `check` är grön. Allt annat granskas och mergas av Alf.

## Viktigt

- En QR-adress som sitter på en uppsatt skylt får aldrig sluta fungera. Uppsatta skyltar registreras i `content/tryckta-skyltar.json`, och `npm run check` stoppar varje ändring som skulle bryta en av dem.
- Domänen arterasen.se måste förnyas varje år. Går den ut slutar alla tryckta QR-koder att fungera.
- Inga lösenord, telefonnummer eller mejladresser i repot. Privatpersoner nämns bara om de har sagt ja.

## Rättigheter

Ingen licens är vald än. Det är en fråga för föreningen och Alf (se [plans/02-hosting.md](plans/02-hosting.md)). Tills dess gäller vanlig upphovsrätt: fråga innan du återanvänder texter eller kod.

Filerna i `material/` har egna villkor, som står per fil i `material/hamta.json`: museibilder med CC BY 4.0 eller Public Domain Mark, och Lars Bägerfeldts skrifter som får användas fritt i icke-kommersiellt syfte.

## Kontakt

- Om fäboden och föreningen: [arterasen.se/kontakt](https://www.arterasen.se/kontakt)
- Om sajten och koden: skapa ett ärende (issue) här på GitHub

## Den här filen

README uppdateras i samma PR som ändrar något den beskriver: kommandon, mappar, workflows, adresser eller läget. `npm run check:readme` körs i workflowen `check` och stoppar en PR där ett kommando, en mapp eller en workflow saknas här, där en länk är trasig, eller där *Läget just nu* är äldre än PLAN.md.
