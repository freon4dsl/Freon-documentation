<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Boolean Projections

Freon offers a number of different manners to display a boolean value, ranging from textual to 
visual controls, like a switch. Each option is described in the following.

Note that you can set a default for the display of a boolean value in the `global` section of the
default editor. See [Global Projections](/Documentation/Defining_an_Editor/Global_Projections).

## Textual - Two Keywords

The strings that are displayed when a boolean property has a certain value, which normally
would be either `true` or `false`, can be manipulated.
In the projection two strings are added,
the first is the text that represents the true-value, the second represents the false-value.

In the next example, the concept `InsurancePart` has a simple property of type boolean 
called `isApproved`. In the projection for `isApproved` the strings `JA` and `NEE` will be shown for,
respectively, true and false.

```proto
// Insurance/src/defs/language-main.ast#L41-L49

// An InsurancePart defines a single aspect of an InsuranceProduct together
// with the statistical risk of the event happening, and the maximum payout
// in case the insured event happens.
concept InsurancePart {
    name: identifier;                       // internal name
    isApproved: boolean = false;            // indication of approval status
    statisticalRisk: PercentageLiteral;     // the statistical risk known for this event
    maximumPayOut: EuroLiteral;             // maximum payout in case the insured event happens
}
```

```proto
// Insurance/src/defs/editor-main-default.edit#L28-L35


InsurancePart{
[
    Insurance Part ${self.name}
        risk assessment: ${self.statisticalRisk}
        maximum payout: ${self.maximumPayOut}
        is approved: ${self.isApproved [JA | NEE]}
]
```

<Figure
imageName={'documentation/Documentation-Boolean-Projections-screenshot1.png'}
caption={'Displaying different strings for boolean values'}
figureNumber={1}
/>

## Textual - One Keyword

It is not necessary to always provide two textual representations for a boolean value. If only one 
string is added to the projection, its value is taken to represent `true`. The absence of the string is
representing `false`.

In the next example, the property `isCompany` will be shown as the keyword `COMPANY`. When the value
of the property is `true`, the keyword is shown. When the value is `false`, the keyword is not shown.

```proto
// Insurance/src/defs/editor-main-default.edit#L67-L69


Entity {[
    ${self.isCompany [COMPANY]} ${self.name}
```

This example would be displayed as one of ...

```txt
COMPANY entity PhilipsEnterPrises { // the value of isCompany is true
  ...
}
entity FritsPhilips { // the value of isCompany is false
  ...
}
```

<Note>
<svelte:fragment slot="header">Keywords defined within a projection overwrite the global boolean projection</svelte:fragment>
<svelte:fragment slot="content">
In the default editor you can define global boolean projection. These will not be used when a more specific projection
is present.
</svelte:fragment>
</Note>

## Switch, Checkbox, Radio Control

Freon provides four native boolean controls: two types of switches, a checkbox, and a radio group. Each is
indicated by adding a keyword to the property projection. The possible keywords are:

- `switch`, which shows a simple switch control,
- `inner-switch`, which shows a switch that holds text for the true and false values,
- `checkbox`, which shows an ordinary checkbox,
- `radio`, which show a radio group with text for the true and false values,
- `text`, which indicates that the boolean value should be shown as text.

The latter is used to overwrite the global boolean projection, in case it demands one of the other options. 
When ever text is shown, the strings to be used as true and false values can be indicated between square brackets,
in the same way as the values for textual representations are given. When they are not present, the global
definition is taken. If that is also not present then the default is `true` and `false`.

For the sake of the example, we have added a number of boolean properties to the concept `BaseProduct`.

```proto
// Insurance/src/defs/language-main.ast#L24-L39

concept BaseProduct {
    name: identifier;               // internal name
    isUnderConstruction: boolean;   // defines whether this base product is still 'raw'
    theme: InsuranceTheme;          // the 'kind' of insurance
    parts: InsurancePart[];         // all parts of this product
    // The following properties are present to show the different options for displaying booleans.
    isApprovedLevel1: boolean;
    isApprovedLevel2: boolean;
    isApprovedLevel3: boolean;
    yieldsProfit: boolean;
    range: number;
    nrOfUse: number;
    // The previoud two properties are present to show the different options for displaying numbers.
    // The following property is present to show the use of an external DatePicker component.
    date: string;
}
```

Each of the boolean properties is displayed differently.

```freon
// Insurance/src/defs/editor-main-controls.edit#L7-L11

is still under construction: ${self.isUnderConstruction switch}
is approved level1: ${self.isApprovedLevel1 radio [Sure | NoWay]}
is approved level2: ${self.isApprovedLevel2 inner-switch}
is approved level3: ${self.isApprovedLevel3 checkbox}
yields profit: ${self.yieldsProfit text [Plenty | Little]}
```

The result of this projection is shown in the screenshot below. Note that
the text used for property `self.isApprovedLevel2` is defined by the global
boolean projection. See [Global Projections](/Documentation/Defining_an_Editor/Global_Projections).

<Figure
imageName={'documentation/Documentation-Boolean-Projections-screenshot2.png'}
caption={'Different boolean controls'}
figureNumber={2}
/>
