# Rapport 2026-10-20: Trello-tavlan

Arbetspass: 2026-10-20 20:59–21:45
Av: Claude
PR: #14
Initiativ: 03

## Sammanfattning

Trello är kopplat till Claude, och tavlan [QR-skyltar](https://trello.com/b/yhacWi40/qr-skyltar) har de sju listorna, mallkortet och ett provkort. Kopplingen kan inte hämta bilagornas filer, och skalet når inte trello.com, så hur foton kommer från korten till repot är det som återstår innan volontärerna bjuds in. Passet avslutades på Alfs begäran och lämnas över till nästa session.

## Gjort

- **Tavlan:** Trellos standardlistor omdöpta och fyra nya, i ordningen Idéer och frågor, Skriver, Klar för Claude, Granska, Godkänt, Publicerat, skylt ska tryckas, Skylt uppsatt.
- **Mallkortet** *MALL – kopiera mig* överst i *Skriver*, med texten i [docs/kortmall.md](../docs/kortmall.md).
- **Provkortet** *Test: bifoga en bild från mobilen* i *Idéer och frågor*.
- `intern.trelloUrl` i `site.config.json`, så att `/intern/` länkar till tavlan.
- [plans/03](../plans/03-innehallsflode.md), [docs/arbetsflode.md](../docs/arbetsflode.md), AGENTS.md, PLAN.md och README: vad kopplingen kan och inte kan, och valet för fotona.

## Beslut

Inga nya. Valet för fotona väntar på Alf.

## Kontrollerat

- Kopplingen: `get_me` ger Alfs konto, arbetsytan heter fortfarande *Trello Workspace*, och tavlan *Ärteråsens Kulturförening* innehåller bara Trellos startguide. Listorna och korten skapades och lästes tillbaka.
- Verktygen saknar åtgärder för att hämta en bilagas fil, byta namn på arbetsytor, ändra synlighet och stänga tavlor.
- Skalet: `trello.com` och `api.trello.com` ger 403 från proxyn. Proxyns status anger "policy denial or upstream failure". Enligt proxyns README är värden inte tillåten för sessionen, och det ska rapporteras, inte kringgås.
- Tavlans synlighet syns inte i kopplingen och är inte kontrollerad.
- `npm run check`, `npm run check:readme` och `npm run build` gröna.
- README.md stämmer med ändringarna (`npm run check:readme`).

## Väntar på

- [ ] Alf: granska och merga PR #14
- [ ] Alf: bifoga en bild på provkortet
- [ ] Alf: döp om arbetsytan, kontrollera att tavlan är *Private*, stäng startguidetavlan
- [ ] Alf: välj hur fotona kommer till repot
- [ ] Nästa session: se nedan

## Överlämning till nästa session

1. Läs PLAN.md och [plans/03](../plans/03-innehallsflode.md). Ladda Trello-verktygen med ToolSearch (`trello`).
2. Kör `trelloReadCard` med `list_attachments` på provkortet ([kortet](https://trello.com/c/zwBdeasQ)). Skriv i plans/03 vad kopplingen ger för en uppladdad bild: namn, storlek, adress, `isUpload`.
3. Väljer Alf workflowen: bygg den likt `hamta-material`. Alf skapar en Trello-nyckel och token och lägger dem som GitHub-hemligheter. Claude skriver kort-id, bilage-id och plats i en fil. Workflowen hämtar bilagan, kör `npm run bild` så att GPS och annan metadata försvinner, och committar bara den krympta bilden till `content/<slug>/` på grenen. Originalet får aldrig committas, eftersom repot är publikt och mobilbilder har platsuppgifter.
4. Arkivera provkortet när provet är klart.
5. Sedan: bjuda in volontärerna och provköra med en plats (plans/03, *Att göra*).

## Öppna frågor

- Hur kommer foton från korten till repot? (Alf)
- Ska Claude gå igenom tavlan varje morgon, eller bara när någon säger till? (Alf)

## Källor

- [Atlassian: Add attachments to cards](https://support.atlassian.com/trello/docs/adding-attachments-to-cards)
