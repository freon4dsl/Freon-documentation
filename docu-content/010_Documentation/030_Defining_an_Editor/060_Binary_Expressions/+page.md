---
title: Binary Expressions
description: Learn how binary expression concepts are handled in Freon and how to define operator symbols such as plus, minus, multiply, and divide in .edit files.
tags: binary expressions, operator symbols, expression concepts, projectional editor, editor definition, Freon, DSL development
---

# Binary Expressions

In [Defining an Editor](/Documentation/Defining_an_Editor) it was already mentioned 
that projections cannot be specified for _binary expression concepts_.
The editor offers specialized support for binary expressions, which will not function properly
if a user-defined projection is applied.

## Symbols

You can, however, indicate the string to be used as the operator. This string is called the **symbol**.
It is defined in the `.edit` file, as shown below.

```proto
// Insurance/src/defs/editor-expressions-default.edit#L18-L29

MinusExpression  {
    symbol = "-"
}
PlusExpression {
    symbol = "+"
}
MultiplyExpression {
    symbol = "*"
}
DivideExpression {
    symbol = "/"
}
```
