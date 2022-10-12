import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import partytown from '@astrojs/partytown';

import sitemap from '@astrojs/sitemap';
import { SITE } from './src/config.mjs';
import image from '@astrojs/image';
import path from 'path';

import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


export default defineConfig({
	site: SITE.origin,
	base: SITE.basePathname,

	output: 'static',
	integrations: [
		tailwind(),
		partytown(),
		sitemap(),
        image()
     ],
    vite: {
		resolve: {
			alias: {
				'~': path.resolve(__dirname, './src'),
			},
		},
	},
});
