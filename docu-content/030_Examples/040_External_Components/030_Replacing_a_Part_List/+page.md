<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Replacing a Part List

In this part of the extended example, you’ll learn how to replace a part list in your 
application by creating a custom Svelte component, `StaffAccordion.svelte`, to display 
and manage a list of teachers within an accordion. Let’s dive in step by step.

## Step 1: Create the Svelte Component

We’ll start by creating the `StaffAccordion.svelte` component. This component will 
replace the default projection of the `teachers` property in the `Staff` model unit.

### The Script Section

Begin by defining the component's parameters and the necessary state management functions:

```ts
// CourseSchedule/phase4/src/external/StaffAccordion.svelte#L9-L55

// This component replaces the component for "teachers: Person[];" from model unit "Staff".
// This property is a parts list, therefore the external box to use is an ExternalPartListBox.
export let box: ExternalPartListBox;
export let editor: FreEditor;

let panelOpen: boolean[] = [];      // List of booleans to indicate which panel is open (true) and closed (false).
let multiplePar: boolean = false;   // Indicates whether multiple panels may be open at the same time.

/*
    Sets all panels in the state 'closed',
    and sets the length of 'panelOpen'.
 */
function initialize() {
    let param: string = box.findParam("multi");
    if (param === "multiple") {
        multiplePar = true;
    }
    panelOpen = [];
    for (let i = 0; i < box.children.length; i++) {
        // this also sets the length of panelOpen!
        panelOpen[i] = false;
        box.children[i].isVisible = false; // the child boxes are not currently shown
    }
}

// The following four functions need to be included for the editor to function properly.
// Please, set the focus to the first editable/selectable element in this component.
async function setFocus(): Promise<void> {
    for( let i=0; i < box.children.length; i++) {
        if (panelOpen[i]) {
            box.children[i].setFocus();
        }
    }
}
const refresh = (why?: string): void => {
    // do whatever needs to be done to refresh the elements that show information from the model
    initialize();
};
onMount(() => {
    initialize();
    box.setFocus = setFocus;
    box.refreshComponent = refresh;
});
afterUpdate(() => {
    box.setFocus = setFocus;
    box.refreshComponent = refresh;
});
```

We have implemented the `setFocus` function such that when the focus is programmatically set to the
list, it is redirected to the element in the first panel that is open. Furthermore, we have added
an `initialize` function, which does two things. It finds the parameter that is given in the .edit file
under the name `multi`, and it initializes the `panelOpen` variable.

Also, we need to take care of adding to and removing from the list. Therefore, we add two functions
`addPerson` and `removePerson`. Because the reactivity of the AST model is implemented using
the <a href="https://mobx.js.org/" target="_blank">MobX</a> state management library, we need to put any
changes to the AST inside a MobX action. Freon provides two methods for this purpose: `AST.change` and
`AST.changeNamed`. The latter is only useful for logging purposes, and will not be used in this example.
The rest of the implementation of both functions is straightforward. We get the list of AST nodes from
the box using `Box.getPropertyValue()`, and change it.

```ts
// CourseSchedule/phase4/src/external/StaffAccordion.svelte#L57-L72

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
```

That done, we need to call both functions somewhere in the HTML section of the component.

### The HTML Section

The actual HTML in the component consists of a `div` with the `Accordion`, and an icon button to add an element to the list.
We have added some inline styling, just to make things look a little bit better, but the focus of this example is
not on styling, therefore it is kept to a minimum.

In the `Accordion` component we loop over the children of the box, using both the child box and its index in the list.
We create a `Panel` for each childBox, setting it to `open` based the value in `panelOpen[index]`.
Take a look at the header of each `Panel`, which contains
information from the AST model. Every box is associated with the AST node that it represents. This AST node can be accessed
using `childBox.node`, which returns an object of type `FreNode`. Also, every AST node knows its meta type, i.e. the
concept from the .edit file that is used to instantiate the node. We can access this name using
`childBox.node.freLanguageConcept()`. Here the result is a string with the value 'Person'.

We can do even more with the AST, but because its type is `FreNode` and not `Person`, this is a little bit more complex.
We could use a different variable, and cast the node to the right type, but that would mean that we have a lot more admin
to do in the `initialize` function. Therefore, we have chosen to access the information using a generic TypeScript manner
called <a href="https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html" target="_blank">typed index accessing</a>
to look up a specific property on another type: `childBox.node["name"]`. This results in the name of the `Person` object.

The content of each panel is defined as the native Freon component for the child box coupled with an icon button that calls
the `removePerson` function for that specific element in the list. The native Freon component is rendered by the Freon
`RenderComponent` as in the `PhoneButton.svelte` component.

```ts
// CourseSchedule/phase4/src/external/StaffAccordion.svelte#L78-L96

<div style="display: flex; align-items: flex-end;">
    <Accordion multiple="{multiplePar}">
        {#each box.children as childBox, index}
            <Panel bind:open={panelOpen[index]}>
                <Header>
                    {childBox.node.freLanguageConcept()} {childBox.node["name"]}
                </Header>
                <Content>
                    <div style="display: flex; align-items: flex-end;">
                        <RenderComponent box={childBox} editor={editor} />
                        <IconButton class="material-icons" on:click={() => removePerson(index)}>remove</IconButton>
                    </div>
                </Content>
            </Panel>
        {/each}
    </Accordion>

    <IconButton class="material-icons" on:click={() => addPerson()}>add</IconButton>
</div>
```

### The Complete Component

Now that we've defined the script and HTML sections, here's the full component:

```ts
// CourseSchedule/phase4/src/external/StaffAccordion.svelte

<script lang="ts">
    import Accordion, {Panel, Header, Content} from '@smui-extra/accordion';
    import IconButton from '@smui/icon-button';
    import {AST, ExternalPartListBox, FreEditor, FreNodeReference} from "@freon4dsl/core";
    import {RenderComponent} from "@freon4dsl/core-svelte";
    import {afterUpdate, onMount} from "svelte";
    import {Person} from "../freon/language/gen/index.js";

    // This component replaces the component for "teachers: Person[];" from model unit "Staff".
    // This property is a parts list, therefore the external box to use is an ExternalPartListBox.
    export let box: ExternalPartListBox;
    export let editor: FreEditor;

    let panelOpen: boolean[] = [];      // List of booleans to indicate which panel is open (true) and closed (false).
    let multiplePar: boolean = false;   // Indicates whether multiple panels may be open at the same time.

    /*
        Sets all panels in the state 'closed',
        and sets the length of 'panelOpen'.
     */
    function initialize() {
        let param: string = box.findParam("multi");
        if (param === "multiple") {
            multiplePar = true;
        }
        panelOpen = [];
        for (let i = 0; i < box.children.length; i++) {
            // this also sets the length of panelOpen!
            panelOpen[i] = false;
            box.children[i].isVisible = false; // the child boxes are not currently shown
        }
    }

    // The following four functions need to be included for the editor to function properly.
    // Please, set the focus to the first editable/selectable element in this component.
    async function setFocus(): Promise<void> {
        for( let i=0; i < box.children.length; i++) {
            if (panelOpen[i]) {
                box.children[i].setFocus();
            }
        }
    }
    const refresh = (why?: string): void => {
        // do whatever needs to be done to refresh the elements that show information from the model
        initialize();
    };
    onMount(() => {
        initialize();
        box.setFocus = setFocus;
        box.refreshComponent = refresh;
    });
    afterUpdate(() => {
        box.setFocus = setFocus;
        box.refreshComponent = refresh;
    });

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
</script>

<div style="display: flex; align-items: flex-end;">
    <Accordion multiple="{multiplePar}">
        {#each box.children as childBox, index}
            <Panel bind:open={panelOpen[index]}>
                <Header>
                    {childBox.node.freLanguageConcept()} {childBox.node["name"]}
                </Header>
                <Content>
                    <div style="display: flex; align-items: flex-end;">
                        <RenderComponent box={childBox} editor={editor} />
                        <IconButton class="material-icons" on:click={() => removePerson(index)}>remove</IconButton>
                    </div>
                </Content>
            </Panel>
        {/each}
    </Accordion>

    <IconButton class="material-icons" on:click={() => addPerson()}>add</IconButton>
</div>

```

## Step 2: Include in the Projection

To integrate our new accordion component into the projection, we need to modify the `.edit` file. 
Specifically, we'll replace the `teachers` property with the `StaffAccordion` component and 
pass the `multi` parameter to allow multiple panels to be open. Note that
parameter passing is string based. Any parameter is a key-value pair, where both the key and the
value are strings. There are no checks on any types or values.

In your `.edit` file:

```proto
// CourseSchedule/phase4/defs/externals.edit#L14-L18

Staff {[
Staff in the category: ${self.name}

    ${self.teachers replace=StaffAccordion multi="multiple"}
]}
```

## Step 3: Do the Admin

All that is left to do, is the familiar admin. Add `StaffAccordion` to the global 
section of your editor's definition and ensure it's recognized as a custom component.

In the `global` section of the `main.edit` file:

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

In the `externals.ts`, register `StaffAccordion` as a custom component. Don't forget to
update your `package.json` file to include any library components.

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

After following these steps, your editor will display the staff list in an accordion format. Here's what the result will look like:

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

And that's it! You've successfully replaced the `teachers` list with an accordion in Svelte.
Next up, you will learn how to manipulate AST nodes and display them in a different order.
