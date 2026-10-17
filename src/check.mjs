// npm run check: validates all content without building. Exit code 1 on errors.

import { loadConfig, loadContent } from './content.mjs';

const config = loadConfig();
const { places, errors, warnings } = loadContent(config);

for (const w of warnings) console.log(`varning  ${w}`);
for (const e of errors) console.error(`fel      ${e}`);

const published = places.filter((p) => p.published).length;
console.log(
  `\n${places.length} platser, ${published} publiceras, ${places.length - published} utkast. ` +
    `${errors.length} fel, ${warnings.length} varningar.`,
);
process.exit(errors.length ? 1 : 0);
