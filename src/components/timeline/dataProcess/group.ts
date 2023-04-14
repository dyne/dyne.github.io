import _ from 'lodash';
import { TimelineItem } from './parse';

/* Types */

export interface TimelineGroup {
	year: string;
	items: Array<TimelineItem>;
}

/* Function */

export function groupItems(items: Array<TimelineItem>, reverse = false): Array<TimelineGroup> {
	if (reverse) items.reverse();
	const groups: Array<TimelineGroup> = [];
	_.forIn(_.groupBy(items, 'year'), (value, key) => {
		groups.push({
			year: key,
			items: value,
		});
	});
	const sorted = _.sortBy(groups, 'year');
	return reverse ? sorted.reverse() : sorted;
}
