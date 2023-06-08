<script lang="ts">
	export let title: string;
	export let id = '';
	export let contentPadding = true;
</script>

<section class="bg-black rounded-3xl text-white py-8 lg:py-12 space-y-8 lg:space-y-12" {id}>
	<!-- <div class="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0"> -->
	<div class="flex flex-col lg:flex-row items-center lg:items-start px-8 lg:px-12 gap-6 lg:gap-8">
		<div class="font-semibold text-4xl lg:text-5xl whitespace-nowrap">{title}</div>
		{#if $$slots.description}
			<div class="text-lg text-center lg:text-start">
				<slot name="description" />
			</div>
		{/if}
	</div>

	<div class={`${contentPadding ? 'px-8 lg:px-12' : 'px-0'}`}>
		<slot />
	</div>
</section>
