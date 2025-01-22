<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

[//]: # (todo write section on interpreter)

# Feedback from an Interpreter

Freon includes an interpreter framework which makes it easy to write an interpreter for a language.

## What is an Interpreter

Most articles on interpreters you will find start by describing lexers and parsers
and as a final step evaluation.
Forget about lexers, parsers, those are only needed when you start with plain text.
Becauise we use a projectional editor, in Freon we have the AST of our model already available and do not need to parse text to get the AST.

The interpreter in Freon helps to calculate something based on the AST of the model.
The general way to build an interpreter is as follows:

```proto
Select the start node you want to evaluate
   If the node has children/parts
      Evaluate the parts 
      Evaluate the node, using the evaluated value of the parts
   else if the node is a leaf
      Evaluate the node
```

Take the following AST as an example.

<Figure
imageName={'interpreter/plus-tree.png'}
caption={'AST for Plus Expression'}
figureNumber={1}
/>

Let's evaluate the multply (\*) node.
* We need to first evaluate the two children (+ and 5)
   * Evaluate the plus (+) node, we need to evaluate the children first.
       * Evaluate the "3" node, resulting in the value 3
       * Evaluate the "4" node, resulting in the value 4
   * Evaluate the plus based on the result of the children, result is 7
   * Evaluate the "5" node resulting in 5.
* Evaluate multiply of 6 and 5, result is 30

## The Freon Interpreter
Freon includes an interpreter framework, to define and run an interpreter.
The interpreter code for your language is generated in the `interpreter` folder.

We use the following language as the example.
There is modelunit `ExpressionUnit` that contains both function definitions and expressions:
```proto
// Expressions/src/defs/Expressions.ast#L1-L11

language Expressions

model ExpressionModel {
    name: identifier;
    units: ExpressionUnit[];
}

modelunit ExpressionUnit {
    functions: Function[];
    expressions: Expression[];
}
```
The only file that need to be changed to implement an interpreter is the file `<<LanguageName>>Interpreter.ts`.
We add basic expression concepts for number. 
A NumeberLiteralExpression and the standard binary exp[fressions.
Note that we specify the priorities of the binary operators to allow straightforward editing (see [Binary Expressions](/Documentation/Defining_an_Editor/Binary_Expressions)):

```proto
// Expressions/src/defs/Expressions.ast#L15-L40

abstract expression Expression { }

expression NumberLiteralExpression base Expression {
    value: number;
}

abstract binary expression BinaryExpression base Expression {
    left: Expression;
    right: Expression;
}

binary expression MultiplyExpression base BinaryExpression {
    priority = 8;
}

binary expression PlusExpression base BinaryExpression {
    priority = 4;
}

binary expression MinusExpression base BinaryExpression {
    priority = 4;
}

binary expression DivideExpression base BinaryExpression {
    priority = 8;
}
```

We also add functions, both function definitions and function calls:
```proto
// Expressions/src/defs/Expressions.ast#L42-L61

concept Function {
    name: identifier;
    body: Expression;
    parameters: Parameter[];
    reference declaredType : Type;
}

concept Parameter {
    name: identifier;
    reference declaredType: Type;
}

expression ParameterRef base Expression {
    reference parameter: Parameter;
}

expression FunctionCallExpression base Expression {
    reference calledFunction: Function;
    arguments: Expression[];
}
```

In the generation step of Freon, the file `ExpressionModelInterpreter.ts` is genareted.
Writing an interpreter is done by overriding functions from the generated superclass.

All other generated files are just there to make the interpreter framework do its work.
Let's take a look at the current;ly empty interpreter:
```ts
// Expressions/src/custom/interpreter-generated/ExpressionsInterpreter.ts#L1-L17

// Generated my Freon once, will NEVER be overwritten.
import { IMainInterpreter } from '@freon4dsl/core';
import { ExpressionsInterpreterBase } from './gen/ExpressionsInterpreterBase.js';

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
We see the class `ExpressionsInterpreter` extending the base class `ExpressionsInterpreterBase`. 
This base class contains one evaluation functions for each concept in the language.
These functions will throw an exception when called.

To write an interpreter for a cponcept you need to override the evaluatuion function for the concept in 
the `ExpressionsInterpreter` class.

You also see the `main: IMainInterpreter`, which is the interpreter to be called when evaluating parts/children,
as we will see later on. 

For a `NumberLiteralExpression` this is done as follows:
```ts
// Expressions/src/custom/interpreter/ExpressionsInterpreter.ts#L36-L38

override evalNumberLiteralExpression(node: NumberLiteralExpression, ctx: InterpreterContext): RtObject {
    return new RtNumber(node.value);
}
```
We use the optional `override` keyword, to ensure we get an error if the overridden function does not exist.
The second parameter of type `InterpreterContext` provides the context in which the expression should be evalueted.
This context is used e.g. to store values of constants, variables, etc. so they are available for use in the function.
The result of an evaluation function is always an `RtObject`, short for runtime object.
We have chosen to always have RtObject (or subclasses) as the result of interpreting, to make sure
that the model (M0) and runtime (M0)  are always strictly separated.
Of course there can be references from RtObjects to instances in the model, e.g. fpor traceability.
In the example above RtNumner represents a value of type Number.
The library provided by Freon contains RtString, RtBoolean, RtArray, and RtError classes,
they are usually extended with domain specific runtime classes.f

<Note>
<svelte:fragment slot="header">Meta Levels</svelte:fragment>
<svelte:fragment slot="content">
In Domain Specific langauge we distinguish the following levels:
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

Implementing the other numeric expressions is straightforward, you can take a look at the Expressions language by creating anew Freon project with `npm create Freon` and then selecting the `Expressions` language.

### Interpreter Context
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
