<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [{ title: 'Using External Svelte Components', visible: false, ref: '#using-external-svelte-components-1' }];
	let visible: boolean[] = [];
	$: $mySections[0].visible = visible[0];
	import copy from 'copy-to-clipboard';
	import { onMount } from 'svelte';

	/**
	 * This function will go through all the 'pre' elements
	 * on the page and add a copy button to them.
	 * Thanks to: https://slavbasharov.com/blog/adding-click-to-copy-code-markdown-blog
	 */
	onMount(() => {
		const codeBlocks = document.querySelectorAll('pre');
		codeBlocks.forEach((block) => {
			const copyPrompt = document.createElement('div');
			copyPrompt.className = 'copy-prompt';
			const copyPromptText = document.createElement('p');
			copyPromptText.innerHTML = '👆 Click to copy';
			copyPromptText.className = 'copy-prompt-p';
			const copyIcon = document.createElement('img');
			copyIcon.src = '/icons/copy-icon.svg';
			copyIcon.className = 'copy-prompt-img';
			copyPrompt.appendChild(copyIcon);
			copyPrompt.appendChild(copyPromptText);
			block.appendChild(copyPrompt);
			block.querySelector('.copy-prompt > p').addEventListener('click', (evt) => {
				copy(block.querySelector('code').textContent);
				block.querySelector('.copy-prompt > p').innerHTML = 'Copied!';
				setTimeout(() => {
					block.querySelector('.copy-prompt > p').innerHTML = '👆 Click to copy';
				}, 1000);
			});
		});
	});
	import PrevNextSection from '$lib/prevNext/PrevNextSection.svelte';

	let prevLink = '/Examples/Generic_Types/The_Typer_Definition';
	let nextLink = '/Examples/External_Components/The_CourseSchedule_DSL';

	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="using-external-svelte-components-1" bind:intersecting={visible[0]}
	>Using External Svelte Components</SectionComponent
>
<p>
	Freon offers a variety of native <a href="https://svelte.dev/" target="_blank">Svelte</a> components, each associated with one of the box
	types in the <a href="/Documentation/Under_the_Hood/Editor_Framework">editor framework</a>. You can significantly modify the appearance of
	these components by adjusting the <a href="/Documentation/Defining_an_Editor/Styling">styling</a>. However, you can give the editor a
	completely different look, or add custom functionality, by incorporating your own Svelte components, either from a library or custom-made.
	For an introduction, please refer to
	<a href="/Documentation/Customizations/External_Components">customization using external components</a>.
</p>
<p>
	In this extended example, you’ll learn how to use external Svelte components to customize the Freon editor. We will demonstrate how to add
	icons and buttons, use an Accordion component from a library, and create a sorted table component. Since we are already utilizing the <a
		href="https://sveltematerialui.com/"
		target="_blank">SMUI</a
	> UI library in the complementary web application, we’ll be using this library in our example. However, you’re free to choose your own HTML
	library and CSS styling tools.
</p>
<p>
	The source code for this example is available on GitHub, see <a href="/Documentation/Overview/Getting_Started#example-project-startup-2"
		>Getting Started</a
	>. Choose the language called “CourseSchedule”. The files for each phase of the example are in folders called ‘phase1’, ‘phase2’, etc.
</p>
<p>
	When you’re following along with your own IDE, you may notice that after regeneration, the browser sometimes displays an empty page. This
	happens because the browser’s refresh is often faster than the regeneration process. (In the browser’s development tools console, you’ll
	see the message <code>Uncaught SyntaxError: Unexpected end of input</code>.) Don’t worry—just reload the page, and everything will work
	fine.
</p>

<PrevNextSection {prevLink} {nextLink} />
