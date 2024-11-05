# Defining Concept Properties

Each of the language structure elements (concepts, interfaces, expressions, ...) may have **Properties**.  
Properties can be lists, this is indicated by square brackets after the type name. There are three types
of properties.

**Simple properties** have as type `identifier`, `string`, `number`, or `boolean`, and are
always contained in the _concept_. Simple properties may also be lists
of `identifier`, `string`, `number`, or `boolean`.

```ts
// DocuProject/src/defs/language-main.ast#L33-L35

date: string;
theme: InsuranceTheme;          // the 'kind' of insurance
parts: InsurancePart[];         // all parts of this product
```

**Parts** have as type one of the _concepts_ (including _expression concepts_ and _limited concepts_)
in the language, and are _contained in the concept_ that holds the property (as in
the UML composition relationship). Note that simple properties are always considered to be parts.

```ts
// DocuProject/src/defs/language-main.ast#L33-L38

    date: string;
    theme: InsuranceTheme;          // the 'kind' of insurance
    parts: InsurancePart[];         // all parts of this product
}

// An InsurancePart defines a single aspect of an InsuranceProduct together
```

**References** also have as type one of the _concepts_ in the language, but a reference is not contained
in its _concept_ (as in the UML association relationship). References are indicated by the keyword
_reference_ in front of the definition.

References are always by name, therefore the referred concept must have a `name` property of type `identifier`.

In the following example the concept `InsuranceProduct` holds a list of references to `InsuranceParts`. The
concept `InsurancePart` has a property `name: identifier`.

```ts
// DocuProject/src/defs/language-main.ast#L42-L48

    name: identifier;                       // internal name
    isApproved: boolean = false;            // indication of approval status
    statisticalRisk: PercentageLiteral;     // the statistical risk known for this event
    maximumPayOut: EuroLiteral;             // maximum payout in case the insured event happens
}

// An InsuranceProduct is a combination of insured events, defined in InsuranceParts,
```

```ts
// DocuProject/src/defs/language-main.ast#L33-L34

date: string;
theme: InsuranceTheme; // the 'kind' of insurance
```

## Optional Properties

Properties may be optional. This is indicated using a question mark after the property name.
Lists are always considered to be optional - there is no need for the question mark there.

Because this causes problems in the editor, simple properties may not be optional at the moment.

```ts
// DocuProject/src/defs/language-main.ast#L57-L59

   reference basedOn: BaseProduct[];       // the BaseProducts from which the parts are taken

   riskAdjustment?: PercentageLiteral;     // an adjustment to the risk of the separate parts, e.g. caused by the combination of the parts
```
