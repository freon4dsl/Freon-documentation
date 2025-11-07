---
title: "The Projectional Editor Framework"
description: "Overview of the internal structure of Freon’s projectional editor framework, including the AST, Box Tree, and DOM synchronization."
tags: Editor Framework, Box Tree, AST, DOM, Projection, Freon
---

<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# The Projectional Editor Framework

The Projectional Editor Framework is written in <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a> 
and <a href="https://svelte.dev/" target="_blank">Svelte</a>. This page provides an overview of the framework.  
If you want to know how to customize it, see [Editor Customization](/Documentation/Customizations/Editor_Customization).

## The AST, the Box Tree, and the DOM

The internal representation of any model written in a DSL is a tree of instances of TypeScript classes —  
the **Abstract Syntax Tree (AST)**. All AST classes implement the core interface [`FreNode`](/Documentation/Under_the_Hood/Core_Interfaces).

Because the visual representation in the editor can differ from the AST, every visual element is represented by another TypeScript class called a **Box**.  
All boxes used to render a certain projection set or editor view form another tree called the **Box Tree**.  
In fact, any box tree is the internal representation of the concrete syntax, and can therefore also be called the **Concrete Syntax Tree (CST)**.

There can be multiple box trees for one AST, because there can be multiple projection sets (or editors, or views — whichever term you prefer).  
Thus, at any given moment there are two internal TypeScript representations of the model:

- The **Abstract Syntax Tree (AST)**
- The **Concrete Syntax Tree (CST)**, or **Box Tree**

Because Freon produces a web-based editor, there is yet another representation of the content: the **Document Object Model (DOM)**.  
According to <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction" target="_blank">MDN Web Docs</a>, the DOM is the data representation of the objects that comprise the structure and content of a document on the web.

In Freon, DOM elements are implemented as <a href="https://svelte.dev/" target="_blank">Svelte</a> components.  
Whenever the Freon editor is in use, it keeps these three different representations of the user's model in sync.

This section of the documentation explains the **Box Tree**.

## Projection Layout Based on Boxes

The layout of every visible element in the editor is based on *boxes*. A box is a rectangular area
in the editor. Every AST node is projected in a box, and a box can contain any number of child boxes.

The framework provides many predefined box types. See  
[Predefined Boxes](/Documentation/Under_the_Hood/Editor_Framework/Predefined_Boxes) for an overview.  
These boxes can be combined to build a projection.

Let’s look at a simple example. Figure 1 shows the projection of the concept `StringLiteral`.  
This is mapped to a horizontal list consisting of:

- an opening quote (`"`),
- an editable text box showing the value of the `StringLiteral`,
- and a closing quote (`"`).

Note that the quotes are not part of the AST; they belong to the concrete syntax used in this projection.

<Figure
imageName='documentation/mapping-example-stringliteral.svg'
caption='Mapping a StringLiteral'
figureNumber={1}
/>

In TypeScript, using the [predefined boxes](/Documentation/Under_the_Hood/Editor_Framework/Predefined_Boxes), this projection might look like this:

```ts
new HorizontalListBox([
    new LabelBox('"'),
    new TextBox(stringLiteral.value),
    new LabelBox('"')
]);
```

## Coupling Behavior to Boxes

User actions on boxes need to be translated into interactions with the projected AST.  
To know which part of the projection represents which AST node, we give each `Box` in the projection a **role**, which is unique within its parent box.  
This allows every box to be identified by its model element plus its role.

In the following figure, the roles are shown above the boxes in green.

<Figure
caption='Mapping a StringLiteral with Roles'
imageName='documentation/mapping-example-stringliteral-with-roles.svg'
figureNumber={2}
/>

We can now show the full TypeScript code for this projection.  
Assume that `literal` is the `StringLiteral` object:

```ts

new HorizontalListBox(literal, "full-string", [      // <1>
    new LabelBox(literal, "start-quote", '"'),       // <2>
    new TextBox(                                     // <3>
        literal,
        "value",
        () => literal.value,
        (v: string) => (literal.value = v)
    ),
    new LabelBox(literal, "end-quote", '"')          // <4>
]);
```

1. The overall horizontal list box that groups everything.  
   Parameters: the model element shown, the role of the box, and a list of child boxes.
2. The first label box for the opening quote.  
   Parameters: the model element, the role of the box, and its content (the quote character).
3. The text box for the value of the string literal.  
   Parameters: the model element, the role of the box, a getter function for the content, and a setter function for when the content changes.
4. The second label box for the closing quote.  
   Except for its role, it is identical to the first label box.

## Behavior Is Defined by Actions

The behavior coupled to a *Box* is defined by an **Action**.  
To identify which action should be executed, each behavior specifies:

- a **trigger**, describing the key(s) that activate the behavior,
- one or more **roles**, specifying that the behavior is only active in boxes with those roles,
- an **action**, which is a TypeScript/JavaScript function executed when the behavior is triggered,
- an optional **caretPosition**, specifying where the cursor should be placed after execution.

There are four main types of action, all extending the `FreBehavior` interface:

1. `FreCustomBehavior` — used for most types of behavior, especially creation of non-expression concepts.
2. `FreExpressionCreator` — used to create an expression.
3. `FreBinaryExpressionCreator` — used to create a binary expression.
4. `KeyboardShortcutBehavior` — used for behaviors initiated through a keystroke.

```ts
export interface FreBehavior {
    /** The trigger to activate this behavior */
    trigger: FreTriggerType;
    /** The box roles in which this trigger is active */
    activeInBoxRoles: string[];
    /** Optional callback function to determine whether the trigger applies for the specific box */
    isApplicable?: (box: Box) => boolean;
    boxRoleToSelect?: string;
    caretPosition?: FreCaret;
    referenceShortcut?: ReferenceShortcut;
}

/** Behavior with a custom action, intended for non-expression elements */
export interface FreCustomBehavior extends FreBehavior {
	action: (box: Box, trigger: string, editor: FreEditor, propertyName?: string) => FreNode | null;
	undo?: (box: Box, ed: FreEditor) => void;
}

/** Special behavior for creating an expression */
export interface FreExpressionCreator extends FreBehavior {
	expressionBuilder: (box: Box, trigger: string, editor: FreEditor, propertyName?: string) => FreExpression;
}

/** Special behavior for creating a binary expression */
export interface FreBinaryExpressionCreator extends FreBehavior {
	expressionBuilder: (box: Box, trigger: string, editor: FreEditor, propertyName?: string) => FreBinaryExpression;
}

/** Special behavior initiated by keyboard strokes */
export interface KeyboardShortcutBehavior extends FreBehavior {
	action: (box: Box, trigger: FreKey, editor: FreEditor, propertyName?: string) => Promise<FreNode>;
	trigger: FreKey;
}
```

To attach a behavior to one or more boxes, add those box roles to the `activeInBoxRoles` property of the action.
