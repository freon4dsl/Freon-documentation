<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Namespace Alternatives

There are occasions where you do not want to adhere to the hierarchical nature of namespaces. For example,
when you want to implement a qualified name in your DSL, like `moduleA.partB`, where what comes after the dot
is something that is visible in `moduleA`, but possibly not in the namespace
in which this expression is located. 

This can be done using namespace alternatives. Where namespace imports
add nodes to the set of visible nodes, a namespace alternative both _removes and adds_ nodes. What is removed are the
visible nodes from the parent namespace. In the case of the expression `moduleA.partB` this would be the namespace 
in which the expression resides. What is added is another namespace (the alternative), which in the example 
would be the namespace identified by `moduleA`.

## Effect on the Namespace Tree

The effect of declaring a namespace alternative on the namespace tree is that the link of the namespace with its parent is 
removed, and a link to another namespace is made.
This second namespace is then used as if it where an imported namespace, i.e. only the non-private (public), declared nodes become visible.

For instance, suppose in the following figure that node Z1 has a namespace replacement to node A6, as shown by the green arrow. 
In that case, the link between Z1 and its parent namespace A1 is broken. The visible nodes of Z1 are its
declared nodes ([H1, J1, A7]), plus the declared nodes of A6 ([A6, F1, D6]).

<Figure
imageName={'documentation/AST-graph-with-alternative.png'}
caption={'AST with namespace alternative'}
figureNumber={1}
/>

When we leave out the AST nodes, the difference to the namespace tree, will become more clear. Note that similar to the effect 
of a namespace import, the effect of a namespace alternative is that the namespace tree is changed into a graph.

<Figure
imageName={'documentation/NS-graph-with-alternative.png'}
caption={'Namespace Graph with alternative'}
figureNumber={2}
/>

## Recursive Alternatives

Sometimes you want to add not only the declared nodes of the alternative namespace, but its alternative
nodes as well. We can define this in the scope
file by adding the keyword `recursive` in front of the alternative namespace. Each alternative in the list can
have its own keyword.

```proto
// Insurance/src/defs/scoper-docu.scope#L11-L15

AttributeRef {
	alternatives {
        self.owner().type();
    } 
}
```

## Example: A Qualified Name

Let's explore the case we mentioned earlier, where you want a qualified name in your DSL, like `moduleA.partB`. Suppose,
you would also like to 
be able to address local variables without the prefix, like `localVarA`. In that case you need to 
include concepts like the following in your .ast file. A `SimpleVarReference` represents a reference to local variables, 
a `ComplexVarReference` represents a reference with a prefix. To be prepared for the future where you might want 
to have modules within modules the target of a `ComplexVarReference` is either a `SimpleVarReference` (no prefix), or 
a `ComplexVarReference` (adding another prefix). The structure of your language would look like this:

```proto
// QName/src/defs/LanguageWithScopes.ast#L21-L31

abstract concept VarReference {
}

concept ComplexVarReference base VarReference {
    target: VarReference;
    reference module: Module;
}

concept SimpleVarReference base VarReference {
    reference target: Variable;
}
```

Now the scoper definition can be the following.

```proto
// QName/src/defs/LanguageWithScopes.scope

scoper for language QName

isNamespace { Module, VarReference }

VarReference {
    alternatives {
        recursive owner().if(Module);
        owner().if(ComplexVarReference).module;
    }
}

```

Both `Module` and `VarReference` are Namespaces, which means that we can define what is visible in both contexts.
For `Module` we simply used the standard hierarchical manner of building namespaces. But `VarReference` is different.
An instance of `VarReference` resides within a `Module`, so when the hierarchy of namespaces is used, everything 
that is visible in this `Module` would be visible in the `VarReference`. That is fine, when you want to refer to a local variable, 
because the local variables would indeed be visible in the surrounding `Module`. But it is not okay, when we want to refer 
to `partA` from `ModuleA`. In such an instance of a `ComplexVarReference` only what is visible in `ModuleA` should be visible.

So, we distinguish between these two cases by creating two alternative namespaces. The first expression is actually 
recreating the hierarchy of namespaces but _only_ when the owning namespace is an instance of Module. Then the visible nodes
consist of everything declared in this owning namespace, and because it is recursive, we get the nodes from its parents as well.
The second expression yields a result when the `VarReference` exists within an instance of `ComplexVarReference`. In this case 
it defines the `module` property of its owner as its namespace.

We cannot define the scope of `ComplexVarReference` only, because then a
`SimpleVarReference` within a `ComplexVarReference` would still have the scope of its parent, not of the `module` property of its parent.

To finish this off, let's revisit the editor definition to get the appearance and behaviour right. When you make the following entries 
in the .edit file, any `ComplexVarReference` would indeed look like `moduleA.partB`, and any `SimpleVarReference` 
would look like `partX`. Now, the behaviour that you would normally get is that the user must create either a `ComplexVarReference` 
instance, or a `SimpleVarReference` instance, and then add the option from the correct list. The behaviour that you would like, is probably
that the user is simply able to select an option from the correct list. The trick to get this behaviour is to add the reference
shortcuts as shown below (see [Ease of Editing](/Documentation/Defining_an_Editor).

```proto
// QName/src/defs/LanguageWithScopes.edit#L10-L20

ComplexVarReference {[
    ${module}.${target}
]
referenceShortcut = ${module}
}

SimpleVarReference {[
    ${target}
]
referenceShortcut = ${target}
}
```

## Scoping: The Algorithm

As promised, here is the complete algorithm for building the namespace graph in pseudocode.

```
FreNamespace {
    getDeclaredNodes(publicOnly: boolean): FreNamedNode[] {
        return all AST nodes in the subtree of which this namespace is the top,
        and the leafs are AST nodes that are themselves namespaces.
        The parameter 'publicOnly' indicates whether to include AST nodes that are marked private.
        The constant 'ALL' indicates that all nodes should be included, the constant 'PUBLIC_ONLY'
        indicates the opposite.
    }
    getParentNodes(): FreNamedNode[] {
        THIS.parentNamespace.getVisibleNodes();
    }
    getImportedNodes(list: FreNamespaceInfo[]): FreNamedNode[] {
        list.forEach(import => {
            import.namespace.getDeclaredNodes(PUBLIC_ONLY)
        plus
            if (import is recursive) {
                import.namespace.getImportedNodes(import.namespace.imports)
            }
        })
    }
    getAlternativeNodes(): FreNamedNode[] {
        getDeclaredNodes(ALL) plus
        getImportedNodes(THIS.alternatives)
    }
    getVisibleNodes(): FreNamedNode[] {
        if (has replacement) then
            getAlternativeNodes()
        else
            getDeclaredNodes(ALL) plus
            getParentNodes() plus
            getImportedNodes(THIS.imports)
        endif
    }
}

```

With all this knowledge, we are finally able to explain how to write a Freon scoper definition. You can find this on the next page.
