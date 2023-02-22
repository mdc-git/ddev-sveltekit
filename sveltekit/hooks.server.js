/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    if (process.env.IS_DDEV_PROJECT === 'true' && event.url.host === 'node-srv') {
        event.url = new URL(event.url.href.replace('http://node-srv', process.env.DDEV_PRIMARY_URL))
    }
    const response = await resolve(event);
    console.log('src/hooks.server.js: ' + event.url.pathname + ' ' + response.status);
    return response;
}

