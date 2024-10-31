<script lang="ts">
	import { miniWindow, leftPanelVisible, versionNumber } from '$lib/Store';
	import ThemeToggle from '$lib/theming/ThemeToggle.svelte';
	import MenuIcon from '$lib/icons/MenuIcon.svelte';
	import Button from '../buttons/Button.svelte';
	import GithubLogo from '$lib/icons/GithubLogo.svelte';
	import Tooltip from '../buttons/Tooltip.svelte';
</script>

<!-- The AppBar is always shown at the top of the viewport -->
<!-- TODO add search mechanism -->

<div class="app-bar">
	{#if $miniWindow}
		<!-- this button is shown only when the viewport is small -->
		<!-- it is used to open the left panel which shows the navigator -->
		<!-- the title is also smaller in a small viewport		-->
		<Tooltip tip="Hide/show content tree" bottom>
			<Button
				on:click={() => {
					$leftPanelVisible = !$leftPanelVisible;
				}}
				icon={true}
			>
				<MenuIcon />
			</Button>
		</Tooltip>

		<div class="title">Freon Docs</div>
	{:else}
		<div class="title">Freon Documentation (version {versionNumber})</div>
	{/if}

	<span class="linkLogo">
		<Tooltip tip="dark mode" bottom>
			<ThemeToggle />
		</Tooltip>
	</span>

	<a target="_blank" href="https://github.com/freon4dsl/Freon4dsl.git" alt="Freon on GitHub" class="linkLogo">
		<Tooltip tip="github source" bottom>
			<GithubLogo />
		</Tooltip>
	</a>

	{#if !$miniWindow}
		<!-- TODO change images for dark mode -->
		<!-- normally, the brand icon is shown-->

		<a target="_blank" href="https://www.freon4dsl.dev" class="linkLogo">
			<Tooltip tip="home" bottom>
				<img src="/freonlogo.png" style="color:red" alt="Freon Logo" height="24" />
			</Tooltip>
		</a>
	{/if}
</div>

<style>
	.linkLogo {
		margin-right: 8px;
		margin-left: 8px;
	}
	.app-bar {
		display: flex;
		align-items: center;
		height: var(--pi-header-height);
		color: var(--theme-colors-text_app_bar);
		background: var(--theme-colors-bg_app_bar);
		font-size: var(--pi-header-font-size);
		line-height: 1;
		min-width: inherit;
		padding: 0 4px 0 6px;
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		z-index: 20;
	}
	.title {
		flex: 1;
		margin-left: 0.5rem;
		white-space: nowrap;
		text-align: center;
		color: var(--theme-colors-inverse_color);
	}

	img {
		max-width: 180px;
		max-height: calc(var(--pi-header-height) - 5px);
		margin-top: 3px;
		margin-bottom: 3px;
		margin-left: auto;
		margin-right: 10px;
	}
</style>
