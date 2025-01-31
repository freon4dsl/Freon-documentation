<script>
    import Note from "$lib/notes/Note.svelte";
</script>

# Defining Properties

Each of the language structure elements (concepts, interfaces, expressions, etc.) may have **Properties**.  
Properties can be lists, this is indicated by square brackets after the type name. There are three types
of properties.

## Primitive Properties

**Primitive properties** have as type `identifier`, `string`, `number`, or `boolean`, and are
always contained in the _concept_. Primitive properties may also be lists.

```proto
// Insurance/src/defs/language-main.ast#L25-L26

name: identifier;               // internal name
isUnderConstruction: boolean;   // defines whether this base product is still 'raw'
```

## Part Properties

**Parts** have as type one of the _concepts_ (including _expression concepts_ and _limited concepts_)
or interfaces in the language, and are _contained in the concept_ that holds the property (as in
the UML composition relationship). Parts are also called children.
In the example below `body` and `parameters` are parts. 

```proto
// Insurance/src/defs/language-main.ast#L72-L73

body: DocuExpression;               // the actual calculation definition
parameters: Parameter[];            // any parameters
```

## Reference Properties

**References** also have as type one of the _concepts_ or _interfaces_ in the language, but a reference is not contained
in its _concept_ (as in the UML association relationship). References are indicated by the keyword
_reference_ in front of the definition.

References are always by name, therefore the referred concept must have a `name` property of type `identifier`.

In the following example the concept `InsuranceProduct` holds a list of references to `InsuranceParts` in the property `parts`.

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

The concept `InsurancePart` has a property `name: identifier`.

```proto
// Insurance/src/defs/language-main.ast#L44-L45

concept InsurancePart {
    name: identifier;                       // internal name
```

## Optional Properties

Properties may be optional. This is indicated using a question mark after the property name.
Lists are always considered to be optional, i.e. they maybe empty, - there is no need for the question mark there.

Primitive properties may not be optional at the moment, but we plan to change this in the future.

```proto
// Insurance/src/defs/language-main.ast#L70-L70

description?: Description;          // an optional description
```
