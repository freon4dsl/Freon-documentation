# Boxes

A Box is an abstract class describing the features that are common for all boxes.
As explained in the [editor framework](/Documentation/Under_the_Hood/Editor_Framework),
each box has a mandatory model element and role. The following predefined boxes are available.

| Primitive Boxes | Grouping Boxes      |
| --------------- | ------------------- |
| AliasBox        | GridBox             |
| IndentBox       | TableBox            |
| LabelBox        | HorizontalListBox   |
| SelectBox       | VerticalListBox     |
| SvgBox          | HorizontalLayoutBox |
| TextBox         | VerticalLayoutBox   |
|                 | OptionalBox         |

All box types have a corresponding Component that renders the box in the browser. These components are build
with <a href="https://svelte.dev" target="_blank">Svelte</a>. In the source code the box implementations reside in
the package `core`, whereas the components reside in `core-svelte`.

[//]: # (todo add the new box types here)

## Primitive Boxes

Primitive Boxes do not have other boxes as content. A primitive box is used to project a simple AST node in the editor.

### AliasBox

An `AliasBox` is a box where the user can type text (printable characters). Usually this text is a trigger
for some action. All actions that have this _trigger_ and are defined for the _role_ of this
aliasbox, are possible. An aliasbox has a placeholder string, that can either be a visible indication of
what could be entered, or it could be invisible, when the placeholder is an empty string or consists
of whitespace only.

An example of the use of an aliasbox is before and after an expression. The aliasboxes there enable the user to
type in an addition to the expression, changing, for instance, `4 + 5` into `3 * 4 + 5`.

// TODO document AliasBox

```ts
new AliasBox(element, 'role', '[' + property + ']', {
	propertyName: property
})<1>;
```

### IndentBox

An `IndentBox` shows white space to indent other boxes.

```ts
new IndentBox(element, 'role', 5, childBox);
```

### LabelBox

A `LabelBox` shows a non-editable text.
The text itself can either be a fixed string (1), or it can be defined as a function (2).
Being a function allows the label text to change dynamically,
depending on the result value of the function.

```ts
new LabelBox(element, 'role', 'fixed text')<1>;
new LabelBox(element, 'role', () => element.value)<2>;
```

### SelectBox

A `SelectBox` shows a choice, e.g. for a reference property. When inactive, it shows its placeholder,
when active, it shows a dropdown list of possible elements that would fit this position.

```ts
new SelectBox(element, role, placeHolder, getOptions, getSelectedOption, selectOption, initializer);
```

// TODO add explanation of example code

### SvgBox

An `SvgBox` shows a single SVG image.

// TODO add more info

### TextBox

A `TextBox` shows an editable text.
In addition to the element and the role a text box needs two function parameters.
The first function to get the value of the text,
the second function to set the value of the text.

```ts
new TextBox(
	element,
	'role',
	() => element.stringValue,
	(newValue: string) => (element.stringValue = newValue)
);
```

There are two options that control what happens when a textbox becomes empty, i.e. contains
no longer any characters.

1. deleteWhenEmpty, if true, the element will be deleted when the text becomes
   empty because of removing the last character in the text. Usable for e.g. numeric values.
2. deleteWhenEmptyAndErase, if true, delete element when Erase key is pressed while the element is empty.

## Grouping Boxes

Grouping or layout Boxes have other boxes as content. A grouping box is used to project a composed AST node, like
a list, or a concept that has part properties, in the editor.

### OptionalBox

An `OptionalBox` shows an optional projection.

// TODO document OptionalBox

There are three types of boxes for properties that are lists. It is assumed that all child boxes have the same type.

### TableBox

A `TableBox` shows a list from the model in a table, either row-based or column-based.

### HorizontalListBox

A `HorizontalListBox` shows all elements from a list next to each other horizontally.

### VerticalListBox

A `VerticalListBox` shows all elements from a list one after another vertically.

There are also boxes that can group any set of child boxes, no matter what there types are.

### GridBox

A `GridBox` is used to show any child boxes in a tabular fashion.
// TODO document GridBox

### HorizontalLayoutBox

A `HorizontalLayoutBox` show a list of child boxes next to each other horizontally.

An example of using a `HorizontalLayoutBox` is the following that represents the
projection of a StringLiteral.

```ts
// TODO example
```

### VerticalLayoutBox

A `VerticalLayoutBox` show a list of child boxes next to each other vertically.

Its usage is similar to that of the `VerticalLayoutBox`.
