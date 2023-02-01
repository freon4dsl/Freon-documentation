<script>
    import Note from "../../../../lib/notes/Note.svelte";
     let self;
</script>

# The Editor Definition Files
In an editor definition file (`.edit` file) you can define a ProjectIt editor by providing extra information
for each *concept* or *interface* in your language. Currently, you can define the following three items per
*concept* or *interface*.

*	A **projection**, which is how the *concept* is shown in the editor.
*	An optional **trigger**, which is the key or keys your user needs to type to create a 
     new instance of the *concept*.
*	An optional **symbol**, which is only used for **binary expressions**. It is the character or 
     character string that represents the *operator*. When the *symbol* is not present, 
     the *trigger* will be used for this purpose.

You cannot create a projection for either a **binary expression concept** or a **limited concept**.
The editor provides extra [support for expressions](/010_Intro/010_Projectional_Editing#expressions), which
cannot be done if a user defined projection is provided. **Limited concepts** are blocked, because the user of the editor
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
the appearance of the model in the editor. 

For instance, if you define all table projections under the same editor name,
then your user can switch from viewing objects as lists to viewing them 
as [tables](/030_Developing_a_Language/020_Definition_Level/010_Editor_Definition/020_Projections#tables).
Or, in another example, you could have an editor (or projection set) that shows only part of the properties of some
concepts, whereas another editor shows all properties. This makes it possible to cater for different types of users.

Projections may specifically request that a property is displayed using a projection from a named editor.
For this see [Including a Property Projection from Another Editor](/030_Developing_a_Language/020_Definition_Level/010_Editor_Definition/020_Projections#named_projection).

### The Default Editor and Defaults for Every Concept
Because there has to be an editor that can be used as fallback when all other editors are switched off, an 
editor with the name **default** is generated in case it is not provided. If the default editor is provided but incomplete,
i.e. it does not define a projection for all concepts, 
projections will be generated for the missing concepts. So, upon generation the default editor is always complete.

For instance when no projection is provided for the concept `BaseProduct`, the concrete syntax for instances of this concept
will be using the name of the concepts and its properties as keywords, and any list property will be shown as a vertical list, 
which is shown more or less by the following grammar rule.

```ts
// docu-project/defs/language-main.ast#L24-L28

concept BaseProduct {
    name: identifier;           // internal name
    theme: InsuranceTheme;      // the 'kind' of insurance
    parts: InsurancePart[];     // all parts of this product
}
```

```ts
BaseProduct = 'BaseProduct' identifier '{'
'parts'
InsurancePart*
'theme' InsuranceTheme
'}' ;
```

### <a name="ordering"></a> Precedence of Editors
The named editors are ordered; the order can be indicated by adding a **precedence** to the editor. The
projections are found based on this order. The `default` editor is always the last (i.e. its precedence is 0).
If a box/projection for a concept is not present in the editor with the highest precedence,
then the next editor is searched for a projection for the concept and so on, till the default editor is reached.

When you omit the precedence, ProjectIt will assign one based on the order in which the files are read,
which normally is alphabetically. However, we cannot guarantee any specific order.

<Note>
<svelte:fragment slot="header"> Each editor can be defined in multiple files </svelte:fragment>
<svelte:fragment slot="content">
Every <code>.edit</code> file that is encountered in the folder that holds your definitions, will be read during the generation.
When the editor in multiple files has the same name all information will be combined into a single editor. 
The precedence needs to be added only once, but in case you add it multiple times, the numbers are required to be equal.
</svelte:fragment>
</Note>

```ts
// docu-project/defs/editor-tables.edit#L1-L5

/* This file contains the table definition in a separate editor / projection group.
This enables the user to switch tables on and off. */

editor tables precedence 4

```  

## Standard Boolean Keywords

Next to the concrete syntax definitions for *concepts* and *interfaces*, you can define the keywords to be used for 
the boolean *true* and *false* values. Note that this can be done once in the complete set of editors. It should be 
part of an editor called *default*. In the example below, the user will view the string `YES` whenever a boolean 
property has the value `true`, and likewise `NO` will be shown for the value `false`.

```ts
// docu-project/defs/editor-main-default.edit#L5-L5

boolean [YES | NO] // the strings used to display a boolean value
```  

The standard keywords can be overwritten per property. 
See [Boolean Keyword Projections](/030_Developing_a_Language/020_Definition_Level/010_Editor_Definition/020_Projections#booleans).

## Reference Separator

References to other objects may consist of a series of names, like *country.city.street.house*. The string used to separate 
these names (in the example ":") can be set, but, like the boolean values, only once for the complete set of editors, 
in the editor called *default*.

```ts
// docu-project/defs/editor-main-default.edit#L7-L7

referenceSeparator [:] // the string that separates the names in a path name, e.g. pack1:cls3:part
```  

## Example `.edit` File

A complete .edit file could look like this.

```ts
// docu-project/defs/editor-main-default.edit#L1-L52

/* This file contains the default editor definition. */

editor default

boolean [YES | NO] // the strings used to display a boolean value

referenceSeparator [:] // the string that separates the names in a path name, e.g. pack1:cls3:part

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
        is approved: ${self.isApproved}
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
``` 
