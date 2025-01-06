<script>
    import Note from "$lib/notes/Note.svelte";
</script>

# Defining Properties

Each of the language structure elements (concepts, interfaces, expressions, etc.) may have **Properties**.  
Properties can be lists, this is indicated by square brackets after the type name. There are three types
of properties.

## Simple Properties

**Simple properties** have as type `identifier`, `string`, `number`, or `boolean`, and are
always contained in the _concept_. Simple properties may also be lists.

```txt
// DocuProject/src/defs/language-main.ast#L25-L26

name: identifier;               // internal name
isUnderConstruction: boolean;   // defines whether this base product is still 'raw'
```

## Part Properties

**Parts** have as type one of the _concepts_ (including _expression concepts_ and _limited concepts_)
or interfaces in the language, and are _contained in the concept_ that holds the property (as in
the UML composition relationship). Note that simple properties are always considered to be parts.

```txt
// DocuProject/src/defs/language-main.ast#L27-L28

theme: InsuranceTheme;          // the 'kind' of insurance
parts: InsurancePart[];         // all parts of this product
```

## Reference Properties

**References** also have as type one of the _concepts_ or _interfaces_ in the language, but a reference is not contained
in its _concept_ (as in the UML association relationship). References are indicated by the keyword
_reference_ in front of the definition.

References are always by name, therefore the referred concept must have a `name` property of type `identifier`.

In the following example the concept `InsuranceProduct` holds a list of references to `InsuranceParts`. The
concept `InsurancePart` has a property `name: identifier`.

```txt
// DocuProject/src/defs/language-main.ast#L53-L65

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

```txt
// DocuProject/src/defs/language-main.ast#L44-L49

concept InsurancePart {
    name: identifier;                       // internal name
    isApproved: boolean = false;            // indication of approval status
    statisticalRisk: PercentageLiteral;     // the statistical risk known for this event
    maximumPayOut: EuroLiteral;             // maximum payout in case the insured event happens
}
```

## Optional Properties

Properties may be optional. This is indicated using a question mark after the property name.
Lists are always considered to be optional, i.e. they maybe empty, - there is no need for the question mark there.

Because this causes problems in the editor, simple properties may not be optional at the moment.

```txt
// DocuProject/src/defs/language-main.ast#L68-L74

concept CalcFunction {
    name: identifier;                   // the name
    description?: Description;          // an optional description
    declaredType : DocuType;            // the type
    body: DocuExpression;               // the actual calculation definition
    parameters: Parameter[];            // any parameters
}
```
