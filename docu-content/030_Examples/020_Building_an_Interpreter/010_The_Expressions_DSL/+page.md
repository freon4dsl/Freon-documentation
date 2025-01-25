<script>
    import Note from "$lib/notes/Note.svelte";
    import Figure from "$lib/figures/Figure.svelte";
</script>

# The Expressions DSL

We use the following simple DSL as the example, which is defined with a single
model unit called `ExpressionUnit` that contains both function definitions and expressions.
You can take a look at this language by
creating a new Freon project with `npm create Freon` and then selecting the `Expressions` language.

```proto
// Expressions/src/defs/Expressions.ast#L1-L11

language Expressions

model Expressions {
    name: identifier;
    units: ExpressionUnit[];
}

modelunit ExpressionUnit {
    functions: Function[];
    expressions: Expression[];
}
```

## Numeric Expressions

Added are some basic expression concepts to represent numeric expressions: 
a NumberLiteralExpression and the standard binary expressions.
Note that we specify the priorities of the binary operators to allow 
straightforward editing (see [Binary Expressions](/Documentation/Defining_an_Editor/Binary_Expressions)):

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

## Functions
We also add concepts to represent functions, both function definitions and function calls:

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
