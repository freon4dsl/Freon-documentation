// Generated by the Freon Language Generator.
import { FreNode, FreParseLocation } from "@freon4dsl/core";
import { Step } from "./internal.js";

/**
 * Class LastStep is the implementation of the concept with the same name in the language definition file.
 * It uses mobx decorators to enable parts of the language environment, e.g. the editor, to react
 * to the changes in the state of its properties.
 */
export class LastStep extends Step implements FreNode {
    /**
     * A convenience method that creates an instance of this class
     * based on the properties defined in 'data'.
     * @param data partial object
     */
    static create(data: Partial<LastStep>): LastStep {
        const result = new LastStep(data.$id);
        if (!!data.answerSeries) {
            data.answerSeries.forEach((x) => result.answerSeries.push(x));
        }
        if (!!data.fromPage) {
            result.fromPage = data.fromPage;
        }
        if (!!data.parseLocation) {
            result.parseLocation = data.parseLocation;
        }
        return result;
    }

    readonly $typename: string = "LastStep"; // holds the metatype in the form of a string

    parseLocation: FreParseLocation; // if relevant, the location of this element within the source from which it is parsed

    constructor(id?: string) {
        super(id);
    }

    /**
     * Returns the metatype of this instance in the form of a string.
     */
    freLanguageConcept(): string {
        return this.$typename;
    }

    /**
     * Returns true if this instance is a model concept.
     */
    freIsModel(): boolean {
        return false;
    }

    /**
     * Returns true if this instance is a model unit.
     */
    freIsUnit(): boolean {
        return false;
    }

    /**
     * Returns true if this instance is an expression concept.
     */
    freIsExpression(): boolean {
        return false;
    }

    /**
     * Returns true if this instance is a binary expression concept.
     */
    freIsBinaryExpression(): boolean {
        return false;
    }
    /**
     * A convenience method that copies this instance into a new object.
     */
    copy(): LastStep {
        const result = new LastStep();
        if (!!this.answerSeries) {
            this.answerSeries.forEach((x) => result.answerSeries.push(x.copy()));
        }
        if (!!this.fromPage) {
            result.fromPage = this.fromPage.copy();
        }
        return result;
    }
    /**
     * Matches a partial instance of this class to this object
     * based on the properties defined in the partial.
     * @param toBeMatched
     */
    public match(toBeMatched: Partial<LastStep>): boolean {
        let result: boolean = super.match(toBeMatched);

        return result;
    }
}
