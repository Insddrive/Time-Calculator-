const CACHE_NAME = 'time-calculator-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo.png'
];

// ਇੰਸਟਾਲੇਸ਼ਨ ਦੌਰਾਨ ਫਾਈਲਾਂ ਸੇਵ ਕਰੋ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// ਪੁਰਾਣੇ ਕੈਸ਼ ਨੂੰ ਹਟਾਓ
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});

// ਆਫਲਾਈਨ ਕੰਮ ਕਰਨ ਲਈ ਫੈਚ ਲੋਜਿਕ
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // ਜੇ ਕੈਸ਼ ਵਿੱਚ ਹੈ ਤਾਂ ਉਹ ਦਿਓ, ਨਹੀਂ ਤਾਂ ਨੈੱਟਵਰਕ ਤੋਂ ਲਓ
        return cachedResponse || fetch(event.request);
      })
  );
});
