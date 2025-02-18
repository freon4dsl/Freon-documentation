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

import { makeObservable, action } from "mobx";

/**
 * Class Entity is the implementation of the concept with the same name in the language definition file.
 * It uses mobx decorators to enable parts of the language environment, e.g. the editor, to react
 * to the changes in the state of its properties.
 */
export class Entity extends MobxModelElementImpl implements FreNamedNode {
    /**
     * A convenience method that creates an instance of this class
     * based on the properties defined in 'data'.
     * @param data partial object
     */
    static create(data: Partial<Entity>): Entity {
        const result = new Entity(data.$id);
        if (!!data.isCompany) {
            result.isCompany = data.isCompany;
        }
        if (!!data.name) {
            result.name = data.name;
        }
        if (!!data.baseEntity) {
            result.baseEntity = data.baseEntity;
        }
        if (!!data.parseLocation) {
            result.parseLocation = data.parseLocation;
        }
        return result;
    }

    readonly $typename: string = "Entity"; // holds the metatype in the form of a string
    $id: string = ""; // a unique identifier
    parseLocation: FreParseLocation; // if relevant, the location of this element within the source from which it is parsed
    isCompany: boolean; // implementation of isCompany
    name: string; // implementation of name

    baseEntity: FreNodeReference<Entity>; // implementation of reference 'baseEntity'

    constructor(id?: string) {
        super();
        if (!!id) {
            this.$id = id;
        } else {
            this.$id = FreUtils.ID(); // uuid.v4();
        }
        // Both 'observableprim' and 'observableprimlist' change the get and set of the attribute
        // such that the part is observable. In lists no 'null' or 'undefined' values are allowed.
        observableprim(this, "isCompany");
        this.isCompany = false;
        observableprim(this, "name");
        this.name = "";

        // Both 'observablepart' and 'observablepartlist' change the get and set of the attribute
        // such that the parent-part relationship is consistently maintained,
        // and make sure the part is observable. In lists no 'null' or 'undefined' values are allowed.
        observablepart(this, "baseEntity");

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
    copy(): Entity {
        const result = new Entity();
        if (!!this.isCompany) {
            result.isCompany = this.isCompany;
        }
        if (!!this.name) {
            result.name = this.name;
        }
        if (!!this.baseEntity) {
            result.baseEntity = this.baseEntity.copy();
        }
        return result;
    }
    /**
     * Matches a partial instance of this class to this object
     * based on the properties defined in the partial.
     * @param toBeMatched
     */
    public match(toBeMatched: Partial<Entity>): boolean {
        let result: boolean = true;
        if (result && toBeMatched.isCompany !== null && toBeMatched.isCompany !== undefined) {
            result = result && this.isCompany === toBeMatched.isCompany;
        }
        if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
            result = result && this.name === toBeMatched.name;
        }
        if (result && !!toBeMatched.baseEntity) {
            result = result && this.baseEntity.match(toBeMatched.baseEntity);
        }
        return result;
    }

    /**
     * Convenience method for reference 'baseEntity'.
     * Instead of returning a 'FreNodeReference<Entity>' object,
     * it returns the referred 'Entity' object, if it can be found.
     */
    get $baseEntity(): Entity {
        if (!!this.baseEntity) {
            return this.baseEntity.referred;
        }
        return null;
    }
}
