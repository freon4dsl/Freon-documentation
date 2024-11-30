# PiEnvironment

An object that implements `PiEnvironment` holds the information about where to find all parts
of the language environment. It is usually a singleton object.

```ts
/* File: core/src/environment/PiEnvironment.ts */

export interface PiEnvironment {
	/**
	 * Creates a new model, an implementation of the language defined in the .ast file
	 * @param name
	 */
	newModel(modelName: string): PiModel;

	scoper: PiScoper;
	typer: FreTyper;
	validator: PiValidator;
	editor: PiEditor;
	stdlib: PiStdlib;
	writer: PiWriter;
	reader: PiReader;

	// projectionalEditorComponent: ProjectionalEditor;
	languageName: string;
	unitNames: string[];
	fileExtensions: Map<string, string>;
}
```
