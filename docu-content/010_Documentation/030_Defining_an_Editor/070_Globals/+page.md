<script>
    import Note from "$lib/notes/Note.svelte";
     let self;
</script>

# Syntax to be used Globally

For some concrete syntax elements you may provide a global definition, i.e. these definitions are used everywhere in the projections.
Note that this can be done once in the complete set of editors, but these can be overwritten
per property. The global definitions may only be present in the _default_ editor definition.

## Syntax for Boolean values

As first of the global definitions, you may define the keywords to be used for
the boolean _true_ and _false_ values. In the example below, the user will view 
every boolean property as a switch button with the string `YES` for the value `true`, 
and `NO` for the value `false`.

```ts
// DocuProject/src/defs/editor-main-default.edit#L5-L18

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

```

The standard keywords can be overwritten per property.
See [Boolean Keyword Projections](/Documentation/Defining_an_Editor/Projections#booleans).

## Displaying Limited Concepts

[//]: # (todo Displaying Limited Concepts)

## Reference Separator

References to other objects may consist of a series of names, like _country.city.street.house_. The string used to separate
these names (in the example ":") can be set, but, like the boolean values, only once for the complete set of editors,
in the editor called _default_.

```ts
// DocuProject/src/defs/editor-main-default.edit#L7-L7

limited radio
```

## Adding Names of External Components

[//]: # (todo Adding Names of Extranel Components)

## Example `.edit` File

A complete .edit file could look like this.

```ts
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
