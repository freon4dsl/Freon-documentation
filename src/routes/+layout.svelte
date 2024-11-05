<script lang="ts">
	import { onMount } from 'svelte';
	import AppBar from '$lib/appbar/AppBar.svelte';
	import ThemeContext from '$lib/theming/ThemeContext.svelte';
	import { MAX_WIDTH_SMALL_VIEWPORT, menuShown, miniWindow } from '$lib/Store';
	import TreeView from '$lib/tree/TreeView.svelte';

	onMount(async () => {
		// correct layout for the size of the window
		onResize();
	});

	async function onResize() {
		let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

		if (width > MAX_WIDTH_SMALL_VIEWPORT) {
			// console.log(`setting miniWindow to false: ${width}`);
			miniWindow.set(false);
		} else {
			// console.log(`setting miniWindow to true: ${width}`);
			miniWindow.set(true);
		}
	}
</script>

<svelte:window on:resize={onResize} />

<ThemeContext>
	<main class="main-window">
		<AppBar />
		{#if $menuShown}
			<TreeView />
		{/if}
		<div class="content-box">
			<slot />
		</div>
	</main>
</ThemeContext>

<style>
	.main-window {
		margin-top: var(--pi-header-height);
		margin-bottom: var(--pi-footer-height);
		width: 100%;
		box-sizing: border-box;
		background: var(--theme-colors-bg_text_box);
		overflow: hidden; /* no scroll bar on main window, instead it should be placed on the children */
	}
	.content-box {
		position: relative;
		width: 100%;
		height: 100%;
		padding: 0.5em 1em 0.5em 1em;
		color: var(--theme-colors-color);
		background: var(--theme-colors-bg_text_box);
		box-sizing: border-box;
		margin: 0 auto 0 0;
		overflow: auto;
	}
</style>
