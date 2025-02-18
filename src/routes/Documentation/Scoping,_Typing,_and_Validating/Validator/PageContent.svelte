<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Validator', visible: false, ref: '#validator-1' },
		{ title: 'Simple Value Rules', visible: false, ref: '#simple-value-rules-2' },
		{ title: 'List Rules', visible: false, ref: '#list-rules-3' },
		{ title: 'Valid Identifier Rules', visible: false, ref: '#valid-identifier-rules-4' },
		{ title: 'Type Check Rules', visible: false, ref: '#type-check-rules-5' },
		{ title: 'Custom Messages', visible: false, ref: '#custom-messages-6' },
		{ title: 'The Default Validation Rules', visible: false, ref: '#the-default-validation-rules-7' }
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

	let prevLink = '/Documentation/Scoping,_Typing,_and_Validating/Type_Provider';
	let nextLink = '/Documentation/Interpreter_Framework';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="validator-1" bind:intersecting={visible[0]}>Validator</SectionComponent>
<p>
	Validation is all about the rules that hold in your language. These rules are not the rules of the concrete syntax, but instead they
	provide an extra check of the model/AST.
</p>
<p>
	The <strong>validator</strong> definition provides the constraints or rules that should be true in the models build by your users. Any
	part of the validator definition must be included in a file with the extension <code>.valid</code>. All files with this extension in the
	<a href="/Documentation/Overview/Getting_Started#template-project-startup-3"><em>defs</em> folder</a>
	(i.e. the folder were you keep your definition files) are combined into one validator definition.
</p>
<p>Currently, there are four types of validation rules.</p>
<SectionComponent tag="h2" id="simple-value-rules-2" bind:intersecting={visible[1]}>Simple Value Rules</SectionComponent>
<p>
	Given a <a href="/Documentation/Creating_the_Metamodel/Defining_Properties#simple-properties-2">simple property</a>, its value can be
	limited to certain values.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/validator-extras.valid#L3-L6
</span>
<span class="token class-name">EntityAttribute</span> &#123;
    <span class="token variable">self</span>.numVal >= <span class="token number">12</span>;       <span class="token comment">// in .ast file: "numVal: number;"
</span>    <span class="token variable">self</span>.numVal &lt;= <span class="token number">30</span>;
&#125;</code>`}</pre>
<SectionComponent tag="h2" id="list-rules-3" bind:intersecting={visible[2]}>List Rules</SectionComponent>
<p>Given a list property, a <strong>not-empty rule</strong> can be stated. The list complies with the rule if it is not empty.</p>
<p>
	An <strong>is-unique rule</strong> is another rule that can be stated for a list property. The list complies when the value of the property
	is unique within the list.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/validator-docu.valid#L3-L7
</span>
<span class="token class-name">InsuranceProduct</span> &#123;
    <span class="token keyword">notEmpty</span> <span class="token variable">self</span>.parts;
    <span class="token keyword">isunique</span> name <span class="token keyword">in</span> <span class="token variable">self</span>.parts;
    <span class="token keyword">isunique</span> name <span class="token keyword">in</span> <span class="token variable">self</span>.helpers;
&#125;</code>`}</pre>
<SectionComponent tag="h2" id="valid-identifier-rules-4" bind:intersecting={visible[3]}>Valid Identifier Rules</SectionComponent>
<p>
	Given a simple property of type <em>identifier</em>, a <strong>valid-identifier-rule</strong> can be given. The property complies with the
	rule if it is a valid identifier according to the TypeScript definition.
</p>
<p>
	For a <em>valid-identifier-rule</em> the <code>validIdentifier</code> keyword is used followed by an optional simple property. When the
	property is present, this property is checked. When the property is not present, Freon assumes that the concept has a simple property
	named ‘<code>name</code>’ of type ‘<code>identifier</code>’, and it will check this property.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/validator-docu.valid#L27-L32
</span>
&#125;
<span class="token class-name">CalcFunction</span> &#123;
    <span class="token comment">// typecheck conformsTo (self.body, self.declaredType);
</span>    <span class="token keyword">isunique</span> name <span class="token keyword">in</span> <span class="token variable">self</span>.parameters;
    <span class="token class-name">validIdentifier</span>
    &#123;</code>`}</pre>
<SectionComponent tag="h2" id="type-check-rules-5" bind:intersecting={visible[4]}>Type Check Rules</SectionComponent>
<p>
	Given the rules in the typer definition, rules can be stated to ensure type compliance. To indicate a <strong>type checking rule</strong>
	the keyword <code>typecheck</code> is used, followed by either <code>equalsType</code> or <code>conformsTo</code>. The first demands that
	the types of the two properties given are equal. The second demands that the type of the first conforms to the type of the second.
</p>
<p>In type checking rules it is possible to use predefined instances of a limited concept.</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/validator-docu.valid#L10-L12
</span>
<span class="token class-name">MinusExpression</span>  &#123;
    <span class="token keyword">typecheck</span> <span class="token variable">equalsType</span>( <span class="token variable">self</span>.left, <span class="token variable">self</span>.right );
&#125;</code>`}</pre>
<SectionComponent tag="h2" id="custom-messages-6" bind:intersecting={visible[5]}>Custom Messages</SectionComponent>
<p>
	The generated error messages can be changed into custom ones. Similar to the editor definition, properties can be used in the error
	message using the syntax <code>$&#123;propName&#125;</code>. The severity of the error may or may not be indicated. The possible values
	are “error”, “warning”, “hint”, “improvement”, “todo”, and “info”. It defaults to “todo”.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/validator-docu.valid#L28-L36
</span>
<span class="token class-name">CalcFunction</span> &#123;
    <span class="token comment">// typecheck conformsTo (self.body, self.declaredType);
</span>    <span class="token keyword">isunique</span> name <span class="token keyword">in</span> <span class="token variable">self</span>.parameters;
    <span class="token class-name">validIdentifier</span>
    &#123;
        <span class="token keyword">message</span>: <span class="token string">"El nombre '$&#123;self.name&#125;' no es un identificador correcto."</span>,
        <span class="token keyword">severity</span>: <span class="token builtin">error</span>
    &#125;;
&#125;</code>`}</pre>
<SectionComponent tag="h1" id="the-default-validation-rules-7" bind:intersecting={visible[6]}>The Default Validation Rules</SectionComponent
>
<p>There are just a few default validation rules:</p>
<ul>
	<li>Non-optional properties must be set.</li>
	<li>Non-optional lists must include one element.</li>
	<li>Names of model units should be valid identifiers.</li>
	<li>Any reference must be present.</li>
</ul>

<PrevNextSection {prevLink} {nextLink} />
