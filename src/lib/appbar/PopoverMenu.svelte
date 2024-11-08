<script lang="ts">
	import { allCategories, popoverElem } from '$lib';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';
	import type { SidebarContentType } from '$lib/appbar/SidebarContentType';

	let sideBarContent: SidebarContentType[] = [];

	allCategories.forEach((cat) => {
		sideBarContent.push({ title: cat.name, tocContent: cat.toc, showDetails: false });
	});

	function changeDetails(index: number) {
		for (let i = 0; i < 5; i++) {
			if (i === index) {
				sideBarContent[i].showDetails = !sideBarContent[i].showDetails;
			} else {
				sideBarContent[i].showDetails = false;
			}
		}
	}
</script>

<div bind:this={$popoverElem} popover="auto" id="main-menu" class="popover-menu">
	<nav>
		{#each sideBarContent as content, index}
			<span class="img-container">
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions-->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span
					class="menu-item"
					role="contentinfo"
					on:click={() => {
						$popoverElem.hidePopover();
					}}>{content.title}</span
				>
				<button
					class="side-bar-expand-button"
					on:click={() => {
						changeDetails(index);
					}}
				>
					{#if content.showDetails}
						<img class="side-bar-img" src="/images/upload.png" alt="arrow up" />
					{:else}
						<img class="side-bar-img" src="/images/down-arrow.png" alt="arrow down" />
					{/if}
				</button>
			</span>
			{#if content.showDetails}
				<div class="sub-menu">
					<Sidebar tocContent={content.tocContent} />
				</div>
			{/if}
		{/each}
	</nav>
	<button class="close-button" popovertarget="main-menu" popovertargetaction="hide">
		<img src="/images/close-icon.png" style="color: red" alt="Freon Logo" height="24px" />
	</button>
</div>
