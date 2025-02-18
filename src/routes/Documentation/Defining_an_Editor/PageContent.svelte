<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Defining an Editor', visible: false, ref: '#defining-an-editor-1' },
		{ title: 'Named Editors or Projection Sets', visible: false, ref: '#named-editors-or-projection-sets-2' },
		{ title: 'The Default Editor', visible: false, ref: '#the-default-editor-3' },
		{ title: 'Editor Precedence', visible: false, ref: '#editor-precedence-4' },
		{ title: 'Example .edit File', visible: false, ref: '#example-edit-file-5' }
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

	let prevLink = '/Documentation/Creating_the_Metamodel/Defining_Properties';
	let nextLink = '/Documentation/Defining_an_Editor/Projections';

	import Note from '$lib/notes/Note.svelte';
	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="defining-an-editor-1" bind:intersecting={visible[0]}>Defining an Editor</SectionComponent>
<p>
	An editor’s behavior is specified through an editor definition file (a <code>.edit</code> file). You can define the following three
	aspects for each <em>concept</em> or <em>interface</em>:
</p>
<ul>
	<li>
		<strong>Projection</strong>: Defines how the <em>concept</em> is visually represented in the editor. This is also called the
		<a href="/Documentation/Terminology">concrete syntax</a>.
	</li>
	<li>
		<strong>Trigger</strong> (optional): Specifies the key or keys that a user must type to create a new instance of the <em>concept</em> and
		that the user will see in a dropdown menu.
	</li>
	<li>
		<strong>Symbol</strong> (optional): Used exclusively for binary expressions, it is the character or string that represents the
		<em>operator</em>. If a <em>symbol</em> is not provided, the <em>trigger</em> will serve this purpose.
	</li>
</ul>
<p>
	Note that projections cannot be specified for <em>binary expression concepts</em> or <em>limited concepts</em>. The editor offers
	specialized support for binary expressions, which cannot function properly if a user-defined projection is applied. Limited concepts are
	also restricted from having projections because they are intended for use as references only within the editor.
</p>
<Note>
	<svelte:fragment slot="header">The projection is always the first</svelte:fragment>
	<svelte:fragment slot="content">
		For every concept or interface you have to define the projection before the trigger and/or symbol.
	</svelte:fragment>
</Note>
<SectionComponent tag="h2" id="named-editors-or-projection-sets-2" bind:intersecting={visible[1]}
	>Named Editors or Projection Sets</SectionComponent
>
<p>
	You can define multiple projections for the same concept and switch between these different projections in the editor. This allows you to
	adapt the editor to a specific task or point of view.
</p>
<p>Editors are <strong>named</strong>, allowing you to define multiple editors with coordinated sets of projections.</p>
<p>
	For example, if you group all <a href="/Documentation/Defining_an_Editor/Projections#tables">table projections</a> under a specific named editor,
	users can switch between viewing objects as lists or as tables. Similarly, you could create one editor (or projection set) that displays only
	a subset of properties for certain concepts, while another editor shows all properties. This flexibility allows you to accommodate different
	user needs.
</p>
<p>
	Projections can also explicitly specify that a property must be displayed using a projection from a specific named editor. For more
	details, refer to <a href="/Documentation/Defining_an_Editor/Projections#using-named-projections-3">Using Named Projections</a>.
</p>
<SectionComponent tag="h2" id="the-default-editor-3" bind:intersecting={visible[2]}>The Default Editor</SectionComponent>
<p>
	Since an editor is required as a fallback when all other editors are disabled, a default editor is automatically generated if one is not
	provided. If a default editor is supplied but is incomplete — meaning it does not define projections for all concepts — projections for
	the missing concepts are automatically generated. As a result, the default editor is always complete during generation.
</p>
<p>
	The generated default will show the concept’s name and all of its properties in the order given in the .ast file. Any list property will
	be displayed as a vertical list.
</p>
<p>
	For example, if no projection is specified for the concepts <code>InsurancePart</code>, <code>PercentageLiteral</code>, and
	<code>EuroLiteral</code>
	instances of <code>InsurancePart</code> will be shown as follows.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L44-L49
</span>
<span class="token keyword">concept</span> <span class="token class-name">InsurancePart</span> &#123;
    name: <span class="token builtin">identifier</span>;                       <span class="token comment">// internal name
</span>    isApproved: <span class="token builtin">boolean</span> = false;            <span class="token comment">// indication of approval status
</span>    statisticalRisk: <span class="token class-name">PercentageLiteral</span>;     <span class="token comment">// the statistical risk known for this event
</span>    maximumPayOut: <span class="token class-name">EuroLiteral</span>;             <span class="token comment">// maximum payout in case the insured event happens
</span>&#125;</code>`}</pre>
<Figure imageName={'documentation/Defining-an-Editor-Screenshot.png'} caption={'Generated Default Projection'} figureNumber={1} />
<SectionComponent tag="h2" id="editor-precedence-4" bind:intersecting={visible[3]}>Editor Precedence</SectionComponent>
<p>
	Named editors are arranged in a specific order, which can be specified by assigning a precedence value to each editor. Projections are
	resolved following this order. The default editor always has the lowest precedence (0) and is evaluated last.
</p>
<p>
	If a projection for a concept is not found in the editor with the highest precedence, the system searches the next editor in the sequence,
	continuing until it reaches the default editor.
</p>
<p>
	If you do not specify a precedence, Freon assigns one based on the order in which the files are read — typically alphabetically. However,
	this order is not guaranteed and may vary.
</p>
<Note>
	<svelte:fragment slot="header">Each editor can be defined in multiple files</svelte:fragment>
	<svelte:fragment slot="content">
		<p>
			Every <code>.edit</code> file in the folder containing your definitions is read during the generation process. If multiple files define
			editors with the same name, their information is merged into a single editor.
		</p>
		<p>The precedence value only needs to be specified once. However, if it is defined multiple times, the values must be consistent.</p>
	</svelte:fragment>
</Note>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-tables.edit#L1-L11
</span>
/* This file contains the <span class="token keyword">table</span> definition <span class="token keyword">in</span> a separate <span class="token keyword">editor</span> / projection group.
This enables the user to switch tables on and off. */

<span class="token keyword">editor</span> tables precedence <span class="token number">4</span>

<span class="token class-name">InsurancePart</span>&#123;
<span class="token keyword">table</span> <span class="token punctuation">[</span>
    Name    | risk               | pay out          | is approved
    $&#123;<span class="token function">name</span>&#125; | $&#123;<span class="token function">statisticalRisk</span>&#125; | $&#123;<span class="token function">maximumPayOut</span>&#125; | $&#123;<span class="token function">isApproved</span>&#125;
<span class="token punctuation">]</span>
&#125;</code>`}</pre>
<SectionComponent tag="h2" id="example-edit-file-5" bind:intersecting={visible[4]}>Example <code>.edit</code> File</SectionComponent>
<p>A complete .edit file could look like this.</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-main-default.edit#L1-L80
</span>
<span class="token comment">/* This file contains the default editor definition. */</span>

<span class="token keyword">editor</span> <span class="token keyword">default</span>

<span class="token class-name">global</span> &#123;
    <span class="token builtin">boolean</span> inner-switch <span class="token punctuation">[</span>YES | NO<span class="token punctuation">]</span> <span class="token comment">// the strings used to display a boolean value, all booleans will default be displayed as an inner switch control
</span><span class="token comment">//    limited radio
</span><span class="token comment">//    limited[] checkbox
</span>    <span class="token comment">// number slider  // you can use the slider control as default projection for numbers, but this will not often be the preferred option
</span>    <span class="token keyword2">referenceSeparator</span> <span class="token punctuation">[</span>:<span class="token punctuation">]</span> <span class="token comment">// the string that separates the names in a path name, e.g. pack1:cls3:part
</span>    <span class="token class-name">external</span> &#123;
        AnimatedGif,
        SMUI_Card,
        SMUI_Accordion,
        SMUI_Dialog,
        DatePicker
    &#125;
&#125;

<span class="token comment">// both modelunits show a single concept
</span><span class="token class-name">Part</span> &#123;<span class="token punctuation">[</span> $&#123;<span class="token function"><span class="token variable">self</span>.part</span>&#125; <span class="token punctuation">]</span>&#125;
<span class="token class-name">Product</span> &#123;<span class="token punctuation">[</span> $&#123;<span class="token function"><span class="token variable">self</span>.product</span>&#125; <span class="token punctuation">]</span>&#125;

<span class="token class-name">BaseProduct</span> &#123;<span class="token punctuation">[</span>
    Base Products $&#123;<span class="token function">name</span>&#125; for $&#123;<span class="token function">theme</span>&#125;
        $&#123;<span class="token function">parts</span>&#125;
<span class="token punctuation">]</span>&#125;

<span class="token class-name">InsurancePart</span>&#123;
<span class="token punctuation">[</span>
    Insurance Part $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125;
        risk assessment: $&#123;<span class="token function"><span class="token variable">self</span>.statisticalRisk</span>&#125;
        maximum payout: $&#123;<span class="token function"><span class="token variable">self</span>.maximumPayOut</span>&#125;
        is approved: $&#123;<span class="token function"><span class="token variable">self</span>.isApproved [JA | NEE]</span>&#125;
<span class="token punctuation">]</span>
&#125;

<span class="token class-name">InsuranceProduct</span> &#123;<span class="token punctuation">[</span>
    Insurance Product $&#123;<span class="token function">name</span>&#125; ( public name: $&#123;<span class="token function">productName</span>&#125; ) USES $&#123;<span class="token function">basedOn <span class="token keyword">horizontal</span> <span class="token keyword">separator</span>[, ]</span>&#125;
        Themes: $&#123;<span class="token function">themes <span class="token keyword">horizontal</span> <span class="token keyword">separator</span>[, ]</span>&#125;
        Premium: $&#123;<span class="token function">advertisedPremium</span>&#125; per $&#123;<span class="token function">nrPremiumDays</span>&#125;
        Insured risks:
            $&#123;<span class="token function">parts <span class="token keyword">vertical</span> <span class="token keyword">terminator</span> [;]</span>&#125;
        Calculation
            <span class="token punctuation">[</span>? Risk adjusted by = $&#123;<span class="token function">riskAdjustment</span>&#125; <span class="token punctuation">]</span>
            calculated premium: $&#123;<span class="token function">calculation</span>&#125;
        <span class="token punctuation">[</span>?Helper functions:
            $&#123;<span class="token function">helpers <span class="token keyword">vertical</span></span>&#125;<span class="token punctuation">]</span>
<span class="token punctuation">]</span>&#125;

<span class="token class-name">CalcFunction</span> &#123;
    <span class="token punctuation">[</span>
        $&#123;<span class="token function">name</span>&#125; ( $&#123;<span class="token function">parameters <span class="token keyword">horizontal</span> <span class="token keyword">separator</span>[,]</span>&#125; ): $&#123;<span class="token function">declaredType</span>&#125; &#123;
            $&#123;<span class="token function">body</span>&#125;
        &#125;
    <span class="token punctuation">]</span>
&#125;
<span class="token class-name">Description</span> &#123;
    <span class="token punctuation">[</span>$&#123;<span class="token function">content</span>&#125;<span class="token punctuation">]</span>
&#125;
<span class="token class-name">Parameter</span> &#123;
     <span class="token punctuation">[</span>$&#123;<span class="token function">name</span>&#125; : $&#123;<span class="token function">declaredType</span>&#125;<span class="token punctuation">]</span>
&#125;

<span class="token comment">// No need for projections for DocuType and its implementors, they
</span><span class="token comment">// are only used as references, so their names suffice.
</span>
<span class="token class-name">Entity</span> &#123;<span class="token punctuation">[</span>
    $&#123;<span class="token function"><span class="token variable">self</span>.isCompany [COMPANY]</span>&#125; $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125;
<span class="token punctuation">]</span>&#125;
</code>`}</pre>

<PrevNextSection {prevLink} {nextLink} />
