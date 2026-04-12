// ═══════════════════════════════════════════════════════════
//  YORIX CM — Service Worker PWA
//  Version : 2.0 — Cache stratégique + offline
// ═══════════════════════════════════════════════════════════

const CACHE_NAME = 'yorix-v2';
const OFFLINE_URL = '/';

// Fichiers à mettre en cache immédiatement
const PRECACHE = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/favicon-32.png',
  '/apple-touch-icon.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// ── INSTALL : précacher les ressources essentielles ──
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE);
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE : supprimer les anciens caches ──
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH : stratégie Network-first avec fallback cache ──
self.addEventListener('fetch', (event) => {
  // Ignorer les requêtes non-GET et les APIs externes
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Ignorer Supabase, Cloudinary, Google Analytics
  if (
    url.hostname.includes('supabase.co') ||
    url.hostname.includes('cloudinary.com') ||
    url.hostname.includes('googletagmanager.com') ||
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('wa.me') ||
      url.hostname.includes('tawk.to') ||
      url.hostname.includes('embed.tawk.to')
  ) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Mettre en cache la réponse fraîche
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => {
        // Hors-ligne : servir depuis le cache
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;
          // Page de fallback pour navigation
          if (event.request.mode === 'navigate') {
            return caches.match(OFFLINE_URL);
          }
        });
      })
  );
});
