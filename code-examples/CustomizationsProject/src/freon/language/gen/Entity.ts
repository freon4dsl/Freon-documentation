// Generated by the Freon Language Generator.
import {
    MobxModelElementImpl,
    observableprim,
    observablepart,
    observablepartlist,
    FreNamedNode,
    FreParseLocation,
    FreNodeReference,
    FreUtils,
    matchElementList,
} from "@freon4dsl/core";
import { Type, AttributeWithLimitedType, AttributeWithEntityType, EntityFunction } from "./internal.js";

import { makeObservable, action } from "mobx";

/**
 * Class Entity is the implementation of the concept with the same name in the language definition file.
 * It uses mobx decorators to enable parts of the language environment, e.g. the editor, to react
 * to the changes in the state of its properties.
 */
export class Entity extends MobxModelElementImpl implements FreNamedNode, Type {
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
        if (!!data.baseInterface_attr) {
            result.baseInterface_attr = data.baseInterface_attr;
        }
        if (!!data.simpleprop) {
            result.simpleprop = data.simpleprop;
        }
        if (!!data.attributes) {
            data.attributes.forEach((x) => result.attributes.push(x));
        }
        if (!!data.entAttributes) {
            data.entAttributes.forEach((x) => result.entAttributes.push(x));
        }
        if (!!data.functions) {
            data.functions.forEach((x) => result.functions.push(x));
        }
        if (!!data.int_attrs) {
            data.int_attrs.forEach((x) => result.int_attrs.push(x));
        }
        if (!!data.int_functions) {
            data.int_functions.forEach((x) => result.int_functions.push(x));
        }
        if (!!data.baseEntity) {
            result.baseEntity = data.baseEntity;
        }
        if (!!data.baseInterface) {
            result.baseInterface = data.baseInterface;
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
    baseInterface_attr: number; // implementation of baseInterface_attr
    simpleprop: string; // implementation of simpleprop
    attributes: AttributeWithLimitedType[]; // implementation of part 'attributes'
    entAttributes: AttributeWithEntityType[]; // implementation of part 'entAttributes'
    functions: EntityFunction[]; // implementation of part 'functions'
    int_attrs: AttributeWithLimitedType[]; // implementation of part 'int_attrs'
    int_functions: EntityFunction[]; // implementation of part 'int_functions'
    baseEntity: FreNodeReference<Entity>; // implementation of reference 'baseEntity'
    baseInterface: FreNodeReference<Entity>; // implementation of reference 'baseInterface'

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
        observableprim(this, "baseInterface_attr");
        this.baseInterface_attr = 0;
        observableprim(this, "simpleprop");
        this.simpleprop = "";

        // Both 'observablepart' and 'observablepartlist' change the get and set of the attribute
        // such that the parent-part relationship is consistently maintained,
        // and make sure the part is observable. In lists no 'null' or 'undefined' values are allowed.
        observablepartlist(this, "attributes");
        observablepartlist(this, "entAttributes");
        observablepartlist(this, "functions");
        observablepartlist(this, "int_attrs");
        observablepartlist(this, "int_functions");
        observablepart(this, "baseEntity");

        observablepart(this, "baseInterface");

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
        if (!!this.baseInterface_attr) {
            result.baseInterface_attr = this.baseInterface_attr;
        }
        if (!!this.simpleprop) {
            result.simpleprop = this.simpleprop;
        }
        if (!!this.attributes) {
            this.attributes.forEach((x) => result.attributes.push(x.copy()));
        }
        if (!!this.entAttributes) {
            this.entAttributes.forEach((x) => result.entAttributes.push(x.copy()));
        }
        if (!!this.functions) {
            this.functions.forEach((x) => result.functions.push(x.copy()));
        }
        if (!!this.int_attrs) {
            this.int_attrs.forEach((x) => result.int_attrs.push(x.copy()));
        }
        if (!!this.int_functions) {
            this.int_functions.forEach((x) => result.int_functions.push(x.copy()));
        }
        if (!!this.baseEntity) {
            result.baseEntity = this.baseEntity.copy();
        }
        if (!!this.baseInterface) {
            result.baseInterface = this.baseInterface.copy();
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
        if (result && toBeMatched.baseInterface_attr !== null && toBeMatched.baseInterface_attr !== undefined) {
            result = result && this.baseInterface_attr === toBeMatched.baseInterface_attr;
        }
        if (result && toBeMatched.simpleprop !== null && toBeMatched.simpleprop !== undefined && toBeMatched.simpleprop.length > 0) {
            result = result && this.simpleprop === toBeMatched.simpleprop;
        }
        if (result && !!toBeMatched.attributes) {
            result = result && matchElementList(this.attributes, toBeMatched.attributes);
        }
        if (result && !!toBeMatched.entAttributes) {
            result = result && matchElementList(this.entAttributes, toBeMatched.entAttributes);
        }
        if (result && !!toBeMatched.functions) {
            result = result && matchElementList(this.functions, toBeMatched.functions);
        }
        if (result && !!toBeMatched.int_attrs) {
            result = result && matchElementList(this.int_attrs, toBeMatched.int_attrs);
        }
        if (result && !!toBeMatched.int_functions) {
            result = result && matchElementList(this.int_functions, toBeMatched.int_functions);
        }
        if (result && !!toBeMatched.baseEntity) {
            result = result && this.baseEntity.match(toBeMatched.baseEntity);
        }
        if (result && !!toBeMatched.baseInterface) {
            result = result && this.baseInterface.match(toBeMatched.baseInterface);
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
