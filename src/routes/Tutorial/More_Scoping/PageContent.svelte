<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'More scoping', visible: false, ref: '#more-scoping-1' },
		{ title: 'The Test model unit metamodel', visible: false, ref: '#the-test-model-unit-metamodel-2' },
		{ title: 'The Test model unit projections', visible: false, ref: '#the-test-model-unit-projections-3' },
		{ title: 'Namespace Addition', visible: false, ref: '#namespace-addition-4' }
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

	let prevLink = '/Tutorial/In_Need_of_Scoping';
	let nextLink = '/Tutorial/How_to_Handle_Typing';

	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="more-scoping-1" bind:intersecting={visible[0]}>More scoping</SectionComponent>
<p>
	In this lesson your will learn more about scoping. But first, we need to add the metamodel, and the projections for the fourth model unit,
	the <em>Tests</em>.
</p>
<SectionComponent tag="h2" id="the-test-model-unit-metamodel-2" bind:intersecting={visible[1]}
	>The <em>Test</em> model unit metamodel</SectionComponent
>
<p>
	In the requirements of our DSL in the <a href="/Tutorial/Overview">introduction</a> of the tutorial, one line says: ”… our client company
	want a means to test the page flow before the actual webpages are produced.” The <em>Test</em> Model unit is the start to fulfill this requirement.
</p>
<p>
	In a Test, the teacher can add a number of scenarios, where each scenario describes a series of page flows. For instance, the teacher may
	want to test that from the start page ‘Theory101’, a pupil that answers all questions correct, will next be directed to page ‘InDepth101’.
	If the pupil again is able to answer all in depth questions correctly, the next page to show should be ‘Theory102’.
</p>
<p>
	In the test we want to be able to give specific answers to the questions on the current page, and we need to express the follow-up page.
	So we add the following to the file ‘edu-tests.ast’. All should be familiar by now.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson7-defs/edu-tests.ast
</span>
language Education

<span class="token keyword">modelunit</span> <span class="token class-name">Test</span> &#123;
    name: <span class="token builtin">identifier</span>;
    scenarios: <span class="token class-name">Scenario</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    <span class="token keyword">reference</span> main: <span class="token class-name">SiteGroup</span>;
    <span class="token keyword">reference</span> flow: <span class="token class-name">Flow</span>;
&#125;

<span class="token keyword">concept</span> <span class="token class-name">Scenario</span> &#123;
    description: <span class="token builtin">string</span>;
    testFlow: <span class="token class-name">TestFlow</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
&#125;

<span class="token keyword">concept</span> <span class="token class-name">TestFlow</span> &#123;
    steps: <span class="token class-name">Step</span><span class="token punctuation">[</span><span class="token punctuation">]</span>; <span class="token comment">/* Note that the order is of importance */</span>
&#125;

<span class="token keyword">concept</span> <span class="token class-name">Step</span> &#123;
    <span class="token keyword">reference</span> fromPage: <span class="token class-name">Page</span>;
    answerSeries: <span class="token class-name">Answer</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
&#125;

<span class="token keyword">concept</span> <span class="token class-name">LastStep</span> <span class="token keyword">base</span> <span class="token class-name">Step</span> &#123;
&#125;

<span class="token keyword">concept</span> <span class="token class-name">Answer</span> &#123;
    <span class="token keyword">reference</span> question: <span class="token class-name">Question</span>;
    value: <span class="token class-name">NumberConcept</span>;
&#125;
</code>`}</pre>
<SectionComponent tag="h2" id="the-test-model-unit-projections-3" bind:intersecting={visible[2]}
	>The <em>Test</em> model unit projections</SectionComponent
>
<p>We also build the projections, and again, nothing should be strange for you at the moment.</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson7-defs/edu-tests.edit
</span>
<span class="token keyword">editor</span> <span class="token keyword">default</span>

<span class="token class-name">Test</span> &#123;<span class="token punctuation">[</span>
    Test $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125;
    Regarding MainTopic: $&#123;<span class="token function"><span class="token variable">self</span>.main</span>&#125;, and flow: $&#123;<span class="token function"><span class="token variable">self</span>.flow</span>&#125;

    $&#123;<span class="token function"><span class="token variable">self</span>.scenarios</span>&#125;
<span class="token punctuation">]</span>&#125;

<span class="token class-name">Scenario</span> &#123;<span class="token punctuation">[</span>
    ------------------------------------
    $&#123;<span class="token function"><span class="token variable">self</span>.description</span>&#125;

        $&#123;<span class="token function"><span class="token variable">self</span>.testFlow <span class="token keyword">vertical</span></span>&#125;
<span class="token punctuation">]</span>&#125;

<span class="token class-name">TestFlow</span> &#123;<span class="token punctuation">[</span>
    $&#123;<span class="token function"><span class="token variable">self</span>.steps <span class="token keyword">horizontal</span> <span class="token keyword">separator</span>[===>]</span>&#125;
<span class="token punctuation">]</span>&#125;

<span class="token class-name">Step</span> &#123;<span class="token punctuation">[</span>
    $&#123;<span class="token function"><span class="token variable">self</span>.fromPage</span>&#125; => $&#123;<span class="token variable">self</span>.answerSeries <span class="token keyword">table</span> rows&#125;
<span class="token punctuation">]</span>&#125;

<span class="token class-name">LastStep</span> &#123;<span class="token punctuation">[</span>
    $&#123;<span class="token function"><span class="token variable">self</span>.fromPage</span>&#125;
<span class="token punctuation">]</span>&#125;

<span class="token class-name">Answer</span> &#123; <span class="token keyword">table</span> <span class="token punctuation">[</span>
    $&#123;<span class="token function"><span class="token variable">self</span>.question</span>&#125; | $&#123;<span class="token function"><span class="token variable">self</span>.value</span>&#125;
<span class="token punctuation">]</span>&#125;
</code>`}</pre>
<SectionComponent tag="h2" id="namespace-addition-4" bind:intersecting={visible[3]}>Namespace Addition</SectionComponent>
<p>
	Now we come to the interesting bit. If you try to build a test flow, you will notice that in the series of answers the user can again
	access/see names of questions that are not part of the page where the flow starts. To see an example, go ahead, and generate a new editor.
	Then open yet another model called ‘lesson6’. (We changed the metamodel, and therefore we use an adapted model.) If you go the side panel
	and open ‘TestB’, you will see the following. (Todo; check this, maybe create two models for this lesson)
</p>
<Figure imageName={'tutorial/Tutorial-lesson7-screenshot1.png'} caption={'No scoping in the Test model unit'} figureNumber={1} />
<p>
	The questions named ‘pie’ and ‘pie2’ are part pf page ‘Theory101’, but the questions ‘difficult1’, and ‘further’ are not. How to avoid
	these kind of errors?
</p>
<p>
	The answer is another scope rule. We need to draw a line around each <code>Step</code> instance, a line where names may not cross. Thus,
	we make <code>Step</code> a namespace. The problem is that this namespace does not have any names in it. No names are directly owned by
	any <code>Step</code> object. The names that we need, namely the names of the question on the page, are in the property
	<code>fromPage</code>. To let Freon know that these are the names to be used in a <code>Step</code> instance, we use the notion of
	<strong>namespace addition</strong>.
</p>
<p>
	A namespace addition adds names to a namespace as long as these names can be directly reached from the namespace object. For instance, in
	this example we can use the <code>fromPage</code> property, but here is no way to refer to other scenarios.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson7-defs/edu.scope
</span>
scoper EducationScoper for language Education

<span class="token class-name">isnamespace</span> &#123; Page, Step &#125;

<span class="token class-name">Step</span> &#123;
    <span class="token keyword">namespace_addition</span> = <span class="token variable">self</span>.fromPage;
&#125;
</code>`}</pre>
<p>
	Now regenerate and have a look. You will see that the question names that are available in the answer series are only those of the <code
		>fromPage</code
	>. Yes, scoping can be this easy!
</p>
<p>
	In the next lesson you will learn more sophisticated stuff. We will introduce the Freon typing system to help your user to create solid
	models.
</p>

<PrevNextSection {prevLink} {nextLink} />
