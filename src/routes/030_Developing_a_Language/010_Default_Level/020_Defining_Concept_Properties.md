# Defining Concept Properties

Each of the language structure elements (concepts, interfaces, expressions, ...) may have **Properties**.     
Properties can be lists, this is indicated by square brackets after the type name. There are three types
of properties.

**Simple properties** have as type `identifier`, `string`, `number`, or `boolean`, and are
     always contained in the *concept*. Simple properties may also be lists
     of `identifier`, `string`, `number`, or `boolean`.
```ts
// docu-project/defs/language-main.ast#L33-L35

concept InsurancePart {
    name: identifier;                       // internal name
    isApproved: boolean = false;            // indication of approval status
```

**Parts** have as type one of the *concepts* (including *expression concepts* and *limited concepts*)
     in the language, and are *contained in the concept* that holds the property (as in
     the UML composition relationship). Note that simple properties are always considered to be parts.

```ts
// docu-project/defs/language-main.ast#L33-L38

concept InsurancePart {
    name: identifier;                       // internal name
    isApproved: boolean = false;            // indication of approval status
    statisticalRisk: PercentageLiteral;     // the statistical risk known for this event
    maximumPayOut: EuroLiteral;             // maximum payout in case the insured event happens
}
```

**References** also have as type one of the *concepts* in the language, but a reference is not contained
  in its *concept* (as in the UML association relationship). References are indicated by the keyword
  *reference* in front of the definition.

  References are always by name, therefore the referred concept must have a `name` property of type `identifier`.

In the following example the concept `InsuranceProduct` holds a list of references to `InsuranceParts`. The 
concept `InsurancePart` has a property `name: identifier`.

```ts
// docu-project/defs/language-main.ast#L42-L48

concept InsuranceProduct {
    name: identifier;                       // internal name
    productName: string;                    // name by which this product is known to the public
    themes: InsuranceTheme[];               // the 'kind' of insurance
    advertisedPremium: EuroLiteral;         // the premium as known to the public
    nrPremiumDays: PremiumDays;             // the number of days for which the advertised premium is calculated
    reference parts: InsurancePart[];       // optionally, known parts can be included by reference
```
```ts
// docu-project/defs/language-main.ast#L33-L34

concept InsurancePart {
    name: identifier;                       // internal name
```

## Optional Properties
Properties may be optional. This is indicated using a question mark after the property name. 
Lists are always considered to be optional - there is no need for the question mark there.

Because this causes problems in the editor, simple properties may not be optional at the moment.

```ts
// docu-project/defs/language-main.ast#L57-L59

concept CalcFunction {
    name: identifier;                   // the name
    description?: Description;          // an optional description
```
