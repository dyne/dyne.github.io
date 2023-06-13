<script lang="ts">
	export let title: string;
	export let description: string;
	export let id = '';
	export let contentPadding = true;
	export let cls = '';
</script>

<section {id}>
	<div class="dark:text-white space-y-8 lg:space-y-12 {cls} duration-1000" {id}>
		<div class="flex flex-col items-center lg:items-start space-y-8 lg:space-y-0">
			<div class="font-semibold text-3x text-5xl whitespace-nowrap px-8 pt-4 lg:pt-0 lg:px-12 dark:text-background duration-1000">
				{title}
			</div>
			{#if description}
				<div class="text-center lg:text-start text-lg lg:px-12 lg:w-2/5 leading-tight pt-4 dark:text-background duration-1000">
					{description}
				</div>
			{/if}
		</div>

		<div class={`${contentPadding ? 'px-8 lg:px-12' : 'px-0'}`}>
			<slot />
		</div>
	</div>
</section>
