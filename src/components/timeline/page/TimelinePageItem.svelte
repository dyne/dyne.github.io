<script lang="ts">
	import { timelineColors } from '../colors';
	import type { TimelineItem } from '../dataProcess/parse';

	export let item: TimelineItem;
	const colors = timelineColors[item.type] ?? timelineColors['default'];
	const { bg, accent, border } = colors;

	const isDefault = !Boolean(item.type);
	const isMilestone = item.importance == '0';
	console.log(item);
</script>

<div class="relative pl-6" id={encodeURIComponent(item.title)}>
	{#if item.restOfDate}
		<div
			class={`absolute top-0.5 -left-32 text-primary-light pr-2 w-28 text-right text-xl ${isMilestone ? `pt-4` : ''}`}
		>
			<div>{item.restOfDate}</div>
		</div>
	{/if}
	<div class={`absolute ${isMilestone ? 'top-5' : 'top-1'} -left-3 w-6 h-6 ${accent} rounded-full ring-4 ring-black`} />
	<div
		class={`flex flex-col space-y-4 text-primary-60 rounded-2xl ${isMilestone ? `p-4 border-4 ${border} ${bg}` : ''}`}
	>
		<!-- Base content -->
		<h3 class="text-3xl font-bold text-primary-light font-sans">
			{item.title}
		</h3>
		{#if item.imageUrl}
			<img src={item.imageUrl} class={`bg-primary-light border-4 ${border} w-full rounded-lg`} alt={item.title} />
		{/if}
		{#if item.description}
			<p class="text-xl mb-2">{item.description}</p>
		{/if}
		{#if item.ctaLink1}
			<a
				href={item.ctaLink1}
				class={`${accent} cursor-pointer ${bg} border-2 ${border} hover:bg-saccent hover:text-white hover:border-saccent py-2 px-4 rounded-full w-fit text-xl whitespace-nowrap`}
			>
				{item.cta1}
			</a>
		{/if}
	</div>
</div>
