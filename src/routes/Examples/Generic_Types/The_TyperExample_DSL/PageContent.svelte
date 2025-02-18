<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{
			title: 'The Metamodel Definition of the Example Language',
			visible: false,
			ref: '#the-metamodel-definition-of-the-example-language-1'
		},
		{ title: 'The Complete AST Definition', visible: false, ref: '#the-complete-ast-definition-2' }
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

	let prevLink = '/Examples/Generic_Types';
	let nextLink = '/Examples/Generic_Types/The_Typer_Definition';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="the-metamodel-definition-of-the-example-language-1" bind:intersecting={visible[0]}
	>The Metamodel Definition of the Example Language</SectionComponent
>
<p>
	To explain the type definition, we first need the metamodel of the example language. Below is the complete .ast file. But first, let’s
	explain some highlights.
</p>
<p>
	Every type in the list of <em>expression</em> - <em>declared type</em> pairs is an instance of the AST concept <strong>TypeUsage</strong>,
	which comes in two flavours: a type declaration, and a type reference, that holds a reference to another AST node.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// TyperExample/src/defs/projectY.ast#L18-L26
</span>
<span class="token keyword">abstract</span> <span class="token keyword">concept</span> <span class="token class-name">TypeUsage</span> &#123; <span class="token comment">// to be used wherever a type can be used, either a referred type of or declared type is correct
</span>&#125;

<span class="token keyword">concept</span> <span class="token class-name">TypeRef</span> <span class="token keyword">base</span> <span class="token class-name">TypeUsage</span>  &#123;
    <span class="token keyword">reference</span> <span class="token keyword">type</span>: <span class="token class-name">NamedType</span>;
&#125;

<span class="token keyword">abstract</span> <span class="token keyword">concept</span> <span class="token class-name">TypeDecl</span> <span class="token keyword">base</span> <span class="token class-name">TypeUsage</span> &#123;
&#125;</code>`}</pre>
<p>
	There are also two options for a type declaration, a generic type, and a unit of measurement. For this example, we have used the names of
	the generic types from the Object Constraint Language: Set, Bag, Sequence, and Collection. Note that these declarations are part of the
	AST. They are not type concepts themselves.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// TyperExample/src/defs/projectY.ast#L37-L47
</span>
<span class="token keyword">concept</span> <span class="token class-name">GenericType</span> <span class="token keyword">base</span> <span class="token class-name">TypeDecl</span> &#123;
    baseType: <span class="token class-name">TypeUsage</span>;
    kind: <span class="token class-name">GenericKind</span>; <span class="token comment">// is it a set, sequence, bag, or anything else
</span>&#125;
<span class="token keyword">limited</span> <span class="token class-name">GenericKind</span> &#123; Set; Sequence; Bag; Collection; &#125;

<span class="token keyword">concept</span> <span class="token class-name">UnitOfMeasurement</span> <span class="token keyword">base</span> <span class="token class-name">TypeDecl</span> &#123;
    <span class="token keyword">reference</span> baseType: <span class="token class-name">PredefinedType</span>; <span class="token comment">// is always NUMBER!!
</span>    unit: <span class="token class-name">UnitKind</span>; <span class="token comment">// is it measured in km, kWh, grams, or anything else
</span>&#125;
<span class="token keyword">limited</span> <span class="token class-name">UnitKind</span> &#123; Meters; Grams; kWh; Hours; &#125;</code>`}</pre>
<p>
	The definitions of the expressions in the example language are straightforward. There are literal expressions for strings, booleans, and
	number, as well as generic literals and unit literals.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// TyperExample/src/defs/projectY.ast#L61-L75
</span>
<span class="token keyword">expression</span> BooleanLiteral <span class="token keyword">base</span> <span class="token class-name">Exp</span> &#123;
    xx: <span class="token builtin">boolean</span>;
&#125;

<span class="token keyword">expression</span> UnitLiteral <span class="token keyword">base</span> <span class="token class-name">Exp</span> &#123;
    <span class="token comment">// 62 kilogram, or 112 miles
</span>    inner: <span class="token class-name">NumberLiteral</span>;
    unit: <span class="token class-name">UnitKind</span>;
&#125;

<span class="token keyword">expression</span> GenericLiteral <span class="token keyword">base</span> <span class="token class-name">Exp</span> &#123;
    <span class="token comment">// Set&#123; 12, 14, 16, 18 &#125;
</span>    content: <span class="token class-name">Exp</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    kind: <span class="token class-name">GenericKind</span>;
&#125;</code>`}</pre>
<SectionComponent tag="h2" id="the-complete-ast-definition-2" bind:intersecting={visible[1]}>The Complete AST Definition</SectionComponent>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// TyperExample/src/defs/projectY.ast
</span>
language projectY

<span class="token keyword">model</span> <span class="token class-name">XX</span> &#123;
    units: <span class="token class-name">XXunit</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
&#125;

<span class="token keyword">modelunit</span> <span class="token class-name">XXunit</span> &#123;
    lines: <span class="token class-name">ExpWithType</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    file-extension = <span class="token string">"expr"</span>;
&#125;

<span class="token keyword">concept</span> <span class="token class-name">ExpWithType</span> &#123;
    expr: <span class="token class-name">Exp</span>;
    <span class="token keyword">type</span>: <span class="token class-name">TypeUsage</span>;
&#125;

<span class="token comment">// definitions of types
</span><span class="token keyword">abstract</span> <span class="token keyword">concept</span> <span class="token class-name">TypeUsage</span> &#123; <span class="token comment">// to be used wherever a type can be used, either a referred type of or declared type is correct
</span>&#125;

<span class="token keyword">concept</span> <span class="token class-name">TypeRef</span> <span class="token keyword">base</span> <span class="token class-name">TypeUsage</span>  &#123;
    <span class="token keyword">reference</span> <span class="token keyword">type</span>: <span class="token class-name">NamedType</span>;
&#125;

<span class="token keyword">abstract</span> <span class="token keyword">concept</span> <span class="token class-name">TypeDecl</span> <span class="token keyword">base</span> <span class="token class-name">TypeUsage</span> &#123;
&#125;

<span class="token keyword">interface</span> <span class="token class-name">TopType</span> &#123;
&#125;

<span class="token keyword">concept</span> <span class="token class-name">NamedType</span> <span class="token keyword">implements</span> <span class="token class-name">TopType</span> &#123;
    name: <span class="token builtin">identifier</span>;
&#125;

<span class="token keyword">limited</span> PredefinedType <span class="token keyword">base</span> <span class="token class-name">NamedType</span> &#123; NUMBER; BOOLEAN; STRING; ANY; NULL; &#125;

<span class="token keyword">concept</span> <span class="token class-name">GenericType</span> <span class="token keyword">base</span> <span class="token class-name">TypeDecl</span> &#123;
    baseType: <span class="token class-name">TypeUsage</span>;
    kind: <span class="token class-name">GenericKind</span>; <span class="token comment">// is it a set, sequence, bag, or anything else
</span>&#125;
<span class="token keyword">limited</span> <span class="token class-name">GenericKind</span> &#123; Set; Sequence; Bag; Collection; &#125;

<span class="token keyword">concept</span> <span class="token class-name">UnitOfMeasurement</span> <span class="token keyword">base</span> <span class="token class-name">TypeDecl</span> &#123;
    <span class="token keyword">reference</span> baseType: <span class="token class-name">PredefinedType</span>; <span class="token comment">// is always NUMBER!!
</span>    unit: <span class="token class-name">UnitKind</span>; <span class="token comment">// is it measured in km, kWh, grams, or anything else
</span>&#125;
<span class="token keyword">limited</span> <span class="token class-name">UnitKind</span> &#123; Meters; Grams; kWh; Hours; &#125;

<span class="token comment">// definitions of expressions
</span><span class="token keyword">abstract</span> <span class="token keyword">expression</span> <span class="token class-name">Exp</span> &#123;
&#125;

<span class="token keyword">expression</span> NumberLiteral <span class="token keyword">base</span> <span class="token class-name">Exp</span> &#123;
    xx: <span class="token builtin">number</span>;
&#125;

<span class="token keyword">expression</span> StringLiteral <span class="token keyword">base</span> <span class="token class-name">Exp</span> &#123;
    xx: <span class="token builtin">string</span>;
&#125;

<span class="token keyword">expression</span> BooleanLiteral <span class="token keyword">base</span> <span class="token class-name">Exp</span> &#123;
    xx: <span class="token builtin">boolean</span>;
&#125;

<span class="token keyword">expression</span> UnitLiteral <span class="token keyword">base</span> <span class="token class-name">Exp</span> &#123;
    <span class="token comment">// 62 kilogram, or 112 miles
</span>    inner: <span class="token class-name">NumberLiteral</span>;
    unit: <span class="token class-name">UnitKind</span>;
&#125;

<span class="token keyword">expression</span> GenericLiteral <span class="token keyword">base</span> <span class="token class-name">Exp</span> &#123;
    <span class="token comment">// Set&#123; 12, 14, 16, 18 &#125;
</span>    content: <span class="token class-name">Exp</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    kind: <span class="token class-name">GenericKind</span>;
&#125;


<span class="token keyword">expression</span> NamedExp <span class="token keyword">base</span> <span class="token class-name">Exp</span> &#123;
    inner: <span class="token class-name">Exp</span>;
    myType: <span class="token class-name">NamedType</span>;
&#125;

<span class="token keyword">expression</span> PlusExp <span class="token keyword">base</span> <span class="token class-name">Exp</span> &#123;
    left: <span class="token class-name">Exp</span>;
    right: <span class="token class-name">Exp</span>;
&#125;
</code>`}</pre>

<PrevNextSection {prevLink} {nextLink} />
