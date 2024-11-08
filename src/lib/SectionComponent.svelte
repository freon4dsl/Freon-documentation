<script lang="ts">
	import IntersectionObserver from 'svelte-intersection-observer';

	let element: HTMLElement;
	export let intersecting: boolean;
	export let id: string;
	export let tag: string = 'h1';
</script>

<IntersectionObserver {element} bind:intersecting threshold={0.5}>
	<div bind:this={element}>
		{#if tag === 'h1'}
			<h1 {id}><slot /></h1>
		{:else}
			<h2 {id}><slot /></h2>
		{/if}
	</div>
</IntersectionObserver>
