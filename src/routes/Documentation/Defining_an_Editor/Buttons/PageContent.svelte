<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Adding Buttons', visible: false, ref: '#adding-buttons-1' },
		{ title: 'Icon Buttons', visible: false, ref: '#icon-buttons-2' }
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

	let prevLink = '/Documentation/Defining_an_Editor/Global_Projections';
	let nextLink = '/Documentation/Defining_an_Editor/Fragments';

	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="adding-buttons-1" bind:intersecting={visible[0]}>Adding Buttons</SectionComponent>
<p>
	It is possible to add an extra button to any projection. To do so add the following line in one of the projections. Note that there may
	not be a space between the start square bracket <code>[</code> and <code>button</code>.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-fragments.edit#L18-L18
</span>
<span class="token punctuation">[</span><span class="token keyword">button</span> <span class="token keyword">text</span>=<span class="token string">"Push me!"</span> <span class="token keyword">boxRole</span>=<span class="token string">"MyButton-role"</span><span class="token punctuation">]</span></code>`}</pre>
<p>
	The <strong>text</strong> is the text that will be shown on the button. The <strong>boxRole</strong> is the manner in which the button is
	coupled to an action. For this you need to create a
	<a href="/Documentation/Customizations/Editor_Customization#writing-custom-actions-4">custom action</a>.
</p>
<p>
	Note that in the custom action you need to specify the exact same <strong>boxRole</strong> as the one that has been supplied with the
	button in the .edit file. When implementing this custom action, you can use <code>box.node</code> to get the node in the ast associated
	with the button. For more information see
	<a href="/Documentation/Customizations/Editor_Customization#writing-custom-actions-4">Writing_Actions</a>.
</p>
<p>Note that we are still working on exposing the in-built actions in the editor core.</p>
<SectionComponent tag="h2" id="icon-buttons-2" bind:intersecting={visible[1]}>Icon Buttons</SectionComponent>
<p>You can add an icon before or after the text using CSS or SCSS. The text for the button is optional.</p>
<p>As an example, buttons are added to a table definition.</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-tables-with-button.edit#L6-L11
</span>
<span class="token class-name">InsurancePart</span>&#123;
<span class="token keyword">table</span> <span class="token punctuation">[</span>
    Name    | risk               | pay out          | is approved   | action
    $&#123;<span class="token function">name</span>&#125; | $&#123;<span class="token function">statisticalRisk</span>&#125; | $&#123;<span class="token function">maximumPayOut</span>&#125; | $&#123;<span class="token function">isApproved</span>&#125; | <span class="token punctuation">[</span><span class="token keyword">button</span> <span class="token keyword">boxRole</span>=<span class="token string">"MyTableButton-role"</span><span class="token punctuation">]</span>
<span class="token punctuation">]</span>
&#125;</code>`}</pre>
<p>To style these buttons the following SCSS code is added.</p>
<pre class="language-scss">{@html `<code class="language-scss"><span class="token comment">// Styling/app.scss#L29-L43</span>

<span class="token selector">.MyTableButton-role::before </span><span class="token punctuation">&#123;</span>
  <span class="token property">font-family</span><span class="token punctuation">:</span> <span class="token string">"Font Awesome 6 Free"</span><span class="token punctuation">,</span> emoji<span class="token punctuation">;</span>
  <span class="token property">font-weight</span><span class="token punctuation">:</span> 900<span class="token punctuation">;</span>
  <span class="token comment">//content: 'plus';</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">'\\2b'</span><span class="token punctuation">;</span> <span class="token comment">// this number is called the icon's unicode in Font Awesome</span>
  <span class="token property">color</span><span class="token punctuation">:</span> dodgerblue<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
  <span class="token property">rotate</span><span class="token punctuation">:</span> 30deg<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token selector">.MyTableButton-role </span><span class="token punctuation">&#123;</span>
  <span class="token property">min-width</span><span class="token punctuation">:</span> 0.5em <span class="token important">!important</span><span class="token punctuation">;</span>
  <span class="token property">min-height</span><span class="token punctuation">:</span> 0.5em <span class="token important">!important</span><span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 50% <span class="token important">!important</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<p>This is displayed as follows.</p>
<Figure imageName={'documentation/Documentation-Buttons-screenshot1.png'} caption={'Showing a button in each table row'} figureNumber={1} />

<PrevNextSection {prevLink} {nextLink} />
