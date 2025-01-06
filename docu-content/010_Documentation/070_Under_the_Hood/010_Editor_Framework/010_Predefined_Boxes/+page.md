# Boxes

A Box is an abstract class describing the features that are common for all boxes.
As explained in the [editor framework](/Documentation/Under_the_Hood/Editor_Framework),
each box has a mandatory model node and role. The following predefined boxes are available.

| Primitive Boxes   | Grouping Boxes      | Boxes for External Components |
|-------------------|---------------------|-------------------------------|
| AliasBox          | ActionBox           | ExternalBooleanBox            |
| BooleanControlBox | FragmentBox         | ExternalNumberBox             |
| ButtonBox         | GridBox             | ExternalPartBox               |
| EmptyLineBox      | GridCellBox         | ExternalPartListBox           |
| IndentBox         | HorizontalLayoutBox | ExternalRefBox                |
| LabelBox          | HorizontalListBox   | ExternalRefListBox            |
| NumberControlBox  | LayoutBox           | ExternalSimpleBox             |
| LimitedControlBox | OptionalBox         | ExternalStringBox             |
| MultiLineTextBox  | TableBox            | BooleanWrapperBox             |
| SelectBox         | TableRowBox         | FragmentWrapperBox            |
| SvgBox            | VerticalLayoutBox   | NumberWrapperBox              |
| TextBox           | VerticalListBox     | PartWrapperBox                |
|                   |                     | PartListWrapperBox            |
|                   |                     | RefWrapperBox                 |
|                   |                     | RefListWrapperBox             |
|                   |                     | StringWrapperBox              | 

All box types have a corresponding Component that renders the box in the browser. These components are build
with <a href="https://svelte.dev" target="_blank">Svelte</a>. In the source code the box implementations reside in
the package `core`, whereas the components reside in `core-svelte`.

The boxes for external components are explained in [External Component Box Types](/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types).

## Primitive Boxes

Primitive boxes do not have other boxes as content. A primitive box is used to project a primitive AST node in the editor.

### AliasBox

An `AliasBox` is a box where the user can type text (printable characters). Usually this text is a trigger
for some action. All actions that have this _trigger_ and are defined for the _role_ of this
alias box, are possible. An alias box has a placeholder string, that can either be a visible indication of
what could be entered, or it could be invisible, when the placeholder is an empty string or consists
of whitespace only.

An example of the use of an alias box is before and after an expression. The alias boxes there enable the user to
type in an addition to the expression, changing, for instance, `4 + 5` into `3 * 4 + 5`.

```ts
new AliasBox(node, 'role', '[' + property + ']', {
	propertyName: property
});
```

### BooleanControlBox

A `BooleanControlBox` is a box that shows a property of type boolean using an HTML input control, such as a radio button. 
The `getBoolean` and `setBoolean` in the below example are functions that set and get the value of the boolean property, 
respectively. They adhere to the following interface.

```ts
getBoolean: () => boolean;
setBoolean: (newValue: boolean) => void;
```

```ts
new BooleanControlBox(node, 'role', getBoolean, setBoolean);
```

### ButtonBox

A `ButtonBox` is a box that shows a button with the given text as label.

````ts
new ButtonBox(node, "Text-on-button", 'role');
````

### EmptyLineBox

An `EmptyLineBox` is a box that shows an HTML linebreak.

```ts
new EmptyLineBox(node, 'role');
```

### IndentBox

An `IndentBox` shows white space to indent other boxes.

```ts
new IndentBox(node, 'role', 5, childBox);
```

### LabelBox

A `LabelBox` shows a non-editable text.
The text itself can either be a fixed string (1), or it can be defined as a function (2).
Being a function allows the label text to change dynamically,
depending on the result value of the function.

```ts
new LabelBox(node, 'role', 'fixed text');
new LabelBox(node, 'role', () => node.value);
```

### NumberControlBox

A `NumberControlBox` is a box that shows a property of type boolean using an HTML input control, such as a radio button.
The `getNumber` and `setNumber` in the below example are functions that set and get the value of the number property, 
respectively. They adhere to the following interface.

```ts
getNumber: () => number;
setNumber: (newValue: number) => void;
```

```ts
new NumberControlBox(node, 'role', getNumber, setNumber);
```

### LimitedControlBox

A `LimitedControlBox` is a box that shows a property of type boolean using an HTML input control, such as a checkbox.
The `getValues` and `setValues` in the below example are functions that set and get the value of the limited property,
respectively. They adhere to the following interface, and are used for both single valued and list values limited properties.
In case of a single value, only the 0-th element is used. The `possibleValues` parameter is a list of all allowed values of the property.

```ts
getValues: () => string[];
setValues: (newValue: string[]) => void;
```

```ts
new LimitedControlBox(node, 'role', getValues, setValues, possibleValues);
```

### MultiLineTextBox

A `MultiLineTextBox` shows an editable text that can span over multiple lines.
In addition to the node and the role a text box needs two function parameters.
The first function to get the value of the text,
the second function to set the value of the text.

```ts
new MultiLineTextBox(
	node,
	'role',
	() => node.stringValue,
	(newValue: string) => (node.stringValue = newValue)
);
```

Note that this box cannot yet be instantiated by the projections in the .edit files.

### SelectBox

A `SelectBox` shows a choice, e.g. for a reference property. When inactive, it shows its placeholder,
when active, it shows a dropdown list of possible nodes that would fit this position. The functions
`getOptions`, `getSelectedOption`, and `selectOption`, respectively given all possible options, the currently selected option,
and an implementation fo the behavior when a certain option is newly selected.

```ts
new SelectBox(node, 'role', placeHolder, getOptions, getSelectedOption, selectOption);
```

### SvgBox

An `SvgBox` shows a single SVG image.

```ts
new SvgBox(node, "euro-icon", euroIcon, {
   viewPortWidth: 20,
   viewPortHeight: 20,
   viewBoxWidth: 1024,
   viewBoxHeight: 1024,
   selectable: false
})
```

### TextBox

A `TextBox` shows an editable text.
In addition to the node and the role a text box needs two function parameters.
The first function to get the value of the text,
the second function to set the value of the text.

```ts
new TextBox(
	node,
	'role',
	() => node.stringValue,
	(newValue: string) => (node.stringValue = newValue)
);
```

There are two options that control what happens when a textbox becomes empty, i.e. contains
no longer any characters.

1. deleteWhenEmpty, if true, the node will be deleted when the text becomes
   empty because of removing the last character in the text. Usable for e.g. numeric values.
2. deleteWhenEmptyAndErase, if true, delete node when Erase key is pressed while the node is empty.

## Grouping Boxes

Grouping or layout Boxes have other boxes as content. A grouping box is used to project a composed AST node, like
a list, or a concept that has part properties, in the editor.

### ActionBox

[//]: # (todo)

### FragmentBox

### GridBox

A `GridBox` is used to show any child boxes in a tabular fashion.
// TODO document GridBox

### GridCellBox

### HorizontalLayoutBox

A `HorizontalLayoutBox` show a list of child boxes next to each other horizontally.

An example of using a `HorizontalLayoutBox` is the following that represents the
projection of a StringLiteral.

```ts
// TODO example
```

### HorizontalListBox

A `HorizontalListBox` shows all nodes from a list next to each other horizontally.

### LayoutBox

### OptionalBox

An `OptionalBox` shows an optional projection.

// TODO document OptionalBox

There are three types of boxes for properties that are lists. It is assumed that all child boxes have the same type.

### TableBox

A `TableBox` shows a list from the model in a table, either row-based or column-based.

### TableRowBox

A `TableBox` shows a list from the model in a table, either row-based or column-based.

### VerticalLayoutBox

A `VerticalLayoutBox` show a list of child boxes next to each other vertically.

Its usage is similar to that of the `VerticalLayoutBox`.

### VerticalListBox

A `VerticalListBox` shows all nodes from a list one after another vertically.

There are also boxes that can group any set of child boxes, no matter what there types are.

