import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { parse } from 'parse5';

const attrs = node => Object.fromEntries((node.attrs ?? []).map(({ name, value }) => [name, value]));
const text = node => (node.value ?? '') + (node.childNodes ?? []).map(text).join('');
const find = (node, predicate) => [...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap(child => find(child, predicate))];
const document = parse(await readFile('dist/contact/index.html', 'utf8'));
const content = find(document, node => 'data-participation' in attrs(node))[0];

test('contact preserves every authored channel and quick-link destination in static HTML', async () => {
	const groups = JSON.parse(await readFile('src/content/social/linktree.json', 'utf8'));
	const quicklinks = JSON.parse(await readFile('src/content/social/quicklinks.json', 'utf8'));
	const channels = find(content, node => node.tagName === 'li');
	assert.equal(channels.length, groups.flatMap(group => group.links).length);
	assert.deepEqual(channels.map(node => ({
		name: text(find(node, child => child.tagName === 'h4')[0]),
		href: attrs(find(node, child => child.tagName === 'a')[0]).href,
		tagline: text(find(node, child => child.tagName === 'p')[0]),
	})), groups.flatMap(group => group.links).map(({ name, link, tagline }) => ({ name, href: link, tagline })));
	for (const quicklink of quicklinks) assert.ok(find(content, node => node.tagName === 'a' && attrs(node).href === quicklink.link).length, quicklink.cta);
});

test('contact exposes semantic participation routes and source-backed foundation address', () => {
	assert.deepEqual(find(document, node => node.tagName === 'h1').map(text), ['Join the community']);
	assert.deepEqual(find(content, node => node.tagName === 'h2').map(text), ['Join a discussion', 'Contribute to a project', 'Contact the foundation']);
	for (const id of ['discussion', 'contribute', 'foundation']) {
		assert.equal(find(content, node => attrs(node).id === id).length, 1);
		assert.ok(find(content, node => node.tagName === 'a' && attrs(node).href === `#${id}`).length);
	}
	assert.match(text(find(content, node => node.tagName === 'address')[0]), /Haparandadam 7-A1 1013AK Amsterdam/);
});
