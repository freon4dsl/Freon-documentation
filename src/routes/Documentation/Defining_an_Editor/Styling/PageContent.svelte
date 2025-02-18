<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Styling', visible: false, ref: '#styling-1' },
		{ title: 'Styling the Web Application', visible: false, ref: '#styling-the-web-application-2' },
		{ title: 'Styling the Editor', visible: false, ref: '#styling-the-editor-3' }
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

	let prevLink = '/Documentation/Defining_an_Editor/Fragments';
	let nextLink = '/Documentation/Defining_an_Editor/The_Parser_Projection';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="styling-1" bind:intersecting={visible[0]}>Styling</SectionComponent>
<p>The web application and/or the editor, can be styled using either SCSS or CSS.</p>
<SectionComponent tag="h1" id="styling-the-web-application-2" bind:intersecting={visible[1]}>Styling the Web Application</SectionComponent>
<p>
	The provided <a href="/Documentation/Overview/Getting_Started#a-minimal-webapp-and-server-5">web application</a>
	is build using the <a href="https://sveltematerialui.com/" target="_blank">SMUI</a> UI library. This library uses SCSS, and therefore you need
	to run the preprocessor provided with SMUI for the styling to take effect. To do so, run the following command. When you do not change the
	styles, a single run will suffice. When you, however, do change the styles, you need to rerun this command.
</p>
<pre
	class="language-bash">{@html `<code class="language-bash"><span class="token function">npm</span> run prepare-app   <span class="token comment"># Needed to generate the runtime CSS files. A single run will suffice.</span></code>`}</pre>
<p>
	The <a href="/Documentation/Overview/Getting_Started#example-project-startup-2">example</a>
	and <a href="/Documentation/Overview/Getting_Started#template-project-startup-3">template</a> projects both contain a folder
	<code>style</code>
	that holds the SCSS files that are provided with the projects. There are two sets of styles that determine the look of the web application
	and editor, one for the light theme, and one for the dark theme. The latter can be found in the folder <code>style/dark</code>.
</p>
<p>The styling for the web application can be found in the following files.</p>
<ul>
	<li><code>_app.scss</code>: contains all styling common to both dark and light mode.</li>
	<li><code>_app-theme-light.scss</code>: contains the styling for the light mode.</li>
	<li><code>dark/_app-theme-dark.scss</code>: contains the styling for the dark mode.</li>
	<li><code>_smui_theme.scss</code>: the file used in the <code>npm run prepare-app</code> command for the light mode.</li>
	<li><code>dark/_smui_theme.scss</code>: the file used in the <code>npm run prepare-app</code> command for the dark mode.</li>
</ul>
<SectionComponent tag="h1" id="styling-the-editor-3" bind:intersecting={visible[2]}>Styling the Editor</SectionComponent>
<p>
	Because the minimal <a href="/Documentation/Overview/Getting_Started#a-minimal-webapp-and-server-5">web application</a>
	is provided for your convenience only, the styling of the editor is kept separate from the styling of the web application. When you read the
	<code>_smui-theme.scss</code>
	and <code>dark/_smui-theme.scss</code> files, you will notice that both refer to files that are included in the
	<code>@freon4dsl/core-svelte</code> package.
</p>
<pre class="language-scss">{@html `<code class="language-scss"><span class="token comment">// Styling/_smui-theme.scss#L6-L8</span>

<span class="token keyword">@use</span> <span class="token string">'../node_modules/@freon4dsl/core-svelte/dist/styles/freon.css'</span><span class="token punctuation">;</span>
<span class="token keyword">@use</span> <span class="token string">'../node_modules/@freon4dsl/core-svelte/dist/styles/freon-light.css'</span><span class="token punctuation">;</span>
<span class="token keyword">@use</span> <span class="token string">'app_theme-light'</span><span class="token punctuation">;</span></code>`}</pre>
<p>
	The files from the <code>@freon4dsl/core-svelte</code> package define the values for the styles that are used within the editor. All
	styling that determines color has been divided over <code>freon-light.css</code>
	and <code>freon-dark.css</code>. Other styles are in the file <code>freon.css</code>.
</p>
<p>
	The comments and naming should (hopefully) indicate where each style is being used. For example, the following styles are defined for
	horizontal and vertical lists.
</p>
<pre class="language-scss">{@html `<code class="language-scss"><span class="token comment">// Styling/freon.css#L50-L66</span>

<span class="token selector">.list-component-horizontal </span><span class="token punctuation">&#123;</span>
    <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
    <span class="token property">border-width</span><span class="token punctuation">:</span> 0pt<span class="token punctuation">;</span>
    <span class="token property">border-style</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
    <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token selector">.list-component-vertical </span><span class="token punctuation">&#123;</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
    <span class="token property">border-width</span><span class="token punctuation">:</span> 0pt<span class="token punctuation">;</span>
    <span class="token property">border-style</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 1px<span class="token punctuation">;</span>
    <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<p>
	To change any of the styling, copy the files from the <code>@freon4dsl/core-svelte</code> package into your styles folder and adjust the
	<code>@use</code>
	statement in both <code>_smui-theme.scss</code> files to include your own files instead of the packaged ones. Then start changing the styles
	in your own copies to your liking, however, take care with the boolean and numeric controls, because they are based on Material UI components.
</p>
<ul>
	<li>RadioComponent uses “—mdc-theme-secondary” for its color, if you want to override this value set “—freon-boolean-radiobox-color”.</li>
	<li>CheckComponent uses “—mdc-theme-secondary”, if you want to override it, use “—freon-boolean-checkbox-color”.</li>
	<li>SwitchComponent uses “—mdc-theme-primary”, if you want to override it, set “—freon-boolean-switch-color”.</li>
	<li>NumericSliderComponent uses “—mdc-theme-primary”, if you want to override it, set “—freon-numeric-slider-color”.</li>
	<li>InnerSwitchComponent uses “—mdc-theme-primary”, if you want to override it, set “—freon-boolean-switch-color”.</li>
</ul>

<PrevNextSection {prevLink} {nextLink} />
