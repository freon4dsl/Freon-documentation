<script>
    import Note from "$lib/notes/Note.svelte";
</script>

# Scoping

Scoping is an important part of a language definition. Therefore, Freon is one of the few language 
workbenches to provide a meta language for declaratively defining scoping rules.
The **scope provider definition** written in this metalanguage, is the input for the scoper generator. 
The running scoper that is thus created, is used in the Freon editor. The generator 
runs every time the `freon all` command is executed, but it can be run independently, 
using the following command.

```bash
npm run freon scope-it -d src/defs -o src/"
```

<Note {header} {content}> </Note>
{#snippet header()} Incomplete code{/snippet}
{#snippet content()}
<p>
Keep in mind that all commands, except <code>all</code>, when used individually (i.e., without combining 
them with others), produce code that may not compile correctly. For example, the <code>scoper</code> 
and <code>validator</code> may depend on the <code>typer</code> and attempt to reference its class, 
which might not yet be generated. Similarly, the <code>editor</code> may try to include 
the <code>scoper</code>.
</p>
<p>
To avoid such issues, it is best to start with the <code>all</code> command. Once this 
has been run, you can use specific commands for individual aspects of your language as needed. 
This approach ensures correct dependencies while minimizing regeneration time.
</p>
{/snippet}

