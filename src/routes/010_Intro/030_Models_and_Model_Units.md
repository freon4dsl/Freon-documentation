<script>
    import Note from "../../lib/notes/Note.svelte";
</script>

# Models Often Become Too Large

Contrary to what is common in the world of <a href="https://en.wikipedia.org/wiki/Domain-specific*language" target="_blank">Domain Specific Languages (DSLs)</a>
we believe that a model
is often too large to handle. When dealing with source code, the times have long gone that a complete
application was written in a single file. Since the 1980s every self-respecting programming language has supported some kind of modularization.
It is our strong conviction that this approach should also be taken when dealing with models.

## Introducing Model Units
Similar to how the source code for a single application is split into classes and/or modules, every model in ProjectIt is split
into **model units**. Each model may contain units of multiple types, either an array of units, or a single unit. The next example
shows how to define model units. Here, 
an *InsuranceModel* consists of a list of *Parts* and a list of *Products*.

```ts
// docu-project/defs/language-main.ast#L7-L20

model InsuranceModel {
    parts: Part[];              // units that hold partial definitions of insurance products
    products: Product[];        // units that hold sellable insurance products
}

modelunit Part {
    part: BaseProduct;          // one collection of partial insurance products
    file-extension = "base";    // the file extension used by the parser
}

modelunit Product {
    product: InsuranceProduct;  // one collection of sellable insurance products
    file-extension = "prod";    // the file extension used by the parser
}
```

The notion of model units has been around for some time. Actually, we have 
published a number of papers on the topic.
* At *Eclipse Summit 2008 Modeling Symposium* model units were introduced in _Big Models 
  an Alternative Approach_.
* Earlier, model units were described under the term 'Partial Models' at the ECMDA-FA 2007 conference 
  in a paper called _Building a Flexible Software Factory Using Partial Domain Specific Models_.
* More recently model units have been used within the 
  <a href="https://www.mendix.com/"target="_blank">Mendix</a> meta-model to allow for working with large models
  in their web based modeling tools. This work was presented at Splash 2016 in _Making Mendix Meta Model Driven_.

## <a name="public"></a> Model Unit Interfaces
Another essential idea that we borrow from programming is **information hiding**.
Every model unit in ProjectIt defines an interface.
The interface determines which elements from the model unit are visible (i.e. can be referred to) 
in other units in the same model.

In a ProjectIt definition of the language structure (the [.ast file](/010_Intro/040_A_Language_in_Five_Parts)) 
concepts and properties can be defined to be **private**.
Whereas other parts of a model unit can be referenced from another model unit,i.e. the **public** parts, private parts can only be referenced from
the same model unit.
The default scoper (the one from the [default level](/010_Intro/050_Three_Levels_of_Customization#level1))
already takes
the difference between public and private concepts and properties into account when resolving references.

<Note><svelte:fragment slot="header"> What is referable is determined by the language engineer.</svelte:fragment>
<svelte:fragment slot="content">
The language designer defines which elements in a model are referable.
From the point of view of the user this is a given part of the language (s)he is using.
This is similar to restrictions in a programming language that state that only certain 
types of elements may be exported/imported.
</svelte:fragment></Note>

<Note><svelte:fragment slot="header"> By-name References.</svelte:fragment><svelte:fragment slot="content">
References are by name, like they are in programming languages.
This is unlike many other modeling environments, where references are done by id.
</svelte:fragment></Note>
