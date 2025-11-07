---
title: The Expressions DSL
description: Introduces the Expressions DSL used as an example for Freon’s interpreter framework, explaining its structure, expression concepts, and function definitions.
tags: expressions, DSL, interpreter, AST, numeric expressions, functions, Freon, DSL development
---

# The Expressions DSL

Before explaining the interpreter framework, we introduce a simple DSL that will serve as our running example. This DSL 
will serve as the foundation for illustrating how Freon’s interpreter framework processes and evaluates expressions.
The language defines a single model unit, `ExpressionUnit`, which contains both function definitions and expressions.
You can explore this language by creating a new Freon project using `npm create freon`, then selecting the 
`Expressions` template.

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

We add several basic expression concepts to represent numeric 
operations: `NumberLiteralExpression` and standard binary expressions.
Operator priorities are specified to support straightforward editing (See [Binary Expressions](/Documentation/Defining_an_Editor/Binary_Expressions) for details.):

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
We also define concepts to represent functions — both their definitions and calls:

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
