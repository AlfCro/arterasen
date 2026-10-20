// Printable QR signs, one A5 page per place, plus a standalone SVG per QR code for print shops.
//
// Production builds encode the public address. Preview builds encode their own address, so a
// scan from utkast.arterasen.se or a branch preview stays among the drafts, and every sign in a
// preview build is stamped as a test print: those codes must never be put up.

import QRCode from 'qrcode';
import { esc } from './render.mjs';
import { ui } from './i18n.mjs';

const slash = (url) => (url.endsWith('/') ? url : `${url}/`);

// Where the QR codes of this build point.
//   production                        config.siteUrl (SITE_URL overrides it in loadConfig)
//   preview with SITE_URL set         config.siteUrl, e.g. a computer on the LAN in npm run dev
//   preview of a branch on Cloudflare CF_PAGES_URL, the address of this very deployment
//   other previews                    intern.granskningUrl, https://utkast.arterasen.se/
export function qrBaseUrl(config, preview, env = process.env) {
  if (!preview || env.SITE_URL) return config.siteUrl;
  const branch = env.CF_PAGES_BRANCH;
  if (branch && branch !== config.productionBranch && env.CF_PAGES_URL) return slash(env.CF_PAGES_URL);
  return slash(config.intern?.granskningUrl || config.siteUrl);
}

export const qrUrl = (base, slug) => `${base}${slug}/`;
export const displayUrl = (base, slug) => `${base.replace(/^https?:\/\//, '')}${slug}`;

export async function qrSvg(text) {
  // Level Q survives about 25 % damage: dirt, scratches, sun fading.
  return QRCode.toString(text, { type: 'svg', errorCorrectionLevel: 'Q', margin: 4, color: { dark: '#000000', light: '#ffffff' } });
}

export async function signsPage(ctx, places) {
  const { config, qrBase } = ctx;
  const preview = ctx.mode.preview;
  const others = config.languages.filter((l) => l !== config.primaryLanguage);
  const signs = [];
  for (const p of places) {
    const svg = await qrSvg(qrUrl(qrBase, p.slug));
    const stamp = !p.published ? 'Provtryck, ej godkänd' : preview ? 'Provtryck från utkastet' : '';
    signs.push(`<article class="sign${stamp ? ' sign-draft' : ''}" aria-label="Skylt ${p.number}">
${stamp ? `<p class="sign-stamp">${stamp}</p>` : ''}
<p class="sign-n">${p.number}</p>
<h2 class="sign-title" lang="${config.primaryLanguage}">${esc(p.langs[config.primaryLanguage].titel)}</h2>
<ul class="sign-titles" role="list">${others.map((l) => `<li lang="${l}">${esc(p.langs[l].titel)}</li>`).join('')}</ul>
<div class="sign-qr">${svg}</div>
<ul class="sign-scan" role="list">${config.languages.map((l) => `<li lang="${l}">${ui[l].scan}</li>`).join('')}</ul>
<p class="sign-url">${esc(displayUrl(qrBase, p.slug))}</p>
<p class="sign-org">${esc(config.organisation.name)}</p>
</article>`);
  }

  // Print-shop files are only offered where the codes lead to the public site.
  const files = places.length
    ? `<p>QR-koder som separata SVG-filer för tryckeriet: ${places.map((p) => `<a href="qr/${p.slug}.svg" download>${p.number} ${esc(p.slug)}</a>`).join(', ')}.</p>`
    : '';
  const help = preview
    ? `<p><strong>Det här är utkastet.</strong> QR-koderna här leder till ${esc(qrBase)}, så att den som granskar kan skanna och läsa utkasten. Alla skyltar här är provtryck och ska inte sättas upp.</p>
<p>Skyltar och QR-filer att sätta upp och skicka till tryckeriet finns på <a href="${esc(config.siteUrl)}skyltar/">${esc(config.siteUrl.replace(/^https?:\/\//, ''))}skyltar/</a>.</p>`
    : `<p>QR-koderna leder till ${esc(config.siteUrl)}. Skyltar märkta <em>Provtryck</em> är inte godkända och ska inte sättas upp.</p>
${files}`;

  const r = '../';
  return `<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Skyltar att skriva ut – ${ui.sv.siteTitle}</title>
<meta name="robots" content="noindex">
<link rel="stylesheet" href="${r}${ctx.assets.css}">
</head>
<body class="signs-page">
<header class="signs-help">
<h1>Skyltar att skriva ut</h1>
<p>En skylt per sida i A5. Skriv ut från Chrome eller Edge med <strong>Pappersstorlek A5</strong>, <strong>Marginaler: Inga</strong> och <strong>Bakgrundsgrafik</strong> påslaget. Välj <em>Spara som PDF</em> för att skicka till tryckeri.</p>
${help}
<p><a href="${r}intern/skyltar/">Instruktioner för tryck och uppsättning</a></p>
</header>
${signs.length ? signs.join('\n') : '<p class="signs-empty">Det finns inga godkända platser ännu. Skyltar skapas när en plats har status klar på alla språk.</p>'}
</body>
</html>
`;
}
