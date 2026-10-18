# AGENTS.md

Instruktioner för AI-agenter som arbetar i det här repot (Claude och andra). Människor börjar i [README.md](README.md).

## Börja här, varje gång

1. Läs [PLAN.md](PLAN.md). Den listar alla initiativ, deras status och nästa steg, och länkar till en delplan per initiativ i [plans/](plans/).
2. Läs delplanen för det initiativ du ska arbeta med. Där står mål, beslut som redan är fattade, vad som återstår och öppna frågor.
3. Gör arbetet.
4. Innan du avslutar: bocka av i delplanen, skriv en daterad rad i delplanens **Logg**, och uppdatera status och nästa steg för initiativet i PLAN.md. **Uppdatera README.md i samma PR** när något den beskriver har ändrats: kommandon, mappar, workflows, adresser, rättigheter eller *Läget just nu*. Ändras PLAN.md ska läget i README ha minst samma datum. `npm run check:readme` stoppar PR:en annars.
5. **Skriv en rapport** för arbetspasset i `rapporter/ÅÅÅÅ-MM-DD-kort-namn.md` utifrån [rapporter/_mall.md](rapporter/_mall.md). Lägg den överst under **Rapporter** i PLAN.md och committa den med resten av arbetet. Rapporten är den återkoppling Alf sparar. Sammanfattningen i chatten ska säga samma sak, inte något annat.
6. Nytt initiativ? Kopiera [plans/_mall.md](plans/_mall.md) till `plans/NN-namn.md` och lägg till en rad i PLAN.md. Fråga Alf först om initiativet inte redan är beslutat.

Rapport eller logg? Delplanens **Logg** är en rad per händelse i ett initiativ. Rapporten beskriver ett helt arbetspass över alla initiativ: vad som gjordes, vad som beslutades, vad som kontrollerades och vad som väntar på vem. Små pass, till exempel en enskild textändring från Trello, behöver ingen rapport. Där räcker kommentaren på kortet och PR:en.

Ett beslut som ändrar något i en delplans **Beslut** ska stämmas av med Alf innan det genomförs.

## Projektet i korthet

QR-skyltar på Ärteråsens fäbod (Ore, Rättviks kommun). Varje skylt leder till en kort text om platsen på svenska, engelska och tyska. Texterna skrivs av lågtekniska volontärer i Ärteråsens Kulturförening. De lämnar material i Google Drive och följer arbetet på en Trello-tavla. Agenten gör sidor av materialet, översätter, lägger upp förhandsvisningar och publicerar när föreningen har godkänt.

- Publik sajt: `https://info.arterasen.se/` (Cloudflare Pages-projektet `arterasen-info`, bygger `main` med `npm run build:cf`)
- Utkast: `https://utkast.arterasen.se/` (Pages-projektet `arterasen-utkast`, bygger `main` med `npm run build:preview`, utkast synliga, `noindex`). Det är granskningsversionen som `intern.granskningUrl` pekar på.
- Förhandsvisningar: `arterasen-info` bygger varje annan gren som förhandsvisning, `https://<gren>.arterasen-info.pages.dev/`
- Interna sidor för volontärerna: `/intern/`, genereras från [docs/intern/](docs/intern/)
- Repo-ägare och utvecklare: Alf Cronmalm (AlfCro)

## Kommandon

```sh
npm ci                     # installera
npm run dev                # förhandsvisning på http://localhost:8080 (utkast syns)
npm run check              # validera allt innehåll, måste vara grönt
npm run check:readme       # README nämner alla kommandon, mappar och workflows, länkarna fungerar, läget inte äldre än PLAN.md
npm run build              # produktion: bara platser med status klar på alla språk
npm run build:preview      # som utkast.arterasen.se: utkast, källor och banner syns
npm run ny -- <slug> "<Titel>"   # ny plats från mallen
npm run bild -- <fil> <slug>     # krymp foto och ta bort GPS och annan metadata
npm run verify -- --out=<mapp>   # webbläsartest: skärmdumpar, skyltar som PDF, QR-avkodning, offline
node tools/artifact-preview.mjs dist <mapp>   # gör dist/ publicerbar som claude.ai-artifact (efter build:preview)
npm run hamta              # hämta filerna i material/hamta.json (körs på GitHub, se nedan)
```

Kör `npm run verify` efter varje ändring i `src/` och titta på skärmdumparna med Read. Skriptet avslutas med fel om något brister.

## Struktur

| Sökväg | Innehåll |
| --- | --- |
| `content/platser/<slug>/{sv,en,de}.md` | En plats. `sv.md` är huvudfilen med nummer, bild och källor. |
| `content/start/` | Startsidans text per språk |
| `content/_mall/` | Mall som `npm run ny` kopierar |
| `content/tryckta-skyltar.json` | Skyltar som sitter uppe. Raderna tas aldrig bort. |
| `docs/intern/` | Interna sidor för volontärerna, Markdown på enkel svenska |
| `docs/arbetsflode.md` | Agentens rutin för Trello-korten |
| `docs/fakta.md` | Insamlade fakta om fäboden med källor, obekräftade uppgifter och motsägelser |
| `docs/kallor.md` | Var det finns mer: skrifter, arkiv, webbplatser, och vad som inte är genomsökt |
| `docs/bilder.md` | Bilder av fäboden på nätet med fotograf och licens |
| `material/` | Kopior av fria bilder och skrifter, listade i `material/hamta.json`. Syns på GitHub. Bilder därifrån når sajten bara via `npm run bild` till `content/`. |
| `LICENSE`, `LICENSER.md` | MIT för koden, CC BY 4.0 för texterna, undantagen |
| `docs/drive-mall.md` | Innehållet i Google Docs-mallen som volontärerna kopierar |
| `tools/verify.mjs` | Webbläsartest av den byggda sajten |
| `tools/artifact-preview.mjs` | Kopia av den byggda sajten som går att publicera som artifact |
| `tools/check-readme.mjs` | Kontrollen att README.md hänger med (`npm run check:readme`) |
| `README.md` | Ingången för människor, med *Läget just nu*. Hålls uppdaterad i varje PR som ändrar något den beskriver. |
| `src/` | Byggskript, mallar, stil. Inga ramverk. |
| `plans/` | Delplaner per initiativ |
| `rapporter/` | En rapport per arbetspass, nyast länkad från PLAN.md |
| `site.config.json` | Adress, språk, länkar till Trello och Drive |

## Regler

### Innehåll

- **Hitta aldrig på fakta.** Varje uppgift ska komma från volontärens dokument eller från en källa som står i `kallor`. Är något oklart: ställ frågan på Trello-kortet och lämna uppgiften utanför tills den är besvarad.
- **Fritt material väntar inte.** Bilder och uppgifter med fri licens (CC BY, CC BY-SA, CC0, public domain) eller med upphovspersonens egna fria villkor används i utkasten direkt, med källan angiven. Vänta inte på svar om tillstånd för sådant (beslut av Alf 2026-10-18). Kontakta upphovspersonen parallellt: en privatperson, till exempel Lars Bägerfeldt, ska ha fått veta och inte ha sagt nej innan platsen sätts till `klar`. Ett museum med CC-licens behöver inte tillfrågas.
- **Motsägelser väntar.** Uppgifter där källorna säger olika saker (se *Motsägelser* i `docs/fakta.md`) är ingen tillståndsfråga och lämnas utanför eller skrivs försiktigt tills föreningen har svarat.
- **Status `klar` sätts bara efter godkännande:** kortet ligger i *Godkänt* och flyttades dit av någon annan än den som skrev texten. Se [docs/arbetsflode.md](docs/arbetsflode.md).
- **Adressen (slug) är permanent** när skylten satts upp. Byter en plats namn: lägg till `flyttad_till` i `content/tryckta-skyltar.json`, ta aldrig bort en rad.
- **Privatpersoner** nämns inte utan samtycke. Husen ägs av enskilda.
- **Bilder** används när vi vet vem som tog dem och har rätt att använda dem: volontärens dokument säger att föreningen får använda bilden, eller bilden har en fri licens. Ange `fotograf`, och för fri licens också `bildlicens` och `bildkalla` i `sv.md` (`npm run check` känner igen licenserna i `FREE_LICENSES` i `src/content.mjs`). Kör alltid `npm run bild`. En nutida bild där en person kan kännas igen kräver personens samtycke, oavsett licens.
- **Längd:** ingress högst 160 tecken, brödtext 80–200 ord. Skriv för någon som står framför platsen.
- **Översättningar** har samma fakta i samma ordning som `sv.md`, på naturlig engelska och tyska. Använd ordlistan nedan.

### Ordlista

| Svenska | Engelska | Tyska |
| --- | --- | --- |
| fäbod | summer farm | Sommeralm, Alm |
| vall | meadow | Almwiese, Weide |
| eldhus | fire house | Feuerhaus |
| fäbodkulla | dairymaid | Sennerin |
| messmör | messmör, a sweet whey butter | Messmör, eine süßliche Molkenbutter |
| mjölkstuga | milk house | Milchhütte |
| bomärke | farm mark | Hausmarke |
| ristning | carving | Ritzung |
| fjällko | Swedish mountain cattle (fjällko) | Fjällrind |
| plats (på skylt) | stop | Station |
| Ärteråsens Kulturförening | översätts inte | wird nicht übersetzt |

### Kod

- Vanlig Node utan ramverk och med få beroenden. Sidorna ska fungera utan JavaScript och vara lätta, täckningen på fäboden kan vara svag.
- Relativa länkar överallt utom i `404.html`, så att `dist/` fungerar på vilken värd som helst och direkt från disk.
- Designbeslut (typsnitt, färger, skyltens mått) finns i [plans/01-sajt.md](plans/01-sajt.md). Ändra dem inte i förbigående.
- Kör `npm run check`, `npm run check:readme` och `npm run build` innan du pushar. Titta på ändrade sidor i mobilbredd (390 px).

### Git och publicering

- Grenar: `innehall/<slug>` för ny eller ändrad text, `publicera/<slug>` för statusändring efter godkännande, `skylt/<slug>` för tryckta skyltar, `claude/<kort-beskrivning>` för kod och dokumentation.
- Agenten får själv merga PR:er som **bara** ändrar filer under `content/`, när kontrollen `check` är grön.
- Alla andra ändringar (src/, docs/, plans/, .github/, site.config.json, package.json) går som PR som Alf granskar och mergar.
- Skriv aldrig om historiken på `main` och forcera aldrig push dit.
- **En merge till `main` publicerar.** Cloudflare bygger då både `info.arterasen.se` och `utkast.arterasen.se`. Ingen nyckel eller `wrangler` behövs, och ingen ska läggas i repot.

### Kommunikation

- Volontärerna läser `/intern/` och Trello, inte GitHub. Skriv enkel svenska utan tekniska ord.
- Ändras arbetssättet: uppdatera sidorna i `docs/intern/` och lägg en daterad punkt överst i `docs/intern/90-nytt.md`.
- Lösenord, telefonnummer och mejladresser hör inte hemma i repot eller på `/intern/`. Sidan är olistad men publik.

### Repot är publikt

Sedan 2026-10-18 kan vem som helst läsa allt i repot, även utkast, planer, rapporter och historiken. Det som en gång har pushats ska räknas som publicerat, även om det tas bort senare.

- Skriv om personer som om texten stod på föreningens anslagstavla. Namnge privatpersoner bara när de själva har gått ut med det eller har sagt ja. Skriv "en privatperson" eller rollen hellre än namnet när namnet inte behövs.
- Underlag och brev till enskilda personer läggs inte i repot. Se *Beslutsunderlag* nedan.
- Lägg bara filer i `material/` som får spridas vidare, inte bara användas. Se [material/LASMIG.md](material/LASMIG.md).
- **Licenser** (Alf 2026-10-18): MIT för koden ([LICENSE](LICENSE)) och CC BY 4.0 för texterna, med undantag för bilder och `material/`. Se [LICENSER.md](LICENSER.md). Lägg inte in något i repot som inte får spridas under de villkoren, och ange egna villkor när en fil har det.
- **Det privata repot `AlfCro/arterasen-config`** nämns i README. Dess innehåll stannar där.

### Datum och språk

- Prata med Alf på svenska. Han är fullstackutvecklare och vill ha raka, tekniska svar.
- Datum skrivs ÅÅÅÅ-MM-DD och tid med 24-timmarsklocka (sv-SE), tidszon Europe/Stockholm.
- Dokumentation och innehåll på svenska. Kod, kodkommentarer och commit-meddelanden på engelska.

## Miljön i Claude-sessioner

Saker som var kända 2026-10-17 och 2026-10-18 och som inte syns förrän man stöter på dem.

- **Repot måste kopplas i varje ny session.** Sessionen når bara de repon som är kopplade. Be om `AlfCro/arterasen` om det inte redan finns.
- **Nya repon kan inte skapas** härifrån. Alf skapar dem på github.com.
- **Drift- och kontouppgifter** (DNS-zonen, Cloudflare-inställningar, vem som har inloggning var) dokumenteras i det privata repot `AlfCro/arterasen-config`, inte här. Be Alf koppla det när arbetet kräver det, och kopiera inget därifrån hit utan att han säger till.
- **GitHub GraphQL är spärrat.** `gh pr create` och `gh pr view` fungerar inte. Använd REST:
  ```sh
  gh api repos/AlfCro/arterasen/pulls -X POST -f title="…" -f head="<gren>" -f base=main -F body=@pr-body.md
  gh api repos/AlfCro/arterasen/commits/<sha>/check-runs --jq '.check_runs[] | .name + ": " + (.conclusion // .status)'
  gh api repos/AlfCro/arterasen/pulls/<nr>/merge -X PUT -f merge_method=squash
  ```
- **Grenar kan inte tas bort** härifrån. GitHubs API ger 403 och `git push --delete` avvisas av proxyn (2026-10-18). Be Alf ta bort dem på github.com.
- **Öppna PR:er mot `main`, inte mot en annan PR:s gren.** När PR #5 mergades och dess gren togs bort stängde GitHub PR #6, som hade den grenen som bas, i stället för att byta bas (2026-10-18). Hör två ändringar ihop: lägg dem på samma gren, eller vänta tills den första är mergad.
- **Cloudflare når du inte.** Det finns ingen API-nyckel, och ingen ska läggas i repot. Ändringar i Cloudflares dashboard gör Alf, ofta från mobilen med skärmdumpar till Claude. Projekt, DNS och inställningar står i `AlfCro/arterasen-config`.
- **Publiceringen syns som kontroller på commiten.** Varje push bygger i båda Pages-projekten, och resultatet syns som kontrollerna `Cloudflare Pages: arterasen-info` och `Cloudflare Pages: arterasen-utkast`, med samma kommando som ovan. Adresserna till förhandsvisningarna:
  ```sh
  gh api repos/AlfCro/arterasen/commits/<sha>/check-runs --jq '.check_runs[] | select(.name|startswith("Cloudflare")) | .output.summary' | grep -oE 'https://[a-z0-9.-]+\.pages\.dev' | sort -u
  ```
  En gren får adressen `https://<gren där / blir ->.arterasen-info.pages.dev/`, till exempel `claude-pages-info-utkast` för `claude/pages-info-utkast`. Cloudflare skriver också en kommentar per projekt på varje PR.
- **Efter en ny klon kan lokala `main` vara gammal** om sessionen klonade en annan gren först. Kör `git fetch origin main && git checkout -B main origin/main` innan du bygger från `main`.
- **Klonen är grund och har bara en gren.** Efter push av en ny gren saknas spårningsreferensen, och en stopp-kontroll kan då klaga på opushade commits trots att de finns på GitHub. Lös det med:
  ```sh
  git config --add remote.origin.fetch '+refs/heads/<gren>:refs/remotes/origin/<gren>'
  git fetch origin <gren> && git branch -u origin/<gren>
  ```
- **Hämta `main` innan push** (`git fetch origin main && git rebase origin/main`), annars kan push från en gammal grund klon avvisas.
- **Chromium** finns under `$PLAYWRIGHT_BROWSERS_PATH`. `npm run verify` hittar den själv. Kör aldrig `playwright install`.
- **Kopplingar:** Trello och Google Drive behövs för arbetsflödet. 2026-10-17 var Trello inte installerat och Google Drive installerat men inte anslutet. Kontrollera med ListConnectors och föreslå dem med SuggestConnectors. Atlassian-kopplingen hör inte till föreningen och används inte här.
- **DNS-uppslag** fungerar inte från skalet (ingen `dig`, ingen namnupplösning). Använd WebFetch mot `https://dns.google/resolve?name=<domän>&type=<NS|A|MX|CNAME>`. Efter tre, fyra uppslag i rad kan proxyn svara 429 och spärra fler försök i passet (2026-10-18), så välj uppslagen med omsorg.
- **Se sajten:** `https://utkast.arterasen.se/` visar `main` med utkast, och en gren syns på sin förhandsvisning (se ovan). Utan nät eller före en push går det att publicera bygget som artifact: `npm run build:preview`, sedan `node tools/artifact-preview.mjs dist <mapp i scratchpad>`. Skriptet skriver ut `files`-kartan. Publicera `<mapp>/index.html` med Artifact-verktyget, `root` satt till mappen och `files` från skriptet. Senaste versionen: se rapporten i PLAN.md. En artifact från en tidigare session uppdateras genom att dess URL skickas som `url`.
- **Beslutsunderlag** som Alf ska läsa eller dela skrivs som Claude Docs-dokument, eller som en självständig HTML-fil (allt inbäddat, inga externa resurser) som skickas till Alf med SendUserFile när han vill ha en fil att skicka vidare. Aldrig som filer i repot, eftersom repot är publikt. Länka eller nämn dem från delplanen och rapporten, och skriv frågorna i rapporten så att nästa session vet vad som frågats.
- **GitHub-inställningar** går inte att läsa eller ändra härifrån: branch protection och rulesets ger 403, och Actions-inställningarna spärras av proxyn. Be Alf göra dem på github.com. Repots synlighet och övriga metadata går att läsa med `gh api repos/AlfCro/arterasen`.
- **Nätet från skalet** går via en proxy med vitlista. npm fungerar. Webbsidor läses med WebFetch, inte curl.
- **Filer från webben** (bilder, PDF:er) kan inte laddas ner härifrån. Lägg dem i `material/hamta.json` och pusha till en gren: workflowen `hamta-material` hämtar dem och committar till grenen. Resultatet står i `material/hamta-status.json`. Se [material/LASMIG.md](material/LASMIG.md).
- **WebFetch** når bara adresser som har synts i samtalet (sökresultat eller från Alf), uppgraderar http till https och klarar därför inte sajter som bara har http (fnf.nu, taxelson.se:s objektsidor). Långa PDF:er läses bara delvis. Facebook kräver inloggning och går bara att läsa om chatten är kopplad till Alfs dator.
- **WebFetch och våra egna sajter:** `robots.txt` släpper in `Claude-User`, så WebFetch kan läsa `utkast.arterasen.se`, `/intern/` och förhandsvisningarna. Verktyget sparar dock `robots.txt` per värdnamn i mer än 30 minuter (2026-10-18). Efter en ändring i `robots.txt` kan en adress som redan besökts ge `ROBOTS_DISALLOWED` trots att filen live är rätt. Läs då samma bygge på en adress verktyget inte har besökt, till exempel deploy-adressen `https://<hash>.arterasen-info.pages.dev/` ur kontrollen på commiten, eller be Alf öppna `/robots.txt` i telefonen. Ett nytt försök direkt efter ett misslyckat stoppas också av verktyget.
- **Leta inte igen** efter sådant som redan finns i `docs/fakta.md`, `docs/kallor.md` och `docs/bilder.md`. Där står också vad som inte gick att nå.
