---
title: "The Freon Editor Interfaces"
description: "Interfaces that define the extensibility and flexibility of the Freon editor framework, including projections, actions, and expressions."
tags: Editor Interfaces, FreProjection, FreExpression, FreBinaryExpression, Freon
---

# The Freon Editor Interfaces

There are two series of interfaces that make Freon and its generated code extensible and flexible.  
The first series are the [interfaces of the generated code](/Documentation/Under_the_Hood/Tools_Interfaces/Tools_Interfaces_Intro).

The second series of interfaces define the **editor framework** itself.

---

## FreProjection

The projection from your model or AST is defined by implementing the `FreProjection` interface.

```ts
/* File: core/src/editor/FreProjection.ts  */

/**
* Interface for a custom projection.
  */
  export interface FreProjection {
  // Name of the custom projection
  name: string;

  // A map from the name of the concept (or the freLanguageConcept() of the FreElement node) to
  // the function that may return the custom box for a node of that type.
  nodeTypeToBoxMethod: Map<string, (node: FreNode) => Box>;

  // A map from the name of the concept (or the freLanguageConcept() of the FreElement node) to
  // the function that may return the custom box for a node of that type.
  nodeTypeToTableDefinition: Map<string, () => FreTableDefinition>;
  }
  ```

Implementing this interface should return a **Box** for each `element` in the AST.  
Freon includes many predefined boxes (textual, tabular, horizontal or vertical collections, etc.)  
to define this projection.

The box model is further described in the  
[Editor Framework documentation](/Documentation/Under_the_Hood/Editor_Framework#projection-layout-based-on-boxes-3).

---

## FreAction

An object that implements `FreCombinedActions` groups multiple kinds of editor actions together.

```ts
/* File: core/src/editor/FreCombinedActions.ts */

export interface FreCombinedActions {
binaryExpressionActions: FreCreateBinaryExpressionAction[];
customActions: FreCustomAction[];
}
```

> **Note:** Documentation for the various `FreAction` types and creation methods is still in progress.

---

## FreExpression

An object that implements `FreExpression` represents a typed node within the model AST that behaves as an expression.

```ts
/* File: core/src/language/FreExpression.ts */

export interface FreExpression extends FreElement {}
```

---

## FreBinaryExpression

An object that implements `FreBinaryExpression` is a node in the model AST.  
It represents an expression that has exactly two operands, which are usually written to the left and right of the operator symbol (for example, `4 + 5`).

This interface extends [`FreExpression`](/Documentation/Under_the_Hood/Editor_Interfaces#freexpression-4).

```ts
/* File: core/src/language/FreBinaryExpression.ts */

export interface FreBinaryExpression extends FreExpression {
piLeft(): FreExpression;

    piSetLeft(left: FreExpression): void;

    piRight(): FreExpression;

    piSetRight(right: FreExpression): void;

    piPriority(): number;
}
```

---

In both series of interfaces, the following two core interfaces are reused:

- [FreElement](/Documentation/Under_the_Hood/Core_Interfaces#fre-node-1)
- [FreNamedElement](/Documentation/Under_the_Hood/Core_Interfaces#fre-named-node-2)
