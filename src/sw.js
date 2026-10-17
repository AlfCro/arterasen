// Service worker. Mobile coverage on the fäbod can be weak, so every page is cached
// on the first visit. Pages: network first, cache if the network is slow or gone.
// Everything else: cache first. The build fills in the cache name and the page list.

const CACHE = '__CACHE__';
const PRECACHE = __PRECACHE__;
const SLOW_MS = 3500;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('arterasen-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  if (url.pathname.includes('/intern/') || url.pathname.includes('/skyltar/')) return;
  event.respondWith(req.mode === 'navigate' ? page(req) : asset(req));
});

async function page(req) {
  const cache = await caches.open(CACHE);
  const network = fetch(req).then((res) => {
    if (res.ok) cache.put(req, res.clone());
    return res;
  });
  const slow = new Promise((resolve) => setTimeout(resolve, SLOW_MS, 'slow'));
  try {
    const first = await Promise.race([network, slow]);
    if (first !== 'slow') return first;
    const cached = await cache.match(req, { ignoreSearch: true });
    return cached || (await network);
  } catch (_) {
    const cached = await cache.match(req, { ignoreSearch: true });
    if (cached) return cached;
    return (await cache.match('./')) || Response.error();
  }
}

async function asset(req) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(req);
  if (cached) return cached;
  const res = await fetch(req);
  if (res.ok) cache.put(req, res.clone());
  return res;
}
