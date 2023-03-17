import { TimelineItem } from './parse';

export function filterItems(items: Array<TimelineItem>, zoom: number | null): Array<TimelineItem> {
	if (zoom === null) return items;
	return items.filter((item) => {
		return item.importance <= zoom;
	});
}
