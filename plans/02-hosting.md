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
- 2026-10-17: **Alfs egen server används inte.** Föreningen ska inte vara beroende av en privatpersons server (Alf).
- 2026-10-17: Huvudsajten och den här sajten hålls isär. `/intern/` ligger på den publika sajten men är olistad och utan hemligheter.

## Att göra

### Fler än en person kommer åt allt (Alf, föreningen)

Sajten ska fungera i många år och får inte hänga på en enda person. Varje tjänst ska ha minst två personer som kan logga in, och en adress som föreningen kommer åt som kontaktmejl. Inloggningsuppgifter skrivs aldrig i repot eller på `/intern/`.

- [ ] Välj eller skapa en mejladress som föreningen kommer åt. Använd den som kontaktadress i tjänsterna nedan.
- [ ] **GitHub, före Cloudflare-kopplingen:** ett personligt repo kan bara ha en ägare, och medarbetare får inte adminrätt. Skapa en gratis organisation, flytta repot dit och lägg till en andra ägare. Görs det efter Cloudflare-kopplingen måste Cloudflare-appen godkännas om för det nya repot. Claude uppdaterar `AlfCro/arterasen` i `package.json`, `AGENTS.md`, `docs/arbetsflode.md` och den här filen. GitHub omdirigerar de gamla adresserna under tiden.
- [ ] Cloudflare: lägg till en andra person som medlem med administratörsroll.
- [ ] Trello: minst två administratörer på arbetsytan och tavlan.
- [ ] Google Drive: mappen ska ägas av föreningens konto, inte av ett privat. En fil ägs av den som skapade den och försvinner om det kontot tas bort.
- [ ] Loopia: domänen ägs juridiskt av den som står som innehavare, inte av den som har inloggningen. Utred att flytta arterasen.se till föreningen med dess organisationsnummer.
- [ ] Skriv upp vem som har inloggning till vad, på ett ställe som föreningen kommer åt men utanför repot, till exempel i ett styrelseprotokoll.
- [ ] Arbetsflödet med Claude går via Alfs Claude-konto. Kontrollera att README räcker för att någon annan ska kunna lägga in och publicera en text för hand.

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

- Vem i föreningen blir andra person med inloggning till GitHub, Cloudflare, Trello, Drive och Loopia?
- Ska repot flyttas till en GitHub-organisation innan Cloudflare kopplas?
- Vem betalar domänen framöver, och står den kvar på din mamma eller flyttas den till föreningen?

## Logg

- 2026-10-17: Bygget förberett för Cloudflare: `npm run build:cf` väljer läge från `CF_PAGES_BRANCH`, `_headers` och `robots.txt` genereras, workflow speglar `main` till `granskning` (Claude).
- 2026-10-17: Checklista för att minst två personer ska komma åt varje tjänst (Alf, Claude).
