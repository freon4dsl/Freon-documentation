<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [{ title: 'Freon Terminology', visible: false, ref: '#freon-terminology-1' }];
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

	let prevLink = '/Documentation/Under_the_Hood/FreTool_Interfaces';
	let nextLink = '/Tutorial';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="freon-terminology-1" bind:intersecting={visible[0]}>Freon Terminology</SectionComponent>
<table>
	<thead>
		<tr>
			<th>Phrase</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>abstract syntax tree</td>
			<td>An internal representation the model, a tree of nodes, each of which is an instance of a structural element of the language.</td>
		</tr>
		<tr>
			<td>action</td>
			<td>Certain behaviour of the editor, for instance, the reaction to a key stroke.</td>
		</tr>
		<tr>
			<td>AST</td>
			<td>Abstract Syntax Tree</td>
		</tr>
		<tr>
			<td>ast file</td>
			<td>File containing the definition of the metamodel of the language. The extension must be ‘.ast’.</td>
		</tr>
		<tr>
			<td>box</td>
			<td>A TypeScript class that represents a rectangle on the editor screen.</td>
		</tr>
		<tr>
			<td>box tree / box model</td>
			<td>A tree of boxes that represent the appearance of a model in the editor</td>
		</tr>
		<tr>
			<td>concept</td>
			<td>A structural element in the language.</td>
		</tr>
		<tr>
			<td>concrete syntax tree</td>
			<td>A tree of elements that represent the appearance of a model. In Freon, it is equal to the box model.</td>
		</tr>
		<tr>
			<td>conformsto</td>
			<td
				>A predefined function in the typer, which defines that a certain type conforms to another type. The function can also be used in
				the validator.</td
			>
		</tr>
		<tr>
			<td>CST</td>
			<td>Concrete Syntax Tree</td>
		</tr>
		<tr>
			<td>custom scoper</td>
			<td>A scoper that is written in TypeScript and either augments or replaces the Freon scoper.</td>
		</tr>
		<tr>
			<td>custom typer</td>
			<td>A typer that is written in TypeScript and either augments or replaces the Freon typer.</td>
		</tr>
		<tr>
			<td>edit file</td>
			<td>File containing the definition of the editors, or projection sets of the language. The extension must be ‘.edit’.</td>
		</tr>
		<tr>
			<td>editor</td>
			<td>A loosely used term to refer to the runtime tool in the browser, or to a certain projection set.</td>
		</tr>
		<tr>
			<td>enumeration</td>
			<td>See limited concept.</td>
		</tr>
		<tr>
			<td>equalsto</td>
			<td
				>A predefined function in the typer, which defines that a certain type is considered to be equal to another type. The function can
				also be used in the validator.</td
			>
		</tr>
		<tr>
			<td>expression concept</td>
			<td>A structural element in the language that can be used as an expression.</td>
		</tr>
		<tr>
			<td>external component</td>
			<td>A Svelte component that is added by the language engineer to the Freon projection(s).</td>
		</tr>
		<tr>
			<td>fragment</td>
			<td>A part of a projection definition.</td>
		</tr>
		<tr>
			<td>inference rule</td>
			<td>A built-in function in the typer definition that defines the type of a term.</td>
		</tr>
		<tr>
			<td>interpreter</td>
			<td
				>A tool that takes the AST (the represeantation of the model) and calculates a value to be associated with certain terms in the
				model.</td
			>
		</tr>
		<tr>
			<td>is-unique rule</td>
			<td
				>A built-in function in the validator definition that defines a check on whether all elements in a list are unique. (Making the list
				a strict set.)</td
			>
		</tr>
		<tr>
			<td>language engineer</td>
			<td>The person using Freon to create a DSL and the tools to use the DSL.</td>
		</tr>
		<tr>
			<td>limited concept</td>
			<td
				>A structural element in the language, that can only have a limited number of predefined instances. A more extensive version of an
				enumeration.</td
			>
		</tr>
		<tr>
			<td>metamodel</td>
			<td>The definition of the structure of the language, i.e. which kind of elements are part of the language and how they relate.</td>
		</tr>
		<tr>
			<td>model</td>
			<td>An instance of the language metamodel, like an object is an instance of a class. The model is what the user is interested in.</td>
		</tr>
		<tr>
			<td>model unit</td>
			<td>Part of a model that can be edited, or otherwise handled, separately from the rest of the model.</td>
		</tr>
		<tr>
			<td>named editor</td>
			<td>A projection set.</td>
		</tr>
		<tr>
			<td>named property projection</td>
			<td>A single projection in a (named) projection set.</td>
		</tr>
		<tr>
			<td>namespace</td>
			<td>A structural element that is the container for a set of names of parts of the model.</td>
		</tr>
		<tr>
			<td>namespace addition</td>
			<td>A built-in function in the scoper definition that adds the set of names from one namespace to another namespace.</td>
		</tr>
		<tr>
			<td>not-empty rule</td>
			<td>A built-in function in the validator definition that defines a check on whether a list is empty.</td>
		</tr>
		<tr>
			<td>precedence of projections</td>
			<td>In a set of projections for the same concept, the priority of one projection sover the other.</td>
		</tr>
		<tr>
			<td>projection</td>
			<td>A definition of how a single structural element in the language should appear on the screen or in text.</td>
		</tr>
		<tr>
			<td>projection set</td>
			<td>A named set of projection definitions, one per structural element in the language.</td>
		</tr>
		<tr>
			<td>scope provider</td>
			<td>A piece of code that is able to determine for each term in the model which names of other elements of the model are visible.</td>
		</tr>
		<tr>
			<td>scoper</td>
			<td>The Freon name for scope provider.</td>
		</tr>
		<tr>
			<td>scoper file</td>
			<td>File containing the definition of the scope provider for the language. The extension must be ‘.scope’.</td>
		</tr>
		<tr>
			<td>symbol</td>
			<td>The concrete syntax to be used for the operator in a binary expression. For instance the ’+’ in ‘4+5’.</td>
		</tr>
		<tr>
			<td>term</td>
			<td>Part of a model that can be associated with a type (using a typer), or with a value (using an interpreter).</td>
		</tr>
		<tr>
			<td>trigger</td>
			<td>The key stroke, or series of key strokes, that the user must enter to let the editor perform a certain function.</td>
		</tr>
		<tr>
			<td>type checking rule</td>
			<td>A built-in function in the validator definition that defines a check on whether a term has a certain type.</td>
		</tr>
		<tr>
			<td>type concept</td>
			<td>A concept that is not part of the AST, but is needed to provide the type of a term.</td>
		</tr>
		<tr>
			<td>type provider</td>
			<td>A piece of code that is able to determine for each term in the model which type to associate with that term.</td>
		</tr>
		<tr>
			<td>typer</td>
			<td>The Freon name for type provider.</td>
		</tr>
		<tr>
			<td>typer file</td>
			<td>File containing the definition of the type provider for the language. The extension must be ‘.type’.</td>
		</tr>
		<tr>
			<td>user</td>
			<td>The person using the tools, i.e. editor, scoper, etc, to create models in a certain DSL.</td>
		</tr>
		<tr>
			<td>valid file</td>
			<td>File containing the definition of the validator for the language. The extension must be ‘.valid’.</td>
		</tr>
		<tr>
			<td>validator</td>
			<td>A piece of code that is able to determine for each term in the model whether the term is correct or erroneous.</td>
		</tr>
		<tr>
			<td>valid-identifier-rule</td>
			<td>A built-in function in the validator definition that defines a check on whether a string is a valid identifier.</td>
		</tr>
		<tr>
			<td>where-clause</td>
			<td
				>A part of a typer definition that defines conditions for all properties of a concept. It is used in ‘equalsto’ and ‘conformsto’
				definitions.</td
			>
		</tr>
	</tbody>
</table>

<PrevNextSection {prevLink} {nextLink} />
