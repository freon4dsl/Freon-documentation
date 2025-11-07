---
title: Number Projections
description: Learn how to display numeric properties in Freon using the slider control and how to configure default number projections in the global editor settings.
tags: number projections, slider, numeric properties, editor controls, global projections, projectional editor, Freon, DSL development
---

<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Number Projections

Freon offers a slider control displaying numeric values.
You can set a default for the display of a number value in the [`global`](/Documentation/Defining_an_Editor/Global_Projections) section of the
default editor. However, a slider is rarely the preferred default display option. 

## Sliders

The slider control is
indicated by adding the keyword `slider` to the property projection. When hovering over the 
slider button the actual property value is shown.

For the sake of the example, we have added two number properties to the concept `BaseProduct`.

```proto
// Insurance/src/defs/language-main.ast#L34-L36

range: number;
nrOfUse: number;
// The previous two properties are present to show the different options for displaying numbers.
```

The added properties are displayed like this.

```proto
// Insurance/src/defs/editor-main-controls.edit#L12-L13

expected nr of use: ${self.nrOfUse}
range: ${self.range slider}
```

Which results in the following.

<Figure
imageName={'documentation/Documentation-Number-Projections-screenshot1.png'}
caption={'A number slider control'}
figureNumber={1}
/>
