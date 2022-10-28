import partytown from '@astrojs/partytown';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

import image from '@astrojs/image';
import sitemap from '@astrojs/sitemap';
import path from 'path';
import { SITE } from './src/config.mjs';

import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	site: SITE.origin,
	base: SITE.basePathname,

	output: 'static',
	markdown: {
		drafts: true,
	},
	integrations: [tailwind(), partytown(), sitemap(), image()],
	vite: {
		resolve: {
			alias: {
				'~': path.resolve(__dirname, './src'),
			},
		},
	},
});
