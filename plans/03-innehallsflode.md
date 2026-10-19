# 03 Innehållsflöde och kommunikation

Status: Ej startat
Ansvarig: Alf (uppsättning), Claude (daglig hantering), föreningen (texter och godkännande)
Senast uppdaterad: 2026-10-19

## Mål

Volontärer utan teknisk vana kan lämna text och bilder, läsa en förhandsvisning och godkänna den, utan GitHub. Claude tar hand om allt mellan dokument och publicerad sida. Alla vet var de hittar hur arbetet går till.

## Klart när

- [ ] Claude kan läsa Trello-tavlan och Drive-mappen
- [ ] Tavlan och mappen finns, och volontärerna har tillgång
- [ ] En plats har gått hela vägen från dokument till publicerad sida
- [ ] Claude går igenom tavlan automatiskt varje morgon
- [ ] Volontärerna har fått länken till `/intern/`

## Beslut

- 2026-10-17: **Trello för flödet, Google Drive för material** (Alf). Ett kort per plats som flyttas mellan listor. Text i Google-dokument från en mall, foton i samma mapp.
- 2026-10-17: **Claude publicerar direkt** när ett kort ligger i *Godkänt* och kontrollerna är gröna (Alf). Gäller bara ändringar under `content/`. Kod går via Alf.
- 2026-10-17: **Arbetssättet beskrivs på `/intern/`** (Alf). Sidorna byggs från `docs/intern/` så att instruktionerna alltid stämmer med sajten. Frågor och diskussion sker som kommentarer på Trello-kort, ändringar i arbetssättet skrivs upp på `/intern/nytt/`.
- 2026-10-17: Jira-kopplingen i Claude hör inte till föreningen och används inte här.
- 2026-10-17 (förslag, bekräfta): **Fyra ögon.** Den som godkänner ska vara någon annan än den som skrev texten. Claude kontrollerar det i kortets historik.
- 2026-10-19 (föreningens förslag, väntar på Alf): **En skriver, två läser** (svar D2). Vilka medlemmar som helst får läsa, helst folk med koppling till Ärteråsen och Näset. Går längre än fyra ögon: ett kort skulle behöva två godkännanden. Ändrar Claude rutinen i `docs/arbetsflode.md` och `/intern/` när Alf har sagt ja.

## Väntar på beslut

### Bara Trello, utan Google Drive? (Alf)

Alf 2026-10-19: tvivlar på att många behöver komma åt en mapp i Google Drive. Trello blir det viktiga. Inte beslutat än, och beslutet 2026-10-17 om Drive för material gäller tills vidare.

Vad det skulle betyda:

- Volontären skriver texten direkt i kortets beskrivning på Trello, efter en kortmall med samma rubriker som [docs/drive-mall.md](../docs/drive-mall.md), och bifogar foton på kortet. Ett dokument från datorn går också att bifoga.
- Claude behöver bara Trello-kopplingen, inte Drive.
- Föreningens Google-konto (A6) behövs då inte för Drive. En adress som styrelsen delar (A4) behövs fortfarande, som kontaktadress för Trello, Cloudflare och GitHub, och kan vara samma konto.
- Ändras om beslutet tas: sidorna i `docs/intern/` (Så jobbar vi, Skriva, Granska), `docs/drive-mall.md` blir en kortmall, `docs/arbetsflode.md`, `intern.driveUrl` i `site.config.json` och *Klart när* här.
- Drive kan finnas kvar för den som hellre skriver i ett dokument, med föreningens konto som ägare.

## Listor på Trello-tavlan

1. Idéer och frågor
2. Skriver
3. Klar för Claude
4. Granska
5. Godkänt
6. Publicerat, skylt ska tryckas
7. Skylt uppsatt

Vad varje lista betyder för volontärerna står i [docs/intern/00-index.md](../docs/intern/00-index.md). Vad Claude gör står i [docs/arbetsflode.md](../docs/arbetsflode.md).

## Att göra

- [ ] Koppla **Trello** och **Google Drive** till Claude under *Inställningar → Kopplingar* på claude.ai (Alf)
- [ ] Skapa ett Google-konto som föreningen äger och låt det äga Drive-mappen (beslut av föreningen, svar A6). Förslag: samma konto blir styrelsens gemensamma adress (A4), se [02](02-hosting.md) (Alf)
- [ ] Skapa mappen *Ärteråsen QR-skyltar* med undermappen *Platser* och dokumentet *Mall – ny plats* från [docs/drive-mall.md](../docs/drive-mall.md). Claude gör det när Drive är kopplat.
- [ ] Skapa en Trello-arbetsyta för föreningen och tavlan *QR-skyltar* med listorna ovan. Gratisversionen tillåter 10 medlemmar per arbetsyta. Claude gör det om kopplingen tillåter.
- [ ] Lägg in länkarna i `intern.trelloUrl` och `intern.driveUrl` i `site.config.json` (Claude, PR till Alf)
- [ ] Bjud in volontärerna till tavlan och mappen, skicka länken till `/intern/` (Alf eller föreningen)
- [ ] Schemalagd uppgift: varje morgon går Claude igenom tavlan enligt `docs/arbetsflode.md` (Claude, när kopplingarna fungerar)
- [ ] Provkör med en plats och en volontär. Justera rutinen och skriv upp ändringar på `/intern/nytt/`.

## Öppna frågor

- ~~Vem får godkänna?~~ Vilka medlemmar som helst, två läsare per text (föreningens förslag D2). Väntar på Alf, se *Beslut*.
- Granskare: föreningen har en som kan läsa engelska och letar efter någon som kan tyska (D3). Två i styrelsen skriver det mesta.
- Ska Claude gå igenom tavlan varje morgon, eller bara när någon säger till?
- Räcker 10 medlemmar på Trello-arbetsytan? Viktigare om Trello blir enda verktyget.
- Behövs Google Drive alls, eller räcker Trello? Se *Väntar på beslut*.

## Logg

- 2026-10-17: Arbetsflödet beskrivet, interna sidor och agentens rutin skrivna. Väntar på kopplingar (Claude).
- 2026-10-18: Volontärerna informerade på `/intern/` om att texterna syns för alla när repot är publikt. Frågorna om godkännare, skribenter, översättningsgranskare och Google-konto skickade till ordföranden (D2, D3, A6) (Claude).
- 2026-10-19: Svar från ordföranden: två i styrelsen skriver det mesta, en granskare för engelska finns, tyska saknas. Föreningen föreslår två läsare per text. Föreningen ska ha ett eget Google-konto (Claude).
- 2026-10-19: Alf tvivlar på att Drive behövs för många, Trello blir det viktiga. Vad ett byte till bara Trello innebär står under *Väntar på beslut* (Claude).
