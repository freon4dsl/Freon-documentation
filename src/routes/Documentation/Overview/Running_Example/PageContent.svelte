<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [{ title: 'Example Used Across the Documentation', visible: false, ref: '#example-used-across-the-documentation-1' }];
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

	let prevLink = '/Documentation/Overview/Getting_Started';
	let nextLink = '/Documentation/Creating_the_Metamodel';

	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="example-used-across-the-documentation-1" bind:intersecting={visible[0]}
	>Example Used Across the Documentation</SectionComponent
>
<p>
	In order to provide examples in this section of the website, we have created an example DSL called
	<em>Insurance</em>. This example is consistently applied across all pages in this section of the website. Therefore, it is good to know up
	front what this DSL is all about. You can find the complete sources of the DSL in the samples directory in the <code>master</code> branch
	of our GitHub project at <a href="https://github.com/freon4dsl/Freon" target="_blank"> https://github.com/freon4dsl/Freon</a>.
</p>
<p>
	The gist of the <em>Insurance</em> language is that it defines two types of units. One unit holds set of parts of insurance products for a
	single theme, like ‘Home’, or ‘Health’. This set is called a <code>BaseProduct</code>. The second contains a complete insurance product
	that consists of a number of insurance parts from one or more <code>BaseProducts</code>. This is called an
	<code>InsuranceProduct</code>.
</p>
<p>
	An <code>InsuranceProduct</code> has an expression called <code>calculation</code> that describes the expected cost of this product. To
	simplify this expression helpers function may be defined. Each of these is called a <code>CalcFunction</code>.
</p>
<p>The following figure shows a UML class diagram of the concepts in the language.</p>
<Figure imageName={'documentation/docu-project-uml.png'} caption={'UML diagram of Insurance Project'} figureNumber={1} />

<PrevNextSection {prevLink} {nextLink} />
