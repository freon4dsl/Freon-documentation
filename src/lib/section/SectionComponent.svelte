<script lang="ts">
	import IntersectionObserver from 'svelte-intersection-observer';
	import type { Snippet } from 'svelte';

	interface ComponentProps {
		children: Snippet;
		intersecting?: boolean;
		id: string;
		tag?: string;
		onIntersectChange?: (visible: boolean) => void;
	}

	let { children, intersecting = $bindable(), id, tag = 'h1', onIntersectChange }: ComponentProps = $props();
	let element: HTMLElement | undefined = $state(undefined);

	// Dispatch event when visibility changes
	function handleIntersectChange(e: CustomEvent<{ isIntersecting: boolean }>) {
		onIntersectChange?.(e.detail.isIntersecting);
	}
</script>

<IntersectionObserver {element} bind:intersecting on:observe={handleIntersectChange}>
	<div bind:this={element}>
		{#if tag === 'h1'}
			<h1 {id}>{@render children()}</h1>
		{:else}
			<h2 {id}>{@render children()}</h2>
		{/if}
	</div>
</IntersectionObserver>
