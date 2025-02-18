<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Boolean Projections', visible: false, ref: '#boolean-projections-1' },
		{ title: 'Textual - Two Keywords', visible: false, ref: '#textual---two-keywords-2' },
		{ title: 'Textual - One Keyword', visible: false, ref: '#textual---one-keyword-3' },
		{ title: 'Switch, Checkbox, Radio Control', visible: false, ref: '#switch-checkbox-radio-control-4' }
	];
	let visible: boolean[] = [];
	$: $mySections[0].visible = visible[0];
	$: $mySections[1].visible = visible[1];
	$: $mySections[2].visible = visible[2];
	$: $mySections[3].visible = visible[3];
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

	let prevLink = '/Documentation/Defining_an_Editor/Ease_of_Editing';
	let nextLink = '/Documentation/Defining_an_Editor/Number_Projections';

	import Note from '$lib/notes/Note.svelte';
	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="boolean-projections-1" bind:intersecting={visible[0]}>Boolean Projections</SectionComponent>
<p>
	Freon offers a number of different manners to display a boolean value, ranging from textual to visual controls, like a switch. Each option
	is described in the following.
</p>
<p>
	Note that you can set a default for the display of a boolean value in the <code>global</code> section of the default editor. See
	<a href="/Documentation/Defining_an_Editor/Global_Projections">Global Projections</a>.
</p>
<SectionComponent tag="h2" id="textual---two-keywords-2" bind:intersecting={visible[1]}>Textual - Two Keywords</SectionComponent>
<p>
	The strings that are displayed when a boolean property has a certain value, which normally would be either <code>true</code> or
	<code>false</code>, can be manipulated. In the projection two strings are added, the first is the text that represents the true-value, the
	second represents the false-value.
</p>
<p>
	In the next example, the concept <code>InsurancePart</code> has a simple property of type boolean called <code>isApproved</code>. In the
	projection for <code>isApproved</code> the strings <code>JA</code> and <code>NEE</code> will be shown for, respectively, true and false.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L41-L49
</span>
<span class="token comment">// An InsurancePart defines a single aspect of an InsuranceProduct together
</span><span class="token comment">// with the statistical risk of the event happening, and the maximum payout
</span><span class="token comment">// in case the insured event happens.
</span><span class="token keyword">concept</span> <span class="token class-name">InsurancePart</span> &#123;
    name: <span class="token builtin">identifier</span>;                       <span class="token comment">// internal name
</span>    isApproved: <span class="token builtin">boolean</span> = false;            <span class="token comment">// indication of approval status
</span>    statisticalRisk: <span class="token class-name">PercentageLiteral</span>;     <span class="token comment">// the statistical risk known for this event
</span>    maximumPayOut: <span class="token class-name">EuroLiteral</span>;             <span class="token comment">// maximum payout in case the insured event happens
</span>&#125;</code>`}</pre>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-main-default.edit#L28-L35
</span>

<span class="token class-name">InsurancePart</span>&#123;
<span class="token punctuation">[</span>
    Insurance Part $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125;
        risk assessment: $&#123;<span class="token function"><span class="token variable">self</span>.statisticalRisk</span>&#125;
        maximum payout: $&#123;<span class="token function"><span class="token variable">self</span>.maximumPayOut</span>&#125;
        is approved: $&#123;<span class="token function"><span class="token variable">self</span>.isApproved [JA | NEE]</span>&#125;
<span class="token punctuation">]</span></code>`}</pre>
<Figure
	imageName={'documentation/Documentation-Boolean-Projections-screenshot1.png'}
	caption={'Displaying different strings for boolean values'}
	figureNumber={1}
/>
<SectionComponent tag="h2" id="textual---one-keyword-3" bind:intersecting={visible[2]}>Textual - One Keyword</SectionComponent>
<p>
	It is not necessary to always provide two textual representations for a boolean value. If only one string is added to the projection, its
	value is taken to represent <code>true</code>. The absence of the string is representing <code>false</code>.
</p>
<p>
	In the next example, the property <code>isCompany</code> will be shown as the keyword <code>COMPANY</code>. When the value of the property
	is <code>true</code>, the keyword is shown. When the value is <code>false</code>, the keyword is not shown.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-main-default.edit#L67-L69
</span>

<span class="token class-name">Entity</span> &#123;<span class="token punctuation">[</span>
    $&#123;<span class="token function"><span class="token variable">self</span>.isCompany [COMPANY]</span>&#125; $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125;</code>`}</pre>
<p>This example would be displayed as one of …</p>
<pre class="language-txt">{@html `<code class="language-txt">COMPANY entity PhilipsEnterPrises &#123; // the value of isCompany is true
  ...
&#125;
entity FritsPhilips &#123; // the value of isCompany is false
  ...
&#125;</code>`}</pre>
<Note>
	<svelte:fragment slot="header">Keywords defined within a projection overwrite the global boolean projection</svelte:fragment>
	<svelte:fragment slot="content">
		In the default editor you can define global boolean projection. These will not be used when a more specific projection is present.
	</svelte:fragment>
</Note>
<SectionComponent tag="h2" id="switch-checkbox-radio-control-4" bind:intersecting={visible[3]}
	>Switch, Checkbox, Radio Control</SectionComponent
>
<p>
	Freon provides four native boolean controls: two types of switches, a checkbox, and a radio group. Each is indicated by adding a keyword
	to the property projection. The possible keywords are:
</p>
<ul>
	<li><code>switch</code>, which shows a simple switch control,</li>
	<li><code>inner-switch</code>, which shows a switch that holds text for the true and false values,</li>
	<li><code>checkbox</code>, which shows an ordinary checkbox,</li>
	<li><code>radio</code>, which show a radio group with text for the true and false values,</li>
	<li><code>text</code>, which indicates that the boolean value should be shown as text.</li>
</ul>
<p>
	The latter is used to overwrite the global boolean projection, in case it demands one of the other options. When ever text is shown, the
	strings to be used as true and false values can be indicated between square brackets, in the same way as the values for textual
	representations are given. When they are not present, the global definition is taken. If that is also not present then the default is <code
		>true</code
	>
	and <code>false</code>.
</p>
<p>For the sake of the example, we have added a number of boolean properties to the concept <code>BaseProduct</code>.</p>
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
<p>Each of the boolean properties is displayed differently.</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-main-controls.edit#L7-L11
</span>
is still under construction: $&#123;<span class="token function"><span class="token variable">self</span>.isUnderConstruction <span class="token keyword">switch</span></span>&#125;
is approved level1: $&#123;<span class="token function"><span class="token variable">self</span>.isApprovedLevel1 <span class="token keyword">radio</span> [Sure | NoWay]</span>&#125;
is approved level2: $&#123;<span class="token function"><span class="token variable">self</span>.isApprovedLevel2 <span class="token keyword">inner-switch</span></span>&#125;
is approved level3: $&#123;<span class="token function"><span class="token variable">self</span>.isApprovedLevel3 <span class="token keyword">checkbox</span></span>&#125;
yields profit: $&#123;<span class="token variable">self</span>.yieldsProfit <span class="token keyword">text</span> <span class="token punctuation">[</span>Plenty | Little<span class="token punctuation">]</span>&#125;</code>`}</pre>
<p>
	The result of this projection is shown in the screenshot below. Note that the text used for property <code>self.isApprovedLevel2</code> is
	defined by the global boolean projection. See <a href="/Documentation/Defining_an_Editor/Global_Projections">Global Projections</a>.
</p>
<Figure
	imageName={'documentation/Documentation-Boolean-Projections-screenshot2.png'}
	caption={'Different boolean controls'}
	figureNumber={2}
/>

<PrevNextSection {prevLink} {nextLink} />
