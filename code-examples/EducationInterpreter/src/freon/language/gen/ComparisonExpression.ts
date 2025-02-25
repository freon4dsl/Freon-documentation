// Generated by the Freon Language Generator.
import { FreBinaryExpression, FreParseLocation } from "@freon4dsl/core";
import { BinaryExpression, ScoreExpression } from "./internal.js";

/**
 * Class ComparisonExpression is the implementation of the binary expression concept with the same name in the language definition file.
 * It uses mobx decorators to enable parts of the language environment, e.g. the editor, to react
 * to any changes in the state of its properties.
 */
export abstract class ComparisonExpression extends BinaryExpression implements FreBinaryExpression {
    readonly $typename: string = "ComparisonExpression"; // holds the metatype in the form of a string

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
        return true;
    }

    /**
     * Returns true if this instance is a binary expression concept.
     */
    freIsBinaryExpression(): boolean {
        return true;
    }
    /**
     * A convenience method that copies this instance into a new object.
     */
    copy(): ComparisonExpression {
        console.log("ComparisonExpression: copy method should be implemented by concrete subclass");
        return null;
    }

    /**
     * Returns the priority of this expression instance.
     * Used to balance the expression tree.
     */
    frePriority(): number {
        return -1;
    }

    /**
     * Returns the left element of this binary expression.
     */
    public freLeft(): ScoreExpression {
        return this.left;
    }

    /**
     * Returns the right element of this binary expression.
     */
    public freRight(): ScoreExpression {
        return this.right;
    }

    /**
     * Sets the left element of this binary expression.
     */
    public freSetLeft(value: ScoreExpression): void {
        this.left = value;
    }

    /**
     * Sets the right element of this binary expression.
     */
    public freSetRight(value: ScoreExpression): void {
        this.right = value;
    }
}
