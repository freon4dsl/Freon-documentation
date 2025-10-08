<script lang="ts">
	import { page } from '$app/stores';
	import { popoverElem } from '../Store';
	interface ComponentProps {
		name: string;
		path: string;
	}
	let { name, path }: ComponentProps = $props();

	function becomingActive() {
		$popoverElem.hidePopover();
	}
</script>

<span class="side-bar-entry" class:active={$page.url.pathname === path}
	><a class="leafText" class:active={$page.url.pathname === path} href={path} onclick={becomingActive}>{name}</a></span
>
