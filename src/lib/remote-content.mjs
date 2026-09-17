import Parser from 'rss-parser';
import fallbackFeed from '../fixtures/planet-dyne-feed.json' with { type: 'json' };

export const REMOTE_CONTENT_TIMEOUT_MS = 5_000;
export const REMOTE_CONTENT_MAX_BYTES = 512 * 1024;
export const PLANET_DYNE_RSS_URL = 'https://news.dyne.org/tag/planet-dyne/rss/';

const MAX_ITEMS = 12;
const MAX_TITLE_LENGTH = 180;
const MAX_CREATOR_LENGTH = 100;
const MAX_SNIPPET_LENGTH = 600;
function boundedText(value, maximum) {
	return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, maximum) : '';
}

function safeUrl(value, { allowRelative = false } = {}) {
	if (typeof value !== 'string' || !value.trim()) return '';
	if (allowRelative && value.startsWith('/')) return value;
	try {
		const url = new URL(value);
		return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : '';
	} catch {
		return '';
	}
}

export function normalizeFeedItem(item) {
	const title = boundedText(item?.title, MAX_TITLE_LENGTH);
	const link = safeUrl(item?.link);
	const image = safeUrl(item?.['media:content']?.$?.url, { allowRelative: true });
	if (!title || !link || !image) return null;

	return {
		title,
		link,
		creator: boundedText(item.creator || item.author, MAX_CREATOR_LENGTH) || 'Dyne.org',
		'content:encodedSnippet': boundedText(
			item['content:encodedSnippet'] || item.contentSnippet || item.content,
			MAX_SNIPPET_LENGTH
		),
		'media:content': { $: { url: image } },
	};
}

export function normalizeFeed(feed) {
	const items = Array.isArray(feed?.items) ? feed.items.map(normalizeFeedItem).filter(Boolean).slice(0, MAX_ITEMS) : [];
	if (!items.length) throw new Error('Remote feed did not include usable entries');
	return { items };
}

export async function fetchRemoteText(url, {
	fetchImpl = globalThis.fetch,
	timeoutMs = REMOTE_CONTENT_TIMEOUT_MS,
	maxBytes = REMOTE_CONTENT_MAX_BYTES,
} = {}) {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), timeoutMs);
	try {
		const response = await fetchImpl(url, {
			headers: { accept: 'application/rss+xml, application/xml;q=0.9, text/xml;q=0.8, text/html;q=0.5' },
			signal: controller.signal,
		});
		if (!response.ok) throw new Error(`Remote request failed with ${response.status}`);
		const declaredLength = Number(response.headers.get('content-length'));
		if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
			throw new Error('Remote response exceeded the size limit');
		}

		const reader = response.body?.getReader();
		if (!reader) {
			const text = await response.text();
			if (new TextEncoder().encode(text).byteLength > maxBytes) throw new Error('Remote response exceeded the size limit');
			return text;
		}
		const chunks = [];
		let received = 0;
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			received += value.byteLength;
			if (received > maxBytes) {
				await reader.cancel();
				throw new Error('Remote response exceeded the size limit');
			}
			chunks.push(value);
		}
		return new TextDecoder().decode(Buffer.concat(chunks));
	} finally {
		clearTimeout(timeout);
	}
}

export async function loadPlanetDyneFeed(options = {}) {
	if (process.env.DYNE_REMOTE_CONTENT_OFFLINE === '1') return normalizeFeed(fallbackFeed);
	try {
		const xml = await fetchRemoteText(PLANET_DYNE_RSS_URL, options);
		const parser = new Parser({ customFields: { item: ['media:content'] } });
		return normalizeFeed(await parser.parseString(xml));
	} catch {
		return normalizeFeed(fallbackFeed);
	}
}

export async function loadGitHubRepositories(options = {}) {
	if (process.env.DYNE_REMOTE_CONTENT_OFFLINE === '1') return [];
	try {
		const response = await fetchRemoteText('https://api.github.com/orgs/dyne/repos?per_page=100&type=sources', options);
		const data = JSON.parse(response);
		if (!Array.isArray(data)) throw new Error('GitHub response was not a repository list');
		return data.filter((repository) => typeof repository?.name === 'string').slice(0, 100);
	} catch {
		return [];
	}
}
