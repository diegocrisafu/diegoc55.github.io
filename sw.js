const PRECACHE = 'static-v11';
const CORE = [
  './',
  './index.html',
  './style.css',
  './favicon.svg',
  './manifest.webmanifest',
  './assistant.js',
  './social-card.svg'
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(PRECACHE);
    await cache.addAll(CORE);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => k !== PRECACHE ? caches.delete(k) : null));
    await self.clients.claim();
  })());
});

// Navigation: cache-first fallback to cached shell when offline
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // ignore cross-origin

  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try { return await fetch(req); } catch {
        const cache = await caches.open(PRECACHE);
        return (await cache.match('./index.html')) || Response.error();
      }
    })());
    return;
  }

  if (req.destination === 'style' || req.destination === 'script' || req.destination === 'image') {
    event.respondWith((async () => {
      const cache = await caches.open(PRECACHE);
      const cached = await cache.match(req);
      const fetchAndPut = fetch(req).then(res => { if (res.ok) cache.put(req, res.clone()); return res; }).catch(() => null);
      return cached || fetchAndPut || fetch(req);
    })());
  }
});
