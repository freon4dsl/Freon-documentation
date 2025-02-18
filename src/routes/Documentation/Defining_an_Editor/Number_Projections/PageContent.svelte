<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Number Projections', visible: false, ref: '#number-projections-1' },
		{ title: 'Sliders', visible: false, ref: '#sliders-2' }
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

	let prevLink = '/Documentation/Defining_an_Editor/Boolean_Projections';
	let nextLink = '/Documentation/Defining_an_Editor/Projections_for_Limited_Concepts';

	import Note from '$lib/notes/Note.svelte';
	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="number-projections-1" bind:intersecting={visible[0]}>Number Projections</SectionComponent>
<p>
	Freon offers a slider control to display a number value. You can set a default for the display of a number value in the <a
		href="/Documentation/Defining_an_Editor/Global_Projections"><code>global</code></a
	> section of the default editor. However, a slider is not often the preferred default display.
</p>
<SectionComponent tag="h2" id="sliders-2" bind:intersecting={visible[1]}>Sliders</SectionComponent>
<p>
	The slider control is indicated by adding the keyword <code>slider</code> to the property projection. When hovering over the slider button
	the actual value of the property is shown.
</p>
<p>For the sake of the example, we have added two number properties to the concept <code>BaseProduct</code>.</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L34-L36
</span>
range: <span class="token builtin">number</span>;
nrOfUse: <span class="token builtin">number</span>;
// The previoud two properties are present to show the different options for displaying numbers.</code>`}</pre>
<p>The added properties are displayed like this.</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-main-controls.edit#L12-L13
</span>
expected nr of use: $&#123;<span class="token function"><span class="token variable">self</span>.nrOfUse</span>&#125;
range: $&#123;<span class="token function"><span class="token variable">self</span>.range <span class="token keyword">slider</span></span>&#125;</code>`}</pre>
<p>Which results in the following.</p>
<Figure imageName={'documentation/Documentation-Number-Projections-screenshot1.png'} caption={'A number slider control'} figureNumber={1} />

<PrevNextSection {prevLink} {nextLink} />
