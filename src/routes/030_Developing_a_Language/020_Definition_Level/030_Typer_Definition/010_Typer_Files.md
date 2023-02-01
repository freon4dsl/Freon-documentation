<script>
    import Note from "../../../../lib/notes/Note.svelte";
</script>

# The Typer Definition File
In the typer definition file (with extension `.type`) you can indicate typing rules for every 
*concept* or *interface* in your language. The typing rules come in four categories. Each category
is there to answer one of the following questions.

1. Which *concepts* or *interfaces* are considered to be types?
2. Which *concepts* or *interfaces* are considered to have a type?
3. How to determine the type of a *concept* or *interface*?
4. Which types are considered to be equal or conforming?

Note that (for now) these sections need to be in the `.type` file in this order.

## Types or Type Concepts
In Freon all types are completely separate from the elements of your AST. These are called **Type Concepts**, 
which all implements the interface **PiType**. Type Concepts can be defined in two ways. Either they are defined 
in the `.type` file, or some AST nodes are declared to be types. In the latter case, Freon generates a `Type Concept` 
which holds a reference to the AST node. 

To indicate which AST concepts are considered to be types in your language,
the keyword `isType` is used, followed by all types in your language between curly brackets. 

```ts
// docu-project/defs/typer-docu.type#L4-L4

istype { NamedType }
```

To define new type concepts you can use a simplified version of the concept definition in the .ast files.
The properties may only be instances of other type concepts, or references to limited concepts. The property
`base` in the next example is an instance of the interface `PiType`, whereas the property `kind` refers to
the limited concept `GenericKind`.

```ts
// docu-project/defs/typer-docu.type#L6-L9

type GenericType {
    base: PiType;
    kind: GenericKind;
}
```

Note that is it often good practise to have a common superclass or interface for all your types,
but this is not necessary.

## Terms That Have a Type
Not all AST nodes need to have a type associated to it. Only those nodes for which you
need a validation rule, or have another reason to require a type, need to be marked as
having a type. We refer to those AST nodes as **terms**, so as not to confuse these with
[`expression concepts`](/030_Developing_a_Language/010_Default_Level/010_Defining_the_Language_Structure), 
which have a different meaning. 

You can indicate which AST nodes are terms by the keyword `hasType` followed by all terms in 
your language between curly brackets.

```ts
// docu-project/defs/typer-docu.type#L12-L12

hastype { DocuExpression, DocuType, CalcFunction, Parameter }
```

## Inference Rules

In order to determine the type of a term, there need to be a rule, called  an **inference rule**,
for each concept or interface that is marked `hasType`. Each of these rules should result in a type concept.
The following example gives an inference rule that states that the type of calculation function is the 
value of its attribute `declaredType`.

```ts
// docu-project/defs/typer-docu.type#L18-L20

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
present, the type of the AST node is the `type concept` generated for this AST node.

In an inference rule, as in other definition files, it is possible to use 
the predefined instances of a **limited concept**.

```ts
// docu-project/defs/typer-docu.type#L27-L29

RiskAdjustmentRef {
    infertype PercentageType:Percentage;
}
```

## Type Equals and Type Conformance Rules
The last section in the type definition is where rules are given that state which types 
are considered equal or conforming. Each rule can have two entries: the **conformsto** and 
the **equalsto** entries. In these it is also possible to use the predefined 
instances of a limited concept.

```ts
// docu-project/defs/typer-docu.type#L79-L86

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

In a condition of a `where-clause` you may use `conformsto`. In that case, invocation of the rule will produce the cartesian product of
all super concepts of the properties in the conditions. For an 
example, see [Typer Example](/030_Developing_a_Language/020_Definition_Level/030_Typer_Definition/030_Example_Typer_Definition).

<Note>
<svelte:fragment slot="content">
Be careful with the use of <b>conformsto</b> within where-clauses because this can lead to an 
explosion of newly created type concept instances.
</svelte:fragment>
</Note>

<Note>
<svelte:fragment slot="content">
Type concept instances can not be compared based on their identity, 
instead you will need to use an <i>equalsto</i> entry. 
</svelte:fragment>
</Note>

## Rules That Apply to Any Concept
Conformance and other rules can also be defined to apply to **any** concept. Obviously, this means that 
any instance of any concept conforms to the given value.

```ts
// typer-example/defs/projectY.type#L21-L28

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
