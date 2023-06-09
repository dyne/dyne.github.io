<script lang="ts">
	export let title: string;
	export let description: string;
	export let id = '';
	export let contentPadding = true;
	export let cls = "";
</script>

<section class="bg-saccent rounded-3xl text-white py-8 lg:py-12 space-y-8 lg:space-y-12 {cls}" {id}>
	<div class="flex flex-col items-center lg:items-start space-y-8 lg:space-y-0">
		<div class="font-semibold text-3x l lg:text-5xl whitespace-nowrap px-8 lg:px-12 text-background">{title}</div>
		{#if description}
			<div class="text-center lg:text-start text-lg px-8 lg:px-12 w-2/5 leading-tight pt-4 text-background">{description}</div>
		{/if}
	</div>

	<div class={`${contentPadding ? 'px-8 lg:px-12' : 'px-0'}`}>
		<slot />
	</div>
</section>
