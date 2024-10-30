<script>
    import Note from "$lib/notes/Note.svelte";
</script>

# The Scoper Definition

For now, the scoper definition does not support our [three-level approach](/010_Intro/050_Three_Levels_of_Customization).
You can manually code your own scoper on the 3rd level, but it is not possible to combine this with the
scopers on the 1st and 2nd levels.

This tutorial
describes the possibilities of defining a scoper in the scoper definition file (with extension `.scope`).

In the scoper definition you provide the information necessary to determine which names are visible from a certain
element of your user's model.
