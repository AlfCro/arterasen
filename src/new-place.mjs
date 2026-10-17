// npm run ny -- <slug> "<Titel på svenska>"
// Creates content/platser/<slug>/ from content/_mall/ with the next free number.

import fs from 'node:fs';
import path from 'node:path';
import { CONTENT, PLACES_DIR, SLUG_RE, RESERVED, loadConfig, loadContent } from './content.mjs';

const [slug, title] = process.argv.slice(2);
const config = loadConfig();

if (!slug || !SLUG_RE.test(slug) || RESERVED.has(slug)) {
  console.error('Ange ett namn för adressen med a–z, 0–9 och bindestreck, t.ex.: npm run ny -- karles-lada "Karles lada"');
  console.error('Tänk på att namnet står på skylten och inte kan ändras efter att skylten satts upp.');
  process.exit(1);
}

const dir = path.join(PLACES_DIR, slug);
if (fs.existsSync(dir)) {
  console.error(`content/platser/${slug} finns redan.`);
  process.exit(1);
}

const { places } = loadContent(config);
const next = Math.max(0, ...places.map((p) => p.number || 0)) + 1;

fs.mkdirSync(dir, { recursive: true });
for (const lang of config.languages) {
  const tpl = fs.readFileSync(path.join(CONTENT, '_mall', `${lang}.md`), 'utf8');
  const out = tpl.replace('__NUMMER__', String(next)).replace('__TITEL__', lang === config.primaryLanguage && title ? title : 'TITEL');
  fs.writeFileSync(path.join(dir, `${lang}.md`), out);
}
console.log(`Skapade content/platser/${slug}/ med nummer ${next}. Fyll i texterna och kör npm run check.`);
