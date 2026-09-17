import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'parse5';
import test from 'node:test';

const dist = path.resolve('dist');

async function htmlFiles(directory = dist, result = []) {
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const target = path.join(directory, entry.name);
		if (entry.isDirectory()) await htmlFiles(target, result);
		else if (entry.name.endsWith('.html')) result.push(target);
	}
	return result;
}

function imagesWithoutAlt(node, result = []) {
	if (node.tagName === 'img' && !node.attrs?.some((attribute) => attribute.name === 'alt')) {
		result.push(node.attrs?.find((attribute) => attribute.name === 'src')?.value ?? '(missing src)');
	}
	for (const child of node.childNodes ?? []) imagesWithoutAlt(child, result);
	return result;
}

test('every generated image has an explicit alternative-text decision', async () => {
	const missing = [];
	for (const file of await htmlFiles()) {
		for (const source of imagesWithoutAlt(parse(await readFile(file, 'utf8')))) {
			missing.push(`${path.relative(dist, file)} -> ${source}`);
		}
	}
	assert.deepEqual(missing, []);
});

test('the donation live region is emitted inside the HTML body', async () => {
	const html = await readFile(path.join(dist, 'donate', 'index.html'), 'utf8');
	const status = html.indexOf('id="wallet-copy-status"');
	assert.ok(status >= 0, 'the wallet copy live region exists');
	assert.ok(status < html.indexOf('</body>'), 'the live region precedes the closing body tag');
});
