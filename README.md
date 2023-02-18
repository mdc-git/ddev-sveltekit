# ddev-sveltekit

Run sveltekit with vite in dev mode behind nginx ssl proxy. 

Related bugs:

- https://github.com/sveltejs/kit/issues/8026
  
  see nginx-site.conf: `proxy_set_header Origin http://node-srv;`
  
  this fixes Cross-site POST form submissions are forbidden to internal `/api` requests.
  
  
- https://github.com/sveltejs/kit/issues/6608 (see hooks.server.js)

  this essentially handles outgoing cors fetch requests in endpoints.
  
  it should set the outgoing Origin to DDEV_PRIMARY_URL
  
  so that it is consistent with the servers Access-Control-Allow-Origin

- https://github.com/sveltejs/kit/issues/6589 
