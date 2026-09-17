import partytown from '@astrojs/partytown';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import path from 'path';
import { readdirSync, readFileSync } from 'node:fs';
import { SITE } from './src/config.mjs';
import { fileURLToPath } from 'url';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { unified } from '@astrojs/markdown-remark';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDirectory = path.resolve(__dirname, './src/pages');
const redirectRoutes = new Set(
	readdirSync(pagesDirectory, { recursive: true })
		.filter((entry) => /\.(md|mdx)$/.test(entry))
		.filter((entry) => /layout:\s*.*redirect\.astro/.test(readFileSync(path.join(pagesDirectory, entry), 'utf8')))
		.map((entry) => `/${entry.replace(/\.(md|mdx)$/, '')}/`)
);

// https://astro.build/config
export default defineConfig({
	site: SITE.origin,
	base: SITE.basePathname,
	output: 'static',
	markdown: {
		drafts: true,
		// Astro 7 defaults to Sätteri. Retain the selected remark/rehype path
		// until its semantic Markdown fixtures prove an equivalent migration.
		processor: unified({
			remarkPlugins: [remarkGfm],
			rehypePlugins: [rehypeRaw],
		}),
		shikiConfig: {
			theme: 'dracula',
		},
	},
	integrations: [
		partytown(),
		sitemap({
			filter: (page) => !redirectRoutes.has(new URL(page).pathname),
		}),
		svelte(),
		mdx(),
	],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				'~': path.resolve(__dirname, './src'),
			},
		},
	},
});
