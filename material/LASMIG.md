# Material från andra källor

Kopior av bilder och skrifter om Ärteråsen som finns på nätet. Det här är arkiv och underlag, inte sajtens innehåll. Ingenting här publiceras.

| Mapp | Innehåll |
| --- | --- |
| `bilder/` | Museibilder med fri licens (CC BY eller public domain) |
| `foreningen/` | Föreningens eget material från arterasen.se |
| `skrifter/` | Lars Bägerfeldts skrifter om Ärteråsen och Ore |

Vem som tagit bilderna, licens och hur de ska krediteras står i [hamta.json](hamta.json). Bakgrund och bilder som bara finns som länk: [docs/bilder.md](../docs/bilder.md). Skrifterna och övriga källor: [docs/kallor.md](../docs/kallor.md).

## Lägga till en fil

1. Lägg till en post i `hamta.json` med `id`, `typ` (`bild` eller `dokument`), `fil` (sökväg under `material/`), `url`, `kalla`, `titel`, `upphov`, `datering`, `licens` och `kreditering`.
2. Pusha till en gren som inte är `main`. Workflowen `hamta-material` hämtar filen och committar den till samma gren.
3. Läs `hamta-status.json` på grenen. Där står `ok` eller `fel` med orsak för varje post.

Lokalt går det också: `npm run hamta`.

Hämta bara filer som får användas: fri licens, föreningens eget material eller material där upphovspersonen har gett tillåtelse. Lars Bägerfeldts villkor är fri användning som inte är kommersiell. En fil som ska användas på sajten går ändå via `npm run bild` till `content/`.

Claude-sessioner kan inte ladda ner från de flesta webbplatser, därav workflowen.
