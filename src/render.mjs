// HTML templates. Every page uses relative links so the output works on any host,
// from a sub-path, and when opened straight from disk (useful for printing signs).

import { marked } from 'marked';
import { ui } from './i18n.mjs';

marked.use({
  gfm: true,
  renderer: {
    // Raw HTML is rejected by the check; escape it here as well so it can never reach a page.
    html(token) {
      return esc(typeof token === 'string' ? token : token.text);
    },
  },
});

export const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export const md = (s) => marked.parse(s || '');
export const up = (depth) => '../'.repeat(depth);

const stamp = () =>
  new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Stockholm', dateStyle: 'short', timeStyle: 'short' }).format(new Date());

const LANG_REDIRECT = (langs, fallback, aliases, target) => `(function(){var L=${JSON.stringify(langs)},A=${JSON.stringify(aliases)},p=null;
try{p=localStorage.getItem("lang")}catch(e){}
if(L.indexOf(p)<0){p=null;var n=navigator.languages||[navigator.language||""];
for(var i=0;i<n.length&&!p;i++){var c=String(n[i]||"").slice(0,2).toLowerCase();c=A[c]||c;if(L.indexOf(c)>=0)p=c}}
location.replace(${target}.replace("{lang}",p||${JSON.stringify(fallback)})+location.hash)})();`;

function head(ctx, { lang, title, description, depth, alternates = [], robots, canonical, inline = '' }) {
  const r = up(depth);
  const { css } = ctx.assets;
  const noindex = robots || (ctx.mode.preview ? 'noindex' : null);
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
${description ? `<meta name="description" content="${esc(description)}">` : ''}
${noindex ? `<meta name="robots" content="${noindex}">` : ''}
<meta name="theme-color" content="#e8ece3" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#1c1a17" media="(prefers-color-scheme: dark)">
${ctx.assets.preload.map((f) => `<link rel="preload" href="${r}${f}" as="font" type="font/woff2" crossorigin>`).join('\n')}
<link rel="stylesheet" href="${r}${css}">
<link rel="icon" href="${r}${ctx.assets.icon}" type="image/svg+xml">
${canonical && !ctx.mode.preview ? `<link rel="canonical" href="${esc(canonical)}">` : ''}
${ctx.mode.preview ? '' : alternates.map((a) => `<link rel="alternate" hreflang="${a.lang}" href="${esc(a.href)}">`).join('\n')}
${inline}
</head>`;
}

function previewBanner(ctx, lang, depth) {
  if (!ctx.mode.preview) return '';
  const t = ui[lang] || ui.sv;
  return `<div class="preview-banner" role="note"><p>${t.previewBanner} <a href="${up(depth)}intern/">Intern sida</a></p></div>`;
}

function langNav(ctx, lang, hrefFor) {
  const t = ui[lang];
  return `<nav class="langs" aria-label="${t.chooseLanguage}"><ul>${ctx.config.languages
    .map(
      (l) =>
        `<li><a href="${hrefFor(l)}" lang="${l}" hreflang="${l}"${l === lang ? ' aria-current="page"' : ''}>${ui[l].name}</a></li>`,
    )
    .join('')}</ul></nav>`;
}

function footer(ctx, lang, depth) {
  const t = ui[lang];
  const r = up(depth);
  const org = ctx.config.organisation;
  return `<footer class="site-footer">
<p class="consider">${t.consider}</p>
<ul class="footer-links" role="list">
<li><a href="${r}${lang}/">${t.allPlaces}</a></li>
<li><a href="${esc(org.url)}">${esc(org.name)}</a></li>
${lang === 'sv' ? `<li><a href="${r}intern/">Intern sida för föreningen</a></li>` : ''}
</ul>
${ctx.config.contentLicense ? `<p class="license">${t.license(`<a href="${esc(deed(ctx.config.contentLicense.url, lang))}" rel="license">${esc(ctx.config.contentLicense.name)}</a>`, esc(org.name))}</p>` : ''}
</footer>`;
}

function page(ctx, { lang, depth, title, description, alternates, canonical, header, main, after = '', saveLang = true, bodyClass = '' }) {
  const t = ui[lang] || ui.sv;
  const r = up(depth);
  const sw = ctx.mode.preview ? '' : ` data-sw="${r}sw.js"`;
  const intern = bodyClass.split(' ').includes('intern');
  return `${head(ctx, { lang, title, description, depth, alternates, canonical })}
<body class="${bodyClass}"${saveLang ? ' data-savelang="1"' : ''}${sw}>
<a class="skip" href="#main">${t.skip}</a>
${intern ? '' : previewBanner(ctx, lang, depth)}
${header}
${main}
${after}
${intern ? '' : footer(ctx, lang, depth)}
<script src="${r}${ctx.assets.js}" defer></script>
</body>
</html>
`;
}

function siteHeader(ctx, lang, depth, hrefFor) {
  const t = ui[lang];
  return `<header class="site-header">
<a class="site-name" href="${up(depth)}${lang}/">${t.siteTitle}</a>
${langNav(ctx, lang, hrefFor)}
</header>`;
}

// CC 4.0 deeds exist in Swedish, English and German; the other tools fall back to the plain URL.
const deed = (url, lang) => (url.includes('/4.0/') ? `${url}deed.${lang}` : url);

// "Foto: <name, linked to the source>, <license, linked to the deed>". CC BY requires all three.
function photoCredit(t, lang, image) {
  if (!image.credit) return '';
  const who = image.source ? `<a href="${esc(image.source)}">${esc(image.credit)}</a>` : esc(image.credit);
  const license = image.license
    ? `, ${image.licenseUrl ? `<a href="${esc(deed(image.licenseUrl, lang))}" rel="license">${esc(image.license)}</a>` : esc(image.license)}`
    : '';
  return ` <span class="credit">${t.photo}: ${who}${license}</span>`;
}

const statusBadge = (ctx, place) =>
  ctx.mode.preview && !place.published ? ' <span class="badge">Utkast</span>' : '';

// ---------- Public pages ----------

export function placePage(ctx, place, lang, prev, next) {
  const t = ui[lang];
  const c = place.langs[lang];
  const main = place.langs[ctx.config.primaryLanguage];
  const depth = 2;
  const r = up(depth);
  const url = (l) => `${ctx.config.siteUrl}${l}/${place.slug}/`;

  const photoFigure = (img) =>
    `<figure class="photo"><img src="${r}bilder/${img.name}" alt="${esc(img.captions[lang])}"${img.size ? ` width="${img.size.width}" height="${img.size.height}"` : ''} loading="lazy" decoding="async">
<figcaption>${esc(img.captions[lang])}${photoCredit(t, lang, img)}</figcaption></figure>`;
  const figure = place.image ? photoFigure(place.image) : '';
  const morePhotos = (place.extraImages || []).length
    ? `<section class="more-photos" aria-labelledby="photos-h"><h2 id="photos-h">${t.morePhotos}</h2>${place.extraImages.map(photoFigure).join('\n')}</section>`
    : '';

  const facts = (c.fakta || []).length
    ? `<section class="facts" aria-labelledby="facts-h"><h2 id="facts-h">${t.facts}</h2><dl>${c.fakta
        .map((f) => `<div${String(f.text).length > 14 ? ' class="long"' : ''}><dt>${esc(f.rubrik)}</dt><dd>${esc(f.text)}</dd></div>`)
        .join('')}</dl></section>`
    : '';

  const sources =
    ctx.mode.preview && place.sources.length
      ? `<section class="sources"><h2>${t.previewSources}</h2><ul>${place.sources
          .map((s) => {
            // "Title: https://…" links the title; a bare URL links itself.
            const m = String(s).match(/^(?:(.*?):?\s+)?(https?:\/\/\S+)$/);
            return `<li>${m ? `<a href="${esc(m[2])}">${esc(m[1] || m[2])}</a>` : esc(s)}</li>`;
          })
          .join('')}</ul></section>`
      : '';

  const routeLink = (p, cls, label, rel) =>
    p
      ? `<a class="${cls}" href="../${p.slug}/" rel="${rel}"><span class="route-dir">${label}</span><span class="route-target"><span class="route-n">${p.number}</span> ${esc(p.langs[lang].titel)}</span></a>`
      : '<span></span>';

  return page(ctx, {
    lang,
    depth,
    title: `${c.titel} – ${t.siteTitle}`,
    description: c.ingress,
    canonical: url(lang),
    alternates: ctx.config.languages.map((l) => ({ lang: l, href: url(l) })),
    header: siteHeader(ctx, lang, depth, (l) => `${r}${l}/${place.slug}/`),
    main: `<main id="main" class="place">
<div class="place-head">
<p class="numeral"><span class="visually-hidden">${t.place(place.number)}</span><span aria-hidden="true">${main.nummer}</span></p>
<h1>${esc(c.titel)}${statusBadge(ctx, place)}</h1>
</div>
<p class="ingress">${esc(c.ingress)}</p>
${figure}
<div class="prose">${md(c.body)}</div>
${morePhotos}
${facts}
${sources}
</main>`,
    after: prev || next ? `<nav class="route" aria-label="${t.route}">${routeLink(prev, 'route-prev', t.prev, 'prev')}${routeLink(next, 'route-next', t.next, 'next')}</nav>` : '',
  });
}

export function indexPage(ctx, lang) {
  const t = ui[lang];
  const s = ctx.start[lang];
  const depth = 1;
  const list = ctx.places.length
    ? `<h2>${t.placesHeading}</h2>
<ol class="places" role="list">${ctx.places
        .map(
          (p) =>
            `<li><a href="${p.slug}/"><span class="places-n">${p.number}</span><span class="places-text"><span class="places-title"><span class="places-name">${esc(p.langs[lang].titel)}</span>${statusBadge(ctx, p)}</span><span class="places-ingress">${esc(p.langs[lang].ingress)}</span></span></a></li>`,
        )
        .join('')}</ol>`
    : '';
  return page(ctx, {
    lang,
    depth,
    title: t.siteTitle,
    description: s.ingress,
    canonical: `${ctx.config.siteUrl}${lang}/`,
    alternates: ctx.config.languages.map((l) => ({ lang: l, href: `${ctx.config.siteUrl}${l}/` })),
    header: siteHeader(ctx, lang, depth, (l) => `../${l}/`),
    main: `<main id="main" class="start">
<h1 class="start-title">${esc(s.titel)}</h1>
<p class="ingress">${esc(s.ingress)}</p>
<div class="prose">${md(s.body)}</div>
${list}
</main>`,
  });
}

// QR codes point here: /<slug>/. Sends the visitor on to their language.
export function entryPage(ctx, targetSlug, depth = 1) {
  const r = up(depth);
  const { languages, fallbackLanguage, languageAliases } = ctx.config;
  const path = targetSlug ? `{lang}/${targetSlug}/` : '{lang}/';
  const script = `<script>${LANG_REDIRECT(languages, fallbackLanguage, languageAliases || {}, JSON.stringify(r + path))}</script>`;
  return `${head(ctx, { lang: ctx.config.primaryLanguage, title: ui.sv.siteTitle, depth, robots: 'noindex', inline: script })}
<body class="entry">
<main id="main">
<p class="entry-opening">${ui.sv.opening}</p>
<ul class="entry-langs" role="list">${languages
    .map((l) => `<li><a href="${r}${path.replace('{lang}', l)}" lang="${l}">${ui[l].name}</a></li>`)
    .join('')}</ul>
</main>
</body>
</html>
`;
}

export function notFoundPage(ctx) {
  // Served for any missing path, so links are root-absolute (the site always lives at a domain root).
  const blocks = ctx.config.languages
    .map((l) => `<section lang="${l}"><h2>${ui[l].notFoundTitle}</h2><p>${ui[l].notFoundText}</p><p><a href="/${l}/">${ui[l].allPlaces}</a></p></section>`)
    .join('');
  return `<!doctype html>
<html lang="${ctx.config.primaryLanguage}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${ui.sv.notFoundTitle} – ${ui.sv.siteTitle}</title>
<meta name="robots" content="noindex">
<link rel="stylesheet" href="/${ctx.assets.css}">
</head>
<body class="not-found">
<main id="main"><p class="numeral" aria-hidden="true">?</p>${blocks}</main>
</body>
</html>
`;
}

// ---------- Internal pages (Swedish) ----------

function internHeader(ctx, current, depth) {
  const r = up(depth);
  const tabs = [
    ...ctx.intern.map((d) => ({ href: d.slug ? `${r}intern/${d.slug}/` : `${r}intern/`, label: d.flik || d.titel, key: d.slug })),
    { href: `${r}intern/status/`, label: 'Status', key: 'status' },
    { href: `${r}skyltar/`, label: 'Skriv ut skyltar', key: 'utskrift' },
  ];
  return `<header class="site-header intern-header">
<p class="site-name"><a href="${r}sv/">${ui.sv.siteTitle}</a> <span class="intern-tag">Intern sida</span></p>
<nav class="tabs" aria-label="Interna sidor"><ul>${tabs
    .map((tab) => `<li><a href="${tab.href}"${tab.key === current ? ' aria-current="page"' : ''}>${esc(tab.label)}</a></li>`)
    .join('')}</ul></nav>
</header>`;
}

export function fillPlaceholders(ctx, text) {
  const links = ctx.config.intern || {};
  const missing = '_(länken läggs in när den finns)_';
  return text
    .replace(/\{\{trello\}\}/g, links.trelloUrl ? `[Trello-tavlan](${links.trelloUrl})` : `Trello-tavlan ${missing}`)
    .replace(/\{\{drive\}\}/g, links.driveUrl ? `[mappen i Google Drive](${links.driveUrl})` : `mappen i Google Drive ${missing}`)
    .replace(/\{\{granskning\}\}/g, links.granskningUrl ? `[granskningsversionen](${links.granskningUrl})` : `granskningsversionen ${missing}`)
    .replace(/\{\{publik\}\}/g, `[${ctx.config.siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}](${ctx.config.siteUrl})`);
}

export function internPage(ctx, doc) {
  const depth = doc.slug ? 2 : 1;
  return page(ctx, {
    lang: 'sv',
    depth,
    title: `${doc.titel} – intern sida`,
    header: internHeader(ctx, doc.slug, depth),
    main: `<main id="main" class="intern">
<h1>${esc(doc.titel)}</h1>
${doc.ingress ? `<p class="ingress">${esc(doc.ingress)}</p>` : ''}
<div class="prose">${md(fillPlaceholders(ctx, doc.body))}</div>
${doc.uppdaterad ? `<p class="updated">Uppdaterad ${esc(doc.uppdaterad instanceof Date ? doc.uppdaterad.toISOString().slice(0, 10) : doc.uppdaterad)}</p>` : ''}
</main>`,
    saveLang: false,
    bodyClass: 'intern',
  });
}

export function statusPage(ctx) {
  const depth = 2;
  const langs = ctx.config.languages;
  const g = ctx.config.intern?.granskningUrl;
  const live = ctx.config.siteUrl;
  const rows = ctx.allPlaces
    .map((p) => {
      const st = langs.map((l) => `<td>${p.langs[l]?.status === 'klar' ? 'Klar' : 'Utkast'}</td>`).join('');
      const links = [
        g ? `<a href="${g}sv/${p.slug}/">Granska</a>` : '',
        p.published ? `<a href="${live}sv/${p.slug}/">Publik sida</a>` : '',
      ]
        .filter(Boolean)
        .join(' ');
      return `<tr><td class="num">${p.number ?? ''}</td><th scope="row">${esc(p.langs.sv?.titel || p.slug)}</th>${st}<td>${p.published ? 'Ja' : 'Nej'}</td><td>${p.printed ? 'Ja' : 'Nej'}</td><td>${links}</td></tr>`;
    })
    .join('');
  return page(ctx, {
    lang: 'sv',
    depth,
    title: 'Status – intern sida',
    header: internHeader(ctx, 'status', depth),
    main: `<main id="main" class="intern intern-wide">
<h1>Status för platserna</h1>
<p class="ingress">En plats publiceras när texten är godkänd på alla språk. Tabellen visar läget i den senaste versionen av sajten.</p>
<div class="table-wrap"><table>
<thead><tr><th scope="col">Nr</th><th scope="col">Plats</th>${langs.map((l) => `<th scope="col">${l}</th>`).join('')}<th scope="col">Publicerad</th><th scope="col">Skylt uppe</th><th scope="col">Länkar</th></tr></thead>
<tbody>${rows || `<tr><td colspan="${langs.length + 5}">Inga platser ännu.</td></tr>`}</tbody>
</table></div>
<p class="updated">Byggd ${stamp()}</p>
</main>`,
    saveLang: false,
    bodyClass: 'intern intern-wide-page',
  });
}
