<script lang="ts">
	export let title: string;
	export let description: string;
	export let id = '';
	export let contentPadding = true;
	export let cls = '';
</script>

<section {id}>
	<div id={`in-${id}`} class="h-48 md:hidden" />
	<div
		class="md:bg-saccent bg-transparent md:rounded-3xl md:py-12 text-saccent md:text-white dark:text-white space-y-8 md:space-y-20 duration-500 {cls}"
		{id}
	>
		<div class="flex flex-col items-center md:items-start space-y-8 md:space-y-0">
			<div
				class="font-semibold text-5xl whitespace-nowrap px-8 pt-4 md:pt-0 md:px-12 dark:text-background duration-500"
			>
				{title}
			</div>
			{#if description}
				<div
					class="text-center md:text-start md:px-12 text-xl text-inter md:w-3/5 text-inter leading-tight pt-4 dark:text-background duration-500"
				>
					{description}
				</div>
			{/if}
		</div>

		<div class={`${contentPadding ? 'px-8 md:px-12' : 'px-0'}`}>
			<slot />
		</div>
	</div>
	<div id={`out-${id}`} class="h-48 md:hidden" />
</section>
