<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Installing and Using Freon', visible: false, ref: '#installing-and-using-freon-1' },
		{ title: 'Creating a Project', visible: false, ref: '#creating-a-project-2' },
		{ title: 'Opening and Using the Editor', visible: false, ref: '#opening-and-using-the-editor-3' },
		{ title: 'Changing the DSL', visible: false, ref: '#changing-the-dsl-4' },
		{ title: 'Project Structure', visible: false, ref: '#project-structure-5' },
		{ title: 'A Minimal Webapp and Server', visible: false, ref: '#a-minimal-webapp-and-server-6' },
		{ title: 'The Five Definition Files', visible: false, ref: '#the-five-definition-files-7' },
		{ title: 'Step-by-step Language Creation', visible: false, ref: '#step-by-step-language-creation-8' },
		{ title: 'The Command Line Interface', visible: false, ref: '#the-command-line-interface-9' }
	];
	let visible: boolean[] = [];
	$: $mySections[0].visible = visible[0];
	$: $mySections[1].visible = visible[1];
	$: $mySections[2].visible = visible[2];
	$: $mySections[3].visible = visible[3];
	$: $mySections[4].visible = visible[4];
	$: $mySections[5].visible = visible[5];
	$: $mySections[6].visible = visible[6];
	$: $mySections[7].visible = visible[7];
	$: $mySections[8].visible = visible[8];
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

	let prevLink = '/Documentation/Overview';
	let nextLink = '/Documentation/Overview/Running_Example';

	import Note from '$lib/notes/Note.svelte';
	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="installing-and-using-freon-1" bind:intersecting={visible[0]}>Installing and Using Freon</SectionComponent>
<p>
	Get ready to use Freon by having <a href="https://nodejs.org/" target="_blank">node.js</a>
	and <a href="https://yarnpkg.com/" target="_blank">npm</a>
	installed. We are typically using the latest versions of all, although older versions likely work just as well. You could also try other packages
	managers instead of npm.
</p>
<SectionComponent tag="h2" id="creating-a-project-2" bind:intersecting={visible[1]}>Creating a Project</SectionComponent>
<p>The best way to create a Freon project is to use the command:</p>
<pre class="language-bash">{@html `<code class="language-bash">  <span class="token function">npm</span> create freon@latest</code>`}</pre>
<p>
	You will be asked to select any of the languages used in this documentation, or the <code>StarterLanguage</code> for an empty language
	project. The project will be located in the <code>./DSL-name</code> directory , where <code>DSL-name</code> is the name of the language
	you have chosen. It will also install all required packages (<code>npm install</code>), and run the Freon generator, generating code in
	<code>src/freon</code>
	(<code>npm run build</code>):
</p>
<SectionComponent tag="h2" id="opening-and-using-the-editor-3" bind:intersecting={visible[2]}>Opening and Using the Editor</SectionComponent
>
<p>
	To start working with the Freon editor, first start the file server (any parts of the model that are saved in the editor will be stored by
	the server in <code>~/modelstore</code>):
</p>
<pre class="language-bash">{@html `<code class="language-bash">  <span class="token function">npm</span> run server</code>`}</pre>
<p>Next, open another (bash) terminal, and start the generated editor from it:</p>
<pre
	class="language-bash">{@html `<code class="language-bash">  <span class="token function">npm</span> run prepare-app   <span class="token comment"># Generates the runtime CSS files. A single run will suffice.</span>
  <span class="token function">npm</span> run dev           <span class="token comment"># Builds and serves the page with the Freon editor.</span></code>`}</pre>
<p>
	The last command shows a URL that you can open in your preferred browser. The web page contains the generated editor for the language in
	your project.
</p>
<Note>
	<svelte:fragment slot="header">Use a recent browser version</svelte:fragment>
	<svelte:fragment slot="content">
		Please, use a recent version of a browser like Chrome or Edge, because we cannot ensure that the editor functions as it should in older
		browsers.
	</svelte:fragment></Note
>
<Note
	><svelte:fragment slot="header">Use Help Menu</svelte:fragment><svelte:fragment slot="content">
		For easier use of the editor, have a look at the key-bindings under the <em>Help</em> menu.
	</svelte:fragment></Note
>
<SectionComponent tag="h2" id="changing-the-dsl-4" bind:intersecting={visible[3]}>Changing the DSL</SectionComponent>
<p>
	Now that everything is running, you can go to the <code>src/defs</code> folder, and change the Freon definition files. After changing the
	files in <code>src/defs</code> you need to re-run the generator, and you will see the newly generated files appearing in the
	<code>~/src/freon</code> folder. The following command re-runs the generator, and compiles the newly generated files:
</p>
<pre class="language-bash">{@html `<code class="language-bash">  <span class="token function">npm</span> run build</code>`}</pre>
<p>
	In order to speed up your development cycle the <code>npm run dev</code>
	command has the -watch flag set, so the webpage in the browser should be updated as well.
</p>
<Note>
	<svelte:fragment slot="header">Speedy Development Cycle</svelte:fragment>
	<svelte:fragment slot="content">
		<p>
			When developing a DSL, you often regenerate the Freon editor to reflect the changes made in the metamodel (.ast files), and/or other
			definitions. Beside the -watch flag being set, your development cycle can also be made more expedient by using the following as
			address in the web browser: <code>http://localhost:8080/?model=TestModel</code>, where `TestModel` stands for the name of the model
			that you are using to test your language definition and editor with. Thus, the browser responds to any regeneration with opening your
			test model instantaneously.
		</p>
	</svelte:fragment></Note
>
<Note>
	<svelte:fragment slot="header">WebStorm Tip</svelte:fragment>
	<svelte:fragment slot="content">
		If you are working with WebStorm, you might consider installing the plugin <a
			href="https://plugins.jetbrains.com/plugin/7677-awesome-console"
			target="_blank">Awesome Console</a
		>. This plugin redirects a click on an error message in the console to the correct position in any of the language definition files.
	</svelte:fragment></Note
>
<SectionComponent tag="h2" id="project-structure-5" bind:intersecting={visible[4]}>Project Structure</SectionComponent>
<p>The code in a Freon project under <code>~/src</code> is organised into the following subfolders.</p>
<ul>
	<li><strong>defs</strong>: the language definition files.</li>
	<li>
		<strong>freon</strong>: the generated source code.
		<ul>
			<li><strong>…/commandline</strong>: code that provides commandline access to models in the language.</li>
			<li>
				<strong>…/config</strong>: code that provides the coupling between all parts of the generated workbench. This folder contains one
				file that will not be overwritten at regeneration: <code>FreonConfiguration.ts</code>. Here you can configure any
				<a href="/Documentation/Customizations">customization</a> that you want the generated code to take into account.
			</li>
			<li>
				<strong>…/diagrams</strong>: a number of UML diagrams generated from the language structure including a UML class diagram of the
				AST, an overview of all inheritance in the language, and one diagram per .ast file. You all of them both in ordinary HTML and in
				Markdown format. In the future we plan to make the generation customizable.
			</li>
			<li>
				<strong>…/editor</strong>: code for the editor. This folder contains two files that will not be overwritten at regeneration:
				<code>CustomYourLanguageNameActions.ts</code>
				and <code>CustomYourLanguageNameProjection.ts</code>. (<code>YourLanguageName</code> will be replaced by the name you have given
				your language in the .ast files.) These two files are the placeholders for any
				<a href="/Documentation/Customizations">customization</a> that you would like to do.
			</li>
			<li>
				<strong>…/interpreter</strong>: code that implements an interpreter <a href="/Examples/Building_an_Interpreter">interpreter</a> for the
				language.
			</li>
			<li><strong>…/language</strong>: code that implements the language structure.</li>
			<li>
				<strong>…/reader</strong>: a parser that is able to read <a href="/Background#models-and-model-units-4">model units</a>
				from a text string or file.
			</li>
			<li><strong>…/scoper</strong>: code for that determines which elements are visible for a certain element in the user’s model.</li>
			<li>
				<strong>…/stdlib</strong>: code that implements some standard elements of your language, for instance
				<a href="/Documentation/Creating_the_Metamodel/Language_Structure">limited concepts</a>.
			</li>
			<li>
				<strong>…/typer</strong>: code that that determines which type is associated with a certain element in the user’s model. The file
				<code>CustomYourLanguageNameTyperPart.ts</code>
				is the placeholder for any <a href="/Documentation/Customizations">customization</a> that you would like to do.
			</li>
			<li><strong>…/utils</strong>: a default implementation of a visitor for your user’s model.</li>
			<li>
				<strong>…/validator</strong>: code that determines whether certain parts of your user’s model contain errors. The file
				<code>CustomYourLanguageNameValidator.ts</code>
				is the placeholder for any <a href="/Documentation/Customizations">customization</a> that you would like to do.
			</li>
			<li>
				<strong>…/writer</strong>: code that is able to write your user’s <a href="/Background#models-and-model-units-4">model units</a>
				in string format to a file.
			</li>
		</ul>
	</li>
	<li><strong>external</strong>: any external Svelte components and the code to plug these into Freon.</li>
	<li><strong>style</strong>: All CSS and SCSS file for <a href="/Documentation/Defining_an_Editor/Styling">styling Freon</a>.</li>
	<li><strong>starter.ts</strong>: the startup code for the web editor</li>
	<li><strong>logger.ts</strong>: Code to turn logging on or off, used for debugging.</li>
</ul>
<p>In the root of the project the following folder is also needed:</p>
<ul>
	<li>
		<strong>modelstore</strong> This folder is where the simple server stores all models. If it is not there, the server will create it at
		startup. Each model is stored in a folder in which you can find its model units as separate <code>.json</code> files in
		<a href="/LionWeb/Overview">LionWeb</a> format.
	</li>
</ul>
<Note>
	<svelte:fragment slot="header">Be careful with handmade changes in <i>src/freon</i>.</svelte:fragment>
	<svelte:fragment slot="content">
		The contents of all folders in <code>src/freon</code> is organized into two types of files: those located directly in the folder
		(typically TypeScript classes) and those within the <code>gen</code> subfolder. Files in the <code>gen</code> subfolder are always deleted
		before regeneration, so avoid placing important code In contrast, files directly within the folder remain unchanged during regeneration.
	</svelte:fragment>
</Note>
<SectionComponent tag="h2" id="a-minimal-webapp-and-server-6" bind:intersecting={visible[5]}>A Minimal Webapp and Server</SectionComponent>
<p>
	The Freon projectional web editor needs to be embedded in an application to work properly. It also needs a server that allows to store and
	retrieve the models the user creates in the editor.
</p>
<p>
	For the server we provide a minimal implementation for your convenience. We also provide a complete web application to embed the Freon
	editor.
</p>
<p>
	However, we anticipate that in the context where Freon is used, these components usually need to be replaced with appropriate solutions
	that are for the company or organization where it is being used.
</p>
<p>Note that Freon can optionally use the <a href="/LionWeb/Overview">LionWeb repository</a>.</p>
<SectionComponent tag="h2" id="the-five-definition-files-7" bind:intersecting={visible[6]}>The Five Definition Files</SectionComponent>
<p>A Freon language definition can have five parts:</p>
<ol>
	<li>
		<a href="/Documentation/Creating_the_Metamodel">The AST file</a>: the abstract syntax tree (AST) or metamodel is defined in files with
		extension <code>.ast</code>.
	</li>
	<li>
		<a href="/Documentation/Defining_an_Editor">The Edit file</a>: the concrete syntax (CST), or editor definition, is defined in files with
		extension <code>.edit</code>.
	</li>
	<li>
		<a href="/Documentation/Scoping,_Typing,_and_Validating/Scope_Provider">The Scope file</a>: the scope rules are defined in files with
		extension <code>.scope</code>.
	</li>
	<li>
		<a href="/Documentation/Scoping,_Typing,_and_Validating/Type_Provider">The Type file</a>: the typing rules are defined in files with
		extension <code>.type</code>.
	</li>
	<li>
		<a href="/Documentation/Scoping,_Typing,_and_Validating/Validator">The Validation file:</a>: the validation rules are defined in files
		with extension <code>.valid</code>.
	</li>
</ol>
<p>
	And yes, you can use multiple files to define one of the parts. For instance, Freon will combine multiple .ast files into one AST
	definition, and multiple .scope files into one scope definition.
</p>
<p>
	See the <a href="/Documentation/Overview">Documentation</a> and the <a href="/Tutorial/Overview">Tutorial</a>
	for a detailed description of the five language parts.
</p>
<SectionComponent tag="h2" id="step-by-step-language-creation-8" bind:intersecting={visible[7]}
	>Step-by-step Language Creation</SectionComponent
>
<p>
	There is no need to write all the five definition files right from the start. The only one that is mandatory is the language structure
	(.ast). Freon will generate defaults for all the other elements. This is what we call the Default Level of the <a
		href="/Documentation/Customizations">three levels of customization</a
	>.
</p>
<SectionComponent tag="h2" id="the-command-line-interface-9" bind:intersecting={visible[8]}>The Command Line Interface</SectionComponent>
<p>
	The Freon commandline tool generates code from the various definition files. If you type ‘<code>freon</code>’ in a (bash) terminal you
	will see the following overview of the different arguments that can be used. For detailed help about a specific command, type: ‘<code
		>freon &lt;command&gt; -h</code
	>’.
</p>
<Note>
	<svelte:fragment slot="header">Incomplete code</svelte:fragment>
	<svelte:fragment slot="content">
		<p>
			Keep in mind that all commands, except <code>all</code>, when used individually (i.e., without combining them with others), produce
			code that may not compile correctly. For example, the <code>scoper</code>
			and <code>validator</code> may depend on the <code>typer</code> and attempt to reference its class, which might not yet be generated.
			Similarly, the <code>editor</code> may try to include the <code>scoper</code>.
		</p>
		<p>
			To avoid such issues, it is best to start with the <code>all</code> command. Once this has been run, you can use specific commands for
			individual aspects of your language as needed. This approach ensures correct dependencies while minimizing regeneration time.
		</p>
	</svelte:fragment>
</Note>
<pre class="language-bash">{@html `<code class="language-bash">freon <span class="token parameter variable">-h</span>
usage: freon <span class="token punctuation">[</span>-h<span class="token punctuation">]</span> <span class="token punctuation">[</span>-v<span class="token punctuation">]</span> <span class="token punctuation">[</span>-w<span class="token punctuation">]</span> <span class="token operator">&lt;</span>command<span class="token operator">></span> <span class="token punctuation">..</span>.

Freon toolset <span class="token keyword">for</span> generating languages, scopers, editors, etc.

Positional arguments:
  <span class="token operator">&lt;</span>command<span class="token operator">></span>
    all          Generates the TypeScript code <span class="token keyword">for</span> all parts of the work
                 environment <span class="token keyword">for</span> your language, plus some diagrams that show
                 the AST
    ast-it       Generates the TypeScript code <span class="token keyword">for</span> your language
    edit-it      Generates the typeScript code <span class="token keyword">for</span> the projectional editor
                 <span class="token keyword">for</span> your language
    parse-it     Generates the typeScript code <span class="token keyword">for</span> the reader and writer of
                 your language
    diagram-it   Generates Mermaid diagrams of the AST of your language
    scope-it     Generates the TypeScript code <span class="token keyword">for</span> the scoper <span class="token keyword">for</span> your
                 language
    validate-it  Generates the TypeScript code <span class="token keyword">for</span> the validator <span class="token keyword">for</span> your
                 language
    type-it      Generates the TypeScript code <span class="token keyword">for</span> the typer <span class="token keyword">for</span> your language
    interpret-it
                 Generates interpreter <span class="token keyword">for</span> your language
    clean-it     Removes the generated TypeScript code <span class="token keyword">for</span> all parts of the
                 work environment <span class="token keyword">for</span> your language

Optional arguments:
  -h, <span class="token parameter variable">--help</span>     Show this <span class="token builtin class-name">help</span> message and exit.
  -v, <span class="token parameter variable">--verbose</span>  Show extra logging detail
  -w, <span class="token parameter variable">--watch</span>    Start generator <span class="token keyword">in</span> <span class="token function">watch</span> mode <span class="token punctuation">(</span>only <span class="token keyword">in</span> combination with
                 <span class="token string">'all'</span><span class="token punctuation">)</span>

For detailed <span class="token builtin class-name">help</span> about a specific command, use: freon <span class="token operator">&lt;</span>command<span class="token operator">></span> <span class="token parameter variable">-h</span>
</code>`}</pre>

<PrevNextSection {prevLink} {nextLink} />
