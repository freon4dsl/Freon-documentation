<script lang="ts">
	import ThemeToggle from '$lib/theming/ThemeToggle.svelte';
	import MenuIcon from '$lib/icons/MenuIcon.svelte';
	import GithubLogo from '$lib/icons/GithubLogo.svelte';
	import Tooltip from '../buttons/Tooltip.svelte';
	import { popoverElem } from '$lib/Store.js';
	import PopoverMenu from '$lib/appbar/PopoverMenu.svelte';
	import PopoverCategoryMenu from '$lib/appbar/PopoverCategoryMenu.svelte';
	import { allCategories } from '$lib/sidebar/SidebarContent.js';
	import { SvelteComponent } from 'svelte';

	let catMenu: SvelteComponent[] = [];

	function expandClick(index: number) {
		catMenu[index].openContent();
	}
</script>

<!-- The AppBar is always shown at the top of the viewport -->
<!-- TODO add search mechanism -->

<PopoverMenu />
{#each allCategories as cat, index}
	<PopoverCategoryMenu id="category-{index}" content={cat.toc} bind:this={catMenu[index]} />
{/each}

<div class="app-bar">
	<div class="app-bar-small">
		<!-- this button is shown only when the viewport is small -->
		<!-- it is used to open the left panel which shows the navigator -->
		<Tooltip tip="Hide/show content" bottom>
			<button
				class="app-bar-button"
				on:click={() => {
					$popoverElem.togglePopover();
				}}
			>
				<span class="app-bar-button-content">
					<MenuIcon />
				</span>
			</button>
		</Tooltip>

		<div class="title">Freon</div>
	</div>

	<div class="app-bar-large">
		<a href="https://www.freon4dsl.dev" class="app-bar-linkLogo">
			<Tooltip tip="home" bottom>
				<img src="/freonlogo.png" alt="Freon Logo" height="24" />
			</Tooltip>
		</a>
		<a href="/" class="title">
			<div>Freon</div>
		</a>
		<nav class="app-bar-main-menu">
			{#each allCategories as cat, index}
				<a href={cat.path} class="app-bar-linkLogo">
					<h6>{cat.name}</h6>
				</a>
				<button class="main-menu-small-expand-button" on:click={() => expandClick(index)}>
					<img class="main-menu-small-img" src="/icons/down-chevron-white.png" alt="arrow down" />
				</button>
			{/each}
		</nav>
	</div>

	<span class="app-bar-linkLogo">
		<Tooltip tip="light/dark mode" bottom>
			<ThemeToggle />
		</Tooltip>
	</span>

	<a target="_blank" href="https://github.com/freon4dsl/Freon4dsl.git" class="app-bar-linkLogo">
		<Tooltip tip="github source" bottom>
			<GithubLogo />
		</Tooltip>
	</a>
</div>
