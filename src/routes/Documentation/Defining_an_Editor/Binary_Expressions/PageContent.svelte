<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Binary Expressions', visible: false, ref: '#binary-expressions-1' },
		{ title: 'Symbols', visible: false, ref: '#symbols-2' }
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

	let prevLink = '/Documentation/Defining_an_Editor/Projections_for_Limited_Concepts';
	let nextLink = '/Documentation/Defining_an_Editor/Global_Projections';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="binary-expressions-1" bind:intersecting={visible[0]}>Binary Expressions</SectionComponent>
<p>
	In <a href="/Documentation/Defining_an_Editor">Defining an Editor</a> it was already mentioned that projections cannot be specified for
	<em>binary expression concepts</em>. The editor offers specialized support for binary expressions, which cannot function properly if a
	user-defined projection is applied.
</p>
<SectionComponent tag="h2" id="symbols-2" bind:intersecting={visible[1]}>Symbols</SectionComponent>
<p>
	You can, however, indicate the string to be used as operand. This string is called the <strong>symbol</strong>. It is defined in the
	<code>.edit</code> file, as shown below.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-expressions-default.edit#L18-L29
</span>
<span class="token class-name">MinusExpression</span>  &#123;
    <span class="token keyword">symbol</span> = <span class="token string">"-"</span>
&#125;
<span class="token class-name">PlusExpression</span> &#123;
    <span class="token keyword">symbol</span> = <span class="token string">"+"</span>
&#125;
<span class="token class-name">MultiplyExpression</span> &#123;
    <span class="token keyword">symbol</span> = <span class="token string">"*"</span>
&#125;
<span class="token class-name">DivideExpression</span> &#123;
    <span class="token keyword">symbol</span> = <span class="token string">"/"</span>
&#125;</code>`}</pre>

<PrevNextSection {prevLink} {nextLink} />
