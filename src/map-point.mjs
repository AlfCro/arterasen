// /intern/karta/peka/: where volunteers point out places on the map draft.
//
// The base map with a grid in the same pixels as content/karta/lagen.json. Tapping the map gives
// a position like 320.144 (x from the left, y from the top); the volunteer adds what should stand
// there and, for a place with a QR code, its number. The line "320.144 nr 3 Ristningarna" is copied
// to the clipboard to paste on the Trello card, and Claude moves it into lagen.json.
// Without JavaScript the grid is still there to read the numbers by eye. See src/map-point.js.

import { esc } from './render.mjs';

const GRID = 50;
const PAD = { l: 66, t: 48, r: 16, b: 16 };

export const pointLine = ({ x, y, nr, text }) => `${x}.${y}${nr ? ` nr ${nr}` : ''} ${text}`;

function grid(map) {
  const lines = [];
  const labels = [];
  for (let x = 0; x <= map.vw; x += GRID) {
    lines.push(`<path class="${x % 100 ? 'g-minor' : 'g-major'}" d="M${x} 0 V${map.vh}"/>`);
    if (x % 100 === 0) labels.push(`<text class="g-x" x="${x}" y="-16">${x}</text>`);
  }
  for (let y = 0; y <= map.vh; y += GRID) {
    lines.push(`<path class="${y % 100 ? 'g-minor' : 'g-major'}" d="M0 ${y} H${map.vw}"/>`);
    if (y % 100 === 0) labels.push(`<text class="g-y" x="-14" y="${y + 10}">${y}</text>`);
  }
  return `<g class="g-lines">${lines.join('')}</g><g class="g-labels" aria-hidden="true">${labels.join('')}</g>`;
}

// What is on the map now, as lines in the same format. Made-up positions are left out.
function currentLines(map, places) {
  if (map.example) return [];
  const bySlug = new Map(places.map((p) => [p.slug, p]));
  const out = [];
  for (const [slug, [x, y]] of Object.entries(map.positions)) {
    const p = bySlug.get(slug);
    if (p) out.push({ x, y, nr: p.number, text: p.langs.sv.titel });
  }
  for (const l of map.labels) out.push({ x: l.lage[0], y: l.lage[1], text: l.text });
  return out;
}

function savedMark(item) {
  return `<g class="p-mark p-current"><circle cx="${item.x}" cy="${item.y}" r="8"/><text x="${item.x + 14}" y="${item.y + 9}">${esc(item.nr ? `${item.nr} ${item.text}` : item.text)}</text></g>`;
}

export function pointMain(ctx, map, places) {
  const card = ctx.config.intern?.kartaKortUrl || ctx.config.intern?.trelloUrl;
  const cardLink = card ? `<a href="${esc(card)}">Karta med QR-koder</a>` : 'Karta med QR-koder';
  if (!map) return `<main id="main" class="intern"><h1>Peka ut platserna på kartan</h1><p>Kartunderlaget saknas.</p></main>`;

  const now = currentLines(map, places);
  const data = {
    w: map.vw,
    h: map.vh,
    places: places.map((p) => ({ title: p.langs.sv.titel, nr: p.number })),
  };
  const vb = [-PAD.l, -PAD.t, map.vw + PAD.l + PAD.r, map.vh + PAD.t + PAD.b].join(' ');

  return `<main id="main" class="intern point-page">
<h1>Peka ut platserna på kartan</h1>
<p class="ingress">Tryck där en plats är, skriv vad som ska stå där och klistra in raden på Trello.</p>

<div class="point-bar" id="point-bar" hidden>
<p class="point-status" id="point-status" role="status" aria-live="polite">Tryck på kartan där platsen är.</p>
<div class="point-zoom" id="point-zoom"><button type="button" data-zoom="-1" aria-label="Mindre karta">−</button><button type="button" data-zoom="1" aria-label="Större karta">+</button></div>
</div>
<div class="point-frame" id="point-frame">
<svg id="point-map" class="point-svg" viewBox="${vb}" role="img" aria-label="Karta över fäboden med rutnät, 0 till ${map.vw} från vänster och 0 till ${map.vh} uppifrån">
<g class="k-map">${map.inner}</g>
${grid(map)}
<g id="point-current">${now.map(savedMark).join('')}</g>
<g id="point-saved"></g>
<g id="point-pick"></g>
</svg>
</div>

<noscript><p class="point-explain"><strong>Utan JavaScript:</strong> läs av läget på rutnätet, först siffran längs överkanten och sedan siffran längs vänsterkanten. Skriv till exempel <code>320.144 nr 3 Ristningarna</code> i en kommentar på Trello-kortet ${cardLink}.</p></noscript>

<form class="point-form" id="point-form" hidden>
<div class="point-field"><label for="point-at">Läge</label><input id="point-at" autocomplete="off" inputmode="decimal" placeholder="till exempel 320.144"></div>
<div class="point-field"><label for="point-text">Vad ska stå på kartan?</label><input id="point-text" list="point-places" autocomplete="off" placeholder="till exempel Ristningarna"></div>
<datalist id="point-places">${places.map((p) => `<option value="${esc(p.langs.sv.titel)}"></option>`).join('')}</datalist>
<div class="point-field point-field-nr"><label for="point-nr">Nummer <span>om platsen har en QR-kod</span></label><input id="point-nr" type="number" inputmode="numeric" min="1" max="99"></div>
<button type="submit" class="point-primary">Lägg till och kopiera</button>
</form>

<section class="point-list" id="point-list" hidden aria-labelledby="point-list-h">
<h2 id="point-list-h">Din lista</h2>
<p>Listan sparas i den här webbläsaren tills du tömmer den.</p>
<ol id="point-lines"></ol>
<p class="point-buttons"><button type="button" id="point-copy" class="point-primary">Kopiera alla rader</button> <button type="button" id="point-clear">Töm listan</button></p>
<textarea id="point-all" rows="6" readonly hidden aria-label="Alla rader"></textarea>
</section>

<section class="point-how" aria-labelledby="point-how-h">
<h2 id="point-how-h">Så gör du</h2>
<ol class="point-steps">
<li><strong>Tryck på kartan</strong> där platsen är. Tryck på <b>+</b> eller nyp med två fingrar för att se närmare. Blev det fel, tryck på ett nytt ställe.</li>
<li><strong>Skriv vad som ska stå där</strong>, till exempel <i>Ristningarna</i> eller <i>Parkering</i>. Har platsen en QR-kod, skriv numret också. Väljer du en plats i listan som kommer upp, fylls numret i av sig självt.</li>
<li><strong>Tryck på <i>Lägg till och kopiera</i>.</strong> Då kopieras en rad som <code>320.144 nr 3 Ristningarna</code>.</li>
<li><strong>Klistra in raden</strong> i en kommentar på kortet ${cardLink} på Trello. Du kan också peka ut flera platser först och kopiera alla rader på en gång.</li>
</ol>
<p class="point-explain"><code>320.144</code> betyder 320 från vänster och 144 uppifrån, som siffrorna längs kartans kanter. Inget du gör här ändrar kartan. Claude för in raderna från Trello. Husen på kartan är ritade av en dator efter Lars Bägerfeldts karta och kan ha små fel. Saknas ett hus eller är något fel, skriv det också på kortet.</p>
${map.example ? '<p class="point-explain">Siffrorna på <a href="../">kartutkastet</a> står på påhittade ställen, därför syns de inte här.</p>' : ''}
</section>

${now.length ? `<section class="point-now" aria-labelledby="point-now-h"><h2 id="point-now-h">På kartan nu</h2><p>Stämmer något inte? Peka ut det igen och skriv det på Trello.</p><ul>${now.map((l) => `<li><code>${esc(pointLine(l))}</code></li>`).join('')}</ul></section>` : ''}
<script type="application/json" id="point-data">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>
</main>`;
}
