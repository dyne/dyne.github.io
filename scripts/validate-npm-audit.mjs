import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function validateAudit(audit) {
	assert.ok(audit && typeof audit === 'object' && !audit.error, 'npm audit did not return a valid report');
	assert.ok(audit.metadata?.vulnerabilities, 'npm audit report is missing vulnerability metadata');

	const highOrCritical = Object.entries(audit.vulnerabilities ?? {})
		.filter(([, advisory]) => ['high', 'critical'].includes(advisory.severity))
		.sort(([left], [right]) => left.localeCompare(right));

	assert.equal(audit.metadata.vulnerabilities.critical ?? 0, 0, 'critical advisories are never accepted');
	assert.deepEqual(
		highOrCritical,
		[],
		`high/critical advisories are never accepted: ${highOrCritical.map(([name]) => name).join(', ')}`
	);
	return [];
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : '';
if (invokedPath === fileURLToPath(import.meta.url)) {
	const reportPath = process.argv[2];
	assert.ok(reportPath, 'usage: node scripts/validate-npm-audit.mjs <audit-report.json>');
	validateAudit(JSON.parse(readFileSync(reportPath, 'utf8')));
	console.log('No high or critical dependency advisories found.');
}
