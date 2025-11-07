---
title: "The Fre-Tool Interfaces"
description: "Interfaces implemented by generated Freon code, defining extensibility points such as environment, scoper, typer, validator, reader, writer, and standard library access."
tags: Tool Interfaces, FreEnvironment, FreScoper, FreValidator, FreTyper, FreReader, FreWriter, FreStdlib, Freon
---

# The Fre-Tool Interfaces

There are two series of interfaces that make Freon and its generated code extensible and flexible.  
The first series are the interfaces implemented by the generated code.


## FreEnvironment

An object that implements `FreEnvironment` holds information about where to find all parts
of the language environment. It is usually a singleton object.

```ts
/* File: core/src/environment/FreEnvironment.ts */

export type FreEnvironment = {
	/**
	 * Creates a new model, an implementation of the language defined in the .ast file
	 * @param modelName
	 */
	newModel(modelName: string): FreModel;

	scoper: FreCompositeScoper;
	typer: FreCompositeTyper;
	validator: FreValidator;
	editor: FreEditor;
	writer: FreWriter;
	reader: FreReader;
	interpreter: FreInterpreter;
	projectionHandler: FreProjectionHandler;

	languageName: string;
	fileExtensions: Map<string, string>;
}
```


## FreScoper

An object that implements `FreScoper` can return the named elements that are visible
for a certain AST node. This node can be a “normal” model element or a namespace.
If the node is a normal element, the names visible in its lexical surroundings are returned.

To implement custom name resolution, write your own `FreScoper`.

```ts
/* File: core/src/scoper/FreScoper.ts */

export interface FreScoper {
	mainScoper: FreCompositeScoper;

	/**
	 *   Returns all elements that are visible in the namespace containing 'node'. Note that 'node' can
	 *   be any node in the AST, not only namespaces!
	 *
	 *   When parameter 'metaType' is present, it returns all elements that are an instance of 'metaType'.
	 *   There is no default setting for this parameter.
	 *
	 * @param node
	 * @param metaType
	 */
	getVisibleNodes(node: FreNode | FreNodeReference<FreNamedNode>, metaType?: string): FreNamedNode[];

	/**
	 * Returns all nodes and/or node references that represent namespaces which should be added to the namespace
	 * represented by 'node'. Combined with every element is a property called 'recursive', which indicates whether
	 * to include the imported namespaces from imported namespaces.
	 *
	 * @param node
	 */
	importedNamespaces(node: FreNode): FreNamespaceInfo[];

	/**
	 * Returns all nodes and/or node references that represent namespaces which should be used to replace
	 * the parent namespace of the namespace represented by 'node'. Combined with every element is a property
	 * called 'recursive', which indicates whether to include the imported namespaces from alternative namespaces.
	 *
	 * @param node
	 */
	alternativeNamespaces(node: FreNode): FreNamespaceInfo[];
}

```


## FreValidator

An object that implements `FreValidator` validates a node in the AST.
Validation may include the node itself or all of its child nodes recursively.

Errors found are returned as a list of `FreError` objects, each containing a message and a reference
to the faulty node.

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
	validate(modelelement: FreNode, includeChildren?: boolean): FreError[];
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
	reportedOn: FreNode | FreNode[]; // the model element that does not comply
	propertyName: string; // the property of the model element that does not comply, if appropriate
	propertyIndex: number; // the property index of the model element that does not comply, if appropriate
	locationdescription: string; // human-readable indication of 'reportedOn'
	severity: FreErrorSeverity; // indication of how serious the error is, default is 'To Do'

	constructor(
		message: string,
		node: FreNode | FreNode[],
		locationdescription: string,
		propertyName: string,
		severity?: FreErrorSeverity,
		propertyIndex?: number,
	) {
		this.message = message;
		this.reportedOn = node;
		this.locationdescription = locationdescription;
		
		if (typeof severity !== "undefined") {
			this.severity = severity;
		} else {
			this.severity = FreErrorSeverity.ToDo;
		}
		this.propertyName = propertyName;
		this.propertyIndex = propertyIndex;
	}
}

export enum FreErrorSeverity {
	Error = "Error",
	Warning = "Warning",
	Hint = "Hint",
	Improvement = "Improvement",
	ToDo = "TODO",
	Info = "Info",
	NONE = "NONE",
}
  ```


## FreTyper

An object that implements `FreTyper` answers type-related questions concerning AST nodes.

To define your own typing system, implement this interface.

```ts
/* File: core/src/typer/FreTyper.ts */

export interface FreTyper {
	// name: string;
	mainTyper: FreTyper;

	/**
	 * Returns true if 'elem' is marked as 'isType' in the Typer definition.
	 * Returns undefined when this typer instance cannot determine the outcome.
	 * @param elem
	 */
	isType(elem: FreNode): boolean | undefined;

	/**
	 * Returns the type of 'modelelement' according to the type rules in the Typer Definition.
	 * Returns undefined when this typer instance cannot determine the outcome.
	 * @param modelelement
	 */
	inferType(modelelement: FreNode): FreType | undefined;

	/**
	 * Returns true if type1 equals type2.
	 * This is a strict equal.
	 * Returns undefined when this typer instance cannot determine the outcome.
	 * @param type1
	 * @param type2
	 */
	equals(type1: FreType, type2: FreType): boolean | undefined;

	/**
	 * Returns true if type1 conforms to type2. The direction is type1 conforms to type2.
	 * Returns undefined when this typer instance cannot determine the outcome.
	 * @param type1
	 * @param type2
	 */
	conforms(type1: FreType, type2: FreType): boolean | undefined;

	/**
	 * Returns true if all types in typelist1 conform to the types in typelist2, in the given order.
	 * Returns undefined when this typer instance cannot determine the outcome.
	 * @param typelist1
	 * @param typelist2
	 */
	conformsList(typelist1: FreType[], typelist2: FreType[]): boolean | undefined;

	/**
	 * Returns the common super type of all types in 'typelist'.
	 * Returns undefined when this typer instance cannot determine the outcome.
	 * @param typelist
	 */
	commonSuper(typelist: FreType[]): FreType | undefined;

	/**
	 * Returns all super types as defined in the typer definition.
	 * Returns undefined when this typer instance cannot determine the outcome.
	 * @param type
	 */
	getSuperTypes(type: FreType): FreType[] | undefined;
}
```


## FreReader

An object that implements `FreReader` can read a textual representation of a model or AST node.

To create your own parser or file reader, implement this interface.

```ts
/* File: core/src/reader/FreReader.ts */

export interface FreReader {
	/**
	 * Parses and performs a syntax analysis on 'sentence', using the parser and analyser
	 * for 'metatype', if available. If 'sentence' is correct, a model unit will be created,
	 * otherwise an error wil be thrown containing the parse or analysis error.
	 * @param input         the input string which will be parsed
	 * @param metatype      the type of the unit to be created
	 * @param model         the model to which the unit will be added
	 * @param sourceName    the (optional) name of the source that contains 'sentence'
	 */
	readFromString(input: string, metatype: string, model: FreModel, sourceName?: string): FreNode;
}
```


## FreWriter

An object that implements `FreWriter` can generate a textual representation of an AST node.

To implement your own unparser or writer, define this interface.

```ts
/* File: core/src/writer/FreWriter.ts */

export interface FreWriter {
	/**
	 * Returns a string representation of 'node'.
	 * If 'short' is present and true, then a single-line result will be given.
	 * Otherwise, the result is always a multi-line string.
	 * Note that the single-line-string cannot be parsed into a correct model.
	 *
	 * @param node
	 * @param startIndent
	 * @param short
	 */
	writeToString(node: FreNode, startIndent?: number, short?: boolean): string;

	/**
	 * Returns a string representation of 'node', divided into an array of strings,
	 * each of which contain a single line (without newline).
	 * If 'short' is present and true, then a single-line result will be given.
	 * Otherwise, the result is always a multi-line string.
	 *
	 * @param node
	 * @param startIndent
	 * @param short
	 */
	writeToLines(node: FreNode, startIndent?: number, short?: boolean): string[];

	/**
	 * Returns the name of 'node' if it has one, else returns
	 * a short unparsing of 'node'.
	 * Used by the validator to produce readable error messages.
	 *
	 * @param node
	 */
	writeNameOnly(node: FreNode | undefined): string;
}
```


## FreStdlib

An object that implements `FreStdlib` holds a number of predefined AST nodes that can be
referred to in user models.

```ts
/* File: core/src/stdlib/FreStdlib.ts  */

export interface FreStdlib {
    elements: FreNamedNode[];

    /**
     * Returns the element named 'name', if it can be found in this library.
     * When 'metatype' is provided, the element is only returned when it is
     * an instance of this metatype.
     */
    find(name: string, metatype?: string): FreNamedNode;
}
```


The second series of interfaces define parts of the  
[Freon Editor Framework](/Documentation/Under_the_Hood/Editor_Framework).
