---
title: How to Handle Typing
description: Learn how to introduce typing into your Freon DSL. Define Type and PrimitiveType concepts, mark ScoreExpression as typed, and infer expression result types to detect logical mismatches in grading expressions.
tags: Freon, typing, typesystem, type inference, Type, PrimitiveType, Boolean, Integer, ScoreExpression, QuestionReference, NrOfCorrectAnswers, NumberLiteralExpression, DSL, validation, Education language, tutorial
---

<script>
    import Figure from '$lib/figures/Figure.svelte';
</script>

# How to Handle Typing

In this lesson, you’ll learn how to add **types** to the concepts in your DSL.

## What are _Types_, and why should you care?

In Freon, types are normal concepts. Typically, they’re **not projected**—you won’t see them in `.edit` files.  
So, why are they important? Let’s take a look.

<Figure
imageName={'tutorial/Tutorial-lesson8-screenshot1.png'}
caption={'Undetected errors in grading expressions'}
figureNumber={1}
/>

See the grading expression? It compares `Number of Correct Answers`, which should be an integer, with `Answer to lollipops2 is correct`, which is a boolean.  
We’re effectively comparing an integer to a boolean—clearly an error. In this simple case it’s obvious, but in larger expressions users need help detecting such mistakes.

Let’s introduce a **Type** concept to handle this.

We’ll keep it simple for now but prepare for future extensions.  
We define `Type` as an **interface**, and add one implementation: `PrimitiveType`, which is a limited (enumerated) concept.  
We also include an `ANY` instance to represent a universal type (similar to `Object` in other languages).

Add the following to your `edu-main.ast` file:

```proto
// Education/lesson8-defs/edu-main.ast#L19-L27

interface Type {
    name: identifier;
}

limited PrimitiveType implements Type {
    Integer;
    Boolean;
    ANY;
}
```

## How does a concept become a Type?

Now that we’ve defined what types are, Freon needs to know:

1. **Which concepts are types**, and
2. **Which concepts are typed** (i.e., have an associated type).

Fortunately, that’s simple!  
Create a file called `edu-scoring.type`, and add:

```proto
// Education/lesson8-defs/edu-scoring.type#L1-L5

typer

istype { Type }

hastype { ScoreExpression }
```

This tells Freon that all instances of `Type` are valid types, and all instances of `ScoreExpression` are typed elements.

But what about the `NrOfCorrectAnswers` concept?  
How do we specify which type each expression returns?  
For that, we use the **`infertype`** directive.

```proto
// Education/lesson8-defs/edu-scoring.type#L7-L24

QuestionReference {
    infertype #PrimitiveType:Boolean;
}
NrOfCorrectAnswers {
    infertype #PrimitiveType:Integer;
}
NumberLiteralExpression {
    infertype #PrimitiveType:Integer;
}
OrExpression {
    infertype #PrimitiveType:Boolean;
}
AndExpression {
    infertype #PrimitiveType:Boolean;
}
ComparisonExpression {
    infertype #PrimitiveType:Boolean;
}
```

Here we declare that:

- Question references and boolean operators evaluate to `Boolean`.
- Numeric expressions and counts evaluate to `Integer`.
- Comparison expressions also result in `Boolean`.

With this setup, Freon can automatically detect and report mismatched types in grading expressions.

In the next lesson, we’ll use these typings to **validate** expressions and provide meaningful user feedback.
