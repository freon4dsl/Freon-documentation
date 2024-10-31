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

<style>
	.tooltip {
		visibility: hidden;
		position: absolute;
		z-index: 1;
		width: 120px;
		text-align: center;
		border-radius: 6px;
		white-space: nowrap;
		/*padding: 5px 0;*/ /* no padding, otherwise the arrow will not line up to the tooltip */
		/*display: inline-block;*/
		/* Fade in tooltip */
		transition: opacity 0.3s;
		opacity: 0;
	}
	.tooltip-wrapper {
		position: relative;
		display: inline-block;
	}
	.default-tip {
		display: inline-block;
		padding: 4px 12px 8px 12px;
		border-radius: 6px;
	}
	.tooltip.top {
		width: 120px;
		bottom: 100%;
		left: 50%;
		/*margin-left: -60px; !* Use half of the width (120/2 = 60), to center the tooltip *!*/
		transform: translate(-50%, -100%);
	}
	.tooltip.bottom {
		width: 120px;
		top: 100%;
		left: 50%;
		/*margin-left: -60px; !* Use half of the width (120/2 = 60), to center the tooltip *!*/
		transform: translate(-50%, 100%);
	}
	.tooltip.left {
		top: -5px;
		right: 105%;
		transform: translateX(-100%);
	}
	.tooltip.right {
		top: -5px;
		left: 105%;
		transform: translateX(100%);
	}
	.tooltip.active {
		opacity: 1;
		visibility: initial;
	}
	/* Show the tooltip text when you mouse over the tooltip slot */
	.tooltip-slot:hover + .tooltip {
		opacity: 1;
		visibility: initial;
	}
	/* Tooltip arrow */
	.tooltip.bottom::after {
		content: ' ';
		position: absolute;
		bottom: 100%; /* At the top of the tooltip */
		left: 50%;
		/* The border-width property specifies the size of the arrow.
				If you change this, also change the margin-left value to the same.
				This will keep the arrow centered. */
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;
		/* The border-color is used to transform the content into an arrow. We set one side to color, and the rest to transparent.
				If all sides were color, you would end up with a colored square box. We set the bottom border color. */
		border-color: transparent transparent var(--theme-colors-tooltip_background) transparent;
	}
	.tooltip.right::after {
		content: ' ';
		position: absolute;
		top: 50%;
		right: 100%; /* To the left of the tooltip */
		margin-top: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: transparent var(--theme-colors-tooltip_background) transparent transparent;
	}
	.tooltip.left::after {
		content: ' ';
		position: absolute;
		top: 50%;
		left: 100%; /* To the right of the tooltip */
		margin-top: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: transparent transparent transparent var(--theme-colors-tooltip_background);
	}
	.tooltip.top::after {
		content: ' ';
		position: absolute;
		bottom: 100%; /* At the top of the tooltip */
		left: 50%;
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: transparent transparent var(--theme-colors-tooltip_background) transparent;
	}
</style>
