# 03 Innehållsflöde och kommunikation

Status: Pågår
Ansvarig: Alf (uppsättning), Claude (daglig hantering), föreningen (texter och godkännande)
Senast uppdaterad: 2026-10-20

## Mål

Volontärer utan teknisk vana kan lämna text och bilder, läsa en förhandsvisning och godkänna den, utan GitHub. Claude tar hand om allt mellan Trello-kort och publicerad sida. Alla vet var de hittar hur arbetet går till.

## Klart när

- [ ] Claude kan läsa Trello-tavlan, också bilagorna på korten
- [ ] Tavlan och mallkortet finns, och volontärerna har tillgång
- [ ] En plats har gått hela vägen från kort till publicerad sida
- [ ] Claude går igenom tavlan automatiskt varje morgon
- [ ] Volontärerna har fått länken till `/intern/`

## Beslut

- 2026-10-17: **Trello för flödet** (Alf). Ett kort per plats som flyttas mellan listor.
- 2026-10-20: **Allt material på Trello-kortet** (Alf). Texten skrivs i kortets beskrivning efter [kortmallen](../docs/kortmall.md), och foton bifogas på kortet. Ersätter delen av beslutet 2026-10-17 om Google Drive för material. Inget annat verktyg än Trello behövs för volontärerna.
- 2026-10-17: **Claude publicerar direkt** när ett kort ligger i *Godkänt* och kontrollerna är gröna (Alf). Gäller bara ändringar under `content/`. Kod går via Alf.
- 2026-10-17: **Arbetssättet beskrivs på `/intern/`** (Alf). Sidorna byggs från `docs/intern/` så att instruktionerna alltid stämmer med sajten. Frågor och diskussion sker som kommentarer på Trello-kort, ändringar i arbetssättet skrivs upp på `/intern/nytt/`.
- 2026-10-17: Jira-kopplingen i Claude hör inte till föreningen och används inte här.
- 2026-10-17 (förslag, bekräfta): **Fyra ögon.** Den som godkänner ska vara någon annan än den som skrev texten. Claude kontrollerar det i kortets historik.
- 2026-10-19 (föreningens förslag, väntar på Alf): **En skriver, två läser** (svar D2). Vilka medlemmar som helst får läsa, helst folk med koppling till Ärteråsen och Näset. Går längre än fyra ögon: ett kort skulle behöva två godkännanden. Ändrar Claude rutinen i `docs/arbetsflode.md` och `/intern/` när Alf har sagt ja.

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

- [x] Koppla **Trello** till Claude (Alf, 2026-10-20). Kopplingen går via Alfs Trello-konto.
- [ ] **Foton från korten till repot.** Läget 2026-10-20: kopplingen kan lista bilagor (`trelloReadCard` med `list_attachments` ger namn, storlek och adress) men har inget sätt att hämta själva filen. Skalet når inte `trello.com` eller `api.trello.com` (proxyn svarar 403, policy), och en omstart ändrar inte det. Nästa steg: Alf bifogar en bild på kortet *Test: bifoga en bild från mobilen* i *Idéer och frågor*, och nästa session kör `list_attachments` för att se vad kopplingen ger. Välj sedan (Alf):
  - en workflow likt `hamta-material` som hämtar bilagor med en Trello-nyckel och token som GitHub-hemligheter. Claude listar kort, bilagor och plats i en fil. Workflowen hämtar bilagan, kör `npm run bild` och committar bara den krympta bilden utan metadata till grenen. Originalet och nyckeln hamnar aldrig i repot.
  - eller att Alf laddar ner fotona och lägger dem i chatten. Enklast, men Alf blir en flaskhals.
- [x] Tavlan [QR-skyltar](https://trello.com/b/yhacWi40/qr-skyltar) med de sju listorna (Alf skapade tavlan, Claude listorna, 2026-10-20). Gratisversionen tillåter 10 medlemmar per arbetsyta och 10 MB per bilaga.
- [ ] Döp om arbetsytan från *Trello Workspace* till *Ärteråsens Kulturförening*, kontrollera att tavlan är *Private*, och stäng tavlan *Ärteråsens Kulturförening* som bara innehåller Trellos startguide (Alf). Kopplingen kan inte ändra arbetsytor, synlighet eller stänga tavlor.
- [x] Kortet *MALL – kopiera mig* överst i listan *Skriver*, med texten i [docs/kortmall.md](../docs/kortmall.md) (Claude, 2026-10-20)
- [x] Länken i `intern.trelloUrl` i `site.config.json` (Claude, 2026-10-20). `/intern/` länkar nu till tavlan.
- [ ] Bjud in volontärerna till tavlan, skicka länken till `/intern/` (Alf eller föreningen)
- [ ] Schemalagd uppgift: varje morgon går Claude igenom tavlan enligt `docs/arbetsflode.md` (Claude, när kopplingarna fungerar)
- [ ] Provkör med en plats och en volontär. Justera rutinen och skriv upp ändringar på `/intern/nytt/`.

## Öppna frågor

- ~~Vem får godkänna?~~ Vilka medlemmar som helst, två läsare per text (föreningens förslag D2). Väntar på Alf, se *Beslut*.
- Granskare: föreningen har en som kan läsa engelska och letar efter någon som kan tyska (D3). Två i styrelsen skriver det mesta.
- Ska Claude gå igenom tavlan varje morgon, eller bara när någon säger till?
- Räcker 10 medlemmar på Trello-arbetsytan?
- Hur kommer fotona från korten till repot? Se *Att göra*.

## Logg

- 2026-10-17: Arbetsflödet beskrivet, interna sidor och agentens rutin skrivna. Väntar på kopplingar (Claude).
- 2026-10-18: Volontärerna informerade på `/intern/` om att texterna syns för alla när repot är publikt. Frågorna om godkännare, skribenter, översättningsgranskare och Google-konto skickade till ordföranden (D2, D3, A6) (Claude).
- 2026-10-19: Svar från ordföranden: två i styrelsen skriver det mesta, en granskare för engelska finns, tyska saknas. Föreningen föreslår två läsare per text. Föreningen ska ha ett eget Google-konto (Claude).
- 2026-10-20: Bara Trello (Alf). Texten skrivs på kortet och foton bifogas där. Kortmall i stället för dokumentmall, volontärsidorna och agentens rutin omskrivna (Claude).
- 2026-10-20: Trello kopplat. Tavlan QR-skyltar har de sju listorna, mallkortet och ett provkort för bilagor. Kopplingen kan inte hämta bilagor, och skalet når inte trello.com. Länken till tavlan i `site.config.json` (Alf, Claude).
