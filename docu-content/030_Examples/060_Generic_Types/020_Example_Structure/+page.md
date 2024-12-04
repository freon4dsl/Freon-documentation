# The Metamodel Definition of the Example Language

To explain the type definition, we first need the metamodel of the example language.
Below is the complete .ast file. But first, let's explain some highlights.

Every type in the list of _expression_ - _declared type_ pairs is an instance of the AST
concept **TypeUsage**, which comes in two flavours: a type declaration,
and a type reference, that holds a reference to another AST node.

```ts
// TyperExample/src/defs/projectY.ast#L18-L26

abstract concept TypeUsage { // to be used wherever a type can be used, either a referred type of or declared type is correct
}

concept TypeRef base TypeUsage  {
    reference type: NamedType;
}

abstract concept TypeDecl base TypeUsage {
}
```

There are also two options for a type declaration, a generic type, and a unit of measurement. For this example,
we have used the names of the generic types from the Object Constraint Language: Set, Bag, Sequence, and Collection.
Note that these declarations are part of the AST. They are not type concepts themselves.

```ts
// TyperExample/src/defs/projectY.ast#L37-L47

concept GenericType base TypeDecl {
    baseType: TypeUsage;
    kind: GenericKind; // is it a set, sequence, bag, or anything else
}
limited GenericKind { Set; Sequence; Bag; Collection; }

concept UnitOfMeasurement base TypeDecl {
    reference baseType: PredefinedType; // is always NUMBER!!
    unit: UnitKind; // is it measured in km, kWh, grams, or anything else
}
limited UnitKind { Meters; Grams; kWh; Hours; }
```

The definitions of the expressions in the example language are straightforward. There are literal expressions for
strings, booleans, and number, as well as generic literals and unit literals.

```ts
// TyperExample/src/defs/projectY.ast#L61-L75

expression BooleanLiteral base Exp {
    xx: boolean;
}

expression UnitLiteral base Exp {
    // 62 kilogram, or 112 miles
    inner: NumberLiteral;
    unit: UnitKind;
}

expression GenericLiteral base Exp {
    // Set{ 12, 14, 16, 18 }
    content: Exp[];
    kind: GenericKind;
}
```

## The Complete AST Definition

```ts
// TyperExample/src/defs/projectY.ast

language projectY

model XX {
    units: XXunit[];
}

modelunit XXunit {
    lines: ExpWithType[];
    file-extension = "expr";
}

concept ExpWithType {
    expr: Exp;
    type: TypeUsage;
}

// definitions of types
abstract concept TypeUsage { // to be used wherever a type can be used, either a referred type of or declared type is correct
}

concept TypeRef base TypeUsage  {
    reference type: NamedType;
}

abstract concept TypeDecl base TypeUsage {
}

interface TopType {
}

concept NamedType implements TopType {
    name: identifier;
}

limited PredefinedType base NamedType { NUMBER; BOOLEAN; STRING; ANY; NULL; }

concept GenericType base TypeDecl {
    baseType: TypeUsage;
    kind: GenericKind; // is it a set, sequence, bag, or anything else
}
limited GenericKind { Set; Sequence; Bag; Collection; }

concept UnitOfMeasurement base TypeDecl {
    reference baseType: PredefinedType; // is always NUMBER!!
    unit: UnitKind; // is it measured in km, kWh, grams, or anything else
}
limited UnitKind { Meters; Grams; kWh; Hours; }

// definitions of expressions
abstract expression Exp {
}

expression NumberLiteral base Exp {
    xx: number;
}

expression StringLiteral base Exp {
    xx: string;
}

expression BooleanLiteral base Exp {
    xx: boolean;
}

expression UnitLiteral base Exp {
    // 62 kilogram, or 112 miles
    inner: NumberLiteral;
    unit: UnitKind;
}

expression GenericLiteral base Exp {
    // Set{ 12, 14, 16, 18 }
    content: Exp[];
    kind: GenericKind;
}


expression NamedExp base Exp {
    inner: Exp;
    myType: NamedType;
}

expression PlusExp base Exp {
    left: Exp;
    right: Exp;
}

```
