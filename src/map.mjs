// Draft of a printable map with QR codes, on /intern/karta/. Loose draft: see plans/05-skyltar.md.
//
// The base map is content/karta/bas.svg, traced from Lars Bägerfeldt's map of the present-day
// houses (tools/karta-vektorisera.py). Where each place is on it comes from content/karta/lagen.json,
// in pixels of the base map. While that file says "exempel": true the positions are made up, and
// every sheet is stamped so.
//
// Two layouts, both A4 portrait, all measures in mm:
//   1. One sheet: the map in the middle, a QR tile per place around it, a line from tile to place.
//      Tiles are assigned to places in angular order around the map centre, so lines rarely cross.
//   2. Two sides: a large map with numbers on the front, QR tiles in a grid on the back.

import fs from 'node:fs';
import path from 'node:path';
import { CONTENT } from './content.mjs';
import { esc } from './render.mjs';
import { qrSvg, qrUrl } from './signs.mjs';
import { ui } from './i18n.mjs';

const DIR = path.join(CONTENT, 'karta');
const A4 = { w: 210, h: 297 };

export function loadMap() {
  const basFile = path.join(DIR, 'bas.svg');
  if (!fs.existsSync(basFile)) return null;
  const svg = fs.readFileSync(basFile, 'utf8');
  const [, vw, vh] = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/).map(Number);
  const pxPerM = Number(svg.match(/data-px-per-m="([\d.]+)"/)?.[1] || 0);
  const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  const lagen = JSON.parse(fs.readFileSync(path.join(DIR, 'lagen.json'), 'utf8'));
  return { vw, vh, pxPerM, inner, example: lagen.exempel !== false, positions: lagen.lagen || {} };
}

// The base map placed at x, y with width w, in the sheet's mm coordinates.
function baseMap(map, x, y, w) {
  const h = (w * map.vh) / map.vw;
  return `<svg class="k-map" x="${x}" y="${y}" width="${w}" height="${h.toFixed(2)}" viewBox="0 0 ${map.vw} ${map.vh}" preserveAspectRatio="xMidYMid meet">${map.inner}</svg>`;
}

const toMm = (map, box, [px, py]) => [box.x + (px * box.w) / map.vw, box.y + (py * box.h) / map.vh];

function marker(n, [x, y], r) {
  return `<g class="k-marker"><circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${r}"/><text x="${x.toFixed(2)}" y="${(y + r * 0.42).toFixed(2)}" font-size="${(r * 1.25).toFixed(2)}">${n}</text></g>`;
}

function scaleBar(map, box, x, y) {
  if (!map.pxPerM) return '';
  const metres = 50;
  const len = (metres * map.pxPerM * box.w) / map.vw;
  return `<g class="k-scale"><path d="M${x} ${y - 1.2} V${y} H${(x + len).toFixed(2)} V${y - 1.2}"/><text x="${(x + len + 1.5).toFixed(2)}" y="${y}">${metres} m</text></g>`;
}

// Assign places to slots keeping their order around the centre, minimising total line length.
// Both lists are sorted by angle; every rotation of the places is tried, slots are chosen by DP.
export function assignSlots(points, slots, centre) {
  const angle = ([x, y]) => Math.atan2(y - centre[1], x - centre[0]);
  const P = points.map((p, i) => ({ i, a: angle(p.at), at: p.at })).sort((a, b) => a.a - b.a);
  const S = slots.map((s, i) => ({ i, a: angle(s.anchor), anchor: s.anchor })).sort((a, b) => a.a - b.a);
  if (P.length > S.length) return null;
  const dist = (p, s) => Math.hypot(p.at[0] - s.anchor[0], p.at[1] - s.anchor[1]);
  let best = null;
  for (let rot = 0; rot < Math.max(P.length, 1); rot++) {
    const order = P.slice(rot).concat(P.slice(0, rot));
    // dp[k][j]: cost of placing the first k places in slots before j
    const n = order.length;
    const m = S.length;
    const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(Infinity));
    const pick = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(false));
    for (let j = 0; j <= m; j++) dp[0][j] = 0;
    for (let k = 1; k <= n; k++) {
      for (let j = k; j <= m; j++) {
        const skip = dp[k][j - 1];
        const take = dp[k - 1][j - 1] + dist(order[k - 1], S[j - 1]);
        if (take < skip) {
          dp[k][j] = take;
          pick[k][j] = true;
        } else dp[k][j] = skip;
      }
    }
    if (!best || dp[n][m] < best.cost) {
      const result = new Map();
      for (let k = n, j = m; k > 0; j--) {
        if (pick[k][j]) {
          result.set(order[k - 1].i, S[j - 1].i);
          k--;
        }
      }
      best = { cost: dp[n][m], result };
    }
  }
  return best.result;
}

function stamp(map) {
  return map.example ? '<p class="map-stamp">Löst utkast · lägena är påhittade</p>' : '<p class="map-stamp">Utkast</p>';
}

function sheetHeader(ctx) {
  const langs = ctx.config.languages;
  return `<header class="map-head">
<h2>${esc(ui.sv.siteTitle)}</h2>
<ul class="map-langs" role="list">${langs.map((l) => `<li lang="${l}">${esc(ui[l].scan)}</li>`).join('')}</ul>
</header>`;
}

function credit(ctx) {
  return `<p class="map-credit">Kartan är ritad efter Lars Bägerfeldt, <i>Historisk vandring runt Ärteråsens fäbod</i> (2025), s. 51. ${esc(ctx.config.organisation.name)}.</p>`;
}

const START_TEXT = {
  sv: 'Skanna den här först, där du har täckning. Då sparas alla platser i telefonen.',
  en: 'Scan this one first, where you have coverage. Every stop is then saved on your phone.',
  de: 'Scannen Sie diesen Code zuerst, wo Sie Empfang haben. Dann sind alle Stationen auf dem Telefon gespeichert.',
};

// Layout 1: everything on one sheet.
async function sheetOne(ctx, map, places) {
  const box = { x: 46, y: 31, w: 118 };
  box.h = (box.w * map.vh) / map.vw;
  const tile = { w: 32, h: 37 };
  const slots = [];
  for (let r = 0; r < 6; r++) {
    const y = 31 + r * tile.h;
    slots.push({ x: 10, y, anchor: [10 + tile.w, y + tile.h / 2] });
    slots.push({ x: 168, y, anchor: [168, y + tile.h / 2] });
  }
  const bottomY = box.y + box.h + 4;
  for (let c = 0; c < 3; c++) {
    const x = box.x + c * 43;
    slots.push({ x, y: bottomY, anchor: [x + tile.w / 2, bottomY] });
  }

  const placed = places.filter((p) => map.positions[p.slug]).map((p) => ({ p, at: toMm(map, box, map.positions[p.slug]) }));
  const assignment = assignSlots(placed, slots, [box.x + box.w / 2, box.y + box.h / 2]);
  if (!assignment) return `<p class="map-note">Fler platser (${placed.length}) än rutor runt kartan (${slots.length}). Använd uppslaget nedan.</p>`;

  const lines = [];
  const markers = [];
  const tiles = [];
  const pos = (x, y, w, h) => `left:${x}mm;top:${y}mm;width:${w}mm;height:${h}mm`;
  for (const [pi, si] of assignment) {
    const { p, at } = placed[pi];
    const s = slots[si];
    lines.push(`<path d="M${at[0].toFixed(2)} ${at[1].toFixed(2)} L${s.anchor[0].toFixed(2)} ${s.anchor[1].toFixed(2)}"/>`);
    markers.push(marker(p.number, at, 2.4));
    tiles.push(`<div class="map-tile" style="${pos(s.x, s.y, tile.w, tile.h - 1.5)}">
<p class="map-tile-head"><span class="map-tile-n">${p.number}</span> <span lang="sv">${esc(p.langs.sv.titel)}</span></p>
<div class="map-tile-qr">${await qrSvg(qrUrl(ctx.qrBase, p.slug))}</div>
</div>`);
  }

  const startY = bottomY + tile.h + 2;
  const start = `<div class="map-start" style="${pos(box.x, startY, box.w, 46)}">
<div class="map-start-qr">${await qrSvg(ctx.qrBase)}</div>
<div class="map-start-text">
<p class="map-start-title">${ctx.config.languages.map((l) => `<span lang="${l}">${esc(ui[l].allPlaces)}</span>`).join(' · ')}</p>
${ctx.config.languages.map((l) => `<p lang="${l}">${esc(START_TEXT[l])}</p>`).join('\n')}
</div>
</div>`;

  return `<section class="map-sheet" aria-label="Uppslag 1: allt på ett blad">
${sheetHeader(ctx)}
<svg class="map-svg" viewBox="0 0 ${A4.w} ${A4.h}" width="${A4.w}mm" height="${A4.h}mm" role="img" aria-label="Karta över fäboden med QR-koder">
${baseMap(map, box.x, box.y, box.w)}
<g class="k-lines">${lines.join('')}</g>
${markers.join('')}
${scaleBar(map, box, box.x + 3, box.y + 6)}
</svg>
${tiles.join('\n')}
${start}
${stamp(map)}
${credit(ctx)}
</section>`;
}

// Layout 2: large map on the front, QR tiles on the back.
async function sheetsTwo(ctx, map, places) {
  const box = { x: 10, y: 31, w: 190 };
  box.h = (box.w * map.vh) / map.vw;
  const placed = places.filter((p) => map.positions[p.slug]);
  const front = `<section class="map-sheet map-front" aria-label="Uppslag 2, framsida: kartan">
${stamp(map)}
${sheetHeader(ctx)}
<svg class="map-svg" viewBox="0 0 ${A4.w} ${A4.h}" width="${A4.w}mm" height="${A4.h}mm" role="img" aria-label="Karta över fäboden med numrerade platser">
${baseMap(map, box.x, box.y, box.w)}
${placed.map((p) => marker(p.number, toMm(map, box, map.positions[p.slug]), 3.4)).join('')}
${scaleBar(map, box, 12, box.y + box.h + 6)}
</svg>
<ol class="map-list" role="list">${places.map((p) => `<li><span class="map-list-n">${p.number}</span> ${esc(p.langs.sv.titel)}</li>`).join('')}</ol>
${credit(ctx)}
</section>`;

  const cells = [];
  cells.push(`<div class="map-cell map-cell-start">
<div class="map-cell-qr">${await qrSvg(ctx.qrBase)}</div>
<p class="map-cell-title">${ctx.config.languages.map((l) => `<span lang="${l}">${esc(ui[l].allPlaces)}</span>`).join(' · ')}</p>
<p class="map-cell-small" lang="sv">${esc(START_TEXT.sv)}</p>
</div>`);
  for (const p of places) {
    const others = ctx.config.languages.filter((l) => l !== 'sv');
    cells.push(`<div class="map-cell">
<p class="map-cell-n">${p.number}</p>
<p class="map-cell-title" lang="sv">${esc(p.langs.sv.titel)}</p>
<p class="map-cell-small">${others.map((l) => `<span lang="${l}">${esc(p.langs[l].titel)}</span>`).join('<br>')}</p>
<div class="map-cell-qr">${await qrSvg(qrUrl(ctx.qrBase, p.slug))}</div>
</div>`);
  }
  const backs = [];
  for (let i = 0; i < cells.length; i += 12) {
    backs.push(`<section class="map-sheet map-back" aria-label="Uppslag 2, baksida: QR-koderna">
${stamp(map)}
<div class="map-grid">${cells.slice(i, i + 12).join('\n')}</div>
</section>`);
  }
  return front + '\n' + backs.join('\n');
}

export async function mapMain(ctx, map, places) {
  const g = ctx.config.intern?.granskningUrl;
  const missing = places.filter((p) => !map?.positions[p.slug]);
  const help = `<div class="map-help">
<h1>Karta med QR-koder <span class="badge">Löst utkast</span></h1>
<p>Ett första försök att visa hur en karta med QR-koder kan se ut, i stället för skyltar vid varje plats. Inget är bestämt.</p>
${map?.example ? '<p><strong>Lägena är påhittade.</strong> Siffrorna står på kartan bara för att visa hur det kan se ut. När föreningen har pekat ut var varje plats är, ritas kartan om med rätt lägen.</p>' : ''}
<p>Kartan är ritad efter Lars Bägerfeldts karta över husen i dag, i <i>Historisk vandring runt Ärteråsens fäbod</i> (2025), s. 51. Husen, vallen och skogskanten är ritade av en dator efter hans bild och kan ha små fel.</p>
<p>Två uppslag att jämföra:</p>
<ol>
<li><strong>Allt på ett blad.</strong> Kartan i mitten och en QR-kod per plats runt om, med ett streck in till platsen.</li>
<li><strong>Karta fram, koder bak.</strong> Större karta med siffror på framsidan och koderna på baksidan.</li>
</ol>
<p>Båda har en kod till startsidan. Skannar man den först där det finns täckning, sparas alla platser i telefonen.</p>
<p>Skriv ut från Chrome eller Edge med <strong>Pappersstorlek A4</strong>, <strong>Marginaler: Inga</strong> och <strong>Bakgrundsgrafik</strong> påslaget. Laminera gärna matt, blankt laminat speglar och gör koderna svårare att skanna.</p>
${ctx.mode.preview ? `<p>QR-koderna leder till ${esc(ctx.qrBase)}, alltså till utkasten. Kartan får inte delas ut med de här koderna.</p>` : ''}
${missing.length ? `<p>Saknar läge på kartan: ${missing.map((p) => esc(p.langs.sv.titel)).join(', ')}.</p>` : ''}
</div>`;

  if (!map) return `<main id="main" class="intern map-page">${help}<p>Kartunderlaget saknas.</p></main>`;
  if (!places.length) {
    return `<main id="main" class="intern map-page">${help}
<p>Kartan visar bara godkända platser här, och ingen plats är godkänd än.${g ? ` Utkastet med alla platser finns på <a href="${esc(g)}intern/karta/">${esc(g.replace(/^https?:\/\//, ''))}intern/karta/</a>.` : ''}</p></main>`;
  }
  return `<main id="main" class="intern map-page">
${help}
${await sheetOne(ctx, map, places)}
${await sheetsTwo(ctx, map, places)}
</main>`;
}
