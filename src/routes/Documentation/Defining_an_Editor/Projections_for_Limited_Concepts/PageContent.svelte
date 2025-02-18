<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Projections for Limited Concepts', visible: false, ref: '#projections-for-limited-concepts-1' },
		{ title: 'Single Valued Properties', visible: false, ref: '#single-valued-properties-2' },
		{ title: 'Multivalued Properties', visible: false, ref: '#multivalued-properties-3' }
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

	let prevLink = '/Documentation/Defining_an_Editor/Number_Projections';
	let nextLink = '/Documentation/Defining_an_Editor/Binary_Expressions';

	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="projections-for-limited-concepts-1" bind:intersecting={visible[0]}
	>Projections for Limited Concepts</SectionComponent
>
<p>
	There are two controls for limited concepts. They differ, based on whether the property is a list or a single value. For single values the
	property can be displayed as a radio group, where all possible values of the limited concept are options. When the property is a list of
	limited values, it can be displayed as a list of checkboxes.
</p>
<p>The example that is used in the documentation defines the limited concept <code>InsuranceTheme</code> as a simple enumeration.</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L129-L131
</span>
<span class="token keyword">limited</span> <span class="token class-name">InsuranceTheme</span> &#123;        <span class="token comment">// limited defined as a simple enumeration
</span>    HomeTheme; HealthTheme; LegalTheme;
&#125;</code>`}</pre>
<p>
	This concept is twice used as property type. Once as a single value in <code>BaseProduct</code>, and once as a list in
	<code>InsurancePart</code>.
</p>
<SectionComponent tag="h2" id="single-valued-properties-2" bind:intersecting={visible[1]}>Single Valued Properties</SectionComponent>
<p>The metamodel for <code>BaseProduct</code> is the following.</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L24-L39
</span>
<span class="token keyword">concept</span> <span class="token class-name">BaseProduct</span> &#123;
    name: <span class="token builtin">identifier</span>;               <span class="token comment">// internal name
</span>    isUnderConstruction: <span class="token builtin">boolean</span>;   <span class="token comment">// defines whether this base product is still 'raw'
</span>    theme: <span class="token class-name">InsuranceTheme</span>;          <span class="token comment">// the 'kind' of insurance
</span>    parts: <span class="token class-name">InsurancePart</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;         <span class="token comment">// all parts of this product
</span>    <span class="token comment">// The following properties are present to show the different options for displaying booleans.
</span>    isApprovedLevel1: <span class="token builtin">boolean</span>;
    isApprovedLevel2: <span class="token builtin">boolean</span>;
    isApprovedLevel3: <span class="token builtin">boolean</span>;
    yieldsProfit: <span class="token builtin">boolean</span>;
    range: <span class="token builtin">number</span>;
    nrOfUse: <span class="token builtin">number</span>;
    <span class="token comment">// The previoud two properties are present to show the different options for displaying numbers.
</span>    <span class="token comment">// The following property is present to show the use of an external DatePicker component.
</span>    date: <span class="token builtin">string</span>;
&#125;</code>`}</pre>
<p>We combine this metamodel with the following projection.</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-main-controls.edit#L5-L17
</span>
<span class="token class-name">BaseProduct</span> &#123;<span class="token punctuation">[</span>
    Base Products $&#123;<span class="token function">name</span>&#125; for $&#123;<span class="token function">theme <span class="token keyword">radio</span></span>&#125;
        is still under construction: $&#123;<span class="token function"><span class="token variable">self</span>.isUnderConstruction <span class="token keyword">switch</span></span>&#125;
        is approved level1: $&#123;<span class="token function"><span class="token variable">self</span>.isApprovedLevel1 <span class="token keyword">radio</span> [Sure | NoWay]</span>&#125;
        is approved level2: $&#123;<span class="token function"><span class="token variable">self</span>.isApprovedLevel2 <span class="token keyword">inner-switch</span></span>&#125;
        is approved level3: $&#123;<span class="token function"><span class="token variable">self</span>.isApprovedLevel3 <span class="token keyword">checkbox</span></span>&#125;
        yields profit: $&#123;<span class="token variable">self</span>.yieldsProfit <span class="token keyword">text</span> <span class="token punctuation">[</span>Plenty | Little<span class="token punctuation">]</span>&#125;
        expected nr of use: $&#123;<span class="token function"><span class="token variable">self</span>.nrOfUse</span>&#125;
        range: $&#123;<span class="token function"><span class="token variable">self</span>.range <span class="token keyword">slider</span></span>&#125;


        $&#123;<span class="token function">parts</span>&#125;
<span class="token punctuation">]</span>&#125;</code>`}</pre>
<p>And the result looks like this.</p>
<Figure
	imageName={'documentation/Documentation-Limited-Projections-screenshot1.png'}
	caption={'A control for a single value of limited type'}
	figureNumber={1}
/>
<SectionComponent tag="h2" id="multivalued-properties-3" bind:intersecting={visible[2]}>Multivalued Properties</SectionComponent>
<p>The metamodel for <code>InsuranceProduct</code> is the following.</p>
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
<p>Again, we combine this metamodel with a projection.</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-main-controls.edit#L19-L30
</span>
<span class="token class-name">InsuranceProduct</span> &#123;<span class="token punctuation">[</span>
    Insurance Product $&#123;<span class="token function">name</span>&#125; ( public name: $&#123;<span class="token function">productName</span>&#125; ) USES $&#123;<span class="token function">basedOn <span class="token keyword">horizontal</span> <span class="token keyword">separator</span>[, ]</span>&#125;
        Themes: $&#123;<span class="token function">themes <span class="token keyword">checkbox</span></span>&#125;
        Premium: $&#123;<span class="token function">advertisedPremium</span>&#125; per $&#123;<span class="token function">nrPremiumDays</span>&#125;
        Insured risks:
            $&#123;<span class="token function">parts <span class="token keyword">vertical</span> <span class="token keyword">terminator</span> [;]</span>&#125;
        Calculation
            <span class="token punctuation">[</span>? Risk adjusted by = $&#123;<span class="token function">riskAdjustment</span>&#125; <span class="token punctuation">]</span>
            calculated premium: $&#123;<span class="token function">calculation</span>&#125;
        <span class="token punctuation">[</span>?Helper functions:
            $&#123;<span class="token function">helpers <span class="token keyword">vertical</span></span>&#125;<span class="token punctuation">]</span>
<span class="token punctuation">]</span>&#125;</code>`}</pre>
<p>And the result is the following.</p>
<Figure
	imageName={'documentation/Documentation-Limited-Projections-screenshot2.png'}
	caption={'A control for a multivalued property of limited type'}
	figureNumber={2}
/>

<PrevNextSection {prevLink} {nextLink} />
