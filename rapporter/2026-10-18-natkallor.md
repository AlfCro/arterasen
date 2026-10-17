# Rapport 2026-10-18: Källor och bilder från nätet

Arbetspass: 2026-10-17 23:11–2026-10-18 01:00
Av: Claude
PR: #3
Initiativ: 04

## Sammanfattning

Underlaget om fäboden är kraftigt utökat. Den största nya källan är Lars Bägerfeldts skrifter, som har dokumenterat varenda ristning på Ärteråsen, och Torbjörn Axelsons årsringsdateringar från 2024. Fyra uppgifter som tidigare var obekräftade är nu belagda, och nya motsägelser är listade. Sista sommaren med vallning var 1953, och de 36 brukare som föreningen anger för 1850 finns redan som 36 ägare vid storskiftet 1827. Fria museibilder och skrifterna hämtas till `material/` av en ny workflow, eftersom sessionen inte kan ladda ner filer själv. Facebook gick inte att läsa.

## Gjort

- **`docs/fakta.md`:** nya avsnitt från Rättviks kommun (fäboden och fäbodstigen), furudal.nu, arterasen.se/aktiviteter, Visit Dalarnas sju underverk, Länsstyrelsen, Dalarnas Spelmansförbund, Bägerfeldts skrifter (historia, ristningar, figurristningar, fäbodkullan Brita Eriksdotter, ord och arbete) och årsringsdateringar. *Obekräftat* och *Motsägelser* omskrivna.
- **`docs/kallor.md`** (ny): alla källor med länk, Bägerfeldts skrifter nr 66–105, äldre tryck och arkiv, och vad som inte är genomsökt.
- **`docs/bilder.md`** (ny): bilder på nätet uppdelade efter vad som gäller: fria med namn (sex museibilder), föreningens egna, Bägerfeldts, och bilder som kräver tillstånd.
- **`material/`** (ny): `hamta.json` listar 17 filer: sju museibilder, föreningens karta över fäbodstigen i två versioner och åtta skrifter. Alla är hämtade, ca 56 MB, varav skrifterna 53 MB. `tools/hamta-material.mjs` (`npm run hamta`) laddar ner, kontrollerar typ och storlek och skriver `hamta-status.json`. Workflowen `.github/workflows/hamta-material.yml` kör skriptet när listan ändras på en gren som inte är `main` och committar filerna till grenen.
- **`AGENTS.md`:** nya filer i strukturtabellen, kommandot `npm run hamta`, och anteckningar om vad WebFetch inte klarar.
- **`plans/04-innehall.md`:** öppna frågor uppdaterade med det nya underlaget, fyra nya frågor, två nya att göra-punkter.

## Beslut

- Bara material med fri licens, föreningens eget material och Bägerfeldts skrifter (fri icke-kommersiell användning) kopieras till repot. Övriga bilder står bara som länk (Claude, enligt reglerna i AGENTS.md). Repot är privat.
- Bägerfeldts bilderböcker B3–B8 hämtas inte, de är troligen stora.

## Kontrollerat

- `npm run check` och `npm run build` gröna.
- `tools/hamta-material.mjs` lokalt: validering av listan (felaktig sökväg, filändelse och http-adress avvisas), och att misslyckade nedladdningar hamnar i statusfilen med orsak.
- Workflowen `hamta-material` körde två gånger på GitHub, båda gröna. Första gången skickade DigitaltMuseum WebP under .jpg-namn. Skriptet kontrollerar nu formatet på filens första byte och ber om JPEG, och andra körningen gav JPEG för alla sju bilder. Alla 17 poster har status `ok`.
- De viktigaste siffrorna från Bägerfeldt är kontrollerade mot PDF-texten och markerade ✓ i fakta.md: antal ristningar och årtal, äldsta årtal 1662, 318 personer, husgrupper 1827 och 1956, sista sommaren 1953, Brita Eriksdotters årtal och årsringsdateringarna. Övriga uppgifter från skrifterna är verktygssammanfattningar.
- Bilderna granskade som kontaktark. En av dem (Vlm-Blom 2281) visade sig vara ett repro av en boksida med foto av Olof Ekberg och bildtexten "Ore socken". Fotografen är rättad i hamta.json och bilder.md.

## Väntar på

- [ ] Granska och merga PR #3 (Alf). PR:en innehåller en ny workflow med skrivrättighet.
- [ ] Koppla chatten till en dator med Claude-appen, om Facebooksidan ska gås igenom (Alf)
- [ ] Fråga Lars Bägerfeldt om hans bilder och skrifter får användas på sajten (föreningen)
- [ ] Be föreningen om originalen till bilderna på arterasen.se och Facebook, med fotografens namn (föreningen)
- [ ] Svara på de nya frågorna i `plans/04-innehall.md`: fäbodens ålder, antal eldhus, fäbodstigen, hundar, Brita Eriksdotter (föreningen)

## Öppna frågor

- Ska fäboden beskrivas som "anor från 1400-talet"? Det enda som stöder det är en muntlig tradition. Äldsta skriftliga belägg är mitten av 1500-talet. (Föreningen)
- Wikipedia-artikeln *Ärteråsens fäbodar* som en sökning pekade på gick inte att öppna. Finns den? (Vem som helst)

## Källor

- [Rättviks kommun, Ärteråsen](https://www.rattvik.se/uppleva-och-gora/kultur/kulturarv/fabodar/arterasen.html)
- [Rättviks kommun, Näset–Ärteråsen](https://www.rattvik.se/uppleva-och-gora/rattvik-outdoor/vandra-pa-fabodstigar/naset-arterasen.html)
- [Lars Bägerfeldts skrifter](https://lasse345.wordpress.com/)
- [Torbjörn Axelson, dendrokronologi](https://taxelson.se/dendro/obj/nytt.php)
- [DigitaltMuseum, Ärteråsens fäbod 1916](https://digitaltmuseum.se/0210114730455/rattvik-ore-arterasen-arterasens-fabod-1916)
- Resten i [docs/kallor.md](../docs/kallor.md)
