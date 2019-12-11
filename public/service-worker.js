const CACHE_NAME = "pwav3";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/daftar.html",
  "/pages/fav.html",
  "/pages/contact.html",
  "/style/materialize.min.css",
  "/style/animate.css",
  "/style/media.css",
  "/style/style.css",
  "/javascript/materialize.min.js",
  '/javascript/nav.js',
  '/javascript/all.js',
  '/javascript/notifications.js',
  '/javascript/api.js',
  '/javascript/idb.js',
  '/javascript/db.js',
  '/manifest.json',
  '/assets/interface/soccer-ball.png',
  '/assets/interface/background3.png',
];
 
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(urlsToCache);
      })
  );
})

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
})

self.addEventListener("fetch", function (event) {
  if (event.request.url.includes("football-data.org")) {
    event.respondWith(async function () {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) return cachedResponse;
      const networkResponse = await fetch(event.request);
      event.waitUntil(
        cache.put(event.request, networkResponse.clone())
      );
      return networkResponse;
    }());
  } else {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
      })
    )
  }
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: '/assets/interface/soccer-ball.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});