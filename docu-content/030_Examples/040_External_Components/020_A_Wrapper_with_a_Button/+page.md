<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# A Wrapper with a Button

In this part we will add a component that takes a native Freon component
as an internal or child component. Such an external component is called a wrapper.
We will be using components from the <a href="https://sveltematerialui.com/" target="_blank">SMUI</a> UI library.
Note that we are still using Svelte version 4 and SMUI version 7. Unfortunately, the latest versions 
came too late for us to incorporate them. It is on our todo list, though.

This example shows how to get the information from the AST, and use it
for whatever purpose seems useful. Here, we will simply take a person's phone number, and show it 
in yet another component, but you could send the number to an external system that is able to set up a phone call,
or a system that checks the number against another database. Let your imagination run free.

Start by creating a Svelte component, and name it `PhoneButton.svelte`.

## Create the Svelte Component

There's a lot going on in this component, so let's break it down. Every Svelte component has three parts: 
the script, the HTML, and the style part. Take a look at each part separately.

### The Script Part

As explained, in the script part of the component there are the two mandatory parameters: `box` and `editor`. As 
the type of the box we are using
`NumberWrapperBox`, which, as the name indicates, is capable of wrapping the box for a node of
type `number`. The interface of the `NumberWrapperBox` offers three methods (see
[Wrapping Property Projections of Primitive type](/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types#wrapping-property-projections-of-primitive-type-5)).
You can get the name of the property that is wrapped in your external component, its current value, 
and you can get the wrapped box.

```ts
// CourseSchedule/step3/PhoneButton.svelte#L8-L9

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
// CourseSchedule/step3/PhoneButton.svelte#L16-L18

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
// CourseSchedule/step3/PhoneButton.svelte#L19-L21

const refresh = (why?: string): void => {
    // do whatever needs to be done to refresh the elements that show information from the model
};
```

For the focus and refresh functions to work they must be communicated to the box. This is done in 
both the `onMount` and `afterUpdate` functions, which are built-in Svelte functions.

```ts
// CourseSchedule/step3/PhoneButton.svelte#L22-L29

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
// CourseSchedule/step3/PhoneButton.svelte#L33-L36

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
// CourseSchedule/step3/PhoneButton.svelte#L38-L43

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
// CourseSchedule/step3/PhoneButton.svelte#L45-L52

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
// CourseSchedule/step3/PhoneButton.svelte

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

## Add the Component to the Global Section

Again, we must let the Freon code generator know that the component exists, so we adjust 
the [`global` section](/Documentation/Defining_an_Editor/Global_Projections) of the default editor.

```proto
// CourseSchedule/step3/main.edit#L3-L8

global {
    external {
        PersonIcon,
        PhoneButton
    }
}
```

## Include the Component in the Projection

To include the new component in the projection we augment the phone number property with the text `wrap=PhoneButton`.

```proto
// CourseSchedule/step3/externals.edit

editor externals

Person {[
    [fragment nameAndIcon]
        Availability: ${self.availability checkbox} Competence: ${self.competence}
]
fragment nameAndIcon [
[external=PersonIcon] Nickname: ${self.name}
Full Name: ${self.fullName}
${self.phone wrap=PhoneButton}
]
}

```

## Adjust the Starter

Now all that is left to do is to let the Freon editor know how to instantiate the new component.
We add a line to `setCustomComponents` in the starter code.

```ts
// CourseSchedule/step3/starter.ts#L21-L24

setCustomComponents([
    { component: PersonIcon, knownAs: "PersonIcon" },
    { component: PhoneButton, knownAs: "PhoneButton" }
]);
```

## The result

When all is done, the editor should look like this.

<Figure
imageName={'examples/CourseSchedule/Screenshot-step3.png'}
caption={'Editor with added Phone Button'}
figureNumber={1}
/>
