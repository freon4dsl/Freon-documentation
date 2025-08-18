<!-- An svg as reusable svelte component -->
<!-- Content: material ui menu icon -->

<script lang="ts">
	interface ComponentProps {
		height?: number;
		width?: number;
		fill?: string;
		background?: string;
	}
	let { height = 24, width = 24, fill = 'var(--color1)', background = 'var(--color6)' }: ComponentProps = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="{width}px" height="{height}px" viewBox="0 0 {width} {height}" {fill}>
	<path d="M0 0h24v24H0z" fill={background} />
	<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
</svg>
