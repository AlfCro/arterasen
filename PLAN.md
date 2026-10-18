# Arbetsplan

Senast uppdaterad: 2026-10-18 23:40

## Mål

Till säsongen 2027 har de viktigaste platserna på Ärteråsens fäbod en skylt med QR-kod som öppnar en kort text på svenska, engelska och tyska. Texterna kommer från föreningens volontärer och är godkända av föreningen innan de publiceras.

Föreningen har fått pengar från Vindkraftsfonden till bland annat informationsblad med QR-koder, planerade till 2027 ([arterasen.se](https://www.arterasen.se/)). Det här projektet är den digitala delen av det.

## Initiativ

| Nr | Initiativ | Delplan | Status | Nästa steg | Vem |
| --- | --- | --- | --- | --- | --- |
| 1 | Sajt och design | [plans/01-sajt.md](plans/01-sajt.md) | Grundbygge mergat | Testa på telefoner på `utkast.arterasen.se` | Alf, föreningen |
| 2 | Hosting och domän | [plans/02-hosting.md](plans/02-hosting.md) | Pågår | `info.arterasen.se` och `utkast.arterasen.se` i gång 2026-10-18, licenser valda. Kvar: domänerna *Active*, GitHub-appens åtkomst, regel för `main`, fler administratörer. | Alf |
| 3 | Innehållsflöde och kommunikation | [plans/03-innehallsflode.md](plans/03-innehallsflode.md) | Ej startat | Koppla Trello och Google Drive till Claude | Alf |
| 4 | Platser och texter | [plans/04-innehall.md](plans/04-innehall.md) | Fem utkast, två med museibild | Fritt material används utan att vänta. Föreningen svarar på faktafrågorna (C), väljer platser och granskar utkasten. Bägerfeldt får veta. | Föreningen |
| 5 | Skyltar: tryck och uppsättning | [plans/05-skyltar.md](plans/05-skyltar.md) | Mall klar | Provskylt på en plats, välj material | Föreningen |

Status: *Ej startat*, *Pågår*, *Väntar på …*, *Klart*.

## Väntar på

Det som står still tills någon gör något. Hela listan med detaljer finns i den senaste rapporten.

- [x] Alf: granska och merga PR #1 (2026-10-17). Actions behövde ingen ändrad inställning.
- [ ] Alf: koppla Trello och Google Drive till Claude
- [x] Alf: välj upplägg och namn för utkastadressen: två Pages-projekt och `utkast.arterasen.se` (2026-10-18)
- [x] ~~Alf: ta reda på vems Cloudflare-konto arterasen.se ligger i~~: ingen i föreningen vet. Zonen flyttas i stället till Alfs konto (beslut 2026-10-18).
- [x] Alf: flytta zonen arterasen.se till sitt Cloudflare-konto (2026-10-18). Huvudsajten svarar som förut, se [plans/02-hosting.md](plans/02-hosting.md).
- [x] Alf: Cloudflare Pages kopplat till repot, i samma konto som zonen: `arterasen-info` och `arterasen-utkast` (2026-10-18)
- [ ] Alf: se att `info.arterasen.se` och `utkast.arterasen.se` står som *Active*, och att Cloudflares GitHub-app bara når `AlfCro/arterasen`
- [x] Claude, efter merge av PR #7: utkastbygget och `/intern/` lästa, båda sajterna byggda (2026-10-18)
- [x] Automatisk förnyelse av arterasen.se: på hos Name ISP, går ut 2027-01-22 (2026-10-18)
- [ ] Alf, senast innan skyltarna trycks: döp om Cloudflare-kontot till föreningen, lägg till en person i styrelsen och en inloggning med föreningens mejladress som administratörer
- [ ] Föreningen: faktagranska de fem utkasten
- [x] Alf: granska och merga PR #3 (2026-10-18)
- [x] Alf: granska och merga PR #4 (2026-10-18)
- [x] Alf: granska och merga PR #5 (2026-10-18)
- [x] Alf: granska och merga PR #7 (Pages i gång, utkastadressen), ersatte #6 (2026-10-18)
- [ ] Alf: ta bort grenarna `granskning` och `claude/pages-info-utkast` på GitHub. Claude kan inte radera grenar.
- [x] Alf: granska och merga PR:en med anteckningar för nästa agent (PR #8, 2026-10-18)
- [ ] Alf: granska och merga PR #9 (fritt material i utkasten, licenser, konfigurationsrepot i README)
- [ ] Alf: skicka underlaget med 32 frågor till ordföranden (filen skickades till Alf 2026-10-18, ligger inte i repot). B1, B7, C8 och D4 har ändrats sedan dess, se rapporten 2026-10-18 fritt-material-licens.
- [ ] Ordföranden och föreningen: svara på underlaget, de fem viktigaste är A1, A2, A3, B1 och E1
- [ ] Alf: regel för `main` på GitHub, gratis nu när repot är publikt (se [plans/02-hosting.md](plans/02-hosting.md))
- [x] Alf: licens för kod och texter, MIT och CC BY 4.0 (2026-10-18)
- [ ] Alf eller föreningen: berätta för Lars Bägerfeldt att hans skrifter används i utkasten och fråga om bilder. Utkasten väntar inte, men det ska vara gjort innan Ristningarna godkänns.

## Rapporter

En rapport per arbetspass, nyast först. Mall: [rapporter/_mall.md](rapporter/_mall.md).

- 2026-10-18 [Fritt material och licenser](rapporter/2026-10-18-fritt-material-licens.md): museibilder i två utkast, Ristningarna med Bägerfeldts uppgifter, MIT och CC BY 4.0, det privata konfigurationsrepot nämnt i README
- 2026-10-18 [Pages i gång](rapporter/2026-10-18-pages-i-gang.md): `info.arterasen.se` och `utkast.arterasen.se` på två Pages-projekt, Pages valt framför Workers, grenen `granskning` ersatt
- 2026-10-18 [DNS flyttad](rapporter/2026-10-18-dns-flyttad.md): zonen ligger i Alfs Cloudflare-konto med namnservrarna `betty`/`carl`, huvudsajten svarar, `info.arterasen.se` väntar på Pages-projektet
- 2026-10-18 [DNS till eget Cloudflare-konto](rapporter/2026-10-18-dns-egen-zon.md): registraren är Name ISP och förnyelsen är på, ingen känner till Cloudflare-kontot, zonen flyttas till Alfs konto
- 2026-10-18 [Publikt repo, README och frågor till föreningen](rapporter/2026-10-18-publikt-readme-underlag.md): repot publikt och anpassat, README omskriven med kontroll i CI, underlag med 32 frågor till ordföranden
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
