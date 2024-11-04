<!-- see https://svelte.dev/tutorial/svelte-self -->
<script lang="ts">
	import { page } from '$app/stores';
	import Leaf from './Leaf.svelte';
	import { leftPanelVisible } from '../Store';
	import ArrowDropDown from '$lib/icons/ArrowDropDown.svelte';
	import ArrowRight from '$lib/icons/ArrowRight.svelte';
	import type { NavTree } from '$lib/tree/NavTree.js';

	export let name: string = '';
	export let path: string = '';
	export let expanded = false;
	export let content: NavTree[];
	let active: boolean;
	$: active = $page.url.pathname === path;
	$: if ($page.url.pathname.startsWith(path)) {
		expanded = true;
	}

	function toggle() {
		// console.log(`arrow drop down clicked`);
		expanded = !expanded;
	}

	function becomingActive() {
		expanded = true;
		$leftPanelVisible = false;
	}

	// TODO add functionality to make arrow keys run through the tree
</script>

<div class="navTree">
	<nav>
		{#if name?.length > 0}
			<span class="textInTree" class:active>
				{#if expanded}
					<span class="xxx" on:click={toggle}><ArrowDropDown /> </span>
					<a href={path} on:click={becomingActive}>{name}</a>
				{:else}
					<span class="xxx" on:click={toggle}><ArrowRight /> </span>
					<a href={path} on:click={becomingActive}>{name}</a>
				{/if}
			</span>
		{/if}

		{#if expanded}
			<ul class:hasName={name?.length > 0}>
				{#each content as part}
					<li>
						{#if part.content}
							<svelte:self {...part} />
						{:else}
							<Leaf {...part} />
						{/if}
					</li>
				{/each}
			</ul>
		{/if}
	</nav>
</div>

<style>
	.navTree {
		margin-left: -0.1em;
		position: relative;
		width: 100%;
		height: 100%;
	}
	.textInTree {
		/*padding: 0 0 0 1.5em;*/
		font-weight: bold;
		cursor: pointer;
		white-space: nowrap;
	}
	.textInTree:hover {
		color: var(--pi-selected-color);
	}
	.textInTree.active a {
		background: var(--theme-colors-active);
		/*color: lavender;*/
		/*font-style: italic;*/
		padding: 0.1em 0.3em 0.1em 0.3em;
		margin-left: -0.3em;
	}
	ul {
		padding: 0 0 0 0em;
		margin: 0 0 0 0.5em;
		list-style: none;
		border-left: none;
	}
	ul.hasName {
		padding: 0 0 0 0.8em;
		margin: 0 0 0 0.5em;
		list-style: none;
		border-left: 1px solid var(--theme-colors-bg_app_bar);
	}
	li {
		padding: 0.1em 0;
	}
	nav a {
		height: 100%;
		align-items: center;
		color: var(--theme-colors-color);
		font-size: 0.9rem;
		transition: color 0.2s linear;
		text-decoration: none;
	}
	a:hover {
		color: var(--pi-selected-color);
	}
	.xxx {
		position: relative;
		/* Adjust these values to get the icons on the same baseline as the text */
		top: 8px;
		left: -3px;
	}
</style>
