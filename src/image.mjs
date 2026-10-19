// npm run bild -- <bildfil> <slug> [namn]
// Resizes a photo for the web (max 1600 px, ~200 kB), rotates it upright and removes
// all metadata, including the GPS position phones store in photos.

import fs from 'node:fs';
import path from 'node:path';
import { PLACES_DIR } from './content.mjs';

const [src, slug, name = 'bild'] = process.argv.slice(2);
if (!src || !slug) {
  console.error('Användning: npm run bild -- <bildfil> <slug> [namn, t.ex. bild-2]');
  process.exit(1);
}
const dir = path.join(PLACES_DIR, slug);
if (!fs.existsSync(dir)) {
  console.error(`content/platser/${slug} finns inte. Skapa platsen först med npm run ny.`);
  process.exit(1);
}

const { default: sharp } = await import('sharp');
if (!/^[a-z0-9-]+$/.test(name)) {
  console.error('Namnet får bara innehålla a–z, 0–9 och bindestreck, utan filändelse.');
  process.exit(1);
}
const out = path.join(dir, `${name}.jpg`);
// sharp drops EXIF/GPS unless withMetadata() is called; rotate() applies the orientation first.
const info = await sharp(src).rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 74, mozjpeg: true }).toFile(out);
console.log(`Sparade content/platser/${slug}/${name}.jpg (${info.width}×${info.height}, ${Math.round(info.size / 1024)} kB).`);
console.log(
  name === 'bild'
    ? 'Lägg till i sv.md: bild: bild.jpg och fotograf: <namn>. Lägg till bildtext: i varje språkfil.'
    : `Lägg till under fler_bilder i sv.md: bild: ${name}.jpg, fotograf och bildtext. Lägg till samma bild med bildtext under fler_bilder i övriga språkfiler.`,
);
