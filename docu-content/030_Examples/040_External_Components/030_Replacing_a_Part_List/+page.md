---
title: Replacing a Part List
description: Replace a Freon part list with a custom Svelte accordion component. Learn to build StaffAccordion.svelte, wire it to ExternalPartListBox, manage focus and refresh, and register it for use in projections.
tags: Freon, Svelte, external components, ExternalPartListBox, StaffAccordion, Accordion, RenderComponent, AST.change, MobX, projections, CourseSchedule
---

<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Replacing a Part List

In this part of the extended example, you’ll learn how to replace a **part list** in your application by creating a custom Svelte component, `StaffAccordion.svelte`, to display and manage a list of teachers within an accordion.

## Step 1: Create the Svelte Component

We’ll create the `StaffAccordion.svelte` component to replace the default projection of the `teachers` property in the `Staff` model unit.

### The Script Section

Begin by defining the component’s parameters and the necessary state management functions:

```ts
// CourseSchedule/phase4/src/external/StaffAccordion.svelte#L9-L55

// This property is a parts list, therefore the external box to use is an ExternalPartListBox.
// Props
let { editor, box }: FreComponentProps<ExternalPartListBox> = $props();

let panelOpen: boolean[] = $state([]);      // List of booleans to indicate which panel is open (true) and closed (false).
let multiplePar: boolean = $state(false);   // Indicates whether multiple panels may be open at the same time.

let ch = $state([...box.children])
/*
    Sets all panels in the state 'closed',
    and sets the length of 'panelOpen'.
 */
function initialize() {
    let param: string | undefined = box.findParam("multi");
    if (param === "multiple") {
        multiplePar = true;
    }
    panelOpen = []
    for (let i = 0; i < box.children.length; i++) {
        // this also sets the length of panelOpen!
        panelOpen[i] = false;
        box.children[i].isVisible = false; // the child boxes are not currently shown
    }
}

// The following three functions need to be included for the editor to function properly.
// Please, set the focus to the first editable/selectable element in this component.
async function setFocus(): Promise<void> {
    for( let i=0; i < box.children.length; i++) {
        if (panelOpen[i]) {
            box.children[i].setFocus();
        }
    }
}
const refresh = (why?: string): void => {
    console.log("REFRESH ACCORDION")
    // do whatever needs to be done to refresh the elements that show information from the model
    untrack( () => initialize() );
};
const addPerson = () => {
    // Note that you need to put any changes to the actual model in a 'AST.change or AST.changeNamed',
    // because all elements in the model are reactive using mobx.
    AST.change(() => {
        let newPerson: Person = Person.create({});
        box.getPropertyValue().push(newPerson);
    });
}
```

We implement `setFocus` so that when focus is programmatically set to the list, it forwards focus to the first **open** panel’s content.  
`initialize` reads the `multi` parameter (from the `.edit` file) and initializes `panelOpen`.

We also provide `addPerson` and `removePerson` to mutate the list. Because the AST is reactive via **MobX**, changes must be wrapped in `AST.change` (or `AST.changeNamed`).

```ts
// CourseSchedule/phase4/src/external/StaffAccordion.svelte#L57-L72

const removePerson = (index: number) => {
    // Note that you need to put any changes to the actual model in a 'AST.change' or
    // 'AST.changeNamed', because all elements in the AST model are reactive using mobx.
    AST.change(() => {
        box.getPropertyValue().splice(index, 1);
    });
}
// Run the initialization
initialize();

$effect(() => {
    // $inspect.trace(`accordion for $effect ${box.children.length} id ${box.id}`)
    // console.log(`========== $effect ${box.children.length} id ${box.id}` )
    box.setFocus = setFocus;
    box.refreshComponent = refresh;
    // Needed to get an effect
```

### The HTML Section

The HTML consists of a wrapper `div` with an `Accordion` and a button to **add** items.  
Inside the `Accordion`, we iterate over `box.children`, creating a `Panel` per child.  
For each panel header, we use AST info from `childBox.node`:

- `childBox.node.freLanguageConcept()` → the meta concept name (e.g., `Person`)
- `childBox.node.freId()` → a stable id
- For ad-hoc access to properties without casting, we use **typed index access**: `childBox.node["name"]`.

The panel content renders the native Freon component for the child via `RenderComponent`, and includes a **remove** button.

```ts
// CourseSchedule/phase4/src/external/StaffAccordion.svelte#L78-L96

    });

    const colorCls: string = 'text-light-base-50 dark:text-dark-base-900 ';
    const buttonCls: string =
      'bg-light-base-600 					dark:bg-dark-base-200 ' +
      'hover:bg-light-base-900 		dark:hover:bg-dark-base-50 ' +
      'border-light-base-100 			dark:border-dark-base-800 ';
    const iconCls: string = 'ms-0 inline h-6 w-6';
</script>

<div style="display: flex; align-items: flex-end;">
    <Accordion multiple={multiplePar}>
        {#each ch as childBox, index}
            <AccordionItem bind:open={panelOpen[index]}>
                {#snippet header()}
                    {childBox.node.freLanguageConcept()} {childBox.node.freId()}
                {/snippet}

                    <div style="display: flex; align-items: flex-end;">
```

### The Complete Component

```ts
// CourseSchedule/phase4/src/external/StaffAccordion.svelte

<script lang="ts">
    import { AccordionItem, Accordion, Button } from 'flowbite-svelte';
    import { AST, ExternalPartListBox } from "@freon4dsl/core";
    import { type FreComponentProps, RenderComponent } from "@freon4dsl/core-svelte";
    import { Person } from "../freon/index.js";
    import { untrack } from "svelte"
    import { UserAddOutline, UserRemoveOutline } from 'flowbite-svelte-icons';
    // This component replaces the component for "teachers: Person[];" from model unit "Staff".
    // This property is a parts list, therefore the external box to use is an ExternalPartListBox.
    // Props
    let { editor, box }: FreComponentProps<ExternalPartListBox> = $props();

    let panelOpen: boolean[] = $state([]);      // List of booleans to indicate which panel is open (true) and closed (false).
    let multiplePar: boolean = $state(false);   // Indicates whether multiple panels may be open at the same time.

    let ch = $state([...box.children])
    /*
        Sets all panels in the state 'closed',
        and sets the length of 'panelOpen'.
     */
    function initialize() {
        let param: string | undefined = box.findParam("multi");
        if (param === "multiple") {
            multiplePar = true;
        }
        panelOpen = []
        for (let i = 0; i < box.children.length; i++) {
            // this also sets the length of panelOpen!
            panelOpen[i] = false;
            box.children[i].isVisible = false; // the child boxes are not currently shown
        }
    }

    // The following three functions need to be included for the editor to function properly.
    // Please, set the focus to the first editable/selectable element in this component.
    async function setFocus(): Promise<void> {
        for( let i=0; i < box.children.length; i++) {
            if (panelOpen[i]) {
                box.children[i].setFocus();
            }
        }
    }
    const refresh = (why?: string): void => {
        console.log("REFRESH ACCORDION")
        // do whatever needs to be done to refresh the elements that show information from the model
        untrack( () => initialize() );
    };
    const addPerson = () => {
        // Note that you need to put any changes to the actual model in a 'AST.change or AST.changeNamed',
        // because all elements in the model are reactive using mobx.
        AST.change(() => {
            let newPerson: Person = Person.create({});
            box.getPropertyValue().push(newPerson);
        });
    }

    const removePerson = (index: number) => {
        // Note that you need to put any changes to the actual model in a 'AST.change' or
        // 'AST.changeNamed', because all elements in the AST model are reactive using mobx.
        AST.change(() => {
            box.getPropertyValue().splice(index, 1);
        });
    }
    // Run the initialization
    initialize();

    $effect(() => {
        // $inspect.trace(`accordion for $effect ${box.children.length} id ${box.id}`)
        // console.log(`========== $effect ${box.children.length} id ${box.id}` )
        box.setFocus = setFocus;
        box.refreshComponent = refresh;
        // Needed to get an effect
        ch = [...box.children]
        // untrack becauise initialize causes a too many  effects error
        untrack( () => {
            initialize()
        })        
    });

    const colorCls: string = 'text-light-base-50 dark:text-dark-base-900 ';
    const buttonCls: string =
      'bg-light-base-600 					dark:bg-dark-base-200 ' +
      'hover:bg-light-base-900 		dark:hover:bg-dark-base-50 ' +
      'border-light-base-100 			dark:border-dark-base-800 ';
    const iconCls: string = 'ms-0 inline h-6 w-6';
</script>

<div style="display: flex; align-items: flex-end;">
    <Accordion multiple={multiplePar}>
        {#each ch as childBox, index}
            <AccordionItem bind:open={panelOpen[index]}>
                {#snippet header()}
                    {childBox.node.freLanguageConcept()} {childBox.node.freId()}
                {/snippet}

                    <div style="display: flex; align-items: flex-end;">
                        <RenderComponent box={childBox} editor={editor} />
<!--                        <IconButton class="material-icons" onclick={() => removePerson(index)}>remove</IconButton>-->
                        <Button tabindex={-1} id="add-button" class="{buttonCls} {colorCls} " name="removePerson" onclick={() => removePerson(index)}>
                            <UserRemoveOutline class="{iconCls}" />
                        </Button>
                    </div>
            </AccordionItem>
        {/each}
    </Accordion>

<!--    <IconButton class="material-icons" onclick={() => addPerson()}>add</IconButton>-->
    <Button tabindex={-1} id="add-button" class="{buttonCls} {colorCls} " name="addPerson" onclick={() => addPerson()}>
        <UserAddOutline class="{iconCls}" />
    </Button>
</div>
```

## Step 2: Include in the Projection

Replace the `teachers` property with the `StaffAccordion` component and pass the string parameter `multi="multiple"` to allow multiple panels to be open:

```proto
// CourseSchedule/phase4/defs/externals.edit#L14-L18

Staff {[
Staff in the category: ${self.name}

    ${self.teachers replace=StaffAccordion multi="multiple"}
]}
```

## Step 3: Do the Admin

Add `StaffAccordion` to the global section and register it as a custom component.

```proto
// CourseSchedule/phase4/defs/main.edit#L3-L9

global {
    external {
        PersonIcon,
        PhoneButton,
        StaffAccordion
    }
}
```

```ts
// CourseSchedule/phase4/src/external/externals.ts#L9-L15

export function configureExternals() {
    setCustomComponents([
        { component: PersonIcon, knownAs: "PersonIcon" },
        { component: PhoneButton, knownAs: "PhoneButton" },
        { component: StaffAccordion, knownAs: "StaffAccordion" },
    ]);
}
```

## Final Result

After these steps, your editor displays the staff list in an **accordion**:

- **All panels closed:**

<Figure
imageName={'examples/CourseSchedule/Screenshot-step4a.png'}
caption={'Staff model unit with Accordion'}
figureNumber={1}
/>

- **A panel open:**

<Figure
imageName={'examples/CourseSchedule/Screenshot-step4b.png'}
caption={'Accordion with open panel'}
figureNumber={2}
/>

### Conclusion

That’s it! You’ve replaced the `teachers` list with a Svelte accordion.  
Next, you’ll learn how to reorder AST nodes and display them in a different order.
