<script lang="ts">
	import { page } from '$app/state';
	import { popoverElem } from '../Store';
	// We import resolve to support GitHub pages. It introduces the 'base' path.
	import { resolve as kitResolve } from '$app/paths';
	// Patch: cast to the actual runtime signature, because the typings are not up to date
	const resolve = kitResolve as unknown as (path: string) => string;

	interface ComponentProps {
		name: string;
		path: string;
	}
	let { name, path }: ComponentProps = $props();

	function becomingActive() {
		$popoverElem.hidePopover();
	}
</script>

<span class="side-bar-entry" class:active={page.url.pathname === path}
	><a class="leafText" class:active={page.url.pathname === path} href={resolve(path)} onclick={becomingActive}>{name}</a></span
>
