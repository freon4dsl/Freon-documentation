<script>
    import Note from "$lib/notes/Note.svelte";
     let self;
</script>

# Projections

In the `.edit` file a _projection_ is defined between angular brackets.
This is done in a style similar from markdown, what you see looks close to what you get.
Everything within the square brackets (`[]`), except
the parts surrounded by `${}`, is taken literally.

```ts
// DocuProject/src/defs/editor-indentation.edit#L6-L14

Text {
[
This is
        literal text
      that is projected in the
                editor
  for every concept of type Text.
]
}
```

## Including Properties

When you define a projection for a concept or interface, you will want to include its properties. For
this you need to use the special notation `${}`. This tells Freon to include a property, according to the projection
that is defined for the type of the property.

In the following example `self.body` is a property of type `DocuExpression`.
It will be projected according to the projection for `DocuExpression`, whereas `self.declaredType`
is a property of type `DocuType`, which is abstract. This property
will be projected according to the definition for the (non-abstract) subtype of `DocuType` that is
currently found.

```ts
// DocuProject/src/defs/editor-main-default.edit#L40-L46

        risk assessment: ${self.statisticalRisk}
        maximum payout: ${self.maximumPayOut}
        is approved: ${self.isApproved [JA | NEE]}
]
}

InsuranceProduct {[
```

<Note>
<svelte:fragment slot="header">Only direct properties are allowed</svelte:fragment>
<svelte:fragment slot="content">
Only the properties that are directly owned by the concept or interface are allowed. For instance,
<code>self.declaredType.name</code> is not a valid property projection. 
</svelte:fragment>
</Note>

<Note>
<svelte:fragment slot="header"><code>self</code> is optional</svelte:fragment>
<svelte:fragment slot="content">
Because you may only use direct properties, the prefix <code>self</code> may be omitted. 
</svelte:fragment>
</Note>

### Including a Property Projection from Another Editor

Normally, the property that you include will be displayed according to the projection of its type. This projection
will be found by Freon using the [ordering](/030_Developing_a_Language/020_Definition_Level/010_Editor_Definition/010_Edit_Files#ordering)
as defined in the configuration.

When you specifically want to use another projection, you can use a **named property projection**. In that case,
Freon will use the projection defined for the concept in the editor with the specified name.

In this example, the projection for `self.parts` will first be searched in the editor named `comments`.
If it cannot be found, the normal ordering of projections will proceed.

```ts
// DocuProject/src/defs/editor-specials.edit#L3-L9

BaseProduct {[
    /* In this projection 'self.parts' is always shown according to the projection */
    /* defined for concept InsurancePart in the editor 'comments'.                 */
    Base Product for ${self.theme radio} ${self.name wrap=SMUI_Dialog buttonLabel = "Change Product Name"}
        [fragment First wrap=SMUI_Card] [fragment Second wrap=SMUI_Card]
        ${self.parts:comments replace=SMUI_Accordion multi="multiple"}
]
```

## Lists

If a property is a list, you can indicate whether it should be projected horizontally or vertically.
Both keywords are optional. If neither of `vertical` or `horizontal` is present, the property will be displayed as
a vertical list.

You can also choose to project a list property as a [table](/030_Developing_a_Language/020_Definition_Level/010_Editor_Definition/020_Projections#tables).
However, its default projection will always be a list. This is the one that will be generated when a
projection is not present in the `.edit` files.

In a list, you can add one of the following.

- A _separator_ string, which will be shown in between all elements.
- A _terminator_ string, which will be shown after each element.
- An _initiator_ string, which will be shown before every element of the list.

Each is optional. The default is a single space used as separator.

In the following example the list `parts` is displayed vertically with the string `';'` as terminator.
Whereas, the list `themes` is displayed horizontally with the string `', '` as separator. Finally, the
list `helpers` is shown as a vertical list without any separator, terminator or initiator. Actually, we
could omit the keyword `vertical`, because this is the default projection for lists.

```ts
// DocuProject/src/defs/editor-main-default.edit#L27-L38

        is approved level2: ${self.isApprovedLevel2 inner-switch}
        is approved level3: ${self.isApprovedLevel3 checkbox}
        yields profit: ${self.yieldsProfit text [Plenty | Little]}
        expected nr of use: ${self.nrOfUse}
        range: ${self.range slider}


        ${parts}
]}

InsurancePart{
[
```

<Note>
<svelte:fragment slot="header">Newlines in terminator or separator are ignored</svelte:fragment>
<svelte:fragment slot="content">
A terminator or separator should not contain a newline character. Horizontal or vertical layout is
purely determined by the keywords <code>horizontal</code> and <code>vertical</code>.
</svelte:fragment>
</Note>

## Tables

If a property is a list, you can choose to project it as a table. Tables can be either row or column based.
Row based means that each element of the list is displayed in a row. Column based, obviously, means that
each element is displayed in a single column. The default is row based.

Defining a table is a two-step process.

1. Add the keyword `table` to the list property that
   you want to display as a table. Optionally, add one of the keywords `rows` or `columns`.
2. Add a table-projection to the type of the property. The table-projection defines
   the headers of the table and which parts of the list elements are displayed in which row or column.

<Note>
<svelte:fragment slot="content">
Note that you only need to include one
table projection for both column and row based tables. Freon will swap the entries when needed.
</svelte:fragment>
</Note>

For example, to project the `parts` property of concept `BaseProduct` as a row based table, you can use the following code.

```ts
// DocuProject/src/defs/editor-tables.edit#L13-L16

BaseProduct {[
    Base Products ${name} for ${theme}
        ${parts table rows}
]}
```

Given the above example, there should also be a projection tagged `table` for the concept `InsurancePart`.
Below four columns/rows are defined, each with its own header.

```ts
// DocuProject/src/defs/editor-tables.edit#L6-L11

InsurancePart{
table [
    Name    | risk               | pay out          | is approved   | action
    ${name} | ${statisticalRisk} | ${maximumPayOut} | ${isApproved} | [button boxRole="MyTableButton-role"]
]
}
```

<Note>
<svelte:fragment slot="header">Properties within a table are displayed according to their own projection</svelte:fragment>
<svelte:fragment slot="content">
The manner in which each of the properties of a single function are displayed, will be determined
by their own projections. In this example, `self.parameters` is a list, and will be displayed as another table.
The inner table will be row-based, as this is the default.
</svelte:fragment>
</Note>

<Note>
<svelte:fragment slot="header">Whitespace in headers is ignored</svelte:fragment>
<svelte:fragment slot="content">
The whitespace between the headers is not needed. However, for clarity, it is probably
good style to align the column/row-separators.
</svelte:fragment>
</Note>

## Optional Projections

When a property is marked optional in the language structure definition (the `.ast` files), the projection
of this property should also be optional. This is indicated by `[?`.

In the next example both the property `riskAdjustment` and `helpers` are only shown if they are present.
If they are not present, respectively the text `Risk adjusted by =` or `Helper functions:` is omitted as well.

```ts
// DocuProject/src/defs/editor-main-default.edit#L27-L38

        is approved level2: ${self.isApprovedLevel2 inner-switch}
        is approved level3: ${self.isApprovedLevel3 checkbox}
        yields profit: ${self.yieldsProfit text [Plenty | Little]}
        expected nr of use: ${self.nrOfUse}
        range: ${self.range slider}


        ${parts}
]}

InsurancePart{
[
```

Note that optional projections for non-optional properties are not allowed.

## Boolean Keyword Projections

The next example shows the special manner in which properties of type **boolean** can be
projected. The concept `Entity` has a simple property of type boolean called `isCompany`. Normally,
its value would be displayed according to the boolean keyword projection in the default editor.

```ts
// DocuProject/src/defs/language-extras.ast#L34-L37

concept Entity {
    isCompany: boolean;
    name: identifier;
    reference baseEntity?: Entity;
```

```ts
// DocuProject/src/defs/editor-main-default.edit#L5-L5

global {
```

By defining that the property must be represented by a **keyword**, we can change the default.
In the next example, the property `isCompany` will be shown as the keyword `COMPANY`. When the value
of the property is `true`, the keyword is shown. When the value is `false`, the keyword is not shown.

```ts
// DocuProject/src/defs/editor-main-default.edit#L57-L59

]}

CalcFunction {
```

This example would be displayed as one of ...

```
COMPANY entity PhilipsEnterPrises { // the value of isCompany is true
  ...
}
entity FritsPhilips { // the value of isCompany is false
  ...
}
```

Another way to display boolean properties is to use **two** keywords. Depending on
the value of the property either the first or second keyword is shown.

```ts
// DocuProject/src/defs/editor-specials.edit#L11-L13

First Card
    is still under construction: ${self.isUnderConstruction switch}
    is approved level1: ${self.isApprovedLevel1 radio}
```

This would be displayed as one of ...

```
COMPANY entity PhilipsEnterPrises { // the value of isCompany is true
  ...
}
PERSON entity FritsPhilips { // the value of isCompany is false
  ...
}
```

<Note>
<svelte:fragment slot="header">Keywords defined within a projection overwrite the standard boolean keywords</svelte:fragment>
<svelte:fragment slot="content">
In the default editor you can define standard boolean keywords. These will not be used when either of the two keyword projections
is present.
</svelte:fragment>
</Note>
