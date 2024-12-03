# The Freon Core Interfaces

## FreElement

As Freon uses the AST for projections and behavior, it needs to know about the type of elements in the AST.
To allow Freon to work, each element type that occurs in the AST needs to implement the `FreElement` interface.
This interface is kept as small as possible, to allow Freon to be used for any AST.

```ts
/* File: core/src/language/FreElement.ts */

export interface FreElement {
	piId(): string;

	piLanguageConcept(): string;

	piContainer(): FreContainerDescriptor;

	piIsModel(): boolean;

	piIsUnit(): boolean;

	piIsExpression(): boolean;

	piIsBinaryExpression(): boolean;
}
```

The main two elements in this interface are:

- `piId()`, which should return en unique id for each element in the AST.
- `piContainer()` which should return a descriptor for the container (parent) of an element in the AST.

The two functions `piIsExpression()` and `piIsBinaryExpression()` are only needed when your language
contains expressions, as Freon includes special handling of expressions.
To start with, these functions can be defined to simply return `false`.

Note that Freon does not need to know anything about the structure of your language.
No need to know the available element type, nor the properties of en element type, nor anything else.
This is by design, as Freon is not meant to be a full Language Workbench,
but instead meant to be used with multiple language workbenches , or none.


## FreNamedElement

An object that implements `FreNamedElement` can be a node in a model AST, similar to
xref:element-interface[`FreElement`]
implementations. The difference is that `FreNamedElements` have a name property.

```ts
/* File: core/src/language/FreNamedElement.ts  */

export interface FreNamedElement extends FreElement {
	name: string;
}
```
