# Arbetsplan

Senast uppdaterad: 2026-10-21 10:45

## Mål

Till säsongen 2027 har de viktigaste platserna på Ärteråsens fäbod en skylt med QR-kod som öppnar en kort text på svenska, engelska och tyska. Texterna kommer från föreningens volontärer och är godkända av föreningen innan de publiceras.

Föreningen har fått pengar från Vindkraftsfonden till bland annat informationsblad med QR-koder, planerade till 2027 ([arterasen.se](https://www.arterasen.se/)). Det här projektet är den digitala delen av det.

## Initiativ

| Nr | Initiativ | Delplan | Status | Nästa steg | Vem |
| --- | --- | --- | --- | --- | --- |
| 1 | Sajt och design | [plans/01-sajt.md](plans/01-sajt.md) | Grundbygge mergat | Testa på telefoner på `utkast.arterasen.se` | Alf, föreningen |
| 2 | Hosting och domän | [plans/02-hosting.md](plans/02-hosting.md) | Pågår | Mejl på arterasen.se med Cloudflare Email Routing (domänen saknar MX). Domänen till föreningen och en adress som styrelsen delar (beslutat av föreningen 2026-10-19). Kvar sedan förut: domänerna *Active*, GitHub-appens åtkomst, regel för `main`, fler administratörer. | Alf, föreningen |
| 3 | Innehållsflöde och kommunikation | [plans/03-innehallsflode.md](plans/03-innehallsflode.md) | Pågår | Tavlan [QR-skyltar](https://trello.com/b/yhacWi40/qr-skyltar) har ett kort per plats och förslag sedan 2026-10-20. Nästa: välj hur foton kommer från korten till repot, sedan bjuda in volontärerna. Ta ställning till två läsare per text. | Alf |
| 4 | Platser och texter | [plans/04-innehall.md](plans/04-innehall.md) | Nio utkast i *Granska* på Trello, förslagen och föreningens platser i *Idéer och frågor*, numren inte bestämda | Föreningen läser korten i *Granska*, svarar på frågorna där och skriver ordningen på kortet *Platslistan och numreringen*. Omnumrering kräver inget godkännande. Kvar i fakta: 1953 eller 1954, och vilka källor som rinner. | Föreningen, Alf |
| 5 | Skyltar: tryck och uppsättning | [plans/05-skyltar.md](plans/05-skyltar.md) | Mall klar, föreningen lutar åt laminerade A5 som delas ut, med en karta. Löst utkast till kartan på `/intern/karta/` (2026-10-20), lägena påhittade. Fliken *Peka på kartan* (PR #19) | Föreningen pekar ut platserna och etiketterna på `/intern/karta/peka/`, klistrar in raderna och väljer uppslag (Trello-kortet *Karta med QR-koder*). Bestäm blad och karta, fasta skyltar eller båda. Sedan provtryck våren 2027. | Föreningen, Alf |

Status: *Ej startat*, *Pågår*, *Väntar på …*, *Klart*.

## Väntar på

Det som står still tills någon gör något. Hela listan med detaljer finns i den senaste rapporten.

- [x] Alf: granska och merga PR #1 (2026-10-17). Actions behövde ingen ändrad inställning.
- [x] Alf: koppla Trello till Claude (2026-10-20)
- [ ] Alf: bifoga en bild på kortet *Test: bifoga en bild från mobilen* på Trello, så att nästa session kan se vad kopplingen ger
- [ ] Alf: välj hur foton kommer från Trello till repot, workflow med Trello-nyckel som GitHub-hemlighet eller nedladdning för hand ([plans/03-innehallsflode.md](plans/03-innehallsflode.md))
- [ ] Alf: döp om Trello-arbetsytan till Ärteråsens Kulturförening, kontrollera att tavlan är *Private*, stäng startguidetavlan
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
- [x] Alf: granska och merga PR #9 (2026-10-18)
- [x] Alf: granska och merga PR #10 (fler bilder och fakta, 2026-10-19)
- [x] Alf: granska och merga PR #11 (förslag på fler skyltar, 2026-10-19)
- [ ] Alf: granska och merga PR #12 (svar från ordföranden)
- [x] Alf: granska och merga PR #15 (QR-koderna i utkastet leder till utkastet, 2026-10-20)
- [ ] Alf: skanna en skylt på `utkast.arterasen.se/skyltar/` och se att den leder till utkastet
- [x] Alf: granska och merga PR #17 (källor på den publika sajten, länkar mellan platser, rutinen för korten och omnumrering), mergad 2026-10-20
- [x] Alf: granska och merga PR #18 (kartutkastet på `/intern/karta/`), mergad 2026-10-20
- [ ] Alf: granska och merga PR #19 (*Peka på kartan*, `/intern/karta/peka/`)
- [ ] Föreningen: peka ut platserna och etiketterna på `/intern/karta/peka/` och klistra in raderna, välja uppslag och svara på frågorna på kortet *Karta med QR-koder (löst utkast)*
- [ ] Alf eller föreningen: fråga Lars Bägerfeldt vilken karta bilden på s. 51 i skrift 66 bygger på, innan kartan trycks
- [ ] Föreningen: läsa korten i *Granska* på Trello och svara på frågorna på korten och på kortet *Platslistan och numreringen*
- [ ] Alf: skicka underlaget med förslag på fler skyltar till ordföranden, [docs/underlag/2026-10-19-fler-skyltar.html](docs/underlag/2026-10-19-fler-skyltar.html)
- [ ] Föreningen: välja bland förslagen 6–17 och svara på de nio frågorna i underlaget
- [ ] Alf: Cloudflare Email Routing för `info@arterasen.se`, steg i [plans/02-hosting.md](plans/02-hosting.md). Fråga först ordföranden vilka adresser hon använder.
- [ ] Föreningen: skapa en mejladress som föreningen äger och som styrelsen delar (A4)
- [ ] Alf och föreningen: byta innehavare av arterasen.se till föreningen (A2)
- [ ] Alf: ta ställning till föreningens förslag om två läsare per text (D2), se [plans/03-innehallsflode.md](plans/03-innehallsflode.md)
- [x] Alf: bara Trello (2026-10-20). Volontärsidorna, kortmallen och agentens rutin är omskrivna.
- [ ] Föreningen: läsa de fyra nya utkasten (Boden, Mjölkboden, Kartan från 1827, Fäbodstigen) på `utkast.arterasen.se` efter merge
- [ ] Alf och föreningen: stämma av platslistan mot utkasten och förslagen 6–17, och välja karta eller skyltar
- [ ] Claude, omkring 2026-10-26: kontrollera att den gamla DNS-zonen hos `jean`/`lloyd` har slutat svara
- [ ] Alf: ta bort grenen `claude/fria-bilder-licens` på GitHub
- [x] Alf: skicka underlaget med 32 frågor till ordföranden. Svaren kom 2026-10-19.
- [x] Ordföranden och föreningen: svara på underlaget (2026-10-19). Öppet kvar: C4, startpunkten i C6, levande källor i C9, beloppet i E1, logotypen i D6.
- [ ] Alf: regel för `main` på GitHub, gratis nu när repot är publikt (se [plans/02-hosting.md](plans/02-hosting.md))
- [x] Alf: licens för kod och texter, MIT och CC BY 4.0 (2026-10-18)
- [x] Föreningen: berätta för Lars Bägerfeldt. Han har godkänt att föreningen använder alla hans bilder och skrifter (2026-10-19).

## Rapporter

En rapport per arbetspass, nyast först. Mall: [rapporter/_mall.md](rapporter/_mall.md).

- 2026-10-21 [Peka på kartan](rapporter/2026-10-21-peka-pa-kartan.md): fliken `/intern/karta/peka/` där föreningen trycker på kartan, skriver etikett och nummer och får en rad som `320.144 nr 3 Ristningarna` att klistra in på Trello, etiketter för sådant utan QR-kod, kontroll av lägena
- 2026-10-20 [Kartutkast](rapporter/2026-10-20-kartutkast.md): löst utkast till en karta med QR-koder på `/intern/karta/`, underlaget omritat ur Bägerfeldts karta, två uppslag i A4, påhittade lägen, frågor till föreningen på Trello
- 2026-10-20 [Alla platser på tavlan](rapporter/2026-10-20-platser-pa-tavlan.md): ett kort per utkast i *Granska* och per förslag i *Idéer och frågor*, källorna på den publika sajten, omnumrering utan godkännande, laminerade A5 med karta i stället för skyltar (inte bestämt)
- 2026-10-20 [Trello-tavlan](rapporter/2026-10-20-trello-tavlan.md): Trello kopplat, listor och mallkort på tavlan, foton kan inte hämtas från sessionen, överlämning till nästa session
- 2026-10-20 [Bara Trello](rapporter/2026-10-20-bara-trello.md): texten skrivs på Trello-kortet och foton bifogas där, kortmall i stället för dokumentmall, volontärsidor och agentens rutin omskrivna
- 2026-10-19 [Svar från ordföranden](rapporter/2026-10-19-svar-ordforanden.md): svaren på underlaget inlagda, fyra utkast uppdaterade och fyra nya ur förslagen, föreningens platslista, bärbar karta i stället för skyltar, mejlen på arterasen.se saknar MX
- 2026-10-19 [Förslag på fler skyltar](rapporter/2026-10-19-forslag-fler-skyltar.md): tolv förslag ur Bägerfeldts skrifter, fyra med prioritet A, som Claude Docs-dokument och som HTML-fil för ordföranden i `docs/underlag/`
- 2026-10-19 [Fler bilder och fakta](rapporter/2026-10-19-fler-bilder-fakta.md): alla 24 museibilder av Ärteråsen hämtade, upp till fyra bilder per plats, fler faktarader, ILS 1662 hittad på bild
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
                         (förhandsvisning     (Trello)
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
