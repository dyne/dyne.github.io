<script lang="ts">
	import { timelineColors } from '../colors';
	import type { TimelineItem } from '../dataProcess/parse';

	export let item: TimelineItem;
	const colors = timelineColors[item.type] ?? timelineColors['default'];
	const { bg, accent, border } = colors;

	const isDefault = !Boolean(item.type);
	const isMilestone = item.importance == '0';
</script>

<div class="relative pl-6" id={encodeURIComponent(item.title)}>
	<div class={`absolute ${isMilestone ? 'top-5' : 'top-1'} -left-3 w-6 h-6 ${accent} rounded-full ring-4 ring-black`} />
	<div class={`space-y-2 text-gray-200 rounded-2xl ${isMilestone ? `p-4 border ${border} ${bg}` : ''}`}>
		<!-- Base content -->
		<h3 class="text-3xl font-bold">
			{item.title}
		</h3>
		{#if item.description}
			<p class="text-xl">{item.description}</p>
		{/if}
		<!-- <div class="flex">
			{#each links as link}
			<a
				href={`/timeline#${encodeURIComponent(item.title)}`}
				class={`block w-fit ${accent} px-3 py-2 rounded-full text-lg`}
			>
				See more
			</a>
			{/each}
		</div> -->
	</div>
</div>
