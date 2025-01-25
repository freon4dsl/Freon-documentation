<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# Writing the Interpreter
In our example, the main interpreter file is `ExpressionModelInterpreter.ts`.
This is the only file you need to modify when building an interpreter for your DSL.
All other generated files are part of the interpreter framework and handle the low-level functionality.
The next step involves working with the main interpreter file, which is initially
empty and designed for the language engineer to customize. Here's an example of
the auto-generated interpreter file:

```ts
// Expressions/src/freon/interpreter/ExpressionsInterpreter.ts#L1-L17

// Generated my Freon once, will NEVER be overwritten.
        import { InterpreterContext, IMainInterpreter, RtObject } from "@freon4dsl/core";
        import { ExpressionsInterpreterBase } from "./gen/ExpressionsInterpreterBase.js";

        let main: IMainInterpreter;

        /**
         * The class containing all interpreter functions twritten by thge language engineer.
         * This class is initially empty,  and will not be overwritten if it already exists..
         */
        export class ExpressionsInterpreter extends ExpressionsInterpreterBase {

            constructor(m: IMainInterpreter) {
                super();
                main = m;
            }
        }
```

The property `main: IMainInterpreter` is a reference to the primary interpreter,
which is called when evaluating parts or child elements of the language model.

Now take a look at the currently empty interpreter:

```ts
// Expressions/src/freon/interpreter/ExpressionsInterpreter.ts#L1-L17

// Generated my Freon once, will NEVER be overwritten.
        import { InterpreterContext, IMainInterpreter, RtObject } from "@freon4dsl/core";
        import { ExpressionsInterpreterBase } from "./gen/ExpressionsInterpreterBase.js";

        let main: IMainInterpreter;

        /**
         * The class containing all interpreter functions twritten by thge language engineer.
         * This class is initially empty,  and will not be overwritten if it already exists..
         */
        export class ExpressionsInterpreter extends ExpressionsInterpreterBase {

            constructor(m: IMainInterpreter) {
                super();
                main = m;
            }
        }
```

The property `main: IMainInterpreter` is the interpreter to be called when evaluating parts/children,
as we will see later on.

Let's start writing the interpreter for a `NumberLiteralExpression` by overriding the `evalNumberLiteralExpression` function:

```ts
// Expressions/src/custom/interpreter/ExpressionsInterpreter.ts#L36-L38

override evalNumberLiteralExpression(node: NumberLiteralExpression, ctx: InterpreterContext): RtObject {
    return new RtNumber(node.value);
}
```

We use the optional `override` keyword, to ensure we get an error if the overridden function does not exist.
The second parameter of type `InterpreterContext` provides the context in which the expression should be evaluated.
This context is used e.g. to store values of constants, variables, etc. so they are available for use in the function.
The result of an evaluation function is always an `RtObject`, short for runtime object.

We have chosen to always have RtObject (or subclasses) as the result of interpreting, to make sure
that the model (M1) and runtime (M0)  are always strictly separated.
Of course there can be references from RtObjects to instances in the model, e.g. for traceability.
In the example above RtNumber represents a value of type Number.
The library provided by Freon contains RtString, RtBoolean, RtArray, and RtError classes,
they are usually extended with domain specific runtime classes.

<Note>
<svelte:fragment slot="header">Meta Levels</svelte:fragment>
<svelte:fragment slot="content">
In Domain Specific lLnguage we distinguish the following levels:
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

Implementing the other numeric expressions is straightforward. 

Here’s a clear and comprehensive explanation based on the provided text:

---



---

## Example: Writing the `evalNumberLiteralExpression` function

To implement the interpreter for a `NumberLiteralExpression`, override the `evalNumberLiteralExpression` function in the main interpreter file. Here’s how it’s done:

```ts
// Expressions/src/custom/interpreter/ExpressionsInterpreter.ts#L36-L38

override evalNumberLiteralExpression(node: NumberLiteralExpression, ctx: InterpreterContext): RtObject {
    return new RtNumber(node.value);
}
```

The optional `override` keyword ensures that you’ll get an error if the specified function does not exist in the base class.

#### Function Parameters Explained:
1. **`node: NumberLiteralExpression`**: Represents the specific expression being evaluated (in this case, a number literal).
2. **`ctx: InterpreterContext`**: Provides the evaluation context, which stores information like constants, variables, or any data needed during interpretation.

#### Function Result:
The result of any evaluation function is always an `RtObject`, which is a runtime object. This design ensures a strict separation between the model (M1) and runtime (M0). For example, in this implementation, `RtNumber` is used to represent a numeric value at runtime.

---

## Freon’s Runtime Object Library

Freon provides a set of runtime classes that can be used out-of-the-box or extended to fit your domain-specific needs. These include:
- **`RtNumber`**: Represents numeric values.
- **`RtString`**: Represents strings.
- **`RtBoolean`**: Represents boolean values.
- **`RtArray`**: Represents arrays.
- **`RtError`**: Represents errors.

You can also create domain-specific runtime classes that inherit from these foundational classes. Additionally, runtime objects may contain references to model instances (e.g., for traceability purposes).

---

By following this structured approach, you can easily build and customize interpreters for your DSLs using Freon. Let me know if you'd like a deeper dive into any specific aspect!

## Interpreter Context
Every node in the AST is evaluated within a certain context, represented by the `ctx: InterpreterContext` parameter.

If we refer to a paremeter in the body of a function, we need to know the value of the parameter. This is done thtough the cointext as follows:

```ts
// Expressions/src/custom/interpreter/ExpressionsInterpreter.ts#L56-L65

override evalFunctionCallExpression(node: FunctionCallExpression, ctx: InterpreterContext): RtObject {
    const calledFunction = node.$calledFunction;
    const functionContext = new InterpreterContext(ctx);
    node.arguments.forEach((arg, index) => {
        const argumentValue = main.evaluate(arg, ctx);
        // Add the parameter to the context with the value of the evaluated argument
        functionContext.set(calledFunction.parameters[index], argumentValue);
    });
    return main.evaluate(calledFunction, functionContext);
}
```
The evaluation of the function call expression has two pparts.
In the first part a new InterpreterContext is created with the original context as its parent. 
This way everything in the original context is available as well.

Then all the arguments of the function call are evaluated and their value is stored in the context with the corresponding parameter as its key.

Now the function is evaluated `main.evaluate(calledFunction, functionContext)` with the new
context as parameter.

If we come across a `ParameterRef` inside the evaluation of the function body,
this evaluation can simply lookup the value of the parameter: 

```ts
// Expressions/src/custom/interpreter/ExpressionsInterpreter.ts#L71-L73

override evalParameterRef(node: ParameterRef, ctx: InterpreterContext): RtObject {
    return ctx.find(node.$parameter);
}
```
Note that the value of the parameter lookup will be different for different calls to the function.
Which is exactly what we need.

A full example of running the interpreter for the following model:
This example has one function `range`  and two expressions.
When running the interpreter the Freon editor shows a trace of the evaluation in the Interpreter tab as shown.
In the trace you can find two Function evaluations.
At the end of the lines with Function the context is shown with different valuies for the start and end parameters
for each function call.

<Figure
imageName={'interpreter/model-output.png'}
caption={'Expressions Model in the Editor'}
figureNumber={2}
/>

Interpreters can do more than just calculate with numbers, they can be made to run tests or generate HTML and show the result somewhere in the editor. 
