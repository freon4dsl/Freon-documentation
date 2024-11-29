<script>
    import Note from "$lib/notes/Note.svelte";
</script>

# Projections to be used Globally

For some concrete syntax elements you may provide a global definition, i.e. these definitions 
to be used everywhere in the editor.
Note that this can be done once in the complete set of editors, only in the _default_ editor definition. 
However, the global definitions can be overwritten per property. 

All global projection definitions need to be within curly brackets (`{}`) prefixed with the keyword `global`.

## Boolean Projections

The keywords to be used for
the boolean _true_ and _false_ values can be defined globally, or you can choose to display boolean values as a boolean control.
Every option described in [Boolean Projections](/Documentation/Defining_an_Editor/Boolean_Projections) is allowed.

In the example below, the user will view 
every boolean property as an inner-switch button with the string `YES` for the value `true`, 
and `NO` for the value `false`.

```ts
// DocuProject/src/defs/editor-main-default.edit#L5-L18

global {
    boolean inner-switch [YES | NO] // the strings used to display a boolean value, all booleans will default be displayed as an inner switch control
//    limited radio
//    limited[] checkbox
    // number slider  // you can use the slider control as default projection for numbers, but this will not often be the preferred option
    referenceSeparator [:] // the string that separates the names in a path name, e.g. pack1:cls3:part
    external {
        AnimatedGif,
        SMUI_Card,
        SMUI_Accordion,
        SMUI_Dialog,
        DatePicker
    }
}
```

## Projections for Limited Concepts

To indicate global definitions for limited concepts you can use the keywords `limited` and `limited[]` for
single valued properties and multivalued properties respectively. The keyword(s) must be followed by the 
options available for limited concepts, as described 
in [Projections for Limited Concepts](/Documentation/Defining_an_Editor/Projections_for_Limited_Concepts).

## Projections for Numbers

To indicate global definitions for properties with type `number` you can use the keyword `number`. The 
keyword must be followed by the options available for numbers, as described
in [Number Projections](/Documentation/Defining_an_Editor/Number_Projections).

## Reference Separator

References to other objects may consist of a series of names, like _country.city.street.house_. The string used to separate
these names (in the example above ".") can be set.

## Adding Names of External Components

Freon offers the possibility to include Svelte components that are defined outside of Freon. These components
are called [_external_](/Documentation/Defining_an_Editor/External_Components). All names of external components 
need to be declared in the `global` section.
