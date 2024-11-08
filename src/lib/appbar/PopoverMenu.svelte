<script lang="ts">
	import { allCategories, popoverElem } from '$lib';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';
	import type { SidebarContentType } from '$lib/appbar/SidebarContentType';


	let sideBarContent: SidebarContentType[] = [];

	allCategories.forEach(cat => {
		sideBarContent.push({title: cat.name, tocContent: cat.toc, showDetails: false});
	})

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

<div bind:this={$popoverElem} popover='auto' id='main-menu' class='popover-menu'>
	<nav >
		{#each sideBarContent as content, index}
		<span class='img-container'>
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions-->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span class='menu-item'  role='contentinfo' on:click={() => {$popoverElem.hidePopover()}}>{content.title}</span>
			<button class='side-bar-expand-button' on:click={() => {changeDetails(index)}  }>
			{#if content.showDetails }
				<img class='side-bar-img' src="/images/upload.png" alt="arrow up"/>
			{:else}
				<img class='side-bar-img' src="/images/down-arrow.png" alt="arrow down"/>
			{/if}
			</button>
		</span>
		{#if content.showDetails }
			<div class='sub-menu'>
				<Sidebar tocContent={content.tocContent} />
			</div>
		{/if}
			{/each}

	</nav>
	<button class='close-button' popovertarget='main-menu' popovertargetaction='hide'>
		<img src="/images/close-icon.png" style="color: red" alt="Freon Logo" height="24px"/>
	</button>
</div>

<style>
		.side-bar-expand-button {
        margin-right: 32px;
        background: none;
        border: solid 1px var(--theme-colors-bg_color);
		}
		.img-container {
				display: flex;
				align-items: baseline;
        margin: 16px 4px 0px 8px;
		}
		.side-bar-img {
        max-width: 1rem;
        max-height: 1rem;
		}
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
    ::backdrop { /* for popover element */
        background: #0004;
        backdrop-filter: blur(2px);
    }
    .close-button {
        border: solid 1px var(--theme-colors-bg_color);
        padding: 0;
        position: absolute;
        inset: 4px 4px auto auto;
    }
    .menu-item {
        color: var(--theme-colors-color);

        margin: 0px 4px 0px 8px;
        padding: 8px 0px 8px 4px;
				flex: 4;
    }
</style>
