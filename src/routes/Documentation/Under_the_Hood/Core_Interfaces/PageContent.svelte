<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'The Freon Core Interfaces', visible: false, ref: '#the-freon-core-interfaces-1' },
		{ title: 'FreNode', visible: false, ref: '#frenode-2' },
		{ title: 'FreNamedElement', visible: false, ref: '#frenamedelement-3' },
		{ title: 'FreAction', visible: false, ref: '#freaction-4' },
		{ title: 'FreCustomAction', visible: false, ref: '#frecustomaction-5' }
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

	let prevLink = '/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types';
	let nextLink = '/Documentation/Under_the_Hood/Editor_Interfaces';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="the-freon-core-interfaces-1" bind:intersecting={visible[0]}>The Freon Core Interfaces</SectionComponent>
<SectionComponent tag="h2" id="frenode-2" bind:intersecting={visible[1]}>FreNode</SectionComponent>
<p>
	As Freon uses the AST for projections and behavior, it needs to know about the type of elements in the AST. To allow Freon to work, each
	element type that occurs in the AST needs to implement the <code>FreElement</code> interface. This interface is kept as small as possible,
	to allow Freon to be used for any AST.
</p>
<pre class="language-ts">{@html `<code class="language-ts"><span class="token comment">/* File: core/src/language/FreNode.ts */</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">FreElement</span> <span class="token punctuation">&#123;</span>
	<span class="token function">piId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

	<span class="token function">piLanguageConcept</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

	<span class="token function">piContainer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> FreContainerDescriptor<span class="token punctuation">;</span>

	<span class="token function">piIsModel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>

	<span class="token function">piIsUnit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>

	<span class="token function">piIsExpression</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>

	<span class="token function">piIsBinaryExpression</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<p>The main two elements in this interface are:</p>
<ul>
	<li><code>piId()</code>, which should return en unique id for each element in the AST.</li>
	<li><code>piContainer()</code> which should return a descriptor for the container (parent) of an element in the AST.</li>
</ul>
<p>
	The two functions <code>piIsExpression()</code> and <code>piIsBinaryExpression()</code> are only needed when your language contains
	expressions, as Freon includes special handling of expressions. To start with, these functions can be defined to simply return
	<code>false</code>.
</p>
<p>
	Note that Freon does not need to know anything about the structure of your language. No need to know the available element type, nor the
	properties of en element type, nor anything else. This is by design, as Freon is not meant to be a full Language Workbench, but instead
	meant to be used with multiple language workbenches , or none.
</p>
<SectionComponent tag="h2" id="frenamedelement-3" bind:intersecting={visible[2]}>FreNamedElement</SectionComponent>
<p>
	An object that implements <code>FreNamedElement</code> can be a node in a model AST, similar to xref:element-interface[<code
		>FreElement</code
	>] implementations. The difference is that <code>FreNamedElements</code> have a name property.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">/* File: core/src/language/FreNamedElement.ts  */</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">FreNamedElement</span> <span class="token keyword">extends</span> <span class="token class-name">FreElement</span> <span class="token punctuation">&#123;</span>
	name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<SectionComponent tag="h2" id="freaction-4" bind:intersecting={visible[3]}>FreAction</SectionComponent>
<pre class="language-ts">{@html `<code class="language-ts"><span class="token comment">/* File: core/src/language/FreAction.ts  */</span>

<span class="token keyword">export</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">FreAction</span> <span class="token punctuation">&#123;</span>
	<span class="token comment">/**
	 * The trigger to activate this behavior
	 */</span>
	trigger<span class="token operator">:</span> FreTriggerType<span class="token punctuation">;</span>

	<span class="token comment">/**
	 * The box roles in which this trigger is active
	 */</span>
	activeInBoxRoles<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 * Optional callback function that returns whether the trigger is applicable for the specific box.
	 */</span>
	isApplicable<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>box<span class="token operator">:</span> Box<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 * The role of the box that should be selected after the action has been executing.
	 */</span>
	boxRoleToSelect<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

	<span class="token comment">/**
	 * The caret position where the cursor should be positioned after the action has been executed.
	 * Only applicable if the selected box is a TextBox.
	 */</span>
	caretPosition<span class="token operator">?</span><span class="token operator">:</span> FreCaret<span class="token punctuation">;</span>

	<span class="token comment">/**
	 * The property name of the reference for which this is a shortcut.
	 */</span>
	referenceShortcut<span class="token operator">?</span><span class="token operator">:</span> ReferenceShortcut<span class="token punctuation">;</span>

	<span class="token comment">/**
	 * Execute the action
	 * @param box       The selected box on which this action is executed
	 * @param trigger   The trigger that causes this action to execute
	 * @param editor    The editor
	 * @param index     The index in the list, if there is any
	 */</span>
	<span class="token keyword">abstract</span> <span class="token function">execute</span><span class="token punctuation">(</span>box<span class="token operator">:</span> Box<span class="token punctuation">,</span> trigger<span class="token operator">:</span> FreTriggerUse<span class="token punctuation">,</span> editor<span class="token operator">:</span> FreEditor<span class="token punctuation">,</span> index<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> FrePostAction<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<SectionComponent tag="h2" id="frecustomaction-5" bind:intersecting={visible[4]}>FreCustomAction</SectionComponent>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">/* File: core/src/language/FreCustomAction.ts  */</span>

<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> <span class="token constant">AST</span> <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"../../change-manager/index.js"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> FreUtils <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"../../util/index.js"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Box <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"../boxes/index.js"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> FreEditor <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"../FreEditor.js"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span>
    FreAction<span class="token punctuation">,</span>
    CustomAction<span class="token punctuation">,</span>
    FreTriggerUse<span class="token punctuation">,</span>
    FrePostAction<span class="token punctuation">,</span>
    triggerTypeToString<span class="token punctuation">,</span>
    <span class="token constant">ACTION_LOGGER</span>
<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"./internal.js"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">FreCustomAction</span> <span class="token keyword">extends</span> <span class="token class-name">FreAction</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">static</span> <span class="token function">create</span><span class="token punctuation">(</span>initializer<span class="token operator">?</span><span class="token operator">:</span> Partial<span class="token operator">&lt;</span>FreCustomAction<span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FreCustomAction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        FreUtils<span class="token punctuation">.</span><span class="token function">initializeObject</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> initializer<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token comment">/**
     * The action function that will be performed
     */</span>
    action<span class="token operator">:</span> CustomAction<span class="token punctuation">;</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * @see FreAction.execute
     * @param box
     * @param trigger
     * @param editor
     */</span>
    override <span class="token function">execute</span><span class="token punctuation">(</span>box<span class="token operator">:</span> Box<span class="token punctuation">,</span> trigger<span class="token operator">:</span> FreTriggerUse<span class="token punctuation">,</span> editor<span class="token operator">:</span> FreEditor<span class="token punctuation">)</span><span class="token operator">:</span> FrePostAction <span class="token punctuation">&#123;</span>
        <span class="token constant">ACTION_LOGGER</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"FreCustomCommand: trigger ["</span> <span class="token operator">+</span> <span class="token function">triggerTypeToString</span><span class="token punctuation">(</span>trigger<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"]"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token constant">ACTION_LOGGER</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"FreCustomCommand: action ["</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>action <span class="token operator">+</span> <span class="token string">"]"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> self <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> selected
        <span class="token constant">AST</span><span class="token punctuation">.</span><span class="token function">change</span><span class="token punctuation">(</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
            selected <span class="token operator">=</span> self<span class="token punctuation">.</span><span class="token function">action</span><span class="token punctuation">(</span>box<span class="token punctuation">,</span> <span class="token function">triggerTypeToString</span><span class="token punctuation">(</span>trigger<span class="token punctuation">)</span><span class="token punctuation">,</span> editor<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token operator">!</span>selected<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token operator">!</span>self<span class="token punctuation">.</span>boxRoleToSelect<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                    <span class="token constant">ACTION_LOGGER</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"FreCustomCommand select "</span> <span class="token operator">+</span> box<span class="token punctuation">.</span>node<span class="token punctuation">.</span><span class="token function">freLanguageConcept</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">" box "</span> <span class="token operator">+</span> self<span class="token punctuation">.</span>boxRoleToSelect<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    editor<span class="token punctuation">.</span><span class="token function">selectElementBox</span><span class="token punctuation">(</span>selected<span class="token punctuation">,</span> self<span class="token punctuation">.</span>boxRoleToSelect<span class="token punctuation">,</span> self<span class="token punctuation">.</span>caretPosition<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span> <span class="token keyword">else</span> <span class="token punctuation">&#123;</span>
                <span class="token comment">// Default: select the first editable child of the selected element</span>
                <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                    <span class="token constant">ACTION_LOGGER</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"editor.selectFirstEditableChildBox(selected) "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    editor<span class="token punctuation">.</span><span class="token function">selectFirstEditableChildBox</span><span class="token punctuation">(</span>selected<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span>
        <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>self<span class="token punctuation">.</span>boxRoleToSelect <span class="token operator">===</span> <span class="token string">"REFERENCE"</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                <span class="token keyword">const</span> index <span class="token operator">=</span> <span class="token punctuation">(</span>box<span class="token punctuation">.</span>node<span class="token punctuation">[</span>box<span class="token punctuation">.</span>propertyName<span class="token punctuation">]</span> <span class="token keyword">as</span> <span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">></span><span class="token punctuation">)</span><span class="token punctuation">.</span>length <span class="token operator">-</span><span class="token number">1</span>
                <span class="token comment">// const empty = editor.findBoxForNode(box.node, box.propertyName)</span>
                editor<span class="token punctuation">.</span><span class="token function">selectElement</span><span class="token punctuation">(</span>box<span class="token punctuation">.</span>node<span class="token punctuation">,</span> box<span class="token punctuation">.</span>propertyName<span class="token punctuation">,</span> index<span class="token punctuation">)</span>
                editor<span class="token punctuation">.</span><span class="token function">selectNextLeaf</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token constant">ACTION_LOGGER</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">REFERENCE node </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>box<span class="token punctuation">.</span>node<span class="token punctuation">.</span><span class="token function">freId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string"> prop </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>box<span class="token punctuation">.</span>propertyName<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string"> index </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>index<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span>
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span>
        <span class="token comment">// return EMPTY_POST_ACTION;</span>
    <span class="token punctuation">&#125;</span>

<span class="token punctuation">&#125;</span></code>`}</pre>

<PrevNextSection {prevLink} {nextLink} />
