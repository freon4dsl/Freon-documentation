---
title: Building an Interpreter
description: Learn how to build an interpreter in Freon using the Computer Aided Learning DSL. This example walks through implementing literal and binary expression evaluation functions in TypeScript.
tags: Freon, interpreter, EducationInterpreter, evaluation, AST, RtNumber, RtFraction, RtBoolean, SimpleNumber, NumberLiteralExpression, OrExpression, binary expressions, runtime, tutorial, example
---

<script>
    import Note from "$lib/notes/Note.svelte";
</script>

# Building an Interpreter

This example demonstrates how to **create an interpreter** for your Freon-based language.

## The Computer Aided Learning DSL

The language used in this extended example is the same one explained in detail in the [tutorial](/Tutorial/Overview).  
In the DSL’s requirements, our hypothetical client wanted a way to **test the page flow**.  
We’ll build an interpreter to do just that.

To follow along, run:

```bash
npm create freon@latest
```

Then select the language **EducationInterpreter**.  
Build the project (`npm run build`), start the editor, and select the model named **Model4Interpreter** —  
it’s essentially the same as the tutorial’s `Lesson6` model.

Open the model unit **TestB**, then run the interpreter from the **Edit** menu on the entire test  
(by selecting the test as the current node).

<Note {header} {content}>
{#snippet header()}The selected node is the one that is interpreted{/snippet}
{#snippet content()}
When running the interpreter from the <code>Edit</code> menu, Freon evaluates the <strong>currently selected node</strong>.  
You’ll see different results in the <em>Interpreter</em> tab depending on the selection.  
Sometimes interpretation cannot complete because additional context is needed — it’s up to the interpreter creator to handle such cases.
{/snippet}
</Note>

## Values for the Literals

As explained in [Interpreter Framework](/Documentation/Interpreter_Framework),  
there’s only one file we need to modify:  
`/src/freon/interpreter/EducationInterpreter.ts`.

We’ll build the evaluation **from the bottom up** — starting with the literal expressions:  
`SimpleNumber`, `NumberLiteralExpression`, and `Fraction`.

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L216-L228

/////////////////// Literals

override evalSimpleNumber(node: SimpleNumber, ctx: InterpreterContext): RtObject {
    return new RtNumber(node.value)
}

override evalNumberLiteralExpression(node: NumberLiteralExpression, ctx: InterpreterContext): RtObject {
    return new RtNumber(node.value)
}

override evalFraction(node: Fraction, ctx: InterpreterContext): RtObject {
    return new RtFraction(new RtNumber(node.numerator), new RtNumber(node.denominator))
}
```

The first two functions return an `RtNumber` runtime object containing the node’s value.  
The third returns an `RtFraction`, defined as:

```ts
// EducationInterpreter/src/custom/interpreter/runtime/RtFraction.ts

import { RtBoolean, RtNumber, RtObject } from "@freon4dsl/core";

export class RtFraction extends RtObject {
    readonly _type: string = "RtFraction";

    nominator: RtNumber;
    denumerator: RtNumber;

    constructor(num: RtNumber, den: RtNumber) {
        super();
        this.nominator = num;
        this.denumerator = den;
    }

    override equals(other: RtObject): RtBoolean {
        if (isRtFraction(other)) {
            return this.nominator.equals(other.nominator).and(this.denumerator.equals(other.denumerator));
        } else {
            return RtBoolean.FALSE;
        }
    }
    
    override toString(): string {
        return this.nominator.toString() + "/" + this.denumerator.toString()
    }
}

export function isRtFraction(object: any): object is RtFraction {
    const _type = (object as any)?._type;
    return !!_type && _type === "RtFraction";
}
```

For our purposes, we don’t need to simplify fractions (e.g., `6/3 → 2`).  
We just need to compare them for equality, which is handled by the `equals` method.

## Values for Binary Expressions

Next, let’s define the evaluation functions for **binary expressions**.  
They all follow a similar pattern. Here’s the `OrExpression`:

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L244-L248

override evalOrExpression(node: OrExpression, ctx: InterpreterContext): RtObject {
    const left = main.evaluate(node.left, ctx) as RtBoolean
    const right = main.evaluate(node.right, ctx) as RtBoolean
    return left.or(right)
}
```

We first evaluate both sides of the expression.  
Note the use of the **main interpreter** from `MainEducationInterpreter.ts`,  
which can evaluate any node type.  
We then use the built-in `or` function of the `RtBoolean` class, defined as:

```ts
export class RtBoolean extends RtObject {
	static readonly TRUE = new RtBoolean(true);
	static readonly FALSE = new RtBoolean(false);

	static of(bool: boolean): RtBoolean {
		return bool ? RtBoolean.TRUE : RtBoolean.FALSE;
	}

	or(other: RtBoolean): RtBoolean {
		return RtBoolean.of(this._value || other.asBoolean());
	}
    ...  
}		
```

Other expressions, like `AndExpression` and `EqualsExpression`, are implemented in much the same way.  
For example, here’s the `GreaterOrEqualsExpression`:

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L256-L260

override evalGreaterOrEqualsExpression(node: GreaterOrEqualsExpression, ctx: InterpreterContext): RtObject {
    const left = main.evaluate(node.left, ctx) as RtNumber
    const right = main.evaluate(node.right, ctx) as RtNumber
    return RtBoolean.of(left.value >= right.value)
}
```

This pattern makes your interpreter modular, easy to extend, and consistent across expression types.
