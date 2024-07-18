// const IMAGE_CDN = "https://images.mattwhitaker.name";
const IMAGE_CDN = "http://localhost:8081";
const VERSION = "v1";
const CACHE_NAME = "prototyping-worker";

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const manifestUrl = `/manifest/${new URL(location).searchParams.get("manifest")}`;
    const cache = await caches.open("prototyping-worker");

    try {
      const { files } = await (await fetch(manifestUrl)).json();
      console.log(files.map(f => `${IMAGE_CDN}/${f}`));
      // event.waitUntil(cache.addAll(files.map(f => `${IMAGE_CDN}/${f}`)));
    } catch(error) {
      console.error(error);
    }
  })());
});

// self.addEventListener("fetch", (event) => {
//
// });