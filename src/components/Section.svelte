<script lang="ts">
	export let title: string;
	export let id = '';
	export let contentPadding = true;
	export let cls = '';
</script>

<section {id}>
	<div class="bg-saccent rounded-3xl md:py-12 text-saccent text-white space-y-8 md:space-y-20 {cls}" {id}>
		<div class="flex flex-col items-center md:items-start space-y-8 md:space-y-0">
			<div class="font-semibold text-5xl whitespace-nowrap px-8 pt-4 md:pt-0 md:px-12">
				{title}
			</div>
			{#if $$slots.description}
				<div class="text-center md:text-start md:px-12 text-xl text-inter md:w-3/5 text-inter leading-tight pt-4">
					<slot name="description" />
				</div>
			{/if}
		</div>

		<div class={`${contentPadding ? 'px-8 md:px-12' : 'px-0'}`}>
			<slot />
		</div>
	</div>
</section>
