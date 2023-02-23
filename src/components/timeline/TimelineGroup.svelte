<script lang="ts">
	import type { TimelineGroup } from './dataProcess';
	import TimelineItem from './TimelineItem.svelte';

	export let group: TimelineGroup;
</script>

<div id={group.year} class="space-y-6">
	<h2 class="text-primary text-7xl sticky left-0 w-fit">{group.year}</h2>
	<div class="flex flex-nowrap space-x-2">
		{#each group.items as item (item.title)}
			<div class="shrink-0 w-[300px]">
				<TimelineItem {item} />
			</div>
		{/each}
	</div>
</div>
