<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Building an Interpreter', visible: false, ref: '#building-an-interpreter-1' },
		{ title: 'The Computer Aided Learning DSL', visible: false, ref: '#the-computer-aided-learning-dsl-2' },
		{ title: 'Values for the Literals', visible: false, ref: '#values-for-the-literals-3' },
		{ title: 'Values for Binary Expressions', visible: false, ref: '#values-for-binary-expressions-4' }
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

	let prevLink = '/Examples/Overview';
	let nextLink = '/Examples/Building_an_Interpreter/Basic_Evaluation_Functions';

	import Note from '$lib/notes/Note.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="building-an-interpreter-1" bind:intersecting={visible[0]}>Building an Interpreter</SectionComponent>
<p>This example shows how to create an interpreter.</p>
<SectionComponent tag="h2" id="the-computer-aided-learning-dsl-2" bind:intersecting={visible[1]}
	>The Computer Aided Learning DSL</SectionComponent
>
<p>
	The language used in this extended example is the one that is in depth explained in the <a href="/Tutorial/Overview">tutorial</a>. When
	you take another look at the requirements for this DSL, you see that our hypothetical client wants a means to test the page flow. We are
	going to build an interpreter to do just that.
</p>
<p>
	To follow the example use the <code>npm create freon@latest</code> command and choose the language called
	<code>EducationInterpreter</code>. Build the project (<code>npm run build</code>). Start the editor and select the model named
	‘Model4Interpreter’, which is basically the same as the model called ‘Lesson6’ that was used in the tutorial. Open the model unit ‘TestB’
	and run the interpreter from the <code>Edit</code> menu on the complete test (i.e. by selecting the test as current node).
</p>
<Note>
	<svelte:fragment slot="header">The selected node is the one that is interpreted</svelte:fragment>
	<svelte:fragment slot="content">
		When running the interpreter from the <code>Edit</code> menu, the interpreter will try to evaluate the currently selected node. You will
		see a different result in the Interpreter tab for different nodes. Often the interpretation cannot be done completely, because some context
		is needed. It is up to the creator of the interpreter to augment this.
	</svelte:fragment></Note
>
<SectionComponent tag="h2" id="values-for-the-literals-3" bind:intersecting={visible[2]}>Values for the Literals</SectionComponent>
<p>
	As explained in <a href="/Documentation/Interpreter_Framework">Interpreter Framework</a> there is only one file that we need to change:
	<code>/src/freon/interpreter/EducationInterpreter.ts</code>.
</p>
<p>
	Because this is the easiest manner, we are going to build the evaluation from the bottom up. This means that we are first going to
	implement the evaluation functions for the literal expressions, i.e. <code>SimpleNumber</code>, <code>NumberLiteralExpression</code>, and
	<code>Fraction</code>.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L216-L228</span>

<span class="token comment">/////////////////// Literals</span>

override <span class="token function">evalSimpleNumber</span><span class="token punctuation">(</span>node<span class="token operator">:</span> SimpleNumber<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RtNumber</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span>

override <span class="token function">evalNumberLiteralExpression</span><span class="token punctuation">(</span>node<span class="token operator">:</span> NumberLiteralExpression<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RtNumber</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span>

override <span class="token function">evalFraction</span><span class="token punctuation">(</span>node<span class="token operator">:</span> Fraction<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RtFraction</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RtNumber</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>numerator<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">RtNumber</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>denominator<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<p>
	As you see, the first two functions simply return a runtime object of type <code>RtNumber</code> which holds the current
	<code>value</code>
	of the node. The third function returns a runtime object of type <code>RtFraction</code>, which is defined as follows:
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// EducationInterpreter/src/custom/interpreter/runtime/RtFraction.ts</span>

<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> RtBoolean<span class="token punctuation">,</span> RtNumber<span class="token punctuation">,</span> RtObject <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@freon4dsl/core"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">RtFraction</span> <span class="token keyword">extends</span> <span class="token class-name">RtObject</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">readonly</span> _type<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">"RtFraction"</span><span class="token punctuation">;</span>

    nominator<span class="token operator">:</span> RtNumber<span class="token punctuation">;</span>
    denumerator<span class="token operator">:</span> RtNumber<span class="token punctuation">;</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span>num<span class="token operator">:</span> RtNumber<span class="token punctuation">,</span> den<span class="token operator">:</span> RtNumber<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>nominator <span class="token operator">=</span> num<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>denumerator <span class="token operator">=</span> den<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    override <span class="token function">equals</span><span class="token punctuation">(</span>other<span class="token operator">:</span> RtObject<span class="token punctuation">)</span><span class="token operator">:</span> RtBoolean <span class="token punctuation">&#123;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isRtFraction</span><span class="token punctuation">(</span>other<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>nominator<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>other<span class="token punctuation">.</span>nominator<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>denumerator<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>other<span class="token punctuation">.</span>denumerator<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span> <span class="token keyword">else</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">return</span> RtBoolean<span class="token punctuation">.</span><span class="token constant">FALSE</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
    
    override <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>nominator<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"/"</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>denumerator<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">isRtFraction</span><span class="token punctuation">(</span>object<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> object <span class="token keyword">is</span> RtFraction <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> _type <span class="token operator">=</span> <span class="token punctuation">(</span>object <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">?.</span>_type<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token operator">!</span><span class="token operator">!</span>_type <span class="token operator">&amp;&amp;</span> _type <span class="token operator">===</span> <span class="token string">"RtFraction"</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>
</code>`}</pre>
<p>
	What makes things easy is that we do not actually need the result of a fraction, that is, if the fraction is 6/3, we do not need the
	number 2. All we have to do, when building the test for our customer, is to compare one fraction with another. Therefore, the only
	function we need to define for the <code>RtFraction</code> class is the <code>equals</code> function.
</p>
<SectionComponent tag="h2" id="values-for-binary-expressions-4" bind:intersecting={visible[3]}
	>Values for Binary Expressions</SectionComponent
>
<p>
	The next step is to create the evaluation functions for the binary expressions. They are all similar, so here we focus on the evaluation
	of an <code>OrExpression</code>.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L244-L248</span>

override <span class="token function">evalOrExpression</span><span class="token punctuation">(</span>node<span class="token operator">:</span> OrExpression<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> left <span class="token operator">=</span> main<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span> <span class="token keyword">as</span> RtBoolean
    <span class="token keyword">const</span> right <span class="token operator">=</span> main<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span> <span class="token keyword">as</span> RtBoolean
    <span class="token keyword">return</span> left<span class="token punctuation">.</span><span class="token function">or</span><span class="token punctuation">(</span>right<span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<p>
	First we evaluate the left and right hand side of the expression. Note that we use the <code>main</code> interpreter from the file
	<code>MainEducationInterpreter.ts</code>. The <code>main</code> interpreter is able to obtain the runtime value for any node type. Next we
	use the predefined <code>or</code> function of the class
	<code>RtBoolean</code>, which is defined as follows.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">RtBoolean</span> <span class="token keyword">extends</span> <span class="token class-name">RtObject</span> <span class="token punctuation">&#123;</span>
	<span class="token keyword">static</span> <span class="token keyword">readonly</span> <span class="token constant">TRUE</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RtBoolean</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">static</span> <span class="token keyword">readonly</span> <span class="token constant">FALSE</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RtBoolean</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token keyword">static</span> <span class="token keyword">of</span><span class="token punctuation">(</span>bool<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> RtBoolean <span class="token punctuation">&#123;</span>
		<span class="token keyword">return</span> bool <span class="token operator">?</span> RtBoolean<span class="token punctuation">.</span><span class="token constant">TRUE</span> <span class="token operator">:</span> RtBoolean<span class="token punctuation">.</span><span class="token constant">FALSE</span><span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>

	<span class="token function">or</span><span class="token punctuation">(</span>other<span class="token operator">:</span> RtBoolean<span class="token punctuation">)</span><span class="token operator">:</span> RtBoolean <span class="token punctuation">&#123;</span>
		<span class="token keyword">return</span> RtBoolean<span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_value <span class="token operator">||</span> other<span class="token punctuation">.</span><span class="token function">asBoolean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>
    <span class="token operator">...</span>  
<span class="token punctuation">&#125;</span>		</code>`}</pre>
<p>
	The other comparison expressions, like <code>AndExpression</code>, and <code>EqualsExpression</code>, are implemented in a similar
	fashion. For example, this is the implementation of the <code>GreaterOrEqualsExpression</code>:
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L256-L260</span>

override <span class="token function">evalGreaterOrEqualsExpression</span><span class="token punctuation">(</span>node<span class="token operator">:</span> GreaterOrEqualsExpression<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> left <span class="token operator">=</span> main<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span> <span class="token keyword">as</span> RtNumber
    <span class="token keyword">const</span> right <span class="token operator">=</span> main<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span> <span class="token keyword">as</span> RtNumber
    <span class="token keyword">return</span> RtBoolean<span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>left<span class="token punctuation">.</span>value <span class="token operator">>=</span> right<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span></code>`}</pre>

<PrevNextSection {prevLink} {nextLink} />
