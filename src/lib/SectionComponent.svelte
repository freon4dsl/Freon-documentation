<script>
	import IntersectionObserver from 'svelte-intersection-observer';

	let element;
	export let intersecting;
	export let id;
</script>

<IntersectionObserver {element} bind:intersecting threshold={0.5}>
	<div bind:this={element} class="viewed">
		<h2 {id}><slot /></h2>
	</div>
</IntersectionObserver>

<style>
	.viewed {
		background-color: #376462;
		color: #fff;
		margin: 20px;
	}
</style>
