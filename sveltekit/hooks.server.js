/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {

    if (process.env.IS_DDEV_PROJECT === 'true' && event.url.host === 'node-srv') {
        event.url = new URL(event.url.href.replace('http://node-srv', process.env.DDEV_PRIMARY_URL))
    }
    let body = null;
    if (event.request.headers.get('Content-Type')?.includes('multipart/form-data')) {
        body = await event.request.clone().formData()
    } else if (event.request.headers.get('Content-Type')?.includes('application/json')) {
        body = await event.request.clone().json()
    } else {
        body = await event.request.clone().text()
    }
    const response = await resolve(event);
    console.debug('src/hooks.server.js: %o %o %o \n%o', event.request.method, event.url.pathname + event.url.search, response.status, Object.fromEntries(body));

    return response;
}
