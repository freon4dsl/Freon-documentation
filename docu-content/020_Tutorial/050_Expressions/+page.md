<script>
    import PrevNextSection from '$lib/tutorial/PrevNextSection.svelte';
</script>

# Expressions in Freon

Many DSLs have some form of expressions, like `24 + 56`. Even though they may appear simple, if you have ever
tried to build a language, you will know that expressions are tricky bastards (excuse the French). In Freon, therefore, they take 
a very special place.

In this lesson we introduce expressions by creating the metamodel for the third model unit, the _Test_ model unit. Remember that our hypothetical 
client company wanted a means to test the page flow before the actual webpages are produced. That is what the _Test_ model unit is about.

## What Users Will Write

```txt
Scenario description 
    "Test of topic Fractions, flow for grade A students"
Start: fractions235    
Step1: on gradeA => expect advancedFractions203
Step2: on 
    answer to question1: 5 OR answer to question3: true
    => expect extraExplanation43
Step3: on 
    answer to question1: 1/2 AND answer to question4: 12
    => expect excellentPage       
```

## The AST for the _Test_ model unit

Ready to create a new file? Let's call it `edu-tests.ast` and fill it with the following code.

```txt
// Education/lesson4-defs/edu-tests.ast#L1-L30

language Education

modelunit Test {
    name: identifier;
    scenarios: Scenario[];
    reference subject: Subject;
    reference flow: Flow;
}

concept Scenario {
    description: string;
    testFlow: TestFlow[];
    steps: Step[]; /* Note that the order is of importance */
}
concept TestFlow {
    steps: Step[]; /* Note that the order is of importance */
}
concept Step {
    reference expectedPage: Page;
    answerSeries: Answer[];
}

concept StartStep base Step {
    reference fromPage: Page;
    reference expectedPage: Page;
    answerSeries: Answer[];
}

concept Answer {
    reference question: Question;
```

Let's see what we have got here. Note that we are defining the metamodel, not the editor, at this point.

First, there is again the name of the language, which makes sure that this is part of the metamodel of the _Education_ 
Language. Second, we define the _Test_ model unit. The main property of the model unit is `scenarios: Scenario[]`,
a list of test scenarios. Each test scenario deals with a certain flow (`reference flow: FlowDescription`) 
with regard to a certain topic (`reference topic: Topic`), that is, to a certain subset of 
pages that cover the topic to be taught. Both of which will be defined in one of the other model units, therefore we use references.
A test scenario walks through a number of steps until it reaches an end step.

Because there are two different types of steps, both of them inherit from the abstract concept _AbstractStep_. The normal step is one
that goes from a certain page to another page. Which page is the next depends on the reaction of the pupil to the questions on the page.
In the metamodel this is represented by `answersGiven: Answer[]`. 

We are testing, thus we are not sure whether the next page is equal to the page described by the _PageTransitions_ from the _Flow_ model units.
The trick is to compare the next page with what is defined there. We need to mimic the answers given by 
the pupil to be able to make this comparison. And here is where expressions come in. 

## The _AnswerExpression_ concept

What we need is a way to describe the actual answer given to the question, combine these answers for all questions on a page, and grade
this combination such that we get something that we can compare with the condition for a _PageTransition_. Let's again look at the 
definition of a _PageTransition_.

```txt
// Education/lesson4-defs/edu-flow.ast#L15-L18

concept PageTransition { /* E.g. Grade A => show pageA, Grade F => show pageC */
    condition: Grade; /* Note: will be changed into an expression later in the tutorial. */
    reference toPage: Page;
}
```

The condition for a page transition is a `Grade`. The result of the grading of the combined answers must therefore 
be a `Grade`. Our first test could therefore be something that takes a literal `Grade` as condition to a page transition.

```txt
abstract expression GradeExpression {}

expression GradeLiteral base GradeExpression {
    reference grade: Grade;
}
```



<PrevNextSection prevLink= "/Tutorial/More_Fun_with_Projections" nextLink="/Tutorial/In_Need_of_Scoping" />
