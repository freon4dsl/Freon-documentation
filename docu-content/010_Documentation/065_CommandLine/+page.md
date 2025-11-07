---
title: Command Line
description: Learn how to use and customize the generated command-line application in Freon, including adding and initializing your own actions.
tags: command line, customization, FreonCommandLineRunner, DSL development, actions, CLI
---

# Command Line

Freon generates a command-line application in the `commandline` folder.

The main entry point is the **`FreonCommandLineRunner.ts`** file.  
This class initializes your language and then runs the given command.

By default, the generated project includes a **`DummyAction`** — a simple example showing what an action class looks like.  
You can replace this with your own custom action.

If you define multiple actions, make sure they are properly initialized and registered within the `FreonCommandLineRunner` class.
