<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Replacing a Part List

The next change of the staff model unit is to use an Accordion to show the list of
teachers. We are going to completely replace the projection of the `teachers` property 
of the model unit `Staff`. This leaves the responsibility of changing the list by adding, 
replacing, or removing elements completely up to you, the language designer. Fortunately,
the projection of the elements itself is still handled by Freon.

Let's go for it, and create a new Svelte component with the name `StaffAccordion.svelte`.

## Create the Svelte Component

Again we are going to look at each of the three parts of the Svelte component separately.

### The Script Part

The two mandatory parameters: `box` and `editor` are present. As
the type of the box we are using
`ExternalPartListBox`, which, as the name indicates, is capable of wrapping the box for a node of
type `number`. The interface of the `NumberWrapperBox` offers three methods (see
[Wrapping Property Projections of Primitive type](/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types#wrapping-property-projections-of-primitive-type-5)).
You can get the name of the property that is wrapped in your external component, its current value,
and you can get the wrapped box.

```ts
// CourseSchedule/step4/StaffAccordion.svelte#L8-L9

export let box: NumberWrapperBox;
export let editor: FreEditor;
```

Next, there are four functions that together make sure that the editor is updated correctly
whenever the underlying AST
(e.g. by adding, or removing nodes) or box model (e.g. by selecting a different view) changes.

The first of the four is a function that is called when the editor wants to set the focus
to this component. It could, for instance, be implemented by redirecting the focus to an HTML element
in the component. Here we redirect the focus to the child box.

```ts
// CourseSchedule/step4/StaffAccordion.svelte#L16-L18

async function setFocus(): Promise<void> {
    box.childBox.setFocus();
}
```

The second is a function that should refresh any values used within the component that are dependent upon
the AST node. Because only you as maker of this component know which these values are,
you need to provide your own implementation of this function. It is called when the box is dirty,
and refreshes the corresponding component. Here we do not show values from the AST other than the value
in the wrapped box, and this takes care of its own, so we do not implement this function.

```ts
// CourseSchedule/step4/StaffAccordion.svelte#L19-L21

const refresh = (why?: string): void => {
    // do whatever needs to be done to refresh the elements that show information from the model
};
```

For the focus and refresh functions to work they must be communicated to the box. This is done in
both the `onMount` and `afterUpdate` functions, which are built-in Svelte functions.

```ts
// CourseSchedule/step4/StaffAccordion.svelte#L22-L29

onMount(() => {
    box.setFocus = setFocus;
    box.refreshComponent = refresh;
});
afterUpdate(() => {
    box.setFocus = setFocus;
    box.refreshComponent = refresh;
});
```

### The HTML Part

The actual HTML in the component consists of a div with the wrapped box, together with an icon button.
The wrapped box cannot be included directly, as it is a box, not a component. Freon offers a component
that is able to render any box known to the Freon framework. It takes the box and the editor parameters,
which is the reason these parameters are mandatory. This component is called `RenderComponent` and must
be imported from the Freon core-svelte package.

```ts
// CourseSchedule/step4/StaffAccordion.svelte#L33-L36

<div class="wrapper">
    Phone number: <RenderComponent box={box.childBox} editor="{editor}"/>
    <IconButton class="material-icons" on:click={() => {clicked++; snackbarWithClose.open()}} ripple={false}>phone</IconButton>
</div>
```

The `on:click` method of the icon button increases a `clicked` variable,
and opens a snackbar. The latter is defined by the following HTML. In it, the value of the phone number
is taken from the box using `box.getPropertyValue()`. Note that `IconButton`, `Snackbar`, `Actions`, and `Label`
must be imported from the SMUI library, so don't forget to update the dependencies section of your `package.json`.

```ts
// CourseSchedule/step4/StaffAccordion.svelte#L38-L43

<Snackbar bind:this={snackbarWithClose}>
    <Label>This person has been called on number {box.getPropertyValue()}.</Label>
    <Actions>
        <IconButton class="material-icons" title="Dismiss">close</IconButton>
    </Actions>
</Snackbar>
```

### The Style Part

Finally, we have added some styling for the div that wraps the phone number. The styling
of the SMUI components is all done using the <a href="https://sveltematerialui.com/THEMING.md" target="_blank">SMUI theming</a>,
which is already set up because it is also used for the surrounding web application.

```ts
// CourseSchedule/step4/StaffAccordion.svelte#L45-L52

<style>
    .wrapper {
        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>
```

### The Complete Component

The complete Svelte component is the following.

```ts
// CourseSchedule/step4/StaffAccordion.svelte

<script lang="ts">
    import IconButton from "@smui/icon-button";
    import Snackbar, { Actions, Label } from '@smui/snackbar';
    import {RenderComponent} from "@freon4dsl/core-svelte";
    import {FreEditor, NumberWrapperBox} from "@freon4dsl/core";
    import {afterUpdate, onMount} from "svelte";

    export let box: NumberWrapperBox;
    export let editor: FreEditor;

    let clicked: number = 0;
    let snackbarWithClose: Snackbar;

    // The following four functions need to be included for the editor to function properly.
    // Please, set the focus to the first editable/selectable element in this component.
    async function setFocus(): Promise<void> {
        box.childBox.setFocus();
    }
    const refresh = (why?: string): void => {
        // do whatever needs to be done to refresh the elements that show information from the model
    };
    onMount(() => {
        box.setFocus = setFocus;
        box.refreshComponent = refresh;
    });
    afterUpdate(() => {
        box.setFocus = setFocus;
        box.refreshComponent = refresh;
    });

</script>

<div class="wrapper">
    Phone number: <RenderComponent box={box.childBox} editor="{editor}"/>
    <IconButton class="material-icons" on:click={() => {clicked++; snackbarWithClose.open()}} ripple={false}>phone</IconButton>
</div>

<Snackbar bind:this={snackbarWithClose}>
    <Label>This person has been called on number {box.getPropertyValue()}.</Label>
    <Actions>
        <IconButton class="material-icons" title="Dismiss">close</IconButton>
    </Actions>
</Snackbar>

<style>
    .wrapper {
        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>

```

## Include the Component in the Projection

To include the new component in the projection we augment the teachers property with the text `replace=StaffAccordion`, and
we add a value for the `multi` parameter. Note that parameter passing is string based. There are no checks on any types or values.

```proto
// CourseSchedule/step4/externals.edit#L14-L18

Staff {[
Staff in the category: ${self.name}

    ${self.teachers replace=StaffAccordion multi="multiple"}
]}
```

## Do the Admin

All that is left to do, is the familiar admin.

### Add the Component to the Global Section

Adjust the [`global` section](/Documentation/Defining_an_Editor/Global_Projections) of the default editor.

```proto
// CourseSchedule/step4/main.edit#L3-L9

global {
    external {
        PersonIcon,
        StaffAccordion,
        StaffAccordion
    }
}
```

### Adjust the Starter

Add the `StaffAccordion` component to `setCustomComponents` in the starter code.

```ts
// CourseSchedule/step4/starter.ts#L22-L26

setCustomComponents([
    { component: PersonIcon, knownAs: "PersonIcon" },
    { component: PhoneButton, knownAs: "PhoneButton" },
    { component: StaffAccordion, knownAs: "StaffAccordion" }
]);
```

## The result

When all is done, the editor should look like this.

<Figure
imageName={'examples/CourseSchedule/Screenshot-step4.png'}
caption={'Editor with added Phone Button'}
figureNumber={1}
/>
