<script>
import { popoverElem } from '$lib';
import { documentationToc } from '$lib/sidebar/SidebarContent.ts';
import Sidebar from '$lib/sidebar/Sidebar.svelte';
</script>

<div bind:this={$popoverElem} popover='auto' id='main-menu' class='popover-menu'>
	<nav >
		<p class='menu-item' on:click={() => {$popoverElem.hidePopover()} }>Documentation</p>
		<div class='sub-menu'>
			<Sidebar tocContent={documentationToc} />
		</div>
		<p class='menu-item' on:click={() => {$popoverElem.hidePopover()} }>Tutorial</p>
		<div class='sub-menu'>
			<Sidebar tocContent={documentationToc} />
		</div>
		<p class='menu-item' on:click={() => {$popoverElem.hidePopover()} }>Examples</p>
		<div class='sub-menu'>
			<Sidebar tocContent={documentationToc} />
		</div>
		<p class='menu-item' on:click={() => {$popoverElem.hidePopover()} }>Demo</p>
		<div class='sub-menu'>
			<Sidebar tocContent={documentationToc} />
		</div>
		<p class='menu-item' on:click={() => {$popoverElem.hidePopover()} }>Guidelines</p>
		<div class='sub-menu'>
			<Sidebar tocContent={documentationToc} />
		</div>
	</nav>
	<button class='close-button' popovertarget='main-menu' popovertargetaction='hide'>
		<img src="/images/close-icon.png" style="color: red" alt="Freon Logo" height="24px"/>
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
            & .menu-item {
                border-top: solid 1px var(--theme-colors-accent);
                border-bottom: solid 1px var(--theme-colors-accent);
                &:last-child {
                    border-bottom: none;
                }
            }
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
        inset: 10px 10px auto auto;
    }
    .menu-item {
        color: var(--theme-colors-color);
        margin: 16px 4px 0px 8px;
        padding: 8px 0px 8px 4px;
    }
</style>
