<script>
    import Figure from '$lib/figures/Figure.svelte';
</script>

# Expressions in Freon

Many DSLs have some form of expressions, like `24 + 56`. Even though they may appear simple, if you have ever
tried to build a language, you will know that expressions are tricky bastards (excuse the French). In Freon, therefore, they take
a very special place.

In this lesson we introduce expressions by adding grading rules to each `Topic`. Therefore, we need to change the metamodel.
Open the file `edu-topics.ast` and add one line to the `Page` concept.

```freon
// Education/lesson4-defs/edu-topics.ast#L10-L14

abstract concept Page {
    name: identifier;
    questions: Question[];
    grading: GradeScore[]; /* concept from 'edu-scoring.ast' */
}
```

Of course, we are going to define the `GradeScore` concept, but for this we create a new file called `edu-scoring.ast`.
Add the following lines to it.

```freon
// Education/lesson4-defs/edu-scoring.ast#L1-L6

language Education

concept GradeScore {
    grade: Grade;
    expr: ScoreExpression;
}
```

Yes, the concept `ScoreExpression` represents our expression. To get an idea of
how the concept should be defined, let's get some idea what the user wants to express.

## The Requirements

Grading is all about the answers given to the questions on the page. For instance, if all answers are correct,
the score should be top grade. But, if all answers are incorrect, the score should be the lowest grade.
Speaking to our hypothetical client (<img src="/icons/smile.png" alt="Smiley" width="20" height="20">), we
learn that the teachers also want to give a certain grade when the answers to certain questions are correct,
where the answers to other questions are less important. So, the teachers may want to write things like:

```txt
GradeC: Answer to questionX is correct AND the Number of Correct Answers = 3

GradeD: Answer to questionY is correct OR Answer to questionZ is correct AND the Number of Correct Answers > 2
```

So, what do we have here.

1. There is a number literal for the **3** and **2**.
2. We need something that represent **Number of Correct Answers**.
3. To deal with **questionX** and **questionY** we need a reference to a question on the page.
4. We need binary expressions for the boolean **AND** and **OR**.
5. There is also a need for an equals expression to be able to deal with the **=-sign**.
6. The **>-sign** also introduces a new type of expression.

This is how we define the first three concepts of the above list.

```freon
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

Instead of the keyword `concept`, we use the keyword `expression` to let Freon know that instances
of these concepts should be treated differently. We make `ScoreExpression` the base parent of all
our expressions, so we can use it where ever we need an expression. For the rest, the definitions look
like ordinary concepts.

## Binary Expressions

Freon adds loads of extra stuff to handle binary expressions. All we have to do is tell Freon that
the concept is a binary expression concept. Look at how we define the two binary expressions for
the boolean **AND** and **OR**.

```freon
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

Here it comes in handy that there is a single base parent for
expressions, the `ScoreExpression`. We can have any instance of a
`ScoreExpression` at the left hand side of any `BinaryExpression`, as well as to the
right hand side.

Notice that the `AndExpression` and `OrExpression` have no properties of their own.
This is usually the case.
It often makes no sense to add properties, but Freon does not forbid it. However, we
do add a special feature, namely the `priority`. To be able to balance the abstract syntax tree for
an expression you need to know which expression has priority over the other.

For instance, in mathematics multiplication has priority over plus. The expression
`8 * 7 + 1` should be read as `(8 * 7) + 1`, and not as `8 * (7 + 1)`.

In Freon, we indicate this priority by a number. A high number means high priority,
a low number means low priority.

## The Comparison Expressions

What is left of the requirements for our expressions are the `=` and `>` signs. But let's
not be stingy, and create expression concepts for `<`, `>=`, and `<=` as well.

```freon
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

Now, let Freon generate the editor again, and open the model `lesson4` (todo check name). Note that we are opening 
another model, because we have added concept to the metamodel. The new model contains instances of the new concepts.

`%@$#&*!!!`, so much work, and nothing has changed!
Yep, as so often occurs, we forgot one tiny thing: the editor definition for `Page` (or any of its children) does
not mention the new `grading` property, thus it will not be shown. Let's address that right now. We'll change the `Page` projection
in `page-footing.edit` to the following.

```freon
// Education/lesson4-defs/page-footing.edit#L5-L11

Page {[
    Questions:
        ${self.questions vertical}

    Score
        ${self.grading vertical}
]}
```

Generate again, and this is (part of) what you will see. Not especially pretty, but we have our expressions. In the next
lesson you will learn how to project expressions.

<Figure
imageName={'tutorial/Tutorial-lesson4-screenshot1.png'}
caption={'Editor after adding grading to the metamodel'}
figureNumber={1}
/>
