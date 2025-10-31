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
All files with this extension in the [_defs_ folder](/Documentation/Overview/Getting_Started#template-project-startup-3) (i.e. the folder where you keep your definition files)
are combined into one AST definition.

## Every Language has a Name

Every AST file must start with the declaration of the name of your language. This name is used
to form the names of several generated TypeScript classes.

```proto
// Insurance/src/defs/language-main.ast#L1-L2

language InsuranceModel

```

The Freon language structure consists of a single [Model](/Documentation/Creating_the_Metamodel/Language_Structure#Model) and the following elements: 
- [Model Units](/Documentation/Creating_the_Metamodel/Language_Structure#Model_Unit),
- [Concepts](/Documentation/Creating_the_Metamodel/Language_Structure#Concept),
- [Expression Concepts](/Documentation/Creating_the_Metamodel/Language_Structure#Expression_Concept),
- [Binary Expression Concepts](/Documentation/Creating_the_Metamodel/Language_Structure#Binary_Expression_Concept),
- [Limited Concepts](/Documentation/Creating_the_Metamodel/Language_Structure#Limited_Concept)
- [Interfaces](/Documentation/Creating_the_Metamodel/Language_Structure#Interface)

Each of these will be explained in the next section.
