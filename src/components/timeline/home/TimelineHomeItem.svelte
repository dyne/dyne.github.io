<script lang="ts">
	import { timelineColors } from '../colors';
	import type { TimelineItem } from '../dataProcess/parse';

	export let item: TimelineItem;
	const { bg, accent, border } = timelineColors[item.type] ?? timelineColors['default'];

	const isDefaultBackground = accent == timelineColors.default.accent;
</script>

<div class="relative py-6 select-none">
	<div class={`absolute left-0 -top-3 w-6 h-6 ${accent} rounded-full ring-4 ring-black`} />
	<div class={`h-[300px] w-[280px] rounded-2xl border ${border} overflow-hidden flex flex-col items-stretch`}>
		<!-- Base content -->
		<h3 class={`p-4 pb-1 text-xl text-gray-200 font-bold leading-6 ${bg} shrink-0`}>
			{item.title}
		</h3>
		<div class="space-y-3 text-white relative p-4 h-0 grow overflow-hidden">
			{#if item.description}
				<p class="text-gray-400 text-xl">{item.description}</p>
				<div class="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-[var(--secondary-accent-color)]" />
			{/if}
			<div class={`absolute bottom-0 left-0 w-full h-full ${bg}`} />
		</div>
		<div class={`${bg} p-4 shrink-0`}>
			<a
				href={`/timeline#${encodeURIComponent(item.title)}`}
				class={`block w-fit ${accent} px-3 py-2 rounded-full text-lg ${
					isDefaultBackground ? 'text-black' : 'text-white'
				}`}
			>
				See more
			</a>
		</div>
	</div>
</div>
