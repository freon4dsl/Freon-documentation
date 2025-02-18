<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Finishing the Test', visible: false, ref: '#finishing-the-test-1' },
		{ title: 'Evaluation of TestFlow', visible: false, ref: '#evaluation-of-testflow-2' },
		{ title: 'Evaluation of Scenario and Test', visible: false, ref: '#evaluation-of-scenario-and-test-3' },
		{ title: 'The Result', visible: false, ref: '#the-result-4' }
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

	let prevLink = '/Examples/Building_an_Interpreter/Using_the_Context';
	let nextLink = '/Examples/Generic_Types';

	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="finishing-the-test-1" bind:intersecting={visible[0]}>Finishing the Test</SectionComponent>
<p>
	All basic building blocks for the interpreter have been implemented. What is left to do is to combine the information and present it to
	the user.
</p>
<SectionComponent tag="h2" id="evaluation-of-testflow-2" bind:intersecting={visible[1]}>Evaluation of TestFlow</SectionComponent>
<p>
	Every TestFlow consists of a series of steps, where the page that is a result of a previous step should be equal to the <code
		>fromPage</code
	>
	of the next. In the following code we loop over the steps, remember the evaluation result from the previous step, and compare that to the
	<code>fromPage</code> of the current step. If there is an error, we create a reasonably readable error message that will be shown to the user.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L84-L107</span>

override <span class="token function">evalTestFlow</span><span class="token punctuation">(</span>node<span class="token operator">:</span> TestFlow<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Evaluating Test Flow "</span> <span class="token operator">+</span> node<span class="token punctuation">.</span><span class="token function">freId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"  steps "</span> <span class="token operator">+</span> node<span class="token punctuation">.</span>steps<span class="token operator">?.</span>length<span class="token punctuation">)</span>
    <span class="token keyword">let</span> previousPage<span class="token operator">:</span> RtPage <span class="token operator">=</span> <span class="token keyword">undefined</span>
    <span class="token keyword">let</span> previousStep<span class="token operator">:</span> Step
    <span class="token keyword">let</span> first<span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">=</span> <span class="token boolean">true</span>      <span class="token comment">// indicates whether there is a calculated value for 'previous'</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> step <span class="token keyword">of</span> node<span class="token punctuation">.</span>steps<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token comment">// Compare the fromPage with the previous stepResult</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>first <span class="token operator">&amp;&amp;</span> previousPage<span class="token punctuation">.</span>page <span class="token operator">!==</span> step<span class="token punctuation">.</span>$fromPage<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token comment">// There was an error. Based on the given answers, we should not be on 'fromPage'.</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RtError</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">Next page of step </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>EducationEnvironment<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>writer<span class="token punctuation">.</span><span class="token function">writeToLines</span><span class="token punctuation">(</span>previousStep<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string"> should be </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>previousPage<span class="token punctuation">.</span>page<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">, not </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>step<span class="token punctuation">.</span>$fromPage<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">.</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">&#125;</span>
        <span class="token keyword">const</span> stepResult <span class="token operator">=</span> main<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span>step<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isRtPage</span><span class="token punctuation">(</span>stepResult<span class="token punctuation">)</span> <span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token comment">// Remember the previous stepResult</span>
            previousPage <span class="token operator">=</span> stepResult
            previousStep <span class="token operator">=</span> step
            first <span class="token operator">=</span> <span class="token boolean">false</span>
        <span class="token punctuation">&#125;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isRtError</span><span class="token punctuation">(</span>stepResult<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">return</span> stepResult
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token keyword">return</span> RtBoolean<span class="token punctuation">.</span><span class="token constant">TRUE</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<SectionComponent tag="h2" id="evaluation-of-scenario-and-test-3" bind:intersecting={visible[2]}
	>Evaluation of Scenario and Test</SectionComponent
>
<p>
	The implementation of the evaluation function for <code>Scenario</code> is reasonably simple. It loops over all test flows, if any of them
	has an error than the result is false.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L70-L82</span>

override <span class="token function">evalScenario</span><span class="token punctuation">(</span>node<span class="token operator">:</span> Scenario<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Evaluating Scenario "</span> <span class="token operator">+</span> node<span class="token punctuation">.</span>description <span class="token operator">+</span> <span class="token string">"  testFlow "</span> <span class="token operator">+</span> node<span class="token punctuation">.</span>testFlow<span class="token operator">?.</span>length<span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> testFlow <span class="token keyword">of</span> node<span class="token punctuation">.</span>testFlow<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> stepFlowResult <span class="token operator">=</span> main<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span>testFlow<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isRtBoolean</span><span class="token punctuation">(</span>stepFlowResult<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> stepFlowResult<span class="token punctuation">.</span><span class="token function">asBoolean</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">return</span> RtBoolean<span class="token punctuation">.</span><span class="token constant">FALSE</span>
        <span class="token punctuation">&#125;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isRtError</span><span class="token punctuation">(</span>stepFlowResult<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">return</span> stepFlowResult
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token keyword">return</span> RtBoolean<span class="token punctuation">.</span><span class="token constant">TRUE</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<p>
	In the final evaluation function, the one for <code>Test</code> we need to include adding the flow to the context. The rest is simple
	admin as in the <code>evalScenario</code> function.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L52-L68</span>

override <span class="token function">evalTest</span><span class="token punctuation">(</span>node<span class="token operator">:</span> Test<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Evaluating Scenario "</span> <span class="token operator">+</span> node<span class="token punctuation">.</span><span class="token function">freId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"  flow "</span> <span class="token operator">+</span> node<span class="token punctuation">.</span>flow<span class="token punctuation">.</span>referred<span class="token operator">?.</span>name<span class="token punctuation">)</span>
    <span class="token comment">// Puts the current flow in the context</span>
    <span class="token keyword">const</span> newCtx <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">InterpreterContext</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
    <span class="token keyword">const</span> flow <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RtFlow</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>flow<span class="token punctuation">.</span>referred<span class="token punctuation">)</span>
    newCtx<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"CURRENT_FLOW"</span><span class="token punctuation">,</span> flow<span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> s <span class="token keyword">of</span> node<span class="token punctuation">.</span>scenarios<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> scenarioResult <span class="token operator">=</span> main<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> newCtx<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isRtBoolean</span><span class="token punctuation">(</span>scenarioResult<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> scenarioResult<span class="token punctuation">.</span><span class="token function">asBoolean</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">return</span> RtBoolean<span class="token punctuation">.</span><span class="token constant">FALSE</span>
        <span class="token punctuation">&#125;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isRtError</span><span class="token punctuation">(</span>scenarioResult<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">return</span> scenarioResult
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token keyword">return</span> RtBoolean<span class="token punctuation">.</span><span class="token constant">TRUE</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<SectionComponent tag="h2" id="the-result-4" bind:intersecting={visible[3]}>The Result</SectionComponent>
<p>
	Running the interpreter on the complete <code>TestB</code> model unit from our model (named “Model4Interpreter”), results in this error.
</p>
<Figure
	imageName={'examples/Interpreter/Interpreter-result.png'}
	caption={'The result of the interpreter showing an error'}
	figureNumber={1}
/>

<PrevNextSection {prevLink} {nextLink} />
