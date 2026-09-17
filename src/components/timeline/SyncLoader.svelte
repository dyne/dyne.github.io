<script lang="ts">
	export let color = '#FF3E00';
</script>

<div class="loader" aria-label="Loading" role="status" style={`--loader-color: ${color}`}>
	<span></span><span></span><span></span>
</div>

<style>
	.loader {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 60px;
		width: 60px;
	}
	.loader span {
		width: 15px;
		height: 15px;
		margin: 2px;
		border-radius: 50%;
		background-color: var(--loader-color);
		animation: sync 0.6s ease-in-out infinite alternate both;
	}
	.loader span:nth-child(2) { animation-delay: 0.06s; }
	.loader span:nth-child(3) { animation-delay: 0.12s; }
	@keyframes sync {
		33% { transform: translateY(10px); }
		66% { transform: translateY(-10px); }
		100% { transform: translateY(0); }
	}
	@media (prefers-reduced-motion: reduce) {
		.loader span { animation-play-state: paused; }
	}
</style>
