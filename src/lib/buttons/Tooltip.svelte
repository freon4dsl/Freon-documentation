<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ComponentProps {
		children: Snippet;
		tip: string;
		top?: boolean;
		right?: boolean;
		bottom?: boolean;
		left?: boolean;
		active?: boolean;
		color?: string;
		bgColor?: string;
	}
	let {
		children,
		tip = '',
		top = false,
		right = false,
		bottom = false,
		left = false,
		active = false,
		color = 'var(--color-accent)',
		bgColor = 'var(--color5)'
	}: ComponentProps = $props();

	let style = `background-color: ${bgColor}; color: ${color}; font-size: 0.7rem;`;
</script>

<div class="tooltip-wrapper">
	<span class="tooltip-slot">
		{@render children()}
	</span>
	<div class="tooltip" class:active class:left class:right class:bottom class:top>
		{#if tip}
			<div class="default-tip" {style}>{tip}</div>
		{/if}
	</div>
</div>
