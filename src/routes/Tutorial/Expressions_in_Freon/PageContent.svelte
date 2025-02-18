<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Expressions in Freon', visible: false, ref: '#expressions-in-freon-1' },
		{ title: 'The Requirements', visible: false, ref: '#the-requirements-2' },
		{ title: 'Binary Expressions', visible: false, ref: '#binary-expressions-3' },
		{ title: 'The Comparison Expressions', visible: false, ref: '#the-comparison-expressions-4' }
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

	let prevLink = '/Tutorial/More_Fun_with_Projections';
	let nextLink = '/Tutorial/Projections_for_Expressions';

	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="expressions-in-freon-1" bind:intersecting={visible[0]}>Expressions in Freon</SectionComponent>
<p>
	Many DSLs have some form of expressions, like <code>24 + 56</code>. Even though they may appear simple, if you have ever tried to build a
	language, you will know that expressions are tricky bastards (excuse the French). In Freon, therefore, they take a very special place.
</p>
<p>
	In this lesson we introduce expressions by adding grading rules to each <code>Topic</code>. Therefore, we need to change the metamodel.
	Open the file <code>edu-topics.ast</code> and add one line to the <code>Page</code> concept.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson4-defs/edu-topics.ast#L10-L14
</span>
<span class="token keyword">abstract</span> <span class="token keyword">concept</span> <span class="token class-name">Page</span> &#123;
    name: <span class="token builtin">identifier</span>;
    questions: <span class="token class-name">Question</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    grading: <span class="token class-name">GradeScore</span><span class="token punctuation">[</span><span class="token punctuation">]</span>; <span class="token comment">/* concept from 'edu-scoring.ast' */</span>
&#125;</code>`}</pre>
<p>
	Of course, we are going to define the <code>GradeScore</code> concept, but for this we create a new file called
	<code>edu-scoring.ast</code>. Add the following lines to it.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson4-defs/edu-scoring.ast#L1-L6
</span>
language Education

<span class="token keyword">concept</span> <span class="token class-name">GradeScore</span> &#123;
    grade: <span class="token class-name">Grade</span>;
    expr: <span class="token class-name">ScoreExpression</span>;
&#125;</code>`}</pre>
<p>
	Yes, the concept <code>ScoreExpression</code> represents our expression. To get an idea of how the concept should be defined, let’s get some
	idea what the user wants to express.
</p>
<SectionComponent tag="h2" id="the-requirements-2" bind:intersecting={visible[1]}>The Requirements</SectionComponent>
<p>
	Grading is all about the answers given to the questions on the page. For instance, if all answers are correct, the score should be top
	grade. But, if all answers are incorrect, the score should be the lowest grade. Speaking to our hypothetical client (<img
		src="/icons/smile.png"
		alt="Smiley"
		width="20"
		height="20"
	/>), we learn that the teachers also want to give a certain grade when the answers to certain questions are correct, where the answers to
	other questions are less important. So, the teachers may want to write things like:
</p>
<pre class="language-txt">{@html `<code class="language-txt">GradeC: Answer to questionX is correct AND the Number of Correct Answers = 3

GradeD: Answer to questionY is correct OR Answer to questionZ is correct AND the Number of Correct Answers > 2</code>`}</pre>
<p>So, what do we have here.</p>
<ol>
	<li>There is a number literal for the <strong>3</strong> and <strong>2</strong>.</li>
	<li>We need something that represent <strong>Number of Correct Answers</strong>.</li>
	<li>To deal with <strong>questionX</strong> and <strong>questionY</strong> we need a reference to a question on the page.</li>
	<li>We need binary expressions for the boolean <strong>AND</strong> and <strong>OR</strong>.</li>
	<li>There is also a need for an equals expression to be able to deal with the <strong>=-sign</strong>.</li>
	<li>The <strong>>-sign</strong> also introduces a new type of expression.</li>
</ol>
<p>This is how we define the first three concepts of the above list.</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson4-defs/edu-scoring.ast#L8-L28
</span>
<span class="token comment">///////////////////////////////////
</span><span class="token comment">/// Expressions
</span><span class="token comment">//////////////////////////////////
</span><span class="token keyword">abstract</span> <span class="token keyword">expression</span> <span class="token class-name">ScoreExpression</span> &#123;
&#125;

/* The value of a question <span class="token keyword">reference</span> is the answer given to the
given question */
<span class="token keyword">expression</span> QuestionReference <span class="token keyword">base</span> <span class="token class-name">ScoreExpression</span> &#123;
    <span class="token keyword">reference</span> question: <span class="token class-name">Question</span>;
&#125;

/* The value of NrOfCorrectAnswers is the total <span class="token builtin">number</span> of correct
answers on a page. */
<span class="token keyword">expression</span> NrOfCorrectAnswers <span class="token keyword">base</span> <span class="token class-name">ScoreExpression</span> &#123;
&#125;

<span class="token comment">/* The value of a NumberLiteralExpression is simply a number, like '24' */</span>
<span class="token keyword">expression</span> NumberLiteralExpression <span class="token keyword">base</span> <span class="token class-name">ScoreExpression</span> &#123;
    value: <span class="token builtin">number</span>;
&#125;</code>`}</pre>
<p>
	Instead of the keyword <code>concept</code>, we use the keyword <code>expression</code> to let Freon know that instances of these concepts
	should be treated differently. We make <code>ScoreExpression</code> the base parent of all our expressions, so we can use it where ever we
	need an expression. For the rest, the definitions look like ordinary concepts.
</p>
<SectionComponent tag="h2" id="binary-expressions-3" bind:intersecting={visible[2]}>Binary Expressions</SectionComponent>
<p>
	Freon adds loads of extra stuff to handle binary expressions. All we have to do is tell Freon that the concept is a binary expression
	concept. Look at how we define the two binary expressions for the boolean <strong>AND</strong> and <strong>OR</strong>.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson4-defs/edu-scoring.ast#L30-L44
</span>
<span class="token comment">///////////////////////////////////
</span><span class="token comment">/// Boolean AND and OR
</span><span class="token comment">//////////////////////////////////
</span><span class="token keyword">abstract</span> <span class="token keyword">binary</span> <span class="token keyword">expression</span> BinaryExpression <span class="token keyword">base</span> <span class="token class-name">ScoreExpression</span> &#123;
    left: <span class="token class-name">ScoreExpression</span>;
    right: <span class="token class-name">ScoreExpression</span>;
&#125;

<span class="token keyword">binary</span> <span class="token keyword">expression</span> AndExpression <span class="token keyword">base</span> <span class="token class-name">BinaryExpression</span> &#123;
    <span class="token keyword">priority</span> = <span class="token number">1</span>;
&#125;

<span class="token keyword">binary</span> <span class="token keyword">expression</span> OrExpression <span class="token keyword">base</span> <span class="token class-name">BinaryExpression</span> &#123;
    <span class="token keyword">priority</span> = <span class="token number">1</span>;
&#125;</code>`}</pre>
<p>
	Here it comes in handy that there is a single base parent for expressions, the <code>ScoreExpression</code>. We can have any instance of a
	<code>ScoreExpression</code> at the left hand side of any <code>BinaryExpression</code>, as well as to the right hand side.
</p>
<p>
	Notice that the <code>AndExpression</code> and <code>OrExpression</code> have no properties of their own. This is usually the case. It
	often makes no sense to add properties, but Freon does not forbid it. However, we do add a special feature, namely the
	<code>priority</code>. To be able to balance the abstract syntax tree for an expression you need to know which expression has priority
	over the other.
</p>
<p>
	For instance, in mathematics multiplication has priority over plus. The expression
	<code>8 * 7 + 1</code> should be read as <code>(8 * 7) + 1</code>, and not as <code>8 * (7 + 1)</code>.
</p>
<p>In Freon, we indicate this priority by a number. A high number means high priority, a low number means low priority.</p>
<SectionComponent tag="h2" id="the-comparison-expressions-4" bind:intersecting={visible[3]}>The Comparison Expressions</SectionComponent>
<p>
	What is left of the requirements for our expressions are the <code>=</code> and <code>&gt;</code> signs. But let’s not be stingy, and
	create expression concepts for <code>&lt;</code>, <code>&gt;=</code>, and <code>&lt;=</code> as well.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson4-defs/edu-scoring.ast#L46-L70
</span>
<span class="token comment">///////////////////////////////////
</span><span class="token comment">/// Comparisons: &lt;=, >=, >, &lt;, ===
</span><span class="token comment">//////////////////////////////////
</span><span class="token keyword">abstract</span> <span class="token keyword">binary</span> <span class="token keyword">expression</span> ComparisonExpression <span class="token keyword">base</span> <span class="token class-name">BinaryExpression</span> &#123;
&#125;

<span class="token keyword">binary</span> <span class="token keyword">expression</span> LessOrEqualsExpression <span class="token keyword">base</span> <span class="token class-name">ComparisonExpression</span> &#123;
    <span class="token keyword">priority</span> = <span class="token number">2</span>;
&#125;

<span class="token keyword">binary</span> <span class="token keyword">expression</span> GreaterOrEqualsExpression <span class="token keyword">base</span> <span class="token class-name">ComparisonExpression</span> &#123;
    <span class="token keyword">priority</span> = <span class="token number">2</span>;
&#125;

<span class="token keyword">binary</span> <span class="token keyword">expression</span> LessThenExpression <span class="token keyword">base</span> <span class="token class-name">ComparisonExpression</span> &#123;
    <span class="token keyword">priority</span> = <span class="token number">2</span>;
&#125;

<span class="token keyword">binary</span> <span class="token keyword">expression</span> GreaterThenExpression <span class="token keyword">base</span> <span class="token class-name">ComparisonExpression</span> &#123;
    <span class="token keyword">priority</span> = <span class="token number">2</span>;
&#125;

<span class="token keyword">binary</span> <span class="token keyword">expression</span> EqualsExpression <span class="token keyword">base</span> <span class="token class-name">ComparisonExpression</span> &#123;
    <span class="token keyword">priority</span> = <span class="token number">2</span>;
&#125;</code>`}</pre>
<p>
	Now, let Freon generate the editor again, and open the model <code>lesson4</code>. Note that we are opening another model, because we have
	added concept to the metamodel. The new model contains instances of the new concepts.
</p>
<p>
	<code>%@$#&*!!!</code>, so much work, and nothing has changed! Yep, as so often occurs, we forgot one tiny thing: the editor definition
	for <code>Page</code> (or any of its children) does not mention the new <code>grading</code> property, thus it will not be shown. Let’s
	address that right now. We’ll change the <code>Page</code> projection in <code>page-footing.edit</code> to the following.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson4-defs/page-footing.edit#L5-L11
</span>
<span class="token class-name">Page</span> &#123;<span class="token punctuation">[</span>
    Questions:
        $&#123;<span class="token function"><span class="token variable">self</span>.questions <span class="token keyword">vertical</span></span>&#125;

    Score
        $&#123;<span class="token function"><span class="token variable">self</span>.grading <span class="token keyword">vertical</span></span>&#125;
<span class="token punctuation">]</span>&#125;</code>`}</pre>
<p>
	Generate again, and this is (part of) what you will see. Not especially pretty, but we have our expressions. In the next lesson you will
	learn how to project expressions.
</p>
<Figure imageName={'tutorial/Tutorial-lesson4-screenshot1.png'} caption={'Editor after adding grading to the metamodel'} figureNumber={1} />

<PrevNextSection {prevLink} {nextLink} />
