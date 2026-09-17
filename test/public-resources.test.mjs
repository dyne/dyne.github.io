import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../dist${path}`, import.meta.url), 'utf8');

test('publishes the public machine-readable discovery resources', async () => {
	const [openapi, nip05, guide, recovery, sitemap] = await Promise.all([
		read('/openapi.json'),
		read('/.well-known/nostr.json'),
		read('/llms.txt'),
		read('/404.md'),
		read('/sitemap-index.xml'),
	]);

	assert.equal(JSON.parse(openapi).openapi, '3.1.0');
	assert.deepEqual(Object.keys(JSON.parse(nip05)), ['names']);
	assert.match(guide, /^# Dyne\.org/m);
	assert.match(recovery, /^# Page not found/m);
	assert.match(sitemap, /<sitemapindex[\s>]/);
});
