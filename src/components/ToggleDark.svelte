<script lang="ts" is:inLine>
	import { onMount } from 'svelte';
	export let id = 'id';
	export let toBottom = true;
	let previousScrollPosition = 0;
	onMount(() => {
		const handleScroll = () => {
			const component = document.getElementById(id);
			const componentPosition = component.getBoundingClientRect().top;
			const componentBottomPosition = component.getBoundingClientRect().bottom;
			const windowHeight = window.innerHeight;
			const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
			const toggleDarkOrLight = toBottom
				? currentScrollPosition > previousScrollPosition
				: currentScrollPosition < previousScrollPosition;

			const position = toBottom ? componentPosition : componentBottomPosition;

			if (position < windowHeight && position > 0) {
				toggleDarkOrLight
					? document.documentElement.classList.add('dark')
					: document.documentElement.classList.remove('dark');
			}
			previousScrollPosition = currentScrollPosition;
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div {id} class="h-96" />
