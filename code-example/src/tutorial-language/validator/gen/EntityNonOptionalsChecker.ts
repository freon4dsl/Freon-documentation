// Generated by the ProjectIt Language Generator.
import { PiError, PiErrorSeverity, PiWriter } from "@projectit/core";
import {
    SomeOtherModelUnit,
    EntityModelUnit,
    Entity,
    AttributeType,
    MockEnumeration,
    AbsExpression,
    MultiplyExpression,
    EntityFunction,
    AttributeWithLimitedType,
    Text,
    AttributeWithEntityType,
    Variable,
    EntityExpression,
    AppliedFeature,
    AttributeRef,
    VariableRef,
    LiteralExpression,
    StringLiteralExpression,
    NumberLiteralExpression,
    BooleanLiteralExpression,
    BinaryExpression,
    PlusExpression,
    DivideExpression,
    AndExpression,
    OrExpression,
    ComparisonExpression,
    LessThenExpression,
    GreaterThenExpression,
    EqualsExpression,
    FunctionCallExpression,
    IfExpression,
    BaseType,
    Type,
    EntityModel
} from "../../language/gen";
import { EntityEnvironment } from "../../environment/gen/EntityEnvironment";
import { EntityDefaultWorker } from "../../utils/gen";
import { EntityCheckerInterface } from "./EntityValidator";

/**
 * Class EntityNonOptionalsChecker is part of the implementation of the default validator.
 * It checks whether non-optional properties, as such defined in the .ast definition, indeed
 * have a value.
 * Class EntityWalker implements the traversal of the model tree. This class implements
 * the actual checking of each node in the tree.
 */
export class EntityNonOptionalsChecker extends EntityDefaultWorker implements EntityCheckerInterface {
    // 'myWriter' is used to provide error messages on the nodes in the model tree
    myWriter: PiWriter = (EntityEnvironment.getInstance() as EntityEnvironment).writer;
    // 'errorList' holds the errors found while traversing the model tree
    errorList: PiError[] = [];

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeEntityModel(modelelement: EntityModel): boolean {
        let hasFatalError: boolean = false;
        if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length == 0) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'name' must have a value", modelelement, modelelement.name, PiErrorSeverity.Error));
        }
        if (modelelement.extraUnit === null || modelelement.extraUnit === undefined) {
            hasFatalError = true;
            this.errorList.push(
                new PiError("Property 'extraUnit' must have a value", modelelement, modelelement.name, PiErrorSeverity.Error)
            );
        }

        return hasFatalError;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeSomeOtherModelUnit(modelelement: SomeOtherModelUnit): boolean {
        let hasFatalError: boolean = false;
        if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length == 0) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'name' must have a value", modelelement, modelelement.name, PiErrorSeverity.Error));
        }
        if (modelelement.somePart === null || modelelement.somePart === undefined) {
            hasFatalError = true;
            this.errorList.push(
                new PiError("Property 'somePart' must have a value", modelelement, modelelement.name, PiErrorSeverity.Error)
            );
        }

        return hasFatalError;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeEntityModelUnit(modelelement: EntityModelUnit): boolean {
        let hasFatalError: boolean = false;
        if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length == 0) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'name' must have a value", modelelement, modelelement.name, PiErrorSeverity.Error));
        }

        return hasFatalError;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeEntity(modelelement: Entity): boolean {
        let hasFatalError: boolean = false;
        if (modelelement.isCompany === null || modelelement.isCompany === undefined) {
            hasFatalError = true;
            this.errorList.push(
                new PiError("Property 'isCompany' must have a value", modelelement, modelelement.name, PiErrorSeverity.Error)
            );
        }
        if (modelelement.simpleprop === null || modelelement.simpleprop === undefined || modelelement.simpleprop?.length == 0) {
            hasFatalError = true;
            this.errorList.push(
                new PiError("Property 'simpleprop' must have a value", modelelement, modelelement.name, PiErrorSeverity.Error)
            );
        }
        if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length == 0) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'name' must have a value", modelelement, modelelement.name, PiErrorSeverity.Error));
        }
        if (modelelement.baseInterface === null || modelelement.baseInterface === undefined) {
            hasFatalError = true;
            this.errorList.push(
                new PiError("Property 'baseInterface' must have a value", modelelement, modelelement.name, PiErrorSeverity.Error)
            );
        }

        return hasFatalError;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeAttributeType(modelelement: AttributeType): boolean {
        let hasFatalError: boolean = false;
        if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length == 0) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'name' must have a value", modelelement, modelelement.name, PiErrorSeverity.Error));
        }
        if (modelelement.extra === null || modelelement.extra === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'extra' must have a value", modelelement, modelelement.name, PiErrorSeverity.Error));
        }

        return hasFatalError;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeMockEnumeration(modelelement: MockEnumeration): boolean {
        let hasFatalError: boolean = false;
        if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length == 0) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'name' must have a value", modelelement, modelelement.name, PiErrorSeverity.Error));
        }

        return hasFatalError;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeAbsExpression(modelelement: AbsExpression): boolean {
        let hasFatalError: boolean = false;
        if (modelelement.expr === null || modelelement.expr === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'expr' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }

        return hasFatalError;
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
        let hasFatalError: boolean = false;
        if (modelelement.left === null || modelelement.left === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'left' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }
        if (modelelement.right === null || modelelement.right === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'right' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }

        return hasFatalError;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeEntityFunction(modelelement: EntityFunction): boolean {
        let hasFatalError: boolean = false;
        if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length == 0) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'name' must have a value", modelelement, modelelement.name, PiErrorSeverity.Error));
        }
        if (modelelement.expression === null || modelelement.expression === undefined) {
            hasFatalError = true;
            this.errorList.push(
                new PiError("Property 'expression' must have a value", modelelement, modelelement.name, PiErrorSeverity.Error)
            );
        }
        if (modelelement.declaredType === null || modelelement.declaredType === undefined) {
            hasFatalError = true;
            this.errorList.push(
                new PiError("Property 'declaredType' must have a value", modelelement, modelelement.name, PiErrorSeverity.Error)
            );
        }

        return hasFatalError;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeAttributeWithLimitedType(modelelement: AttributeWithLimitedType): boolean {
        let hasFatalError: boolean = false;
        if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length == 0) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'name' must have a value", modelelement, modelelement.name, PiErrorSeverity.Error));
        }
        if (modelelement.declaredType === null || modelelement.declaredType === undefined) {
            hasFatalError = true;
            this.errorList.push(
                new PiError("Property 'declaredType' must have a value", modelelement, modelelement.name, PiErrorSeverity.Error)
            );
        }

        return hasFatalError;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeAttributeWithEntityType(modelelement: AttributeWithEntityType): boolean {
        let hasFatalError: boolean = false;
        if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length == 0) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'name' must have a value", modelelement, modelelement.name, PiErrorSeverity.Error));
        }
        if (modelelement.declaredType === null || modelelement.declaredType === undefined) {
            hasFatalError = true;
            this.errorList.push(
                new PiError("Property 'declaredType' must have a value", modelelement, modelelement.name, PiErrorSeverity.Error)
            );
        }

        return hasFatalError;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeVariable(modelelement: Variable): boolean {
        let hasFatalError: boolean = false;
        if (modelelement.name === null || modelelement.name === undefined || modelelement.name?.length == 0) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'name' must have a value", modelelement, modelelement.name, PiErrorSeverity.Error));
        }
        if (modelelement.declaredType === null || modelelement.declaredType === undefined) {
            hasFatalError = true;
            this.errorList.push(
                new PiError("Property 'declaredType' must have a value", modelelement, modelelement.name, PiErrorSeverity.Error)
            );
        }

        return hasFatalError;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeAttributeRef(modelelement: AttributeRef): boolean {
        let hasFatalError: boolean = false;
        if (modelelement.attribute === null || modelelement.attribute === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'attribute' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }

        return hasFatalError;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeVariableRef(modelelement: VariableRef): boolean {
        let hasFatalError: boolean = false;
        if (modelelement.variable === null || modelelement.variable === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'variable' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }

        return hasFatalError;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeStringLiteralExpression(modelelement: StringLiteralExpression): boolean {
        let hasFatalError: boolean = false;
        if (modelelement.value === null || modelelement.value === undefined || modelelement.value?.length == 0) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'value' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }

        return hasFatalError;
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
        let hasFatalError: boolean = false;
        if (modelelement.value === null || modelelement.value === undefined || modelelement.value?.length == 0) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'value' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }

        return hasFatalError;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeBooleanLiteralExpression(modelelement: BooleanLiteralExpression): boolean {
        let hasFatalError: boolean = false;
        if (modelelement.value === null || modelelement.value === undefined || modelelement.value?.length == 0) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'value' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }

        return hasFatalError;
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
        let hasFatalError: boolean = false;
        if (modelelement.left === null || modelelement.left === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'left' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }
        if (modelelement.right === null || modelelement.right === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'right' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }

        return hasFatalError;
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
        let hasFatalError: boolean = false;
        if (modelelement.left === null || modelelement.left === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'left' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }
        if (modelelement.right === null || modelelement.right === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'right' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }

        return hasFatalError;
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
        let hasFatalError: boolean = false;
        if (modelelement.left === null || modelelement.left === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'left' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }
        if (modelelement.right === null || modelelement.right === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'right' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }

        return hasFatalError;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeAndExpression(modelelement: AndExpression): boolean {
        let hasFatalError: boolean = false;
        if (modelelement.left === null || modelelement.left === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'left' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }
        if (modelelement.right === null || modelelement.right === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'right' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }

        return hasFatalError;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeOrExpression(modelelement: OrExpression): boolean {
        let hasFatalError: boolean = false;
        if (modelelement.left === null || modelelement.left === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'left' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }
        if (modelelement.right === null || modelelement.right === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'right' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }

        return hasFatalError;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeComparisonExpression(modelelement: ComparisonExpression): boolean {
        let hasFatalError: boolean = false;
        if (modelelement.left === null || modelelement.left === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'left' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }
        if (modelelement.right === null || modelelement.right === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'right' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }

        return hasFatalError;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeLessThenExpression(modelelement: LessThenExpression): boolean {
        let hasFatalError: boolean = false;
        if (modelelement.left === null || modelelement.left === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'left' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }
        if (modelelement.right === null || modelelement.right === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'right' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }

        return hasFatalError;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeGreaterThenExpression(modelelement: GreaterThenExpression): boolean {
        let hasFatalError: boolean = false;
        if (modelelement.left === null || modelelement.left === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'left' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }
        if (modelelement.right === null || modelelement.right === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'right' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }

        return hasFatalError;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeEqualsExpression(modelelement: EqualsExpression): boolean {
        let hasFatalError: boolean = false;
        if (modelelement.left === null || modelelement.left === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'left' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }
        if (modelelement.right === null || modelelement.right === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'right' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }

        return hasFatalError;
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
        let hasFatalError: boolean = false;
        if (modelelement.functionDefinition === null || modelelement.functionDefinition === undefined) {
            hasFatalError = true;
            this.errorList.push(
                new PiError("Property 'functionDefinition' must have a value", modelelement, "unnamed", PiErrorSeverity.Error)
            );
        }

        return hasFatalError;
    }

    /**
     * Checks 'modelelement' before checking its children.
     * Found errors are pushed onto 'errorlist'.
     * If an error is found, it is considered 'fatal', which means that no other checks on
     * 'modelelement' are performed.
     *
     * @param modelelement
     */
    public execBeforeIfExpression(modelelement: IfExpression): boolean {
        let hasFatalError: boolean = false;
        if (modelelement.condition === null || modelelement.condition === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'condition' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }
        if (modelelement.whenTrue === null || modelelement.whenTrue === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'whenTrue' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }
        if (modelelement.whenFalse === null || modelelement.whenFalse === undefined) {
            hasFatalError = true;
            this.errorList.push(new PiError("Property 'whenFalse' must have a value", modelelement, "unnamed", PiErrorSeverity.Error));
        }

        return hasFatalError;
    }
}