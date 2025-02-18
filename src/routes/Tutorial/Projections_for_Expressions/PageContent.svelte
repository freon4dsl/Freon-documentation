<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Projections for Expressions', visible: false, ref: '#projections-for-expressions-1' },
		{ title: 'Cleaning up the GradeScore Concept', visible: false, ref: '#cleaning-up-the-gradescore-concept-2' },
		{ title: 'Reference Shortcut', visible: false, ref: '#reference-shortcut-3' },
		{ title: 'Binary Expressions', visible: false, ref: '#binary-expressions-4' }
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

	let prevLink = '/Tutorial/Expressions_in_Freon';
	let nextLink = '/Tutorial/In_Need_of_Scoping';

	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="projections-for-expressions-1" bind:intersecting={visible[0]}>Projections for Expressions</SectionComponent>
<p>
	In this lesson you will learn how to define projections for expressions such that you get the full benefit of Freon’s built-in expression
	power.
</p>
<SectionComponent tag="h2" id="cleaning-up-the-gradescore-concept-2" bind:intersecting={visible[1]}
	>Cleaning up the <i>GradeScore</i> Concept</SectionComponent
>
<p>
	Remember from the previous lesson that we defined a new concept <code>GradeScore</code>. We will start by making its projection look a bit
	better. We want it to look like the requirements.
</p>
<pre class="language-txt">{@html `<code class="language-txt">GradeC: Answer to questionX is correct AND the Number of Correct Answers = 3

GradeD: Answer to questionY is correct OR Answer to questionZ is correct AND the Number of Correct Answers > 2</code>`}</pre>
<p>Thus, the projection needs to be defined like this.</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson5-defs/edu-scoring.edit#L1-L6
</span>
<span class="token keyword">editor</span> <span class="token keyword">default</span>

<span class="token class-name">GradeScore</span> &#123;<span class="token punctuation">[</span>
    $&#123;<span class="token function"><span class="token variable">self</span>.grade</span>&#125; : $&#123;<span class="token function"><span class="token variable">self</span>.expr</span>&#125;
<span class="token punctuation">]</span>&#125;
</code>`}</pre>
<SectionComponent tag="h2" id="reference-shortcut-3" bind:intersecting={visible[2]}>Reference Shortcut</SectionComponent>
<p>
	The next thing to tackle is the <code>Answer to questionY is correct</code>-part. We represented this in the metamodel by the concept
	<code>QuestionReference</code>, so the projection needs to be like this.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson5-defs/edu-scoring.edit#L11-L14
</span>
<span class="token class-name">QuestionReference</span> &#123;
    <span class="token punctuation">[</span> Answer to $&#123;<span class="token function"><span class="token variable">self</span>.question</span>&#125; is correct <span class="token punctuation">]</span>
    <span class="token keyword">trigger</span> = <span class="token string">"question"</span>
    <span class="token keyword">referenceShortcut</span> = $&#123;<span class="token function"><span class="token variable">self</span>.question</span>&#125;</code>`}</pre>
<p>
	In lesson 2 <a href="/Tutorial/Making_an_Editor">Making an Editor</a> we already encountered the <strong>trigger</strong>, a means to make
	editing easier for your user. Here we do something even more sophisticated. We use a <strong>reference shortcut</strong>.
</p>
<p>
	To understand what it does, you need know that when a question reference is added, not one, but two nodes must be added to the AST. The
	first is an instance of <code>QuestionReference</code>, the second (the child of this instance) is an instance of the core type
	<code>FreNodeReference</code>. Normally, the user must select the type of the node to add it to the tree. So in this case, the user should
	first select <code>QuestionReference</code>, and then <code>FreNodeReference</code>.
</p>
<p>
	The reference shortcut is there to avoid the double selection. The instance of <code>QuestionReference</code> is automatically created
	when a reference is selected that fits as content of the property <code>question</code>.
</p>
<p>
	We also add the next lines. These should not hold any surprises for you. You have already learned a lot from the previous lessons! Note
	that we suffice with a constant text string for the <code>NrOfCorrectAnswers</code> concept.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson5-defs/edu-scoring.edit#L16-L22
</span>

<span class="token class-name">NrOfCorrectAnswers</span> &#123;
    <span class="token punctuation">[</span>Number Of Correct Answers<span class="token punctuation">]</span>
&#125;

<span class="token class-name">NumberLiteralExpression</span> &#123;
    <span class="token punctuation">[</span>$&#123;<span class="token function">value</span>&#125;<span class="token punctuation">]</span></code>`}</pre>
<SectionComponent tag="h1" id="binary-expressions-4" bind:intersecting={visible[3]}>Binary Expressions</SectionComponent>
<p>Creating projections for binary expressions is no rocket science. All you have to do is tell Freon which symbol to use as operand.</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson5-defs/edu-scoring.edit#L24-L53
</span>

<span class="token comment">///////////////////////////////////
</span><span class="token comment">/// Boolean AND and OR
</span><span class="token comment">//////////////////////////////////
</span>
<span class="token class-name">OrExpression</span> &#123;
    <span class="token keyword">symbol</span> = <span class="token string">"or"</span>
&#125;
<span class="token class-name">AndExpression</span> &#123;
    <span class="token keyword">symbol</span> = <span class="token string">"and"</span>
&#125;

<span class="token comment">///////////////////////////////////
</span><span class="token comment">/// Comparisons: &lt;=, >=, >, &lt;, ===
</span><span class="token comment">//////////////////////////////////
</span>
<span class="token class-name">LessOrEqualsExpression</span> &#123;
    <span class="token keyword">symbol</span> = <span class="token string">"&lt;="</span>
&#125;
<span class="token class-name">GreaterOrEqualsExpression</span> &#123;
    <span class="token keyword">symbol</span> = <span class="token string">">="</span>
&#125;
<span class="token class-name">LessThenExpression</span> &#123;
    <span class="token keyword">symbol</span> = <span class="token string">"&lt;"</span>
&#125;
<span class="token class-name">GreaterThenExpression</span> &#123;
    <span class="token keyword">symbol</span> = <span class="token string">">"</span>
&#125;
<span class="token class-name">EqualsExpression</span> &#123;
    <span class="token keyword">symbol</span> = <span class="token string">"=="</span></code>`}</pre>
<p>Upon generation, you will see the following. Expressions that really look like expressions.</p>
<Figure imageName={'tutorial/Tutorial-lesson5-screenshot1.png'} caption={'Editor after projections for expressions'} figureNumber={1} />
<p>
	Note that the binary expressions have brackets around them to indicate the priorities that where defined in the <code
		>edu-scoring.ast</code
	>
	file. If you do not want to see them, go to the <code>View</code> menu and deselect ‘Brackets’.
</p>
<p>
	Go ahead and play around with what we have created so far. Maybe you notice that in the Score for page ‘Theory101’ we can select
	references to questions from the other pages. That is not exactly what we are hoping for. Our teachers should only be able to give grades
	based on the questions of the current page. This means that we are in need of scoping, which is the topic to be addressed in the next
	lesson.
</p>

<PrevNextSection {prevLink} {nextLink} />
