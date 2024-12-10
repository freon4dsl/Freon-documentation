<script>
    import Figure from '$lib/figures/Figure.svelte';
</script>

# Projections for Expressions

In this lesson you will learn how to define projections for expressions such that you get the full benefit
of Freon's built-in expression power.

## Cleaning up the <i>GradeScore</i> Concept

Remember from the previous lesson that we defined a new concept `GradeScore`. We will start by making its projection
look a bit better. We want it to look like the requirements.

```txt
GradeC: Answer to questionX is correct AND the Number of Correct Answers = 3

GradeD: Answer to questionY is correct OR Answer to questionZ is correct AND the Number of Correct Answers > 2
```

Thus, the projection needs to be defined like this.

```txt
// Education/lesson5-defs/edu-scoring.edit#L1-L6

editor default

GradeScore {[
    ${self.grade} : ${self.expr}
]}

```

## Reference Shortcut

The next thing to tackle is the `Answer to questionY is correct`-part. We represented this in the metamodel by the
concept `QuestionReference`, so the projection needs to be like this.

```txt
// Education/lesson5-defs/edu-scoring.edit#L11-L14

QuestionReference {
    [ Answer to ${self.question} is correct ]
    trigger = "question"
    referenceShortcut = ${self.question}
```

In lesson 2 [Making an Editor](/Tutorial/Making_an_Editor) we already encountered the **trigger**, a means to make editing easier for your user.
Here we do something ever more sophisticated. We use a **reference shortcut**.

To understand what it does, you need know that when a question reference is added, not one, but two nodes must be added to the AST.
The first is an instance of `QuestionReference`, the second (the child of this instance) is an instance of the core type `FreNodeReference`.
Normally, the user must select the type of the node to add it to the tree. So in this case, the user should first select `QuestionReference`, and 
then `FreNodeReference`. 

The reference shortcut is there to avoid the double selection. The instance of `QuestionReference` is automatically created when a reference is 
selected that fits as content of the property `question`.

We also add the next lines. These should not hold any surprises for you. You have already learned a lot from the previous lessons! Note that
we suffice with a constant text string for the `NrOfCorrectAnswers` concept.

```txt
// Education/lesson5-defs/edu-scoring.edit#L16-L22


NrOfCorrectAnswers {
    [Number Of Correct Answers]
}

NumberLiteralExpression {
    [${value}]
```

# Binary Expressions

Creating projections for binary expressions is no rocket science. All you have to do is tell Freon which symbol to use as 
operand.

```txt
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

Upon generation, you will see the following. Expressions that really look like expressions.

<Figure
imageName={'tutorial/Tutorial-lesson5-screenshot1.png'}
caption={'Editor after projections for expressions'}
figureNumber={1}
/>

Note that the binary expressions have brackets around them to indicate the priorities that where defined in the `edu-scoring.ast` file.
If you do not want to see them, go to the `View` menu and deselect 'Brackets'.

Go ahead and play around with what we have created so far. Maybe you notice that in the Score for page 'Theory101' we can select 
references to questions from the other pages. That is not exactly what we are hoping for. Our teachers should only be able to
give grades based on the questions of the current page. This means that we are in need of scoping, which is the topic to be addressed
in the next lesson.
