<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [{ title: 'Projections and Indentation', visible: false, ref: '#projections-and-indentation-1' }];
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

	let prevLink = '/Documentation/Defining_an_Editor/Projections';
	let nextLink = '/Documentation/Defining_an_Editor/Ease_of_Editing';

	import Note from '$lib/notes/Note.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="projections-and-indentation-1" bind:intersecting={visible[0]}>Projections and Indentation</SectionComponent>
<p>
	The indentation you use in a projection is taken into account in the display. Thus, in the following example <code>literal text</code>
	will appear indented 8 spaces from <code>This is</code>.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-indentation.edit#L6-L14
</span>
<span class="token class-name">Text</span> &#123;
<span class="token punctuation">[</span>
This is
        literal <span class="token keyword">text</span>
      that is projected <span class="token keyword">in</span> the
                <span class="token keyword">editor</span>
  for every <span class="token keyword">concept</span> <span class="token class-name">of</span> <span class="token keyword">type</span> Text.
<span class="token punctuation">]</span>
&#125;</code>`}</pre>
<p>
	However, this is not the complete story. Any whitespace before the line with the least indentation is ignored. Therefore, you can indent
	the projection as a whole, without it having any influence on the projection. The next example produces the exact same result as the
	previous.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-indentation.edit#L16-L24
</span>
<span class="token class-name">Text2</span> &#123;
            <span class="token punctuation">[</span>
            This is
                    literal <span class="token keyword">text</span>
                  that is projected <span class="token keyword">in</span> the
                            <span class="token keyword">editor</span>
              for every <span class="token keyword">concept</span> <span class="token class-name">of</span> <span class="token keyword">type</span> Text.
            <span class="token punctuation">]</span>
&#125;</code>`}</pre>
<p>
	In the following example, the line with the least indentation is
	<code>for every concept of type Text.</code>
	It will not be indented. On the other hand, the text <code>This is</code> will be indented 10 spaces, <code>literal text</code> will be indented
	8 spaces, etc.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-indentation.edit#L26-L34
</span>
<span class="token class-name">Text3</span> &#123;
    <span class="token punctuation">[</span>
                 This is
               literal <span class="token keyword">text</span>
          that is projected <span class="token keyword">in</span> the
                  <span class="token keyword">editor</span>
       for every <span class="token keyword">concept</span> <span class="token class-name">of</span> <span class="token keyword">type</span> Text.
            <span class="token punctuation">]</span>
&#125;</code>`}</pre>
<p>
	In the determination of the least indent, the indentation of the closing bracket is also considered. Therefore, the following example will
	take the closing bracket as margin, and even the line <code>for every concept of type Text.</code>
	will be indented with 3 spaces.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/editor-indentation.edit#L37-L45
</span>
    <span class="token punctuation">[</span>
                 This is
               literal <span class="token keyword">text</span>
          that is projected <span class="token keyword">in</span> the
                  <span class="token keyword">editor</span>
       for every <span class="token keyword">concept</span> <span class="token class-name">of</span> <span class="token keyword">type</span> Text.
    <span class="token punctuation">]</span>
&#125;
</code>`}</pre>
<Note>
	<svelte:fragment slot="header">Indentation is incremental</svelte:fragment>
	<svelte:fragment slot="content">
		Any indentation of a property is added to the indentation of the projection of this property. Thus, when a `Text` element is used within
		another projection, the indentation that is defined by the projection in the definition for `Text` will be preceded by any indentation
		defined in the projection for the enclosing concept.
	</svelte:fragment>
</Note>

<PrevNextSection {prevLink} {nextLink} />
