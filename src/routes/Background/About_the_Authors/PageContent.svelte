<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [{ title: 'About the Authors', visible: false, ref: '#about-the-authors-1' }];
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

	let prevLink = '/Background/About_the_Name';
	let nextLink = '/Background/About_the_Site';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="about-the-authors-1" bind:intersecting={visible[0]}>About the Authors</SectionComponent>
<p>
	Freon is a brainchild of <strong>Jos Warmer</strong> and <strong>Anneke Kleppe</strong>. Both authors have many years of experience in
	working with software languages and DSLs in particular.
</p>
<p>
	Jos and Anneke met at the University of Amsterdam in the 1980s, where they both received a thorough education in software development.
	Anneke graduated in Theoretical Computer Science, whereas Jos took a more practical approach with Software Engineering. From then on they
	have been working in the industry (KPN Research, IBM, Mendix, De Nederlandsche Bank, …), but always with an interest in research. That is
	the reason that over the years they have published so many scientific papers, and during some periods were employed by universities.
	Currently, they are working independently, with their main focus on building DSLs.
</p>
<p>
	In 1995 Jos, when working for IBM, became involved in the standardization of the Unified Modeling Language. His unique contribution to the
	standard is the Object Constraint Language (OCL), a language in which extra rules, called constraints, about UML classes etc. can be
	expressed.
</p>
<p>Both together and separately, Jos and Anneke wrote a number of books, some of them are listed below.</p>
<ul>
	<li>
		<p><strong>Software Language Engineering - Creating Domain-Specific Languages Using Metamodels</strong></p>
		<p>
			This book systematically introduces and explains every ingredient of an effective language specification, including its description of
			concepts, how those concepts are denoted, and what those concepts mean in relation to the problem domain.
		</p>
	</li>
	<li>
		<p><strong>The Object Constraint Language - Getting Your Models Ready for MDA</strong></p>
		<p>
			The Object Constraint Language - Getting Your Models Ready for MDA, is <strong>the</strong> book on OCL. OCL is the standard constraint
			language for UML and especially popular at the meta modeling level.
		</p>
	</li>
	<li>
		<p><strong>MDA Explained</strong></p>
		<p>MDA Explained gives a complete overview of the Model Driven Architecture.</p>
	</li>
	<li>
		<p>
			<strong>Praktisch UML, 5de editie</strong>
			(<em>Praktisch UML is a Dutch book, therefore this text is in Dutch.</em>)
		</p>
		<p>
			Praktisch UML is het Nederlandstalige standaardwerk over UML. Praktisch UML is een handleiding voor het toepassen van de Unified
			Modeling Language (UML), de standaard voor objectgeoriënteerde analyse en ontwerp, die sinds 1997 wereldwijd gebruikt wordt.
		</p>
	</li>
</ul>

<PrevNextSection {prevLink} {nextLink} />
