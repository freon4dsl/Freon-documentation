<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Ease of Editing', visible: false, ref: '#ease-of-editing-1' },
		{ title: 'Reference Shortcuts', visible: false, ref: '#reference-shortcuts-2' },
		{ title: 'Triggers', visible: false, ref: '#triggers-3' }
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

	let prevLink = '/Documentation/Defining_an_Editor/Indentation';
	let nextLink = '/Documentation/Defining_an_Editor/Boolean_Projections';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="ease-of-editing-1" bind:intersecting={visible[0]}>Ease of Editing</SectionComponent>
<p>As language engineer, you can make editing a little bit easier for your users. Freon offers two options to do so.</p>
<SectionComponent tag="h2" id="reference-shortcuts-2" bind:intersecting={visible[1]}>Reference Shortcuts</SectionComponent>
<p>
	In the actual abstract syntax tree, a reference property is stored as a node that holds the information on, and link to, the referred
	node. The type of this node is <code>FreNodeReference</code>. When creating a new reference property, this means that two actions need to
	be executed by Freon. First, the <code>FreNodeReference</code> instance needs to be created, and second, the link needs to be established
	between this <code>FreNodeReference</code> instance and the node that is referred to.
</p>
<p>
	To avoid exposing this two-step process to the user, the language engineer may define a <strong>reference shortcut</strong>. This is a
	property of the concept that is named directly, and when selected by the user causes this two-step process to be performed as one. This
	can be useful, especially when dealing with expressions.
</p>
<p>Our running example provides the expression concept <code>InsurancePartRef</code>.</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-expressions.ast#L54-L57
</span>
<span class="token comment">// Expression used to refer to the insurance parts of a product
</span><span class="token keyword">expression</span> InsurancePartRef <span class="token keyword">base</span> <span class="token class-name">DocuExpression</span> &#123;
    <span class="token keyword">reference</span> part: <span class="token class-name">InsurancePart</span>;
&#125;</code>`}</pre>
<p>For this concept the following projection is defined.</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-expressions-default.edit#L35-L38
</span>
<span class="token class-name">InsurancePartRef</span> &#123;
    <span class="token punctuation">[</span>$&#123;<span class="token function"><span class="token variable">self</span>.part</span>&#125;<span class="token punctuation">]</span>
    <span class="token keyword">referenceShortcut</span> = $&#123;<span class="token function"><span class="token variable">self</span>.part</span>&#125;
&#125;</code>`}</pre>
<SectionComponent tag="h2" id="triggers-3" bind:intersecting={visible[2]}>Triggers</SectionComponent>
<p>
	When the user wants to create an instance of a concept using the keyboard, a special character or string of characters can be used to
	trigger the creation of that instance. This makes it easier to enter an expression in the projectional editor, similar to entering that
	expression in a text-based editor. The character or string of characters is called a <strong>trigger</strong>.
</p>
<p>The example shows a trigger for entering a function call expression.</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-expressions-default.edit#L30-L34
</span>
<span class="token class-name">FunctionCallExpression</span> &#123;
    <span class="token punctuation">[</span>$&#123;<span class="token function">funcDefinition</span>&#125; ( $&#123;<span class="token function">args <span class="token keyword">horizontal</span> <span class="token keyword">separator</span>[,] </span>&#125; )<span class="token punctuation">]</span>
    <span class="token keyword">referenceShortcut</span> = $&#123;<span class="token function">funcDefinition</span>&#125;
    <span class="token keyword">trigger</span> = <span class="token string">"calc"</span>
&#125;</code>`}</pre>

<PrevNextSection {prevLink} {nextLink} />
