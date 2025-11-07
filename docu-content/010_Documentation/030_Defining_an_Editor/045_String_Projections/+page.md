---
title: String Projections
description: Learn how to display string properties in Freon as single-line or multi-line text fields, and how to use the multiline keyword in projections.
tags: string projections, multiline, text fields, editor controls, projectional editor, string properties, Freon, DSL development
---

<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# String Projections

String can be displayed as a single-line or multi-line text. 

## Single Line

The single line display is the default, therefore there is no need to add any information other than
adding the string-typed property to the projection.

As an example, we used the `productName` property of the concept `InsuranceProduct`.

```proto
// Insurance/src/defs/language-main.ast#L53-L55

concept InsuranceProduct {
    name: identifier;                       // internal name
    productName: string;                    // name by which this product is known to the public
```

The property is displayed like this.

```proto
// Insurance/src/defs/editor-main-default.edit#L39-L39

Insurance Product ${name} ( public name: ${productName} ) USES ${basedOn horizontal separator[, ]}
```

This produces the following result.

<Figure
imageName={'documentation/Documentation-String-Projections-screenshot1.png'}
caption={'A single line string property'}
figureNumber={1}
/>

## Multi-Line

To indicate the use of a multi-line display add the keyword `multiline` to the projection.

```proto
// Insurance/src/defs/editor-main-comments.edit#L37-L37

Insurance Product ${name} ( public name: ${productName} ) USES ${basedOn horizontal separator[, ]}
```

This results in the following.

<Figure
imageName={'documentation/Documentation-String-Projections-screenshot2.png'}
caption={'A multi-line string property'}
figureNumber={1}
/>
