---
pageTitle: Typing and Validating
description: Explains how Freon handles typing and validation through separate generators, their dependencies, and recommended usage.
tags: Freon, typing, validation, language definition, generator, dependency, build
---

<script>
    import Note from "$lib/notes/Note.svelte";
</script>

# Typing and Validating

Besides the concrete syntax and scoping, typing and validation are important parts of a language
definition. Freon provides default implementations and generation tools for each of them.

Each generator takes as input a separate definition file and can be run independently. For instance,
you can use one of the following commands:

```bash
npm run freon type-it -d src/defs -o src/
npm run freon validate-it -d src/defs -o src/
```

<Note {header} {content}>
{#snippet header()} Incomplete code{/snippet}
{#snippet content()}
<p>
Keep in mind that all commands, except <code>all</code>, when used individually (i.e., without combining 
them with others), may produce code that does <b>not compile correctly</b>. For example, the <code>scoper</code> 
and <code>validator</code> may depend on the <code>typer</code> and attempt to reference its class, 
which might not yet be generated. Similarly, the <code>editor</code> may try to include 
the <code>scoper</code>.
</p>
<p>
To avoid such issues, it is recommended to start with the <code>all</code> command. Once it 
has been run, you can use specific commands for individual aspects of your language as needed. 
This approach ensures that all dependencies are correctly in place while minimizing regeneration time.
</p>
{/snippet}
 </Note>

