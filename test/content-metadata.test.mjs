import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const dist = new URL('../dist/', import.meta.url);

async function htmlFiles(directory = dist, files = []) {
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const entryUrl = new URL(entry.name, directory);
		if (entry.isDirectory()) await htmlFiles(new URL(`${entry.name}/`, directory), files);
		else if (entry.name.endsWith('.html')) files.push(entryUrl);
	}
	return files;
}

const attribute = (html, selector, name) => {
	const tag = html.match(new RegExp(`<${selector}\\b[^>]*>`, 'i'))?.[0] ?? '';
	return tag.match(new RegExp(`${name}=["']([^"']+)["']`, 'i'))?.[1];
};

test('built HTML has deterministic titles, descriptions, and canonical URLs', async () => {
	const files = await htmlFiles();
	assert.ok(files.length > 0, 'the site build should emit HTML pages');

	for (const file of files) {
		const html = await readFile(file, 'utf8');
		const relative = path.relative(new URL('.', dist).pathname, file.pathname);
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
