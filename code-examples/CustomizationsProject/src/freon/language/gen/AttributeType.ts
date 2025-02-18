// Generated by the Freon Language Generator.
import { MobxModelElementImpl, observableprim, FreNamedNode, FreParseLocation, FreUtils } from "@freon4dsl/core";
import { BaseType } from "./internal.js";

import { runInAction, makeObservable, action } from "mobx";
/**
 * Class AttributeType is the implementation of the limited concept with the same name in the language definition file.
 * It uses mobx decorators to enable parts of the language environment, e.g. the editor, to react
 * to any changes in the state of its properties.
 */
export class AttributeType extends MobxModelElementImpl implements FreNamedNode, BaseType {
    /**
     * A convenience method that creates an instance of this class
     * based on the properties defined in 'data'.
     * @param data partial object
     */
    static create(data: Partial<AttributeType>): AttributeType {
        const result = new AttributeType(data.$id);
        if (!!data.name) {
            result.name = data.name;
        }
        if (!!data.extra) {
            result.extra = data.extra;
        }
        if (!!data.baseInterface_attr) {
            result.baseInterface_attr = data.baseInterface_attr;
        }
        if (!!data.parseLocation) {
            result.parseLocation = data.parseLocation;
        }
        return result;
    }

    static String: AttributeType; // implementation of instance String
    static Integer: AttributeType; // implementation of instance Integer
    static Boolean: AttributeType; // implementation of instance Boolean
    static ANY: AttributeType; // implementation of instance ANY
    static $freANY: AttributeType; // default predefined instance

    readonly $typename: string = "AttributeType"; // holds the metatype in the form of a string
    $id: string = ""; // a unique identifier
    parseLocation: FreParseLocation; // if relevant, the location of this element within the source from which it is parsed
    name: string; // implementation of name
    extra: number; // implementation of extra
    baseInterface_attr: number; // implementation of baseInterface_attr

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
        observableprim(this, "extra");
        this.extra = 0;
        observableprim(this, "baseInterface_attr");
        this.baseInterface_attr = 0;

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
    copy(): AttributeType {
        const result = new AttributeType();
        if (!!this.name) {
            result.name = this.name;
        }
        if (!!this.extra) {
            result.extra = this.extra;
        }
        if (!!this.baseInterface_attr) {
            result.baseInterface_attr = this.baseInterface_attr;
        }
        return result;
    }
    /**
     * Matches a partial instance of this class to this object
     * based on the properties defined in the partial.
     * @param toBeMatched
     */
    public match(toBeMatched: Partial<AttributeType>): boolean {
        let result: boolean = true;
        if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
            result = result && this.name === toBeMatched.name;
        }
        if (result && toBeMatched.extra !== null && toBeMatched.extra !== undefined) {
            result = result && this.extra === toBeMatched.extra;
        }
        if (result && toBeMatched.baseInterface_attr !== null && toBeMatched.baseInterface_attr !== undefined) {
            result = result && this.baseInterface_attr === toBeMatched.baseInterface_attr;
        }
        return result;
    }
}

// Because of mobx we need to generate the initialisations outside of the class,
// otherwise the state of properties with primitive type will not be kept correctly.
runInAction(() => {
    AttributeType.String = AttributeType.create({
        name: "String",
        extra: 199,
    });
    AttributeType.Integer = AttributeType.create({
        name: "Integer",
        extra: 240261,
    });
    AttributeType.Boolean = AttributeType.create({
        name: "Boolean",
        extra: 5479,
    });
    AttributeType.ANY = AttributeType.create({
        extra: 456,
        name: "ANY",
    });
});
