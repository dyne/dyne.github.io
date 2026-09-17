import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { parse } from 'parse5';

const dist = path.resolve('dist');

function nodes(node, predicate, result = []) {
	if (node.tagName && predicate(node)) result.push(node);
	for (const child of node.childNodes ?? []) nodes(child, predicate, result);
	return result;
}

const attr = (node, name) => node.attrs?.find((attribute) => attribute.name === name)?.value;
const text = (node) => (node.value ?? '') + (node.childNodes ?? []).map(text).join('');

test('Markdown compatibility fixtures retain semantic headings, raw HTML, URLs, code, and visible text', async () => {
	for (const route of ['awards', 'conspire', 'software/tomb', 'weaver-birds', 'zencode-w3c-vc']) {
		const document = parse(await readFile(path.join(dist, route, 'index.html'), 'utf8'));
		assert.ok(nodes(document, (node) => /^h[1-6]$/.test(node.tagName)).length > 0, `${route} keeps headings`);
		assert.ok(nodes(document, (node) => node.tagName === 'a' && attr(node, 'href')).length > 0, `${route} keeps links`);
		assert.match(text(document), /\S/, `${route} keeps visible text`);
	}

	const tomb = parse(await readFile(path.join(dist, 'software/tomb/index.html'), 'utf8'));
	assert.ok(nodes(tomb, (node) => node.tagName === 'pre').length > 0, 'Tomb retains code blocks');
	assert.ok(nodes(tomb, (node) => node.tagName === 'img').length > 0, 'Tomb retains Markdown images');
});

test('Astro 7 migration decision requires the supported Remark processor and an explicit Sätteri exit criterion', async () => {
	const decision = await readFile('docs/astro-upgrade-baseline.md', 'utf8');
	assert.match(decision, /@astrojs\/markdown-remark/);
	assert.match(decision, /processor: unified\(\)/);
	assert.match(decision, /remark-gfm/);
	assert.match(decision, /rehype-raw/);
	assert.match(decision, /Native Sätteri evaluation was not performed/);
	assert.match(decision, /EALLOWSCRIPTS/);
	assert.match(decision, /removal\s+criterion/i);
});
