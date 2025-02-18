<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [{ title: 'About the Site', visible: false, ref: '#about-the-site-1' }];
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

	let prevLink = '/Background/About_the_Authors';
	let nextLink = '';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="about-the-site-1" bind:intersecting={visible[0]}>About the Site</SectionComponent>
<ul>
	<li>This site is created with <a href="https://kit.svelte.dev" target="_blank">SvelteKit</a>.</li>
	<li>Code blocks are included using <a href="https://github.com/zakhenry/embedme" target="_blank">EmbedMe</a>.</li>
	<li>
		Syntax highlighting is provided through <a href="https://mdsvex.com/" target="_blank">mdsvex</a> with styling from
		<a href="https://prismjs.com/" target="_blank">Prism</a>, using the Visual Studio Code themes.
	</li>
	<li>
		The ‘OOPS’ icon on our 404 page comes from <a href="https://www.flaticon.com/" title="Flaticon" target="_blank">www.flaticon.com</a>.
	</li>
	<li>The word cloud tree was created using <a href="https://www.wordclouds.com/" target="_blank">www.wordclouds.com</a>.</li>
	<li>
		The terminology was created using an <a href="https://thisdavej.com/copy-table-in-excel-and-paste-as-a-markdown-table/" target="_blank"
			>online tool</a
		> created by Dave Johnson.
	</li>
</ul>
<p>
	All the rest, including any errors, can be contributed to the creators of Freon: Jos Warmer and Anneke Kleppe (see <a
		href="https://www.openmodeling.nl/"
		title="Openmodeling"><a href="http://www.openmodeling.nl" rel="nofollow">www.openmodeling.nl</a></a
	>).
</p>

<PrevNextSection {prevLink} {nextLink} />
