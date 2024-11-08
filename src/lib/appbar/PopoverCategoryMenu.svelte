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
