<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Generic Types: an Example Typer Definition', visible: false, ref: '#generic-types-an-example-typer-definition-1' },
		{ title: 'The Typer Definition of the Example Language', visible: false, ref: '#the-typer-definition-of-the-example-language-2' },
		{ title: 'The Complete Typer Definition', visible: false, ref: '#the-complete-typer-definition-3' }
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

	let prevLink = '/Examples/Generic_Types/The_TyperExample_DSL';
	let nextLink = '/Examples/External_Components';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="generic-types-an-example-typer-definition-1" bind:intersecting={visible[0]}
	>Generic Types: an Example Typer Definition</SectionComponent
>
<p>This example shows how generic types and unit of measurements can be defined.</p>
<SectionComponent tag="h2" id="the-typer-definition-of-the-example-language-2" bind:intersecting={visible[1]}
	>The Typer Definition of the Example Language</SectionComponent
>
<p>
	Once the structure of the example language is defined, we are able to focus on the typer definition. Because types in Freon do not reside
	within the AST, but are completely separate from it, we need to associate a type concept with each of our AST concepts.
</p>
<h3 id="the-type-concepts-1">The Type Concepts</h3>
<p>
	First, we define a type concept that corresponds with our type declaration called <em>GenericType</em>, and one that corresponds with
	<em>UnitOfMeasurement</em>. They are quite similar to their AST counterparts, but note that here we use <strong>FreType</strong> as type for
	the property. We want to build a structure of type concepts, not of AST nodes!
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// TyperExample/src/defs/projectY.type#L6-L14
</span>
<span class="token keyword">type</span> <span class="token class-name">TT_GenericType</span> &#123;
    <span class="token keyword">base</span>: <span class="token class-name">FreType</span>;
    kind: <span class="token class-name">GenericKind</span>;
&#125;

<span class="token keyword">type</span> <span class="token class-name">TT_MeasurementType</span> &#123;
    <span class="token keyword">base</span>: <span class="token class-name">FreType</span>;
    unit: <span class="token class-name">UnitKind</span>;
&#125;</code>`}</pre>
<h3 id="the-infertype-rules-2">The Infertype Rules</h3>
<p>
	Next, we associate the AST nodes with the type concepts, using infertype rules. When invoked, these rules will create a new instance of
	the type concepts.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// TyperExample/src/defs/projectY.type#L34-L46
</span>
<span class="token class-name">GenericType</span> &#123;
    <span class="token keyword">infertype</span> <span class="token class-name">TT_GenericType</span> &#123;
        <span class="token keyword">base</span>: <span class="token class-name">typeof</span>(<span class="token variable">self</span>.baseType),
        kind: <span class="token class-name">self</span>.kind
    &#125;;
&#125;

<span class="token class-name">UnitOfMeasurement</span> &#123;
    <span class="token keyword">infertype</span> <span class="token class-name">TT_MeasurementType</span> &#123;
        <span class="token keyword">base</span>: <span class="token class-name">typeof</span>(<span class="token variable">self</span>.baseType),
        unit: <span class="token class-name">self</span>.unit
    &#125;;
&#125;</code>`}</pre>
<h3 id="the-conforms-and-equals-rules-3">The Conforms And Equals Rules</h3>
<p>
	To be able to compare the types of expressions and of type declarations, we need to state the <em>equalsto</em> and/or <em>conformsto</em>
	rules.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// TyperExample/src/defs/projectY.type#L91-L118
</span>
<span class="token class-name">TT_GenericType</span> &#123;
    <span class="token keyword">equalsto</span> x:<span class="token class-name">TT_GenericType</span> <span class="token class-name">where</span> &#123;
            x.<span class="token keyword">base</span> <span class="token keyword">equalsto</span> <span class="token variable">self</span>.<span class="token keyword">base</span>;
            x.kind <span class="token keyword">equalsto</span> <span class="token variable">self</span>.kind;
        &#125;;
    <span class="token keyword">conformsto</span> other:<span class="token class-name">TT_GenericType</span> <span class="token class-name">where</span> &#123;
            <span class="token comment">// both conditions must be true
</span>            <span class="token variable">self</span>.<span class="token keyword">base</span> <span class="token keyword">conformsto</span> other.<span class="token keyword">base</span>;
            <span class="token variable">self</span>.kind <span class="token keyword">conformsto</span> other.kind;
        &#125;;
&#125;

<span class="token class-name">GenericKind</span> &#123;
    Set <span class="token keyword">conformsto</span> Collection;
    Sequence <span class="token keyword">conformsto</span> Collection;
    Bag <span class="token keyword">conformsto</span> Collection;
&#125;

<span class="token class-name">TT_MeasurementType</span> &#123;
    <span class="token keyword">equalsto</span> aap:<span class="token class-name">TT_MeasurementType</span> <span class="token class-name">where</span> &#123;
            aap.<span class="token keyword">base</span> <span class="token keyword">equalsto</span> <span class="token variable">self</span>.<span class="token keyword">base</span>;
            aap.unit <span class="token keyword">equalsto</span> <span class="token variable">self</span>.unit;
        &#125;;
    <span class="token keyword">conformsto</span> rr:<span class="token class-name">TT_MeasurementType</span> <span class="token class-name">where</span> &#123;
            <span class="token variable">self</span>.<span class="token keyword">base</span> <span class="token keyword">conformsto</span> rr.<span class="token keyword">base</span>;
            <span class="token variable">self</span>.unit <span class="token keyword">equalsto</span> rr.unit;
        &#125;;
&#125;</code>`}</pre>
<SectionComponent tag="h2" id="the-complete-typer-definition-3" bind:intersecting={visible[2]}
	>The Complete Typer Definition</SectionComponent
>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// TyperExample/src/defs/projectY.type
</span>
typer

<span class="token comment">// What are types?
</span><span class="token class-name">istype</span> &#123; TopType &#125;

<span class="token keyword">type</span> <span class="token class-name">TT_GenericType</span> &#123;
    <span class="token keyword">base</span>: <span class="token class-name">FreType</span>;
    kind: <span class="token class-name">GenericKind</span>;
&#125;

<span class="token keyword">type</span> <span class="token class-name">TT_MeasurementType</span> &#123;
    <span class="token keyword">base</span>: <span class="token class-name">FreType</span>;
    unit: <span class="token class-name">UnitKind</span>;
&#125;

<span class="token comment">// Which concepts have a type?
</span><span class="token class-name">hastype</span> &#123; Exp, TypeUsage &#125;

<span class="token comment">// What are the top and bottom types?
</span><span class="token class-name">anytype</span> &#123;
    <span class="token keyword">conformsto</span> PredefinedType:<span class="token class-name">ANY</span>; <span class="token comment">// PredefinedType:ANY is the least specific type
</span>&#125;

<span class="token class-name">PredefinedType</span> &#123;
    PredefinedType:<span class="token class-name">NULL</span> <span class="token keyword">conformsto</span> anytype; <span class="token comment">// PredefinedType:NULL is the most specific type
</span>    NUMBER <span class="token keyword">conformsto</span> STRING;
&#125;

<span class="token comment">// Which type does an expression have?
</span><span class="token class-name">TypeRef</span> &#123;
    <span class="token keyword">infertype</span> <span class="token variable">self</span>.<span class="token keyword">type</span>;
&#125;

<span class="token class-name">GenericType</span> &#123;
    <span class="token keyword">infertype</span> <span class="token class-name">TT_GenericType</span> &#123;
        <span class="token keyword">base</span>: <span class="token class-name">typeof</span>(<span class="token variable">self</span>.baseType),
        kind: <span class="token class-name">self</span>.kind
    &#125;;
&#125;

<span class="token class-name">UnitOfMeasurement</span> &#123;
    <span class="token keyword">infertype</span> <span class="token class-name">TT_MeasurementType</span> &#123;
        <span class="token keyword">base</span>: <span class="token class-name">typeof</span>(<span class="token variable">self</span>.baseType),
        unit: <span class="token class-name">self</span>.unit
    &#125;;
&#125;

<span class="token class-name">NumberLiteral</span> &#123;
    <span class="token keyword">infertype</span> PredefinedType:<span class="token class-name">NUMBER</span>;
&#125;

<span class="token class-name">StringLiteral</span> &#123;
    <span class="token keyword">infertype</span> PredefinedType:<span class="token class-name">STRING</span>;
&#125;

<span class="token class-name">BooleanLiteral</span> &#123;
    <span class="token keyword">infertype</span> PredefinedType:<span class="token class-name">BOOLEAN</span>;
&#125;

<span class="token class-name">NamedExp</span> &#123;
    <span class="token keyword">infertype</span> <span class="token variable">self</span>.myType;
&#125;

<span class="token class-name">PlusExp</span> &#123;
    <span class="token keyword">infertype</span> commonSuperType(<span class="token variable">self</span>.left, <span class="token variable">self</span>.right);
&#125;

<span class="token class-name">UnitLiteral</span> &#123;
    <span class="token comment">// 62 kilogram, or 112 miles
</span>    <span class="token keyword">infertype</span> <span class="token class-name">TT_MeasurementType</span> &#123;
                  <span class="token keyword">base</span>: <span class="token class-name">typeof</span>(<span class="token variable">self</span>.inner),
                  unit: <span class="token class-name">self</span>.unit
              &#125;;
&#125;

<span class="token class-name">GenericLiteral</span> &#123;
    <span class="token comment">// Set&#123; 12, 14, 16, 18 &#125;
</span>    <span class="token keyword">infertype</span> <span class="token class-name">TT_GenericType</span> &#123;
        <span class="token keyword">base</span>: <span class="token class-name">typeof</span>(<span class="token variable">self</span>.content),
        kind: <span class="token class-name">self</span>.kind
    &#125;;
&#125;

<span class="token comment">// Which types are 'equal' to each other?
</span><span class="token class-name">NamedType</span> &#123;
    <span class="token keyword">equalsto</span> aa:<span class="token class-name">NamedType</span> <span class="token class-name">where</span> &#123;
            aa.name <span class="token keyword">equalsto</span> <span class="token variable">self</span>.name;
        &#125;;
&#125;

<span class="token class-name">TT_GenericType</span> &#123;
    <span class="token keyword">equalsto</span> x:<span class="token class-name">TT_GenericType</span> <span class="token class-name">where</span> &#123;
            x.<span class="token keyword">base</span> <span class="token keyword">equalsto</span> <span class="token variable">self</span>.<span class="token keyword">base</span>;
            x.kind <span class="token keyword">equalsto</span> <span class="token variable">self</span>.kind;
        &#125;;
    <span class="token keyword">conformsto</span> other:<span class="token class-name">TT_GenericType</span> <span class="token class-name">where</span> &#123;
            <span class="token comment">// both conditions must be true
</span>            <span class="token variable">self</span>.<span class="token keyword">base</span> <span class="token keyword">conformsto</span> other.<span class="token keyword">base</span>;
            <span class="token variable">self</span>.kind <span class="token keyword">conformsto</span> other.kind;
        &#125;;
&#125;

<span class="token class-name">GenericKind</span> &#123;
    Set <span class="token keyword">conformsto</span> Collection;
    Sequence <span class="token keyword">conformsto</span> Collection;
    Bag <span class="token keyword">conformsto</span> Collection;
&#125;

<span class="token class-name">TT_MeasurementType</span> &#123;
    <span class="token keyword">equalsto</span> aap:<span class="token class-name">TT_MeasurementType</span> <span class="token class-name">where</span> &#123;
            aap.<span class="token keyword">base</span> <span class="token keyword">equalsto</span> <span class="token variable">self</span>.<span class="token keyword">base</span>;
            aap.unit <span class="token keyword">equalsto</span> <span class="token variable">self</span>.unit;
        &#125;;
    <span class="token keyword">conformsto</span> rr:<span class="token class-name">TT_MeasurementType</span> <span class="token class-name">where</span> &#123;
            <span class="token variable">self</span>.<span class="token keyword">base</span> <span class="token keyword">conformsto</span> rr.<span class="token keyword">base</span>;
            <span class="token variable">self</span>.unit <span class="token keyword">equalsto</span> rr.unit;
        &#125;;
&#125;
</code>`}</pre>

<PrevNextSection {prevLink} {nextLink} />
