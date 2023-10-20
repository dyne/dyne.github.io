import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import { defineConfig } from 'astro/config';
import path from 'path';
import { fileURLToPath } from 'url';
import { SITE } from './src/config.mjs';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
	site: SITE.origin,
	base: SITE.basePathname,
	output: 'static',
	compressHTML: true,
	markdown: {
		drafts: true,
	},
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		partytown(),
		sitemap(),
		svelte(),
		compress(),
	],
	vite: {
		resolve: {
			alias: {
				'~': path.resolve(__dirname, './src'),
			},
		},
	},
});
