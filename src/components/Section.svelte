<script lang="ts">
	export let title: string;
	export let id = '';
	export let contentPadding = true;
	export let cls = '';
</script>

<section {id}>
	<!--
	Dark palette-reactive background.
	Avoid using text-saccent or inverted buttons directly here,
	as they rely on the light page background for contrast.
-->
	<div class="bg-saccent rounded-3xl md:py-12 text-white space-y-8 pb-24 md:space-y-20 {cls}">
		<div class="flex flex-col items-center md:items-start space-y-8 md:space-y-12">
			<h2 class="not-prose !text-white text-center md:text-start font-display font-bold leading-heading text-4xl md:text-5xl whitespace-normal md:align-cente px-8 md:px-12 mt-12">
				{title}
			</h2>
			{#if $$slots.description}
				<div class="not-prose text-center md:text-start px-8 md:px-12 text-xl md:text-2xl font-body leading-body whitespace-normal">
					<slot name="description" />
				</div>
			{/if}
		</div>

		<div class={`${contentPadding ? 'px-8 md:px-12' : 'px-0'}`}>
			<slot />
		</div>
	</div>
	<div id={`out-${id}`} class="h-48 md:hidden" />
</section>
