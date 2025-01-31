<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# A Sorted Table

The native Freon Table takes a list of nodes of the same type, and displays the properties of those nodes
each in a column or row. But what if you want something completely different? In this example we are going
to sort the list of time slots in a schedule based on the time stamp in each slot, before we display the schedule.

As a reminder, here are the AST definitions of Schedule, Slot and TimeSlot.

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

To create a dynamic schedule table, we will define a Svelte component named `Schedule.svelte`. 
This component will handle the sorting of time slots, display the sorted list, and allow 
the user to add new slots.

### The Script Section

The box type that we are using is an `ExternalPartListBox`. The four mandatory functions are similar to
the ones in the StaffAccordion component, with one exception, which we will explain later on. The key 
to sorting the schedule lies in the `initialize()` function, which processes the list of `timeSlots` 
and sorts them based on the `TimeStamp`. While sorting the list, in order to later render the correct 
box for each `Slot`, we remember which child box is associated with a `Slot` in the variable `slotToBoxMap`.

```ts
// CourseSchedule/phase5/src/external/Schedule.svelte#L56-L156

function sortSlots(startVal: Slot[]) {
    for (let i = 0; i < 10 ; i++) {
        sortedSlots[i] = [];
    }
    (startVal).forEach((val, index) => {
        // remember which box belongs to which slot
        slotToBoxMap.set(val, box.children[index]);
        switch (val.$time.day) {
            case 1: {
                switch (val.$time.part) {
                    case 1: { // Monday morning
                        sortedSlots[0].push(val);
                        break;
                    }
                    case 2: { // Monday afternoon
                        sortedSlots[5].push(val);
                        break;
                    }
                    default: {
                        sortedSlots[0].push(val);
                    }
                }
                break;
            }
            case 2: {
                switch (val.$time.part) {
                    case 1: { // Tuesday morning
                        sortedSlots[1].push(val);
                        break;
                    }
                    case 2: { // Tuesday afternoon
                        sortedSlots[6].push(val);
                        break;
                    }
                    default: {
                        sortedSlots[1].push(val);
                    }
                }
                break;
            }
            case 3: {
                switch (val.$time.part) {
                    case 1: { // Wednesday morning
                        sortedSlots[2].push(val);
                        break;
                    }
                    case 2: { // Wednesday afternoon
                        sortedSlots[7].push(val);
                        break;
                    }
                    default: {
                        sortedSlots[2].push(val);
                    }
                }
                break;
            }
            case 4: {
                switch (val.$time.part) {
                    case 1: { // Thursday morning
                        sortedSlots[3].push(val);
                        break;
                    }
                    case 2: { // Thursday afternoon
                        sortedSlots[8].push(val);
                        break;
                    }
                    default: {
                        sortedSlots[3].push(val);
                    }
                }
                break;
            }
            case 5: {
                switch (val.$time.part) {
                    case 1: { // Friday morning
                        sortedSlots[4].push(val);
                        break;
                    }
                    case 2: { // Friday afternoon
                        sortedSlots[9].push(val);
                        break;
                    }
                    default: {
                        sortedSlots[4].push(val);
                    }
                }
                break;
            }
        }
    })
}

/* Sort the list of slots based on the time */
function initialize() {
    let startVal: FreNode[] | undefined = box.getPropertyValue();
    if (!!startVal && box.getPropertyType() === "Slot") {
        // cast the startVal to the expected type, in this case "Slot[]".
        // sort the slots based on the time and remember which box belongs to which slot
        sortSlots(startVal as Slot[]);
    }
}
```

The function that adds a new `Slot` takes a parameter of type `TimeStamp`. This enables us to create a new slot with
the given time stamp. We did not bother with creating the function to remove a `Slot`. It would be similar to the
one in the `StaffAccordion`.

```ts
// CourseSchedule/phase5/src/external/Schedule.svelte#L158-L165

const addSlot = (timeStamp: TimeStamp) => {
    // Note that you need to put any changes to the actual model in a 'AST.change' or 'AST.changeNamed',
    // because all elements in the model are reactive using mobx.
    AST.change(() => {
        let newSlot: Slot = Slot.create({time: FreNodeReference.create<TimeStamp>(timeStamp, "TimeStamp")});
        box.getPropertyValue().push(newSlot);
    });
}
```

Then there are two variables that make live easier in the HTML part.

```ts
// CourseSchedule/phase5/src/external/Schedule.svelte#L40-L54

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
```

### The HTML Section

Unfortunately, we could not use the `Table` component from the SMUI library, because it cuts off its content,
including any dropdown menu. But with a little bit of extra CSS styling we have recreated the table in plain HTML.

Have a look at the headers first, each of which hold the name of a day. Because, on the other axis, we want to display 
headers with the texts `Morning` and `Afternoon`, the first header cell is left empty.

```ts
// CourseSchedule/phase5/src/external/Schedule.svelte#L174-L179

<tr class="demo-header-row">
    <th class="demo-header-cell">--</th>
    {#each dayTitle as title}
        <th class="demo-header-cell">{title}</th>
    {/each}
</tr>
```

Next, we create two rows, one for the mornings and one for the afternoons. 
Let's take a look at the first row. The first cell is the row header showing the text `Morning`.
Then we loop over the sorted slots, but we take only the first five, because these represent 
the five mornings. Note that each morning can hold a list of slots. If there are slots for 
a certain morning then for each of those
we get the associated box using the `slotToBoxMap` variable, and we render them using the 
Freon `RenderComponent`. We add some `divs` to the lot to be able to style everything.
The row for the afternoons is almost identical, but takes the last five of the sorted slots.

```ts
// CourseSchedule/phase5/src/external/Schedule.svelte#L182-L203

<tr class="demo-row">
    <td class="demo-header-cell">Morning</td>
    {#each sortedSlots  as slots, index}
        {#if index < 5}
            {#if slots.length > 0}
                <td class="demo-cell">
                    <div class="demo-cell-content">
                        {#each slots as slot}
                            <div class="demo-slot-render">
                                <RenderComponent box={slotToBoxMap.get(slot)} editor={editor} />
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
```

In between we have added two rows containing buttons to enable the user to add a slot to a specific time.
Again, the first cell is left empty, because that is the column with the headers. Then, looping over the 
`timeStamp` list, we add a cell with a button that takes the element from the `timeStamp` list as a parameter
to the function that adds a slot.

```ts
// CourseSchedule/phase5/src/external/Schedule.svelte#L204-L213

<tr>
    <td class="demo-btn-cell"></td>
    {#each timeStamps as stamp, index}
        {#if index < 5}
            <td class="demo-btn-cell">
                <IconButton class="material-icons" on:click={() => addSlot(stamp)}>add</IconButton>
            </td>
        {/if}
    {/each}
</tr>
```

The complete Svelte component can be found at the bottom of this page.

## Step 2: Include in the Projection

We include the new component in the projection with the text `replace=Schedule`. Furthermore, 
because the table already makes clear what the time stamp of each slot is, we adjust the 
projection for the `Slot` itself to not show `${self.time}`.

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

By now, you will have understood the admin that needs to be done for the external component, so
we won't bother with that here.

## Final Result

When all is done, the editor should look like this. Rather neat! At least, we like it, and hope you do as well.

<Figure
imageName={'examples/CourseSchedule/Screenshot-step5.png'}
caption={'Editor with sorted table showing Slots'}
figureNumber={1}
/>

## Conclusion

Once you've followed these steps, you will have a fully functional Svelte component that displays a sorted table for your time slots.
This solution can be adapted to various use cases where you need to manage and display structured data in a table format.
The editor will show the schedule neatly sorted by day and time, allowing users to interact with the schedule and add new time slots.

This extended example demonstrates how integrating custom Svelte components into the Freon editor unlocks limitless 
possibilities for creating unique designs and functionalities. We’re confident that, after following 
this example, you’ll be well-equipped to utilize any of 
the [External Component Box Types](/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types) 
offered by Freon.

Since external components are still in the experimental stage, we are eager to learn how you plan to use 
them. If you decide to incorporate external components, please reach out to the Freon team. You can 
contact us via email at info AT freon4dsl.dev or through GitHub. We would love to hear from you and 
are happy to provide any assistance you need.

## The Complete Svelte Component

For reference, here is the full implementation of the `Schedule.svelte` component:

```ts
// CourseSchedule/phase5/src/external/Schedule.svelte

<script lang="ts">
    import IconButton from "@smui/icon-button";
    import {afterUpdate, onMount} from "svelte";
    import {Box, ExternalPartListBox, FreEditor, FreNode, FreNodeReference, AST} from "@freon4dsl/core";
    import {RenderComponent} from "@freon4dsl/core-svelte";
    import {Slot, TimeStamp} from "../freon/language/gen/index.js";

    // This component replaces the component for "timeSlots: Slot[];" from model unit "Schedule".
    // This property is a parts list, therefore the external box to use is an ExternalPartListBox.
    export let box: ExternalPartListBox;
    export let editor: FreEditor;

    // The following four functions need to be included for the editor to function properly.
    // Please, set the focus to the first editable/selectable element in this component.
    async function setFocus(): Promise<void> {
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
        initialize();
        sortedSlots = [...sortedSlots]
        box.setFocus = setFocus;
        box.refreshComponent = refresh;
    });

    // --------------------------- //
    let slotToBoxMap: Map<Slot, Box> = new Map<Slot, Box>();
    let sortedSlots: Slot[][]; // an array of 10 positions, making use of the 10 different timeSlots that are available
    sortedSlots = [];
    for (let i = 0; i < 10 ; i++) {
        sortedSlots[i] = [];
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
        for (let i = 0; i < 10 ; i++) {
            sortedSlots[i] = [];
        }
        (startVal).forEach((val, index) => {
            // remember which box belongs to which slot
            slotToBoxMap.set(val, box.children[index]);
            switch (val.$time.day) {
                case 1: {
                    switch (val.$time.part) {
                        case 1: { // Monday morning
                            sortedSlots[0].push(val);
                            break;
                        }
                        case 2: { // Monday afternoon
                            sortedSlots[5].push(val);
                            break;
                        }
                        default: {
                            sortedSlots[0].push(val);
                        }
                    }
                    break;
                }
                case 2: {
                    switch (val.$time.part) {
                        case 1: { // Tuesday morning
                            sortedSlots[1].push(val);
                            break;
                        }
                        case 2: { // Tuesday afternoon
                            sortedSlots[6].push(val);
                            break;
                        }
                        default: {
                            sortedSlots[1].push(val);
                        }
                    }
                    break;
                }
                case 3: {
                    switch (val.$time.part) {
                        case 1: { // Wednesday morning
                            sortedSlots[2].push(val);
                            break;
                        }
                        case 2: { // Wednesday afternoon
                            sortedSlots[7].push(val);
                            break;
                        }
                        default: {
                            sortedSlots[2].push(val);
                        }
                    }
                    break;
                }
                case 4: {
                    switch (val.$time.part) {
                        case 1: { // Thursday morning
                            sortedSlots[3].push(val);
                            break;
                        }
                        case 2: { // Thursday afternoon
                            sortedSlots[8].push(val);
                            break;
                        }
                        default: {
                            sortedSlots[3].push(val);
                        }
                    }
                    break;
                }
                case 5: {
                    switch (val.$time.part) {
                        case 1: { // Friday morning
                            sortedSlots[4].push(val);
                            break;
                        }
                        case 2: { // Friday afternoon
                            sortedSlots[9].push(val);
                            break;
                        }
                        default: {
                            sortedSlots[4].push(val);
                        }
                    }
                    break;
                }
            }
        })
    }

    /* Sort the list of slots based on the time */
    function initialize() {
        let startVal: FreNode[] | undefined = box.getPropertyValue();
        if (!!startVal && box.getPropertyType() === "Slot") {
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

    initialize();
</script>


<div class="demo-table-container">
    <table class="demo-table">
        <thead>
        <tr class="demo-header-row">
            <th class="demo-header-cell">--</th>
            {#each dayTitle as title}
                <th class="demo-header-cell">{title}</th>
            {/each}
        </tr>
        </thead>
        <tbody>
        <tr class="demo-row">
            <td class="demo-header-cell">Morning</td>
            {#each sortedSlots  as slots, index}
                {#if index < 5}
                    {#if slots.length > 0}
                        <td class="demo-cell">
                            <div class="demo-cell-content">
                                {#each slots as slot}
                                    <div class="demo-slot-render">
                                        <RenderComponent box={slotToBoxMap.get(slot)} editor={editor} />
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
                        <IconButton class="material-icons" on:click={() => addSlot(stamp)}>add</IconButton>
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
                                    <RenderComponent box={slotToBoxMap.get(slot)} editor={editor} />
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
                        <IconButton class="material-icons" on:click={() => addSlot(stamp)}>add</IconButton>
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
