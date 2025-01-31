<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Defining an Editor

An editor's behavior is specified 
through an editor definition file (a `.edit` file). 
You can define the following three aspects for each _concept_ or _interface_:

- **Projection**: Defines how the _concept_ is visually represented in the editor. This is also called the [concrete syntax](/Documentation/Terminology).
- **Trigger** (optional): Specifies the key or keys that a user must type to create a new instance of the _concept_ and that
the user will see in a dropdown menu.
- **Symbol** (optional): Used exclusively for binary expressions, it is the character or string that represents 
the _operator_. If a _symbol_ is not provided, the _trigger_ will serve this purpose.
 
Note that projections cannot be specified for _binary expression concepts_ or _limited concepts_. 
The editor offers specialized support for binary expressions, which cannot function properly 
if a user-defined projection is applied. Limited concepts are also restricted 
from having projections because they are intended for use as references only within the editor.

<Note>
<svelte:fragment slot="header"> The projection is always the first </svelte:fragment>
<svelte:fragment slot="content">
For every concept or interface you have to define the projection before the trigger and/or symbol.  
</svelte:fragment>
</Note>

## Named Editors or Projection Sets

You can define multiple projections for the same concept and switch between these
different projections in the editor. This allows you to adapt the editor to
a specific task or point of view.

Editors are **named**, allowing you to define multiple editors with coordinated 
sets of projections. 

For example, if you group all [table projections](/Documentation/Defining_an_Editor/Projections#tables) under 
a specific named editor, 
users can switch between viewing objects as lists or as tables. Similarly, 
you could create one editor (or projection set) that displays only a subset 
of properties for certain concepts, while another editor shows all properties. 
This flexibility allows you to accommodate different user needs.

Projections can also explicitly specify that a property must be displayed using 
a projection from a specific named editor. For more details, 
refer to [Using Named Projections](/Documentation/Defining_an_Editor/Projections#using-named-projections-3).

## The Default Editor

Since an editor is required as a fallback when all other editors are disabled, 
a default editor is automatically generated if one is not provided. If a default 
editor is supplied but is incomplete — meaning it does not define projections 
for all concepts — projections for the missing concepts are automatically 
generated. As a result, the default editor is always complete during generation.

The generated default will show the concept's name and all of its properties in the order given in the .ast file.
Any list property will be displayed as a vertical list.

For example, if no projection is specified for the concepts `InsurancePart`, `PercentageLiteral`, and `EuroLiteral` 
instances of `InsurancePart` will be shown as follows.

```proto
// Insurance/src/defs/language-main.ast#L44-L49

concept InsurancePart {
    name: identifier;                       // internal name
    isApproved: boolean = false;            // indication of approval status
    statisticalRisk: PercentageLiteral;     // the statistical risk known for this event
    maximumPayOut: EuroLiteral;             // maximum payout in case the insured event happens
}
```

<Figure
imageName={'documentation/Defining-an-Editor-Screenshot.png'}
caption={'Generated Default Projection'}
figureNumber={1}
/>

## Editor Precedence

Named editors are arranged in a specific order, which can be specified by assigning 
a precedence value to each editor. Projections are resolved following this order. 
The default editor always has the lowest precedence (0) and is evaluated last.

If a projection for a concept is not found in the editor with the highest precedence, 
the system searches the next editor in the sequence, continuing until it 
reaches the default editor.

If you do not specify a precedence, Freon assigns one based on the order 
in which the files are read — typically alphabetically. However, this 
order is not guaranteed and may vary.

<Note>
<svelte:fragment slot="header"> Each editor can be defined in multiple files </svelte:fragment>
<svelte:fragment slot="content">
<p>Every <code>.edit</code> file in the folder containing your definitions is read during the 
generation process. If multiple files define editors with the same name, their information 
is merged into a single editor.</p>

<p>The precedence value only needs to be specified once. However, if it is defined multiple 
times, the values must be consistent.</p>
</svelte:fragment>
</Note>

```proto
// Insurance/src/defs/editor-tables.edit#L1-L11

/* This file contains the table definition in a separate editor / projection group.
This enables the user to switch tables on and off. */

editor tables precedence 4

InsurancePart{
table [
    Name    | risk               | pay out          | is approved
    ${name} | ${statisticalRisk} | ${maximumPayOut} | ${isApproved}
]
}
```

## Example `.edit` File

A complete .edit file could look like this.

```proto
// Insurance/src/defs/editor-main-default.edit#L1-L80

/* This file contains the default editor definition. */

editor default

global {
    boolean inner-switch [YES | NO] // the strings used to display a boolean value, all booleans will default be displayed as an inner switch control
//    limited radio
//    limited[] checkbox
    // number slider  // you can use the slider control as default projection for numbers, but this will not often be the preferred option
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

// No need for projections for DocuType and its implementors, they
// are only used as references, so their names suffice.

Entity {[
    ${self.isCompany [COMPANY]} ${self.name}
]}

```
