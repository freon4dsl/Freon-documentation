<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'The Fre-tool Interfaces', visible: false, ref: '#the-fre-tool-interfaces-1' },
		{ title: 'FreEnvironment', visible: false, ref: '#freenvironment-2' },
		{ title: 'FreScoper', visible: false, ref: '#frescoper-3' },
		{ title: 'FreValidator', visible: false, ref: '#frevalidator-4' },
		{ title: 'FreTyper', visible: false, ref: '#fretyper-5' },
		{ title: 'FreReader', visible: false, ref: '#frereader-6' },
		{ title: 'FreWriter', visible: false, ref: '#frewriter-7' },
		{ title: 'FreStdlib', visible: false, ref: '#frestdlib-8' }
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

	let prevLink = '/Documentation/Under_the_Hood/Editor_Interfaces';
	let nextLink = '/Documentation/Terminology';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="the-fre-tool-interfaces-1" bind:intersecting={visible[0]}>The Fre-tool Interfaces</SectionComponent>
<p>
	There are two series of interfaces that make Freon and its generated code extensible and flexible. The first series are the interfaces
	implemented by the generated code:
</p>
<SectionComponent tag="h2" id="freenvironment-2" bind:intersecting={visible[1]}>FreEnvironment</SectionComponent>
<p>
	An object that implements <code>FreEnvironment</code> holds the information about where to find all parts of the language environment. It is
	usually a singleton object.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">/* File: core/src/environment/FreEnvironment.ts */</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">FreEnvironment</span> <span class="token punctuation">&#123;</span>
	<span class="token comment">/**
	 * Creates a new model, an implementation of the language defined in the .ast file
	 * @param name
	 */</span>
	<span class="token function">newModel</span><span class="token punctuation">(</span>modelName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> FreModel<span class="token punctuation">;</span>

	scoper<span class="token operator">:</span> FreScoper<span class="token punctuation">;</span>
	typer<span class="token operator">:</span> FreTyper<span class="token punctuation">;</span>
	validator<span class="token operator">:</span> FreValidator<span class="token punctuation">;</span>
	editor<span class="token operator">:</span> FreEditor<span class="token punctuation">;</span>
	stdlib<span class="token operator">:</span> FreStdlib<span class="token punctuation">;</span>
	writer<span class="token operator">:</span> FreWriter<span class="token punctuation">;</span>
	reader<span class="token operator">:</span> FreReader<span class="token punctuation">;</span>

	<span class="token comment">// projectionalEditorComponent: ProjectionalEditor;</span>
	languageName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
	unitNames<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
	fileExtensions<span class="token operator">:</span> Map<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token operator">></span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<SectionComponent tag="h2" id="frescoper-3" bind:intersecting={visible[2]}>FreScoper</SectionComponent>
<p>
	An object that implements <code>FreScoper</code> is able to return the named elements that are visible for a certain AST node. This node can
	be a ‘normal’ model element, or it can be a namespace. If the node is a ‘normal’ element, the names visbible in its (lexical) surrounding namespace
	are returned.
</p>
<p>If you want to write your own scoper you will need to implement this interface.</p>
<pre class="language-ts">{@html `<code class="language-ts"><span class="token comment">/* File: core/src/scoper/FreScoper.ts */</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">FreScoper</span> <span class="token punctuation">&#123;</span>
	<span class="token comment">/**
	 * Returns the element to which the 'pathname' refers. If the elment cannot be found, or if the element is
	 * not visible (private) from the location of 'modelelement', then null is returned.
	 * If present, then the search is limited to elements which type is 'metatype'.
	 *
	 * @param modelelement: the containing element, where 'pathname' should be visible
	 * @param doNotSearch: the role or property name of the element that we are searching for
	 * @param pathname: the name or series of names of the element that we are searching for
	 * @param metatype: the metatype of the element that we are searching for
	 */</span>
	<span class="token function">resolvePathName</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> FreElement<span class="token punctuation">,</span> doNotSearch<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> pathname<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> metatype<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> FreNamedElement<span class="token punctuation">;</span>

	<span class="token comment">/**
	 *   Returns true if 'name' is known in the namespace containing 'modelelement' or one
	 *   of its surrounding namespaces.
	 *
	 *   When parameter 'metatype' is present, it returns true if the element named 'name'
	 *   is an instance of 'metatype'. There is no default setting for this parameter.
	 *
	 *   When parameter 'excludeSurrounding' is present, it returns true if the element named 'name'
	 *   is known in the namespace containing 'modelelement', without looking in surrounding namespaces.
	 *
	 * @param modelElement
	 * @param name
	 * @param metatype
	 * @param excludeSurrounding
	 */</span>
	<span class="token function">isInScope</span><span class="token punctuation">(</span>modelElement<span class="token operator">:</span> FreElement<span class="token punctuation">,</span> name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> metatype<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> excludeSurrounding<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 *   Returns all elements that are visible in the namespace containing 'modelelement' or one
	 *   of its surrounding namespaces.
	 *
	 *   When parameter 'metatype' is present, it returns all elements that are an instance of 'metatype'.
	 *   There is no default setting for this parameter.
	 *
	 *   When parameter 'excludeSurrounding' is present, it returns all elements that are visible in
	 *   the namespace containing 'modelelement', without looking in surrounding namespaces. Elements in
	 *   surrounding namespaces are normally shadowed by elements with the same name in an inner namespace.
	 *
	 * @param modelelement
	 * @param metatype
	 * @param excludeSurrounding
	 */</span>
	<span class="token function">getVisibleElements</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> FreElement<span class="token punctuation">,</span> metatype<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> excludeSurrounding<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> FreNamedElement<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 *   Returns the element named 'name' which is visible in the namespace containing 'modelelement' or one
	 *   of its surrounding namespaces.
	 *
	 *   When parameter 'metatype' is present, it returns the element that is an instance of 'metatype'.
	 *   There is no default setting for this parameter.
	 *
	 *   When parameter 'excludeSurrounding' is present, it returns the element that is visible in
	 *   the namespace containing 'modelelement', without looking in surrounding namespaces. Elements in
	 *   surrounding namespaces are normally shadowed by elements with the same name in an inner namespace.
	 *
	 * @param modelelement
	 * @param name
	 * @param metatype
	 * @param excludeSurrounding
	 */</span>
	<span class="token function">getFromVisibleElements</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> FreElement<span class="token punctuation">,</span> name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> metatype<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> excludeSurrounding<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> FreNamedElement<span class="token punctuation">;</span>

	<span class="token comment">/**
	 *   Does the same as getVisibleElements, only it does not return the elements,
	 *   but the names of the elements.
	 *
	 * @param modelelement
	 * @param metatype
	 * @param excludeSurrounding
	 */</span>
	<span class="token function">getVisibleNames</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> FreElement<span class="token punctuation">,</span> metatype<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> excludeSurrounding<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<SectionComponent tag="h2" id="frevalidator-4" bind:intersecting={visible[3]}>FreValidator</SectionComponent>
<p>
	An object that implements <code>FreValidator</code> is able to validate a node in the AST. The validation can be only on the node itself, or
	it can include all child-nodes recursively.
</p>
<p>
	The errors that are found are returned in the form of a list of <code>FreError</code> objects. Every <code>FreError</code>
	holds a message, and a reference to the node that is faulty.
</p>
<p>If you want to write your own validator you will need to implement this interface.</p>
<pre class="language-ts">{@html `<code class="language-ts"><span class="token comment">/* File: core/src/validator/FreValidator.ts */</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">FreValidator</span> <span class="token punctuation">&#123;</span>
	<span class="token comment">/**
	 * Returns a list of errors on 'modelelement' according to the validation rules
	 * stated in the validation definition. If 'includeChildren' is true, the child
	 * nodes of 'modelelement' in the AST are also checked.
	 *
	 * @param modelelement
	 * @param includeChildren
	 */</span>
	<span class="token function">validate</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> FreElement<span class="token punctuation">,</span> includeChildren<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> FreError<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<h3 id="freerror-1">FreError</h3>
<pre class="language-ts">{@html `<code class="language-ts"><span class="token comment">/* File: core/src/validator/FreValidator.ts */</span>

<span class="token comment">/**
 * An error consists of a message coupled to the faulty AST node, either a model
 * element or a list of model elements.
 */</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">FreError</span> <span class="token punctuation">&#123;</span>
	message<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token comment">// human-readable error message</span>
	reportedOn<span class="token operator">:</span> FreElement <span class="token operator">|</span> FreElement<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// the model element that does not comply</span>
	locationdescription<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token comment">// human-readable indication of 'reportedOn'</span>
	severity<span class="token operator">:</span> FreErrorSeverity<span class="token punctuation">;</span> <span class="token comment">// indication of how serious the error is, default is 'ToDo'</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<SectionComponent tag="h1" id="fretyper-5" bind:intersecting={visible[4]}>FreTyper</SectionComponent>
<p>An object that implements <code>FreTyper</code> is answer a set of question concerning the type of a node in the AST.</p>
<p>If you want to write your own typer you will need to implement this interface.</p>
<pre class="language-ts">{@html `<code class="language-ts"><span class="token comment">/* File: core/src/typer/FreTyper.ts */</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">FreTyper</span> <span class="token punctuation">&#123;</span>
	<span class="token comment">/**
	 * Returns the type of 'modelelement' according to the type rules in the Typer Definition
	 * @param modelelement
	 */</span>
	<span class="token function">inferType</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> FreElement<span class="token punctuation">)</span><span class="token operator">:</span> FreElement<span class="token punctuation">;</span>

	<span class="token comment">/**
	 * Returns true if the type that inferType(elem1) returns equals the type inferType(elem2) returns.
	 * This is a strict equal.
	 * @param elem1
	 * @param elem2
	 */</span>
	<span class="token function">equalsType</span><span class="token punctuation">(</span>elem1<span class="token operator">:</span> FreElement<span class="token punctuation">,</span> elem2<span class="token operator">:</span> FreElement<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 * Returns true if the type that inferType(elem1) returns conforms to the type inferType(elem2) returns, according to
	 * the type rules in the Typer definition. The direction is elem2 conforms to elem1.
	 * @param elem1
	 * @param elem2
	 */</span>
	<span class="token function">conformsTo</span><span class="token punctuation">(</span>elem1<span class="token operator">:</span> FreElement<span class="token punctuation">,</span> elem2<span class="token operator">:</span> FreElement<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 * Returns true if all types in typelist1 conform to the types in typelist2, in the given order.
	 * @param typelist1
	 * @param typelist2
	 */</span>
	<span class="token function">conformList</span><span class="token punctuation">(</span>typelist1<span class="token operator">:</span> FreElement<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> typelist2<span class="token operator">:</span> FreElement<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 * Returns true if 'elem' is marked as 'type' in the Typer definition
	 * @param elem
	 */</span>
	<span class="token function">isType</span><span class="token punctuation">(</span>elem<span class="token operator">:</span> FreElement<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">/**
 * This interface is being used to implement the three-tier approach.
 * Both the generated and custom type providers should implement this interface.
 * The generated class that implement the FreTyper interface connects all the classes
 * that implement this interface and returns the correct value to the (external) user.
 *
 * When the implementor of this interface does not provide for a result of one of the methods,
 * this method should return 'null'.
 */</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">FreTyperPart</span> <span class="token punctuation">&#123;</span>
	<span class="token comment">/**
	 * Returns the type of 'modelelement' according to the type rules in the Typer Definition.
	 * @param modelelement
	 */</span>
	<span class="token function">inferType</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> FreElement<span class="token punctuation">)</span><span class="token operator">:</span> FreElement <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 * Returns true if the type that inferType(elem1) returns equals the type inferType(elem2) returns.
	 * This is a strict equal.
	 * @param elem1
	 * @param elem2
	 */</span>
	<span class="token function">equalsType</span><span class="token punctuation">(</span>elem1<span class="token operator">:</span> FreElement<span class="token punctuation">,</span> elem2<span class="token operator">:</span> FreElement<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 * Returns true if the type that inferType(elem1) returns conforms to the type inferType(elem2) returns, according to
	 * the type rules in the Typer definition. The direction is elem2 conforms to elem1.
	 * @param elem1
	 * @param elem2
	 */</span>
	<span class="token function">conformsTo</span><span class="token punctuation">(</span>elem1<span class="token operator">:</span> FreElement<span class="token punctuation">,</span> elem2<span class="token operator">:</span> FreElement<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 * Returns true if all types in typelist1 conform to the types in typelist2, in the given order.
	 * @param typelist1
	 * @param typelist2
	 */</span>
	<span class="token function">conformList</span><span class="token punctuation">(</span>typelist1<span class="token operator">:</span> FreElement<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> typelist2<span class="token operator">:</span> FreElement<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 * Returns true if 'elem' is marked as 'type' in the Typer definition.
	 * @param elem
	 */</span>
	<span class="token function">isType</span><span class="token punctuation">(</span>elem<span class="token operator">:</span> FreElement<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<SectionComponent tag="h2" id="frereader-6" bind:intersecting={visible[5]}>FreReader</SectionComponent>
<p>An object that implements <code>FreReader</code> is able to read a string representation of a node in the AST.</p>
<p>If you want to write your own parser/filereader you will need to implement this interface.</p>
<pre class="language-ts">{@html `<code class="language-ts"><span class="token comment">/* File: core/src/reader/FreReader.ts */</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">FreReader</span> <span class="token punctuation">&#123;</span>
	<span class="token comment">/**
	 * Parses the 'input' into a model unit of type 'metatype'.
	 * May throw an Error if a syntax error occurs.
	 * @param input
	 * @param metatype
	 */</span>
	<span class="token function">readFromString</span><span class="token punctuation">(</span>input<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> metatype<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> FreElement<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<SectionComponent tag="h2" id="frewriter-7" bind:intersecting={visible[6]}>FreWriter</SectionComponent>
<p>An object that implements <code>FreWriter</code> is able to build a string representation of a node in the AST.</p>
<p>If you want to write your own unparser/writer you will need to implement this interface.</p>
<pre class="language-ts">{@html `<code class="language-ts"><span class="token comment">/* File: core/src/writer/FreWriter.ts */</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">FreWriter</span> <span class="token punctuation">&#123;</span>
	<span class="token comment">/**
	 * Returns a string representation of 'modelelement'.
	 * If 'short' is present and true, then a single-line result will be given.
	 * Otherwise, the result is always a multi-line string.
	 * Note that the single-line-string cannot be parsed into a correct model.
	 *
	 * @param modelelement
	 * @param startIndent
	 * @param short
	 */</span>
	<span class="token function">writeToString</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> FreElement<span class="token punctuation">,</span> startIndent<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> short<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 * Returns a string representation of 'modelelement', divided into an array of strings,
	 * each of which contain a single line (without newline).
	 * If 'short' is present and true, then a single-line result will be given.
	 * Otherwise, the result is always a multi-line string.
	 *
	 * @param modelelement
	 * @param startIndent
	 * @param short
	 */</span>
	<span class="token function">writeToLines</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> FreElement<span class="token punctuation">,</span> startIndent<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> short<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 * Returns the name of 'modelelement' if it has one, else returns
	 * a short unparsing of 'modelelement'.
	 * Used by the validator to produce readable error messages.
	 *
	 * @param modelelement
	 */</span>
	<span class="token function">writeNameOnly</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> FreElement<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<SectionComponent tag="h2" id="frestdlib-8" bind:intersecting={visible[7]}>FreStdlib</SectionComponent>
<p>An object that implements <code>FreStdlib</code> holds a number of predefined AST nodes, which can be referred to in the model AST.</p>
<p>If you want to write your own standard library you will need to implement this interface.</p>
<pre class="language-ts">{@html `<code class="language-ts"><span class="token comment">/* File: core/src/stdlib/FreStdlib.ts  */</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">FreStdlib</span> <span class="token punctuation">&#123;</span>
	elements<span class="token operator">:</span> FreNamedElement<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 * Returns the element named 'name', if it can be found in this library.
	 * When 'metatype' is provided, the element is only returned when it is
	 * an instance of this metatype.
	 * @param name
	 * @param metatype
	 */</span>
	<span class="token function">find</span><span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> metatype<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> FreNamedElement<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<p>
	The second series of interfaces are those that define parts of the
	<a href="/Documentation/Under_the_Hood/Editor_Framework">Freon Editor Framework</a>.
</p>

<PrevNextSection {prevLink} {nextLink} />
