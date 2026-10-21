// /intern/karta/peka/: tap the map, name what is there, copy the line for Trello.
// Rendered by src/map-point.mjs. The page still works without this script (read the grid by eye).
(function () {
  var svg = document.getElementById('point-map');
  var form = document.getElementById('point-form');
  var dataEl = document.getElementById('point-data');
  if (!svg || !form || !dataEl || !svg.getScreenCTM) return;

  var NS = 'http://www.w3.org/2000/svg';
  var KEY = 'arterasen-peka';
  var data = JSON.parse(dataEl.textContent);
  var $ = function (id) { return document.getElementById(id); };
  var at = $('point-at');
  var text = $('point-text');
  var nr = $('point-nr');
  var status = $('point-status');
  var list = $('point-list');
  var lines = $('point-lines');
  var all = $('point-all');
  var frame = $('point-frame');
  var pick = null;
  var autoNr = false;
  var zoom = 1;

  var items = [];
  try {
    items = JSON.parse(localStorage.getItem(KEY) || '[]').filter(function (i) {
      return i && isFinite(i.x) && isFinite(i.y) && i.text;
    });
  } catch (e) {}

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch (e) {}
  }

  function line(i) {
    return i.x + '.' + i.y + (i.nr ? ' nr ' + i.nr : '') + ' ' + i.text;
  }

  function parseAt(s) {
    var m = String(s).match(/^\s*(\d{1,4})\s*[.,:;/ ]\s*(\d{1,4})\s*$/);
    if (!m) return null;
    var x = Number(m[1]);
    var y = Number(m[2]);
    return x <= data.w && y <= data.h ? { x: x, y: y } : null;
  }

  function el(name, attrs, parent) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  function drawPick() {
    var g = $('point-pick');
    while (g.firstChild) g.removeChild(g.firstChild);
    if (!pick) return;
    var c = el('g', { class: 'p-pick' }, g);
    el('circle', { cx: pick.x, cy: pick.y, r: 16 }, c);
    el('path', { d: 'M' + (pick.x - 28) + ' ' + pick.y + 'h18m20 0h18M' + pick.x + ' ' + (pick.y - 28) + 'v18m0 20v18' }, c);
    var t = el('text', { x: pick.x + 22, y: pick.y - 20 }, c);
    t.textContent = pick.x + '.' + pick.y;
  }

  function drawSaved() {
    var g = $('point-saved');
    while (g.firstChild) g.removeChild(g.firstChild);
    items.forEach(function (i) {
      var c = el('g', { class: 'p-mark' }, g);
      el('circle', { cx: i.x, cy: i.y, r: 8 }, c);
      var t = el('text', { x: i.x + 14, y: i.y + 9 }, c);
      t.textContent = (i.nr ? i.nr + ' ' : '') + i.text;
    });
  }

  function renderList() {
    while (lines.firstChild) lines.removeChild(lines.firstChild);
    items.forEach(function (i, n) {
      var li = document.createElement('li');
      var code = document.createElement('code');
      code.textContent = line(i);
      var del = document.createElement('button');
      del.type = 'button';
      del.textContent = 'Ta bort';
      del.setAttribute('aria-label', 'Ta bort ' + line(i));
      del.addEventListener('click', function () {
        items.splice(n, 1);
        save();
        update();
      });
      li.appendChild(code);
      li.appendChild(document.createTextNode(' '));
      li.appendChild(del);
      lines.appendChild(li);
    });
    list.hidden = !items.length;
    all.value = items.map(line).join('\n');
  }

  function update() {
    drawSaved();
    renderList();
  }

  function setPick(p, fromMap) {
    pick = p;
    drawPick();
    if (fromMap) at.value = p ? p.x + '.' + p.y : '';
    if (p) say('Läget ' + p.x + '.' + p.y + ' är valt. Skriv vad som ska stå där.');
  }

  function say(msg) {
    status.textContent = msg;
  }

  // Copies with the Clipboard API, then the old way, and if both fail shows the text to copy by hand.
  function copy(textToCopy, done) {
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = textToCopy;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '0';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try {
        ok = document.execCommand('copy');
      } catch (e) {}
      document.body.removeChild(ta);
      done(ok);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy).then(function () { done(true); }, fallback);
    } else fallback();
  }

  function showAll() {
    all.hidden = false;
    all.focus();
    all.select();
  }

  svg.addEventListener('click', function (e) {
    var p = toMap(e.clientX, e.clientY);
    var x = Math.round(p.x);
    var y = Math.round(p.y);
    if (x < 0 || y < 0 || x > data.w || y > data.h) return;
    setPick({ x: x, y: y }, true);
  });

  at.addEventListener('input', function () {
    var p = parseAt(at.value);
    pick = p;
    drawPick();
  });

  text.addEventListener('input', function () {
    var v = text.value.trim().toLowerCase();
    var match = null;
    data.places.forEach(function (p) {
      if (p.title.toLowerCase() === v) match = p;
    });
    if (match && match.nr && (autoNr || !nr.value)) {
      nr.value = match.nr;
      autoNr = true;
    } else if (!match && autoNr) {
      nr.value = '';
      autoNr = false;
    }
  });
  nr.addEventListener('input', function () {
    autoNr = false;
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var p = parseAt(at.value);
    if (!p) {
      say('Tryck först på kartan där platsen är, eller skriv läget som 320.144.');
      at.focus();
      return;
    }
    var label = text.value.replace(/\s+/g, ' ').trim();
    if (!label) {
      say('Skriv vad som ska stå på kartan.');
      text.focus();
      return;
    }
    var n = parseInt(nr.value, 10);
    var item = { x: p.x, y: p.y, nr: n > 0 ? n : null, text: label };
    items.push(item);
    save();
    update();
    var l = line(item);
    copy(l, function (ok) {
      say(ok ? 'Kopierat: ' + l + '. Klistra in det på Trello, eller fortsätt och kopiera alla rader på slutet.' : 'Tillagt: ' + l + '. Kopieringen gick inte, markera raden nedan och kopiera den själv.');
      if (!ok) showAll();
    });
    text.value = '';
    nr.value = '';
    autoNr = false;
    at.value = '';
    pick = null;
    drawPick();
  });

  $('point-copy').addEventListener('click', function () {
    var t = items.map(line).join('\n');
    copy(t, function (ok) {
      say(ok ? 'Alla ' + items.length + ' rader är kopierade. Klistra in dem i en kommentar på Trello.' : 'Kopieringen gick inte. Markera texten nedan och kopiera den själv.');
      if (!ok) showAll();
    });
  });

  $('point-clear').addEventListener('click', function () {
    if (!window.confirm('Ta bort alla rader i listan? Det du redan har klistrat in på Trello finns kvar där.')) return;
    items = [];
    save();
    update();
    all.hidden = true;
    say('Listan är tom. Tryck på kartan där platsen är.');
  });

  var zoomBox = $('point-zoom');
  $('point-bar').hidden = false;
  zoomBox.addEventListener('click', function (e) {
    var step = Number(e.target.getAttribute('data-zoom'));
    if (!step) return;
    var before = zoom;
    zoom = Math.max(1, Math.min(4, zoom + step));
    if (zoom === before) return;
    // Keep the chosen spot in the middle, or else the middle of the part of the map on screen,
    // so a rough tap, +, and a second tap lands where you meant.
    var target = pick;
    if (!target) {
      var r = frame.getBoundingClientRect();
      var cx = (Math.max(r.left, 0) + Math.min(r.right, window.innerWidth)) / 2;
      var cy = (Math.max(r.top, 0) + Math.min(r.bottom, window.innerHeight)) / 2;
      target = toMap(cx, cy);
    }
    svg.style.width = zoom * 100 + '%';
    frame.classList.toggle('zoomed', zoom > 1);
    frame.scrollIntoView({ block: 'nearest' });
    var p = toScreen(target.x, target.y);
    var fr = frame.getBoundingClientRect();
    frame.scrollLeft += p.x - (fr.left + frame.clientWidth / 2);
    frame.scrollTop += p.y - (fr.top + frame.clientHeight / 2);
  });

  function toMap(x, y) {
    var pt = svg.createSVGPoint();
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  }

  function toScreen(x, y) {
    var pt = svg.createSVGPoint();
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(svg.getScreenCTM());
  }

  form.hidden = false;
  update();
})();
