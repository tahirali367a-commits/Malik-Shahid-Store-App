const CACHE_NAME = 'msw-dryfruit-v3';
const assetsToCache = [
    'index.html',
    'style.css',
    'app.js',
    'manifest.json',
    'home-icon.svg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(assetsToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
