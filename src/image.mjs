// npm run bild -- <bildfil> <slug>
// Resizes a photo for the web (max 1600 px, ~200 kB), rotates it upright and removes
// all metadata, including the GPS position phones store in photos.

import fs from 'node:fs';
import path from 'node:path';
import { PLACES_DIR } from './content.mjs';

const [src, slug] = process.argv.slice(2);
if (!src || !slug) {
  console.error('Användning: npm run bild -- <bildfil> <slug>');
  process.exit(1);
}
const dir = path.join(PLACES_DIR, slug);
if (!fs.existsSync(dir)) {
  console.error(`content/platser/${slug} finns inte. Skapa platsen först med npm run ny.`);
  process.exit(1);
}

const { default: sharp } = await import('sharp');
const out = path.join(dir, 'bild.jpg');
// sharp drops EXIF/GPS unless withMetadata() is called; rotate() applies the orientation first.
const info = await sharp(src).rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 74, mozjpeg: true }).toFile(out);
console.log(`Sparade content/platser/${slug}/bild.jpg (${info.width}×${info.height}, ${Math.round(info.size / 1024)} kB).`);
console.log('Lägg till i sv.md: bild: bild.jpg och fotograf: <namn>. Lägg till bildtext: i varje språkfil.');
