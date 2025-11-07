---
title: Expressions in Freon
description: Add grading logic to your DSL by introducing expressions in Freon. Define ScoreExpression variants (question references, number literals, counts), build binary and comparison expressions with priorities, and update the editor to show grading.
tags: Freon, expressions, DSL, grading, ScoreExpression, QuestionReference, NrOfCorrectAnswers, NumberLiteralExpression, binary expressions, AND, OR, comparisons, Equals, GreaterThan, LessThan, editor projections, Page, GradeScore, tutorial
---

<script>
    import Figure from '$lib/figures/Figure.svelte';
</script>

# Expressions in Freon

Many DSLs include expressions like `24 + 56`. Even though they may look simple, anyone who has tried to build a language knows expressions can be tricky. In Freon, they therefore have a special place.

In this lesson we introduce expressions by adding grading rules to each `Topic`. To do this, we need to update the metamodel.
Open the file `edu-topics.ast` and add one line to the `Page` concept.

```proto
// Education/lesson4-defs/edu-topics.ast#L10-L14

abstract concept Page {
    name: identifier;
    questions: Question[];
    grading: GradeScore[]; /* concept from 'edu-scoring.ast' */
}
```

We’ll define the `GradeScore` concept in a new file called `edu-scoring.ast`.
Add the following lines:

```proto
// Education/lesson4-defs/edu-scoring.ast#L1-L6

language Education

concept GradeScore {
    grade: Grade;
    expr: ScoreExpression;
}
```

Yes, the `expr` property uses `ScoreExpression`, which represents our expressions. To design it well, let’s first understand what users want to express.

## The Requirements

Grading depends on answers to the questions on a page. For instance, if all answers are correct, the score should be the top grade; if all are incorrect, the lowest grade applies. Talking to our hypothetical client (<img src="/icons/smile.png" alt="Smiley" width="20" height="20">), we learn that teachers want to assign a grade when specific questions are correct, even if others matter less. They might write:

```txt
GradeC: Answer to questionX is correct AND the Number of Correct Answers = 3

GradeD: Answer to questionY is correct OR Answer to questionZ is correct AND the Number of Correct Answers > 2
```

So, what do we need?

1. A number literal for the **3** and **2**.
2. Something that represents **Number of Correct Answers**.
3. A reference to a question on the page (for **questionX**, **questionY**, etc.).
4. Binary boolean expressions (**AND**, **OR**).
5. An equals comparison for `=`.
6. A greater-than comparison for `>` (and we’ll add the others for completeness).

Here’s how we define the first three items:

```proto
// Education/lesson4-defs/edu-scoring.ast#L8-L28

///////////////////////////////////
/// Expressions
//////////////////////////////////
abstract expression ScoreExpression {
}

/* The value of a question reference is the answer given to the
given question */
expression QuestionReference base ScoreExpression {
    reference question: Question;
}

/* The value of NrOfCorrectAnswers is the total number of correct
answers on a page. */
expression NrOfCorrectAnswers base ScoreExpression {
}

/* The value of a NumberLiteralExpression is simply a number, like '24' */
expression NumberLiteralExpression base ScoreExpression {
    value: number;
}
```

Instead of `concept`, we use `expression` to tell Freon that instances of these types are expressions.  
`ScoreExpression` is the common base so we can use it wherever an expression is needed. Otherwise, the definitions look similar to ordinary concepts.

## Binary Expressions

Freon provides extra support for binary expressions. We only need to declare that a concept is a binary expression. Below we define boolean **AND** and **OR**:

```proto
// Education/lesson4-defs/edu-scoring.ast#L30-L44

///////////////////////////////////
/// Boolean AND and OR
//////////////////////////////////
abstract binary expression BinaryExpression base ScoreExpression {
    left: ScoreExpression;
    right: ScoreExpression;
}

binary expression AndExpression base BinaryExpression {
    priority = 1;
}

binary expression OrExpression base BinaryExpression {
    priority = 1;
}
```

Because all expressions share `ScoreExpression` as a base, any `ScoreExpression` can appear on the left or right side of a `BinaryExpression`.

`AndExpression` and `OrExpression` don’t need extra properties (that’s typical), but we do set a `priority`. Expression trees need priorities to parse and render correctly.  
In math, multiplication has higher priority than addition, so `8 * 7 + 1` is `(8 * 7) + 1`, not `8 * (7 + 1)`.  
In Freon, a higher number means higher priority.

## The Comparison Expressions

To satisfy `=` and `>`, we’ll also add `<`, `>=`, and `<=` for completeness:

```proto
// Education/lesson4-defs/edu-scoring.ast#L46-L70

///////////////////////////////////
/// Comparisons: <=, >=, >, <, ===
//////////////////////////////////
abstract binary expression ComparisonExpression base BinaryExpression {
}

binary expression LessOrEqualsExpression base ComparisonExpression {
    priority = 2;
}

binary expression GreaterOrEqualsExpression base ComparisonExpression {
    priority = 2;
}

binary expression LessThenExpression base ComparisonExpression {
    priority = 2;
}

binary expression GreaterThenExpression base ComparisonExpression {
    priority = 2;
}

binary expression EqualsExpression base ComparisonExpression {
    priority = 2;
}
```

Now generate the editor again and open the `lesson4` model. We switch models because the metamodel gained new concepts, and the new model contains instances of them.

`%@$#&*!!!`—after all that, nothing changed!  
Right: the `Page` projection (or its children) doesn’t mention the new `grading` property, so it isn’t shown. Let’s fix that by updating the `Page` projection in `page-footing.edit`:

```proto
// Education/lesson4-defs/page-footing.edit#L5-L11

Page {[
    Questions:
        ${self.questions vertical}

    Score
        ${self.grading vertical}
]}
```

Generate again and you’ll see (part of) the grading information. It’s not pretty yet, but the expressions are there.  
In the next lesson, you’ll learn how to **project expressions** nicely.

<Figure
imageName={'tutorial/Tutorial-lesson4-screenshot1.png'}
caption={'Editor after adding grading to the metamodel'}
figureNumber={1}
/>
