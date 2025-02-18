<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'In Need of Scoping', visible: false, ref: '#in-need-of-scoping-1' },
		{ title: 'A Simple View on Scoping', visible: false, ref: '#a-simple-view-on-scoping-2' },
		{ title: 'Defining name spaces', visible: false, ref: '#defining-name-spaces-3' }
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

	let prevLink = '/Tutorial/Projections_for_Expressions';
	let nextLink = '/Tutorial/More_Scoping';

	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="in-need-of-scoping-1" bind:intersecting={visible[0]}>In Need of Scoping</SectionComponent>
<p>
	In this lesson we are going to restrict the references to questions that we can select in the grading of a page to only the questions that
	are on that page. For this, we need to define scope rules.
</p>
<SectionComponent tag="h2" id="a-simple-view-on-scoping-2" bind:intersecting={visible[1]}>A Simple View on Scoping</SectionComponent>
<p>
	O my, you might think, this is a really difficult subject. But, with Freon we adhere to the philosophy that ”<em
		>Simple things should be simple, complex things should be possible.</em
	>” (Read our
	<a href="/Background">Background</a> to find out more.) And in essence, scoping is not difficult at all.
</p>
<p>
	Scoping is about the question of which names are accessible/visible where. In the general case, all names in a context are divided into
	sets. These sets do not overlap, but there are subsets of larger sets, as shown in the next figure.
</p>
<p>
	Let’s call the relationship between a name and the smallest possible subset that contains it: the set owns the name. For instance, in the
	figure the name ‘Peter’ is owned by set8. Using common scoping rules, any name is accessible/visible within the set that owns it, and
	within any set that contains the name’s owner, but not in other sets. In the figure the name ‘Peter’ would be accessible/visible in (from
	smallest to largest) set8, set 4, set2, and set1. But it would not be accessible/visible in set3, set5, set6, and set7.
</p>
<Figure imageName={'tutorial/Tutorial-lesson6-namespaces.png'} caption={'Simple View on Namespaces'} figureNumber={1} />
<p>
	In Freon, we call these sets of names <strong>NameSpaces</strong>. Without any scope definition, in your editor there is just a single
	namespace. It contains all the names present in your model.
</p>
<SectionComponent tag="h2" id="defining-name-spaces-3" bind:intersecting={visible[2]}>Defining name spaces</SectionComponent>
<p>
	There is a very easy way to define extra name spaces in Freon. Note, however, that any file that defines scoping must have the extension <code
		>.scope</code
	>. So, let’s create a file called <code>edu.scope</code>.
</p>
<p>
	First, we need to think about our DSL. Which names need to be kept from being seen in certain parts? The problem we had was with names of
	questions that are visible in all pages, also in others than the one on which the names are defined. This means that the concept <code
		>Page</code
	>
	is a likely candidate to be a name space. Knowing this, we add the following lines to the <code>edu.scope</code> file.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson6-defs/edu.scope
</span>
scoper EducationScoper for language Education

<span class="token class-name">isnamespace</span> &#123; Page  &#125;
</code>`}</pre>
<p>
	That’s it. Easy, peasy! You don’t believe it? Just try it out for yourselves, and you will see that in the score only the questions from
	that page can be used.
</p>
<p>
	In the following lessons we will learn a few more things about scoping. But first we need to define the last model unit, the <em>Test</em>
	unit.
</p>

<PrevNextSection {prevLink} {nextLink} />
