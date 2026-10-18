# 01 Sajt och design

Status: Grundbygge klart, väntar på granskning
Ansvarig: Alf (granskning), Claude (bygge)
Senast uppdaterad: 2026-10-19

## Mål

En lätt, statisk sajt som öppnas från en QR-kod på fäboden och visar platsens text på besökarens språk, även med svag täckning.

## Klart när

- [x] En sida per plats och språk byggs från Markdown
- [x] QR-adressen `/<slug>/` skickar besökaren till rätt språk
- [x] Utkast syns bara i förhandsvisningar, aldrig i produktion
- [x] Utskrivbara skyltar genereras från samma innehåll
- [x] Interna sidor för volontärerna på `/intern/`
- [x] `npm run check` stoppar trasigt innehåll innan det byggs
- [ ] Testad på riktig iPhone och Android, i solljus, på fäboden
- [ ] Offline-läget testat: skanna en kod, slå på flygplansläge, skanna nästa

## Beslut

- 2026-10-17: **Omfattning:** statisk sajt med en sida per plats plus utskrivbara QR-skyltar (Alf).
- 2026-10-17: **Språk:** svenska, engelska och tyska (Alf). Fler språk kan läggas till, se öppna frågor.
- 2026-10-17: **Egen liten generator i Node** i stället för Astro, Eleventy eller liknande. Få beroenden, lätt att förstå för nästa person, inget ramverk att uppgradera.
- 2026-10-17: **Adress per skylt:** `https://info.arterasen.se/<slug>/`. QR-koden innehåller avslutande snedstreck så att ingen omdirigering behövs på svag täckning. Språksidor ligger på `/<sv|en|de>/<slug>/`.
- 2026-10-17: **Språkval:** sparat val, annars telefonens språk. Norska, danska och finska telefoner får svenska, nederländska och okända språk får engelska (`languageAliases` och `fallbackLanguage` i `site.config.json`).
- 2026-10-17: **Offline:** en service worker sparar alla sidor vid första besöket (bara i produktion, så att granskare alltid ser senaste versionen).
- 2026-10-17: **Design.** Lavgrå bakgrund `#e8ece3`, tjärsvart text `#26211c`, faluröd `#8a2a1c` bara på numren. Rubriker i IM Fell English, ett typsnitt från 1600-talet som den äldsta ristningen. Siffrorna kommer från EB Garamond eftersom IM Fells etta ser ut som ett I. Brödtext i Lexend för läsbarhet utomhus. Platsens nummer är det stora elementet på sidan och skylten, som ett ristat årtal.
- 2026-10-17: **Skylt:** A5 stående, nummer, svenskt namn stort, engelskt och tyskt i kursiv, QR 72 mm med felkorrigering Q (tål ungefär 25 % skada), kort adress i klartext.

- 2026-10-19: **Flera bilder per plats** (Alf bad om fler bilder). Huvudbilden står under ingressen som förut. Upp till fyra till (`fler_bilder`) visas under rubriken *Fler bilder* efter texten, före faktan, i full bredd med bildtext och kreditering. Bilderna laddas först när man scrollar dit, och sidan reserverar platsen med bredd och höjd.

## Att göra

- [x] Granska och merga PR:en med grundbygget (Alf, 2026-10-17)
- [ ] Testa på telefoner på plats när hosting är klar (föreningen, Alf)
- [ ] Bestäm om sajten ska ha besöksstatistik, till exempel Cloudflare Web Analytics utan kakor (Alf)

## Öppna frågor

- Ska startsidan ha en enkel karta över skyltarna? Kräver en karta eller ritning över fäboden att utgå från.
- Fler språk, till exempel nederländska? Tekniskt enkelt, kostar en översättning per plats.

## Logg

- 2026-10-17: Grundbygge med generator, tre språk, fem exempelplatser, skyltar, interna sidor, service worker och kontroller (Claude).
- 2026-10-17: PR #1 mergad. `granskning`-grenen skapades av workflowen direkt, eftersom den själv begär `contents: write`. Repots standardinställning för Actions behöver inte ändras (Alf, Claude).
- 2026-10-19: `fler_bilder`, bredd och höjd på bilderna, och en kontroll i `npm run verify` att alla bilder laddas. Testet av språkval väntar nu in sidbytet, det föll ibland på tyngre sidor (Claude).
