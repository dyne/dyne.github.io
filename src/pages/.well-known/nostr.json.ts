import type { APIRoute } from 'astro';

const UPSTREAM = 'https://relay.dyne.org/.well-known/nostr.json';

export const GET: APIRoute = async () => {
	const res = await fetch(UPSTREAM);
	if (!res.ok) {
		throw new Error(`Failed to fetch ${UPSTREAM}: ${res.status} ${res.statusText}`);
	}
	const document = await res.json();
	const names = Object.fromEntries(
		Object.entries(document.names ?? {}).sort(([left], [right]) => left.localeCompare(right))
	);
	return new Response(JSON.stringify({ names }), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Access-Control-Allow-Origin': '*',
		},
	});
};
