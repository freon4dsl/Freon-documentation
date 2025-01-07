<script>
    import Note from "$lib/notes/Note.svelte";
</script>

# Projections and Indentation

The indentation you use in a projection is taken into account in the display. Thus, in the following example `literal text` will
appear indented 8 spaces from `This is`.

```proto
// DocuProject/src/defs/editor-indentation.edit#L6-L14

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
Therefore, you can indent the projection as a whole, without it having any influence on the projection.
The next example produces the exact same result as the previous.

```proto
// DocuProject/src/defs/editor-indentation.edit#L16-L24

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
// DocuProject/src/defs/editor-indentation.edit#L26-L34

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

In the determination of the least indent, the indentation of the closing bracket is also considered. Therefore,
the following example will take the closing bracket as margin, and even the line `for every concept of type Text.`
will be indented with 3 spaces.

```proto
// DocuProject/src/defs/editor-indentation.edit#L36-L44

Text4 {
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
<svelte:fragment slot="header"> Indentation is incremental</svelte:fragment>
<svelte:fragment slot="content">
Any indentation of a property is added to the indentation of the projection of this property.
Thus, when a `Text` element is used within another projection,
the indentation that is defined by the projection in the definition for `Text` will be preceded
by any indentation defined in the projection for the enclosing concept.
</svelte:fragment>
</Note>
