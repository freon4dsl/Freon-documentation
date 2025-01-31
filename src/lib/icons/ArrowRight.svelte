<!-- An svg as reusable svelte component -->
<!-- Content: material ui arrow right icon -->

<script lang="ts">
	export let height: number = 24;
	export let width: number = 24;
	export let fill: string = 'var(--color5)';
</script>

<svg xmlns="http://www.w3.org/2000/svg" height="{height}px" viewBox="0 0 24 24" width="{width}px" {fill}>
	<path d="M10 17l5-5-5-5v10z" />
	<path d="M0 24V0h24v24H0z" fill="none" />
</svg>
