<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# External Components

<Note><svelte:fragment slot="header">External components are experimental</svelte:fragment>
<svelte:fragment slot="content">
<p>Using external components in the Freon editor is an experimental feature. There are no guarantees
that the editor will function correctly with every component library. Neither can we guarantee that the 
manner in which external components are included will remain the same in next versions of Freon.</p>
</svelte:fragment></Note>

In this version of Freon it is possible to include UI components that are not native to Freon. For
instance, you can define your own components, or use components from a UI component library.
As Freon is built using the <a href="https://svelte.dev/" target="_blank">Svelte</a> UI framework, all external components 
should either be Svelte components, or components that are wrapped in a Svelte component. 

In general, there are three forms in which an external component can be present in a Freon projection:

- simple additions, where an independent external component is added to a projection,
- wrappers, where the projection of a property, or a [fragment](/Documentation/Defining_an_Editor/Fragments), is displayed within an external component,
- replacers, where the projection of a property, or a [fragment](/Documentation/Defining_an_Editor/Fragments), is completely 
replaced by an external component. It is up to the language engineer to get and set the value of the property correctly, and to
get tabbing etc. working.

Especially the two latter cases require knowledge of the Freon [Box Model](/Documentation/Under_the_Hood/Editor_Framework). 
Please, become familiar with that topic first, as below we will refer to the different types of boxes associated with
the various forms of external components. More information on the API of these box types can be 
found in [External Component Box Types](/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types).

## More Information and Assistance

Because external components are in an experimental phase, the information included here is brief.
However, a more extensive example can be found in the [Examples](/Examples/External_Components) section.
Furthermore, anyone who is interested in using external components can certainly rely on the assistance of the Freon team.
Please get in contact with us, for instance via email at info AT freon4dsl.dev. This will also 
ensure that you are updated on the latest news about this feature.

## Simple additions

Simple additions have no link to the model (the AST). They may appear anywhere in the projection.
To include a simple external component within a projection, use the
syntax `[external = <COMPONENT_NAME> ]`, where `<COMPONENT_NAME>` is the name of the desired component.
Ensure there is no space between the opening square bracket (`[`) and the keyword `external`, and note that the
component name must be included in the [`global`](/Documentation/Defining_an_Editor/Global_Projections) section of the
default editor. The box type associated with a simple addition is `ExternalSimpleBox`.

In the next example a simple animated gif component is added to the fragment projection.

```proto
// DocuProject/src/defs/editor-externals.edit#L11-L17

    is still under construction: ${self.isUnderConstruction switch}
    is approved level1: ${self.isApprovedLevel1 radio}
    is approved level2: ${self.isApprovedLevel2 inner-switch}
    is approved level3: ${self.isApprovedLevel3 checkbox}
    [external=AnimatedGif number="1"]
]
fragment SecondCard [
```

<Figure
imageName={'documentation/Documentation-Externals-screenshot1.png'}
caption={'Adding an animated gif'}
figureNumber={1}
/>

## Parameters and Required Functions

You can set parameters to an external component in the `.edit` file. These are simple key-value pairs, both key
and value are strings. There can be a list of them. In the interface of all box types for external 
components the method `findParam(key: string): string` is included. This
method can be used to find the value of the parameter that was included in the `.edit` file.

In every external component two `export let` parameters, and four specific methods need to be provided
in order for the component to fit in the Freon framework. The parameters are the 
following, where `BOXTYPE` is the type of the box associated 
with the external component.

```ts
    export let box: BOXTYPE;
    export let editor: FreEditor;
```

The methods are:

- `box.setFocus`: used to set the focus on a part of the content of the component.
- `box.refreshComponent`: called when the underlying Freon model is changed and its representation on the screen needs to be changed as well.
- `onMount`: executes when the component is mounted.
- `afterUpdate`: executes when the DOM is updated.

In the simple additions example the parameter is a number, which is used to choose the image source from a list. 
The source of the AnimatedGif Svelte component is the following. 

```ts
// DocuProject/externals/ShowAnimatedGif.svelte

<script lang="ts">

    import {ExternalSimpleBox, FreEditor} from "@freon4dsl/core";
    import {afterUpdate, onMount} from "svelte";

    let src1 = '/cats-kittens.gif';
    let name1 = 'Two kittens licking';
    let src2 = '/rick-roll-rick-rolled.gif';
    let name2 = 'Rick Astley dancing';
    let src3 = '/lenny-confetti-hired-kitten.gif';
    let name3 = 'Staring kitten';

    // Freon expects both of these to be present, even if they are not used.
    export let box: ExternalSimpleBox;
    export let editor: FreEditor;

    let src: string = src1;
    let name: string = name1;

    function getSrc() {
        let nrOfSrc: number = Number.parseInt(box.findParam("number"));
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
    // execute this function to set the initial values
    getSrc();

    // The following four functions need to be included for the editor to function properly.
    // Please, set the focus to the first editable/selectable element in this component.
    // If this element is not focusable, then do not use this function. Freon will direct
    // the focus to the parent of this component.

    // async function setFocus(): Promise<void> {
    // }
    const refresh = (why?: string): void => {
        // do whatever needs to be done to refresh the elements that show information from the model
        getSrc();
    };
    onMount(() => {
        getSrc();
        // box.setFocus = setFocus;
        box.refreshComponent = refresh;
    });
    afterUpdate(() => {
        // box.setFocus = setFocus;
        box.refreshComponent = refresh;
    });
</script>

<!-- {src} is short for src={src} -->
<img {src} alt="{name}" />

```

## Wrapping a Freon Projection

An external component may wrap a Freon projection, either a property projection or 
a [fragment projection](/Documentation/Defining_an_Editor/Fragments).
Wrappers may appear anywhere in a projection. 
The wrapped projection is called the `childBox` of the external component, and can be accessed 
through the method `getChildBox(): Box`.
Note that the childBox itself may be a vertical or horizontal layout containing many other elements.

The syntax to position the wrapper within the projection is either `[fragment NAME wrap=ExternalComponent]`, where `NAME` is
the name of the fragment, and `ExternalComponent` is the name of the external component, 
or `${self.PROPERTY wrap=ExternalComponent}`, where `self.PROPERTY` is the familiar reference to a property.

The box type associated with a wrapper is dependent upon the type of property or fragment that is being wrapped.
(See [External Component Box Types](/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types).)

- Fragment: `FragmentWrapperBox`.
- Property of type string: `StringWrapperBox`. 
- Property of type number: `NumberWrapperBox`. 
- Property of type boolean: `BooleanWrapperBox`.
- [Part property](/Documentation/Creating_the_Metamodel/Defining_Properties#part-properties-3): `PartWrapperBox`.
- [Part list property](/Documentation/Creating_the_Metamodel/Defining_Properties#part-properties-3): `PartListWrapperBox`.
- [Reference property](/Documentation/Creating_the_Metamodel/Defining_Properties#reference-properties-4): `RefWrapperBox`.
- [Reference list property](/Documentation/Creating_the_Metamodel/Defining_Properties#reference-properties-4): `RefListWrapperBox`.

To display the childBox the external component needs to include the Freon `RenderComponent`, as shown in the next example.
In this example the component `Card` is imported from the <a href="https://sveltematerialui.com/" target="_blank">SMUI</a> library of UI components.

```svelte
// DocuProject/externals/SMUI_Card_Component.svelte#L30-L34

<span class="card-container">
    <Card>
        <RenderComponent box={box.childBox} editor={editor} />
    </Card>
</span>
```

## Replacing a Freon Projection

A Freon projection may also be replaced by an external component. Note that 
a [fragment projection](/Documentation/Defining_an_Editor/Fragments) may not be replaced.

The syntax to position the replacement within the projection is `${self.PROPERTY replace=ExternalComponent}`, 
where `self.PROPERTY` is the familiar reference to a property and `ExternalComponent` is the name of the external component.

The box type associated with a replacement is dependent upon the type of property that is being replaced.
(See [External Component Box Types](/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types).)

- Property of type string: `ExternalStringBox`.
- Property of type number: `ExternalNumberBox`.
- Property of type boolean: `ExternalBooleanBox`.
- [Part property](/Documentation/Creating_the_Metamodel/Defining_Properties#part-properties-3): `ExternalPartBox`. 
- [Part list property](/Documentation/Creating_the_Metamodel/Defining_Properties#part-properties-3): `ExternalPartListBox`.
- [Reference property](/Documentation/Creating_the_Metamodel/Defining_Properties#reference-properties-4): `ExternalRefBox`.
- [Reference list property](/Documentation/Creating_the_Metamodel/Defining_Properties#reference-properties-4): `ExternalRefListBox`.

Each of the box types provide the following methods, where `<TYPE>` depends on the type of the property being replaced.
- `getPropertyName(): string`: returns the name of the wrapped property.
- `getPropertyValue(): <TYPE>`: returns the value of the wrapped property.
- `setPropertyValue(newValue: <TYPE>)`: sets the value of the property.

In the following example the `name` property of a `BaseProduct` is being displayed using a dialog component from 
the <a href="https://sveltematerialui.com/" target="_blank">SMUI</a> UI library.

```proto
// DocuProject/src/defs/editor-externals.edit#L5-L5

Base Product for ${self.theme radio} ${self.name replace=SMUI_Dialog buttonLabel = "Change Product Name"}
```

<Figure
imageName={'documentation/Documentation-Externals-screenshot2.png'}
caption={'Replacing a string property with a dialog'}
figureNumber={1}
/>

## Wiring

The setup for including external components needs some care.

1. Of course, as first step you need to create your Svelte components. Be sure to which type of box your component will be
   linked. Use the box interface to get and set any model values.
2. You must let the Freon generator know which external projections there are. This done in the `global` section of the
   default editor. See [Global Projections](/Documentation/Defining_an_Editor/Global_Projections).
3. You must let the Freon runtime know which external projections there are. This is done using the `setCustomComponents()` method
    from the '@freon4dsl/core-svelte' package. This method should be called in the `~src/starter.ts` file before starting the actual application. Note that 
the names of the component should be equal to the names used in step 2.

The following is an example of the use of this method.

```ts
setCustomComponents([
   {component: ShowAnimatedGif, knownAs: "AnimatedGif"},
   {component: SMUI_Card_Component, knownAs: "SMUI_Card"},
   {component: SMUI_Accordion, knownAs: "SMUI_Accordion"},
   {component: SMUI_Dialog, knownAs: "SMUI_Dialog"},
   {component: DatePicker, knownAs: "DatePicker"}
]);

/**
 * Now start the app ...
 */
const app = new FreonLayout({
	target: document.body,
});

export default app;
```

## Nesting

External projections may be nested.
Example:

```proto
external SMUI_Card [
    This Card is showing animated gif number 1.
        [external=AnimatedGif number="1"]
    ]
```
