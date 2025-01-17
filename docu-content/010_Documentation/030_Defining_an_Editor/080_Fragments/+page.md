<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Projection Fragments

Parts of a projection may be defined separately to provide more flexibility in the layout.
These parts are called **fragments**.

## Fragment Definition

A fragment is defined in a similar manner as normal projections, except it starts
with the keyword `fragment`, followed by the name of the fragment. The content is given
in the familiar manner between the square brackets (`[]`). 

The next example defines two fragments called (rather unimaginative) `First` and `Second`.
Note that every fragment for the same concept must have a unique name.

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

<Note><svelte:fragment slot="header"> One property, one occurrence in the editor</svelte:fragment>
<svelte:fragment slot="content">
<p>Unfortunately, it is not possible to show the same property of a concept twice in the same editor.
The tooling we use to keep the state of the underlying model in sync with the view in the running editor
does not allow us to do this.</p>
</svelte:fragment></Note>


## Fragment Inclusion

Each fragment definition must be associated with a concept entry in a .edit file, but it cannot be 
directly included in the projection. To include a fragment within a projection, use the 
syntax `[fragment <FRAGMENT_NAME>]`, where `<FRAGMENT_NAME>` is the name of the desired fragment. 
Ensure there is no space between the opening square bracket (`[`) and the keyword `fragment`.

Thus, the complete example is the following. Note that the concept's projection is closed before the
fragments are defined.

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

In this example we have styled the fragment boxes with a light yellow background. 
(More on styling can be found in [Styling](/Documentation/Defining_an_Editor/Styling).)
The styled editor looks like this.

<Figure
imageName={'documentation/Documentation-Fragments-screenshot1.png'}
caption={'Two fragments side by side'}
figureNumber={1}
/>
