---
title: Validating the Model
description: Use Freon’s typing system to validate expressions in your DSL. Learn how to define custom validation rules with type checks that detect mismatched operand types in logical and comparison expressions.
tags: Freon, validation, typing, type checking, equalsType, AndExpression, OrExpression, comparison expressions, validator, DSL, Education language, tutorial
---

<script>
    import Figure from '$lib/figures/Figure.svelte';
</script>

# Validating the Model

In the previous lesson, we learned how to add typings to the model, but we didn’t yet use them to provide user feedback.  
In this lesson, we’ll use those typings to **validate the model** and produce **type errors**.

## Adding Type Checking

Freon automatically generates a **validator** for your DSL that includes several built-in checks.  
For example, it verifies that all references point to valid targets and that every property with the type `identifier` has a valid TypeScript identifier as its value.

However, Freon doesn’t include built-in checks for **types**—you need to define those yourself.  
Let’s take the `AndExpression` concept. It has both a left-hand and a right-hand side, and both should have the type **Boolean**.  
We can define a similar rule for `OrExpression`.

Add a file called `edu.valid` and include the following definitions:

```proto
// Education/lesson9-defs/edu.valid#L1-L11

validator for language Education

AndExpression {
    typecheck equalsType( self.left, #PrimitiveType:Boolean );
    typecheck equalsType( self.right, #PrimitiveType:Boolean );
}

OrExpression {
    typecheck equalsType( self.left, #PrimitiveType:Boolean );
    typecheck equalsType( self.right, #PrimitiveType:Boolean );
}
```

Now, what about instances of `LessOrEqualsExpression` and the other comparison expressions?  
They also have left and right sides, but for them, it’s not about a specific type—it’s about **both sides having the same type**.  
We can define that as follows:

```proto
// Education/lesson9-defs/edu.valid#L13-L31

LessOrEqualsExpression {
    typecheck equalsType( self.left, self.right );
}

GreaterOrEqualsExpression {
    typecheck equalsType( self.left, self.right );
}

LessThenExpression {
    typecheck equalsType( self.left, self.right );
}

GreaterThenExpression {
    typecheck equalsType( self.left, self.right );
}

EqualsExpression {
    typecheck equalsType( self.left, self.right );
}
```

## The Result

Once validation is configured, Freon can identify type mismatches and display errors in the editor.

Currently, validation doesn’t run automatically—you need to activate it manually.  
Open the **Edit** menu and select **Validate** to trigger the checks.  
When you do, you’ll see something like this:

<Figure
imageName={'tutorial/Tutorial-lesson9-screenshot1.png'}
caption={'Validation error in grading expression'}
figureNumber={1}
/>
