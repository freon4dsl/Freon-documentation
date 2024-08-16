# PiReader

An object that implements `PiReader` is able to read a string representation of a node in the AST.

If you want to write your own parser/filereader you will need to implement this interface.

```ts
/* File: core/src/reader/PiReader.ts */

export interface PiReader {
  /**
   * Parses the 'input' into a model unit of type 'metatype'.
   * May throw an Error if a syntax error occurs.
   * @param input
   * @param metatype
   */
  readFromString(input: string, metatype: string): PiElement;
}
```
