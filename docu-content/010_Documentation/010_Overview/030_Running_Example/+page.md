---
title: Example Used Across the Documentation
description: Learn about the Insurance DSL example used throughout the Freon documentation, including its structure, main concepts, and UML model.
tags: example, Insurance DSL, language structure, UML, BaseProduct, InsuranceProduct, CalcFunction, Freon
---

<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Example Used Across the Documentation

In order to provide examples in this section of the website, we have created an example DSL called
_Insurance_. This example is consistently applied across all pages in this section of the website.
It’s helpful to understand what this DSL is about before exploring the examples. The complete sources
of the DSL are available in the `samples` directory of the `master` branch on <a href="https://github.com/freon4dsl/Freon" target="_blank">
GitHub</a>.

The gist of the _Insurance_ language is
that it defines two types of units. One unit holds a set of parts of insurance products for a single theme,
like 'Home', or 'Health'. This set is called a `BaseProduct`. The second contains a complete insurance
product that consists of a number of insurance parts from one or more `BaseProducts`. This is called an
`InsuranceProduct`.

An `InsuranceProduct` has an expression called `calculation` that describes the expected cost of this product.
To simplify this expression helper functions may be defined. Each of these is called a `CalcFunction`.

The following figure shows a UML class diagram of the concepts in the language.

<Figure 
imageName={'documentation/docu-project-uml.png'} 
caption={'UML diagram of Insurance Project'}
figureNumber={1}
/>
