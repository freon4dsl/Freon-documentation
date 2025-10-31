---
title: Namespace Imports
description: Learn how to extend visibility in Freon by importing namespaces, define inheritance-like behavior, use recursive imports, and control visibility with public and private properties.
tags: namespace imports, scoping, visibility, recursive imports, private properties, Freon, DSL development, scope rules
---

<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Namespace Imports

Previously, we saw that the set of visible nodes in a namespace consists of the nodes it declares and 
the nodes visible in its parent namespace. This standard visibility can be extended with **imports**. 
When a namespace is imported into 
another namespace, its declared nodes are added to the visible nodes of the latter.

In the following example, `basedOn` is in the language structure definition (`.ast` file) a property of the
`InsuranceProduct` concept. 

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

If the following import statement is included in the .scope file, the declared nodes in the `basedOn` property in the user's model
will be included in the namespace identified by an `InsuranceProduct`. Note that both `InsuranceProduct` and 
`BaseProduct` (the type of `basedOn`) need to be defined as a namespace.

```proto
// Insurance/src/defs/scoper-docu.scope#L3-L9

isNamespace { InsuranceProduct, BaseProduct, CalcFunction, Entity, AttributeRef }

InsuranceProduct {
    imports {
        self.basedOn;
    } 
}
```

## Effect on the Namespace Tree
A namespace import effectively turns the namespace tree into a graph, like references make the abstract syntax _tree_ become a graph.
For instance, when the namespace A8 is imported into namespace A3 an extra edge is made between nodes A3 and A8, as shown in 
the next figure. This edge signifies the inclusion of the declared nodes of A8 ([F1, D7, D8]) in the visible nodes of A3.

<Figure
imageName={'documentation/AST-plus-reference.png'}
caption={'Graph showing an import between Namespace nodes'}
figureNumber={1}
/>

## Example: Defining Inheritance

Using namespace imports, you can support some kind of inheritance in your DSL. Suppose `baseClass` represents the "super class" 
of `ClassWithInheritance` in your language, as follows.

```proto
/* The .ast file */

concept ClassWithInheritance {
    name: identifier;
    reference baseClass?: ClassWithInheritance;
    methods: Method[];
}

concept Method {
    name: identifier;
    parameters: Parameter[];
    body: Body;
}
```

For brevity, the definitions of `Parameter` and `Body` are omitted. The only thing you need to know is 
that `Body` is an expression in which you can refer to a method.

Next, use a scope import to include all the declared nodes of the "super class" in the visible nodes of the "subclass".

```proto
/* The .scope file */

ClassWithInheritance {
    imports {
        self.baseClass;
    } 
}

```

Now suppose, the user's model is this. (Again, for brevity, we do not include the editor definition, 
but the keywords `class`, `super`, and `method` are a definite giveaway to the link between concrete 
and abstract syntax.😊)

```
class SmallBusiness 
  method calculateTurnover() {
    // some expression
  }
  method calculateRevenue() {
    // some expression
  }
  method calculateValueAddedTax() {
    // some expression
  }
  
class DryCleaner super SmallBusiness
  method revenueAsPercentageOfTurnover() {
    // expression using references to calculateRevenue and calculateTurnover
  }  

```

The user can reference the methods of `SmallBusiness` because they are 
in the declared nodes of the namespace identified by `SmallBusiness`, and they are imported in the
`DryCleaner` namespace by the import statement in the scope file.

## Recursive Imports

Sometimes you may want to include not only the declared nodes of the imported namespace, but its imported 
nodes as well. In the example above, where a sort of inheritance is defined, you would want the
methods of the superclass of the superclass also to be included. We can define this in the scope 
file by simply adding the keyword `recursive` in front of the import. Each import in the list can 
have its own keyword, in this way you have a fine-grained control over what is added.

```proto
ClassWithInheritance {
    imports {
        recursive self.baseClass;
        self.someOtherProperty;
    } 
}

```

## Public and Private Properties

To add an even finer control over what and what is not imported, you can add the keyword 'private' 
to the definition of properties in the .ast file. (Not in the .scope file!) Any property that is 
thus marked `private` will not be included in the set of imported nodes. The marking does not affect
the declared nodes, only the imported nodes of any namespace that imports a namespace with private 
properties. This means that properties marked `private` are visible within their own namespace, 
but not when that namespace is imported elsewhere.

Suppose that in the inheritance example we want to have private methods. We could adjust the .ast file like this:

```proto
concept ClassWithInheritance {
    name: identifier;
    reference baseClass?: ClassWithInheritance;
    methods: Method[];
    private privateMethods: Method[];
}
```

Suppose further that the user model is the following:

```
class SmallBusiness 
  method calculateTurnover() {
    // some expression, where internalCalculation may be referenced
  }
  method calculateRevenue() {
    // some expression, where internalCalculation may be referenced
  }
  method calculateValueAddedTax() {
    // some expression, where internalCalculation may be referenced
  }
  private method internalCalculation() {
    // some expression, where internalCalculation may be referenced
  }

  
class DryCleaner super SmallBusiness
  method revenueAsPercentageOfTurnover() {
    // expression using references to calculateRevenue, calculateTurnover, as well as someOtherCalculation, but NOT to internalCalculation
  }  
  private method someOtherCalculation() {
    // expression using references to calculateRevenue, calculateTurnover, as well as someOtherCalculation, but NOT to internalCalculation 
  }
```

Now the visible nodes of `SmallBusiness` would include `internalCalculation`, whereas the visible nodes of
`DryCleaner` would not. It would, however, include `someOtherCalculation`. But, if `DryCleaner` was 
imported in another namespace, `someOtherCalculation` would not be part of that namespace.

The next page will explain how to leave out the standard hierarchical namespaces (lexical scope) 
using [namespace alternatives](/Documentation/Defining_Scope_Rules/Namespace_Alternatives).
