<script lang="ts">
	import type { TimelineGroup } from '../dataProcess/group';
	import TimelinePageItem from './TimelinePageItem.svelte';

	export let group: TimelineGroup;
</script>

<div class="">
	<div class="sticky top-0 z-10">
		<h2 class="text-white text-7xl bg-black py-2">{group.year}</h2>
	</div>

	<div class="pl-8">
		<div class="space-y-12 border-l border-l-gray-200 py-12">
			{#each group.items as item (item.title)}
				<TimelinePageItem {item} />
			{/each}
		</div>
	</div>
</div>
