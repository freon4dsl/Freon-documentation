<script>
    import Note from "$lib/notes/Note.svelte";
     let self;
</script>

# Defining an Editor

The way that editor projects the model units, can be defined in an editor definition file (`.edit` file). 
For each _concept_ or _interface_ in your language additional information must be given. 
Combined this defines the [concrete syntax](/Documentation/Terminology) of your language. 

Currently, you can define the following three items per
_concept_ or _interface_.

- A **projection**, which is how the _concept_ is shown in the editor.
- An optional **trigger**, which is the key or keys your user needs to type to create a
  new instance of the _concept_.
- An optional **symbol**, which is only used for **binary expressions**. It is the character or
  character string that represents the _operator_. When the _symbol_ is not present,
  the _trigger_ will be used for this purpose.

You cannot create a projection for either a **binary expression concept** or a **limited concept**.
The editor gives extra [support for expressions](/Overview/Projectional_Editing#expressions), which
cannot be provided if a user defined projection is present. **Limited concepts** are blocked, because the user of the editor
can use the instances of the limited concept solely as references.

<Note>
<svelte:fragment slot="header"> The projection is always the first </svelte:fragment>
<svelte:fragment slot="content">
For every concept or interface you have to define the projection before the trigger and/or symbol.  
</svelte:fragment>
</Note>

## Named Editors or Projection Sets

Editors can be **named**, and you can define multiple editors. A **named editor**
defines a set of projections that are coordinated to operate together.
These sets can be switched on and off dynamically, thus changing
the appearance of the model in the editor.

For instance, if you define all table projections under the same editor name,
then your user can switch from viewing objects as lists to viewing them
as [tables](/Documentation/Defining_an_Editor/Projections#tables).
Or, in another example, you could have an editor (or projection set) that shows only part of the properties of certain
concepts, whereas another editor shows all properties. This makes it possible to cater for different types of users.

Projections may specifically request that a property is displayed using a projection from a named editor.
For this see [Including a Property Projection from Another Editor](/Documentation/Defining_an_Editor/Projections#named_projection).

## The Default Editor, and Defaults for Every Concept

Because there has to be an editor that can be used as fallback when all other editors are switched off, an
editor with the name **default** is generated in case it is not provided. If the default editor is provided but incomplete,
i.e. it does not define a projection for all concepts,
projections will be generated for the missing concepts. So, upon generation the default editor is always complete.

For instance when no projection is provided for the concept `BaseProduct`, the concrete syntax for instances of this concept
will be using the name of the concepts, and its properties as keywords, and any list property will be shown as a vertical list,
which is shown more or less by the following grammar rule.

[//]: # (todo: adjust the example)

```txt
// DocuProject/src/defs/language-main.ast#L24-L36

concept BaseProduct {
    name: identifier;               // internal name
    isUnderConstruction: boolean;   // defines whether this base product is still 'raw'
    isApprovedLevel1: boolean;
    isApprovedLevel2: boolean;
    isApprovedLevel3: boolean;
    yieldsProfit: boolean;
    range: number;
    nrOfUse: number;
    date: string;
    theme: InsuranceTheme;          // the 'kind' of insurance
    parts: InsurancePart[];         // all parts of this product
}
```

```txt
BaseProduct = 'BaseProduct' identifier '{'
'parts'
InsurancePart*
'theme' InsuranceTheme
'}' ;
```

## Precedence of Projections

The named editors are ordered; the order can be indicated by adding a **precedence** to the editor. The
projections are found based on this order. The `default` editor is always the last (i.e. its precedence is 0).
If a projection for a concept is not present in the editor with the highest precedence,
then the next editor is searched for a projection for the concept, and so on, till the default editor is reached.

When you omit the precedence, Freon will assign one based on the order in which the files are read,
which normally is alphabetically. However, we cannot guarantee any specific order.

<Note>
<svelte:fragment slot="header"> Each editor can be defined in multiple files </svelte:fragment>
<svelte:fragment slot="content">
Every <code>.edit</code> file that is encountered in the folder that holds your definitions, will be read during the generation.
When the editor in multiple files has the same name all information will be combined into a single editor. 
The precedence needs to be added only once, but in case you add it multiple times, the numbers are required to be equal.
</svelte:fragment>
</Note>

```txt
// DocuProject/src/defs/editor-tables.edit#L1-L11

/* This file contains the table definition in a separate editor / projection group.
This enables the user to switch tables on and off. */

editor tables precedence 4

InsurancePart{
table [
    Name    | risk               | pay out          | is approved   | action
    ${name} | ${statisticalRisk} | ${maximumPayOut} | ${isApproved} | [button boxRole="MyTableButton-role"]
]
}
```

## Example `.edit` File

A complete .edit file could look like this.

```txt
// DocuProject/src/defs/editor-main-default.edit#L1-L80

/* This file contains the default editor definition. */

editor default

global {
    boolean inner-switch [YES | NO] // the strings used to display a boolean value, all booleans will default be displayed as an inner switch control
    limited radio
    limited[] checkbox
    referenceSeparator [:] // the string that separates the names in a path name, e.g. pack1:cls3:part
    external {
        AnimatedGif,
        SMUI_Card,
        SMUI_Accordion,
        SMUI_Dialog,
        DatePicker
    }
}

// both modelunits show a single concept
Part {[ ${self.part} ]}
Product {[ ${self.product} ]}

BaseProduct {[
    Base Products ${name} for ${theme}
        is still under construction: ${self.isUnderConstruction switch}
        is approved level1: ${self.isApprovedLevel1 radio [Sure | NoWay]}
        is approved level2: ${self.isApprovedLevel2 inner-switch}
        is approved level3: ${self.isApprovedLevel3 checkbox}
        yields profit: ${self.yieldsProfit text [Plenty | Little]}
        expected nr of use: ${self.nrOfUse}
        range: ${self.range slider}


        ${parts}
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

CalcFunction {
    [
        ${name} ( ${parameters horizontal separator[,]} ): ${declaredType} {
            ${body}
        }
    ]
}
Description {
    [${content}]
}
Parameter {
     [${name} : ${declaredType}]
}

// No need for projection for DocuType and its implementors, they
// are only used as references, so their names suffice.

Entity {[
    ${self.isCompany [COMPANY]} ${self.name}
]}

```
