<script>
	import LandingPageFooter from './LandingPageFooter.svelte';
	import AppBar from '$lib/appbar/AppBar.svelte';
</script>

<main class="main-window">
	<AppBar />
	<div class="content-box">
		<section class="landing-herosection">
			<div>
				<!--	Without an extra div the margin-left for landing-name does not work				-->
				<div class="landing-name">
					<div class="landing-name-child">
						<div class="landing-name-logo">
							<div class="landing-image-holder"><img src="freonlogo.png" alt="Freon Logo" style="width:70px; margin-top: 10px;" /></div>
							<p class="landing-name-text-logo">Freon</p>
						</div>
					</div>

					<div class="landing-name-child">
						<div>The name means 'friend', and comes from the Frisian language.</div>
					</div>
					<div class="landing-name-child">
						<div class="landing-name-logo">
							Pronunciation:
							<audio controls class="landing-name-child landing-audio-control">
								<source src="../freon - pronunciation.mp3" type="audio/mpeg" />Your browser does not support the audio element.
							</audio>
						</div>
					</div>
				</div>
			</div>

			<h1 class="landing-name-text">Introducing Freon</h1>
			<h2>The ultimate Language Workbench for the Web!</h2>
			<div class="landing-started">
				<a href="/Documentation/Overview/Getting_Started"
					>Getting Started
					<span class="landing-arrow">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 412" height="28px"
							><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
								fill="currentColor"
								d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
							/></svg
						>
					</span>
				</a>
			</div>
		</section>

		<section class="landing-main-text">
			<div class="landing-text">
				<p class="see-me">
					Freon is an advanced language workbench that simplifies the creation of domain-specific languages (DSLs) through a web-based
					framework. With Freon, language engineers can define a language's structure, editor, scoper, typer, and validator—all from a
					concise set of definitions. By leveraging the power of projectional editing, Freon enables a smooth and intuitive development
					process, making it easier to build custom editing environments for specialized languages.
				</p>

				<p class="see-me">
					Whether you're developing a DSL for a niche domain or designing a specialized tool for your organization, Freon provides the
					flexibility and scalability you need to quickly bring your ideas to life. Start creating your own custom language workbench with
					Freon today, and take advantage of its open-source framework and growing set of features to stay ahead in the world of web-based
					language development.
				</p>
				<p>
					At the heart of Freon lies a robust framework accompanied by five specialized generators, each dedicated to a crucial aspect of
					your language's work environment:
				</p>
				<ul>
					<li>Language Structure: Define the core concepts, properties, and relationships inherent to your language.</li>
					<li>Editor: Customize the visual representation and editing commands, ensuring a user-friendly interface.</li>
					<li>Scoper: Establish rules for name resolution, managing references within your language models.</li>
					<li>Typer: Determine the types associated with language elements, enforcing consistency and correctness.</li>
					<li>Validator: Set validation rules to ensure models adhere to defined constraints, providing real-time feedback.</li>
				</ul>
				<p>Join us in shaping the future of DSL development by exploring Freon today!</p>
			</div>
		</section>

		<section class="landing-enter-buttons-grid">
			<a href="/Documentation/Overview/Getting_Started" class="landing-enter-button">
				<h3>Getting Started</h3>
				<p>
					Want to get started immediately... this is the place to go. We show you how to set up your project with a few commands and clicks.
				</p>
				<p>Learn more...</p>
			</a>
			<a href="/Documentation" class="landing-enter-button"
				><h3>Documentation</h3>
				<p>
					In this section you can find the full documentation of all features of Freon. The explanation uses small examples to enlighten
					each feature. Larger comprehensive examples cna be found in the Examples section.
				</p>
				<p>Learn more...</p>
			</a>
			<a href="/Tutorial" class="landing-enter-button"
				><h3>Tutorial</h3>
				<p>
					When you are new to this tool, you may like to check out our tutorial. The tutorial takes you step-by-step through the creation of
					the environment for your own language environment. It shows how to create a language definition, an editor, how to add scoping and
					typing to your language, and how to create a validator, and an interpreter to your DSL -- from a small set of definitions.
				</p>
				<p>Learn more...</p>
			</a>
			<a href="/Examples" class="landing-enter-button"
				><h3>Examples</h3>
				<p>
					In the Examples section the focus is on a number of larger examples that give a more indepth explanation of how to handle a
					specific topic.
				</p>
				<p>Learn more...</p>
			</a>
			<a href="/Demos" class="landing-enter-button"
				><h3>Demos, videos, etc</h3>
				<p>
					There are a number of demos and videos available on this site. They cover different topics, like how to use the tool, why it was
					created, etc.
				</p>
				<p>Learn more...</p>
			</a>
			<a href="/Background/Overview" class="landing-enter-button"
				><h3>Guiding Principles</h3>
				<p>
					Freon was created using a lifetime of experience with software development, especially with developing softare languages. All this
					experience has let to a number of great guiding principles for software development, which are being used in the development of
					this tool. We happily share our insights with you.
				</p>
				<p>Learn more...</p>
			</a>
		</section>

		<section>
			<div class="landing-card">
				<div class="landing-testimonial">
					<div class="landing-testimonial-top">
						<div class="landing-testimonial-child"><h2><b>By Mike Vogel, TriRadial Solutions</b></h2></div>
						<div class="landing-testimonial-child">
							<a target="_blank" href="https://www.triradial.com/">
								<img src="icons/TriRadial_Logo2024.webp" alt="TriRadial Logo" style="width:100px" />
							</a>
						</div>
					</div>
					<p>
						<a target="_blank" href="https://www.triradial.com/">TriRadial Solutions</a> used Freon for the DSL that is the basis of our
						Clinical Research Coordinator (CRC) product. CRCs are the front-line staff that perform clinical trials for drugs and other
						health products. See
						<a href="/Background/Testimonial" class=".landing-testimonial-more">CRCHub Application</a>
						for an explanation of the product and some samples of the product UI. A DSL platform that is optimized for the Web is the void in
						today’s DSL technology. Having built DSLs using primitive tools like parsers and language servers as well as high-end tools like
						MPS, our assessment is that Freon is well on the way to being the ideal balance between these extremes. Freon’s break through is
						its Web-first architecture which allowed us to seamlessly integrate the DSL technology with a modern web application. The path for
						integration with the LionWeb project positions Freon for even the most complex projects. Key features of Freon that we used:
					</p>
					<ul>
						<li>Its DSL language for CRC DSL</li>
						<li>Its DSL editor framework for the entry of the DSL</li>
						<li>Its interpreter framework to run simulations of the scheduling</li>
						<li>Its storage framework to load and save the data.</li>
					</ul>

					<p>
						The Freon team has been wonderfully responsive to us when we were getting started and as we’ve made ever more advanced requests
						for new features. We would highly recommend using Freon on a DSL project and would be happy to speak with anyone looking to
						discuss our experience with Freon.
					</p>
					<a href="/Background/Testimonial" class=".landing-testimonial-more">
						<p>Learn more...</p>
					</a>
				</div>
			</div>
		</section>

		<LandingPageFooter />
	</div>
</main>

<style>
	.landing-text {
		margin: 2rem;
		/*margin-left: 1rem; for small devices */
	}
</style>
