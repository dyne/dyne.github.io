import { FetchedItem, FetchedItems } from './fetch';

/* General types */

type ParseConfigItem<T> = {
	index: number;
	fallback?: T;
};

type ParseConfig<T> = {
	[Property in keyof T]: ParseConfigItem<T[Property]>;
};

/* Main type */

export type TimelineItem = {
	year: string;
	restOfDate: string | null;
	type: string;
	title: string;
	infoUrl: string | null;
	description: string | null;
	imageUrl: string | Array<string> | null;
	importance: number | null;
};

/* Config */

const timelineParseConfig: ParseConfig<TimelineItem> = {
	year: {
		index: 0,
		fallback: '',
	},
	restOfDate: {
		index: 1,
		fallback: null,
	},
	title: {
		index: 2,
		fallback: '',
	},
	type: {
		index: 3,
		fallback: '',
	},
	infoUrl: {
		index: 4,
		fallback: null,
	},
	description: {
		index: 5,
		fallback: null,
	},
	imageUrl: {
		index: 6,
		fallback: null,
	},
	importance: {
		index: 7,
		fallback: null,
	},
};

/* Functions */

export function parseArrayItem<T extends Record<string, unknown>>(arrayItem: Array<string>, config: ParseConfig<T>): T {
	const item: T = {} as T;
	for (const [key, value] of Object.entries(config)) {
		item[key as keyof T] = arrayItem[value.index] || value.fallback || undefined;
	}
	return item;
}

export function resultToItem(result: FetchedItem): TimelineItem {
	return parseArrayItem<TimelineItem>(result, timelineParseConfig);
}

export function resultsToItems(results: FetchedItems): Array<TimelineItem> {
	return results.map((result) => resultToItem(result));
}
