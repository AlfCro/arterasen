# Rapport 2026-10-19: Svar från ordföranden

Arbetspass: 2026-10-19 21:53–22:30
Av: Claude
PR: #12
Initiativ: 01, 02, 03, 04, 05

## Sammanfattning

Ordförandens svar på underlaget från 2026-10-18 är inlagda i delplanerna och i `docs/fakta.md`, och fyra utkast följer nu svaren. Föreningen har lämnat en platslista med elva platser och lutar åt en bärbar karta med QR-koder i stället för fasta skyltar. Mejl till adresser på arterasen.se kan inte komma fram, eftersom domänen saknar MX-post; förslaget är Cloudflare Email Routing i Alfs konto, utan N.nu.

## Gjort

- **Utkasten:** Fäbodvallen och startsidan säger att fäboden är belagd sedan 1500-talet och enligt traditionen ännu äldre (C1). Eldhusen har 17 fäbodgårdar med 36 ägare 1827, som mest kanske 22 (C2, C3). Fjällkorna har hundregeln vecka 25–32 (C5), Sunnanheds fjällkor (B5) och hela museibilden från 2018 med personens namn i bildtexten, efter hennes samtycke (B4). Alla tre språk, källorna tillagda.
- **[docs/fakta.md](../docs/fakta.md):** nytt avsnitt *Föreningens svar 2026-10-19* överst. Motsägelserna om ålder, eldhus, hundar och parkering är markerade som avgjorda. Traditionen om 1400-talet får nämnas som tradition. Hörsägen om björn och får står under *Obekräftat*.
- **[plans/04-innehall.md](../plans/04-innehall.md):** föreningens platslista (D1) med förslag på vilket utkast som passar var, besvarade frågor strukna, Bägerfeldt avbockad.
- **[plans/05-skyltar.md](../plans/05-skyltar.md):** nytt avsnitt *Väntar på beslut* om bärbar karta eller fasta skyltar, och vad det betyder för mallen. Stolpar i stället för husväggar, Länsstyrelsen, redovisningen till Vindkraftsfonden och provtestet (E1–E4). Logotypen (D6).
- **[plans/02-hosting.md](../plans/02-hosting.md):** svaren A1–A6 och avsnittet *Mejl på arterasen.se* med läget, förslaget och stegen i Cloudflares dashboard.
- **[plans/03-innehallsflode.md](../plans/03-innehallsflode.md):** föreningens förslag om två läsare per text (D2) och granskarna (D3). [plans/01-sajt.md](../plans/01-sajt.md): besöksstatistik utan kakor (D5).
- **`/intern/`:** nytt avsnitt *Allt börjar på svenska* på [Så jobbar vi](../docs/intern/00-index.md): en text per plats på svenska, Claude översätter, telefonen väljer språk, en QR-kod räcker för tre språk. Kortare hänvisning i *Skriva en text* och en punkt i *Nytt*.
- [docs/bilder.md](../docs/bilder.md), PLAN.md och README uppdaterade.

## Beslut

- Föreningen (svar 2026-10-19): faktaformuleringarna C1–C3, hundar vecka 25–32, parkeringen 500 m, bild och namn i Fjällkorna, Sunnanheds fjällkor får stå med. Införda i [plans/04](../plans/04-innehall.md).
- Föreningen (A2–A6): domänen ska ägas av föreningen, firmatecknarna ansvarar för inloggningarna, föreningen får ett eget Google-konto och en gemensam adress. Införda i [plans/02](../plans/02-hosting.md).
- Alf 2026-10-19: N.nu kontaktas inte om mejlen.
- Inte infört, väntar på Alf: föreningens förslag om två läsare per text (D2), och om föreningens Google-konto också ska ta emot `info@arterasen.se`.

## Kontrollerat

- DNS 2026-10-19 omkring 21:55 via `dns.google`: MX för arterasen.se gav inget svar, med SOA från `jean.ns.cloudflare.com`, alltså den gamla zonen. NS gav `jean`/`lloyd`, medan SOA i ett senare uppslag kom från `betty` och `info.arterasen.se` löstes upp. Den gamla zonen svarar alltså fortfarande för en del uppslag, och ingen av zonerna har MX.
- N.nu:s manual: beskriver vidarebefordran till Gmail och ber kunden mejla supporten om adresser vid domänkoppling. Inga MX-värden.
- Cloudflares dokumentation för Email Routing: tre MX `route1`–`route3.mx.cloudflare.net`, SPF `include:_spf.mx.cloudflare.net`, DKIM `cf2024-1._domainkey`.
- Förslagen bakom "godkänner ert förslag" (C1–C3) lästa i underlaget från 2026-10-18 i en tidigare chatt, eftersom filen inte ligger i repot.
- Bilden till Fjällkorna krympt med samma inställningar som `npm run bild` men kvalitet 64, 289 kB, utan metadata.
- `npm run check` (0 fel, 0 varningar), `npm run check:readme`, `npm run build`, `npm run build:preview` och `npm run verify` gröna. Fjällkorna granskad i 390 px.
- Inga personnummer, lösenord eller namn på testare, skribenter eller firmatecknare i repot. Personen på fjällkobilden namnges med sitt samtycke.
- README.md stämmer med ändringarna (`npm run check:readme`).

## Väntar på

- [ ] Alf: granska och merga PR #12
- [ ] Alf: Cloudflare Email Routing enligt [plans/02](../plans/02-hosting.md). Fråga först ordföranden vilka adresser hon använder.
- [ ] Föreningen: Google-konto som föreningen äger och styrelsen delar
- [ ] Alf och föreningen: byte av innehavare för arterasen.se
- [ ] Alf: ja eller nej till två läsare per text
- [ ] Alf och föreningen: platslistan mot utkasten och förslagen 6–17, och karta eller skyltar
- [ ] Claude, omkring 2026-10-26: kontrollera att den gamla zonen har slutat svara

## Öppna frågor

Till ordföranden:

1. Vilka adresser på arterasen.se använder du, och vilket program eller konto skickar du med?
2. Platslistan: vad ska plats 4 Tvåvåningsladan, 5 och 6 Barnfäboden handla om, och vad betyder "Stens och gärdesgårdarna med kryor"?
3. Är "Eldhuset Kvickens (1662)" samma husgrupp som mjölkstugan med "ILS 1662"?
4. Stämmer listan över levande källor på arterasen.se fortfarande (Spjutgravskällan och Möhrkällan)?
5. Var börjar fäbodstigen, Brända eller Näset?
6. Hur mycket finns i bidraget till skyltar eller karta, och finns ett datum då pengarna ska vara använda?
7. Har svaren om platslistan tagit hänsyn till förslagen 6–17, som skickades efter underlaget?

Till Alf:

- Avsnittet *Allt börjar på svenska* på `/intern/` är skrivet utifrån att ordföranden inte riktigt har förstått att allt utgår från den svenska texten. Säg till om det var något annat som behövde förklaras.

## Källor

- [N.nu: Skicka Gmail från annan mail](https://manual.n.nu/article/67-skicka-gmail-fran-annan-mail)
- [N.nu: Koppla domän från Loopia till N.nu](https://manual.n.nu/article/36-andra-namnservrar-pa-loopia)
- [Cloudflare: Email Service, domain configuration](https://developers.cloudflare.com/email-service/configuration/domains/)
- [Google Public DNS, MX för arterasen.se](https://dns.google/resolve?name=arterasen.se&type=MX)
