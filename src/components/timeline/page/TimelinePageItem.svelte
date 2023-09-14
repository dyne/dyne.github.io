<script lang="ts">
	import { onMount } from 'svelte';
	import { timelineColors } from '../colors';
	import type { TimelineItem } from '../dataProcess/parse';

	export let item: TimelineItem;

	const colors = timelineColors[item.type] ?? timelineColors['default'];
	const { bg, accent, border } = colors;

	const isDefault = !Boolean(item.type);
	const isMilestone = item.importance == '0';

	/* Scrolling behavior */

	const anchorId = encodeURIComponent(item.title);
	const anchor = window.location.hash.substring(1);
	const isAnchor = anchorId == anchor;

	let thisEl: HTMLDivElement;

	onMount(() => {
		if (!isAnchor) return;
		const headerOffset = 45;
		const elementPosition = thisEl.getBoundingClientRect().top;
		const offsetPosition = elementPosition + window.scrollY - headerOffset;

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth',
		});
	});
</script>

<div bind:this={thisEl} id={anchorId} class="relative pl-6 font-sans">
	{#if item.restOfDate}
		<div
			class={`hidden md:block absolute top-0.5 -left-32 text-primary-light pr-2 w-28 text-right text-xl ${
				isMilestone ? `pt-4` : ''
			}`}
		>
			<div>{item.restOfDate}</div>
		</div>
	{/if}
	<div class={`absolute ${isMilestone ? 'top-5' : 'top-1'} -left-3 w-6 h-6 ${accent} rounded-full ring-4 ring-black`} />
	<div
		class={`flex flex-col space-y-5 text-primary-60 rounded-2xl ${isMilestone ? `p-4 border-4 ${border} ${bg}` : ''}`}
	>
		<!-- Base content -->
		<h3 class="text-3xl font-bold text-primary-light font-sans">
			{item.title}
		</h3>
		{#if item.restOfDate}
			<div class={`text-primary-light text-xl`}>
				<div>{item.restOfDate}</div>
			</div>
		{/if}
		{#if item.imageUrl}
			<img src={item.imageUrl} class={`bg-primary-light border-4 ${border} w-full rounded-lg`} alt={item.title} />
		{/if}
		{#if item.description}
			<p class="text-xl mb-2">{item.description}</p>
		{/if}
		{#if item.location}
			<div class="flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-7 w-7 mr-1"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M0 6.8871C0 3.3596 2.8596 0.5 6.3871 0.5C9.91459 0.5 12.7742 3.3596 12.7742 6.8871C12.7742 9.79993 10.4191 12.9565 8.3699 15.7032C7.62633 16.6998 6.92302 17.6425 6.3871 18.5C5.85117 17.6425 5.14786 16.6998 4.40429 15.7032C2.35505 12.9565 0 9.79993 0 6.8871ZM6.375 10.25C8.23896 10.25 9.75 8.73896 9.75 6.875C9.75 5.01104 8.23896 3.5 6.375 3.5C4.51104 3.5 3 5.01104 3 6.875C3 8.73896 4.51104 10.25 6.375 10.25Z"
						fill="currentColor"
					/>
				</svg>
				<div class="text-xl">{item.location}</div>
			</div>
		{/if}
		<div class="flex gap-2">
			{#if item.ctaLink1}
				<a
					href={item.ctaLink1}
					class={`${accent} cursor-pointer ${bg} border-2 ${border} hover:bg-saccent hover:text-white hover:border-saccent py-2 px-4 rounded-full w-fit text-xl whitespace-nowrap`}
				>
					{item.cta1}
				</a>
			{/if}
			{#if item.ctaLink2}
				<a
					href={item.ctaLink2}
					class={`${accent} cursor-pointer ${bg} border-2 ${border} hover:bg-saccent hover:text-white hover:border-saccent py-2 px-4 rounded-full w-fit text-xl whitespace-nowrap`}
				>
					{item.cta2}
				</a>
			{/if}
			{#if item.ctaLink3}
				<a
					href={item.ctaLink3}
					class={`${accent} cursor-pointer ${bg} border-2 ${border} hover:bg-saccent hover:text-white hover:border-saccent py-2 px-4 rounded-full w-fit text-xl whitespace-nowrap`}
				>
					{item.cta3}
				</a>
			{/if}
		</div>
	</div>
</div>
