import Papa from 'papaparse';

/* Types */

export type FetchedItem = string[];
export type FetchedItems = Array<FetchedItem>;

/* Functions */

export async function fetchTimelineCSV(dataUrl: string): Promise<FetchedItems> {
	return new Promise((resolve) => {
		Papa.parse(dataUrl, {
			download: true,
			complete: (results) => {
				resolve(results.data as FetchedItems);
			},
		});
	});
}
