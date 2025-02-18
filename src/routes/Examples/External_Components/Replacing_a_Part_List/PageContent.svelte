<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Replacing a Part List', visible: false, ref: '#replacing-a-part-list-1' },
		{ title: 'Step 1: Create the Svelte Component', visible: false, ref: '#step-1-create-the-svelte-component-2' },
		{ title: 'Step 2: Include in the Projection', visible: false, ref: '#step-2-include-in-the-projection-3' },
		{ title: 'Step 3: Do the Admin', visible: false, ref: '#step-3-do-the-admin-4' },
		{ title: 'Final Result', visible: false, ref: '#final-result-5' }
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

	let prevLink = '/Examples/External_Components/A_Wrapper_with_a_Button';
	let nextLink = '/Examples/External_Components/A_Sorted_Table';

	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="replacing-a-part-list-1" bind:intersecting={visible[0]}>Replacing a Part List</SectionComponent>
<p>
	In this part of the extended example, you’ll learn how to replace a part list in your application by creating a custom Svelte component, <code
		>StaffAccordion.svelte</code
	>, to display and manage a list of teachers within an accordion. Let’s dive in step by step.
</p>
<SectionComponent tag="h2" id="step-1-create-the-svelte-component-2" bind:intersecting={visible[1]}
	>Step 1: Create the Svelte Component</SectionComponent
>
<p>
	We’ll start by creating the <code>StaffAccordion.svelte</code> component. This component will replace the default projection of the
	<code>teachers</code>
	property in the <code>Staff</code> model unit.
</p>
<h3 id="the-script-section-1">The Script Section</h3>
<p>Begin by defining the component’s parameters and the necessary state management functions:</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CourseSchedule/phase4/src/external/StaffAccordion.svelte#L9-L55</span>

<span class="token comment">// This component replaces the component for "teachers: Person[];" from model unit "Staff".</span>
<span class="token comment">// This property is a parts list, therefore the external box to use is an ExternalPartListBox.</span>
<span class="token keyword">export</span> <span class="token keyword">let</span> box<span class="token operator">:</span> ExternalPartListBox<span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">let</span> editor<span class="token operator">:</span> FreEditor<span class="token punctuation">;</span>

<span class="token keyword">let</span> panelOpen<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>      <span class="token comment">// List of booleans to indicate which panel is open (true) and closed (false).</span>
<span class="token keyword">let</span> multiplePar<span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>   <span class="token comment">// Indicates whether multiple panels may be open at the same time.</span>

<span class="token comment">/*
    Sets all panels in the state 'closed',
    and sets the length of 'panelOpen'.
 */</span>
<span class="token keyword">function</span> <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">let</span> param<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> box<span class="token punctuation">.</span><span class="token function">findParam</span><span class="token punctuation">(</span><span class="token string">"multi"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>param <span class="token operator">===</span> <span class="token string">"multiple"</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        multiplePar <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
    panelOpen <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> box<span class="token punctuation">.</span>children<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token comment">// this also sets the length of panelOpen!</span>
        panelOpen<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        box<span class="token punctuation">.</span>children<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>isVisible <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// the child boxes are not currently shown</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">// The following four functions need to be included for the editor to function properly.</span>
<span class="token comment">// Please, set the focus to the first editable/selectable element in this component.</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">setFocus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">></span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span> <span class="token keyword">let</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> box<span class="token punctuation">.</span>children<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>panelOpen<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            box<span class="token punctuation">.</span>children<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">setFocus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>
<span class="token keyword">const</span> refresh <span class="token operator">=</span> <span class="token punctuation">(</span>why<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// do whatever needs to be done to refresh the elements that show information from the model</span>
    <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
<span class="token function">onMount</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    box<span class="token punctuation">.</span>setFocus <span class="token operator">=</span> setFocus<span class="token punctuation">;</span>
    box<span class="token punctuation">.</span>refreshComponent <span class="token operator">=</span> refresh<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">afterUpdate</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    box<span class="token punctuation">.</span>setFocus <span class="token operator">=</span> setFocus<span class="token punctuation">;</span>
    box<span class="token punctuation">.</span>refreshComponent <span class="token operator">=</span> refresh<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}</pre>
<p>
	We have implemented the <code>setFocus</code> function such that when the focus is programmatically set to the list, it is redirected to
	the element in the first panel that is open. Furthermore, we have added an <code>initialize</code> function, which does two things. It
	finds the parameter that is given in the .edit file under the name <code>multi</code>, and it initializes the <code>panelOpen</code> variable.
</p>
<p>
	Also, we need to take care of adding to and removing from the list. Therefore, we add two functions
	<code>addPerson</code> and <code>removePerson</code>. Because the reactivity of the AST model is implemented using the
	<a href="https://mobx.js.org/" target="_blank">MobX</a>
	state management library, we need to put any changes to the AST inside a MobX action. Freon provides two methods for this purpose:
	<code>AST.change</code>
	and
	<code>AST.changeNamed</code>. The latter is only useful for logging purposes, and will not be used in this example. The rest of the
	implementation of both functions is straightforward. We get the list of AST nodes from the box using <code>Box.getPropertyValue()</code>,
	and change it.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CourseSchedule/phase4/src/external/StaffAccordion.svelte#L57-L72</span>

<span class="token keyword">const</span> <span class="token function-variable function">addPerson</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// Note that you need to put any changes to the actual model in a 'AST.change or AST.changeNamed',</span>
    <span class="token comment">// because all elements in the model are reactive using mobx.</span>
    <span class="token constant">AST</span><span class="token punctuation">.</span><span class="token function">change</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">let</span> newPerson<span class="token operator">:</span> Person <span class="token operator">=</span> Person<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        box<span class="token punctuation">.</span><span class="token function">getPropertyValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>newPerson<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">const</span> <span class="token function-variable function">removePerson</span> <span class="token operator">=</span> <span class="token punctuation">(</span>index<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// Note that you need to put any changes to the actual model in a 'AST.change' or</span>
    <span class="token comment">// 'AST.changeNamed', because all elements in the AST model are reactive using mobx.</span>
    <span class="token constant">AST</span><span class="token punctuation">.</span><span class="token function">change</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        box<span class="token punctuation">.</span><span class="token function">getPropertyValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<p>That done, we need to call both functions somewhere in the HTML section of the component.</p>
<h3 id="the-html-section-2">The HTML Section</h3>
<p>
	The actual HTML in the component consists of a <code>div</code> with the <code>Accordion</code>, and an icon button to add an element to
	the list. We have added some inline styling, just to make things look a little bit better, but the focus of this example is not on
	styling, therefore it is kept to a minimum.
</p>
<p>
	In the <code>Accordion</code> component we loop over the children of the box, using both the child box and its index in the list. We
	create a <code>Panel</code> for each childBox, setting it to <code>open</code> based the value in <code>panelOpen[index]</code>. Take a
	look at the header of each <code>Panel</code>, which contains information from the AST model. Every box is associated with the AST node
	that it represents. This AST node can be accessed using <code>childBox.node</code>, which returns an object of type <code>FreNode</code>.
	Also, every AST node knows its meta type, i.e. the concept from the .edit file that is used to instantiate the node. We can access this
	name using
	<code>childBox.node.freLanguageConcept()</code>. Here the result is a string with the value ‘Person’.
</p>
<p>
	We can do even more with the AST, but because its type is <code>FreNode</code> and not <code>Person</code>, this is a little bit more
	complex. We could use a different variable, and cast the node to the right type, but that would mean that we have a lot more admin to do
	in the <code>initialize</code> function. Therefore, we have chosen to access the information using a generic TypeScript manner called
	<a href="https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html" target="_blank">typed index accessing</a>
	to look up a specific property on another type: <code>childBox.node["name"]</code>. This results in the name of the <code>Person</code> object.
</p>
<p>
	The content of each panel is defined as the native Freon component for the child box coupled with an icon button that calls the <code
		>removePerson</code
	>
	function for that specific element in the list. The native Freon component is rendered by the Freon
	<code>RenderComponent</code> as in the <code>PhoneButton.svelte</code> component.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CourseSchedule/phase4/src/external/StaffAccordion.svelte#L78-L96</span>

<span class="token operator">&lt;</span>div style<span class="token operator">=</span><span class="token string">"display: flex; align-items: flex-end;"</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>Accordion multiple<span class="token operator">=</span><span class="token string">"&#123;multiplePar&#125;"</span><span class="token operator">></span>
        <span class="token punctuation">&#123;</span>#each box<span class="token punctuation">.</span>children <span class="token keyword">as</span> childBox<span class="token punctuation">,</span> index<span class="token punctuation">&#125;</span>
            <span class="token operator">&lt;</span>Panel bind<span class="token operator">:</span>open<span class="token operator">=</span><span class="token punctuation">&#123;</span>panelOpen<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">&#125;</span><span class="token operator">></span>
                <span class="token operator">&lt;</span>Header<span class="token operator">></span>
                    <span class="token punctuation">&#123;</span>childBox<span class="token punctuation">.</span>node<span class="token punctuation">.</span><span class="token function">freLanguageConcept</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">&#125;</span> <span class="token punctuation">&#123;</span>childBox<span class="token punctuation">.</span>node<span class="token punctuation">[</span><span class="token string">"name"</span><span class="token punctuation">]</span><span class="token punctuation">&#125;</span>
                <span class="token operator">&lt;</span><span class="token operator">/</span>Header<span class="token operator">></span>
                <span class="token operator">&lt;</span>Content<span class="token operator">></span>
                    <span class="token operator">&lt;</span>div style<span class="token operator">=</span><span class="token string">"display: flex; align-items: flex-end;"</span><span class="token operator">></span>
                        <span class="token operator">&lt;</span>RenderComponent box<span class="token operator">=</span><span class="token punctuation">&#123;</span>childBox<span class="token punctuation">&#125;</span> editor<span class="token operator">=</span><span class="token punctuation">&#123;</span>editor<span class="token punctuation">&#125;</span> <span class="token operator">/</span><span class="token operator">></span>
                        <span class="token operator">&lt;</span>IconButton <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"material-icons"</span> on<span class="token operator">:</span>click<span class="token operator">=</span><span class="token punctuation">&#123;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">removePerson</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">&#125;</span><span class="token operator">></span>remove<span class="token operator">&lt;</span><span class="token operator">/</span>IconButton<span class="token operator">></span>
                    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
                <span class="token operator">&lt;</span><span class="token operator">/</span>Content<span class="token operator">></span>
            <span class="token operator">&lt;</span><span class="token operator">/</span>Panel<span class="token operator">></span>
        <span class="token punctuation">&#123;</span><span class="token operator">/</span>each<span class="token punctuation">&#125;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>Accordion<span class="token operator">></span>

    <span class="token operator">&lt;</span>IconButton <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"material-icons"</span> on<span class="token operator">:</span>click<span class="token operator">=</span><span class="token punctuation">&#123;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">addPerson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">&#125;</span><span class="token operator">></span>add<span class="token operator">&lt;</span><span class="token operator">/</span>IconButton<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span></code>`}</pre>
<h3 id="the-complete-component-3">The Complete Component</h3>
<p>Now that we’ve defined the script and HTML sections, here’s the full component:</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CourseSchedule/phase4/src/external/StaffAccordion.svelte</span>

<span class="token operator">&lt;</span>script lang<span class="token operator">=</span><span class="token string">"ts"</span><span class="token operator">></span>
    <span class="token keyword">import</span> Accordion<span class="token punctuation">,</span> <span class="token punctuation">&#123;</span>Panel<span class="token punctuation">,</span> Header<span class="token punctuation">,</span> Content<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@smui-extra/accordion'</span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> IconButton <span class="token keyword">from</span> <span class="token string">'@smui/icon-button'</span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token punctuation">&#123;</span><span class="token constant">AST</span><span class="token punctuation">,</span> ExternalPartListBox<span class="token punctuation">,</span> FreEditor<span class="token punctuation">,</span> FreNodeReference<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@freon4dsl/core"</span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token punctuation">&#123;</span>RenderComponent<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@freon4dsl/core-svelte"</span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token punctuation">&#123;</span>afterUpdate<span class="token punctuation">,</span> onMount<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"svelte"</span><span class="token punctuation">;</span>
    <span class="token keyword">import</span> <span class="token punctuation">&#123;</span>Person<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"../freon/language/gen/index.js"</span><span class="token punctuation">;</span>

    <span class="token comment">// This component replaces the component for "teachers: Person[];" from model unit "Staff".</span>
    <span class="token comment">// This property is a parts list, therefore the external box to use is an ExternalPartListBox.</span>
    <span class="token keyword">export</span> <span class="token keyword">let</span> box<span class="token operator">:</span> ExternalPartListBox<span class="token punctuation">;</span>
    <span class="token keyword">export</span> <span class="token keyword">let</span> editor<span class="token operator">:</span> FreEditor<span class="token punctuation">;</span>

    <span class="token keyword">let</span> panelOpen<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>      <span class="token comment">// List of booleans to indicate which panel is open (true) and closed (false).</span>
    <span class="token keyword">let</span> multiplePar<span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>   <span class="token comment">// Indicates whether multiple panels may be open at the same time.</span>

    <span class="token comment">/*
        Sets all panels in the state 'closed',
        and sets the length of 'panelOpen'.
     */</span>
    <span class="token keyword">function</span> <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">let</span> param<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> box<span class="token punctuation">.</span><span class="token function">findParam</span><span class="token punctuation">(</span><span class="token string">"multi"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>param <span class="token operator">===</span> <span class="token string">"multiple"</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            multiplePar <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
        panelOpen <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> box<span class="token punctuation">.</span>children<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token comment">// this also sets the length of panelOpen!</span>
            panelOpen<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            box<span class="token punctuation">.</span>children<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>isVisible <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// the child boxes are not currently shown</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">// The following four functions need to be included for the editor to function properly.</span>
    <span class="token comment">// Please, set the focus to the first editable/selectable element in this component.</span>
    <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">setFocus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">></span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span> <span class="token keyword">let</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> box<span class="token punctuation">.</span>children<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>panelOpen<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                box<span class="token punctuation">.</span>children<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">setFocus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token keyword">const</span> refresh <span class="token operator">=</span> <span class="token punctuation">(</span>why<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        <span class="token comment">// do whatever needs to be done to refresh the elements that show information from the model</span>
        <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
    <span class="token function">onMount</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        box<span class="token punctuation">.</span>setFocus <span class="token operator">=</span> setFocus<span class="token punctuation">;</span>
        box<span class="token punctuation">.</span>refreshComponent <span class="token operator">=</span> refresh<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">afterUpdate</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        box<span class="token punctuation">.</span>setFocus <span class="token operator">=</span> setFocus<span class="token punctuation">;</span>
        box<span class="token punctuation">.</span>refreshComponent <span class="token operator">=</span> refresh<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> <span class="token function-variable function">addPerson</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        <span class="token comment">// Note that you need to put any changes to the actual model in a 'AST.change or AST.changeNamed',</span>
        <span class="token comment">// because all elements in the model are reactive using mobx.</span>
        <span class="token constant">AST</span><span class="token punctuation">.</span><span class="token function">change</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">let</span> newPerson<span class="token operator">:</span> Person <span class="token operator">=</span> Person<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            box<span class="token punctuation">.</span><span class="token function">getPropertyValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>newPerson<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">const</span> <span class="token function-variable function">removePerson</span> <span class="token operator">=</span> <span class="token punctuation">(</span>index<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        <span class="token comment">// Note that you need to put any changes to the actual model in a 'AST.change' or</span>
        <span class="token comment">// 'AST.changeNamed', because all elements in the AST model are reactive using mobx.</span>
        <span class="token constant">AST</span><span class="token punctuation">.</span><span class="token function">change</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
            box<span class="token punctuation">.</span><span class="token function">getPropertyValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">// Run the initialization</span>
    <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>

<span class="token operator">&lt;</span>div style<span class="token operator">=</span><span class="token string">"display: flex; align-items: flex-end;"</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>Accordion multiple<span class="token operator">=</span><span class="token string">"&#123;multiplePar&#125;"</span><span class="token operator">></span>
        <span class="token punctuation">&#123;</span>#each box<span class="token punctuation">.</span>children <span class="token keyword">as</span> childBox<span class="token punctuation">,</span> index<span class="token punctuation">&#125;</span>
            <span class="token operator">&lt;</span>Panel bind<span class="token operator">:</span>open<span class="token operator">=</span><span class="token punctuation">&#123;</span>panelOpen<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">&#125;</span><span class="token operator">></span>
                <span class="token operator">&lt;</span>Header<span class="token operator">></span>
                    <span class="token punctuation">&#123;</span>childBox<span class="token punctuation">.</span>node<span class="token punctuation">.</span><span class="token function">freLanguageConcept</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">&#125;</span> <span class="token punctuation">&#123;</span>childBox<span class="token punctuation">.</span>node<span class="token punctuation">[</span><span class="token string">"name"</span><span class="token punctuation">]</span><span class="token punctuation">&#125;</span>
                <span class="token operator">&lt;</span><span class="token operator">/</span>Header<span class="token operator">></span>
                <span class="token operator">&lt;</span>Content<span class="token operator">></span>
                    <span class="token operator">&lt;</span>div style<span class="token operator">=</span><span class="token string">"display: flex; align-items: flex-end;"</span><span class="token operator">></span>
                        <span class="token operator">&lt;</span>RenderComponent box<span class="token operator">=</span><span class="token punctuation">&#123;</span>childBox<span class="token punctuation">&#125;</span> editor<span class="token operator">=</span><span class="token punctuation">&#123;</span>editor<span class="token punctuation">&#125;</span> <span class="token operator">/</span><span class="token operator">></span>
                        <span class="token operator">&lt;</span>IconButton <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"material-icons"</span> on<span class="token operator">:</span>click<span class="token operator">=</span><span class="token punctuation">&#123;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">removePerson</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">&#125;</span><span class="token operator">></span>remove<span class="token operator">&lt;</span><span class="token operator">/</span>IconButton<span class="token operator">></span>
                    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
                <span class="token operator">&lt;</span><span class="token operator">/</span>Content<span class="token operator">></span>
            <span class="token operator">&lt;</span><span class="token operator">/</span>Panel<span class="token operator">></span>
        <span class="token punctuation">&#123;</span><span class="token operator">/</span>each<span class="token punctuation">&#125;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>Accordion<span class="token operator">></span>

    <span class="token operator">&lt;</span>IconButton <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"material-icons"</span> on<span class="token operator">:</span>click<span class="token operator">=</span><span class="token punctuation">&#123;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">addPerson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">&#125;</span><span class="token operator">></span>add<span class="token operator">&lt;</span><span class="token operator">/</span>IconButton<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
</code>`}</pre>
<SectionComponent tag="h2" id="step-2-include-in-the-projection-3" bind:intersecting={visible[2]}
	>Step 2: Include in the Projection</SectionComponent
>
<p>
	To integrate our new accordion component into the projection, we need to modify the <code>.edit</code> file. Specifically, we’ll replace
	the <code>teachers</code> property with the <code>StaffAccordion</code> component and pass the <code>multi</code> parameter to allow multiple
	panels to be open. Note that parameter passing is string based. Any parameter is a key-value pair, where both the key and the value are strings.
	There are no checks on any types or values.
</p>
<p>In your <code>.edit</code> file:</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// CourseSchedule/phase4/defs/externals.edit#L14-L18
</span>
<span class="token class-name">Staff</span> &#123;<span class="token punctuation">[</span>
Staff <span class="token keyword">in</span> the category: $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125;

    $&#123;<span class="token variable">self</span>.teachers <span class="token keyword">replace</span>=StaffAccordion multi=<span class="token string">"multiple"</span>&#125;
<span class="token punctuation">]</span>&#125;</code>`}</pre>
<SectionComponent tag="h2" id="step-3-do-the-admin-4" bind:intersecting={visible[3]}>Step 3: Do the Admin</SectionComponent>
<p>
	All that is left to do, is the familiar admin. Add <code>StaffAccordion</code> to the global section of your editor’s definition and ensure
	it’s recognized as a custom component.
</p>
<p>In the <code>global</code> section of the <code>main.edit</code> file:</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// CourseSchedule/phase4/defs/main.edit#L3-L9
</span>
<span class="token class-name">global</span> &#123;
    <span class="token class-name">external</span> &#123;
        PersonIcon,
        PhoneButton,
        StaffAccordion
    &#125;
&#125;</code>`}</pre>
<p>
	In the <code>externals.ts</code>, register <code>StaffAccordion</code> as a custom component. Don’t forget to update your
	<code>package.json</code> file to include any library components.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CourseSchedule/phase4/src/external/externals.ts#L9-L15</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">configureExternals</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token function">setCustomComponents</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
        <span class="token punctuation">&#123;</span> component<span class="token operator">:</span> PersonIcon<span class="token punctuation">,</span> knownAs<span class="token operator">:</span> <span class="token string">"PersonIcon"</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
        <span class="token punctuation">&#123;</span> component<span class="token operator">:</span> PhoneButton<span class="token punctuation">,</span> knownAs<span class="token operator">:</span> <span class="token string">"PhoneButton"</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
        <span class="token punctuation">&#123;</span> component<span class="token operator">:</span> StaffAccordion<span class="token punctuation">,</span> knownAs<span class="token operator">:</span> <span class="token string">"StaffAccordion"</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<SectionComponent tag="h2" id="final-result-5" bind:intersecting={visible[4]}>Final Result</SectionComponent>
<p>After following these steps, your editor will display the staff list in an accordion format. Here’s what the result will look like:</p>
<ul>
	<li>
		<p><strong>All panels closed:</strong></p>
		<Figure imageName={'examples/CourseSchedule/Screenshot-step4a.png'} caption={'Staff model unit with Accordion'} figureNumber={1} />
	</li>
	<li>
		<p><strong>A panel open:</strong></p>
		<Figure imageName={'examples/CourseSchedule/Screenshot-step4b.png'} caption={'Accordion with open panel'} figureNumber={2} />
	</li>
</ul>
<h3 id="conclusion-4">Conclusion</h3>
<p>
	And that’s it! You’ve successfully replaced the <code>teachers</code> list with an accordion in Svelte. Next up, you will learn how to manipulate
	AST nodes and display them in a different order.
</p>

<PrevNextSection {prevLink} {nextLink} />
