// Generated my Freon once, will NEVER be overwritten.
import { IMainInterpreter, InterpreterContext, RtArray, RtNumber, RtObject } from "@freon4dsl/core";
import {
    ExpressionUnit,
    Function,
    FunctionCallExpression,
    MinusExpression,
    NumberLiteralExpression,
    Parameter,
    ParameterRef,
    PlusExpression
} from "../language/gen/index.js";
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

    override evalExpressionUnit(node: ExpressionUnit, ctx: InterpreterContext): RtObject {
        const result = new RtArray();
        node.expressions.forEach(expr => {
            result.array.push(main.evaluate(expr, ctx));
        });
        return result;
    }

    override evalNumberLiteralExpression(node: NumberLiteralExpression, ctx: InterpreterContext): RtObject {
        return new RtNumber(node.value);
    }

    override evalParameter(node: Parameter, ctx: InterpreterContext): RtObject {
        return ctx.find(node);
    }

    override evalPlusExpression(node: PlusExpression, ctx: InterpreterContext): RtObject {
        const left = main.evaluate(node.left, ctx);
        const right = main.evaluate(node.right, ctx);
        return (left as RtNumber).plus(right as RtNumber);
    }

    override evalMinusExpression(node: MinusExpression, ctx: InterpreterContext): RtObject {
        const left = main.evaluate(node.left, ctx);
        const right = main.evaluate(node.right, ctx);
        return (left as RtNumber).minus(right as RtNumber);
    }

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

    override evalFunction(node: Function, ctx: InterpreterContext): RtObject {
        return main.evaluate(node.body, ctx);
    }

    override evalParameterRef(node: ParameterRef, ctx: InterpreterContext): RtObject {
        return ctx.find(node.$parameter);
    }
}
        
