// Generated by the Freon Language Generator.
import { observableprim, FreExpressionNode, FreParseLocation } from "@freon4dsl/core";
import { Literal } from "./internal.js";

/**
 * Class BooleanLiteral is the implementation of the concept with the same name in the language definition file.
 * It uses mobx decorators to enable parts of the language environment, e.g. the editor, to react
 * to the changes in the state of its properties.
 */
export class BooleanLiteral extends Literal implements FreExpressionNode {
    /**
     * A convenience method that creates an instance of this class
     * based on the properties defined in 'data'.
     * @param data partial object
     */
    static create(data: Partial<BooleanLiteral>): BooleanLiteral {
        const result = new BooleanLiteral(data.$id);
        if (!!data.value) {
            result.value = data.value;
        }
        if (!!data.parseLocation) {
            result.parseLocation = data.parseLocation;
        }
        return result;
    }

    readonly $typename: string = "BooleanLiteral"; // holds the metatype in the form of a string

    parseLocation: FreParseLocation; // if relevant, the location of this element within the source from which it is parsed
    value: boolean; // implementation of value

    constructor(id?: string) {
        super(id);
        // Both 'observableprim' and 'observableprimlist' change the get and set of the attribute
        // such that the part is observable. In lists no 'null' or 'undefined' values are allowed.
        observableprim(this, "value");
        this.value = false;
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
        return true;
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
    copy(): BooleanLiteral {
        const result = new BooleanLiteral();
        if (!!this.value) {
            result.value = this.value;
        }
        return result;
    }
    /**
     * Matches a partial instance of this class to this object
     * based on the properties defined in the partial.
     * @param toBeMatched
     */
    public match(toBeMatched: Partial<BooleanLiteral>): boolean {
        let result: boolean = super.match(toBeMatched);
        if (result && toBeMatched.value !== null && toBeMatched.value !== undefined) {
            result = result && this.value === toBeMatched.value;
        }
        return result;
    }
}
