import { cleanFetchedItems } from './clean';
import { fetchTimelineCSV } from './fetch';
import { groupItems, TimelineGroup } from './group';
import { resultsToItems } from './parse';

//

export async function getTimelineDataGrouped(dataUrl: string): Promise<Array<TimelineGroup>> {
	const data = cleanFetchedItems(await fetchTimelineCSV(dataUrl));
	const groups = groupItems(resultsToItems(data));
	return groups;
}

export function getTimelineYears(timelineData: Array<TimelineGroup>): Array<string> {
	return timelineData.map((group) => group.year);
}
