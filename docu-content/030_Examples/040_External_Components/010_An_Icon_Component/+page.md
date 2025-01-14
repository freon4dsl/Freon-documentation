<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# An Icon Component

To improve the look of the staff model unit, we are going to add an icon to each person. 
Let's create a Svelte component that does just that, and name it `PersonIcon.svelte`.

## Create the Svelte Component

Freon must be able to make the coupling between this component and
the [box model](/Documentation/Under_the_Hood/Editor_Framework#the-ast-the-box-tree-and-the-dom-2).
Our newly made component must be connected to a box. Therefore, there must be a parameter named `box` in the
Svelte component. The type of the parameter should be one of
the [external box types](/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types).
Here, we are using the simplest of them, the
`ExternalSimpleBox`. Note that the parameter `editor: FreEditor` is also mandatory. When the component
is instantiated by the Freon editor both parameters will get a value.

The complete Svelte component is the following.

```ts
// CourseSchedule/step2/PersonIcon.svelte

<script lang="ts">
    import {ExternalSimpleBox, FreEditor} from "@freon4dsl/core";

    // Freon expects both of these to be present, even if they are not used.
    export let box: ExternalSimpleBox;
    export let editor: FreEditor;

</script>

<img src='./icons8-person-94.png' alt="Icon showing Person" height="30px"/>

```

## Add the Component to the Global Section

The Freon code generator must know that there is an external component.
This is done by making changes to the .edit files. First, we let the generator know that 
there is an external component. This is done in 
the [`global`](/Documentation/Defining_an_Editor/Global_Projections) section of the default editor.
Note that we can give it any name we like, because the coupling 
between this name and the actual component is done separately 
(see [Adjust the Starter](/Examples/External_Components/An_Icon_Component#adjust-the-starter-5). 
However, to keep things simple, we use the same name here.

```proto
// CourseSchedule/step2/main.edit#L3-L7

global {
    external {
        PersonIcon
    }
}
```

## Include the Component in the Projection

To include the new component we add `[external=PersonIcon]` to the projection for Person. 
Note that we use the name from the `global` section.
To be able to see the differences between the native editor and 
the one with external components we have decided to add the adjusted projection to a new 
editor (projection set). The icon is included in the fragment that shows the
name and phone number details.

Note that every fragment for the same concept must have a unique name. Therefore, we 
name this fragment `nameAndIcon`.

```proto
// CourseSchedule/step2/externals.edit

editor externals

Person {[
    [fragment nameAndIcon]
        Availability: ${self.availability checkbox} Competence: ${self.competence}
]
fragment nameAndIcon [
[external=PersonIcon] Nickname: ${self.name}
Full Name: ${self.fullName}
Phone number: ${self.phone}
]
}

```

## Adjust the Starter

The final move is to let the Freon editor know how to instantiate the new component.
This is done by adding a call to the function `setCustomComponents` to the 
code that starts up the application. It is here that the coupling is made
between this name used in the .edit files and the actual component.

```ts
// CourseSchedule/step2/starter.ts

import {FreonLayout, WebappConfigurator} from "@freon4dsl/webapp-lib";
import {ServerCommunication} from "@freon4dsl/core";
import {setCustomComponents} from "@freon4dsl/core-svelte";
import PersonIcon from "./customComponents/forCourseSchedule/PersonIcon.svelte";

/**
 * The one and only reference to the actual language for which this editor runs
 */
import {CourseScheduleEnvironment} from "@freon4dsl/samples-course-schedule";
WebappConfigurator.getInstance().setEditorEnvironment(CourseScheduleEnvironment.getInstance());

/**
 * The one and only reference to the server on which the models are stored
 */
WebappConfigurator.getInstance().setServerCommunication(ServerCommunication.getInstance());

/**
 * Make the external components known to Freon before starting the app!
 */
setCustomComponents([
    { component: PersonIcon, knownAs: "PersonIcon" }
]);

/**
 * Now start the app ...
 */
const app = new FreonLayout({
    target: document.body,
});

export default app;

```

When all is done, the editor should look like this.

<Figure
imageName={'examples/CourseSchedule/Screenshot-step2.png'}
caption={'Editor with added Icon'}
figureNumber={1}
/>
