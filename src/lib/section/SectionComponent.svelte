<script lang="ts">
	import IntersectionObserver from 'svelte-intersection-observer';
	import type { Snippet } from 'svelte';

	interface ComponentProps {
		children: Snippet;
		intersecting: boolean;
		id: string;
		tag: string;
	}
	let { children, intersecting = $bindable(), id, tag = 'h1' }: ComponentProps = $props();
	let element: HTMLElement | undefined = $state(undefined);
</script>

<IntersectionObserver {element} bind:intersecting threshold={0.5}>
	<div bind:this={element}>
		{#if tag === 'h1'}
			<h1 {id}>{@render children()}</h1>
		{:else}
			<h2 {id}>{@render children()}</h2>
		{/if}
	</div>
</IntersectionObserver>
