import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';
import { parse } from 'parse5';
import { groupSoftwareCatalog, normalizeSoftwareCatalog } from '../src/lib/software-catalog.mjs';
import { loadGitHubRepositories } from '../src/lib/remote-content.mjs';

const repository = (name, extra = {}) => ({ name, html_url: `https://github.com/dyne/${name}`, ...extra });
test('explicit aliases merge all sources while similar unrelated IDs survive', () => {
	const input = { local: [{ id: 'jaromail', title: 'Jaro Mail', description: 'Authored', url: '/jaromail' }],
		pages: [{ id: 'jaro-mail', url: '/software/jaro-mail/', frontmatter: { title: 'Other title', description: 'Markdown' } }],
		remote: [repository('Jaro-Mail', { description: 'Remote' }), repository('jaro_mail'), repository('other')] };
	const catalog = normalizeSoftwareCatalog(input);
	assert.deepEqual(catalog.map(p => p.id), ['jaro_mail', 'jaromail', 'other']);
	assert.equal(catalog[1].title, 'Jaro Mail');
	assert.equal(catalog[1].description, 'Authored');
	assert.equal(catalog[1].url, '/jaromail');
	assert.deepEqual(catalog, normalizeSoftwareCatalog({ ...input, remote: input.remote.toReversed() }));
});

test('missing homepage and description retain a usable source action', () => {
	const [project] = normalizeSoftwareCatalog({ remote: [repository('tool', { homepage: null, description: null })] });
	assert.equal(project.title, 'tool'); assert.equal(project.description, '');
	assert.deepEqual(project.actions, [{ label: 'Source code', href: 'https://github.com/dyne/tool' }]);
});

test('empty local description is enriched as plain text after authored Markdown', () => {
	const input = { local: [{ id: 'tool', title: 'Local', description: '' }], remote: [repository('tool', { description: '<b>Remote text</b>' })] };
	assert.equal(normalizeSoftwareCatalog(input)[0].descriptionIsHtml, false);
	const [project] = normalizeSoftwareCatalog({ ...input, pages: [{ id: 'tool', url: '/software/tool/', frontmatter: { description: 'Local page' } }] });
	assert.equal(project.description, 'Local page'); assert.equal(project.descriptionIsHtml, true);
});

test('actions distinguish documentation, website, source and evidenced downloads', () => {
	const catalog = normalizeSoftwareCatalog({ local: [{ id: 'os', url: 'https://os.example', download: 'https://os.example/files' }, { id: 'repo', download: 'https://github.com/dyne/repo' }],
		pages: [{ id: 'manual', url: '/software/manual/', frontmatter: { destination: 'https://raw.githubusercontent.com/dyne/manual/main/README.md' } }],
		remote: [repository('tool', { homepage: 'https://tool.example' }), repository('repo', { homepage: 'https://github.com/dyne/repo' })] });
	assert.deepEqual(catalog.find(p => p.id === 'os').actions.map(a => a.label), ['Project website', 'Download']);
	assert.deepEqual(catalog.find(p => p.id === 'manual').actions, [{ label: 'Documentation', href: '/software/manual/' }]);
	assert.deepEqual(catalog.find(p => p.id === 'repo').actions.map(a => a.label), ['Source code']);
	assert.deepEqual(catalog.find(p => p.id === 'tool').actions.map(a => a.label), ['Project website', 'Source code']);
});

test('malformed remote records cannot inject unsafe action URLs or erase local entries', () => {
	const catalog = normalizeSoftwareCatalog({ local: [{ id: 'local', title: 'Local' }], remote: [null, {}, { name: 2 }, repository('bad', { html_url: 'javascript:alert(1)' }), repository('safe', { homepage: '//evil.example' })] });
	assert.deepEqual(catalog.map(p => p.id), ['local', 'safe']);
	assert.deepEqual(catalog[1].actions.map(a => a.label), ['Source code']);
	assert.equal(normalizeSoftwareCatalog({ remote: {} }).length, 0);
});

test('remote URLs must be absolute while authored relative destinations remain usable', () => {
	const catalog = normalizeSoftwareCatalog({ local: [{ id: 'local', url: '/conspire' }], remote: [
		repository('remote-tool', { homepage: '/missing-project' }),
		repository('missing-source', { html_url: '/missing-source', homepage: 'https://example.org' }),
	] });
	assert.deepEqual(catalog.map(project => project.id), ['local', 'remote-tool']);
	assert.equal(catalog[0].url, '/conspire');
	assert.equal(catalog[1].url, 'https://github.com/dyne/remote-tool');
	assert.deepEqual(catalog[1].actions, [{ label: 'Source code', href: 'https://github.com/dyne/remote-tool' }]);
});

test('newly surfaced authored projects link to an existing Conspire page and evidenced Sailfish source', async () => {
	const catalog = normalizeSoftwareCatalog({ local: JSON.parse(await readFile('src/content/software.json', 'utf8')) });
	assert.deepEqual(catalog.find(project => project.id === 'conspire').actions, [{ label: 'Project website', href: '/conspire' }]);
	assert.deepEqual(catalog.find(project => project.id === 'sailfish-pool').actions, [{ label: 'Source code', href: 'https://github.com/dyne/sailfish-pool' }]);
});

for (const [name, fetchImpl] of [['offline', async () => { throw new Error('offline'); }], ['malformed JSON', async () => new Response('{')], ['malformed shape', async () => new Response('{}')]]) {
	test(`${name} GitHub response retains authored catalog`, async () => {
		const remote = await loadGitHubRepositories({ fetchImpl });
		assert.deepEqual(remote, []);
		assert.equal(normalizeSoftwareCatalog({ local: [{ id: 'local', title: 'Local', url: '/local' }], remote })[0].title, 'Local');
	});
}

const attrs = node => Object.fromEntries((node.attrs ?? []).map(a => [a.name, a.value]));
test('explicit offline mode skips remote access and keeps the authored catalog', async () => {
	const previous = process.env.DYNE_REMOTE_CONTENT_OFFLINE;
	process.env.DYNE_REMOTE_CONTENT_OFFLINE = '1';
	let requests = 0;
	try {
		const remote = await loadGitHubRepositories({ fetchImpl: () => { requests++; throw new Error('must not fetch'); } });
		assert.equal(requests, 0);
		assert.deepEqual(remote, []);
		assert.equal(normalizeSoftwareCatalog({ local: [{ id: 'local' }], remote }).length, 1);
	} finally {
		if (previous === undefined) delete process.env.DYNE_REMOTE_CONTENT_OFFLINE;
		else process.env.DYNE_REMOTE_CONTENT_OFFLINE = previous;
	}
});

function find(node, predicate) { return [...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap(child => find(child, predicate))]; }
test('static catalog retains every authored JSON and Markdown identity exactly once', async () => {
	const local = JSON.parse(await readFile('src/content/software.json', 'utf8'));
	const pages = (await readdir('src/pages/software')).filter(path => path.endsWith('.md')).map(path => ({ id: path.slice(0, -3) }));
	const expected = normalizeSoftwareCatalog({ local, pages }).map(p => p.id);
	const html = parse(await readFile('dist/software/index.html', 'utf8'));
	const ids = find(html, n => attrs(n)['data-project-id']).map(n => attrs(n)['data-project-id']);
	assert.equal(new Set(ids).size, ids.length);
	for (const id of expected) assert.ok(ids.includes(id), `${id} remains available in static HTML`);
	assert.equal(ids.filter(id => id === 'jaromail').length, 1);
});

test('purpose grouping preserves authored and unmatched remote projects once with a general fallback', () => {
	const catalog = normalizeSoftwareCatalog({ local: [{ id: 'tomb', title: 'Tomb' }, { id: 'gestalt' }], remote: [repository('remote-tool'), repository('Tomb')] });
	const groups = groupSoftwareCatalog(catalog);
	assert.deepEqual(groups.map(group => group.id), ['privacy', 'general']);
	assert.deepEqual(groups[0].projects.map(project => project.id), ['tomb']);
	assert.deepEqual(groups[1].projects.map(project => project.id), ['gestalt', 'remote-tool']);
	assert.deepEqual(groups.flatMap(group => group.projects).map(project => project.id).sort(), catalog.map(project => project.id).sort());
});

test('static purpose links target unique sections with a coherent heading hierarchy', async () => {
	const document = parse(await readFile('dist/software/index.html', 'utf8'));
	const nav = find(document, node => node.tagName === 'nav' && attrs(node)['aria-label'] === 'Software by purpose')[0];
	assert.ok(nav);
	const links = find(nav, node => node.tagName === 'a');
	assert.equal(links.length, 5);
	const catalog = find(document, node => 'data-software-catalog' in attrs(node))[0];
	const allIds = find(catalog, node => attrs(node).id).map(node => attrs(node).id);
	assert.equal(new Set(allIds).size, allIds.length);
	for (const link of links) {
		const target = attrs(link).href.slice(1);
		const section = find(document, node => attrs(node).id === target)[0];
		assert.equal(section.tagName, 'section');
		assert.equal(attrs(section).tabindex, '-1');
		assert.equal(find(section, node => node.tagName === 'h2').length, 1);
		const projects = find(section, node => attrs(node)['data-project-id']);
		assert.ok(projects.length);
		for (const project of projects) assert.equal(find(project, node => node.tagName === 'h3').length, 1);
	}
	assert.equal(find(document, node => node.tagName === 'h1').length, 1);
	const sections = links.map(link => find(document, node => attrs(node).id === attrs(link).href.slice(1))[0]);
	const grouped = sections.flatMap(section => find(section, node => attrs(node)['data-project-id']));
	assert.equal(grouped.length, find(document, node => attrs(node)['data-project-id']).length);
});
