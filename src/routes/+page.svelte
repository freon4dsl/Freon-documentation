<script>
import LandingPageFooter from './LandingPageFooter.svelte';
import { miniWindow } from '$lib';
</script>

<div class='landing'>
<h1>Build Your Own Language Editor for the Web – Empower Your Backend with Ease!</h1>

<section class="landing-top">
	<div class="landing-intro">
		<div class="landing-intro-child">
			<div class="landing-name-logo">
				<div class='landing-image-holder'><img src="freonlogo.png" alt="Freon Logo" style="width:50px; margin-top: 10px;"></div>
				<h1>Freon</h1>
			</div>
		</div>

		<div class="landing-intro-child">
			<div class='landing-text'>
				<div>The name means 'friend', and comes from the Frisian language.</div>
				<div class='landing-spacer'></div>
				<div class="landing-name-logo">Pronunciation:
					<audio controls class="landing-intro-child landing-audio-control">
						<source src="../freon - pronunciation.mp3" type="audio/mpeg" />Your browser does not support the audio element.
					</audio>
				</div>
			</div>
		</div>
	</div>
	<div class="landing-started">
		<a href="/GettingStarted"
			>Get Started
			<span class="landing-arrow">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="28px"
					><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
						fill="currentColor"
						d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
					/></svg
				>
			</span>
		</a>
	</div>
</section>

<section class="landing-hero">
<!-- To make sure the image comes before the text on small devices, it is placed here. -->
	{#if $miniWindow}
		<div class="landing-hero-right">
			<img src="./images/Landingpage-image4.webp" alt="An (abstract syntax) Tree" />
		</div>
	{/if}
	<div class="landing-hero-left">
			<h3>Introducing <span class="landing-freon-name">Freon</span>, the ultimate Language Workbench for the web!</h3>
			<p>
				Freon empowers you to effortlessly create custom web-enabled mini-languages, or
				<a href="https://en.wikipedia.org/wiki/Domain-specific*language" target="_blank"><b>Domain Specific Languages (DSLs)</b></a>,
				tailored to your unique needs. With just a small set of definitions, Freon generates a fully integrated toolkit for your language,
				including a seamless editor, scoper, typer, and validator — all designed to elevate your language creation process.
			</p>
			<p>
				One of Freon’s standout features is its <a href="/Intro/Projectional_Editing"><b>projectional editor</b></a>, a revolutionary
				approach to language editing that’s miles ahead of traditional editors. Unlike standard editors, projectional editing offers
				dynamic, visual structuring and precision, making it easier than ever to build and refine DSLs right in any browser.
			</p>
			<h3>Key Benefits:</h3>
			<ul>
				<li>
					<b>Personalized Language Support</b>: Tailor your editor to interpret and respond to the specific syntax, logic, and commands of
					your own domain language, making backend integration smoother and more powerful.
				</li>
				<li>
					<b>Simplified Content Management</b>: With a custom editor, adding and managing backend content becomes streamlined and efficient,
					cutting down on coding time while reducing errors.
				</li>
				<li>
					<b>Flexibility and Control</b>: Easily build, test, and adapt your editor to align with your evolving backend needs, so you stay
					agile and future-ready.
				</li>
				<li>
					<b>Boosted Productivity</b>: Enjoy the convenience of a tool that speaks your language – literally. Create, and edit content
					faster, without needing to compromise on the complexity or specificity of your backend requirements.
				</li>
			</ul>
			<p>
				Unlock the power of custom mini-languages with Freon and see how projectional editing can redefine the way you create and manage
				DSLs!
			</p>
	</div>
	{#if !$miniWindow}
		<div class="landing-hero-right">
			<img src="./images/Landingpage-image4.webp" alt="An (abstract syntax) Tree" />
		</div>
	{/if}
</section>

<section>
	<h2>Testimonial</h2>
	<div class="landing-card">
		<div class="landing-testimonial">
			<div class='landing-testimonial-top'>
				<div class="landing-testimonial-child"><h4><b>By Mike Vogel, Triradial</b></h4></div>
				<div class="landing-testimonial-child"><img src="freonlogo.png" alt="Company Logo" style="width:40px"></div>
			</div>
			<p>
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
				minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
				in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
				officia deserunt mollit anim id est laborum."
			</p>
		</div>
	</div>
</section>

<section class="landing-enter-buttons-grid">
	<a href="/GettingStarted" class="landing-enter-button">
			<h3>Getting Started</h3>
			<p>
				Want to get started immediately... this is the place to go. We show you how to set up your project with a few commands and clicks.
			</p>
			<p>Learn more...</p>
	</a>
	<a href="/Documentation" class="landing-enter-button"
			><h3>Documentation</h3>
			<p>
				In this section you can find the full documentation of all features of <span class="landing-freon-name">Freon</span>. The explanation uses
				small examples to enlighten each feature. Larger comprehensive examples cna be found in the Examples section.
			</p>
			<p>Learn more...</p>
		</a
	>
	<a href="/Tutorial" class="landing-enter-button"
			><h3>Tutorial</h3>
			<p>
				When you are new to this tool, you may like to check out our tutorial. The tutorial takes you step-by-step through the creation of
				the environment for your own language environment. It shows how to create a language definition, an editor, how to add scoping and
				typing to your language, and how to create a validator, and an interpreter to your DSL -- from a small set of definitions.
			</p>
			<p>Learn more...</p>
		</a
	>
	<a href="/Examples" class="landing-enter-button"
			><h3>Examples</h3>
			<p>
				In the Examples section the focus is on a number of larger examples that give a more indepth explanation of how to handle a specific
				topic.
			</p>
			<p>Learn more...</p>
		</a
	>
	<a href="/Demos" class="landing-enter-button"
			><h3>Demos, videos, etc</h3>
			<p>
				There are a number of demos and videos available on this site. They cover different topics, like how to use the tool, why it was
				created, etc.
			</p>
			<p>Learn more...</p>
		</a
	>
	<a href="/GuidingPrinciples" class="landing-enter-button"
			><h3>Guiding Principles</h3>
			<p>
				<span class="landing-freon-name">Freon</span> was created using a lifetime of experience with software development, especially with developing
				softare languages. All this experience has let to a number of great guiding principles for software development, which are being used
				in the development of this tool. We happily share our insights with you.
			</p>
			<p>Learn more...</p>
		</a
	>
</section>

<LandingPageFooter />
</div>

<style>

</style>
