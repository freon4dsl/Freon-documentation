<script>
    import Note from "$lib/notes/Note.svelte";
</script>

# The Typer Definition

This tutorial describes the possibilities of defining a type provider (or typer, for short).
In the typer definition you provide the information necessary to do type checking.

### Three-level definition

As explained in [Three Levels of Customization](/010_Intro/050_Three_Levels_of_Customization#levels)
the generated typer can be defined in three levels.
For each _concept_ in the AST the typer will

1. use the _hand-made typing rule(s)_, when present. Otherwise, the typer will
2. use to the _typing rule(s) generated from the typer definition_, when this definition is present.

There are no default typing rules, so the typer does not have a fallback to a third level, that is,
when ask for the type of an AST node the typer will simply return a null value.

## Content

In [Typer Files](/030_Developing_a_Language/020_Definition_Level/030_Typer_Definition/010_Typer_Files) you can find an explanation of the parts of a typer definition.
In [Typer Example](/030_Developing_a_Language/020_Definition_Level/030_Typer_Definition/030_Example_Typer_Definition) you can find an example of
commonly used types and how to define them.
