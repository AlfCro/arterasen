// npm run verify [-- --out=<dir>]
//
// Browser check of the built site, for agents and humans:
//   1. Builds a preview and takes phone-width screenshots (light and dark) to look at.
//   2. Prints the signs to A5 PDF and decodes every QR code from the rendered page:
//      they must lead to the draft site, and every sign must be stamped as a test print.
//      Does the same for the map draft on /intern/karta/ (karta.pdf), and on /intern/karta/peka/
//      taps the map, names a place and checks the line that is copied for Trello.
//   3. Builds production in a temporary copy with every place approved, decodes its signs
//      (public address, no stamps), then checks language redirect, offline reading after
//      the first scan, language memory and 404.
// Exits with code 1 if anything fails. Screenshots and the PDF go to --out (default: OS temp).
//
// Needs a Chromium. Found in this order: $CHROMIUM_PATH, $PLAYWRIGHT_BROWSERS_PATH/chromium-*,
// then Playwright's own download (npx playwright-core install chromium).

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import { execFileSync } from 'node:child_process';
import { chromium } from 'playwright-core';
import jsQR from 'jsqr';
import { PNG } from 'pngjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const outArg = process.argv.find((a) => a.startsWith('--out='));
const OUT = outArg ? path.resolve(outArg.slice(6)) : fs.mkdtempSync(path.join(os.tmpdir(), 'arterasen-verify-'));
fs.mkdirSync(OUT, { recursive: true });

const failures = [];
const fail = (msg) => {
  failures.push(msg);
  console.log(`FEL   ${msg}`);
};
const ok = (msg) => console.log(`ok    ${msg}`);

function chromiumPath() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (base && fs.existsSync(base)) {
    const dirs = fs.readdirSync(base).filter((d) => /^chromium-\d+$/.test(d)).sort().reverse();
    for (const d of dirs) {
      const exe = path.join(base, d, 'chrome-linux', 'chrome');
      if (fs.existsSync(exe)) return exe;
    }
  }
  return undefined;
}

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.jpg': 'image/jpeg' };
function serve(dir, port) {
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = path.join(dir, url);
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      if (!url.endsWith('/')) return res.writeHead(301, { Location: url + '/' }).end();
      file = path.join(file, 'index.html');
    }
    if (!fs.existsSync(file)) {
      res.writeHead(404, { 'Content-Type': TYPES['.html'] });
      return res.end(fs.readFileSync(path.join(dir, '404.html')));
    }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(port, () => resolve(server)));
}

// No SITE_URL and no Cloudflare variables, so the QR addresses come from site.config.json alone.
function build(cwd, outDir, preview) {
  execFileSync(process.execPath, [path.join(cwd, 'src', 'build.mjs'), ...(preview ? ['--preview'] : []), `--out=${outDir}`], {
    cwd,
    stdio: 'pipe',
    env: { ...process.env, SITE_URL: '', CF_PAGES_BRANCH: '', CF_PAGES_URL: '' },
  });
}

// Decodes every QR code on /skyltar/ and checks it against the address the build should use:
// the public site in production, the draft site in previews. Preview signs must all be stamped.
async function checkSigns(base, { expectedBase, preview, pdf, shot }) {
  const ctx = await browser.newContext({ viewport: { width: 900, height: 1200 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(base + '/skyltar/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  if (pdf) await page.pdf({ path: path.join(OUT, pdf), preferCSSPageSize: true, printBackground: true });
  const label = preview ? 'utkastet' : 'produktion';
  const signs = await page.$$('.sign');
  for (const [i, sign] of signs.entries()) {
    const png = PNG.sync.read(await (await sign.$('.sign-qr')).screenshot());
    const code = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
    // The printed address and the QR code must point to the same place.
    const printed = (await (await sign.$('.sign-url')).textContent()).trim();
    const expected = `${expectedBase}${printed.split('/').pop()}/`;
    if (!code) fail(`${label}: QR-koden på skylt ${i + 1} gick inte att avkoda`);
    else if (code.data !== expected) fail(`${label}: QR-koden på skylt ${i + 1} är ${code.data}, väntade ${expected}`);
    if (printed !== expected.replace(/^https?:\/\//, '').replace(/\/$/, '')) fail(`${label}: skylt ${i + 1} visar adressen ${printed}`);
    const stamped = Boolean(await sign.$('.sign-stamp'));
    if (preview && !stamped) fail(`${label}: skylt ${i + 1} saknar provtrycksstämpel`);
    if (!preview && stamped) fail(`${label}: skylt ${i + 1} är stämplad trots att platsen är godkänd`);
    if (i === 0 && shot) await sign.screenshot({ path: path.join(OUT, shot) });
  }
  if (!signs.length) fail(`${label}: inga skyltar på /skyltar/`);
  else ok(`${label}: ${signs.length} skyltar avkodade, QR-koderna leder till ${expectedBase}${pdf ? ', PDF sparad' : ''}`);
  await ctx.close();
}

// Decodes every QR code on the map draft (/intern/karta/): each must lead to a place page or the
// start page of the address the build should use.
async function checkMap(base, { expectedBase, label, pdf }) {
  const ctx = await browser.newContext({ viewport: { width: 1000, height: 1200 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(base + '/intern/karta/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  if (pdf) await page.pdf({ path: path.join(OUT, pdf), preferCSSPageSize: true, printBackground: true });
  const codes = await page.$$('.map-tile-qr svg, .map-start-qr svg, .map-cell-qr svg');
  const valid = new Set([expectedBase, ...places.map((p) => `${expectedBase}${p}/`)]);
  for (const [i, el] of codes.entries()) {
    const png = PNG.sync.read(await el.screenshot());
    const code = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
    if (!code) fail(`${label}: QR-kod ${i + 1} på kartan gick inte att avkoda`);
    else if (!valid.has(code.data)) fail(`${label}: QR-kod ${i + 1} på kartan leder till ${code.data}`);
  }
  if (!codes.length) fail(`${label}: inga QR-koder på kartan`);
  else ok(`${label}: ${codes.length} QR-koder på kartan avkodade${pdf ? ', PDF sparad' : ''}`);
  await ctx.close();
}

// The pointing page (/intern/karta/peka/): a tap on the map plus a place name must give the line
// "x.y nr N Title" for the tapped spot, put it on the clipboard and keep it after a reload.
async function checkPoint(base) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: base });
  const page = await ctx.newPage();
  page.on('console', (m) => m.type() === 'error' && fail(`konsolfel på /intern/karta/peka/: ${m.text()}`));
  page.on('dialog', (d) => d.accept());
  await page.goto(base + '/intern/karta/peka/', { waitUntil: 'networkidle' });
  const first = await page.evaluate(() => JSON.parse(document.getElementById('point-data').textContent).places[0]);
  if (!first) {
    fail('pekverktyget: inga platser att föreslå');
    return ctx.close();
  }
  await page.locator('#point-map').scrollIntoViewIfNeeded();
  const target = [320, 144];
  const spot = await page.evaluate(([x, y]) => {
    const svg = document.getElementById('point-map');
    const pt = svg.createSVGPoint();
    pt.x = x;
    pt.y = y;
    const p = pt.matrixTransform(svg.getScreenCTM());
    return { x: p.x, y: p.y };
  }, target);
  await page.mouse.click(spot.x, spot.y);
  const at = (await page.inputValue('#point-at')).split('.').map(Number);
  if (at.length !== 2 || Math.abs(at[0] - target[0]) > 3 || Math.abs(at[1] - target[1]) > 3)
    fail(`pekverktyget: tryck på ${target.join('.')} gav läget ${at.join('.')}`);
  await page.fill('#point-text', first.title);
  const nr = await page.inputValue('#point-nr');
  if (Number(nr) !== first.nr) fail(`pekverktyget: numret blev ${nr || 'tomt'}, väntade ${first.nr} för ${first.title}`);
  await page.click('#point-form button[type=submit]');
  const expected = `${at.join('.')} nr ${first.nr} ${first.title}`;
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  if (clip !== expected) fail(`pekverktyget: urklippet har "${clip}", väntade "${expected}"`);
  await page.reload({ waitUntil: 'networkidle' });
  const kept = await page.locator('#point-lines code').allTextContents();
  if (kept.join('|') !== expected) fail(`pekverktyget: listan efter omladdning är "${kept.join('|')}"`);
  if (!failures.some((f) => f.startsWith('pekverktyget'))) ok(`pekverktyget: tryck, namn och nummer gav "${expected}" i urklippet`);
  await page.screenshot({ path: path.join(OUT, 'intern_karta_peka-lista.png'), fullPage: true });
  await ctx.close();
}

const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'site.config.json'), 'utf8'));
const slash = (url) => (url.endsWith('/') ? url : `${url}/`);
const browser = await chromium.launch({ executablePath: chromiumPath() });

// ---------- 1 + 2: preview build, screenshots, signs ----------
const previewDir = fs.mkdtempSync(path.join(os.tmpdir(), 'arterasen-preview-'));
build(ROOT, previewDir, true);
const places = fs.readdirSync(path.join(previewDir, 'skyltar', 'qr')).map((f) => f.replace(/\.svg$/, ''));
let server = await serve(previewDir, 4311);
let base = 'http://localhost:4311';

const shots = [['/sv/', 'light'], ...places.map((p) => [`/sv/${p}/`, 'light']), [`/de/${places[0] ?? ''}/`, 'dark'], ['/intern/', 'light'], ['/intern/status/', 'light'], ['/intern/karta/', 'light'], ['/intern/karta/peka/', 'light'], ['/intern/karta/peka/', 'dark']];
for (const [url, scheme] of shots) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: scheme });
  const page = await ctx.newPage();
  page.on('console', (m) => m.type() === 'error' && fail(`konsolfel på ${url}: ${m.text()}`));
  const res = await page.goto(base + url, { waitUntil: 'networkidle' });
  if (!res || res.status() !== 200) fail(`${url} svarade ${res?.status()}`);
  await page.evaluate(() => document.fonts.ready);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  if (overflow) fail(`${url} scrollar i sidled i mobilbredd`);
  // Load every lazy image so the screenshot shows them, and fail on any that does not load.
  const broken = await page.evaluate(async () => {
    const imgs = [...document.images];
    for (const img of imgs) img.loading = 'eager';
    await Promise.all(imgs.map((img) => (img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; }))));
    await Promise.all(imgs.map((img) => img.decode().catch(() => {})));
    return imgs.filter((img) => !img.naturalWidth).map((img) => img.getAttribute('src'));
  });
  if (broken.length) fail(`${url}: bilderna laddas inte: ${broken.join(', ')}`);
  const file = path.join(OUT, `${url.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'root'}-${scheme}.png`);
  await page.screenshot({ path: file, fullPage: true });
  await ctx.close();
}
ok(`${shots.length} skärmdumpar i 390 px`);

await checkSigns(base, {
  expectedBase: slash(config.intern?.granskningUrl || config.siteUrl),
  preview: true,
  pdf: 'skyltar.pdf',
  shot: 'skylt-1.png',
});
await checkMap(base, { expectedBase: slash(config.intern?.granskningUrl || config.siteUrl), label: 'utkastet', pdf: 'karta.pdf' });
await checkPoint(base);
server.close();

// ---------- 3: production with everything approved, offline behaviour ----------
const copy = fs.mkdtempSync(path.join(os.tmpdir(), 'arterasen-prod-'));
for (const item of ['content', 'src', 'docs', 'site.config.json', 'package.json']) fs.cpSync(path.join(ROOT, item), path.join(copy, item), { recursive: true });
fs.symlinkSync(path.join(ROOT, 'node_modules'), path.join(copy, 'node_modules'));
for (const p of places) {
  for (const lang of config.languages) {
    const f = path.join(copy, 'content', 'platser', p, `${lang}.md`);
    fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(/^status: utkast$/m, 'status: klar'));
  }
}
fs.writeFileSync(path.join(copy, 'content', 'tryckta-skyltar.json'), JSON.stringify({ skyltar: places[0] ? [{ slug: 'gammal-skylt', uppsatt: '2027-01-01', flyttad_till: places[0] }] : [] }));
const prodDir = path.join(copy, 'dist');
build(copy, prodDir, false);
server = await serve(prodDir, 4312);
base = 'http://localhost:4312';

await checkSigns(base, { expectedBase: slash(config.siteUrl), preview: false, shot: 'skylt-1-produktion.png' });
await checkMap(base, { expectedBase: slash(config.siteUrl), label: 'produktion' });

if (places.length >= 2) {
  const ctx = await browser.newContext({ locale: 'de-DE' });
  const page = await ctx.newPage();
  await page.goto(`${base}/${places[0]}/`, { waitUntil: 'networkidle' });
  if (page.url().endsWith(`/de/${places[0]}/`)) ok('QR-adress skickar tysk telefon till tysk sida');
  else fail(`QR-adress hamnade på ${page.url()}, väntade /de/${places[0]}/`);

  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.waitForTimeout(1500);
  await ctx.setOffline(true);
  try {
    await page.goto(`${base}/${places[1]}/`);
    await page.waitForURL(new RegExp(`/de/${places[1]}/$`), { timeout: 8000 });
    ok('nästa skylt går att läsa offline');
  } catch {
    fail('nästa skylt gick inte att läsa offline');
  }
  await ctx.setOffline(false);

  // Wait for the English page to load (it saves the choice) before leaving it; heavier pages lost this race.
  await Promise.all([page.waitForURL(/\/en\//, { waitUntil: 'load' }), page.click('a[lang="en"]')]);
  await page.goto(`${base}/gammal-skylt/`, { waitUntil: 'networkidle' });
  if (page.url().endsWith(`/en/${places[0]}/`)) ok('språkval sparas och flyttad skylt leder rätt');
  else fail(`flyttad skylt hamnade på ${page.url()}`);

  const r = await page.goto(`${base}/finns-inte/`);
  if (r.status() === 404) ok('okänd adress ger 404');
  else fail(`okänd adress gav ${r.status()}`);
  await ctx.close();
} else {
  console.log('hoppar över offlinetestet, det behövs minst två platser');
}

server.close();
await browser.close();
fs.rmSync(copy, { recursive: true, force: true });
fs.rmSync(previewDir, { recursive: true, force: true });

console.log(`\nSkärmdumpar och PDF: ${OUT}`);
if (failures.length) {
  console.log(`${failures.length} fel.`);
  process.exit(1);
}
console.log('Allt fungerar.');
