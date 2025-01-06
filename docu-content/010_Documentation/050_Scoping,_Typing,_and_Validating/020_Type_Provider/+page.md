<script>
    import Note from "$lib/notes/Note.svelte";
</script>

# Type Provider

Typing determines which elements are permissible in specific locations within a model or Abstract 
Syntax Tree (AST). For example, in the expression `a + 6`, it is generally expected that `a` represents 
a numeric value, as other types of values would not be valid in this context.

Freon addresses many potential typing issues by enforcing the use of a typed metamodel. This ensures 
that when a certain type, such as a boolean, is required, only a boolean value can be provided. However, 
there are scenarios where the metamodel permits a broader range of values than desired, which 
can lead to unintended flexibility.

The **type provider** (or **typer**, for short) definition provides the information necessary to
determine the type of element. Any part of the typer
definition must be included in a file with the extension `.type`. All files with this extension in the [_defs_ folder](/Documentation/Overview/Getting_Started#template-project-startup-3)
(i.e. the folder were you keep your definition files) are combined into one typer definition.

# Typing Rules

In the typer definition file you can indicate typing rules for every
_concept_ or _interface_ in your language. The typing rules come in four categories. Each category
is there to answer one of the following questions.

1. Which _concepts_ or _interfaces_ are considered to be types?
2. Which _concepts_ or _interfaces_ are considered to have a type?
3. How to determine the type of a _concept_ or _interface_?
4. Which types are considered to be equal or conforming?

Note that these sections need to be in the `.type` file in this order.

## Types or Type Concepts

In Freon all types are completely separate from the elements of your AST. These are called **type concepts**,
which all implements the interface **FreType** from the `@freon4dsl/core` package. Type concepts can be 
defined in two ways. Either they are specified in the `.type` file, or some AST nodes are declared to 
be types. In the latter case, Freon generates a type concept which holds a reference to the AST node.

To indicate which AST concepts are considered to be types in your language,
the keyword `isType` is used, followed by all types in your language between curly brackets, 
and separated by commas.

```proto
// DocuProject/src/defs/typer-docu.type#L4-L4

istype { NamedType }
```

To define new type concepts you can use a simplified version of the concept definition in the .ast files.
The properties may only be instances of other type concepts, or references to limited concepts. The property
`base` in the next example is an instance of the interface `FreType`, whereas the property `kind` refers to
the limited concept `GenericKind`.

```proto
// DocuProject/src/defs/typer-docu.type#L6-L9

type GenericType {
    base: FreType;
    kind: GenericKind;
}
```

Note that is it often good practise to have a common superclass or interface for all your types,
but this is not necessary.

## Terms That Have a Type

Not all AST nodes need to have a type associated to it. Only those nodes for which you
need a validation rule, or have another reason to require a type, need to be marked as
having a type. We refer to those AST nodes as **terms**, so as not to confuse these with
[`expression concepts`](/Documentation/Creating_the_Metamodel/Language_Structure#expression-concept-5),
which have a different meaning.

You can indicate which AST nodes are terms by the keyword `hasType` followed by all terms in
your language between curly brackets, and separated by commas.

```freon
// DocuProject/src/defs/typer-docu.type#L12-L12

hastype { DocuExpression, DocuType, CalcFunction, Parameter, RiskRef, PayoutRef }
```

## Inference Rules

In order to determine the type of a term, there needs to be a rule, called an **inference rule**,
for each concept or interface that is marked `hasType`. Each of these rules should result in a type concept.

The following example gives an inference rule that states that the type of calculation function is the
value of its attribute `declaredType`. This value is an instance of `DocuType`, which indeed was declared to
represent a type by the above declaration. First, we show the metamodel definition.

```freon
// DocuProject/src/defs/language-main.ast#L68-L74

concept CalcFunction {
    name: identifier;                   // the name
    description?: Description;          // an optional description
    declaredType : DocuType;            // the type
    body: DocuExpression;               // the actual calculation definition
    parameters: Parameter[];            // any parameters
}
```

And, the typer definition looks like this.

```freon
// DocuProject/src/defs/typer-docu.type#L18-L20

CalcFunction {
    infertype self.declaredType;
}
```


<Note>
<svelte:fragment slot="content">This is a valid inference rule, only if 'declaredType' is an instance 
of a concept that is marked 'isType'.
</svelte:fragment>
</Note>

Concepts that are types (as indicated by `isType`) can also be terms. If an inference rule
is present, this rule will determine the type of such a term. If no rule is
present, the type of the AST node is the _type concept_ generated for this AST node.

In an inference rule, as in other definition files, it is possible to use
the predefined instances of a **limited concept**.

```freon
// DocuProject/src/defs/typer-docu.type#L27-L29

RiskAdjustmentRef {
    infertype PercentageType:Percentage;
}
```

## Type Equals and Type Conformance Rules

The last section in the type definition is where rules are given that state which types
are considered equal or conforming. Each rule can have two entries: the **conformsto** and
the **equalsto** entries. Within these entries it is also possible to use the predefined
instances of a limited concept.

```freon
// DocuProject/src/defs/typer-docu.type#L81-L89

// Which types are 'equal' to each other?
NamedType {
    equalsto aa:NamedType where {
            aa.name equalsto self.name;
        };
    conformsto other:NamedType where {
            other.name equalsto self.name;
        };
}
```

The **where-clause** in the above example can be used when a type has some structure. For every property
in the type concept a condition is given. If all conditions evaluate to true then the `where-clause` results in true.

<Note>
<svelte:fragment slot="content">
Type concept instances can not be compared based on their identity,
instead you will need to use an <i>equalsto</i> entry.
</svelte:fragment>
</Note>

## Use of **conformst**

In a condition of a `where-clause` you may use `conformsto`. In that case, invocation of the rule will produce the cartesian product of
all super concepts of the properties in the conditions. For an
example, see [Typer Example](/Examples/Generic_Types).

<Note>
<svelte:fragment slot="content">
Be careful with the use of <b>conformsto</b> within where-clauses because this can lead to an 
explosion of newly created type concept instances.
</svelte:fragment>
</Note>


## Rules That Apply to Any Concept

Conformance and other rules can also be defined to apply to **any** concept. Obviously, this means that
any instance of any concept conforms to the given value.

```freon
// TyperExample/src/defs/projectY.type#L21-L28

    conformsto PredefinedType:ANY; // PredefinedType:ANY is the least specific type
}

PredefinedType {
    PredefinedType:NULL conformsto anytype; // PredefinedType:NULL is the most specific type
    NUMBER conformsto STRING;
}

```

<Note>
<svelte:fragment slot="content">
Anytype rules must be included after the 'hasType' rules and before the inference rules. 
</svelte:fragment>
</Note>
