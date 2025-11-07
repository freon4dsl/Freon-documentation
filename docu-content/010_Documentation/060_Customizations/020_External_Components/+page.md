---
title: External Components
description: How to embed non-native UI components in Freon projections—simple additions, wrappers, and replacers—plus required props, lifecycle hooks, and wiring.
tags: external components, editor, projections, wrappers, replacers, Svelte, Box Model, Freon, DSL development
---

<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# External Components

<Note>{#snippet header()}External components are fully supported{/snippet}
{#snippet content()}
<p>External components are now a fully supported part of the editor framework. 
While compatibility with every third-party library cannot be guaranteed, the APIs described here are stable.</p>
{/snippet}
</Note>

You can include UI components that are not native to Freon. For example, you can define your own components
or use components from an existing UI library. Freon is built on the
<a href="https://svelte.dev/" target="_blank">Svelte</a> framework, so external components must either be Svelte components
or components wrapped in Svelte.

In general, there are three forms in which an external component can be present in a Freon projection:

- **Simple additions** — an independent external component is added to a projection.
- **Wrappers** — a property or [fragment](/Documentation/Defining_an_Editor/Fragments) is displayed inside an external component.
- **Replacers** — a property is replaced by an external component (fragments cannot be replaced).  
  You are responsible for reading and writing property values correctly, and for handling keyboard and tab behavior.

Especially the two latter cases require knowledge of the Freon [Box Model](/Documentation/Under_the_Hood/Editor_Framework).
Please become familiar with that topic first, as below we will refer to the different types of boxes associated with
the various forms of external components. More information on the API of these box types can be
found in [External Component Box Types](/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types).

## More Information and Assistance

This page provides the essentials; a more extensive example is available in the
[Examples](/Examples/External_Components) section.  
Anyone interested in using external components can contact the Freon team for assistance.  
Please email us at [info@openmodeling.nl](mailto:info@openmodeling.nl) to stay updated on the latest news about this feature.

## Simple Additions

Simple additions have no link to the model (the AST). They may appear anywhere in the projection.
To include a simple external component within a projection, use the syntax `[external=<COMPONENT_NAME>]`,
where `<COMPONENT_NAME>` is the name of the desired component.  
Ensure there is no space between the opening bracket (`[`) and the keyword `external`.  
The component name must be included in the [`global`](/Documentation/Defining_an_Editor/Global_Projections) section of the
default editor.  
The associated box type is `SimpleExternalBox`.

In the next example a simple animated gif component is added to the fragment projection.

```proto
// Insurance/src/defs/editor-externals.edit#L10-L16

First Card
    is still under construction: ${self.isUnderConstruction switch}
    is approved level1: ${self.isApprovedLevel1 radio}
    is approved level2: ${self.isApprovedLevel2 inner-switch}
    is approved level3: ${self.isApprovedLevel3 checkbox}
    [external=AnimatedGif number="1"]
]
```

<Figure
imageName={'documentation/Documentation-Externals-screenshot1.png'}
caption={'Adding an animated gif'}
figureNumber={1}
/>

## Parameters and Required Functions

You can set parameters to an external component in the `.edit` file. These are simple key-value pairs (both key
and value are strings). There can be a list of them.  
All box types for external components include the method `findParam(key: string): string`  
to retrieve parameter values from the `.edit` file.

Every external component receives two props and should define the following methods/hooks to integrate with Freon:

```ts
let { editor, box }: FreComponentProps<BOXTYPE> = $props();
```

- `box.setFocus` — sets the focus on the first selectable element (optional if nothing is focusable).
- `box.refreshComponent` — called when the underlying model changes and the UI needs to update.
- `onMount` — runs when the component is mounted.
- `afterUpdate` — runs after the DOM is updated.

In the example below, the parameter is a number used to select an image source.  
The source code of the `AnimatedGif` Svelte component is shown next.

```swift
// Insurance/src/external/ShowAnimatedGif.svelte

<script lang="ts">

    import {FragmentWrapperBox, isNullOrUndefined} from "@freon4dsl/core";
    import type { FreComponentProps } from "@freon4dsl/core-svelte";

    let src1 = './customImages/cats-kittens.gif';
    let name1 = 'Two kittens licking';
    let src2 = './customImages//rick-roll-rick-rolled.gif';
    let name2 = 'Rick Astley dancing';
    let src3 = './customImages/lenny-confetti-hired-kitten.gif';
    let name3 = 'Staring kitten';

    // Freon expects both of these to be present, even if they are not used.
    // Props
    let { editor, box }: FreComponentProps<FragmentWrapperBox> = $props();

    let src: string = $state(src1);
    let name: string = $state(name1);

    function getSrc() {
        let myParam: string | undefined = box.findParam("number");
        if (!isNullOrUndefined(myParam)) {
            let nrOfSrc: number = Number.parseInt(myParam);
            switch (nrOfSrc) {
                case 1: {
                    src = src1;
                    name = name1;
                    break;
                }
                case 2: {
                    src = src2;
                    name = name2;
                    break;
                }
                case 3: {
                    src = src3;
                    name = name3;
                    break;
                }
            }
        }
    }
    // execute this function to set the initial values
    getSrc();

    // The following two functions need to be included for the editor to function properly.
    // Please, set the focus to the first editable/selectable element in this component.
    // If this element is not focusable, then do not use this function. Freon will direct
    // the focus to the parent of this component.
    // async function setFocus(): Promise<void> {
    // }
    const refresh = (why?: string): void => {
        // do whatever needs to be done to refresh the elements that show information from the model
        getSrc();
    };
    $effect(() => {
        // box.setFocus = setFocus;
        box.refreshComponent = refresh;
    });

    // execute getSrc on initialization
    getSrc();
</script>

<!-- {src} is short for src={src} -->
<img {src} alt="{name}" />

```

## Wrapping a Freon Projection

An external component may wrap a Freon projection—either a property projection or
a [fragment projection](/Documentation/Defining_an_Editor/Fragments).
Wrappers may appear anywhere in a projection.  
The wrapped projection is available as the `childBox` property (`Box`).  
Note that the `childBox` itself may be a vertical or horizontal layout containing multiple elements.

The syntax is:

- `[fragment NAME wrap=ExternalComponent]`, where `NAME` is the fragment name.
- `${self.PROPERTY wrap=ExternalComponent}`, where `self.PROPERTY` refers to a property.

The box type associated with a wrapper depends on the type of property or fragment that is being wrapped  
(see [External Component Box Types](/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types)):

- Fragment: `FragmentWrapperBox`
- Property of type string: `StringWrapperBox`
- Property of type number: `NumberWrapperBox`
- Property of type boolean: `BooleanWrapperBox`
- [Part property](/Documentation/Creating_the_Metamodel/Defining_Properties#part-properties-3): `PartWrapperBox`
- [Part list property](/Documentation/Creating_the_Metamodel/Defining_Properties#part-properties-3): `PartListWrapperBox`
- [Reference property](/Documentation/Creating_the_Metamodel/Defining_Properties#reference-properties-4): `RefWrapperBox`
- [Reference list property](/Documentation/Creating_the_Metamodel/Defining_Properties#reference-properties-4): `RefListWrapperBox`

To display the `childBox`, the external component must include the Freon `RenderComponent`, as shown below.  
In this example, a fragment is wrapped in a `Card` component imported from the
<a href="https://flowbite-svelte.com/" target="_blank">Flowbite Svelte</a> library.

```swift
// Insurance/src/external/FB_Card_Component.svelte#L25-L29

<span class="card-container">
    <Card>
        <RenderComponent box={box.childBox} editor={editor} />
    </Card>
</span>
```

```proto
// Insurance/src/defs/editor-externals.edit#L6-L6

[fragment FirstCard wrap=ExternalCard] [fragment SecondCard wrap=ExternalCard]
```

## Replacing a Freon Projection

A Freon projection may also be replaced by an external component.  
A [fragment projection](/Documentation/Defining_an_Editor/Fragments) may **not** be replaced.

The syntax is:

```proto
${self.PROPERTY replace=ExternalComponent}
```

The box type associated with a replacement depends on the type of property that is being replaced  
(see [External Component Box Types](/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types)):

- Property of type string: `StringReplacerBox`
- Property of type number: `NumberReplacerBox`
- Property of type boolean: `BooleanReplacerBox`
- [Part property](/Documentation/Creating_the_Metamodel/Defining_Properties#part-properties-3): `PartReplacerBox`
- [Part list property](/Documentation/Creating_the_Metamodel/Defining_Properties#part-properties-3): `PartListReplacerBox`
- [Reference property](/Documentation/Creating_the_Metamodel/Defining_Properties#reference-properties-4): `RefReplacerBox`
- [Reference list property](/Documentation/Creating_the_Metamodel/Defining_Properties#reference-properties-4): `RefListReplacerBox`

Each box type provides the following methods (where `<TYPE>` depends on the property type):

- `getPropertyName(): string` — returns the name of the wrapped property.
- `getPropertyValue(): <TYPE>` — returns the current property value.
- `setPropertyValue(newValue: <TYPE>)` — sets the property value.

In the following example the `name` property of a `BaseProduct` is displayed using a dialog component
from the <a href="https://flowbite-svelte.com/" target="_blank">Flowbite Svelte</a> UI library.

```proto
// Insurance/src/defs/editor-externals.edit#L5-L5

Base Product for ${self.theme radio} ${self.name replace=ExternalDialog buttonLabel = "Change Product Name"}
```

<Figure
imageName={'documentation/Documentation-Externals-screenshot2.png'}
caption={'Replacing a string property with a dialog'}
figureNumber={1}
/>

## Wiring

The setup for including external components requires some care.

1. **Create your Svelte components.**  
   Note which box type your component will link to, and use its interface to get and set model values.
2. **Declare external components in the editor definition.**  
   This is done in the `global` section of the default editor  
   (see [Global Projections](/Documentation/Defining_an_Editor/Global_Projections)).
3. **Register external components at runtime.**  
   Use `setCustomComponents()` from the `@freon4dsl/core-svelte` package.  
   Call this method in `src/starter.ts` before launching the app.  
   The component names must match those declared in step 2.

Example:

```ts
setCustomComponents([
   { component: ShowAnimatedGif, knownAs: "AnimatedGif" },
   { component: FB_Card_Component, knownAs: "FB_Card" },
   { component: FB_Accordion, knownAs: "FB_Accordion" },
   { component: FB_Dialog, knownAs: "FB_Dialog" },
   { component: DatePicker, knownAs: "DatePicker" }
]);

const app = new FreonLayout({
    target: document.body,
});

export default app;
```

## Nesting

External projections may be nested.  
Example:

```proto
[external=FB_Card [
    This Card is showing animated gif number 1.
        [external=AnimatedGif number="1"]
    ]
]
```
