<script>
    import Note from "$lib/notes/Note.svelte";
</script>

# Scoping

Scoping is an important part of language definition. Most current language workbenches focus heavily on syntax. 
Mechanisms for specifying static and dynamic semantics—including
scoping—are still experimental or limited. Freon is one of the first workbenches to offer a meta-language for
declaratively defining scoping rules.

The way Freon handles scoping is based on scope graph theory, developed at Delft University by Eelco Visser and others
(see, for
instance, <a href="https://pl.ewi.tudelft.nl/research/projects/scope-graphs/" target="_blank">https://pl.ewi.tudelft.nl/research/projects/scope-graphs/</a>).
Spoofax, a workbench created at Delft University, also provides a meta-language for scoping.
While both are inspired by the same ideas, they use different terminology.

To explain Freon’s scoper definition, we first need some common ground about scoping and the concepts used to describe it. So please
bear with me—the final page of this section will show you how to actually write a Freon scoper definition.

## Running the Scoper Generator

The **scope provider definition**, written in the Freon meta-language, is the input for the scoper generator. 
The generated scoper is then used in the Freon editor. The generator runs every time the `freon all` 
command is executed, but you can also run it independently with:

```bash
npm run freon scope-it -d src/defs -o src/"
```

<Note {header} {content}> </Note>
{#snippet header()} Incomplete code{/snippet}
{#snippet content()}
<p>
It is best to start with the <code>all</code> command. After that, it’s safe to run individual commands.
</p>
<p>
The individual commands produce code that may be incomplete. 
For example, the <code>scoper</code> 
and <code>validator</code> may depend on the <code>typer</code> and attempt to reference its class, 
which might not yet be generated. Similarly, the <code>editor</code> may try to include 
the <code>scoper</code>.
</p>

{/snippet}

