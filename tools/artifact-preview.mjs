// Copies a built site into a folder that can be published as a claude.ai Artifact,
// so the site can be viewed before Cloudflare hosting exists.
//
//   npm run build:preview
//   node tools/artifact-preview.mjs dist <out-dir>
//
// Artifact hosting does not resolve "dir/" to "dir/index.html", and fonts are only
// reliable as data URIs, so links get an explicit index.html and fonts are inlined
// into the stylesheet. The root page is replaced by a fragment without <html>/<head>,
// because the Artifact tool wraps the main page in its own skeleton.
// Prints the `files` map to pass to the Artifact tool, with `root` set to <out-dir>.
import fs from 'node:fs';
import path from 'node:path';

const [src, out] = process.argv.slice(2);
if (!src || !out) {
  console.error('Usage: node tools/artifact-preview.mjs <built-site-dir> <out-dir>');
  process.exit(1);
}

fs.rmSync(out, { recursive: true, force: true });
fs.cpSync(src, out, { recursive: true });
for (const f of ['_headers', 'robots.txt', '404.html']) fs.rmSync(path.join(out, f), { force: true });

const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));

let css = null;
for (const f of walk(out)) {
  if (f.endsWith('.html')) {
    let s = fs.readFileSync(f, 'utf8');
    s = s.replace(/<link rel="preload"[^>]*as="font"[^>]*>\n?/g, '');
    s = s.replace(/href="([^":#?]*\/)"/g, 'href="$1index.html"');
    s = s.replace(/"([^":#?"]*\{lang\}[^":#?"]*\/)"\.replace/g, '"$1index.html".replace');
    fs.writeFileSync(f, s);
  } else if (f.endsWith('.css')) {
    let s = fs.readFileSync(f, 'utf8');
    s = s.replace(/url\(["']?([^)"']+\.woff2)["']?\)/g, (m, u) => {
      const data = fs.readFileSync(path.resolve(path.dirname(f), u)).toString('base64');
      return `url(data:font/woff2;base64,${data})`;
    });
    fs.writeFileSync(f, s);
    css = path.relative(out, f).split(path.sep).join('/');
  }
}
for (const f of walk(out)) if (f.endsWith('.woff2')) fs.rmSync(f);

const languages = JSON.parse(fs.readFileSync('site.config.json', 'utf8')).languages;
const first = languages[0];
fs.writeFileSync(
  path.join(out, 'index.html'),
  `<title>Ärteråsens fäbod</title>
<meta name="robots" content="noindex">
${css ? `<link rel="stylesheet" href="${css}">\n` : ''}<script>(function(){var L=${JSON.stringify(languages)},p=null;
try{p=localStorage.getItem("lang")}catch(e){}
if(L.indexOf(p)<0)p=${JSON.stringify(first)};
location.replace(p+"/index.html")})();</script>
<main id="main" class="entry">
<ul class="entry-langs" role="list">${languages.map((l) => `<li><a href="${l}/index.html" lang="${l}">${l}</a></li>`).join('')}</ul>
</main>
`,
);

const files = {};
for (const f of walk(out).sort()) {
  const rel = path.relative(out, f).split(path.sep).join('/');
  if (rel !== 'index.html') files[rel] = rel;
}
console.log(JSON.stringify(files));
