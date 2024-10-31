# PiProjection

The projection from your model/AST is defined by implementing the _PiProjection_ interface:

```ts
/* File: core/src/editor/PiProjection.ts  */

export interface PiProjection {
	/**
	 * returns the box for `element`.
	 */
	getBox(element: PiElement): Box;

	rootProjection: PiProjection;
	name: string;
}
```

Implementing this interface should return a _Box_ for each `element` in the AST.
Freon includes boxes of various types (textual, tabular, horizontal or vertical collections, etc.)
to define this projection.
The box model is further described in the xref:../framework/editor-framework[editor framework].
