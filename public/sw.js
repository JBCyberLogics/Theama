const CACHE_NAME = 'theama-v1'
const STATIC_CACHE = 'theama-static-v1'
const IMAGE_CACHE = 'theama-images-v1'

const STATIC_ASSETS = [
  '/',
  '/browse',
  '/search',
  '/genres',
  '/manifest.json',
]

const IMAGE_HOSTS = ['image.tmdb.org']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('theama-') && name !== CACHE_NAME && name !== STATIC_CACHE && name !== IMAGE_CACHE)
          .map((name) => caches.delete(name))
      )
    })
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  if (request.method !== 'GET') return

  if (request.destination === 'image' || IMAGE_HOSTS.some((host) => url.hostname.includes(host))) {
    event.respondWith(imageStrategy(request))
    return
  }

  if (request.destination === 'document' || request.destination === 'style' || request.destination === 'script' || request.destination === 'font') {
    event.respondWith(staticStrategy(request))
    return
  }

  if (url.pathname.startsWith('/api/')) {
    event.respondWith(apiStrategy(request))
    return
  }

  event.respondWith(staticStrategy(request))
})

function staticStrategy(request) {
  return caches.match(request).then((cached) => {
    if (cached) return cached
    return fetch(request).then((response) => {
      if (response.ok) {
        const clone = response.clone()
        caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone))
      }
      return response
    })
  })
}

function imageStrategy(request) {
  return caches.open(IMAGE_CACHE).then((cache) => {
    return cache.match(request).then((cached) => {
      if (cached) return cached
      return fetch(request).then((response) => {
        if (response.ok) {
          cache.put(request, response.clone())
        }
        return response
      })
    })
  })
}

function apiStrategy(request) {
  return caches.open(CACHE_NAME).then((cache) => {
    return fetch(request)
      .then((response) => {
        if (response.ok) {
          cache.put(request, response.clone())
        }
        return response
      })
      .catch(() => {
        return cache.match(request).then((cached) => {
          if (cached) return cached
          return new Response(
            JSON.stringify({ error: 'You are offline. Some features may be unavailable.' }),
            { status: 503, headers: { 'Content-Type': 'application/json' } }
          )
        })
      })
  })
}
