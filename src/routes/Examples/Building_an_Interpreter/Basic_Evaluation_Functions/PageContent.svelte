<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'More Basic Evaluation Functions', visible: false, ref: '#more-basic-evaluation-functions-1' },
		{ title: 'The AST of the Test Model Unit', visible: false, ref: '#the-ast-of-the-test-model-unit-2' },
		{ title: 'Evaluations of LastStep and Answer', visible: false, ref: '#evaluations-of-laststep-and-answer-3' },
		{ title: 'Evaluation of Page', visible: false, ref: '#evaluation-of-page-4' },
		{ title: 'Evaluation of ScoreExpressions', visible: false, ref: '#evaluation-of-scoreexpressions-5' },
		{ title: 'More About Evaluation of Pages', visible: false, ref: '#more-about-evaluation-of-pages-6' }
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

	let prevLink = '/Examples/Building_an_Interpreter';
	let nextLink = '/Examples/Building_an_Interpreter/Using_the_Context';

	import Note from '$lib/notes/Note.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="more-basic-evaluation-functions-1" bind:intersecting={visible[0]}
	>More Basic Evaluation Functions</SectionComponent
>
<p>With the simplest evaluation functions done, we can turn to the actual test that needs to be done.</p>
<SectionComponent tag="h2" id="the-ast-of-the-test-model-unit-2" bind:intersecting={visible[1]}
	>The AST of the Test Model Unit</SectionComponent
>
<p>Let’s refresh your memory and have a look at the AST of the <code>Test</code> model unit.</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson9-defs/edu-tests.ast
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
    steps: <span class="token class-name">Step</span><span class="token punctuation">[</span><span class="token punctuation">]</span>; <span class="token comment">/* Note that the order is of importance */</span>
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
<SectionComponent tag="h2" id="evaluations-of-laststep-and-answer-3" bind:intersecting={visible[2]}
	>Evaluations of <code>LastStep</code> and <code>Answer</code></SectionComponent
>
<p>
	The simplest concept in the model unit is <code>LastStep</code>. The runtime value of each of its instances should be <code>true</code>,
	because a last step does not have a next page and therefore does not put any restrictions on the correctness of the step. The evaluation
	function is implemented as follows:
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L212-L214</span>

override <span class="token function">evalLastStep</span><span class="token punctuation">(</span>node<span class="token operator">:</span> LastStep<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> RtBoolean<span class="token punctuation">.</span><span class="token constant">TRUE</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<p>
	Next, we are going to determine the runtime value for an <code>Answer</code>. Here, we need to compare the answer that is given with the
	one that is defined as being the correct answer to the question. The first is found by evaluating the <code>value</code> of the answer,
	which is either a simple number or a fraction. For both the evaluation functions are already defined. The second is found by evaluating
	the correct answer from the question, but because <code>question</code> is defined in the .ast file as a reference, we need to use
	<code>.referred</code>
	to obtain its value and check whether the reference was found.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L202-L210</span>

override <span class="token function">evalAnswer</span><span class="token punctuation">(</span>node<span class="token operator">:</span> Answer<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">evalAnswer.node </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>node<span class="token operator">?.</span>$question<span class="token punctuation">.</span>content<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> actualAnswer <span class="token operator">=</span> main<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>value<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>question<span class="token punctuation">.</span>referred <span class="token operator">!==</span> <span class="token keyword">undefined</span> <span class="token operator">&amp;&amp;</span> node<span class="token punctuation">.</span>question<span class="token punctuation">.</span>referred <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> expectedAnswer <span class="token operator">=</span> main<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>question<span class="token punctuation">.</span>referred<span class="token punctuation">.</span>correctAnswer<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span>
        <span class="token keyword">return</span> actualAnswer<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>expectedAnswer<span class="token punctuation">)</span>
    <span class="token punctuation">&#125;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RtError</span><span class="token punctuation">(</span><span class="token string">"evalAnswer: question not found"</span><span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<SectionComponent tag="h2" id="evaluation-of-page-4" bind:intersecting={visible[3]}>Evaluation of Page</SectionComponent>
<p>
	The next concept up in the AST is <code>Step</code>, but we haven’t determined yet how to evaluate one of its parts:
	<code>reference fromPage: Page</code>. So, we first have to define the evaluation function for pages. However, the concept
	<code>Page</code> is an abstract concept.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson9-defs/edu-topics.ast#L10-L14
</span>
<span class="token keyword">abstract</span> <span class="token keyword">concept</span> <span class="token class-name">Page</span> &#123;
    name: <span class="token builtin">identifier</span>;
    questions: <span class="token class-name">Question</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    grading: <span class="token class-name">GradeScore</span><span class="token punctuation">[</span><span class="token punctuation">]</span>; <span class="token comment">/* concept from 'edu-scoring.ast' */</span>
&#125;</code>`}</pre>
<p>
	For abstract concepts no evaluation functions are defined. But there are evaluation functions for the concrete children of <code
		>Page</code
	>: <code>Theory</code>, <code>Video</code>, <code>WorkSheet</code>, <code>ExamplePage</code>, and <code>InDepthMaterial</code>, so these
	are the ones that we will implement.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L153-L182</span>

<span class="token keyword">static</span> <span class="token function">evalPage</span><span class="token punctuation">(</span>node<span class="token operator">:</span> Page<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token comment">// Find grade for given answers</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">Evaluating Page </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>node<span class="token operator">?.</span>name<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> score <span class="token keyword">of</span> node<span class="token punctuation">.</span>grading<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> scoreValue <span class="token operator">=</span> main<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span>score<span class="token punctuation">.</span>expr<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isRtBoolean</span><span class="token punctuation">(</span>scoreValue<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>scoreValue<span class="token punctuation">.</span><span class="token function">asBoolean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">Evaluating Page returning </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>score<span class="token punctuation">.</span>$grade<span class="token operator">?.</span>name<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span>
                <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RtGrade</span><span class="token punctuation">(</span>score<span class="token punctuation">.</span>$grade<span class="token punctuation">)</span>
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RtError</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">No grade found for current answers in page </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>node<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span>

override <span class="token function">evalTheory</span><span class="token punctuation">(</span>node<span class="token operator">:</span> Theory<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> EducationInterpreter<span class="token punctuation">.</span><span class="token function">evalPage</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span>
override <span class="token function">evalVideo</span><span class="token punctuation">(</span>node<span class="token operator">:</span> Video<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> EducationInterpreter<span class="token punctuation">.</span><span class="token function">evalPage</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span>
override <span class="token function">evalWorkSheet</span><span class="token punctuation">(</span>node<span class="token operator">:</span> WorkSheet<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> EducationInterpreter<span class="token punctuation">.</span><span class="token function">evalPage</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span>
override <span class="token function">evalInDepthMaterial</span><span class="token punctuation">(</span>node<span class="token operator">:</span> InDepthMaterial<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> EducationInterpreter<span class="token punctuation">.</span><span class="token function">evalPage</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span>
override <span class="token function">evalExamplePage</span><span class="token punctuation">(</span>node<span class="token operator">:</span> ExamplePage<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> EducationInterpreter<span class="token punctuation">.</span><span class="token function">evalPage</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<SectionComponent tag="h2" id="evaluation-of-scoreexpressions-5" bind:intersecting={visible[4]}
	>Evaluation of ScoreExpressions</SectionComponent
>
<p>
	When you look at the function <code>evalPage</code> you can see that we are missing yet another evaluation function, the one that
	calculates the value of <code>score.expr</code>. Remember what it looks like in the model:
</p>
<pre class="language-txt">{@html `<code class="language-txt">GradeC: Answer to questionX is correct AND the Number of Correct Answers = 3

GradeD: Answer to questionY is correct OR Answer to questionZ is correct AND the Number of Correct Answers > 2</code>`}</pre>
<p>
	The type of <code>score.expr</code> is <code>ScoreExpression</code>, but again this is an abstract concept. Its children are
	<code>QuestionReference</code>, <code>NrOfCorrectAnswers</code>, a bunch of binary expressions and <code>NumberLiteralExpression</code>,
	for which we have already defined evaluation functions. So what is left is to implement evaluations for <code>QuestionReference</code> and
	<code>NrOfCorrectAnswers</code>.
</p>
<p>
	The value of the latter needs to be calculated for the complete page, thus we will search for it in the context. Note, that we have to
	remember to put this value in the context somewhere higher up the chain.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L198-L200</span>

override <span class="token function">evalNrOfCorrectAnswers</span><span class="token punctuation">(</span>node<span class="token operator">:</span> NrOfCorrectAnswers<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> ctx<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">"NR_OF_CORRECT_ANSWERS"</span><span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<p>
	The implementation of the evaluation of a <code>QuestionReference</code> is a bit more complicated. Remember what it looks like in the model:
</p>
<pre class="language-txt">{@html `<code class="language-txt">Answer to questionX is correct</code>`}</pre>
<p>
	The evaluation should result in a boolean value based on the comparison between the correct answer to the question, and the answer given
	by the pupil. The correct answer can be found in the model. We just need to evaluate <code>question.correctAnswer</code>. The answer given
	by the pupil is present in the test, and should be found in the context.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L184-L196</span>

override <span class="token function">evalQuestionReference</span><span class="token punctuation">(</span>node<span class="token operator">:</span> QuestionReference<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> question <span class="token operator">=</span> node<span class="token operator">?.</span>question<span class="token operator">?.</span>referred
    <span class="token keyword">if</span> <span class="token punctuation">(</span>question <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">||</span> question <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RtError</span><span class="token punctuation">(</span><span class="token string">"evalQuestionReference: Question is not found"</span><span class="token punctuation">)</span>
    <span class="token punctuation">&#125;</span>
    <span class="token keyword">const</span> expected <span class="token operator">=</span> main<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span>question<span class="token punctuation">.</span>correctAnswer<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span>
    <span class="token keyword">const</span> givenAnswer <span class="token operator">=</span> ctx<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>question<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>givenAnswer <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">||</span> givenAnswer <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RtError</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">evalQuestionReference: Question '</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>question<span class="token punctuation">.</span>content<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">' does not have a result value</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">&#125;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">evalQuestionReference for '</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>question<span class="token punctuation">.</span>content<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">', given answer is '</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>givenAnswer<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">', expected '</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>expected<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">'</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> givenAnswer<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>expected<span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<SectionComponent tag="h2" id="more-about-evaluation-of-pages-6" bind:intersecting={visible[5]}
	>More About Evaluation of Pages</SectionComponent
>
<p>
	Now we can return to the <code>evalPage</code> function. We know how to determine the runtime value of a single ScoreExpression, but how
	do we determine the runtime value of the complete page? We have chosen to go over all grades and see for which the score expression
	returns true. The first one that we find will be the page’s grade. But wait, there is no runtime object that represents a grade. We could
	return an M1 object (of type <code>Grade</code>), but we want to make a clear distinction between the M1 and M0 levels. So we make a new
	runtime class: <code>RtGrade</code>.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L153-L166</span>

<span class="token keyword">static</span> <span class="token function">evalPage</span><span class="token punctuation">(</span>node<span class="token operator">:</span> Page<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token comment">// Find grade for given answers</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">Evaluating Page </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>node<span class="token operator">?.</span>name<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> score <span class="token keyword">of</span> node<span class="token punctuation">.</span>grading<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> scoreValue <span class="token operator">=</span> main<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span>score<span class="token punctuation">.</span>expr<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isRtBoolean</span><span class="token punctuation">(</span>scoreValue<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>scoreValue<span class="token punctuation">.</span><span class="token function">asBoolean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">Evaluating Page returning </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>score<span class="token punctuation">.</span>$grade<span class="token operator">?.</span>name<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span>
                <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RtGrade</span><span class="token punctuation">(</span>score<span class="token punctuation">.</span>$grade<span class="token punctuation">)</span>
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RtError</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">No grade found for current answers in page </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>node<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<Note>
	<svelte:fragment slot="header">Meta Levels</svelte:fragment>
	<svelte:fragment slot="content">
		In Domain Specific language we distinguish the following levels:
		<ol>
			<li>
				The language definition, defining which concepts are available. Often called the M2 level. In Freon this is represented by the
				language definition in the .ast files. In Java this would be the Java Language Definition.
			</li>
			<li>
				The model, which contains instances of the language concepts, called the M1 level. In Freon this is what you edit in a Freon
				application. In Java this would be a Java program consisting of Java classes.
			</li>
			<li>
				The runtime level, values resulting from executing or interpreting the model, called the M0 level. In Freon this is the result of
				the interpreter running, or it would be the result of executing code generated from the model (M1) level. For Java this is the
				execution of a Java program.
			</li>
		</ol>
	</svelte:fragment></Note
>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// EducationInterpreter/src/custom/interpreter/runtime/RtGrade.ts</span>

<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> RtBoolean<span class="token punctuation">,</span> RtObject <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@freon4dsl/core"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Grade <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"../../language/gen/index.js"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">RtGrade</span> <span class="token keyword">extends</span> <span class="token class-name">RtObject</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">readonly</span> _type<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">"RtGrade"</span><span class="token punctuation">;</span>
    grade<span class="token operator">:</span> Grade<span class="token punctuation">;</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span>grade<span class="token operator">:</span> Grade<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>grade <span class="token operator">=</span> grade<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token function">equals</span><span class="token punctuation">(</span>other<span class="token operator">:</span> RtObject<span class="token punctuation">)</span><span class="token operator">:</span> RtBoolean <span class="token punctuation">&#123;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isRtGrade</span><span class="token punctuation">(</span>other<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">return</span> RtBoolean<span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>grade <span class="token operator">===</span> other<span class="token punctuation">.</span>grade<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span> <span class="token keyword">else</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">return</span> RtBoolean<span class="token punctuation">.</span><span class="token constant">FALSE</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>

    override <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">Grade: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span><span class="token keyword">this</span><span class="token punctuation">.</span>grade<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">isRtGrade</span><span class="token punctuation">(</span>object<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> object <span class="token keyword">is</span> RtGrade <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> _type <span class="token operator">=</span> <span class="token punctuation">(</span>object <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">?.</span>_type<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token operator">!</span><span class="token operator">!</span>_type <span class="token operator">&amp;&amp;</span> _type <span class="token operator">===</span> <span class="token string">"RtGrade"</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>
</code>`}</pre>

<PrevNextSection {prevLink} {nextLink} />
