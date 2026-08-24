import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const APPROVED_HIGH_ADVISORY_IDS = new Set([
	'GHSA-2pvr-wf23-7pc7',
	'GHSA-8hv8-536x-4wqp',
	'GHSA-f88m-g3jw-g9cj',
]);

function advisoryId(advisory) {
	if (typeof advisory.url !== 'string') return '';
	return advisory.url.split('/').pop() ?? '';
}

export function validateAudit(audit) {
	assert.ok(audit && typeof audit === 'object' && !audit.error, 'npm audit did not return a valid report');
	assert.ok(audit.metadata?.vulnerabilities, 'npm audit report is missing vulnerability metadata');

	const highOrCritical = Object.entries(audit.vulnerabilities ?? {})
		.filter(([, advisory]) => ['high', 'critical'].includes(advisory.severity))
		.sort(([left], [right]) => left.localeCompare(right));
	const unexpected = highOrCritical.flatMap(([name, vulnerability]) => {
		const advisories = (vulnerability.via ?? []).filter(
			(advisory) => typeof advisory === 'object' && ['high', 'critical'].includes(advisory.severity)
		);
		if (!advisories.length) return [`${name}:unidentified`];
		return advisories
			.map(advisoryId)
			.filter((id) => !APPROVED_HIGH_ADVISORY_IDS.has(id))
			.map((id) => `${name}:${id || 'unidentified'}`);
	});

	assert.equal(audit.metadata.vulnerabilities.critical ?? 0, 0, 'critical advisories are never accepted');
	assert.deepEqual(unexpected, [], `unexpected high/critical advisories: ${unexpected.join(', ')}`);
	return highOrCritical.map(([name]) => name);
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : '';
if (invokedPath === fileURLToPath(import.meta.url)) {
	const reportPath = process.argv[2];
	assert.ok(reportPath, 'usage: node scripts/validate-npm-audit.mjs <audit-report.json>');
	const accepted = validateAudit(JSON.parse(readFileSync(reportPath, 'utf8')));
	if (accepted.length) {
		console.warn(
			`Accepted temporary high-severity exceptions: ${accepted.join(', ')}; see docs/security-exceptions.md.`
		);
	} else {
		console.log('No high or critical dependency advisories found.');
	}
}
