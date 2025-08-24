import partytown from '@astrojs/partytown';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import path from 'path';
import { SITE } from './src/config.mjs';
import { fileURLToPath } from 'url';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
    site: SITE.origin,
    base: SITE.basePathname,
    output: 'static',
    markdown: {
        drafts: true,
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeRaw],
        shikiConfig: {
            theme: 'dracula',
        },
    },
    integrations: [tailwind(), partytown(), sitemap(), svelte(), mdx()],
    vite: {
        resolve: {
            alias: {
                '~': path.resolve(__dirname, './src'),
            },
        },
    },
});
