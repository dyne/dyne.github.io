<script lang="ts">
	type SectionVariant = 'primary' | 'secondary' | 'tertiary' | 'surface' | 'structural';

	export let title: string;
	export let id = '';
	export let contentPadding = true;
	export let cls = '';
	// Section is structure/layout only; the variant picks the semantic surface
	// (and its matching foreground) it renders as. Defaults to 'surface' so a
	// new consumer never inherits a colored surface by accident.
	export let variant: SectionVariant = 'surface';

	// 'structural' is a fixed dark structural surface: it renders
	// --color-theme-structural-surface with a white foreground regardless of
	// the active theme (non-theme-reactive, unlike primary/secondary/tertiary/
	// surface, which all flip with Light/Dark). Use it wherever a Section
	// needs to keep a dark presence independent of the site theme. Currently
	// used by Timeline, Our Projects, and Recurring donations.
	const variantClasses: Record<SectionVariant, string> = {
		primary: 'bg-theme-primary-container text-theme-on-primary-container',
		secondary: 'bg-theme-secondary-container text-theme-on-secondary-container',
		tertiary: 'bg-theme-tertiary-container text-theme-on-tertiary-container',
		surface: 'bg-theme-surface-base text-theme-on-surface',
		structural: 'bg-theme-structural-surface text-white',
	};
</script>

<section {id}>
	<!--
	Avoid using text-saccent or inverted buttons directly inside a non-surface
	variant, as they rely on an on-surface foreground for contrast.
-->
	<div class="{variantClasses[variant]} rounded-3xl md:py-12 space-y-8 pb-24 md:space-y-20 {cls}">
		<div class="flex flex-col items-center md:items-start space-y-8 md:space-y-12">
			<h2 class="not-prose text-center md:text-start font-display font-bold leading-heading text-4xl md:text-5xl whitespace-normal md:align-cente px-8 md:px-12 mt-12">
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
