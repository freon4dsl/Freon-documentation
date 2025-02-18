<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Scope Provider', visible: false, ref: '#scope-provider-1' },
		{ title: 'Namespaces', visible: false, ref: '#namespaces-2' },
		{ title: 'Namespace Additions', visible: false, ref: '#namespace-additions-3' },
		{ title: 'Alternative Scopes', visible: false, ref: '#alternative-scopes-4' }
	];
	let visible: boolean[] = [];
	$: $mySections[0].visible = visible[0];
	$: $mySections[1].visible = visible[1];
	$: $mySections[2].visible = visible[2];
	$: $mySections[3].visible = visible[3];
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

	let prevLink = '/Documentation/Scoping,_Typing,_and_Validating';
	let nextLink = '/Documentation/Scoping,_Typing,_and_Validating/Type_Provider';

	import Note from '$lib/notes/Note.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="scope-provider-1" bind:intersecting={visible[0]}>Scope Provider</SectionComponent>
<p>
	Scoping is about the question of which names are accessible/visible where. In the general case, all names in a context are divided into
	sets, called <strong>namespaces</strong>. These sets do not overlap, but there can be subsets.
</p>
<p>
	The <strong>scope provider</strong> (or <strong>scoper</strong>, for short) definition provides the information necessary to determine
	which names are in which set. Any part of the scoper definition must be included in a file with the extension <code>.scope</code>. All
	files with this extension in the <a href="/Documentation/Overview/Getting_Started#template-project-startup-3"><em>defs</em> folder</a>
	(i.e. the folder were you keep your definition files) are combined into one scoper definition.
</p>
<SectionComponent tag="h2" id="namespaces-2" bind:intersecting={visible[1]}>Namespaces</SectionComponent>
<p>The default scoper simply regards the model of your user as the one and only namespace.</p>
<p>
	However, in the scoper definition you can mark a list of concepts to be <strong>namespaces</strong>. Every <em>namespace</em> holds its own
	set of visible names. Any namespace shadows the visible names from its surrounding namespace (using lexical scope), which means that if name
	A is both in the outer, and in the inner namespace, in the inner namespace only the inner name is used.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/scoper-docu.scope#L3-L3
</span>
<span class="token class-name">isnamespace</span> &#123; InsuranceProduct, BaseProduct, CalcFunction, Entity &#125;</code>`}</pre>
<p>
	Interfaces can be namespaces as well. Any instance of a concept that implements this interface will also be regarded to be a namespace,
	but only the names of the properties of the interface will be included.
</p>
<Note>
	<svelte:fragment slot="header">Each model unit is a namespace.</svelte:fragment>
	<svelte:fragment slot="content">On all Levels of Customizations model units are always considered to be namespaces.</svelte:fragment>
</Note>
<SectionComponent tag="h2" id="namespace-additions-3" bind:intersecting={visible[2]}>Namespace Additions</SectionComponent>
<p>
	The standard namespaces can be added to. In that case, the visible elements from the addition are included. By indicating an addition to a
	namespace you can, for instance, support inheritance. In the following example,
	<code>baseEntity</code> is in the language structure definition (<code>.ast</code> file) defined to be the super type of the
	<code>Entity</code>
	concept. The names visible in the <code>baseEntity</code>
	are included in the namespace by defining the namespace-addition.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-extras.ast#L34-L38
</span>
<span class="token keyword">concept</span> <span class="token class-name">Entity</span> &#123;
    isCompany: <span class="token builtin">boolean</span>;
    name: <span class="token builtin">identifier</span>;
    <span class="token keyword">reference</span> baseEntity?: <span class="token class-name">Entity</span>;
&#125;</code>`}</pre>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/scoper-docu.scope#L13-L15
</span>
<span class="token class-name">Entity</span> &#123;
    <span class="token keyword">namespace_addition</span> = <span class="token variable">self</span>.baseEntity;
&#125;</code>`}</pre>
<SectionComponent tag="h2" id="alternative-scopes-4" bind:intersecting={visible[3]}>Alternative Scopes</SectionComponent>
<p>
	You can also indicate that a different namespace altogether should be used. In the following example, the elements visible in an <code
		>AttributeRef</code
	> are determined based on the type of its container, i.e. the type of its parent in the AST.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/scoper-docu.scope#L9-L11
</span>
<span class="token class-name">AttributeRef</span> &#123;
	<span class="token keyword">scope</span> = <span class="token keyword">typeof</span>( <span class="token keyword">container</span> );
&#125;</code>`}</pre>

<PrevNextSection {prevLink} {nextLink} />
