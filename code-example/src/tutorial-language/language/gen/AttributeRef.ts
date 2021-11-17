// Generated by the ProjectIt Language Generator.
import { model, observablepart, PiElement, PiUtils } from "@projectit/core";
import { AppliedFeature, AttributeWithEntityType, EntityMetaType, PiElementReference } from "./internal";

/**
 * Class AttributeRef is the implementation of the concept with the same name in the language definition file.
 * It uses mobx decorators to enable parts of the language environment, e.g. the editor, to react
 * to changes in the state of its properties.
 */
@model
export class AttributeRef extends AppliedFeature implements PiElement {
    /**
     * A convenience method that creates an instance of this class
     * based on the properties defined in 'data'.
     * @param data
     */
    static create(data: Partial<AttributeRef>): AttributeRef {
        const result = new AttributeRef();
        if (!!data.appliedfeature) {
            result.appliedfeature = data.appliedfeature;
        }
        if (!!data.attribute) {
            result.attribute = data.attribute;
        }
        return result;
    }

    readonly $typename: EntityMetaType = "AttributeRef"; // holds the metatype in the form of a string

    attribute: PiElementReference<AttributeWithEntityType>; // implementation of reference 'attribute'

    constructor(id?: string) {
        super(id);
        // both 'observablepart' and 'observablelistpart' change the get and set of an attribute
        // such that the parent-part relationship is consistently maintained,
        // and make sure the part is observable
        observablepart(this, "attribute");
    }

    /**
     * Returns the metatype of this instance in the form of a string.
     */
    piLanguageConcept(): EntityMetaType {
        return this.$typename;
    }

    /**
     * Returns true if this instance is a model concept.
     */
    piIsModel(): boolean {
        return false;
    }

    /**
     * Returns true if this instance is a model unit.
     */
    piIsUnit(): boolean {
        return false;
    }

    /**
     * Returns true if this instance is an expression concept.
     */
    piIsExpression(): boolean {
        return false;
    }

    /**
     * Returns true if this instance is a binary expression concept.
     */
    piIsBinaryExpression(): boolean {
        return false;
    }
}
