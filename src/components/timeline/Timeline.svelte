<script lang="ts">
	import { getTimelineDataGrouped, getTimelineYears } from './dataProcess';
	import _ from 'lodash';
	import { SyncLoader } from 'svelte-loading-spinners';
	import TimelineGroup from './TimelineGroup.svelte';
	import TimelineNav from './TimelineNav.svelte';

	let dataUrl = 'dyne-timeline.csv';

	let data = getTimelineDataGrouped(dataUrl);
</script>

{#await data}
	<div class="p-12 w-full flex items-center justify-center">
		<SyncLoader />
	</div>
{:then data}
	<div id="timeline-main" class="overflow-x-auto w-full px-12">
		<div class="flex flex-row flex-nowrap space-x-8">
			{#each data as group}
				<div class="shrink-0">
					<TimelineGroup {group} />
				</div>
			{/each}
		</div>
	</div>
	<TimelineNav steps={getTimelineYears(data)} />
{/await}
