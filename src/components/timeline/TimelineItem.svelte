<script lang="ts">
	import type { TimelineItem } from './dataProcess/parse';

	export let item: TimelineItem;
</script>

<div class="relative rounded-md py-6">
	<div class="absolute left-0 -top-3 w-6 h-6 bg-primary rounded-full" />
	<div class="p-3 space-y-2 bg-primary-light rounded-md">
		<div class="space-y-3">
			<div>
				<h3 class="text-xl font-bold leading-6 text-black">
					{item.title}
				</h3>
				{#if item.restOfDate}
					<p class="text-gray-500">{item.restOfDate}</p>
				{/if}
			</div>
			{#if item.description}
				<p class="text-black">{item.description}</p>
			{/if}
		</div>
		{#if item.infoUrl}
			<div class="flex justify-end">
				<div
					class="
				w-10 h-10 shrink-0 rounded-md
				text-black bg-primary-60
				hover:cursor-pointer hover:border-4 hover:border-secondary
				flex items-center justify-center
				"
				>
					<a href={item.infoUrl} target="_blank" rel="noreferrer">[↗]</a>
				</div>
			</div>
		{/if}
	</div>
</div>
