# FreTyper

An object that implements `FreTyper` is answer a set of question concerning the type of a node in the AST.

If you want to write your own typer you will need to implement this interface.

```ts
/* File: core/src/typer/FreTyper.ts */

export interface FreTyper {
	/**
	 * Returns the type of 'modelelement' according to the type rules in the Typer Definition
	 * @param modelelement
	 */
	inferType(modelelement: PiElement): PiElement;

	/**
	 * Returns true if the type that inferType(elem1) returns equals the type inferType(elem2) returns.
	 * This is a strict equal.
	 * @param elem1
	 * @param elem2
	 */
	equalsType(elem1: PiElement, elem2: PiElement): boolean;

	/**
	 * Returns true if the type that inferType(elem1) returns conforms to the type inferType(elem2) returns, according to
	 * the type rules in the Typer definition. The direction is elem2 conforms to elem1.
	 * @param elem1
	 * @param elem2
	 */
	conformsTo(elem1: PiElement, elem2: PiElement): boolean;

	/**
	 * Returns true if all types in typelist1 conform to the types in typelist2, in the given order.
	 * @param typelist1
	 * @param typelist2
	 */
	conformList(typelist1: PiElement[], typelist2: PiElement[]): boolean;

	/**
	 * Returns true if 'elem' is marked as 'type' in the Typer definition
	 * @param elem
	 */
	isType(elem: PiElement): boolean;
}

/**
 * This interface is being used to implement the three-tier approach.
 * Both the generated and custom type providers should implement this interface.
 * The generated class that implement the FreTyper interface connects all the classes
 * that implement this interface and returns the correct value to the (external) user.
 *
 * When the implementor of this interface does not provide for a result of one of the methods,
 * this method should return 'null'.
 */
export interface FreTyperPart {
	/**
	 * Returns the type of 'modelelement' according to the type rules in the Typer Definition.
	 * @param modelelement
	 */
	inferType(modelelement: PiElement): PiElement | null;

	/**
	 * Returns true if the type that inferType(elem1) returns equals the type inferType(elem2) returns.
	 * This is a strict equal.
	 * @param elem1
	 * @param elem2
	 */
	equalsType(elem1: PiElement, elem2: PiElement): boolean | null;

	/**
	 * Returns true if the type that inferType(elem1) returns conforms to the type inferType(elem2) returns, according to
	 * the type rules in the Typer definition. The direction is elem2 conforms to elem1.
	 * @param elem1
	 * @param elem2
	 */
	conformsTo(elem1: PiElement, elem2: PiElement): boolean | null;

	/**
	 * Returns true if all types in typelist1 conform to the types in typelist2, in the given order.
	 * @param typelist1
	 * @param typelist2
	 */
	conformList(typelist1: PiElement[], typelist2: PiElement[]): boolean | null;

	/**
	 * Returns true if 'elem' is marked as 'type' in the Typer definition.
	 * @param elem
	 */
	isType(elem: PiElement): boolean | null;
}
```
