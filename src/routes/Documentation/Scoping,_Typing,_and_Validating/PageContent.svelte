<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [{ title: 'Scoping, Typing, and Validating', visible: false, ref: '#scoping-typing-and-validating-1' }];
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

	let prevLink = '/Documentation/Defining_an_Editor/The_Parser_Projection';
	let nextLink = '/Documentation/Scoping,_Typing,_and_Validating/Scope_Provider';

	import Note from '$lib/notes/Note.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="scoping-typing-and-validating-1" bind:intersecting={visible[0]}
	>Scoping, Typing, and Validating</SectionComponent
>
<p>
	Because, besides to the concrete syntax, scoping, typing, and validation are important parts of a language definition, Freon provides
	defaults and generation tools for each of them.
</p>
<p>
	Each of the generators take as input yet another definition file and can be run independently. For instance, using one of the following
	commands.
</p>
<pre
	class="language-bash">{@html `<code class="language-bash"><span class="token function">npm</span> run freon scope-it <span class="token parameter variable">-d</span> src/defs <span class="token parameter variable">-o</span> src/<span class="token string">"

npm run freon type-it -d src/defs -o src/"</span>

<span class="token function">npm</span> run freon validate-it <span class="token parameter variable">-d</span> src/defs <span class="token parameter variable">-o</span> src/"</code>`}</pre>
<Note>
	<svelte:fragment slot="header">Incomplete code</svelte:fragment>
	<svelte:fragment slot="content">
		<p>
			Keep in mind that all commands, except <code>all</code>, when used individually (i.e., without combining them with others), produce
			code that may not compile correctly. For example, the <code>scoper</code>
			and <code>validator</code> may depend on the <code>typer</code> and attempt to reference its class, which might not yet be generated.
			Similarly, the <code>editor</code> may try to include the <code>scoper</code>.
		</p>
		<p>
			To avoid such issues, it is best to start with the <code>all</code> command. Once this has been run, you can use specific commands for
			individual aspects of your language as needed. This approach ensures correct dependencies while minimizing regeneration time.
		</p>
	</svelte:fragment>
</Note>

<PrevNextSection {prevLink} {nextLink} />
