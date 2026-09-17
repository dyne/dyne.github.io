import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { parse } from 'parse5';

const dist = path.resolve('dist');

async function htmlFiles(directory = dist, result = []) {
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const entryPath = path.join(directory, entry.name);
		if (entry.isDirectory()) await htmlFiles(entryPath, result);
		else if (entry.name.endsWith('.html')) result.push(entryPath);
	}
	return result;
}

function elements(node, result = []) {
	if (node.tagName) result.push(node);
	for (const child of node.childNodes ?? []) elements(child, result);
	return result;
}

const attribute = (node, name) => node.attrs?.find((item) => item.name === name)?.value;

test('every generated static redirect has recoverable no-JavaScript metadata and content', async () => {
	const redirects = [];
	for (const file of await htmlFiles()) {
		const html = await readFile(file, 'utf8');
		if (/<meta\b[^>]*http-equiv="refresh"/i.test(html)) redirects.push([file, html]);
	}
	assert.ok(redirects.length > 0, 'the build includes static redirect stubs');

	for (const [file, html] of redirects) {
		const nodes = elements(parse(html));
		const refresh = nodes.find((node) => node.tagName === 'meta' && attribute(node, 'http-equiv') === 'refresh');
		const destinationHref = attribute(refresh, 'content')?.match(/^0;url=(\S+)$/i)?.[1];
		const destination = destinationHref ? new URL(destinationHref, 'https://dyne.org').href : undefined;
		const canonical = nodes.find((node) => node.tagName === 'link' && attribute(node, 'rel') === 'canonical');
		const route = path.relative(dist, file);

		assert.ok(destination, `${route} keeps a zero-delay meta refresh`);
		assert.equal(attribute(canonical, 'href'), destination, `${route} canonically identifies its destination`);
		assert.match(html, /<title>\S[\s\S]*?<\/title>/i, `${route} has a title`);
		assert.match(html, /<meta\b[^>]*name="robots"[^>]*content="noindex, nofollow"/i, `${route} is noindex`);
		assert.equal(nodes.filter((node) => node.tagName === 'h1').length, 1, `${route} has a visible heading`);
		assert.ok(nodes.some((node) => node.tagName === 'a' && new URL(attribute(node, 'href'), 'https://dyne.org').href === destination), `${route} exposes its destination link`);
		assert.ok(nodes.some((node) => node.tagName === 'noscript'), `${route} includes no-JavaScript recovery text`);
		const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map((match) => match[1]);
		assert.ok(scripts.every((script) => !/location(?:\.href)?\s*=|location\.replace|window\.open/i.test(script)), `${route} does not claim a JavaScript redirect`);
		assert.doesNotMatch(html, /\b301\b|\bpermanent redirect\b/i, `${route} does not claim an HTTP redirect`);
	}
});
