<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'The Projectional Editor Framework', visible: false, ref: '#the-projectional-editor-framework-1' },
		{ title: 'The AST, the Box Tree, and the DOM', visible: false, ref: '#the-ast-the-box-tree-and-the-dom-2' },
		{ title: 'Projection Layout Based on Boxes', visible: false, ref: '#projection-layout-based-on-boxes-3' },
		{ title: 'Coupling Behavior to Boxes', visible: false, ref: '#coupling-behavior-to-boxes-4' },
		{ title: 'Behavior is Defined by Actions', visible: false, ref: '#behavior-is-defined-by-actions-5' }
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

	let prevLink = '/Documentation/Under_the_Hood';
	let nextLink = '/Documentation/Under_the_Hood/Editor_Framework/Predefined_Boxes';

	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="the-projectional-editor-framework-1" bind:intersecting={visible[0]}
	>The Projectional Editor Framework</SectionComponent
>
<p>
	The Projectional Editor Framework is written in <a href="https://www.typescriptlang.org/">TypeScript</a>
	and <a href="https://svelte.dev/" target="_blank">Svelte</a>. This page provides an overview of the Framework. If you want to know how to
	use it, see <a href="/Documentation/Customizations/Editor_Customization">Editor Customization</a>.
</p>
<SectionComponent tag="h2" id="the-ast-the-box-tree-and-the-dom-2" bind:intersecting={visible[1]}
	>The AST, the Box Tree, and the DOM</SectionComponent
>
<p>
	The internal representation of any model written in a DSL is a tree of instances of TypeScript classes, the Abstract Syntax Tree (AST).
	All AST classes implement the core interface <a href="/Documentation/Under_the_Hood/Core_Interfaces"><code>FreNode</code></a>. Because the
	visual representation in the editor can differ from the AST, every visual element is represented by another TypeScript class called
	<strong>Box</strong>. All boxes that are used to show a certain projection set or editor view, form another tree, called the
	<strong>Box Tree</strong>. In fact, any box tree is the internal representation of the concrete syntax, and can therefore also be called
	the <strong>Concrete Syntax Tree</strong> (CST). Note, that there can be multiple box trees for one AST, because there can be multiple projection
	sets (or editors, or views, whatever name you want to give them). Thus, at any moment there are two internal TypeScript representations of
	the model, one that is the Abstract Syntax Tree (AST), and one that is the Concrete Syntax Tree (or Box Tree).
</p>
<p>
	Because Freon produces a web based editor, there is yet another representation of the content, the Document Object Model (DOM). According
	to <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction">MDN Web Docs</a> the DOM is the data
	representation of the objects that comprise the structure and content of a document on the web. In other words, the DOM, which is also a
	tree, represents the HTML elements in memory. In Freon, HTML elements are implemented using
	<a href="https://svelte.dev/" target="_blank">Svelte</a> components.
</p>
<p>
	At any moment that the Freon editor is being used, Freon keeps these three different representations of the user’s model in sync. This
	section of the documentation explains the <strong>Box Tree</strong>.
</p>
<SectionComponent tag="h2" id="projection-layout-based-on-boxes-3" bind:intersecting={visible[2]}
	>Projection Layout Based on Boxes</SectionComponent
>
<p>
	The layout of every visible element in the editor is based on <em>boxes</em>. A box is a rectangular area in the editor. Every AST node is
	projected in a box. A box can contain any number of child boxes.
</p>
<p>
	The framework provides many types of predefined boxes. See
	<a href="/Documentation/Under_the_Hood/Editor_Framework/Predefined_Boxes">Predefined Boxes</a> for an overview. These boxes can be used to
	build a projection.
</p>
<p>
	Let’s look at a small example to start with. Figure 1 shows the projection of the concept <code>StringLiteral</code>. This is mapped to a
	horizontal list of a quote (”), an editable text with the value of the StringLiteral, and a closing quote (”). Note that the quotes are
	not part of the AST. They are part of the concrete syntax used in this projection of the AST.
</p>
<Figure imageName="documentation/mapping-example-stringliteral.svg" caption="Mapping a StringLiteral" figureNumber={1} />
<p>
	In TypeScript, using the <a href="/Documentation/Under_the_Hood/Editor_Framework/Predefined_Boxes">predefined boxes</a>, this projection
	might look something like:
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">new</span> <span class="token class-name">HorizontalListBox</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">LabelBox</span><span class="token punctuation">(</span><span class="token string">'"'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">TextBox</span><span class="token punctuation">(</span>stringLiteral<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">LabelBox</span><span class="token punctuation">(</span><span class="token string">'"'</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}</pre>
<SectionComponent tag="h2" id="coupling-behavior-to-boxes-4" bind:intersecting={visible[3]}>Coupling Behavior to Boxes</SectionComponent>
<p>
	User actions on boxes need to be translated into interactions with the projected AST. To know which part of the projection represents the
	AST node, we give each <code>Box</code> in the projection a <em>role</em>, which is unique within its parent box. This way we can identify
	every box by its model element plus its role.
</p>
<p>In the following figure the roles are shown above the boxes in green.</p>
<Figure
	caption="Mapping a StringLiteral with Roles"
	imageName="documentation/mapping-example-stringliteral-with-roles.svg"
	figureNumber={2}
/>
<p>
	We can now show the full typescript code for this projection. Given that <code>literal</code> is the <code>StringLiteral</code> object:
</p>
<pre class="language-ts">{@html `<code class="language-ts"><span class="token comment">//</span>
<span class="token keyword">new</span> <span class="token class-name">HorizontalListBox</span><span class="token punctuation">(</span>literal<span class="token punctuation">,</span> <span class="token string">"full-string"</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>      <span class="token comment">// &lt;1></span>
    <span class="token keyword">new</span> <span class="token class-name">LabelBox</span><span class="token punctuation">(</span>literal<span class="token punctuation">,</span> <span class="token string">"start-quote"</span><span class="token punctuation">,</span> <span class="token string">'"'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>          <span class="token comment">// &lt;2></span>
    <span class="token keyword">new</span> <span class="token class-name">TextBox</span><span class="token punctuation">(</span>                                        <span class="token comment">// &lt;3></span>
        literal<span class="token punctuation">,</span>
        <span class="token string">"value"</span><span class="token punctuation">,</span>
        <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> literal<span class="token punctuation">.</span>value<span class="token punctuation">,</span>
        <span class="token punctuation">(</span>v<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>literal<span class="token punctuation">.</span>value # v<span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">LabelBox</span><span class="token punctuation">(</span>literal<span class="token punctuation">,</span> <span class="token string">"end-quote"</span><span class="token punctuation">,</span> <span class="token string">'"'</span><span class="token punctuation">)</span>             <span class="token comment">// &lt;4></span>
<span class="token punctuation">]</span><span class="token punctuation">)</span></code>`}</pre>
<ol>
	<li>
		The overall horizontal list box to group everything. Its parameters are the model element that is shown, the role of the box, and a list
		of child boxes.
	</li>
	<li>
		The first label box for the start quote. Its parameters are, like the horizontal box, the model element, the role of the box, and its
		content, which is the quote character.
	</li>
	<li>
		The text box for the value of the string literal. Its parameters are, like the horizontal box, the model element, the role of the box,
		the getter function for the content, and the setter function, used when the content changes.
	</li>
	<li>The second label box for the end quote. Except for its role, this is identical to the first label box.</li>
</ol>
<SectionComponent tag="h2" id="behavior-is-defined-by-actions-5" bind:intersecting={visible[4]}
	>Behavior is Defined by Actions</SectionComponent
>
<p>
	The behavior coupled to a <em>Box</em> is defined by an <code>Action</code>. To identify which action should be executed, each behavior is
	specified by:
</p>
<ul>
	<li>a <em>trigger</em>, describing the key(s) that will trigger the behavior, and</li>
	<li>one or more <em>roles</em>, specifying that the behavior is only active in boxes with that specific role,</li>
	<li>an <em>action</em>, which is a typescript/javascript function that will be executed when the behavior is being triggered.</li>
	<li>a <em>caretPosition</em>, which is the box where the cursor should be placed after the execution of the action (optional).</li>
</ul>
<p>There are four different types of action, each of which extend the <code>FreBehavior</code> interface.</p>
<ol>
	<li><code>FreCustomBehavior</code>, used for most types of behavior, but specifically the creation of non expression concepts.</li>
	<li><code>FreExpressionCreator</code>, used to create an expression.</li>
	<li><code>FreBinaryExpressionCreator</code>, used to create a binary expression.</li>
	<li><code>KeyboardShortcutBehavior</code>, behaviour initiated through a keystroke.</li>
</ol>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">FreBehavior</span> <span class="token punctuation">&#123;</span>
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
	boxRoleToSelect<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
	caretPosition<span class="token operator">?</span><span class="token operator">:</span> FreCaret<span class="token punctuation">;</span>
	referenceShortcut<span class="token operator">?</span><span class="token operator">:</span> ReferenceShortcut<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>
<span class="token comment">/**
 * Behavior with custom action, intended to be used to create non expression elements.
 */</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">FreCustomBehavior</span> <span class="token keyword">extends</span> <span class="token class-name">FreBehavior</span> <span class="token punctuation">&#123;</span>
	<span class="token function-variable function">action</span><span class="token operator">:</span> <span class="token punctuation">(</span>box<span class="token operator">:</span> Box<span class="token punctuation">,</span> trigger<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> editor<span class="token operator">:</span> FreEditor<span class="token punctuation">,</span> propertyName<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=></span> FreElement <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
	undo<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>box<span class="token operator">:</span> Box<span class="token punctuation">,</span> ed<span class="token operator">:</span> FreEditor<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>
<span class="token comment">/**
 * Special behavior for creating an expression.
 */</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">FreExpressionCreator</span> <span class="token keyword">extends</span> <span class="token class-name">FreBehavior</span> <span class="token punctuation">&#123;</span>
	<span class="token function-variable function">expressionBuilder</span><span class="token operator">:</span> <span class="token punctuation">(</span>box<span class="token operator">:</span> Box<span class="token punctuation">,</span> trigger<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> editor<span class="token operator">:</span> FreEditor<span class="token punctuation">,</span> propertyName<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=></span> FreExpression<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>
<span class="token comment">/**
 * Special behavior for creating a binary expression.
 */</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">FreBinaryExpressionCreator</span> <span class="token keyword">extends</span> <span class="token class-name">FreBehavior</span> <span class="token punctuation">&#123;</span>
	<span class="token function-variable function">expressionBuilder</span><span class="token operator">:</span> <span class="token punctuation">(</span>box<span class="token operator">:</span> Box<span class="token punctuation">,</span> trigger<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> editor<span class="token operator">:</span> FreEditor<span class="token punctuation">,</span> propertyName<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=></span> FreBinaryExpression<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>
<span class="token comment">/**
 * Special behavior initialized by keyboard strokes.
 */</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">KeyboardShortcutBehavior</span> <span class="token keyword">extends</span> <span class="token class-name">FreBehavior</span> <span class="token punctuation">&#123;</span>
	<span class="token function-variable function">action</span><span class="token operator">:</span> <span class="token punctuation">(</span>box<span class="token operator">:</span> Box<span class="token punctuation">,</span> trigger<span class="token operator">:</span> FreKey<span class="token punctuation">,</span> editor<span class="token operator">:</span> FreEditor<span class="token punctuation">,</span> propertyName<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>FreElement<span class="token operator">></span><span class="token punctuation">;</span>
	trigger<span class="token operator">:</span> FreKey<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<p>
	To attach the behavior to one or more boxes, these box roles are added to the <code>activeInBoxRoles</code>
	property of an action.
</p>

<PrevNextSection {prevLink} {nextLink} />
