// Generated by the Freon Language Generator.
import {
    BooleanLiteral,
    Exp,
    ExpWithType,
    GenericKind,
    GenericLiteral,
    GenericType,
    NamedExp,
    NamedType,
    NumberLiteral,
    PlusExp,
    PredefinedType,
    StringLiteral,
    TypeDecl,
    TypeRef,
    TypeUsage,
    UnitKind,
    UnitLiteral,
    UnitOfMeasurement,
    XX,
    XXunit,
} from "../../language/gen/index.js";
import { XXWorker } from "./XXWorker.js";

/**
 * Class XXDefaultWorker is part of the implementation of the visitor pattern on models.
 * It implements the interface XXWorker with empty methods, and can thus be used as
 * base to any class that needs to traverse the model tree.
 * Class XXWalker implements the traversal of the model tree. This class implements
 * the actual visiting of each node in the tree.
 */
export class XXDefaultWorker implements XXWorker {
    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeXX(modelelement: XX): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterXX(modelelement: XX): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeXXunit(modelelement: XXunit): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterXXunit(modelelement: XXunit): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeExpWithType(modelelement: ExpWithType): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterExpWithType(modelelement: ExpWithType): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeTypeUsage(modelelement: TypeUsage): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterTypeUsage(modelelement: TypeUsage): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeTypeRef(modelelement: TypeRef): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterTypeRef(modelelement: TypeRef): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeTypeDecl(modelelement: TypeDecl): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterTypeDecl(modelelement: TypeDecl): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeNamedType(modelelement: NamedType): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterNamedType(modelelement: NamedType): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforePredefinedType(modelelement: PredefinedType): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterPredefinedType(modelelement: PredefinedType): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeGenericType(modelelement: GenericType): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterGenericType(modelelement: GenericType): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeGenericKind(modelelement: GenericKind): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterGenericKind(modelelement: GenericKind): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeUnitOfMeasurement(modelelement: UnitOfMeasurement): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterUnitOfMeasurement(modelelement: UnitOfMeasurement): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeUnitKind(modelelement: UnitKind): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterUnitKind(modelelement: UnitKind): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeExp(modelelement: Exp): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterExp(modelelement: Exp): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeNumberLiteral(modelelement: NumberLiteral): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterNumberLiteral(modelelement: NumberLiteral): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeStringLiteral(modelelement: StringLiteral): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterStringLiteral(modelelement: StringLiteral): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeBooleanLiteral(modelelement: BooleanLiteral): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterBooleanLiteral(modelelement: BooleanLiteral): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeUnitLiteral(modelelement: UnitLiteral): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterUnitLiteral(modelelement: UnitLiteral): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeGenericLiteral(modelelement: GenericLiteral): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterGenericLiteral(modelelement: GenericLiteral): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforeNamedExp(modelelement: NamedExp): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterNamedExp(modelelement: NamedExp): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' before visiting its children.
     * @param modelelement
     */
    public execBeforePlusExp(modelelement: PlusExp): boolean {
        return false;
    }

    /**
     * Visits 'modelelement' after visiting its children.
     * @param modelelement
     */
    public execAfterPlusExp(modelelement: PlusExp): boolean {
        return false;
    }
}
