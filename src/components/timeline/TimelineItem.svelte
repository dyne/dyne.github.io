<script lang="ts">
	import type { TimelineItem } from './dataProcess';

	export let item: TimelineItem;
</script>

<div class="bg-primary-40 text-black rounded-md p-4 space-y-4">
	<h3 class="text-xl font-bold leading-5">{item.title}</h3>
	{#if item.description}
		<p>{item.description}</p>
	{/if}
	{#if item.infoUrl}
		<div class="flex justify-end">
			<div
				class="
				w-10 h-10 shrink-0 rounded-md
				text-black bg-primary-10
				hover:cursor-pointer hover:border-4 hover:border-secondary
				flex items-center justify-center
				"
			>
				<a href={item.infoUrl} target="_blank" rel="noreferrer">[↗]</a>
			</div>
		</div>
	{/if}
</div>
