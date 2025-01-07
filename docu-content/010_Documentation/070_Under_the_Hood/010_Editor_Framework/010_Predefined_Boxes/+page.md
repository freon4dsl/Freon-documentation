# Boxes

A Box is an abstract class describing the features that are common for all boxes.
As explained in the [editor framework](/Documentation/Under_the_Hood/Editor_Framework),
each box has a mandatory model node and role. The following predefined boxes are available.

| Primitive Boxes   | Grouping Boxes      | Boxes for External Components |
|-------------------|---------------------|-------------------------------|
| ActionBox         | FragmentBox         | ExternalBooleanBox            |
| AliasBox          | GridBox             | ExternalNumberBox             |
| BooleanControlBox | GridCellBox         | ExternalPartBox               |
| ButtonBox         | HorizontalLayoutBox | ExternalPartListBox           |
| EmptyLineBox      | HorizontalListBox   | ExternalRefBox                |
| IndentBox         | OptionalBox         | ExternalRefListBox            |
| LabelBox          | TableBox            | ExternalSimpleBox             |
| NumberControlBox  | TableCellBox        | ExternalStringBox             |
| LimitedControlBox | TableRowBox         | BooleanWrapperBox             |
| MultiLineTextBox  | VerticalLayoutBox   | FragmentWrapperBox            |
| SelectBox         | VerticalListBox     | NumberWrapperBox              |
| SvgBox            |                     | PartWrapperBox                |
| TextBox           |                     | PartListWrapperBox            |
|                   |                     | RefWrapperBox                 |
|                   |                     | RefListWrapperBox             |
|                   |                     | StringWrapperBox              | 

All box types have a corresponding Component that renders the box in the browser. These components are build
with <a href="https://svelte.dev" target="_blank">Svelte</a>. In the source code the box implementations reside in
the package `core`, whereas the components reside in `core-svelte`.
The Freon core package offers several utilities to create boxes, for instance in custom projections.

The boxes for external components are explained in [External Component Box Types](/Documentation/Under_the_Hood/Editor_Framework/External_Component_Box_Types).

## Primitive Boxes

Primitive boxes do not have other boxes as content. A primitive box is used to project a primitive AST node in the editor.

### ActionBox

An `ActionBox` is used to offer the user the option of executing an action, for instance the addition of an optional node.
It has a placeholder text that is shown, and a dropdown menu that offers the various actions. Actions are coupled to the box based on the role.

```ts
new ActionBox(node, "optional-init", "init");
```

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

### FragmentBox

A `FragmentBox` is used to show a group of properties of a node. Its child boxes can be any type of box.

```ts
new FragmentBox(this._node, "BaseProduct-fragment-FirstCard", children);
```

### GridBox

A `GridBox` is used to show any child boxes in a tabular fashion, whereas a `TableBox` is used to show the elements from a list of similarly types nodes.
All children of a `GridBox` should be of the type `GridCellBox`.

```ts
new GridBox(node, "grid-or", gridCells);
```

### GridCellBox

A `GridCellBox` is used to show a single child box in a tabular fashion. It is always a child of a `GridBox`.
It takes the row and column numbers within the grid as parameters.

```ts
new GridCellBox(fraction, "numerator", rowNr, columnNr, childBox);
```

### HorizontalLayoutBox

A `HorizontalLayoutBox` show any child boxes next to each other horizontally, whereas a HorizontalListBox is used to show the elements from a list of similarly types nodes.

An example of using a `HorizontalLayoutBox` is the following that represents the
projection of a EuroLiteral with an icon in front of the actual value.

```ts
new HorizontalLayoutBox(node,
        "EuroLiteral-hlist-line-0",
        [
           new SvgBox(node, "euro-icon", euroIcon, {
              viewPortWidth: 20,
              viewPortHeight: 20,
              viewBoxWidth: 1024,
              viewBoxHeight: 1024,
              selectable: false
           }),
           BoxUtil.numberBox(node, "euros", NumberDisplay.SELECT),
           BoxUtil.labelBox(node, ",", "top-1-line-0-item-2"),
           BoxUtil.numberBox(node, "cents", NumberDisplay.SELECT),
        ]);
```

### HorizontalListBox

A `HorizontalListBox` shows all members of one AST list property next to each other horizontally.

```ts
new HorizontalListBox(
        myMethodNode,
		role,
        "parameters", /* property name */
        myMethodNode.parameters /* children */ )
```

### OptionalBox

An `OptionalBox` shows an optional projection. The optional content is always present in the
`childBox`. Next to the content there is an `ActionBox`, which is shown when the content is not
present in the AST model.
The parameters `mustShow` and `condition` determine which of the pair [content, placeholder] is shown. If the `condition`
results in true, then the content box is shown. If `mustShow` is true, then the content box is also shown, even though
there may not be actual content within the AST model.

```ts
new OptionalBox(node, role, condition, contentBox, mustShow, actionBox);
```

### TableBox

A `TableBox` shows a list from the model in a table, either row-based or column-based. A `TableBox` is an abstract class, which has two
concrete subclasses: `TableBoxColumnOriented`, and `TableBoxRowOriented`. All children must be of type `TabelRowBox`. 

```ts
if (orientation === "column") {
   return new TableBoxColumnOriented(node, listName, listElementType, roleName, hasHeaders, children);
} else {
   return new TableBoxRowOriented(node, listName, listElementType, roleName, hasHeaders, children);
}
```

### TableCellBox

A `TableCellBox` shows a property of one element of an AST list. The `rowNr` and `columnNr` give the position of the cell within the table.

```ts
new TableCellBox(
        node,
        propertyName,
        propertyIndex,
        propertyTypeName,
        role,
        rowNr,
        columnNr,
        contentBox
);
```

### TableRowBox

A `TableRowBox` shows one element of an AST list. This element may be spread out over multiple table cell boxes.
The index gives the number of the row or column that the element is displayed in.

```ts
new TableRowBox(node, role, myCells, index);
```

### VerticalLayoutBox

A `VerticalLayoutBox` show a list of child boxes next to each other vertically.
Its usage is similar to that of the `HorizontalLayoutBox`.

### VerticalListBox

A `VerticalListBox` shows all members of one AST list property one after another vertically.
Its usage is similar to that of the `VerticalLayoutBox`.
