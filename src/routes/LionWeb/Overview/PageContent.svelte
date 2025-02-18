<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'LionWeb Integration', visible: false, ref: '#lionweb-integration-1' },
		{ title: 'LionWeb', visible: false, ref: '#lionweb-2' },
		{ title: 'Freon and LionWeb', visible: false, ref: '#freon-and-lionweb-3' }
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

	let prevLink = '/Demo/Overview';
	let nextLink = '/Background';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="lionweb-integration-1" bind:intersecting={visible[0]}>LionWeb Integration</SectionComponent>
<SectionComponent tag="h2" id="lionweb-2" bind:intersecting={visible[1]}>LionWeb</SectionComponent>
<p>
	The LionWeb initiative (see <a target="_blank" href="https://github.com/LionWeb-io">LionWeb @ Github</a>) aims to make language
	engineering tools interoperable on the web. LionWeb does this by specifying
</p>
<ul>
	<li>how language definitions and models can be interchanged in a well-defined JSON format.</li>
	<li>a server protocol for storing and retrieving models in a repository.</li>
</ul>
<p>
	Next to the specification, LionWeb also provides implementations of supporting software in languages like TypeScript, JavaScript, Java,
	Kotlin, C#. These packages support a wide range of functionality like:
</p>
<ul>
	<li>(de)serialization between in-memory models and JSON format</li>
	<li>model diff</li>
	<li>model validation</li>
	<li>etc.</li>
</ul>
<p>
	There also is a <code>lionweb-repository</code> package that implements a LionWeb server for model storage using the LionWeb server protocol.
</p>
<SectionComponent tag="h2" id="freon-and-lionweb-3" bind:intersecting={visible[2]}>Freon and LionWeb</SectionComponent>
<p>The LionWeb idea of interoperability fits perfectly with the basic principles of Freon, to be <em>open</em> and <em>extensible</em>.</p>
<p>Freon uses LionWeb in various ways as described in the secions below.</p>
<p>
	The use of LionWeb allows other tools access not only to the models, but also to the languages that are defined in Freon. It also means
	that there is no lock-in when using Freon. Both the languages and models created with Freon are fully accessible anywhere else.
</p>
<h3 id="store-models-in-lionweb-format-1">Store models in LionWeb Format</h3>
<p>Freon stores models in LionWeb JSON format on the server, allowing other tools to access the models.</p>
<h3 id="using-the-lionweb-repository-2">Using the LionWeb Repository</h3>
<p>
	Optionally use the LionWeb server protocol to store models in the lionweb-repository. This option is still in beta, as we want to do more
	testing.
</p>
<ul>
	<li>
		To run the lionweb-repository see the github page<a target="_blank" href="https://github.com/LionWeb-io/lionweb-repository"
			>https://github.com/LionWeb-io/lionweb-repository</a
		>. Once the lionweb-repository is running, the following two lines in <code>starter.ts</code>
	</li>
</ul>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> ServerCommunication <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@freon4dsl/core"</span><span class="token punctuation">;</span>
WebappConfigurator<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setServerCommunication</span><span class="token punctuation">(</span>ServerCommunication<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code>`}</pre>
<p>need to be changed to:</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> LionWebRepositoryCommunication <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@freon4dsl/core"</span>
WebappConfigurator<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setServerCommunication</span><span class="token punctuation">(</span>LionWebRepositoryCommunication<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}</pre>
<h3 id="convert-freon-language-definition-to-lionweb-3">Convert Freon Language Definition to LionWeb</h3>
<ul>
	<li>Optionally convert the Freon language definition (the .ast files) to a LionWeb language definition in LionWeb JSON format.</li>
	<li>This is done by the following command:</li>
</ul>
<pre
	class="language-bash">{@html `<code class="language-bash">freon lionweb-it <span class="token parameter variable">-d</span> src/defs <span class="token parameter variable">-o</span> src/freon</code>`}</pre>
<p>
	This will create a file <code>src/freon/lionweb/&lt;LanguageName&gt;.json</code> containing the LionWeb definition for
	<code>&lt;languageName&gt;</code>. Note that this is a beta feature.
</p>

<PrevNextSection {prevLink} {nextLink} />
