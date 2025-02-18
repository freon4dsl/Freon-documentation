// Generated by the Freon Language Generator.
import { MobxModelElementImpl, observableprim, observablepart, FreModelUnit, FreParseLocation, FreUtils } from "@freon4dsl/core";
import { Entity } from "./internal.js";

import { makeObservable, action } from "mobx";

/**
 * Class SomeOtherModelUnit is the implementation of the model unit with the same name in the language definition file.
 * It uses mobx decorators to enable parts of the language environment, e.g. the editor, to react
 * to any changes in the state of its properties.
 */
export class SomeOtherModelUnit extends MobxModelElementImpl implements FreModelUnit {
    /**
     * A convenience method that creates an instance of this class
     * based on the properties defined in 'data'.
     * @param data partial object
     */
    static create(data: Partial<SomeOtherModelUnit>): SomeOtherModelUnit {
        const result = new SomeOtherModelUnit(data.$id);
        if (!!data.name) {
            result.name = data.name;
        }
        if (!!data.somePart) {
            result.somePart = data.somePart;
        } else {
            result.somePart = Entity.create({});
        }
        if (!!data.parseLocation) {
            result.parseLocation = data.parseLocation;
        }
        return result;
    }

    fileExtension: string = "";
    readonly $typename: string = "SomeOtherModelUnit"; // holds the metatype in the form of a string
    $id: string = ""; // a unique identifier
    parseLocation: FreParseLocation; // if relevant, the location of this element within the source from which it is parsed
    name: string; // implementation of name
    somePart: Entity; // implementation of part 'somePart'

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
        observablepart(this, "somePart");

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
    copy(): SomeOtherModelUnit {
        const result = new SomeOtherModelUnit();
        if (!!this.name) {
            result.name = this.name;
        }
        if (!!this.somePart) {
            result.somePart = this.somePart.copy();
        }
        return result;
    }
    /**
     * Matches a partial instance of this class to this object
     * based on the properties defined in the partial.
     * @param toBeMatched
     */
    public match(toBeMatched: Partial<SomeOtherModelUnit>): boolean {
        let result: boolean = true;
        if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
            result = result && this.name === toBeMatched.name;
        }
        if (result && !!toBeMatched.somePart) {
            result = result && this.somePart.match(toBeMatched.somePart);
        }
        return result;
    }
}
