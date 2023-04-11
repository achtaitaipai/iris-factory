const urlsToCache = [
	'/iris-factory/',
	'/iris-factory/index.js',
	'/iris-factory/dragDropTouch.js',
	'/iris-factory/index.css',
]

const cacheName = 'iris-factory-0'

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(cacheName).then((cache) => {
			return cache.addAll(urlsToCache)
		})
	)
})

self.addEventListener('activate', (e) => {
	e.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(
				keyList.map((key) => {
					if (key === cacheName) {
						return
					}
					return caches.delete(key)
				})
			)
		})
	)
})

self.addEventListener('fetch', (event) => {
	event.respondWith(
		fetch(event.request).catch((error) => {
			return caches.match(event.request.replace(/\?.+/, ''))
		})
	)
})
