<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Type Provider', visible: false, ref: '#type-provider-1' },
		{ title: 'Typing Rules', visible: false, ref: '#typing-rules-2' },
		{ title: 'Types or Type Concepts', visible: false, ref: '#types-or-type-concepts-3' },
		{ title: 'Terms That Have a Type', visible: false, ref: '#terms-that-have-a-type-4' },
		{ title: 'Inference Rules', visible: false, ref: '#inference-rules-5' },
		{ title: 'Type Equals and Type Conformance Rules', visible: false, ref: '#type-equals-and-type-conformance-rules-6' },
		{ title: 'Use of conformsto', visible: false, ref: '#use-of-conformsto-7' },
		{ title: 'Rules That Apply to Any Concept', visible: false, ref: '#rules-that-apply-to-any-concept-8' }
	];
	let visible: boolean[] = [];
	$: $mySections[0].visible = visible[0];
	$: $mySections[1].visible = visible[1];
	$: $mySections[2].visible = visible[2];
	$: $mySections[3].visible = visible[3];
	$: $mySections[4].visible = visible[4];
	$: $mySections[5].visible = visible[5];
	$: $mySections[6].visible = visible[6];
	$: $mySections[7].visible = visible[7];
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

	let prevLink = '/Documentation/Scoping,_Typing,_and_Validating/Scope_Provider';
	let nextLink = '/Documentation/Scoping,_Typing,_and_Validating/Validator';

	import Note from '$lib/notes/Note.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="type-provider-1" bind:intersecting={visible[0]}>Type Provider</SectionComponent>
<p>
	Typing determines which elements are permissible in specific locations within a model or Abstract Syntax Tree (AST). For example, in the
	expression <code>a + 6</code>, it is generally expected that <code>a</code> represents a numeric value, as other types of values would not
	be valid in this context.
</p>
<p>
	Freon addresses many potential typing issues by enforcing the use of a typed metamodel. This ensures that when a certain type, such as a
	boolean, is required, only a boolean value can be provided. However, there are scenarios where the metamodel permits a broader range of
	values than desired, which can lead to unintended flexibility.
</p>
<p>
	The <strong>type provider</strong> (or <strong>typer</strong>, for short) definition provides the information necessary to determine the
	type of element. Any part of the typer definition must be included in a file with the extension <code>.type</code>. All files with this
	extension in the <a href="/Documentation/Overview/Getting_Started#template-project-startup-3"><em>defs</em> folder</a>
	(i.e. the folder were you keep your definition files) are combined into one typer definition.
</p>
<SectionComponent tag="h1" id="typing-rules-2" bind:intersecting={visible[1]}>Typing Rules</SectionComponent>
<p>
	In the typer definition file you can indicate typing rules for every
	<em>concept</em> or <em>interface</em> in your language. The typing rules come in four categories. Each category is there to answer one of
	the following questions.
</p>
<ol>
	<li>Which <em>concepts</em> or <em>interfaces</em> are considered to be types?</li>
	<li>Which <em>concepts</em> or <em>interfaces</em> are considered to have a type?</li>
	<li>How to determine the type of a <em>concept</em> or <em>interface</em>?</li>
	<li>Which types are considered to be equal or conforming?</li>
</ol>
<p>Note that these sections need to be in the <code>.type</code> file in this order.</p>
<SectionComponent tag="h2" id="types-or-type-concepts-3" bind:intersecting={visible[2]}>Types or Type Concepts</SectionComponent>
<p>
	In Freon all types are completely separate from the elements of your AST. These are called <strong>type concepts</strong>, which all
	implements the interface <strong>FreType</strong> from the <code>@freon4dsl/core</code> package. Type concepts can be defined in two ways.
	Either they are specified in the <code>.type</code> file, or some AST nodes are declared to be types. In the latter case, Freon generates a
	type concept which holds a reference to the AST node.
</p>
<p>
	To indicate which AST concepts are considered to be types in your language, the keyword <code>isType</code> is used, followed by all types
	in your language between curly brackets, and separated by commas.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/typer-docu.type#L4-L4
</span>
<span class="token class-name">istype</span> &#123; NamedType &#125;</code>`}</pre>
<p>
	To define new type concepts you can use a simplified version of the concept definition in the .ast files. The properties may only be
	instances of other type concepts, or references to limited concepts. The property
	<code>base</code> in the next example is an instance of the interface <code>FreType</code>, whereas the property <code>kind</code> refers
	to the limited concept <code>GenericKind</code>.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/typer-docu.type#L6-L9
</span>
<span class="token keyword">type</span> <span class="token class-name">GenericType</span> &#123;
    <span class="token keyword">base</span>: <span class="token class-name">FreType</span>;
    kind: <span class="token class-name">GenericKind</span>;
&#125;</code>`}</pre>
<p>Note that is it often good practise to have a common superclass or interface for all your types, but this is not necessary.</p>
<SectionComponent tag="h2" id="terms-that-have-a-type-4" bind:intersecting={visible[3]}>Terms That Have a Type</SectionComponent>
<p>
	Not all AST nodes need to have a type associated to it. Only those nodes for which you need a validation rule, or have another reason to
	require a type, need to be marked as having a type. We refer to those AST nodes as <strong>terms</strong>, so as not to confuse these with
	<a href="/Documentation/Creating_the_Metamodel/Language_Structure#expression-concept-5"><code>expression concepts</code></a>, which have a
	different meaning.
</p>
<p>
	You can indicate which AST nodes are terms by the keyword <code>hasType</code> followed by all terms in your language between curly brackets,
	and separated by commas.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/typer-docu.type#L12-L12
</span>
<span class="token class-name">hastype</span> &#123; DocuExpression, DocuType, CalcFunction, Parameter, RiskRef, PayoutRef &#125;</code>`}</pre>
<SectionComponent tag="h2" id="inference-rules-5" bind:intersecting={visible[4]}>Inference Rules</SectionComponent>
<p>
	In order to determine the type of a term, there needs to be a rule, called an <strong>inference rule</strong>, for each concept or
	interface that is marked <code>hasType</code>. Each of these rules should result in a type concept.
</p>
<p>
	The following example gives an inference rule that states that the type of calculation function is the value of its attribute <code
		>declaredType</code
	>. This value is an instance of <code>DocuType</code>, which indeed was declared to represent a type by the above declaration. First, we
	show the metamodel definition.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L68-L74
</span>
<span class="token keyword">concept</span> <span class="token class-name">CalcFunction</span> &#123;
    name: <span class="token builtin">identifier</span>;                   <span class="token comment">// the name
</span>    description?: <span class="token class-name">Description</span>;          <span class="token comment">// an optional description
</span>    declaredType : <span class="token class-name">DocuType</span>;            <span class="token comment">// the type
</span>    body: <span class="token class-name">DocuExpression</span>;               <span class="token comment">// the actual calculation definition
</span>    parameters: <span class="token class-name">Parameter</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;            <span class="token comment">// any parameters
</span>&#125;</code>`}</pre>
<p>And, the typer definition looks like this.</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/typer-docu.type#L18-L20
</span>
<span class="token class-name">CalcFunction</span> &#123;
    <span class="token keyword">infertype</span> <span class="token variable">self</span>.declaredType;
&#125;</code>`}</pre>
<Note>
	<svelte:fragment slot="content"
		>This is a valid inference rule, only if 'declaredType' is an instance of a concept that is marked 'isType'.
	</svelte:fragment>
</Note>
<p>
	Concepts that are types (as indicated by <code>isType</code>) can also be terms. If an inference rule is present, this rule will determine
	the type of such a term. If no rule is present, the type of the AST node is the <em>type concept</em> generated for this AST node.
</p>
<p>
	In an inference rule, as in other definition files, it is possible to use the predefined instances of a <strong>limited concept</strong>.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/typer-docu.type#L27-L29
</span>
<span class="token class-name">RiskAdjustmentRef</span> &#123;
    <span class="token keyword">infertype</span> PercentageType:<span class="token class-name">Percentage</span>;
&#125;</code>`}</pre>
<SectionComponent tag="h2" id="type-equals-and-type-conformance-rules-6" bind:intersecting={visible[5]}
	>Type Equals and Type Conformance Rules</SectionComponent
>
<p>
	The last section in the type definition is where rules are given that state which types are considered equal or conforming. Each rule can
	have two entries: the <code>conformsto</code> and the <code>equalsto</code> entries. Within these entries it is also possible to use the predefined
	instances of a limited concept.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/typer-docu.type#L81-L89
</span>
<span class="token comment">// Which types are 'equal' to each other?
</span><span class="token class-name">NamedType</span> &#123;
    <span class="token keyword">equalsto</span> aa:<span class="token class-name">NamedType</span> <span class="token class-name">where</span> &#123;
            aa.name <span class="token keyword">equalsto</span> <span class="token variable">self</span>.name;
        &#125;;
    <span class="token keyword">conformsto</span> other:<span class="token class-name">NamedType</span> <span class="token class-name">where</span> &#123;
            other.name <span class="token keyword">equalsto</span> <span class="token variable">self</span>.name;
        &#125;;
&#125;</code>`}</pre>
<p>
	The <code>where</code> clause in the above example can be used when a type has some structure. For every property in the type concept a
	condition is given. If all conditions evaluate to true then the <code>where</code> clause results in true.
</p>
<Note>
	<svelte:fragment slot="content">
		Type concept instances can not be compared based on their identity, instead you will need to use an <code>equalsto</code> entry.
	</svelte:fragment>
</Note>
<SectionComponent tag="h2" id="use-of-conformsto-7" bind:intersecting={visible[6]}>Use of <strong>conformsto</strong></SectionComponent>
<p>
	In a condition of a <code>where</code> clause you may use <code>conformsto</code>. In that case, invocation of the rule will produce the
	cartesian product of all super concepts of the properties in the conditions. For an example, see
	<a href="/Examples/Generic_Types">Typer Example</a>.
</p>
<Note>
	<svelte:fragment slot="content">
		Be careful with the use of <code>conformsto</code> within <code>where</code> clauses because this can lead to an explosion of newly created
		type concept instances.
	</svelte:fragment>
</Note>
<SectionComponent tag="h2" id="rules-that-apply-to-any-concept-8" bind:intersecting={visible[7]}
	>Rules That Apply to Any Concept</SectionComponent
>
<p>
	Conformance and other rules can also be defined to apply to <strong>any</strong> concept. Obviously, this means that any instance of any concept
	conforms to the given value.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// TyperExample/src/defs/projectY.type#L21-L28
</span>
    <span class="token keyword">conformsto</span> PredefinedType:<span class="token class-name">ANY</span>; <span class="token comment">// PredefinedType:ANY is the least specific type
</span>&#125;

<span class="token class-name">PredefinedType</span> &#123;
    PredefinedType:<span class="token class-name">NULL</span> <span class="token keyword">conformsto</span> anytype; <span class="token comment">// PredefinedType:NULL is the most specific type
</span>    NUMBER <span class="token keyword">conformsto</span> STRING;
&#125;
</code>`}</pre>
<Note>
	<svelte:fragment slot="content">Anytype rules must be included after the 'hasType' rules and before the inference rules.</svelte:fragment>
</Note>

<PrevNextSection {prevLink} {nextLink} />
