<!-- The AppBar is always shown at the top of the viewport -->
<!-- TODO add search mechanism -->

<div class="app-bar">
	{#if $miniWindow}
		<!-- this button is shown only when the viewport is small -->
		<!-- it is used to open the left panel which shows the navigator -->
		<!-- the title is also smaller in a small viewport		-->
		<Tooltip tip="Hide/show content tree" bottom>
		<Button on:click={() => {$leftPanelVisible = !$leftPanelVisible;}} icon={true}>
			<MenuIcon />
		</Button>
		</Tooltip>

		<div class="title">Freon Docs</div>
	{:else}
		<div class="title">Freon Documentation (version {versionNumber})</div>
	{/if}

	<span class='linkLogo'>
		<Tooltip tip="dark mode" bottom>
			<ThemeToggle />
		</Tooltip>
	</span>

	<a target="_blank" href="https://github.com/projectit-org/ProjectIt" alt="Freon/ProjectIt on GitHub" class='linkLogo'>
		<Tooltip tip="github source" bottom>
			<GithubLogo />
		</Tooltip>
	</a>

	{#if !$miniWindow}
		<!-- TODO change images for dark mode -->
		<!-- normally, the brand icon is shown-->

		<a target="_blank" href="https://www.projectit.org" class='linkLogo'>
<!--			// use global var ==> hack instead of using svg for projectit logo-->
			<Tooltip tip="home" bottom>
			{#if $darkMode}
				<img src="/projectit-logo.png"  style="color:red" alt="ProjectIt Logo" height='24'>
			{:else}
				<img src="/projectit-logo-inverse-colors.png"  style="color:red" alt="ProjectIt Logo" height='24'>
			{/if}
			</Tooltip>
		</a>

	{/if}

</div>

<script lang="ts">
	import { miniWindow, leftPanelVisible, versionNumber } from '../Store';
	import ThemeToggle from '../theming/ThemeToggle.svelte';
	import MenuIcon from '../icons/MenuIcon.svelte';
	import Button from '../buttons/Button.svelte';
	import GithubLogo from '../icons/GithubLogo.svelte';
	import { darkMode } from '../Store';
	import Tooltip from '../buttons/Tooltip.svelte';

</script>

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

	img{
		max-width: 180px;
		max-height: calc(var(--pi-header-height) - 5px);
		margin-top: 3px;
		margin-bottom: 3px;
		margin-left: auto;
		margin-right: 10px;
	}
</style>
