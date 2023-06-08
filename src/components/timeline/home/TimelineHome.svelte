<script lang="ts">
	import { getTimelineData } from '../dataProcess';
	import { groupItems } from '../dataProcess/group';
	import { filterItems } from '../dataProcess/filter';

	// Components
	import { SyncLoader } from 'svelte-loading-spinners';
	import TimelineGroup from './TimelineHomeGroup.svelte';

	//
	export let reverse = true;
	export let zoom = null;

	let dataUrl = '/dyne-timeline.csv';
	let promise = getTimelineData(dataUrl);

	//

	let ele;
	let pos = { top: 0, left: 0, x: 0, y: 0 };
	let isDown = false;

	const mouseDownHandler = function (e) {
		isDown = true;
		pos = {
			// The current scroll
			left: ele.scrollLeft,
			top: ele.scrollTop,
			// Get the current mouse position
			x: e.clientX,
			y: e.clientY,
		};
	};

	const mouseMoveHandler = function (e) {
		if (!isDown) return;

		// How far the mouse has been moved
		const dx = e.clientX - pos.x;
		const dy = e.clientY - pos.y;

		// Scroll the element
		ele.scrollTop = pos.top - dy;
		ele.scrollLeft = pos.left - dx;
	};

	const mouseUpHandler = function () {
		isDown = false;
	};
</script>

{#await promise}
	<div class="flex items-center justify-center p-12">
		<SyncLoader color="var(--accent-color)" />
	</div>
{:then data}
	{@const filteredData = filterItems(data, zoom)}
	{@const groupedData = groupItems(filteredData, reverse)}
	<p class="px-12 text-gray-400 mb-8 text-lg">
		Dyne.org has more than 20 years of history in the fields of
		<span class="font-bold text-dyne-orange">open-source software development</span>,
		<span class="font-bold text-white">interdisciplinary art and activism</span>,
		<span class="font-bold text-dyne-green">circular economy</span>, and
		<span class="font-bold text-dyne-purple">cyber security</span>.
	</p>
	<div
		bind:this={ele}
		id="timeline-main"
		class="overflow-x-auto px-12 pb-10 flex flex-row flex-nowrap"
		on:mousedown={mouseDownHandler}
		on:mousemove={mouseMoveHandler}
		on:mouseup={mouseUpHandler}
		on:mouseleave={mouseUpHandler}
	>
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
