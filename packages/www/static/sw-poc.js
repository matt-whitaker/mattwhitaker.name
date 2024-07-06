const CACHE_NAME = "mattwhitaker.name";
self.addEventListener("install", event => {
  const urlsToCache = [
    "/",
    "/resume.html",

    "/style/main.css",
    "/style/resume.css",

    "/image/headshot.jpg",
    "/image/b-roll.jpg",
    "/image/cubes.png",
    "/image/icon-192x192.jpg",
    "/image/icon-512x512.jpg"
  ];

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => {
        if (cacheWhitelist.indexOf(cacheName) === -1) {
          return caches.delete(cacheName);
        }
      })
    )));
});

// self.addEventListener("fetch", (event) => {
//     event.respondWith(
//         caches.match(event.request).then((response) => {
//             if (response) {
//                 return response;
//             }
//             return fetch(event.request);
//         })
//     );
// });
