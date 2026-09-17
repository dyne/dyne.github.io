import assert from 'node:assert/strict';
import test from 'node:test';
import { loadPlanetDyneFeed, REMOTE_CONTENT_MAX_BYTES } from '../src/lib/remote-content.mjs';

const validFeed = `<?xml version="1.0"?><rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/"><channel><title>Planet Dyne</title><item><title> A post </title><link>https://news.dyne.org/post</link><dc:creator>Dyne</dc:creator><content:encoded>A short post.</content:encoded><media:content url="https://news.dyne.org/image.jpg" /></item></channel></rss>`;
const response = (body, init = {}) => new Response(body, { status: 200, headers: { 'content-type': 'application/xml', ...init.headers } });

test('uses and bounds valid remote feed fields', async () => {
	const feed = await loadPlanetDyneFeed({ fetchImpl: async () => response(validFeed) });
	assert.equal(feed.items.length, 1);
	assert.deepEqual(feed.items[0]['media:content'], { $: { url: 'https://news.dyne.org/image.jpg' } });
	assert.equal(feed.items[0].title, 'A post');
});

for (const [name, fetchImpl] of [
	['malformed response', async () => response('<rss><broken>')],
	['oversized response', async () => response('x', { headers: { 'content-length': String(REMOTE_CONTENT_MAX_BYTES + 1) } })],
	['timeout', async (_url, { signal }) => new Promise((_resolve, reject) => signal.addEventListener('abort', () => reject(signal.reason)))],
	['unavailable response', async () => response('unavailable', { status: 503 })],
]) {
	test(`falls back when the remote feed has a ${name}`, async () => {
		const feed = await loadPlanetDyneFeed({ fetchImpl, timeoutMs: 5 });
		assert.equal(feed.items[0].title, 'Planet Dyne');
	});
}
