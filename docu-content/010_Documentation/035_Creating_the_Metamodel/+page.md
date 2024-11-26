<script>
    import Note from "$lib/notes/Note.svelte";
</script>

# The Language Structure Definition

The abstract syntax tree (AST), or metamodel, of the language is described in files with the extension `.ast`.
All files with this extension in the _defs_ folder (i.e. the folder were you keep your definition files)
are combined into one AST definition.

Every AST file must start with the declaration of the name of your language. This name is used
to create the name of a number of generated classes.

```ts
// DocuProject/src/defs/language-main.ast#L1-L2

language DocuProject

```

The Freon language structure, which describes the abstract syntax tree (AST), consists of a
list of a [Models](/Documentation/Creating_the_Metamodel/Defining_the_Language_Structure#Model),
[Model Units](/Documentation/Creating_the_Metamodel/Defining_the_Language_Structure#Model_Unit),
[Concepts](/Documentation/Creating_the_Metamodel/Defining_the_Language_Structure#Concept),
[Expression Concepts](/Documentation/Creating_the_Metamodel/Defining_the_Language_Structure#Expression_Concept),
[Binary Expression Concepts](/Documentation/Creating_the_Metamodel/Defining_the_Language_Structure#Binary_Expression_Concept),
[Limited Concepts](/Documentation/Creating_the_Metamodel/Defining_the_Language_Structure#Limited_Concept),
and/or [Interfaces](/Documentation/Creating_the_Metamodel/Defining_the_Language_Structure#Interface).
