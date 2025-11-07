---
title: Creating the Metamodel
description: Learn how to define the metamodel, or abstract syntax tree (AST), of your language in Freon using .ast files and key structural elements such as models, concepts, and interfaces.
tags: metamodel, abstract syntax tree, AST, language structure, model units, concepts, interfaces, Freon, DSL development
---


<script>
    import Note from "$lib/notes/Note.svelte";
</script>

# Creating the Metamodel

The metamodel, or abstract syntax tree (AST), of the language is described in files with the extension `.ast`.
All files with this extension in the [_defs_ folder](/Documentation/Overview/Getting_Started#creating-a-project-2) (i.e. the folder where you keep your definition files)
are combined into one AST definition.

## Every Language has a Name

Every AST file must start with the declaration of the name of your language. This name is used
to form the names of several generated TypeScript classes.

```proto
// Insurance/src/defs/language-main.ast#L1-L2

language InsuranceModel

```

The Freon language structure consists of a single [Model](/Documentation/Creating_the_Metamodel/Language_Structure#model-2) and the following elements: 
- [Model Units](/Documentation/Creating_the_Metamodel/Language_Structure#model-unit-3),
- [Concepts](/Documentation/Creating_the_Metamodel/Language_Structure#concept-4),
- [Expression Concepts](/Documentation/Creating_the_Metamodel/Language_Structure#expression-concept-5),
- [Binary Expression Concepts](/Documentation/Creating_the_Metamodel/Language_Structure#binary-expression-concept-6),
- [Limited Concepts](/Documentation/Creating_the_Metamodel/Language_Structure#limited-concept-7)
- [Interfaces](/Documentation/Creating_the_Metamodel/Language_Structure#interface-8)

Each of these will be explained in the next section.
