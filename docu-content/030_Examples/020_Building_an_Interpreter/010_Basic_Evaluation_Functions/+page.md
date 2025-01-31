<script>
    import Note from "$lib/notes/Note.svelte";
</script>

# More Basic Evaluation Functions

With the simplest evaluation functions done, we can turn to the actual test that needs to be done.

## The AST of the Test Model Unit 
Let's refresh your memory and have a look at the AST of the `Test` model unit.

```proto
// Education/lesson9-defs/edu-tests.ast

language Education

modelunit Test {
    name: identifier;
    scenarios: Scenario[];
    reference main: SiteGroup;
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
    reference fromPage: Page;
    answerSeries: Answer[];
}

concept LastStep base Step {
}

concept Answer {
    reference question: Question;
    value: NumberConcept;
}

```

## Evaluations of `LastStep` and `Answer`

The simplest concept in the model unit is `LastStep`. The runtime value of each of its instances
should be `true`, because a last step does not have a next page and therefore does not put any 
restrictions on the correctness of the step. The evaluation function is implemented as follows:

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L212-L214

override evalLastStep(node: LastStep, ctx: InterpreterContext): RtObject {
    return RtBoolean.TRUE
}
```

Next, we are going to determine the runtime value for an `Answer`. Here, we need to compare the answer 
that is given with the one that is defined as being the correct answer to the question. The 
first is found by evaluating the `value` of the answer, which is either a simple number or a fraction. For 
both the evaluation functions are already defined. The second is found by evaluating the correct answer 
from the question, but because `question` is defined in the .ast file as a reference, we need to use `.referred`
to obtain its value and check whether the reference was found. 

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L202-L210

override evalAnswer(node: Answer, ctx: InterpreterContext): RtObject {
    console.log(`evalAnswer.node ${node?.$question.content}`)
    const actualAnswer = main.evaluate(node.value, ctx)
    if (node.question.referred !== undefined && node.question.referred !== null) {
        const expectedAnswer = main.evaluate(node.question.referred.correctAnswer, ctx)
        return actualAnswer.equals(expectedAnswer)
    }
    return new RtError("evalAnswer: question not found")
}
```

## Evaluation of Page

The next concept up in the AST is `Step`, but we haven't determined yet how to evaluate 
one of its parts: `reference fromPage: Page`. So, we first have to define the evaluation 
function for pages. However, the concept `Page` is an abstract concept.

```proto
// Education/lesson9-defs/edu-topics.ast#L10-L14

abstract concept Page {
    name: identifier;
    questions: Question[];
    grading: GradeScore[]; /* concept from 'edu-scoring.ast' */
}
```

For abstract concepts no evaluation functions are defined. But there are evaluation
functions for the concrete children of `Page`: `Theory`, `Video`, `WorkSheet`, `ExamplePage`,
and `InDepthMaterial`, so these are the ones that we will implement.

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L153-L182

static evalPage(node: Page, ctx: InterpreterContext): RtObject {
    // Find grade for given answers
    console.log(`Evaluating Page ${node?.name}`)
    for (const score of node.grading) {
        const scoreValue = main.evaluate(score.expr, ctx)
        if (isRtBoolean(scoreValue)) {
            if (scoreValue.asBoolean()) {
                console.log(`Evaluating Page returning ${score.$grade?.name}`)
                return new RtGrade(score.$grade)
            }
        }
    }
    return new RtError(`No grade found for current answers in page ${node.name}`)
}

override evalTheory(node: Theory, ctx: InterpreterContext): RtObject {
    return EducationInterpreter.evalPage(node, ctx)
}
override evalVideo(node: Video, ctx: InterpreterContext): RtObject {
    return EducationInterpreter.evalPage(node, ctx)
}
override evalWorkSheet(node: WorkSheet, ctx: InterpreterContext): RtObject {
    return EducationInterpreter.evalPage(node, ctx)
}
override evalInDepthMaterial(node: InDepthMaterial, ctx: InterpreterContext): RtObject {
    return EducationInterpreter.evalPage(node, ctx)
}
override evalExamplePage(node: ExamplePage, ctx: InterpreterContext): RtObject {
    return EducationInterpreter.evalPage(node, ctx)
}
```

## Evaluation of ScoreExpressions

When you look at the function `evalPage` you can see that we are missing yet another evaluation 
function, the one that calculates the value of `score.expr`. Remember what it looks like in the model:

```txt
GradeC: Answer to questionX is correct AND the Number of Correct Answers = 3

GradeD: Answer to questionY is correct OR Answer to questionZ is correct AND the Number of Correct Answers > 2
```

The type of `score.expr` is `ScoreExpression`, but 
again this is an abstract concept. Its children are `QuestionReference`, `NrOfCorrectAnswers`, 
a bunch of binary expressions and `NumberLiteralExpression`, for which we have already defined 
evaluation functions. So what is left is to implement evaluations for `QuestionReference` and `NrOfCorrectAnswers`.

The value of the latter needs to be calculated for the complete page, thus we will search for it in the 
context. Note, that we have to remember to put this value in the context somewhere higher up the chain.

[//]: # (todo check the above statement)

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L198-L200

override evalNrOfCorrectAnswers(node: NrOfCorrectAnswers, ctx: InterpreterContext): RtObject {
    return ctx.find("NR_OF_CORRECT_ANSWERS")
}
```

The implementation of the evaluation of a `QuestionReference` is a bit more complicated. Remember what it looks like in the model:

```txt
Answer to questionX is correct
```

The evaluation should result in a boolean value based on the comparison between the correct answer to 
the question, and the answer given by the pupil. The correct answer can be found in the model. We 
just need to evaluate `question.correctAnswer`. The answer given by the pupil is present in the test, 
and should be found in the context.

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L184-L196

override evalQuestionReference(node: QuestionReference, ctx: InterpreterContext): RtObject {
    const question = node?.question?.referred
    if (question === undefined || question === null) {
        throw new RtError("evalQuestionReference: Question is not found")
    }
    const expected = main.evaluate(question.correctAnswer, ctx)
    const givenAnswer = ctx.find(question)
    if (givenAnswer === undefined || givenAnswer === null) {
        throw new RtError(`evalQuestionReference: Question '${question.content}' does not have a result value`)
    }
    console.log(`evalQuestionReference for '${question.content}', given answer is '${givenAnswer}', expected '${expected}'`)
    return givenAnswer.equals(expected)
}
```

## More About Evaluation of Pages

Now we can return to the `evalPage` function. We know how to determine the runtime value of a single ScoreExpression,
but how do we determine the runtime value of the complete page? We have chosen to go over all grades and see for which 
the score expression returns true. The first one that we find will be the page's grade. But wait, there is no runtime
object that represents a grade. We could return an M1 object (of type `Grade`), but we want to make a clear distinction
between the M1 and M0 levels. So we make a new runtime class: `RtGrade`.

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L153-L166

static evalPage(node: Page, ctx: InterpreterContext): RtObject {
    // Find grade for given answers
    console.log(`Evaluating Page ${node?.name}`)
    for (const score of node.grading) {
        const scoreValue = main.evaluate(score.expr, ctx)
        if (isRtBoolean(scoreValue)) {
            if (scoreValue.asBoolean()) {
                console.log(`Evaluating Page returning ${score.$grade?.name}`)
                return new RtGrade(score.$grade)
            }
        }
    }
    return new RtError(`No grade found for current answers in page ${node.name}`)
}
```

<Note>
<svelte:fragment slot="header">Meta Levels</svelte:fragment>
<svelte:fragment slot="content">
In Domain Specific language we distinguish the following levels:
<ol>
<li>The language definition, defining which concepts are available. Often called the M2 level.
In Freon this is represented by the language definition in the .ast files.
In Java this would be the Java Language Definition.
</li>   
<li>The model, which contains instances of the  language concepts, called the M1 level.
In Freon this is what you edit in a Freon application.
In Java this would be a Java program consisting of Java classes.
</li>
<li>The runtime level, values resulting from executing or interpreting the model,
called the M0 level.
In Freon this is the result of the interpreter running, or it would be the result of executing code generated from the model (M1) level.
For Java this is the execution of a Java program.
</li>
</ol>
</svelte:fragment></Note>


```ts
// EducationInterpreter/src/custom/interpreter/runtime/RtGrade.ts

import { RtBoolean, RtObject } from "@freon4dsl/core";
import { Grade } from "../../language/gen/index.js";

export class RtGrade extends RtObject {
    readonly _type: string = "RtGrade";
    grade: Grade;

    constructor(grade: Grade) {
        super();
        this.grade = grade;
    }

    equals(other: RtObject): RtBoolean {
        if (isRtGrade(other)) {
            return RtBoolean.of(this.grade === other.grade);
        } else {
            return RtBoolean.FALSE;
        }
    }

    override toString(): string {
        return `Grade: ${this.grade.name}`;
    }
}

export function isRtGrade(object: any): object is RtGrade {
    const _type = (object as any)?._type;
    return !!_type && _type === "RtGrade";
}

```
