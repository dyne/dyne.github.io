// Aliases are explicit: punctuation alone must not merge unrelated projects.
export const SOFTWARE_ALIASES = Object.freeze({ 'jaro-mail': 'jaromail' });
export const canonicalSoftwareId = value => {
	const id = typeof value === 'string' ? value.trim().toLowerCase() : '';
	return SOFTWARE_ALIASES[id] ?? id;
};

// Editorial purpose assignments use software.json descriptions/subtitles and
// the matching local project pages. TBT's page describes performance/poetry;
// JMX describes audio/video signals; TorTV describes running the Tor network.
// Unknown projects stay visible in General; remote keywords never infer a role.
export const SOFTWARE_PURPOSES = [
	{ id: 'creative-media', title: 'Creative media', ids: ['darkice', 'freej', 'frei0r', 'hasciicam', 'jmx', 'muse', 'tbt', 'webnomad'] },
	{ id: 'operating-systems', title: 'Operating systems', ids: ['decodeos', 'devuan', 'dynebolic'] },
	{ id: 'privacy', title: 'Privacy and security', ids: ['conspire', 'darkfi', 'dowse', 'jaromail', 'mactomb', 'tomb', 'tortv', 'yubiswitch'] },
	{ id: 'developer-tools', title: 'Developer and system tools', ids: ['autorg', 'gitzone', 'harvest', 'sailfish-pool', 'sup', 'zenbridge', 'zenroom', 'zshaolin'] },
	{ id: 'general', title: 'General', ids: [] },
];

export function groupSoftwareCatalog(catalog) {
	const groups = SOFTWARE_PURPOSES.map(purpose => ({ ...purpose, projects: [] }));
	for (const project of catalog) {
		const group = groups.find(purpose => purpose.ids.includes(project.id)) ?? groups.at(-1);
		group.projects.push(project);
	}
	return groups.filter(group => group.projects.length);
}

function usableUrl(value, { allowRelative = true } = {}) {
	if (typeof value !== 'string') return '';
	if (allowRelative && /^\/(?!\/)/.test(value)) return value;
	try {
		const url = new URL(value);
		return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
	} catch { return ''; }
}

export function destinationLabel(url) {
	if (/raw\.githubusercontent\.com|\/(?:docs?|documentation)(?:[./]|$)|^https?:\/\/dev\./i.test(url)) return 'Documentation';
	if (/^https?:\/\/(?:github\.com|gitlab\.com|code\.dyne\.org)\//i.test(url)) return 'Source code';
	return 'Project website';
}

// Nonempty authored JSON wins, then Markdown, then remote enrichment. Sorting
// inputs makes collisions deterministic even when remote response order changes.
export function normalizeSoftwareCatalog({ local = [], pages = [], remote = [] } = {}) {
	const projects = new Map();
	const add = entry => {
		if (!entry.id) return;
		const project = projects.get(entry.id) ?? { id: entry.id, actions: [] };
		for (const [key, value] of Object.entries(entry)) {
			if (key !== 'actions' && value && (!Array.isArray(value) || value.length) && !project[key]) {
				project[key] = value;
				if (key === 'description') project.descriptionIsHtml = Boolean(entry.authored);
			}
		}
		for (const action of entry.actions ?? []) {
			if (!project.actions.some(existing => existing.label === action.label)) project.actions.push(action);
		}
		projects.set(entry.id, project);
	};
	const sorted = values => [...(Array.isArray(values) ? values : [])].filter(v => v && typeof v === 'object')
		.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
	for (const item of sorted(local)) {
		const url = usableUrl(item.url);
		const actions = url ? [{ label: destinationLabel(url), href: url }] : [];
		for (const [key, label] of [['documentation', 'Documentation'], ['source', 'Source code'], ['download', 'Download']]) {
			const href = usableUrl(item[key]);
			if (href) actions.push({ label: key === 'download' && destinationLabel(href) === 'Source code' ? 'Source code' : label, href });
		}
		add({ ...item, id: canonicalSoftwareId(item.id), url, actions, authored: true });
	}
	for (const page of sorted(pages)) {
		const id = canonicalSoftwareId(page.id);
		const data = page.frontmatter ?? {};
		const [title, subtitle] = (typeof data.title === 'string' ? data.title : id).split(' :: ');
		const url = usableUrl(page.url);
		const label = destinationLabel(usableUrl(data.destination) || url);
		const current = projects.get(id);
		if (current?.actions[0]?.href === url.replace(/\/$/, '') || current?.actions[0]?.href === url) current.actions[0].label = label;
		add({ id, title, subtitle, description: typeof data.description === 'string' ? data.description : '', url,
			actions: url ? [{ label, href: url }] : [], authored: true });
	}
	for (const repo of sorted(remote)) {
		if (typeof repo.name !== 'string' || !repo.name.trim()) continue;
		const source = usableUrl(repo.html_url, { allowRelative: false });
		if (!source) continue;
		const homepage = usableUrl(repo.homepage, { allowRelative: false });
		const actions = [];
		if (homepage && !/^https?:\/\/(?:www\.)?dyne\.org(?:\/|$)/i.test(homepage)) actions.push({ label: destinationLabel(homepage), href: homepage });
		actions.push({ label: 'Source code', href: source });
		add({ id: canonicalSoftwareId(repo.name), title: repo.name.trim(), description: typeof repo.description === 'string' ? repo.description.trim() : '',
			url: actions[0].href, actions });
	}
	return [...projects.values()].map(project => ({ ...project, title: project.title || project.id,
		description: project.description || project.subtitle || '', actions: project.actions.filter((action, index, actions) => actions.findIndex(other => other.href === action.href) === index) }))
		.sort((a, b) => a.id.localeCompare(b.id));
}
