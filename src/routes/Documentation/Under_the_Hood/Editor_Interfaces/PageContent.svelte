<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'The Freon Editor Interfaces', visible: false, ref: '#the-freon-editor-interfaces-1' },
		{ title: 'FreProjection', visible: false, ref: '#freprojection-2' },
		{ title: 'FreAction', visible: false, ref: '#freaction-3' },
		{ title: 'FreExpression', visible: false, ref: '#freexpression-4' },
		{ title: 'FreBinaryExpression', visible: false, ref: '#frebinaryexpression-5' }
	];
	let visible: boolean[] = [];
	$: $mySections[0].visible = visible[0];
	$: $mySections[1].visible = visible[1];
	$: $mySections[2].visible = visible[2];
	$: $mySections[3].visible = visible[3];
	$: $mySections[4].visible = visible[4];
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

	let prevLink = '/Documentation/Under_the_Hood/Core_Interfaces';
	let nextLink = '/Documentation/Under_the_Hood/FreTool_Interfaces';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="the-freon-editor-interfaces-1" bind:intersecting={visible[0]}>The Freon Editor Interfaces</SectionComponent>
<p>
	There are two series of interfaces that make Freon and its generated code extensible and flexible. The first series are the
	xref:../tools-interfaces/tools-interfaces-intro[interfaces of the generated code].
</p>
<p>The second series of interfaces are those that define the editor framework:</p>
<SectionComponent tag="h2" id="freprojection-2" bind:intersecting={visible[1]}>FreProjection</SectionComponent>
<p>The projection from your model/AST is defined by implementing the <em>FreProjection</em> interface:</p>
<pre class="language-ts">{@html `<code class="language-ts"><span class="token comment">/* File: core/src/editor/FreProjection.ts  */</span>

<span class="token comment">/**
 * Interface for a custom projection.
 */</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">FreProjection</span> <span class="token punctuation">&#123;</span>
	<span class="token comment">// Name of the custom projection</span>
	name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

	<span class="token comment">// A map from the name of the concept (or the freLanguageConcept() of the FreElement node) to</span>
	<span class="token comment">// the function that may return the custom box for a node of that type.</span>
	nodeTypeToBoxMethod<span class="token operator">:</span> Map<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>node<span class="token operator">:</span> FreNode<span class="token punctuation">)</span> <span class="token operator">=></span> Box<span class="token operator">></span><span class="token punctuation">;</span>

	<span class="token comment">// A map from the name of the concept (or the freLanguageConcept() of the FreElement node) to</span>
	<span class="token comment">// the function that may return the custom box for a node of that type.</span>
	nodeTypeToTableDefinition<span class="token operator">:</span> Map<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> FreTableDefinition<span class="token operator">></span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<p>
	Implementing this interface should return a <em>Box</em> for each <code>element</code> in the AST. Freon includes boxes of various types
	(textual, tabular, horizontal or vertical collections, etc.) to define this projection. The box model is further described in the
	<a href="/Documentation/Under_the_Hood/Editor_Framework#projection-layout-based-on-boxes-3">editor framework</a>.
</p>
<SectionComponent tag="h2" id="freaction-3" bind:intersecting={visible[2]}>FreAction</SectionComponent>
<p>An object that implements <code>FreCombinedActions</code></p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">/* File: core/src/editor/FreCombinedActions.ts */</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">FreCombinedActions</span> <span class="token punctuation">&#123;</span>
	binaryExpressionActions<span class="token operator">:</span> FreCreateBinaryExpressionAction<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

	customActions<span class="token operator">:</span> FreCustomAction<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<SectionComponent tag="h2" id="freexpression-4" bind:intersecting={visible[3]}>FreExpression</SectionComponent>
<p>An object that implements <code>FreExpression</code></p>
<pre class="language-ts">{@html `<code class="language-ts"><span class="token comment">/* File: core/src/language/FreExpression.ts */</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">FreExpression</span> <span class="token keyword">extends</span> <span class="token class-name">FreElement</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span></code>`}</pre>
<SectionComponent tag="h2" id="frebinaryexpression-5" bind:intersecting={visible[4]}>FreBinaryExpression</SectionComponent>
<p>
	An object that implements <code>FreBinaryExpression</code> is a node in the model AST. It represents an expression that has exactly two operands,
	which are usually written to the left and right of the operator symbol. For example, ‘4+5’.
</p>
<p>
	This interface extends the <a href="/Documentation/Under_the_Hood/Editor_Interfaces#freexpression-4"><code>FreExpression</code></a> interface.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">/* File: core/src/language/FreBinaryExpression.ts */</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">FreBinaryExpression</span> <span class="token keyword">extends</span> <span class="token class-name">FreExpression</span> <span class="token punctuation">&#123;</span>
    <span class="token function">piLeft</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> FreExpression<span class="token punctuation">;</span>

    <span class="token function">piSetLeft</span><span class="token punctuation">(</span>left<span class="token operator">:</span> FreExpression<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>

    <span class="token function">piRight</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> FreExpression<span class="token punctuation">;</span>

    <span class="token function">piSetRight</span><span class="token punctuation">(</span>right<span class="token operator">:</span> FreExpression<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>

    <span class="token function">piPriority</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>
 <span class="token operator">*</span><span class="token operator">/</span></code>`}</pre>
<p>In both series the following two interfaces are used:</p>
<ul>
	<li><a href="/Documentation/Under_the_Hood/Core_Interfaces#fre-node-1">FreElement</a></li>
	<li><a href="/Documentation/Under_the_Hood/Core_Interfaces#fre-named-node-2">FreNamedElement</a></li>
</ul>

<PrevNextSection {prevLink} {nextLink} />
