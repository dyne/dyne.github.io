<script lang="ts">
	import type { TimelineGroup } from '../dataProcess/group';
	import TimelineItem from './TimelineHomeItem.svelte';

	export let group: TimelineGroup;
</script>

<div id={group.year} class="space-y-6">
	<div class="pr-8">
		<h2 class="text-white text-7xl sticky left-0 w-fit">{group.year}</h2>
	</div>
	<div class="flex flex-nowrap border-t border-t-primary-40 space-x-4 pr-8">
		{#each group.items as item (item.title)}
			<div class="shrink-0">
				<TimelineItem {item} />
			</div>
		{/each}
	</div>
</div>
