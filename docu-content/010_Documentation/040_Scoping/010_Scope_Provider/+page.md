<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Scope Provider

Most current language workbenches 
focus heavily on syntax. Mechanism for specifying static and dynamic semantics - including scoping - are still 
experimental or limited. As one of the first language workbenches, Freon offers a meta language to 
declaratively define scoping rules. 

The way Freon handles scoping is based on the scope graph theory that 
was developed at Delft University by Eelco Visser a.o.
(see, for
instance, <a href="https://pl.ewi.tudelft.nl/research/projects/scope-graphs/" target="_blank">https://pl.ewi.tudelft.nl/research/projects/scope-graphs/</a>).
Spoofax, a language workbench created at Delft University, is the only other workbench that provides 
a meta language for scoping. Note, however, that although both meta languages are based on the same ideas,
the terminologies used are different.

To explain the Freon scoper definition, we need to build some common ground about scoping, and the concepts 
used to define scoping. So please, bare with, the final paragraphs on this page do explain how to write a 
Freon scoper definition.

## Back to the Basics

Traditionally, scoping is about the questions of (1) which names are accessible/visible in a certain context, and (2) to
which AST node a visible name is bound. Because Freon creates a projectional editor, we can simplify these two
questions into one:

> **Which AST nodes are accessible/visible/usable within a certain context?**

Generally speaking, the context in the above question is a part of the AST. For instance, for a function
definition within a Java class, it is the part of the AST that represents this function which is the context. 
In this context, for instance, the function's parameters are visible. Outside of this part of
the AST the parameters are not visible.

## Namespaces

In the Freon scoper definition the focus lies on the context in which a reference may appear. These contexts 
are called **namespaces**. 
Every namespace is a subtree of the AST where a certain set of nodes is visible. Meaning that wherever in this subtree you may 
add a reference, the same set of nodes is available.

In the Freon meta language a namespace is defined using metatypes. All instances of such a metatype identify a namespace, namely the 
AST subtree whose top is such an instance. The leafs of the subtree are either the leafs of the AST, or any node that itself 
identifies a namespace. In other words, a namespace does not include the child nodes of another namespace.
In the following example all instances of the concepts `InsuranceProduct`, `BaseProduct`, 
`CalcFunction`, `Entity`, `AttributeRef` identify a namespace. In a more relaxed manner of speaking these concepts are called namespaces, 
but remember that the actual namespace is not the single node of, let's say, type `BaseProduct`, but the subtree of which it is the top.

```proto
// Insurance/src/defs/scoper-docu.scope#L3-L3

isNamespace { InsuranceProduct, BaseProduct, CalcFunction, Entity, AttributeRef }
```

Model units and interfaces can be used to define namespaces as well. Any instance of a concept that implements a namespace interface will 
be regarded as a namespace.

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
namespace identified by node Z2, contains nodes [Z2, H2,and D4], but does not contain nodes [F1, D7, and D8].

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

## Which Nodes are Visible in a Namespace?

The set of nodes that are visible in a namespace is in most cases _not_ equal to the nodes that
part of the namespace subtree. Most of the time the set of visible nodes is larger.
The reason is that namespaces are traditionally hierarchical (also called lexical scope), that is,
the nodes that are declared in the parent namespace are also visible in the child namespace.
On the other hand, in the parent namespace the nodes from the child namespace are not visible,
except for the name of the child namespace itself.

To define this more clearly we identify five sets of nodes for every namespace.

1. The **declared nodes**: all nodes that have a property `name:identifier` (or _named nodes_) in the namespace subtree. 
    Using this definition, we can determine the set of declared nodes in any namespace in our example.
    The declared nodes of namespace A1, for instance, are the nodes [B1, C3, C1, B2, C2, D1, E1, A2, E2,
    Z1, D2, A3, E3, A4, Z2, and A5]. Whereas namespace Z2 holds as declared nodes the set of [H2, D4, and A8]. The 
    declared nodes are _always_ part of the set of visible nodes.
2. The **parent nodes**: all named nodes that are visible in the parent namespace of this namespace.
3. The **imported nodes**: all declared nodes from other namespaces that have an _import relationship_ with this namespace. 
    This import relationship, and how to define it in the scope file are 
    explained in [Scoping Imports](/Documentation/Scoping,_Typing,_and_Validating/Scoping_Imports).
4. The **alternative nodes**: all declared nodes from other namespaces that have an _alternative relationship_ with this namespace.
   This alternative relationship, and how to define it in the scope file are
   explained in [Scoping Alternatives](/Documentation/Scoping,_Typing,_and_Validating/Scoping_Alternatives).
5. The **visible nodes**: all named nodes that are
      accessible/visible/usable within this namespace. This is the set of nodes that we are interested in. We build
      this set of nodes based on the other four sets.
      
In the next pages we will explain how the set of visible nodes is determined exactly. 
In [Scoping Alternatives](/Documentation/Scoping,_Typing,_and_Validating/Scoping_Alternatives) the algorithm - in pseudocode - that is used,
is included.

For now, you can take the easy route, which 
is to say that the visible nodes of a namespace are all its declared nodes plus all visible nodes of its parent namespace. Note the 
recursive nature of this definition,
the visible node of the parent namespace are its declared nodes plus the visible nodes of its parent namespace. 

As an example, let's again focus on
the namespace identified by Z2. It's declared nodes are [H2, D4, and A8], it's parent namespace is A1. The declared nodes of namespace A1 are
[B1, C3, C1, B2, C2, D1, E1, A2, E2, Z1, D2, A3, E3, A4, Z2, and A5], and A1 does not have a parent namespace, thus the visible nodes of [Z2] are:
[H2, D4, A8, B1, C3, C1, B2, C2, D1, E1, A2, E2, Z1, D2, A3, E3, A4, Z2, and A5]. So when a reference is added anywhere within namespace Z2, it is 
only valid when it references one of the nodes from this set. In the editor this means that the dropdown menu will contain these names only.

## The Freon Scoper Definition

The **scope provider definition** (or **scoper** for short), in which you can define your DSL's scoping rules, must be in a file with 
the extension `.scope`. All files with this extension in
the [_defs_ folder](/Documentation/Overview/Getting_Started#template-project-startup-3) (i.e. the folder were you keep your definition files) are combined into one scoper definition.
Any `.scope` file should start with declaring the language for which the scoper is defined.

```proto
// Insurance/src/defs/scoper-docu.scope#L1-L2

scoper for language InsuranceModel

```

The default scoper, which is the scoper provided when no scope definition is given,
simply regards the complete model of your user as the one and only namespace, meaning that every node/name is visible everywhere.

On the next page the _import relationship_ between namespaces, as well as its effect on the set of visible nodes is explained.
