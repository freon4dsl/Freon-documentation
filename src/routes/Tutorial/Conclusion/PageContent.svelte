<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Congratulations!!!', visible: false, ref: '#congratulations-1' },
		{ title: 'What to do next?', visible: false, ref: '#what-to-do-next-2' },
		{ title: 'Ideas to extend the DSL', visible: false, ref: '#ideas-to-extend-the-dsl-3' }
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

	let prevLink = '/Tutorial/Validating_the_model';
	let nextLink = '/Examples';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="congratulations-1" bind:intersecting={visible[0]}>Congratulations!!!</SectionComponent>
<p>
	When you have reached this point, you have learned all the basics of Freon. What’s more, you have produced a web-based editor with just
	501 lines of code, containing 9547 characters, including comments. (Yes, we counted them!)
</p>
<SectionComponent tag="h2" id="what-to-do-next-2" bind:intersecting={visible[1]}>What to do next?</SectionComponent>
<p>
	There are a number of paths to follow if you want to continue learning about Freon, and creating DSLs. Of course, you can have a browse
	through the <a href="/Documentation/Overview">documentation</a>, where many of the topics we discussed in this tutorial are explained in
	depth. Or you could dive deeper into the Computer Aided Learning DSL, by extending the DSL with more ideas. Below you will find a
	<a href="/Tutorial/Conclusion#ideas-to-extend-the-dsl3">list of suggestions</a>
	for extending the language. Another option is to have a look at the list of <a href="/Examples/Overview">examples</a> included on this
	site. Each example takes a deeper dive into a specific part of Freon. Specially,
	<a href="/Examples/Building_an_Interpreter">Building an Interpreter</a>
	is interesting because it builds upon the Computer Aided Learning DSL. You could also check out the
	<a href="/LionWeb/Overview">LionWeb</a> section, to know more about model and language interchange formats between various tools for language
	engineering.
</p>
<p>If you are really into Freon, you could also join the team of contributors.</p>
<SectionComponent tag="h2" id="ideas-to-extend-the-dsl-3" bind:intersecting={visible[2]}>Ideas to extend the DSL</SectionComponent>
<p>We conclude this tutorial with some suggestions on how to proceed with the Computer Aided Learning DSL.</p>
<ul>
	<li>Introduce questions that can have a boolean as answer. E.g. Can this fraction be simplified: 13/139?</li>
	<li>
		Try to use styling to change the appearance of the editor. See the documentation about <a
			href="/Documentation/Defining_an_Editor/Styling">styling</a
		>
	</li>
</ul>

<PrevNextSection {prevLink} {nextLink} />
