---
title: Projection Fragments
description: Learn how to define and include projection fragments in Freon to organize complex editor layouts and reuse projection parts across concepts.
tags: projection fragments, fragments, editor layout, reusable projections, projectional editor, styling, Freon, DSL development
---

<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Projection Fragments

You can define parts of a projection separately to create more flexible layouts.
These parts are called **fragments**.

## Fragment Definition

A fragment is defined in a similar way to normal projections, except it starts
with the keyword `fragment`, followed by the name of the fragment. The content is given
in the familiar manner between the square brackets (`[]`). 

The next example defines two fragments called (rather unimaginative) `First` and `Second`.
Each fragment for a given concept must have a unique name.

```proto
// Insurance/src/defs/editor-fragments.edit#L8-L24

]
    fragment First [
    First Card
        is still under construction: ${self.isUnderConstruction switch}
        is approved level1: ${self.isApprovedLevel1 radio}
        is approved level2: ${self.isApprovedLevel2 inner-switch}
        is approved level3: ${self.isApprovedLevel3 checkbox}
    ]
    fragment Second [
    Second Card
        [button text="Push me!" boxRole="MyButton-role"]
        yields profit: ${self.yieldsProfit}
        expected nr of use: ${self.nrOfUse slider}
        range: ${self.range}
        date: ${self.date}
    ]
}
```

<Note {header} {content}> {#snippet header()} One property, one occurrence in the editor{/snippet}
{#snippet content()}
<p>Unfortunately, it is not possible to show the same property of a concept twice in the same editor.
The tooling we use to keep the state of the underlying model in sync with the view in the running editor
does not allow us to do this.</p>
{/snippet}
</Note>

## Fragment Inclusion

Each fragment must belong to a concept entry in a .edit file but cannot be used directly inside the main projection. 
To include a fragment within a projection, use the 
syntax `[fragment <FRAGMENT_NAME>]`, where `<FRAGMENT_NAME>` is the name of the desired fragment. 
Ensure there is no space between the opening square bracket (`[`) and the keyword `fragment`.

Thus, the complete example is the following. Note that the concept’s main projection is closed 
before defining its fragments.

```proto
// Insurance/src/defs/editor-fragments.edit#L3-L24

BaseProduct {
[
    Base Product for ${self.theme radio} ${self.name }
        [fragment First] [fragment Second]
        ${self.parts}
]
    fragment First [
    First Card
        is still under construction: ${self.isUnderConstruction switch}
        is approved level1: ${self.isApprovedLevel1 radio}
        is approved level2: ${self.isApprovedLevel2 inner-switch}
        is approved level3: ${self.isApprovedLevel3 checkbox}
    ]
    fragment Second [
    Second Card
        [button text="Push me!" boxRole="MyButton-role"]
        yields profit: ${self.yieldsProfit}
        expected nr of use: ${self.nrOfUse slider}
        range: ${self.range}
        date: ${self.date}
    ]
}
```

In this example the fragment boxes have been styled with a light yellow background. 
(More on styling can be found in [Styling](/Documentation/Defining_an_Editor/Styling).)
The styled editor looks like this.

<Figure
imageName={'documentation/Documentation-Fragments-screenshot1.png'}
caption={'Two fragments side by side'}
figureNumber={1}
/>
