import type { FetchedItems, FetchedItem } from './fetch';

/* Helpers */

const isResultEmpty = (result: FetchedItem): boolean => {
	return result.every((item) => item === '');
};

/* Types */

type FetchedItemsCleaner = (results: FetchedItems) => FetchedItems;

/* Clean functions */

const removeDataHeader: FetchedItemsCleaner = (results) => {
	return results.slice(1);
};

const removeEmptyResults: FetchedItemsCleaner = (results) => {
	return results.filter((result) => !isResultEmpty(result));
};

/* Config */

const cleaningFunctions: Array<FetchedItemsCleaner> = [removeDataHeader, removeEmptyResults];

/* Main functions */

export function cleanFetchedItems(results: FetchedItems): FetchedItems {
	return cleaningFunctions.reduce((acc, cleaner) => cleaner(acc), results);
}
