<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'External Component Box Types', visible: false, ref: '#external-component-box-types-1' },
		{ title: 'Simple Additions', visible: false, ref: '#simple-additions-2' },
		{ title: 'Fragment Wrappers', visible: false, ref: '#fragment-wrappers-3' },
		{ title: 'Property Projections: Wrapping or Replacing', visible: false, ref: '#property-projections-wrapping-or-replacing-4' },
		{ title: 'Wrapping Primitive Properties', visible: false, ref: '#wrapping-primitive-properties-5' },
		{ title: 'Wrapping Part List Properties', visible: false, ref: '#wrapping-part-list-properties-6' },
		{ title: 'Wrapping Reference List Properties', visible: false, ref: '#wrapping-reference-list-properties-7' },
		{ title: 'Wrapping Part Properties', visible: false, ref: '#wrapping-part-properties-8' },
		{ title: 'Wrapping Reference Properties', visible: false, ref: '#wrapping-reference-properties-9' },
		{ title: 'Replacing Primitive Properties', visible: false, ref: '#replacing-primitive-properties-10' },
		{ title: 'Replacing Part List Properties', visible: false, ref: '#replacing-part-list-properties-11' },
		{ title: 'Replacing Reference List Properties', visible: false, ref: '#replacing-reference-list-properties-12' },
		{ title: 'Replacing Part Properties', visible: false, ref: '#replacing-part-properties-13' },
		{ title: 'Replacing Reference Properties', visible: false, ref: '#replacing-reference-properties-14' },
		{ title: 'Wiring', visible: false, ref: '#wiring-15' },
		{ title: 'External Component Parameters', visible: false, ref: '#external-component-parameters-16' },
		{ title: 'Nesting', visible: false, ref: '#nesting-17' }
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
	$: $mySections[9].visible = visible[9];
	$: $mySections[10].visible = visible[10];
	$: $mySections[11].visible = visible[11];
	$: $mySections[12].visible = visible[12];
	$: $mySections[13].visible = visible[13];
	$: $mySections[14].visible = visible[14];
	$: $mySections[15].visible = visible[15];
	$: $mySections[16].visible = visible[16];
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

	let prevLink = '/Documentation/Under_the_Hood/Editor_Framework/Predefined_Boxes';
	let nextLink = '/Documentation/Under_the_Hood/Core_Interfaces';

	import Note from '$lib/notes/Note.svelte';
	import Figure from '$lib/figures/Figure.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="external-component-box-types-1" bind:intersecting={visible[0]}>External Component Box Types</SectionComponent
>
<Note
	><svelte:fragment slot="header">External components are experimental</svelte:fragment>
	<svelte:fragment slot="content">
		<p>
			The use of external components in the Freon editor is experimental. Compatibility with every library isn’t guaranteed, and future
			versions of Freon may alter how external components are included. Proceed with this in mind.
		</p>
	</svelte:fragment></Note
>
<p>
	In this version of Freon it is possible to include UI components that are not native to Freon. See <a
		href="/Documentation/Customizations/External_Components">External Components</a
	>.
</p>
<p>
	The use of external components requires knowledge of the Freon <a href="/Documentation/Under_the_Hood/Editor_Framework">Box Model</a>. In
	this section we explain the API for the various forms of external components.
</p>
<SectionComponent tag="h2" id="simple-additions-2" bind:intersecting={visible[1]}>Simple Additions</SectionComponent>
<p>
	Simple additions have no link to the model (the AST). They may appear anywhere in the projection. However, because they are present in the
	projection of a certain node, they are coupled to this node. To include a simple external component within a projection, use the syntax <code
		>[external = AnimatedGif ]</code
	>, where <code>AnimatedGif</code> is the name of the desired component. Ensure there is no space between the opening square bracket (<code
		>[</code
	>) and the keyword fragment, and note that the component name must be included in the
	<a href="/Documentation/Defining_an_Editor/Global_Projections"><code>global</code></a> section of the default editor.
</p>
<ul>
	<li>BoxType: <code>ExternalSimpleBox</code>.</li>
	<li>
		Interface:
		<ul>
			<li>No specific interface.</li>
		</ul>
	</li>
</ul>
<SectionComponent tag="h2" id="fragment-wrappers-3" bind:intersecting={visible[2]}>Fragment Wrappers</SectionComponent>
<p>
	Fragment wrappers may appear anywhere in a projection. Fragment wrappers wrap a single projection. This is the <code>childBox</code>. Note
	that the childBox itself may be a vertical or horizontal layout containing many other elements.
</p>
<ul>
	<li>
		Syntax:
		<ul>
			<li>
				To position the wrapper within the projection:
				<code>[fragment XX wrap=SMUI_Card]</code>
			</li>
			<li>
				To define the wrapped content the following must be included within the square brackets of the projection definition. It must be
				beneath the projection (the bit between <code>[]</code> brackets).
			</li>
		</ul>
	</li>
	<li>BoxType: <code>FragmentWrapperBox</code>.</li>
	<li>
		Interface:
		<ul>
			<li>
				<code>childBox: Box</code>
				<ul>
					<li>Use this method and the <code>RenderComponent</code> to show the childBox in the external component.</li>
				</ul>
			</li>
		</ul>
	</li>
</ul>
<p>Example:</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token class-name">MyConcept</span> &#123;
    <span class="token punctuation">[</span>
        Here is a <span class="token keyword">fragment</span> <span class="token punctuation">[</span><span class="token keyword">fragment</span> XX <span class="token keyword">wrap</span> = SMUI_Card<span class="token punctuation">]</span>
    <span class="token punctuation">]</span>
    <span class="token keyword">fragment</span> XX <span class="token punctuation">[</span>
        My First Card wrapping a property: $&#123;<span class="token function"><span class="token variable">self</span>.isUnderConstruction</span>&#125;
        Great, isn't it!
    <span class="token punctuation">]</span>
&#125;</code>`}</pre>
<SectionComponent tag="h2" id="property-projections-wrapping-or-replacing-4" bind:intersecting={visible[3]}
	>Property Projections: Wrapping or Replacing</SectionComponent
>
<p>
	A property projection may be wrapped in an external component, or the external component can replace the native projection. In the latter
	case it is up to the language engineer to get and set the value correctly, and to get tabbing etc. working.
</p>
<SectionComponent tag="h2" id="wrapping-primitive-properties-5" bind:intersecting={visible[4]}
	>Wrapping Primitive Properties</SectionComponent
>
<ul>
	<li>Syntax: <code>$&#123;self.name wrap=SMUI_Dialog&#125;</code></li>
	<li>BoxType: <code>StringWrapperBox</code>, <code>NumberWrapperBox</code>, or <code>BooleanWrapperBox</code></li>
	<li>
		Interface:
		<ul>
			<li>
				<code>getPropertyName(): string</code>
				<ul>
					<li>Returns the name of the wrapped property.</li>
				</ul>
			</li>
			<li>
				<code>getPropertyValue(): string</code>
				<ul>
					<li>
						Returns the value of the wrapped property. Type is <code>string</code> in case of an ExternalStringBox,
						<code>number</code> or <code>boolean</code> for the other box types.
					</li>
				</ul>
			</li>
			<li>
				<code>childBox: Box</code>
				<ul>
					<li>
						Returns the projection for the property. Use this method and the <code>RenderComponent</code> to show the property projection in
						the external component. Note that when a list is wrapped, this method returns a single Box that holds the native projection for the
						complete list, i.e. a horizontal list, vertical list, or table projection.
					</li>
				</ul>
			</li>
		</ul>
	</li>
</ul>
<SectionComponent tag="h2" id="wrapping-part-list-properties-6" bind:intersecting={visible[5]}
	>Wrapping Part List Properties</SectionComponent
>
<ul>
	<li>Syntax: <code>$&#123;self.parts wrap=SMUI_Accordion&#125;</code></li>
	<li>BoxType: <code>PartListWrapperBox</code></li>
	<li>
		Interface:
		<ul>
			<li>
				<code>getPropertyName(): string</code>
				<ul>
					<li>Returns the name of the wrapped property.</li>
				</ul>
			</li>
			<li>
				<code>getPropertyValue(): FreNode[]</code>
				<ul>
					<li>Returns the value of the wrapped property. You need to cast the returned value to the required type.</li>
				</ul>
			</li>
			<li>
				<code>childBox: Box</code>
				<ul>
					<li>
						Returns the projection for the property. Use this method and the <code>RenderComponent</code> to show the property projection in
						the external component. Note that this method returns a single Box that holds the native projection for the complete list, i.e. a
						horizontal list, vertical list, or table projection.
					</li>
				</ul>
			</li>
		</ul>
	</li>
	<li>Example:</li>
</ul>
<SectionComponent tag="h2" id="wrapping-reference-list-properties-7" bind:intersecting={visible[6]}
	>Wrapping Reference List Properties</SectionComponent
>
<ul>
	<li>Syntax: <code>$&#123;self.parts wrap=SMUI_Accordion&#125;</code></li>
	<li>BoxType: <code>RefListWrapperBox</code></li>
	<li>
		Interface:
		<ul>
			<li>
				<code>getPropertyName(): string</code>
				<ul>
					<li>Returns the name of the wrapped property.</li>
				</ul>
			</li>
			<li>
				<code>getPropertyValue(): FreNodeReference[]</code>
				<ul>
					<li>
						Type is <code>string</code> in case of an ExternalStringBox, <code>number</code> or <code>boolean</code> for the other box types.
					</li>
				</ul>
			</li>
			<li>
				<code>childBox: Box</code>
				<ul>
					<li>
						Returns the projection for the property. Use this method and the <code>RenderComponent</code> to show the property projection in
						the external component. Note that this method returns a single Box that holds the native projection for the complete list, i.e. a
						horizontal list, vertical list, or table projection.
					</li>
				</ul>
			</li>
		</ul>
	</li>
	<li>Example:</li>
</ul>
<SectionComponent tag="h2" id="wrapping-part-properties-8" bind:intersecting={visible[7]}>Wrapping Part Properties</SectionComponent>
<ul>
	<li>Syntax: <code>$&#123;self.part wrap=SMUI_Dialog&#125;</code></li>
	<li>BoxType: <code>PartWrapperBox</code></li>
	<li>
		Interface:
		<ul>
			<li>
				<code>getPropertyName(): string</code>
				<ul>
					<li>Returns the name of the wrapped property.</li>
				</ul>
			</li>
			<li>
				<code>getPropertyValue(): FreNode</code>
				<ul>
					<li>Returns the value of the wrapped property. You need to cast the returned value to the required type.</li>
				</ul>
			</li>
			<li>
				<code>childBox: Box</code>
				<ul>
					<li>
						Returns the projection for the property. Use this method and the <code>RenderComponent</code> to show the property projection in
						the external component.
					</li>
				</ul>
			</li>
		</ul>
	</li>
</ul>
<SectionComponent tag="h2" id="wrapping-reference-properties-9" bind:intersecting={visible[8]}
	>Wrapping Reference Properties</SectionComponent
>
<ul>
	<li>Syntax: <code>$&#123;self.reference wrap=SMUI_Dialog&#125;</code></li>
	<li>BoxType: <code>RefWrapperBox</code></li>
	<li>
		Interface:
		<ul>
			<li>
				<code>getPropertyName(): string</code>
				<ul>
					<li>Returns the name of the wrapped property.</li>
				</ul>
			</li>
			<li>
				<code>getPropertyValue(): FreNodeReference</code>
				<ul>
					<li>Returns the value of the wrapped property.</li>
				</ul>
			</li>
			<li>
				<code>childBox: Box</code>
				<ul>
					<li>
						Returns the projection for the property. Use this method and the <code>RenderComponent</code> to show the property projection in
						the external component.
					</li>
				</ul>
			</li>
		</ul>
	</li>
</ul>
<SectionComponent tag="h2" id="replacing-primitive-properties-10" bind:intersecting={visible[9]}
	>Replacing Primitive Properties</SectionComponent
>
<ul>
	<li>Syntax: <code>$&#123;self.name replace=SMUI_Dialog&#125;</code></li>
	<li>BoxType: <code>ExternalStringBox</code>, <code>ExternalNumberBox</code>, or <code>ExternalBooleanBox</code></li>
	<li>
		Interface:
		<ul>
			<li>
				<code>getPropertyName(): string</code>
				<ul>
					<li>Returns the name of the replaced property.</li>
				</ul>
			</li>
			<li>
				<code>getPropertyValue(): string</code>
				<ul>
					<li>
						Returns the value of the replaced property. Type is <code>string</code> in case of an <code>ExternalStringBox</code>,
						<code>number</code>
						or <code>boolean</code> for the other box types.
					</li>
				</ul>
			</li>
			<li>
				<code>setPropertyValue(newValue: string)</code>
				<ul>
					<li>
						Sets the value of the property. Type is <code>string</code> in case of an <code>ExternalStringBox</code>, <code>number</code> or
						<code>boolean</code> for the other box Types.
					</li>
				</ul>
			</li>
		</ul>
	</li>
</ul>
<SectionComponent tag="h2" id="replacing-part-list-properties-11" bind:intersecting={visible[10]}
	>Replacing Part List Properties</SectionComponent
>
<ul>
	<li>Syntax: <code>$&#123;self.parts replace=SMUI_Accordion&#125;</code></li>
	<li>BoxType: <code>ExternalPartListBox</code></li>
	<li>
		Interface:
		<ul>
			<li>
				<code>getPropertyName(): string</code>
				<ul>
					<li>Returns the name of the replaced property.</li>
				</ul>
			</li>
			<li>
				<code>getPropertyValue(): FreNode[]</code>
				<ul>
					<li>Returns the value of the replaced property. You need to cast the returned value to the required type.</li>
				</ul>
			</li>
			<li>
				<code>setPropertyValue(newValue: FreNode[])</code>
				<ul>
					<li>Sets the value of the property.</li>
				</ul>
			</li>
			<li>
				<code>children: Box[]</code>
				<ul>
					<li>Returns a list of boxes that hold the projection for every item in the list.</li>
				</ul>
			</li>
		</ul>
	</li>
</ul>
<SectionComponent tag="h2" id="replacing-reference-list-properties-12" bind:intersecting={visible[11]}
	>Replacing Reference List Properties</SectionComponent
>
<ul>
	<li>Syntax: <code>$&#123;self.parts replace=SMUI_Accordion&#125;</code></li>
	<li>BoxType: <code>ExternalRefListBox</code></li>
	<li>
		Interface:
		<ul>
			<li>
				<code>getPropertyName(): string</code>
				<ul>
					<li>Returns the name of the replaced property.</li>
				</ul>
			</li>
			<li>
				<code>getPropertyValue(): FreNodeReference[]</code>
				<ul>
					<li>Returns the value of the replaced property. You need to cast the returned value to the required type.</li>
				</ul>
			</li>
			<li>
				<code>setPropertyValue(newValue: FreNodeReference[])</code>
				<ul>
					<li>Sets the value of the property.</li>
				</ul>
			</li>
			<li>
				<code>children: Box[]</code>
				<ul>
					<li>Returns a list of boxes that hold the projection for every item in the list.</li>
				</ul>
			</li>
		</ul>
	</li>
</ul>
<SectionComponent tag="h2" id="replacing-part-properties-13" bind:intersecting={visible[12]}>Replacing Part Properties</SectionComponent>
<ul>
	<li>Syntax: <code>$&#123;self.part replace=SMUI_Dialog&#125;</code></li>
	<li>BoxType: <code>ExternalPartBox</code></li>
	<li>
		Interface:
		<ul>
			<li>
				<code>getPropertyName(): string</code>
				<ul>
					<li>Returns the name of the replaced property.</li>
				</ul>
			</li>
			<li>
				<code>getPropertyValue(): FreNode</code>
				<ul>
					<li>Returns the value of the replaced property. You need to cast the returned value to the required type.</li>
				</ul>
			</li>
			<li>
				<code>setPropertyValue(newValue: FreNode)</code>
				<ul>
					<li>Sets the value of the property.</li>
				</ul>
			</li>
		</ul>
	</li>
</ul>
<SectionComponent tag="h2" id="replacing-reference-properties-14" bind:intersecting={visible[13]}
	>Replacing Reference Properties</SectionComponent
>
<ul>
	<li>Syntax: <code>$&#123;self.reference replace=SMUI_Dialog&#125;</code></li>
	<li>BoxType: <code>ExternalRefBox</code></li>
	<li>
		Interface:
		<ul>
			<li>
				<code>getPropertyName(): string</code>
				<ul>
					<li>Returns the name of the replaced property.</li>
				</ul>
			</li>
			<li>
				<code>getPropertyValue(): FreNodeReference</code>
				<ul>
					<li>Returns the value of the replaced property.</li>
				</ul>
			</li>
			<li>
				<code>setPropertyValue(newValue: FreNodeReference)</code>
				<ul>
					<li>Sets the value of the property.</li>
				</ul>
			</li>
		</ul>
	</li>
</ul>
<SectionComponent tag="h2" id="wiring-15" bind:intersecting={visible[14]}>Wiring</SectionComponent>
<ol>
	<li>
		<p>
			Create your Svelte components in the webapp package. Be sure to which type of box your component will be linked. Use the box interface
			to get and set any model values.
		</p>
	</li>
	<li>
		<p>Let the generator know which external projections there are. This done in the ‘global’ part of the default editor.</p>
		<p>Example:</p>
	</li>
</ol>
<pre class="language-freon">{@html `<code class="language-freon">    <span class="token class-name">global</span> &#123;
        <span class="token class-name">external</span> &#123;
            AnimatedGif,
            SMUI_Card,
            SMUI_Accordion,
            SMUI_Dialog,
            DatePicker
        &#125;
    &#125;</code>`}</pre>
<ol start="3">
	<li>
		<p>
			Let the RenderComponent know which external projections there are. This is done using the setCustomComponents() method from the
			‘@freon4dsl/core-svelte’ package. This method should be called before starting the actual application.
		</p>
		<p>Note that the names should be equal to the names used in step 2.</p>
		<p>Example:</p>
	</li>
</ol>
<pre
	class="language-ts">{@html `<code class="language-ts"><span class="token function">setCustomComponents</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
   <span class="token punctuation">&#123;</span>component<span class="token operator">:</span> ShowAnimatedGif<span class="token punctuation">,</span> knownAs<span class="token operator">:</span> <span class="token string">"AnimatedGif"</span><span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
   <span class="token punctuation">&#123;</span>component<span class="token operator">:</span> SMUI_Card_Component<span class="token punctuation">,</span> knownAs<span class="token operator">:</span> <span class="token string">"SMUI_Card"</span><span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
   <span class="token punctuation">&#123;</span>component<span class="token operator">:</span> SMUI_Accordion<span class="token punctuation">,</span> knownAs<span class="token operator">:</span> <span class="token string">"SMUI_Accordion"</span><span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
   <span class="token punctuation">&#123;</span>component<span class="token operator">:</span> SMUI_Dialog<span class="token punctuation">,</span> knownAs<span class="token operator">:</span> <span class="token string">"SMUI_Dialog"</span><span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
   <span class="token punctuation">&#123;</span>component<span class="token operator">:</span> DatePicker<span class="token punctuation">,</span> knownAs<span class="token operator">:</span> <span class="token string">"DatePicker"</span><span class="token punctuation">&#125;</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`}</pre>
<SectionComponent tag="h2" id="external-component-parameters-16" bind:intersecting={visible[15]}
	>External Component Parameters</SectionComponent
>
<p>
	You can set parameters to an external component in the .edit file. These are simple key-value pairs, both key and value are strings. There
	can be a list of parameters.
</p>
<p>
	In the interface of all box types explained above the method <code>findParam(key: string): string</code> is included. This method can be used
	to find the value of the parameter that was included in the .edit file.
</p>
<SectionComponent tag="h2" id="nesting-17" bind:intersecting={visible[16]}>Nesting</SectionComponent>
<p>External projections may be nested. Example:</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token keyword">external</span> SMUI_Card <span class="token punctuation">[</span>
    This Card is showing animated gif <span class="token builtin">number</span> <span class="token number">1.</span>
        <span class="token punctuation">[</span><span class="token keyword">external</span>=AnimatedGif <span class="token builtin">number</span>=<span class="token string">"1"</span><span class="token punctuation">]</span>
    <span class="token punctuation">]</span></code>`}</pre>

<PrevNextSection {prevLink} {nextLink} />
