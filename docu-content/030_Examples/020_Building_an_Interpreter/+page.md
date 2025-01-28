<script>
    import Note from "$lib/notes/Note.svelte";
</script>

# Building an Interpreter

This example shows how to create an interpreter.

## The Computer Aided Learning DSL

The language used in this extended example is the one that is in depth explained in the [tutorial](/Tutorial/Overview).
When you take another look at the requirements for this DSL, you see that our hypothetical client wants a means to test the page flow.
We are going to build an interpreter to do just that.

To follow the example use the `npm create freon@latest` command and choose the language called `EducationInterpreter`. 
Build the project (`npm run build`). Start the editor and select the model named 'Model4Interpreter', which is 
basically the same as the model called 'Lesson6' that was used in the tutorial. Open the model unit 'TestB' and run the 
interpreter from the `Edit` menu on the complete test (i.e. by selecting the test as current node).

<Note>
<svelte:fragment slot="header">The selected node is the one that is interpreted</svelte:fragment>
<svelte:fragment slot="content">
When running the interpreter from the <code>Edit</code> menu, the interpreter will try to evaluate 
the currently selected node. You will see a different result in the Interpreter tab for different nodes.
Often the interpretation cannot be done completely, because some context is needed. It is up to the 
creator of the interpreter to augment this.
</svelte:fragment></Note>

## Values for the Literals

As explained in [Interpreter Framework](/Documentation/Interpreter_Framework) there is only one file that we need
to change: `/src/freon/interpreter/EducationInterpreter.ts`.

Because this is the easiest manner, we are going to build the evaluation from the bottom up. This means that we are first going to
implement the evaluation functions for the literal expressions, i.e. `SimpleNumber`, `NumberLiteralExpression`, and `Fraction`.

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

As you see, the first two functions simply return a runtime object of type `RtNumber` which holds the current `value`
of the node. The third function returns a runtime object of type `RtFraction`, which is defined as follows:

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

What makes things easy is that we do not actually need the result of a fraction, that 
is, if the fraction is 6/3, we do not need the number 2. All we have to do, when 
building the test for our customer, is to compare one fraction with another.
Therefore, the only function we need to define for the `RtFraction` class is the `equals` function.

## Values for Binary Expressions

The next step is to create the evaluation functions for the binary expressions. They 
are all similar, so here we focus on the evaluation of an `OrExpression`. 

```ts
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L244-L248

override evalOrExpression(node: OrExpression, ctx: InterpreterContext): RtObject {
    const left = main.evaluate(node.left, ctx) as RtBoolean
    const right = main.evaluate(node.right, ctx) as RtBoolean
    return left.or(right)
}
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
// EducationInterpreter/src/custom/interpreter/EducationInterpreter.ts#L256-L260

override evalGreaterOrEqualsExpression(node: GreaterOrEqualsExpression, ctx: InterpreterContext): RtObject {
    const left = main.evaluate(node.left, ctx) as RtNumber
    const right = main.evaluate(node.right, ctx) as RtNumber
    return RtBoolean.of(left.value >= right.value)
}
```
