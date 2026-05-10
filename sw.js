// ═══════════════════════════════════════════════════════════
//  YORIX CM — Service Worker PWA + PUSH NOTIFICATIONS
//  Version : 3.0 — Cache stratégique + offline + push
// ═══════════════════════════════════════════════════════════
const CACHE_NAME = 'yorix-v3';
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

// ═══════════════════════════════════════════════════════════
// ── INSTALL : précacher les ressources essentielles ──
// ═══════════════════════════════════════════════════════════
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE);
    }).then(() => self.skipWaiting())
  );
});

// ═══════════════════════════════════════════════════════════
// ── ACTIVATE : supprimer les anciens caches ──
// ═══════════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════════
// ── FETCH : stratégie Network-first avec fallback cache ──
// ═══════════════════════════════════════════════════════════
self.addEventListener('fetch', (event) => {
  // Ignorer les requêtes non-GET et les APIs externes
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Ignorer Supabase, Cloudinary, Google Analytics, tawk, etc.
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

// ═══════════════════════════════════════════════════════════
// ── PUSH : réception d'une notification depuis le serveur ──
// ═══════════════════════════════════════════════════════════
self.addEventListener('push', (event) => {
  console.log('[SW Yorix] Push reçu');

  // Parser les données envoyées par le serveur
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (err) {
    console.warn('[SW Yorix] Push data non JSON :', err);
    data = { title: 'Yorix CM', body: event.data ? event.data.text() : 'Nouvelle notification' };
  }

  const title = data.title || 'Yorix CM 🇨🇲';
  const options = {
    body: data.body || 'Vous avez une nouvelle notification',
    icon: data.icon || '/icons/icon-192.png',
    badge: data.badge || '/icons/icon-192.png',
    image: data.image || undefined,
    tag: data.tag || 'yorix-notif',          // Regroupe les notifs du même type
    renotify: data.renotify !== false,        // Vibre même si remplacement
    requireInteraction: data.requireInteraction || false,
    vibrate: data.vibrate || [200, 100, 200],
    silent: false,
    data: {
      url: data.url || '/',
      notificationId: data.notificationId || null,
      type: data.type || 'generic',
      ...data.data,
    },
    actions: data.actions || [],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// ═══════════════════════════════════════════════════════════
// ── NOTIFICATION CLICK : clic sur la notification ──
// ═══════════════════════════════════════════════════════════
self.addEventListener('notificationclick', (event) => {
  console.log('[SW Yorix] Clic sur notification');
  event.notification.close();

  const targetUrl = event.notification.data?.url || '/';
  const absoluteUrl = new URL(targetUrl, self.location.origin).href;

  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientsArr) => {
        // Si un onglet Yorix est déjà ouvert, on le met en avant
        for (const client of clientsArr) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            client.navigate(absoluteUrl);
            return client.focus();
          }
        }
        // Sinon, on ouvre un nouvel onglet
        if (self.clients.openWindow) {
          return self.clients.openWindow(absoluteUrl);
        }
      })
  );
});

// ═══════════════════════════════════════════════════════════
// ── NOTIFICATION CLOSE : fermeture sans clic (pour stats) ──
// ═══════════════════════════════════════════════════════════
self.addEventListener('notificationclose', (event) => {
  console.log('[SW Yorix] Notification fermée sans clic');
});

// ═══════════════════════════════════════════════════════════
// ── PUSH SUBSCRIPTION CHANGE : renouvellement d'abonnement ──
// ═══════════════════════════════════════════════════════════
self.addEventListener('pushsubscriptionchange', (event) => {
  console.log('[SW Yorix] Changement d\'abonnement push');
  // La réinscription sera faite côté client au prochain chargement
});
