<script lang="ts">
	import SectionComponent from '$lib/section/SectionComponent.svelte';
	import { mySections } from './SectionStore.js';
	$mySections = [
		{ title: 'A Bit of Background', visible: false, ref: '#a-bit-of-background-1' },
		{ title: 'Design Philosophy', visible: false, ref: '#design-philosophy-2' },
		{ title: 'A Minimal Viable Product', visible: false, ref: '#a-minimal-viable-product-3' },
		{ title: 'Name-Based References', visible: false, ref: '#name-based-references-4' },
		{ title: 'Model Units or Partitions', visible: false, ref: '#model-units-or-partitions-5' },
		{ title: 'Other Guidelines', visible: false, ref: '#other-guidelines-6' }
	];
	let visible: boolean[] = [];
	$: $mySections[0].visible = visible[0];
	$: $mySections[1].visible = visible[1];
	$: $mySections[2].visible = visible[2];
	$: $mySections[3].visible = visible[3];
	$: $mySections[4].visible = visible[4];
	$: $mySections[5].visible = visible[5];
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

	let prevLink = '/LionWeb/Overview';
	let nextLink = '/Background/Testimonial';
</script>

<PrevNextSection {prevLink} {nextLink} />
<SectionComponent tag="h1" id="a-bit-of-background-1" bind:intersecting={visible[0]}>A Bit of Background</SectionComponent>
<p>
	It took a few years to create Freon, but more importantly it took a lot of experience: experience with building software in general,
	experience with creating languages like UML and OCL, experience with creating a large number of DSLs, experience with the tools available
	for building DSLs. In short, Freon is the result of a lifetime of experience, and with that, the lessons learned.
</p>
<p>A few of these lessons are explained below to give you an insight in the motives and guiding principles behind Freon.</p>
<SectionComponent tag="h2" id="design-philosophy-2" bind:intersecting={visible[1]}>Design Philosophy</SectionComponent>
<p>
	The design philosophy that we follow in Freon can best be described by the following quote from the well-known graphical user interface
	designer Alan Kay.
</p>
<blockquote>
	<p>
		<em>Simple things should be simple, complex things should be possible.</em>
		(<a href="https://en.wikipedia.org/wiki/Alan_Kay" target="_blank">Alan Kay, Turing Award Winner</a>)
	</p>
</blockquote>
<SectionComponent tag="h2" id="a-minimal-viable-product-3" bind:intersecting={visible[2]}>A Minimal Viable Product</SectionComponent>
<p>
	Freon is a minimal viable product which supports the language engineer in creating a work environment for a mini-language. A key principle
	is the <a href="https://en.wikipedia.org/wiki/Pareto*principle" target="_blank">Pareto principle</a>
	(or 80%-20% rule), which states that for many events, roughly 80% of the effects come from 20% of the causes. For example, it is an axiom of
	business management that “80% of sales come from 20% of clients”.
</p>
<p>
	In software development the Pareto principle translates to “<em>80% of the development effort is spent on 20% of the application</em>”,
	this 20% being the more complex parts. Still, the other 80% of the application needs to be created as well.
</p>
<p>
	Freon aims to make the latter <strong>as simple as possible</strong>, while keeping the generated code <strong>open</strong> for the language
	engineer to code the more complex parts by hand. One of our use cases is the creation of a prototype language in a day or in a couple of days
	at most.
</p>
<p>
	Let’s get the 20% down to say about 1% to 5%. That either leaves you with 15% extra free time to spend on your hobbies (fun!), or with
	extra time to tackle the difficult bits of your application (fulfilling!).
</p>
<SectionComponent tag="h2" id="name-based-references-4" bind:intersecting={visible[3]}>Name-Based References</SectionComponent>
<p>
	In <a href="/Background/Projectional_Editing#expressions">Support for Expressions</a> we explain that editing expressions is a known
	challenge for projectional editors. A second challenge is posed by <em>references</em>, which is stated in
	<a href="https://www.voelter.de/data/pub/fse2016-projEditing.pdf" target="_blank">
		Efficiency of Projectional Editing: A Controlled Experiment</a
	> as follows.
</p>
<hr />
<blockquote>
	<p>
		<strong>References.</strong>
		References are based on pointers to the targetnode’s ID. Despite some advantages (e.g., robust refactorings) of this approach, we observe
		problems with the tradeoff that the reference target has to exist at the time the reference is created. A more robust and intuitive handling
		of references is desirable. While some problems can be solved by language developers (e.g., quick fixes to create reference targets), there
		should be a better way to support references by the IDE itself.
	</p>
	<p>[Markus Voelter a.o., Efficiency of Projectional Editing]</p>
</blockquote>
<hr />
<p>
	This is the reason that in Freon we allow only name-based references, which are resolved on a need-to basis. Every reference is an
	instance of the class <code>FreNodeReference</code>, which holds:
</p>
<ul>
	<li>the name or path (i.e. a list of names) of the referred element</li>
	<li>the meta-type of the referred element</li>
	<li>a cache of the element itself</li>
</ul>
<p>
	This means that the AST is truly a tree, not a graph. One advantage is that we are not obliged to have the complete model in memory. Our
	use of multi-file models is explained in the next section.
</p>
<SectionComponent tag="h2" id="model-units-or-partitions-5" bind:intersecting={visible[4]}>Model Units or Partitions</SectionComponent>
<p>
	Contrary to what is common in the world of <a href="https://en.wikipedia.org/wiki/Domain-specific*language" target="_blank"
		>Domain Specific Languages (DSLs)</a
	>
	we believe that a model is often too large to handle. When dealing with source code, the times have long gone that a complete application was
	written in a single file. Since the 1980s every self-respecting programming language has supported some kind of modularization. It is our strong
	conviction that this approach should also be taken when dealing with models.
</p>
<p>
	Similar to how the source code for a single application is split into classes and/or modules, every model in Freon is split into <strong
		>model units</strong
	>. Each model may contain units of multiple types, either an array of units, or a single unit. The next example shows how to define model
	units. Here, an <em>InsuranceModel</em> consists of a list of <em>Parts</em> and a list of <em>Products</em>.
</p>
<pre class="language-freon">{@html `<code class="language-freon"><span class="token comment">// Insurance/src/defs/language-main.ast#L7-L20
</span>
<span class="token keyword">model</span> <span class="token class-name">InsuranceModel</span> &#123;
    parts: <span class="token class-name">Part</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;              <span class="token comment">// units that hold partial definitions of insurance products
</span>    products: <span class="token class-name">Product</span><span class="token punctuation">[</span><span class="token punctuation">]</span>;        <span class="token comment">// units that hold sellable insurance products
</span>&#125;

<span class="token keyword">modelunit</span> <span class="token class-name">Part</span> &#123;
    part: <span class="token class-name">BaseProduct</span>;          <span class="token comment">// one collection of partial insurance products
</span>    file-extension = <span class="token string">"base"</span>;    <span class="token comment">// the file extension used by the parser
</span>&#125;

<span class="token keyword">modelunit</span> <span class="token class-name">Product</span> &#123;
    product: <span class="token class-name">InsuranceProduct</span>;  <span class="token comment">// one collection of sellable insurance products
</span>    file-extension = <span class="token string">"prod"</span>;    <span class="token comment">// the file extension used by the parser
</span>&#125;</code>`}</pre>
<p>The notion of model units has been around for some time. Actually, we have published a number of papers on the topic.</p>
<ul>
	<li>At <em>Eclipse Summit 2008 Modeling Symposium</em> model units were introduced in <em>Big Models an Alternative Approach</em>.</li>
	<li>
		Earlier, model units were described under the term ‘Partial Models’ at the ECMDA-FA 2007 conference in a paper called <em
			>Building a Flexible Software Factory Using Partial Domain Specific Models</em
		>.
	</li>
	<li>
		More recently model units have been used within the
		<a href="https://www.mendix.com/" target="_blank">Mendix</a> meta-model to allow for working with large models in their web based modeling
		tools. This work was presented at Splash 2016 in _Making Mendix Meta Model Driven_.
	</li>
</ul>
<SectionComponent tag="h2" id="other-guidelines-6" bind:intersecting={visible[5]}>Other Guidelines</SectionComponent>
<p>
	Other guidelines have been <strong>ease of use</strong>, and <strong>flexibility</strong>. Freon may not (yet
	<img src="/icons/smile.png" alt="OOPS" width="20" height="20" />) do everything you need, but what it does, should be very easy to get
	into. Furthermore, Freon is designed to be <strong>extendable</strong>, and <strong>easy to integrate with other tooling</strong>. In
	practise this means that:
</p>
<ul>
	<li>
		Every part of the work environment that is generated, can be <em>exchanged</em> for one that suits the language engineer better, provided
		the right interface is implemented.
	</li>
	<li>
		Every part of the work environment is made by its own generator, so you can adjust which parts you want to generate and which parts you <em
			>omit</em
		>.
	</li>
	<li>
		The different parts of the work environment can be run on either the server or the client. Thus creating <em
			>multiple deployment options</em
		>.
	</li>
</ul>
<p>
	With these principles in mind, we have started of small and simple. Every definition language, from the language structure to the
	validation rules, is kept <strong>minimal</strong>. Over time, in an <strong>agile</strong>
	fashion, these will be extended whenever the need arises.
</p>

<PrevNextSection {prevLink} {nextLink} />
