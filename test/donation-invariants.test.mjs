import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import test from 'node:test';
import { parse } from 'parse5';

const baseline = JSON.parse(await readFile('test/fixtures/donation-baseline.json', 'utf8'));
const source = await readFile('src/pages/donate.astro', 'utf8');
const attrs = node => Object.fromEntries((node.attrs ?? []).map(({ name, value }) => [name, value]));
const text = node => (node.value ?? '') + (node.childNodes ?? []).map(text).join('');
const find = (node, predicate) => [...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap(child => find(child, predicate))];
const document = parse(await readFile('dist/donate/index.html', 'utf8'));

test('donation wallet values and complete tier promises match the pre-change baseline', () => {
	const extract = name => JSON.parse(JSON.stringify(vm.runInNewContext(source.match(new RegExp(`const ${name} = ([\\s\\S]*?\\n\\]);`))[1].replace(/icon: \w+/g, 'icon: null'))));
	assert.deepEqual(extract('wallets').map(({ icon, ...wallet }) => wallet), baseline.wallets);
	assert.deepEqual(extract('tiers'), baseline.tiers);
	for (const wallet of baseline.wallets) {
		assert.equal(text(find(document, node => attrs(node).id === `${wallet.name}-address`)[0]), wallet.address);
	}
});

test('donation rendering preserves all payment destinations, amounts and benefit promises', () => {
	const body = text(document).replace(/\s+/g, ' ');
	for (const promise of [...baseline.recurringPromises, baseline.cryptoPromise]) assert.ok(body.includes(promise), promise);
	assert.ok(body.includes('If it fits it sits: Donations give you benefits, including but not limited to no less then'));
	for (const href of baseline.paymentDestinations) assert.equal(find(document, node => node.tagName === 'a' && attrs(node).href === href).length, 1, href);
	const offers = find(document, node => attrs(node).id === 'support-offers')[0];
	for (const tier of baseline.tiers) {
		const offer = find(offers, node => node.tagName === 'a' && attrs(node).href === tier.url)[0];
		assert.ok(text(offer).includes(tier.amount));
		assert.ok(text(offer).includes(tier.text));
	}
	assert.ok(find(document, node => attrs(node).id === 'money-panel' && !('hidden' in attrs(node))).length, 'Stripe stays available before JavaScript initializes');
});
