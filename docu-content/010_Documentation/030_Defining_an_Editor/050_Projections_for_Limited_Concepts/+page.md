<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Projections for Limited Concepts

There are two controls for limited concepts. They differ, based on whether the property is a list or a single value.
For single values the property can be displayed as a radio group, where all possible values of the 
limited concept are options. When the property is a list of limited values, it can be displayed as a list of checkboxes.

The example that is used in the documentation defines the limited concept `InsuranceTheme` as a simple enumeration.

```proto
// Insurance/src/defs/language-main.ast#L129-L131

limited InsuranceTheme {        // limited defined as a simple enumeration
    HomeTheme; HealthTheme; LegalTheme;
}
```

This concept is twice used as property type. Once as a single value in `BaseProduct`, and once 
as a list in `InsurancePart`.

## Single Valued Properties

The metamodel for `BaseProduct` is the following.

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

We combine this metamodel with the following projection.

```proto
// Insurance/src/defs/editor-main-controls.edit#L5-L17

BaseProduct {[
    Base Products ${name} for ${theme radio}
        is still under construction: ${self.isUnderConstruction switch}
        is approved level1: ${self.isApprovedLevel1 radio [Sure | NoWay]}
        is approved level2: ${self.isApprovedLevel2 inner-switch}
        is approved level3: ${self.isApprovedLevel3 checkbox}
        yields profit: ${self.yieldsProfit text [Plenty | Little]}
        expected nr of use: ${self.nrOfUse}
        range: ${self.range slider}


        ${parts}
]}
```

And the result looks like this.

<Figure
imageName={'documentation/Documentation-Limited-Projections-screenshot1.png'}
caption={'A control for a single value of limited type'}
figureNumber={1}
/>

## Multivalued Properties

The metamodel for `InsuranceProduct` is the following.

```proto
// Insurance/src/defs/language-main.ast#L53-L65

concept InsuranceProduct {
    name: identifier;                       // internal name
    productName: string;                    // name by which this product is known to the public
    themes: InsuranceTheme[];               // the 'kind' of insurance
    advertisedPremium: EuroLiteral;         // the premium as known to the public
    nrPremiumDays: PremiumDays;             // the number of days for which the advertised premium is calculated
    reference parts: InsurancePart[];       // optionally, known parts can be included by reference
    reference basedOn: BaseProduct[];       // the BaseProducts from which the parts are taken

    riskAdjustment?: PercentageLiteral;     // an adjustment to the risk of the separate parts, e.g. caused by the combination of the parts
    calculation: DocuExpression;            // the premium as calculated based on the parts
    helpers: CalcFunction[];                // helper functions used to calculate the premium
}
```

Again, we combine this metamodel with a projection.

```proto
// Insurance/src/defs/editor-main-controls.edit#L19-L30

InsuranceProduct {[
    Insurance Product ${name} ( public name: ${productName} ) USES ${basedOn horizontal separator[, ]}
        Themes: ${themes checkbox}
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

And the result is the following.

<Figure
imageName={'documentation/Documentation-Limited-Projections-screenshot2.png'}
caption={'A control for a multivalued property of limited type'}
figureNumber={2}
/>
