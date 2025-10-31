---
title: "The Fre-Tool Interfaces"
description: "Interfaces implemented by generated Freon code, defining extensibility points such as environment, scoper, typer, validator, reader, writer, and standard library access."
tags: Tool Interfaces, FreEnvironment, FreScoper, FreValidator, FreTyper, FreReader, FreWriter, FreStdlib, Freon
---

# The Fre-Tool Interfaces

There are two series of interfaces that make Freon and its generated code extensible and flexible.  
The first series are the interfaces implemented by the generated code.

---

## FreEnvironment

An object that implements `FreEnvironment` holds information about where to find all parts
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

    languageName: string;
    unitNames: string[];
    fileExtensions: Map<string, string>;
}
```

---

## FreScoper

An object that implements `FreScoper` can return the named elements that are visible
for a certain AST node. This node can be a “normal” model element or a namespace.
If the node is a normal element, the names visible in its lexical surroundings are returned.

To implement custom name resolution, write your own `FreScoper`.

```ts
/* File: core/src/scoper/FreScoper.ts */

export interface FreScoper {
resolvePathName(
modelelement: FreElement,
doNotSearch: string,
pathname: string[],
metatype?: string
): FreNamedElement;

    isInScope(
        modelElement: FreElement,
        name: string,
        metatype?: string,
        excludeSurrounding?: boolean
    ): boolean;

    getVisibleElements(
        modelelement: FreElement,
        metatype?: string,
        excludeSurrounding?: boolean
    ): FreNamedElement[];

    getFromVisibleElements(
        modelelement: FreElement,
        name: string,
        metatype?: string,
        excludeSurrounding?: boolean
    ): FreNamedElement;

    getVisibleNames(
        modelelement: FreElement,
        metatype?: string,
        excludeSurrounding?: boolean
    ): string[];
}
```

---

## FreValidator

An object that implements `FreValidator` validates a node in the AST.
Validation may include the node itself or all of its child nodes recursively.

Errors found are returned as a list of `FreError` objects, each containing a message and a reference
to the faulty node.

```ts
/* File: core/src/validator/FreValidator.ts */

export interface FreValidator {
validate(modelelement: FreElement, includeChildren?: boolean): FreError[];
}
```

### FreError

```ts
/* File: core/src/validator/FreValidator.ts */

/**
* An error consists of a message coupled to the faulty AST node,
* either a model element or a list of model elements.
  */
  export class FreError {
  message: string; // human-readable error message
  reportedOn: FreElement | FreElement[]; // the faulty model element(s)
  locationdescription: string; // textual indication of where the error occurred
  severity: FreErrorSeverity; // indication of severity (default: ToDo)
  }
  ```

---

## FreTyper

An object that implements `FreTyper` answers type-related questions concerning AST nodes.

To define your own typing system, implement this interface.

```ts
/* File: core/src/typer/FreTyper.ts */

export interface FreTyper {
inferType(modelelement: FreElement): FreElement;

    equalsType(elem1: FreElement, elem2: FreElement): boolean;

    conformsTo(elem1: FreElement, elem2: FreElement): boolean;

    conformList(typelist1: FreElement[], typelist2: FreElement[]): boolean;

    isType(elem: FreElement): boolean;
}

/**
* Used in Freon's three-tier typer approach. Both generated and custom
* type providers implement this interface. Methods may return null
* when no result is applicable.
  */
  export interface FreTyperPart {
  inferType(modelelement: FreElement): FreElement | null;

  equalsType(elem1: FreElement, elem2: FreElement): boolean | null;

  conformsTo(elem1: FreElement, elem2: FreElement): boolean | null;

  conformList(typelist1: FreElement[], typelist2: FreElement[]): boolean | null;

  isType(elem: FreElement): boolean | null;
  }
  ```

---

## FreReader

An object that implements `FreReader` can read a textual representation of a model or AST node.

To create your own parser or file reader, implement this interface.

```ts
/* File: core/src/reader/FreReader.ts */

export interface FreReader {
readFromString(input: string, metatype: string): FreElement;
}
```

---

## FreWriter

An object that implements `FreWriter` can generate a textual representation of an AST node.

To implement your own unparser or writer, define this interface.

```ts
/* File: core/src/writer/FreWriter.ts */

export interface FreWriter {
writeToString(modelelement: FreElement, startIndent?: number, short?: boolean): string;

    writeToLines(modelelement: FreElement, startIndent?: number, short?: boolean): string[];

    writeNameOnly(modelelement: FreElement): string;
}
```

---

## FreStdlib

An object that implements `FreStdlib` holds a number of predefined AST nodes that can be
referred to in user models.

```ts
/* File: core/src/stdlib/FreStdlib.ts  */

export interface FreStdlib {
elements: FreNamedElement[];

    /**
     * Returns the element named 'name', if it can be found in this library.
     * When 'metatype' is provided, the element is only returned when it is
     * an instance of this metatype.
     */
    find(name: string, metatype?: string): FreNamedElement;
}
```

---

The second series of interfaces define parts of the  
[Freon Editor Framework](/Documentation/Under_the_Hood/Editor_Framework).
