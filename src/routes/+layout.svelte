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
