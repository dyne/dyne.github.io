import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { siteHtmlFiles } from './helpers/site-html.mjs';

const dist = new URL('../dist/', import.meta.url);

const attribute = (html, selector, name) => {
	const tag = html.match(new RegExp(`<${selector}\\b[^>]*>`, 'i'))?.[0] ?? '';
	return tag.match(new RegExp(`${name}=["']([^"']+)["']`, 'i'))?.[1];
};

test('built HTML has deterministic titles, descriptions, and canonical URLs', async () => {
	const files = await siteHtmlFiles(dist);
	assert.ok(files.length > 0, 'the site build should emit HTML pages');

	for (const file of files) {
		const html = await readFile(file, 'utf8');
		const relative = path.relative(fileURLToPath(dist), file);
		assert.match(html, /<title>\S[\s\S]*?<\/title>/i, `${relative} has a non-empty title`);
		assert.ok(attribute(html, 'meta', 'name') !== undefined || html.includes('name="description"'), `${relative} has metadata`);
		assert.match(html, /<meta\b[^>]*name=["']description["'][^>]*content=["']\S/i, `${relative} has a description`);
		assert.match(html, /<link\b[^>]*rel=["']canonical["'][^>]*href=["']https?:\/\//i, `${relative} has an absolute canonical`);
	}
});

test('representative content pages have one primary heading', async () => {
	for (const route of ['index.html', 'software/index.html', 'donate/index.html', 'timeline/index.html', '404.html']) {
		const html = await readFile(new URL(route, dist), 'utf8');
		assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `${route} has exactly one h1`);
	}
});
