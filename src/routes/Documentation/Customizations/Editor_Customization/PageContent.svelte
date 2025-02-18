<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Editor Customization', visible: false, ref: '#editor-customization-1' },
		{ title: 'The Generated Box Providers', visible: false, ref: '#the-generated-box-providers-2' },
		{ title: 'Writing a Custom Projection', visible: false, ref: '#writing-a-custom-projection-3' },
		{ title: 'Writing Custom Actions', visible: false, ref: '#writing-custom-actions-4' }
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

	let prevLink = '/Documentation/Customizations';
	let nextLink = '/Documentation/Customizations/External_Components';

	import Note from '$lib/notes/Note.svelte';
	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="editor-customization-1" bind:intersecting={visible[0]}>Editor Customization</SectionComponent>
<p>
	Editor customization can be done by adding projections, actions, and/or external Svelte components. But before you dive into all this, we
	suggest that you become familiar with the information on the Box model, as explained in the <a
		href="/Documentation/Under_the_Hood/Editor_Framework">Freon Editor Framework</a
	>.
</p>
<SectionComponent tag="h2" id="the-generated-box-providers-2" bind:intersecting={visible[1]}>The Generated Box Providers</SectionComponent>
<p>
	The generated editor is implemented by a set of <strong>box providers</strong>. Every box provider is capable of returning the box for a
	specific type of AST node. For instance, the generated box provider for the <code>EuroLiteral</code>
	concept contains the following to methods.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// Insurance/src/freon/editor/gen/EuroLiteralBoxProvider.ts#L22-L62</span>

    <span class="token keyword">protected</span> <span class="token function">getContent</span><span class="token punctuation">(</span>projectionName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> Box <span class="token punctuation">&#123;</span>
        <span class="token comment">// console.log("GET CONTENT " + this._node?.freId() + ' ' +  this._node?.freLanguageConcept() + ' ' + projectionName);</span>
        <span class="token comment">// see if we need to use a custom projection</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>knownBoxProjections<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>projectionName<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>knownTableProjections<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>projectionName<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">const</span> <span class="token constant">BOX</span><span class="token operator">:</span> Box <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>mainHandler<span class="token punctuation">.</span><span class="token function">executeCustomProjection</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_node<span class="token punctuation">,</span> projectionName<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token operator">!</span><span class="token constant">BOX</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                <span class="token comment">// found one, so return it</span>
                <span class="token keyword">return</span> <span class="token constant">BOX</span><span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span> <span class="token keyword">else</span> <span class="token punctuation">&#123;</span>
            <span class="token comment">// select the box to return based on the projectionName</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>projectionName <span class="token operator">===</span> <span class="token string">"default"</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span>
        <span class="token comment">// in all other cases, return the default</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">private</span> <span class="token function">getDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Box <span class="token punctuation">&#123;</span>
        <span class="token keyword">return</span> <span class="token function">createDefaultExpressionBox</span><span class="token punctuation">(</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>_node <span class="token keyword">as</span> EuroLiteral<span class="token punctuation">,</span>
            <span class="token punctuation">[</span>
                BoxFactory<span class="token punctuation">.</span><span class="token function">horizontalLayout</span><span class="token punctuation">(</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>_node <span class="token keyword">as</span> EuroLiteral<span class="token punctuation">,</span>
                    <span class="token string">"EuroLiteral-hlist-line-0"</span><span class="token punctuation">,</span>
                    <span class="token string">""</span><span class="token punctuation">,</span>
                    <span class="token punctuation">[</span>
                        BoxUtil<span class="token punctuation">.</span><span class="token function">labelBox</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_node <span class="token keyword">as</span> EuroLiteral<span class="token punctuation">,</span> <span class="token string">"EUR"</span><span class="token punctuation">,</span> <span class="token string">"top-1-line-0-item-0"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                        BoxUtil<span class="token punctuation">.</span><span class="token function">numberBox</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_node <span class="token keyword">as</span> EuroLiteral<span class="token punctuation">,</span> <span class="token string">"euros"</span><span class="token punctuation">,</span> NumberDisplay<span class="token punctuation">.</span><span class="token constant">SELECT</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                        BoxUtil<span class="token punctuation">.</span><span class="token function">labelBox</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_node <span class="token keyword">as</span> EuroLiteral<span class="token punctuation">,</span> <span class="token string">","</span><span class="token punctuation">,</span> <span class="token string">"top-1-line-0-item-2"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                        BoxUtil<span class="token punctuation">.</span><span class="token function">numberBox</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_node <span class="token keyword">as</span> EuroLiteral<span class="token punctuation">,</span> <span class="token string">"cents"</span><span class="token punctuation">,</span> NumberDisplay<span class="token punctuation">.</span><span class="token constant">SELECT</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                    <span class="token punctuation">]</span><span class="token punctuation">,</span>
                    <span class="token punctuation">&#123;</span> selectable<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
                <span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token punctuation">&#123;</span> selectable<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>
</code>`}</pre>
<p>
	The first method shows that any custom projection is always handled first. The second method is an example of a method that returns a Box
	based on the current content of <code>this._node</code>. Note that the implementation replies on heavily on a number of
	<a href="/Documentation/Under_the_Hood/Editor_Framework/Predefined_Boxes">predefined box types</a>, as well as on the predefined method
	<code>createDefaultExpressionBox</code>, which returns the correct box for a (non-binary) expression concept.
</p>
<SectionComponent tag="h2" id="writing-a-custom-projection-3" bind:intersecting={visible[2]}>Writing a Custom Projection</SectionComponent>
<p>
	Writing a custom projection does not require the implementation of a complete box provider. Instead, a custom projection (set) is
	basically a series of methods that each return a box object for an AST node. Every custom method need to be registered. This is done in
	the property <code>nodeTypeToBoxMethod</code>.
</p>
<p>Sorry, but custom table projections are not yet taken into account.</p>
<p>
	In the below example, a copy is taken of the <code>getDefault</code> method above, which is adjusted to display an SVG Euro symbol instead
	of the string ‘EUR’. Note that the method is registered to be used for concepts of type <code>EuroLiteral</code>.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// Insurance/src/custom/editor/CustomInsuranceModelProjection.ts#L24-L79</span>

<span class="token keyword">const</span> euroIcon <span class="token operator">=</span> <span class="token string">"M640 789.333333c-106.88 0-199.68-60.586667-245.973333-149.333333H640v-85.333333H366.293333c-2.133333-13.866667-3.626667-28.16-3.626666-42.666667s1.493333-28.8 3.626666-42.666667H640v-85.333333H394.026667c46.293333-88.746667 138.88-149.333333 245.973333-149.333333 68.906667 0 131.84 25.173333 180.266667 66.773333L896 226.133333A382.72 382.72 0 0 0 640 128c-167.04 0-308.906667 106.88-361.6 256H128v85.333333h130.56c-1.706667 14.08-2.56 28.16-2.56 42.666667 0 14.506667 0.853333 28.586667 2.56 42.666667H128v85.333333h150.4c52.693333 149.12 194.56 256 361.6 256 98.346667 0 188.16-37.333333 256-98.133333l-75.733333-75.52A275.818667 275.818667 0 0 1 640 789.333333z"</span>

<span class="token comment">/**
 * Class CustomInsuranceModelProjection provides an entry point for the language engineer to
 * define custom build additions to the editor.
 * These are merged with the custom build additions and other definition-based editor parts
 * in a three-way manner. For each modelelement,
 * (1) if a custom build creator/behavior is present, this is used,
 * (2) if a creator/behavior based on one of the editor definition is present, this is used,
 * (3) if neither (1) nor (2) yields a result, the default is used.
 */</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CustomInsuranceModelProjection</span> <span class="token keyword">implements</span> <span class="token class-name">FreProjection</span> <span class="token punctuation">&#123;</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">"Euro-symbol"</span><span class="token punctuation">;</span>
    nodeTypeToBoxMethod<span class="token operator">:</span> Map<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>node<span class="token operator">:</span> FreNode<span class="token punctuation">)</span> <span class="token operator">=></span> Box<span class="token operator">></span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>node<span class="token operator">:</span> FreNode<span class="token punctuation">)</span> <span class="token operator">=></span></span> Box<span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">[</span>
        <span class="token comment">// register your custom box methods here</span>
        <span class="token punctuation">[</span><span class="token string">'EuroLiteral'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>EuroLiteralWithSVG<span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    nodeTypeToTableDefinition<span class="token operator">:</span> Map<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> FreTableDefinition<span class="token operator">></span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span></span> FreTableDefinition<span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">[</span>
        <span class="token comment">// register your custom table definition methods here</span>
        <span class="token comment">// ['NAME_OF_CONCEPT', this.TABLE_DEFINITION_FOR_CONCEPT],</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// add your custom methods here</span>

    <span class="token comment">// BOX_FOR_CONCEPT(node: NAME_OF_CONCEPT) : Box &#123; ... &#125;</span>
    <span class="token function">EuroLiteralWithSVG</span><span class="token punctuation">(</span>node<span class="token operator">:</span> EuroLiteral<span class="token punctuation">)</span><span class="token operator">:</span> Box <span class="token punctuation">&#123;</span>
        <span class="token keyword">return</span> <span class="token function">createDefaultExpressionBox</span><span class="token punctuation">(</span>
            node<span class="token punctuation">,</span>
            <span class="token punctuation">[</span>
                BoxFactory<span class="token punctuation">.</span><span class="token function">horizontalLayout</span><span class="token punctuation">(</span>
                    node<span class="token punctuation">,</span>
                    <span class="token string">"EuroLiteral-hlist-line-0"</span><span class="token punctuation">,</span>
                    <span class="token string">""</span><span class="token punctuation">,</span>
                    <span class="token punctuation">[</span>
                        <span class="token keyword">new</span> <span class="token class-name">SvgBox</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> <span class="token string">"euro-icon"</span><span class="token punctuation">,</span> euroIcon<span class="token punctuation">,</span> <span class="token punctuation">&#123;</span>
                            viewPortWidth<span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
                            viewPortHeight<span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
                            viewBoxWidth<span class="token operator">:</span> <span class="token number">1024</span><span class="token punctuation">,</span>
                            viewBoxHeight<span class="token operator">:</span> <span class="token number">1024</span><span class="token punctuation">,</span>
                            selectable<span class="token operator">:</span> <span class="token boolean">false</span>
                        <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                        BoxUtil<span class="token punctuation">.</span><span class="token function">numberBox</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> <span class="token string">"euros"</span><span class="token punctuation">,</span> NumberDisplay<span class="token punctuation">.</span><span class="token constant">SELECT</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                        BoxUtil<span class="token punctuation">.</span><span class="token function">labelBox</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> <span class="token string">","</span><span class="token punctuation">,</span> <span class="token string">"top-1-line-0-item-2"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                        BoxUtil<span class="token punctuation">.</span><span class="token function">numberBox</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> <span class="token string">"cents"</span><span class="token punctuation">,</span> NumberDisplay<span class="token punctuation">.</span><span class="token constant">SELECT</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                    <span class="token punctuation">]</span><span class="token punctuation">,</span>
                    <span class="token punctuation">&#123;</span> selectable<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
                <span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token punctuation">&#123;</span> selectable<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">// TABLE_DEFINITION_FOR_CONCEPT() : FreTableDefinition &#123; ... &#125;</span>
<span class="token punctuation">&#125;</span>
</code>`}</pre>
<Note
	><svelte:fragment slot="header">Use another filename and/or location</svelte:fragment>
	<svelte:fragment slot="content">
		You can rename the file <code>~/freon/editor/CustomYourLanguageNameProjection.ts</code>, and/or put it in another location. In that
		case, you need to adjust the file <code>~/freon/config/FreonConfiguration</code>. See
		<a href="/Documentation/Customizations#adding-typeScript-files-4">Adding TypeScript Files</a>.
	</svelte:fragment>
</Note>
<SectionComponent tag="h2" id="writing-custom-actions-4" bind:intersecting={visible[3]}>Writing Custom Actions</SectionComponent>
<p>
	When you have created your own custom projection, this projection is exactly that: a projection. Other than the built-in default behavior,
	there are no actions defined yet. Actions are necessary to enable the user to change the model and add elements to it. The projections
	only describe what you will see in the editor. Actions determine what you can do, how you interact with the editor.
</p>
<p>
	As a convenience, the file <code>~/freon/editor/CustomYourLanguageNameActions.ts</code> is generated, which is a placeholder for your own
	actions written in TypeScript. This file contains two constants for different kind of actions. The constant
	<code>MANUAL_CUSTOM_ACTIONS</code> is an array that contains all actions to be performed on normal concepts. Actions on binary expressions
	should be added to the array
	<code>MANUAL_BINARY_EXPRESSION_ACTIONS</code>. When you define these constants, Freon will merge your actions with the default actions.
</p>
<p>
	Any <code>CustomAction</code> must implement the
	<a href="/Documentation/Under_the_Hood/Core_Interfaces#frecustomaction-4"><code>FreCustomAction</code></a>
	interface. An easy way to create it, is using the predefined method <code>FreCustomAction.create()</code>, which takes a partial
	<code>CustomAction</code>
	object as parameter. The most important properties of the <code>CustomAction</code>
	object are the action itself, and the box roles, indicating where the action could be activated.
</p>
<p>
	In the example below two actions are added, one for the button that was added to the <code>BaseProduct</code> projection in
	<a href="/Documentation/Defining_an_Editor/Buttons#adding-buttons-1">Buttons</a>, and one for the buttons that were added to the table
	projection of <code>InsurancePart</code> concepts in <a href="/Documentation/Defining_an_Editor/Buttons#icon-buttons-2">Icon Buttons</a>.
	The first was defined with the box role “MyButton-role”, the second with “MyTableButton-role”. The implementation of the action is here a
	simple alert with a message to the user.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// Insurance/src/custom/editor/CustomInsuranceModelActions.ts#L19-L82</span>

<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CustomInsuranceModelActions</span> <span class="token keyword">implements</span> <span class="token class-name">FreCombinedActions</span> <span class="token punctuation">&#123;</span>
    binaryExpressionActions<span class="token operator">:</span> FreCreateBinaryExpressionAction<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token constant">MANUAL_BINARY_EXPRESSION_ACTIONS</span><span class="token punctuation">;</span>
    customActions<span class="token operator">:</span> FreCustomAction<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token constant">MANUAL_CUSTOM_ACTIONS</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">MANUAL_BINARY_EXPRESSION_ACTIONS</span><span class="token operator">:</span> FreCreateBinaryExpressionAction<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token comment">// Add your own custom binary expression actions here</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">MANUAL_CUSTOM_ACTIONS</span><span class="token operator">:</span> FreCustomAction<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token comment">// Add your own custom behavior here</span>
    FreCustomAction<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
        activeInBoxRoles<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"MyButton-role"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        action<span class="token operator">:</span> <span class="token punctuation">(</span>box<span class="token operator">:</span> Box<span class="token punctuation">,</span> trigger<span class="token operator">:</span> FreTriggerType<span class="token punctuation">,</span> ed<span class="token operator">:</span> FreEditor<span class="token punctuation">)</span><span class="token operator">:</span> FreNode <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
            <span class="token comment">// do something</span>
            <span class="token keyword">const</span> thisNode<span class="token operator">:</span> FreNode <span class="token operator">=</span> box<span class="token punctuation">.</span>node<span class="token punctuation">;</span>
            <span class="token comment">// const thisParent: FreNode = box.element.freOwner();</span>
            <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"You shouldn't have pushed the button with role 'MyButton-role' on element "</span> <span class="token operator">+</span> thisNode<span class="token punctuation">.</span><span class="token function">freId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">".&#92;nPunishment awaits !!!!!!!!!!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    FreCustomAction<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
        activeInBoxRoles<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"MyTableButton-role"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        action<span class="token operator">:</span> <span class="token punctuation">(</span>box<span class="token operator">:</span> Box<span class="token punctuation">,</span> trigger<span class="token operator">:</span> FreTriggerType<span class="token punctuation">,</span> ed<span class="token operator">:</span> FreEditor<span class="token punctuation">)</span><span class="token operator">:</span> FreNode <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
            <span class="token comment">// do something</span>
            <span class="token keyword">const</span> thisNode<span class="token operator">:</span> FreNode <span class="token operator">=</span> box<span class="token punctuation">.</span>node<span class="token punctuation">;</span>
            <span class="token comment">// const thisParent: FreNode = box.element.freOwner();</span>
            <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"You shouldn't have pushed the button with role 'MyTableButton-role' on element "</span> <span class="token operator">+</span> thisNode<span class="token punctuation">.</span><span class="token function">freId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">".&#92;nPunishment awaits !!!!!!!!!!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code>`}</pre>

<PrevNextSection {prevLink} {nextLink} />
