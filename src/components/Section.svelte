<script lang="ts">
	export let title: string;
	export let description: string;
	export let id = '';
	export let contentPadding = true;
	export let cls = '';
</script>

<section {id}>
	<div class="block lg:hidden h-20 bg-gradient-to-b from-background to-saccent" />
	<div class="bg-saccent lg:rounded-3xl text-white lg:py-12 space-y-8 lg:space-y-12 {cls}" {id}>
		<div class="flex flex-col items-center lg:items-start space-y-8 lg:space-y-0">
			<div class="font-semibold text-3x text-5xl whitespace-nowrap px-8 pt-4 lg:pt-0 lg:px-12 text-background">
				{title}
			</div>
			{#if description}
				<div class="text-center lg:text-start text-lg lg:px-12 lg:w-2/5 leading-tight pt-4 text-background">
					{description}
				</div>
			{/if}
		</div>

		<div class={`${contentPadding ? 'px-8 lg:px-12' : 'px-0'}`}>
			<slot />
		</div>
	</div>
	<div class="block lg:hidden h-20 bg-gradient-to-t from-background to-saccent" />
</section>
