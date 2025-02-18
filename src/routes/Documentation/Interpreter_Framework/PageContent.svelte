<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Interpreter Framework', visible: false, ref: '#interpreter-framework-1' },
		{ title: 'What is an Interpreter', visible: false, ref: '#what-is-an-interpreter-2' }
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

	let prevLink = '/Documentation/Scoping,_Typing,_and_Validating/Validator';
	let nextLink = '/Documentation/Interpreter_Framework/The_Expressions_DSL';

	import Note from '$lib/notes/Note.svelte';
	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="interpreter-framework-1" bind:intersecting={visible[0]}>Interpreter Framework</SectionComponent>
<p>Freon includes an interpreter framework which makes it easy to write an interpreter for a language.</p>
<Note
	><svelte:fragment slot="header">The Interpreter Framework is still in Development</svelte:fragment>
	<svelte:fragment slot="content">
		<p>
			The use of an interpreter in the Freon editor is still in development. Foremost, the presentation of the results is likely to change.
			With this in mind, the interpreter framework is already usable.
		</p>
	</svelte:fragment></Note
>
<SectionComponent tag="h2" id="what-is-an-interpreter-2" bind:intersecting={visible[1]}>What is an Interpreter</SectionComponent>
<p>
	Most articles on interpreters you will find start by describing lexers and parsers and as a final step evaluation. Forget about lexers,
	parsers, those are only needed when you start with plain text. Because we use a projectional editor, in Freon we have the AST of our model
	already available and do not need to parse text to get the AST.
</p>
<p>
	The interpreter in Freon helps to calculate something based on the AST of the model. The general way to build an interpreter is as
	follows:
</p>
<pre class="language-freon">{@html `<code class="language-freon">Select the start node you want to evaluate
   If the node has children/parts
      Evaluate the parts 
      Evaluate the node, using the evaluated value of the parts
   else if the node is a leaf
      Evaluate the node</code>`}</pre>
<p>Take the following AST as an example.</p>
<Figure imageName={'interpreter/plus-tree.png'} caption={'AST for Plus Expression'} figureNumber={1} />
<p>Let’s evaluate the multiply (*) node.</p>
<ul>
	<li>
		We need to first evaluate the two children (+ and 5)
		<ul>
			<li>
				Evaluate the plus (+) node, we need to evaluate the children first.
				<ul>
					<li>Evaluate the “3” node, resulting in the value 3</li>
					<li>Evaluate the “4” node, resulting in the value 4</li>
				</ul>
			</li>
			<li>Evaluate the plus based on the result of the children, result is 7</li>
			<li>Evaluate the “5” node resulting in 5.</li>
		</ul>
	</li>
	<li>Evaluate multiply of 6 and 5, result is 30</li>
</ul>

<PrevNextSection {prevLink} {nextLink} />
