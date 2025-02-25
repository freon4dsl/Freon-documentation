// Generated by the Freon Language Generator.
import { MobxModelElementImpl, observableprim, FreNamedNode, FreParseLocation, FreUtils } from "@freon4dsl/core";

import { runInAction, makeObservable, action } from "mobx";
/**
 * Class PremiumDays is the implementation of the limited concept with the same name in the language definition file.
 * It uses mobx decorators to enable parts of the language environment, e.g. the editor, to react
 * to any changes in the state of its properties.
 */
export class PremiumDays extends MobxModelElementImpl implements FreNamedNode {
    /**
     * A convenience method that creates an instance of this class
     * based on the properties defined in 'data'.
     * @param data partial object
     */
    static create(data: Partial<PremiumDays>): PremiumDays {
        const result = new PremiumDays(data.$id);
        if (!!data.name) {
            result.name = data.name;
        }
        if (!!data.nrOfDays) {
            result.nrOfDays = data.nrOfDays;
        }
        if (!!data.parseLocation) {
            result.parseLocation = data.parseLocation;
        }
        return result;
    }

    static Week: PremiumDays; // implementation of instance Week
    static Month: PremiumDays; // implementation of instance Month
    static Quarter: PremiumDays; // implementation of instance Quarter
    static Semester: PremiumDays; // implementation of instance Semester
    static Year: PremiumDays; // implementation of instance Year
    static $freANY: PremiumDays; // default predefined instance

    readonly $typename: string = "PremiumDays"; // holds the metatype in the form of a string
    $id: string = ""; // a unique identifier
    parseLocation: FreParseLocation; // if relevant, the location of this element within the source from which it is parsed
    name: string; // implementation of name
    nrOfDays: number; // implementation of nrOfDays

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
        observableprim(this, "nrOfDays");
        this.nrOfDays = 0;

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
    copy(): PremiumDays {
        const result = new PremiumDays();
        if (!!this.name) {
            result.name = this.name;
        }
        if (!!this.nrOfDays) {
            result.nrOfDays = this.nrOfDays;
        }
        return result;
    }
    /**
     * Matches a partial instance of this class to this object
     * based on the properties defined in the partial.
     * @param toBeMatched
     */
    public match(toBeMatched: Partial<PremiumDays>): boolean {
        let result: boolean = true;
        if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
            result = result && this.name === toBeMatched.name;
        }
        if (result && toBeMatched.nrOfDays !== null && toBeMatched.nrOfDays !== undefined) {
            result = result && this.nrOfDays === toBeMatched.nrOfDays;
        }
        return result;
    }
}

// Because of mobx we need to generate the initialisations outside of the class,
// otherwise the state of properties with primitive type will not be kept correctly.
runInAction(() => {
    PremiumDays.Week = PremiumDays.create({
        name: "Week",
        nrOfDays: 7,
    });
    PremiumDays.Month = PremiumDays.create({
        name: "Month",
        nrOfDays: 30,
    });
    PremiumDays.Quarter = PremiumDays.create({
        nrOfDays: 91,
        name: "Quarter",
    });
    PremiumDays.Semester = PremiumDays.create({
        nrOfDays: 182,
        name: "Semester",
    });
    PremiumDays.Year = PremiumDays.create({
        nrOfDays: 365,
        name: "Year",
    });
});
