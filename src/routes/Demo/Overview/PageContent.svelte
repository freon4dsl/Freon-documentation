<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Welcome to the Demo', visible: false, ref: '#welcome-to-the-demo-1' },
		{ title: 'Live DEMO', visible: false, ref: '#live-demo-2' },
		{ title: 'MDENet', visible: false, ref: '#mdenet-3' }
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

	let prevLink = '/Examples/External_Components/A_Sorted_Table';
	let nextLink = '/LionWeb';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="welcome-to-the-demo-1" bind:intersecting={visible[0]}>Welcome to the Demo</SectionComponent>
<p>
	On this page you can find links to some of the presentations that were given about Freon. But most importantly you can start the live <a
		href="/DocuProjectDemo?model=ShowCase"
		target="_blank">demo</a
	>.
</p>
<SectionComponent tag="h2" id="live-demo-2" bind:intersecting={visible[1]}>Live DEMO</SectionComponent>
<p>
	To show how a Freon editor might look like, without all kinds of customizations, or a change of CSS styling, we prepared a demo. The
	language that was explained in the <a href="/Documentation/Overview/Running_Example">documentation</a> is used in this example. It will be
	no surprise that you cannot use a number of the File menu options. Use this link to
	<a href="/DocuProjectDemo?model=ShowCase" target="_blank"><b>Start The Demo</b></a> in a new web page.
</p>
<SectionComponent tag="h2" id="mdenet-3" bind:intersecting={visible[2]}>MDENet</SectionComponent>
<p>
	On May 31, 2023, we gave a presentation and demonstration for the <a href="https://mde-network.com/" target="_blank">MDENet</a> forum. Both
	were recorded. You can find them below.
</p>
<table>
	<thead>
		<tr>
			<th>The presentation</th>
			<th>The demonstration</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><iframe src="https://www.youtube.com/embed/Eb9WGZyL92w" title="The presentation for MDENet, May 2023" /></td>
			<td><iframe src="https://www.youtube.com/embed/pdQaCfRkgA8" title="The demo for MDENet, May 2023" /></td>
		</tr>
	</tbody>
</table>

<PrevNextSection {prevLink} {nextLink} />
