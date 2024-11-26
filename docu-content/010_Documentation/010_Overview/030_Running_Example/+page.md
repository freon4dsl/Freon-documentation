<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Example Used Across the Documentation

In order to provide examples in this section of the website, we have created an example DSL called
_Insurance_. This example is consistently applied across all pages in this section of the website.
Therefore, it is good to know up front what this DSL is all about. You can find the complete sources
of the DSL on the samples directory in the `master` branch of our GitHub project 
at <a href="https://github.com/freon4dsl/Freon" target="_blank">
https://github.com/freon4dsl/Freon</a>.

[//]: # (todo find good place to store Insurance DSL)

The gist of the _Insurance_ language is
that it defines two types of units. One unit holds set of parts of insurance products for a single theme,
like 'Home', or 'Health'. This set is called a `BaseProduct`. The second contains a complete insurance
product that consists of a number of insurance parts from one or more `BaseProducts`. This is called an
`InsuranceProduct`.

An `InsuranceProduct` has an expression called `calculation` that describes the expected cost of this product.
To simplify this expression helpers function may be defined. Each of these is called a `CalcFunction`.

The following figure shows a UML class diagram of the concepts in the language.

<Figure 
imageName={'docu-project-uml.png'} 
caption={'UML diagram of Insurance Project'}
figureNumber={1}
/>

<PrevNextSection {prevLink} {nextLink} />
