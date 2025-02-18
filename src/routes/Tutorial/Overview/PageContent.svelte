<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Welcome to the Freon tutorial!', visible: false, ref: '#welcome-to-the-freon-tutorial-1' },
		{ title: 'The DSL: Computer Aided Learning', visible: false, ref: '#the-dsl-computer-aided-learning-2' },
		{ title: 'How to use this tutorial', visible: false, ref: '#how-to-use-this-tutorial-3' },
		{ title: 'Where do the files go?', visible: false, ref: '#where-do-the-files-go-4' }
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

	let prevLink = '/Documentation/Terminology';
	let nextLink = '/Tutorial/Creating_your_Metamodel';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="welcome-to-the-freon-tutorial-1" bind:intersecting={visible[0]}
	>Welcome to the Freon tutorial!</SectionComponent
>
<p>
	This step-by-step guide will teach you everything you need to know to easily build your own domain specific language (DSL). You will learn
	how to create the set of tools, editor, validator, interpreter, etc., which will enable your end-users to use your DSL efficiently.
</p>
<p>
	You can also consult the documentation, or - if you’re impatient to start hacking on your machine locally - <a
		href="/Documentation/Overview/Getting_Started#example-project-startup-2">create a project</a
	>.
</p>
<p>
	We assume that you are interested in DSLs, and are therefore familiar with terms like metamodel, abstract syntax, and model, as well as
	abbreviations like AST. If you are not, please first refer to other sources, for instance the book <a
		href="https://www.manning.com/books/building-user-friendly-dsls"
		target="_blank">‘Building User-Friendly DSLs’</a
	>
	written by Meinte Boersma. If you just need to refresh your knowledge, refer to
	<a href="/Documentation/Terminology">Freon Terminology</a>. Furthermore, a little knowledge of UML will come in handy, but this is not a
	true requirement.
</p>
<SectionComponent tag="h2" id="the-dsl-computer-aided-learning-2" bind:intersecting={visible[1]}
	>The DSL: Computer Aided Learning</SectionComponent
>
<p>
	The first thing to do is explain the domain in which our DSL is positioned, which is Computer Aided Learning. Our (hypothetical) client is
	a company that provides a service to children of various ages to help them learn certain topics, like arithmetic and mathematics,
	geography, history, biology, or road safety. For this purpose the company deploys a number of websites, each dedicated to a certain topic.
</p>
<p>
	The company, therefore, needs a lean and agile means to define the content of the webpages, and the flow between them. For instance, when
	a pupil makes many mistakes, the page that will be shown next to this specific pupil is one that might contain extra explanation, or extra
	practice material. But when another pupil goes through the topic with much ease, he or she will be shown more advanced material to keep
	him/her interested. Furthermore, our client company want a means to test the page flow before the actual webpages are produced.
</p>
<p>So you might see that we have a bit of task before us to satisfy this client’s needs and expectations.</p>
<SectionComponent tag="h2" id="how-to-use-this-tutorial-3" bind:intersecting={visible[2]}>How to use this tutorial</SectionComponent>
<p>
	This tutorial is split into 9 lessons. Each lesson has a dedicated subject, but it will build upon the previous lessons. So the best way
	is to work through them in the given order.
</p>
<p>
	The easiest way to follow this tutorial is to use the create project command, and choose the language <code>Education</code>. This way you
	can recreate the project, and toy with many of the options.
</p>
<pre class="language-bash">{@html `<code class="language-bash">  <span class="token function">npm</span> create freon@latest</code>`}</pre>
<p>
	In the <code>Education</code> project you will find all definition files needed for one of the lessons in a separate folder, so you won’t
	be bothered by any of the details that are not yet explained, when going through the lessons one by one. For instance, you can find all
	definition files for lesson 3 in the folder named <code>lesson3-defs</code>, and likewise for all other lessons. The files for lesson1 are
	present in the <code>src/defs</code> folder (see <a href="#where-do-the-files-go-4">Where do the files go?</a>) at the start. Empty this
	folder before the next lesson, and copy in the files for the lesson you are about to follow. You can also find a number of models that fit
	the language(s) from the lessons in the <strong>modelstore</strong> folder. (For an explanation of the content of the project see
	<a href="/Documentation/Overview/Getting_Started#project_structure-4">Project_Structure</a>.) Use the model called <code>Lesson1</code>
	for lessons 1 till 3, the model <code>Lesson4</code> for lessons 4 and 5, and <code>Lesson6</code> for the rest of the lessons.
</p>
<p>For some hints on how to use the editor, click on the question mark on the top bar of the editor.</p>
<SectionComponent tag="h2" id="where-do-the-files-go-4" bind:intersecting={visible[3]}>Where do the files go?</SectionComponent>
<p>
	Your project will be set up to have all your Freon definition files in the folder <code>src/defs</code>, but if you decide to do things
	differently, you can change the <code>package.json</code> file. Look at the scripts for <code>generate </code>and <code>clean-gen</code>.
	There you find the folder <code>src/defs</code>
	mentioned. If you change these entries you can place the language definition files anywhere you like.
</p>
<pre
	class="language-undefined">{@html `<code class="language-undefined">&quot;generate&quot;: &quot;freon -v all -d src/defs -o src/freon&quot;,
&quot;clean-gen&quot;: &quot;freon clean-it -d src/defs -o src/freon&quot;,</code>`}</pre>
<p>
	In this tutorial we will make a number of Freon definition files. Note that the extension of the file (for instance, <code>.ast</code>,
	<code>.valid</code>) is important, but the name is not. All metamodel definitions need to be in a <code>.ast</code> file, all editor
	definitions in a <code>.edit</code> file, etc.
</p>
<p>
	When you have checked out the source code and are following this example in your own IDE, you might notice that upon regeneration the
	browser sometimes shows an empty page. The reason is that the browser is quicker than the regeneration process. (In the console of the
	browser development tools you will see the message <code>Uncaught SyntaxError: Unexpected end of input</code>.) Don’t worry, simply reload
	the page, and everything will be fine.
</p>

<PrevNextSection {prevLink} {nextLink} />
