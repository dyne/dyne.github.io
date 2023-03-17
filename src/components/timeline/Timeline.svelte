<script lang="ts">
	import { getTimelineData, getTimelineYears } from './dataProcess';
	import { groupItems } from './dataProcess/group';
	import { filterItems } from './dataProcess/filter';

	// Components
	import { SyncLoader } from 'svelte-loading-spinners';
	import TimelineGroup from './TimelineGroup.svelte';
	import TimelineNav from './TimelineNav.svelte';
	import TimelineItem from './TimelineItem.svelte';

	//

	export let reverse = true;
	export let zoom = null;

	let dataUrl = 'dyne-timeline.csv';
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
	<!-- <TimelineNav steps={getTimelineYears(groupedData)} /> -->
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
