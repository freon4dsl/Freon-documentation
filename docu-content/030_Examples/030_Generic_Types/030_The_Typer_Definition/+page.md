---
title: Generic Types — Example Typer Definition
description: Learn how to define a typer for generic types and units of measurement in Freon. Explore infertype, equalsto, and conformsto rules and how type concepts connect to AST nodes.
tags: Freon, typer, generic types, measurement units, infertype, equalsto, conformsto, TT_GenericType, TT_MeasurementType, GenericType, UnitOfMeasurement, type system, example
---

# Generic Types — Example Typer Definition

This example shows how **generic types** and **units of measurement** can be defined.

## The Typer Definition of the Example Language

Once the structure of the example language is defined, we can focus on its **typer definition**.  
In Freon, types do **not** reside inside the AST—they are defined separately.  
We therefore need to associate a **type concept** with each relevant AST concept.

### The Type Concepts

First, we define type concepts that correspond to the AST’s `GenericType` and `UnitOfMeasurement`.  
They are similar to their AST counterparts, but note that here we use **FreType** as the property type.
We want to build a **hierarchy of type concepts**, not AST nodes.

```proto
// TyperExample/src/defs/projectY.type#L6-L14

type TT_GenericType {
    base: FreType;
    kind: GenericKind;
}

type TT_MeasurementType {
    base: FreType;
    unit: UnitKind;
}
```

### The Infertype Rules

Next, we associate AST nodes with their corresponding type concepts using **infertype** rules.  
When invoked, these rules create new instances of the type concepts.

```proto
// TyperExample/src/defs/projectY.type#L34-L46

GenericType {
    infertype TT_GenericType {
        base: typeof(self.baseType),
        kind: self.kind
    };
}

UnitOfMeasurement {
    infertype TT_MeasurementType {
        base: typeof(self.baseType),
        unit: self.unit
    };
}
```

### The Conforms and Equals Rules

To compare expression types with declared types, we define **equalsto** and **conformsto** rules.

```proto
// TyperExample/src/defs/projectY.type#L91-L118

TT_GenericType {
    equalsto x:TT_GenericType where {
            x.base equalsto self.base;
            x.kind equalsto self.kind;
        };
    conformsto other:TT_GenericType where {
            // both conditions must be true
            self.base conformsto other.base;
            self.kind conformsto other.kind;
        };
}

GenericKind {
    Set conformsto #GenericKind:Collection;
    Sequence conformsto #GenericKind:Collection;
    Bag conformsto #GenericKind:Collection;
}

TT_MeasurementType {
    equalsto aap:TT_MeasurementType where {
            aap.base equalsto self.base;
            aap.unit equalsto self.unit;
        };
    conformsto rr:TT_MeasurementType where {
            self.base conformsto rr.base;
            self.unit equalsto rr.unit;
        };
}
```

## The Complete Typer Definition

```proto
// TyperExample/src/defs/projectY.type

typer

// What are types?
istype { TopType }

type TT_GenericType {
    base: FreType;
    kind: GenericKind;
}

type TT_MeasurementType {
    base: FreType;
    unit: UnitKind;
}

// Which concepts have a type?
hastype { Exp, TypeUsage }

// What are the top and bottom types?
anytype {
    conformsto #PredefinedType:ANY; // PredefinedType:ANY is the least specific type
}

PredefinedType {
    NULL conformsto anytype; // PredefinedType:NULL is the most specific type
    NUMBER conformsto #PredefinedType:STRING;
}

// Which type does an expression have?
TypeRef {
    infertype self.type;
}

GenericType {
    infertype TT_GenericType {
        base: typeof(self.baseType),
        kind: self.kind
    };
}

UnitOfMeasurement {
    infertype TT_MeasurementType {
        base: typeof(self.baseType),
        unit: self.unit
    };
}

NumberLiteral {
    infertype #PredefinedType:NUMBER;
}

StringLiteral {
    infertype #PredefinedType:STRING;
}

BooleanLiteral {
    infertype #PredefinedType:BOOLEAN;
}

NamedExp {
    infertype self.myType;
}

PlusExp {
    infertype commonSuperType(self.left, self.right);
}

UnitLiteral {
    // 62 kilogram, or 112 miles
    infertype TT_MeasurementType {
                  base: typeof(self.inner),
                  unit: self.unit
              };
}

GenericLiteral {
    // Set{ 12, 14, 16, 18 }
    infertype TT_GenericType {
        base: typeof(self.content),
        kind: self.kind
    };
}

// Which types are 'equal' to each other?
NamedType {
    equalsto aa:NamedType where {
            aa.name equalsto self.name;
        };
}

TT_GenericType {
    equalsto x:TT_GenericType where {
            x.base equalsto self.base;
            x.kind equalsto self.kind;
        };
    conformsto other:TT_GenericType where {
            // both conditions must be true
            self.base conformsto other.base;
            self.kind conformsto other.kind;
        };
}

GenericKind {
    Set conformsto #GenericKind:Collection;
    Sequence conformsto #GenericKind:Collection;
    Bag conformsto #GenericKind:Collection;
}

TT_MeasurementType {
    equalsto aap:TT_MeasurementType where {
            aap.base equalsto self.base;
            aap.unit equalsto self.unit;
        };
    conformsto rr:TT_MeasurementType where {
            self.base conformsto rr.base;
            self.unit equalsto rr.unit;
        };
}

```
