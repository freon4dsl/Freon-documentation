# Binary Expressions

In [Defining an Editor](/Documentation/Defining_an_Editor) it was already mentioned 
that projections cannot be specified for _binary expression concepts_.
The editor offers specialized support for binary expressions, which cannot function properly
if a user-defined projection is applied.

## Symbols

You can, however, indicate the string to be used as operand. This string is called the **symbol**.
It is defined in the `.edit` file, as shown below.

```freon
// DocuProject/src/defs/editor-expressions-default.edit#L18-L29

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
