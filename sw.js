const C='najwa-v24',F=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./maskable-192.png','./maskable-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(n=>{const k=n.clone();if(n.ok)caches.open(C).then(c=>c.put(e.request,k));return n}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
});
