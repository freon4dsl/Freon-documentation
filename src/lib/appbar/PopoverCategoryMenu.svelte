<script lang="ts">
	import { popoverCategoryElem } from '$lib';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';
	import { category } from '$lib';
	import type { TocContentsType } from '$lib/sidebar/TocContentsType';

	let content: TocContentsType;
	$: {
		content = $category;
	}
</script>

<div bind:this={$popoverCategoryElem} popover="auto" id="category-menu" class="popover-menu">
	<nav>
		<div
			class="sub-menu"
			on:click={() => {
				$popoverCategoryElem.hidePopover();
			}}
			role="dialog"
		>
			<Sidebar tocContent={content} />
		</div>
	</nav>
	<button class="close-button" popovertarget="category-menu" popovertargetaction="hide">
		<img src="/images/close-icon.png" style="color: red" alt="Freon Logo" height="24px" />
	</button>
</div>

<style>
	.popover-menu {
		background-color: var(--theme-colors-bg_color);
		overflow: auto;
	}
	.sub-menu {
		margin-left: 1.5rem;
	}
	[popover] {
		position: relative;
		border: solid 1px var(--theme-colors-accent);
		border-radius: 3px;
		box-shadow: var(--pi-popup-box-shadow);
		inset: var(--pi-header-height) 10px auto 10px;
		padding: 4px;
		width: calc(100vw - 20px);
		& nav {
			display: flex;
			flex-direction: column;
			font-size: 1.2rem;
			font-weight: bold;
			gap: 4px;
			& .img-container {
				border-top: solid 1px var(--theme-colors-accent);
				/*border-bottom: solid 1px var(--theme-colors-accent);*/
			}
			margin-bottom: 20px;
		}
	}
	::backdrop {
		/* for popover element */
		background: #0004;
		backdrop-filter: blur(2px);
	}
	.close-button {
		border: solid 1px var(--theme-colors-bg_color);
		padding: 0;
		position: absolute;
		inset: 4px 4px auto auto;
	}
</style>
