// Generated by the Freon Language Generator.
import {
    MobxModelElementImpl,
    observableprim,
    observablepartlist,
    FreModelUnit,
    FreParseLocation,
    FreUtils,
    matchElementList,
} from "@freon4dsl/core";
import { Function, Expression } from "./internal.js";

import { makeObservable, action } from "mobx";

/**
 * Class ExpressionUnit is the implementation of the model unit with the same name in the language definition file.
 * It uses mobx decorators to enable parts of the language environment, e.g. the editor, to react
 * to any changes in the state of its properties.
 */
export class ExpressionUnit extends MobxModelElementImpl implements FreModelUnit {
    /**
     * A convenience method that creates an instance of this class
     * based on the properties defined in 'data'.
     * @param data partial object
     */
    static create(data: Partial<ExpressionUnit>): ExpressionUnit {
        const result = new ExpressionUnit(data.$id);
        if (!!data.name) {
            result.name = data.name;
        }
        if (!!data.functions) {
            data.functions.forEach((x) => result.functions.push(x));
        }
        if (!!data.expressions) {
            data.expressions.forEach((x) => result.expressions.push(x));
        }
        if (!!data.parseLocation) {
            result.parseLocation = data.parseLocation;
        }
        return result;
    }

    fileExtension: string = "";
    readonly $typename: string = "ExpressionUnit"; // holds the metatype in the form of a string
    $id: string = ""; // a unique identifier
    parseLocation: FreParseLocation; // if relevant, the location of this element within the source from which it is parsed
    name: string; // implementation of name
    functions: Function[]; // implementation of part 'functions'
    expressions: Expression[]; // implementation of part 'expressions'

    constructor(id?: string) {
        super();
        if (!!id) {
            this.$id = id;
        } else {
            this.$id = FreUtils.ID(); // uuid.v4();
        }
        // Both 'observableprim' and 'observableprimlist' change the get and set of the attribute
        // such that the part is observable. In lists no 'null' or 'undefined' values are allowed.
        observableprim(this, "name");
        this.name = "";

        // Both 'observablepart' and 'observablepartlist' change the get and set of the attribute
        // such that the parent-part relationship is consistently maintained,
        // and make sure the part is observable. In lists no 'null' or 'undefined' values are allowed.
        observablepartlist(this, "functions");
        observablepartlist(this, "expressions");

        // Make copy method a mobx action
        makeObservable(this, {
            copy: action,
        });
    }

    /**
     * Returns the metatype of this instance in the form of a string.
     */
    freLanguageConcept(): string {
        return this.$typename;
    }

    /**
     * Returns the unique identifier of this instance.
     */
    freId(): string {
        return this.$id;
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
        return true;
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
    copy(): ExpressionUnit {
        const result = new ExpressionUnit();
        if (!!this.name) {
            result.name = this.name;
        }
        if (!!this.functions) {
            this.functions.forEach((x) => result.functions.push(x.copy()));
        }
        if (!!this.expressions) {
            this.expressions.forEach((x) => result.expressions.push(x.copy()));
        }
        return result;
    }
    /**
     * Matches a partial instance of this class to this object
     * based on the properties defined in the partial.
     * @param toBeMatched
     */
    public match(toBeMatched: Partial<ExpressionUnit>): boolean {
        let result: boolean = true;
        if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
            result = result && this.name === toBeMatched.name;
        }
        if (result && !!toBeMatched.functions) {
            result = result && matchElementList(this.functions, toBeMatched.functions);
        }
        if (result && !!toBeMatched.expressions) {
            result = result && matchElementList(this.expressions, toBeMatched.expressions);
        }
        return result;
    }
}
