// Generated by the Freon Language Generator.
import {
    MobxModelElementImpl,
    observableprim,
    observablepart,
    FreNamedNode,
    FreParseLocation,
    FreNodeReference,
    FreUtils,
} from "@freon4dsl/core";
import { Type } from "./internal.js";

import { makeObservable, action } from "mobx";

/**
 * Class Parameter is the implementation of the concept with the same name in the language definition file.
 * It uses mobx decorators to enable parts of the language environment, e.g. the editor, to react
 * to the changes in the state of its properties.
 */
export class Parameter extends MobxModelElementImpl implements FreNamedNode {
    /**
     * A convenience method that creates an instance of this class
     * based on the properties defined in 'data'.
     * @param data partial object
     */
    static create(data: Partial<Parameter>): Parameter {
        const result = new Parameter(data.$id);
        if (!!data.name) {
            result.name = data.name;
        }
        if (!!data.declaredType) {
            result.declaredType = data.declaredType;
        }
        if (!!data.parseLocation) {
            result.parseLocation = data.parseLocation;
        }
        return result;
    }

    readonly $typename: string = "Parameter"; // holds the metatype in the form of a string
    $id: string = ""; // a unique identifier
    parseLocation: FreParseLocation; // if relevant, the location of this element within the source from which it is parsed
    name: string; // implementation of name

    declaredType: FreNodeReference<Type>; // implementation of reference 'declaredType'

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
        observablepart(this, "declaredType");

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
    copy(): Parameter {
        const result = new Parameter();
        if (!!this.name) {
            result.name = this.name;
        }
        if (!!this.declaredType) {
            result.declaredType = this.declaredType.copy();
        }
        return result;
    }
    /**
     * Matches a partial instance of this class to this object
     * based on the properties defined in the partial.
     * @param toBeMatched
     */
    public match(toBeMatched: Partial<Parameter>): boolean {
        let result: boolean = true;
        if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
            result = result && this.name === toBeMatched.name;
        }
        if (result && !!toBeMatched.declaredType) {
            result = result && this.declaredType.match(toBeMatched.declaredType);
        }
        return result;
    }

    /**
     * Convenience method for reference 'declaredType'.
     * Instead of returning a 'FreNodeReference<Type>' object,
     * it returns the referred 'Type' object, if it can be found.
     */
    get $declaredType(): Type {
        if (!!this.declaredType) {
            return this.declaredType.referred;
        }
        return null;
    }
}
