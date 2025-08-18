<script lang="ts">
	import { tutorialToc } from '$lib';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';
	import type { TocContentsType } from '$lib/sidebar/TocContentsType';

	interface ComponentProps {
		id: string;
		content: TocContentsType;
		divElem: HTMLDivElement;
	}
	let { id, content = tutorialToc, divElem = $bindable() }: ComponentProps = $props();
</script>

<div bind:this={divElem} popover="auto" {id} class="popover-menu">
	<nav>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="sub-menu"
			onclick={() => {
				divElem.hidePopover();
			}}
			role="dialog"
			tabindex="0"
		>
			<Sidebar tocContent={content} />
		</div>
	</nav>
	<button class="close-button" popovertarget={id} popovertargetaction="hide">
		<img src="/icons/close-icon.png" style="color: red" alt="Freon Logo" height="24px" />
	</button>
</div>
