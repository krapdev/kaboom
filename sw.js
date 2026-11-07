// Service worker de Kaboom
// - le jeu (page, icônes) : réseau d'abord, cache en secours → on a toujours la dernière version quand on est en ligne
// - polices Google et bibliothèque PeerJS : cache d'abord (elles ne changent pas)
// Le multijoueur a besoin d'internet : hors ligne, seuls le menu et le « Comment jouer » s'affichent.
const VERSION = 'kaboom-v125';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const lib = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname) || url.hostname === 'unpkg.com';
  if (lib) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res;
    })));
    return;
  }
  if (url.origin !== self.location.origin) return;     // serveurs de connexion (PeerJS, relais) : jamais en cache
  e.respondWith(fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match(req).then(hit => hit || caches.match('./index.html'))));
});
