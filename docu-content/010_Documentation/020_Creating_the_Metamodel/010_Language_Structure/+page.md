<script>
    import Note from "$lib/notes/Note.svelte";
</script>

# The Language Structure

## Model

A _model_ is the root of the abstract syntax tree.
It may hold any number of model units as children. These model units may be of different type. For instance, you
can have model units that define the items in a home automation system, and other model units that define the rules
that apply in this system.

<Note><svelte:fragment slot="header"> Models are never explicit in an editor</svelte:fragment><svelte:fragment slot="content">
The model is never shown in an editor as a whole.
It is always shown in parts: the model units. However, the provided webapp does 'show' the model and the units, that are
part of it, in its left panel.
</svelte:fragment></Note>

```ts
// DocuProject/src/defs/language-main.ast#L7-L10

model InsuranceModel {
    parts: Part[];              // units that hold partial definitions of insurance products
    products: Product[];        // units that hold sellable insurance products
}
```

## Model unit

A _model unit_ is a part of the model that can be edited by the user independently of the rest of the model. A model unit is
always a direct child of a model. Model units may not extend other units, or implement interfaces.

```ts
// DocuProject/src/defs/language-main.ast#L12-L15

modelunit Part {
    part: BaseProduct;          // one collection of partial insurance products
    file-extension = "base";    // the file extension used by the parser
}
```

Model units have one special entry called `file-extension`, as shown in the example above. This is an optional
indication of the file type that the generated parser will associate with this model unit, i.e. an
instance of the above model unit will be exported/imported to/from a file with extension '.base'.

## Concept

A _concept_ is the basic element of your language definition. It defines which instances can be present in
a model created by your users.

Concepts may extend one other concept using the keyword `base`, and implement multiple interfaces.
Furthermore, they may be _abstract_.

```ts
// DocuProject/src/defs/language-main.ast#L24-L28

concept BaseProduct {
    name: identifier;               // internal name
    isUnderConstruction: boolean;   // defines whether this base product is still 'raw'
    isApprovedLevel1: boolean;
    isApprovedLevel2: boolean;
```

```ts
// DocuProject/src/defs/language-main.ast#L106-L112

limited NumberType implements NamedType {
    Number;
}

limited BooleanType implements NamedType {
    Boolean;
}
```

## Expression Concept

An _expression concept_ is a concept represents an expression. The editor deals differently with these, in
order to give your user a more natural editing experience.

Expression concepts may extend another concept, and implement multiple interfaces.

```txt
// DocuProject/src/defs/language-expressions.ast#L10-L18

abstract expression Literal base DocuExpression {
}
expression EuroLiteral base Literal {
    euros: number;
    cents: number;
}
expression NumberLiteral base Literal {
    value: number;
}
```

<Note>
<svelte:fragment slot="header">Use a Single Root of the Expression AST</svelte:fragment>
<svelte:fragment slot="content">
<p>
It is good practice to have all expression concepts inherit from one single root concept. This make it easy 
to have any type of expression as a part of the expression that you want to define.</p>
<p>
For instance, when defining a bracketed expression, i.e. an expression surrounded by brackets, you can 
simply use the root expression concept as type of the property that is to be put between the brackets.
</p>
</svelte:fragment></Note>

## Binary Expression Concept

A _binary expression concept_ is an expression concept that has two sub expressions, left and right operands,
and an operator, which in the concrete syntax goes in the middle. For example, the expression `4 + 5`
has as left operand `4`, as operator `+`, and as right operand `5`.

Any concrete binary expression concept needs to have a priority. For example, in mathematics the 
priority of the multiplication is higher than the priority of the plus. The expression 5 + 67 * 8 
should be read as 5 + (67 * 8), not as (5 + 67) * 8. The priorities are used by Freon to balance the
abstract syntax tree (see [Projectional Editing](/Background/Projectional_Editing#tree-balancing)). In
[Reference Shortcuts, Symbols, and Triggers](/Documentation/Defining_an_Editor/Reference_Shortcuts,_Symbols,_and_Triggers) you can
find more information on how to set the concrete syntax for the operand.

Binary expression concepts may extend one other concept, and implement multiple interfaces.

```txt
// DocuProject/src/defs/language-expressions.ast#L26-L46

// Basic binary expressions: plus, minus, multiply, divide
abstract binary expression BinaryExpression base DocuExpression {
    left: DocuExpression;
    right: DocuExpression;
}

binary expression PlusExpression base BinaryExpression {
    priority = 4;
}

binary expression MinusExpression base BinaryExpression {
    priority = 4;
}

binary expression MultiplyExpression base BinaryExpression {
    priority = 8;
}

binary expression DivideExpression base BinaryExpression {
    priority = 8;
}
```

## Limited Concept

A _limited concept_ is a concept that has a limited number of predefined instances. Actually, it is an extended
version of an enumeration. All instances become part of the standard library of your language.

A limited concept must always have a name property (`name: identifier;`), but if this is not provided
in the definition then it is automatically created. Furthermore, when a predefined instance does not provide a
value for the name, the name given in the .ast file is used. In this manner, you can define simple enumerations.

Limited concepts may extend another concept, and implement multiple interfaces. Note that the definition of the concept
includes the definition of the predefined instances. For example, the instances of `PremiumDays` are 
`Week`, `Month`, `Quarter`, `Semester`, and `Year`.

```ts
// DocuProject/src/defs/language-main.ast#L126-L143

limited InsuranceTheme {        // limited defined as a simple enumeration
    HomeTheme; HealthTheme; LegalTheme;
}

limited PremiumDays {           // limited with various options
    // if the 'name' property was not provided, it would have been generated
    name: identifier;
    nrOfDays: number;
    // notations 'name:' and '"name":' are both correct
    Week = { name: "Week", nrOfDays: 7 }
    Month = { "name": "Month", nrOfDays: 30 }
    // the following instance gets the name "Quarter"
    Quarter = { nrOfDays: 91 }
    // the following instance gets the name "Semester"
    Semester = { nrOfDays: 182 }
    // the following instance gets the name "Year"
    Year = { nrOfDays: 365 }
}
```

<Note>
<svelte:fragment slot="header"> No quotes around numbers and booleans.</svelte:fragment>
<svelte:fragment slot="content">
For number and boolean types, quotes (double or single) are not allowed around the values of properties of
instances of limited concepts.
</svelte:fragment>
</Note>

## Interface

An _interface_ is a concept that has no instances. It may extend multiple other interfaces.

```ts
// DocuProject/src/defs/language-main.ast#L94-L96

interface NamedType {
    name: identifier;
}
```

The next section will explain the options for concept properties.
