<script lang="ts">
	import { page } from '$app/stores';
	import { popoverElem } from '../Store';
	export let name: string;
	export let path: string;

	function becomingActive() {
		$popoverElem.hidePopover();
	}
</script>

<span class='side-bar-entry' class:active={$page.url.pathname === path}
	><a class="leafText" class:active={$page.url.pathname === path} href={path} on:click={becomingActive}>{name}</a></span
>
