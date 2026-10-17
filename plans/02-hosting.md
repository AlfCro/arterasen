# 02 Hosting och domän

Status: Ej startat
Ansvarig: Alf, med hjälp av domänägaren för DNS
Senast uppdaterad: 2026-10-17

## Mål

Sajten ligger på `https://info.arterasen.se/` och uppdateras automatiskt när `main` ändras. Varje gren får en egen förhandsvisning som volontärerna kan öppna i mobilen.

## Klart när

- [ ] `https://info.arterasen.se/` visar startsidan med giltigt certifikat
- [ ] En PR får automatiskt en förhandsvisningslänk
- [ ] `https://granskning.arterasen-info.pages.dev/` visar `main` med utkast
- [ ] Domänen arterasen.se förnyas automatiskt och någon i föreningen vet hur

## Beslut

- 2026-10-17: **Cloudflare Pages** (Alf). Gratis, obegränsad trafik, förhandsvisning per gren, bygger direkt från GitHub så att ingen nyckel behöver ligga i repot. Den som pushar till GitHub publicerar.
- 2026-10-17: **Underdomän `info.arterasen.se`** (Alf). Huvudsajten arterasen.se påverkas inte. Domänen ägs av Alfs mamma via Loopia.
- 2026-10-17: Huvudsajten och den här sajten hålls isär. `/intern/` ligger på den publika sajten men är olistad och utan hemligheter.

## Att göra

### Cloudflare (Alf, cirka 15 minuter)

- [ ] Skapa ett Cloudflare-konto. Använd gärna en adress som föreningen kommer åt, så att kontot inte hänger på en person.
- [ ] *Workers & Pages* → *Create* → *Pages* → *Connect to Git*. Ge Cloudflare-appen tillgång till **bara** `AlfCro/arterasen`.
- [ ] Projektnamn `arterasen-info`. Blir namnet upptaget: ändra `cloudflareProject` och `intern.granskningUrl` i `site.config.json`.
- [ ] Bygginställningar: Framework preset *None*, Build command `npm run build:cf`, Build output directory `dist`, Production branch `main`. Node-versionen läses från `.node-version`.
- [ ] Preview deployments: *All non-production branches*.
- [ ] Vänta på första bygget och öppna `https://arterasen-info.pages.dev/`.

### Domän (domänägaren eller Alf med hennes inloggning)

- [ ] Kontrollera var DNS för arterasen.se hanteras. Står namnservrarna på Loopia (`ns1.loopia.se`, `ns2.loopia.se`) görs ändringen hos Loopia. Annars där huvudsajten ligger.
- [ ] I Cloudflare: projektet → *Custom domains* → *Set up a custom domain* → `info.arterasen.se`. Cloudflare visar vilken CNAME som behövs.
- [ ] Hos Loopia: *Loopia Customer Zone* → *Domännamn* → arterasen.se → *Lägg till subdomän* `info` → DNS-editorn → ny post av typen **CNAME** med värdet `arterasen-info.pages.dev.` (med punkt på slutet).
- [ ] Vänta tills Cloudflare visar *Active*. Det brukar ta från några minuter till ett par timmar.
- [ ] Slå på **automatisk förnyelse** av arterasen.se hos Loopia. Går domänen ut slutar alla tryckta QR-koder att fungera.

### Kontroll (Claude)

- [ ] Öppna `/`, `/sv/`, `/intern/` och en QR-adress på den riktiga domänen
- [ ] Kontrollera att `granskning`-grenen byggs som förhandsvisning efter nästa push till `main`

## Öppna frågor

- Vem i föreningen ska ha inloggning till Cloudflare som reserv?
- Vem betalar domänen framöver, och står den kvar på din mamma eller flyttas den till föreningen?

## Logg

- 2026-10-17: Bygget förberett för Cloudflare: `npm run build:cf` väljer läge från `CF_PAGES_BRANCH`, `_headers` och `robots.txt` genereras, workflow speglar `main` till `granskning` (Claude).
