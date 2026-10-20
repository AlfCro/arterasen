// Loads and validates everything under content/ and docs/intern/.
// Used by build, check and dev. No side effects besides reading files.

import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
export const CONTENT = path.join(ROOT, 'content');
export const PLACES_DIR = path.join(CONTENT, 'platser');
export const INTERN_DIR = path.join(ROOT, 'docs', 'intern');

export const STATUSES = ['utkast', 'klar'];
export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const RESERVED = new Set(['assets', 'bilder', 'intern', 'skyltar', 'index', '404', 'sw', 'robots', 'start']);

// Licenses that may be used for photos without asking anyone, as long as the credit is shown.
// Key = what is written in bildlicens, value = the license deed (a language suffix is added for 4.0).
export const FREE_LICENSES = {
  'CC BY 4.0': 'https://creativecommons.org/licenses/by/4.0/',
  'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
  'CC0 1.0': 'https://creativecommons.org/publicdomain/zero/1.0/',
  'Public Domain Mark 1.0': 'https://creativecommons.org/publicdomain/mark/1.0/',
};

const MAX_EXTRA = 4;

// A link from one place to another in the Markdown text: [Title](../slug/)
const PLACE_LINK = /\]\(\.\.\/([a-z0-9-]+)\/?\)/g;

const LIMITS = {
  ingressChars: 160,
  bodyWordsMin: 40,
  bodyWordsMax: 260,
  imageBytes: 350 * 1024,
};

export function loadConfig() {
  const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'site.config.json'), 'utf8'));
  if (process.env.SITE_URL) config.siteUrl = process.env.SITE_URL;
  if (!config.siteUrl.endsWith('/')) config.siteUrl += '/';
  for (const lang of config.languages) RESERVED.add(lang);
  return config;
}

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)([\s\S]*)$/;

function readMd(file) {
  const raw = fs.readFileSync(file, 'utf8').replace(/^﻿/, '');
  const m = raw.match(FRONTMATTER);
  if (!m) return { data: {}, body: raw.trim() };
  // YAML 1.2 core schema: dates stay strings, "1954" stays a string when quoted.
  const data = YAML.parse(m[1]) || {};
  return { data, body: m[2].trim() };
}

// Width and height of a JPEG from its SOF marker, so pages can reserve the space before
// a lazy image loads. No image library needed at build time.
function jpegSize(file) {
  const b = fs.readFileSync(file);
  if (b[0] !== 0xff || b[1] !== 0xd8) return null;
  let i = 2;
  while (i + 9 < b.length) {
    if (b[i] !== 0xff) return null;
    const m = b[i + 1];
    if (m === 0xff) { i++; continue; }
    if (m === 0x01 || (m >= 0xd0 && m <= 0xd9)) { i += 2; continue; }
    if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return { width: b.readUInt16BE(i + 7), height: b.readUInt16BE(i + 5) };
    i += 2 + b.readUInt16BE(i + 2);
  }
  return null;
}

const words = (s) => s.replace(/[#*_>`\[\]()]/g, ' ').split(/\s+/).filter(Boolean).length;

export function loadContent(config) {
  const errors = [];
  const warnings = [];
  const langs = config.languages;
  const primary = config.primaryLanguage;
  const err = (where, msg) => errors.push(`${where}: ${msg}`);
  const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

  // Start page
  const start = {};
  for (const lang of langs) {
    const file = path.join(CONTENT, 'start', `${lang}.md`);
    const where = `content/start/${lang}.md`;
    if (!fs.existsSync(file)) { err(where, 'filen saknas'); continue; }
    const { data, body } = readMd(file);
    if (!data.titel) err(where, 'titel saknas');
    if (!data.ingress) err(where, 'ingress saknas');
    checkBody(where, body, err);
    start[lang] = { ...data, body };
  }

  // Places
  const places = [];
  const dirs = fs.existsSync(PLACES_DIR)
    ? fs.readdirSync(PLACES_DIR, { withFileTypes: true }).filter((d) => d.isDirectory() && !d.name.startsWith('_'))
    : [];
  const numbers = new Map();

  for (const dir of dirs) {
    const slug = dir.name;
    const base = `content/platser/${slug}`;
    if (!SLUG_RE.test(slug)) err(base, 'mappnamnet får bara innehålla a–z, 0–9 och bindestreck');
    if (RESERVED.has(slug)) err(base, `"${slug}" är ett reserverat namn`);

    const place = { slug, langs: {}, dir: path.join(PLACES_DIR, slug) };
    for (const lang of langs) {
      const file = path.join(place.dir, `${lang}.md`);
      const where = `${base}/${lang}.md`;
      if (!fs.existsSync(file)) { err(where, 'filen saknas'); continue; }
      const { data, body } = readMd(file);
      if (!data.titel) err(where, 'titel saknas');
      if (!data.ingress) err(where, 'ingress saknas');
      else if (String(data.ingress).length > LIMITS.ingressChars)
        warn(where, `ingressen är ${String(data.ingress).length} tecken (högst ${LIMITS.ingressChars} rekommenderas)`);
      if (!STATUSES.includes(data.status)) err(where, `status måste vara ${STATUSES.join(' eller ')}`);
      if (data.fakta && !Array.isArray(data.fakta)) err(where, 'fakta måste vara en lista');
      for (const f of data.fakta || []) {
        if (!f || f.rubrik == null || f.text == null) err(where, 'varje fakta-rad behöver rubrik och text');
      }
      const n = words(body);
      if (n < LIMITS.bodyWordsMin) warn(where, `brödtexten är bara ${n} ord`);
      if (n > LIMITS.bodyWordsMax) warn(where, `brödtexten är ${n} ord (högst ${LIMITS.bodyWordsMax} rekommenderas för att läsas stående)`);
      checkBody(where, body, err);
      if (lang !== primary && ['nummer', 'bild', 'fotograf', 'bildlicens', 'bildkalla'].some((k) => data[k] != null))
        warn(where, `nummer, bild, fotograf, bildlicens och bildkalla anges bara i ${primary}.md`);
      place.langs[lang] = { ...data, body, words: n };
    }

    const main = place.langs[primary];
    if (main) {
      place.number = main.nummer;
      if (!Number.isInteger(main.nummer) || main.nummer < 1) err(`${base}/${primary}.md`, 'nummer måste vara ett heltal från 1 och uppåt');
      else if (numbers.has(main.nummer)) err(`${base}/${primary}.md`, `nummer ${main.nummer} används redan av ${numbers.get(main.nummer)}`);
      else numbers.set(main.nummer, slug);

      // Photos: the main one (bild) under the ingress, and up to MAX_EXTRA more (fler_bilder) after the text.
      // Credit and license are given once in sv.md; every language has its own bildtext.
      const where = `${base}/${primary}.md`;
      const photo = (d, name, captionOf) => {
        const img = path.join(place.dir, d.bild);
        if (!fs.existsSync(img)) { err(where, `bilden ${d.bild} finns inte i mappen`); return null; }
        const size = fs.statSync(img).size;
        if (size > LIMITS.imageBytes) warn(`${base}/${d.bild}`, `bilden är ${Math.round(size / 1024)} kB, kör npm run bild för att krympa den`);
        if (!d.fotograf) err(where, `fotograf saknas för ${d.bild}`);
        if (d.bildlicens && !FREE_LICENSES[d.bildlicens])
          err(where, `bildlicens "${d.bildlicens}" för ${d.bild} känns inte igen. Använd ${Object.keys(FREE_LICENSES).join(', ')}, eller ta bort raden om fotografen har gett tillåtelse`);
        if (d.bildlicens && !d.bildkalla) err(where, `bildkalla saknas för ${d.bild}: länka till sidan där bilden och licensen finns`);
        if (d.bildkalla && !/^https:\/\//.test(d.bildkalla)) err(where, `bildkalla för ${d.bild} måste vara en https-adress`);
        const captions = {};
        for (const lang of langs) {
          if (!place.langs[lang]) continue;
          captions[lang] = captionOf(lang);
          if (!captions[lang]) err(`${base}/${lang}.md`, `bildtext saknas för ${d.bild} (behövs för skärmläsare)`);
        }
        return {
          file: img,
          name,
          size: jpegSize(img),
          credit: d.fotograf || null,
          license: d.bildlicens || null,
          licenseUrl: FREE_LICENSES[d.bildlicens] || null,
          source: d.bildkalla || null,
          captions,
        };
      };

      if (main.bild) {
        place.image = photo(main, `${slug}${path.extname(main.bild).toLowerCase()}`, (lang) => place.langs[lang].bildtext);
      }
      place.extraImages = [];
      if (main.fler_bilder != null && !Array.isArray(main.fler_bilder)) err(where, 'fler_bilder måste vara en lista');
      const extras = Array.isArray(main.fler_bilder) ? main.fler_bilder : [];
      if (extras.length && !main.bild) err(where, 'fler_bilder kräver att bild också är satt');
      if (extras.length > MAX_EXTRA) warn(where, `${extras.length} extra bilder, högst ${MAX_EXTRA} rekommenderas så att sidan laddar snabbt`);
      const seen = new Set([main.bild]);
      for (const e of extras) {
        if (!e?.bild) { err(where, 'varje rad i fler_bilder behöver bild'); continue; }
        if (seen.has(e.bild)) { err(where, `bilden ${e.bild} används två gånger`); continue; }
        seen.add(e.bild);
        const ext = path.extname(e.bild).toLowerCase();
        const img = photo(e, `${slug}-${path.basename(e.bild, path.extname(e.bild))}${ext}`, (lang) =>
          lang === primary ? e.bildtext : (place.langs[lang].fler_bilder || []).find((x) => x?.bild === e.bild)?.bildtext,
        );
        if (img) place.extraImages.push(img);
      }
      for (const lang of langs) {
        if (lang === primary || !place.langs[lang]) continue;
        for (const x of place.langs[lang].fler_bilder || []) {
          if (!seen.has(x?.bild)) warn(`${base}/${lang}.md`, `fler_bilder nämner ${x?.bild}, som inte finns i ${primary}.md`);
          if (x && ['fotograf', 'bildlicens', 'bildkalla'].some((k) => x[k] != null)) warn(`${base}/${lang}.md`, `fotograf, bildlicens och bildkalla anges bara i ${primary}.md`);
        }
      }
      place.sources = main.kallor || [];
      if (!place.sources.length) warn(`${base}/${primary}.md`, 'kallor saknas, ange var fakta kommer ifrån');
    }

    const statuses = langs.map((l) => place.langs[l]?.status);
    place.published = statuses.every((s) => s === 'klar');
    if (!place.published && statuses.includes('klar'))
      warn(base, `publiceras inte förrän alla språk har status klar (${langs.map((l, i) => `${l}: ${statuses[i] ?? 'saknas'}`).join(', ')})`);

    const factCounts = langs.map((l) => (place.langs[l]?.fakta || []).length);
    if (new Set(factCounts).size > 1) warn(base, `olika antal fakta-rader per språk (${factCounts.join('/')})`);

    places.push(place);
  }
  places.sort((a, b) => (a.number ?? 999) - (b.number ?? 999));

  // Printed signs: every printed address must keep working.
  const printedFile = path.join(CONTENT, 'tryckta-skyltar.json');
  const printed = fs.existsSync(printedFile) ? JSON.parse(fs.readFileSync(printedFile, 'utf8')).skyltar || [] : [];
  const bySlug = new Map(places.map((p) => [p.slug, p]));
  const moved = [];
  for (const s of printed) {
    const where = `content/tryckta-skyltar.json (${s.slug})`;
    if (s.flyttad_till) {
      if (s.flyttad_till !== 'start' && !bySlug.has(s.flyttad_till)) err(where, `flyttad_till pekar på ${s.flyttad_till} som inte finns`);
      if (bySlug.has(s.slug)) warn(where, 'platsen finns kvar men är markerad som flyttad, flytten används');
      moved.push(s);
    } else if (!bySlug.has(s.slug)) {
      err(where, 'skylten sitter uppe men platsen finns inte. Återställ mappen eller ange flyttad_till');
    } else if (!bySlug.get(s.slug).published) {
      err(where, 'skylten sitter uppe men platsen är inte publicerad, QR-koden skulle leda till en tom sida');
    }
  }
  // Links between places in the text, written as [Title](../slug/). Production only builds
  // published places, so a published place must not link to one that is still a draft.
  for (const p of places) {
    for (const lang of langs) {
      const c = p.langs[lang];
      if (!c) continue;
      for (const [, target] of c.body.matchAll(PLACE_LINK)) {
        const where = `content/platser/${p.slug}/${lang}.md`;
        const to = bySlug.get(target);
        if (!to) err(where, `länken till ../${target}/ leder till en plats som inte finns`);
        else if (p.published && !to.published)
          err(where, `länken till ${target} leder till en plats som inte är publicerad. Publicera ${target} först eller ta bort länken`);
      }
    }
  }

  const printedSlugs = new Set(printed.filter((s) => !s.flyttad_till).map((s) => s.slug));
  for (const p of places) p.printed = printedSlugs.has(p.slug);

  // Internal pages (Swedish only)
  const intern = [];
  if (fs.existsSync(INTERN_DIR)) {
    for (const f of fs.readdirSync(INTERN_DIR).filter((f) => f.endsWith('.md')).sort()) {
      const where = `docs/intern/${f}`;
      const { data, body } = readMd(path.join(INTERN_DIR, f));
      const slug = f.replace(/^\d+-/, '').replace(/\.md$/, '');
      if (!data.titel) err(where, 'titel saknas');
      intern.push({ slug: slug === 'index' ? '' : slug, ...data, body });
    }
  }

  return { start, places, moved, intern, errors, warnings };
}

function checkBody(where, body, err) {
  // Text comes from volunteers via Trello cards. Raw HTML is not allowed, so nothing can be injected into the page.
  const stripped = body.replace(/`[^`]*`/g, '');
  if (/<\/?[a-z!][^>]*>/i.test(stripped)) err(where, 'texten innehåller HTML, använd vanlig Markdown');
}
