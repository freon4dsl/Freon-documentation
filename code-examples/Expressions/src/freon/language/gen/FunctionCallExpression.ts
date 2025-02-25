// Generated by the Freon Language Generator.
import {
    observablepart,
    observablepartlist,
    FreExpressionNode,
    FreParseLocation,
    FreNodeReference,
    matchElementList,
} from "@freon4dsl/core";
import { Expression, Function } from "./internal.js";

/**
 * Class FunctionCallExpression is the implementation of the concept with the same name in the language definition file.
 * It uses mobx decorators to enable parts of the language environment, e.g. the editor, to react
 * to the changes in the state of its properties.
 */
export class FunctionCallExpression extends Expression implements FreExpressionNode {
    /**
     * A convenience method that creates an instance of this class
     * based on the properties defined in 'data'.
     * @param data partial object
     */
    static create(data: Partial<FunctionCallExpression>): FunctionCallExpression {
        const result = new FunctionCallExpression(data.$id);
        if (!!data.arguments) {
            data.arguments.forEach((x) => result.arguments.push(x));
        }
        if (!!data.calledFunction) {
            result.calledFunction = data.calledFunction;
        }
        if (!!data.parseLocation) {
            result.parseLocation = data.parseLocation;
        }
        return result;
    }

    readonly $typename: string = "FunctionCallExpression"; // holds the metatype in the form of a string

    parseLocation: FreParseLocation; // if relevant, the location of this element within the source from which it is parsed

    arguments: Expression[]; // implementation of part 'arguments'
    calledFunction: FreNodeReference<Function>; // implementation of reference 'calledFunction'

    constructor(id?: string) {
        super(id);

        // Both 'observablepart' and 'observablepartlist' change the get and set of the attribute
        // such that the parent-part relationship is consistently maintained,
        // and make sure the part is observable. In lists no 'null' or 'undefined' values are allowed.
        observablepartlist(this, "arguments");
        observablepart(this, "calledFunction");
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
    copy(): FunctionCallExpression {
        const result = new FunctionCallExpression();
        if (!!this.arguments) {
            this.arguments.forEach((x) => result.arguments.push(x.copy()));
        }
        if (!!this.calledFunction) {
            result.calledFunction = this.calledFunction.copy();
        }
        return result;
    }
    /**
     * Matches a partial instance of this class to this object
     * based on the properties defined in the partial.
     * @param toBeMatched
     */
    public match(toBeMatched: Partial<FunctionCallExpression>): boolean {
        let result: boolean = super.match(toBeMatched);
        if (result && !!toBeMatched.arguments) {
            result = result && matchElementList(this.arguments, toBeMatched.arguments);
        }
        if (result && !!toBeMatched.calledFunction) {
            result = result && this.calledFunction.match(toBeMatched.calledFunction);
        }
        return result;
    }

    /**
     * Convenience method for reference 'calledFunction'.
     * Instead of returning a 'FreNodeReference<Function>' object,
     * it returns the referred 'Function' object, if it can be found.
     */
    get $calledFunction(): Function {
        if (!!this.calledFunction) {
            return this.calledFunction.referred;
        }
        return null;
    }
}
