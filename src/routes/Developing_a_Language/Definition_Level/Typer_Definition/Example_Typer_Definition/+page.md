# Generic Types: an Example Typer Definition

This example shows how generic types and unit of measurements can be defined.

## The Typer Definition of the Example Language

Once the structure of the example language is defined, we are able to focus on
the typer definition. Because types in Freon do not reside within the AST,
but are completely separate from it, we need to associate a type concept with
each of our AST concepts.

### The Type Concepts

First, we define a type concept that corresponds
with our type declaration called _GenericType_, and one that corresponds with _UnitOfMeasurement_.
They are quite similar to their AST counterparts, but note that here we use **PiType** as type for the property.
We want to build a structure of type concepts, not of AST nodes!

```ts
// TyperExample/src/defs/projectY.type#L6-L14

type TT_GenericType {
    base: PiType;
    kind: GenericKind;
}

type TT_MeasurementType {
    base: PiType;
    unit: UnitKind;
}
```

### The Infertype Rules

Next, we associate the AST nodes with the type concepts, using infertype rules. When invoked, these rules will create a new instance of
the type concepts.

```ts
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

### The Conforms And Equals Rules

To be able to compare the types of expressions and of type declarations,
we need to state the _equalsto_ and/or _conformsto_ rules.

```ts
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
    Set conformsto Collection;
    Sequence conformsto Collection;
    Bag conformsto Collection;
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

```ts
// TyperExample/src/defs/projectY.type

typer

// What are types?
istype { TopType }

type TT_GenericType {
    base: PiType;
    kind: GenericKind;
}

type TT_MeasurementType {
    base: PiType;
    unit: UnitKind;
}

// Which concepts have a type?
hastype { Exp, TypeUsage }

// What are the top and bottom types?
anytype {
    conformsto PredefinedType:ANY; // PredefinedType:ANY is the least specific type
}

PredefinedType {
    PredefinedType:NULL conformsto anytype; // PredefinedType:NULL is the most specific type
    NUMBER conformsto STRING;
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
    infertype PredefinedType:NUMBER;
}

StringLiteral {
    infertype PredefinedType:STRING;
}

BooleanLiteral {
    infertype PredefinedType:BOOLEAN;
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
    Set conformsto Collection;
    Sequence conformsto Collection;
    Bag conformsto Collection;
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
