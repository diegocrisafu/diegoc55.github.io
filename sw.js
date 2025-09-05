self.addEventListener('install', (e) => {
  self.skipWaiting();
});
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});
// Simple runtime cache for same-origin navigations and CSS/JS
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (url.origin === location.origin && (req.mode === 'navigate' || req.destination === 'style' || req.destination === 'script')) {
    event.respondWith((async () => {
      try { return await fetch(req); } catch (err) {
        // Offline fallback: return cached root if available
        const cache = await caches.open('static-v1');
        const cached = await cache.match('/');
        if (cached) return cached;
        throw err;
      }
    })());
  }
});
