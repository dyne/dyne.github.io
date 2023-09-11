<script lang="ts">
	import { getTimelineData } from '../dataProcess';
	import { groupItems } from '../dataProcess/group';
	import { filterItems } from '../dataProcess/filter';

	// Components
	import { SyncLoader } from 'svelte-loading-spinners';
	import TimelinePageGroup from './TimelinePageGroup.svelte';

	//

	let dataUrl = '/dyne-timeline.csv';
	let promise = getTimelineData(dataUrl);
</script>

{#await promise}
	<div class="flex items-center justify-center p-12">
		<SyncLoader color="var(--accent-color)" />
	</div>
{:then data}
	{@const filteredData = filterItems(data, null)}
	{@const groupedData = groupItems(filteredData, true)}
	<div id="timeline-main">
		<div>
			<h2 class="text-white text-5xl bg-black py-2">Today</h2>
			<div class="pl-8">
				<div class="space-y-12 border-l border-l-gray-200 py-12" />
			</div>
		</div>

		{#each groupedData as group}
			<TimelinePageGroup {group} />
		{/each}
	</div>
{/await}
