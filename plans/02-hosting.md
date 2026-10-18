# 02 Hosting och domän

Status: Pågår
Ansvarig: Alf
Senast uppdaterad: 2026-10-18

## Mål

Sajten ligger på `https://info.arterasen.se/` och uppdateras automatiskt när `main` ändras. Varje gren får en egen förhandsvisning som volontärerna kan öppna i mobilen.

## Förutsättningar

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

- **Två adresser, en för utkast och en publik (Alf, 2026-10-17).** Underlag med förutsättningar, tre alternativ och rekommendation: [Två adresser för QR-sajten](https://claude.ai/code/artifact/9e3892a9-0640-41c1-93ca-0a359e9727c9). Förslaget är två Pages-projekt i domänens Cloudflare-konto: `arterasen-info` bygger `main` till `info.arterasen.se`, `arterasen-utkast` bygger `main` med `npm run build:preview` till `utkast.arterasen.se`. Då tas `granskning.yml` och grenen `granskning` bort. Inget är ändrat i repot förrän Alf har bestämt sig. Stegen nedan gäller tills dess.

## Klart när

- [ ] `https://info.arterasen.se/` visar startsidan med giltigt certifikat
- [ ] En PR får automatiskt en förhandsvisningslänk
- [ ] `https://granskning.arterasen-info.pages.dev/` visar `main` med utkast
- [ ] Domänen arterasen.se förnyas automatiskt och någon i föreningen vet hur

## Beslut

- 2026-10-17: **Cloudflare Pages** (Alf). Gratis, obegränsad trafik, förhandsvisning per gren, bygger direkt från GitHub så att ingen nyckel behöver ligga i repot. Den som pushar till GitHub publicerar.
- 2026-10-17: **Underdomän `info.arterasen.se`** (Alf). Huvudsajten arterasen.se påverkas inte. Domänen är registrerad på en privatperson, inte på föreningen (registraren är Name ISP, rättat 2026-10-18).
- 2026-10-18: **Zonen arterasen.se flyttas till Alfs Cloudflare-konto** (Alf). Ingen i föreningen känner till kontot där zonen ligger i dag, och föreningen byter frivilliga då och då. Kontot används bara för föreningen och döps om till föreningens namn senare. Pages-projektet skapas i samma konto, så att Cloudflare lägger `info`-posten själv. Huvudsajten pekas på `www.n.nu` enligt N.nu:s manual. Fler administratörer läggs till senare, senast innan skyltarna trycks (se *Fler än en person kommer åt allt*). Ersätter att leta efter det gamla kontot.
- 2026-10-17: **Alfs egen server används inte.** Föreningen ska inte vara beroende av en privatpersons server (Alf).
- 2026-10-17: Huvudsajten och den här sajten hålls isär. `/intern/` ligger på den publika sajten men är olistad och utan hemligheter.

## Att göra

### Fler än en person kommer åt allt (Alf, föreningen)

Sajten ska fungera i många år och får inte hänga på en enda person. Varje tjänst ska ha minst två personer som kan logga in, och en adress som föreningen kommer åt som kontaktmejl. Inloggningsuppgifter skrivs aldrig i repot eller på `/intern/`.

- [ ] Välj eller skapa en mejladress som föreningen kommer åt. Använd den som kontaktadress i tjänsterna nedan.
- [ ] **GitHub, före Cloudflare-kopplingen:** ett personligt repo kan bara ha en ägare, och medarbetare får inte adminrätt. Skapa en gratis organisation, flytta repot dit och lägg till en andra ägare. Görs det efter Cloudflare-kopplingen måste Cloudflare-appen godkännas om för det nya repot. Claude uppdaterar `AlfCro/arterasen` i `package.json`, `AGENTS.md`, `docs/arbetsflode.md` och den här filen. GitHub omdirigerar de gamla adresserna under tiden.
- [ ] Cloudflare, senast innan skyltarna trycks våren 2027: döp om kontot till föreningens namn, lägg till en person i styrelsen som *Super Administrator*, och en tredje inloggning med föreningens mejladress, också *Super Administrator*. Då kan styrelsen alltid ta sig in genom att återställa lösenordet, även om både Alf och styrelsepersonen slutar. Mejladressen får inte ligga på arterasen.se, eftersom DNS för den ligger i samma konto. Tvåstegsverifiering på alla, reservkoderna hos styrelsen.
- [ ] Trello: minst två administratörer på arbetsytan och tavlan.
- [ ] Google Drive: mappen ska ägas av föreningens konto, inte av ett privat. En fil ägs av den som skapade den och försvinner om det kontot tas bort.
- [ ] Name ISP: domänen ägs juridiskt av den som står som innehavare, inte av den som har inloggningen. Utred att flytta arterasen.se till föreningen med dess organisationsnummer.
- [ ] Skriv upp vem som har inloggning till vad, på ett ställe som föreningen kommer åt men utanför repot, till exempel i ett styrelseprotokoll.
- [ ] Arbetsflödet med Claude går via Alfs Claude-konto. Kontrollera att README räcker för att någon annan ska kunna lägga in och publicera en text för hand.

### GitHub nu när repot är publikt (Alf)

Repot blev publikt 2026-10-18. Det ger några gratisfunktioner och några saker att tänka på.

- [ ] **Regel för `main`** under *Settings → Rules → Rulesets* (gratis för publika repon): blockera force push och radering, och kräv att kontrollen `check` är grön före merge. Kräv inte godkännande av granskare, då kan Claude inte merga innehålls-PR:er. Låt grenen `granskning` vara utanför regeln, workflowen force-pushar dit. Regeln kunde inte läsas eller sättas från sessionen (403).
- [ ] **Licens** (Alf, föreningen). Utan licensfil gäller "alla rättigheter förbehållna" även om allt syns, och `package.json` säger `UNLICENSED`. Förslag: MIT för koden, texterna föreningens (CC BY 4.0 eller förbehållna), och `material/` med sina egna villkor. Frågan om texterna finns i underlaget till ordföranden 2026-10-18.
- [ ] **Mejladressen i commits.** Merge-commits som görs i webbläsaren får kontots mejladress. Vill du undvika det: *Settings → Emails → Keep my email addresses private* på ditt GitHub-konto. De fyra commits som redan finns ändras inte.
- [ ] **Bilden Vlm-Blom 2281** i `material/bilder/` har osäker upphovsrätt för originalfotot (Olof Ekberg). Den ligger nu publikt. Ta bort den om Ekbergs rättigheter inte går att reda ut; den finns kvar i historiken men inte längre i trädet.
- Workflowerna är granskade för publikt repo: `check` kör med läsrättighet på PR:er, också från forkar. `granskning` och `hamta-material` körs bara på push, vilket bara den med skrivrättighet kan göra. Inget behöver ändras.
- GitHub Pages blir gratis för publika repon. Det ändrar inte beslutet om Cloudflare Pages, som ger förhandsvisning per gren.

### Cloudflare (Alf, cirka 15 minuter)

- [x] Välj konto: Alfs, samma konto som zonen flyttas till (beslut 2026-10-18).
- [ ] *Compute* → *Workers & Pages* → *Create application* → välj **Pages** (en liten länk under Workers-alternativen) → importera ett Git-repo. Ge Cloudflare-appen tillgång till **bara** `AlfCro/arterasen`. Cloudflare föreslår Workers för nya projekt, men Pages stöds fortfarande och bygget läser `CF_PAGES_BRANCH`.
- [ ] Projektnamn `arterasen-info`. Blir namnet upptaget: ändra `cloudflareProject` och `intern.granskningUrl` i `site.config.json`.
- [ ] Bygginställningar: Framework preset *None*, Build command `npm run build:cf`, Build output directory `dist`, Production branch `main`. Node-versionen läses från `.node-version`.
- [ ] Preview deployments: *All non-production branches*.
- [ ] Vänta på första bygget och öppna `https://arterasen-info.pages.dev/`.

### Domän: zonen till Alfs Cloudflare-konto (Alf)

Beslutat och genomfört 2026-10-18. Kvar är `info.arterasen.se`, som väntar på Pages-projektet.

- [x] Kontrollera var DNS för arterasen.se hanteras: hos Cloudflare (Claude, 2026-10-17, se Förutsättningar)
- [x] ~~Ta reda på vems Cloudflare-konto arterasen.se ligger i~~: ingen i föreningen vet, troligen N.nu:s. Ersatt av egen zon (2026-10-18).
- [x] **Automatisk förnyelse** av arterasen.se: på hos Name ISP, går ut 2027-01-22 (Alf, 2026-10-18). Går domänen ut slutar alla tryckta QR-koder att fungera.
- [x] **DNSSEC:** ingen DS-post i `.se`-zonen före bytet, alltså ingen aktiv DNSSEC-kedja att stänga av.
- [x] **Zonen `arterasen.se`** tillagd i Alfs Cloudflare-konto och aktiv (Alf, 2026-10-18).
- [x] **DNS:** importens fyra A- och fyra AAAA-poster borttagna. CNAME `@` → `www.n.nu` och CNAME `www` → `www.n.nu`, båda *Proxied*, TTL *Auto* (Alf, 2026-10-18).
- [x] **SSL/TLS → Flexible**, enligt N.nu:s manual, sparat (Alf, 2026-10-18).
- [x] **Name ISP:** namnservrarna bytta till `betty.ns.cloudflare.com` och `carl.ns.cloudflare.com` (Alf, 2026-10-18).
- [x] Huvudsajten svarar efter bytet: `https://arterasen.se` ger 301 till `https://www.arterasen.se/`, som ger 200 (Alf, 2026-10-18 cirka 19:55, DNS och HTTP-huvuden, inte i webbläsare).
- [ ] Pages-projektet → *Custom domains* → *Set up a custom domain* → `info.arterasen.se`. Lägg inte in CNAME-posten för hand innan, då blir det fel 522. Cloudflare lägger posten själv eftersom zonen ligger i samma konto.
- [ ] Kontrollera att posten för `info` pekar på projektets faktiska `pages.dev`-adress. Den kan skilja sig från `arterasen-info.pages.dev` om namnet var upptaget.
- [ ] Vänta tills domänen visar *Active* i Pages. Det brukar ta från några minuter till ett par timmar.
- Rör inte posterna `@` och `www`. De bär huvudsajten hos N.nu.

### Kontroll (Claude)

- [x] Efter namnserverbytet: NS, `arterasen.se`, `www` och `info`, och att huvudsajten svarar. Gjort av Alf 2026-10-18, se *Efter flytten* ovan.
- [ ] Efter att `info` lagts till: HTTPS och certifikat på `info.arterasen.se`. Zonen står på *Flexible* för huvudsajtens skull, så se efter omdirigeringsslinga eller certifikatfel. Byt inte läge för hela zonen, det påverkar huvudsajten.
- [ ] Efter att `info` lagts till: att `arterasen.se` och `www.arterasen.se` fortfarande svarar som förut
- [ ] Öppna `/`, `/sv/`, `/intern/` och en QR-adress på den riktiga domänen
- [ ] Kontrollera att `granskning`-grenen byggs som förhandsvisning efter nästa push till `main`

## Öppna frågor

- Vem i föreningen blir andra person med inloggning till GitHub, Cloudflare, Trello, Drive och Name ISP?
- Ska repot flyttas till en GitHub-organisation innan Cloudflare kopplas?
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
