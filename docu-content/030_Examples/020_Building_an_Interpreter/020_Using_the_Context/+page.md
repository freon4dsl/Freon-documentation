---
title: Using the Context
description: Connect all interpreter pieces using the evaluation context. Learn how to compute the number of correct answers, obtain a grade for a page, follow flow rules, and return the next page for each Step.
tags: Freon, interpreter, context, InterpreterContext, Step, Page, Flow, FlowRule, PageTransition, grading, NrOfCorrectAnswers, QuestionReference, RtGrade, RtFlow, RtPage, runtime, evaluation
---

<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Using the Context

Now that we’ve established how to determine basic runtime values, we can continue with the heavy work: **connecting
all elements**. This is where the **context** plays its role.

## Evaluation of a Step

We’re working bottom-up, so the next concept to implement is `Step`.  
Each step has a `fromPage` and a series of answers to the questions on that page, as shown below.

<Figure
imageName={'examples/Interpreter/TestB.png'}
caption={'The steps in a test'}
figureNumber={1}
/>

What we need to do is:

1. Compare the given answers for each question on the `fromPage` with the correct answers, and determine the number of correct answers.
2. Based on the answers, find the **grade** from the `fromPage`.
3. Using the grade, consult the **page flow** to find the page to switch to.
4. Return that page as the **runtime value** for this step.

Let’s look at the implementation step by step.

### Number of Correct Answers

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L113-L126

// Put the page for this step in the context
const newCtx = new InterpreterContext(ctx)

// Find the nr of correct answers and add it to the context
let nrOfCorrectAnswers = 0
for (const answer of node.answerSeries) {
    const actualAnswer = main.evaluate(answer.value, newCtx)
    // Store the actual answer with the question.
    newCtx.set(answer.$question, actualAnswer)
    const expectedAnswer = main.evaluate(answer.$question.correctAnswer, newCtx)
    if (actualAnswer.equals(expectedAnswer)) {
        nrOfCorrectAnswers++
    }
}
```

Contexts can be **nested**. We create a new context with the parent `ctx`  
(`new InterpreterContext(ctx)`). For every answer we evaluate the given value and
store it in the context (`newCtx.set(...)`). Recall from `evalQuestionReference`
that we retrieve a given answer by looking it up in the context:

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L190-L190

const givenAnswer = ctx.find(question)
```

During the loop we also count correct answers, which we’ll store in the context.

### The Grade

Now we have enough information to determine the grade of the `fromPage`:

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L128-L129


// Find the grade for the given answers
```

We use the context that contains `NR_OF_CORRECT_ANSWERS`, because page evaluation may depend on it.

### The Page to Present to the Pupil

In the model, the page flow is defined in a `Flow` model unit.  
To decide which page to show next (given the current grade), the **current flow** must be available.
A `Step` node doesn’t know which flow to use, so we carry it in the context under the name `CURRENT_FLOW`
(the overall test evaluation stores this value).

From the flow we obtain the rule for the current page, then the **transition** for the computed grade:

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L131-L147


//  Find rule for current page
const currentFlow = ctx.find("CURRENT_FLOW") as RtFlow
if (isNullOrUndefined(currentFlow)) {
    return new RtError(`No flow found for page ${currentPage.name}`)
}

const pageRule: FlowRule = currentFlow.flow.rules.find((rule) => rule.$page === currentPage)
if (isNullOrUndefined(pageRule)) {
    return new RtError(`No rules found for page ${currentPage.name} in ${currentFlow.flow.name}`)
}

// Find the page to which the application should switch based on the calculated grade,
// and return it as the result of evaluating this step
const transition = pageRule.transitions.find((trans) => trans.$condition === (grade as RtGrade).grade)
if (isNullOrUndefined(transition)) {
    return new RtError(`No transition found for grade ${grade.grade} on page ${currentPage.name} in ${currentFlow.flow.name}`)
```

All that’s left is to return the found page:

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L150-L150

return new RtPage(transition.$toPage)
```
