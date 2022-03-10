importScripts("/precache-manifest.86122db57a2ab188a1bebbdb10c2c23a.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/* global workbox */
if (workbox) {
  console.log(`Workbox is loaded`);
  workbox.setConfig({ debug: true });
  workbox.precaching.precacheAndRoute(self.__precacheManifest);
  workbox.routing.registerRoute(
    new RegExp('/img/icons/.*.png'),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'atams-image-cache',
    }),
  );
} else {
  console.log(`Workbox didn't load`);
}

