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

- Publik sajt: `https://info.arterasen.se/` (Cloudflare Pages, gren `main`)
- Förhandsvisningar: Cloudflare Pages, en per gren, plus `granskning` som speglar `main` med utkast synliga
- Interna sidor för volontärerna: `/intern/`, genereras från [docs/intern/](docs/intern/)
- Repo-ägare och utvecklare: Alf Cronmalm (AlfCro)

## Kommandon

```sh
npm ci                     # installera
npm run dev                # förhandsvisning på http://localhost:8080 (utkast syns)
npm run check              # validera allt innehåll, måste vara grönt
npm run check:readme       # README nämner alla kommandon, mappar och workflows, länkarna fungerar, läget inte äldre än PLAN.md
npm run build              # produktion: bara platser med status klar på alla språk
npm run build:preview      # som granskningsversionen: utkast, källor och banner syns
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
| `material/` | Kopior av fria bilder och skrifter, listade i `material/hamta.json`. Syns på GitHub, aldrig på sajten. |
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
- **Status `klar` sätts bara efter godkännande:** kortet ligger i *Godkänt* och flyttades dit av någon annan än den som skrev texten. Se [docs/arbetsflode.md](docs/arbetsflode.md).
- **Adressen (slug) är permanent** när skylten satts upp. Byter en plats namn: lägg till `flyttad_till` i `content/tryckta-skyltar.json`, ta aldrig bort en rad.
- **Privatpersoner** nämns inte utan samtycke. Husen ägs av enskilda.
- **Bilder** används bara om dokumentet säger att föreningen får använda dem och vem fotografen är. Kör alltid `npm run bild`.
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

### Kommunikation

- Volontärerna läser `/intern/` och Trello, inte GitHub. Skriv enkel svenska utan tekniska ord.
- Ändras arbetssättet: uppdatera sidorna i `docs/intern/` och lägg en daterad punkt överst i `docs/intern/90-nytt.md`.
- Lösenord, telefonnummer och mejladresser hör inte hemma i repot eller på `/intern/`. Sidan är olistad men publik.

### Repot är publikt

Sedan 2026-10-18 kan vem som helst läsa allt i repot, även utkast, planer, rapporter och historiken. Det som en gång har pushats ska räknas som publicerat, även om det tas bort senare.

- Skriv om personer som om texten stod på föreningens anslagstavla. Namnge privatpersoner bara när de själva har gått ut med det eller har sagt ja. Skriv "en privatperson" eller rollen hellre än namnet när namnet inte behövs.
- Underlag och brev till enskilda personer läggs inte i repot. Se *Beslutsunderlag* nedan.
- Lägg bara filer i `material/` som får spridas vidare, inte bara användas. Se [material/LASMIG.md](material/LASMIG.md).
- Ingen licens är vald. Ändra inte `license` i `package.json` och lägg inte till en LICENSE-fil förrän Alf och föreningen har bestämt (se [plans/02-hosting.md](plans/02-hosting.md)).

### Datum och språk

- Prata med Alf på svenska. Han är fullstackutvecklare och vill ha raka, tekniska svar.
- Datum skrivs ÅÅÅÅ-MM-DD och tid med 24-timmarsklocka (sv-SE), tidszon Europe/Stockholm.
- Dokumentation och innehåll på svenska. Kod, kodkommentarer och commit-meddelanden på engelska.

## Miljön i Claude-sessioner

Saker som var kända 2026-10-17 och 2026-10-18 och som inte syns förrän man stöter på dem.

- **Repot måste kopplas i varje ny session.** Sessionen når bara de repon som är kopplade. Be om `AlfCro/arterasen` om det inte redan finns.
- **Nya repon kan inte skapas** härifrån. Alf skapar dem på github.com.
- **GitHub GraphQL är spärrat.** `gh pr create` och `gh pr view` fungerar inte. Använd REST:
  ```sh
  gh api repos/AlfCro/arterasen/pulls -X POST -f title="…" -f head="<gren>" -f base=main -F body=@pr-body.md
  gh api repos/AlfCro/arterasen/commits/<sha>/check-runs --jq '.check_runs[] | .name + ": " + (.conclusion // .status)'
  gh api repos/AlfCro/arterasen/pulls/<nr>/merge -X PUT -f merge_method=squash
  ```
- **Efter en ny klon kan lokala `main` vara gammal** om sessionen klonade en annan gren först. Kör `git fetch origin main && git checkout -B main origin/main` innan du bygger från `main`.
- **Klonen är grund och har bara en gren.** Efter push av en ny gren saknas spårningsreferensen, och en stopp-kontroll kan då klaga på opushade commits trots att de finns på GitHub. Lös det med:
  ```sh
  git config --add remote.origin.fetch '+refs/heads/<gren>:refs/remotes/origin/<gren>'
  git fetch origin <gren> && git branch -u origin/<gren>
  ```
- **Hämta `main` innan push** (`git fetch origin main && git rebase origin/main`), annars kan push från en gammal grund klon avvisas.
- **Chromium** finns under `$PLAYWRIGHT_BROWSERS_PATH`. `npm run verify` hittar den själv. Kör aldrig `playwright install`.
- **Kopplingar:** Trello och Google Drive behövs för arbetsflödet. 2026-10-17 var Trello inte installerat och Google Drive installerat men inte anslutet. Kontrollera med ListConnectors och föreslå dem med SuggestConnectors. Atlassian-kopplingen hör inte till föreningen och används inte här.
- **DNS-uppslag** fungerar inte från skalet (ingen `dig`, ingen namnupplösning). Använd WebFetch mot `https://dns.google/resolve?name=<domän>&type=<NS|A|MX|CNAME>`.
- **Se sajten innan hosting finns:** `npm run build:preview`, sedan `node tools/artifact-preview.mjs dist <mapp i scratchpad>`. Skriptet skriver ut `files`-kartan. Publicera `<mapp>/index.html` med Artifact-verktyget, `root` satt till mappen och `files` från skriptet. Senaste versionen: se rapporten i PLAN.md. En artifact från en tidigare session uppdateras genom att dess URL skickas som `url`.
- **Beslutsunderlag** som Alf ska läsa eller dela skrivs som Claude Docs-dokument, eller som en självständig HTML-fil (allt inbäddat, inga externa resurser) som skickas till Alf med SendUserFile när han vill ha en fil att skicka vidare. Aldrig som filer i repot, eftersom repot är publikt. Länka eller nämn dem från delplanen och rapporten, och skriv frågorna i rapporten så att nästa session vet vad som frågats.
- **GitHub-inställningar** går inte att läsa eller ändra härifrån: branch protection och rulesets ger 403, och Actions-inställningarna spärras av proxyn. Be Alf göra dem på github.com. Repots synlighet och övriga metadata går att läsa med `gh api repos/AlfCro/arterasen`.
- **Nätet från skalet** går via en proxy med vitlista. npm fungerar. Webbsidor läses med WebFetch, inte curl.
- **Filer från webben** (bilder, PDF:er) kan inte laddas ner härifrån. Lägg dem i `material/hamta.json` och pusha till en gren: workflowen `hamta-material` hämtar dem och committar till grenen. Resultatet står i `material/hamta-status.json`. Se [material/LASMIG.md](material/LASMIG.md).
- **WebFetch** når bara adresser som har synts i samtalet (sökresultat eller från Alf), uppgraderar http till https och klarar därför inte sajter som bara har http (fnf.nu, taxelson.se:s objektsidor). Långa PDF:er läses bara delvis. Facebook kräver inloggning och går bara att läsa om chatten är kopplad till Alfs dator.
- **Leta inte igen** efter sådant som redan finns i `docs/fakta.md`, `docs/kallor.md` och `docs/bilder.md`. Där står också vad som inte gick att nå.
