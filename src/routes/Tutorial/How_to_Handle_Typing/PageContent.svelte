<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'How to Handle Typing', visible: false, ref: '#how-to-handle-typing-1' },
		{ title: 'What are Types, and why should you care?', visible: false, ref: '#what-are-types-and-why-should-you-care-2' },
		{ title: 'How does a concept become a Type?', visible: false, ref: '#how-does-a-concept-become-a-type-3' }
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

	let prevLink = '/Tutorial/More_Scoping';
	let nextLink = '/Tutorial/Validating_the_model';

	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="how-to-handle-typing-1" bind:intersecting={visible[0]}>How to Handle Typing</SectionComponent>
<p>In this lesson you will learn how to add types to the concepts in your DSL.</p>
<SectionComponent tag="h2" id="what-are-types-and-why-should-you-care-2" bind:intersecting={visible[1]}
	>What are <em>Types</em>, and why should you care?</SectionComponent
>
<p>
	In Freon types are normal concepts, but usually types are not projected. They, normally, do not appear in .edit files. So, why are they
	important? Let’s look at the screenshot below.
</p>
<Figure imageName={'tutorial/Tutorial-lesson8-screenshot1.png'} caption={'Undetected errors in grading expressions'} figureNumber={1} />
<p>
	Do you see the grading expression? There is an equals expression of <code>Number of Correct Answers</code>, something that clearly should
	result in an integer value, and <code>Answer to lollipops2 is correct</code>, which is obviously some boolean value. The answer is
	correct, or not. So we are comparing an integer number with a boolean value. In this case, it might be obvious that there is a mistake,
	but in more complex expressions, you might want to give the user some feedback that this is not the way to go.
</p>
<p>
	So, let’s introduce a Type concept. Let’s keep it simple for now, but keep in mind that we might want to extend our typings. Therefore, we
	make <code>Type</code> an interface, and have one concept that implements it: <code>PrimitiveType</code>, which is a simple enumeration.
	We have also added an <code>ANY</code> instance, which represents an amorphous type that everything can conform to, like
	<code>Object</code>. There is no reason for this yet, we just want to be prepared for extensions. We add the following to our
	<code>edu-main.ast</code> file.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson8-defs/edu-main.ast#L19-L27
</span>
<span class="token keyword">interface</span> <span class="token class-name">Type</span> &#123;
    name: <span class="token builtin">identifier</span>;
&#125;

<span class="token keyword">limited</span> PrimitiveType <span class="token keyword">implements</span> <span class="token class-name">Type</span> &#123;
    Integer;
    Boolean;
    ANY;
&#125;</code>`}</pre>
<SectionComponent tag="h2" id="how-does-a-concept-become-a-type-3" bind:intersecting={visible[2]}
	>How does a concept become a Type?</SectionComponent
>
<p>
	Now we have defined concepts, that will act as types in our DSL, there must be a way to tell Freon which concepts are types. And …, Freon
	needs to know which concepts are <em>typed</em>, that is, which concepts have a type associated with it. Fortunately, this is simple.
	(Sorry, it is a bit lame to keep on saying that things are easy. Can’t help it, they really are.
	<img src="/icons/smile.png" alt="SMILE" width="20" height="20" /> )
</p>
<p>
	Let’s create yet another file, called <code>edu-scoring.type</code>, and add the following lines to it. They mean that all instances of
	the concept <code>Type</code> are types, and that all instances of <code>ScoreExpression</code> have a type.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson8-defs/edu-scoring.type#L1-L5
</span>
typer

<span class="token class-name">istype</span> &#123; Type &#125;

<span class="token class-name">hastype</span> &#123; ScoreExpression &#125;</code>`}</pre>
<p>
	But what about the NrOfCorrectAnswers concept? How do we express which type to associate with instances of this concept? And what about
	the other concepts that inherit from <code>ScoreExpression</code>? Let’s not beat around the bush. This is how.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson8-defs/edu-scoring.type#L7-L24
</span>
<span class="token class-name">QuestionReference</span> &#123;
    <span class="token keyword">infertype</span> PrimitiveType:<span class="token class-name">Boolean</span>;
&#125;
<span class="token class-name">NrOfCorrectAnswers</span> &#123;
    <span class="token keyword">infertype</span> PrimitiveType:<span class="token class-name">Integer</span>;
&#125;
<span class="token class-name">NumberLiteralExpression</span> &#123;
    <span class="token keyword">infertype</span> PrimitiveType:<span class="token class-name">Integer</span>;
&#125;
<span class="token class-name">OrExpression</span> &#123;
    <span class="token keyword">infertype</span> PrimitiveType:<span class="token class-name">Boolean</span>;
&#125;
<span class="token class-name">AndExpression</span> &#123;
    <span class="token keyword">infertype</span> PrimitiveType:<span class="token class-name">Boolean</span>;
&#125;
<span class="token class-name">ComparisonExpression</span> &#123;
    <span class="token keyword">infertype</span> PrimitiveType:<span class="token class-name">Boolean</span>;
&#125;</code>`}</pre>
<p>In the next lesson we will show how to use the typings to validate the grading expressions.</p>

<PrevNextSection {prevLink} {nextLink} />
