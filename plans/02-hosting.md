# 02 Hosting och domän

Status: Ej startat
Ansvarig: Alf, med hjälp av den som har Cloudflare-kontot för arterasen.se
Senast uppdaterad: 2026-10-18

## Mål

Sajten ligger på `https://info.arterasen.se/` och uppdateras automatiskt när `main` ändras. Varje gren får en egen förhandsvisning som volontärerna kan öppna i mobilen.

## Förutsättningar

Kontrollerat 2026-10-17 med DNS-uppslag via `dns.google`:

- arterasen.se använder Cloudflares namnservrar, `jean.ns.cloudflare.com` och `lloyd.ns.cloudflare.com`. **DNS ligger alltså hos Cloudflare, inte hos Loopia.** Domänen är registrerad via Loopia, så förnyelsen sköts fortfarande där.
- Huvudsajten arterasen.se går via Cloudflares proxy (A-poster 104.21.7.106 och 172.67.130.30).
- Domänen har inga MX-poster. Ingen mejl påverkas av DNS-ändringar.
- Det är okänt vems Cloudflare-konto domänen ligger i. Troligen den som sköter huvudsajten.
- Huvudsajten är byggd i webbplatsverktyget N.nu, enligt en metatagg i sidans kod (kontrollerat 2026-10-18). Sidan namnger ingen webbansvarig. Den som har N.nu-kontot har troligen också satt upp Cloudflare framför sajten.
- Ligger Pages-projektet i samma Cloudflare-konto som domänen skapar Cloudflare CNAME-posten för `info` automatiskt. Fallet med två olika konton beskrivs inte i dokumentationen.

## Väntar på beslut

- **Två adresser, en för utkast och en publik (Alf, 2026-10-17).** Underlag med förutsättningar, tre alternativ och rekommendation: [Två adresser för QR-sajten](https://claude.ai/code/artifact/9e3892a9-0640-41c1-93ca-0a359e9727c9). Förslaget är två Pages-projekt i domänens Cloudflare-konto: `arterasen-info` bygger `main` till `info.arterasen.se`, `arterasen-utkast` bygger `main` med `npm run build:preview` till `utkast.arterasen.se`. Då tas `granskning.yml` och grenen `granskning` bort. Inget är ändrat i repot förrän Alf har bestämt sig. Stegen nedan gäller tills dess.

## Klart när

- [ ] `https://info.arterasen.se/` visar startsidan med giltigt certifikat
- [ ] En PR får automatiskt en förhandsvisningslänk
- [ ] `https://granskning.arterasen-info.pages.dev/` visar `main` med utkast
- [ ] Domänen arterasen.se förnyas automatiskt och någon i föreningen vet hur

## Beslut

- 2026-10-17: **Cloudflare Pages** (Alf). Gratis, obegränsad trafik, förhandsvisning per gren, bygger direkt från GitHub så att ingen nyckel behöver ligga i repot. Den som pushar till GitHub publicerar.
- 2026-10-17: **Underdomän `info.arterasen.se`** (Alf). Huvudsajten arterasen.se påverkas inte. Domänen är registrerad via Loopia på en privatperson, inte på föreningen.
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

### GitHub nu när repot är publikt (Alf)

Repot blev publikt 2026-10-18. Det ger några gratisfunktioner och några saker att tänka på.

- [ ] **Regel för `main`** under *Settings → Rules → Rulesets* (gratis för publika repon): blockera force push och radering, och kräv att kontrollen `check` är grön före merge. Kräv inte godkännande av granskare, då kan Claude inte merga innehålls-PR:er. Låt grenen `granskning` vara utanför regeln, workflowen force-pushar dit. Regeln kunde inte läsas eller sättas från sessionen (403).
- [ ] **Licens** (Alf, föreningen). Utan licensfil gäller "alla rättigheter förbehållna" även om allt syns, och `package.json` säger `UNLICENSED`. Förslag: MIT för koden, texterna föreningens (CC BY 4.0 eller förbehållna), och `material/` med sina egna villkor. Frågan om texterna finns i underlaget till ordföranden 2026-10-18.
- [ ] **Mejladressen i commits.** Merge-commits som görs i webbläsaren får kontots mejladress. Vill du undvika det: *Settings → Emails → Keep my email addresses private* på ditt GitHub-konto. De fyra commits som redan finns ändras inte.
- [ ] **Bilden Vlm-Blom 2281** i `material/bilder/` har osäker upphovsrätt för originalfotot (Olof Ekberg). Den ligger nu publikt. Ta bort den om Ekbergs rättigheter inte går att reda ut; den finns kvar i historiken men inte längre i trädet.
- Workflowerna är granskade för publikt repo: `check` kör med läsrättighet på PR:er, också från forkar. `granskning` och `hamta-material` körs bara på push, vilket bara den med skrivrättighet kan göra. Inget behöver ändras.
- GitHub Pages blir gratis för publika repon. Det ändrar inte beslutet om Cloudflare Pages, som ger förhandsvisning per gren.

### Cloudflare (Alf, cirka 15 minuter)

- [ ] Välj konto: helst det Cloudflare-konto som redan har arterasen.se (se Domän nedan). Annars ett nytt, gärna med en adress som föreningen kommer åt, så att kontot inte hänger på en person.
- [ ] *Workers & Pages* → *Create* → *Pages* → *Connect to Git*. Ge Cloudflare-appen tillgång till **bara** `AlfCro/arterasen`.
- [ ] Projektnamn `arterasen-info`. Blir namnet upptaget: ändra `cloudflareProject` och `intern.granskningUrl` i `site.config.json`.
- [ ] Bygginställningar: Framework preset *None*, Build command `npm run build:cf`, Build output directory `dist`, Production branch `main`. Node-versionen läses från `.node-version`.
- [ ] Preview deployments: *All non-production branches*.
- [ ] Vänta på första bygget och öppna `https://arterasen-info.pages.dev/`.

### Domän (Alf och den som har Cloudflare-kontot för arterasen.se)

- [x] Kontrollera var DNS för arterasen.se hanteras: hos Cloudflare (Claude, 2026-10-17, se Förutsättningar)
- [ ] Ta reda på vems Cloudflare-konto arterasen.se ligger i (Alf)
- [ ] Helst: skapa Pages-projektet i det kontot, eller bli medlem där. Då skapar Cloudflare DNS-posten själv.
- [ ] I Cloudflare: projektet → *Custom domains* → *Set up a custom domain* → `info.arterasen.se`. Ligger domänen i ett annat konto: lägg CNAME-posten `info` → `arterasen-info.pages.dev` i det kontots DNS, efter att domänen lagts till i Pages (annars fel 522).
- [ ] Vänta tills Cloudflare visar *Active*. Det brukar ta från några minuter till ett par timmar.
- [ ] Slå på **automatisk förnyelse** av arterasen.se hos Loopia (domänägaren). Går domänen ut slutar alla tryckta QR-koder att fungera.

### Kontroll (Claude)

- [ ] Öppna `/`, `/sv/`, `/intern/` och en QR-adress på den riktiga domänen
- [ ] Kontrollera att `granskning`-grenen byggs som förhandsvisning efter nästa push till `main`

## Öppna frågor

- Vem har Cloudflare-kontot där arterasen.se ligger?
- Vem i föreningen blir andra person med inloggning till GitHub, Cloudflare, Trello, Drive och Loopia?
- Ska repot flyttas till en GitHub-organisation innan Cloudflare kopplas?
- Vem betalar domänen framöver, och ska den stå kvar på nuvarande innehavare eller flyttas till föreningen?
- Vem sköter huvudsajten arterasen.se (N.nu), och är det samma person som har Cloudflare-kontot?

Frågorna om domän, konton och huvudsajten skickades till föreningens ordförande 2026-10-18 som ett underlag (se rapporten för 2026-10-18).

## Logg

- 2026-10-17: Bygget förberett för Cloudflare: `npm run build:cf` väljer läge från `CF_PAGES_BRANCH`, `_headers` och `robots.txt` genereras, workflow speglar `main` till `granskning` (Claude).
- 2026-10-17: Checklista för att minst två personer ska komma åt varje tjänst (Alf, Claude).
- 2026-10-17: DNS för arterasen.se visade sig ligga hos Cloudflare, inte hos Loopia. Domänstegen omskrivna. Underlag för två adresser (utkast och publik) väntar på beslut (Claude).
- 2026-10-18: Repot publikt (Alf). Avsnitt om regel för `main`, licens, mejl i commits och en bild med osäker upphovsrätt. Huvudsajten visade sig vara byggd i N.nu. Frågor om domän och konton skickade till ordföranden (Claude).
