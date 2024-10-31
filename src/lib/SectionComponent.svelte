<script lang="ts">
	import IntersectionObserver from 'svelte-intersection-observer';

	let element: HTMLElement;
	export let intersecting: boolean;
	export let id: string;
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
