<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'Creating your Metamodel', visible: false, ref: '#creating-your-metamodel-1' },
		{ title: 'Defining the model and model units', visible: false, ref: '#defining-the-model-and-model-units-2' },
		{ title: 'The SiteGroup model unit', visible: false, ref: '#the-sitegroup-model-unit-3' },
		{ title: 'The Topic model unit', visible: false, ref: '#the-topic-model-unit-4' },
		{ title: 'The Flow model unit', visible: false, ref: '#the-flow-model-unit-5' }
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

	let prevLink = '/Tutorial/Overview';
	let nextLink = '/Tutorial/Making_an_Editor';

	import Note from '$lib/notes/Note.svelte';
</script>

<PrevNextSection {prevLink} {nextLink} />

<SectionComponent tag="h1" id="creating-your-metamodel-1" bind:intersecting={visible[0]}>Creating your Metamodel</SectionComponent>
<p>
	From this point onwards we assume that you have a Freon project in your favorite IDE, either by cloning the <a
		href="/Documentation/Overview/Getting_Started#example-project-startup-2">Example project</a
	>, or our <a href="/Documentation/Overview/Getting_Started#template-project-startup-3">Template project</a>.
</p>
<SectionComponent tag="h2" id="defining-the-model-and-model-units-2" bind:intersecting={visible[1]}
	>Defining the model and model units</SectionComponent
>
<p>
	The first we need to decide is the name of our language, and how we want to divide any model made by the user into partitions. The user
	will see only one of the partitions at a time in the editor, but references can be made to nodes in other partitions. In Freon terminology
	these partition are called <em>Model Units</em>.
</p>
<p>
	We choose to create a model with a number of topics. Each model is dedicated to one of the courses that our client offers, that is, to one
	of their websites. Each model is divided into four parts. The <strong>Topics</strong> part will deal with the different webpages that are
	available for the topic. The <strong>Flow</strong> handles the way in which the flow between the pages need to stream. Further there are
	the <strong>Tests</strong>, which define the tests for the topics, and the flow between the topics. Finally, there is the
	<strong>SiteGroup</strong> part, which gives an overview of a site group, with all sub topics, flows, and tests that regard that topic.
</p>
<p>Create the file <code>edu-main.ast</code> in the <code>src/defs</code> folder, and add the following code.</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson1-defs/edu-main.ast#L1-L10
</span>
language Education

<span class="token keyword">model</span> Education <span class="token comment">/* Computer Aided Learning */</span> &#123;
    name: <span class="token builtin">identifier</span>;
    topic: <span class="token class-name">Topic</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    flow: <span class="token class-name">Flow</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    tests: <span class="token class-name">Test</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    overviews: <span class="token class-name">SiteGroup</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
&#125;
</code>`}</pre>
<p>
	If you are impatient, and already tried to generate the editor, you will have noticed that there are errors in our input. We need to
	define the concepts Topic, Flow, Test, and SiteGroup. All four are model units, so we define them as such.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token keyword">modelunit</span> <span class="token class-name">Topic</span> &#123;

&#125;
<span class="token keyword">modelunit</span> <span class="token class-name">Test</span> &#123;

&#125;
<span class="token keyword">modelunit</span> <span class="token class-name">Flow</span> &#123;

&#125;
<span class="token keyword">modelunit</span> <span class="token class-name">SiteGroup</span> &#123;

&#125;</code>`}</pre>
<SectionComponent tag="h2" id="the-sitegroup-model-unit-3" bind:intersecting={visible[2]}
	>The <em>SiteGroup</em> model unit</SectionComponent
>
<p>
	Let’s focus on the <em>SiteGroup</em> model unit first. Because it is likely that we need to make references to topics, we give each topic
	a <code>name </code>of type <code>identifier</code>.
</p>
<Note
	><svelte:fragment slot="header">The type identifier versus the type string.</svelte:fragment>
	<svelte:fragment slot="content">
		<p>
			A property of type string may contain any printable character, but the content of an identifier is bound to a number of rules. These
			rules are equal to the rules in Typescript. Any concept or model unit that has a property
			<i>name</i> of type <i>identifier</i> can be referred to.
		</p>
	</svelte:fragment></Note
>
<p>
	Every (sub)topic belongs to a site group, but we do not want this relationship to be like a UML aggregation, because we feel that this is
	too restrictive here. Therefore, we introduce another feature of Freons metamodel, the <strong>reference</strong>. You may compare a
	reference to a UML directed association, where the role name is the name of the property (‘topics’), and the direction is from the owner
	of the property (‘SiteGroup’) to the type of the property (‘Topic’). The square brackets behind the type name indicate that we want
	multiple instances of the type: a list.
</p>
<p>Likewise, we define references to the flows and the tests that are part of this site group.</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson1-defs/edu-main.ast#L11-L17
</span>
<span class="token keyword">modelunit</span> <span class="token class-name">SiteGroup</span> &#123;
    name: <span class="token builtin">identifier</span>;
    description: <span class="token builtin">string</span>; <span class="token comment">/* e.g. Mathematics, fractions for students age 10 */</span>
    <span class="token keyword">reference</span> topics: <span class="token class-name">Topic</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    <span class="token keyword">reference</span> flows: <span class="token class-name">Flow</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
    <span class="token keyword">reference</span> tests: <span class="token class-name">Test</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
&#125;</code>`}</pre>
<SectionComponent tag="h2" id="the-topic-model-unit-4" bind:intersecting={visible[3]}>The <em>Topic</em> model unit</SectionComponent>
<p>
	To avoid having very large files, you can divide your language definition into as many files as you like. As long as the file extension is <code
		>.ast</code
	>, the file will be taken into account as part of your language metamodel.
</p>
<p>
	So, let’s create another file to store the metamodel for the <em>Topic</em> model unit. Like the <em>SiteGroup</em> model unit, the
	<em>Topic</em>
	model unit has a name of type identifier. A description is probably useful as well, we give it the type <code>string</code>, because it
	should be able to contain all kinds of characters. We are building a model of a website, thus the concept <strong>Page</strong> should definitely
	be present. Each Topic will have a number of pages. The result for now is the code below.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson1-defs/edu-topics.ast#L3-L8
</span>
<span class="token keyword">modelunit</span> <span class="token class-name">Topic</span> &#123;
    name: <span class="token builtin">identifier</span>;
    <span class="token keyword">reference</span> main: <span class="token class-name">SiteGroup</span>;
    description: <span class="token builtin">string</span>;
    pages: <span class="token class-name">Page</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
&#125;</code>`}</pre>
<p>So far, so good!</p>
<p>
	Now, let’s get an idea of the type of pages we will be dealing with. There will of course be a large number of ordinary pages with text
	that explains a part of a topic, some questions to test the understanding of the topic. But we will want to include stuff that is more
	interesting for the kids as well, for instance some videos. There should also be pages with examples, and pages with assignments. So it is
	a good idea to make the <strong>Page</strong> concept abstract, and have a number of concepts that inherit from it.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson1-defs/edu-topics.ast#L10-L39
</span>
<span class="token keyword">abstract</span> <span class="token keyword">concept</span> <span class="token class-name">Page</span> &#123;
    name: <span class="token builtin">identifier</span>;
    questions: <span class="token class-name">Question</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
&#125;

<span class="token keyword">concept</span> <span class="token class-name">Theory</span> <span class="token keyword">base</span> <span class="token class-name">Page</span> &#123;
    /* For the sake of the example this is simplified.
    Should be formatted <span class="token keyword">text</span> including pictures, etc. */
    content: <span class="token class-name">Line</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
&#125;

<span class="token keyword">concept</span> <span class="token class-name">Line</span> &#123;
    content: <span class="token builtin">string</span>;
&#125;

<span class="token keyword">concept</span> <span class="token class-name">Video</span> <span class="token keyword">base</span> <span class="token class-name">Page</span> &#123;
    url: <span class="token builtin">string</span>;
&#125;

<span class="token keyword">concept</span> <span class="token class-name">WorkSheet</span> <span class="token keyword">base</span> <span class="token class-name">Page</span> &#123;
&#125;

<span class="token keyword">concept</span> <span class="token class-name">ExamplePage</span> <span class="token keyword">base</span> <span class="token class-name">Page</span> &#123;
    content: <span class="token class-name">Line</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
&#125;

<span class="token keyword">concept</span> <span class="token class-name">InDepthMaterial</span> <span class="token keyword">base</span> <span class="token class-name">Page</span> &#123;
    content: <span class="token class-name">Line</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
&#125;
</code>`}</pre>
<Note
	><svelte:fragment slot="header">UML diagrams</svelte:fragment>
	<svelte:fragment slot="content">
		<p>
			The Freon metamodel can be expressed in UML. For instance, the Freon concept may be compared to a UML class. It can have properties,
			and may have associations with other concepts. It can inherit from other concepts, and/or implement an interface.
		</p>
		<p>Likewise, reference properties may be compared to UML directed associations, and normal properties to aggregation relations.</p>
		<p>
			Freon automatically generates a number of UML class diagrams of your metamodel. You can find them in the folder <code
				>src/diagrams</code
			>, together with some other diagrams (for instance, one that focuses on inheritance relations).
		</p>
	</svelte:fragment></Note
>
<p>
	But let’s not forget to add a definition for the concept <strong>Question</strong>. Freon will complain if you do not define all the
	concepts that you are using. And, because we are dealing with mathematics, we need to create a concept that represents fractions. A simple
	number will not be sufficient.
</p>
<pre
	class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson1-defs/edu-topics.ast#L41-L57
</span>
    name: <span class="token builtin">identifier</span>;
    content: <span class="token builtin">string</span>;
    correctAnswer: <span class="token class-name">NumberConcept</span>;
&#125;

<span class="token keyword">abstract</span> <span class="token keyword">concept</span> <span class="token class-name">NumberConcept</span> &#123;
&#125;

<span class="token keyword">concept</span> <span class="token class-name">SimpleNumber</span> <span class="token keyword">base</span> <span class="token class-name">NumberConcept</span> &#123;
    value: <span class="token builtin">number</span>;
&#125;

<span class="token keyword">concept</span> <span class="token class-name">Fraction</span> <span class="token keyword">base</span> <span class="token class-name">NumberConcept</span> &#123;
    numerator: <span class="token builtin">number</span>;
    denominator: <span class="token builtin">number</span>;
&#125;
</code>`}</pre>
<p>
	By now, you will have understood the gist of how to build a simple metamodel. For the sake of brevity, we wil not get any further into
	defining the content of each page type. Let’s just assume there is some content. We will be representing this as lines of text.
</p>
<p>
	If you like, you could generate the editor for our DSL, and try it out. Use the following command in the terminal window of your IDE (you
	can exchange npm for the package manager of your choice).
</p>
<pre class="language-bash">{@html `<code class="language-bash"><span class="token function">npm</span> run build</code>`}</pre>
<p>In the GitHub project we have provided an example model named ‘lesson1’. Before you open the editor, start the server.</p>
<pre class="language-bash">{@html `<code class="language-bash"><span class="token function">npm</span> run start</code>`}</pre>
<p>Open the editor, select ‘lesson1’ as model, and have a browse.</p>
<p>
	Yes, we know. It works, but it doesn’t look great. In the next lesson we will learn how to make the model in the editor look a bit more
	decent. But first we are going to define the second model unit, the description of the flow between the pages.
</p>
<SectionComponent tag="h2" id="the-flow-model-unit-5" bind:intersecting={visible[4]}>The <em>Flow</em> model unit</SectionComponent>
<p>
	Let’s create a second file called <code>edu-flow.ast</code>. This file will contain the part of the metamodel that handles
	<strong>Flows</strong>.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson1-defs/edu-flow.ast#L1-L6
</span>
language Education

<span class="token keyword">modelunit</span> <span class="token class-name">Flow</span> &#123;
    <span class="token keyword">reference</span> main: <span class="token class-name">SiteGroup</span>;
    rules: <span class="token class-name">FlowRule</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
&#125;</code>`}</pre>
<p>Here again, we use a reference to link the flow a site group.</p>
<p>
	In the following code, each <strong>FlowRule</strong> is linked to a certain page. This is the page that the pupil is currently working
	on. The flow rule will determine which page to show next, using a set of <strong>PageTransitions</strong>. A page transition is simply a
	condition coupled to another page. If the condition is fulfilled, then that page will be the next in the flow.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson1-defs/edu-flow.ast#L8-L18
</span>
<span class="token keyword">concept</span> <span class="token class-name">FlowRule</span> &#123;
    name: <span class="token builtin">identifier</span>;
    description: <span class="token builtin">string</span>;
    <span class="token keyword">reference</span> page: <span class="token class-name">Page</span>;
    transitions: <span class="token class-name">PageTransition</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;
&#125;

<span class="token keyword">concept</span> <span class="token class-name">PageTransition</span> &#123; <span class="token comment">/* E.g. Grade A => show pageA, Grade F => show pageC */</span>
    condition: <span class="token class-name">Grade</span>;
    <span class="token keyword">reference</span> toPage: <span class="token class-name">Page</span>;
&#125;</code>`}</pre>
<p>
	But how to define the condition for a page transition? Well, we’ll take the easy road for now, and make it an enumeration. In Freon
	terminology that is a <a href="/Documentation/Creating_the_Metamodel/Language_Structure#limited-concept-7">limited concept</a>, which is a
	slightly more extensive notion than the old-fashioned enumeration.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Education/lesson1-defs/edu-flow.ast#L20-L27
</span>
<span class="token keyword">limited</span> <span class="token class-name">Grade</span> &#123;
    gradeA;
    gradeB;
    gradeC;
    gradeD;
    gradeE;
    gradeF;
&#125;</code>`}</pre>
<p>That is the second model unit done!</p>
<p>
	Again, you might want to generate the editor and try it out. Note that when you start the editor, it will open with the topic, the one
	from the previous step. Simply click on the arrow-left icon in the top bar. This will open an overview of all the model units that are
	present in your project. Click on ‘StartFlow’, select ‘Open’ from the dropdown menu, and you can view and edit the partition that we have
	created for your use. Or, you can play with the File menu. Click <code>New Model Unit</code>, and see where that takes you.
</p>
<p>
	Still, things do not look great, do they? Please be patient. In the next lesson you will learn to beautify the appearance of the model in
	the editor.
</p>

<PrevNextSection {prevLink} {nextLink} />
