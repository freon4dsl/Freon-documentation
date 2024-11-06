export const layoutContent: string =
`<script lang="ts">
	import { mySections } from './SectionStore.js';
	import type { Section } from '$lib/SectionType.js';
	import { onMount } from 'svelte';
	import AppBar from '$lib/appbar/AppBar.svelte';
	import ThemeContext from '$lib/theming/ThemeContext.svelte';
	import { MAX_WIDTH_SMALL_VIEWPORT, menuShown, miniWindow } from '$lib/Store';
	import TreeView from '$lib/tree/TreeView.svelte';
	import Footer from '$lib/footer/Footer.svelte';

	onMount(async () => {
		// correct layout for the size of the window
		onResize();
	});

	async function onResize() {
		let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

		if (width > MAX_WIDTH_SMALL_VIEWPORT) {
			// console.log(\`setting miniWindow to false: \${width}\`);
			miniWindow.set(false);
		} else {
			// console.log(\`setting miniWindow to true: \${width}\`);
			miniWindow.set(true);
		}
	}

	$: current = getCurrent($mySections);

	function getCurrent(internalSections: Section[]): number {
		let previous = current;
		for (let i = 0; i < internalSections.length; i++) {
			if (internalSections[i].visible) {
				return i;
			}
		}
		return previous;
	}
</script>

<svelte:window on:resize={onResize} />

<ThemeContext>
	<main class="main-window">
		<AppBar />
		{#if $miniWindow}
			{#if $menuShown}
				<TreeView />
			{:else}
				<div class="content-box">
					<div class="page-main">
						<div class="page-column-left">
							<slot />
						</div>
						<div class="page-column-right">
							<nav class="page-side-nav">
								<h3>On this page</h3>
								<ul class="page-ul">
									{#each $mySections as sec, index}
										<li class="page-li">
											<a class:page-visible={index === current} class:page-nonvisible={index !== current} href={sec.ref}> {sec.title} </a>
										</li>
									{/each}
								</ul>
							</nav>
						</div>
					</div>
				</div>
			{/if}
		{:else}
			<div class="splitpane-container">
					<section class="splitpane-tree">
						<TreeView />
					</section>

					<section class="splitpane-content">
						<div class="content-box">
							<div class="page-main">
								<div class="page-column-left">
									<slot />
								</div>
								<div class="page-column-right">
									<nav class="page-side-nav">
										<h3>On this page</h3>
										<ul class="page-ul">
											{#each $mySections as sec, index}
												<li class="page-li">
													<a class:page-visible={index === current} class:page-nonvisible={index !== current} href={sec.ref}>
														{sec.title}
													</a>
												</li>
											{/each}
										</ul>
									</nav>
								</div>
							</div>
						</div>
					</section>
			</div>
		{/if}
		<Footer />
	</main>
</ThemeContext>
`;
