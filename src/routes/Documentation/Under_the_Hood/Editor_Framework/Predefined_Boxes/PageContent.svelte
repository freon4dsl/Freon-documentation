<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Boxes', visible: false, ref: '#boxes-1' },
		{ title: 'Primitive Boxes', visible: false, ref: '#primitive-boxes-2' },
		{ title: 'Grouping Boxes', visible: false, ref: '#grouping-boxes-3' }
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

	let prevLink = '/Documentation/Under_the_Hood/Editor_Framework';
	let nextLink = '/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="boxes-1" bind:intersecting={visible[0]}>Boxes</SectionComponent>
<p>
	A Box is an abstract class describing the features that are common for all boxes. As explained in the <a
		href="/Documentation/Under_the_Hood/Editor_Framework">editor framework</a
	>, each box has a mandatory model node and role. The following predefined boxes are available.
</p>
<table>
	<thead>
		<tr>
			<th>Primitive Boxes</th>
			<th>Grouping Boxes</th>
			<th>Boxes for External Components</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>ActionBox</td>
			<td>FragmentBox</td>
			<td>ExternalBooleanBox</td>
		</tr>
		<tr>
			<td>AliasBox</td>
			<td>GridBox</td>
			<td>ExternalNumberBox</td>
		</tr>
		<tr>
			<td>BooleanControlBox</td>
			<td>GridCellBox</td>
			<td>ExternalPartBox</td>
		</tr>
		<tr>
			<td>ButtonBox</td>
			<td>HorizontalLayoutBox</td>
			<td>ExternalPartListBox</td>
		</tr>
		<tr>
			<td>EmptyLineBox</td>
			<td>HorizontalListBox</td>
			<td>ExternalRefBox</td>
		</tr>
		<tr>
			<td>IndentBox</td>
			<td>OptionalBox</td>
			<td>ExternalRefListBox</td>
		</tr>
		<tr>
			<td>LabelBox</td>
			<td>TableBox</td>
			<td>ExternalSimpleBox</td>
		</tr>
		<tr>
			<td>NumberControlBox</td>
			<td>TableCellBox</td>
			<td>ExternalStringBox</td>
		</tr>
		<tr>
			<td>LimitedControlBox</td>
			<td>TableRowBox</td>
			<td>BooleanWrapperBox</td>
		</tr>
		<tr>
			<td>MultiLineTextBox</td>
			<td>VerticalLayoutBox</td>
			<td>FragmentWrapperBox</td>
		</tr>
		<tr>
			<td>SelectBox</td>
			<td>VerticalListBox</td>
			<td>NumberWrapperBox</td>
		</tr>
		<tr>
			<td>SvgBox</td>
			<td></td>
			<td>PartWrapperBox</td>
		</tr>
		<tr>
			<td>TextBox</td>
			<td></td>
			<td>PartListWrapperBox</td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td>RefWrapperBox</td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td>RefListWrapperBox</td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td>StringWrapperBox</td>
		</tr>
	</tbody>
</table>
<p>
	All box types have a corresponding Component that renders the box in the browser. These components are build with <a
		href="https://svelte.dev"
		target="_blank">Svelte</a
	>. In the source code the box implementations reside in the package <code>core</code>, whereas the components reside in
	<code>core-svelte</code>. The Freon core package offers several utilities to create boxes, for instance in custom projections.
</p>
<p>
	The boxes for external components are explained in <a href="/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types"
		>External Component Box Types</a
	>.
</p>
<SectionComponent tag="h2" id="primitive-boxes-2" bind:intersecting={visible[1]}>Primitive Boxes</SectionComponent>
<p>Primitive boxes do not have other boxes as content. A primitive box is used to project a primitive AST node in the editor.</p>
<h3 id="actionbox-1">ActionBox</h3>
<p>
	An <code>ActionBox</code> is used to offer the user the option of executing an action, for instance the addition of an optional node. It has
	a placeholder text that is shown, and a dropdown menu that offers the various actions. Actions are coupled to the box based on the role.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">new</span> <span class="token class-name">ActionBox</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> <span class="token string">"optional-init"</span><span class="token punctuation">,</span> <span class="token string">"init"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}</pre>
<h3 id="aliasbox-2">AliasBox</h3>
<p>
	An <code>AliasBox</code> is a box where the user can type text (printable characters). Usually this text is a trigger for some action. All
	actions that have this <em>trigger</em> and are defined for the <em>role</em> of this alias box, are possible. An alias box has a placeholder
	string, that can either be a visible indication of what could be entered, or it could be invisible, when the placeholder is an empty string
	or consists of whitespace only.
</p>
<p>
	An example of the use of an alias box is before and after an expression. The alias boxes there enable the user to type in an addition to
	the expression, changing, for instance, <code>4 + 5</code> into <code>3 * 4 + 5</code>.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">new</span> <span class="token class-name">AliasBox</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> <span class="token string">'role'</span><span class="token punctuation">,</span> <span class="token string">'['</span> <span class="token operator">+</span> property <span class="token operator">+</span> <span class="token string">']'</span><span class="token punctuation">,</span> <span class="token punctuation">&#123;</span>
	propertyName<span class="token operator">:</span> property
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}</pre>
<h3 id="booleancontrolbox-3">BooleanControlBox</h3>
<p>
	A <code>BooleanControlBox</code> is a box that shows a property of type boolean using an HTML input control, such as a radio button. The
	<code>getBoolean</code>
	and <code>setBoolean</code> in the below example are functions that set and get the value of the boolean property, respectively. They adhere
	to the following interface.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token function-variable function">getBoolean</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token function-variable function">setBoolean</span><span class="token operator">:</span> <span class="token punctuation">(</span>newValue<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span><span class="token punctuation">;</span></code>`}</pre>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">new</span> <span class="token class-name">BooleanControlBox</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> <span class="token string">'role'</span><span class="token punctuation">,</span> getBoolean<span class="token punctuation">,</span> setBoolean<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}</pre>
<h3 id="buttonbox-4">ButtonBox</h3>
<p>A <code>ButtonBox</code> is a box that shows a button with the given text as label.</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">new</span> <span class="token class-name">ButtonBox</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> <span class="token string">"Text-on-button"</span><span class="token punctuation">,</span> <span class="token string">'role'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}</pre>
<h3 id="emptylinebox-5">EmptyLineBox</h3>
<p>An <code>EmptyLineBox</code> is a box that shows an HTML linebreak.</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">new</span> <span class="token class-name">EmptyLineBox</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> <span class="token string">'role'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}</pre>
<h3 id="indentbox-6">IndentBox</h3>
<p>An <code>IndentBox</code> shows white space to indent other boxes.</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">new</span> <span class="token class-name">IndentBox</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> <span class="token string">'role'</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> childBox<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}</pre>
<h3 id="labelbox-7">LabelBox</h3>
<p>
	A <code>LabelBox</code> shows a non-editable text. The text itself can either be a fixed string (1), or it can be defined as a function (2).
	Being a function allows the label text to change dynamically, depending on the result value of the function.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">new</span> <span class="token class-name">LabelBox</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> <span class="token string">'role'</span><span class="token punctuation">,</span> <span class="token string">'fixed text'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">new</span> <span class="token class-name">LabelBox</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> <span class="token string">'role'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> node<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}</pre>
<h3 id="numbercontrolbox-8">NumberControlBox</h3>
<p>
	A <code>NumberControlBox</code> is a box that shows a property of type boolean using an HTML input control, such as a radio button. The
	<code>getNumber</code>
	and <code>setNumber</code> in the below example are functions that set and get the value of the number property, respectively. They adhere
	to the following interface.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token function-variable function">getNumber</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token function-variable function">setNumber</span><span class="token operator">:</span> <span class="token punctuation">(</span>newValue<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span><span class="token punctuation">;</span></code>`}</pre>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">new</span> <span class="token class-name">NumberControlBox</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> <span class="token string">'role'</span><span class="token punctuation">,</span> getNumber<span class="token punctuation">,</span> setNumber<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}</pre>
<h3 id="limitedcontrolbox-9">LimitedControlBox</h3>
<p>
	A <code>LimitedControlBox</code> is a box that shows a property of type boolean using an HTML input control, such as a checkbox. The
	<code>getValues</code>
	and <code>setValues</code> in the below example are functions that set and get the value of the limited property, respectively. They
	adhere to the following interface, and are used for both single valued and list values limited properties. In case of a single value, only
	the 0-th element is used. The <code>possibleValues</code> parameter is a list of all allowed values of the property.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token function-variable function">getValues</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token function-variable function">setValues</span><span class="token operator">:</span> <span class="token punctuation">(</span>newValue<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span><span class="token punctuation">;</span></code>`}</pre>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">new</span> <span class="token class-name">LimitedControlBox</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> <span class="token string">'role'</span><span class="token punctuation">,</span> getValues<span class="token punctuation">,</span> setValues<span class="token punctuation">,</span> possibleValues<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}</pre>
<h3 id="multilinetextbox-10">MultiLineTextBox</h3>
<p>
	A <code>MultiLineTextBox</code> shows an editable text that can span over multiple lines. In addition to the node and the role a text box needs
	two function parameters. The first function to get the value of the text, the second function to set the value of the text.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">new</span> <span class="token class-name">MultiLineTextBox</span><span class="token punctuation">(</span>
	node<span class="token punctuation">,</span>
	<span class="token string">'role'</span><span class="token punctuation">,</span>
	<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> node<span class="token punctuation">.</span>stringValue<span class="token punctuation">,</span>
	<span class="token punctuation">(</span>newValue<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>stringValue <span class="token operator">=</span> newValue<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}</pre>
<p>Note that this box cannot yet be instantiated by the projections in the .edit files.</p>
<h3 id="selectbox-11">SelectBox</h3>
<p>
	A <code>SelectBox</code> shows a choice, e.g. for a reference property. When inactive, it shows its placeholder, when active, it shows a
	dropdown list of possible nodes that would fit this position. The functions
	<code>getOptions</code>, <code>getSelectedOption</code>, and <code>selectOption</code>, respectively given all possible options, the
	currently selected option, and an implementation fo the behavior when a certain option is newly selected.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">new</span> <span class="token class-name">SelectBox</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> <span class="token string">'role'</span><span class="token punctuation">,</span> placeHolder<span class="token punctuation">,</span> getOptions<span class="token punctuation">,</span> getSelectedOption<span class="token punctuation">,</span> selectOption<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}</pre>
<h3 id="svgbox-12">SvgBox</h3>
<p>An <code>SvgBox</code> shows a single SVG image.</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">new</span> <span class="token class-name">SvgBox</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> <span class="token string">"euro-icon"</span><span class="token punctuation">,</span> euroIcon<span class="token punctuation">,</span> <span class="token punctuation">&#123;</span>
   viewPortWidth<span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
   viewPortHeight<span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
   viewBoxWidth<span class="token operator">:</span> <span class="token number">1024</span><span class="token punctuation">,</span>
   viewBoxHeight<span class="token operator">:</span> <span class="token number">1024</span><span class="token punctuation">,</span>
   selectable<span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span></code>`}</pre>
<h3 id="textbox-13">TextBox</h3>
<p>
	A <code>TextBox</code> shows an editable text. In addition to the node and the role a text box needs two function parameters. The first function
	to get the value of the text, the second function to set the value of the text.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">new</span> <span class="token class-name">TextBox</span><span class="token punctuation">(</span>
	node<span class="token punctuation">,</span>
	<span class="token string">'role'</span><span class="token punctuation">,</span>
	<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> node<span class="token punctuation">.</span>stringValue<span class="token punctuation">,</span>
	<span class="token punctuation">(</span>newValue<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>stringValue <span class="token operator">=</span> newValue<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}</pre>
<p>There are two options that control what happens when a textbox becomes empty, i.e. contains no longer any characters.</p>
<ol>
	<li>
		deleteWhenEmpty, if true, the node will be deleted when the text becomes empty because of removing the last character in the text.
		Usable for e.g. numeric values.
	</li>
	<li>deleteWhenEmptyAndErase, if true, delete node when Erase key is pressed while the node is empty.</li>
</ol>
<SectionComponent tag="h2" id="grouping-boxes-3" bind:intersecting={visible[2]}>Grouping Boxes</SectionComponent>
<p>
	Grouping or layout Boxes have other boxes as content. A grouping box is used to project a composed AST node, like a list, or a concept
	that has part properties, in the editor.
</p>
<h3 id="fragmentbox-14">FragmentBox</h3>
<p>A <code>FragmentBox</code> is used to show a group of properties of a node. Its child boxes can be any type of box.</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">new</span> <span class="token class-name">FragmentBox</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_node<span class="token punctuation">,</span> <span class="token string">"BaseProduct-fragment-FirstCard"</span><span class="token punctuation">,</span> children<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}</pre>
<h3 id="gridbox-15">GridBox</h3>
<p>
	A <code>GridBox</code> is used to show any child boxes in a tabular fashion, whereas a <code>TableBox</code> is used to show the elements
	from a list of similarly types nodes. All children of a <code>GridBox</code> should be of the type <code>GridCellBox</code>.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">new</span> <span class="token class-name">GridBox</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> <span class="token string">"grid-or"</span><span class="token punctuation">,</span> gridCells<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}</pre>
<h3 id="gridcellbox-16">GridCellBox</h3>
<p>
	A <code>GridCellBox</code> is used to show a single child box in a tabular fashion. It is always a child of a <code>GridBox</code>. It
	takes the row and column numbers within the grid as parameters.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">new</span> <span class="token class-name">GridCellBox</span><span class="token punctuation">(</span>fraction<span class="token punctuation">,</span> <span class="token string">"numerator"</span><span class="token punctuation">,</span> rowNr<span class="token punctuation">,</span> columnNr<span class="token punctuation">,</span> childBox<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}</pre>
<h3 id="horizontallayoutbox-17">HorizontalLayoutBox</h3>
<p>
	A <code>HorizontalLayoutBox</code> show any child boxes next to each other horizontally, whereas a HorizontalListBox is used to show the elements
	from a list of similarly types nodes.
</p>
<p>
	An example of using a <code>HorizontalLayoutBox</code> is the following that represents the projection of a EuroLiteral with an icon in front
	of the actual value.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">new</span> <span class="token class-name">HorizontalLayoutBox</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span>
        <span class="token string">"EuroLiteral-hlist-line-0"</span><span class="token punctuation">,</span>
        <span class="token punctuation">[</span>
           <span class="token keyword">new</span> <span class="token class-name">SvgBox</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> <span class="token string">"euro-icon"</span><span class="token punctuation">,</span> euroIcon<span class="token punctuation">,</span> <span class="token punctuation">&#123;</span>
              viewPortWidth<span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
              viewPortHeight<span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
              viewBoxWidth<span class="token operator">:</span> <span class="token number">1024</span><span class="token punctuation">,</span>
              viewBoxHeight<span class="token operator">:</span> <span class="token number">1024</span><span class="token punctuation">,</span>
              selectable<span class="token operator">:</span> <span class="token boolean">false</span>
           <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
           BoxUtil<span class="token punctuation">.</span><span class="token function">numberBox</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> <span class="token string">"euros"</span><span class="token punctuation">,</span> NumberDisplay<span class="token punctuation">.</span><span class="token constant">SELECT</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
           BoxUtil<span class="token punctuation">.</span><span class="token function">labelBox</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> <span class="token string">","</span><span class="token punctuation">,</span> <span class="token string">"top-1-line-0-item-2"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
           BoxUtil<span class="token punctuation">.</span><span class="token function">numberBox</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> <span class="token string">"cents"</span><span class="token punctuation">,</span> NumberDisplay<span class="token punctuation">.</span><span class="token constant">SELECT</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}</pre>
<h3 id="horizontallistbox-18">HorizontalListBox</h3>
<p>A <code>HorizontalListBox</code> shows all members of one AST list property next to each other horizontally.</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">new</span> <span class="token class-name">HorizontalListBox</span><span class="token punctuation">(</span>
        myMethodNode<span class="token punctuation">,</span>
		role<span class="token punctuation">,</span>
        <span class="token string">"parameters"</span><span class="token punctuation">,</span> <span class="token comment">/* property name */</span>
        myMethodNode<span class="token punctuation">.</span>parameters <span class="token comment">/* children */</span> <span class="token punctuation">)</span></code>`}</pre>
<h3 id="optionalbox-19">OptionalBox</h3>
<p>
	An <code>OptionalBox</code> shows an optional projection. The optional content is always present in the
	<code>childBox</code>. Next to the content there is an <code>ActionBox</code>, which is shown when the content is not present in the AST
	model. The parameters <code>mustShow</code> and <code>condition</code> determine which of the pair [content, placeholder] is shown. If the
	<code>condition</code>
	results in true, then the content box is shown. If <code>mustShow</code> is true, then the content box is also shown, even though there may
	not be actual content within the AST model.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">new</span> <span class="token class-name">OptionalBox</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> role<span class="token punctuation">,</span> condition<span class="token punctuation">,</span> contentBox<span class="token punctuation">,</span> mustShow<span class="token punctuation">,</span> actionBox<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}</pre>
<h3 id="tablebox-20">TableBox</h3>
<p>
	A <code>TableBox</code> shows a list from the model in a table, either row-based or column-based. A <code>TableBox</code> is an abstract
	class, which has two concrete subclasses: <code>TableBoxColumnOriented</code>, and <code>TableBoxRowOriented</code>. All children must be
	of type <code>TabelRowBox</code>.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">if</span> <span class="token punctuation">(</span>orientation <span class="token operator">===</span> <span class="token string">"column"</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
   <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">TableBoxColumnOriented</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> listName<span class="token punctuation">,</span> listElementType<span class="token punctuation">,</span> roleName<span class="token punctuation">,</span> hasHeaders<span class="token punctuation">,</span> children<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span> <span class="token keyword">else</span> <span class="token punctuation">&#123;</span>
   <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">TableBoxRowOriented</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> listName<span class="token punctuation">,</span> listElementType<span class="token punctuation">,</span> roleName<span class="token punctuation">,</span> hasHeaders<span class="token punctuation">,</span> children<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}</pre>
<h3 id="tablecellbox-21">TableCellBox</h3>
<p>
	A <code>TableCellBox</code> shows a property of one element of an AST list. The <code>rowNr</code> and <code>columnNr</code> give the position
	of the cell within the table.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">new</span> <span class="token class-name">TableCellBox</span><span class="token punctuation">(</span>
        node<span class="token punctuation">,</span>
        propertyName<span class="token punctuation">,</span>
        propertyIndex<span class="token punctuation">,</span>
        propertyTypeName<span class="token punctuation">,</span>
        role<span class="token punctuation">,</span>
        rowNr<span class="token punctuation">,</span>
        columnNr<span class="token punctuation">,</span>
        contentBox
<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}</pre>
<h3 id="tablerowbox-22">TableRowBox</h3>
<p>
	A <code>TableRowBox</code> shows one element of an AST list. This element may be spread out over multiple table cell boxes. The index gives
	the number of the row or column that the element is displayed in.
</p>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token keyword">new</span> <span class="token class-name">TableRowBox</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> role<span class="token punctuation">,</span> myCells<span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}</pre>
<h3 id="verticallayoutbox-23">VerticalLayoutBox</h3>
<p>
	A <code>VerticalLayoutBox</code> show a list of child boxes next to each other vertically. Its usage is similar to that of the
	<code>HorizontalLayoutBox</code>.
</p>
<h3 id="verticallistbox-24">VerticalListBox</h3>
<p>
	A <code>VerticalListBox</code> shows all members of one AST list property one after another vertically. Its usage is similar to that of
	the <code>VerticalLayoutBox</code>.
</p>

<PrevNextSection {prevLink} {nextLink} />
