---
title: The Freon Interpreter Framework
description: Learn how Freon generates and structures interpreters, how to extend evaluation functions, and how runtime objects and interpreter contexts work together to evaluate models.
tags: interpreter, evaluation, runtime, context, Freon, DSL development, runtime object, meta levels, AST
---

<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# The Freon Interpreter Framework

During Freon’s generation step, several files are produced that together form the foundation of an interpreter.
As a language engineer, the only file that you need to change is a file named `<<LanguageName>>Interpreter.ts`, where 
`<<LanguageName>>` refers, of course, to the name of your DSL. In our `Expressions` example it is called
`ExpressionsInterpreter.ts`. 

The class that is defined in this file inherits from the class `<<LanguageName>>InterpreterBase`,
which provides one evaluation function for every concept defined in your language. By overriding 
these functions, you define the value associated with each AST node.. The following is an example of an evaluation function
in `ExpressionsInterpreterBase.ts`.

```ts
// Expressions/src/freon/interpreter/gen/ExpressionsInterpreterBase.ts#L35-L37


```

All evaluation functions are similar. The first parameter is the node for which a value needs to be determined.
The second parameter, of type `InterpreterContext`, provides 
the [context](/Documentation/Interpreter_Framework/Understanding_the_Framework#interpreter-context-3) in 
which the expression should be evaluated.
This context is used to store values of constants, variables, etc. so they are available for 
use in the function. 
Initially, the base class functions throw an exception when called, as shown above, but when overridden, 
they should result in an object of type `RtObject` (short for "runtime object"), 
from [Freon's Runtime Object Library](/Documentation/Interpreter_Framework/Understanding_the_Framework#freons-runtime-object-library-2).

Here is an example of how `evalNumberLiteralExpression` is overridden:

```ts
// Expressions/src/custom/interpreter/ExpressionsInterpreter.ts#L36-L38

override evalNumberLiteralExpression(node: NumberLiteralExpression, ctx: InterpreterContext): RtObject {
    return new RtNumber(node.value);
}
```

## Freon’s Runtime Object Library

Each evaluation result in Freon is represented as an `RtObject` (or subclass), 
ensuring a strict separation between the model (M1) and runtime (M0) levels.
There can, of course, be references from `RtObjects` to instances in the model, e.g. for traceability.
Freon provides a standard set of runtime classes ready for immediate use. These include:
- **`RtNumber`**: Represents numeric values.
- **`RtString`**: Represents strings.
- **`RtBoolean`**: Represents boolean values.
- **`RtArray`**: Represents arrays.
- **`RtError`**: Represents errors.

You can extend these foundational classes to create domain-specific runtime objects. 

<Note>{#snippet header()}Meta Levels{/snippet}
{#snippet content()}
Freon’s interpreter framework distinguishes three meta levels, similar to the standard M2/M1/M0 structure used in modeling.
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
In Java, this corresponds to the execution of a Java program.
</li>
</ol>
{/snippet}
</Note>

## Interpreter Context

Every AST node is evaluated within a certain context, represented by the `ctx: InterpreterContext` parameter.

For instance, if in the model we refer to a parameter in the body of a function, we need to know 
the value of the parameter to be able to calculate the value of the body. This is achieved through the context as follows:

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

The evaluation of the function call expression has two parts.
In the first part a new `InterpreterContext` is created with the original context as its parent.
This ensures that all values in the original context remain accessible.

Then all the arguments of the function call are evaluated and their value is stored in the context with the corresponding parameter as its key.

The function is then evaluated using `main.evaluate(calledFunction, functionContext)`, with the new context as its parameter.

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

## Running the Interpreter

<Note header={header2} content={content2}> 
{#snippet header2()}The selected node is the one that is interpreted{/snippet}
{#snippet content2()}
When you run the interpreter from the toolbar, it evaluates the currently selected node. 
You will see a different result in the Interpreter view for different nodes.
In many cases, the interpretation cannot be completed fully because additional context is required. 
It is the responsibility of the interpreter developer to provide this context.
{/snippet}
</Note>

The following example shows the interpreter output for our Expressions language. 
The model defines one function, `range`, and two expressions. When running the interpreter from the toolbar
in the Freon editor, a trace of the evaluation is shown in the Interpreter view.
In the trace you can find two `Function` evaluations. At the end of both lines  
the context is shown with different values for the `start` and `end` parameters
for each function call.

<Figure
imageName={'interpreter/model-output.png'}
caption={'Expressions Model in the Editor'}
figureNumber={2}
/>
