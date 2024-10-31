<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Developing a Language with Freon

Developing a Language with Freon is usually done taking the following steps.

1. Develop the [metamodel](/Developing_a_Language/Default_Level).
2. Add the concrete syntax by adding an
   [editor definition](/Developing_a_Language/Definition_Level/Editor_Definition).
3. Add scoping, typing and validation information
   (see [Freon Definition level](/Developing_a_Language/Definition_Level)).
4. Fine-tune the result on the [API level](/Developing_a_Language/API_Level).

If you are working with Webstorm, you might consider installing the
plugin <a href="https://plugins.jetbrains.com/plugin/7677-awesome-console" target="_blank">Awesome Console</a>.
This plugin redirects a click on an error message in the console to the correct position in any of the language definition files.

## The Example

In this section we will be using the _Insurance_ language as example. The gist of the _Insurance_ language is
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

We are working on a few other examples. You can find them in the `samples` folder in the
development branch of <a href="https://github.com/freon4dsl/Freon4dsl" target="_blank">Freon</a>.
