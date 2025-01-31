<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Testimonial

<a target="_blank" href="https://www.triradial.com/">TriRadial Solutions</a> is using Freon for the DSL in or Clinical Research Coordinator (CRC) product.
CRCs are the front-line staff the perform clinical trials for drugs and other health products.
Our product allows a CRC to define the structure of a clinical trial including:

- The phases, e.g., the patient screening, treatment, follow-up phases, etc.
- The visits, e.g., obtain informed consent, conduct physical exam, give medication to patient, etc.
- The tasks to be done in each visit
- The expressions that define the scheduling of all these things

The product is a demonstration of the use of a DSL to enable the subject matter experts to do the complex clinical trial
modeling that their job requires.
Before this product they would spend hours creating and maintaining approximate models of a study in Excel.
Key features of Freon that we used are highlighted in the pictures of the product UI below:

- The left side of the first picture shows a Freon DSL editor with custom styles and components and
seamlessly integrated via the standard Svelte component model into the overall app.
- The second picture shows use of the Freon interpreter framework to run simulations of the scheduling

<Figure
imageName={'background/CRCHubUI1.png'}
caption={'Freon editor embedded in the CRCHub application.'}
figureNumber={1}
/>

and

<Figure
imageName={'background/CRCHubUI2.png'}
caption={'CRCHub Simulation using the Freon Interpreter Framework.'}
figureNumber={2}
/>

While the creation of a product like the above is a big effort, we have also been successful rapidly prototyping DSLs for other projects. For example, using the out-of-the-box DSL definition and editing features we were able to build a DSL for defining validation rules for clinical trial data transformations in two days. The capability to build enterprise class applications starting with quickly developed and deployed iterations is keeping us excited about Freon.
