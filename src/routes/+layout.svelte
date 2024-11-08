<script lang="ts">
	import AppBar from '$lib/appbar/AppBar.svelte';
	import ThemeContext from '$lib/theming/ThemeContext.svelte';
</script>

<ThemeContext>
	<main class="main-window">
		<AppBar />
		<div class="content-box">
			<slot />
		</div>
	</main>
</ThemeContext>

<style>
	.main-window {
		margin-top: var(--pi-header-height);
		margin-bottom: var(--pi-footer-height);
		position: absolute;
		width: 100%;
		/*height: calc(100% - var(--pi-header-height) - var(--pi-footer-height));*/
		background: var(--theme-colors-bg_color);
	}
	.content-box {
		/*position: relative;*/
		/*width: 100%;*/
		/*height: 100%;*/
		/*padding: 0.5em 1em 0.5em 1em;*/
		/*color: var(--theme-colors-color);*/
		/*background: var(--theme-colors-bg_text_box);*/
		/*box-sizing: border-box;*/
		/*max-width: var(--column-width);*/
		/*margin: 0 auto 0 0;*/
		/*overflow: auto;*/
	}
</style>
