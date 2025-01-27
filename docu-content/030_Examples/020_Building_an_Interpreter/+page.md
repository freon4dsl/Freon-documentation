# Building an Interpreter

This example shows how to create an interpreter.

## The Computer Aided Learning DSL

The language used in this extended example is the one that is in depth explained in the [tutorial](/Tutorial/Overview).
Remember from the requirements for this DSL that our hypothetical client wants a means to test the page flow.
We are going to build an interpreter to do just that.

To follow the example use the `npm create freon@latest` command and choose the language called `Education`. Empty the
`/src/defs` folder, then copy in all def files for Lesson 9. Build the project (`npm run build`).

## Values for the Literals

As explained in [Interpreter Framework](/Documentation/Interpreter_Framework) there is only one file that we need
to change: `/src/freon/interpreter/EducationInterpreter.ts`.

Because this is the easiest manner, we are going to build the evaluation from the bottom up. This means that we are first going to
implement the evaluation functions for the literal expressions, i.e. `SimpleNumber`, `NumberLiteralExpression`, and `Fraction`.

```ts
// Education/src/interpreter/EducationInterpreter.ts#L206-L218

}

override evalNumberLiteralExpression(node: NumberLiteralExpression, ctx: InterpreterContext): RtObject {
    return new RtNumber(node.value)
}

override evalFraction(node: Fraction, ctx: InterpreterContext): RtObject {
    return new RtFraction(new RtNumber(node.numerator), new RtNumber(node.denominator))
}

///////////////// COMPARISON EXPRESSIONS

override evalEqualsExpression(node: EqualsExpression, ctx: InterpreterContext): RtObject {
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

What makes things easy is that we do not actually need the result of a fraction, that 
is, if the fraction is 6/3, we do not need the number 2. All we have to do, when 
building the test for our customer, is to compare one fraction with another.
Therefore, the only function we need to define for the `RtFraction` class is the `equals` function.

## Values for Binary Expressions

The next step is to create the evaluation functions for the binary expressions. They 
are all similar, so here we focus on the evaluation of an `OrExpression`. 

```ts
// Education/src/interpreter/EducationInterpreter.ts#L234-L238

}

override evalGreaterThenExpression(node: GreaterThenExpression, ctx: InterpreterContext): RtObject {
    const left = main.evaluate(node.left, ctx) as RtNumber
    const right = main.evaluate(node.right, ctx) as RtNumber
```

First we evaluate the
left and right hand side of the expression. Note that we use the `main` interpreter from the file 
`MainEducationInterpreter.ts`. The `main` interpreter is able to obtain the runtime value for
any node type. Next we use the predefined `or` function of the class
`RtBoolean`, which is defined as follows.

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

The other comparison expressions, like `AndExpression`, and `EqualsExpression`, are implemented
in a similar fashion. For example, this is the implementation of the `GreaterOrEqualsExpression`:

```ts
// Education/src/interpreter/EducationInterpreter.ts#L246-L250

}

override evalLessThenExpression(node: LessThenExpression, ctx: InterpreterContext): RtObject {
    const left = main.evaluate(node.left, ctx) as RtNumber
    const right = main.evaluate(node.right, ctx) as RtNumber
```
