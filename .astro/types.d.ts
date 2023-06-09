declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"awards": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "awards",
  data: any
},
},
"contact": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "contact",
  data: any
},
},
"hero": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "hero",
  data: any
},
},
"pillars": {
"interdisciplinary.md": {
  id: "interdisciplinary.md",
  slug: "interdisciplinary",
  body: string,
  collection: "pillars",
  data: any
},
"opensource.md": {
  id: "opensource.md",
  slug: "opensource",
  body: string,
  collection: "pillars",
  data: any
},
"sustainable.md": {
  id: "sustainable.md",
  slug: "sustainable",
  body: string,
  collection: "pillars",
  data: any
},
},
"projects": {
"01_zenroom.md": {
  id: "01_zenroom.md",
  slug: "01_zenroom",
  body: string,
  collection: "projects",
  data: any
},
"02_devuan.md": {
  id: "02_devuan.md",
  slug: "02_devuan",
  body: string,
  collection: "projects",
  data: any
},
"03_interfacer.md": {
  id: "03_interfacer.md",
  slug: "03_interfacer",
  body: string,
  collection: "projects",
  data: any
},
"04_reflow.md": {
  id: "04_reflow.md",
  slug: "04_reflow",
  body: string,
  collection: "projects",
  data: any
},
"05_dowse.md": {
  id: "05_dowse.md",
  slug: "05_dowse",
  body: string,
  collection: "projects",
  data: any
},
"06_gitzone.md": {
  id: "06_gitzone.md",
  slug: "06_gitzone",
  body: string,
  collection: "projects",
  data: any
},
"07_fei0r.md": {
  id: "07_fei0r.md",
  slug: "07_fei0r",
  body: string,
  collection: "projects",
  data: any
},
"08_dynebolic.md": {
  id: "08_dynebolic.md",
  slug: "08_dynebolic",
  body: string,
  collection: "projects",
  data: any
},
"09_tomb.md": {
  id: "09_tomb.md",
  slug: "09_tomb",
  body: string,
  collection: "projects",
  data: any
},
},
"stats": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "stats",
  data: any
},
"stat_1.md": {
  id: "stat_1.md",
  slug: "stat_1",
  body: string,
  collection: "stats",
  data: any
},
"stat_2.md": {
  id: "stat_2.md",
  slug: "stat_2",
  body: string,
  collection: "stats",
  data: any
},
},
"supports": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "supports",
  data: any
},
},
"testimonial": {
"01_tbazz.md": {
  id: "01_tbazz.md",
  slug: "01_tbazz",
  body: string,
  collection: "testimonial",
  data: any
},
"02_avilarenata.md": {
  id: "02_avilarenata.md",
  slug: "02_avilarenata",
  body: string,
  collection: "testimonial",
  data: any
},
"03_amir.md": {
  id: "03_amir.md",
  slug: "03_amir",
  body: string,
  collection: "testimonial",
  data: any
},
"04_fn.md": {
  id: "04_fn.md",
  slug: "04_fn",
  body: string,
  collection: "testimonial",
  data: any
},
"050_ola.md": {
  id: "050_ola.md",
  slug: "050_ola",
  body: string,
  collection: "testimonial",
  data: any
},
"055_geert.md": {
  id: "055_geert.md",
  slug: "055_geert",
  body: string,
  collection: "testimonial",
  data: any
},
"06_thgrugq.md": {
  id: "06_thgrugq.md",
  slug: "06_thgrugq",
  body: string,
  collection: "testimonial",
  data: any
},
"07_bria.md": {
  id: "07_bria.md",
  slug: "07_bria",
  body: string,
  collection: "testimonial",
  data: any
},
"08_bruce.md": {
  id: "08_bruce.md",
  slug: "08_bruce",
  body: string,
  collection: "testimonial",
  data: any
},
},
"timeline": {
"10.md": {
  id: "10.md",
  slug: "10",
  body: string,
  collection: "timeline",
  data: any
},
"20.md": {
  id: "20.md",
  slug: "20",
  body: string,
  collection: "timeline",
  data: any
},
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "timeline",
  data: any
},
},
"what-we-did": {
"10.md": {
  id: "10.md",
  slug: "10",
  body: string,
  collection: "what-we-did",
  data: any
},
"20.md": {
  id: "20.md",
  slug: "20",
  body: string,
  collection: "what-we-did",
  data: any
},
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "what-we-did",
  data: any
},
},
"what-we-do": {
"01_zenroom.md": {
  id: "01_zenroom.md",
  slug: "01_zenroom",
  body: string,
  collection: "what-we-do",
  data: any
},
"02_devuan.md": {
  id: "02_devuan.md",
  slug: "02_devuan",
  body: string,
  collection: "what-we-do",
  data: any
},
"03_interfacer.md": {
  id: "03_interfacer.md",
  slug: "03_interfacer",
  body: string,
  collection: "what-we-do",
  data: any
},
"04_reflow.md": {
  id: "04_reflow.md",
  slug: "04_reflow",
  body: string,
  collection: "what-we-do",
  data: any
},
"05_dowse.md": {
  id: "05_dowse.md",
  slug: "05_dowse",
  body: string,
  collection: "what-we-do",
  data: any
},
"06_gitzone.md": {
  id: "06_gitzone.md",
  slug: "06_gitzone",
  body: string,
  collection: "what-we-do",
  data: any
},
"07_fei0r.md": {
  id: "07_fei0r.md",
  slug: "07_fei0r",
  body: string,
  collection: "what-we-do",
  data: any
},
"08_dynebolic.md": {
  id: "08_dynebolic.md",
  slug: "08_dynebolic",
  body: string,
  collection: "what-we-do",
  data: any
},
"09_tomb.md": {
  id: "09_tomb.md",
  slug: "09_tomb",
  body: string,
  collection: "what-we-do",
  data: any
},
},
"who-we-are": {
"interdisciplinary.md": {
  id: "interdisciplinary.md",
  slug: "interdisciplinary",
  body: string,
  collection: "who-we-are",
  data: any
},
"opensource.md": {
  id: "opensource.md",
  slug: "opensource",
  body: string,
  collection: "who-we-are",
  data: any
},
"sustainable.md": {
  id: "sustainable.md",
  slug: "sustainable",
  body: string,
  collection: "who-we-are",
  data: any
},
},

	};

	type ContentConfig = never;
}
