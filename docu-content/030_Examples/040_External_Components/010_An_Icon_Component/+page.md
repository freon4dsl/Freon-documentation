<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# An Icon Component

In this part of the example, we will guide you through the process of enhancing the look of 
the `Staff` model by adding an icon to each person. We will create a 
custom Svelte component named `PersonIcon.svelte`, and integrate it into the editor. 
Let's get started!

## Step 1: Create the Svelte Component

To begin, we need to create a new Svelte component that will represent the icon for each 
person. Let's call it `PersonIcon.svelte`. This component must be linked to the box model 
of the Freon editor. In Freon, each external component must be associated with a box, 
and the `PersonIcon` component will be tied to a box type called `ExternalSimpleBox`.
The parameter `editor: FreEditor` is also mandatory. When the component
is instantiated by the Freon editor both parameters will get a value.

The complete Svelte component should look like this:

```ts
// CourseSchedule/phase2/src/external/PersonIcon.svelte

<script lang="ts">
    import {ExternalSimpleBox, FreEditor} from "@freon4dsl/core";

		// Declare the 'box' and 'editor' parameters as required by Freon
    export let box: ExternalSimpleBox;
    export let editor: FreEditor;

</script>

<!-- Display the icon with an image -->
<img src='./icons8-person-94.png' alt="Icon showing Person" height="30px"/>

```

## Step 2: Add to the Global Section

The next step is to inform the Freon code generator about the new external 
component. We can achieve this by modifying the [`global`](/Documentation/Defining_an_Editor/Global_Projections)  section 
of the default editor configuration.

In the `main.edit` file, add the following code to declare the `PersonIcon` component:

```proto
// CourseSchedule/phase2/defs/main.edit#L3-L7

global {
    external {
        PersonIcon
    }
}
```

This tells the editor that `PersonIcon` is an external component. You can name it 
anything you like, but for simplicity, we will use `PersonIcon`.

## Step3: Include in the Projection

To include the new component, we need to reference it in the editor's projection for 
the `Person` concept. The way to do this is by adding `[external=PersonIcon]` to the projection.
To be able to see the differences in the browser between the native editor and 
the one with external components we have decided to add the adjusted projection to a new 
editor (projection set). The icon is included in the fragment that shows the
name and phone number details.
Every fragment for the same concept must have a unique name. Therefore, we 
name this fragment `nameAndIcon`.

```proto
// CourseSchedule/phase2/defs/externals.edit

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

## Step4: Register in the Starter Code

Now, we need to ensure the Freon editor knows how to instantiate our custom component. 
This is done by calling the `setCustomComponents` function in the application’s startup code.

In your `starter.ts` file, import the `PersonIcon` component and add it to 
the `setCustomComponents` function like this:

```ts
// CourseSchedule/phase2/starter.ts

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

## Final Result

Once all the steps are completed, your editor will look like this, with each person 
displaying their details alongside the newly added icon:

<Figure
imageName={'examples/CourseSchedule/Screenshot-step2.png'}
caption={'Editor with added Icon'}
figureNumber={1}
/>

### Conclusion:
You’ve successfully added an icon to the `Staff` model in the Freon editor! 
By following these steps, you've created a custom Svelte component, integrated 
it into the Freon editor, and made it available in your projections. 

Next, you are going to learn how to get the information from the AST model, and use it
in your external components.

