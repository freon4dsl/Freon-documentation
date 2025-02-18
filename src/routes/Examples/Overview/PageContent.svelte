<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Examples', visible: false, ref: '#examples-1' },
		{ title: 'Currently Available', visible: false, ref: '#currently-available-2' },
		{ title: 'Upcoming', visible: false, ref: '#upcoming-3' }
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

	let prevLink = '/Tutorial/Conclusion';
	let nextLink = '/Examples/Building_an_Interpreter';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="examples-1" bind:intersecting={visible[0]}>Examples</SectionComponent>
<p>
	In this section of the website we have gathered a number of examples that each focus on one more advanced topic. During the upcoming year
	we plan to add more examples to this list. For now, the following examples are available. You can find the sources for each of the example
	on GitHub. See <a href="/Documentation/Overview/Getting_Started">Getting Started</a>
	for information on how to install the examples on your computer.
</p>
<SectionComponent tag="h2" id="currently-available-2" bind:intersecting={visible[1]}>Currently Available</SectionComponent>
<ul>
	<li><a href="/Examples/Building_an_Interpreter">Building an Interpreter</a> How to build an interpreter that uses the Freon AST.</li>
	<li><a href="/Examples/Generic_Types">Generic Types</a> How to create a language with generic types.</li>
	<li>
		<a href="/Examples/External_Components">Using Svelte Components from a Library</a> How to include custom components in the editor.
	</li>
</ul>
<SectionComponent tag="h2" id="upcoming-3" bind:intersecting={visible[2]}>Upcoming</SectionComponent>
<p>The following examples are planned, and, hopefully, will be available soon.</p>
<ul>
	<li><strong>Projection Fragments</strong> How to create and use fragments in your projections.</li>
	<li><strong>Editor Styling</strong> How to style the generated editor.</li>
	<li><strong>Custom Projections</strong> How to build custom projections.</li>
	<li><strong>Custom Actions</strong> How to create custom actions.</li>
	<li><strong>Custom Scoping</strong> How to adjust the scope provider.</li>
	<li><strong>Custom Validation</strong> How to create cutom validation rules.</li>
	<li><strong>Include Freon in your website</strong> How to proceed when you want to include Freon in another webpage.</li>
</ul>

<PrevNextSection {prevLink} {nextLink} />
