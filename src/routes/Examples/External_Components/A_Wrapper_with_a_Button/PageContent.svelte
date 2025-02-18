<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'A Wrapper with a Button', visible: false, ref: '#a-wrapper-with-a-button-1' },
		{ title: 'Step 1: Create the Svelte Component', visible: false, ref: '#step-1-create-the-svelte-component-2' },
		{ title: 'Step 2: Add to the Global Section', visible: false, ref: '#step-2-add-to-the-global-section-3' },
		{ title: 'Step 3: Include in the Projection', visible: false, ref: '#step-3-include-in-the-projection-4' },
		{ title: 'Step 4: Register in the Starter Code', visible: false, ref: '#step-4-register-in-the-starter-code-5' },
		{ title: 'Final Result', visible: false, ref: '#final-result-6' }
	];
	let visible: boolean[] = [];
	$: $mySections[0].visible = visible[0];
	$: $mySections[1].visible = visible[1];
	$: $mySections[2].visible = visible[2];
	$: $mySections[3].visible = visible[3];
	$: $mySections[4].visible = visible[4];
	$: $mySections[5].visible = visible[5];
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

	let prevLink = '/Examples/External_Components/An_Icon_Component';
	let nextLink = '/Examples/External_Components/Replacing_a_Part_List';

	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="a-wrapper-with-a-button-1" bind:intersecting={visible[0]}>A Wrapper with a Button</SectionComponent>
<p>
	In this part of the example, we’ll walk through the steps to create a custom wrapper component in Freon. This component will wrap a native
	Freon component, using the <a href="https://sveltematerialui.com/" target="_blank">SMUI</a> (Svelte Material UI) library. Our example will
	show how to combine a person’s phone number with a special button that can trigger actions using the stored information. Here, a person’s phone
	number is shown in a snackbar notification, but you could do all sorts of things, like sending the number to an external system that is able
	to set up a phone call, or to a system that checks the number against another database. Let your imagination run free.
</p>
<p><em>Note: This guide assumes Svelte version 4 and SMUI version 7. Updates to newer versions will follow in subsequent releases.</em></p>
<p>Let’s dive into the steps!</p>
<SectionComponent tag="h2" id="step-1-create-the-svelte-component-2" bind:intersecting={visible[1]}
	>Step 1: Create the Svelte Component</SectionComponent
>
<p>
	We will create a new Svelte component called <code>PhoneButton.svelte</code>, which will act as a wrapper for a phone number and provide a
	button to trigger actions. Take a look at the three key parts: <strong>Script</strong>, <strong>HTML</strong>, and <strong>CSS</strong>.
</p>
<h3 id="the-script-part-1">The Script Part</h3>
<p>
	In the script section, we declare the two mandatory parameters: <code>box</code> and <code>editor</code>. The
	<code>box</code> is of type <code>NumberWrapperBox</code>, which is capable of wrapping a number node. (See
	<a href="/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types#wrapping-property-projections-of-primitive-type-5"
		>Wrapping Property Projections of Primitive type</a
	>
	for more on the interface of the <code>NumberWrapperBox</code>.)
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CourseSchedule/phase3/src/external/PhoneButton.svelte#L8-L9</span>

<span class="token keyword">export</span> <span class="token keyword">let</span> box<span class="token operator">:</span> NumberWrapperBox<span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">let</span> editor<span class="token operator">:</span> FreEditor<span class="token punctuation">;</span></code>`}</pre>
<p>
	We also define four functions that together make sure that the editor is updated correctly whenever the underlying AST (e.g. by adding, or
	removing nodes) or box model (e.g. by selecting a different view) changes.
</p>
<p>
	First, we define the <code>setFocus</code> function to handle focus changes within the component, and a <code>refresh</code> function to update
	the values when the underlying model changes:
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CourseSchedule/phase3/src/external/PhoneButton.svelte#L16-L21</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">setFocus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">></span> <span class="token punctuation">&#123;</span>
    box<span class="token punctuation">.</span>childBox<span class="token punctuation">.</span><span class="token function">setFocus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>
<span class="token keyword">const</span> refresh <span class="token operator">=</span> <span class="token punctuation">(</span>why<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// do whatever needs to be done to refresh the elements that show information from the model</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">;</span></code>`}</pre>
<p>Make sure these functions are passed to the box using the <code>onMount</code> and <code>afterUpdate</code> lifecycle hooks:</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CourseSchedule/phase3/src/external/PhoneButton.svelte#L22-L29</span>

<span class="token function">onMount</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    box<span class="token punctuation">.</span>setFocus <span class="token operator">=</span> setFocus<span class="token punctuation">;</span>
    box<span class="token punctuation">.</span>refreshComponent <span class="token operator">=</span> refresh<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">afterUpdate</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    box<span class="token punctuation">.</span>setFocus <span class="token operator">=</span> setFocus<span class="token punctuation">;</span>
    box<span class="token punctuation">.</span>refreshComponent <span class="token operator">=</span> refresh<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}</pre>
<h3 id="the-html-part-2">The HTML Part</h3>
<p>
	The HTML section of the component consists of a wrapper <code>div</code> that contains the phone number and an <code>IconButton</code> from
	the SMUI library.
</p>
<p>
	The wrapped box cannot be included directly, as it is a box, not a component. Freon offers a component that is able to render any box
	known to the Freon framework. It takes the box and the editor parameters, which is the reason these parameters are mandatory. This
	component is called <code>RenderComponent</code> and must be imported from the Freon core-svelte package.
</p>
<p>We set up the button to open a snackbar notification when clicked:</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CourseSchedule/phase3/src/external/PhoneButton.svelte#L33-L36</span>

<span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"wrapper"</span><span class="token operator">></span>
    Phone <span class="token builtin">number</span><span class="token operator">:</span> <span class="token operator">&lt;</span>RenderComponent box<span class="token operator">=</span><span class="token punctuation">&#123;</span>box<span class="token punctuation">.</span>childBox<span class="token punctuation">&#125;</span> editor<span class="token operator">=</span><span class="token string">"&#123;editor&#125;"</span><span class="token operator">/</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>IconButton <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"material-icons"</span> on<span class="token operator">:</span>click<span class="token operator">=</span><span class="token punctuation">&#123;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>clicked<span class="token operator">++</span><span class="token punctuation">;</span> snackbarWithClose<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">&#125;</span><span class="token punctuation">&#125;</span> ripple<span class="token operator">=</span><span class="token punctuation">&#123;</span><span class="token boolean">false</span><span class="token punctuation">&#125;</span><span class="token operator">></span>phone<span class="token operator">&lt;</span><span class="token operator">/</span>IconButton<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span></code>`}</pre>
<p>
	Next, we define the <code>Snackbar</code> element from SMUI, which will show a message when the phone button is clicked. The message includes
	the value of the phone number:
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CourseSchedule/phase3/src/external/PhoneButton.svelte#L38-L43</span>

<span class="token operator">&lt;</span>Snackbar bind<span class="token operator">:</span><span class="token keyword">this</span><span class="token operator">=</span><span class="token punctuation">&#123;</span>snackbarWithClose<span class="token punctuation">&#125;</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>Label<span class="token operator">></span>This person has been called on <span class="token builtin">number</span> <span class="token punctuation">&#123;</span>box<span class="token punctuation">.</span><span class="token function">getPropertyValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">&#125;</span><span class="token punctuation">.</span><span class="token operator">&lt;</span><span class="token operator">/</span>Label<span class="token operator">></span>
    <span class="token operator">&lt;</span>Actions<span class="token operator">></span>
        <span class="token operator">&lt;</span>IconButton <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"material-icons"</span> title<span class="token operator">=</span><span class="token string">"Dismiss"</span><span class="token operator">></span>close<span class="token operator">&lt;</span><span class="token operator">/</span>IconButton<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>Actions<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>Snackbar<span class="token operator">></span></code>`}</pre>
<h3 id="the-style-part-3">The Style Part</h3>
<p>
	Finally, we have added some styling for the div that wraps the phone number. The styling of the SMUI components is all done using the <a
		href="https://sveltematerialui.com/THEMING.md"
		target="_blank">SMUI theming</a
	>, which is already set up because it is also used for the surrounding web application.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CourseSchedule/phase3/src/external/PhoneButton.svelte#L45-L52</span>

<span class="token operator">&lt;</span>style<span class="token operator">></span>
    <span class="token punctuation">.</span>wrapper <span class="token punctuation">&#123;</span>
        display<span class="token operator">:</span>flex<span class="token punctuation">;</span>
        flex<span class="token operator">-</span>direction<span class="token operator">:</span> row<span class="token punctuation">;</span>
        justify<span class="token operator">-</span>content<span class="token operator">:</span> center<span class="token punctuation">;</span>
        align<span class="token operator">-</span>items<span class="token operator">:</span> center<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>style<span class="token operator">></span></code>`}</pre>
<h3 id="the-complete-component-4">The Complete Component</h3>
<p>Here’s the complete <code>PhoneButton.svelte</code> component:</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CourseSchedule/phase3/src/external/PhoneButton.svelte</span>

<span class="token operator">&lt;</span>script lang<span class="token operator">=</span><span class="token string">"ts"</span><span class="token operator">></span>
    <span class="token keyword">import</span> IconButton <span class="token keyword">from</span> <span class="token string">"@smui/icon-button"</span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> Snackbar<span class="token punctuation">,</span> <span class="token punctuation">&#123;</span> Actions<span class="token punctuation">,</span> Label <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@smui/snackbar'</span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token punctuation">&#123;</span>RenderComponent<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@freon4dsl/core-svelte"</span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token punctuation">&#123;</span>FreEditor<span class="token punctuation">,</span> NumberWrapperBox<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@freon4dsl/core"</span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token punctuation">&#123;</span>afterUpdate<span class="token punctuation">,</span> onMount<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"svelte"</span><span class="token punctuation">;</span>

    <span class="token keyword">export</span> <span class="token keyword">let</span> box<span class="token operator">:</span> NumberWrapperBox<span class="token punctuation">;</span>
    <span class="token keyword">export</span> <span class="token keyword">let</span> editor<span class="token operator">:</span> FreEditor<span class="token punctuation">;</span>

    <span class="token keyword">let</span> clicked<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> snackbarWithClose<span class="token operator">:</span> Snackbar<span class="token punctuation">;</span>

    <span class="token comment">// The following four functions need to be included for the editor to function properly.</span>
    <span class="token comment">// Please, set the focus to the first editable/selectable element in this component.</span>
    <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">setFocus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">></span> <span class="token punctuation">&#123;</span>
        box<span class="token punctuation">.</span>childBox<span class="token punctuation">.</span><span class="token function">setFocus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token keyword">const</span> refresh <span class="token operator">=</span> <span class="token punctuation">(</span>why<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        <span class="token comment">// do whatever needs to be done to refresh the elements that show information from the model</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
    <span class="token function">onMount</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        box<span class="token punctuation">.</span>setFocus <span class="token operator">=</span> setFocus<span class="token punctuation">;</span>
        box<span class="token punctuation">.</span>refreshComponent <span class="token operator">=</span> refresh<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">afterUpdate</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        box<span class="token punctuation">.</span>setFocus <span class="token operator">=</span> setFocus<span class="token punctuation">;</span>
        box<span class="token punctuation">.</span>refreshComponent <span class="token operator">=</span> refresh<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>

<span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"wrapper"</span><span class="token operator">></span>
    Phone <span class="token builtin">number</span><span class="token operator">:</span> <span class="token operator">&lt;</span>RenderComponent box<span class="token operator">=</span><span class="token punctuation">&#123;</span>box<span class="token punctuation">.</span>childBox<span class="token punctuation">&#125;</span> editor<span class="token operator">=</span><span class="token string">"&#123;editor&#125;"</span><span class="token operator">/</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>IconButton <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"material-icons"</span> on<span class="token operator">:</span>click<span class="token operator">=</span><span class="token punctuation">&#123;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>clicked<span class="token operator">++</span><span class="token punctuation">;</span> snackbarWithClose<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">&#125;</span><span class="token punctuation">&#125;</span> ripple<span class="token operator">=</span><span class="token punctuation">&#123;</span><span class="token boolean">false</span><span class="token punctuation">&#125;</span><span class="token operator">></span>phone<span class="token operator">&lt;</span><span class="token operator">/</span>IconButton<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>

<span class="token operator">&lt;</span>Snackbar bind<span class="token operator">:</span><span class="token keyword">this</span><span class="token operator">=</span><span class="token punctuation">&#123;</span>snackbarWithClose<span class="token punctuation">&#125;</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>Label<span class="token operator">></span>This person has been called on <span class="token builtin">number</span> <span class="token punctuation">&#123;</span>box<span class="token punctuation">.</span><span class="token function">getPropertyValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">&#125;</span><span class="token punctuation">.</span><span class="token operator">&lt;</span><span class="token operator">/</span>Label<span class="token operator">></span>
    <span class="token operator">&lt;</span>Actions<span class="token operator">></span>
        <span class="token operator">&lt;</span>IconButton <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"material-icons"</span> title<span class="token operator">=</span><span class="token string">"Dismiss"</span><span class="token operator">></span>close<span class="token operator">&lt;</span><span class="token operator">/</span>IconButton<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>Actions<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>Snackbar<span class="token operator">></span>

<span class="token operator">&lt;</span>style<span class="token operator">></span>
    <span class="token punctuation">.</span>wrapper <span class="token punctuation">&#123;</span>
        display<span class="token operator">:</span>flex<span class="token punctuation">;</span>
        flex<span class="token operator">-</span>direction<span class="token operator">:</span> row<span class="token punctuation">;</span>
        justify<span class="token operator">-</span>content<span class="token operator">:</span> center<span class="token punctuation">;</span>
        align<span class="token operator">-</span>items<span class="token operator">:</span> center<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>style<span class="token operator">></span>
</code>`}</pre>
<SectionComponent tag="h2" id="step-2-add-to-the-global-section-3" bind:intersecting={visible[2]}
	>Step 2: Add to the Global Section</SectionComponent
>
<p>
	To make the Freon code generator aware of our new component, we need to modify the <a
		href="/Documentation/Defining_an_Editor/Global_Projections"><code>global</code></a
	>
	section of the default editor configuration. Add the <code>PhoneButton</code> component here:
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// CourseSchedule/phase3/defs/main.edit#L3-L8
</span>
<span class="token class-name">global</span> &#123;
    <span class="token class-name">external</span> &#123;
        PersonIcon,
        PhoneButton
    &#125;
&#125;</code>`}</pre>
<SectionComponent tag="h2" id="step-3-include-in-the-projection-4" bind:intersecting={visible[3]}
	>Step 3: Include in the Projection</SectionComponent
>
<p>
	Next, we need to include the <code>PhoneButton</code> in the projection for the <code>Person</code> model. To do this, we modify the phone
	number property in the <code>externals.edit</code> file, adding the <code>wrap=PhoneButton</code> directive:
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// CourseSchedule/phase3/defs/externals.edit
</span>
<span class="token keyword">editor</span> externals

<span class="token class-name">Person</span> &#123;<span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token keyword">fragment</span> nameAndIcon<span class="token punctuation">]</span>
        Availability: $&#123;<span class="token function"><span class="token variable">self</span>.availability <span class="token keyword">checkbox</span></span>&#125; Competence: $&#123;<span class="token function"><span class="token variable">self</span>.competence</span>&#125;
<span class="token punctuation">]</span>
<span class="token keyword">fragment</span> nameAndIcon <span class="token punctuation">[</span>
<span class="token punctuation">[</span><span class="token keyword">external</span>=PersonIcon<span class="token punctuation">]</span> Nickname: $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125;
Full Name: $&#123;<span class="token function"><span class="token variable">self</span>.fullName</span>&#125;
$&#123;<span class="token variable">self</span>.phone <span class="token keyword">wrap</span>=PhoneButton&#125;
<span class="token punctuation">]</span>
&#125;
</code>`}</pre>
<SectionComponent tag="h2" id="step-4-register-in-the-starter-code-5" bind:intersecting={visible[4]}
	>Step 4: Register in the Starter Code</SectionComponent
>
<p>
	Finally, we need to let the Freon editor know how to instantiate our new <code>PhoneButton</code>
	component. We do this by adding the component to the <code>setCustomComponents</code> function in the starter code:
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CourseSchedule/phase3/src/external/externals.ts</span>

<span class="token keyword">import</span> <span class="token punctuation">&#123;</span>setCustomComponents<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@freon4dsl/core-svelte"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> PersonIcon <span class="token keyword">from</span> <span class="token string">"./PersonIcon.svelte"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> PhoneButton <span class="token keyword">from</span> <span class="token string">"./PhoneButton.svelte"</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * Configure the external components used, so Freon can find them.
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">configureExternals</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token function">setCustomComponents</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
        <span class="token punctuation">&#123;</span> component<span class="token operator">:</span> PersonIcon<span class="token punctuation">,</span> knownAs<span class="token operator">:</span> <span class="token string">"PersonIcon"</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
        <span class="token punctuation">&#123;</span> component<span class="token operator">:</span> PhoneButton<span class="token punctuation">,</span> knownAs<span class="token operator">:</span> <span class="token string">"PhoneButton"</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>
</code>`}</pre>
<SectionComponent tag="h2" id="final-result-6" bind:intersecting={visible[5]}>Final Result</SectionComponent>
<p>
	Once everything is set up, your Freon editor will look like this, with the added phone number button that opens a snackbar notification
	when clicked:
</p>
<Figure imageName={'examples/CourseSchedule/Screenshot-step3.png'} caption={'Editor with added Phone Button'} figureNumber={1} />
<h3 id="conclusion-5">Conclusion</h3>
<p>
	You’ve now successfully added a custom wrapper component to the Freon editor! This component wraps the phone number and includes a button
	that opens a snackbar with the phone number displayed. With this knowledge, you can start creating more complex components that integrate
	seamlessly with the Freon editor!
</p>
<p>Next, you are going to learn how to replace the component that renders a list.</p>

<PrevNextSection {prevLink} {nextLink} />
