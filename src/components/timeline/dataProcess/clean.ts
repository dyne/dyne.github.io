import type { FetchedItems } from './fetch';

/* Types */

type FetchedItemsCleaner = (results: FetchedItems) => FetchedItems;

/* Clean functions */

const removeDataHeader: FetchedItemsCleaner = (results) => {
	return results.slice(1);
};

const removeEmptyResults: FetchedItemsCleaner = (results) => {
	return results.filter((result) => result[0] !== '');
};

/* Config */

const cleaningFunctions: Array<FetchedItemsCleaner> = [removeDataHeader, removeEmptyResults];

/* Main functions */

export function cleanFetchedItems(results: FetchedItems): FetchedItems {
	return cleaningFunctions.reduce((acc, cleaner) => cleaner(acc), results);
}
