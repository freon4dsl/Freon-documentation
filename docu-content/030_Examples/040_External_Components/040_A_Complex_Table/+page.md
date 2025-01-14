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
Svelte component. The type of the parameter must be one of
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

The Freon code generator must know that there is an external component and how to instantiate it.
This is done by making two changes to the .edit files. First, we let the generator know that 
there is an external component. This is done in 
the [`global` section](/Documentation/Defining_an_Editor/Global_Projections) of the default editor.
Note that we can give it any name we like, because the coupling 
between this name and the actual component is done separately. However, to keep things 
simple, we use the same name here.

```proto
// CourseSchedule/step2/main.edit#L3-L7

global {
    external {
        PersonIcon
    }
}
```

## Include the Component in the Projection

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



When all is done, the editor should look like this.

<Figure
imageName={'examples/CourseSchedule/Screenshot-step2.png'}
caption={'Editor with added Fragment and Icon'}
figureNumber={2}
/>

Don't forget to include the library components in your package.json as dependencies.
(step2: add person icon and use fragments => add globals to main.edit, make PersonIcon.svelte)
(step3: add iconbutton and snackbar, change package.json to include these, make PhoneButton.svelte, use getPropertyValue())
step4: add acoordion (styling is adjusted)

In the end I want to show
* all courses
* all teachers
* all rooms (per room button to show schedule??)
* per room what courses are taking place, and which teachers
* per teacher what courses in which rooms
* per course: which rooms, which teacher

On a card: the content per time unit, i.e. per teacher: course + room

SMUI elements to show: 
* icon button => open new window with chat
* text field => change the name of something
* accordion => different departments or rooms
* tabs => use same example as accordion



==============

Next, there are four functions that must be present in the Svelte component. Together they
make sure that the editor is updated correctly whenever the underlying AST
(e.g. adding, removing nodes) or box model (e.g. selecting a different view) changes.

The first of the four is a function that is called when the editor wants to set the focus
to this component. It could, for instance, be implemented by redirecting the focus to an HTML element
in the component. It makes no sense to set the focus on a simple icon, therefore it is not used here.

The second is a function that should refresh any variable use within the component that is dependent upon
the underlying box or AST node. Because only you as maker of this component know which these variables are,
you need to provide your own implementation of this function. Again

```ts
// CourseSchedule/step2/PersonIcon.svelte#L9-L25


<img src='./icons8-person-94.png' alt="Icon showing Person" height="30px"/>

```
