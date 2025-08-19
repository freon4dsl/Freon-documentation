<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Namespace Imports

Previously we have seen that the set of visible nodes of a namespace are the declared nodes and the visible 
nodes of the parent namespace. This standard namespaces can be added to. We call this **imports**.

## Defining Imports

When a namespace is imported into another namespace, its declared nodes are added to the visible nodes of the latter.
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

When the following is included in the scope file, the declared nodes in the `basedOn` property that is in the user's model,
will be included in the namespace identified by an `InsuranceProduct`. Note, that of course `InsuranceProduct` needs to be defined as a namespace.

```proto
// Insurance/src/defs/scoper-docu.scope#L3-L9

isNamespace { InsuranceProduct, BaseProduct, CalcFunction, Entity, AttributeRef }

InsuranceProduct {
    imports {
        self.basedOn;
    } 
}
```

## Using Imports to Define Inheritance

In this manner, you can support inheritance in your DSL. Say, `baseClass` is to represent the "super class" 
of `ClassWithInheritance` in your language, as follows.

```proto
concept ClassWithInheritance {
    name: identifier;
    reference baseClass?: ClassWithInheritance;
    methods: Method;
}

concept Method {
    name: identifier;
    parameters: Parameter[];
    body: Body;
}
```

To keep it brief, the definitions of `Parameter` and `Body` are not include. The only thing you need to know is 
that `Body` is an expression in which you can refer to a method.

Next, use a scope import to include all the declared nodes of the "super class" in the visible nodes of the "subclass".

```proto
ClassWithInheritance {
    imports {
        self.baseClass;
    } 
}

```

Now suppose, the user's model is this.

```
Class SmallBusiness 
  method calculateTurnover() {
    // some expression
  }
  method calculateRevenue() {
    // some expression
  }
  method calculateValueAddedTax() {
    // some expression
  }
  
Class DryCleaner super SmallBusiness
  method revenueAsPercentageOfTurnover() {
    calculateRevenue / calculateTurnover
  }  

```

The user is able to use the names of the methods of `SmallBusiness` because they are 
in the declared nodes of the namespace identified by `SmallBusiness`, and they are imported in the
`DryCleaner` namespace by the import statement in the scope file.

## Public and Private Properties
