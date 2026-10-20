# Arbetsflöde för agenten: Trello-kort till publicerad sida

Den här rutinen följer Claude när tavlan gås igenom, antingen när någon ber om det eller i den schemalagda morgonkörningen. Volontärernas version av samma flöde finns på `/intern/` ([docs/intern/00-index.md](intern/00-index.md)).

## Förutsättningar

- Kopplingen **Trello** finns i sessionen. Saknas den: gör inget på tavlan, skriv till Alf att den saknas och avsluta.
- Repot `AlfCro/arterasen` är kopplat och klonat. Kör `npm ci`.
- Länken till tavlan står i `site.config.json` under `intern.trelloUrl`.
- Kortet *MALL – kopiera mig* överst i listan *Skriver* har samma text som [kortmall.md](kortmall.md). Ändras filen: uppdatera mallkortet. Mallkortet hanteras aldrig som en plats.
- **Varje plats har ett kort**, också de som Claude har skrivit ur källorna. Kortets beskrivning har platsens svenska text under rubrikerna i kortmallen och ska stämma med `sv.md`. Ändrar Claude `sv.md`, uppdateras beskrivningen i samma pass.
- **Numret står inte i kortnamnet** och inte i utkastkortens beskrivning. Numren finns i `sv.md` och på kortet *Platslistan och numreringen* i *Idéer och frågor*, så att en omnumrering bara ändrar ett kort. Förslagskorten har arbetsnumret från underlaget de kommer ifrån.

## Ordning för en genomgång

Gå igenom listorna i den här ordningen och hantera varje kort för sig. Ett fel på ett kort ska inte stoppa de andra.

1. *Godkänt* → publicera
2. *Klar för Claude* → gör sida eller ändring
3. *Skylt uppsatt* → registrera skylten (bara kort som inte redan har en kommentar om registrering)
4. *Idéer och frågor* → svara på frågor om arbetssättet om svaret står i `docs/intern/` eller i en plan. Annars: tagga Alf i en kommentar. Nya kommentarer på kortet *Platslistan och numreringen*: se *Numrera om* nedan.

Avsluta med en kort sammanfattning till Alf: vad som hanterades, vad som väntar och eventuella fel.

## Klar för Claude: ny plats eller ändring

1. **Läs kortet:** namn, beskrivningen med texten enligt kortmallen, alla kommentarer sedan förra förhandsvisningen och bilagorna. Står det *Ändrat i beskrivningen* i en kommentar: jämför beskrivningen med platsens `sv.md`.
   - **Förslagskort** (beskrivningen börjar med *Förslag:*) har innehåll och sidhänvisningar men ingen färdig text. Skriv texten ur källorna på kortet, läs uppgifterna i källan, och följ svaren på kortets frågor. Ersätt sedan beskrivningen med texten under kortmallens rubriker.
2. **Hämta fotona** som är bifogade på kortet till en mapp utanför repot. Kopplingen ger bara bilagornas namn och adress (`list_attachments`), och skalet når inte trello.com. Tills ett sätt är valt (se [plans/03](../plans/03-innehallsflode.md)): skriv till Alf vilka bilagor som behövs och fortsätt med texten.
3. **Ny eller ändring?** Börjar kortnamnet med *Ändra:* eller finns platsen redan i `content/platser/`, är det en ändring.
4. **Ny plats:** välj slug av platsens namn: gemener, å och ä blir a, ö blir o, mellanslag blir bindestreck, högst 20 tecken. Kontrollera att den inte finns i `content/tryckta-skyltar.json`. Kör `npm run ny -- <slug> "<Titel>"`.
5. **Skriv `sv.md`** utifrån kortet:
   - Behåll volontärens innehåll och fakta. Korta och förtydliga enligt mallen, men lägg inte till uppgifter som inte står på kortet eller i en källa du har läst.
   - Lägg kortets källor i `kallor`, och länken till Trello-kortet sist. Kortet syns bara för tavlans medlemmar, så länken säger inget till andra.
   - Är något oklart eller motsägelsefullt: skriv det som en fråga i kortkommentaren i steg 11 och låt uppgiften vara utanför texten.
6. **Översätt** till `en.md` och `de.md` med samma fakta i samma ordning. Använd ordlistan i [AGENTS.md](../AGENTS.md).
7. **Foton:** när kortet anger fotograf och att föreningen får använda bilden, eller när bilden har en fri licens (se [bilder.md](bilder.md)). `npm run bild -- <fil> <slug>`, sätt `bild` och `fotograf` i `sv.md`, för fri licens också `bildlicens` och `bildkalla`, och `bildtext` i alla språk. Fler bilder: `npm run bild -- <fil> <slug> bild-2` och en rad under `fler_bilder` i varje språkfil.
8. **Status** är `utkast` i alla språk. Vid ändring av en publicerad plats: behåll `klar`, men PR:en mergas inte förrän ändringen är godkänd (se nedan).
9. **Kontrollera:** `npm run check` utan fel och `npm run build:preview`. Titta på sidan i mobilbredd.
10. **Git:**
    - Gren `innehall/<slug>`, commit, PR med titeln *Innehåll: <Titel>* och kortets länk i beskrivningen.
    - **Ny plats:** merga när `check` är grön. Platsen är utkast och syns bara i granskningsversionen. Granskningslänk: `<granskningUrl>sv/<slug>/`, alltså `https://utkast.arterasen.se/sv/<slug>/`. Utkastsajten byggs om efter merge. Vänta tills kontrollen `Cloudflare Pages: arterasen-utkast` på merge-commiten är grön innan du länkar.
    - **Ändring av publicerad plats:** merga inte. Granskningslänk är PR:ens egen förhandsvisning. Hämta adressen ur Cloudflares kommentar på PR:en eller ur kontrollen `Cloudflare Pages: arterasen-info` (kommandot står under *Miljön i Claude-sessioner* i [AGENTS.md](../AGENTS.md); `gh pr checks` fungerar inte). Grenaliaset är `https://innehall-<slug>.arterasen-info.pages.dev/`.
11. **Vänta på förhandsvisningen** och öppna länken för att se att sidan finns. Skriv sedan en kommentar på kortet:
    - Länkar till sidan på svenska, engelska och tyska
    - Beskrivningen är uppdaterad så att den stämmer med `sv.md`
    - Vad du har ändrat jämfört med kortets text, i en eller två meningar
    - Frågor, om det finns några
    - *Ser det bra ut? Flytta kortet till Godkänt. Annars: skriv vad som ska ändras och flytta tillbaka till Klar för Claude.*
12. Flytta kortet till **Granska**.

## Länkar mellan platser

Hänvisa till en annan plats med en länk, `[Ristningarna](../ristningarna/)`, aldrig med dess nummer eller med ordet skylt. Numren ändras, och det är inte bestämt om det blir skyltar eller blad som delas ut. `npm run check` stoppar en publicerad plats som länkar till en plats som inte är publicerad, så publicera den andra platsen först eller ta bort länken.

## Numrera om

Omnumrering kräver inget godkännande (Alf 2026-10-20). Föreningen skriver den nya ordningen i en kommentar på kortet *Platslistan och numreringen*.

1. Ändra `nummer` i `sv.md` för alla platser som byter nummer, på grenen `innehall/numrering`. `npm run check` kräver unika nummer, så hela den nya ordningen görs i en commit.
2. PR *Innehåll: numrering* med länk till kortet. Merga när `check` är grön, också när publicerade platser byter nummer.
3. Uppdatera avsnittet *Numren i dag* på kortet och svara i en kommentar.

Numret står på skyltar och blad som skrivs ut, men adressen och QR-koden bygger på slugen och ändras inte. Att låsa numret när något är tryckt tas upp när numren är bestämda (Alf 2026-10-20).

## Godkänt: publicera

1. **Vem godkände?** Läs kortets aktivitet. Flyttades kortet till *Godkänt* av samma person som skrev texten (den som flyttade det till *Klar för Claude*), skriv en vänlig kommentar om att någon annan behöver godkänna och flytta tillbaka kortet till *Granska*.
2. **Nya önskemål?** Finns kommentarer med ändringsönskemål efter din senaste förhandsvisning: behandla kortet som *Klar för Claude* i stället.
3. **Ny plats (utkast i `main`):** gren `publicera/<slug>`, sätt `status: klar` i alla språkfiler, PR *Publicera: <Titel>* med kortlänk och vem som godkände. Merga när `check` är grön.
4. **Ändring av publicerad plats:** merga den öppna `innehall/<slug>`-PR:en när `check` är grön. Skriv i PR:en vem som godkände.
5. **Kontrollera produktion** när bygget är klart, alltså när kontrollen `Cloudflare Pages: arterasen-info` på merge-commiten är grön: `https://info.arterasen.se/<slug>/` ska leda till språksidan och `/sv/<slug>/` ska visa den nya texten.
6. **Kommentera** på kortet: länk till den publika sidan och till `https://info.arterasen.se/skyltar/` där skylten kan skrivas ut. Ändrades bara texten på en plats som redan har skylt behöver ingen ny skylt tryckas, skriv det.
7. Flytta kortet till **Publicerat, skylt ska tryckas**. Gällde det en ändring av en plats som redan har skylt: flytta direkt till **Skylt uppsatt**.

## Skylt uppsatt: registrera

1. Läs datumet i kortets kommentar, annars dagens datum.
2. Gren `skylt/<slug>`, lägg till `{ "slug": "<slug>", "uppsatt": "ÅÅÅÅ-MM-DD" }` i `content/tryckta-skyltar.json`, PR *Skylt uppsatt: <Titel>*, merga när `check` är grön.
3. Kommentera på kortet att skylten är registrerad och att adressen nu är låst.

## När något går fel

- **`check` hittar fel som du inte kan rätta utifrån materialet:** merga inte. Kommentera på kortet vad som saknas och flytta tillbaka det till *Skriver*.
- **Bygget eller förhandsvisningen misslyckas av tekniska skäl:** rör inte kortet. Skriv till Alf med länk till PR:en.
- **Osäkert om något får publiceras** (personuppgifter, bildrättigheter, känsliga uppgifter om ägare): publicera inte. Fråga på kortet och tagga Alf.

## Ändra arbetssättet

Ändringar i rutinen beslutas med Alf. Uppdatera då både den här filen och sidorna i `docs/intern/`, och lägg en daterad rad överst i `docs/intern/90-nytt.md`. Det är så volontärerna får veta att något har ändrats.
