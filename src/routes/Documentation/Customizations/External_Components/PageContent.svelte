<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'External Components', visible: false, ref: '#external-components-1' },
		{ title: 'More Information and Assistance', visible: false, ref: '#more-information-and-assistance-2' },
		{ title: 'Simple additions', visible: false, ref: '#simple-additions-3' },
		{ title: 'Parameters and Required Functions', visible: false, ref: '#parameters-and-required-functions-4' },
		{ title: 'Wrapping a Freon Projection', visible: false, ref: '#wrapping-a-freon-projection-5' },
		{ title: 'Replacing a Freon Projection', visible: false, ref: '#replacing-a-freon-projection-6' },
		{ title: 'Wiring', visible: false, ref: '#wiring-7' },
		{ title: 'Nesting', visible: false, ref: '#nesting-8' }
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

	let prevLink = '/Documentation/Customizations/Editor_Customization';
	let nextLink = '/Documentation/Customizations/Scoper_Customization';

	import Note from '$lib/notes/Note.svelte';
	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="external-components-1" bind:intersecting={visible[0]}>External Components</SectionComponent>
<Note
	><svelte:fragment slot="header">External components are experimental</svelte:fragment>
	<svelte:fragment slot="content">
		<p>
			The use of external components in the Freon editor is experimental. Compatibility with every library isn’t guaranteed, and future
			versions of Freon may alter how external components are included. Proceed with this in mind.
		</p>
	</svelte:fragment></Note
>
<p>
	In this version of Freon it is possible to include UI components that are not native to Freon. For instance, you can define your own
	components, or use components from a UI component library. As Freon is built using the <a href="https://svelte.dev/" target="_blank"
		>Svelte</a
	> UI framework, all external components should either be Svelte components, or components that are wrapped in a Svelte component.
</p>
<p>In general, there are three forms in which an external component can be present in a Freon projection:</p>
<ul>
	<li>simple additions, where an independent external component is added to a projection,</li>
	<li>
		wrappers, where the projection of a property, or a <a href="/Documentation/Defining_an_Editor/Fragments">fragment</a>, is displayed
		within an external component,
	</li>
	<li>
		replacers, where the projection of a property, or a <a href="/Documentation/Defining_an_Editor/Fragments">fragment</a>, is completely
		replaced by an external component. It is up to the language engineer to get and set the value of the property correctly, and to get
		tabbing etc. working.
	</li>
</ul>
<p>
	Especially the two latter cases require knowledge of the Freon <a href="/Documentation/Under_the_Hood/Editor_Framework">Box Model</a>.
	Please, become familiar with that topic first, as below we will refer to the different types of boxes associated with the various forms of
	external components. More information on the API of these box types can be found in
	<a href="/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types">External Component Box Types</a>.
</p>
<SectionComponent tag="h2" id="more-information-and-assistance-2" bind:intersecting={visible[1]}
	>More Information and Assistance</SectionComponent
>
<p>
	Because external components are in an experimental phase, the information included here is brief. However, a more extensive example can be
	found in the <a href="/Examples/External_Components">Examples</a> section. Furthermore, anyone who is interested in using external components
	can certainly rely on the assistance of the Freon team. Please get in contact with us, for instance via email at info AT freon4dsl.dev. This
	will also ensure that you are updated on the latest news about this feature.
</p>
<SectionComponent tag="h2" id="simple-additions-3" bind:intersecting={visible[2]}>Simple additions</SectionComponent>
<p>
	Simple additions have no link to the model (the AST). They may appear anywhere in the projection. To include a simple external component
	within a projection, use the syntax <code>[external = &lt;COMPONENT_NAME&gt; ]</code>, where <code>&lt;COMPONENT_NAME&gt;</code> is the
	name of the desired component. Ensure there is no space between the opening square bracket (<code>[</code>) and the keyword
	<code>external</code>, and note that the component name must be included in the
	<a href="/Documentation/Defining_an_Editor/Global_Projections"><code>global</code></a>
	section of the default editor. The box type associated with a simple addition is <code>ExternalSimpleBox</code>.
</p>
<p>In the next example a simple animated gif component is added to the fragment projection.</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-externals.edit#L10-L16
</span>
First Card
    is still under construction: $&#123;<span class="token function"><span class="token variable">self</span>.isUnderConstruction <span class="token keyword">switch</span></span>&#125;
    is approved level1: $&#123;<span class="token function"><span class="token variable">self</span>.isApprovedLevel1 <span class="token keyword">radio</span></span>&#125;
    is approved level2: $&#123;<span class="token function"><span class="token variable">self</span>.isApprovedLevel2 <span class="token keyword">inner-switch</span></span>&#125;
    is approved level3: $&#123;<span class="token function"><span class="token variable">self</span>.isApprovedLevel3 <span class="token keyword">checkbox</span></span>&#125;
    <span class="token punctuation">[</span><span class="token keyword">external</span>=AnimatedGif <span class="token builtin">number</span>=<span class="token string">"1"</span><span class="token punctuation">]</span>
<span class="token punctuation">]</span></code>`}</pre>
<Figure imageName={'documentation/Documentation-Externals-screenshot1.png'} caption={'Adding an animated gif'} figureNumber={1} />
<SectionComponent tag="h2" id="parameters-and-required-functions-4" bind:intersecting={visible[3]}
	>Parameters and Required Functions</SectionComponent
>
<p>
	You can set parameters to an external component in the <code>.edit</code> file. These are simple key-value pairs, both key and value are
	strings. There can be a list of them. In the interface of all box types for external components the method
	<code>findParam(key: string): string</code>
	is included. This method can be used to find the value of the parameter that was included in the <code>.edit</code> file.
</p>
<p>
	In every external component two <code>export let</code> parameters, and four specific methods need to be provided in order for the
	component to fit in the Freon framework. The parameters are the following, where <code>BOXTYPE</code> is the type of the box associated with
	the external component.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts">    <span class="token keyword">export</span> <span class="token keyword">let</span> box<span class="token operator">:</span> <span class="token constant">BOXTYPE</span><span class="token punctuation">;</span>
    <span class="token keyword">export</span> <span class="token keyword">let</span> editor<span class="token operator">:</span> FreEditor<span class="token punctuation">;</span></code>`}</pre>
<p>The methods are:</p>
<ul>
	<li><code>box.setFocus</code>: used to set the focus on a part of the content of the component.</li>
	<li>
		<code>box.refreshComponent</code>: called when the underlying Freon model is changed and its representation on the screen needs to be
		changed as well.
	</li>
	<li><code>onMount</code>: executes when the component is mounted.</li>
	<li><code>afterUpdate</code>: executes when the DOM is updated.</li>
</ul>
<p>
	In the simple additions example the parameter is a number, which is used to choose the image source from a list. The source of the
	AnimatedGif Svelte component is the following.
</p>
<pre class="language-svelte">{@html `<code class="language-svelte">// Insurance/src/external/ShowAnimatedGif.svelte

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>ts<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">

    <span class="token keyword">import</span> <span class="token punctuation">&#123;</span>ExternalSimpleBox<span class="token punctuation">,</span> FreEditor<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@freon4dsl/core"</span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token punctuation">&#123;</span>afterUpdate<span class="token punctuation">,</span> onMount<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"svelte"</span><span class="token punctuation">;</span>

    <span class="token keyword">let</span> src1 <span class="token operator">=</span> <span class="token string">'/cats-kittens.gif'</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> name1 <span class="token operator">=</span> <span class="token string">'Two kittens licking'</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> src2 <span class="token operator">=</span> <span class="token string">'/rick-roll-rick-rolled.gif'</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> name2 <span class="token operator">=</span> <span class="token string">'Rick Astley dancing'</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> src3 <span class="token operator">=</span> <span class="token string">'/lenny-confetti-hired-kitten.gif'</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> name3 <span class="token operator">=</span> <span class="token string">'Staring kitten'</span><span class="token punctuation">;</span>

    <span class="token comment">// Freon expects both of these to be present, even if they are not used.</span>
    <span class="token keyword">export</span> <span class="token keyword">let</span> <span class="token literal-property property">box</span><span class="token operator">:</span> ExternalSimpleBox<span class="token punctuation">;</span>
    <span class="token keyword">export</span> <span class="token keyword">let</span> <span class="token literal-property property">editor</span><span class="token operator">:</span> FreEditor<span class="token punctuation">;</span>

    <span class="token keyword">let</span> <span class="token literal-property property">src</span><span class="token operator">:</span> string <span class="token operator">=</span> src1<span class="token punctuation">;</span>
    <span class="token keyword">let</span> <span class="token literal-property property">name</span><span class="token operator">:</span> string <span class="token operator">=</span> name1<span class="token punctuation">;</span>

    <span class="token keyword">function</span> <span class="token function">getSrc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">let</span> <span class="token literal-property property">nrOfSrc</span><span class="token operator">:</span> number <span class="token operator">=</span> Number<span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>box<span class="token punctuation">.</span><span class="token function">findParam</span><span class="token punctuation">(</span><span class="token string">"number"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">switch</span> <span class="token punctuation">(</span>nrOfSrc<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                src <span class="token operator">=</span> src1<span class="token punctuation">;</span>
                name <span class="token operator">=</span> name1<span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span>
            <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                src <span class="token operator">=</span> src2<span class="token punctuation">;</span>
                name <span class="token operator">=</span> name2<span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span>
            <span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                src <span class="token operator">=</span> src3<span class="token punctuation">;</span>
                name <span class="token operator">=</span> name3<span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token comment">// execute this function to set the initial values</span>
    <span class="token function">getSrc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// The following four functions need to be included for the editor to function properly.</span>
    <span class="token comment">// Please, set the focus to the first editable/selectable element in this component.</span>
    <span class="token comment">// If this element is not focusable, then do not use this function. Freon will direct</span>
    <span class="token comment">// the focus to the parent of this component.</span>

    <span class="token comment">// async function setFocus(): Promise&lt;void> &#123;</span>
    <span class="token comment">// &#125;</span>
    <span class="token keyword">const</span> refresh <span class="token operator">=</span> <span class="token punctuation">(</span>why<span class="token operator">?</span><span class="token operator">:</span> string<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token parameter"><span class="token keyword">void</span></span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        <span class="token comment">// do whatever needs to be done to refresh the elements that show information from the model</span>
        <span class="token function">getSrc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
    <span class="token function">onMount</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        <span class="token function">getSrc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// box.setFocus = setFocus;</span>
        box<span class="token punctuation">.</span>refreshComponent <span class="token operator">=</span> refresh<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">afterUpdate</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        <span class="token comment">// box.setFocus = setFocus;</span>
        box<span class="token punctuation">.</span>refreshComponent <span class="token operator">=</span> refresh<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- &#123;src&#125; is short for src=&#123;src&#125; --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token language-javascript"><span class="token punctuation">&#123;</span>src<span class="token punctuation">&#125;</span></span> <span class="token attr-name">alt="</span><span class="token language-javascript"><span class="token punctuation">&#123;</span>name<span class="token punctuation">&#125;</span></span><span class="token attr-name">"</span> <span class="token punctuation">/></span></span>
</code>`}</pre>
<SectionComponent tag="h2" id="wrapping-a-freon-projection-5" bind:intersecting={visible[4]}>Wrapping a Freon Projection</SectionComponent>
<p>
	An external component may wrap a Freon projection, either a property projection or a <a href="/Documentation/Defining_an_Editor/Fragments"
		>fragment projection</a
	>. Wrappers may appear anywhere in a projection. The wrapped projection is called the <code>childBox</code> of the external component, and
	can be accessed through the method <code>childBox: Box</code>. Note that the childBox itself may be a vertical or horizontal layout
	containing many other elements.
</p>
<p>
	The syntax to position the wrapper within the projection is either <code>[fragment NAME wrap=ExternalComponent]</code>, where
	<code>NAME</code>
	is the name of the fragment, and <code>ExternalComponent</code> is the name of the external component, or
	<code>$&#123;self.PROPERTY wrap=ExternalComponent&#125;</code>, where <code>self.PROPERTY</code> is the familiar reference to a property.
</p>
<p>
	The box type associated with a wrapper is dependent upon the type of property or fragment that is being wrapped. (See <a
		href="/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types">External Component Box Types</a
	>.)
</p>
<ul>
	<li>Fragment: <code>FragmentWrapperBox</code>.</li>
	<li>Property of type string: <code>StringWrapperBox</code>.</li>
	<li>Property of type number: <code>NumberWrapperBox</code>.</li>
	<li>Property of type boolean: <code>BooleanWrapperBox</code>.</li>
	<li>
		<a href="/Documentation/Creating_the_Metamodel/Defining_Properties#part-properties-3">Part property</a>: <code>PartWrapperBox</code>.
	</li>
	<li>
		<a href="/Documentation/Creating_the_Metamodel/Defining_Properties#part-properties-3">Part list property</a>:
		<code>PartListWrapperBox</code>.
	</li>
	<li>
		<a href="/Documentation/Creating_the_Metamodel/Defining_Properties#reference-properties-4">Reference property</a>:
		<code>RefWrapperBox</code>.
	</li>
	<li>
		<a href="/Documentation/Creating_the_Metamodel/Defining_Properties#reference-properties-4">Reference list property</a>:
		<code>RefListWrapperBox</code>.
	</li>
</ul>
<p>
	To display the childBox the external component needs to include the Freon <code>RenderComponent</code>, as shown in the next example. In
	this example a fragment is wrapped in a <code>Card</code> component, which is imported from the
	<a href="https://sveltematerialui.com/" target="_blank">SMUI</a> library of UI components.
</p>
<pre class="language-svelte">{@html `<code class="language-svelte">// Insurance/src/external/SMUI_Card_Component.svelte#L30-L34

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>card-container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Card</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>RenderComponent</span> <span class="token attr-name">box=</span><span class="token language-javascript"><span class="token punctuation">&#123;</span>box<span class="token punctuation">.</span>childBox<span class="token punctuation">&#125;</span></span> <span class="token attr-name">editor=</span><span class="token language-javascript"><span class="token punctuation">&#123;</span>editor<span class="token punctuation">&#125;</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Card</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span></code>`}</pre>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-externals.edit#L6-L6
</span>
<span class="token punctuation">[</span><span class="token keyword">fragment</span> FirstCard <span class="token keyword">wrap</span>=SMUI_Card<span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token keyword">fragment</span> SecondCard <span class="token keyword">wrap</span>=SMUI_Card<span class="token punctuation">]</span></code>`}</pre>
<SectionComponent tag="h2" id="replacing-a-freon-projection-6" bind:intersecting={visible[5]}>Replacing a Freon Projection</SectionComponent
>
<p>
	A Freon projection may also be replaced by an external component. Note that a <a href="/Documentation/Defining_an_Editor/Fragments"
		>fragment projection</a
	> may not be replaced.
</p>
<p>
	The syntax to position the replacement within the projection is <code>$&#123;self.PROPERTY replace=ExternalComponent&#125;</code>, where
	<code>self.PROPERTY</code>
	is the familiar reference to a property and <code>ExternalComponent</code> is the name of the external component.
</p>
<p>
	The box type associated with a replacement is dependent upon the type of property that is being replaced. (See <a
		href="/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types">External Component Box Types</a
	>.)
</p>
<ul>
	<li>Property of type string: <code>ExternalStringBox</code>.</li>
	<li>Property of type number: <code>ExternalNumberBox</code>.</li>
	<li>Property of type boolean: <code>ExternalBooleanBox</code>.</li>
	<li>
		<a href="/Documentation/Creating_the_Metamodel/Defining_Properties#part-properties-3">Part property</a>: <code>ExternalPartBox</code>.
	</li>
	<li>
		<a href="/Documentation/Creating_the_Metamodel/Defining_Properties#part-properties-3">Part list property</a>:
		<code>ExternalPartListBox</code>.
	</li>
	<li>
		<a href="/Documentation/Creating_the_Metamodel/Defining_Properties#reference-properties-4">Reference property</a>:
		<code>ExternalRefBox</code>.
	</li>
	<li>
		<a href="/Documentation/Creating_the_Metamodel/Defining_Properties#reference-properties-4">Reference list property</a>:
		<code>ExternalRefListBox</code>.
	</li>
</ul>
<p>
	Each of the box types provide the following methods, where <code>&lt;TYPE&gt;</code> depends on the type of the property being replaced.
</p>
<ul>
	<li><code>getPropertyName(): string</code>: returns the name of the wrapped property.</li>
	<li><code>getPropertyValue(): &lt;TYPE&gt;</code>: returns the value of the wrapped property.</li>
	<li><code>setPropertyValue(newValue: &lt;TYPE&gt;)</code>: sets the value of the property.</li>
</ul>
<p>
	In the following example the <code>name</code> property of a <code>BaseProduct</code> is being displayed using a dialog component from the
	<a href="https://sveltematerialui.com/" target="_blank">SMUI</a> UI library.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-externals.edit#L5-L5
</span>
Base Product for $&#123;<span class="token function"><span class="token variable">self</span>.theme <span class="token keyword">radio</span></span>&#125; $&#123;<span class="token variable">self</span>.name <span class="token keyword">replace</span>=SMUI_Dialog buttonLabel = <span class="token string">"Change Product Name"</span>&#125;</code>`}</pre>
<Figure
	imageName={'documentation/Documentation-Externals-screenshot2.png'}
	caption={'Replacing a string property with a dialog'}
	figureNumber={1}
/>
<SectionComponent tag="h2" id="wiring-7" bind:intersecting={visible[6]}>Wiring</SectionComponent>
<p>The setup for including external components needs some care.</p>
<ol>
	<li>
		Of course, as first step you need to create your Svelte components. Notice which type of box your component will be linked to. Use the
		interface of this box to get and set any model (AST) values.
	</li>
	<li>
		You must let the Freon generator know which external projections there are. This done in the <code>global</code> section of the default
		editor. See <a href="/Documentation/Defining_an_Editor/Global_Projections">Global Projections</a>.
	</li>
	<li>
		You must let the Freon runtime know which external projections there are. This is done using the <code>setCustomComponents()</code>
		method from the ‘@freon4dsl/core-svelte’ package. This method should be called in the <code>~src/starter.ts</code> file before starting the
		actual application. Note that the names of the component should be equal to the names used in step 2.
	</li>
</ol>
<p>The following is an example of the use of this method.</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token function">setCustomComponents</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
   <span class="token punctuation">&#123;</span>component<span class="token operator">:</span> ShowAnimatedGif<span class="token punctuation">,</span> knownAs<span class="token operator">:</span> <span class="token string">"AnimatedGif"</span><span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
   <span class="token punctuation">&#123;</span>component<span class="token operator">:</span> SMUI_Card_Component<span class="token punctuation">,</span> knownAs<span class="token operator">:</span> <span class="token string">"SMUI_Card"</span><span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
   <span class="token punctuation">&#123;</span>component<span class="token operator">:</span> SMUI_Accordion<span class="token punctuation">,</span> knownAs<span class="token operator">:</span> <span class="token string">"SMUI_Accordion"</span><span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
   <span class="token punctuation">&#123;</span>component<span class="token operator">:</span> SMUI_Dialog<span class="token punctuation">,</span> knownAs<span class="token operator">:</span> <span class="token string">"SMUI_Dialog"</span><span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
   <span class="token punctuation">&#123;</span>component<span class="token operator">:</span> DatePicker<span class="token punctuation">,</span> knownAs<span class="token operator">:</span> <span class="token string">"DatePicker"</span><span class="token punctuation">&#125;</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * Now start the app ...
 */</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FreonLayout</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
	target<span class="token operator">:</span> document<span class="token punctuation">.</span>body<span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> app<span class="token punctuation">;</span></code>`}</pre>
<SectionComponent tag="h2" id="nesting-8" bind:intersecting={visible[7]}>Nesting</SectionComponent>
<p>External projections may be nested. Example:</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token keyword">external</span> SMUI_Card <span class="token punctuation">[</span>
    This Card is showing animated gif <span class="token builtin">number</span> <span class="token number">1.</span>
        <span class="token punctuation">[</span><span class="token keyword">external</span>=AnimatedGif <span class="token builtin">number</span>=<span class="token string">"1"</span><span class="token punctuation">]</span>
    <span class="token punctuation">]</span></code>`}</pre>

<PrevNextSection {prevLink} {nextLink} />
