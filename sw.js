var CACHE_NAME = 'sispak-cache-v1';
var urlsToCache = [
	'/sistem-pakar/',
	'/sistem-pakar/assets/css/animated.css',
	'/sistem-pakar/assets/css/bootstrap.min.css',
	'/sistem-pakar/assets/css/bootstrap-vue.css',
	'/sistem-pakar/assets/js/script.js',
	'/sistem-pakar/assets/js/vue.js',
	'/sistem-pakar/assets/js/jquery.min.js',
	'/sistem-pakar/assets/js/popper.min.js',
	'/sistem-pakar/assets/js/polyfill.min.js',
	'/sistem-pakar/assets/js/bootstrap.min.js',
	'/sistem-pakar/assets/js/bootstrap-vue.js',
	'/sistem-pakar/assets/js/sweetalert.min.js',
	'https://use.fontawesome.com/releases/v5.1.1/css/all.css',
	'/sistem-pakar/assets/img/ai.png'
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