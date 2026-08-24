import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [homepage, testimonials, swiper] = await Promise.all([
	readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8'),
	readFile(new URL('../src/components/homepage/Testimonials.astro', import.meta.url), 'utf8'),
	readFile(new URL('../src/components/homepage/Swiper.astro', import.meta.url), 'utf8'),
]);

test('keeps the timeline progressively enhanced and defers only the offscreen carousel', () => {
	assert.match(homepage, /<Timeline client:visible \/>/);
	assert.match(homepage, /Browse the .*full Dyne timeline/);
	assert.match(testimonials, /content-visibility: auto/);
	assert.match(testimonials, /contain-intrinsic-size: auto 900px/);
	assert.match(swiper, /new IntersectionObserver/);
	assert.doesNotMatch(swiper, /<script is:inline src=/);
	assert.match(swiper, /prefers-reduced-motion: reduce/);
});
