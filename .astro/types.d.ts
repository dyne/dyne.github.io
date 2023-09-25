declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema = BaseSchemaWithoutEffects | import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(input: CollectionConfig<S>): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<ContentEntryMap[C]>['slug'];

	export function getEntryBySlug<C extends keyof ContentEntryMap, E extends ValidContentEntrySlug<C> | (string & {})>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C> ? Promise<CollectionEntry<C>> : Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<C extends keyof ContentEntryMap, E extends ValidContentEntrySlug<C> | (string & {})>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C> ? Promise<CollectionEntry<C>> : Promise<CollectionEntry<C> | undefined>;
	export function getEntry<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C] | (string & {})>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C] ? Promise<DataEntryMap[C][E]> : Promise<CollectionEntry<C> | undefined>;
	export function getEntry<C extends keyof ContentEntryMap, E extends ValidContentEntrySlug<C> | (string & {})>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C> ? Promise<CollectionEntry<C>> : Promise<CollectionEntry<C> | undefined>;
	export function getEntry<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C] | (string & {})>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C] ? Promise<DataEntryMap[C][E]> : Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		awards: {
			'index.md': {
				id: 'index.md';
				slug: 'index';
				body: string;
				collection: 'awards';
				data: any;
			} & { render(): Render['.md'] };
		};
		contact: {
			'index.md': {
				id: 'index.md';
				slug: 'index';
				body: string;
				collection: 'contact';
				data: any;
			} & { render(): Render['.md'] };
		};
		heritage: {
			'index.md': {
				id: 'index.md';
				slug: 'index';
				body: string;
				collection: 'heritage';
				data: any;
			} & { render(): Render['.md'] };
		};
		hero: {
			'index.md': {
				id: 'index.md';
				slug: 'index';
				body: string;
				collection: 'hero';
				data: any;
			} & { render(): Render['.md'] };
		};
		pillars: {
			'interdisciplinary.md': {
				id: 'interdisciplinary.md';
				slug: 'interdisciplinary';
				body: string;
				collection: 'pillars';
				data: any;
			} & { render(): Render['.md'] };
			'opensource.md': {
				id: 'opensource.md';
				slug: 'opensource';
				body: string;
				collection: 'pillars';
				data: any;
			} & { render(): Render['.md'] };
			'sustainable.md': {
				id: 'sustainable.md';
				slug: 'sustainable';
				body: string;
				collection: 'pillars';
				data: any;
			} & { render(): Render['.md'] };
		};
		projects: {
			'01_zenroom.md': {
				id: '01_zenroom.md';
				slug: '01_zenroom';
				body: string;
				collection: 'projects';
				data: any;
			} & { render(): Render['.md'] };
			'02_devuan.md': {
				id: '02_devuan.md';
				slug: '02_devuan';
				body: string;
				collection: 'projects';
				data: any;
			} & { render(): Render['.md'] };
			'03_interfacer.md': {
				id: '03_interfacer.md';
				slug: '03_interfacer';
				body: string;
				collection: 'projects';
				data: any;
			} & { render(): Render['.md'] };
			'04_reflow.md': {
				id: '04_reflow.md';
				slug: '04_reflow';
				body: string;
				collection: 'projects';
				data: any;
			} & { render(): Render['.md'] };
			'05_dowse.md': {
				id: '05_dowse.md';
				slug: '05_dowse';
				body: string;
				collection: 'projects';
				data: any;
			} & { render(): Render['.md'] };
			'06_gitzone.md': {
				id: '06_gitzone.md';
				slug: '06_gitzone';
				body: string;
				collection: 'projects';
				data: any;
			} & { render(): Render['.md'] };
			'07_fei0r.md': {
				id: '07_fei0r.md';
				slug: '07_fei0r';
				body: string;
				collection: 'projects';
				data: any;
			} & { render(): Render['.md'] };
			'08_dynebolic.md': {
				id: '08_dynebolic.md';
				slug: '08_dynebolic';
				body: string;
				collection: 'projects';
				data: any;
			} & { render(): Render['.md'] };
			'09_tomb.md': {
				id: '09_tomb.md';
				slug: '09_tomb';
				body: string;
				collection: 'projects';
				data: any;
			} & { render(): Render['.md'] };
		};
		supports: {
			'index.md': {
				id: 'index.md';
				slug: 'index';
				body: string;
				collection: 'supports';
				data: any;
			} & { render(): Render['.md'] };
		};
		testimonial: {
			'01_tbazz.md': {
				id: '01_tbazz.md';
				slug: '01_tbazz';
				body: string;
				collection: 'testimonial';
				data: any;
			} & { render(): Render['.md'] };
			'02_avilarenata.md': {
				id: '02_avilarenata.md';
				slug: '02_avilarenata';
				body: string;
				collection: 'testimonial';
				data: any;
			} & { render(): Render['.md'] };
			'03_amir.md': {
				id: '03_amir.md';
				slug: '03_amir';
				body: string;
				collection: 'testimonial';
				data: any;
			} & { render(): Render['.md'] };
			'04_fn.md': {
				id: '04_fn.md';
				slug: '04_fn';
				body: string;
				collection: 'testimonial';
				data: any;
			} & { render(): Render['.md'] };
			'050_ola.md': {
				id: '050_ola.md';
				slug: '050_ola';
				body: string;
				collection: 'testimonial';
				data: any;
			} & { render(): Render['.md'] };
			'055_geert.md': {
				id: '055_geert.md';
				slug: '055_geert';
				body: string;
				collection: 'testimonial';
				data: any;
			} & { render(): Render['.md'] };
			'06_thgrugq.md': {
				id: '06_thgrugq.md';
				slug: '06_thgrugq';
				body: string;
				collection: 'testimonial';
				data: any;
			} & { render(): Render['.md'] };
			'07_bria.md': {
				id: '07_bria.md';
				slug: '07_bria';
				body: string;
				collection: 'testimonial';
				data: any;
			} & { render(): Render['.md'] };
			'08_bruce.md': {
				id: '08_bruce.md';
				slug: '08_bruce';
				body: string;
				collection: 'testimonial';
				data: any;
			} & { render(): Render['.md'] };
		};
		timeline: {
			'10.md': {
				id: '10.md';
				slug: '10';
				body: string;
				collection: 'timeline';
				data: any;
			} & { render(): Render['.md'] };
			'20.md': {
				id: '20.md';
				slug: '20';
				body: string;
				collection: 'timeline';
				data: any;
			} & { render(): Render['.md'] };
			'index.md': {
				id: 'index.md';
				slug: 'index';
				body: string;
				collection: 'timeline';
				data: any;
			} & { render(): Render['.md'] };
		};
		'what-we-did': {
			'10.md': {
				id: '10.md';
				slug: '10';
				body: string;
				collection: 'what-we-did';
				data: any;
			} & { render(): Render['.md'] };
			'20.md': {
				id: '20.md';
				slug: '20';
				body: string;
				collection: 'what-we-did';
				data: any;
			} & { render(): Render['.md'] };
			'index.md': {
				id: 'index.md';
				slug: 'index';
				body: string;
				collection: 'what-we-did';
				data: any;
			} & { render(): Render['.md'] };
		};
		'what-we-do': {
			'01_zenroom.md': {
				id: '01_zenroom.md';
				slug: '01_zenroom';
				body: string;
				collection: 'what-we-do';
				data: any;
			} & { render(): Render['.md'] };
			'02_devuan.md': {
				id: '02_devuan.md';
				slug: '02_devuan';
				body: string;
				collection: 'what-we-do';
				data: any;
			} & { render(): Render['.md'] };
			'03_interfacer.md': {
				id: '03_interfacer.md';
				slug: '03_interfacer';
				body: string;
				collection: 'what-we-do';
				data: any;
			} & { render(): Render['.md'] };
			'04_reflow.md': {
				id: '04_reflow.md';
				slug: '04_reflow';
				body: string;
				collection: 'what-we-do';
				data: any;
			} & { render(): Render['.md'] };
			'05_dowse.md': {
				id: '05_dowse.md';
				slug: '05_dowse';
				body: string;
				collection: 'what-we-do';
				data: any;
			} & { render(): Render['.md'] };
			'06_gitzone.md': {
				id: '06_gitzone.md';
				slug: '06_gitzone';
				body: string;
				collection: 'what-we-do';
				data: any;
			} & { render(): Render['.md'] };
			'07_fei0r.md': {
				id: '07_fei0r.md';
				slug: '07_fei0r';
				body: string;
				collection: 'what-we-do';
				data: any;
			} & { render(): Render['.md'] };
			'08_dynebolic.md': {
				id: '08_dynebolic.md';
				slug: '08_dynebolic';
				body: string;
				collection: 'what-we-do';
				data: any;
			} & { render(): Render['.md'] };
			'09_tomb.md': {
				id: '09_tomb.md';
				slug: '09_tomb';
				body: string;
				collection: 'what-we-do';
				data: any;
			} & { render(): Render['.md'] };
		};
		'who-we-are': {
			'interdisciplinary.md': {
				id: 'interdisciplinary.md';
				slug: 'interdisciplinary';
				body: string;
				collection: 'who-we-are';
				data: any;
			} & { render(): Render['.md'] };
			'opensource.md': {
				id: 'opensource.md';
				slug: 'opensource';
				body: string;
				collection: 'who-we-are';
				data: any;
			} & { render(): Render['.md'] };
			'sustainable.md': {
				id: 'sustainable.md';
				slug: 'sustainable';
				body: string;
				collection: 'who-we-are';
				data: any;
			} & { render(): Render['.md'] };
		};
	};

	type DataEntryMap = {
		books: {
			books: {
				id: 'books';
				collection: 'books';
				data: any;
			};
		};
		menu: {
			menu: {
				id: 'menu';
				collection: 'menu';
				data: any;
			};
		};
		social: {
			index: {
				id: 'index';
				collection: 'social';
				data: any;
			};
			linktree: {
				id: 'linktree';
				collection: 'social';
				data: any;
			};
		};
		stats: {};
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = never;
}
