importScripts("/precache-manifest.d8b45159d191ad0ee3cdaae6ecc5c4bd.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/* global workbox */
if (workbox) {
  console.log(`Workbox is loaded`);
  workbox.precaching.precacheAndRoute(self.__precacheManifest);
} else {
  console.log(`Workbox didn't load`);
}

