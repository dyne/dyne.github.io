<script lang="ts">
	export let title: string;
	export let description: string;
	export let id = '';
	export let contentPadding = true;
	export let cls = '';
</script>

<section {id}>
	<div id={`in-${id}`} class="h-48 lg:h-0" />
	<div
		class="lg:bg-saccent bg-transparent lg:rounded-3xl lg:py-12 text-saccent lg:text-white dark:text-white space-y-8 lg:space-y-20 duration-500 {cls}"
		{id}
	>
		<div class="flex flex-col items-center lg:items-start space-y-8 lg:space-y-0">
			<div
				class="font-semibold text-3x text-5xl whitespace-nowrap px-8 pt-4 lg:pt-0 lg:px-12 dark:text-background duration-500"
			>
				{title}
			</div>
			{#if description}
				<div
					class="text-center lg:text-start text-lg lg:px-12 lg:w-2/5 leading-tight pt-4 dark:text-background duration-500"
				>
					{description}
				</div>
			{/if}
		</div>

		<div class={`${contentPadding ? 'px-8 lg:px-12' : 'px-0'}`}>
			<slot />
		</div>
	</div>
	<div id={`out-${id}`} class="h-48 lg:h-0" />
</section>
