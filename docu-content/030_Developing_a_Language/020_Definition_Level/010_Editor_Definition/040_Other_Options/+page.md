# Reference Shortcuts, Symbols, and Triggers

The projection for `FunctionCallExpression`, shows how to define a **trigger**.
The trigger is a string of characters that is used within the editor to trigger the creation
of an instance of concept `FunctionCallExpression`.

```ts
// DocuProject/src/defs/editor-expressions-default.edit#L27-L31

DivideExpression {
    symbol = "/"
}
FunctionCallExpression {
    [${funcDefinition} ( ${args horizontal separator[,] } )]
```

The example also shows how to define a **reference shortcut**. This option can only be used for reference properties.
When such a property is created, normally the user would have to first select the type `FunctionCallExpression`,
only after selecting this, the user is able to enter the name of the referred element. The reference shortcut
indicates that the user will be able to select the name of the referred element without the intermediate step.

In the next example, a **symbol** is defined for the operator of the binary expression `PlusExpression`.

```ts
// DocuProject/src/defs/editor-expressions-default.edit#L18-L20

MinusExpression  {
    symbol = "-"
}
```
