<script>
    import Note from "../../lib/notes/Note.svelte";
    import Figure from "../../lib/figures/Figure.svelte";
</script>

# Use of the ProjectIt Generator

The ProjectIt commandline tool generates code from the various definition files as described in
[A Language in Five Parts](/010_Intro/040_A_Language_in_Five_Parts).
If you type ‘`projectit`’ in a (bash) terminal you will see
an overview of the different
arguments that can be used. For detailed help about a specific command, type: ‘`projectit  <command> -h`’.

<Figure
imageName={'projectit-command-line-options.png'}
caption={'Screenshot of commandline options'}
figureNumber={1}
/>

// TODO  update screenshot to current
// FIXME  *all* within a Svelte fragment doesn't render as Markdown

<Note>
<svelte:fragment slot="header"> Incomplete code</svelte:fragment>
<svelte:fragment slot="content">
Note that every command except *all*, used individually (i.e. without the other commands), generates code that
does not compile correctly.
For instance, both the scoper and validator might need to use the typer, therefore the
code seeks to include the typer class, which might not be generated yet. Likewise, the editor seeks to include
the scoper.
The best way to go about is to first use the *all* command. Next, when you focus on one of the aspects of your
language, you can use the specific command for that aspect. Thus, you can keep regeneration-time as short as possible.
</svelte:fragment>
</Note>

<Note>
<svelte:fragment slot="header"> Watch Option</svelte:fragment>
<svelte:fragment slot="content">
There also is a `-watch` option to automatically run the *all* command when a definition file changes.
</svelte:fragment>
</Note>
