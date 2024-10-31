# PiValidator

An object that implements `PiValidator` is able to validate a node in the AST. The
validation can be only on the node itself, or it can include all child-nodes recursively.

The errors that are found are returned in the form of a list of `PiError` objects. Every `PiError`
holds a message, and a reference to the node that is faulty.

If you want to write your own validator you will need to implement this interface.

```ts
/* File: core/src/validator/PiValidator.ts */

export interface PiValidator {
	/**
	 * Returns a list of errors on 'modelelement' according to the validation rules
	 * stated in the validation definition. If 'includeChildren' is true, the child
	 * nodes of 'modelelement' in the AST are also checked.
	 *
	 * @param modelelement
	 * @param includeChildren
	 */
	validate(modelelement: PiElement, includeChildren?: boolean): PiError[];
}
```

## PiError

```ts
/* File: core/src/validator/PiValidator.ts */

/**
 * An error consists of a message coupled to the faulty AST node, either a model
 * element or a list of model elements.
 */
export class PiError {
	message: string; // human-readable error message
	reportedOn: PiElement | PiElement[]; // the model element that does not comply
	locationdescription: string; // human-readable indication of 'reportedOn'
	severity: PiErrorSeverity; // indication of how serious the error is, default is 'ToDo'
}
```
