<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Using the Context

Now we have established how to determine the basic runtime values, we can continue with the heavy work: connecting
all elements. This is where the context plays its part.

## Evaluation of a Step

Each step has a `fromPage` and a series of answers to the questions on the `fromPage`, as shown in the following figure.

<Figure
imageName={'examples/Interpreter/TestB.png'}
caption={'The steps in a test'}
figureNumber={1}
/>

What we need to do is:
1. compare the given answers for each question with the correct answers, and determine the number of correct answers
2. based on the answers, find the grade op the `fromPage`,
3. based on the grade, find the page to the application should switch according to the rule given in the page flow,
4. finally. return as runtime value for this step the page to which the application should switch.

```ts
// Education/src/interpreter/EducationInterpreter.ts#L97-L138

override evalStep(node: Step, ctx: InterpreterContext): RtObject {
    const currentPage = node.$fromPage
    console.log(`evalStep ${node.freId()} FromPage ${currentPage?.name} nrAnswers is ${node.answerSeries.length}`)

    // Put the page for this step in the context
    const newCtx = new InterpreterContext(ctx)
    newCtx.set("CURRENT_PAGE", new RtPage(currentPage))

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
    newCtx.set("NR_OF_CORRECT_ANSWERS", new RtNumber(nrOfCorrectAnswers))

    // Find the grade for the given answers
    const grade = main.evaluate(currentPage, newCtx) as RtGrade

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
    }
    return new RtPage(transition.$toPage)
}
```
