<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# A Wrapper with a Button

In this part of the example, we'll walk through the steps to create a custom wrapper component in Freon.
This component will wrap a native Freon component, using
the <a href="https://sveltematerialui.com/" target="_blank">SMUI</a> (Svelte Material UI) library.
Our example will show how to combine a person’s phone number
with a special button that can trigger actions using the stored information.
Here, a person's phone number is shown in a snackbar notification, but you could do all sorts of things, like sending
the number to an external system that is able to set up a phone call,
or to a system that checks the number against another database. Let your imagination run free.

*Note: This guide assumes Svelte version 4 and SMUI version 7. Updates to newer versions
will follow in subsequent releases.*

Let's dive into the steps!

## Step 1: Create the Svelte Component

We will create a new Svelte component called `PhoneButton.svelte`, which will act as a 
wrapper for a phone number and provide a button to trigger actions. Take a look at the 
three key parts: **Script**, **HTML**, and **CSS**.

### The Script Part

In the script section, we declare the two mandatory parameters: `box` and `editor`. The 
`box` is of type `NumberWrapperBox`, which is capable of wrapping a number node. 
(See [Wrapping Property Projections of Primitive type](/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types#wrapping-property-projections-of-primitive-type-5) for more on the interface of
the `NumberWrapperBox`.)

```ts
// CourseSchedule/phase3/src/external/PhoneButton.svelte#L8-L9

export let box: NumberWrapperBox;
export let editor: FreEditor;
```

We also define four functions that together make sure that the editor is updated correctly
whenever the underlying AST (e.g. by adding, or removing nodes) or box model (e.g. by 
selecting a different view) changes.

First, we define the `setFocus` function to handle focus changes within the component, and a `refresh` function to update the values when the underlying model changes:

```ts
// CourseSchedule/phase3/src/external/PhoneButton.svelte#L16-L21

async function setFocus(): Promise<void> {
    box.childBox.setFocus();
}
const refresh = (why?: string): void => {
    // do whatever needs to be done to refresh the elements that show information from the model
};
```

Make sure these functions are passed to the box using the `onMount` and `afterUpdate` lifecycle hooks:

```ts
// CourseSchedule/phase3/src/external/PhoneButton.svelte#L22-L29

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

The HTML section of the component consists of a wrapper `div` that contains the phone number 
and an `IconButton` from the SMUI library.

The wrapped box cannot be included directly, as it is a box, not a component. Freon offers a component
that is able to render any box known to the Freon framework. It takes the box and the editor parameters, 
which is the reason these parameters are mandatory. This component is called `RenderComponent` and must 
be imported from the Freon core-svelte package.

We set up the button to open a snackbar notification when clicked:

```ts
// CourseSchedule/phase3/src/external/PhoneButton.svelte#L33-L36

<div class="wrapper">
    Phone number: <RenderComponent box={box.childBox} editor="{editor}"/>
    <IconButton class="material-icons" on:click={() => {clicked++; snackbarWithClose.open()}} ripple={false}>phone</IconButton>
</div>
```

Next, we define the `Snackbar` element from SMUI, which will show a message when the phone 
button is clicked. The message includes the value of the phone number:

```ts
// CourseSchedule/phase3/src/external/PhoneButton.svelte#L38-L43

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
// CourseSchedule/phase3/src/external/PhoneButton.svelte#L45-L52

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

Here's the complete `PhoneButton.svelte` component:

```ts
// CourseSchedule/phase3/src/external/PhoneButton.svelte

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

## Step 2: Add to the Global Section

To make the Freon code generator aware of our new component, we need to modify 
the [`global`](/Documentation/Defining_an_Editor/Global_Projections) section of the default editor configuration. Add 
the `PhoneButton` component here:

```proto
// CourseSchedule/phase3/defs/main.edit#L3-L8

global {
    external {
        PersonIcon,
        PhoneButton
    }
}
```

## Step 3: Include in the Projection

Next, we need to include the `PhoneButton` in the projection for the `Person` model. 
To do this, we modify the phone number property in the `externals.edit` file, 
adding the `wrap=PhoneButton` directive:

```proto
// CourseSchedule/phase3/defs/externals.edit

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

## Step 4: Register in the Starter Code

Finally, we need to let the Freon editor know how to instantiate our new `PhoneButton` 
component. We do this by adding the component to the `setCustomComponents` function 
in the starter code:

```ts
// CourseSchedule/phase3/src/external/externals.ts

import {setCustomComponents} from "@freon4dsl/core-svelte";
import PersonIcon from "./PersonIcon.svelte";
import PhoneButton from "./PhoneButton.svelte";

/**
 * Configure the external components used, so Freon can find them.
 */
export function configureExternals() {
    setCustomComponents([
        { component: PersonIcon, knownAs: "PersonIcon" },
        { component: PhoneButton, knownAs: "PhoneButton" },
    ]);
}

```

## Final Result

Once everything is set up, your Freon editor will look like this, with the added phone number button that opens a snackbar notification when clicked:

<Figure
imageName={'examples/CourseSchedule/Screenshot-step3.png'}
caption={'Editor with added Phone Button'}
figureNumber={1}
/>

### Conclusion

You’ve now successfully added a custom wrapper component to the Freon editor! 
This component wraps the phone number and includes a button that opens a 
snackbar with the phone number displayed. With this knowledge, you can 
start creating more complex components that integrate seamlessly with the Freon editor!

Next, you are going to learn how to replace the component that renders a list.

