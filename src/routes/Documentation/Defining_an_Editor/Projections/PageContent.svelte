<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Projections', visible: false, ref: '#projections-1' },
		{ title: 'Including Properties', visible: false, ref: '#including-properties-2' },
		{ title: 'Using Named Projections', visible: false, ref: '#using-named-projections-3' },
		{ title: 'Lists', visible: false, ref: '#lists-4' },
		{ title: 'Tables', visible: false, ref: '#tables-5' },
		{ title: 'Optional Projections', visible: false, ref: '#optional-projections-6' },
		{ title: 'Inherited Projections', visible: false, ref: '#inherited-projections-7' }
	];
	let visible: boolean[] = [];
	$: $mySections[0].visible = visible[0];
	$: $mySections[1].visible = visible[1];
	$: $mySections[2].visible = visible[2];
	$: $mySections[3].visible = visible[3];
	$: $mySections[4].visible = visible[4];
	$: $mySections[5].visible = visible[5];
	$: $mySections[6].visible = visible[6];
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

	let prevLink = '/Documentation/Defining_an_Editor';
	let nextLink = '/Documentation/Defining_an_Editor/Indentation';

	import Note from '$lib/notes/Note.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="projections-1" bind:intersecting={visible[0]}>Projections</SectionComponent>
<p>
	A projection is defined using angular brackets, in a style similar to Markdown. The appearance of the definition closely resembles the
	resulting output. Everything within square brackets (<code>[]</code>), except for parts enclosed in <code>$&#123;&#125;</code>, is
	interpreted literally, including the indentation. For more details, refer to the information on
	<a href="/Documentation/Defining_an_Editor/Indentation">Indentation</a>.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-indentation.edit#L6-L14
</span>
<span class="token class-name">Text</span> &#123;
<span class="token punctuation">[</span>
This is
        literal <span class="token keyword">text</span>
      that is projected <span class="token keyword">in</span> the
                <span class="token keyword">editor</span>
  for every <span class="token keyword">concept</span> <span class="token class-name">of</span> <span class="token keyword">type</span> Text.
<span class="token punctuation">]</span>
&#125;</code>`}</pre>
<SectionComponent tag="h2" id="including-properties-2" bind:intersecting={visible[1]}>Including Properties</SectionComponent>
<p>
	When defining a projection for a concept or interface, you will likely need to include its properties. This is done using the special
	notation <code>$&#123;&#125;</code>, which instructs Freon to include a property according to the projection defined for its type.
</p>
<p>For example, given the following metamodel:</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L22-L32
</span>
<span class="token comment">// A BaseProduct defines all the different elements ('parts') that can be
</span><span class="token comment">// used to create a marketable InsuranceProduct.
</span><span class="token keyword">concept</span> <span class="token class-name">BaseProduct</span> &#123;
    name: <span class="token builtin">identifier</span>;               <span class="token comment">// internal name
</span>    isUnderConstruction: <span class="token builtin">boolean</span>;   <span class="token comment">// defines whether this base product is still 'raw'
</span>    theme: <span class="token class-name">InsuranceTheme</span>;          <span class="token comment">// the 'kind' of insurance
</span>    parts: <span class="token class-name">InsurancePart</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;         <span class="token comment">// all parts of this product
</span>    <span class="token comment">// The following properties are present to show the different options for displaying booleans.
</span>    isApprovedLevel1: <span class="token builtin">boolean</span>;
    isApprovedLevel2: <span class="token builtin">boolean</span>;
    isApprovedLevel3: <span class="token builtin">boolean</span>;</code>`}</pre>
<p>
	consider the property <code>self.body</code>, which is of type <code>DocuExpression</code>. It will be displayed based on the projection
	defined for <code>DocuExpression</code>. Meanwhile, <code>self.declaredType</code> is a property of the abstract type
	<code>DocuType</code>. This property will be projected according to the definition of the specific (non-abstract) subtype of
	<code>DocuType</code> encountered at runtime.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-main-default.edit#L38-L49
</span>
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
<span class="token punctuation">]</span>&#125;</code>`}</pre>
<Note>
	<svelte:fragment slot="header">Only direct properties are allowed</svelte:fragment>
	<svelte:fragment slot="content">
		Only the properties that are directly owned by the concept or interface are allowed. For instance,
		<code>self.declaredType.name</code> is not a valid property projection.
	</svelte:fragment>
</Note>
<Note>
	<svelte:fragment slot="header"><code>self</code> is optional</svelte:fragment>
	<svelte:fragment slot="content">
		Because you may only use direct properties, the prefix <code>self</code> may be omitted.
	</svelte:fragment>
</Note>
<Note
	><svelte:fragment slot="header">One property, one occurrence in the editor</svelte:fragment>
	<svelte:fragment slot="content">
		Unfortunately, it is not possible to show the same property of a concept twice in the same editor. The tooling we use to keep the state
		of the underlying model in sync with the view in the running editor does not allow us to do this.
	</svelte:fragment>
</Note>
<SectionComponent tag="h2" id="using-named-projections-3" bind:intersecting={visible[2]}>Using Named Projections</SectionComponent>
<p>
	By default, a property you include will be displayed using the projection defined for its type. Freon determines this projection based on
	the precedence specified in the <code>.edit</code> files.
</p>
<p>
	If you want to use a specific projection from a different editor, you can use a <strong>named property projection</strong>. In this case,
	Freon will look for the projection in the editor with the specified name.
</p>
<p>
	In the next example, the projection for <code>self.parts:comments</code> will first be searched in the editor named <code>comments</code>.
	If it is not found there, Freon will fall back to the standard precedence order of projections.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-named-proj.edit#L3-L8
</span>
<span class="token class-name">BaseProduct</span> &#123;<span class="token punctuation">[</span>
    <span class="token comment">/* In this projection 'self.parts' is always shown according to the projection */</span>
    <span class="token comment">/* defined for concept InsurancePart in the editor 'comments'.                 */</span>
    Base Products $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125; for $&#123;<span class="token function"><span class="token variable">self</span>.theme</span>&#125;
        $&#123;<span class="token variable">self</span>.parts:<span class="token class-name">comments</span>&#125;
<span class="token punctuation">]</span>&#125;</code>`}</pre>
<SectionComponent tag="h2" id="lists-4" bind:intersecting={visible[3]}>Lists</SectionComponent>
<p>
	For a property of type list, you can specify whether it should be projected horizontally or vertically. Both options are optional. If
	neither <code>vertical</code> nor <code>horizontal</code> is specified, the property will be displayed as a vertical list by default.
</p>
<p>You can also choose to project a list property as a <a href="/Documentation/Defining_an_Editor/Projections#tables-4">table</a>.</p>
<p>For a list, you can include the following options:</p>
<ul>
	<li>A <strong>separator</strong> string, which will appear between each element.</li>
	<li>A <strong>terminator</strong> string, which will appear after each element.</li>
	<li>An <strong>initiator</strong> string, which will appear before each element.</li>
</ul>
<p>All of these are optional. The default separator is a single space.</p>
<p>
	In the following example, the list <code>parts</code> is displayed vertically with a <code>';'</code> terminator. The list
	<code>themes</code>
	is displayed horizontally with a <code>', '</code> separator. The list <code>helpers</code> is shown as a vertical list without any
	separator, terminator, or initiator. In fact, the <code>vertical</code> keyword could be omitted for <code>helpers</code>, as it is the
	default projection for lists.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-main-default.edit#L38-L49
</span>
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
<span class="token punctuation">]</span>&#125;</code>`}</pre>
<Note>
	<svelte:fragment slot="header">Newlines in terminator or separator are ignored</svelte:fragment>
	<svelte:fragment slot="content">
		A terminator or separator should not contain a newline character. Horizontal or vertical layout is purely determined by the keywords <code
			>horizontal</code
		>
		and <code>vertical</code>.
	</svelte:fragment>
</Note>
<SectionComponent tag="h2" id="tables-5" bind:intersecting={visible[4]}>Tables</SectionComponent>
<p>
	If a property is a list, you can choose to display it as a table. Tables can be either row-based or column-based. In a row-based table,
	each element of the list is displayed in a separate row, while in a column-based table, each element is displayed in a single column. The
	default is row-based.
</p>
<p>Defining a table involves two steps:</p>
<ol>
	<li>
		Add the keyword <code>table</code> to the list property you want to display as a table. Optionally, you can also specify either
		<code>rows</code>
		or <code>columns</code>.
	</li>
	<li>Define a table-projection for the type of the elements in the list. This projection specifies the table headers and</li>
	<li>determines how the elements of the list are arranged in rows or columns.</li>
</ol>
<Note>
	<svelte:fragment slot="content">
		Note that you only need to include one table projection for the elements for both column and row based tables. Freon will swap the
		entries when needed.
	</svelte:fragment>
</Note>
<p>To project the <code>parts</code> property of concept <code>BaseProduct</code> as a row based table, you can use the following code.</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-tables.edit#L13-L16
</span>
<span class="token class-name">BaseProduct</span> &#123;<span class="token punctuation">[</span>
    Base Products $&#123;<span class="token function">name</span>&#125; for $&#123;<span class="token function">theme</span>&#125;
        $&#123;parts <span class="token keyword">table</span> rows&#125;
<span class="token punctuation">]</span>&#125;</code>`}</pre>
<p>
	Given the above example, there should also be a projection tagged <code>table</code> for the concept <code>InsurancePart</code> (the type
	of <code>parts</code>). Below four columns/rows are defined, each with its own header.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-tables.edit#L6-L11
</span>
<span class="token class-name">InsurancePart</span>&#123;
<span class="token keyword">table</span> <span class="token punctuation">[</span>
    Name    | risk               | pay out          | is approved
    $&#123;<span class="token function">name</span>&#125; | $&#123;<span class="token function">statisticalRisk</span>&#125; | $&#123;<span class="token function">maximumPayOut</span>&#125; | $&#123;<span class="token function">isApproved</span>&#125;
<span class="token punctuation">]</span>
&#125;</code>`}</pre>
<Note>
	<svelte:fragment slot="header">Properties within a table are displayed according to their own projection</svelte:fragment>
	<svelte:fragment slot="content">
		Each of the properties in a table is displayed using its own projection. In this example, <code>name</code> is a string, and will be
		displayed as an editable text, and <code>maximumPayout</code> is a <code>EuroLiteral</code>
		Note that the properties can be lists themselves, which can be displayed as lists or tables.
	</svelte:fragment>
</Note>
<Note>
	<svelte:fragment slot="header">Whitespace in headers is ignored</svelte:fragment>
	<svelte:fragment slot="content">
		The whitespace between the headers is not needed. However, for clarity, it is good style to align the column/row-separators.
	</svelte:fragment>
</Note>
<SectionComponent tag="h2" id="optional-projections-6" bind:intersecting={visible[5]}>Optional Projections</SectionComponent>
<p>
	When a property is marked optional in the language structure definition (the <code>.ast</code> files), the projection of this property
	should also be optional. This is indicated by <code>[?</code>.
</p>
<p>
	In the next example both the property <code>riskAdjustment</code> and <code>helpers</code> are only shown if they are present. If they are
	not present, respectively the text <code>Risk adjusted by =</code> or <code>Helper functions:</code> is omitted as well.
</p>
<p>Note that optional projections for non-optional properties are not allowed.</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-main-default.edit#L38-L49
</span>
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
<span class="token punctuation">]</span>&#125;</code>`}</pre>
<SectionComponent tag="h2" id="inherited-projections-7" bind:intersecting={visible[6]}>Inherited Projections</SectionComponent>
<p>
	As concepts may inherit from other concepts, so can the projection definition of a super concept be used in the projection definition of a
	child concept. To indicate the inclusion the syntax <code>[=&gt; SUPER]</code> is used, where <code>SUPER</code> is the name of the super concept.
</p>
<p>
	For instance, in the UML metamodel both <code>AssociationClass</code> and <code>Class</code> inherit from the abstract
	<code>Classifier</code>. When building an editor for the UML metamodel, one may define the projections as follows. The entries for
	<code>attributes</code>, <code>operations</code>, and <code>states</code> will appear for both child concepts.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token class-name">Classifier</span> &#123;
        <span class="token punctuation">[</span>
        <span class="token punctuation">[</span>?&lt;attributes>  $&#123;<span class="token function"><span class="token variable">self</span>.attributes <span class="token keyword">vertical</span> <span class="token keyword">terminator</span> [;] </span>&#125;<span class="token punctuation">]</span>
        <span class="token punctuation">[</span>?&lt;operations>  $&#123;<span class="token function"><span class="token variable">self</span>.operations <span class="token keyword">vertical</span> <span class="token keyword">terminator</span> [;] </span>&#125;<span class="token punctuation">]</span>
        <span class="token punctuation">[</span>?&lt;states>      $&#123;<span class="token function"><span class="token variable">self</span>.states     <span class="token keyword">vertical</span> <span class="token keyword">separator</span> [;] </span>&#125;<span class="token punctuation">]</span>
        <span class="token punctuation">]</span>
&#125;

<span class="token class-name">AssociationClass</span> &#123;
        <span class="token punctuation">[</span>
        <span class="token punctuation">[</span>?$&#123;<span class="token function"><span class="token variable">self</span>.visibility</span>&#125;<span class="token punctuation">]</span> &lt;associationclass> $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125;
        $&#123;<span class="token function"><span class="token variable">self</span>.end1</span>&#125; &lt;-> $&#123;<span class="token function"><span class="token variable">self</span>.end2</span>&#125;
        
        <span class="token punctuation">[</span>=> Classifier <span class="token punctuation">]</span>
        &lt;endassociationclass>
        <span class="token punctuation">]</span>
&#125;

<span class="token class-name">Class</span> &#123;
    <span class="token punctuation">[</span>
    <span class="token punctuation">[</span>?$&#123;<span class="token function">visibility</span>&#125;<span class="token punctuation">]</span> $&#123;<span class="token variable">self</span>.isAbstract <span class="token punctuation">[</span>&lt;<span class="token keyword">abstract</span>><span class="token punctuation">]</span>&#125; &lt;class> $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125;
    <span class="token punctuation">[</span>?&lt;specializes>  $&#123;<span class="token function"><span class="token variable">self</span>.generalizations <span class="token keyword">horizontal</span> <span class="token keyword">separator</span> [, ] </span>&#125;<span class="token punctuation">]</span>
    <span class="token punctuation">[</span>?&lt;<span class="token keyword">implements</span>>   $&#123;<span class="token function"><span class="token variable">self</span>.interfaces      <span class="token keyword">horizontal</span> <span class="token keyword">separator</span> [, ] </span>&#125;<span class="token punctuation">]</span>
    
    <span class="token punctuation">[</span>=> Classifier<span class="token punctuation">]</span>
    &lt;endclass>
    <span class="token punctuation">]</span>
&#125;</code>`}</pre>

<PrevNextSection {prevLink} {nextLink} />
