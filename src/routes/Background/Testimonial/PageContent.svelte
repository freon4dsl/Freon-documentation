<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [{ title: 'Testimonial', visible: false, ref: '#testimonial-1' }];
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

	let prevLink = '/Background/Overview';
	let nextLink = '/Background/Projectional_Editing';

	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="testimonial-1" bind:intersecting={visible[0]}>Testimonial</SectionComponent>
<a target="_blank" href="https://www.triradial.com/">TriRadial Solutions</a> is using Freon for the DSL in or Clinical Research Coordinator
(CRC) product. CRCs are the front-line staff the perform clinical trials for drugs and other health products. Our product allows a CRC to
define the structure of a clinical trial including:
<ul>
	<li>The phases, e.g., the patient screening, treatment, follow-up phases, etc.</li>
	<li>The visits, e.g., obtain informed consent, conduct physical exam, give medication to patient, etc.</li>
	<li>The tasks to be done in each visit</li>
	<li>The expressions that define the scheduling of all these things</li>
</ul>
<p>
	The product is a demonstration of the use of a DSL to enable the subject matter experts to do the complex clinical trial modeling that
	their job requires. Before this product they would spend hours creating and maintaining approximate models of a study in Excel. Key
	features of Freon that we used are highlighted in the pictures of the product UI below:
</p>
<ul>
	<li>
		The left side of the first picture shows a Freon DSL editor with custom styles and components and seamlessly integrated via the standard
		Svelte component model into the overall app.
	</li>
	<li>The second picture shows use of the Freon interpreter framework to run simulations of the scheduling</li>
</ul>
<Figure imageName={'background/CRCHubUI1.png'} caption={'Freon editor embedded in the CRCHub application.'} figureNumber={1} />
<p>and</p>
<Figure imageName={'background/CRCHubUI2.png'} caption={'CRCHub Simulation using the Freon Interpreter Framework.'} figureNumber={2} />
<p>
	While the creation of a product like the above is a big effort, we have also been successful rapidly prototyping DSLs for other projects.
	For example, using the out-of-the-box DSL definition and editing features we were able to build a DSL for defining validation rules for
	clinical trial data transformations in two days. The capability to build enterprise class applications starting with quickly developed and
	deployed iterations is keeping us excited about Freon.
</p>

<PrevNextSection {prevLink} {nextLink} />
