<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'The Freon Interpreter Framework', visible: false, ref: '#the-freon-interpreter-framework-1' },
		{ title: 'Freon’s Runtime Object Library', visible: false, ref: '#freons-runtime-object-library-2' },
		{ title: 'Interpreter Context', visible: false, ref: '#interpreter-context-3' },
		{ title: 'Running the Interpreter', visible: false, ref: '#running-the-interpreter-4' }
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

	let prevLink = '/Documentation/Interpreter_Framework/The_Expressions_DSL';
	let nextLink = '/Documentation/Customizations';

	import Note from '$lib/notes/Note.svelte';
	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="the-freon-interpreter-framework-1" bind:intersecting={visible[0]}
	>The Freon Interpreter Framework</SectionComponent
>
<p>
	In the generation step of Freon, a number of files are generated that together form the basis for an interpreter. As language engineer,
	the only file that you need to change is a file named <code>&lt;&lt;LanguageName&gt;&gt;Interpreter.ts</code>, where
	<code>&lt;&lt;LanguageName&gt;&gt;</code> is, of course, the name of the DSL you are working on. In our <code>Expressions</code> example
	it is called
	<code>ExpressionsInterpreter.ts</code>.
</p>
<p>
	The class that is defined in this file inherits from the class <code>&lt;&lt;LanguageName&gt;&gt;InterpreterBase</code>, which includes
	one evaluation function per concept defined in the language. By overriding the evaluation functions you can define which value is to be
	associated with a certain AST node. The following is an example of an evaluation function in <code>ExpressionsInterpreterBase.ts</code>.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// Expressions/src/freon/interpreter/gen/ExpressionsInterpreterBase.ts#L35-L37</span>

<span class="token function">evalNumberLiteralExpression</span><span class="token punctuation">(</span>node<span class="token operator">:</span> NumberLiteralExpression<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RtError</span><span class="token punctuation">(</span><span class="token string">"evalNumberLiteralExpression is not defined"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<p>
	All evaluation functions are similar. The first parameter is the node for which a value needs to be determined. The second parameter, of
	type <code>InterpreterContext</code>, provides the
	<a href="/Documentation/Interpreter_Framework/Understanding_the_Framework#interpreter-context-3">context</a>
	in which the expression should be evaluated. This context is used to store values of constants, variables, etc. so they are available for
	use in the function. Initially, the base class functions throw an exception when called, as shown above, but when overridden, they should
	result in an object of type <code>RtObject</code> (short for “runtime object”), from
	<a href="/Documentation/Interpreter_Framework/Understanding_the_Framework#freons-runtime-object-library-2"
		>Freon’s Runtime Object Library</a
	>.
</p>
<p>Here is an example of how <code>evalNumberLiteralExpression</code> is overridden:</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// Expressions/src/custom/interpreter/ExpressionsInterpreter.ts#L36-L38</span>

override <span class="token function">evalNumberLiteralExpression</span><span class="token punctuation">(</span>node<span class="token operator">:</span> NumberLiteralExpression<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RtNumber</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<SectionComponent tag="h2" id="freons-runtime-object-library-2" bind:intersecting={visible[1]}
	>Freon’s Runtime Object Library</SectionComponent
>
<p>
	We have chosen to always have an <code>RtObject</code> (or one of its subclasses) as the result of interpreting, to make sure that the
	model (M1) and runtime (M0) levels are always strictly separated. Of course there can be references from <code>RtObjects</code> to instances
	in the model, e.g. for traceability. Freon provides a set of runtime classes that can be used out-of-the-box. These include:
</p>
<ul>
	<li><strong><code>RtNumber</code></strong>: Represents numeric values.</li>
	<li><strong><code>RtString</code></strong>: Represents strings.</li>
	<li><strong><code>RtBoolean</code></strong>: Represents boolean values.</li>
	<li><strong><code>RtArray</code></strong>: Represents arrays.</li>
	<li><strong><code>RtError</code></strong>: Represents errors.</li>
</ul>
<p>Often you create domain-specific runtime classes that inherit from these foundational classes.</p>
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
<SectionComponent tag="h2" id="interpreter-context-3" bind:intersecting={visible[2]}>Interpreter Context</SectionComponent>
<p>Every node in the AST is evaluated within a certain context, represented by the <code>ctx: InterpreterContext</code> parameter.</p>
<p>
	For instance, if in the model we refer to a parameter in the body of a function, we need to know the value of the parameter to be able to
	calculate the value of the body. This is done though the context as follows:
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// Expressions/src/custom/interpreter/ExpressionsInterpreter.ts#L56-L65</span>

override <span class="token function">evalFunctionCallExpression</span><span class="token punctuation">(</span>node<span class="token operator">:</span> FunctionCallExpression<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> calledFunction <span class="token operator">=</span> node<span class="token punctuation">.</span>$calledFunction<span class="token punctuation">;</span>
    <span class="token keyword">const</span> functionContext <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">InterpreterContext</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span><span class="token punctuation">;</span>
    node<span class="token punctuation">.</span>arguments<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>arg<span class="token punctuation">,</span> index<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> argumentValue <span class="token operator">=</span> main<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span>arg<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// Add the parameter to the context with the value of the evaluated argument</span>
        functionContext<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>calledFunction<span class="token punctuation">.</span>parameters<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">,</span> argumentValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> main<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span>calledFunction<span class="token punctuation">,</span> functionContext<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<p>
	The evaluation of the function call expression has two parts. In the first part a new <code>InterpreterContext</code> is created with the original
	context as its parent. This way everything in the original context is available as well.
</p>
<p>
	Then all the arguments of the function call are evaluated and their value is stored in the context with the corresponding parameter as its
	key.
</p>
<p>Now the function is evaluated <code>main.evaluate(calledFunction, functionContext)</code> with the new context as parameter.</p>
<p>
	If we come across a <code>ParameterRef</code> inside the evaluation of the function body, this evaluation can simply lookup the value of the
	parameter:
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// Expressions/src/custom/interpreter/ExpressionsInterpreter.ts#L71-L73</span>

override <span class="token function">evalParameterRef</span><span class="token punctuation">(</span>node<span class="token operator">:</span> ParameterRef<span class="token punctuation">,</span> ctx<span class="token operator">:</span> InterpreterContext<span class="token punctuation">)</span><span class="token operator">:</span> RtObject <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> ctx<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>$parameter<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<p>Note that the value of the parameter lookup will be different for different calls to the function. Which is exactly what we need.</p>
<SectionComponent tag="h2" id="running-the-interpreter-4" bind:intersecting={visible[3]}>Running the Interpreter</SectionComponent>
<Note>
	<svelte:fragment slot="header">The selected node is the one that is interpreted</svelte:fragment>
	<svelte:fragment slot="content">
		When running the interpreter from the <code>Edit</code> menu, the interpreter will try to evaluate the currently selected node. You will
		see a different result in the Interpreter tab for different nodes. Often the interpretation cannot be done completely, because some context
		is needed. It is up to the creator of the interpreter to augment this.
	</svelte:fragment></Note
>
<p>
	The following shows the result of running the interpreter for our Expressions example. The model has one function <code>range</code> and
	two expressions. When running the interpreter from the <code>Edit</code> menu in the Freon editor, a trace of the evaluation is shown in
	the Interpreter tab. In the trace you can find two Function evaluations. At the end of both lines<br />
	the context is shown with different values for the <code>start</code> and <code>end</code> parameters for each function call.
</p>
<Figure imageName={'interpreter/model-output.png'} caption={'Expressions Model in the Editor'} figureNumber={2} />

<PrevNextSection {prevLink} {nextLink} />
