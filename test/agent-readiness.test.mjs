import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('publishes a valid OpenAPI 3.1 document for the real NIP-05 endpoint', async () => {
	const source = JSON.parse(await read('public/openapi.json'));
	const built = JSON.parse(await read('dist/openapi.json'));

	assert.deepEqual(built, source);
	assert.equal(source.openapi, '3.1.0');
	assert.equal(source.servers[0].url, 'https://dyne.org');
	assert.ok(source.paths['/.well-known/nostr.json']?.get);
	assert.equal(
		source.paths['/.well-known/nostr.json'].get.responses['200'].content['application/json'].schema.$ref,
		'#/components/schemas/Nip05Document'
	);
	assert.equal(source.components.schemas.Nip05Document.required[0], 'names');
});

test('the generated 404 keeps recovery links visible to non-JavaScript agents', async () => {
	const html = await read('dist/404.html');

	assert.match(html, /<h1[^>]*>Oooops, the page you are looking for does not exist!<\/h1>/);
	assert.match(html, /aria-label="Page-not-found recovery"/);
	for (const href of ['/', '/software/', '/sitemap-index.xml', '/llms.txt', '/404.md']) {
		assert.match(html, new RegExp(`href="${href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`));
	}
	assert.match(html, /rel="alternate" type="text\/markdown" href="\/404\.md"/);
});

test('publishes concise Markdown recovery help with agent discovery links', async () => {
	const markdown = await read('dist/404.md');

	assert.match(markdown, /^# Page not found/m);
	assert.match(markdown, /https:\/\/dyne\.org\/sitemap-index\.xml/);
	assert.match(markdown, /https:\/\/dyne\.org\/llms\.txt/);
	assert.match(markdown, /https:\/\/dyne\.org\/software\//);
});

test('advertises machine-readable resources to agents', async () => {
	const html = await read('dist/index.html');
	const guide = await read('dist/llms.txt');

	assert.match(html, /rel="alternate" type="text\/plain" href="\/llms\.txt"/);
	assert.match(html, /rel="service-desc" type="application\/json" href="\/openapi\.json"/);
	for (const url of [
		'https://dyne.org/openapi.json',
		'https://dyne.org/sitemap-index.xml',
		'https://dyne.org/.well-known/nostr.json',
		'https://dyne.org/404.md',
	]) {
		assert.match(guide, new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
	}
});
