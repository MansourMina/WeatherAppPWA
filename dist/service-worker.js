importScripts(
  '/precache-manifest.0546430ec264f16063cd5271e64b755d.js',
  'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js',
);

/* global workbox */
if (workbox) {
  console.log(`Workbox is loaded`);
  workbox.precaching.precacheAndRoute(self.__precacheManifest);
} else {
  console.log(`Workbox didn't load`);
}
