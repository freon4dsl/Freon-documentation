<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [{ title: 'The Parser Projection', visible: false, ref: '#the-parser-projection-1' }];
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

	let prevLink = '/Documentation/Defining_an_Editor/Styling';
	let nextLink = '/Documentation/Scoping,_Typing,_and_Validating';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="the-parser-projection-1" bind:intersecting={visible[0]}>The Parser Projection</SectionComponent>
<p>
	Freon generates a parser (wrapped in a file reader), and un unparser (wrapped in a file writer), both based on the default projection.
	Because, obviously, the unparser should be able to read the files that were written using the parser, both are based on the same
	projection.
</p>
<p>
	When, however, the default projection is not the one required for reading from, and writing to text files, a separate projection called <code
		>parser</code
	>
	can be used. This projection is never shown in the editor. Like other projections, the parser generation falls back to the default
	projection for a certain concept, when no definition is present in the <code>parser</code> projection set.
</p>
<p>
	Layout, like vertical and horizontal lists, is taken into account as much as possible. Furthermore, typical parse problems like left and
	right recursion are avoided. To be able to do so, Freon uses a parser generator called <a
		href="https://github.com/dhakehurst/net.akehurst.language"
		target="_blank">AGL</a
	>, created by David Akehurst, which is more powerful than most PEG parser generators.
</p>
<p>However, it is still possible to create a projection that cannot be parsed. Please, consider this when writing the parser projection.</p>

<PrevNextSection {prevLink} {nextLink} />
