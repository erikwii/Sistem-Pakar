var CACHE_NAME = 'sispak-cache-v1';
var urlsToCache = [
	'/sispakv2/',
	'/sispakv2/assets/css/animated.css',
	'/sispakv2/assets/css/bootstrap.min.css',
	'/sispakv2/assets/css/bootstrap-vue.css',
	'/sispakv2/assets/js/script.js',
	'/sispakv2/assets/js/vue.js',
	'/sispakv2/assets/js/jquery.min.js',
	'/sispakv2/assets/js/popper.min.js',
	'/sispakv2/assets/js/polyfill.min.js',
	'/sispakv2/assets/js/bootstrap.min.js',
	'/sispakv2/assets/js/bootstrap-vue.js',
	'https://use.fontawesome.com/releases/v5.1.1/css/all.css',
	'/sispakv2/assets/img/ai.png'
];

// Install serviceWorker
self.addEventListener('install', function (event) {
	// Perform install steps
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache){
			console.log('Opened cache');
			urlsToCache.forEach(function (url) {
				cache.add(url).catch(/*optional error handling/logging*/);
			});
		})
	);
});

// Fetch serviceWorker
self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			// cache hit -- return response
			if (response) {
				return response;
			}

			return fetch(event.request);
		})
	);
});

// Activate serviceWorker
self.addEventListener('activete', function (event) {
	event.waitUntill(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.filter(function (cacheName) {
					return cacheName != CACHE_NAME;
				}).map(function (cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});