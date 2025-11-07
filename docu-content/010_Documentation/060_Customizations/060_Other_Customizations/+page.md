---
title: Other Customizations
description: Learn how to replace Freon’s generated reader, writer, or standard library with your own implementations.
tags: customization, reader, writer, standard library, FreReader, FreWriter, FreStdlib, Freon, DSL development
---

# Other Customizations

## The Reader and Writer

The reader (parser) and writer (unparser) cannot yet be customized **per concept**.  
Instead, you can replace the entire reader or writer with your own implementation.

- The new reader must implement the [`FreReader`](/Documentation/Under_the_Hood/FreTool_Interfaces#frereader-6) interface.
- The new writer must implement the [`FreWriter`](/Documentation/Under_the_Hood/FreTool_Interfaces#frewriter-7) interface.

## The Standard Library

The **standard library** class provides an entry point for all predefined elements in the DSL.  
It contains the instances of all *limited concepts* defined in the language definition file.  
The generated standard library follows the **singleton pattern**, ensuring that only one instance of the class exists.

To customize the standard library, replace the generated TypeScript class with your own implementation.  
Your new standard library must implement the [`FreStdlib`](/Documentation/Under_the_Hood/FreTool_Interfaces#frestdlib-8) interface.
