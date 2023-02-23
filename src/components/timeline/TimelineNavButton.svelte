<script lang="ts">
	export let refId: string = '';

	function scrollMagic() {
		const main = document.getElementById('timeline-main');
		const el = document.getElementById(refId);
		const x = el.offsetLeft;
		main.scrollTo({ left: x, behavior: 'smooth' });
	}
</script>

<button on:click={scrollMagic} class="px-3 py-2 rounded-md bg-primary-80 text-black shrink-0">{refId}</button>
