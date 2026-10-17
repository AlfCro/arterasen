// npm run dev: builds a preview (drafts visible) and serves it on http://localhost:8080.
// Rebuilds when content, docs or source change. Reload the browser to see changes.
//
// To scan the QR codes with a phone on the same network:
//   SITE_URL=http://<din-dators-ip>:8080/ npm run dev

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { ROOT } from './content.mjs';
import { build } from './build.mjs';

const PORT = Number(process.env.PORT || 8080);
const OUT = path.join(ROOT, 'dist');
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.txt': 'text/plain; charset=utf-8',
};

async function rebuild() {
  try {
    await build({ preview: true, outDir: OUT });
  } catch (e) {
    console.error(e.message);
  }
}

await rebuild();

let timer;
for (const dir of ['content', 'docs', 'src']) {
  fs.watch(path.join(ROOT, dir), { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(rebuild, 150);
  });
}
fs.watch(path.join(ROOT, 'site.config.json'), () => {
  clearTimeout(timer);
  timer = setTimeout(rebuild, 150);
});

http
  .createServer((req, res) => {
    const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = path.join(OUT, url);
    if (!file.startsWith(OUT)) return res.writeHead(403).end();
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      if (!url.endsWith('/')) return res.writeHead(301, { Location: url + '/' }).end();
      file = path.join(file, 'index.html');
    }
    if (!fs.existsSync(file)) {
      res.writeHead(404, { 'Content-Type': TYPES['.html'] });
      return res.end(fs.existsSync(path.join(OUT, '404.html')) ? fs.readFileSync(path.join(OUT, '404.html')) : 'Not found');
    }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, '0.0.0.0', () => {
    const ips = Object.values(os.networkInterfaces())
      .flat()
      .filter((i) => i && i.family === 'IPv4' && !i.internal)
      .map((i) => `http://${i.address}:${PORT}/`);
    console.log(`\nFörhandsvisning: http://localhost:${PORT}/  ${ips.length ? `(i nätverket: ${ips.join(', ')})` : ''}`);
    console.log(`Interna sidor:   http://localhost:${PORT}/intern/`);
    console.log(`Skyltar:         http://localhost:${PORT}/skyltar/\n`);
  });
