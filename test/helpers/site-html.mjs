import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export async function siteHtmlFiles(directory) {
	const root = path.resolve(directory instanceof URL ? fileURLToPath(directory) : directory);
	const partytownAssets = path.join(root, '~partytown');
	const files = [];
	async function visit(current) {
		for (const entry of await readdir(current, { withFileTypes: true })) {
			const target = path.join(current, entry.name);
			// Partytown copies its iframe documents here; they are runtime assets, not site pages.
			if (entry.isDirectory() && target !== partytownAssets) await visit(target);
			else if (entry.isFile() && entry.name.endsWith('.html')) files.push(target);
		}
	}
	await visit(root);
	return files.sort();
}
