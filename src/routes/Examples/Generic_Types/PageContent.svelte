<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Generic Types: an Example Typer Definition', visible: false, ref: '#generic-types-an-example-typer-definition-1' },
		{ title: 'The Example Language', visible: false, ref: '#the-example-language-2' }
	];
	let visible: boolean[] = [];
	$: $mySections[0].visible = visible[0];
	$: $mySections[1].visible = visible[1];
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

	let prevLink = '/Examples/Building_an_Interpreter/Finishing_the_Test';
	let nextLink = '/Examples/Generic_Types/The_TyperExample_DSL';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="generic-types-an-example-typer-definition-1" bind:intersecting={visible[0]}
	>Generic Types: an Example Typer Definition</SectionComponent
>
<p>This example shows how generic types and unit of measurements can be defined.</p>
<SectionComponent tag="h2" id="the-example-language-2" bind:intersecting={visible[1]}>The Example Language</SectionComponent>
<p>
	The language is very simple, its units consists of lists of <em>expression</em> - <em>declared type</em> pairs. Ultimately, we want to compare
	the declared type with the type of the expression. Below is an example of a model unit of this language.
</p>
<pre class="language-txt">{@html `<code class="language-txt">UnitA correctExps

12 : NUMBER;
"string" : STRING;
2345: NUMBER;
"this is a large string": STRING;
true : BOOLEAN;
false: BOOLEAN;

Set&#123; true, true, false &#125; : Set&lt;BOOLEAN>;
Bag &#123; Set &#123; 12, 13, 14 &#125;, Set &#123; 12, 13, 14, 15, 16 &#125; &#125; : Bag&lt;Set&lt;NUMBER>>;

124 Meters : Meters&lt;NUMBER>;
45 kWh : kWh&lt;NUMBER>;</code>`}</pre>
<p>Next the metamodel of this language will be explained.</p>

<PrevNextSection {prevLink} {nextLink} />
