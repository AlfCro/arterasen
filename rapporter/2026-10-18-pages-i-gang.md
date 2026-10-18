# Rapport 2026-10-18: Pages i gång

Arbetspass: 2026-10-18 21:27–23:00
Av: Claude, med Alf i Cloudflares dashboard
PR: #6
Initiativ: 02

## Sammanfattning

Sajten ligger på nätet. Alf skapade två Cloudflare Pages-projekt från mobilen med Claude som stöd via skärmdumpar: `arterasen-info` bygger den publika sajten till `info.arterasen.se`, och `arterasen-utkast` bygger samma gren med utkast synliga till `utkast.arterasen.se`. En merge till `main` publicerar nu båda. Grenen `granskning` och workflowen som speglade `main` dit ersätts av utkastsajten.

## Gjort

- **Cloudflare (Alf):** projekten `arterasen-info` och `arterasen-utkast` kopplade till `AlfCro/arterasen`, med custom domains `info.arterasen.se` och `utkast.arterasen.se`. Cloudflare lade CNAME-posterna själv. Inställningarna står i `plans/02-hosting.md`.
- **`site.config.json`:** `intern.granskningUrl` pekar på `https://utkast.arterasen.se/`. Länken *granskningsversionen* på `/intern/` och knapparna *Granska* på statussidan följer med.
- **`src/build.mjs`:** `robots.txt` har en egen grupp för `Claude-User` med `Allow: /`, på både den publika sajten och utkastsajten. Övriga robotar följer `*`-gruppen som förut.
- **`.github/workflows/granskning.yml`** borttagen. `hamta-material` behöver inte längre undanta grenen `granskning`.
- **`plans/02-hosting.md`:** projekten, beslutet om två adresser och om Pages, avbockade steg, nya kontroller och logg.
- **PLAN.md, README.md och AGENTS.md:** adresserna, att en merge till `main` publicerar, *Läget just nu* och *Väntar på*.
- **`docs/intern/90-nytt.md`:** en punkt på enkel svenska om att sajten och utkasten finns på nätet.
- Driftuppgifterna dokumenterades i det privata repot.

## Beslut

- **Två Pages-projekt, utkasten på `utkast.arterasen.se`** (Alf). Alf nämnde först `utkastinfo.arterasen.se` men valde `utkast` innan domänen lades till.
- **Pages, inte Workers** (Claude, efter att Alf lämnade valet till Claude). Skapa-flödet erbjöd Workers först, och Cloudflare rekommenderar Workers för nya projekt. Pages valdes för att sajten är statisk och bygget redan läser `CF_PAGES_BRANCH`. Ett byte senare är litet.
- **Claude får läsa utkast och `/intern/`** (Alf). Claudes hämtverktyg stoppades av `robots.txt`. Undantaget gäller bara `Claude-User`, som hämtar på en persons begäran och inte indexerar. Träningsroboten `ClaudeBot` och sökrobotar stängs ute som förut, och `noindex` står kvar.
- **Publicering via GitHub, ingen nyckel.** Den som mergar till `main` publicerar. Claude publicerar på samma sätt, i sessioner där repot är kopplat.

## Kontrollerat

- Skärmdumpar innan *Save and Deploy*: namn, `pages.dev`-adress, gren, preset, byggkommando och utdatamapp för båda projekten.
- Skärmdump av DNS-listan 22:42: `info` → `arterasen-info.pages.dev` och `utkast` → `arterasen-utkast.pages.dev`, båda *Proxied*. `@` och `www` pekar fortfarande på `www.n.nu`.
- `https://arterasen-info.pages.dev/sv/` efter första bygget: produktionsläge, ingen utkastbanner, ingen `noindex`.
- `https://info.arterasen.se/sv/`: startsidan över HTTPS. Ingen omdirigeringsslinga med zonens *Flexible*.
- `https://info.arterasen.se/intern/` och `utkast.arterasen.se`: Claudes hämtverktyg stoppades av `robots.txt`. Det stämmer med bygget, som stänger `/intern/` på den publika sajten och hela utkastsajten. Sidorna är inte lästa.
- `https://www.arterasen.se/`: huvudsajten svarar som förut.
- `npm run check`, `npm run check:readme`, `npm run build` och `npm run verify` gröna. `robots.txt` i båda byggena läst efter ändringen.
- README.md stämmer med ändringarna (`npm run check:readme`).

Kontrollerna gällde svar och rubriker via Claudes hämtverktyg, inte ett test i webbläsare.

## Väntar på

- [ ] Granska och merga PR #5 och sedan PR #6 (Alf)
- [ ] Ta bort grenen `granskning` på GitHub efter merge (Alf eller Claude)
- [ ] Se att båda domänerna står som *Active* under *Custom domains* (Alf)
- [ ] Kontrollera att Cloudflares GitHub-app bara når `AlfCro/arterasen` (Alf)
- [ ] Förslag: slå av förhandsvisningar per gren i `arterasen-utkast` (Alf)
- [ ] Läs `utkast.arterasen.se` och `info.arterasen.se/intern/` efter merge (Claude, eller Alf i telefonen om Claudes verktyg fortfarande stoppas)
- [ ] Se att PR #6 får en förhandsvisningslänk från Cloudflare (Claude)

## Öppna frågor

- Ska repot flyttas till en GitHub-organisation? Båda Pages-projekten behöver då kopplas om (Alf).

## Källor

- [Cloudflare Pages: Get started](https://developers.cloudflare.com/pages/get-started/guide/)
- [Cloudflare Pages: Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [Cloudflare Pages](https://developers.cloudflare.com/pages/), som rekommenderar Workers för nya projekt
- [Anthropic: robotarna ClaudeBot, Claude-User och Claude-SearchBot](https://support.claude.com/en/articles/8896518)
