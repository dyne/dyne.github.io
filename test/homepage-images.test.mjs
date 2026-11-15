import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../src/components/homepage/Testimonials.astro', import.meta.url), 'utf8');

test('testimonial media has responsive, lazy, layout-stable delivery markup', () => {
	assert.match(source, /type="image\/webp"/);
	assert.match(source, /256w, .*512w/);
	assert.match(source, /sizes="\(min-width: 1024px\) 320px, 256px"/);
	assert.match(source, /width="320" height="320" loading="lazy" decoding="async"/);
});
