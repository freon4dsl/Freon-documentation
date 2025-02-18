<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'The Expressions DSL', visible: false, ref: '#the-expressions-dsl-1' },
		{ title: 'Numeric Expressions', visible: false, ref: '#numeric-expressions-2' },
		{ title: 'Functions', visible: false, ref: '#functions-3' }
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

	let prevLink = '/Documentation/Interpreter_Framework';
	let nextLink = '/Documentation/Interpreter_Framework/Understanding_the_Framework';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="the-expressions-dsl-1" bind:intersecting={visible[0]}>The Expressions DSL</SectionComponent>
<p>
	Before explaining the interpreter framwework, we take a look at the following simple DSL, which will be used as an example. It is defined
	with a single model unit called <code>ExpressionUnit</code> that contains both function definitions and expressions. You can check out
	this language by creating a new Freon project with <code>npm create Freon</code> and then selecting the <code>Expressions</code> language.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Expressions/src/defs/Expressions.ast#L1-L11
</span>
language Expressions

<span class="token keyword">model</span> <span class="token class-name">Expressions</span> &#123;
    name: <span class="token builtin">identifier</span>;
    units: <span class="token class-name">ExpressionUnit</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
&#125;

<span class="token keyword">modelunit</span> <span class="token class-name">ExpressionUnit</span> &#123;
    functions: <span class="token class-name">Function</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    expressions: <span class="token class-name">Expression</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
&#125;</code>`}</pre>
<SectionComponent tag="h2" id="numeric-expressions-2" bind:intersecting={visible[1]}>Numeric Expressions</SectionComponent>
<p>
	Added are some basic expression concepts to represent numeric expressions: a NumberLiteralExpression and the standard binary expressions.
	Note that we specify the priorities of the binary operators to allow straightforward editing (see <a
		href="/Documentation/Defining_an_Editor/Binary_Expressions">Binary Expressions</a
	>):
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Expressions/src/defs/Expressions.ast#L15-L40
</span>
<span class="token keyword">abstract</span> <span class="token keyword">expression</span> <span class="token class-name">Expression</span> &#123; &#125;

<span class="token keyword">expression</span> NumberLiteralExpression <span class="token keyword">base</span> <span class="token class-name">Expression</span> &#123;
    value: <span class="token builtin">number</span>;
&#125;

<span class="token keyword">abstract</span> <span class="token keyword">binary</span> <span class="token keyword">expression</span> BinaryExpression <span class="token keyword">base</span> <span class="token class-name">Expression</span> &#123;
    left: <span class="token class-name">Expression</span>;
    right: <span class="token class-name">Expression</span>;
&#125;

<span class="token keyword">binary</span> <span class="token keyword">expression</span> MultiplyExpression <span class="token keyword">base</span> <span class="token class-name">BinaryExpression</span> &#123;
    <span class="token keyword">priority</span> = <span class="token number">8</span>;
&#125;

<span class="token keyword">binary</span> <span class="token keyword">expression</span> PlusExpression <span class="token keyword">base</span> <span class="token class-name">BinaryExpression</span> &#123;
    <span class="token keyword">priority</span> = <span class="token number">4</span>;
&#125;

<span class="token keyword">binary</span> <span class="token keyword">expression</span> MinusExpression <span class="token keyword">base</span> <span class="token class-name">BinaryExpression</span> &#123;
    <span class="token keyword">priority</span> = <span class="token number">4</span>;
&#125;

<span class="token keyword">binary</span> <span class="token keyword">expression</span> DivideExpression <span class="token keyword">base</span> <span class="token class-name">BinaryExpression</span> &#123;
    <span class="token keyword">priority</span> = <span class="token number">8</span>;
&#125;</code>`}</pre>
<SectionComponent tag="h2" id="functions-3" bind:intersecting={visible[2]}>Functions</SectionComponent>
<p>We also add concepts to represent functions, both function definitions and function calls:</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Expressions/src/defs/Expressions.ast#L42-L61
</span>
<span class="token keyword">concept</span> <span class="token class-name">Function</span> &#123;
    name: <span class="token builtin">identifier</span>;
    body: <span class="token class-name">Expression</span>;
    parameters: <span class="token class-name">Parameter</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    <span class="token keyword">reference</span> declaredType : <span class="token class-name">Type</span>;
&#125;

<span class="token keyword">concept</span> <span class="token class-name">Parameter</span> &#123;
    name: <span class="token builtin">identifier</span>;
    <span class="token keyword">reference</span> declaredType: <span class="token class-name">Type</span>;
&#125;

<span class="token keyword">expression</span> ParameterRef <span class="token keyword">base</span> <span class="token class-name">Expression</span> &#123;
    <span class="token keyword">reference</span> parameter: <span class="token class-name">Parameter</span>;
&#125;

<span class="token keyword">expression</span> FunctionCallExpression <span class="token keyword">base</span> <span class="token class-name">Expression</span> &#123;
    <span class="token keyword">reference</span> calledFunction: <span class="token class-name">Function</span>;
    arguments: <span class="token class-name">Expression</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
&#125;</code>`}</pre>

<PrevNextSection {prevLink} {nextLink} />
