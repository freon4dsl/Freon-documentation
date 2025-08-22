<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Basics and Terminology

Traditionally, scoping is about the questions of (1) which names are accessible/visible in a certain context, and (2) to
which AST node a visible name is bound. Because Freon creates a projectional editor, we can simplify these two
questions into one:

> **Which AST nodes are accessible/visible/usable within a certain context?**

Generally speaking, the context in the above question is a part of the AST. For instance, for a function
definition within a Java class, it is the AST fragment that represents this function. 
In this context, for instance, the function's parameters are visible. Outside of this part of
the AST the parameters are not visible.

## Namespaces

In the Freon scoper definition the focus lies on the context in which a reference may appear. These contexts 
are called **namespaces**. 
Every namespace is _a subtree of the AST where a certain set of nodes is visible_. Meaning that wherever in this subtree you may 
add a reference, the same set of nodes is available.

In the Freon meta language a namespace is defined using metatypes. All instances of such a metatype identify a namespace, namely the 
subtree of the AST whose top is such an instance. The leaves of this subtree are either the leaves of the AST, or any node that itself 
identifies a namespace. In other words, a namespace does not include the child nodes of another namespace.
In the following example all instances of the concepts `InsuranceProduct`, `BaseProduct`, 
`CalcFunction`, `Entity`, `AttributeRef` identify a namespace. Less formally these concepts are called namespaces, 
but remember that the actual namespace is not a single AST node, but the entire subtree rooted at that node.

```proto
// Insurance/src/defs/scoper-docu.scope#L3-L3

isNamespace { InsuranceProduct, BaseProduct, CalcFunction, Entity, AttributeRef }
```

## The Namespace Tree and the AST

All namespaces (or better, all nodes that identify a namespace) together form a tree. This tree is similar to, but not equal to the AST. 
The namespace tree is an overlay over the AST, where some nodes in the AST are namespaces, and some are not. 
The following figure shows an abstract syntax tree, where all nodes are named. In this example, we use a shorthand.
If the name of the node equals A1, then the node is of type A, if it equals H4, then the node is of type H, etc.

<Figure
imageName={'documentation/AST-graph.png'}
caption={'An example Abstract Syntax Tree'}
figureNumber={1}
/>

We now declare that all nodes of type A and Z are namespaces, as shown in the following figure. The namespaces are
colored red. In the example below, the 
namespace identified by node Z2, contains nodes [H2, D4, and A8], but does not contain nodes [F1, D7, and D8].

<Figure
imageName={'documentation/AST-plus-NS-graph.png'}
caption={'Namespace Tree as Overlay on AST'}
figureNumber={3}
/>

When we look at the namespaces only, the following tree appears. This is the **namespace tree** in which there are parent
namespaces, child namespaces, and sibling namespaces.

<Figure
imageName={'documentation/NS-graph.png'}
caption={'The Namespace Tree'}
figureNumber={2}
/>

## Which Nodes are Visible?

The set of nodes that are visible in a namespace is in most cases _not_ equal to the nodes in that
AST subtree. Most of the time the set of visible nodes is larger.
The reason is that namespaces are traditionally hierarchical (also called lexical scope), that is,
the nodes that are in the parent namespace are also visible in the child namespace, but 
the nodes from the child namespace are not visible in the parent namespace,
except for the name of the child namespace itself.

To define this more clearly we identify five sets of nodes for every namespace.

1. The **declared nodes**: all nodes that have a property `name:identifier` (or _named nodes_) in the namespace subtree.
2. The **parent nodes**: all named nodes that are visible in the parent namespace of this namespace.
3. The **imported nodes**: all declared nodes from other namespaces that have an _import relationship_ with this namespace. 
    This is explained in [Namespace Imports](/Documentation/Defining_Scope_Rules/Namespace_Imports).
4. The **alternative nodes**: all declared nodes from other namespaces that have an _alternative relationship_ with this namespace.
   This is explained in [Namespace Alternatives](/Documentation/Defining_Scope_Rules/Namespace_Alternatives).
5. The **visible nodes**: all named nodes that are accessible/visible/usable within this namespace. This is the set of 
   nodes that we are interested in. We build this set of nodes based on the other four sets.
 
Using these definitions, we can determine the set of declared nodes in any namespace in our example.
The declared nodes of namespace A1, for instance, are the nodes [B1, C3, C1, B2, C2, D1, E1, A2, E2,
Z1, D2, A3, E3, A4, Z2, and A5]. Whereas the declared nodes of namespace Z2 are [H2, D4, and A8]. The
declared nodes are _always_ part of the set of visible nodes.
      
In the next pages we will explain how the set of visible nodes is determined exactly. 
In [Namespace Alternatives](/Documentation/Defining_Scope_Rules/Namespace_Alternatives) the algorithm - in pseudocode - that is used,
is included. 
For now, you can take the easy route, which 
is to say that the visible nodes of a namespace are all its declared nodes plus all visible nodes of its parent namespace. Note the 
recursive nature of this definition,
the visible nodes of the parent namespace are its declared nodes plus the visible nodes of its parent namespace. When 
there are no **imports** or **alternatives** this is the rule to stick with.

As an example, let's again focus on
the namespace identified by Z2. It's declared nodes are [H2, D4, and A8], it's parent namespace is A1. The declared nodes of namespace A1 are
[B1, C3, C1, B2, C2, D1, E1, A2, E2, Z1, D2, A3, E3, A4, Z2, and A5], and A1 does not have a parent namespace, thus the visible nodes of [Z2] are:
[H2, D4, A8, B1, C3, C1, B2, C2, D1, E1, A2, E2, Z1, D2, A3, E3, A4, Z2, and A5]. So when a reference is added anywhere within namespace Z2, it is 
only valid when it references one of the nodes from this set. In the editor this means that the dropdown menu will contain these names only.

## Shadowing

In the scope graph theory, shadowing is used to determine which node to choose if there are two nodes with the same name 
visible in a certain context. Normally, the node from the nearest namespace will have preference over other nodes.
This is necessary because scope graphs are originally defined for use with text based parsers.
In Freon, we are using the AST as the basis for scoping, not a text that needs to be parsed.
Therefore, we don't need the concept of shadowing, as we can explicitly point to any node using
the node-id. In the editor the dropdown list for a reference will show options with the same name, but a different origin.

[//]: # (TODO add screenshot)
<Figure
imageName={'documentation/dropdown-with-same-names.png'}
caption={'Dropdown list with two nodes with the same name'}
figureNumber={1}
/>

In the next pages, the notions of [namespace imports](/Documentation/Defining_Scope_Rules/Namespace_Imports) 
and [namespace alternatives](/Documentation/Defining_Scope_Rules/Namespace_Alternatives) are explained. The last page of this section shows how to
use all of these notions to create a [Freon scoper definition](/Documentation/Defining_Scope_Rules/The_Scoper_Definition).
