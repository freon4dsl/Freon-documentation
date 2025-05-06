<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# The Freon Approach to Scoping

Scoping in Freon is based on namespaces. The theory behind this is the 
scope graph theory that was developed at Delft University by Eelco Visser e.a.
(Reference!)

## The Namespace Tree and the Abstract Syntax Tree
In Freon you can declare that certain types of nodes are namespaces. A namespace is 
the container that holds of a set of declarations of named AST nodes. 

All namespaces together form a tree. This tree is similar to, but not equal to the AST. The namespace tree 
is an overlay over the AST, where some nodes in the AST are namespaces, and some are not.

<Figure
imageName={'documentation/AST-graph.png'}
caption={'An example Abstract Syntax Tree'}
figureNumber={1}
/>

<Figure
imageName={'documentation/NS-graph.png'}
caption={'The Namespace Tree'}
figureNumber={2}
/>

<Figure
imageName={'documentation/AST-plus-NS-graph.png'}
caption={'Namespace Tree as Overlay on AST'}
figureNumber={3}
/>

The declared named nodes in a namespace are all named nodes in the AST from the namespace node 
to any child namespace node.
(Figure!)

The names of these nodes are flat, i.e. they are not qualified.

### How to define namespaces in Freon

In the .scope file by stating 

`isNamespace { conceptA, conceptB, etc }`

## Namespaces and the Set of Visible Named Nodes

The named nodes that are visible in a namespace is not equal to the named nodes that 
are declared in that namespace. Most of the time the set of visible names is larger. The reason is 
that namespaces are hierarchical, that is, the named nodes declared in the parent namespace are also visible 
in the child namespace. On the other hand, the parent namespace does not know the named nodes from the 
child. (Note that the parent usually does know the name of the child itself.)
(Example!)

## Adapting the namespace Hierarchy

There are three ways in which the namespace hierarchy can be changed.

1. Additions
2. Replacements (or Alternatives)
3. Exports

## Namespace Additions

Any namespace can be augmented with the set of names that are declared in another namespace.
Note, only the names from the namespace itself, not all visible names are added.
(Example!)

A namespace addition makes the namespace tree actually a graph, like references make a graph from the AST.
(Figure!)

### How to Define Namespace Additions in Freon

(Example!)

## Namespace Replacements

Any namespace can break the hierarchy by declaring an alternative namespace. In the hierarchical tree the 
link of the namespace with its parent is removed, and a link to another namespace is made. This second namespace 
takes over the role of the parent, with the exception that named nodes declared in the parent 
of the second namespace are not visible in the first.
(Example!)

### How to Define Namespace Replacements in Freon

(Example!)

## Namespace Exports

As explained, a parent namespace does not know the named nodes from the
child namespace. However, any namespace can break the hiding of (some of) its declared names 
by stating that such a declaration is public. This means that the declared named 
node is visible in the parent namespace. The parent namespace may re-export the declaration, but need not.
(Example!)

### How to Define Namespace Exports in Freon

(Example!)

## What are Qualified Names in Freon?

Naming of nodes is relevant when referring to a node. If the node is in the same namespace as the reference, 
the flat (single) name suffices. But when the node is in another namespace as the reference, its qualified name
is used to better distinguish which node is referred to. The qualified name of a node is its own name, prefixed 
by the name of the namespace in which it is declared, which in turn will be prefixed by the name of its parent namespace
in the namespace tree, recursively until the root of the tree.
