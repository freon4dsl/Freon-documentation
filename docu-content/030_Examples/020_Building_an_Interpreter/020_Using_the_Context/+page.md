<script>
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Using the Context

Now we have established how to determine the basic runtime values, we can continue with the heavy work: connecting
all elements. This is where the context plays its role.

## Evaluation of a Step

We are working bottom-up, so the next concept for which to implement an evaluation function is `Step`. 
Each step has a `fromPage`, and a series of answers to the questions on the `fromPage`, as shown in the following figure.

<Figure
imageName={'examples/Interpreter/TestB.png'}
caption={'The steps in a test'}
figureNumber={1}
/>

What we need to do is:
1. compare the given answers for each question on the `fromPage` with the correct answers, and determine the number of correct answers
2. based on the answers, find the grade from the `fromPage`,
3. based on the grade, find the page the application should switch to according to the rule given in the page flow,
4. finally, return as runtime value for this step the page to which the application should switch.

Let's take a step-by-step look at how this is implemented.

### Number of Correct Answers

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L113-L126


```

In this example we see that contexts may be nested. A new context is created 
with a parent context as parameter to its constructor (`new InterpreterContext(ctx)`). 
For every answer of the step the runtime value of the given answer is stored in the context (`newCtx.set(...)`).
Remember that in the `evalQuestionReference` function we found the given answer by looking it up
in the context:

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L190-L190


```

During the loop we increase the number of correct answers, which is also stored in the context.

### The Grade

Now we have enough information to determine the grade of the `fromPage``:

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L128-L129


```

Note that we use the context with the stored value for `NR_OF_CORRECT_ANSWERS`,
because the evaluation of the page may depend on this value.

### The Page to Present to the Pupil

In the model the page flow is given in a model unit of type `Flow`. This information is needed
to determine which page should according to the flow rules and the current grade be presented to the pupil.
The model unit that is needed is not known to a node of type `Step`, so this is another value that needs 
to be carried in a context. In this piece of code we assume that it is present in the context under the 
name `CURRENT_FLOW`. In the evaluation function for the overall test this information is stored in the context.

From the flow we obtain the rule for the current page, and from that we get the transition for the given grade.

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L131-L147


```

Now all that is left to do is to return the found page:

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L150-L150


```
