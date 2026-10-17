// npm run hamta
// Downloads the files listed in material/hamta.json that are not in the repo yet and
// writes material/hamta-status.json with the result for every entry.
//
// Claude sessions cannot reach most websites from the shell, so the workflow
// .github/workflows/hamta-material.yml runs this on GitHub whenever the list changes
// on a branch, and commits what it fetched to that branch. It also runs locally.

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DIR = path.join(ROOT, 'material');
const LIST = path.join(DIR, 'hamta.json');
const STATUS = path.join(DIR, 'hamta-status.json');

const MAX_BYTES = 25 * 1024 * 1024;
const TIMEOUT_MS = 120_000;
const REQUIRED = ['id', 'typ', 'fil', 'url', 'kalla', 'titel', 'upphov', 'licens', 'kreditering'];
const TYPES = {
  bild: { ext: ['.jpg', '.jpeg', '.png', '.webp'], mime: /^image\// },
  dokument: { ext: ['.pdf'], mime: /^application\/pdf/ },
};

function validate(list) {
  const errors = [];
  const ids = new Set();
  const files = new Set();
  if (!Array.isArray(list)) return ['material/hamta.json ska vara en lista'];
  for (const [i, e] of list.entries()) {
    const where = `post ${i + 1} (${e?.id ?? 'utan id'})`;
    for (const key of REQUIRED) if (!e?.[key]) errors.push(`${where}: ${key} saknas`);
    if (!e?.id || !e?.fil) continue;
    if (ids.has(e.id)) errors.push(`${where}: id finns redan`);
    if (files.has(e.fil)) errors.push(`${where}: fil finns redan`);
    ids.add(e.id);
    files.add(e.fil);
    const type = TYPES[e.typ];
    if (!type) errors.push(`${where}: typ ska vara ${Object.keys(TYPES).join(' eller ')}`);
    else if (!type.ext.includes(path.extname(e.fil).toLowerCase())) errors.push(`${where}: filändelsen passar inte typen ${e.typ}`);
    const target = path.resolve(DIR, e.fil);
    if (!target.startsWith(DIR + path.sep) || e.fil.includes('\\')) errors.push(`${where}: fil måste ligga under material/`);
    if (!/^https:\/\//.test(e.url)) errors.push(`${where}: url måste börja med https://`);
  }
  return errors;
}

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

async function download(entry) {
  const res = await fetch(entry.url, {
    redirect: 'follow',
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { 'user-agent': 'arterasen-material/1.0 (+https://github.com/AlfCro/arterasen)' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const declared = Number(res.headers.get('content-length') || 0);
  if (declared > MAX_BYTES) throw new Error(`för stor (${Math.round(declared / 1e6)} MB)`);
  const mime = (res.headers.get('content-type') || '').toLowerCase();
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length > MAX_BYTES) throw new Error(`för stor (${Math.round(buf.length / 1e6)} MB)`);
  // Some hosts send a generic type; fall back to magic bytes before rejecting.
  const looksPdf = buf.subarray(0, 5).toString('latin1') === '%PDF-';
  const looksImage = /^(\xff\xd8\xff|\x89PNG|RIFF)/.test(buf.subarray(0, 4).toString('latin1'));
  const okType = TYPES[entry.typ].mime.test(mime) || (entry.typ === 'dokument' ? looksPdf : looksImage);
  if (!okType) throw new Error(`fel innehållstyp (${mime || 'okänd'})`);
  return buf;
}

const list = JSON.parse(fs.readFileSync(LIST, 'utf8'));
const errors = validate(list);
if (errors.length) {
  console.error('material/hamta.json har fel:\n- ' + errors.join('\n- '));
  process.exit(1);
}

const previous = fs.existsSync(STATUS) ? JSON.parse(fs.readFileSync(STATUS, 'utf8')) : {};
const status = {};
let failed = 0;
let fetched = 0;

for (const entry of list) {
  const target = path.join(DIR, entry.fil);
  if (fs.existsSync(target)) {
    const buf = fs.readFileSync(target);
    status[entry.id] = { fil: entry.fil, status: 'ok', byte: buf.length, sha256: sha256(buf) };
    continue;
  }
  try {
    const buf = await download(entry);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, buf);
    status[entry.id] = { fil: entry.fil, status: 'ok', byte: buf.length, sha256: sha256(buf) };
    fetched++;
    console.log(`Hämtade ${entry.fil} (${Math.round(buf.length / 1024)} kB)`);
  } catch (err) {
    failed++;
    status[entry.id] = { fil: entry.fil, status: 'fel', meddelande: String(err.message || err) };
    console.error(`Kunde inte hämta ${entry.id}: ${status[entry.id].meddelande}`);
  }
}

// Keep the file stable when nothing changed, so reruns do not create empty commits.
const next = JSON.stringify(status, null, 2) + '\n';
if (JSON.stringify(previous, null, 2) + '\n' !== next) fs.writeFileSync(STATUS, next);

console.log(`${list.length} poster: ${fetched} hämtade nu, ${failed} misslyckades.`);
process.exit(failed ? 1 : 0);
