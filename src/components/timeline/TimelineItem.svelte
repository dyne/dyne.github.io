<script lang="ts">
	import type { TimelineItem } from './dataProcess/parse';

	export let item: TimelineItem;
</script>

<div class="relative rounded-md py-4">
	<div class="absolute left-0 -top-3 w-6 h-6 bg-primary rounded-full" />
	<div class="pt-3 space-y-3">
		<h3 class="text-xl font-bold leading-5 text-primary">
			{#if item.infoUrl}
				<a class="underline" href={item.infoUrl} target="_blank" rel="noreferrer">
					{item.title}
				</a>
			{:else}
				{item.title}
			{/if}
		</h3>
		{#if item.description}
			<p>{item.description}</p>
		{/if}
		<!-- {#if item.infoUrl}
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
		{/if} -->
	</div>
</div>
