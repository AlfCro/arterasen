# Rapport 2026-10-20: Alla platser på tavlan

Arbetspass: 2026-10-20 22:17–22:50
Av: Claude
PR: #16 (mergad), #17
Initiativ: 01, 03, 04, 05

## Sammanfattning

Trello-tavlan [QR-skyltar](https://trello.com/b/yhacWi40/qr-skyltar) har nu ett kort för varje plats. De nio utkasten ligger i *Granska* med texten i beskrivningen och en kommentar med länkar och frågor. Förslagen ur Bägerfeldts skrifter och föreningens platser utan underlag ligger i *Idéer och frågor*, tillsammans med kortet *Platslistan och numreringen*. Källorna visas nu också på den publika sajten, och en omnumrering kräver inget godkännande.

## Gjort

- **Granska, nio kort:** Fäbodvallen, Eldhusen, Ristningarna, Källorna, Fjällkorna, Boden med figurristningarna, Mjölkboden och svalen, Kartan från 1827 och Fäbodstigen. Beskrivningen är `sv.md` under kortmallens rubriker: var platsen kan vara, det viktigaste, texten, fakta, källor och bilder med fotograf och licens. En kommentar per kort har länkar till förhandsvisningen på tre språk och frågorna som återstår, bland annat tilläggen ur underlaget från 2026-10-19.
- **Idéer och frågor, elva kort:** *Platslistan och numreringen* överst, med föreningens elva platser kopplade till korten, numren i dag och frågor. Förslagen 9 Brita Eriksdotters fäbodgård, 10 Läs timret, 11 Kullornas egna ord, 12 Messmör och en dag på fäboden, 14 Vallningen i skogen, 15 Utsiktstornet, 16 Fähuset och fållorna och 17 Fäbodens första ägare, med innehåll, sidhänvisningar, frågor och hur kortet blir ett utkast. Tvåvåningsladan och Barnfäboden från föreningens lista, utan underlag. Provkortet ligger sist.
- **Numret står inte i kortnamnen** och inte i utkastkorten, bara i `sv.md` och på kortet *Platslistan och numreringen*. Förslagskorten har arbetsnumret från underlaget.
- **PR #16, mergad:** Eldhusen sa "Läs mer om dem vid skylt 3" på tre språk. Det är nu en länk till sidan Ristningarna, så att texten håller vid omnumrering och om det blir blad i stället för skyltar.
- **Källor på den publika sajten** (`src/render.mjs`, `src/i18n.mjs`): rubriken heter *Källor*, *Sources* och *Quellen*. Länkar till trello.com tas bort i produktionen men står kvar i förhandsvisningen.
- **Länkar mellan platser** (`src/content.mjs`): `npm run check` ger fel om en länk `[Titel](../slug/)` leder till en plats som inte finns, eller om en publicerad plats länkar till en som inte är publicerad.
- **Rutinen** ([docs/arbetsflode.md](../docs/arbetsflode.md)): kortets beskrivning följer `sv.md`, förslagskort blir utkast när de flyttas till *Klar för Claude*, nya avsnitt *Länkar mellan platser* och *Numrera om*.
- **`/intern/`:** [Så jobbar vi](../docs/intern/00-index.md) säger var utkasten och förslagen finns. [Skriva en text](../docs/intern/10-skriva.md) säger att källorna syns för alla. Tre punkter i [Nytt](../docs/intern/90-nytt.md).
- AGENTS.md, README, PLAN.md och plans/01, 03, 04 och 05.

## Beslut

- Alf 2026-10-20: **källorna visas på den publika sajten.** Införd i [plans/01](../plans/01-sajt.md). Länken till Trello-kortet tas bort där, eftersom den bara fungerar för tavlans medlemmar (Claude).
- Alf 2026-10-20: **omnumrering kräver inget godkännande.** Införd i [plans/04](../plans/04-innehall.md) och i rutinen.
- Alf 2026-10-20: **numret låses inte nu** när något trycks. Det tas upp när numren är bestämda. Införd i [plans/05](../plans/05-skyltar.md).
- Föreningen via Alf 2026-10-20, inte helt bestämt: troligen inga fasta skyltar, utan laminerade A5 med QR-koder som delas ut till gästerna, tillsammans med en karta. Införd under *Väntar på beslut* i [plans/05](../plans/05-skyltar.md).
- Claude: hänvisningar mellan platser skrivs som länkar, aldrig som nummer eller "skylt".
- Claude: korten för utkasten skapades direkt i *Granska*, eftersom sidorna redan finns på `utkast.arterasen.se`. Kopplingen går via Alfs konto, så Trello visar Alf som den som skapade korten. Ingen har flyttat dem till *Klar för Claude*, så regeln att man inte godkänner sin egen text stoppar inte någon i föreningen.

## Kontrollerat

- Alla 20 korten lästes tillbaka efter att de skapats. Utkastkortens beskrivningar är genererade ur `sv.md` med ett skript, inte avskrivna för hand.
- Varje uppgift på förslagskorten är tagen ur underlaget [docs/underlag/2026-10-19-fler-skyltar.html](../docs/underlag/2026-10-19-fler-skyltar.html) med samma sidhänvisningar. Ett "först" i *Fäbodens första ägare* rättat till "år 1664", som källan säger.
- Förhandsvisningen svarar för `https://utkast.arterasen.se/sv/boden/`.
- Källorna och länkkontrollen provade i en kopia av repot: Eldhusen publicerad utan Ristningarna ger tre fel, båda publicerade ger inga. Produktionsbygget har *Källor*, *Sources* och *Quellen* och ingen länk till trello.com, förhandsvisningen har kvar den.
- PR #16: `check` och båda Cloudflare-byggena gröna före merge. Länken `../ristningarna/` finns på alla tre språk i bygget.
- `npm run check`, `npm run check:readme`, `npm run build`, `npm run build:preview` och `npm run verify` gröna.
- README.md stämmer med ändringarna (`npm run check:readme`).

## Väntar på

- [ ] Alf: granska och merga PR #17
- [ ] Alf: bifoga en bild på provkortet. Det hade ingen bilaga 2026-10-20 22:20.
- [ ] Föreningen: läsa korten i *Granska* och svara på frågorna på korten
- [ ] Föreningen: skriva ordningen och vilka förslag som ska bli platser på kortet *Platslistan och numreringen*
- [ ] Föreningen: blad, karta eller skyltar

## Öppna frågor

Ställda på korten, till föreningen:

1. Vilka förslag ska bli platser, och i vilken ordning? Har listan från 2026-10-19 tagit hänsyn till förslagen? (*Platslistan och numreringen*)
2. Vid vilket eldhus ska Eldhusen vara, Kvickens eller Westbergs? Vem tog bilden 1926? (*Eldhusen*)
3. Är Eldhuset Kvickens (1662) samma husgrupp som mjölkboden med ILS 1662? (*Mjölkboden och svalen*)
4. Är "Stens och gärdesgårdarna med kryor" samma sak som fähuset och kyorna? (*Fähuset och fållorna*)
5. Vad är Tvåvåningsladan och Barnfäboden, och var ligger de?
6. Är Gamla Bäckmansgården och fäbodproduktionen samma sak som förslaget om messmör? (*Messmör och en dag på fäboden*)
7. Är boden vid serveringen öppen, och vad syns från utsiktstornet?

Till Alf:

- Ska rubriken *Var står skylten?* i kortmallen heta något annat om det blir blad i stället för skyltar? Inget är ändrat än.
- Startsidan säger "Varje skylt på fäboden har ett nummer och en QR-kod". Den behöver skrivas om när det är bestämt hur bladen och kartan ser ut.

## Källor

- [Underlaget: Fler skyltar på Ärteråsen](../docs/underlag/2026-10-19-fler-skyltar.html)
- [Tavlan QR-skyltar](https://trello.com/b/yhacWi40/qr-skyltar)
