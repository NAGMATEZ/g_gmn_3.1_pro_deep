// service-worker.js
const CACHE_NAME = 'budget-static-v1';
const DYNAMIC_CACHE = 'budget-dynamic-v1';

const STATIC_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'
];

// Install Event - immediate static cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
});

// Activate Event - cleanup old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME && name !== DYNAMIC_CACHE)
                          .map(name => caches.delete(name))
            );
        })
    );
});

// Message Event - Update flow
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Fetch Event - Cache-first for local, Stale-while-revalidate / Network-first + cache for CDNs
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Cross-origin requests (CDNs: Dexie, Chart, Tesseract JS & WebAssembly files)
    if (url.origin !== location.origin) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                const fetchPromise = fetch(event.request).then((networkResponse) => {
                    // Only cache successful responses
                    if (networkResponse && networkResponse.status === 200) {
                        const responseToCache = networkResponse.clone();
                        caches.open(DYNAMIC_CACHE).then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    }
                    return networkResponse;
                }).catch(() => cachedResponse); // fallback to cache if offline

                // Return cached instantly if available, otherwise fetch
                return cachedResponse || fetchPromise;
            })
        );
    } 
    // Local assets (Cache-first)
    else {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) return cachedResponse;
                return fetch(event.request).then((networkResponse) => {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                    return networkResponse;
                });
            })
        );
    }
});
