<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Defining Properties', visible: false, ref: '#defining-properties-1' },
		{ title: 'Primitive Properties', visible: false, ref: '#primitive-properties-2' },
		{ title: 'Part Properties', visible: false, ref: '#part-properties-3' },
		{ title: 'Reference Properties', visible: false, ref: '#reference-properties-4' },
		{ title: 'Optional Properties', visible: false, ref: '#optional-properties-5' }
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

	let prevLink = '/Documentation/Creating_the_Metamodel/Language_Structure';
	let nextLink = '/Documentation/Defining_an_Editor';

	import Note from '$lib/notes/Note.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="defining-properties-1" bind:intersecting={visible[0]}>Defining Properties</SectionComponent>
<p>
	Each of the language structure elements (concepts, interfaces, expressions, etc.) may have <strong>Properties</strong>.<br />
	Properties can be lists, this is indicated by square brackets after the type name. There are three types of properties.
</p>
<SectionComponent tag="h2" id="primitive-properties-2" bind:intersecting={visible[1]}>Primitive Properties</SectionComponent>
<p>
	<strong>Primitive properties</strong> have as type <code>identifier</code>, <code>string</code>, <code>number</code>, or
	<code>boolean</code>, and are always contained in the <em>concept</em>. Primitive properties may also be lists.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L25-L26
</span>
name: <span class="token builtin">identifier</span>;               <span class="token comment">// internal name
</span>isUnderConstruction: <span class="token builtin">boolean</span>;   // defines whether this <span class="token keyword">base</span> product is still 'raw'</code>`}</pre>
<SectionComponent tag="h2" id="part-properties-3" bind:intersecting={visible[2]}>Part Properties</SectionComponent>
<p>
	<strong>Parts</strong> have as type one of the <em>concepts</em> (including <em>expression concepts</em> and <em>limited concepts</em>) or
	interfaces in the language, and are <em>contained in the concept</em> that holds the property (as in the UML composition relationship).
	Parts are also called children. In the example below <code>body</code> and <code>parameters</code> are parts.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L72-L73
</span>
body: <span class="token class-name">DocuExpression</span>;               <span class="token comment">// the actual calculation definition
</span>parameters: <span class="token class-name">Parameter</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;            // any parameters</code>`}</pre>
<SectionComponent tag="h2" id="reference-properties-4" bind:intersecting={visible[3]}>Reference Properties</SectionComponent>
<p>
	<strong>References</strong> also have as type one of the <em>concepts</em> or <em>interfaces</em> in the language, but a reference is not
	contained in its <em>concept</em> (as in the UML association relationship). References are indicated by the keyword
	<em>reference</em> in front of the definition.
</p>
<p>References are always by name, therefore the referred concept must have a <code>name</code> property of type <code>identifier</code>.</p>
<p>
	In the following example the concept <code>InsuranceProduct</code> holds a list of references to <code>InsuranceParts</code> in the
	property <code>parts</code>.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L53-L65
</span>
<span class="token keyword">concept</span> <span class="token class-name">InsuranceProduct</span> &#123;
    name: <span class="token builtin">identifier</span>;                       <span class="token comment">// internal name
</span>    productName: <span class="token builtin">string</span>;                    <span class="token comment">// name by which this product is known to the public
</span>    themes: <span class="token class-name">InsuranceTheme</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;               <span class="token comment">// the 'kind' of insurance
</span>    advertisedPremium: <span class="token class-name">EuroLiteral</span>;         <span class="token comment">// the premium as known to the public
</span>    nrPremiumDays: <span class="token class-name">PremiumDays</span>;             <span class="token comment">// the number of days for which the advertised premium is calculated
</span>    <span class="token keyword">reference</span> parts: <span class="token class-name">InsurancePart</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;       <span class="token comment">// optionally, known parts can be included by reference
</span>    <span class="token keyword">reference</span> basedOn: <span class="token class-name">BaseProduct</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;       <span class="token comment">// the BaseProducts from which the parts are taken
</span>
    riskAdjustment?: <span class="token class-name">PercentageLiteral</span>;     <span class="token comment">// an adjustment to the risk of the separate parts, e.g. caused by the combination of the parts
</span>    calculation: <span class="token class-name">DocuExpression</span>;            <span class="token comment">// the premium as calculated based on the parts
</span>    helpers: <span class="token class-name">CalcFunction</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;                <span class="token comment">// helper functions used to calculate the premium
</span>&#125;</code>`}</pre>
<p>The concept <code>InsurancePart</code> has a property <code>name: identifier</code>.</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L44-L45
</span>
<span class="token keyword">concept</span> <span class="token class-name">InsurancePart</span> &#123;
    name: <span class="token builtin">identifier</span>;                       // internal name</code>`}</pre>
<SectionComponent tag="h2" id="optional-properties-5" bind:intersecting={visible[4]}>Optional Properties</SectionComponent>
<p>
	Properties may be optional. This is indicated using a question mark after the property name. Lists are always considered to be optional,
	i.e. they maybe empty, - there is no need for the question mark there.
</p>
<p>Primitive properties may not be optional at the moment, but we plan to change this in the future.</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L70-L70
</span>
description?: <span class="token class-name">Description</span>;          // an optional description</code>`}</pre>

<PrevNextSection {prevLink} {nextLink} />
