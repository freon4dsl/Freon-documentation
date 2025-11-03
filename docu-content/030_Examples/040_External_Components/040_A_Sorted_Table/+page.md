---
title: A Sorted Table
description: Build a custom Svelte component to sort and render schedule time slots in a table before display. Uses PartListReplacerBox, RenderComponent, and AST.change for reactive model updates.
tags: Freon, Svelte, external components, PartListReplacerBox, Schedule, Schedule.svelte, RenderComponent, AST.change, MobX, projections, CourseSchedule, Table
---

<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# A Sorted Table

The native Freon `Table` takes a list of nodes of the same type and displays their properties in columns or rows. But what if you want something different? In this example we sort a schedule’s list of time slots by their `TimeStamp` (day/part) *before* displaying the schedule.

As a reminder, here are the AST definitions of `Schedule`, `Slot` and `TimeStamp`.

```ts
// CourseSchedule/phase5/defs/main.ast#L10-L14

modelunit Schedule {
    name: identifier;
    timeSlots: Slot[];
    file-extension = "scd";     // the file extension used by the parser
}
```

```ts
// CourseSchedule/phase5/defs/main.ast#L33-L53

concept Slot {
    time: TimeStamp;
    reference teacher: Person;
    reference room: Room;
    reference course: Course;
}

limited TimeStamp {
    day: number; // 1 = Monday, 2 = Tuesday, etc
    part: number; // 1 indicates morning, 2 indicates afternoon
    MondayMorning = { day: 1, part: 1 }
    TuesdayMorning = { day: 2, part: 1 }
    WednesdayMorning = { day: 3, part: 1 }
    ThursdayMorning = { day: 4, part: 1 }
    FridayMorning = { day: 5, part: 1 }
    MondayAfternoon = { day: 1, part: 2 }
    TuesdayAfternoon = { day: 2, part: 2 }
    WednesdayAfternoon = { day: 3, part: 2 }
    ThursdayAfternoon = { day: 4, part: 2 }
    FridayAfternoon = { day: 5, part: 2 }
}
```

## Step 1: Create the Svelte Component

To create a dynamic schedule table, we define a Svelte component named `Schedule.svelte`. This component handles sorting the time slots, displays the sorted grid, and lets the user add new slots.

### The Script Section

The box type we use is a `PartListReplacerBox`. The four mandatory functions are similar to the ones in the `StaffAccordion` example, with one exception explained later. The key to sorting is the `initialize()` function, which processes the list of `timeSlots` and sorts them by `TimeStamp`. While sorting, we remember which child box is associated with which `Slot` in `slotToBoxMap` so we can render the correct child box.

```ts
// CourseSchedule/phase5/src/external/Schedule.svelte#L56-L156

    TimeStamp.TuesdayAfternoon,
    TimeStamp.WednesdayAfternoon,
    TimeStamp.ThursdayAfternoon,
    TimeStamp.FridayAfternoon
];

function sortSlots(startVal: Slot[]) {
    const newSlots: Slot[][] = []
    for (let i = 0; i < 10 ; i++) {
        newSlots[i] = [];
    }
    (startVal).forEach((val, index) => {
        // remember which box belongs to which slot
        slotToBoxMap.set(val, box.children[index]);
        switch (val.$time.day) {
            case 1: {
                switch (val.$time.part) {
                    case 1: { // Monday morning
                        newSlots[0].push(val);
                        break;
                    }
                    case 2: { // Monday afternoon
                        newSlots[5].push(val);
                        break;
                    }
                    default: {
                        newSlots[0].push(val);
                    }
                }
                break;
            }
            case 2: {
                switch (val.$time.part) {
                    case 1: { // Tuesday morning
                        newSlots[1].push(val);
                        break;
                    }
                    case 2: { // Tuesday afternoon
                        newSlots[6].push(val);
                        break;
                    }
                    default: {
                        newSlots[1].push(val);
                    }
                }
                break;
            }
            case 3: {
                switch (val.$time.part) {
                    case 1: { // Wednesday morning
                        newSlots[2].push(val);
                        break;
                    }
                    case 2: { // Wednesday afternoon
                        newSlots[7].push(val);
                        break;
                    }
                    default: {
                        newSlots[2].push(val);
                    }
                }
                break;
            }
            case 4: {
                switch (val.$time.part) {
                    case 1: { // Thursday morning
                        newSlots[3].push(val);
                        break;
                    }
                    case 2: { // Thursday afternoon
                        newSlots[8].push(val);
                        break;
                    }
                    default: {
                        newSlots[3].push(val);
                    }
                }
                break;
            }
            case 5: {
                switch (val.$time.part) {
                    case 1: { // Friday morning
                        newSlots[4].push(val);
                        break;
                    }
                    case 2: { // Friday afternoon
                        newSlots[9].push(val);
                        break;
                    }
                    default: {
                        newSlots[4].push(val);
                    }
                }
                break;
            }
        }
    })
    sortedSlots = newSlots
}

/* Sort the list of slots based on the time */
```

The function that adds a new `Slot` takes a `TimeStamp` parameter, allowing us to create a new slot for the specified time. We didn’t include a “remove slot” function here; it would be similar to the one in `StaffAccordion`.

```ts
// CourseSchedule/phase5/src/external/Schedule.svelte#L158-L165









```

Then there are two variables that make life easier in the HTML part.

```ts
// CourseSchedule/phase5/src/external/Schedule.svelte#L40-L54

    for (let i = 0; i < 10; i++) {
        slots[i] = [];
    }
    return slots;
}

let dayTitle: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ];

// variables for creating a new slot
let timeStamps: TimeStamp[] = [
    TimeStamp.MondayMorning,
    TimeStamp.TuesdayMorning,
    TimeStamp.WednesdayMorning,
    TimeStamp.ThursdayMorning,
    TimeStamp.FridayMorning,
```

### The HTML Section

We couldn’t use the SMUI `Table` because it clips its content (including dropdowns). With a bit of CSS we recreated a table in plain HTML.

First, the headers: each holds a day name. Because we also display row headers (`Morning` and `Afternoon`), the first header cell is empty.

```svelte
// CourseSchedule/phase5/src/external/Schedule.svelte#L174-L179
<thead>
  <tr class="demo-header-row">
    <th class="demo-header-cell"></th>
    {#each dayTitle as title}
      <th class="demo-header-cell">{title}</th>
    {/each}
  </tr>
</thead>
```

Next, we create two rows—one for mornings and one for afternoons.  
For the morning row: the first cell is the row header (`Morning`). We then loop over `sortedSlots` but only take the first five entries (the mornings). Each morning can contain a *list* of slots. For each slot we resolve its child box via `slotToBoxMap` and render it with Freon’s `<RenderComponent>`. The afternoon row mirrors this but uses the last five entries.

```ts
// CourseSchedule/phase5/src/external/Schedule.svelte#L182-L203

    }
    initialize();
    const colorCls: string = 'text-light-base-50 dark:text-dark-base-900 ';
    const buttonCls: string =
      'bg-light-base-600 					dark:bg-dark-base-200 ' +
      'hover:bg-light-base-900 		dark:hover:bg-dark-base-50 ' +
      'border-light-base-100 			dark:border-dark-base-800 ';
    const iconCls: string = 'ms-0 inline h-6 w-6';
</script>


<div class="demo-table-container">
    <table class="demo-table">
        <thead>
        <tr class="demo-header-row">
            <th class="demo-header-cell"></th>
            {#each dayTitle as title}
                <th class="demo-header-cell">{title}</th>
            {/each}
        </tr>
        </thead>
        <tbody>
```

Between the two time rows we add button rows so the user can create a slot for a specific time. Again, the first cell is empty (row header column). We loop over `timeStamps` and pass each value to `addSlot`.

```ts
// CourseSchedule/phase5/src/external/Schedule.svelte#L204-L213

<tr class="demo-row">
    <td class="demo-header-cell">Morning</td>
    {#each sortedSlots as slots, index}
        {#if index < 5}
            {#if slots.length > 0}
                <td class="demo-cell">
                    <div class="demo-cell-content">
                    {#each slots as slot}
                        <div class="demo-slot-render">
                        <RenderComponent box={findBoxForSlot(slot)} editor={editor} />
```

The complete Svelte component is at the bottom of this page.

## Step 2: Include in the Projection

We include the new component in the projection with `replace=Schedule`. Because the table already conveys each slot’s time, we hide `\${self.time}` in the `Slot` projection.

```proto
// CourseSchedule/phase5/defs/externals.edit#L20-L31

Schedule {[
Schedule ${self.name}

${self.timeSlots replace=Schedule}

]}

Slot {[
    Teacher: ${self.teacher}
    Room:    ${self.room}
    Course:  ${self.course}
]}
```

By now you know the small amount of admin needed to register an external component, so we won’t repeat it here.

## Final Result

When all is done, the editor should look like this. Neat, right?

<Figure
imageName={'examples/CourseSchedule/Screenshot-step5.png'}
caption={'Editor with sorted table showing Slots'}
figureNumber={1}
/>

## Conclusion

After following these steps, you’ll have a Svelte component that displays a sorted table of time slots. This approach adapts well to any case where you want to preprocess and present structured data in a table. The editor shows the schedule neatly sorted by day and time, and users can interactively add slots.

This extended example demonstrates how custom Svelte components in the Freon editor unlock many design and UX possibilities. Once you’re comfortable with this pattern, you can reuse it with any of the [External Component Box Types](/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types).

Since external components are still experimental, we’re eager to learn how you plan to use them. If you decide to incorporate them, please reach out to the Freon team at info AT freon4dsl.dev or via GitHub—we’re happy to help.

## The Complete Svelte Component

For reference, here is the full implementation of the `Schedule.svelte` component:

```ts
// CourseSchedule/phase5/src/external/Schedule.svelte

<script lang="ts">
    import {
        Box,
        ExternalPartListBox,
        type FreNode,
        FreNodeReference,
        AST, isNullOrUndefined, LabelBox, notNullOrUndefined
    } from "@freon4dsl/core"
    import {type FreComponentProps, RenderComponent} from "@freon4dsl/core-svelte";
    import {Slot, TimeStamp} from "../freon/index.js";
    import { UserAddOutline } from 'flowbite-svelte-icons';
    import { Button } from 'flowbite-svelte';

    // This component replaces the component for "timeSlots: Slot[];" from model unit "Schedule".
    // This property is a parts list, therefore the external box to use is an ExternalPartListBox.
    // Props
    let { editor, box }: FreComponentProps<ExternalPartListBox> = $props();

    // The following three functions need to be included for the editor to function properly.
    // Please, set the focus to the first editable/selectable element in this component.
    async function setFocus(): Promise<void> {
    }
    const refresh = (why?: string): void => {
        // do whatever needs to be done to refresh the elements that show information from the model
        initialize();
    };
    $effect(() => {
        initialize();
        box.setFocus = setFocus;
        box.refreshComponent = refresh;
    });

    // --------------------------- //
    let slotToBoxMap: Map<Slot, Box> = new Map<Slot, Box>();
    // an array of 10 positions, making use of the 10 different timeSlots that are available
    let sortedSlots: Slot[][] = $state(initSortedSlots());

    function initSortedSlots(): Slot[][] {
        let slots = [];
        for (let i = 0; i < 10; i++) {
            slots[i] = [];
        }
        return slots;
    }

    let dayTitle: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ];

    // variables for creating a new slot
    let timeStamps: TimeStamp[] = [
        TimeStamp.MondayMorning,
        TimeStamp.TuesdayMorning,
        TimeStamp.WednesdayMorning,
        TimeStamp.ThursdayMorning,
        TimeStamp.FridayMorning,
        TimeStamp.MondayAfternoon,
        TimeStamp.TuesdayAfternoon,
        TimeStamp.WednesdayAfternoon,
        TimeStamp.ThursdayAfternoon,
        TimeStamp.FridayAfternoon
    ];

    function sortSlots(startVal: Slot[]) {
        const newSlots: Slot[][] = []
        for (let i = 0; i < 10 ; i++) {
            newSlots[i] = [];
        }
        (startVal).forEach((val, index) => {
            // remember which box belongs to which slot
            slotToBoxMap.set(val, box.children[index]);
            switch (val.$time.day) {
                case 1: {
                    switch (val.$time.part) {
                        case 1: { // Monday morning
                            newSlots[0].push(val);
                            break;
                        }
                        case 2: { // Monday afternoon
                            newSlots[5].push(val);
                            break;
                        }
                        default: {
                            newSlots[0].push(val);
                        }
                    }
                    break;
                }
                case 2: {
                    switch (val.$time.part) {
                        case 1: { // Tuesday morning
                            newSlots[1].push(val);
                            break;
                        }
                        case 2: { // Tuesday afternoon
                            newSlots[6].push(val);
                            break;
                        }
                        default: {
                            newSlots[1].push(val);
                        }
                    }
                    break;
                }
                case 3: {
                    switch (val.$time.part) {
                        case 1: { // Wednesday morning
                            newSlots[2].push(val);
                            break;
                        }
                        case 2: { // Wednesday afternoon
                            newSlots[7].push(val);
                            break;
                        }
                        default: {
                            newSlots[2].push(val);
                        }
                    }
                    break;
                }
                case 4: {
                    switch (val.$time.part) {
                        case 1: { // Thursday morning
                            newSlots[3].push(val);
                            break;
                        }
                        case 2: { // Thursday afternoon
                            newSlots[8].push(val);
                            break;
                        }
                        default: {
                            newSlots[3].push(val);
                        }
                    }
                    break;
                }
                case 5: {
                    switch (val.$time.part) {
                        case 1: { // Friday morning
                            newSlots[4].push(val);
                            break;
                        }
                        case 2: { // Friday afternoon
                            newSlots[9].push(val);
                            break;
                        }
                        default: {
                            newSlots[4].push(val);
                        }
                    }
                    break;
                }
            }
        })
        sortedSlots = newSlots
    }

    /* Sort the list of slots based on the time */
    function initialize() {
        let startVal: FreNode[] | undefined = box.getPropertyValue();
        if (notNullOrUndefined(startVal) && box.getPropertyType() === "Slot") {
            // cast the startVal to the expected type, in this case "Slot[]".
            // sort the slots based on the time and remember which box belongs to which slot
            sortSlots(startVal as Slot[]);
        }
    }

    const addSlot = (timeStamp: TimeStamp) => {
        // Note that you need to put any changes to the actual model in a 'AST.change' or 'AST.changeNamed',
        // because all elements in the model are reactive using mobx.
        AST.change(() => {
            let newSlot: Slot = Slot.create({time: FreNodeReference.create<TimeStamp>(timeStamp, "TimeStamp")});
            box.getPropertyValue().push(newSlot);
        });
    }

    const findBoxForSlot = (slot: Slot): Box => {
        let xx = slotToBoxMap.get(slot);
        if (!isNullOrUndefined(xx)) {
            return xx;
        } else {
            return new LabelBox(box.node, 'no-role', () => { return 'No box found'});
        }
    }
    initialize();
    const colorCls: string = 'text-light-base-50 dark:text-dark-base-900 ';
    const buttonCls: string =
      'bg-light-base-600 					dark:bg-dark-base-200 ' +
      'hover:bg-light-base-900 		dark:hover:bg-dark-base-50 ' +
      'border-light-base-100 			dark:border-dark-base-800 ';
    const iconCls: string = 'ms-0 inline h-6 w-6';
</script>


<div class="demo-table-container">
    <table class="demo-table">
        <thead>
        <tr class="demo-header-row">
            <th class="demo-header-cell"></th>
            {#each dayTitle as title}
                <th class="demo-header-cell">{title}</th>
            {/each}
        </tr>
        </thead>
        <tbody>
        <tr class="demo-row">
            <td class="demo-header-cell">Morning</td>
            {#each sortedSlots as slots, index}
                {#if index < 5}
                    {#if slots.length > 0}
                        <td class="demo-cell">
                            <div class="demo-cell-content">
                            {#each slots as slot}
                                <div class="demo-slot-render">
                                <RenderComponent box={findBoxForSlot(slot)} editor={editor} />
                                </div>
                            {/each}
                            </div>
                        </td>
                    {:else}
                        <td class="demo-cell">
                            <div class="demo-slot-render">NONE</div>
                        </td>
                    {/if}
                {/if}
            {/each}
        </tr>
        <tr>
            <td class="demo-btn-cell"></td>
            {#each timeStamps as stamp, index}
                {#if index < 5}
                    <td class="demo-btn-cell">
                        <Button tabindex={-1} id="add-button" class="{buttonCls} {colorCls} " name="ToastOpen" onclick={() => addSlot(stamp)}>
                            <UserAddOutline class="{iconCls}" />
                        </Button>
                    </td>
                {/if}
            {/each}
        </tr>
        <tr>
            <td class="demo-header-cell">Afternoon</td>
            {#each sortedSlots as slots, index}
                {#if index >= 5}
                    {#if slots.length > 0}
                        <td class="demo-cell">
                            {#each slots as slot}
                                <div class="demo-slot-render">
                                <RenderComponent box={findBoxForSlot(slot)} editor={editor} />
                                </div>
                            {/each}
                        </td>
                    {:else}
                        <td class="demo-cell">
                            <div class="demo-slot-render">
                                NONE
                            </div>
                        </td>
                    {/if}
                {/if}
            {/each}
        </tr>
        <tr>
            <td class="demo-btn-cell"></td>
            {#each timeStamps as stamp, index}
                {#if index >= 5}
                    <td class="demo-btn-cell">
                        <Button tabindex={-1} id="add-button" class="{buttonCls} {colorCls} " name="ToastOpen" onclick={() => addSlot(stamp)}>
                            <UserAddOutline class="{iconCls}" />
                        </Button>
                    </td>
                {/if}
            {/each}
        </tr>
        </tbody>
    </table>
</div>


<style>
    .demo-table-container {
        background-color:#fff;
        color: rgba(0, 0, 0, 0.87);
        max-width: 100%;
        border-radius:4px;
        border-width:1px;
        border-style:solid;
        border-color:rgba(0,0,0,.12);
        display:inline-flex;
        flex-direction:column;
        box-sizing:border-box;
        position:relative;
    }
    .demo-table {
        min-width:100%;
        border:0;
        white-space:nowrap;
        border-spacing:0;
        table-layout:fixed;
    }
    .demo-cell {
        height: 200px;
        border-right-width: 1px;
        border-right-style: solid;
        border-right-color: rgba(0,0,0,.12);
    }
    .demo-slot-render {
        margin: 0 4px 20px 4px;
    }
    .demo-header-row {
        height: 56px;
    }
    .demo-header-cell {
        font-size:0.875rem;
        line-height:1.375rem;
        font-weight:bolder;
        box-sizing:border-box;
        text-align:left;
        padding: 0 16px 0 16px;
        border-right-width: 1px;
        border-right-style: solid;
        border-right-color: rgba(0,0,0,.12);
        background-color: var(--mdc-theme-surface, #fff);
    }
    .demo-cell-content {
        justify-content: space-between;
        flex-direction: column;
        display: flex;
    }
    .demo-btn-cell {
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: rgba(0,0,0,.12);
        border-right-width: 1px;
        border-right-style: solid;
        border-right-color: rgba(0,0,0,.12);
        justify-content: space-between;
    }
</style>
```
