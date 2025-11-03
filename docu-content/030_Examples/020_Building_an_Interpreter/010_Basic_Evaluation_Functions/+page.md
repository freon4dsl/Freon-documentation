---
title: More Basic Evaluation Functions
description: Extend the EducationInterpreter with evaluation functions for tests, pages, answers, and score expressions. Learn how to compute runtime values and handle abstract concepts in Freon interpreters.
tags: Freon, interpreter, evaluation, EducationInterpreter, Answer, LastStep, Page, ScoreExpression, QuestionReference, NrOfCorrectAnswers, RtGrade, runtime, M1, M0, M2, DSL, tutorial, example
---

<script>
    import Note from "$lib/notes/Note.svelte";
</script>

# More Basic Evaluation Functions

With the simplest evaluation functions done, we can now focus on the **test evaluation logic** itself.

## The AST of the Test Model Unit

Let’s refresh your memory and look at the AST of the `Test` model unit.

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

The simplest concept is `LastStep`. Its runtime value should always be **true**, because it has no follow-up page and no restrictions.  
The evaluation function looks like this:

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L212-L214

override evalLastStep(node: LastStep, ctx: InterpreterContext): RtObject {
    return RtBoolean.TRUE
}
```

Next, let’s determine the runtime value of an `Answer`.  
We need to compare the **given answer** with the **expected correct answer** from the question.  
The given answer is evaluated from `value`, while the expected answer comes from the referenced `question`.

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

## Evaluation of `Page`

Before we can evaluate a `Step`, we need to know how to evaluate its `fromPage` property.  
The concept `Page` is abstract:

```proto
// Education/lesson9-defs/edu-topics.ast#L10-L14

abstract concept Page {
    name: identifier;
    questions: Question[];
    grading: GradeScore[]; /* concept from 'edu-scoring.ast' */
}
```

We therefore define evaluation functions for each concrete subtype of `Page`:  
`Theory`, `Video`, `WorkSheet`, `ExamplePage`, and `InDepthMaterial`.

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

## Evaluation of `ScoreExpression`s

In the `evalPage` function, we call `main.evaluate(score.expr, ctx)`.  
That means we still need evaluation functions for the remaining expression concepts — namely `QuestionReference` and `NrOfCorrectAnswers`.

### `NrOfCorrectAnswers`

The total number of correct answers for the current page is stored in the **context**.  
We retrieve it using `ctx.find`.

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L198-L200

override evalNrOfCorrectAnswers(node: NrOfCorrectAnswers, ctx: InterpreterContext): RtObject {
    return ctx.find("NR_OF_CORRECT_ANSWERS")
}
```

### `QuestionReference`

This one evaluates a comparison between the **expected answer** (from the model) and the **given answer** (from the test context).

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

The `evalPage` function loops through all grades and evaluates each grading expression until it finds one that returns `true`.  
The first such grade determines the result for that page.

To represent this at runtime, we introduce a new class, `RtGrade`, since we want to distinguish **runtime objects (M0)**  
from **model objects (M1)** and **language definitions (M2)**.

<Note {header} {content}>
{#snippet header()}Meta Levels{/snippet}
{#snippet content()}
In Domain-Specific Languages, we distinguish between three levels:

1. **M2 – Language Definition**: Defines which concepts exist. In Freon, this is represented by the `.ast` files.  
   In Java, this would correspond to the Java language definition.

2. **M1 – Model**: Contains instances of those concepts. In Freon, this is what you edit in the Freon editor.  
   In Java, this would be the program itself (Java classes, methods, etc.).

3. **M0 – Runtime**: The results produced by running or interpreting an M1 model.  
   In Freon, this is what your interpreter computes. In Java, this would be the execution of a program.
   {/snippet}
   </Note>

### The `RtGrade` class

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

This runtime class allows us to represent a **grade result** separately from the model itself —  
a clean, modular way to connect interpretation results to the model.
