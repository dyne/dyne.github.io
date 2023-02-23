import Papa from 'papaparse';
import _ from 'lodash';

/* Data parsing and cleaning */

export type ParseResult = [string, string, string, string, string, string];
export type ParseResults = Array<ParseResult>;

export async function fetchTimelineCSV(dataUrl: string): Promise<ParseResults> {
	return new Promise((resolve) => {
		Papa.parse(dataUrl, {
			download: true,
			complete: (results) => {
				resolve(results.data as ParseResults);
			},
		});
	});
}

export function cleanTimelineResults(results: ParseResults): ParseResults {
	return results.slice(1).filter((result) => result[0] !== '');
}

/* Data formatting */

export interface TimelineItem {
	year: string;
	fullDate: string;
	title: string;
	infoUrl: string | null;
	description: string | null;
	imageUrl: string | null;
	level: number | null;
}

export function resultToItem(result: ParseResult): TimelineItem {
	return {
		year: result[0],
		fullDate: result[0],
		title: result[1],
		infoUrl: result[2] || null,
		description: result[3] || null,
		imageUrl: result[4] || null,
		level: result[5] == '🪨' ? 1 : 0,
	};
}

export function resultsToItems(results: ParseResults): Array<TimelineItem> {
	return results.map((result) => resultToItem(result));
}

/* Data grouping */

export interface TimelineGroup {
	year: string;
	items: Array<TimelineItem>;
}

export function groupItems(items: Array<TimelineItem>): Array<TimelineGroup> {
	const groups: Array<TimelineGroup> = [];
	_.forIn(_.groupBy(items, 'year'), (value, key) => {
		groups.push({
			year: key,
			items: value,
		});
	});
	return _.sortBy(groups, 'year');
}

/* Complete function */

export async function getTimelineDataGrouped(dataUrl: string): Promise<Array<TimelineGroup>> {
	const data = cleanTimelineResults(await fetchTimelineCSV(dataUrl));
	const groups = groupItems(resultsToItems(data));
	return groups;
}

export function getTimelineYears(timelineData: Array<TimelineGroup>): Array<string> {
	return timelineData.map((group) => group.year);
}
