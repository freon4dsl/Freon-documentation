<script>
	export let tooltiptext;
	export let button;
</script>

<div class="tooltip">
	{button}
	<span class="tooltiptext">{tooltiptext}</span>
</div>

<style>
	/* Tooltip container */
	.tooltip {
		position: relative;
		display: inline-block;
		border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
	}

	/* Tooltip text */
	.tooltip .tooltiptext {
		visibility: hidden;
		width: 100px;
		background-color: var(--theme-colors-bg_color);
		color: var(--theme-colors-tooltip_color);
		text-align: center;
		padding: 5px 0;
		border-radius: 6px;

		/* Position the tooltip text */
		position: absolute;
		z-index: 1;

		/* show at the bottom */
		top: 100%;
		left: 50%;
		margin-left: -50px; /* Use half of the width (100/2 = 50), to center the tooltip */

		/* Fade in tooltip */
		opacity: 0;
		transition: opacity 0.3s;
	}

	/* Tooltip arrow */
	.tooltip .tooltiptext::after {
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
		border-color: transparent transparent var(--theme-colors-inverse_color) transparent;
	}

	/* Show the tooltip text when you mouse over the tooltip container */
	.tooltip:hover .tooltiptext {
		visibility: visible;
		opacity: 1;
	}
</style>
