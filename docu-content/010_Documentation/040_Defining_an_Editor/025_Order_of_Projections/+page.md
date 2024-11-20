<script>
    import Note from "$lib/notes/Note.svelte";
     let self;
</script>

# The Editor Definition

The editor definition is the definition of the **concrete syntax** of the language. It is used for the generation of the editor, as
well as the generation of the parser and unparser. The concrete syntax given in the editor definition is also used
to produce better readable error messages by the validator.

### Three-level definition

As explained in [Three Levels of Customization](/Overview/Three_Levels_of_Customization#levels) the generated editor can be defined at three levels.
For each _concept_ in the AST the editor will

1. use the _hand-made projection_, when this is present. Otherwise, the editor will
2. use to the _projection generated from the editor definition_, when this definition is present. Finally, the editor will
3. use the _default projection_.

The rest of this tutorial explains the second level: how to write an editor definition (`.edit` file).
For making more adjustments to the projection by adding hand-made projections on the third level, see the
tutorial on [using the framework](/Developing_a_Language/API_Level/Editor_API).
