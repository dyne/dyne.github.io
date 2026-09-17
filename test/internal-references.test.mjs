import assert from 'node:assert/strict';
import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'parse5';
import test from 'node:test';

const distPath = path.resolve('dist');
const siteOrigin = 'https://dyne.org';

async function files(directory, result = []) {
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const entryPath = path.join(directory, entry.name);
		if (entry.isDirectory()) await files(entryPath, result);
		else result.push(entryPath);
	}
	return result;
}

function attributes(node, result = []) {
	if (node.attrs) {
		for (const attribute of node.attrs) {
			if ((attribute.name === 'href' || attribute.name === 'src') && attribute.value && !(node.tagName === 'link' && node.attrs.some((item) => item.name === 'rel' && item.value === 'canonical'))) result.push(attribute.value);
		}
	}
	for (const child of node.childNodes ?? []) attributes(child, result);
	return result;
}

async function exists(pathname) {
	try {
		await access(pathname);
		return true;
	} catch {
		return false;
	}
}

async function resolvesToBuildOutput(url) {
	const pathname = decodeURIComponent(url.pathname);
	const candidates = pathname.endsWith('/')
		? [path.join(distPath, pathname, 'index.html')]
		: [path.join(distPath, pathname), path.join(distPath, `${pathname}.html`), path.join(distPath, pathname, 'index.html')];
	return (await Promise.all(candidates.map(exists))).some(Boolean);
}

test('all same-origin HTML href and src references resolve in the static build', async () => {
	const unresolved = [];
	for (const file of (await files(distPath)).filter((entry) => entry.endsWith('.html'))) {
		const route = `/${path.relative(distPath, file).replace(/index\.html$/, '').replace(/\\/g, '/')}`;
		const documentUrl = new URL(route, siteOrigin);
		const values = attributes(parse(await readFile(file, 'utf8')));
		for (const value of values) {
			if (value.startsWith('#') || /^(data|mailto|tel|javascript):/i.test(value)) continue;
			let target;
			try {
				target = new URL(value.trim(), documentUrl);
			} catch {
				unresolved.push(`${route} -> ${value} (invalid URL)`);
				continue;
			}
			if (target.origin === siteOrigin && !(await resolvesToBuildOutput(target))) {
				unresolved.push(`${route} -> ${value}`);
			}
		}
	}
	assert.deepEqual(unresolved, []);
});
