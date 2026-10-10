const CACHE = 'portfolio-20261008-connected-experience-07';
const CORE = [
  './',
  './index.html',
  './style.css?v=20261008-connected-experience-07',
  './behavior.js?v=20261008-connected-experience-07',
  './images/scenebreaker.webp',
  './assets/fonts/uncut/UncutSans-Variable.woff2',
  './images/roomfit.jpg',
  './images/crowdflow.jpg',
  './Diego_Resume.pdf?v=20261007',
  './favicon.svg',
  './manifest.webmanifest',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await cache.addAll(CORE);
      await self.skipWaiting();
    })()
  );
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter(
            (key) => key !== CACHE && (key.startsWith('static-v') || key.startsWith('portfolio-'))
          )
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE);
        try {
          const response = await fetch(request);
          if (response.ok) await cache.put(request, response.clone());
          return response;
        } catch (_) {
          const exact = await cache.match(request);
          if (exact) return exact;
          const index = new URL('./index.html', self.registration.scope);
          if (url.pathname === index.pathname || url.pathname === new URL('./', index).pathname) {
            return (await cache.match('./index.html')) || Response.error();
          }
          return Response.error();
        }
      })()
    );
    return;
  }
  if (['style', 'script', 'image', 'font'].includes(request.destination)) {
    const refresh = (async () => {
      const response = await fetch(request);
      if (response.ok) {
        const cache = await caches.open(CACHE);
        await cache.put(request, response.clone());
      }
      return response;
    })();
    event.waitUntil(
      refresh.then(
        () => {},
        () => {}
      )
    );
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE);
        const cached = await cache.match(request);
        if (cached) return cached;
        try {
          return await refresh;
        } catch (_) {
          return Response.error();
        }
      })()
    );
  }
});
