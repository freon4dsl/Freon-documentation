// Generated by the ProjectIt Language Generator.
import { model, observablepart, PiBinaryExpression, PiUtils } from "@projectit/core";
import { EntityExpression, EntityMetaType } from "./internal";

/**
 * Class BinaryExpression is the implementation of the binary expression concept with the same name in the language definition file.
 * It uses mobx decorators to enable parts of the language environment, e.g. the editor, to react
 * to changes in the state of its properties.
 */
@model
export abstract class BinaryExpression extends EntityExpression implements PiBinaryExpression {
    readonly $typename: EntityMetaType = "BinaryExpression"; // holds the metatype in the form of a string

    left: EntityExpression; // implementation of part 'left'
    right: EntityExpression; // implementation of part 'right'

    constructor(id?: string) {
        super(id);
        // both 'observablepart' and 'observablelistpart' change the get and set of an attribute
        // such that the parent-part relationship is consistently maintained,
        // and make sure the part is observable
        observablepart(this, "left");
        observablepart(this, "right");
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
        return -1;
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
