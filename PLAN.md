# Arbetsplan

Senast uppdaterad: 2026-10-18 01:00

## Mål

Till säsongen 2027 har de viktigaste platserna på Ärteråsens fäbod en skylt med QR-kod som öppnar en kort text på svenska, engelska och tyska. Texterna kommer från föreningens volontärer och är godkända av föreningen innan de publiceras.

Föreningen har fått pengar från Vindkraftsfonden till bland annat informationsblad med QR-koder, planerade till 2027 ([arterasen.se](https://www.arterasen.se/)). Det här projektet är den digitala delen av det.

## Initiativ

| Nr | Initiativ | Delplan | Status | Nästa steg | Vem |
| --- | --- | --- | --- | --- | --- |
| 1 | Sajt och design | [plans/01-sajt.md](plans/01-sajt.md) | Grundbygge mergat | Testa på telefoner när hosting är klar | Alf, föreningen |
| 2 | Hosting och domän | [plans/02-hosting.md](plans/02-hosting.md) | Väntar på beslut | Välj upplägg för två adresser (utkast och publik), ta reda på vems Cloudflare-konto arterasen.se ligger i | Alf |
| 3 | Innehållsflöde och kommunikation | [plans/03-innehallsflode.md](plans/03-innehallsflode.md) | Ej startat | Koppla Trello och Google Drive till Claude | Alf |
| 4 | Platser och texter | [plans/04-innehall.md](plans/04-innehall.md) | Fem utkast, underlaget utökat | Föreningen svarar på faktafrågorna, väljer platser och granskar utkasten | Föreningen |
| 5 | Skyltar: tryck och uppsättning | [plans/05-skyltar.md](plans/05-skyltar.md) | Mall klar | Provskylt på en plats, välj material | Föreningen |

Status: *Ej startat*, *Pågår*, *Väntar på …*, *Klart*.

## Väntar på

Det som står still tills någon gör något. Hela listan med detaljer finns i den senaste rapporten.

- [x] Alf: granska och merga PR #1 (2026-10-17). Actions behövde ingen ändrad inställning.
- [ ] Alf: koppla Trello och Google Drive till Claude
- [ ] Alf: välj upplägg och namn för utkastadressen, [underlag](https://claude.ai/code/artifact/9e3892a9-0640-41c1-93ca-0a359e9727c9)
- [ ] Alf: ta reda på vems Cloudflare-konto arterasen.se ligger i (DNS ligger hos Cloudflare, inte hos Loopia)
- [ ] Alf: Cloudflare Pages kopplat till repot, helst i domänens konto
- [ ] Domänägaren: automatisk förnyelse av arterasen.se hos Loopia
- [ ] Föreningen: faktagranska de fem utkasten
- [ ] Alf: granska och merga PR #3 (källor, bilder, workflow som hämtar material)
- [ ] Föreningen: fråga Lars Bägerfeldt om hans bilder och skrifter får användas på sajten

## Rapporter

En rapport per arbetspass, nyast först. Mall: [rapporter/_mall.md](rapporter/_mall.md).

- 2026-10-18 [Källor och bilder från nätet](rapporter/2026-10-18-natkallor.md): Bägerfeldts skrifter, årsringsdateringar, fria museibilder, ny workflow som hämtar material, Facebook ej genomsökt
- 2026-10-17 [Efter merge, åtkomst och två adresser](rapporter/2026-10-17-efter-merge.md): DNS ligger hos Cloudflare, underlag för utkastadress väntar på beslut, förhandsvisning som artifact
- 2026-10-17 [Grundbygge](rapporter/2026-10-17-grundbygge.md): sajt, skyltar, arbetsflöde och planstruktur i PR #1

## Beroenden

```
1 Sajt ──► 2 Hosting ──► 3 Innehållsflöde ──► 4 Texter godkända ──► 5 Skyltar tryckta
                         (förhandsvisning     (Trello + Drive)
                          kräver hosting)
```

Skyltar får inte tryckas förrän adressen `info.arterasen.se` fungerar (initiativ 2), eftersom QR-koden inte kan ändras efter tryck.

## Tidslinje

| När | Vad |
| --- | --- |
| Hösten 2026 | Sajt, hosting och arbetsflöde på plats. Testa flödet med en plats från start till publicering. |
| Vintern 2026–27 | Föreningen skriver texter. Granskning och översättning löpande. |
| Våren 2027 | Provskyltar sätts upp och testas. Varaktiga skyltar beställs. |
| Säsongen 2027 | Skyltarna sitter uppe. Genomgång inför varje säsong därefter. |
