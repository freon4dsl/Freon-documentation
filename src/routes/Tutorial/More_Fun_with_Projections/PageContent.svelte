<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'More Fun with Projections', visible: false, ref: '#more-fun-with-projections-1' },
		{ title: 'A projection for the Flow model unit', visible: false, ref: '#a-projection-for-the-flow-model-unit-2' },
		{ title: 'More than One Editor', visible: false, ref: '#more-than-one-editor-3' },
		{ title: 'Creating Tables', visible: false, ref: '#creating-tables-4' },
		{ title: 'Using a Specific Editor', visible: false, ref: '#using-a-specific-editor-5' }
	];
	let visible: boolean[] = [];
	$: $mySections[0].visible = visible[0];
	$: $mySections[1].visible = visible[1];
	$: $mySections[2].visible = visible[2];
	$: $mySections[3].visible = visible[3];
	$: $mySections[4].visible = visible[4];
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

	let prevLink = '/Tutorial/Making_an_Editor';
	let nextLink = '/Tutorial/Expressions_in_Freon';

	import Note from '$lib/notes/Note.svelte';
	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="more-fun-with-projections-1" bind:intersecting={visible[0]}>More Fun with Projections</SectionComponent>
<p>
	Freon projections are very flexible. In this lesson we are going to dive into a number of ways to make your editor look great. We are
	going to create tables!
</p>
<SectionComponent tag="h2" id="a-projection-for-the-flow-model-unit-2" bind:intersecting={visible[1]}
	>A projection for the <em>Flow</em> model unit</SectionComponent
>
<p>
	We almost forgot to make an editor definition for the <em>Flow</em> model unit. We are going to create a file called
	<code>edu-flow-edit</code>, and add the following lines to it. You should be familiar with everything in these projections by now.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson3-defs/edu-flow.edit
</span>
<span class="token comment">/* This file contains the default editor definition. */</span>

<span class="token keyword">editor</span> <span class="token keyword">default</span>

<span class="token class-name">Flow</span> &#123;<span class="token punctuation">[</span>
    Flow $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125; for SiteGroup $&#123;<span class="token function"><span class="token variable">self</span>.main</span>&#125;

    $&#123;<span class="token function"><span class="token variable">self</span>.rules <span class="token keyword">vertical</span></span>&#125;
<span class="token punctuation">]</span>&#125;

<span class="token class-name">FlowRule</span> &#123;<span class="token punctuation">[</span>
    -------------------------------------
    Name: $&#123;<span class="token function"><span class="token variable">self</span>.name</span>&#125;
    Description: $&#123;<span class="token function"><span class="token variable">self</span>.description</span>&#125;
    From page $&#123;<span class="token function"><span class="token variable">self</span>.page</span>&#125;

        $&#123;<span class="token function"><span class="token variable">self</span>.transitions</span>&#125;
<span class="token punctuation">]</span>&#125;

<span class="token class-name">PageTransition</span> &#123;<span class="token punctuation">[</span>
    when $&#123;<span class="token function"><span class="token variable">self</span>.condition</span>&#125; goto page $&#123;<span class="token function"><span class="token variable">self</span>.toPage</span>&#125;
<span class="token punctuation">]</span>&#125;
</code>`}</pre>
<p>
	Yes, generate the editor and try it! Note that to see this definition in action you need to click on the arrow-left icon in the top bar,
	and select ‘StartFlow’ from the list of model units. It looks like this.
</p>
<Figure
	imageName={'tutorial/Tutorial-lesson3-screenshot1.png'}
	caption={'Editor after adding projections for the Flow model unit'}
	figureNumber={1}
/>
<SectionComponent tag="h2" id="more-than-one-editor-3" bind:intersecting={visible[2]}>More than One Editor</SectionComponent>
<p>
	Using Freon you can have multiple views on the same concept. After all, Freon generates a <a href="/Background/Projectional_Editing"
		>projectional editor</a
	>.
</p>
<p>
	Remember that the editor definition in the previous lesson, and the one above are called <code>default</code>? That is because you can
	have any number of editor definitions, each with its own name.
</p>
<p>
	You can think of an editor as a different view on the model, but in terms of the editor definition, it is simply a set of projection
	definitions. This set can consist of a single concept that will have a different appearance than the default, or multiple concepts that
	need to be displayed differently.
</p>
<p>
	When an editor definition does not have a projection for a certain concept, it falls back to the projection in one of the other editor
	definitions. Which projection is chosen for a certain concept, is determined by a fixed algorithm. If you want to know more about this
	algorithm, read <a href="/Documentation/Defining_an_Editor#editor-precedence-4">Editor Precedence</a>.
</p>
<Note
	><svelte:fragment slot="header">One property, one occurrence in the editor</svelte:fragment>
	<svelte:fragment slot="content">
		<p>
			Unfortunately, it is not possible to show the same property of a concept twice in the same editor. The tooling we use to keep the
			state of the underlying model in sync with the view in the running editor does not allow us to do this.
		</p>
	</svelte:fragment></Note
>
<SectionComponent tag="h2" id="creating-tables-4" bind:intersecting={visible[3]}>Creating Tables</SectionComponent>
<p>
	Let’s create a second editor definition for the <em>Flow</em> model unit, one that displays the list of <em>PageTransitions</em> in the
	<em>FlowRule</em>
	as a table. We are going to name this editor definition <code>rules_as_table</code>. It goes into the file
	<code>edu-flow-table.edit</code>.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson3-defs/edu-flow-table.edit#L3-L3
</span>
<span class="token keyword">editor</span> rules_as_table</code>`}</pre>
<p>
	Now to create a projection for <em>FlowRule</em> we use almost the same projection as in the default editor. But to indicate that we are
	going to display the list <code>$&#123;self.transitions&#125;</code> as a table, we remove the keyword <code>vertical</code>, and add the
	keyword <code>table</code>.
</p>
<p>
	Furthermore, we want the elements in the list to be displayed one element per row, thus the keyword <code>rows</code> is added. It won’t
	be a surprise that you can also display one element per column using the keyword <code>columns</code>.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson3-defs/edu-flow-table.edit#L5-L12
</span>
<span class="token class-name">FlowRule</span> &#123;<span class="token punctuation">[</span>
    -------------------------------------
    Name: $&#123;<span class="token function">name</span>&#125;
        Description: $&#123;<span class="token function"><span class="token variable">self</span>.description</span>&#125;
        For page $&#123;<span class="token function">page</span>&#125;

        $&#123;<span class="token variable">self</span>.transitions <span class="token keyword">table</span> rows&#125;
<span class="token punctuation">]</span>&#125;</code>`}</pre>
<p>
	Next we need to define the table itself. Every element in the list is an instance of the <em>PageTransition</em> concept, therefore we add
	a projection for this concept, but in front of the square opening bracket we add yet another keyword: <code>table</code>. This means that
	the following projection is only used when the instance of the concept is projected within a list that is projected as table. The
	projection cannot be used anywhere else.
</p>
<p>
	In the definition of the table projection you can add headers, which are taken literally. Here the headers are <code>Condition</code> and
	<code>Goto Page</code>. The bar between them indicates the transition from one table cell to the next table cell. Headers are not
	obligatory, you can create a table without headers, if you like.
</p>
<p>
	Finally, we define the content of the table cells by indicating which property of the <em>PageTransition</em> should go where. Again the bar
	indicates the transition from one table cell to the next table cell.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson3-defs/edu-flow-table.edit#L14-L17
</span>
<span class="token class-name">PageTransition</span> &#123; <span class="token keyword">table</span> <span class="token punctuation">[</span>
    Condition          | Goto Page
    $&#123;<span class="token function"><span class="token variable">self</span>.condition</span>&#125;  |  $&#123;<span class="token function"><span class="token variable">self</span>.toPage</span>&#125;
<span class="token punctuation">]</span>&#125;</code>`}</pre>
<p>
	Note that for the <em>PageTransition</em> object we have defined a table with two parts. It is the context in which these objects are projected
	that determines whether these parts are displayed as rows or columns.
</p>
<p>
	When you got all this down in the file <code>edu-flow-table.edit</code>, it is time to run the generator again. Find the model unit named
	‘StartFlow again’, and … Yes, there is a table. Feel free to change <code>rows</code> in the <em>FlowRule</em> projection to
	<code>columns</code> to see what changes.
</p>
<Figure
	imageName={'tutorial/Tutorial-lesson3-screenshot2.png'}
	caption={'Editor after adding projections for the Flow model unit'}
	figureNumber={2}
/>
<p>
	If you want to see things like they were before, go the <strong>View</strong> menu, deselect <strong>rules_as_table</strong>, and hit
	<strong>Apply changes</strong>. The name of the menu option is the name that we have given our second editor definition. If you create
	more editor definitions, every name will be added to the menu. That way, you are able to switch on and off any of the projection sets /
	editor definitions.
</p>
<SectionComponent tag="h2" id="using-a-specific-editor-5" bind:intersecting={visible[4]}>Using a Specific Editor</SectionComponent>
<p>
	We already mentioned that there is a specific <a href="/Documentation/Defining_an_Editor#editor-precedence-4">algorithm</a> to determine
	which projection is shown in the generated editor. However, there is a way to circumvent this. Sometimes you want to use a very specific
	way to display a concept. You can indicate that by stating the name of the concept, as well as the name of the editor definition, using
	the syntax <code>[=&gt;ConceptName:editor-name]</code>, for example <code>[=&gt;Page:footing]</code>.
</p>
<p>
	We want to see this feature in action! But before we can use the <code>footing</code> editor definition, we need to create it. Add a file
	called <code>page-footing.edit</code>, and copy the following lines into it.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson3-defs/page-footing.edit#L3-L8
</span>
<span class="token keyword">editor</span> footing

<span class="token class-name">Page</span> &#123;<span class="token punctuation">[</span>
    Questions:
        $&#123;<span class="token function"><span class="token variable">self</span>.questions <span class="token keyword">vertical</span> <span class="token keyword">terminator</span> [END]</span>&#125;
<span class="token punctuation">]</span>&#125;</code>`}</pre>
<p>Now we are ready to specify a specific editor. Let’s rewrite the <code>edu-topics.edit</code> file as follows.</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson3-defs/edu-topics.edit#L17-L60
</span>

<span class="token class-name">Theory</span> &#123;<span class="token punctuation">[</span>
    ----------------------------------------------------
    Theory <span class="token punctuation">[</span>=>Page<span class="token punctuation">]</span>
        $&#123;<span class="token function"><span class="token variable">self</span>.content <span class="token keyword">vertical</span>  <span class="token keyword">terminator</span>[== END OF LINE]</span>&#125;

        <span class="token punctuation">[</span>=>Page:<span class="token class-name">footing</span><span class="token punctuation">]</span>
<span class="token punctuation">]</span>&#125;

<span class="token class-name">Video</span> &#123;<span class="token punctuation">[</span>
    ----------------------------------------------------
    Video <span class="token punctuation">[</span>=>Page<span class="token punctuation">]</span>
        Maybe this video will help you understand.
        $&#123;<span class="token function"><span class="token variable">self</span>.url</span>&#125;

        <span class="token punctuation">[</span>=>Page:<span class="token class-name">footing</span><span class="token punctuation">]</span>
<span class="token punctuation">]</span>&#125;

<span class="token class-name">WorkSheet</span> &#123;<span class="token punctuation">[</span>
    ----------------------------------------------------
    Worksheet <span class="token punctuation">[</span>=>Page<span class="token punctuation">]</span>
        See if you can answer the following questions.

        <span class="token punctuation">[</span>=>Page:<span class="token class-name">footing</span><span class="token punctuation">]</span>
<span class="token punctuation">]</span>&#125;

<span class="token class-name">ExamplePage</span> &#123;<span class="token punctuation">[</span>
    ----------------------------------------------------
    Example <span class="token punctuation">[</span>=>Page<span class="token punctuation">]</span>
        $&#123;<span class="token function"><span class="token variable">self</span>.content</span>&#125;

        Now, please, answer the following questions.

        <span class="token punctuation">[</span>=>Page:<span class="token class-name">footing</span><span class="token punctuation">]</span>
<span class="token punctuation">]</span>&#125;

<span class="token class-name">InDepthMaterial</span> &#123;<span class="token punctuation">[</span>
    ----------------------------------------------------
    InDepthMaterial <span class="token punctuation">[</span>=>Page<span class="token punctuation">]</span>
        $&#123;<span class="token function"><span class="token variable">self</span>.content</span>&#125;

        Test your understanding by answering the following questions.

        <span class="token punctuation">[</span>=>Page:<span class="token class-name">footing</span><span class="token punctuation">]</span></code>`}</pre>
<p>
	And try it out! You see, there is so much fun to have with creating projections. But do come back for the next lesson where we will tackle
	the topic of adding expressions to your metamodel, and to your editor definitions.
</p>

<PrevNextSection {prevLink} {nextLink} />
