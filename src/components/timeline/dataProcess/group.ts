import _ from 'lodash';
import { TimelineItem } from './parse';

/* Types */

export interface TimelineGroup {
	year: string;
	items: Array<TimelineItem>;
}

/* Function */

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
