<script lang="ts">
	import { getTimelineData, getTimelineYears } from './dataProcess';
	import _ from 'lodash';
	import { SyncLoader } from 'svelte-loading-spinners';
	import TimelineGroup from './TimelineGroup.svelte';
	import TimelineNav from './TimelineNav.svelte';
	import { groupItems } from './dataProcess/group';

	let dataUrl = 'dyne-timeline.csv';

	let promise = getTimelineData(dataUrl);
</script>

{#await promise}
	<div class="flex items-center justify-center p-12">
		<SyncLoader color="var(--accent-color)" />
	</div>
{:then data}
	{@const groupedData = groupItems(data)}
	<div id="timeline-main" class="overflow-x-auto px-12">
		<div class="flex flex-row flex-nowrap space-x-8">
			{#each groupedData as group}
				<div class="shrink-0">
					<TimelineGroup {group} />
				</div>
			{/each}
		</div>
	</div>
	<TimelineNav steps={getTimelineYears(groupedData)} />
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
