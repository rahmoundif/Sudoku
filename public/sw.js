const CACHE_NAME = "dr-sudoku-v1";
const urlsToCache = [
	"/",
	"/index.html",
	"/src/App.css",
	"/manifest.webmanifest",
];

// Install event - cache essential files
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => cache.addAll(urlsToCache))
			.then(() => self.skipWaiting()), // Activate immediately
	);
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) => {
				return Promise.all(
					cacheNames.map((cacheName) => {
						if (cacheName !== CACHE_NAME) {
							return caches.delete(cacheName);
						}
						return Promise.resolve();
					}),
				);
			})
			.then(() => self.clients.claim()), // Take control immediately
	);
});

// Fetch event - network first, fallback to cache
self.addEventListener("fetch", (event) => {
	event.respondWith(
		fetch(event.request)
			.then((response) => {
				// Clone the response and cache it
				const responseToCache = response.clone();
				caches.open(CACHE_NAME).then((cache) => {
					cache.put(event.request, responseToCache);
				});
				return response;
			})
			.catch(() => {
				// If network fails, try cache
				return caches.match(event.request);
			}),
	);
});

// Listen for messages to skip waiting
self.addEventListener("message", (event) => {
	if (event.data && event.data.type === "SKIP_WAITING") {
		self.skipWaiting();
	}
});
