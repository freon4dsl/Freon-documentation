# The Fre-tool Interfaces

There are two series of interfaces that make Freon and its generated code extensible and flexible. The first
series are the interfaces implemented by the generated code:

## FreEnvironment

An object that implements `FreEnvironment` holds the information about where to find all parts
of the language environment. It is usually a singleton object.

```ts
/* File: core/src/environment/FreEnvironment.ts */

export interface FreEnvironment {
	/**
	 * Creates a new model, an implementation of the language defined in the .ast file
	 * @param name
	 */
	newModel(modelName: string): FreModel;

	scoper: FreScoper;
	typer: FreTyper;
	validator: FreValidator;
	editor: FreEditor;
	stdlib: FreStdlib;
	writer: FreWriter;
	reader: FreReader;

	// projectionalEditorComponent: ProjectionalEditor;
	languageName: string;
	unitNames: string[];
	fileExtensions: Map<string, string>;
}
```

## FreScoper

An object that implements `FreScoper` is able to return the named elements that are visible
for a certain AST node. This node can be a 'normal' model element, or it can be a namespace.
If the node is a 'normal' element, the names visbible in its (lexical) surrounding namespace
are returned.

If you want to write your own scoper you will need to implement this interface.

```ts
/* File: core/src/scoper/FreScoper.ts */

export interface FreScoper {
	/**
	 * Returns the element to which the 'pathname' refers. If the elment cannot be found, or if the element is
	 * not visible (private) from the location of 'modelelement', then null is returned.
	 * If present, then the search is limited to elements which type is 'metatype'.
	 *
	 * @param modelelement: the containing element, where 'pathname' should be visible
	 * @param doNotSearch: the role or property name of the element that we are searching for
	 * @param pathname: the name or series of names of the element that we are searching for
	 * @param metatype: the metatype of the element that we are searching for
	 */
	resolvePathName(modelelement: FreElement, doNotSearch: string, pathname: string[], metatype?: string): FreNamedElement;

	/**
	 *   Returns true if 'name' is known in the namespace containing 'modelelement' or one
	 *   of its surrounding namespaces.
	 *
	 *   When parameter 'metatype' is present, it returns true if the element named 'name'
	 *   is an instance of 'metatype'. There is no default setting for this parameter.
	 *
	 *   When parameter 'excludeSurrounding' is present, it returns true if the element named 'name'
	 *   is known in the namespace containing 'modelelement', without looking in surrounding namespaces.
	 *
	 * @param modelElement
	 * @param name
	 * @param metatype
	 * @param excludeSurrounding
	 */
	isInScope(modelElement: FreElement, name: string, metatype?: string, excludeSurrounding?: boolean): boolean;

	/**
	 *   Returns all elements that are visible in the namespace containing 'modelelement' or one
	 *   of its surrounding namespaces.
	 *
	 *   When parameter 'metatype' is present, it returns all elements that are an instance of 'metatype'.
	 *   There is no default setting for this parameter.
	 *
	 *   When parameter 'excludeSurrounding' is present, it returns all elements that are visible in
	 *   the namespace containing 'modelelement', without looking in surrounding namespaces. Elements in
	 *   surrounding namespaces are normally shadowed by elements with the same name in an inner namespace.
	 *
	 * @param modelelement
	 * @param metatype
	 * @param excludeSurrounding
	 */
	getVisibleElements(modelelement: FreElement, metatype?: string, excludeSurrounding?: boolean): FreNamedElement[];

	/**
	 *   Returns the element named 'name' which is visible in the namespace containing 'modelelement' or one
	 *   of its surrounding namespaces.
	 *
	 *   When parameter 'metatype' is present, it returns the element that is an instance of 'metatype'.
	 *   There is no default setting for this parameter.
	 *
	 *   When parameter 'excludeSurrounding' is present, it returns the element that is visible in
	 *   the namespace containing 'modelelement', without looking in surrounding namespaces. Elements in
	 *   surrounding namespaces are normally shadowed by elements with the same name in an inner namespace.
	 *
	 * @param modelelement
	 * @param name
	 * @param metatype
	 * @param excludeSurrounding
	 */
	getFromVisibleElements(modelelement: FreElement, name: string, metatype?: string, excludeSurrounding?: boolean): FreNamedElement;

	/**
	 *   Does the same as getVisibleElements, only it does not return the elements,
	 *   but the names of the elements.
	 *
	 * @param modelelement
	 * @param metatype
	 * @param excludeSurrounding
	 */
	getVisibleNames(modelelement: FreElement, metatype?: string, excludeSurrounding?: boolean): string[];
}
```

## FreValidator

An object that implements `FreValidator` is able to validate a node in the AST. The
validation can be only on the node itself, or it can include all child-nodes recursively.

The errors that are found are returned in the form of a list of `FreError` objects. Every `FreError`
holds a message, and a reference to the node that is faulty.

If you want to write your own validator you will need to implement this interface.

```ts
/* File: core/src/validator/FreValidator.ts */

export interface FreValidator {
	/**
	 * Returns a list of errors on 'modelelement' according to the validation rules
	 * stated in the validation definition. If 'includeChildren' is true, the child
	 * nodes of 'modelelement' in the AST are also checked.
	 *
	 * @param modelelement
	 * @param includeChildren
	 */
	validate(modelelement: FreElement, includeChildren?: boolean): FreError[];
}
```

### FreError

```ts
/* File: core/src/validator/FreValidator.ts */

/**
 * An error consists of a message coupled to the faulty AST node, either a model
 * element or a list of model elements.
 */
export class FreError {
	message: string; // human-readable error message
	reportedOn: FreElement | FreElement[]; // the model element that does not comply
	locationdescription: string; // human-readable indication of 'reportedOn'
	severity: FreErrorSeverity; // indication of how serious the error is, default is 'ToDo'
}
```

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
	inferType(modelelement: FreElement): FreElement;

	/**
	 * Returns true if the type that inferType(elem1) returns equals the type inferType(elem2) returns.
	 * This is a strict equal.
	 * @param elem1
	 * @param elem2
	 */
	equalsType(elem1: FreElement, elem2: FreElement): boolean;

	/**
	 * Returns true if the type that inferType(elem1) returns conforms to the type inferType(elem2) returns, according to
	 * the type rules in the Typer definition. The direction is elem2 conforms to elem1.
	 * @param elem1
	 * @param elem2
	 */
	conformsTo(elem1: FreElement, elem2: FreElement): boolean;

	/**
	 * Returns true if all types in typelist1 conform to the types in typelist2, in the given order.
	 * @param typelist1
	 * @param typelist2
	 */
	conformList(typelist1: FreElement[], typelist2: FreElement[]): boolean;

	/**
	 * Returns true if 'elem' is marked as 'type' in the Typer definition
	 * @param elem
	 */
	isType(elem: FreElement): boolean;
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
	inferType(modelelement: FreElement): FreElement | null;

	/**
	 * Returns true if the type that inferType(elem1) returns equals the type inferType(elem2) returns.
	 * This is a strict equal.
	 * @param elem1
	 * @param elem2
	 */
	equalsType(elem1: FreElement, elem2: FreElement): boolean | null;

	/**
	 * Returns true if the type that inferType(elem1) returns conforms to the type inferType(elem2) returns, according to
	 * the type rules in the Typer definition. The direction is elem2 conforms to elem1.
	 * @param elem1
	 * @param elem2
	 */
	conformsTo(elem1: FreElement, elem2: FreElement): boolean | null;

	/**
	 * Returns true if all types in typelist1 conform to the types in typelist2, in the given order.
	 * @param typelist1
	 * @param typelist2
	 */
	conformList(typelist1: FreElement[], typelist2: FreElement[]): boolean | null;

	/**
	 * Returns true if 'elem' is marked as 'type' in the Typer definition.
	 * @param elem
	 */
	isType(elem: FreElement): boolean | null;
}
```

## FreReader

An object that implements `FreReader` is able to read a string representation of a node in the AST.

If you want to write your own parser/filereader you will need to implement this interface.

```ts
/* File: core/src/reader/FreReader.ts */

export interface FreReader {
	/**
	 * Parses the 'input' into a model unit of type 'metatype'.
	 * May throw an Error if a syntax error occurs.
	 * @param input
	 * @param metatype
	 */
	readFromString(input: string, metatype: string): FreElement;
}
```

## FreWriter

An object that implements `FreWriter` is able to build a string representation of a node in the AST.

If you want to write your own unparser/writer you will need to implement this interface.

```ts
/* File: core/src/writer/FreWriter.ts */

export interface FreWriter {
	/**
	 * Returns a string representation of 'modelelement'.
	 * If 'short' is present and true, then a single-line result will be given.
	 * Otherwise, the result is always a multi-line string.
	 * Note that the single-line-string cannot be parsed into a correct model.
	 *
	 * @param modelelement
	 * @param startIndent
	 * @param short
	 */
	writeToString(modelelement: FreElement, startIndent?: number, short?: boolean): string;

	/**
	 * Returns a string representation of 'modelelement', divided into an array of strings,
	 * each of which contain a single line (without newline).
	 * If 'short' is present and true, then a single-line result will be given.
	 * Otherwise, the result is always a multi-line string.
	 *
	 * @param modelelement
	 * @param startIndent
	 * @param short
	 */
	writeToLines(modelelement: FreElement, startIndent?: number, short?: boolean): string[];

	/**
	 * Returns the name of 'modelelement' if it has one, else returns
	 * a short unparsing of 'modelelement'.
	 * Used by the validator to produce readable error messages.
	 *
	 * @param modelelement
	 */
	writeNameOnly(modelelement: FreElement): string;
}
```

## FreStdlib

An object that implements `FreStdlib` holds a number of predefined AST nodes, which
can be referred to in the model AST.

If you want to write your own standard library you will need to implement this interface.

```ts
/* File: core/src/stdlib/FreStdlib.ts  */

export interface FreStdlib {
	elements: FreNamedElement[];

	/**
	 * Returns the element named 'name', if it can be found in this library.
	 * When 'metatype' is provided, the element is only returned when it is
	 * an instance of this metatype.
	 * @param name
	 * @param metatype
	 */
	find(name: string, metatype?: string): FreNamedElement;
}
```


The second series of interfaces are those that define parts of the
[Freon Editor Framework](/Documentation/Under_the_Hood/Editor_Framework).
