<script lang="ts">
	import { page } from '$app/stores';
	import { popoverElem } from '../Store';
	export let name: string;
	export let path: string;

	function becomingActive() {
		$popoverElem.hidePopover();
	}
</script>

<span class:active={$page.url.pathname === path}
	><a class="leafText" class:active={$page.url.pathname === path} href={path} on:click={becomingActive}>{name}</a></span
>

<style>
	span {
		padding: 0 0 0 0.5rem;
		background: 0 0.1rem no-repeat;
		background-size: 1rem 1rem;
		white-space: nowrap;
	}
	span.active a {
		background: var(--theme-colors-active);
		padding: 0.1rem 0.3rem 0.1rem 0.3rem;
		margin-left: -0.3rem;
	}
	.leafText {
		color: var(--theme-colors-color);
		font-size: 0.9rem;
		text-decoration: none;
		transition: color 0.2s linear;
	}
	.leafText:hover {
		color: var(--theme-colors-accent);
	}
</style>
