// Generated by the Freon Language Generator.
import {
    observablepart,
    FreExpressionNode,
    FreUtils,
    FreParseLocation,
    matchElementList,
    matchPrimitiveList,
    matchReferenceList,
    FreNodeReference
} from "@freon4dsl/core";
import { EntityExpression, Variable, EntityMetaType } from "./internal";

/**
 * Class VariableRef is the implementation of the concept with the same name in the language definition file.
 * It uses mobx decorators to enable parts of the language environment, e.g. the editor, to react
 * to changes in the state of its properties.
 */
export class VariableRef extends EntityExpression implements FreExpressionNode {
    /**
     * A convenience method that creates an instance of this class
     * based on the properties defined in 'data'.
     * @param data
     */
    static create(data: Partial<VariableRef>): VariableRef {
        const result = new VariableRef();
        if (!!data.appliedfeature) {
            result.appliedfeature = data.appliedfeature;
        }
        if (!!data.variable) {
            result.variable = data.variable;
        }
        if (!!data.parse_location) {
            result.parse_location = data.parse_location;
        }
        return result;
    }

    readonly $typename: EntityMetaType = "VariableRef"; // holds the metatype in the form of a string

    parse_location: FreParseLocation; // if relevant, the location of this element within the source from which it is parsed

    variable: FreNodeReference<Variable>; // implementation of reference 'variable'

    constructor(id?: string) {
        super(id);

        // Both 'observablepart' and 'observablepartlist' change the get and set of the attribute
        // such that the parent-part relationship is consistently maintained,
        // and make sure the part is observable. In lists no 'null' or 'undefined' values are allowed.
        observablepart(this, "variable");
    }

    /**
     * Returns the metatype of this instance in the form of a string.
     */
    freLanguageConcept(): EntityMetaType {
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
    copy(): VariableRef {
        const result = new VariableRef();
        if (!!this.appliedfeature) {
            result.appliedfeature = this.appliedfeature.copy();
        }
        if (!!this.variable) {
            result.variable = this.variable.copy();
        }
        return result;
    }
    /**
     * Matches a partial instance of this class to this object
     * based on the properties defined in the partial.
     * @param toBeMatched
     */
    public match(toBeMatched: Partial<VariableRef>): boolean {
        let result: boolean = super.match(toBeMatched);
        if (result && !!toBeMatched.variable) {
            result = result && this.variable.match(toBeMatched.variable);
        }
        return result;
    }

    /**
     * Convenience method for reference 'variable'.
     * Instead of returning a 'FreNodeReference<Variable>' object,
     * it returns the referred 'Variable' object, if it can be found.
     */
    get $variable(): Variable {
        if (!!this.variable) {
            return this.variable.referred;
        }
        return null;
    }
}
