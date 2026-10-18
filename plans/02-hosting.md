# 02 Hosting och domän

Status: Pågår
Ansvarig: Alf
Senast uppdaterad: 2026-10-18

## Mål

Sajten ligger på `https://info.arterasen.se/` och uppdateras automatiskt när `main` ändras. Varje gren får en egen förhandsvisning som volontärerna kan öppna i mobilen.

## Förutsättningar

### Pages-projekten 2026-10-18

Alf skapade projekten för hand i Cloudflares dashboard 2026-10-18 cirka 22:20–22:40. Inställningarna är avlästa på skärmdumpar innan *Save and Deploy*.

| | Publik sajt | Utkast |
| --- | --- | --- |
| Adress | `https://info.arterasen.se/` | `https://utkast.arterasen.se/` |
| Pages-projekt | `arterasen-info` | `arterasen-utkast` |
| `pages.dev` | `arterasen-info.pages.dev` | `arterasen-utkast.pages.dev` |
| Repo och production branch | `AlfCro/arterasen`, `main` | `AlfCro/arterasen`, `main` |
| Framework preset | None | None |
| Build command | `npm run build:cf` | `npm run build:preview` |
| Build output directory | `dist` | `dist` |

- **DNS:** Cloudflare lade CNAME `info` → `arterasen-info.pages.dev` och CNAME `utkast` → `arterasen-utkast.pages.dev`, båda *Proxied*, när domänerna lades till under *Custom domains*. Posterna `@` och `www` är orörda.
- **Publicering:** en merge till `main` bygger båda sajterna. Ingen nyckel eller `wrangler` behövs.
- **Förhandsvisning per gren** görs av `arterasen-info`, med adresser under `arterasen-info.pages.dev`.

### Efter flytten 2026-10-18

Alf flyttade zonen för hand 2026-10-18. Kontrollerat efter flytten:

- **DNS ligger i Alfs Cloudflare-konto.** Zonen är aktiv i Cloudflares dashboard, och publika uppslag efter aktiveringen ger namnservrarna `betty.ns.cloudflare.com` och `carl.ns.cloudflare.com`.
- **Registraren är fortfarande Name ISP** (Alf har inloggning). Automatisk förnyelse är på och domänen går ut 2027-01-22.
- **Poster:** CNAME `@` → `www.n.nu` och CNAME `www` → `www.n.nu`, båda *Proxied*, TTL *Auto*, enligt N.nu:s manual. Cloudflares import hade läst in fyra A- och fyra AAAA-poster med det gamla kontots proxyadresser. De är borttagna.
- **SSL/TLS är *Flexible*,** sparat i dashboarden, enligt N.nu:s manual. Trafiken är krypterad mellan besökaren och Cloudflare men går över HTTP mellan Cloudflare och N.nu. Läget gäller hela zonen, alltså också `info` när den läggs till.
- **Huvudsajten ligger kvar hos N.nu** och svarar: cirka 19:55 gav `https://arterasen.se` 301 till `https://www.arterasen.se/`, som gav 200. Det var kontroller av DNS och HTTP-huvuden, inte ett test i webbläsare.
- **`info.arterasen.se` finns inte i DNS än** (NXDOMAIN efter flytten).
- Pages-projektet skapas i samma konto som zonen. Då lägger Cloudflare CNAME-posten för `info` när domänen läggs till i projektet. Lägg inte in posten för hand innan: enligt Cloudflare löser domänen då inte ut och besökare får fel 522.

### Före flytten

Kontrollerat 2026-10-17 och 2026-10-18 med publika uppslag:

- Namnservrarna var `jean.ns.cloudflare.com` och `lloyd.ns.cloudflare.com`, i ett Cloudflare-konto som ingen i föreningen kände till (ordföranden, 2026-10-18) och som inte var Alfs. N.nu:s manual för domäner hos Loopia anger exakt `jean`/`lloyd` och säger att supporten skickar namnservrarna, så zonen låg troligen i N.nu:s konto. Samma namnserverpar delas av många konton, så det är inte bekräftat.
- Inga MX-poster och ingen TXT-post på apex, ingen TXT på `_dmarc`, ingen CAA-post och ingen DS-post i `.se`-zonen, alltså ingen aktiv DNSSEC-kedja. Utan CAA-post finns inget som hindrar Cloudflare från att utfärda certifikat för `info`. Uppslagen är inte en export av hela zonen och bevisar inte att det saknas andra tjänster.
- Huvudsajten är byggd i webbplatsverktyget N.nu, enligt en metatagg i sidans kod. Sidan namnger ingen webbansvarig. `www.n.nu` ligger inte bakom Cloudflare (46.246.45.145), så en egen zon kan peka dit.

## Väntar på beslut

Inget. Frågan om två adresser avgjordes 2026-10-18, se *Beslut*.

## Klart när

- [x] `https://info.arterasen.se/` visar startsidan med giltigt certifikat (`/sv/` över HTTPS, 2026-10-18)
- [x] En PR får automatiskt en förhandsvisningslänk (PR #6 fick en kommentar och en kontroll per Pages-projekt, 2026-10-18)
- [ ] `https://utkast.arterasen.se/` visar `main` med utkast. Svarar och har `Disallow: /` som utkastbygget ska, men sidan är inte läst i webbläsare.
- [ ] Domänen arterasen.se förnyas automatiskt och någon i föreningen vet hur

## Beslut

- 2026-10-17: **Cloudflare Pages** (Alf). Gratis, obegränsad trafik, förhandsvisning per gren, bygger direkt från GitHub så att ingen nyckel behöver ligga i repot. Den som pushar till GitHub publicerar.
- 2026-10-17: **Underdomän `info.arterasen.se`** (Alf). Huvudsajten arterasen.se påverkas inte. Domänen är registrerad på en privatperson, inte på föreningen (registraren är Name ISP, rättat 2026-10-18).
- 2026-10-18: **Zonen arterasen.se flyttas till Alfs Cloudflare-konto** (Alf). Ingen i föreningen känner till kontot där zonen ligger i dag, och föreningen byter frivilliga då och då. Kontot används bara för föreningen och döps om till föreningens namn senare. Pages-projektet skapas i samma konto, så att Cloudflare lägger `info`-posten själv. Huvudsajten pekas på `www.n.nu` enligt N.nu:s manual. Fler administratörer läggs till senare, senast innan skyltarna trycks (se *Fler än en person kommer åt allt*). Ersätter att leta efter det gamla kontot.
- 2026-10-18: **Två Pages-projekt och adressen `utkast.arterasen.se`** (Alf). `arterasen-info` bygger `main` till `info.arterasen.se`, `arterasen-utkast` bygger `main` med `npm run build:preview` till `utkast.arterasen.se`. Ersätter grenen `granskning` och workflowen som speglade `main` dit. Underlag: [Två adresser för QR-sajten](https://claude.ai/code/artifact/9e3892a9-0640-41c1-93ca-0a359e9727c9).
- 2026-10-18: **Pages, inte Workers** (Claude, Alf lät Claude välja). Skapa-flödet erbjuder Workers först, och Cloudflare rekommenderar Workers för nya projekt. Men sajten är statisk, `build:cf` läser `CF_PAGES_BRANCH` som bara Pages sätter, och Pages kräver ingen `wrangler`-konfiguration. Ett byte senare är litet: en `wrangler.jsonc` med `assets` mot `dist` och att läsa grenen ur `WORKERS_CI_BRANCH`.
- 2026-10-18: **Claude får läsa utkast och `/intern/`** (Alf). `robots.txt` släpper in `Claude-User`, Anthropics agent för hämtningar som en person ber Claude om, så att Claude kan kontrollera sidorna. Alla andra robotar, också träningsroboten `ClaudeBot`, följer reglerna som förut, och `noindex` gäller fortfarande.
- 2026-10-17: **Alfs egen server används inte.** Föreningen ska inte vara beroende av en privatpersons server (Alf).
- 2026-10-17: Huvudsajten och den här sajten hålls isär. `/intern/` ligger på den publika sajten men är olistad och utan hemligheter.

## Att göra

### Fler än en person kommer åt allt (Alf, föreningen)

Sajten ska fungera i många år och får inte hänga på en enda person. Varje tjänst ska ha minst två personer som kan logga in, och en adress som föreningen kommer åt som kontaktmejl. Inloggningsuppgifter skrivs aldrig i repot eller på `/intern/`.

- [ ] Välj eller skapa en mejladress som föreningen kommer åt. Använd den som kontaktadress i tjänsterna nedan.
- [ ] **GitHub:** ett personligt repo kan bara ha en ägare, och medarbetare får inte adminrätt. Skapa en gratis organisation, flytta repot dit och lägg till en andra ägare. Cloudflare är kopplat sedan 2026-10-18, så Cloudflare-appen måste då godkännas för det nya repot och kopplingen kontrolleras i båda Pages-projekten. Claude uppdaterar `AlfCro/arterasen` i `package.json`, `AGENTS.md`, `docs/arbetsflode.md` och den här filen. GitHub omdirigerar de gamla adresserna under tiden.
- [ ] Cloudflare, senast innan skyltarna trycks våren 2027: döp om kontot till föreningens namn, lägg till en person i styrelsen som *Super Administrator*, och en tredje inloggning med föreningens mejladress, också *Super Administrator*. Då kan styrelsen alltid ta sig in genom att återställa lösenordet, även om både Alf och styrelsepersonen slutar. Mejladressen får inte ligga på arterasen.se, eftersom DNS för den ligger i samma konto. Tvåstegsverifiering på alla, reservkoderna hos styrelsen.
- [ ] Trello: minst två administratörer på arbetsytan och tavlan.
- [ ] Google Drive: mappen ska ägas av föreningens konto, inte av ett privat. En fil ägs av den som skapade den och försvinner om det kontot tas bort.
- [ ] Name ISP: domänen ägs juridiskt av den som står som innehavare, inte av den som har inloggningen. Utred att flytta arterasen.se till föreningen med dess organisationsnummer.
- [ ] Skriv upp vem som har inloggning till vad, på ett ställe som föreningen kommer åt men utanför repot, till exempel i ett styrelseprotokoll.
- [ ] Arbetsflödet med Claude går via Alfs Claude-konto. Kontrollera att README räcker för att någon annan ska kunna lägga in och publicera en text för hand.

### GitHub nu när repot är publikt (Alf)

Repot blev publikt 2026-10-18. Det ger några gratisfunktioner och några saker att tänka på.

- [ ] **Regel för `main`** under *Settings → Rules → Rulesets* (gratis för publika repon): blockera force push och radering, och kräv att kontrollen `check` är grön före merge. Kräv inte godkännande av granskare, då kan Claude inte merga innehålls-PR:er. Regeln kunde inte läsas eller sättas från sessionen (403).
- [ ] **Licens** (Alf, föreningen). Utan licensfil gäller "alla rättigheter förbehållna" även om allt syns, och `package.json` säger `UNLICENSED`. Förslag: MIT för koden, texterna föreningens (CC BY 4.0 eller förbehållna), och `material/` med sina egna villkor. Frågan om texterna finns i underlaget till ordföranden 2026-10-18.
- [ ] **Mejladressen i commits.** Merge-commits som görs i webbläsaren får kontots mejladress. Vill du undvika det: *Settings → Emails → Keep my email addresses private* på ditt GitHub-konto. De fyra commits som redan finns ändras inte.
- [ ] **Bilden Vlm-Blom 2281** i `material/bilder/` har osäker upphovsrätt för originalfotot (Olof Ekberg). Den ligger nu publikt. Ta bort den om Ekbergs rättigheter inte går att reda ut; den finns kvar i historiken men inte längre i trädet.
- Workflowerna är granskade för publikt repo: `check` kör med läsrättighet på PR:er, också från forkar. `hamta-material` körs bara på push, vilket bara den med skrivrättighet kan göra. Workflowen `granskning` togs bort 2026-10-18. Inget behöver ändras.
- GitHub Pages blir gratis för publika repon. Det ändrar inte beslutet om Cloudflare Pages, som ger förhandsvisning per gren.

### Cloudflare (Alf, cirka 15 minuter)

- [x] Välj konto: Alfs, samma konto som zonen flyttas till (beslut 2026-10-18).
- [x] *Workers & Pages* → *Create application* → **Pages** → *Connect to Git* → `AlfCro/arterasen` (Alf, 2026-10-18). Flödet öppnade Workers först, och Pages valdes i stället.
- [ ] Kontrollera att Cloudflares GitHub-app har tillgång till **bara** `AlfCro/arterasen` (GitHub → *Settings* → *Applications*) (Alf)
- [x] Projektnamn `arterasen-info`, fick `arterasen-info.pages.dev` utan tillägg. `cloudflareProject` i `site.config.json` stämmer.
- [x] Bygginställningar: Framework preset *None*, Build command `npm run build:cf`, Build output directory `dist`, Production branch `main`. Node-versionen läses från `.node-version`.
- [x] Första bygget lyckades. `https://arterasen-info.pages.dev/sv/` är i produktionsläge: ingen utkastbanner, ingen `noindex`.
- [x] Förhandsvisning per gren i `arterasen-info`: PR #6:s gren byggdes till `claude-pages-info-utkast.arterasen-info.pages.dev`.
- [x] Projektet `arterasen-utkast`: samma repo och gren, Build command `npm run build:preview`, Build output directory `dist`, fick `arterasen-utkast.pages.dev` (Alf, 2026-10-18).
- [ ] Förslag: slå av förhandsvisningar per gren i `arterasen-utkast` (*Settings* → *Builds* → *Branch control*), eftersom `arterasen-info` redan gör dem. De är på i dag: PR #6 byggdes i båda projekten (Alf)
- [x] `intern.granskningUrl` i `site.config.json` pekar på `https://utkast.arterasen.se/`, och `granskning.yml` är borttagen (Claude, 2026-10-18).
- [ ] Ta bort grenen `granskning` på GitHub när ändringen är mergad (Alf eller Claude)

### Domän: zonen till Alfs Cloudflare-konto (Alf)

Beslutat och genomfört 2026-10-18, liksom `info` och `utkast` samma kväll. Kvar är att domänerna står som *Active* i Pages.

- [x] Kontrollera var DNS för arterasen.se hanteras: hos Cloudflare (Claude, 2026-10-17, se Förutsättningar)
- [x] ~~Ta reda på vems Cloudflare-konto arterasen.se ligger i~~: ingen i föreningen vet, troligen N.nu:s. Ersatt av egen zon (2026-10-18).
- [x] **Automatisk förnyelse** av arterasen.se: på hos Name ISP, går ut 2027-01-22 (Alf, 2026-10-18). Går domänen ut slutar alla tryckta QR-koder att fungera.
- [x] **DNSSEC:** ingen DS-post i `.se`-zonen före bytet, alltså ingen aktiv DNSSEC-kedja att stänga av.
- [x] **Zonen `arterasen.se`** tillagd i Alfs Cloudflare-konto och aktiv (Alf, 2026-10-18).
- [x] **DNS:** importens fyra A- och fyra AAAA-poster borttagna. CNAME `@` → `www.n.nu` och CNAME `www` → `www.n.nu`, båda *Proxied*, TTL *Auto* (Alf, 2026-10-18).
- [x] **SSL/TLS → Flexible**, enligt N.nu:s manual, sparat (Alf, 2026-10-18).
- [x] **Name ISP:** namnservrarna bytta till `betty.ns.cloudflare.com` och `carl.ns.cloudflare.com` (Alf, 2026-10-18).
- [x] Huvudsajten svarar efter bytet: `https://arterasen.se` ger 301 till `https://www.arterasen.se/`, som ger 200 (Alf, 2026-10-18 cirka 19:55, DNS och HTTP-huvuden, inte i webbläsare).
- [x] *Custom domains* → *Set up a custom domain*: `info.arterasen.se` i `arterasen-info` och `utkast.arterasen.se` i `arterasen-utkast` (Alf, 2026-10-18). Cloudflare lade posterna själv.
- [x] Posterna pekar på projektens faktiska adresser: `info` → `arterasen-info.pages.dev`, `utkast` → `arterasen-utkast.pages.dev`, båda *Proxied* (skärmdump av DNS-listan, 2026-10-18 22:42).
- [ ] Vänta tills båda domänerna visar *Active* i Pages. `info.arterasen.se` stod som *Verifying* 22:31 men svarade redan över HTTPS.
- Rör inte posterna `@` och `www`. De bär huvudsajten hos N.nu.

### Kontroll (Claude)

- [x] Efter namnserverbytet: NS, `arterasen.se`, `www` och `info`, och att huvudsajten svarar. Gjort av Alf 2026-10-18, se *Efter flytten* ovan.
- [x] Efter att `info` lagts till: `https://info.arterasen.se/sv/` svarar med startsidan över HTTPS, ingen omdirigeringsslinga med *Flexible* (Claude, 2026-10-18). Byt inte läge för hela zonen, det påverkar huvudsajten.
- [x] Efter att `info` lagts till: `https://www.arterasen.se/` svarar med huvudsajten (Claude, 2026-10-18 cirka 22:50)
- [ ] Öppna `/`, `/sv/`, `/intern/` och en QR-adress på den riktiga domänen. `/sv/` är gjort. `/intern/` stoppas av `robots.txt` i Claudes hämtverktyg, som det ska, och behöver öppnas i webbläsare (Alf). QR-adresserna väntar på en godkänd plats.
- [x] Claudes hämtverktyg släpps in av gruppen `Claude-User` i `robots.txt`: förhandsvisningen av PR #6 (`Disallow: /` för alla andra) gick att läsa, med utkastbanner och fem platser (Claude, 2026-10-18).
- [ ] Efter merge: läs `utkast.arterasen.se` och `info.arterasen.se/intern/` (Claude)
- [ ] Efter nästa merge till `main`: att båda sajterna byggs om

## Öppna frågor

- Vem i föreningen blir andra person med inloggning till GitHub, Cloudflare, Trello, Drive och Name ISP?
- Ska repot flyttas till en GitHub-organisation? Cloudflare är redan kopplat, så båda Pages-projekten behöver kopplas om efter flytten.
- Vem betalar domänen framöver, vems kort dras vid förnyelsen 2027-01-22, och ska domänen stå kvar på nuvarande innehavare eller flyttas till föreningen?
- Vem har N.nu-inloggningen för huvudsajten? Den behövs om något måste ändras hos N.nu, till exempel om HTTPS slutar fungera.

Frågorna om domän, konton och huvudsajten skickades till föreningens ordförande 2026-10-18 som ett underlag (se rapporten för 2026-10-18).

## Logg

- 2026-10-17: Bygget förberett för Cloudflare: `npm run build:cf` väljer läge från `CF_PAGES_BRANCH`, `_headers` och `robots.txt` genereras, workflow speglar `main` till `granskning` (Claude).
- 2026-10-17: Checklista för att minst två personer ska komma åt varje tjänst (Alf, Claude).
- 2026-10-17: DNS för arterasen.se visade sig ligga hos Cloudflare, inte hos Loopia. Domänstegen omskrivna. Underlag för två adresser (utkast och publik) väntar på beslut (Claude).
- 2026-10-18: Repot publikt (Alf). Avsnitt om regel för `main`, licens, mejl i commits och en bild med osäker upphovsrätt. Huvudsajten visade sig vara byggd i N.nu. Frågor om domän och konton skickade till ordföranden (Claude).
- 2026-10-18: Registraren är Name ISP, inte Loopia. Automatisk förnyelse på, går ut 2027-01-22 (Alf). Ingen i föreningen känner till Cloudflare-kontot. Beslut att flytta zonen till Alfs Cloudflare-konto och peka huvudsajten på `www.n.nu` enligt N.nu:s manual. Domänstegen omskrivna (Alf, Claude).
- 2026-10-18: Zonen flyttad till Alfs Cloudflare-konto: namnservrar `betty`/`carl`, CNAME `@` och `www` → `www.n.nu`, *Flexible*. Huvudsajten svarar. `info.arterasen.se` väntar på Pages-projektet (Alf). Planen uppdaterad med läget (Claude).
- 2026-10-18: Pages-projekten `arterasen-info` och `arterasen-utkast` skapade med `info.arterasen.se` och `utkast.arterasen.se` (Alf). Pages valt framför Workers (Claude). `granskningUrl` pekar på utkastsajten och `granskning.yml` är borttagen. `info.arterasen.se` och huvudsajten svarar. `robots.txt` släpper in `Claude-User` (Claude).
