# Rapport 2026-10-19: Förslag på fler skyltar ur Bägerfeldts skrifter

Arbetspass: 2026-10-19 09:35–10:40
Av: Claude
PR: #11
Initiativ: 04

## Sammanfattning

Lars Bägerfeldts skrifter räcker till ett tiotal nya skyltar utöver de fem utkasten. Tolv förslag, numrerade 6–17, finns med innehåll, placering och sidhänvisningar i ett Claude Docs-dokument för Alf och i en självständig HTML-fil för ordföranden, som också ligger i [docs/underlag/2026-10-19-fler-skyltar.html](../docs/underlag/2026-10-19-fler-skyltar.html). Fyra har prioritet A: Boden med figurristningarna, Mjölkboden och svalen, Kartan från 1827 och Brita Eriksdotters fäbodgård.

## Gjort

- Läst skrift 66, 67, 70, 72 och 89 ur `material/skrifter/` där de handlar om Ärteråsen, med `pdftotext`, och skrift 84 och 88 i urval. Kapitlen som inte var genomgångna förut (66 s. 44–58, 67 s. 58) är nu lästa. Skrift 69 är inte läst.
- Tolv förslag på nya skyltar med prioritet A, B eller C. Varje uppgift har sidhänvisning, kontrollerad mot PDF-texten.
- Tillägg till de fem utkasten, till exempel 36 ägare vid storskiftet 1827 som belagd ersättning för "36 brukare kring 1850", och att getterna försvann med mejerierna.
- Beslutsunderlaget som Claude Docs-dokument, privat för Alf, med en kolumn där föreningens beslut kan väljas.
- Samma innehåll som självständig HTML-fil för mejl, omskriven för ordföranden: typsnitten från sajten inbäddade och nedbantade till de tecken som används, inga externa resurser, 100 kB. Ligger i `docs/underlag/` på Alfs begäran.
- [docs/fakta.md](../docs/fakta.md): nytt avsnitt *Husen, sysslorna och bygden* med de nya uppgifterna. [docs/kallor.md](../docs/kallor.md): vad som är läst.
- [AGENTS.md](../AGENTS.md): undantaget för `docs/underlag/` och hur skrifterna läses med `pdftotext`. README: `docs/underlag/` och läget.
- [plans/04-innehall.md](../plans/04-innehall.md): förslagen, två nya punkter under *Att göra* och en rad i loggen.

## Beslut

- Alf 2026-10-19: underlaget om fler skyltar läggs också i repot, i `docs/underlag/`. Det går emot regeln i AGENTS.md om att beslutsunderlag inte ska ligga i repot, så regeln har fått ett undantag: när Alf ber om det, och utan nutida privatpersoner. Kontrollerat: filen nämner bara Lars Bägerfeldt, Karl-Erik Forsslund och personer från 1600- till 1800-talet. Gätyxan i privat ägo och husägarna nämns inte vid namn.

## Kontrollerat

- Varje sidhänvisning i underlaget mot texten ur PDF:erna. En hänvisning rättad: Britas tolv somrar står i skrift 72 s. 19–20 och 38, inte s. 19–22.
- HTML-filen i Chromium: 390 px och 1100 px utan sidledsscroll, mörkt läge, utskrift till PDF, inga nätanrop, typsnitten laddade.
- Ingen nutida privatperson i filen. Ristningar med grova ord och uppgifter om barn utom äktenskapet eller sjukdom är utelämnade.
- `npm run check`, `npm run check:readme` och `npm run build` gröna.

## Väntar på

- [ ] Alf: granska och merga PR #11
- [ ] Alf: skicka HTML-filen till ordföranden
- [ ] Föreningen: välja bland förslagen 6–17 och svara på de nio frågorna nedan
- [ ] Alf eller föreningen: berätta för Lars Bägerfeldt, nu också om förslagen, och fråga om han vill läsa texterna

## Öppna frågor

Ställda till föreningen i underlaget:

1. Vilka förslag vill föreningen gå vidare med, och vilka räcker som sidor på webbplatsen?
2. Är boden vid serveringen öppen för besökare, så att figurerna syns?
3. Vill ägaren till husgrupp 2 ha en skylt om Brita Eriksdotter vid huset?
4. Vilken husgrupp med synlig sval, helst 10, 11 eller 13, kan få skylten om mjölkboden?
5. Finns det en lönnskrift som besökare kan se utan att gå in i ett privat hus?
6. Vad syns från utsiktstornet?
7. Säljs messmör eller mesost i serveringen?
8. Ska kartan från storskiftet hämtas hos Lantmäteriet?
9. Vem berättar för Lars Bägerfeldt, och ska han få läsa texterna innan de godkänns?

## Källor

- Lars Bägerfeldts skrifter 66, 67, 70, 72, 84, 88 och 89, versionerna i [docs/kallor.md](../docs/kallor.md)
- [Underlaget: Fler skyltar på Ärteråsen](../docs/underlag/2026-10-19-fler-skyltar.html)
