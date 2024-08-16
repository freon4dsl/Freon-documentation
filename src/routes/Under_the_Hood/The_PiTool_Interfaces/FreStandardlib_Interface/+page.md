# PiStdlib

An object that implements `PiStdlib` holds a number of predefined AST nodes, which
can be referred to in the model AST.

If you want to write your own standard library you will need to implement this interface.

```ts
/* File: core/src/stdlib/PiStdlib.ts  */

export interface PiStdlib {
  elements: PiNamedElement[];

  /**
   * Returns the element named 'name', if it can be found in this library.
   * When 'metatype' is provided, the element is only returned when it is
   * an instance of this metatype.
   * @param name
   * @param metatype
   */
  find(name: string, metatype?: string): PiNamedElement;
}
```
