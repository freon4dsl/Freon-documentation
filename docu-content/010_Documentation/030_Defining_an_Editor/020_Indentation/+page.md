---
title: Projections and Indentation
description: Understand how indentation in Freon projections affects the visual layout of text and nested elements in the editor, including how least indentation and incremental indentation are handled.
tags: projections, indentation, editor layout, text alignment, whitespace handling, projection syntax, Freon, DSL development
---

<script>
    import Note from "$lib/notes/Note.svelte";
</script>

# Projections and Indentation

Indentation in a projection directly affects its display. Thus, in the following example `literal text` will 
appear eight spaces farther to the right than `This is`.

```proto
// Insurance/src/defs/editor-indentation.edit#L6-L14

Text {
[
This is
        literal text
      that is projected in the
                editor
  for every concept of type Text.
]
}
```

However, this is not the complete story. Any whitespace before the line with the least indentation is ignored.
Therefore, you can indent the projection block as a whole without affecting its appearance.
The next example produces the exact same result as the previous.

```proto
// Insurance/src/defs/editor-indentation.edit#L16-L24

Text2 {
            [
            This is
                    literal text
                  that is projected in the
                            editor
              for every concept of type Text.
            ]
}
```

In the following example, the line with the least indentation is
`for every concept of type Text.` 
It will not be indented. On the other hand,
the text `This is` will be indented 10 spaces, `literal text` will be indented 8 spaces, etc.

```proto
// Insurance/src/defs/editor-indentation.edit#L26-L34

Text3 {
    [
                 This is
               literal text
          that is projected in the
                  editor
       for every concept of type Text.
            ]
}
```

When determining of the least indent, the indentation of the closing bracket is also considered. Therefore,
the following example will take the closing bracket as margin, and even the line `for every concept of type Text.`
will be indented with three spaces.

```proto
// Insurance/src/defs/editor-indentation.edit#L37-L45

    [
                 This is
               literal text
          that is projected in the
                  editor
       for every concept of type Text.
    ]
}

```

<Note> 
{#snippet header()} Indentation is incremental{/snippet}
{#snippet content()}
Any indentation applied to a property is added to the indentation of that property’s projection.
Thus, when a `Text` element is used within another projection,
the indentation that is defined by the projection in the definition for `Text` will be preceded
by any indentation defined in the projection for the enclosing concept.
{/snippet}
</Note>
