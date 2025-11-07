---
title: External Component Box Types
description: API reference for the box types used to embed external (Svelte) components in Freon projections—simple additions, wrappers, and replacers—with syntax and wiring steps.
tags: external components, box types, wrappers, replacers, editor, RenderComponent, Svelte, Freon
---

<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# External Component Box Types

<Note>{#snippet header()}External components are fully supported{/snippet}
{#snippet content()}
<p>External components are a fully supported part of the editor framework. While compatibility with every third-party library cannot be guaranteed, the APIs described here are stable.</p>
{/snippet}
</Note>

You can include UI components that are not native to Freon.  
See **[External Components](/Documentation/Customizations/External_Components)** for an overview.

Using external components requires knowledge of the Freon **[Box Model](/Documentation/Under_the_Hood/Editor_Framework)**.  
This page documents the **API** for the various external-component box types.

---

## Simple Additions

Simple additions have **no link to the model (AST)** and may appear anywhere in a projection.  
They are still associated with the node whose projection they are placed in.

- **Syntax:** `[external=<ComponentName>]` (no space after `[`).
- The component name must be declared in the **[`global`](/Documentation/Defining_an_Editor/Global_Projections)** section of the default editor.
- **Box type:** `SimpleExternalBox`
- **Interface:** *(no specific API beyond common external props and `findParam()`)*

Example:

```proto
[external=AnimatedGif number="1"]
```


## Fragment Wrappers

A **fragment wrapper** surrounds a single projection (the **child box**).  
The `childBox` itself may be a vertical or horizontal layout containing many other boxes.

- **Syntax (positioning):** `[fragment <NAME> wrap=<ExternalComponent>]`
- **Define wrapped content:** Provide the fragment body in the fragment’s own bracketed section.
- **Box type:** `FragmentWrapperBox`
- **Interface:**
  - `childBox: Box` — the wrapped projection; render it with `RenderComponent`.

Example:

```proto
MyConcept {
    [
        Here is a fragment [fragment XX wrap=SMUI_Card]
    ]
    fragment XX [
        My First Card wrapping a property: ${self.isUnderConstruction}
        Great, isn't it!
    ]
}
```


## Property Projections: Wrapping vs. Replacing

A property projection can be **wrapped** by an external component, or the external component can **replace** the native projection.  
For **replacers**, you are responsible for reading/writing the property value and handling keyboard/tab behavior.


## Wrapping Primitive Properties

- **Syntax:** `${self.name wrap=SMUI_Dialog}`
- **Box types:** `StringWrapperBox`, `NumberWrapperBox`, `BooleanWrapperBox`
- **Interface:**
  - `getPropertyName(): string`
  - `getPropertyValue(): string | number | boolean` — type depends on the wrapper box.
  - `childBox: Box` — the native projection for the property (or for the entire list if wrapping a list).


## Wrapping Part List Properties

- **Syntax:** `${self.parts wrap=SMUI_Accordion}`
- **Box type:** `PartListWrapperBox`
- **Interface:**
  - `getPropertyName(): string`
  - `getPropertyValue(): FreNode[]` — cast as needed.
  - `childBox: Box` — the native projection for the whole list (horizontal/vertical/table).


## Wrapping Reference List Properties

- **Syntax:** `${self.parts wrap=SMUI_Accordion}`
- **Box type:** `RefListWrapperBox`
- **Interface:**
  - `getPropertyName(): string`
  - `getPropertyValue(): FreNodeReference[]`
  - `childBox: Box` — the native projection for the whole list (horizontal/vertical/table).


## Wrapping Part Properties

- **Syntax:** `${self.part wrap=SMUI_Dialog}`
- **Box type:** `PartWrapperBox`
- **Interface:**
  - `getPropertyName(): string`
  - `getPropertyValue(): FreNode` — cast as needed.
  - `childBox: Box` — render with `RenderComponent`.


## Wrapping Reference Properties

- **Syntax:** `${self.reference wrap=SMUI_Dialog}`
- **Box type:** `RefWrapperBox`
- **Interface:**
  - `getPropertyName(): string`
  - `getPropertyValue(): FreNodeReference`
  - `childBox: Box` — render with `RenderComponent`.


## Replacing Primitive Properties

- **Syntax:** `${self.name replace=SMUI_Dialog}`
- **Box types:** `StringReplacerBox`, `NumberReplacerBox`, `BooleanReplacerBox`
- **Interface:**
  - `getPropertyName(): string`
  - `getPropertyValue(): string | number | boolean`
  - `setPropertyValue(newValue: string | number | boolean)`


## Replacing Part List Properties

- **Syntax:** `${self.parts replace=SMUI_Accordion}`
- **Box type:** `PartListReplacerBox`
- **Interface:**
  - `getPropertyName(): string`
  - `getPropertyValue(): FreNode[]`
  - `setPropertyValue(newValue: FreNode[])`
  - `children: Box[]` — one box per list element.


## Replacing Reference List Properties

- **Syntax:** `${self.parts replace=SMUI_Accordion}`
- **Box type:** `RefListReplacerBox`
- **Interface:**
  - `getPropertyName(): string`
  - `getPropertyValue(): FreNodeReference[]`
  - `setPropertyValue(newValue: FreNodeReference[])`
  - `children: Box[]` — one box per list element.


## Replacing Part Properties

- **Syntax:** `${self.part replace=SMUI_Dialog}`
- **Box type:** `PartReplacerBox`
- **Interface:**
  - `getPropertyName(): string`
  - `getPropertyValue(): FreNode`
  - `setPropertyValue(newValue: FreNode)`


## Replacing Reference Properties

- **Syntax:** `${self.reference replace=SMUI_Dialog}`
- **Box type:** `RefReplacerBox`
- **Interface:**
  - `getPropertyName(): string`
  - `getPropertyValue(): FreNodeReference`
  - `setPropertyValue(newValue: FreNodeReference)`


## Wiring

1. **Create your Svelte components.**  
   Identify which **box type** your component will integrate with, and use that box’s interface to get/set model values.

2. **Declare components in the editor definition.**  
   Add names in the `global` section of the default editor (see **[Global Projections](/Documentation/Defining_an_Editor/Global_Projections)**).

   Example:
   ```proto
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

3. **Register components at runtime.**  
   Call `setCustomComponents()` from `@freon4dsl/core-svelte` **before** launching the app.  
   Names **must match** those declared in step 2.

   Example:
   ```ts
   setCustomComponents([
      { component: ShowAnimatedGif,      knownAs: "AnimatedGif" },
      { component: SMUI_Card_Component,  knownAs: "SMUI_Card" },
      { component: SMUI_Accordion,       knownAs: "SMUI_Accordion" },
      { component: SMUI_Dialog,          knownAs: "SMUI_Dialog" },
      { component: DatePicker,           knownAs: "DatePicker" }
   ]);
   ```


## External Component Parameters

You can pass parameters to an external component from the `.edit` file as simple **key-value** pairs (both strings).  
All external-component box types provide:

- `findParam(key: string): string` — returns the parameter value (if present).
