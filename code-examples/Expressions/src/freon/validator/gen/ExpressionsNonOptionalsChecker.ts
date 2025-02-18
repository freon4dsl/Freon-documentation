// Generated by the Freon Language Generator.
import { FreError, FreErrorSeverity, FreWriter, FreLanguageEnvironment } from "@freon4dsl/core";
import {
    Expressions,
    ExpressionUnit,
    Type,
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
} from "../../language/gen/index.js";
import { ExpressionsDefaultWorker } from "../../utils/gen/index.js";
import { ExpressionsCheckerInterface } from "./ExpressionsValidator.js";

/**
 * Class ExpressionsNonOptionalsChecker is part of the implementation of the default validator.
 * It checks whether non-optional properties, as such defined in the .ast definition, indeed
 * have a value.
 * Class ExpressionsWalker implements the traversal of the model tree. This class implements
 * the actual checking of each node in the tree.
 */
export class ExpressionsNonOptionalsChecker extends ExpressionsDefaultWorker implements ExpressionsCheckerInterface {
    // 'myWriter' is used to provide error messages on the nodes in the model tree
    myWriter: FreWriter = FreLanguageEnvironment.getInstance().writer;
    // 'errorList' holds the errors found while traversing the model tree
    errorList: FreError[] = [];

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeExpressions(modelelement: Expressions): boolean {
        if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
            this.errorList.push(
                new FreError("Property 'name' must have a value", modelelement, modelelement.name, "name", FreErrorSeverity.Error),
            );
        }

        return false;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeExpressionUnit(modelelement: ExpressionUnit): boolean {
        if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
            this.errorList.push(
                new FreError("Property 'name' must have a value", modelelement, modelelement.name, "name", FreErrorSeverity.Error),
            );
        }

        return false;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeType(modelelement: Type): boolean {
        if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
            this.errorList.push(
                new FreError("Property 'name' must have a value", modelelement, modelelement.name, "name", FreErrorSeverity.Error),
            );
        }

        return false;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeNumberLiteralExpression(modelelement: NumberLiteralExpression): boolean {
        if (modelelement.value === null || modelelement.value === undefined) {
            this.errorList.push(
                new FreError("Property 'value' must have a value", modelelement, "unnamed", "value", FreErrorSeverity.Error),
            );
        }

        return false;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeBinaryExpression(modelelement: BinaryExpression): boolean {
        if (modelelement.left === null || modelelement.left === undefined) {
            this.errorList.push(new FreError("Property 'left' must have a value", modelelement, "unnamed", "left", FreErrorSeverity.Error));
        }
        if (modelelement.right === null || modelelement.right === undefined) {
            this.errorList.push(
                new FreError("Property 'right' must have a value", modelelement, "unnamed", "right", FreErrorSeverity.Error),
            );
        }

        return false;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeMultiplyExpression(modelelement: MultiplyExpression): boolean {
        if (modelelement.left === null || modelelement.left === undefined) {
            this.errorList.push(new FreError("Property 'left' must have a value", modelelement, "unnamed", "left", FreErrorSeverity.Error));
        }
        if (modelelement.right === null || modelelement.right === undefined) {
            this.errorList.push(
                new FreError("Property 'right' must have a value", modelelement, "unnamed", "right", FreErrorSeverity.Error),
            );
        }

        return false;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforePlusExpression(modelelement: PlusExpression): boolean {
        if (modelelement.left === null || modelelement.left === undefined) {
            this.errorList.push(new FreError("Property 'left' must have a value", modelelement, "unnamed", "left", FreErrorSeverity.Error));
        }
        if (modelelement.right === null || modelelement.right === undefined) {
            this.errorList.push(
                new FreError("Property 'right' must have a value", modelelement, "unnamed", "right", FreErrorSeverity.Error),
            );
        }

        return false;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeMinusExpression(modelelement: MinusExpression): boolean {
        if (modelelement.left === null || modelelement.left === undefined) {
            this.errorList.push(new FreError("Property 'left' must have a value", modelelement, "unnamed", "left", FreErrorSeverity.Error));
        }
        if (modelelement.right === null || modelelement.right === undefined) {
            this.errorList.push(
                new FreError("Property 'right' must have a value", modelelement, "unnamed", "right", FreErrorSeverity.Error),
            );
        }

        return false;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeDivideExpression(modelelement: DivideExpression): boolean {
        if (modelelement.left === null || modelelement.left === undefined) {
            this.errorList.push(new FreError("Property 'left' must have a value", modelelement, "unnamed", "left", FreErrorSeverity.Error));
        }
        if (modelelement.right === null || modelelement.right === undefined) {
            this.errorList.push(
                new FreError("Property 'right' must have a value", modelelement, "unnamed", "right", FreErrorSeverity.Error),
            );
        }

        return false;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeFunction(modelelement: Function): boolean {
        if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
            this.errorList.push(
                new FreError("Property 'name' must have a value", modelelement, modelelement.name, "name", FreErrorSeverity.Error),
            );
        }
        if (modelelement.body === null || modelelement.body === undefined) {
            this.errorList.push(
                new FreError("Property 'body' must have a value", modelelement, modelelement.name, "body", FreErrorSeverity.Error),
            );
        }
        if (modelelement.declaredType === null || modelelement.declaredType === undefined) {
            this.errorList.push(
                new FreError(
                    "Property 'declaredType' must have a value",
                    modelelement,
                    modelelement.name,
                    "declaredType",
                    FreErrorSeverity.Error,
                ),
            );
        }

        return false;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeParameter(modelelement: Parameter): boolean {
        if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length === 0) {
            this.errorList.push(
                new FreError("Property 'name' must have a value", modelelement, modelelement.name, "name", FreErrorSeverity.Error),
            );
        }
        if (modelelement.declaredType === null || modelelement.declaredType === undefined) {
            this.errorList.push(
                new FreError(
                    "Property 'declaredType' must have a value",
                    modelelement,
                    modelelement.name,
                    "declaredType",
                    FreErrorSeverity.Error,
                ),
            );
        }

        return false;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeParameterRef(modelelement: ParameterRef): boolean {
        if (modelelement.parameter === null || modelelement.parameter === undefined) {
            this.errorList.push(
                new FreError("Property 'parameter' must have a value", modelelement, "unnamed", "parameter", FreErrorSeverity.Error),
            );
        }

        return false;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeFunctionCallExpression(modelelement: FunctionCallExpression): boolean {
        if (modelelement.calledFunction === null || modelelement.calledFunction === undefined) {
            this.errorList.push(
                new FreError(
                    "Property 'calledFunction' must have a value",
                    modelelement,
                    "unnamed",
                    "calledFunction",
                    FreErrorSeverity.Error,
                ),
            );
        }

        return false;
    }
}
