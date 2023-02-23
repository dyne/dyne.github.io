<script lang="ts">
	import TimelineNavButton from './TimelineNavButton.svelte';
	import TimelineNavSeparator from './TimelineNavSeparator.svelte';

	export let steps: Array<string> = [];

	let quarterStep = steps[Math.floor(steps.length / 4)];
	let thirdStep = steps[Math.floor((steps.length / 4) * 3)];
</script>

<div class="flex justify-between px-8 items-center pt-8 space-x-2">
	<TimelineNavButton refId={steps[0]} />
	<TimelineNavSeparator />
	<TimelineNavButton refId={quarterStep} />
	<TimelineNavSeparator />
	<TimelineNavButton refId={thirdStep} />
	<TimelineNavSeparator />
	<TimelineNavButton refId={steps[steps.length - 1]} />
</div>
