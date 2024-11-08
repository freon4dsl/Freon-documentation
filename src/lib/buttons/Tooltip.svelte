<script>
	export let tip = '';
	export let top = false;
	export let right = false;
	export let bottom = false;
	export let left = false;
	export let active = false;
	export let color = 'var(--theme-colors-tooltip_color)';
	export let bgColor = 'var(--theme-colors-tooltip_background)';
	let style = `background-color: ${bgColor}; color: ${color} font-size: .4em`;
</script>

<div class="tooltip-wrapper">
	<span class="tooltip-slot">
		<slot />
	</span>
	<div class="tooltip" class:active class:left class:right class:bottom class:top>
		{#if tip}
			<div class="default-tip" {style}>{tip}</div>
		{:else}
			<slot name="custom-tip" />
		{/if}
	</div>
</div>
