<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Projections to be used Globally', visible: false, ref: '#projections-to-be-used-globally-1' },
		{ title: 'Boolean Projections', visible: false, ref: '#boolean-projections-2' },
		{ title: 'Projections for Limited Concepts', visible: false, ref: '#projections-for-limited-concepts-3' },
		{ title: 'Projections for Numbers', visible: false, ref: '#projections-for-numbers-4' },
		{ title: 'Reference Separator', visible: false, ref: '#reference-separator-5' },
		{ title: 'Adding Names of External Components', visible: false, ref: '#adding-names-of-external-components-6' }
	];
	let visible: boolean[] = [];
	$: $mySections[0].visible = visible[0];
	$: $mySections[1].visible = visible[1];
	$: $mySections[2].visible = visible[2];
	$: $mySections[3].visible = visible[3];
	$: $mySections[4].visible = visible[4];
	$: $mySections[5].visible = visible[5];
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

	let prevLink = '/Documentation/Defining_an_Editor/Binary_Expressions';
	let nextLink = '/Documentation/Defining_an_Editor/Buttons';

	import Note from '$lib/notes/Note.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="projections-to-be-used-globally-1" bind:intersecting={visible[0]}
	>Projections to be used Globally</SectionComponent
>
<p>
	For some concrete syntax elements you may provide a global definition, i.e. these definitions to be used everywhere in the editor. Note
	that this can be done once in the complete set of editors, only in the <em>default</em> editor definition. However, the global definitions
	can be overwritten per property.
</p>
<p>
	All global projection definitions need to be within curly brackets (<code>&#123;&#125;</code>) prefixed with the keyword
	<code>global</code>.
</p>
<SectionComponent tag="h2" id="boolean-projections-2" bind:intersecting={visible[1]}>Boolean Projections</SectionComponent>
<p>
	The keywords to be used for the boolean <em>true</em> and <em>false</em> values can be defined globally, or you can choose to display
	boolean values as a boolean control. Every option described in
	<a href="/Documentation/Defining_an_Editor/Boolean_Projections">Boolean Projections</a> is allowed.
</p>
<p>
	In the example below, the user will view every boolean property as an inner-switch button with the string <code>YES</code> for the value
	<code>true</code>, and <code>NO</code> for the value <code>false</code>.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// Insurance/src/defs/editor-main-default.edit#L5-L18</span>

global <span class="token punctuation">&#123;</span>
    <span class="token builtin">boolean</span> inner<span class="token operator">-</span><span class="token keyword">switch</span> <span class="token punctuation">[</span><span class="token constant">YES</span> <span class="token operator">|</span> <span class="token constant">NO</span><span class="token punctuation">]</span> <span class="token comment">// the strings used to display a boolean value, all booleans will default be displayed as an inner switch control</span>
<span class="token comment">//    limited radio</span>
<span class="token comment">//    limited[] checkbox</span>
    <span class="token comment">// number slider  // you can use the slider control as default projection for numbers, but this will not often be the preferred option</span>
    referenceSeparator <span class="token punctuation">[</span><span class="token operator">:</span><span class="token punctuation">]</span> <span class="token comment">// the string that separates the names in a path name, e.g. pack1:cls3:part</span>
    external <span class="token punctuation">&#123;</span>
        AnimatedGif<span class="token punctuation">,</span>
        SMUI_Card<span class="token punctuation">,</span>
        SMUI_Accordion<span class="token punctuation">,</span>
        SMUI_Dialog<span class="token punctuation">,</span>
        DatePicker
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<SectionComponent tag="h2" id="projections-for-limited-concepts-3" bind:intersecting={visible[2]}
	>Projections for Limited Concepts</SectionComponent
>
<p>
	To indicate global definitions for limited concepts you can use the keywords <code>limited</code> and <code>limited[]</code> for single
	valued properties and multivalued properties respectively. The keyword(s) must be followed by the options available for limited concepts,
	as described in <a href="/Documentation/Defining_an_Editor/Projections_for_Limited_Concepts">Projections for Limited Concepts</a>.
</p>
<SectionComponent tag="h2" id="projections-for-numbers-4" bind:intersecting={visible[3]}>Projections for Numbers</SectionComponent>
<p>
	To indicate global definitions for properties with type <code>number</code> you can use the keyword <code>number</code>. The keyword must
	be followed by the options available for numbers, as described in
	<a href="/Documentation/Defining_an_Editor/Number_Projections">Number Projections</a>.
</p>
<SectionComponent tag="h2" id="reference-separator-5" bind:intersecting={visible[4]}>Reference Separator</SectionComponent>
<p>
	References to other objects may consist of a series of names, like <em>country.city.street.house</em>. The string used to separate these
	names (in the example above ”.”) can be set.
</p>
<SectionComponent tag="h2" id="adding-names-of-external-components-6" bind:intersecting={visible[5]}
	>Adding Names of External Components</SectionComponent
>
<p>
	Freon offers the possibility to include Svelte components that are defined outside of Freon. These components are called <a
		href="/Documentation/Customizations/External_Components"><em>external</em></a
	>. All names of external components need to be declared in the <code>global</code> section.
</p>

<PrevNextSection {prevLink} {nextLink} />
