<script lang="ts" is:inLine>
	import { onMount } from 'svelte';
	export let ids = ['id'];
	const idsToHandle = ids.map((id) => `in-${id}`).concat(ids.map((id) => `out-${id}`));

	onMount(() => {
		let previousScrollPosition = 0;

		const handleScroll = () => {
			const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
			const windowHeight = window.innerHeight;
			idsToHandle.forEach((id) => {
				const toBottom = id.split('-')[0] === 'in';
				const component = document.getElementById(id);
				const componentPosition = component.getBoundingClientRect().top;
				const componentBottomPosition = component.getBoundingClientRect().bottom;
				const toggleDarkOrLight = toBottom
					? currentScrollPosition > previousScrollPosition
					: currentScrollPosition < previousScrollPosition;

				const position = toBottom ? componentPosition : componentBottomPosition;

				if (position < windowHeight && position > 0) {
					toggleDarkOrLight
						? document.documentElement.classList.add('dark')
						: document.documentElement.classList.remove('dark');
				}
			});

			previousScrollPosition = currentScrollPosition;
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>
