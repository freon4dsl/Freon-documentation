---
title: Freon Scoping Terminology and Reference
description: A complete alphabetical reference for Freon’s scoping meta-language — including keywords, functions, and related concepts used in `.scope` definitions.
tags: Freon documentation, scoping, namespaces, scope graph, meta-language, DSL development, Freon Language Workbench
---

# Freon Scoping Terminology & Reference

This page serves as a quick reference for all terminology, keywords, and helper functions used in Freon’s **scoping meta-language**.  
It complements the conceptual guides on [Namespace Imports](/Documentation/Defining_Scope_Rules/Namespace_Imports), [Namespace Alternatives](/Documentation/Defining_Scope_Rules/Namespace_Alternatives), and [The Freon Scoper Definition](/Documentation/Defining_Scope_Rules/The_Scoper_Definition).

---

## 🧩 General Concepts

**Alternative Nodes**  
Declared nodes from namespaces that have an _alternative relationship_ with the current namespace. Defined with the `alternatives` block.

**Declared Nodes**  
All named nodes (`name: identifier`) within a namespace’s AST subtree, excluding nodes that themselves identify other namespaces.

**Imported Nodes**  
Declared nodes of other namespaces included via an `imports` block. `private` properties are excluded.

**Namespace**  
A subtree of the abstract syntax tree (AST) rooted at a node declared as a namespace. Every node within this subtree shares the same visibility rules.

**Namespace Graph / Tree**  
The structure formed by all namespaces. When no imports or alternatives exist, it forms a tree. When they do, it becomes a directed graph.

**Parent Nodes**  
Visible nodes from the parent namespace of the current one. Contribute to hierarchical (lexical) scoping.

**Private Properties**  
Properties in `.ast` files marked with the `private` keyword.  
They remain visible within their own namespace but are excluded from imported nodes.

**Visible Nodes**  
The complete set of named nodes accessible in a namespace. Built recursively from declared, imported, alternative, and parent nodes.

---

## 🔑 Meta-language Keywords

**`alternatives`**  
Defines replacement or non-hierarchical visibility rules between namespaces.
```proto
InsuranceProduct {
    alternatives { self.basedOn; recursive self.themes; }
}
```

**`imports`**
Adds the declared nodes of other namespaces to the current namespace’s visible nodes.
Each property listed may optionally be marked recursive.
```proto
InsuranceProduct {
imports { self.basedOn; recursive self.themes; }
}
```

**`isNamespace`**
Declares which concepts, model units, or interfaces identify namespaces.
```proto
isNamespace { InsuranceProduct, BaseProduct, CalcFunction, Entity, AttributeRef }
```

**`private`**
Used in .ast files to mark properties that should not be imported into other namespaces.
```proto
private privateMethods: Method[];
```

**`recursive`**
Indicates that the imported or alternative namespace’s own imports or alternatives should also be included.

**`self`**
Optional prefix for referencing direct properties within scoping expressions.
Equivalent to this in many programming languages.

⚙️ Built-in Functions

**`if(MetaType)`**
Limits the scope expression to nodes of a specific metatype (concept or model unit).
If the node isn’t of that type, no namespace is added.
```proto
self.xxx.if(ConceptY);
```

**`owner()`**
Returns the owning namespace of the current property or node.
Useful when navigating upward through the AST.
```proto
self.xxx.owner();
```

**`type()`**
Returns the type of a node as determined by the typer definition.
Must appear at the end of an expression.
```proto
self.yyy.owner().type();
```

## 🧮 Special Syntax

**Dot Traversal (`.`)**  
Used to follow properties through the AST hierarchy.
```proto
self.xxx.yyy.rrr;

```

**Limited Instance Literal (#Type:Instance)**
References a specific instance of a limited concept.
```proto
#AttributeType:Integer;
```

## 📚 Related Topics

- [Basics and Terminology](/Documentation/Defining_Scope_Rules/Basics_and_Terminology) — Foundational definitions for namespaces and visibility sets.
- [Namespace Imports](/Documentation/Defining_Scope_Rules/Namespace_Imports) — Hierarchical visibility extensions.
- [Namespace Alternatives](/Documentation/Defining_Scope_Rules/Namespace_Alternatives) — Non-hierarchical and qualified scoping.
- [Typing and Validating](/Documentation/Typing_and_Validating) — Explains how `type()` integrates with the typer.
- [The Freon Scoper Definition](/Documentation/Defining_Scope_Rules/The_Scoper_Definition) — Full syntax and examples.

