<script>
    import Note from "$lib/notes/Note.svelte";
</script>

# Creating the Metamodel

The metamodel, or abstract syntax tree (AST), of the language is described in files with the extension `.ast`.
All files with this extension in the [_defs_ folder](/Documentation/Overview/Getting_Started#template-project-startup-3) (i.e. the folder were you keep your definition files)
are combined into one AST definition.

## Every Language has a Name

Every AST file must start with the declaration of the name of your language. This name is used
to create the name of a number of generated TypeScript classes.

```freon
// DocuProject/src/defs/language-main.ast#L1-L2

language DocuProject

```

The Freon language structure, which describes the abstract syntax tree (AST), consists of
a single [Model](/Documentation/Creating_the_Metamodel/Language_Structure#Model), 
combined with a list of 
- [Model Units](/Documentation/Creating_the_Metamodel/Language_Structure#Model_Unit),
- [Concepts](/Documentation/Creating_the_Metamodel/Language_Structure#Concept),
- [Expression Concepts](/Documentation/Creating_the_Metamodel/Language_Structure#Expression_Concept),
- [Binary Expression Concepts](/Documentation/Creating_the_Metamodel/Language_Structure#Binary_Expression_Concept),
- [Limited Concepts](/Documentation/Creating_the_Metamodel/Language_Structure#Limited_Concept), and/or
- [Interfaces](/Documentation/Creating_the_Metamodel/Language_Structure#Interface).

Each of these will be explained in the next section.
