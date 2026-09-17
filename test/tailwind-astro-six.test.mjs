import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const stylesDirectory = path.resolve('dist/_astro');

test('Tailwind 4 emits the migrated Dyne theme and Typography utilities', async () => {
	const styles = await Promise.all(
		(await readdir(stylesDirectory))
			.filter((name) => name.endsWith('.css'))
			.map((name) => readFile(path.join(stylesDirectory, name), 'utf8'))
	);
	const css = styles.join('\n');

	for (const expected of [
		'--color-primary-60:#f8e0c4',
		'--font-prose:"Inter Variable", sans-serif, sans',
		'--radius-3xl:60px',
		'.bg-sustainability{',
		'.rounded-3xl{',
		'.prose{',
	]) {
		assert.ok(css.includes(expected), `emitted CSS retains ${expected}`);
	}
});
