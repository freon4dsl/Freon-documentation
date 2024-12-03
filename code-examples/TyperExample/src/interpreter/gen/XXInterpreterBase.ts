// Generated by the Freon Language Generator.
// Generated my Freon, will be overwritten with every generation.
import { InterpreterContext, RtObject, RtError } from "@freon4dsl/core";
import {
    ExpWithType,
    TypeUsage,
    TypeRef,
    TypeDecl,
    NamedType,
    PredefinedType,
    GenericType,
    GenericKind,
    UnitOfMeasurement,
    UnitKind,
    Exp,
    NumberLiteral,
    StringLiteral,
    BooleanLiteral,
    UnitLiteral,
    GenericLiteral,
    NamedExp,
    PlusExp,
    XXunit,
} from "../../language/gen/index.js";

/**
 * The base class containing all interpreter functions that should be defined.
 * All functions throw an error when called.
 */
export class XXInterpreterBase {
    constructor() {}

    evalExpWithType(node: ExpWithType, ctx: InterpreterContext): RtObject {
        throw new RtError("evalExpWithType is not defined");
    }

    evalTypeUsage(node: TypeUsage, ctx: InterpreterContext): RtObject {
        throw new RtError("evalTypeUsage is not defined");
    }

    evalTypeRef(node: TypeRef, ctx: InterpreterContext): RtObject {
        throw new RtError("evalTypeRef is not defined");
    }

    evalTypeDecl(node: TypeDecl, ctx: InterpreterContext): RtObject {
        throw new RtError("evalTypeDecl is not defined");
    }

    evalNamedType(node: NamedType, ctx: InterpreterContext): RtObject {
        throw new RtError("evalNamedType is not defined");
    }

    evalPredefinedType(node: PredefinedType, ctx: InterpreterContext): RtObject {
        throw new RtError("evalPredefinedType is not defined");
    }

    evalGenericType(node: GenericType, ctx: InterpreterContext): RtObject {
        throw new RtError("evalGenericType is not defined");
    }

    evalGenericKind(node: GenericKind, ctx: InterpreterContext): RtObject {
        throw new RtError("evalGenericKind is not defined");
    }

    evalUnitOfMeasurement(node: UnitOfMeasurement, ctx: InterpreterContext): RtObject {
        throw new RtError("evalUnitOfMeasurement is not defined");
    }

    evalUnitKind(node: UnitKind, ctx: InterpreterContext): RtObject {
        throw new RtError("evalUnitKind is not defined");
    }

    evalExp(node: Exp, ctx: InterpreterContext): RtObject {
        throw new RtError("evalExp is not defined");
    }

    evalNumberLiteral(node: NumberLiteral, ctx: InterpreterContext): RtObject {
        throw new RtError("evalNumberLiteral is not defined");
    }

    evalStringLiteral(node: StringLiteral, ctx: InterpreterContext): RtObject {
        throw new RtError("evalStringLiteral is not defined");
    }

    evalBooleanLiteral(node: BooleanLiteral, ctx: InterpreterContext): RtObject {
        throw new RtError("evalBooleanLiteral is not defined");
    }

    evalUnitLiteral(node: UnitLiteral, ctx: InterpreterContext): RtObject {
        throw new RtError("evalUnitLiteral is not defined");
    }

    evalGenericLiteral(node: GenericLiteral, ctx: InterpreterContext): RtObject {
        throw new RtError("evalGenericLiteral is not defined");
    }

    evalNamedExp(node: NamedExp, ctx: InterpreterContext): RtObject {
        throw new RtError("evalNamedExp is not defined");
    }

    evalPlusExp(node: PlusExp, ctx: InterpreterContext): RtObject {
        throw new RtError("evalPlusExp is not defined");
    }

    evalXXunit(node: XXunit, ctx: InterpreterContext): RtObject {
        throw new RtError("evalXXunit is not defined");
    }
}
