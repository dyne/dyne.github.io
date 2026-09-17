import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { parse } from 'parse5';

const dist = path.resolve('dist');

async function htmlFiles(directory = dist, files = []) {
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const target = path.join(directory, entry.name);
		if (entry.isDirectory()) await htmlFiles(target, files);
		else if (entry.name.endsWith('.html')) files.push(target);
	}
	return files;
}

function collect(node, result = []) {
	if (node.tagName) result.push(node);
	for (const child of node.childNodes ?? []) collect(child, result);
	return result;
}

function attr(node, name) {
	return node.attrs?.find((attribute) => attribute.name === name)?.value;
}

test('generated HTML keeps document content inside body, unique IDs, and no nested paragraph blocks', async () => {
	for (const file of await htmlFiles()) {
		const html = await readFile(file, 'utf8');
		assert.equal(html.slice(html.toLowerCase().lastIndexOf('</body>') + 7).trim(), '</html>', `${file} has no content after body`);
		assert.doesNotMatch(html, /<p\b[^>]*>(?:(?!<\/p>)[\s\S])*?<(?:div|p|ul|ol|h[1-6])\b/i, `${file} has no block nested in a paragraph`);

		const ids = collect(parse(html))
			.filter((node) => node.namespaceURI !== 'http://www.w3.org/2000/svg')
			.map((node) => attr(node, 'id'))
			.filter(Boolean);
		assert.equal(new Set(ids).size, ids.length, `${file} has no duplicate IDs`);
	}
});

test('critical routes retain explicit word separation in visible metadata and navigation', async () => {
	for (const route of ['index.html', 'software/index.html', 'donate/index.html', 'timeline/index.html']) {
		const html = await readFile(path.join(dist, route), 'utf8');
		assert.match(html, /Skip to main content/, `${route} retains skip-link word separation`);
		assert.match(html, /Main navigation/, `${route} retains navigation label text`);
	}
});
