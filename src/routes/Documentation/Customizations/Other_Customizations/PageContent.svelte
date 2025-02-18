<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Other Customizations', visible: false, ref: '#other-customizations-1' },
		{ title: 'The Reader and Writer', visible: false, ref: '#the-reader-and-writer-2' },
		{ title: 'The Standard Library', visible: false, ref: '#the-standard-library-3' }
	];
	let visible: boolean[] = [];
	$: $mySections[0].visible = visible[0];
	$: $mySections[1].visible = visible[1];
	$: $mySections[2].visible = visible[2];
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

	let prevLink = '/Documentation/Customizations/Validator_Customization';
	let nextLink = '/Documentation/CommandLine';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="other-customizations-1" bind:intersecting={visible[0]}>Other Customizations</SectionComponent>
<SectionComponent tag="h2" id="the-reader-and-writer-2" bind:intersecting={visible[1]}>The Reader and Writer</SectionComponent>
<p>
	The reader (parser) and writer (unparser) can not yet be customized <strong>per concept</strong>. Instead, you can replace the whole
	reader or writer by one you create yourself. The new reader needs to implement the
	<a href="/Documentation/Under_the_Hood/FreTool_Interfaces#frereader-6"><code>FreReader</code></a>
	interface. The new writer needs to implement the
	<a href="/Documentation/Under_the_Hood/FreTool_Interfaces#frewriter-7"><code>FreWriter</code></a> interface.
</p>
<SectionComponent tag="h2" id="the-standard-library-3" bind:intersecting={visible[2]}>The Standard Library</SectionComponent>
<p>
	The standard library class provides an entry point for all predefined elements in the DSL. It holds all instances of limited concepts as
	defined in the language definition file. The generated standard library uses the singleton pattern to ensure that only one instance of the
	class is present.
</p>
<p>
	Customization can be done by replacing the generated Typescript class. The new standard library should implement the <a
		href="/Documentation/Under_the_Hood/FreTool_Interfaces#frestdlib-8"><code>FreStdlib</code></a
	> interface.
</p>

<PrevNextSection {prevLink} {nextLink} />
