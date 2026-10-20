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

Senast uppdaterad: 2026-10-20

- **Sajten** ligger på nätet sedan 2026-10-18: `info.arterasen.se` och `utkast.arterasen.se`, två Cloudflare Pages-projekt som bygger `main`. DNS för arterasen.se ligger i ett Cloudflare-konto som Alf har skapat och där föreningen får egna administratörer. Huvudsajten hos N.nu ligger kvar. Domänen förnyas automatiskt hos Name ISP.
- **Texterna:** nio platser finns som utkast på tre språk: Fäbodvallen, Eldhusen, Ristningarna, Källorna och Fjällkorna, och sedan 2026-10-19 Boden med figurristningarna, Mjölkboden och svalen, Kartan från 1827 och Fäbodstigen. Ingen är godkänd av föreningen. Föreningen har avgjort de flesta motsägelserna mellan källorna (2026-10-19), och utkasten följer svaren sedan 2026-10-19. Kvar: när bruket upphörde och vilka källor som rinner.
- **Fritt material används direkt i utkasten** sedan 2026-10-18: bilder och uppgifter med fri licens eller fria villkor väntar inte på svar. Sedan 2026-10-19 har fyra av fem platser museibilder, upp till fyra extra bilder per plats och fler faktarader. Källorna saknar fortfarande bild. Ristningarna, Eldhusen och Fjällkorna bygger också på Lars Bägerfeldts skrifter. Upphovspersonen kontaktas parallellt, och för en privatperson ska det vara gjort innan platsen godkänns.
- **Licens** sedan 2026-10-18: MIT för koden och CC BY 4.0 för texterna, se [LICENSER.md](LICENSER.md).
- **Underlaget** om fäboden är samlat i [docs/fakta.md](docs/fakta.md), [docs/kallor.md](docs/kallor.md) och [docs/bilder.md](docs/bilder.md). Fria museibilder och Lars Bägerfeldts skrifter ligger i [material/](material/).
- **Fler skyltar:** tolv förslag ur Lars Bägerfeldts skrifter sedan 2026-10-19, med innehåll, placering och sidhänvisningar, i [docs/underlag/2026-10-19-fler-skyltar.html](docs/underlag/2026-10-19-fler-skyltar.html). Fyra av dem (6, 7, 8 och 13) finns som utkast. Föreningen väljer vilka som blir skyltar.
- **Alla platser finns på Trello** sedan 2026-10-20: de nio utkasten i *Granska* med texten och frågorna, förslagen och föreningens platser utan underlag i *Idéer och frågor*, och kortet *Platslistan och numreringen*. Numren är inte bestämda, och omnumrering kräver inget godkännande.
- **Källorna syns på den publika sajten** sedan 2026-10-20, inte bara i förhandsvisningen. Länken till Trello-kortet visas bara i förhandsvisningen.
- **Volontärflödet** går bara via Trello sedan 2026-10-20: texten skrivs på platsens kort och foton bifogas där. Tavlan [QR-skyltar](https://trello.com/b/yhacWi40/qr-skyltar) och Trello-kopplingen till Claude finns sedan 2026-10-20, med listor och mallkort. Kvar innan volontärerna bjuds in: hur foton kommer från korten till repot.
- **Kartan med QR-koder** finns som löst utkast sedan 2026-10-20, på `/intern/karta/` i utkastet: underlaget är omritat ur Lars Bägerfeldts karta över husen, i två uppslag i A4. Lägena är påhittade tills föreningen har pekat ut platserna på Trello-kortet *Karta med QR-koder (löst utkast)*. Se [plans/05-skyltar.md](plans/05-skyltar.md).
- **Föreningens svar** på underlaget från 2026-10-18 kom 2026-10-19: en platslista med elva platser, domänen ska ägas av föreningen, Lars Bägerfeldt har godkänt, och föreningen lutar åt en bärbar karta med QR-koder i stället för fasta skyltar. 2026-10-20: troligen laminerade A5 med QR-koder som delas ut till gästerna, tillsammans med en karta, inte helt bestämt. Detaljerna står i delplanerna.
- **Mejl på arterasen.se fungerar inte:** domänen saknar MX-post. Förslaget är Cloudflare Email Routing, se [plans/02-hosting.md](plans/02-hosting.md).
- **Väntar på föreningen:** svar på korten på Trello: val bland förslagen, platslistan och ordningen, granskning av utkasten och beslut om blad, karta eller skyltar.

Detaljer, vem som gör vad och tidslinje: [PLAN.md](PLAN.md) och den senaste rapporten.

## Så fungerar det

```
Volontär skriver på Trello-kortet ──► kortet till "Klar för Claude"
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
| `content/` | Texterna: en mapp per plats i `content/platser/` med `sv.md`, `en.md` och `de.md`, startsidan, mallen, [listan över uppsatta skyltar](content/tryckta-skyltar.json) och kartutkastets underlag och lägen i `content/karta/` |
| `docs/` | Faktaunderlag, källor och bilder om fäboden, agentens arbetsflöde, kortmallen för Trello, `docs/intern/` som blir `/intern/` på sajten, och underlag till föreningen i [docs/underlag/](docs/underlag/) |
| `material/` | Kopior av fria bilder och skrifter, med licens per fil i [material/hamta.json](material/hamta.json). Syns på GitHub. En bild som ska visas på sajten krymps först till `content/` med `npm run bild`. Se [material/LASMIG.md](material/LASMIG.md). |
| `plans/` | En delplan per initiativ: mål, beslut, att göra, öppna frågor och logg |
| `rapporter/` | En rapport per arbetspass |
| `src/` | Generatorn, mallar, stil och service worker. Inga ramverk. |
| `tools/` | Webbläsartest, förhandsvisning som artifact, hämtning av material, kontrollen av den här filen och skriptet som ritade om kartunderlaget (Python, körs inte i bygget) |
| [site.config.json](site.config.json) | Adress, språk, textlicens och länken till Trello-tavlan |
| [LICENSE](LICENSE), [LICENSER.md](LICENSER.md) | MIT för koden, CC BY 4.0 för texterna, och undantagen |

## Utveckling

Kräver Node 20 eller senare. CI och Cloudflare använder versionen i [.node-version](.node-version).

```sh
npm ci
npm run dev        # http://localhost:8080, utkast syns
```

| Kommando | Vad det gör |
| --- | --- |
| `npm run dev` | Lokal förhandsvisning med utkast och banner synliga |
| `npm run check` | Validerar allt innehåll. Måste vara grönt. |
| `npm run check:readme` | Kontrollerar att den här filen stämmer med repot, se sista avsnittet |
| `npm run build` | Produktion till `dist/`: bara platser som har status `klar` på alla språk |
| `npm run build:preview` | Som `utkast.arterasen.se`: utkast och banner syns, och QR-koderna leder till utkastet. Används av Pages-projektet för utkasten. |
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

Vart QR-koderna leder beror på bygget: produktion leder alltid till `info.arterasen.se`. Ett utkastbygge leder till sig självt: `utkast.arterasen.se`, grenens förhandsvisning på Cloudflare (`CF_PAGES_URL`) eller `SITE_URL` när den är satt. Där är alla skyltar märkta *Provtryck* och ska inte sättas upp.

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
