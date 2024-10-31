# PiNamedElement

An object that implements `PiNamedElement` can be a node in a model AST, similar to
xref:element-interface[`PiElement`]
implementations. The difference is that `PiNamedElements` have a name property.

```ts
/* File: core/src/language/PiNamedElement.ts  */

export interface PiNamedElement extends PiElement {
	name: string;
}
```
