<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Validating the model', visible: false, ref: '#validating-the-model-1' },
		{ title: 'Adding type checking', visible: false, ref: '#adding-type-checking-2' },
		{ title: 'The result', visible: false, ref: '#the-result-3' }
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

	let prevLink = '/Tutorial/How_to_Handle_Typing';
	let nextLink = '/Tutorial/Conclusion';

	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="validating-the-model-1" bind:intersecting={visible[0]}>Validating the model</SectionComponent>
<p>
	In the previous lesson we learned how to add typings to the model, but there was not yet a way to show them. In this lesson we will use
	the typings to validate the model, and produce type errors.
</p>
<SectionComponent tag="h2" id="adding-type-checking-2" bind:intersecting={visible[1]}>Adding type checking</SectionComponent>
<p>
	Freon generates a validator for your DSL that has a number of built-in checks. For instance, the validator checks whether all references
	have a correct value. It also checks whether everything that has the type identifier in the metamodel, has a value that is correct
	according to the rules of TypeScript.
</p>
<p>
	However, for the typings there are no built-in checks. We have to define them ourselves. So, what is it that needs to be defined? Let’s
	take the <code>AndExpression</code> concept. It has a left, and a right hand side, and the types on both sides should be Boolean. It will
	be no surprise that we can define the rules for <code>OrExpression</code>s in the same way. Thus, we add another file, called
	<code>edu.valid</code>, and add the following definitions to it.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson9-defs/edu.valid#L1-L11
</span>
validator EduValidator for language Education

<span class="token class-name">AndExpression</span> &#123;
    <span class="token keyword">typecheck</span> <span class="token variable">equalsType</span>( <span class="token variable">self</span>.left, PrimitiveType:<span class="token class-name">Boolean</span> );
    <span class="token keyword">typecheck</span> <span class="token variable">equalsType</span>( <span class="token variable">self</span>.right, PrimitiveType:<span class="token class-name">Boolean</span> );
&#125;

<span class="token class-name">OrExpression</span> &#123;
    <span class="token keyword">typecheck</span> <span class="token variable">equalsType</span>( <span class="token variable">self</span>.left, PrimitiveType:<span class="token class-name">Boolean</span> );
    <span class="token keyword">typecheck</span> <span class="token variable">equalsType</span>( <span class="token variable">self</span>.right, PrimitiveType:<span class="token class-name">Boolean</span> );
&#125;</code>`}</pre>
<p>
	Now what about instances of <code>LessOrEqualsExpression</code>, and the other comparison expressions? They also have a left, and a right
	hand side, but for them, it is important that the types on both sides are the same. We define that as follows.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson9-defs/edu.valid#L13-L31
</span>
<span class="token class-name">LessOrEqualsExpression</span> &#123;
    <span class="token keyword">typecheck</span> <span class="token variable">equalsType</span>( <span class="token variable">self</span>.left, <span class="token variable">self</span>.right );
&#125;

<span class="token class-name">GreaterOrEqualsExpression</span> &#123;
    <span class="token keyword">typecheck</span> <span class="token variable">equalsType</span>( <span class="token variable">self</span>.left, <span class="token variable">self</span>.right );
&#125;

<span class="token class-name">LessThenExpression</span> &#123;
    <span class="token keyword">typecheck</span> <span class="token variable">equalsType</span>( <span class="token variable">self</span>.left, <span class="token variable">self</span>.right );
&#125;

<span class="token class-name">GreaterThenExpression</span> &#123;
    <span class="token keyword">typecheck</span> <span class="token variable">equalsType</span>( <span class="token variable">self</span>.left, <span class="token variable">self</span>.right );
&#125;

<span class="token class-name">EqualsExpression</span> &#123;
    <span class="token keyword">typecheck</span> <span class="token variable">equalsType</span>( <span class="token variable">self</span>.left, <span class="token variable">self</span>.right );
&#125;</code>`}</pre>
<SectionComponent tag="h2" id="the-result-3" bind:intersecting={visible[2]}>The result</SectionComponent>
<p>
	The result should be some error message in the editor. Unfortunately, validation is not done immediately. That is something we like to add
	in a next version of Freon. In the current version you must select <code>Validate</code> from the Edit menu to activate the validator. But
	then it shows you…
</p>
<Figure imageName={'tutorial/Tutorial-lesson9-screenshot1.png'} caption={'Validation error in grading expression'} figureNumber={1} />

<PrevNextSection {prevLink} {nextLink} />
