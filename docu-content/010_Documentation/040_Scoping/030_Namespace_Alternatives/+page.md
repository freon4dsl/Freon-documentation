<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>


# Namespace Alternatives

You can also indicate that a different namespace altogether should be used. In the following example,
the elements visible in
an `AttributeRef` are determined based on the type of its container, i.e. the type of its parent in the AST.

```proto
// Insurance/src/defs/scoper-docu.scope#L9-L11

}

AttributeRef {
```



### Shadowing

In the scope graph theory, shadowing is used to determine which node to choose if there are two nodes with the same name.
This is nessecary because scope graphs are orininally defined for use with text based parsers.
In Freon, we are using the AST as the basis for scoping, not a text that needs to be parsed.

Therefore, we don't need the concept of shadowing, as we can explicitly point to any of the nodes with the same name using either the node-id, or the (qualified) path to the node.

## What are Qualified Names in Freon?

Naming of nodes is relevant when referring to a node. If the node is in the same namespace as the reference,
the flat (single) name suffices. But when the node is in another namespace as the reference, its qualified name
is used to better distinguish which node is referred to. The qualified name of a node is its own name, prefixed
by the name of the namespace in which it is declared, which in turn will be prefixed by the name of its parent namespace
in the namespace tree, recursively until the root of the tree.

## Scoping: The Whole Story

```
FreNamespace {
    getDeclaredNodes(publicOnly: boolean): FreNamedNode[] {
        return all AST nodes in the subtree of which this namespace is the top,
        and the leafs are AST nodes that are themselves namespaces.
        The parameter 'publicOnly' indicates whether to include AST nodes that are marked private.
    }
    getParentNodes(): FreNamedNode[] {
        THIS.parentNamespace.getVisibleNodes();
    }
    getImportedNodes(list: NamespaceImports): FreNamedNode[] {
        list.forEach( NS => {
            NS.getDeclaredNodes(PUBLIC_ONLY)
        plus
            if (import is recursive) {
                NS.getImportedNodes(NS.imports)
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
