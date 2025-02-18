// Generated by the Freon Language Generator.
import { observablepart, FreBinaryExpression, FreParseLocation } from "@freon4dsl/core";
import { DocuExpression } from "./internal.js";

/**
 * Class BinaryExpression is the implementation of the binary expression concept with the same name in the language definition file.
 * It uses mobx decorators to enable parts of the language environment, e.g. the editor, to react
 * to any changes in the state of its properties.
 */
export abstract class BinaryExpression extends DocuExpression implements FreBinaryExpression {
    readonly $typename: string = "BinaryExpression"; // holds the metatype in the form of a string

    parseLocation: FreParseLocation; // if relevant, the location of this element within the source from which it is parsed

    left: DocuExpression; // implementation of part 'left'
    right: DocuExpression; // implementation of part 'right'

    constructor(id?: string) {
        super(id);

        // Both 'observablepart' and 'observablepartlist' change the get and set of the attribute
        // such that the parent-part relationship is consistently maintained,
        // and make sure the part is observable. In lists no 'null' or 'undefined' values are allowed.
        observablepart(this, "left");

        observablepart(this, "right");
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
    copy(): BinaryExpression {
        console.log("BinaryExpression: copy method should be implemented by concrete subclass");
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
    public freLeft(): DocuExpression {
        return this.left;
    }

    /**
     * Returns the right element of this binary expression.
     */
    public freRight(): DocuExpression {
        return this.right;
    }

    /**
     * Sets the left element of this binary expression.
     */
    public freSetLeft(value: DocuExpression): void {
        this.left = value;
    }

    /**
     * Sets the right element of this binary expression.
     */
    public freSetRight(value: DocuExpression): void {
        this.right = value;
    }
}
