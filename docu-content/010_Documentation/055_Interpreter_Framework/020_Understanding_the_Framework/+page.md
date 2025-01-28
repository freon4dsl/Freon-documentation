<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# The Freon Interpreter Framework

In the generation step of Freon, a number of files are generated that together form the basis for an interpreter.
As language engineer, the only file that you need to change is a file named `<<LanguageName>>Interpreter.ts`, where 
`<<LanguageName>>` is, of course, the name of the DSL you are working on. In our `Expressions` example it is called
`ExpressionsInterpreter.ts`. 

The class that is defined in this file inherits from the class `<<LanguageName>>InterpreterBase`,
which includes one evaluation function per concept defined in the language. By overriding the evaluation functions
you can define which value is to be associated with a certain AST node. The following is an example of an evaluation function
in `ExpressionsInterpreterBase.ts`.

```ts
// Expressions/src/freon/interpreter/gen/ExpressionsInterpreterBase.ts#L35-L37

evalNumberLiteralExpression(node: NumberLiteralExpression, ctx: InterpreterContext): RtObject {
    throw new RtError("evalNumberLiteralExpression is not defined");
}
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

We have chosen to always have an `RtObject` (or one of its subclasses) as the result of interpreting, to make sure
that the model (M1) and runtime (M0) levels are always strictly separated.
Of course there can be references from `RtObjects` to instances in the model, e.g. for traceability.
Freon provides a set of runtime classes that can be used out-of-the-box. These include:
- **`RtNumber`**: Represents numeric values.
- **`RtString`**: Represents strings.
- **`RtBoolean`**: Represents boolean values.
- **`RtArray`**: Represents arrays.
- **`RtError`**: Represents errors.

Often you create domain-specific runtime classes that inherit from these foundational classes. 

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

## Interpreter Context

Every node in the AST is evaluated within a certain context, represented by the `ctx: InterpreterContext` parameter.

For instance, if in the model we refer to a parameter in the body of a function, we need to know 
the value of the parameter to be able to calculate the value of the body. This is done though the context as follows:

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

## Running the Interpreter

The following shows the result of running the interpreter for our Expressions example. The model 
has one function `range` and two expressions. When running the interpreter from the `Edit` menu 
in the Freon editor, a trace of the evaluation is shown in the Interpreter tab.
In the trace you can find two Function evaluations. At the end of both lines  
the context is shown with different values for the `start` and `end` parameters
for each function call.

<Figure
imageName={'interpreter/model-output.png'}
caption={'Expressions Model in the Editor'}
figureNumber={2}
/>
