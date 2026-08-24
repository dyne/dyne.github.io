import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const markdown = (base: string, schema: ReturnType<typeof z.object>) =>
	defineCollection({ loader: glob({ base, pattern: '**/*.md' }), schema });

export const collections = {
	'what-we-do': markdown('src/content/what-we-do', z.object({ name: z.string(), logo: z.string(), link: z.string(), download: z.string() })),
	testimonial: markdown('src/content/testimonial', z.object({ pic: z.string(), field: z.string().optional() })),
	'who-we-are': markdown('src/content/who-we-are', z.object({ word: z.string(), color: z.string(), rotation: z.string() })),
};
