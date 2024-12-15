<script>
    import Note from "$lib/notes/Note.svelte";
</script>

# Projections

A projection is defined using angular brackets, 
in a style similar to Markdown. The appearance of the definition 
closely resembles the resulting output. Everything within square 
brackets (`[]`), except for parts enclosed in `${}`, is interpreted 
literally. For more details, refer to the information 
on [Indentation](/Documentation/Defining_an_Editor/Indentation).

```freon
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

When defining a projection for a concept or interface, you will likely need 
to include its properties. This is done using the special notation `${}`, which 
instructs Freon to include a property according to the projection defined for its type.

For example, consider the property `self.body`, which is of type `DocuExpression`. It 
will be displayed based on the projection defined for `DocuExpression`. 
Meanwhile, `self.declaredType` is a property of the abstract type `DocuType`. 
This property will be projected according to the definition of 
the specific (non-abstract) subtype of `DocuType` encountered at runtime.

```freon
// DocuProject/src/defs/editor-main-default.edit#L40-L46

Themes: ${themes horizontal separator[, ]}
Premium: ${advertisedPremium} per ${nrPremiumDays}
Insured risks:
    ${parts vertical terminator [;]}
Calculation
    [? Risk adjusted by = ${riskAdjustment} ]
    calculated premium: ${calculation}
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

<Note><svelte:fragment slot="header"> One property, one occurrence in the editor</svelte:fragment>
<svelte:fragment slot="content">
<p>Unfortunately, it is not possible to show the same property of a concept twice in the same editor.
The tooling we use to keep the state of the underlying model in sync with the view in the running editor
does not allow us to do this.</p>
</svelte:fragment></Note>

## Using Named Projections

By default, a property you include will be displayed using the projection 
defined for its type. Freon determines this projection based on the 
precedence specified in the `.edit` files.

If you want to use a specific projection from a different editor,
you can use a **named property projection**. In this case, Freon 
will look for the projection in the editor with the specified name.

In the next example, the projection for `self.parts` will first be searched 
in the editor named `comments`. If it is not found there, 
Freon will fall back to the standard precedence order of projections.

```freon
// DocuProject/src/defs/editor-named-proj.edit#L3-L8

BaseProduct {[
    /* In this projection 'self.parts' is always shown according to the projection */
    /* defined for concept InsurancePart in the editor 'comments'.                 */
    Base Products ${self.name} for ${self.theme}
        ${self.parts:comments}
]}
```

## Lists

If a property is a list, you can specify whether it should be projected 
horizontally or vertically. Both options are optional. If 
neither `vertical` nor `horizontal` is specified, the property 
will be displayed as a vertical list by default.

You can also choose to project a list property 
as a [table](/Documentation/Defining_an_Editor/Projections#tables-4). 
However, its default projection will always be a list, which 
will be used if no projection is defined in the `.edit` files.

For a list, you can include the following options:

- A **separator** string, which will appear between each element.
- A **terminator** string, which will appear after each element.
- An **initiator** string, which will appear before each element.

All of these are optional. The default separator is a single space.

In the following example, the list `parts` is displayed vertically 
with a `';'` terminator. The list `themes` is displayed horizontally 
with a `', '` separator. The list `helpers` is shown as a vertical 
list without any separator, terminator, or initiator. In fact, 
the `vertical` keyword could be omitted for `helpers`, as it is the 
default projection for lists.

```freon
// DocuProject/src/defs/editor-main-default.edit#L38-L49

InsuranceProduct {[
    Insurance Product ${name} ( public name: ${productName} ) USES ${basedOn horizontal separator[, ]}
        Themes: ${themes horizontal separator[, ]}
        Premium: ${advertisedPremium} per ${nrPremiumDays}
        Insured risks:
            ${parts vertical terminator [;]}
        Calculation
            [? Risk adjusted by = ${riskAdjustment} ]
            calculated premium: ${calculation}
        [?Helper functions:
            ${helpers vertical}]
]}
```

<Note>
<svelte:fragment slot="header">Newlines in terminator or separator are ignored</svelte:fragment>
<svelte:fragment slot="content">
A terminator or separator should not contain a newline character. Horizontal or vertical layout is
purely determined by the keywords <code>horizontal</code> and <code>vertical</code>.
</svelte:fragment>
</Note>

## Tables

If a property is a list, you can choose to display it as a table. 
Tables can be either row-based or column-based. In a row-based table, 
each element of the list is displayed in a separate row, while 
in a column-based table, each element is displayed in a single 
column. The default is row-based.

Defining a table involves two steps:

1. Add the keyword `table` to the list property you want to 
display as a table. Optionally, you can also specify either `rows` or `columns`.
2. Define a table-projection for the type of the elements 
in the list. This projection specifies the table headers and 
3. determines how the elements of the list are arranged in rows or columns.

<Note>
<svelte:fragment slot="content">
Note that you only need to include one
table projection for both column and row based tables. Freon will swap the entries when needed.
</svelte:fragment>
</Note>

For example, to project the `parts` property of concept `BaseProduct` as a row based table, 
you can use the following code.

```freon
// DocuProject/src/defs/editor-tables.edit#L13-L16

BaseProduct {[
    Base Products ${name} for ${theme}
        ${parts table rows}
]}
```

Given the above example, there should also be a projection tagged `table` for the 
concept `InsurancePart` (the type of `parts`).
Below four columns/rows are defined, each with its own header.

```freon
// DocuProject/src/defs/editor-tables.edit#L6-L11

InsurancePart{
table [
    Name    | risk               | pay out          | is approved
    ${name} | ${statisticalRisk} | ${maximumPayOut} | ${isApproved}
]
}
```

[//]: # (todo the text in the following note is not inaccordance with the example)

<Note>
<svelte:fragment slot="header">Properties within a table are displayed according to their own projection</svelte:fragment>
<svelte:fragment slot="content">
The manner in which each of the properties in a table are displayed, is determined
by their own projections. In this example, <code>self.parameters</code> is a list, and will be displayed as another table.
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

Note that optional projections for non-optional properties are not allowed.

```freon
// DocuProject/src/defs/editor-main-default.edit#L27-L38

]}

InsurancePart{
[
    Insurance Part ${self.name}
        risk assessment: ${self.statisticalRisk}
        maximum payout: ${self.maximumPayOut}
        is approved: ${self.isApproved [JA | NEE]}
]
}

InsuranceProduct {[
```

## Inherited Projections

[//]: # (todo add content for Inherited Projections)
