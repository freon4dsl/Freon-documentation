<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Using the Context', visible: false, ref: '#using-the-context-1' },
		{ title: 'Evaluation of a Step', visible: false, ref: '#evaluation-of-a-step-2' }
	];
	let visible: boolean[] = [];
	$: $mySections[0].visible = visible[0];
	$: $mySections[1].visible = visible[1];
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

	let prevLink = '/Examples/Building_an_Interpreter/Basic_Evaluation_Functions';
	let nextLink = '/Examples/Building_an_Interpreter/Finishing_the_Test';

	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="using-the-context-1" bind:intersecting={visible[0]}>Using the Context</SectionComponent>
<p>
	Now we have established how to determine the basic runtime values, we can continue with the heavy work: connecting all elements. This is
	where the context plays its role.
</p>
<SectionComponent tag="h2" id="evaluation-of-a-step-2" bind:intersecting={visible[1]}>Evaluation of a Step</SectionComponent>
<p>
	We are working bottom-up, so the next concept for which to implement an evaluation function is <code>Step</code>. Each step has a
	<code>fromPage</code>, and a series of answers to the questions on the <code>fromPage</code>, as shown in the following figure.
</p>
<Figure imageName={'examples/Interpreter/TestB.png'} caption={'The steps in a test'} figureNumber={1} />
<p>What we need to do is:</p>
<ol>
	<li>
		compare the given answers for each question on the <code>fromPage</code> with the correct answers, and determine the number of correct answers
	</li>
	<li>based on the answers, find the grade from the <code>fromPage</code>,</li>
	<li>based on the grade, find the page the application should switch to according to the rule given in the page flow,</li>
	<li>finally, return as runtime value for this step the page to which the application should switch.</li>
</ol>
<p>Let’s take a step-by-step look at how this is implemented.</p>
<h3 id="number-of-correct-answers-1">Number of Correct Answers</h3>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L113-L126</span>

<span class="token comment">// Put the page for this step in the context</span>
<span class="token keyword">const</span> newCtx <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">InterpreterContext</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>

<span class="token comment">// Find the nr of correct answers and add it to the context</span>
<span class="token keyword">let</span> nrOfCorrectAnswers <span class="token operator">=</span> <span class="token number">0</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> answer <span class="token keyword">of</span> node<span class="token punctuation">.</span>answerSeries<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> actualAnswer <span class="token operator">=</span> main<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span>answer<span class="token punctuation">.</span>value<span class="token punctuation">,</span> newCtx<span class="token punctuation">)</span>
    <span class="token comment">// Store the actual answer with the question.</span>
    newCtx<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>answer<span class="token punctuation">.</span>$question<span class="token punctuation">,</span> actualAnswer<span class="token punctuation">)</span>
    <span class="token keyword">const</span> expectedAnswer <span class="token operator">=</span> main<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span>answer<span class="token punctuation">.</span>$question<span class="token punctuation">.</span>correctAnswer<span class="token punctuation">,</span> newCtx<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>actualAnswer<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>expectedAnswer<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        nrOfCorrectAnswers<span class="token operator">++</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<p>
	In this example we see that contexts may be nested. A new context is created with a parent context as parameter to its constructor (<code
		>new InterpreterContext(ctx)</code
	>). For every answer of the step the runtime value of the given answer is stored in the context (<code>newCtx.set(...)</code>). Remember
	that in the <code>evalQuestionReference</code> function we found the given answer by looking it up in the context:
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L190-L190</span>

<span class="token keyword">const</span> givenAnswer <span class="token operator">=</span> ctx<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>question<span class="token punctuation">)</span></code>`}</pre>
<p>During the loop we increase the number of correct answers, which is also stored in the context.</p>
<h3 id="the-grade-2">The Grade</h3>
<p>Now we have enough information to determine the grade of the `fromPage“:</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L128-L129</span>


<span class="token comment">// Find the grade for the given answers</span></code>`}</pre>
<p>
	Note that we use the context with the stored value for <code>NR_OF_CORRECT_ANSWERS</code>, because the evaluation of the page may depend
	on this value.
</p>
<h3 id="the-page-to-present-to-the-pupil-3">The Page to Present to the Pupil</h3>
<p>
	In the model the page flow is given in a model unit of type <code>Flow</code>. This information is needed to determine which page should
	according to the flow rules and the current grade be presented to the pupil. The model unit that is needed is not known to a node of type
	<code>Step</code>, so this is another value that needs to be carried in a context. In this piece of code we assume that it is present in
	the context under the name <code>CURRENT_FLOW</code>. In the evaluation function for the overall test this information is stored in the
	context.
</p>
<p>From the flow we obtain the rule for the current page, and from that we get the transition for the given grade.</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L131-L147</span>


<span class="token comment">//  Find rule for current page</span>
<span class="token keyword">const</span> currentFlow <span class="token operator">=</span> ctx<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">"CURRENT_FLOW"</span><span class="token punctuation">)</span> <span class="token keyword">as</span> RtFlow
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isNullOrUndefined</span><span class="token punctuation">(</span>currentFlow<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RtError</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">No flow found for page </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>currentPage<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">const</span> pageRule<span class="token operator">:</span> FlowRule <span class="token operator">=</span> currentFlow<span class="token punctuation">.</span>flow<span class="token punctuation">.</span>rules<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">(</span>rule<span class="token punctuation">)</span> <span class="token operator">=></span> rule<span class="token punctuation">.</span>$page <span class="token operator">===</span> currentPage<span class="token punctuation">)</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isNullOrUndefined</span><span class="token punctuation">(</span>pageRule<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RtError</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">No rules found for page </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>currentPage<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string"> in </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>currentFlow<span class="token punctuation">.</span>flow<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">// Find the page to which the application should switch based on the calculated grade,</span>
<span class="token comment">// and return it as the result of evaluating this step</span>
<span class="token keyword">const</span> transition <span class="token operator">=</span> pageRule<span class="token punctuation">.</span>transitions<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">(</span>trans<span class="token punctuation">)</span> <span class="token operator">=></span> trans<span class="token punctuation">.</span>$condition <span class="token operator">===</span> <span class="token punctuation">(</span>grade <span class="token keyword">as</span> RtGrade<span class="token punctuation">)</span><span class="token punctuation">.</span>grade<span class="token punctuation">)</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isNullOrUndefined</span><span class="token punctuation">(</span>transition<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RtError</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">No transition found for grade </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>grade<span class="token punctuation">.</span>grade<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string"> on page </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>currentPage<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string"> in </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>currentFlow<span class="token punctuation">.</span>flow<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span></code>`}</pre>
<p>Now all that is left to do is to return the found page:</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L150-L150</span>

<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RtPage</span><span class="token punctuation">(</span>transition<span class="token punctuation">.</span>$toPage<span class="token punctuation">)</span></code>`}</pre>

<PrevNextSection {prevLink} {nextLink} />
