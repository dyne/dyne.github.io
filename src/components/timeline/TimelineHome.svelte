<script lang="ts">
	import { getTimelineData } from './dataProcess';
	import { groupItems } from './dataProcess/group';
	import { filterItems } from './dataProcess/filter';

	// Components
	import { SyncLoader } from 'svelte-loading-spinners';
	import TimelineGroup from './TimelineGroup.svelte';

	//

	let dataUrl = '/dyne-timeline.csv';
	let promise = getTimelineData(dataUrl);
</script>

{#await promise}
	<div class="flex items-center justify-center p-12">
		<SyncLoader color="var(--accent-color)" />
	</div>
{:then data}
	{@const filteredData = filterItems(data, zoom)}
	{@const groupedData = groupItems(filteredData, reverse)}
	<div id="timeline-main" class="overflow-x-auto px-12 flex flex-row flex-nowrap">
		{#each groupedData as group}
			<div class="shrink-0">
				<TimelineGroup {group} />
			</div>
		{/each}
	</div>
{/await}

<style>
	#timeline-main {
		--scrollbar-thumb-color: var(--accent-color);
		--scrollbar-track-color: rgba(255, 255, 255, 0.2);
	}
	/* Chrome, Safari and Opera */
	#timeline-main::-webkit-scrollbar {
		background-color: var(--scrollbar-track-color);
	}
	#timeline-main::-webkit-scrollbar-thumb {
		background-color: var(--scrollbar-thumb-color);
		border-radius: 999px;
	}

	/* Firefox */
	#timeline-main {
		scrollbar-color: var(--scrollbar-thumb-color) var(--scrollbar-track-color);
	}
</style>
