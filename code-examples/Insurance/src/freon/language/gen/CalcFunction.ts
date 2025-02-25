// Generated by the Freon Language Generator.
import {
    MobxModelElementImpl,
    observableprim,
    observablepart,
    observablepartlist,
    FreNamedNode,
    FreParseLocation,
    FreUtils,
    matchElementList,
} from "@freon4dsl/core";
import { Description, DocuType, DocuExpression, Parameter } from "./internal.js";

import { makeObservable, action } from "mobx";

/**
 * Class CalcFunction is the implementation of the concept with the same name in the language definition file.
 * It uses mobx decorators to enable parts of the language environment, e.g. the editor, to react
 * to the changes in the state of its properties.
 */
export class CalcFunction extends MobxModelElementImpl implements FreNamedNode {
    /**
     * A convenience method that creates an instance of this class
     * based on the properties defined in 'data'.
     * @param data partial object
     */
    static create(data: Partial<CalcFunction>): CalcFunction {
        const result = new CalcFunction(data.$id);
        if (!!data.name) {
            result.name = data.name;
        }
        if (!!data.description) {
            result.description = data.description;
        }
        if (!!data.declaredType) {
            result.declaredType = data.declaredType;
        }
        if (!!data.body) {
            result.body = data.body;
        }
        if (!!data.parameters) {
            data.parameters.forEach((x) => result.parameters.push(x));
        }
        if (!!data.parseLocation) {
            result.parseLocation = data.parseLocation;
        }
        return result;
    }

    readonly $typename: string = "CalcFunction"; // holds the metatype in the form of a string
    $id: string = ""; // a unique identifier
    parseLocation: FreParseLocation; // if relevant, the location of this element within the source from which it is parsed
    name: string; // implementation of name
    description: Description; // implementation of part 'description'
    declaredType: DocuType; // implementation of part 'declaredType'
    body: DocuExpression; // implementation of part 'body'
    parameters: Parameter[]; // implementation of part 'parameters'

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
        observablepart(this, "description");

        observablepart(this, "declaredType");

        observablepart(this, "body");

        observablepartlist(this, "parameters");

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
    copy(): CalcFunction {
        const result = new CalcFunction();
        if (!!this.name) {
            result.name = this.name;
        }
        if (!!this.description) {
            result.description = this.description.copy();
        }
        if (!!this.declaredType) {
            result.declaredType = this.declaredType.copy();
        }
        if (!!this.body) {
            result.body = this.body.copy();
        }
        if (!!this.parameters) {
            this.parameters.forEach((x) => result.parameters.push(x.copy()));
        }
        return result;
    }
    /**
     * Matches a partial instance of this class to this object
     * based on the properties defined in the partial.
     * @param toBeMatched
     */
    public match(toBeMatched: Partial<CalcFunction>): boolean {
        let result: boolean = true;
        if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
            result = result && this.name === toBeMatched.name;
        }
        if (result && !!toBeMatched.description) {
            result = result && this.description.match(toBeMatched.description);
        }
        if (result && !!toBeMatched.declaredType) {
            result = result && this.declaredType.match(toBeMatched.declaredType);
        }
        if (result && !!toBeMatched.body) {
            result = result && this.body.match(toBeMatched.body);
        }
        if (result && !!toBeMatched.parameters) {
            result = result && matchElementList(this.parameters, toBeMatched.parameters);
        }
        return result;
    }
}
