<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Creating the Metamodel', visible: false, ref: '#creating-the-metamodel-1' },
		{ title: 'Every Language has a Name', visible: false, ref: '#every-language-has-a-name-2' }
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

	let prevLink = '/Documentation/Overview/Running_Example';
	let nextLink = '/Documentation/Creating_the_Metamodel/Language_Structure';

	import Note from '$lib/notes/Note.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="creating-the-metamodel-1" bind:intersecting={visible[0]}>Creating the Metamodel</SectionComponent>
<p>
	The metamodel, or abstract syntax tree (AST), of the language is described in files with the extension <code>.ast</code>. All files with
	this extension in the <a href="/Documentation/Overview/Getting_Started#template-project-startup-3"><em>defs</em> folder</a> (i.e. the folder
	were you keep your definition files) are combined into one AST definition.
</p>
<SectionComponent tag="h2" id="every-language-has-a-name-2" bind:intersecting={visible[1]}>Every Language has a Name</SectionComponent>
<p>
	Every AST file must start with the declaration of the name of your language. This name is used to create the name of a number of generated
	TypeScript classes.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L1-L2
</span>
language InsuranceModel
</code>`}</pre>
<p>
	The Freon language structure, which describes the abstract syntax tree (AST), consists of a single <a
		href="/Documentation/Creating_the_Metamodel/Language_Structure#Model">Model</a
	>, combined with a list of
</p>
<ul>
	<li><a href="/Documentation/Creating_the_Metamodel/Language_Structure#Model_Unit">Model Units</a>,</li>
	<li><a href="/Documentation/Creating_the_Metamodel/Language_Structure#Concept">Concepts</a>,</li>
	<li><a href="/Documentation/Creating_the_Metamodel/Language_Structure#Expression_Concept">Expression Concepts</a>,</li>
	<li><a href="/Documentation/Creating_the_Metamodel/Language_Structure#Binary_Expression_Concept">Binary Expression Concepts</a>,</li>
	<li><a href="/Documentation/Creating_the_Metamodel/Language_Structure#Limited_Concept">Limited Concepts</a>, and/or</li>
	<li><a href="/Documentation/Creating_the_Metamodel/Language_Structure#Interface">Interfaces</a>.</li>
</ul>
<p>Each of these will be explained in the next section.</p>

<PrevNextSection {prevLink} {nextLink} />
