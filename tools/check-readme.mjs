// npm run check:readme: fails when README.md has fallen behind the repo.
//
// Checks that README.md
//   1. mentions every npm script as `npm run <name>`,
//   2. mentions every tracked top-level directory as `<dir>/`,
//   3. mentions every GitHub Actions workflow by its name,
//   4. has only relative links that point to existing files,
//   5. has a "Senast uppdaterad: YYYY-MM-DD" date that is not older than PLAN.md's.
//
// Run in CI by the check workflow. Exit code 1 on errors.

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const readme = read('README.md');
const errors = [];

// 1. npm scripts
const { scripts = {} } = JSON.parse(read('package.json'));
for (const name of Object.keys(scripts)) {
  if (!new RegExp(`npm run ${escape(name)}(?![\\w:-])`).test(readme)) {
    errors.push(`kommandot \`npm run ${name}\` finns i package.json men nämns inte`);
  }
}

// 2. Top-level directories. Prefer tracked files so build output and node_modules never count.
function topLevelDirs() {
  try {
    const files = execFileSync('git', ['ls-files'], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).split('\n');
    return [...new Set(files.filter((f) => f.includes('/')).map((f) => f.split('/')[0]))];
  } catch {
    const ignored = new Set(['node_modules', 'dist', 'dist-preview']);
    return readdirSync(root, { withFileTypes: true })
      .filter((d) => d.isDirectory() && !ignored.has(d.name))
      .map((d) => d.name);
  }
}
for (const dir of topLevelDirs().filter((d) => !d.startsWith('.'))) {
  if (!readme.includes(`${dir}/`)) errors.push(`mappen \`${dir}/\` finns i repot men nämns inte`);
}

// 3. Workflows, by their `name:`
const wfDir = join(root, '.github/workflows');
if (existsSync(wfDir)) {
  for (const file of readdirSync(wfDir).filter((f) => /\.ya?ml$/.test(f))) {
    const name = readFileSync(join(wfDir, file), 'utf8').match(/^name:\s*(.+?)\s*$/m)?.[1] ?? file;
    if (!readme.includes(`\`${name}\``)) errors.push(`workflowen \`${name}\` (${file}) nämns inte`);
  }
}

// 4. Relative links
for (const [, target] of readme.matchAll(/\]\(([^)\s]+)\)/g)) {
  if (/^([a-z]+:|#)/i.test(target)) continue;
  const path = decodeURIComponent(target.split('#')[0]);
  if (path && !existsSync(join(root, path))) errors.push(`länken ${target} pekar på en fil som inte finns`);
}

// 5. Freshness against PLAN.md
const dateIn = (text) => text.match(/Senast uppdaterad:\s*(\d{4}-\d{2}-\d{2})/)?.[1];
const readmeDate = dateIn(readme);
const planDate = dateIn(read('PLAN.md'));
if (!readmeDate) {
  errors.push('raden "Senast uppdaterad: ÅÅÅÅ-MM-DD" saknas under Läget just nu');
} else if (planDate && readmeDate < planDate) {
  errors.push(`Läget just nu är från ${readmeDate} men PLAN.md från ${planDate}. Uppdatera läget i README.`);
}

for (const e of errors) console.error(`fel      README.md: ${e}`);
console.log(errors.length ? `\n${errors.length} fel i README.md.` : 'README.md stämmer med repot.');
process.exit(errors.length ? 1 : 0);
