const CACHE = 'infoblack-radio-v4';
const ASSETS = ['/', '/index.html', '/icon-192.png', '/icon-512.png',
  '/audio-1.mp3', '/audio-2.mp3', '/audio-3.mp3',
  '/audio-4.mp3', '/audio-5.mp3', '/audio-6.mp3',
  '/audio-7.mp3', '/audio-8.mp3', '/audio-9.mp3'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
