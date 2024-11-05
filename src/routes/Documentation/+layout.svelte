<script lang="ts">
	import { onMount } from 'svelte';
	import TreeView from '$lib/tree/TreeView.svelte';
	import SplitPane from '$lib/splitpane/SplitPane.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import AppBar from '$lib/appbar/AppBar.svelte';
	import ThemeContext from '$lib/theming/ThemeContext.svelte';
	import { miniWindow, menuShown } from '$lib/Store';

	const MAX_WIDTH_SMALL_VIEWPORT = 600;

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
		{#if $miniWindow}
			{#if $menuShown}
				<TreeView />
			{:else}
				<div class="content-box">
					<slot />
				</div>
			{/if}
		{:else}
			<div class="splitpane-container">
				<SplitPane type="horizontal" pos={20}>
					<section class="splitpane-tree" slot="a">
						<TreeView />
					</section>

					<section class="splitpane-content" slot="b">
						<div class="content-box">
							<slot />
						</div>
					</section>
				</SplitPane>
			</div>
		{/if}
		<Footer />
	</main>
</ThemeContext>

<style>
	.main-window {
		/*flex: 1;*/
		margin-top: var(--pi-header-height);
		margin-bottom: var(--pi-footer-height);
		position: absolute;
		width: 100%;
		height: calc(100% - var(--pi-header-height) - var(--pi-footer-height) - 8px);
		box-sizing: border-box;
		background: var(--theme-colors-bg_color);
		/*border: var(--theme-colors-list_divider) 1px solid;*/
		overflow: hidden; /* no scroll bar on main window, instead it should be placed on the children */
	}
	.splitpane-container {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.splitpane-tree {
		position: relative;
		height: 100%;
		box-sizing: border-box;
		/*border: var(--theme-colors-list_divider) 1px solid;*/
	}
	.splitpane-content {
		position: relative;
		height: 100%;
		box-sizing: border-box;
		/*border: var(--theme-colors-list_divider) 1px solid;*/
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
		max-width: var(--column-width);
		margin: 0 auto 0 0;
		overflow: auto;
	}
</style>
