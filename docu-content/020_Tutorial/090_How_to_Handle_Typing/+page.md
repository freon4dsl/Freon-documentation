<script>
    import PrevNextSection from '$lib/tutorial/PrevNextSection.svelte';
    import Figure from '$lib/figures/Figure.svelte';

    let prevLink = '/Tutorial/More_Scoping';
    let nextLink = '/Tutorial/Validating_the_model';
</script>

<PrevNextSection {prevLink} {nextLink} />

# How to Handle Typing

In this lesson you will learn how to add types to the concepts in your DSL.

## What are _Types_, and why should you care?

In Freon types are normal concepts, but usually types are not projected. They, normally, do not appear 
in .edit files. So, why are they important? Let's look at the screenshot below.

<Figure
imageName={'Tutorial-lesson8-screenshot1.png'}
caption={'Undetected errors in grading expressions'}
figureNumber={1}
/>

Do you see the grading expression? There is an equals expression of `Number of Correct Answers`, something
that clearly should result in an integer value, and `Answer to lollipops2 is correct`, which is obviously
some boolean value. The answer is correct, or not. So we are comparing an integer number with a boolean value.
In this case, it might be obvious that there is a mistake, but in more complex expressions, you might want 
to give the user some
feedback that this is not the way to go.

So, let's introduce a Type concept. Let's keep it simple for now, but keep in mind that we might want to extend
our typings. Therefore, we make `Type` an interface, and have one concept that implements it: `PrimitiveType`,
which is a simple enumeration. We have also added an `ANY` instance, which represents an amorphous type that everything 
can conform to, like `Object`. There is no reason for this yet, we just want to be prepared for extensions.
We add the following to our `edu-main.ast` file.

```txt
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

Now we have defined concepts, that will act as types in our DSL, there must be a way to tell Freon
which concepts are types. And ..., Freon needs to know which concepts are _typed_, that is, which concepts
have a type associated with it. 
Fortunately, this is simple. (Sorry, it is a bit lame to keep on saying that things are easy. 
Can't help it, they really are. <img src="/icons/smile.png" alt="SMILE" width="20" height="20"/> ) 

Let's create yet another file, called `edu-scoring.type`, and add
the following lines to it. They mean that all instances of the concept `Type` are types, and 
that all instances of `ScoreExpression` have a type.

```txt
// Education/lesson8-defs/edu-scoring.type#L1-L5

typer

istype { Type }

hastype { ScoreExpression }
```

But what about the NrOfCorrectAnswers concept? How do we express which type to associate with instances of this concept?
And what about the other concepts that inherit from `ScoreExpression`? Let's not beat around the bush. This is how.

```txt
// Education/lesson8-defs/edu-scoring.type#L7-L24

QuestionReference {
    infertype PrimitiveType:Boolean;
}
NrOfCorrectAnswers {
    infertype PrimitiveType:Integer;
}
NumberLiteralExpression {
    infertype PrimitiveType:Integer;
}
OrExpression {
    infertype PrimitiveType:Boolean;
}
AndExpression {
    infertype PrimitiveType:Boolean;
}
ComparisonExpression {
    infertype PrimitiveType:Boolean;
}
```

In the next lesson we will show how to use the typings to validate the grading expressions.

<PrevNextSection {prevLink} {nextLink} />
