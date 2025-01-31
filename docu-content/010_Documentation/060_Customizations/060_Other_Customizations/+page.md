# Other Customizations

## The Reader and Writer

The reader (parser) and writer (unparser) can not yet be
customized **per concept**. Instead, you can replace the whole
reader or writer by one you create yourself.
The new reader needs to
implement the [`FreReader`](/Documentation/Under_the_Hood/FreTool_Interfaces#frereader-6) interface.
The new writer needs to implement the [`FreWriter`](/Documentation/Under_the_Hood/FreTool_Interfaces#frewriter-7) interface.

## The Standard Library

The standard library class provides an entry point for all predefined elements in the DSL.
It holds all instances of limited concepts as defined in the language definition file. 
The generated standard library uses the singleton pattern to ensure that only one instance of the class is present.

Customization can be done by replacing the generated Typescript class. The new standard library should implement
the [`FreStdlib`](/Documentation/Under_the_Hood/FreTool_Interfaces#frestdlib-8) interface.

