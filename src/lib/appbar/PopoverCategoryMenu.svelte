<script lang="ts">
	import {  tutorialToc } from '$lib';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';
	import type { TocContentsType } from '$lib/sidebar/TocContentsType';

	export let id: string;
	export let content: TocContentsType = tutorialToc;
	let divElem: HTMLDivElement;

	export function openContent() {
		divElem.showPopover();
	}
</script>

<div bind:this={divElem} popover="auto" id={id} class="popover-menu">
	<nav>
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions-->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="sub-menu"
			on:click={() => {
				divElem.hidePopover();
			}}
			role="dialog"
		>
			<Sidebar tocContent={content} />
		</div>
	</nav>
	<button class="close-button" popovertarget={id} popovertargetaction="hide">
		<img src="/images/close-icon.png" style="color: red" alt="Freon Logo" height="24px" />
	</button>
</div>
