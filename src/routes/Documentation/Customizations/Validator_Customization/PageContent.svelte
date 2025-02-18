<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Customization of the Validator', visible: false, ref: '#customization-of-the-validator-1' },
		{ title: 'The Checker Interface', visible: false, ref: '#the-checker-interface-2' },
		{ title: 'The Validation Class', visible: false, ref: '#the-validation-class-3' }
	];
	let visible: boolean[] = [];
	$: $mySections[0].visible = visible[0];
	$: $mySections[1].visible = visible[1];
	$: $mySections[2].visible = visible[2];
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

	let prevLink = '/Documentation/Customizations/Typer_Customization';
	let nextLink = '/Documentation/Customizations/Other_Customizations';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="customization-of-the-validator-1" bind:intersecting={visible[0]}
	>Customization of the Validator</SectionComponent
>
<p>
	The validator can be adjusted by adding a single Typescript class. This class should implement the generated <a
		href="/Documentation/Under_the_Hood/FreTool_Interfaces#frevalidator-4">checker interface</a
	> of the validator, adding checks per node of the AST that is visited.
</p>
<SectionComponent tag="h2" id="the-checker-interface-2" bind:intersecting={visible[1]}>The Checker Interface</SectionComponent>
<p>
	For each language a checker interface is generated. This interface is an extension of the worker part of the visitor pattern, adding an
	error list.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CustomizationsProject/src/freon/validator/gen/EntityModelValidator.ts#L15-L17</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">EntityModelCheckerInterface</span> <span class="token keyword">extends</span> <span class="token class-name">EntityModelWorker</span> <span class="token punctuation">&#123;</span>
    errorList<span class="token operator">:</span> FreError<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<p>The worker defines two methods for each concept in the language, as shown in the next example.</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CustomizationsProject/src/freon/utils/gen/EntityModelWorker.ts#L56-L57</span>

<span class="token function">execBeforeEntity</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> Entity<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token function">execAfterEntity</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> Entity<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span></code>`}</pre>
<SectionComponent tag="h2" id="the-validation-class-3" bind:intersecting={visible[2]}>The Validation Class</SectionComponent>
<p>
	As a convenience, Freon generates a file <code>~/freon/validator/CustomYourLanguageNameValidator.ts</code>, which will not be overwritten
	upon regeneration. This validator should implement the checker interface.
</p>
<p>
	You can give a custom implementation for any of the methods of the default worker. This method will override the (empty) default
	implementation. Any validation errors should be pushed onto the <code>errorList</code> attribute. Note that each error must implement the
	<a href="/Documentation/Under_the_Hood/FreTool_Interfaces#frevalidator-4">FreError</a> interface.
</p>
<p>
	The result of the above could look something like the following. In this example only nodes of type <code>EntityFunction</code> are
	checked. If the name of the node equals <code>determine</code> than an error is pushed on the <code>errorList</code>. If you want the
	walker to stop when an erroneous node is found you should return <code>true</code>, else return <code>false</code>.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// CustomizationsProject/src/custom/validator/CustomEntityModelValidator.ts</span>

<span class="token comment">// Generated by the Freon Language Generator.</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> FreError<span class="token punctuation">,</span> FreErrorSeverity <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@freon4dsl/core"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> EntityModelDefaultWorker <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"../utils/gen/EntityModelDefaultWorker.js"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> EntityModelCheckerInterface <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"./gen/EntityModelValidator.js"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span>EntityFunction<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"../language/gen/index.js"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CustomEntityModelValidator</span> <span class="token keyword">extends</span> <span class="token class-name">EntityModelDefaultWorker</span> <span class="token keyword">implements</span> <span class="token class-name">EntityModelCheckerInterface</span> <span class="token punctuation">&#123;</span>
    errorList<span class="token operator">:</span> FreError<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token comment">/**
     * Example of a custom validation. Every EntityFunction with name 'determine' is considered incorrect.
     * @param modelelement
     */</span>
    <span class="token keyword">public</span> <span class="token function">execBeforeEntityFunction</span><span class="token punctuation">(</span>modelelement<span class="token operator">:</span> EntityFunction<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>modelelement<span class="token punctuation">.</span>name <span class="token operator">==</span> <span class="token string">"determine"</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>errorList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>
                <span class="token keyword">new</span> <span class="token class-name">FreError</span><span class="token punctuation">(</span>
                    <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">"determine" is a terrible name for a Function</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">,</span>
                    modelelement<span class="token punctuation">,</span>
                    modelelement<span class="token punctuation">.</span>name<span class="token punctuation">,</span>
                    FreErrorSeverity<span class="token punctuation">.</span>Error
                <span class="token punctuation">)</span>
            <span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>
</code>`}</pre>

<PrevNextSection {prevLink} {nextLink} />
