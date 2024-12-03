// Generated by the Freon Language Generator.
import {
    FreModelUnit,
    MobxModelElementImpl,
    observableprim,
    observablepart,
    observablepartlist,
    FreModel,
    FreLanguage,
    FreParseLocation,
    AST,
    FreUtils,
    matchElementList,
} from "@freon4dsl/core";
import { EntityModelUnit, SomeOtherModelUnit } from "./internal.js";

/**
 * Class EntityModel is the implementation of the model with the same name in the language definition file.
 * It uses mobx decorators to enable parts of the language environment, e.g. the editor, to react
 * to any changes in the state of its properties.
 */
export class EntityModel extends MobxModelElementImpl implements FreModel {
    /**
     * A convenience method that creates an instance of this class
     * based on the properties defined in 'data'.
     * @param data partial object
     */
    static create(data: Partial<EntityModel>): EntityModel {
        const result = new EntityModel(data.$id);
        if (!!data.name) {
            result.name = data.name;
        }
        if (!!data.units) {
            data.units.forEach((x) => result.units.push(x));
        }
        if (!!data.extraUnit) {
            result.extraUnit = data.extraUnit;
        }
        if (!!data.parseLocation) {
            result.parseLocation = data.parseLocation;
        }
        return result;
    }

    readonly $typename: string = "EntityModel"; // holds the metatype in the form of a string
    $id: string = ""; // a unique identifier
    parseLocation: FreParseLocation; // if relevant, the location of this element within the source from which it is parsed
    name: string; // implementation of name
    units: EntityModelUnit[]; // implementation of part 'units'
    extraUnit: SomeOtherModelUnit; // implementation of part 'extraUnit'

    constructor(id?: string) {
        super();
        if (!!id) {
            this.$id = id;
        } else {
            this.$id = FreUtils.ID(); // uuid.v4();
        }

        // Both 'observablepart' and 'observablepartlist' change the get and set of the attribute
        // such that the parent-part relationship is consistently maintained,
        // and make sure the part is observable. In lists no 'null' or 'undefined' values are allowed.
        observablepartlist(this, "units");
        observablepart(this, "extraUnit");
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
        return true;
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
    copy(): EntityModel {
        const result = new EntityModel();
        if (!!this.name) {
            result.name = this.name;
        }
        if (!!this.units) {
            this.units.forEach((x) => result.units.push(x.copy()));
        }
        if (!!this.extraUnit) {
            result.extraUnit = this.extraUnit.copy();
        }
        return result;
    }
    /**
     * Matches a partial instance of this class to this object
     * based on the properties defined in the partial.
     * @param toBeMatched
     */
    public match(toBeMatched: Partial<EntityModel>): boolean {
        let result: boolean = true;
        if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
            result = result && this.name === toBeMatched.name;
        }
        if (result && !!toBeMatched.units) {
            result = result && matchElementList(this.units, toBeMatched.units);
        }
        if (result && !!toBeMatched.extraUnit) {
            result = result && this.extraUnit.match(toBeMatched.extraUnit);
        }
        return result;
    }

    /**
     * A convenience method that finds a unit of this model based on its name and 'metatype'.
     * @param name
     * @param metatype
     */
    findUnit(name: string, metatype?: string): FreModelUnit {
        let result: FreModelUnit = null;
        const checkType = metatype !== undefined;
        result = this.getUnits().find(
            (mod) => mod.name === name && (checkType ? FreLanguage.getInstance().metaConformsToType(mod, metatype) : true),
        );
        if (!!result) {
            return result;
        }
        return null;
    }

    /**
     * Replaces a model unit by a new one. Used for swapping between complete units and unit public interfaces.
     * Returns false if the replacement could not be done, e.g. because 'oldUnit' is not a child of this object.
     * @param oldUnit
     * @param newUnit
     */
    replaceUnit(oldUnit: FreModelUnit, newUnit: FreModelUnit): boolean {
        if (oldUnit.freLanguageConcept() !== newUnit.freLanguageConcept()) {
            return false;
        }
        if (oldUnit.freOwnerDescriptor().owner !== this) {
            return false;
        }
        // we must store the interface in the same place as the old unit, which info is held in FreContainer()
        if (oldUnit.freLanguageConcept() === "EntityModelUnit" && oldUnit.freOwnerDescriptor().propertyName === "units") {
            AST.changeNamed("removeUnit", () => {
                const index = this.units.indexOf(oldUnit as EntityModelUnit);
                this.units.splice(index, 1, newUnit as EntityModelUnit);
            });
        } else if (oldUnit.freLanguageConcept() === "SomeOtherModelUnit" && oldUnit.freOwnerDescriptor().propertyName === "extraUnit") {
            AST.changeNamed("removeUnit", () => {
                this.extraUnit = newUnit as SomeOtherModelUnit;
            });
        } else {
            return false;
        }
        return true;
    }

    /**
     * Adds a model unit. Returns false if anything goes wrong.
     *
     * @param newUnit
     */
    addUnit(newUnit: FreModelUnit): boolean {
        if (!!newUnit) {
            const myMetatype = newUnit.freLanguageConcept();
            switch (myMetatype) {
                case "EntityModelUnit": {
                    AST.changeNamed("addUnit", () => {
                        this.units.push(newUnit as EntityModelUnit);
                    });
                    return true;
                }
                case "SomeOtherModelUnit": {
                    AST.changeNamed("addUnit", () => {
                        this.extraUnit = newUnit as SomeOtherModelUnit;
                    });
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Removes a model unit. Returns false if anything goes wrong.
     *
     * @param oldUnit
     */
    removeUnit(oldUnit: FreModelUnit): boolean {
        if (!!oldUnit) {
            const myMetatype = oldUnit.freLanguageConcept();
            switch (myMetatype) {
                case "EntityModelUnit": {
                    AST.changeNamed("removeUnit", () => {
                        this.units.splice(this.units.indexOf(oldUnit as EntityModelUnit), 1);
                    });
                    return true;
                }
                case "SomeOtherModelUnit": {
                    AST.changeNamed("removeUnit", () => {
                        this.extraUnit = null;
                    });
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Returns an empty model unit of type 'typeName' within 'model'.
     *
     * @param typename
     */
    newUnit(typename: string): FreModelUnit {
        switch (typename) {
            case "EntityModelUnit": {
                const unit: EntityModelUnit = EntityModelUnit.create({});
                AST.changeNamed("newUnit", () => {
                    this.units.push(unit as EntityModelUnit);
                });
                return unit;
            }
            case "SomeOtherModelUnit": {
                const unit: SomeOtherModelUnit = SomeOtherModelUnit.create({});
                AST.changeNamed("newUnit", () => {
                    this.extraUnit = unit as SomeOtherModelUnit;
                });
                return unit;
            }
        }
        return null;
    }

    /**
     * Returns a list of model units.
     */
    getUnits(): FreModelUnit[] {
        let result: FreModelUnit[] = [];
        result = result.concat(this.units);
        if (!!this.extraUnit) {
            result.push(this.extraUnit);
        }
        return result;
    }

    /**
     * Returns a list of model units of type 'type'.
     */
    getUnitsForType(type: string): FreModelUnit[] {
        switch (type) {
            case "EntityModelUnit": {
                return this.units;
            }
            case "SomeOtherModelUnit": {
                let result: FreModelUnit[] = [];
                result.push(this.extraUnit);
                return result;
            }
        }
        return [];
    }
}
