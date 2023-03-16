import { cleanFetchedItems } from './clean';
import { fetchTimelineCSV } from './fetch';
import { TimelineGroup } from './group';
import { resultsToItems, TimelineItem } from './parse';

//

export async function getTimelineData(dataUrl: string): Promise<Array<TimelineItem>> {
	return resultsToItems(cleanFetchedItems(await fetchTimelineCSV(dataUrl)));
}

export function getTimelineYears(timelineData: Array<TimelineGroup>): Array<string> {
	return timelineData.map((group) => group.year);
}
