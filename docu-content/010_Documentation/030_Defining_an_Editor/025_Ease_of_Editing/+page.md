# Ease of Editing

As language engineer, you can make editing a little bit easier for your users. Freon offers two options to do so.

## Reference Shortcuts

In the actual abstract syntax tree, a reference property is stored as a node that holds the information on,
and link to, the referred node. The type of this node is `FreNodeReference`. When creating a new reference property, 
this means that two actions need to be executed by Freon. First, the `FreNodeReference` instance needs to be 
created, and second, the link needs to be established between this `FreNodeReference` instance and the node that 
is referred to.

To avoid exposing this two-step process to the user, the language engineer may define a **reference shortcut**.
This is a property of the concept that is named directly, and when selected by the user causes this two-step 
process to be performed as one. This can be useful, especially when dealing with expressions. 

Our running example provides the expression concept `InsurancePartRef`.

```proto
// DocuProject/src/defs/language-expressions.ast#L54-L57

// Expression used to refer to the insurance parts of a product
expression InsurancePartRef base DocuExpression {
    reference part: InsurancePart;
}
```

For this concept the following projection is defined.

```proto
// DocuProject/src/defs/editor-expressions-default.edit#L35-L38

InsurancePartRef {
    [${self.part}]
    referenceShortcut = ${self.part}
}
```

[//]: # (todo finish this when bug for limited values is fixed)

## Triggers

When the user wants to create an instance of a concept using the keyboard, a special character or string
of characters can be used to trigger the creation of that instance. This makes it easier
to enter an expression in the projectional editor, similar to entering that expression in a text-based editor.
The character or string of characters is called a **trigger**.

The example shows a trigger for entering a function call expression.

```proto
// DocuProject/src/defs/editor-expressions-default.edit#L30-L34

FunctionCallExpression {
    [${funcDefinition} ( ${args horizontal separator[,] } )]
    referenceShortcut = ${funcDefinition}
    trigger = "calc"
}
```
