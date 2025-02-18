<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Customization', visible: false, ref: '#customization-1' },
		{ title: 'Stacked Architecture', visible: false, ref: '#stacked-architecture-2' },
		{ title: 'Customizability of the Fre-tools', visible: false, ref: '#customizability-of-the-fre-tools-3' },
		{ title: 'Adding A Fre-tool', visible: false, ref: '#adding-a-fre-tool-4' },
		{ title: 'Replacing a Fre-tool', visible: false, ref: '#replacing-a-fre-tool-5' }
	];
	let visible: boolean[] = [];
	$: $mySections[0].visible = visible[0];
	$: $mySections[1].visible = visible[1];
	$: $mySections[2].visible = visible[2];
	$: $mySections[3].visible = visible[3];
	$: $mySections[4].visible = visible[4];
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

	let prevLink = '/Documentation/Interpreter_Framework/Understanding_the_Framework';
	let nextLink = '/Documentation/Customizations/Editor_Customization';

	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="customization-1" bind:intersecting={visible[0]}>Customization</SectionComponent>
<p>
	From the five parts of the language definition, Freon generates a work environment containing an editor, a scope provider or scoper, a
	type provider or typer, a validator, a standard library, and some utilities like a parser/deparser. These separate components are called <strong
		>fre-tools</strong
	>. In other parts of the documentation you can find how to fine-tune the generated fre-tools, using the file in the
	<a href="/Documentation/Overview/Getting_Started#template-project-startup-3"><em>defs</em> folder</a>
	(i.e. the folder were you keep your definition files). (See for instance
	<a href="/Documentation/Defining_an_Editor">Defining_an_editor</a>.) In this part we describe how to make further customizations to the
	toolset by writing some TypeScript code.
</p>
<SectionComponent tag="h2" id="stacked-architecture-2" bind:intersecting={visible[1]}>Stacked Architecture</SectionComponent>
<p>
	Customization is possible because of our <strong>stacked architecture</strong>. This architecture makes it possible to create your
	language, and customize it step-by-step in an agile fashion. We follow the following philosophy: The design philosophy that we follow in
	Freon can best be described by the following quote from the well-known graphical user interface designer Alan Kay.
</p>
<blockquote>
	<p>
		<em>Simple things should be simple, complex things should be possible.</em>
		(<a href="https://en.wikipedia.org/wiki/Alan_Kay" target="_blank">Alan Kay, Turing Award Winner</a>)
	</p>
</blockquote>
<p>
	(Read our <a href="/Background">Background</a> to understand why we have chosen this architecture.) Supporting this we use the following levels
	of customization.
</p>
<ol>
	<li>The default level, which is always present.</li>
	<li>
		The definition level, where the fre-tools are being generated based on the input form the definition files (e.g. a <code>.scope</code> file).
	</li>
	<li>The customization level, where handwritten TypeScript code can be added, or used to replace parts of the generated code.</li>
</ol>
<p>It is our aim to provide approximately 80% of the required functionality of the work environment at the first two levels.</p>
<Figure imageName={'documentation/layered-architecture2.png'} caption={'The Stacked Architecture'} figureNumber={1} />
<p>
	Freon combines the definitions for each tool, together with the customized TypeScript code into one application, where the third level
	precedes the second, and the second level precedes the first. For instance, the generated editor will per <a
		href="/Documentation/Creating_the_Metamodel/Language_Structure#concept"><strong>concept</strong></a
	> in the language:
</p>
<ol>
	<li>use the <em>hand-made projection</em> from the Customization level, when this is present. If not, the editor will</li>
	<li>
		use the <em>projection generated from the editor definition</em> from the Freon definition Level, when this definition is present. Finally,
		when no definition is present, the editor will
	</li>
	<li>
		use the <em>default projection</em> from the default level, the one generated when no <code>.edit</code> definition file is present.
	</li>
</ol>
<Figure imageName={'documentation/fall-through.png'} caption={'Projection Lookup for an AST Node'} figureNumber={2} />
<p>
	This stacking allows the language engineer to start quickly with a working (but somewhat rough) language environment and to refine the
	toolset piece by piece on either the second or the third level. For this purpose, the <a
		href="/Documentation/Overview/Getting_Started#the-command-line-interface-8">Command Line Interface</a
	> includes separate commands for generating the different fre-tools.
</p>
<SectionComponent tag="h2" id="customizability-of-the-fre-tools-3" bind:intersecting={visible[2]}
	>Customizability of the Fre-tools</SectionComponent
>
<p>This table gives an overview of the fre-tools, and shows how you can adjust them to your needs.</p>
<table>
	<thead>
		<tr>
			<th align="left">Workbench Part</th>
			<th align="center">Has Default</th>
			<th align="center">Level 2 Definition</th>
			<th align="center">Level 3 Definition</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td align="left">language structure</td>
			<td align="center">no</td>
			<td align="center">.ast</td>
			<td align="center">no</td>
		</tr>
		<tr>
			<td align="left">projectional editor</td>
			<td align="center">yes</td>
			<td align="center">.edit</td>
			<td align="center">yes</td>
		</tr>
		<tr>
			<td align="left">scope provider</td>
			<td align="center">yes</td>
			<td align="center">.scope</td>
			<td align="center">yes</td>
		</tr>
		<tr>
			<td align="left">validator</td>
			<td align="center">yes</td>
			<td align="center">.valid</td>
			<td align="center">yes</td>
		</tr>
		<tr>
			<td align="left">type provider</td>
			<td align="center">yes</td>
			<td align="center">.type</td>
			<td align="center">yes</td>
		</tr>
		<tr>
			<td align="left">interpreter</td>
			<td align="center">no</td>
			<td align="center">none available yet</td>
			<td align="center">yes</td>
		</tr>
		<tr>
			<td align="left">standard library</td>
			<td align="center">yes</td>
			<td align="center">.ast</td>
			<td align="center">not yet</td>
		</tr>
		<tr>
			<td align="left">parser</td>
			<td align="center">yes</td>
			<td align="center">.edit</td>
			<td align="center">yes (using <a href="https://github.com/dhakehurst/net.akehurst.language" target="_blank">AGL</a>)</td>
		</tr>
		<tr>
			<td align="left">unparser</td>
			<td align="center">yes</td>
			<td align="center">.edit</td>
			<td align="center">not yet</td>
		</tr>
		<tr>
			<td align="left">json exporter/importer</td>
			<td align="center">yes</td>
			<td align="center">.ast</td>
			<td align="center">no</td>
		</tr>
		<tr>
			<td align="left">visitor pattern implementation</td>
			<td align="center">yes</td>
			<td align="center">.ast</td>
			<td align="center">can be extended</td>
		</tr>
		<tr>
			<td align="left">web application</td>
			<td align="center">yes</td>
			<td align="center">none available</td>
			<td align="center">can be changed or replaced</td>
		</tr>
	</tbody>
</table>
<p>If you are missing a specific tool or feature, please let us know through info AT freon4dsl.dev.</p>
<SectionComponent tag="h2" id="adding-a-fre-tool-4" bind:intersecting={visible[3]}>Adding A Fre-tool</SectionComponent>
<p>
	As a convenience, Freon generates templates for your customization in the files <code
		>~/freon/editor/CustomYourLanguageNameProjection.ts</code
	>, <code>~/freon/editor/CustomYourLanguageNameActions.ts</code>, etc. (where <code>YourLanguageName</code> is a placeholder for the name of
	the language as defined in your .ast file). You can use these files to add your own special elements.
</p>
<p>
	The custom files can be renamed and/or put it in another location, or you can create your own set of custom projection files. In that
	case, you need to adjust the file <code>~/freon/config/FreonConfiguration</code>.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token comment">// Insurance/src/freon/config/FreonConfiguration.ts</span>

<span class="token comment">// Generated by the Freon Language Generator.</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> FreProjection<span class="token punctuation">,</span> FreCombinedActions<span class="token punctuation">,</span> FreTyper<span class="token punctuation">,</span> FreStdlib<span class="token punctuation">,</span> FreScoper <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@freon4dsl/core"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> CustomInsuranceModelActions<span class="token punctuation">,</span> CustomInsuranceModelProjection <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"../editor/index.js"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> CustomInsuranceModelScoper <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"../scoper/index.js"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> CustomInsuranceModelTyperPart <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"../typer/CustomInsuranceModelTyperPart.js"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> CustomInsuranceModelValidator <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"../validator/index.js"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> CustomInsuranceModelStdlib <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"../stdlib/CustomInsuranceModelStdlib.js"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> InsuranceModelCheckerInterface <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"../validator/gen/index.js"</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * Class FreonConfiguration is the place where you can add all your customisations.
 * These will be used through the 'freonConfiguration' constant by any generated
 * part of your language environment.
 */</span>
<span class="token keyword">class</span> <span class="token class-name">FreonConfiguration</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// add your custom editor projections here</span>
    customProjection<span class="token operator">:</span> FreProjection<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">CustomInsuranceModelProjection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token comment">// add your custom editor actions here</span>
    customActions<span class="token operator">:</span> FreCombinedActions<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">CustomInsuranceModelActions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token comment">// add your custom validations here</span>
    customValidations<span class="token operator">:</span> InsuranceModelCheckerInterface<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">CustomInsuranceModelValidator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token comment">// add your custom scopers here</span>
    customScopers<span class="token operator">:</span> FreScoper<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">CustomInsuranceModelScoper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token comment">// add your custom type-providers here</span>
    customTypers<span class="token operator">:</span> FreTyper<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">CustomInsuranceModelTyperPart</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token comment">// add extra predefined instances here</span>
    customStdLibs<span class="token operator">:</span> FreStdlib<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">CustomInsuranceModelStdlib</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> freonConfiguration <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FreonConfiguration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code>`}</pre>
<SectionComponent tag="h2" id="replacing-a-fre-tool-5" bind:intersecting={visible[4]}>Replacing a Fre-tool</SectionComponent>
<p>
	All fre-tools can be <em>completely replaced</em> at the 3rd level, thereby completely disregarding the default and definition levels.
	This is done by implementing their respective <a href="/Documentation/Under_the_Hood/FreTool_Interfaces">interfaces</a>.
</p>
<p>For the parser and unparser this is currently the only way to customize. More information on the interfaces can be found here:</p>
<ul>
	<li><a href="/Documentation/Under_the_Hood/FreTool_Interfaces#frescoper-3">FreScoper</a></li>
	<li><a href="/Documentation/Under_the_Hood/FreTool_Interfaces#fretyper-5">FreTyper</a></li>
	<li><a href="/Documentation/Under_the_Hood/FreTool_Interfaces#frevalidator-4">FreValidator</a></li>
	<li><a href="/Documentation/Under_the_Hood/FreTool_Interfaces#frereader-6">FreReader</a></li>
	<li><a href="/Documentation/Under_the_Hood/FreTool_Interfaces#frewriter-7">FreWriter</a></li>
	<li><a href="/Documentation/Under_the_Hood/FreTool_Interfaces#frestdlib-8">FreStdlib</a></li>
</ul>

<PrevNextSection {prevLink} {nextLink} />
