# ddev-sveltekit

## Run sveltekit with vite in dev mode behind nginx ssl proxy. 

Note: This will not install if there is already a `src/hooks.server.js` file.

You should review your `src/hooks.server.js` file and either remove it or you'd have to adjust all your files manually.

Related bugs:

- https://github.com/sveltejs/kit/issues/8026
  
  see nginx-site.conf: `proxy_set_header Origin http://node-srv;`
  
  this fixes `Cross-site POST form submissions are forbidden` on internal `/api` requests.
  
  
- https://github.com/sveltejs/kit/issues/6608 (see hooks.server.js)

  this essentially handles outgoing cors fetch requests in endpoints.
  
  it should set the outgoing Origin to DDEV_PRIMARY_URL
  
  so that it is consistent with the servers Access-Control-Allow-Origin

- https://github.com/sveltejs/kit/issues/6589 
