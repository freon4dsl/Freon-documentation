<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [{ title: 'Command Line', visible: false, ref: '#command-line-1' }];
	let visible: boolean[] = [];
	$: $mySections[0].visible = visible[0];
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

	let prevLink = '/Documentation/Customizations/Other_Customizations';
	let nextLink = '/Documentation/Under_the_Hood';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="command-line-1" bind:intersecting={visible[0]}>Command Line</SectionComponent>
<p>Freon generates a command line application in the folder <code>commandline</code>.</p>
<p>
	The main command line class to run is the <code>FreonCommandLineRunner.ts</code>. This initializes the language and then runs the given
	command. As generated there is a <code>DummyAction</code>, which is just a sample of what a action class looks like. Just replace this
	with your own action.
</p>
<p>If you define multiple actions, make sure they are correctly initialized in the <code>FreonCommandLineRunner</code> class.</p>

<PrevNextSection {prevLink} {nextLink} />
