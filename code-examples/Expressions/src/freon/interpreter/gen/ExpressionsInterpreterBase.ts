// Generated by the Freon Language Generator.
// Generated my Freon, will be overwritten with every generation.
import { InterpreterContext, RtObject, RtError } from "@freon4dsl/core";
import {
    Type,
    Expression,
    NumberLiteralExpression,
    BinaryExpression,
    MultiplyExpression,
    PlusExpression,
    MinusExpression,
    DivideExpression,
    Function,
    Parameter,
    ParameterRef,
    FunctionCallExpression,
    ExpressionUnit,
} from "../../language/gen/index.js";

/**
 * The base class containing all interpreter functions that should be defined.
 * All functions throw an error when called.
 */
export class ExpressionsInterpreterBase {
    constructor() {}

    evalType(node: Type, ctx: InterpreterContext): RtObject {
        throw new RtError("evalType is not defined");
    }

    evalExpression(node: Expression, ctx: InterpreterContext): RtObject {
        throw new RtError("evalExpression is not defined");
    }

    evalNumberLiteralExpression(node: NumberLiteralExpression, ctx: InterpreterContext): RtObject {
        throw new RtError("evalNumberLiteralExpression is not defined");
    }

    evalBinaryExpression(node: BinaryExpression, ctx: InterpreterContext): RtObject {
        throw new RtError("evalBinaryExpression is not defined");
    }

    evalMultiplyExpression(node: MultiplyExpression, ctx: InterpreterContext): RtObject {
        throw new RtError("evalMultiplyExpression is not defined");
    }

    evalPlusExpression(node: PlusExpression, ctx: InterpreterContext): RtObject {
        throw new RtError("evalPlusExpression is not defined");
    }

    evalMinusExpression(node: MinusExpression, ctx: InterpreterContext): RtObject {
        throw new RtError("evalMinusExpression is not defined");
    }

    evalDivideExpression(node: DivideExpression, ctx: InterpreterContext): RtObject {
        throw new RtError("evalDivideExpression is not defined");
    }

    evalFunction(node: Function, ctx: InterpreterContext): RtObject {
        throw new RtError("evalFunction is not defined");
    }

    evalParameter(node: Parameter, ctx: InterpreterContext): RtObject {
        throw new RtError("evalParameter is not defined");
    }

    evalParameterRef(node: ParameterRef, ctx: InterpreterContext): RtObject {
        throw new RtError("evalParameterRef is not defined");
    }

    evalFunctionCallExpression(node: FunctionCallExpression, ctx: InterpreterContext): RtObject {
        throw new RtError("evalFunctionCallExpression is not defined");
    }

    evalExpressionUnit(node: ExpressionUnit, ctx: InterpreterContext): RtObject {
        throw new RtError("evalExpressionUnit is not defined");
    }
}
