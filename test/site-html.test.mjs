import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { pathToFileURL } from 'node:url';
import { siteHtmlFiles } from './helpers/site-html.mjs';

test('site-page checks retain authored HTML and exclude only the root Partytown asset tree', async (t) => {
	const root = await mkdtemp(path.join(tmpdir(), 'dyne-site-html-'));
	t.after(() => rm(root, { recursive: true, force: true }));
	const authored = ['index.html', '404.html', 'broken.html', 'software/tomb/index.html', 'docs/~partytown/index.html'];
	for (const file of [...authored, '~partytown/partytown-sandbox-sw.html', '~partytown/debug/partytown-sandbox-sw.html', 'assets/script.js']) {
		const target = path.join(root, file);
		await mkdir(path.dirname(target), { recursive: true });
		await writeFile(target, '<html><head></head></html>');
	}
	for (const directory of [root, pathToFileURL(`${root}/`)]) {
		assert.deepEqual((await siteHtmlFiles(directory)).map(file => path.relative(root, file)).sort(), authored.sort());
	}
});
