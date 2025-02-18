<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Customization of the Scoper', visible: false, ref: '#customization-of-the-scoper-1' },
		{ title: 'Adjusting the Environment', visible: false, ref: '#adjusting-the-environment-2' }
	];
	let visible: boolean[] = [];
	$: $mySections[0].visible = visible[0];
	$: $mySections[1].visible = visible[1];
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

	let prevLink = '/Documentation/Customizations/External_Components';
	let nextLink = '/Documentation/Customizations/Typer_Customization';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="customization-of-the-scoper-1" bind:intersecting={visible[0]}>Customization of the Scoper</SectionComponent>
<p>
	The scoper can not yet be customized <strong>per concept</strong>. Instead, you can replace the whole scoper by one create yourself. The
	new scoper needs to implement the following interface.
</p>
<SectionComponent tag="h2" id="adjusting-the-environment-2" bind:intersecting={visible[1]}>Adjusting the Environment</SectionComponent>
<p>
	Furthermore, you need to tell Freon to use this new scoper instead of the generated one. You do this by changing the line that initializes
	the scoper in the class <code>YourLanguageNameEnvironment</code>. You can find it in <code>~/freon/environment/</code>. Obviously, you
	need to exchange <code>YourLanguageName</code> by the name of the language that you are creating.
</p>
<p>
	Suppose the class <code>YourScoper</code>
	holds the scoper with the improvements that you have made, then the entry in the environment class would be:
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">EntityEnvironment</span> <span class="token keyword">implements</span> <span class="token class-name">PiEnvironment</span> <span class="token punctuation">&#123;</span>
    <span class="token operator">...</span>
    scoper<span class="token operator">:</span> PiScoper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">YourScoper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token operator">...</span>
<span class="token punctuation">&#125;</span></code>`}</pre>

<PrevNextSection {prevLink} {nextLink} />
