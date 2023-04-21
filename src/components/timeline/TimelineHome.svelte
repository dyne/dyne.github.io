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
	{@const filteredData = filterItems(data, 0)}
	{@const groupedData = groupItems(filteredData, true)}
	<div id="timeline-main" class="overflow-x-auto px-12 flex flex-row flex-nowrap">
		{#each groupedData as group}
			<div class="shrink-0">
				<TimelineGroup {group} />
			</div>
		{/each}
	</div>
{/await}

<style>
	/* Hide scrollbar for Chrome, Safari and Opera */
	#timeline-main::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	#timeline-main {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
