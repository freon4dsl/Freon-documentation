<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# External Component Box Types

<Note><svelte:fragment slot="header">External components are experimental</svelte:fragment>
<svelte:fragment slot="content">
<p>The use of external components in the Freon editor is experimental. 
Compatibility with every library isn’t guaranteed, and future versions 
of Freon may alter how external components are included. Proceed with this in mind.</p>
</svelte:fragment></Note>

In this version of Freon it is possible to include UI components that are not native to Freon. 
See [External Components](/Documentation/Customizations/External_Components).

The use of external components requires knowledge of the Freon [Box Model](/Documentation/Under_the_Hood/Editor_Framework). 
In this section we explain the API for the various forms of external components.

## Simple Additions

Simple additions have no link to the model (the AST). They may appear anywhere in the projection.
However, because they are present in the projection of a certain node, they are coupled to this node.
To include a simple external component within a projection, use the
syntax `[external = AnimatedGif ]`, where `AnimatedGif` is the name of the desired component.
Ensure there is no space between the opening square bracket (`[`) and the keyword fragment, and note that the
component name must be included in the [`global`](/Documentation/Defining_an_Editor/Global_Projections) section of the
default editor.


- BoxType: `ExternalSimpleBox`.
- Interface:
  - No specific interface.

## Fragment Wrappers

Fragment wrappers may appear anywhere in a projection. Fragment wrappers wrap a single projection. This is the `childBox`.
Note that the childBox itself may be a vertical or horizontal layout containing many other elements.

- Syntax:
  - To position the wrapper within the projection:
    `[fragment XX wrap=SMUI_Card]`
  - To define the wrapped content the following must be included within the square brackets of the projection
    definition. It must be beneath the projection (the bit between `[]` brackets).
- BoxType: `FragmentWrapperBox`.
- Interface:
  - `childBox: Box`
    - Use this method and the `RenderComponent` to show the childBox in the external component.

Example:

```proto
MyConcept {
    [
        Here is a fragment [fragment XX wrap = SMUI_Card]
    ]
    fragment XX [
        My First Card wrapping a property: ${self.isUnderConstruction}
        Great, isn't it!
    ]
}
```

## Property Projections: Wrapping or Replacing

A property projection may be wrapped in an external component, or the external component can replace the native
projection. In the latter case it is up to the language engineer to get and set the value correctly, and to
get tabbing etc. working.

## Wrapping Property Projections of Primitive Type

- Syntax: `${self.name wrap=SMUI_Dialog}`
- BoxType: `StringWrapperBox`, `NumberWrapperBox`, or `BooleanWrapperBox`
- Interface:
  - `getPropertyName(): string`
    - Returns the name of the wrapped property.
  - `getPropertyValue(): string`
    - Returns the value of the wrapped property. Type is `string` in case of an ExternalStringBox,
      `number` or `boolean` for the other box types.
  - `childBox: Box`
    - Returns the projection for the property. Use this method and the `RenderComponent` to
      show the property projection in the external component. Note that when a list is wrapped, this method returns
      a single Box that holds the native projection for the complete list, i.e. a horizontal list, vertical list, or
      table projection.

## Wrapping Property Projections of Part List Type

- Syntax: `${self.parts wrap=SMUI_Accordion}`
- BoxType: `PartListWrapperBox`
- Interface:
  - `getPropertyName(): string`
    - Returns the name of the wrapped property.
  - `getPropertyValue(): FreNode[]`
    - Returns the value of the wrapped property. You need to cast the returned value to the required type.
  - `childBox: Box`
    - Returns the projection for the property. Use this method and the `RenderComponent` to
      show the property projection in the external component. Note that this method returns
      a single Box that holds the native projection for the complete list, i.e. a horizontal
      list, vertical list, or table projection.
- Example:

## Wrapping Property Projections of Reference List Type

- Syntax: `${self.parts wrap=SMUI_Accordion}`
- BoxType: `RefListWrapperBox`
- Interface:
  - `getPropertyName(): string`
    - Returns the name of the wrapped property.
  - `getPropertyValue(): FreNodeReference[]`
    - Type is `string` in case of an ExternalStringBox, `number` or `boolean` for the other box types.
  - `childBox: Box`
    - Returns the projection for the property. Use this method and the `RenderComponent` to
      show the property projection in the external component. Note that this method returns
      a single Box that holds the native projection for the complete list, i.e. a horizontal
      list, vertical list, or table projection.
- Example:

## Wrapping Property Projections of Part Type

- Syntax: `${self.part wrap=SMUI_Dialog}`
- BoxType: `PartWrapperBox`
- Interface:
  - `getPropertyName(): string`
    - Returns the name of the wrapped property.
  - `getPropertyValue(): FreNode`
    - Returns the value of the wrapped property. You need to cast the returned value to the required type.
  - `childBox: Box`
    - Returns the projection for the property. Use this method and the `RenderComponent` to
      show the property projection in the external component.

## Wrapping Property Projections of Reference Type

- Syntax: `${self.reference wrap=SMUI_Dialog}`
- BoxType: `RefWrapperBox`
- Interface:
  - `getPropertyName(): string`
    - Returns the name of the wrapped property.
  - `getPropertyValue(): FreNodeReference`
    - Returns the value of the wrapped property.
  - `childBox: Box`
    - Returns the projection for the property. Use this method and the `RenderComponent` to
      show the property projection in the external component.

## Replacing Property Projections of Primitive Type

- Syntax: `${self.name replace=SMUI_Dialog}`
- BoxType: `ExternalStringBox`, `ExternalNumberBox`, or `ExternalBooleanBox`
- Interface:
  - `getPropertyName(): string`
    - Returns the name of the replaced property.
  - `getPropertyValue(): string`
    - Returns the value of the replaced property.
      Type is `string` in case of an `ExternalStringBox`, `number` or `boolean` for the other box types.
  - `setPropertyValue(newValue: string)`
    - Sets the value of the property.
      Type is `string` in case of an `ExternalStringBox`, `number` or `boolean` for the other box Types.

## Replacing Property Projections of Part List Type

- Syntax: `${self.parts replace=SMUI_Accordion}`
- BoxType: `ExternalPartListBox`
- Interface:
  - `getPropertyName(): string`
    - Returns the name of the replaced property.
  - `getPropertyValue(): FreNode[]`
    - Returns the value of the replaced property. You need to cast the returned value to the required type.
  - `setPropertyValue(newValue: FreNode[])`
    - Sets the value of the property.
  - `children: Box[]`
    - Returns a list of boxes that hold the projection for every item in the list.

## Replacing Property Projections of Reference List Type

- Syntax: `${self.parts replace=SMUI_Accordion}`
- BoxType: `ExternalRefListBox`
- Interface:
  - `getPropertyName(): string`
    - Returns the name of the replaced property.
  - `getPropertyValue(): FreNodeReference[]`
    - Returns the value of the replaced property. You need to cast the returned value to the required type.
  - `setPropertyValue(newValue: FreNodeReference[])`
    - Sets the value of the property.
  - `children: Box[]`
    - Returns a list of boxes that hold the projection for every item in the list.

## Replacing Property Projections of Part Type

- Syntax: `${self.part replace=SMUI_Dialog}`
- BoxType: `ExternalPartBox`
- Interface:
  - `getPropertyName(): string`
    - Returns the name of the replaced property.
  - `getPropertyValue(): FreNode`
    - Returns the value of the replaced property. You need to cast the returned value to the required type.
  - `setPropertyValue(newValue: FreNode)`
    - Sets the value of the property.

## Replacing Property Projections of Reference Type

- Syntax: `${self.reference replace=SMUI_Dialog}`
- BoxType: `ExternalRefBox`
- Interface:
  - `getPropertyName(): string`
    - Returns the name of the replaced property.
  - `getPropertyValue(): FreNodeReference`
    - Returns the value of the replaced property.
  - `setPropertyValue(newValue: FreNodeReference)`
    - Sets the value of the property.

## Wiring

1. Create your Svelte components in the webapp package. Be sure to which type of box your component will be
   linked. Use the box interface to get and set any model values.
2. Let the generator know which external projections there are. This done in the 'global' part of the default editor.

   Example:

```freon
    global {
        external {
            AnimatedGif,
            SMUI_Card,
            SMUI_Accordion,
            SMUI_Dialog,
            DatePicker
        }
    }
```

3.  Let the RenderComponent know which external projections there are. This is done using the setCustomComponents() method
    from the '@freon4dsl/core-svelte' package. This method should be called before starting the actual application.

        Note that the names should be equal to the names used in step 2.

        Example:

```ts
setCustomComponents([
   {component: ShowAnimatedGif, knownAs: "AnimatedGif"},
   {component: SMUI_Card_Component, knownAs: "SMUI_Card"},
   {component: SMUI_Accordion, knownAs: "SMUI_Accordion"},
   {component: SMUI_Dialog, knownAs: "SMUI_Dialog"},
   {component: DatePicker, knownAs: "DatePicker"}
]);
```

## Parameters to the external components

You can set parameters to an external component in the .edit file. These are simple key-value pairs, both key
and value are strings. There can be a list of parameters.

In the interface of all box types explained above the method `findParam(key: string): string` is included. This
method can be used to find the value of the parameter that was included in the .edit file.

## Nesting

External projections may be nested.
Example:

```freon
external SMUI_Card [
    This Card is showing animated gif number 1.
        [external=AnimatedGif number="1"]
    ]
```
