// Builds the static site into dist/.
//
//   node src/build.mjs               production: only places with status "klar" on every language
//   node src/build.mjs --preview     review build: drafts included, banner, sources, noindex
//   node src/build.mjs --cloudflare  picks the mode from CF_PAGES_BRANCH (main = production)
//   node src/build.mjs --out=path    write somewhere else than dist/

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { ROOT, loadConfig, loadContent } from './content.mjs';
import { placePage, indexPage, entryPage, notFoundPage, internPage, statusPage } from './render.mjs';
import { signsPage, qrSvg, qrUrl } from './signs.mjs';

// "Arteras Display" is IM Fell English for letters, with digits from EB Garamond:
// IM Fell only has old-style figures, where 1 looks like a capital I (bad on a numbered sign).
// For overlapping unicode-ranges the face declared last wins, so the digit faces come after.
const DIGITS = 'U+0030-0039';
const FONTS = [
  { family: 'Arteras Display', weight: 400, style: 'normal', file: '@fontsource/im-fell-english/files/im-fell-english-latin-400-normal.woff2', preload: true },
  { family: 'Arteras Display', weight: 400, style: 'italic', file: '@fontsource/im-fell-english/files/im-fell-english-latin-400-italic.woff2' },
  { family: 'Arteras Display', weight: 400, style: 'normal', file: '@fontsource/eb-garamond/files/eb-garamond-latin-500-normal.woff2', range: DIGITS, preload: true },
  { family: 'Arteras Display', weight: 400, style: 'italic', file: '@fontsource/eb-garamond/files/eb-garamond-latin-500-italic.woff2', range: DIGITS },
  { family: 'Lexend', weight: 400, style: 'normal', file: '@fontsource/lexend/files/lexend-latin-400-normal.woff2', preload: true },
  { family: 'Lexend', weight: 600, style: 'normal', file: '@fontsource/lexend/files/lexend-latin-600-normal.woff2' },
];

const hash = (buf) => crypto.createHash('sha256').update(buf).digest('hex').slice(0, 10);

function write(out, rel, content) {
  const file = path.join(out, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function writeAsset(out, name, ext, content) {
  const rel = `assets/${name}-${hash(content)}.${ext}`;
  write(out, rel, content);
  return rel;
}

export async function build({ preview = false, outDir = path.join(ROOT, 'dist'), quiet = false } = {}) {
  const log = quiet ? () => {} : (...a) => console.log(...a);
  const config = loadConfig();
  const content = loadContent(config);

  for (const w of content.warnings) log(`varning  ${w}`);
  if (content.errors.length) {
    for (const e of content.errors) console.error(`fel      ${e}`);
    throw new Error(`${content.errors.length} fel i innehållet, inget byggdes. Kör npm run check för detaljer.`);
  }

  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  // Assets: fonts, css, js, icon. Hashed names so they can be cached forever.
  const fontFaces = [];
  const preload = [];
  for (const f of FONTS) {
    const buf = fs.readFileSync(path.join(ROOT, 'node_modules', f.file));
    const rel = writeAsset(outDir, path.basename(f.file, '.woff2'), 'woff2', buf);
    fontFaces.push(
      `@font-face{font-family:"${f.family}";font-style:${f.style};font-weight:${f.weight};font-display:swap;src:url(${path.basename(rel)}) format("woff2")${f.range ? `;unicode-range:${f.range}` : ''}}`,
    );
    if (f.preload) preload.push(rel);
  }
  const css = fontFaces.join('\n') + '\n' + fs.readFileSync(path.join(ROOT, 'src', 'style.css'), 'utf8');
  const assets = {
    css: writeAsset(outDir, 'style', 'css', css),
    js: writeAsset(outDir, 'app', 'js', fs.readFileSync(path.join(ROOT, 'src', 'app.js'))),
    icon: writeAsset(outDir, 'icon', 'svg', fs.readFileSync(path.join(ROOT, 'src', 'icon.svg'))),
    preload,
  };

  const visible = content.places.filter((p) => preview || p.published);
  const ctx = {
    config,
    mode: { preview },
    assets,
    start: content.start,
    places: visible,
    allPlaces: content.places,
    intern: content.intern,
  };

  const pages = [];
  const add = (rel, html, precache = true) => {
    write(outDir, rel, html);
    if (precache) pages.push(rel.replace(/index\.html$/, ''));
  };

  // Language-neutral entry points: the site root and every QR address.
  add('index.html', entryPage(ctx, '', 0));
  for (const lang of config.languages) {
    add(`${lang}/index.html`, indexPage(ctx, lang));
    visible.forEach((p, i) => add(`${lang}/${p.slug}/index.html`, placePage(ctx, p, lang, visible[i - 1], visible[i + 1])));
  }
  for (const p of visible) add(`${p.slug}/index.html`, entryPage(ctx, p.slug));
  for (const m of content.moved) add(`${m.slug}/index.html`, entryPage(ctx, m.flyttad_till === 'start' ? '' : m.flyttad_till));
  add('404.html', notFoundPage(ctx), false);

  // Internal pages
  for (const doc of content.intern) add(doc.slug ? `intern/${doc.slug}/index.html` : 'intern/index.html', internPage(ctx, doc), false);
  add('intern/status/index.html', statusPage(ctx), false);

  // Signs
  add('skyltar/index.html', await signsPage(ctx, visible), false);
  for (const p of visible) write(outDir, `skyltar/qr/${p.slug}.svg`, await qrSvg(qrUrl(config, p.slug)));

  // Images
  for (const p of visible) {
    for (const img of [p.image, ...(p.extraImages || [])].filter(Boolean)) write(outDir, `bilder/${img.name}`, fs.readFileSync(img.file));
  }

  // Service worker (production only): keeps every page readable offline after the first visit.
  if (!preview) {
    const precache = ['./', ...pages.filter((p) => p !== ''), assets.css, assets.js, assets.icon, ...preload];
    const version = hash(JSON.stringify(precache) + css + Date.now());
    const sw = fs
      .readFileSync(path.join(ROOT, 'src', 'sw.js'), 'utf8')
      .replace('__CACHE__', `arterasen-${version}`)
      .replace('__PRECACHE__', JSON.stringify([...new Set(precache)]));
    write(outDir, 'sw.js', sw);
  }

  // Host hints (Cloudflare Pages reads _headers; other hosts ignore it)
  const headers = [
    '/assets/*\n  Cache-Control: public, max-age=31536000, immutable',
    '/bilder/*\n  Cache-Control: public, max-age=86400',
    '/sw.js\n  Cache-Control: no-cache',
    '/intern/*\n  X-Robots-Tag: noindex',
    '/skyltar/*\n  X-Robots-Tag: noindex',
  ];
  if (preview) headers.unshift('/*\n  X-Robots-Tag: noindex');
  write(outDir, '_headers', headers.join('\n') + '\n');
  // Claude-User is Anthropic's agent for fetches a person asks Claude to make, so Claude
  // can check previews and /intern/ when asked. It does not index or train; ClaudeBot and
  // all other robots follow the "*" group. The noindex headers above still apply.
  const claudeUser = 'User-agent: Claude-User\nAllow: /\n\n';
  write(
    outDir,
    'robots.txt',
    claudeUser + (preview ? 'User-agent: *\nDisallow: /\n' : 'User-agent: *\nDisallow: /intern/\nDisallow: /skyltar/\n'),
  );

  log(
    `Byggt ${preview ? 'förhandsvisning' : 'produktion'} till ${path.relative(ROOT, outDir) || outDir}: ` +
      `${visible.length} av ${content.places.length} platser, ${config.languages.length} språk.`,
  );
  return { outDir, visible: visible.length, total: content.places.length };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  let preview = args.includes('--preview') || process.env.PREVIEW === '1';
  if (args.includes('--cloudflare')) {
    const branch = process.env.CF_PAGES_BRANCH;
    const config = loadConfig();
    preview = Boolean(branch) && branch !== config.productionBranch;
    console.log(`Cloudflare-gren: ${branch ?? '(okänd)'}, läge: ${preview ? 'förhandsvisning' : 'produktion'}`);
  }
  const out = args.find((a) => a.startsWith('--out='));
  build({ preview, outDir: out ? path.resolve(out.slice(6)) : undefined }).catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
}
