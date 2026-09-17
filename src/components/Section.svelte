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
	<div class="bg-saccent rounded-3xl md:py-12 text-white space-y-8 md:space-y-20 {cls}">
		<div class="flex flex-col items-center md:items-start space-y-8 md:space-y-0">
			<h2 class="font-semibold text-5xl whitespace-nowrap px-8 pt-4 md:pt-0 md:px-12">
				{title}
			</h2>
			{#if $$slots.description}
				<div class="text-center md:text-start md:px-12 text-xl font-prose md:w-3/5 leading-relaxed pt-4">
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
