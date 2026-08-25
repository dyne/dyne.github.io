import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

import { validateAudit } from '../scripts/validate-npm-audit.mjs';

const audit = (vulnerabilities = {}, counts = {}) => ({
	metadata: { vulnerabilities: { critical: 0, high: 0, ...counts } },
	vulnerabilities,
});
test('the audit policy accepts only a clean high/critical report', () => {
	assert.deepEqual(validateAudit(audit()), []);
});

test('the audit policy rejects every high and critical advisory', () => {
	assert.throws(
		() => validateAudit(audit({ astro: { severity: 'high' } }, { high: 1 })),
		/high\/critical advisories are never accepted: astro/
	);
	assert.throws(
		() => validateAudit(audit({ astro: { severity: 'critical' } }, { critical: 1 })),
		/critical advisories are never accepted/
	);
});

test('the workflow documents the zero-tolerance audit policy', async () => {
	const workflow = await readFile('.github/workflows/deploy.yml', 'utf8');
	assert.match(workflow, /docs\/security-exceptions\.md/);
	await access('docs/security-exceptions.md');
});
