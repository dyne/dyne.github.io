import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { parse } from 'parse5';

const attrs = (node) => Object.fromEntries((node.attrs ?? []).map(({ name, value }) => [name, value]));
const text = (node) => (node.value ?? '') + (node.childNodes ?? []).map(text).join('');
function find(node, predicate) {
	return [...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap(child => find(child, predicate))];
}

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

test('homepage actions explain their destinations and privacy remains in the footer', async () => {
	const document = parse(await readFile('dist/index.html', 'utf8'));
	const hero = find(document, node => 'data-home-hero' in attrs(node))[0];
	assert.ok(hero, 'hero is present in static HTML');
	assert.deepEqual(find(hero, node => node.tagName === 'a').map(node => [text(node).trim(), attrs(node).href]), [
		['Explore software', '/software'], ['Join the community', '/contact'], ['Our story', '#timeline'],
	]);
	const footer = find(document, node => node.tagName === 'footer')[0];
	assert.ok(find(footer, node => node.tagName === 'a' && attrs(node).href === '/privacy').length);
	for (const id of ['who-we-are', 'timeline']) assert.ok(find(document, node => attrs(node).id === id).length, `${id} anchor remains`);
});

test('homepage preserves the original section order with featured projects in the projects area', async () => {
	const html = await readFile('dist/index.html', 'utf8');
	const document = parse(html);
	const highlights = find(document, node => 'data-project-highlights' in attrs(node))[0];
	assert.deepEqual(find(highlights, node => node.tagName === 'h3').map(text), ['Zenroom', 'Devuan', 'Tomb']);
	assert.deepEqual(find(highlights, node => node.tagName === 'a').map(node => [text(node).trim(), attrs(node).href]), [
		['Explore Zenroom', '/software/zenroom/'], ['Explore Devuan', '/software/devuan/'], ['Explore Tomb', '/software/tomb/'], ['Browse all software', '/software'],
	]);
	for (const purpose of ['cryptographic operations and smart contracts', 'Debian, without systemd', 'Encrypt and back up secret files']) assert.ok(text(highlights).includes(purpose));
	const order = ['data-home-hero', 'id="who-we-are"', 'heritage-action', 'data-home-newsletter', 'href="https://dynebolic.org"', 'data-home-projects', 'homepage-testimonials', 'data-home-participation', 'id="timeline"'].map(marker => html.indexOf(marker));
	assert.ok(order.every((position, index) => position >= 0 && (index === 0 || position > order[index - 1])));
	assert.deepEqual(find(document, node => node.tagName === 'h1').map(text), ['Free to share code.']);
	assert.match(text(document), /Dyne:bolic, a RASTASOFT production/);
	assert.doesNotMatch(text(document), /announce a new RASTASOFT production/);
	for (const route of ['zenroom', 'devuan', 'tomb']) assert.match(await readFile(`dist/software/${route}/index.html`, 'utf8'), /<html/);
});
