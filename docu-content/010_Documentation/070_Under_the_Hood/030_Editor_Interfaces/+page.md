# The Freon Editor Interfaces

There are two series of interfaces that make Freon and its generated code extensible and flexible. The first
series are the xref:../tools-interfaces/tools-interfaces-intro[interfaces of the generated code].

The second series of interfaces are those that define the editor framework:

## FreProjection

The projection from your model/AST is defined by implementing the _FreProjection_ interface:

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

Implementing this interface should return a _Box_ for each `element` in the AST.
Freon includes boxes of various types (textual, tabular, horizontal or vertical collections, etc.)
to define this projection.
The box model is further described in the xref:../framework/editor-framework[editor framework].

## FreAction

An object that implements `FreCombinedActions` <!--- TODO -->

```ts
/* File: core/src/editor/FreCombinedActions.ts */

export interface FreCombinedActions {
	binaryExpressionActions: FreCreateBinaryExpressionAction[];

	customActions: FreCustomAction[];
}
```

## FreExpression

An object that implements `FreExpression` // TODO

```ts
/* File: core/src/language/FreExpression.ts */

export interface FreExpression extends FreElement {}
```

## FreBinaryExpression

An object that implements `FreBinaryExpression` can be a node in the model AST. It represents
an expression that has exactly two operands, which are usually written to the left and right of
the operator symbol. For example, '4+5'.

This interface extends the xref:expression-interface[`FreExpression`] interface.

```ts
/* File: core/src/language/FreBinaryExpression.ts */

export interface FreBinaryExpression extends FreExpression {
    piLeft(): FreExpression;

    piSetLeft(left: FreExpression): void;

    piRight(): FreExpression;

    piSetRight(right: FreExpression): void;

    piPriority(): number;
}
 */
```


In both series the following two interfaces are used:

- [FreElement](/Documentation/Under_the_Hood/Core_Interfaces#fre-node-1)
- [FreNamedElement](/Documentation/Under_the_Hood/Core_Interfaces#fre-named-node-2)
