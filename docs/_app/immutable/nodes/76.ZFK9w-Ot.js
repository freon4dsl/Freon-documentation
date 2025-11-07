import{f,a as i,t as A,e as Te}from"../chunks/nks1QWJh.js";import{y as pe,G as me,x as H,z as he,u as o,A as P,g as a,I as re,B as G,a as N,$ as _e,v,s as ge,w as u}from"../chunks/bZIXIZs8.js";import{d as Ce,i as R,s as ie}from"../chunks/DANOUgWt.js";import{e as X,p as ke,i as Me,s as de}from"../chunks/CKHUE_gp.js";import{h as Be}from"../chunks/DCXhKCCG.js";import{h as Fe}from"../chunks/aX-frc9G.js";import{s as c}from"../chunks/BpSVRMQn.js";import{o as Le}from"../chunks/D62n5Z03.js";import{P as ce,S as W,c as Ae,B as Pe}from"../chunks/CFDUsp8k.js";import{F as Ne}from"../chunks/Bq9rkPJ0.js";const We=async({parent:B})=>{const{site:t,category:r}=await B();return{site:t,category:r,page:{title:"A Sorted Table",description:"Build a custom Svelte component to sort and render schedule time slots in a table before display. Uses PartListReplacerBox, RenderComponent, and AST.change for reactive model updates.",tags:["Freon","Svelte","external components","PartListReplacerBox","Schedule","Schedule.svelte","RenderComponent","AST.change","MobX","projections","CourseSchedule","Table"],modifiedTime:"2025-11-07T18:23:38.828Z",publishedTime:"2025-11-07T17:20:18.642Z"}}},st=Object.freeze(Object.defineProperty({__proto__:null,load:We},Symbol.toStringTag,{value:"Module"}));var Oe=f(`<!> <!> <p>The native Freon <code>Table</code> takes a list of nodes of the same type and displays their properties in columns or rows. But what if you want something different? In this example we sort a schedule’s list of time slots by their <code>TimeStamp</code> (day/part) <em>before</em> displaying the schedule.</p> <p>As a reminder, here are the AST definitions of <code>Schedule</code>, <code>Slot</code> and <code>TimeStamp</code>.</p> <pre class="language-ts"><code class="language-ts">// CourseSchedule/phase5/defs/main.ast#L10-L14

modelunit Schedule &#123;
    name: identifier;
    timeSlots: Slot[];
    file-extension = "scd";     // the file extension used by the parser
&#125;</code></pre> <pre class="language-ts"><code class="language-ts">// CourseSchedule/phase5/defs/main.ast#L33-L53

concept Slot &#123;
    time: TimeStamp;
    reference teacher: Person;
    reference room: Room;
    reference course: Course;
&#125;

limited TimeStamp &#123;
    day: number; // 1 = Monday, 2 = Tuesday, etc
    part: number; // 1 indicates morning, 2 indicates afternoon
    MondayMorning = &#123; day: 1, part: 1 &#125;
    TuesdayMorning = &#123; day: 2, part: 1 &#125;
    WednesdayMorning = &#123; day: 3, part: 1 &#125;
    ThursdayMorning = &#123; day: 4, part: 1 &#125;
    FridayMorning = &#123; day: 5, part: 1 &#125;
    MondayAfternoon = &#123; day: 1, part: 2 &#125;
    TuesdayAfternoon = &#123; day: 2, part: 2 &#125;
    WednesdayAfternoon = &#123; day: 3, part: 2 &#125;
    ThursdayAfternoon = &#123; day: 4, part: 2 &#125;
    FridayAfternoon = &#123; day: 5, part: 2 &#125;
&#125;</code></pre> <!> <p>To create a dynamic schedule table, we define a Svelte component named <code>Schedule.svelte</code>. This component handles sorting the time slots, displays the sorted grid, and lets the user add new slots.</p> <h3 id="the-script-section-1">The Script Section</h3> <p>The box type we use is a <code>PartListReplacerBox</code>. The four mandatory functions are similar to the ones in the <code>StaffAccordion</code> example, with one exception explained later. The key to sorting is the <code>initialize()</code> function, which processes the list of <code>timeSlots</code> and sorts them by <code>TimeStamp</code>. While sorting, we remember which child box is associated with which <code>Slot</code> in <code>slotToBoxMap</code> so we can render the correct child box.</p> <pre class="language-ts"><code class="language-ts">// CourseSchedule/phase5/src/external/Schedule.svelte#L56-L156

    TimeStamp.TuesdayAfternoon,
    TimeStamp.WednesdayAfternoon,
    TimeStamp.ThursdayAfternoon,
    TimeStamp.FridayAfternoon
];

function sortSlots(startVal: Slot[]) &#123;
    const newSlots: Slot[][] = []
    for (let i = 0; i &lt; 10 ; i++) &#123;
        newSlots[i] = [];
    &#125;
    (startVal).forEach((val, index) =&gt; &#123;
        // remember which box belongs to which slot
        slotToBoxMap.set(val, box.children[index]);
        switch (val.$time.day) &#123;
            case 1: &#123;
                switch (val.$time.part) &#123;
                    case 1: &#123; // Monday morning
                        newSlots[0].push(val);
                        break;
                    &#125;
                    case 2: &#123; // Monday afternoon
                        newSlots[5].push(val);
                        break;
                    &#125;
                    default: &#123;
                        newSlots[0].push(val);
                    &#125;
                &#125;
                break;
            &#125;
            case 2: &#123;
                switch (val.$time.part) &#123;
                    case 1: &#123; // Tuesday morning
                        newSlots[1].push(val);
                        break;
                    &#125;
                    case 2: &#123; // Tuesday afternoon
                        newSlots[6].push(val);
                        break;
                    &#125;
                    default: &#123;
                        newSlots[1].push(val);
                    &#125;
                &#125;
                break;
            &#125;
            case 3: &#123;
                switch (val.$time.part) &#123;
                    case 1: &#123; // Wednesday morning
                        newSlots[2].push(val);
                        break;
                    &#125;
                    case 2: &#123; // Wednesday afternoon
                        newSlots[7].push(val);
                        break;
                    &#125;
                    default: &#123;
                        newSlots[2].push(val);
                    &#125;
                &#125;
                break;
            &#125;
            case 4: &#123;
                switch (val.$time.part) &#123;
                    case 1: &#123; // Thursday morning
                        newSlots[3].push(val);
                        break;
                    &#125;
                    case 2: &#123; // Thursday afternoon
                        newSlots[8].push(val);
                        break;
                    &#125;
                    default: &#123;
                        newSlots[3].push(val);
                    &#125;
                &#125;
                break;
            &#125;
            case 5: &#123;
                switch (val.$time.part) &#123;
                    case 1: &#123; // Friday morning
                        newSlots[4].push(val);
                        break;
                    &#125;
                    case 2: &#123; // Friday afternoon
                        newSlots[9].push(val);
                        break;
                    &#125;
                    default: &#123;
                        newSlots[4].push(val);
                    &#125;
                &#125;
                break;
            &#125;
        &#125;
    &#125;)
    sortedSlots = newSlots
&#125;

/* Sort the list of slots based on the time */</code></pre> <p>The function that adds a new <code>Slot</code> takes a <code>TimeStamp</code> parameter, allowing us to create a new slot for the specified time. We didn’t include a “remove slot” function here; it would be similar to the one in <code>StaffAccordion</code>.</p> <pre class="language-ts"><code class="language-ts">// CourseSchedule/phase5/src/external/Schedule.svelte#L158-L165








</code></pre> <p>Then there are two variables that make life easier in the HTML part.</p> <pre class="language-ts"><code class="language-ts">// CourseSchedule/phase5/src/external/Schedule.svelte#L40-L54

    for (let i = 0; i &lt; 10; i++) &#123;
        slots[i] = [];
    &#125;
    return slots;
&#125;

let dayTitle: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ];

// variables for creating a new slot
let timeStamps: TimeStamp[] = [
    TimeStamp.MondayMorning,
    TimeStamp.TuesdayMorning,
    TimeStamp.WednesdayMorning,
    TimeStamp.ThursdayMorning,
    TimeStamp.FridayMorning,</code></pre> <h3 id="the-html-section-2">The HTML Section</h3> <p>We couldn’t use the <code>Table</code> component from the library because it clips its content (including dropdowns). With a bit of CSS we recreated a table in plain HTML.</p> <p>First, the headers: each holds a day name. Because we also display row headers (<code>Morning</code> and <code>Afternoon</code>), the first header cell is empty.</p> <pre class="language-svelte"><code class="language-svelte">// CourseSchedule/phase5/src/external/Schedule.svelte#L193-L203

&lt;div class="demo-table-container"&gt;
    &lt;table class="demo-table"&gt;
        &lt;thead&gt;
        &lt;tr class="demo-header-row"&gt;
            &lt;th class="demo-header-cell"&gt;&lt;/th&gt;
            &#123;#each dayTitle as title&#125;
                &lt;th class="demo-header-cell"&gt;&#123;title&#125;&lt;/th&gt;
            &#123;/each&#125;
        &lt;/tr&gt;
        &lt;/thead&gt;
        &lt;tbody&gt;</code></pre> <p>Next, we create two rows—one for mornings and one for afternoons.<br/> For the morning row: the first cell is the row header (<code>Morning</code>). We then loop over <code>sortedSlots</code> but only take the first five entries (the mornings). Each morning can contain a <em>list</em> of slots. For each slot we resolve its child box via <code>slotToBoxMap</code> and render it with Freon’s <code>&lt;RenderComponent&gt;</code>. The afternoon row mirrors this but uses the last five entries.</p> <pre class="language-svelte"><code class="language-svelte">// CourseSchedule/phase5/src/external/Schedule.svelte#L204-L225

&lt;tr class="demo-row"&gt;
    &lt;td class="demo-header-cell"&gt;Morning&lt;/td&gt;
    &#123;#each sortedSlots as slots, index&#125;
        &#123;#if index &lt; 5&#125;
            &#123;#if slots.length &gt; 0&#125;
                &lt;td class="demo-cell"&gt;
                    &lt;div class="demo-cell-content"&gt;
                    &#123;#each slots as slot&#125;
                        &lt;div class="demo-slot-render"&gt;
                        &lt;RenderComponent box=&#123;findBoxForSlot(slot)&#125; editor=&#123;editor&#125; /&gt;
                        &lt;/div&gt;
                    &#123;/each&#125;
                    &lt;/div&gt;
                &lt;/td&gt;
            &#123;:else&#125;
                &lt;td class="demo-cell"&gt;
                    &lt;div class="demo-slot-render"&gt;NONE&lt;/div&gt;
                &lt;/td&gt;
            &#123;/if&#125;
        &#123;/if&#125;
    &#123;/each&#125;
&lt;/tr&gt;</code></pre> <p>Between the two time rows we add button rows so the user can create a slot for a specific time. Again, the first cell is empty (row header column).
We loop over <code>timeStamps</code> and pass each value to <code>addSlot</code>.</p> <pre class="language-svelte"><code class="language-svelte">// CourseSchedule/phase5/src/external/Schedule.svelte#L226-L237

&lt;tr&gt;
    &lt;td class="demo-btn-cell"&gt;&lt;/td&gt;
    &#123;#each timeStamps as stamp, index&#125;
        &#123;#if index &lt; 5&#125;
            &lt;td class="demo-btn-cell"&gt;
                &lt;Button tabindex=&#123;-1&#125; id="add-button" class="&#123;buttonCls&#125; &#123;colorCls&#125; " name="ToastOpen" onclick=&#123;() =&gt; addSlot(stamp)&#125;&gt;
                    &lt;UserAddOutline class="&#123;iconCls&#125;" /&gt;
                &lt;/Button&gt;
            &lt;/td&gt;
        &#123;/if&#125;
    &#123;/each&#125;
&lt;/tr&gt;</code></pre> <p>The complete Svelte component is at the bottom of this page.</p> <!> <p>We include the new component in the projection with <code>replace=Schedule</code>. Because the table already conveys each slot’s time,
we hide <code>\\$&#123;self.time&#125;</code> in the <code>Slot</code> projection.</p> <pre class="language-freon"><code class="language-freon">// CourseSchedule/phase5/defs/externals.edit#L20-L31

Schedule &#123;[
Schedule $&#123;self.name&#125;

$&#123;self.timeSlots replace=Schedule&#125;

]&#125;

Slot &#123;[
    Teacher: $&#123;self.teacher&#125;
    Room:    $&#123;self.room&#125;
    Course:  $&#123;self.course&#125;
]&#125;</code></pre> <p>By now you know the small amount of admin needed to register an external component, so we won’t repeat it here.</p> <!> <p>When all is done, the editor should look like this. Neat, right?</p> <!> <!> <p>After following these steps, you’ll have a Svelte component that displays a sorted table of time slots. This approach adapts well
to any case where you want to preprocess and present structured data in a table. The editor shows the schedule neatly sorted by
day and time, and users can interactively add slots.</p> <p>This extended example demonstrates how custom Svelte components in the Freon editor unlock many design and UX possibilities.
Once you’re comfortable with this pattern, you can reuse it with any of the <a href="/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types">External Component Box Types</a>.</p> <p>Since external components are still experimental, we’re eager to learn how you plan to use them. If you decide to incorporate
them, please reach out to the Freon team at <a href="mailto:info@openmodeling.nl">info@openmodeling.nl</a> or via
GitHub — we’re happy to help.</p> <!> <p>For reference, here is the full implementation of the <code>Schedule.svelte</code> component:</p> <pre class="language-ts"><code class="language-ts">// CourseSchedule/phase5/src/external/Schedule.svelte

&lt;script lang="ts"&gt;
    import &#123;
        Box,
        PartListReplacerBox,
        type FreNode,
        FreNodeReference,
        AST, isNullOrUndefined, LabelBox, notNullOrUndefined
    &#125; from "@freon4dsl/core"
    import &#123;type FreComponentProps, RenderComponent&#125; from "@freon4dsl/core-svelte";
    import &#123;Slot, TimeStamp&#125; from "../freon/index.js";
    import &#123; UserAddOutline &#125; from 'flowbite-svelte-icons';
    import &#123; Button &#125; from 'flowbite-svelte';

    // This component replaces the component for "timeSlots: Slot[];" from model unit "Schedule".
    // This property is a parts list, therefore the external box to use is an PartListReplacerBox.
    // Props
    let &#123; editor, box &#125;: FreComponentProps&lt;PartListReplacerBox&gt; = $props();

    // The following three functions need to be included for the editor to function properly.
    // Please, set the focus to the first editable/selectable element in this component.
    async function setFocus(): Promise&lt;void&gt; &#123;
    &#125;
    const refresh = (why?: string): void =&gt; &#123;
        // do whatever needs to be done to refresh the elements that show information from the model
        initialize();
    &#125;;
    $effect(() =&gt; &#123;
        initialize();
        box.setFocus = setFocus;
        box.refreshComponent = refresh;
    &#125;);

    // --------------------------- //
    let slotToBoxMap: Map&lt;Slot, Box&gt; = new Map&lt;Slot, Box&gt;();
    // an array of 10 positions, making use of the 10 different timeSlots that are available
    let sortedSlots: Slot[][] = $state(initSortedSlots());

    function initSortedSlots(): Slot[][] &#123;
        let slots = [];
        for (let i = 0; i &lt; 10; i++) &#123;
            slots[i] = [];
        &#125;
        return slots;
    &#125;

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

    function sortSlots(startVal: Slot[]) &#123;
        const newSlots: Slot[][] = []
        for (let i = 0; i &lt; 10 ; i++) &#123;
            newSlots[i] = [];
        &#125;
        (startVal).forEach((val, index) =&gt; &#123;
            // remember which box belongs to which slot
            slotToBoxMap.set(val, box.children[index]);
            switch (val.$time.day) &#123;
                case 1: &#123;
                    switch (val.$time.part) &#123;
                        case 1: &#123; // Monday morning
                            newSlots[0].push(val);
                            break;
                        &#125;
                        case 2: &#123; // Monday afternoon
                            newSlots[5].push(val);
                            break;
                        &#125;
                        default: &#123;
                            newSlots[0].push(val);
                        &#125;
                    &#125;
                    break;
                &#125;
                case 2: &#123;
                    switch (val.$time.part) &#123;
                        case 1: &#123; // Tuesday morning
                            newSlots[1].push(val);
                            break;
                        &#125;
                        case 2: &#123; // Tuesday afternoon
                            newSlots[6].push(val);
                            break;
                        &#125;
                        default: &#123;
                            newSlots[1].push(val);
                        &#125;
                    &#125;
                    break;
                &#125;
                case 3: &#123;
                    switch (val.$time.part) &#123;
                        case 1: &#123; // Wednesday morning
                            newSlots[2].push(val);
                            break;
                        &#125;
                        case 2: &#123; // Wednesday afternoon
                            newSlots[7].push(val);
                            break;
                        &#125;
                        default: &#123;
                            newSlots[2].push(val);
                        &#125;
                    &#125;
                    break;
                &#125;
                case 4: &#123;
                    switch (val.$time.part) &#123;
                        case 1: &#123; // Thursday morning
                            newSlots[3].push(val);
                            break;
                        &#125;
                        case 2: &#123; // Thursday afternoon
                            newSlots[8].push(val);
                            break;
                        &#125;
                        default: &#123;
                            newSlots[3].push(val);
                        &#125;
                    &#125;
                    break;
                &#125;
                case 5: &#123;
                    switch (val.$time.part) &#123;
                        case 1: &#123; // Friday morning
                            newSlots[4].push(val);
                            break;
                        &#125;
                        case 2: &#123; // Friday afternoon
                            newSlots[9].push(val);
                            break;
                        &#125;
                        default: &#123;
                            newSlots[4].push(val);
                        &#125;
                    &#125;
                    break;
                &#125;
            &#125;
        &#125;)
        sortedSlots = newSlots
    &#125;

    /* Sort the list of slots based on the time */
    function initialize() &#123;
        let startVal: FreNode[] | undefined = box.getPropertyValue();
        if (notNullOrUndefined(startVal) &amp;&amp; box.getPropertyType() === "Slot") &#123;
            // cast the startVal to the expected type, in this case "Slot[]".
            // sort the slots based on the time and remember which box belongs to which slot
            sortSlots(startVal as Slot[]);
        &#125;
    &#125;

    const addSlot = (timeStamp: TimeStamp) =&gt; &#123;
        // Note that you need to put any changes to the actual model in a 'AST.change' or 'AST.changeNamed',
        // because all elements in the model are reactive using mobx.
        AST.change(() =&gt; &#123;
            let newSlot: Slot = Slot.create(&#123;time: FreNodeReference.create&lt;TimeStamp&gt;(timeStamp, "TimeStamp")&#125;);
            box.getPropertyValue().push(newSlot);
        &#125;);
    &#125;

    const findBoxForSlot = (slot: Slot): Box =&gt; &#123;
        let xx = slotToBoxMap.get(slot);
        if (!isNullOrUndefined(xx)) &#123;
            return xx;
        &#125; else &#123;
            return new LabelBox(box.node, 'no-role', () =&gt; &#123; return 'No box found'&#125;);
        &#125;
    &#125;
    initialize();
    const colorCls: string = 'text-light-base-50 dark:text-dark-base-900 ';
    const buttonCls: string =
      'bg-light-base-600 					dark:bg-dark-base-200 ' +
      'hover:bg-light-base-900 		dark:hover:bg-dark-base-50 ' +
      'border-light-base-100 			dark:border-dark-base-800 ';
    const iconCls: string = 'ms-0 inline h-6 w-6';
&lt;/script&gt;


&lt;div class="demo-table-container"&gt;
    &lt;table class="demo-table"&gt;
        &lt;thead&gt;
        &lt;tr class="demo-header-row"&gt;
            &lt;th class="demo-header-cell"&gt;&lt;/th&gt;
            &#123;#each dayTitle as title&#125;
                &lt;th class="demo-header-cell"&gt;&#123;title&#125;&lt;/th&gt;
            &#123;/each&#125;
        &lt;/tr&gt;
        &lt;/thead&gt;
        &lt;tbody&gt;
        &lt;tr class="demo-row"&gt;
            &lt;td class="demo-header-cell"&gt;Morning&lt;/td&gt;
            &#123;#each sortedSlots as slots, index&#125;
                &#123;#if index &lt; 5&#125;
                    &#123;#if slots.length &gt; 0&#125;
                        &lt;td class="demo-cell"&gt;
                            &lt;div class="demo-cell-content"&gt;
                            &#123;#each slots as slot&#125;
                                &lt;div class="demo-slot-render"&gt;
                                &lt;RenderComponent box=&#123;findBoxForSlot(slot)&#125; editor=&#123;editor&#125; /&gt;
                                &lt;/div&gt;
                            &#123;/each&#125;
                            &lt;/div&gt;
                        &lt;/td&gt;
                    &#123;:else&#125;
                        &lt;td class="demo-cell"&gt;
                            &lt;div class="demo-slot-render"&gt;NONE&lt;/div&gt;
                        &lt;/td&gt;
                    &#123;/if&#125;
                &#123;/if&#125;
            &#123;/each&#125;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td class="demo-btn-cell"&gt;&lt;/td&gt;
            &#123;#each timeStamps as stamp, index&#125;
                &#123;#if index &lt; 5&#125;
                    &lt;td class="demo-btn-cell"&gt;
                        &lt;Button tabindex=&#123;-1&#125; id="add-button" class="&#123;buttonCls&#125; &#123;colorCls&#125; " name="ToastOpen" onclick=&#123;() =&gt; addSlot(stamp)&#125;&gt;
                            &lt;UserAddOutline class="&#123;iconCls&#125;" /&gt;
                        &lt;/Button&gt;
                    &lt;/td&gt;
                &#123;/if&#125;
            &#123;/each&#125;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td class="demo-header-cell"&gt;Afternoon&lt;/td&gt;
            &#123;#each sortedSlots as slots, index&#125;
                &#123;#if index &gt;= 5&#125;
                    &#123;#if slots.length &gt; 0&#125;
                        &lt;td class="demo-cell"&gt;
                            &#123;#each slots as slot&#125;
                                &lt;div class="demo-slot-render"&gt;
                                &lt;RenderComponent box=&#123;findBoxForSlot(slot)&#125; editor=&#123;editor&#125; /&gt;
                                &lt;/div&gt;
                            &#123;/each&#125;
                        &lt;/td&gt;
                    &#123;:else&#125;
                        &lt;td class="demo-cell"&gt;
                            &lt;div class="demo-slot-render"&gt;
                                NONE
                            &lt;/div&gt;
                        &lt;/td&gt;
                    &#123;/if&#125;
                &#123;/if&#125;
            &#123;/each&#125;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td class="demo-btn-cell"&gt;&lt;/td&gt;
            &#123;#each timeStamps as stamp, index&#125;
                &#123;#if index &gt;= 5&#125;
                    &lt;td class="demo-btn-cell"&gt;
                        &lt;Button tabindex=&#123;-1&#125; id="add-button" class="&#123;buttonCls&#125; &#123;colorCls&#125; " name="ToastOpen" onclick=&#123;() =&gt; addSlot(stamp)&#125;&gt;
                            &lt;UserAddOutline class="&#123;iconCls&#125;" /&gt;
                        &lt;/Button&gt;
                    &lt;/td&gt;
                &#123;/if&#125;
            &#123;/each&#125;
        &lt;/tr&gt;
        &lt;/tbody&gt;
    &lt;/table&gt;
&lt;/div&gt;


&lt;style&gt;
    .demo-table-container &#123;
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
    &#125;
    .demo-table &#123;
        min-width:100%;
        border:0;
        white-space:nowrap;
        border-spacing:0;
        table-layout:fixed;
    &#125;
    .demo-cell &#123;
        height: 200px;
        border-right-width: 1px;
        border-right-style: solid;
        border-right-color: rgba(0,0,0,.12);
    &#125;
    .demo-slot-render &#123;
        margin: 0 4px 20px 4px;
    &#125;
    .demo-header-row &#123;
        height: 56px;
    &#125;
    .demo-header-cell &#123;
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
    &#125;
    .demo-cell-content &#123;
        justify-content: space-between;
        flex-direction: column;
        display: flex;
    &#125;
    .demo-btn-cell &#123;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: rgba(0,0,0,.12);
        border-right-width: 1px;
        border-right-style: solid;
        border-right-color: rgba(0,0,0,.12);
        justify-content: space-between;
    &#125;
&lt;/style&gt;
</code></pre> <!>`,1);function je(B,t){pe(t,!0);const r=me({});Le(()=>{document.querySelectorAll("pre").forEach(n=>{const l=document.createElement("div");l.className="copy-prompt";const k=document.createElement("p");k.innerHTML="👆 Click to copy",k.className="copy-prompt-p";const O=document.createElement("img");O.src="/icons/copy-icon.svg",O.className="copy-prompt-img",l.appendChild(O),l.appendChild(k),n.appendChild(l),n.querySelector(".copy-prompt > p")?.addEventListener("click",()=>{n.querySelector("code")?.textContent!==null&&n.querySelector("code")?.textContent!==void 0&&Ae(n.querySelector("code").textContent),n.querySelector(".copy-prompt > p")?.innerHTML!==null&&n.querySelector(".copy-prompt > p")?.innerHTML!==void 0&&(n.querySelector(".copy-prompt > p").innerHTML="Copied!",setTimeout(()=>{n.querySelector(".copy-prompt > p").innerHTML="👆 Click to copy"},1e3))})})});let T="/Examples/External_Components/Replacing_a_Part_List",b="/Examples/Website_Integration";var E=Oe(),_=H(E);ce(_,{prevLink:T,nextLink:b});var C=o(_,2);W(C,{tag:"h1",id:"a-sorted-table-1",onIntersectChange:e=>t.setVisible("a-sorted-table-1",e),get intersecting(){return r["a-sorted-table-1"]},set intersecting(e){r["a-sorted-table-1"]=e},children:(e,n)=>{P();var l=A("A Sorted Table");i(e,l)},$$slots:{default:!0}});var F=o(C,10);W(F,{tag:"h2",id:"step-1-create-the-svelte-component-2",onIntersectChange:e=>t.setVisible("step-1-create-the-svelte-component-2",e),get intersecting(){return r["step-1-create-the-svelte-component-2"]},set intersecting(e){r["step-1-create-the-svelte-component-2"]=e},children:(e,n)=>{P();var l=A("Step 1: Create the Svelte Component");i(e,l)},$$slots:{default:!0}});var L=o(F,36);W(L,{tag:"h2",id:"step-2-include-in-the-projection-3",onIntersectChange:e=>t.setVisible("step-2-include-in-the-projection-3",e),get intersecting(){return r["step-2-include-in-the-projection-3"]},set intersecting(e){r["step-2-include-in-the-projection-3"]=e},children:(e,n)=>{P();var l=A("Step 2: Include in the Projection");i(e,l)},$$slots:{default:!0}});var V=o(L,8);W(V,{tag:"h2",id:"final-result-4",onIntersectChange:e=>t.setVisible("final-result-4",e),get intersecting(){return r["final-result-4"]},set intersecting(e){r["final-result-4"]=e},children:(e,n)=>{P();var l=A("Final Result");i(e,l)},$$slots:{default:!0}});var I=o(V,4);Ne(I,{imageName:"examples/CourseSchedule/Screenshot-step5.png",caption:"Editor with sorted table showing Slots",figureNumber:1});var z=o(I,2);W(z,{tag:"h2",id:"conclusion-5",onIntersectChange:e=>t.setVisible("conclusion-5",e),get intersecting(){return r["conclusion-5"]},set intersecting(e){r["conclusion-5"]=e},children:(e,n)=>{P();var l=A("Conclusion");i(e,l)},$$slots:{default:!0}});var S=o(z,8);W(S,{tag:"h2",id:"the-complete-svelte-component-6",onIntersectChange:e=>t.setVisible("the-complete-svelte-component-6",e),get intersecting(){return r["the-complete-svelte-component-6"]},set intersecting(e){r["the-complete-svelte-component-6"]=e},children:(e,n)=>{P();var l=A("The Complete Svelte Component");i(e,l)},$$slots:{default:!0}});var q=o(S,6);ce(q,{prevLink:T,nextLink:b}),i(B,E),he()}var Re=f('<meta property="article:published_time"/>'),Ee=f('<meta property="article:modified_time"/>'),Ve=f('<meta property="article:tag"/>'),Ie=f('<meta name="description"/> <meta name="robots" content="index,follow"/> <link rel="canonical"/> <!> <!> <!> <meta name="keywords"/> <meta property="og:type" content="article"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:site_name"/> <meta property="og:image"/> <meta property="og:url"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"/> <meta name="twitter:description"/> <meta name="twitter:image"/> <!>',1),ze=(B,t)=>{ge(t,!a(t))},Ue=f('<img class="page-toc-small-img" src="/icons/upload.png" alt="arrow up"/>'),He=f('<img class="page-toc-small-img" src="/icons/down-arrow.png" alt="arrow down"/>'),qe=f('<li class="page-toc-text"><a> </a></li>'),$e=f('<div class="toc-details"><ul class="page-ul"></ul></div>'),Ge=f('<li class="page-toc-text"><a> </a></li>'),Xe=f('<div class="page-main"><div class="page-toc-small"><p class="page-toc-small-title">On this page ...</p> <button class="page-toc-small-expand-button"><!></button></div> <!> <!> <!></div> <nav class="page-toc"><h3 class="page-toc-title">On this page</h3> <ul class="page-ul"></ul></nav>',1);function lt(B,t){pe(t,!0);let r=re(!1);const T=me([{id:"a-sorted-table-1",title:"A Sorted Table",visible:!1,ref:"#a-sorted-table-1"},{id:"step-1-create-the-svelte-component-2",title:"Step 1: Create the Svelte Component",visible:!1,ref:"#step-1-create-the-svelte-component-2"},{id:"step-2-include-in-the-projection-3",title:"Step 2: Include in the Projection",visible:!1,ref:"#step-2-include-in-the-projection-3"},{id:"final-result-4",title:"Final Result",visible:!1,ref:"#final-result-4"},{id:"conclusion-5",title:"Conclusion",visible:!1,ref:"#conclusion-5"},{id:"the-complete-svelte-component-6",title:"The Complete Svelte Component",visible:!1,ref:"#the-complete-svelte-component-6"}]);let b=re(0);function E(s,d){const g=T.find(p=>p.id===s);g&&(g.visible=d);const m=T.findIndex(p=>p.visible);m>=0&&ge(b,m,!0)}const _=G(()=>t.data.page.title?`${t.data.site.title} – ${t.data.category.title} – ${t.data.page.title}`:`${t.data.site.title} – ${t.data.category.title}`),C=G(()=>t.data.page.description??t.data.category.description),F="https://freon4dsl.dev/images/freon-banner.png";let L=G(()=>{const s=ke.url.pathname;return`https://freon4dsl.dev${s==="/"?"/":s.replace(/\/$/,"")}`});const V=t.data.site?.tags??[],I=t.data.category?.tags??[],z=t.data.page.tags??[],S=[...new Set([...V,...I,...z].filter(Boolean))],q={"@context":"https://schema.org","@type":"WebPage",headline:a(_),description:a(C),url:a(L),datePublished:t.data.page.publishedTime,dateModified:t.data.page.modifiedTime,keywords:S.length?S.join(", "):void 0,image:F,publisher:t.data?.site?.title?{"@type":"Organization",name:t.data.site.title}:void 0};var e=Xe();Fe(s=>{var d=Ie(),g=H(d),m=o(g,4),p=o(m,2);{var M=h=>{var x=Re();N(()=>c(x,"content",t.data.page.publishedTime)),i(h,x)};R(p,h=>{t.data.page.publishedTime&&h(M)})}var y=o(p,2);{var w=h=>{var x=Ee();N(()=>c(x,"content",t.data.page.modifiedTime)),i(h,x)};R(y,h=>{t.data.page.modifiedTime&&h(w)})}var j=o(y,2);{var $=h=>{var x=Te(),ye=H(x);X(ye,17,()=>S,Me,(we,xe)=>{var ne=Ve();N(()=>c(ne,"content",a(xe))),i(we,ne)}),i(h,x)};R(j,h=>{S&&h($)})}var U=o(j,2),Q=o(U,4),Y=o(Q,2),ee=o(Y,2),te=o(ee,2);c(te,"content",F);var oe=o(te,2),ae=o(oe,4),se=o(ae,2),le=o(se,2);c(le,"content",F);var Se=o(le,2);Be(Se,()=>`<script type="application/ld+json">${JSON.stringify(q)}<\/script>`),N(h=>{_e.title=a(_)??"",c(g,"content",a(C)),c(m,"href",a(L)),c(U,"content",h),c(Q,"content",a(_)),c(Y,"content",a(C)),c(ee,"content",t.data.site.title),c(oe,"content",a(L)),c(ae,"content",a(_)),c(se,"content",a(C))},[()=>S.join(", ")]),i(s,d)});var n=H(e),l=v(n),k=o(v(l),2);k.__click=[ze,r];var O=v(k);{var ue=s=>{var d=Ue();i(s,d)},fe=s=>{var d=He();i(s,d)};R(O,s=>{a(r)?s(ue):s(fe,!1)})}u(k),u(l);var Z=o(l,2);{var ve=s=>{var d=$e(),g=v(d);X(g,22,()=>T,m=>m,(m,p,M)=>{var y=qe(),w=v(y);let j;var $=v(w,!0);u(w),u(y),N(U=>{c(w,"href",p.ref),j=de(w,1,"",null,j,U),ie($,p.title)},[()=>({"page-visible":a(M)===a(b),"page-nonvisible":a(M)!==a(b)})]),i(m,y)}),u(g),u(d),i(s,d)};R(Z,s=>{a(r)&&s(ve)})}var D=o(Z,2);Pe(D,{});var be=o(D,2);je(be,{setVisible:E}),u(n);var J=o(n,2),K=o(v(J),2);X(K,22,()=>T,s=>s,(s,d,g)=>{var m=Ge(),p=v(m);let M;var y=v(p,!0);u(p),u(m),N(w=>{c(p,"href",d.ref),M=de(p,1,"",null,M,w),ie(y,d.title)},[()=>({"page-visible":a(g)===a(b),"page-nonvisible":a(g)!==a(b)})]),i(s,m)}),u(K),u(J),i(B,e),he()}Ce(["click"]);export{lt as component,st as universal};
//# sourceMappingURL=76.ZFK9w-Ot.js.map
