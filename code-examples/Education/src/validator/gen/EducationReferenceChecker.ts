// Generated by the Freon Language Generator.
import { FreError, FreErrorSeverity, FreWriter, FreNodeReference, FreNamedNode, FreNode, FreLanguageEnvironment } from "@freon4dsl/core";
import { Flow, Test, FlowRule, PageTransition, GradeScore, QuestionReference, Step } from "../../language/gen/index.js";
import { EducationDefaultWorker } from "../../utils/gen/index.js";
import { EducationCheckerInterface } from "./EducationValidator.js";

/**
 * Class EducationReferenceChecker is part of the implementation of the default validator.
 * It checks whether references can be found within the model.
 *
 * Class EducationWalker implements the traversal of the model tree. This class implements
 * the actual checking of each node in the tree.
 */
export class EducationReferenceChecker extends EducationDefaultWorker implements EducationCheckerInterface {
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
    public execBeforeFlow(modelelement: Flow): boolean {
        let hasFatalError: boolean = false;
        if (!!modelelement.topic && modelelement.topic.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.topic, "topic", `${modelelement.name}`);
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
    public execBeforeTest(modelelement: Test): boolean {
        let hasFatalError: boolean = false;
        if (!!modelelement.topic && modelelement.topic.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.topic, "topic", `${modelelement.name}`);
            hasFatalError = true;
        }
        if (!!modelelement.flow && modelelement.flow.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.flow, "flow", `${modelelement.name}`);
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
    public execBeforeFlowRule(modelelement: FlowRule): boolean {
        let hasFatalError: boolean = false;
        if (!!modelelement.page && modelelement.page.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.page, "page", `${modelelement.name}`);
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
    public execBeforePageTransition(modelelement: PageTransition): boolean {
        let hasFatalError: boolean = false;
        if (!!modelelement.condition && modelelement.condition.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.condition, "condition", `${"unnamed"}`);
            hasFatalError = true;
        }
        if (!!modelelement.toPage && modelelement.toPage.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.toPage, "toPage", `${"unnamed"}`);
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
    public execBeforeGradeScore(modelelement: GradeScore): boolean {
        let hasFatalError: boolean = false;
        if (!!modelelement.grade && modelelement.grade.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.grade, "grade", `${"unnamed"}`);
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
    public execBeforeQuestionReference(modelelement: QuestionReference): boolean {
        let hasFatalError: boolean = false;
        if (!!modelelement.question && modelelement.question.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.question, "question", `${"unnamed"}`);
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
    public execBeforeStep(modelelement: Step): boolean {
        let hasFatalError: boolean = false;
        if (!!modelelement.fromPage && modelelement.fromPage.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.fromPage, "fromPage", `${"unnamed"}`);
            hasFatalError = true;
        }
        if (!!modelelement.expectedPage && modelelement.expectedPage.referred === null) {
            this.makeErrorMessage(modelelement, modelelement.expectedPage, "expectedPage", `${"unnamed"}`);
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
