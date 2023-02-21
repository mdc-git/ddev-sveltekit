# ddev-sveltekit

## Run sveltekit with vite in dev mode behind nginx ssl proxy. 

This is for `@sveltejs/kit <= 1.0.0-next.525`. 

https://github.com/torenware/ddev-viteserve might fit your needs better if you are not using svelte.

**Note: This will not install if there is already a `src/hooks.server.[jt]s` file.**

You should review your `src/hooks.server.[jt]s` file and either remove it or you'd have to adjust all your files manually.

This exposes the debug port of vite on the container port 9229 aswell. To use it, run

`ddev exec NODE_OPTIONS=--inspect=0.0.0.0:9229 ./node_modules/.bin/vite dev` instead of `ddev yarn dev`.

## What does it do?

1. Overwrite `.ddev/nginx_full/nginx-site.conf` to proxy requests to `http://localhost:5173` and pass the adjusted origin.
2. Install a `src/hooks.server.js` to adjust the origin to `DDEV_PRIMARY_URL` on outgoing cors requests when using svelte's provided `fetch`.
3. Add this `src/hooks.server.js` to `.git/info/exclude`.
4. Install a `.ddev/docker-compose.network.yaml` to add additional known hosts in the network.
5. Install a `.ddev/docker-compose.debug.yaml` to expose the vite debugging port

## Sample Usage:

```
ddev config --auto --omit-containers=db,dba --nodejs-version=16 
mkcert -install
ddev get mdc-git/ddev-sveltekit
ddev exec NODE_OPTIONS=--inspect=0.0.0.0:9229 ./node_modules/.bin/vite dev
```

## Related bugs:

- https://github.com/sveltejs/kit/issues/8026
  
  see [nginx-site.conf](https://github.com/mdc-git/ddev-sveltekit/blob/master/nginx_full/nginx-site.conf#L35-L36): `proxy_set_header Origin http://node-srv;`
  
  this fixes `Cross-site POST form submissions are forbidden` on internal `/api` requests.
  
  
- https://github.com/sveltejs/kit/issues/6608 (see [hooks.server.js](https://github.com/mdc-git/ddev-sveltekit/blob/master/sveltekit/hooks.server.js))

  this essentially handles outgoing cors fetch requests in endpoints.
  
  it should override the outgoing requests origin (`event.url`) to `DDEV_PRIMARY_URL`
  
  this makes it _semantically consistent_ with the external servers `Access-Control-Allow-Origin`

- https://github.com/sveltejs/kit/issues/6589 
- https://github.com/sveltejs/kit/issues/6795
- https://github.com/sveltejs/kit/issues/7441
- https://github.com/sveltejs/kit/issues/6943
- https://github.com/sveltejs/kit/pull/6550
- https://github.com/sveltejs/kit/pull/6901

## Other resources:

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin#description
- https://stackoverflow.com/questions/42239643/when-do-browsers-send-the-origin-header-when-do-browsers-set-the-origin-to-null/42242802

## Debugging Notes:

- https://github.com/sveltejs/kit/issues/1144
- https://github.com/sveltejs/kit/issues/7781
