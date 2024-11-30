<script>
    import Note from "$lib/notes/Note.svelte";
</script>

# Scoping, Typing, and Validating

Because, besides to the concrete syntax, scoping, typing, and validation are important parts of a language
definition, Freon provides defaults and generation tools for each of them.

Each of the generators take as input yet another definition file and can be run independently. For instance, 
using one of the following commands.

```bash
npm run freon scope-it -d src/defs -o src/"

npm run freon type-it -d src/defs -o src/"

npm run freon validate-it -d src/defs -o src/"
```

<Note>
<svelte:fragment slot="header"> Incomplete code</svelte:fragment>
<svelte:fragment slot="content">
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
</svelte:fragment>
</Note>
