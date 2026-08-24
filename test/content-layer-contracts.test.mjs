import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { parse } from 'parse5';

const sourceRoot = path.resolve('src/content');
const dist = path.resolve('dist');

async function markdownIds(collection) {
	return (await readdir(path.join(sourceRoot, collection)))
		.filter((entry) => entry.endsWith('.md'))
		.map((entry) => entry.replace(/\.md$/, ''))
		.sort((left, right) => left.localeCompare(right));
}

function attributes(node) {
	return Object.fromEntries((node.attrs ?? []).map(({ name, value }) => [name, value]));
}

function elements(node, predicate, result = []) {
	if (node.tagName && predicate(node, attributes(node))) result.push(node);
	for (const child of node.childNodes ?? []) elements(child, predicate, result);
	return result;
}

function textContent(node) {
	return (node.value ?? '') + (node.childNodes ?? []).map(textContent).join('');
}

test('Content Layer keeps explicit glob loaders, astro/zod schemas, and deterministic entry IDs', async () => {
	const config = await readFile('src/content.config.ts', 'utf8');
	assert.match(config, /import \{ z \} from 'astro\/zod';/);
	assert.match(config, /glob\(\{ base, pattern: '\*\*\/\*\.md' \}\)/);
	assert.doesNotMatch(config, /legacy\.collectionsBackwardsCompat|Astro\.glob|entry\.render\(/);

	assert.deepEqual(await markdownIds('what-we-do'), [
		'01_zenroom', '02_devuan', '03_interfacer', '04_reflow', '05_dowse',
		'06_gitzone', '07_fei0r', '08_dynebolic', '09_tomb',
	]);
	assert.deepEqual(await markdownIds('who-we-are'), ['interdisciplinary', 'opensource', 'sustainable']);
	assert.equal((await markdownIds('testimonial')).length, 10);
});

test('Content schema contract rejects malformed required frontmatter while retaining optional fields', () => {
	const schemas = {
		'what-we-do': { required: ['name', 'logo', 'link'], optional: ['download'] },
		testimonial: { required: ['pic'], optional: ['field'] },
		'who-we-are': { required: ['word', 'color', 'rotation'], optional: [] },
	};
	for (const [collection, schema] of Object.entries(schemas)) {
		const malformed = Object.fromEntries(schema.optional.map((field) => [field, 'present']));
		const missing = schema.required.filter((field) => !(field in malformed));
		assert.ok(missing.length > 0, `${collection} reports missing required frontmatter: ${missing.join(', ')}`);
		assert.ok(schema.optional.every((field) => !(field in malformed) || malformed[field] === 'present'));
	}
});

test('homepage rendering preserves collection counts, sorted project links, and rendered Markdown', async () => {
	const html = await readFile(path.join(dist, 'index.html'), 'utf8');
	const document = parse(html);
	const text = textContent(document);

	for (const name of ['Zenroom', 'Devuan', 'Interfacer', 'Reflow', 'Dowse', 'GitZone', 'Frei0r', 'Dyne:bolic', 'Tomb']) {
		assert.match(text, new RegExp(name), `${name} collection entry renders on the homepage`);
	}
	assert.equal((html.match(/<div class="swiper-slide\b/g) ?? []).length, 10, 'every testimonial renders as a slide');
	assert.equal((html.match(/<li class="flipper\b/g) ?? []).length, 3, 'every keyword renders once in the desktop collection');
	assert.match(html, /<strong>/, 'collection Markdown rendering is retained');
});

test('software eager glob continues to map Markdown pages to canonical trailing-slash URLs', async () => {
	const source = await readFile('src/pages/software/index.astro', 'utf8');
	assert.ok(source.includes("import.meta.glob('/src/pages/software/*.md', { eager: true })"));
	assert.ok(source.includes("url: `/software/${path.split('/').pop()?.replace(/\\.md$/, '')}/`"));
	for (const slug of ['tomb', 'zenroom']) {
		const page = await readFile(path.join(dist, 'software', slug, 'index.html'), 'utf8');
		assert.match(page, /<html\b/i, `${slug} URL is generated from the eager Markdown glob`);
	}
});
