<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Projection Fragments', visible: false, ref: '#projection-fragments-1' },
		{ title: 'Fragment Definition', visible: false, ref: '#fragment-definition-2' },
		{ title: 'Fragment Inclusion', visible: false, ref: '#fragment-inclusion-3' }
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

	let prevLink = '/Documentation/Defining_an_Editor/Buttons';
	let nextLink = '/Documentation/Defining_an_Editor/Styling';

	import Note from '$lib/notes/Note.svelte';
	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="projection-fragments-1" bind:intersecting={visible[0]}>Projection Fragments</SectionComponent>
<p>
	Parts of a projection may be defined separately to provide more flexibility in the layout. These parts are called <strong
		>fragments</strong
	>.
</p>
<SectionComponent tag="h2" id="fragment-definition-2" bind:intersecting={visible[1]}>Fragment Definition</SectionComponent>
<p>
	A fragment is defined in a similar manner as normal projections, except it starts with the keyword <code>fragment</code>, followed by the
	name of the fragment. The content is given in the familiar manner between the square brackets (<code>[]</code>).
</p>
<p>
	The next example defines two fragments called (rather unimaginative) <code>First</code> and <code>Second</code>. Note that every fragment
	for the same concept must have a unique name.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-fragments.edit#L8-L24
</span>
<span class="token punctuation">]</span>
    <span class="token keyword">fragment</span> First <span class="token punctuation">[</span>
    First Card
        is still under construction: $&#123;<span class="token function"><span class="token variable">self</span>.isUnderConstruction <span class="token keyword">switch</span></span>&#125;
        is approved level1: $&#123;<span class="token function"><span class="token variable">self</span>.isApprovedLevel1 <span class="token keyword">radio</span></span>&#125;
        is approved level2: $&#123;<span class="token function"><span class="token variable">self</span>.isApprovedLevel2 <span class="token keyword">inner-switch</span></span>&#125;
        is approved level3: $&#123;<span class="token function"><span class="token variable">self</span>.isApprovedLevel3 <span class="token keyword">checkbox</span></span>&#125;
    <span class="token punctuation">]</span>
    <span class="token keyword">fragment</span> Second <span class="token punctuation">[</span>
    Second Card
        <span class="token punctuation">[</span><span class="token keyword">button</span> <span class="token keyword">text</span>=<span class="token string">"Push me!"</span> <span class="token keyword">boxRole</span>=<span class="token string">"MyButton-role"</span><span class="token punctuation">]</span>
        yields profit: $&#123;<span class="token function"><span class="token variable">self</span>.yieldsProfit</span>&#125;
        expected nr of use: $&#123;<span class="token function"><span class="token variable">self</span>.nrOfUse <span class="token keyword">slider</span></span>&#125;
        range: $&#123;<span class="token function"><span class="token variable">self</span>.range</span>&#125;
        date: $&#123;<span class="token function"><span class="token variable">self</span>.date</span>&#125;
    <span class="token punctuation">]</span>
&#125;</code>`}</pre>
<Note
	><svelte:fragment slot="header">One property, one occurrence in the editor</svelte:fragment>
	<svelte:fragment slot="content">
		<p>
			Unfortunately, it is not possible to show the same property of a concept twice in the same editor. The tooling we use to keep the
			state of the underlying model in sync with the view in the running editor does not allow us to do this.
		</p>
	</svelte:fragment></Note
>
<SectionComponent tag="h2" id="fragment-inclusion-3" bind:intersecting={visible[2]}>Fragment Inclusion</SectionComponent>
<p>
	Each fragment definition must be associated with a concept entry in a .edit file, but it cannot be directly included in the projection. To
	include a fragment within a projection, use the syntax <code>[fragment &lt;FRAGMENT_NAME&gt;]</code>, where
	<code>&lt;FRAGMENT_NAME&gt;</code>
	is the name of the desired fragment. Ensure there is no space between the opening square bracket (<code>[</code>) and the keyword
	<code>fragment</code>.
</p>
<p>Thus, the complete example is the following. Note that the concept’s projection is closed before the fragments are defined.</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-fragments.edit#L3-L24
</span>
<span class="token class-name">BaseProduct</span> &#123;
<span class="token punctuation">[</span>
    Base Product for $&#123;<span class="token function"><span class="token variable">self</span>.theme <span class="token keyword">radio</span></span>&#125; $&#123;<span class="token function"><span class="token variable">self</span>.name </span>&#125;
        <span class="token punctuation">[</span><span class="token keyword">fragment</span> First<span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token keyword">fragment</span> Second<span class="token punctuation">]</span>
        $&#123;<span class="token function"><span class="token variable">self</span>.parts</span>&#125;
<span class="token punctuation">]</span>
    <span class="token keyword">fragment</span> First <span class="token punctuation">[</span>
    First Card
        is still under construction: $&#123;<span class="token function"><span class="token variable">self</span>.isUnderConstruction <span class="token keyword">switch</span></span>&#125;
        is approved level1: $&#123;<span class="token function"><span class="token variable">self</span>.isApprovedLevel1 <span class="token keyword">radio</span></span>&#125;
        is approved level2: $&#123;<span class="token function"><span class="token variable">self</span>.isApprovedLevel2 <span class="token keyword">inner-switch</span></span>&#125;
        is approved level3: $&#123;<span class="token function"><span class="token variable">self</span>.isApprovedLevel3 <span class="token keyword">checkbox</span></span>&#125;
    <span class="token punctuation">]</span>
    <span class="token keyword">fragment</span> Second <span class="token punctuation">[</span>
    Second Card
        <span class="token punctuation">[</span><span class="token keyword">button</span> <span class="token keyword">text</span>=<span class="token string">"Push me!"</span> <span class="token keyword">boxRole</span>=<span class="token string">"MyButton-role"</span><span class="token punctuation">]</span>
        yields profit: $&#123;<span class="token function"><span class="token variable">self</span>.yieldsProfit</span>&#125;
        expected nr of use: $&#123;<span class="token function"><span class="token variable">self</span>.nrOfUse <span class="token keyword">slider</span></span>&#125;
        range: $&#123;<span class="token function"><span class="token variable">self</span>.range</span>&#125;
        date: $&#123;<span class="token function"><span class="token variable">self</span>.date</span>&#125;
    <span class="token punctuation">]</span>
&#125;</code>`}</pre>
<p>
	In this example we have styled the fragment boxes with a light yellow background. (More on styling can be found in <a
		href="/Documentation/Defining_an_Editor/Styling">Styling</a
	>.) The styled editor looks like this.
</p>
<Figure imageName={'documentation/Documentation-Fragments-screenshot1.png'} caption={'Two fragments side by side'} figureNumber={1} />

<PrevNextSection {prevLink} {nextLink} />
