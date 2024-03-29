// Generated by the Freon Language Generator.
import { observable } from "mobx";
import {
    MobxModelElementImpl,
    observableprim,
    observablepart,
    FreNamedNode,
    FreUtils,
    FreParseLocation,
    matchElementList,
    matchPrimitiveList,
    matchReferenceList,
    FreNodeReference
} from "@freon4dsl/core";
import { AttributeType, EntityMetaType } from "./internal";

/**
 * Class AttributeWithLimitedType is the implementation of the concept with the same name in the language definition file.
 * It uses mobx decorators to enable parts of the language environment, e.g. the editor, to react
 * to changes in the state of its properties.
 */
export class AttributeWithLimitedType extends MobxModelElementImpl implements FreNamedNode {
    /**
     * A convenience method that creates an instance of this class
     * based on the properties defined in 'data'.
     * @param data
     */
    static create(data: Partial<AttributeWithLimitedType>): AttributeWithLimitedType {
        const result = new AttributeWithLimitedType();
        if (!!data.name) {
            result.name = data.name;
        }
        if (!!data.declaredType) {
            result.declaredType = data.declaredType;
        }
        if (!!data.parse_location) {
            result.parse_location = data.parse_location;
        }
        return result;
    }

    readonly $typename: EntityMetaType = "AttributeWithLimitedType"; // holds the metatype in the form of a string
    $id: string; // a unique identifier
    parse_location: FreParseLocation; // if relevant, the location of this element within the source from which it is parsed
    name: string; // implementation of name

    declaredType: FreNodeReference<AttributeType>; // implementation of reference 'declaredType'

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
    }

    /**
     * Returns the metatype of this instance in the form of a string.
     */
    freLanguageConcept(): EntityMetaType {
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
    copy(): AttributeWithLimitedType {
        const result = new AttributeWithLimitedType();
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
    public match(toBeMatched: Partial<AttributeWithLimitedType>): boolean {
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
     * Instead of returning a 'FreNodeReference<AttributeType>' object,
     * it returns the referred 'AttributeType' object, if it can be found.
     */
    get $declaredType(): AttributeType {
        if (!!this.declaredType) {
            return this.declaredType.referred;
        }
        return null;
    }
}
