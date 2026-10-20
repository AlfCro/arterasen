# Rapport 2026-10-20: Bara Trello

Arbetspass: 2026-10-20 18:27–18:50
Av: Claude
PR: #13
Initiativ: 02, 03

## Sammanfattning

Volontärerna använder bara Trello. Texten skrivs i beskrivningen på platsens kort efter en kortmall, och foton bifogas på kortet. Volontärsidorna, agentens rutin, mallen, koden och planerna är omskrivna så att inget längre utgår från en mapp utanför Trello.

## Gjort

- **Kortmall:** `docs/drive-mall.md` heter nu [docs/kortmall.md](../docs/kortmall.md) och är texten på kortet *MALL – kopiera mig* överst i listan *Skriver*. Samma rubriker som förut; bilderna bifogas på kortet.
- **`/intern/`:** [Så jobbar vi](../docs/intern/00-index.md), [Skriva en text](../docs/intern/10-skriva.md) och [Granska](../docs/intern/20-granska.md) beskriver hur man kopierar mallkortet, skriver i beskrivningen och bifogar foton. En punkt överst i [Nytt](../docs/intern/90-nytt.md). Två äldre punkter i *Nytt* är omskrivna, eftersom flödet aldrig var i gång och ingen volontär har använt något annat.
- **Agentens rutin:** [docs/arbetsflode.md](../docs/arbetsflode.md) läser texten ur kortets beskrivning och hämtar foton från bilagorna. Bara Trello-kopplingen krävs.
- **Kod och inställningar:** platshållaren `{{drive}}` borttagen ur `src/render.mjs`, `intern.driveUrl` ur `site.config.json`, en kommentar i `src/content.mjs`.
- **Planer:** [plans/03](../plans/03-innehallsflode.md) har beslutet och nya steg (mallkortet, tavlan bara för medlemmar, prova bilagor). [plans/02](../plans/02-hosting.md): föreningen behöver bara en adress som styrelsen delar, till exempel ett gratis Gmail-konto. AGENTS.md, README, LICENSER.md, PLAN.md och `docs/bilder.md` uppdaterade.

## Beslut

- Alf 2026-10-20: **Trello räcker.** Texter och foton ligger på korten. Infört i *Beslut* i [plans/03](../plans/03-innehallsflode.md), där det ersätter delen av beslutet 2026-10-17 om material utanför Trello.
- Claude: mallkortet ligger överst i *Skriver*, eftersom Claude inte går igenom den listan och kortet då inte riskerar att behandlas som en plats.
- Claude: tidigare rapporter och loggrader är inte ändrade. De beskriver vad som gällde då.

## Kontrollerat

- Trellos gratisnivå: 10 MB per bilaga ([Atlassian](https://support.atlassian.com/trello/docs/adding-attachments-to-cards)), 10 medlemmar per arbetsyta ([Costbench](https://costbench.com/software/project-management/trello/free-plan/)).
- Trello-kopplingen finns i Claudes register men är inte installerad. Om den kan hämta bilagor är inte provat.
- `npm run check`, `npm run check:readme`, `npm run build`, `npm run build:preview` och `npm run verify` gröna. Sidan *Skriva en text* läst i bygget. Ingen platshållare kvar i `/intern/`.
- Sökning i repot: kvar finns bara beslutet 2026-10-20 i plans/03 och äldre rapporter.
- README.md stämmer med ändringarna (`npm run check:readme`).

## Väntar på

- [ ] Alf: granska och merga PR #13
- [ ] Alf: koppla Trello till Claude
- [ ] Alf eller Claude: skapa arbetsytan och tavlan, bara synlig för medlemmar
- [ ] Claude, när Trello är kopplat: lägga in mallkortet och prova att hämta en bilaga

## Öppna frågor

- Kan Trello-kopplingen hämta bilagor? Annars behövs ett annat sätt att få foton till repot (Claude provar, Alf väljer).
- Räcker 10 medlemmar på arbetsytan? (föreningen)

## Källor

- [Atlassian: Add attachments to cards](https://support.atlassian.com/trello/docs/adding-attachments-to-cards)
- [Costbench: Trello Free Plan](https://costbench.com/software/project-management/trello/free-plan/)
