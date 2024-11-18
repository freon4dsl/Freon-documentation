// Generated by the Freon Language Generator.
import { FreError, FreErrorSeverity, FreWriter, FreNodeReference, FreNamedNode, FreNode, FreLanguageEnvironment } from "@freon4dsl/core";
import {
    FunctionCallExpression,
    InsurancePartRef,
    ParameterRef,
    GenericTypeDecl,
    GenericLiteral,
    Entity,
    BaseProduct,
    InsuranceProduct,
    TypeRef,
} from "../../language/gen/index.js";
import { InsuranceModelDefaultWorker } from "../../utils/gen/index.js";
import { InsuranceModelCheckerInterface } from "./InsuranceModelValidator.js";

/**
 * Class InsuranceModelReferenceChecker is part of the implementation of the default validator.
 * It checks whether references can be found within the model.
 *
 * Class InsuranceModelWalker implements the traversal of the model tree. This class implements
 * the actual checking of each node in the tree.
 */
export class InsuranceModelReferenceChecker extends InsuranceModelDefaultWorker implements InsuranceModelCheckerInterface {
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
    public execBeforeFunctionCallExpression(modelelement: FunctionCallExpression): boolean {
        let hasFatalError: boolean = false;
        if (!!modelelement.funcDefinition && modelelement.funcDefinition.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.funcDefinition, "funcDefinition", `${"unnamed"}`);
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
    public execBeforeInsurancePartRef(modelelement: InsurancePartRef): boolean {
        let hasFatalError: boolean = false;
        if (!!modelelement.part && modelelement.part.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.part, "part", `${"unnamed"}`);
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
    public execBeforeParameterRef(modelelement: ParameterRef): boolean {
        let hasFatalError: boolean = false;
        if (!!modelelement.parameter && modelelement.parameter.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.parameter, "parameter", `${"unnamed"}`);
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
    public execBeforeGenericTypeDecl(modelelement: GenericTypeDecl): boolean {
        let hasFatalError: boolean = false;
        if (!!modelelement.kind && modelelement.kind.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.kind, "kind", `${"unnamed"}`);
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
    public execBeforeGenericLiteral(modelelement: GenericLiteral): boolean {
        let hasFatalError: boolean = false;
        if (!!modelelement.kind && modelelement.kind.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.kind, "kind", `${"unnamed"}`);
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
    public execBeforeEntity(modelelement: Entity): boolean {
        let hasFatalError: boolean = false;
        if (!!modelelement.baseEntity && modelelement.baseEntity.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.baseEntity, "baseEntity", `${modelelement.name}`);
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
    public execBeforeBaseProduct(modelelement: BaseProduct): boolean {
        let hasFatalError: boolean = false;
        if (!!modelelement.theme && modelelement.theme.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.theme, "theme", `${modelelement.name}`);
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
    public execBeforeInsuranceProduct(modelelement: InsuranceProduct): boolean {
        let hasFatalError: boolean = false;
        for (const referredElem of modelelement.themes) {
            if (referredElem.referred === null) {
                this.makeErrorMessage(modelelement, referredElem, "themes", `${modelelement.name}`);
                hasFatalError = true;
            }
        }
        if (!!modelelement.nrPremiumDays && modelelement.nrPremiumDays.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.nrPremiumDays, "nrPremiumDays", `${modelelement.name}`);
            hasFatalError = true;
        }
        for (const referredElem of modelelement.parts) {
            if (referredElem.referred === null) {
                this.makeErrorMessage(modelelement, referredElem, "parts", `${modelelement.name}`);
                hasFatalError = true;
            }
        }
        for (const referredElem of modelelement.basedOn) {
            if (referredElem.referred === null) {
                this.makeErrorMessage(modelelement, referredElem, "basedOn", `${modelelement.name}`);
                hasFatalError = true;
            }
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
    public execBeforeTypeRef(modelelement: TypeRef): boolean {
        let hasFatalError: boolean = false;
        if (!!modelelement.type && modelelement.type.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.type, "type", `${"unnamed"}`);
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
