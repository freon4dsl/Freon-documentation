<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'An Icon Component', visible: false, ref: '#an-icon-component-1' },
		{ title: 'Step 1: Create the Svelte Component', visible: false, ref: '#step-1-create-the-svelte-component-2' },
		{ title: 'Step 2: Add to the Global Section', visible: false, ref: '#step-2-add-to-the-global-section-3' },
		{ title: 'Step3: Include in the Projection', visible: false, ref: '#step3-include-in-the-projection-4' },
		{ title: 'Step4: Register in the Starter Code', visible: false, ref: '#step4-register-in-the-starter-code-5' },
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

	let prevLink = '/Examples/External_Components/The_CourseSchedule_DSL';
	let nextLink = '/Examples/External_Components/A_Wrapper_with_a_Button';

	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="an-icon-component-1" bind:intersecting={visible[0]}>An Icon Component</SectionComponent>
<p>
	In this part of the example, we will guide you through the process of enhancing the look of the <code>Staff</code> model by adding an icon
	to each person. We will create a custom Svelte component named <code>PersonIcon.svelte</code>, and integrate it into the editor. Let’s get
	started!
</p>
<SectionComponent tag="h2" id="step-1-create-the-svelte-component-2" bind:intersecting={visible[1]}
	>Step 1: Create the Svelte Component</SectionComponent
>
<p>
	To begin, we need to create a new Svelte component that will represent the icon for each person. Let’s call it <code
		>PersonIcon.svelte</code
	>. This component must be linked to the box model of the Freon editor. In Freon, each external component must be associated with a box,
	and the <code>PersonIcon</code> component will be tied to a box type called <code>ExternalSimpleBox</code>. The parameter
	<code>editor: FreEditor</code> is also mandatory. When the component is instantiated by the Freon editor both parameters will get a value.
</p>
<p>The complete Svelte component should look like this:</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CourseSchedule/phase2/src/external/PersonIcon.svelte</span>

<span class="token operator">&lt;</span>script lang<span class="token operator">=</span><span class="token string">"ts"</span><span class="token operator">></span>
    <span class="token keyword">import</span> <span class="token punctuation">&#123;</span>ExternalSimpleBox<span class="token punctuation">,</span> FreEditor<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@freon4dsl/core"</span><span class="token punctuation">;</span>

		<span class="token comment">// Declare the 'box' and 'editor' parameters as required by Freon</span>
    <span class="token keyword">export</span> <span class="token keyword">let</span> box<span class="token operator">:</span> ExternalSimpleBox<span class="token punctuation">;</span>
    <span class="token keyword">export</span> <span class="token keyword">let</span> editor<span class="token operator">:</span> FreEditor<span class="token punctuation">;</span>

<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>

<span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> Display the icon <span class="token keyword">with</span> an image <span class="token operator">--</span><span class="token operator">></span>
<span class="token operator">&lt;</span>img src<span class="token operator">=</span><span class="token string">'./icons8-person-94.png'</span> alt<span class="token operator">=</span><span class="token string">"Icon showing Person"</span> height<span class="token operator">=</span><span class="token string">"30px"</span><span class="token operator">/</span><span class="token operator">></span>
</code>`}</pre>
<SectionComponent tag="h2" id="step-2-add-to-the-global-section-3" bind:intersecting={visible[2]}
	>Step 2: Add to the Global Section</SectionComponent
>
<p>
	The next step is to inform the Freon code generator about the new external component. We can achieve this by modifying the <a
		href="/Documentation/Defining_an_Editor/Global_Projections"><code>global</code></a
	> section of the default editor configuration.
</p>
<p>In the <code>main.edit</code> file, add the following code to declare the <code>PersonIcon</code> component:</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// CourseSchedule/phase2/defs/main.edit#L3-L7
</span>
<span class="token class-name">global</span> &#123;
    <span class="token class-name">external</span> &#123;
        PersonIcon
    &#125;
&#125;</code>`}</pre>
<p>
	This tells the editor that <code>PersonIcon</code> is an external component. You can name it anything you like, but for simplicity, we
	will use <code>PersonIcon</code>.
</p>
<SectionComponent tag="h2" id="step3-include-in-the-projection-4" bind:intersecting={visible[3]}
	>Step3: Include in the Projection</SectionComponent
>
<p>
	To include the new component, we need to reference it in the editor’s projection for the <code>Person</code> concept. The way to do this
	is by adding <code>[external=PersonIcon]</code> to the projection. To be able to see the differences in the browser between the native
	editor and the one with external components we have decided to add the adjusted projection to a new editor (projection set). The icon is
	included in the fragment that shows the name and phone number details. Every fragment for the same concept must have a unique name.
	Therefore, we name this fragment <code>nameAndIcon</code>.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// CourseSchedule/phase2/defs/externals.edit
</span>
<span class="token keyword">editor</span> externals

<span class="token class-name">Person</span> &#123;<span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token keyword">fragment</span> nameAndIcon<span class="token punctuation">]</span>
        Availability: $&#123;<span class="token function"><span class="token variable">self</span>.availability <span class="token keyword">checkbox</span></span>&#125; Competence: $&#123;<span class="token function"><span class="token variable">self</span>.competence</span>&#125;
<span class="token punctuation">]</span>
<span class="token keyword">fragment</span> nameAndIcon <span class="token punctuation">[</span>
<span class="token punctuation">[</span><span class="token keyword">external</span>=PersonIcon<span class="token punctuation">]</span> Nickname: $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125;
Full Name: $&#123;<span class="token function"><span class="token variable">self</span>.fullName</span>&#125;
Phone <span class="token builtin">number</span>: $&#123;<span class="token function"><span class="token variable">self</span>.phone</span>&#125;
<span class="token punctuation">]</span>
&#125;
</code>`}</pre>
<SectionComponent tag="h2" id="step4-register-in-the-starter-code-5" bind:intersecting={visible[4]}
	>Step4: Register in the Starter Code</SectionComponent
>
<p>
	Now, we need to ensure the Freon editor knows how to instantiate our custom component. This is done by calling the <code
		>setCustomComponents</code
	> function in the application’s startup code.
</p>
<p>
	In your <code>externals.ts</code> file, import the <code>PersonIcon</code> component and add it to the <code>setCustomComponents</code> function
	like this:
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CourseSchedule/phase2/src/external/externals.ts</span>

<span class="token keyword">import</span> <span class="token punctuation">&#123;</span>setCustomComponents<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@freon4dsl/core-svelte"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> PersonIcon <span class="token keyword">from</span> <span class="token string">"./PersonIcon.svelte"</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * Configure the external components used, so Freon can find them.
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">configureExternals</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token function">setCustomComponents</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
        <span class="token punctuation">&#123;</span> component<span class="token operator">:</span> PersonIcon<span class="token punctuation">,</span> knownAs<span class="token operator">:</span> <span class="token string">"PersonIcon"</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>
</code>`}</pre>
<SectionComponent tag="h2" id="final-result-6" bind:intersecting={visible[5]}>Final Result</SectionComponent>
<p>
	Once all the steps are completed, your editor will look like this, with each person displaying their details alongside the newly added
	icon:
</p>
<Figure imageName={'examples/CourseSchedule/Screenshot-step2.png'} caption={'Editor with added Icon'} figureNumber={1} />
<h3 id="conclusion-1">Conclusion:</h3>
<p>
	You’ve successfully added an icon to the <code>Staff</code> model in the Freon editor! By following these steps, you’ve created a custom Svelte
	component, integrated it into the Freon editor, and made it available in your projections.
</p>
<p>Next, you are going to learn how to get the information from the AST model, and use it in your external components.</p>

<PrevNextSection {prevLink} {nextLink} />
