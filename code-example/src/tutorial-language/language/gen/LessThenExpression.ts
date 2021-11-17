// Generated by the ProjectIt Language Generator.
import { model, PiBinaryExpression, PiUtils } from "@projectit/core";
import { ComparisonExpression, EntityMetaType, EntityExpression } from "./internal";

/**
 * Class LessThenExpression is the implementation of the binary expression concept with the same name in the language definition file.
 * It uses mobx decorators to enable parts of the language environment, e.g. the editor, to react
 * to changes in the state of its properties.
 */
@model
export class LessThenExpression extends ComparisonExpression implements PiBinaryExpression {
    /**
     * A convenience method that creates an instance of this class
     * based on the properties defined in 'data'.
     * @param data
     */
    static create(data: Partial<LessThenExpression>): LessThenExpression {
        const result = new LessThenExpression();
        if (!!data.left) {
            result.left = data.left;
        }
        if (!!data.right) {
            result.right = data.right;
        }
        if (!!data.appliedfeature) {
            result.appliedfeature = data.appliedfeature;
        }
        return result;
    }

    readonly $typename: EntityMetaType = "LessThenExpression"; // holds the metatype in the form of a string

    constructor(id?: string) {
        super(id);
    }

    /**
     * Returns the metatype of this instance in the form of a string.
     */
    piLanguageConcept(): EntityMetaType {
        return this.$typename;
    }

    /**
     * Returns true if this instance is a model concept.
     */
    piIsModel(): boolean {
        return false;
    }

    /**
     * Returns true if this instance is a model unit.
     */
    piIsUnit(): boolean {
        return false;
    }

    /**
     * Returns true if this instance is an expression concept.
     */
    piIsExpression(): boolean {
        return true;
    }

    /**
     * Returns true if this instance is a binary expression concept.
     */
    piIsBinaryExpression(): boolean {
        return true;
    }

    /**
     * Returns the priority of this expression instance.
     * Used to balance the expression tree.
     */
    piPriority(): number {
        return 10;
    }

    /**
     * Returns the left element of this binary expression.
     */
    public piLeft(): EntityExpression {
        return this.left;
    }

    /**
     * Returns the right element of this binary expression.
     */
    public piRight(): EntityExpression {
        return this.right;
    }

    /**
     * Sets the left element of this binary expression.
     */
    public piSetLeft(value: EntityExpression): void {
        this.left = value;
    }

    /**
     * Sets the right element of this binary expression.
     */
    public piSetRight(value: EntityExpression): void {
        this.right = value;
    }
}
