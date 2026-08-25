import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { parseStringPromise } from 'xml2js';

const dist = path.resolve('dist');
const read = (file) => readFile(path.join(dist, file), 'utf8');
const discovery = [
	['/llms.txt', 'text/plain'],
	['/openapi.json', 'application/json'],
	['/sitemap-index.xml', 'application/xml'],
	['/.well-known/nostr.json', 'application/nostr+json'],
	['/404.md', 'text/markdown'],
];

const canonical = (html) => html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1];
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

test('sitemap routes match built route canonicals', async () => {
	const index = await parseStringPromise(await read('sitemap-index.xml'));
	const sitemapUrls = index.sitemapindex.sitemap.map((entry) => new URL(entry.loc[0]).pathname.slice(1));
	const pages = await Promise.all(sitemapUrls.map(async (sitemap) => parseStringPromise(await read(sitemap))));
	const routes = pages.flatMap((page) => page.urlset.url.map((entry) => entry.loc[0]));

	assert.ok(routes.length > 0);
	for (const route of routes) {
		const pathname = new URL(route).pathname;
		const file = pathname === '/' ? 'index.html' : path.join(pathname, 'index.html');
		assert.equal(canonical(await read(file)), route, `${route} matches its generated canonical`);
	}
});

test('machine documents and HTML discovery links agree', async () => {
	const [openapi, nip05, guide, homepage, notFound] = await Promise.all([
		read('openapi.json'),
		read('.well-known/nostr.json'),
		read('llms.txt'),
		read('index.html'),
		read('404.html'),
	]);

	assert.equal(JSON.parse(openapi).openapi, '3.1.0');
	const nip05Document = JSON.parse(nip05);
	assert.ok(nip05Document.names && typeof nip05Document.names === 'object');
	assert.equal(
		nip05,
		JSON.stringify({
			names: Object.fromEntries(
				Object.entries(nip05Document.names).sort(([left], [right]) => left.localeCompare(right))
			),
		}),
		'NIP-05 output is deterministic even when the upstream changes its key order'
	);
	for (const [href, type] of discovery) {
		assert.match(guide, new RegExp(`https://dyne\\.org${escapeRegex(href)}`));
		for (const [name, html] of [
			['homepage', homepage],
			['404', notFound],
		]) {
			assert.match(
				html,
				new RegExp(
					`<link\\b[^>]*href="${escapeRegex(href)}"[^>]*type="${escapeRegex(type)}"|<link\\b[^>]*type="${escapeRegex(type)}"[^>]*href="${escapeRegex(href)}"`,
					'i'
				),
				`${name} advertises ${href}`
			);
		}
	}
});
