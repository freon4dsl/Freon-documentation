<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Number Projections

Freon offers a slider control to display a number value.
You can set a default for the display of a number value in the [`global`](/Documentation/Defining_an_Editor/Global_Projections) section of the
default editor. However, a slider is not often the preferred default display. 

## Sliders

The slider control is
indicated by adding the keyword `slider` to the property projection. When hovering over the 
slider button the actual value of the property is shown.

For the sake of the example, we have added two number properties to the concept `BaseProduct`.

```freon
// DocuProject/src/defs/language-main.ast#L34-L36

range: number;
nrOfUse: number;
// The previoud two properties are present to show the different options for displaying numbers.
```

The added properties are displayed like this.

```freon
// DocuProject/src/defs/editor-main-controls.edit#L12-L13

expected nr of use: ${self.nrOfUse}
range: ${self.range slider}
```

Which results in the following.

<Figure
imageName={'documentation/Documentation-Number-Projections-screenshot1.png'}
caption={'A number slider control'}
figureNumber={1}
/>
