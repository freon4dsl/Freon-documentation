# Building an Interpreter

This example shows how to create an interpreter.

## The Education DSL

The language used in this extended example is the one that is in depth explained in the [tutorial](/Tutorial/Overview).
Remember from the requirements for this DSL that our hypothetical client wants a means to test the page flow.
We are going to build an interpreter to do just that.

To follow the example use the `npm create freon@latest` command and choose the language called `Education`. Empty the
`/src/defs` folder and copy in all def files for Lesson 9. Build the project (`npm run build`).

## Values for the Literals

As explained in [Interpreter Framework](/Documentation/Interpreter_Framework) there is only one file that we need
to change: `/src/freon/interpreter/EducationInterpreter.ts`.

Because this is the easiest manner, we are going to build the evaluation from the bottom up. This means that we are first going to
implement the evaluation functions for the literal expressions, i.e. `SimpleNumber`, `NumberLiteralExpression`, and `Fraction`.

```ts
// Education/src/interpreter/EducationInterpreter.ts#L210-L220

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

As you see, the first two functions simply return a runtime object of type `RtNumber` which holds the current `value`
of the node. The third function returns a runtime object of type `RtFraction`, which is defined as follows:

```ts
// Education/src/interpreter/runtime/RtFraction.ts

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

Because we do not actually need the result of a fraction, we need to simply compare it with the
fraction in the test, the only function we need to define is the `equals` function.

## The Comparison Expressions

```ts
// Education/src/interpreter/EducationInterpreter.ts#L236-L240

override evalOrExpression(node: OrExpression, ctx: InterpreterContext): RtObject {
    const left = main.evaluate(node.left, ctx) as RtBoolean
    const right = main.evaluate(node.right, ctx) as RtBoolean
    return left.or(right)
}
```
