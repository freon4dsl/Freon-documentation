---
title: Projections for Expressions
description: Define clean editor projections for expression concepts in Freon, add triggers and reference shortcuts, and assign symbols to binary and comparison expressions.
tags: Freon, expressions, projections, GradeScore, QuestionReference, referenceShortcut, trigger, NrOfCorrectAnswers, NumberLiteralExpression, binary expressions, AND, OR, comparisons, editor, tutorial
---

<script>
    import Figure from '$lib/figures/Figure.svelte';
</script>

# Projections for Expressions

In this lesson you’ll learn how to define projections for expressions so you can take full advantage of Freon’s built-in expression support.

## Cleaning up the <i>GradeScore</i> Concept

From the previous lesson we introduced the `GradeScore` concept. Let’s make its projection match the requirements:

```txt
GradeC: Answer to questionX is correct AND the Number of Correct Answers = 3

GradeD: Answer to questionY is correct OR Answer to questionZ is correct AND the Number of Correct Answers > 2
```

Define the projection like this:

```proto
// Education/lesson5-defs/edu-scoring.edit#L1-L6

editor default

GradeScore {[
    ${self.grade} : ${self.expr}
]}
```

## Reference Shortcut

Next, consider the `Answer to questionY is correct` part. In the metamodel this is represented by the `QuestionReference` concept, so the projection becomes:

```proto
// Education/lesson5-defs/edu-scoring.edit#L11-L14

QuestionReference {
    [ Answer to ${self.question} is correct ]
    trigger = "question"
    referenceShortcut = ${self.question}
```

In Lesson 2 ([Making an Editor](/Tutorial/Making_an_Editor)) you saw **triggers**, which make editing faster. Here we also use a **reference shortcut**.

When a question reference is added, two nodes are actually created in the AST: an instance of `QuestionReference`, and its child, a core `FreNodeReference`. Normally, the user would select both. With a reference shortcut, selecting a reference that fits the `question` property **automatically** creates the `QuestionReference` wrapper—no double selection required.

Add the following projections as well. Nothing new here—just formatting the remaining pieces. Note that for `NrOfCorrectAnswers` we use a constant string.

```proto
// Education/lesson5-defs/edu-scoring.edit#L16-L22


NrOfCorrectAnswers {
    [Number Of Correct Answers]
}

NumberLiteralExpression {
    [${value}]
```

# Binary Expressions

Projecting binary expressions is straightforward: tell Freon which **symbol** to display as the operator.

```proto
// Education/lesson5-defs/edu-scoring.edit#L24-L53


///////////////////////////////////
/// Boolean AND and OR
//////////////////////////////////

OrExpression {
    symbol = "or"
}
AndExpression {
    symbol = "and"
}

///////////////////////////////////
/// Comparisons: <=, >=, >, <, ===
//////////////////////////////////

LessOrEqualsExpression {
    symbol = "<="
}
GreaterOrEqualsExpression {
    symbol = ">="
}
LessThenExpression {
    symbol = "<"
}
GreaterThenExpression {
    symbol = ">"
}
EqualsExpression {
    symbol = "=="
```

After generation, you’ll see expressions rendered as proper infix expressions.

<Figure
imageName={'tutorial/Tutorial-lesson5-screenshot1.png'}
caption={'Editor after projections for expressions'}
figureNumber={1}
/>

Binary expressions are shown with brackets to reflect the priorities defined in `edu-scoring.ast`. If you prefer not to see them, open the **View** menu and deselect **Brackets**.

Experiment with the projections so far. You may notice that, in the score for page `Theory101`, you can select questions from other pages—exactly what we *don’t* want. Teachers should only grade based on the current page’s questions. That means we need **scoping**, which we’ll cover in the next lesson.
