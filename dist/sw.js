/* Yorix CM — Service worker (shell + push). Le build copie depuis public/. */
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  let payload = { title: "Yorix", body: "Nouvelle alerte sur votre marketplace.", url: "/", tag: "yorix" };
  try {
    if (event.data) {
      if (typeof event.data.json === "function") {
        Object.assign(payload, event.data.json());
      } else if (typeof event.data.text === "function") {
        const txt = event.data.text();
        if (txt) Object.assign(payload, JSON.parse(txt));
      }
    }
  } catch {
    /* garder défaut */
  }

  const title = payload.title || "Yorix CM";
  const body = payload.body || "Ouvrir pour voir votre activité.";
  const url = payload.url || "/";
  const tag = payload.tag || "yorix-generic";

  event.waitUntil(
    self.registration.showNotification(title, {
      body: String(body).slice(0, 240),
      icon: payload.icon || "/favicon.svg",
      badge: payload.badge || "/favicon.svg",
      tag,
      vibrate: [100, 50, 100],
      renotify: true,
      requireInteraction: payload.priority === "critical",
      data: { url, tag },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        try {
          client.postMessage({ type: "NOTIF_NAV", url });
          return client.focus();
        } catch {
          /* continue */
        }
      }
      if (self.clients.openWindow) {
        const abs = url.startsWith("http") ? url : `${self.location.origin}${url.startsWith("/") ? url : `/${url}`}`;
        return self.clients.openWindow(abs);
      }
    }),
  );
});
