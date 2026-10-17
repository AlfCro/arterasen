// Printable QR signs, one A5 page per place, plus a standalone SVG per QR code for print shops.
// The QR code always encodes the production address, never a preview address.

import QRCode from 'qrcode';
import { esc } from './render.mjs';
import { ui } from './i18n.mjs';

export const qrUrl = (config, slug) => `${config.siteUrl}${slug}/`;
export const displayUrl = (config, slug) => `${config.siteUrl.replace(/^https?:\/\//, '')}${slug}`;

export async function qrSvg(text) {
  // Level Q survives about 25 % damage: dirt, scratches, sun fading.
  return QRCode.toString(text, { type: 'svg', errorCorrectionLevel: 'Q', margin: 4, color: { dark: '#000000', light: '#ffffff' } });
}

export async function signsPage(ctx, places) {
  const { config } = ctx;
  const others = config.languages.filter((l) => l !== config.primaryLanguage);
  const signs = [];
  for (const p of places) {
    const svg = await qrSvg(qrUrl(config, p.slug));
    signs.push(`<article class="sign${p.published ? '' : ' sign-draft'}" aria-label="Skylt ${p.number}">
${p.published ? '' : '<p class="sign-stamp">Provtryck, ej godkänd</p>'}
<p class="sign-n">${p.number}</p>
<h2 class="sign-title" lang="${config.primaryLanguage}">${esc(p.langs[config.primaryLanguage].titel)}</h2>
<ul class="sign-titles" role="list">${others.map((l) => `<li lang="${l}">${esc(p.langs[l].titel)}</li>`).join('')}</ul>
<div class="sign-qr">${svg}</div>
<ul class="sign-scan" role="list">${config.languages.map((l) => `<li lang="${l}">${ui[l].scan}</li>`).join('')}</ul>
<p class="sign-url">${esc(displayUrl(config, p.slug))}</p>
<p class="sign-org">${esc(config.organisation.name)}</p>
</article>`);
  }

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
<p>QR-koderna leder till ${esc(config.siteUrl)}. Skyltar märkta <em>Provtryck</em> är inte godkända och ska inte sättas upp.</p>
${places.length ? `<p>QR-koder som separata SVG-filer för tryckeriet: ${places.map((p) => `<a href="qr/${p.slug}.svg" download>${p.number} ${esc(p.slug)}</a>`).join(', ')}.</p>` : ''}
<p><a href="${r}intern/skyltar/">Instruktioner för tryck och uppsättning</a></p>
</header>
${signs.length ? signs.join('\n') : '<p class="signs-empty">Det finns inga godkända platser ännu. Skyltar skapas när en plats har status klar på alla språk.</p>'}
</body>
</html>
`;
}
