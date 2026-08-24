import assert from 'node:assert/strict';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

export const PERFORMANCE_BUDGETS = Object.freeze({
	homepageHtmlBytes: 300 * 1024,
	totalJavaScriptBytes: 150 * 1024,
	largestJavaScriptBytes: 110 * 1024,
});

async function filesIn(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const children = await Promise.all(entries.map((entry) => {
		const target = path.join(directory, entry.name);
		return entry.isDirectory() ? filesIn(target) : [target];
	}));
	return children.flat();
}

test('built homepage and client JavaScript stay within stable transfer budgets', async () => {
	const homepageBytes = (await stat('dist/index.html')).size;
	const assets = await filesIn('dist/_astro');
	const javascriptBytes = await Promise.all(
		assets.filter((asset) => asset.endsWith('.js')).map(async (asset) => ({ asset, bytes: (await stat(asset)).size }))
	);
	const totalJavaScriptBytes = javascriptBytes.reduce((total, asset) => total + asset.bytes, 0);
	const largestJavaScriptBytes = Math.max(...javascriptBytes.map((asset) => asset.bytes));

	assert.ok(homepageBytes <= PERFORMANCE_BUDGETS.homepageHtmlBytes, `homepage HTML is ${homepageBytes} bytes`);
	assert.ok(totalJavaScriptBytes <= PERFORMANCE_BUDGETS.totalJavaScriptBytes, `client JavaScript is ${totalJavaScriptBytes} bytes`);
	assert.ok(largestJavaScriptBytes <= PERFORMANCE_BUDGETS.largestJavaScriptBytes, `largest client asset is ${largestJavaScriptBytes} bytes`);
});
