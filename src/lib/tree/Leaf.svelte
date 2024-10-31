<script lang="ts">
	import { page } from '$app/stores';
	import { leftPanelVisible } from '../Store';
	import { get } from 'svelte/store';
	export let name: string;
	export let path: string;

	function becomingActive() {
		$leftPanelVisible = false;
	}
</script>

<span class:active={$page.url.pathname === path}
	><a class="leafText" class:active={$page.url.pathname === path} href={path} on:click={becomingActive}>{name}</a></span
>

<style>
	span {
		padding: 0 0 0 0.5em;
		background: 0 0.1em no-repeat;
		background-size: 1em 1em;
		white-space: nowrap;
	}
	span.active a {
		background: var(--theme-colors-active);
		padding: 0.1em 0.3em 0.1em 0.3em;
		margin-left: -0.3em;
	}
	.leafText {
		height: 100%;
		align-items: center;
		color: var(--theme-colors-color);
		font-size: 0.9rem;
		text-decoration: none;
		transition: color 0.2s linear;
	}
	.leafText:hover {
		color: var(--theme-colors-accent);
	}
</style>
