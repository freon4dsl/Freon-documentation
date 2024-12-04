<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# The Projectional Editor Framework

The Projectional Editor Framework is written in <a href="https://www.typescriptlang.org/">TypeScript</a> 
and <a href="https://svelte.dev/" target="_blank">Svelte</a>. This page provides an overview of the Framework.
If you want to know how to use it, see [Editor Customization](/Documentation/Customizations/Editor_Customization).

## The AST, the Box Tree, and the DOM

The internal representation of any model written in a DSL is a tree of instances of TypeScript classes, 
the Abstract Syntax Tree (AST). All AST classes implement the core interface [`FreNode`](/Documentation/Under_the_Hood/Core_Interfaces).
Because the visual representation in the editor can differ from the AST, every visual element is represented 
by another TypeScript class called **Box**. 
All boxes that are used to show a certain projection set or editor view, form another tree, called the **Box Tree**. In fact,
any box tree is the internal representation of the concrete syntax, and can therefore also be called the **Concrete Syntax Tree** (CST).
Note, that there can be multiple box trees for one AST, because there can be multiple projection 
sets (or editors, or views, whatever name you want to give them).
Thus, at any moment there are two internal TypeScript representations of the model, one that is the Abstract Syntax Tree (AST), and one that is the
Concrete Syntax Tree (or Box Tree).

Because Freon produces a web based editor, 
there is yet another representation of the content, the Document Object Model (DOM). According 
to <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction">MDN Web Docs</a> the DOM 
is the data representation of the objects that comprise the structure and content of a document on the web. In other words,
the DOM, which is also a tree, represents the HTML elements in memory. In Freon, HTML elements are implemented 
using <a href="https://svelte.dev/" target="_blank">Svelte</a> components. 

At any moment that the Freon editor is being used, Freon keeps these three different representations of the user's model in sync.
This section of the documentation explains the **Box Tree**.

## Projection Layout Based on Boxes

The layout of every visible element in the editor is based on _boxes_. A box is a rectangular area
in the editor. Every AST node is projected in a box. A box can contain any number of child boxes.

The framework provides many types of predefined boxes. See
[Predefined Boxes](/Documentation/Under_the_Hood/Editor_Framework/Predefined_Boxes) for an overview.
These boxes can be used to build a projection.

Let's look at a small example to start with. Figure 1 shows the projection of the concept `StringLiteral`. This is mapped to a horizontal list
of a quote ("), an editable text with the value of the StringLiteral, and a closing quote ("). Note
that the quotes are not part of the AST. They are part of the concrete syntax used in this projection
of the AST.

<Figure 
imageName='mapping-example-stringliteral.svg'
caption='Mapping a StringLiteral'
figureNumber={1}
/>

In TypeScript, using the [predefined boxes](/Documentation/Under_the_Hood/Editor_Framework/Predefined_Boxes), this projection might look something like:

```ts
new HorizontalListBox([new LabelBox('"'), new TextBox(stringLiteral.value), new LabelBox('"')]);
```

## Coupling Behavior to Boxes

User actions on boxes need to be translated into interactions with the projected AST. To know which part of the
projection represents the AST node, we give each `Box` in the projection a _role_, which is unique
within its parent box. This way we can identify every box by its model element plus its role.

In the following figure the roles are shown above the boxes in green.

<Figure
caption='Mapping a StringLiteral with Roles'
imageName='mapping-example-stringliteral-with-roles.svg'
figureNumber={2}
/>

We can now show the full typescript code for this projection. Given that `literal` is the `StringLiteral` object:

```ts
//
new HorizontalListBox(literal, "full-string", [      // <1>
    new LabelBox(literal, "start-quote", '"'),          // <2>
    new TextBox(                                        // <3>
        literal,
        "value",
        () => literal.value,
        (v: string) => (literal.value # v)
    ),
    new LabelBox(literal, "end-quote", '"')             // <4>
])
```

1. The overall horizontal list box to group everything. Its parameters are the model element that is shown,
   the role of the box, and a list of child boxes.
2. The first label box for the start quote. Its parameters are, like the horizontal box, the model element,
   the role of the box, and its content, which is the quote character.
3. The text box for the value of the string literal. Its parameters are, like the horizontal box, the model element,
   the role of the box, the getter function for the content, and the setter function, used when the content changes.
4. The second label box for the end quote. Except for its role, this is identical to the first label box.

## Behavior is Defined by Actions

The behavior coupled to a _Box_ is defined by an `Action`. To identify which action should be executed,
each behavior is specified by:

- a _trigger_, describing the key(s) that will trigger the behavior, and
- one or more _roles_, specifying that the behavior is only active in boxes with that specific role,
- an _action_, which is a typescript/javascript function that will be executed when the
  behavior is being triggered.
- a _caretPosition_, which is the box where the cursor should be placed after the execution of
  the action (optional).

There are four different types of action, each of which extend the `FreBehavior` interface.

1. `FreCustomBehavior`, used for most types of behavior, but specifically the creation of non expression concepts.
2. `FreExpressionCreator`, used to create an expression.
3. `FreBinaryExpressionCreator`, used to create a binary expression.
4. `KeyboardShortcutBehavior`, behaviour initiated through a keystroke.

```ts
export interface FreBehavior {
	/**
	 * The trigger to activate this behavior
	 */
	trigger: FreTriggerType;
	/**
	 * The box roles in which this trigger is active
	 */
	activeInBoxRoles: string[];
	/**
	 * Optional callback function that returns whether the trigger is applicable for the specific box.
	 */
	isApplicable?: (box: Box) => boolean;
	// TODO add comments here and in the source code
	boxRoleToSelect?: string;
	caretPosition?: FreCaret;
	referenceShortcut?: ReferenceShortcut;
}
/**
 * Behavior with custom action, intended to be used to create non expression elements.
 */
export interface FreCustomBehavior extends FreBehavior {
	action: (box: Box, trigger: string, editor: FreEditor, propertyName?: string) => FreElement | null;
	undo?: (box: Box, ed: FreEditor) => void;
}
/**
 * Special behavior for creating an expression.
 */
export interface FreExpressionCreator extends FreBehavior {
	expressionBuilder: (box: Box, trigger: string, editor: FreEditor, propertyName?: string) => FreExpression;
}
/**
 * Special behavior for creating a binary expression.
 */
export interface FreBinaryExpressionCreator extends FreBehavior {
	expressionBuilder: (box: Box, trigger: string, editor: FreEditor, propertyName?: string) => FreBinaryExpression;
}
/**
 * Special behavior initialized by keyboard strokes.
 */
export interface KeyboardShortcutBehavior extends FreBehavior {
	action: (box: Box, trigger: FreKey, editor: FreEditor, propertyName?: string) => Promise<FreElement>;
	trigger: FreKey;
}
```

To attach the behavior to one or more boxes, these box roles are added to the `activeInBoxRoles`
property of an action.
