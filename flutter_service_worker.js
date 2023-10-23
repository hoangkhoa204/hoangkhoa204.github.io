'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "076d9b3b5ec137403ef0c541c7f6f95c",
"assets/AssetManifest.json": "8fdd02e4b1577de854660a74f2e2c327",
"assets/assets/adv_cumrisk_allposs_combination_2022_02_06.csv": "0233741dec8b97b6071c7dbd5395de33",
"assets/assets/adv_model.db": "fc4795e15789a159e4440774b8f39ab3",
"assets/assets/documents/Homepage.pdf": "ac784496a72a28ffd73b060058ead643",
"assets/assets/documents/test.pdf": "c7c67fa9539adc0778e30ad77118eafd",
"assets/assets/documents/userManual.pdf": "71755a5e7c401195aa132f0164f2d096",
"assets/assets/fonts/OpenSans-Regular.ttf": "3ed9575dcc488c3e3a5bd66620bdf5a4",
"assets/assets/fonts/Whisper-Regular.ttf": "31ff5ec762769cc295fca678de23a35c",
"assets/assets/images/BCSC-logo-background-removed.png": "a772b7f73f69f0e5fc0824c86c1d4957",
"assets/assets/images/BCSC-logo.jpg": "e06427cdd7a243675422c3d0e6659cc0",
"assets/assets/images/BCSC-logo_transparent_icon_only.png": "f9852f81740335ef1278770efc3b9839",
"assets/assets/images/breastcancer.png": "1561fe12a7a48a0b32dd137cda36d1d2",
"assets/assets/images/doctor-svgrepo-com.svg": "762b8f74eaeb92be79788f6b25017e00",
"assets/assets/images/formula.png": "d30533ce0624941d39951ba3b2f39bc8",
"assets/assets/images/googlePlay.png": "21a3ef42c43e9abc5c8a855c9e49a8a7",
"assets/assets/images/hierarchy-people-team-svgrepo-com.svg": "adaac633d87266679a05195f319e81f0",
"assets/assets/images/history-svgrepo-com.svg": "8b6a0034361613100c8f515de86c188c",
"assets/assets/images/hospital.svg": "cd8ce1eb5dbd1e840037297661404d79",
"assets/assets/images/iosStore.png": "4cd4b8556ff39db78b7cf78c7e635fc1",
"assets/assets/images/man-svgrepo-com.svg": "0308d638627ab579257f05ce606eb146",
"assets/assets/images/medical-history-doctor-svgrepo-com.svg": "c48d5d1942b12f277f5064546cafc18b",
"assets/assets/images/medical.svg": "d4bbd35a29eaace08951f5ecbad96829",
"assets/assets/images/microscope.svg": "9859a53ac945e8bf42547c02d2fcf1a1",
"assets/assets/images/people-svgrepo-com.svg": "e62f38cf77029d5d3a2dff38c18bdca4",
"assets/assets/images/person.svg": "57ffdef56ac0a7bbfa693f9e28f50027",
"assets/assets/images/scale-weight-svgrepo-com.svg": "a19e8c1b4b74da38ff5847c4b7200057",
"assets/assets/images/user-woman-svgrepo-com.svg": "ce6b8f25abfa0241521c2eaa57b9a5a9",
"assets/assets/images/xray.svg": "30fbcb2f542158d79d092cfad7fb2200",
"assets/BCSC-logo_transparent_icon_only.png": "f9852f81740335ef1278770efc3b9839",
"assets/FontManifest.json": "9dc452e6267f5de2fd6572e0e4afb3ad",
"assets/fonts/MaterialIcons-Regular.otf": "200254922dccc17a0495d3b9662153e2",
"assets/NOTICES": "8f701b43d20be8d03e5ef2ff23c42478",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"favicon.ico": "6057627738575633edae0ee5bd0a6f34",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "635983946157ba322d8ee7d16d142170",
"/": "635983946157ba322d8ee7d16d142170",
"main.dart.js": "3da3c37d037f98cfaf26e166f053dc71",
"manifest.json": "09e408e9ba28d8afa9b7f36898249ad7",
"version.json": "a47e180c6ea035114d1d8f8cca00d414"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
