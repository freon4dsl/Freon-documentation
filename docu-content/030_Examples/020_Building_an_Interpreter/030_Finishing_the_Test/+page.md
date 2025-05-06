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


```    

## Evaluation of Scenario and Test

The implementation of the evaluation function for `Scenario` is reasonably simple. It loops 
over all test flows, if any of them has an error than the result is false.

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L70-L82


```

In the final evaluation function, the one for `Test` we need to include adding the flow to the context.
The rest is simple admin as in the `evalScenario` function.

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L52-L68


```

## The Result

Running the interpreter on the complete `TestB` model unit from our model (named "Model4Interpreter"),
results in this error.

<Figure
imageName={'examples/Interpreter/Interpreter-result.png'}
caption={'The result of the interpreter showing an error'}
figureNumber={1}
/>
