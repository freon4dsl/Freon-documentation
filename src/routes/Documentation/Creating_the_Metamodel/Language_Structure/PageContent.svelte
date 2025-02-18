<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'The Language Structure', visible: false, ref: '#the-language-structure-1' },
		{ title: 'Model', visible: false, ref: '#model-2' },
		{ title: 'Model unit', visible: false, ref: '#model-unit-3' },
		{ title: 'Concept', visible: false, ref: '#concept-4' },
		{ title: 'Expression Concept', visible: false, ref: '#expression-concept-5' },
		{ title: 'Binary Expression Concept', visible: false, ref: '#binary-expression-concept-6' },
		{ title: 'Limited Concept', visible: false, ref: '#limited-concept-7' },
		{ title: 'Interface', visible: false, ref: '#interface-8' }
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

	let prevLink = '/Documentation/Creating_the_Metamodel';
	let nextLink = '/Documentation/Creating_the_Metamodel/Defining_Properties';

	import Note from '$lib/notes/Note.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="the-language-structure-1" bind:intersecting={visible[0]}>The Language Structure</SectionComponent>
<SectionComponent tag="h2" id="model-2" bind:intersecting={visible[1]}>Model</SectionComponent>
<p>
	A <em>model</em> is the root of the abstract syntax tree. It may hold any number of model units as children. These model units may be of different
	type. For instance, you can have model units that define the items in a home automation system, and other model units that define the rules
	that apply in this system.
</p>
<Note
	><svelte:fragment slot="header">Models are never explicit in an editor</svelte:fragment><svelte:fragment slot="content">
		The model is never shown in an editor as a whole. It is always shown in parts: the model units. However, the provided webapp does 'show'
		the model and the units, that are part of it, in its left panel.
	</svelte:fragment></Note
>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L7-L10
</span>
<span class="token keyword">model</span> <span class="token class-name">InsuranceModel</span> &#123;
    parts: <span class="token class-name">Part</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;              <span class="token comment">// units that hold partial definitions of insurance products
</span>    products: <span class="token class-name">Product</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;        <span class="token comment">// units that hold sellable insurance products
</span>&#125;</code>`}</pre>
<SectionComponent tag="h2" id="model-unit-3" bind:intersecting={visible[2]}>Model unit</SectionComponent>
<p>
	A <em>model unit</em> is a part of the model that can be edited by the user independently of the rest of the model. A model unit is always
	a direct child of a model. Model units may not extend other units, or implement interfaces.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L12-L15
</span>
<span class="token keyword">modelunit</span> <span class="token class-name">Part</span> &#123;
    part: <span class="token class-name">BaseProduct</span>;          <span class="token comment">// one collection of partial insurance products
</span>    file-extension = <span class="token string">"base"</span>;    <span class="token comment">// the file extension used by the parser
</span>&#125;</code>`}</pre>
<p>
	Model units have one special entry called <code>file-extension</code>, as shown in the example above. This is an optional indication of
	the file type that the generated parser will associate with this model unit, i.e. an instance of the above model unit will be
	exported/imported to/from a file with extension ‘.base’.
</p>
<SectionComponent tag="h2" id="concept-4" bind:intersecting={visible[3]}>Concept</SectionComponent>
<p>
	A <em>concept</em> is the basic element of your language definition. It defines which instances can be present in a model created by your users.
</p>
<p>
	Concepts may extend one other concept using the keyword <code>base</code>, and implement multiple interfaces. Furthermore, they may be
	<em>abstract</em>.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L24-L28
</span>
<span class="token keyword">concept</span> <span class="token class-name">BaseProduct</span> &#123;
    name: <span class="token builtin">identifier</span>;               <span class="token comment">// internal name
</span>    isUnderConstruction: <span class="token builtin">boolean</span>;   <span class="token comment">// defines whether this base product is still 'raw'
</span>    theme: <span class="token class-name">InsuranceTheme</span>;          <span class="token comment">// the 'kind' of insurance
</span>    parts: <span class="token class-name">InsurancePart</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;         // all parts of this product</code>`}</pre>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L106-L112
</span>
    Percentage;
&#125;

<span class="token keyword">limited</span> NumberType <span class="token keyword">implements</span> <span class="token class-name">NamedType</span> &#123;
    Number;
&#125;
</code>`}</pre>
<SectionComponent tag="h2" id="expression-concept-5" bind:intersecting={visible[4]}>Expression Concept</SectionComponent>
<p>
	An <em>expression concept</em> is a concept represents an expression. The editor deals differently with these, in order to give your user a
	more natural editing experience.
</p>
<p>Expression concepts may extend another concept, and implement multiple interfaces.</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-expressions.ast#L10-L18
</span>
<span class="token keyword">abstract</span> <span class="token keyword">expression</span> Literal <span class="token keyword">base</span> <span class="token class-name">DocuExpression</span> &#123;
&#125;
<span class="token keyword">expression</span> EuroLiteral <span class="token keyword">base</span> <span class="token class-name">Literal</span> &#123;
    euros: <span class="token builtin">number</span>;
    cents: <span class="token builtin">number</span>;
&#125;
<span class="token keyword">expression</span> NumberLiteral <span class="token keyword">base</span> <span class="token class-name">Literal</span> &#123;
    value: <span class="token builtin">number</span>;
&#125;</code>`}</pre>
<Note>
	<svelte:fragment slot="header">Use a Single Root of the Expression AST</svelte:fragment>
	<svelte:fragment slot="content">
		<p>
			It is good practice to have all expression concepts inherit from one single root concept. This make it easy to have any type of
			expression as a part of the expression that you want to define.
		</p>
		<p>
			For instance, when defining a bracketed expression, i.e. an expression surrounded by brackets, you can simply use the root expression
			concept as type of the property that is to be put between the brackets.
		</p>
	</svelte:fragment></Note
>
<SectionComponent tag="h2" id="binary-expression-concept-6" bind:intersecting={visible[5]}>Binary Expression Concept</SectionComponent>
<p>
	A <em>binary expression concept</em> is an expression concept that has two sub expressions, <code>left</code> and <code>right</code>
	operands, and an operator, which in the concrete syntax is shown in the middle. For example, the expression <code>4 + 5</code>
	has as left operand <code>4</code>, as operator <code>+</code>, and as right operand <code>5</code>.
</p>
<p>
	Any concrete binary expression concept needs to have a priority. For example, in mathematics the priority of the multiplication is higher
	than the priority of the plus. The expression 5 + 67 * 8 should be read as 5 + (67 * 8), not as (5 + 67) * 8. The priorities are used by
	Freon to balance the abstract syntax tree (see <a href="/Background/Projectional_Editing#tree-balancing">Projectional Editing</a>). In
	<a href="/Documentation/Defining_an_Editor/Ease_of_Editing">Ease of Editing</a> you can find more information on how to set the concrete syntax
	for the operand.
</p>
<p>Binary expression concepts may extend one other concept, and implement multiple interfaces.</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-expressions.ast#L26-L46
</span>
<span class="token comment">// Basic binary expressions: plus, minus, multiply, divide
</span><span class="token keyword">abstract</span> <span class="token keyword">binary</span> <span class="token keyword">expression</span> BinaryExpression <span class="token keyword">base</span> <span class="token class-name">DocuExpression</span> &#123;
    left: <span class="token class-name">DocuExpression</span>;
    right: <span class="token class-name">DocuExpression</span>;
&#125;

<span class="token keyword">binary</span> <span class="token keyword">expression</span> PlusExpression <span class="token keyword">base</span> <span class="token class-name">BinaryExpression</span> &#123;
    <span class="token keyword">priority</span> = <span class="token number">4</span>;
&#125;

<span class="token keyword">binary</span> <span class="token keyword">expression</span> MinusExpression <span class="token keyword">base</span> <span class="token class-name">BinaryExpression</span> &#123;
    <span class="token keyword">priority</span> = <span class="token number">4</span>;
&#125;

<span class="token keyword">binary</span> <span class="token keyword">expression</span> MultiplyExpression <span class="token keyword">base</span> <span class="token class-name">BinaryExpression</span> &#123;
    <span class="token keyword">priority</span> = <span class="token number">8</span>;
&#125;

<span class="token keyword">binary</span> <span class="token keyword">expression</span> DivideExpression <span class="token keyword">base</span> <span class="token class-name">BinaryExpression</span> &#123;
    <span class="token keyword">priority</span> = <span class="token number">8</span>;
&#125;</code>`}</pre>
<SectionComponent tag="h2" id="limited-concept-7" bind:intersecting={visible[6]}>Limited Concept</SectionComponent>
<p>
	A <em>limited concept</em> is a concept that has a limited number of predefined instances. Actually, it is an extended version of an enumeration.
	All instances become part of the standard library of your language.
</p>
<p>
	A limited concept must always have a name property (<code>name: identifier;</code>), but if this is not provided in the definition then it
	is automatically created. Furthermore, when a predefined instance does not provide a value for the name, the name given in the .ast file
	is used. In this manner, you can define simple enumerations.
</p>
<p>
	Limited concepts may extend another concept, and implement multiple interfaces. Note that the definition of the concept includes the
	definition of the predefined instances. For example, the instances of <code>PremiumDays</code> are
	<code>Week</code>, <code>Month</code>, <code>Quarter</code>, <code>Semester</code>, and <code>Year</code>.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L129-L146
</span>
<span class="token keyword">limited</span> <span class="token class-name">InsuranceTheme</span> &#123;        <span class="token comment">// limited defined as a simple enumeration
</span>    HomeTheme; HealthTheme; LegalTheme;
&#125;

<span class="token keyword">limited</span> <span class="token class-name">PremiumDays</span> &#123;           <span class="token comment">// limited with various options
</span>    <span class="token comment">// if the 'name' property was not provided, it would have been generated
</span>    name: <span class="token builtin">identifier</span>;
    nrOfDays: <span class="token builtin">number</span>;
    <span class="token comment">// notations 'name:' and '"name":' are both correct
</span>    Week = &#123; name: <span class="token string">"Week"</span>, nrOfDays: <span class="token class-name">7</span> &#125;
    Month = &#123; <span class="token string">"name"</span>: <span class="token string">"Month"</span>, nrOfDays: <span class="token class-name">30</span> &#125;
    <span class="token comment">// the following instance gets the name "Quarter"
</span>    Quarter = &#123; nrOfDays: <span class="token class-name">91</span> &#125;
    <span class="token comment">// the following instance gets the name "Semester"
</span>    Semester = &#123; nrOfDays: <span class="token class-name">182</span> &#125;
    <span class="token comment">// the following instance gets the name "Year"
</span>    Year = &#123; nrOfDays: <span class="token class-name">365</span> &#125;
&#125;</code>`}</pre>
<Note>
	<svelte:fragment slot="header">No quotes around numbers and booleans.</svelte:fragment>
	<svelte:fragment slot="content">
		For number and boolean types, quotes (double or single) are not allowed around the values of properties of instances of limited
		concepts.
	</svelte:fragment>
</Note>
<SectionComponent tag="h2" id="interface-8" bind:intersecting={visible[7]}>Interface</SectionComponent>
<p>An <em>interface</em> is a concept that has no instances. It may extend multiple other interfaces.</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L96-L99
</span>
<span class="token comment">// concepts can implement interfaces.
</span><span class="token keyword">interface</span> <span class="token class-name">NamedType</span> &#123;
    name: <span class="token builtin">identifier</span>;
&#125;</code>`}</pre>
<p>The next section will explain the options for concept properties.</p>

<PrevNextSection {prevLink} {nextLink} />
