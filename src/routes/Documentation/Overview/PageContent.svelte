<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [{ title: 'Welcome, Language Engineer!', visible: false, ref: '#welcome-language-engineer-1' }];
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

	let prevLink = '';
	let nextLink = '/Documentation/Overview/Getting_Started';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="welcome-language-engineer-1" bind:intersecting={visible[0]}>Welcome, Language Engineer!</SectionComponent>
<p>
	Freon is a Language Workbench, a tool for creating mini-languages, which are also known as <a
		href="https://en.wikipedia.org/wiki/Domain-specific*language"
		target="_blank">Domain Specific Languages (DSLs)</a
	>. Freon generates an integrated set of editor, scoper, typer, and validator for your mini-language from a small set of definitions.
	Together we call this the work environment for your language.
</p>
<p>
	The core of Freon is a <strong>TypeScript/JavaScript</strong> framework for building web-based,
	<a href="/Background/Projectional_Editing">projectional</a>
	editors. Editing expressions in a projectional editor is a well-known challenge. What makes the Freon framework unique is the fact that it
	has built-in support for expressions, so you can easily make a projectional editor that allows for a natural manner of editing.
</p>
<p>
	We assume that people who want to use Freon know at least the basics of making mini-languages. For instance, the terms metamodel, abstract
	syntax tree, scope, concrete syntax, parsing, etc., should be familiar. If you are not, please first refer to other sources, for instance
	the book <a href="https://www.manning.com/books/building-user-friendly-dsls" target="_blank">‘Building User-Friendly DSLs’</a> written by
	Meinte Boersma. If you just need to refresh your knowledge, refer to <a href="/Documentation/Terminology">Freon Terminology</a>.
	Furthermore, a little knowledge of UML will come in handy, but this is not a true requirement.
</p>
<p>
	To be clear about the distinction, on this site, when we address the Freon user, we call him/her a <strong>language engineer</strong>. The
	people that will be using the generated work environment are simply called <strong>users</strong>.
</p>
<p>
	So welcome, language engineer, to the world of Freon. This documentation is meant for you. It explains how Freon can help you in creating
	a language, and building a work environment for it. If you have questions that are not answered in this documentation, please get in
	contact with the Freon team, for instance via email at <em>info AT freon4dsl.dev</em>.
</p>
<p><strong>Have fun!</strong></p>

<PrevNextSection {prevLink} {nextLink} />
