<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# The Projectional Editor Framework

The Projectional Editor Framework is written in TypeScript and <a href="https://svelte.dev/" target="_blank">
Svelte</a>. This page provides an overview of the Framework.
If you want to know how to use it, see [Editor API](/030_Developing_a_Language/030_API_Level/010_Editor_API).

## Projection Layout Based on Boxes

The layout of every visible element in the editor is based on _boxes_. A box is a rectangular area
in the editor. A box can contain any number of child boxes. Every AST node is projected in a box.

The framework provides many types of predefined boxes. See
[Boxes](/060_Under_the_Hood/010_The_Editor_Framework/010_Predefined_Boxes) for an overview.
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

In TypeScript, using the predefined [Boxes](/060_Under_the_Hood/010_The_Editor_Framework/010_Predefined_Boxes), this projection might look something like:

```ts
new HorizontalListBox([
  new LabelBox('"'),
  new TextBox(stringLiteral.value),
  new LabelBox('"'),
]);
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

## <a name="defining-actions"></a> Behavior is Defined by Actions

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
  action: (
    box: Box,
    trigger: string,
    editor: FreEditor,
    propertyName?: string
  ) => FreElement | null;
  undo?: (box: Box, ed: FreEditor) => void;
}
/**
 * Special behavior for creating an expression.
 */
export interface FreExpressionCreator extends FreBehavior {
  expressionBuilder: (
    box: Box,
    trigger: string,
    editor: FreEditor,
    propertyName?: string
  ) => FreExpression;
}
/**
 * Special behavior for creating a binary expression.
 */
export interface FreBinaryExpressionCreator extends FreBehavior {
  expressionBuilder: (
    box: Box,
    trigger: string,
    editor: FreEditor,
    propertyName?: string
  ) => FreBinaryExpression;
}
/**
 * Special behavior initialized by keyboard strokes.
 */
export interface KeyboardShortcutBehavior extends FreBehavior {
  action: (
    box: Box,
    trigger: FreKey,
    editor: FreEditor,
    propertyName?: string
  ) => Promise<FreElement>;
  trigger: FreKey;
}
```

To attach the behavior to one or more boxes, these box roles are added to the `activeInBoxRoles`
property of an action.
//TODO: describe the optional properties

## Custom Actions

// TODO document custom actions

## Expressions and Binary Expressions

// TODO document expression actions

The challenge posed by editing expressions in a projectional editor are explained
in [Expressions](/010_Intro/010_Projectional_Editing#expressions).

## Keyboard Shortcuts

// TODO document keyboard actions

A keyboard shortcut specifies an action that is triggered by special keys, like e.g. Ctrl-A.
