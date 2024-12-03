// Generated by the Freon Language Generator.
import { FreError, FreErrorSeverity, FreWriter, FreNodeReference, FreNamedNode, FreNode, FreLanguageEnvironment } from "@freon4dsl/core";
import {
    Entity,
    EntityFunction,
    AttributeWithLimitedType,
    AttributeWithEntityType,
    Variable,
    AttributeRef,
    VariableRef,
    FunctionCallExpression,
} from "../../language/gen/index.js";
import { EntityModelDefaultWorker } from "../../utils/gen/index.js";
import { EntityModelCheckerInterface } from "./EntityModelValidator.js";

/**
 * Class EntityModelReferenceChecker is part of the implementation of the default validator.
 * It checks whether references can be found within the model.
 *
 * Class EntityModelWalker implements the traversal of the model tree. This class implements
 * the actual checking of each node in the tree.
 */
export class EntityModelReferenceChecker extends EntityModelDefaultWorker implements EntityModelCheckerInterface {
    // 'myWriter' is used to provide error messages on the nodes in the model tree
    myWriter: FreWriter = FreLanguageEnvironment.getInstance().writer;
    // 'errorList' holds the errors found while traversing the model tree
    errorList: FreError[] = [];
    private refSeparator: string = "/";

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
        if (!!modelelement.baseEntity && modelelement.baseEntity.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.baseEntity, "baseEntity", `${modelelement.name}`);
            hasFatalError = true;
        }
        if (!!modelelement.baseInterface && modelelement.baseInterface.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.baseInterface, "baseInterface", `${modelelement.name}`);
            hasFatalError = true;
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
        if (!!modelelement.declaredType && modelelement.declaredType.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.declaredType, "declaredType", `${modelelement.name}`);
            hasFatalError = true;
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
        if (!!modelelement.declaredType && modelelement.declaredType.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.declaredType, "declaredType", `${modelelement.name}`);
            hasFatalError = true;
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
        if (!!modelelement.declaredType && modelelement.declaredType.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.declaredType, "declaredType", `${modelelement.name}`);
            hasFatalError = true;
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
        if (!!modelelement.declaredType && modelelement.declaredType.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.declaredType, "declaredType", `${modelelement.name}`);
            hasFatalError = true;
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
        if (!!modelelement.attribute && modelelement.attribute.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.attribute, "attribute", `${"unnamed"}`);
            hasFatalError = true;
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
        if (!!modelelement.variable && modelelement.variable.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.variable, "variable", `${"unnamed"}`);
            hasFatalError = true;
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
        if (!!modelelement.functionDefinition && modelelement.functionDefinition.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.functionDefinition, "functionDefinition", `${"unnamed"}`);
            hasFatalError = true;
        }
        return hasFatalError;
    }

    private makeErrorMessage(
        modelelement: FreNode,
        referredElem: FreNodeReference<FreNamedNode>,
        propertyName: string,
        locationDescription: string,
    ) {
        const scoper = FreLanguageEnvironment.getInstance().scoper;
        const possibles = scoper.getVisibleElements(modelelement).filter((elem) => elem.name === referredElem.name);
        if (possibles.length > 0) {
            this.errorList.push(
                new FreError(
                    `Reference '${referredElem.pathnameToString(this.refSeparator)}' should have type '${referredElem.typeName}', but found type(s) [${possibles.map((elem) => `${elem.freLanguageConcept()}`).join(", ")}]`,
                    modelelement,
                    `${propertyName} of ${locationDescription}`,
                    `${propertyName}`,
                    FreErrorSeverity.Error,
                ),
            );
        } else {
            this.errorList.push(
                new FreError(
                    `Cannot find reference '${referredElem.pathnameToString(this.refSeparator)}'`,
                    modelelement,
                    `${propertyName} of ${locationDescription}`,
                    `${propertyName}`,
                    FreErrorSeverity.Error,
                ),
            );
        }
    }
}
