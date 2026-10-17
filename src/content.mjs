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
      if (lang !== primary && (data.nummer != null || data.bild != null))
        warn(where, `nummer och bild anges bara i ${primary}.md`);
      place.langs[lang] = { ...data, body, words: n };
    }

    const main = place.langs[primary];
    if (main) {
      place.number = main.nummer;
      if (!Number.isInteger(main.nummer) || main.nummer < 1) err(`${base}/${primary}.md`, 'nummer måste vara ett heltal från 1 och uppåt');
      else if (numbers.has(main.nummer)) err(`${base}/${primary}.md`, `nummer ${main.nummer} används redan av ${numbers.get(main.nummer)}`);
      else numbers.set(main.nummer, slug);

      if (main.bild) {
        const img = path.join(place.dir, main.bild);
        if (!fs.existsSync(img)) err(`${base}/${primary}.md`, `bilden ${main.bild} finns inte i mappen`);
        else {
          place.image = { file: img, name: `${slug}${path.extname(main.bild).toLowerCase()}`, credit: main.fotograf || null };
          const size = fs.statSync(img).size;
          if (size > LIMITS.imageBytes) warn(`${base}/${main.bild}`, `bilden är ${Math.round(size / 1024)} kB, kör npm run bild för att krympa den`);
          if (!main.fotograf) err(`${base}/${primary}.md`, 'fotograf saknas för bilden');
        }
        for (const lang of langs) {
          if (place.langs[lang] && !place.langs[lang].bildtext) err(`${base}/${lang}.md`, 'bildtext saknas (behövs för skärmläsare)');
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
  // Text comes from volunteers via Drive. Raw HTML is not allowed, so nothing can be injected into the page.
  const stripped = body.replace(/`[^`]*`/g, '');
  if (/<\/?[a-z!][^>]*>/i.test(stripped)) err(where, 'texten innehåller HTML, använd vanlig Markdown');
}
