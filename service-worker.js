importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/nav.html', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/daftar.html', revision: '1' },
    { url: '/pages/fav.html', revision: '1' },
    { url: '/pages/contact.html', revision: '1' },
    { url: '/style/materialize.min.css', revision: '1' },
    { url: '/style/animate.css', revision: '1' },
    { url: '/style/media.css', revision: '1' },
    { url: '/style/style.css', revision: '1' },
    { url: '/javascript/materialize.min.js', revision: '1' },
    { url: '/javascript/nav.js', revision: '1' },
    { url: '/javascript/all.js', revision: '1' },
    { url: '/javascript/notifications.js', revision: '1' },
    { url: '/javascript/api.js', revision: '1' },
    { url: '/javascript/idb.js', revision: '1' },
    { url: '/javascript/db.js', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/assets/interface/soccer-ball.png', revision: '1' },
    { url: '/assets/interface/background3.png', revision: '1' },
]);
 
workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'register'
    })
);

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