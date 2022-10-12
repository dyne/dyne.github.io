import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import partytown from '@astrojs/partytown';

import sitemap from '@astrojs/sitemap';
import { SITE } from './src/config.mjs';

export default defineConfig({
	site: SITE.origin,
	base: SITE.basePathname,

	output: 'static',
	integrations: [
		tailwind(),
		partytown(),
		sitemap(),
	],
});
