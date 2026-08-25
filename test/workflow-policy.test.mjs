import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

import { validateAudit } from '../scripts/validate-npm-audit.mjs';

const audit = (vulnerabilities = {}, counts = {}) => ({
	metadata: { vulnerabilities: { critical: 0, high: 0, ...counts } },
	vulnerabilities,
});
const advisory = (id, severity = 'high') => ({
	severity,
	url: `https://github.com/advisories/${id}`,
});

test('the audit policy accepts a clean report and approved advisory subsets', () => {
	assert.deepEqual(validateAudit(audit()), []);
	assert.deepEqual(
		validateAudit(audit({ astro: { severity: 'high', via: [advisory('GHSA-2pvr-wf23-7pc7')] } }, { high: 1 })),
		['astro']
	);
	assert.deepEqual(
		validateAudit(
			audit(
				{
					astro: {
						severity: 'high',
						via: [
							advisory('GHSA-f48w-9m4c-m7f5', 'moderate'),
							advisory('GHSA-7pw4-f3q4-r2p2', 'low'),
							advisory('GHSA-4g3v-8h47-v7g6', 'moderate'),
						],
					},
				},
				{ high: 1 }
			)
		),
		['astro']
	);
	assert.deepEqual(
		validateAudit(
			audit(
				{
					astro: {
						severity: 'high',
						via: [advisory('GHSA-2pvr-wf23-7pc7'), advisory('GHSA-8hv8-536x-4wqp')],
					},
					sharp: { severity: 'high', via: [advisory('GHSA-f88m-g3jw-g9cj')] },
				},
				{ high: 2 }
			)
		),
		['astro', 'sharp']
	);
});

test('the audit policy rejects unapproved high and all critical advisories', () => {
	assert.throws(
		() => validateAudit(audit({ astro: { severity: 'high', via: [advisory('GHSA-new-advisory')] } }, { high: 1 })),
		/unexpected high\/critical advisories: astro:GHSA-new-advisory/
	);
	assert.throws(
		() =>
			validateAudit(
				audit(
					{ astro: { severity: 'high', via: [advisory('GHSA-f48w-9m4c-m7f5', 'moderate'), advisory('GHSA-new-advisory', 'low')] } },
					{ high: 1 }
				)
			),
		/unexpected high\/critical advisories: astro:GHSA-new-advisory/
	);
	assert.throws(
		() => validateAudit(audit({ astro: { severity: 'critical' } }, { critical: 1 })),
		/critical advisories are never accepted/
	);
});

test('the workflow exposes durable documentation for its temporary exception', async () => {
	const workflow = await readFile('.github/workflows/deploy.yml', 'utf8');
	assert.match(workflow, /docs\/security-exceptions\.md/);
	await access('docs/security-exceptions.md');
});
