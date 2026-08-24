import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const source = async (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('Astro upgrade inventory classifies removed APIs and compatibility surfaces', async () => {
	const [inventory, config, content, software, whoWeAre] = await Promise.all([
		source('docs/astro-upgrade-baseline.md'),
		source('astro.config.mjs'),
		source('src/content.config.ts'),
		source('src/pages/software/index.astro'),
		source('src/components/homepage/WhoWeAre.astro'),
	]);

	for (const surface of [
		'Astro.glob',
		'legacy collection flags',
		'src/fetch.*',
		'custom Vite plugins',
		'set:html',
		'define:vars',
		'remark-gfm',
		'rehype-raw',
		'@apply',
	]) {
		assert.match(inventory, new RegExp(surface.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `${surface} is classified`);
	}
	assert.doesNotMatch(
		config,
		/Astro\.glob|legacy\.collectionsBackwardsCompat|experimental:/,
		'removed/legacy configuration is absent'
	);
	assert.match(content, /from 'astro:content'/, 'content APIs have an explicit owner');
	assert.match(software, /import\.meta\.glob\(/, 'supported Vite glob is inventoried');
	assert.match(whoWeAre, /bg-\$\{/, 'dynamic Tailwind construction remains owned');
	for (const version of [
		'`6.4.8`',
		'`7.2.6`',
		'resolved `7.3.6`',
		'resolved `8.2.2`',
		'GHSA-2pvr-wf23-7pc7',
		'GHSA-8hv8-536x-4wqp',
		'GHSA-f88m-g3jw-g9cj',
	]) {
		assert.ok(inventory.includes(version), `${version} remains an explicit upgrade/audit contract`);
	}
});
