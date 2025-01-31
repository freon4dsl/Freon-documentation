<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Finishing the Test

All basic building blocks for the interpreter have been implemented. What is left to do is to combine the information
and present it to the user.

## Evaluation of TestFlow

Every TestFlow consists of a series of steps, where the page that is a result of a previous step should be equal
to the `fromPage` of the next. In the following code we loop over the steps, remember the evaluation result from the previous step,
and compare that to the `fromPage` of the current step. If there is an error, we create a reasonably readable 
error message that will be shown to the user.

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L84-L107

override evalTestFlow(node: TestFlow, ctx: InterpreterContext): RtObject {
    console.log("Evaluating Test Flow " + node.freId() + "  steps " + node.steps?.length)
    let previousPage: RtPage = undefined
    let previousStep: Step
    let first: boolean = true      // indicates whether there is a calculated value for 'previous'
    for (const step of node.steps) {
        // Compare the fromPage with the previous stepResult
        if (!first && previousPage.page !== step.$fromPage) {
            // There was an error. Based on the given answers, we should not be on 'fromPage'.
            return new RtError(`Next page of step ${EducationEnvironment.getInstance().writer.writeToLines(previousStep)} should be ${previousPage.page.name}, not ${step.$fromPage.name}.`)
        }
        const stepResult = main.evaluate(step, ctx)
        if (isRtPage(stepResult) ) {
            // Remember the previous stepResult
            previousPage = stepResult
            previousStep = step
            first = false
        }
        if (isRtError(stepResult)) {
            return stepResult
        }
    }
    return RtBoolean.TRUE
}
```    

## Evaluation of Scenario and Test

The implementation of the evaluation function for `Scenario` is reasonably simple. It loops 
over all test flows, if any of them has an error than the result is false.

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L70-L82

override evalScenario(node: Scenario, ctx: InterpreterContext): RtObject {
    console.log("Evaluating Scenario " + node.description + "  testFlow " + node.testFlow?.length)
    for (const testFlow of node.testFlow) {
        const stepFlowResult = main.evaluate(testFlow, ctx)
        if (isRtBoolean(stepFlowResult) && stepFlowResult.asBoolean() === false) {
            return RtBoolean.FALSE
        }
        if (isRtError(stepFlowResult)) {
            return stepFlowResult
        }
    }
    return RtBoolean.TRUE
}
```

In the final evaluation function, the one for `Test` we need to include adding the flow to the context.
The rest is simple admin as in the `evalScenario` function.

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L52-L68

override evalTest(node: Test, ctx: InterpreterContext): RtObject {
    console.log("Evaluating Scenario " + node.freId() + "  flow " + node.flow.referred?.name)
    // Puts the current flow in the context
    const newCtx = new InterpreterContext(ctx)
    const flow = new RtFlow(node.flow.referred)
    newCtx.set("CURRENT_FLOW", flow)
    for (const s of node.scenarios) {
        const scenarioResult = main.evaluate(s, newCtx)
        if (isRtBoolean(scenarioResult) && scenarioResult.asBoolean() === false) {
            return RtBoolean.FALSE
        }
        if (isRtError(scenarioResult)) {
            return scenarioResult
        }
    }
    return RtBoolean.TRUE
}
```

## The Result

Running the interpreter on the complete `TestB` model unit from our model (named "Model4Interpreter"),
results in this error.

<Figure
imageName={'examples/Interpreter/Interpreter-result.png'}
caption={'The result of the interpreter showing an error'}
figureNumber={1}
/>
