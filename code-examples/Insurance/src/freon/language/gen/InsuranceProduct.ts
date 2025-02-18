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
    matchReferenceList,
} from "@freon4dsl/core";
import {
    EuroLiteral,
    PercentageLiteral,
    DocuExpression,
    CalcFunction,
    InsuranceTheme,
    PremiumDays,
    InsurancePart,
    BaseProduct,
} from "./internal.js";

import { makeObservable, action } from "mobx";

/**
 * Class InsuranceProduct is the implementation of the concept with the same name in the language definition file.
 * It uses mobx decorators to enable parts of the language environment, e.g. the editor, to react
 * to the changes in the state of its properties.
 */
export class InsuranceProduct extends MobxModelElementImpl implements FreNamedNode {
    /**
     * A convenience method that creates an instance of this class
     * based on the properties defined in 'data'.
     * @param data partial object
     */
    static create(data: Partial<InsuranceProduct>): InsuranceProduct {
        const result = new InsuranceProduct(data.$id);
        if (!!data.name) {
            result.name = data.name;
        }
        if (!!data.productName) {
            result.productName = data.productName;
        }
        if (!!data.advertisedPremium) {
            result.advertisedPremium = data.advertisedPremium;
        } else {
            result.advertisedPremium = EuroLiteral.create({});
        }
        if (!!data.riskAdjustment) {
            result.riskAdjustment = data.riskAdjustment;
        }
        if (!!data.calculation) {
            result.calculation = data.calculation;
        }
        if (!!data.helpers) {
            data.helpers.forEach((x) => result.helpers.push(x));
        }
        if (!!data.themes) {
            data.themes.forEach((x) => result.themes.push(x));
        }
        if (!!data.nrPremiumDays) {
            result.nrPremiumDays = data.nrPremiumDays;
        }
        if (!!data.parts) {
            data.parts.forEach((x) => result.parts.push(x));
        }
        if (!!data.basedOn) {
            data.basedOn.forEach((x) => result.basedOn.push(x));
        }
        if (!!data.parseLocation) {
            result.parseLocation = data.parseLocation;
        }
        return result;
    }

    readonly $typename: string = "InsuranceProduct"; // holds the metatype in the form of a string
    $id: string = ""; // a unique identifier
    parseLocation: FreParseLocation; // if relevant, the location of this element within the source from which it is parsed
    name: string; // implementation of name
    productName: string; // implementation of productName
    advertisedPremium: EuroLiteral; // implementation of part 'advertisedPremium'
    riskAdjustment: PercentageLiteral; // implementation of part 'riskAdjustment'
    calculation: DocuExpression; // implementation of part 'calculation'
    helpers: CalcFunction[]; // implementation of part 'helpers'
    themes: FreNodeReference<InsuranceTheme>[]; // implementation of reference 'themes'
    nrPremiumDays: FreNodeReference<PremiumDays>; // implementation of reference 'nrPremiumDays'
    parts: FreNodeReference<InsurancePart>[]; // implementation of reference 'parts'
    basedOn: FreNodeReference<BaseProduct>[]; // implementation of reference 'basedOn'

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
        observableprim(this, "productName");
        this.productName = "";

        // Both 'observablepart' and 'observablepartlist' change the get and set of the attribute
        // such that the parent-part relationship is consistently maintained,
        // and make sure the part is observable. In lists no 'null' or 'undefined' values are allowed.
        observablepart(this, "advertisedPremium");

        observablepart(this, "riskAdjustment");

        observablepart(this, "calculation");

        observablepartlist(this, "helpers");
        observablepartlist(this, "themes");
        observablepart(this, "nrPremiumDays");

        observablepartlist(this, "parts");
        observablepartlist(this, "basedOn");

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
    copy(): InsuranceProduct {
        const result = new InsuranceProduct();
        if (!!this.name) {
            result.name = this.name;
        }
        if (!!this.productName) {
            result.productName = this.productName;
        }
        if (!!this.advertisedPremium) {
            result.advertisedPremium = this.advertisedPremium.copy();
        }
        if (!!this.riskAdjustment) {
            result.riskAdjustment = this.riskAdjustment.copy();
        }
        if (!!this.calculation) {
            result.calculation = this.calculation.copy();
        }
        if (!!this.helpers) {
            this.helpers.forEach((x) => result.helpers.push(x.copy()));
        }
        if (!!this.themes) {
            this.themes.forEach((x) => result.themes.push(x.copy()));
        }
        if (!!this.nrPremiumDays) {
            result.nrPremiumDays = this.nrPremiumDays.copy();
        }
        if (!!this.parts) {
            this.parts.forEach((x) => result.parts.push(x.copy()));
        }
        if (!!this.basedOn) {
            this.basedOn.forEach((x) => result.basedOn.push(x.copy()));
        }
        return result;
    }
    /**
     * Matches a partial instance of this class to this object
     * based on the properties defined in the partial.
     * @param toBeMatched
     */
    public match(toBeMatched: Partial<InsuranceProduct>): boolean {
        let result: boolean = true;
        if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
            result = result && this.name === toBeMatched.name;
        }
        if (result && toBeMatched.productName !== null && toBeMatched.productName !== undefined && toBeMatched.productName.length > 0) {
            result = result && this.productName === toBeMatched.productName;
        }
        if (result && !!toBeMatched.advertisedPremium) {
            result = result && this.advertisedPremium.match(toBeMatched.advertisedPremium);
        }
        if (result && !!toBeMatched.riskAdjustment) {
            result = result && this.riskAdjustment.match(toBeMatched.riskAdjustment);
        }
        if (result && !!toBeMatched.calculation) {
            result = result && this.calculation.match(toBeMatched.calculation);
        }
        if (result && !!toBeMatched.helpers) {
            result = result && matchElementList(this.helpers, toBeMatched.helpers);
        }
        if (result && !!toBeMatched.themes) {
            result = result && matchReferenceList(this.themes, toBeMatched.themes);
        }
        if (result && !!toBeMatched.nrPremiumDays) {
            result = result && this.nrPremiumDays.match(toBeMatched.nrPremiumDays);
        }
        if (result && !!toBeMatched.parts) {
            result = result && matchReferenceList(this.parts, toBeMatched.parts);
        }
        if (result && !!toBeMatched.basedOn) {
            result = result && matchReferenceList(this.basedOn, toBeMatched.basedOn);
        }
        return result;
    }

    /**
     * Convenience method for reference 'themes'.
     * Instead of returning a list of 'FreNodeReference<InsuranceTheme>' objects, it
     * returns a list of referred 'InsuranceTheme' objects, if the references can be resolved.
     *
     * Note that when some references cannot be resolved, the length of this list is
     * different to the length of 'themes'.
     */
    get $themes(): readonly InsuranceTheme[] {
        const result: InsuranceTheme[] = [];
        for (const $part of this.themes) {
            if (!!$part.referred) {
                result.push($part.referred);
            }
        }
        return result;
    }

    /**
     * Convenience method for reference 'nrPremiumDays'.
     * Instead of returning a 'FreNodeReference<PremiumDays>' object,
     * it returns the referred 'PremiumDays' object, if it can be found.
     */
    get $nrPremiumDays(): PremiumDays {
        if (!!this.nrPremiumDays) {
            return this.nrPremiumDays.referred;
        }
        return null;
    }
    /**
     * Convenience method for reference 'parts'.
     * Instead of returning a list of 'FreNodeReference<InsurancePart>' objects, it
     * returns a list of referred 'InsurancePart' objects, if the references can be resolved.
     *
     * Note that when some references cannot be resolved, the length of this list is
     * different to the length of 'parts'.
     */
    get $parts(): readonly InsurancePart[] {
        const result: InsurancePart[] = [];
        for (const $part of this.parts) {
            if (!!$part.referred) {
                result.push($part.referred);
            }
        }
        return result;
    }

    /**
     * Convenience method for reference 'basedOn'.
     * Instead of returning a list of 'FreNodeReference<BaseProduct>' objects, it
     * returns a list of referred 'BaseProduct' objects, if the references can be resolved.
     *
     * Note that when some references cannot be resolved, the length of this list is
     * different to the length of 'basedOn'.
     */
    get $basedOn(): readonly BaseProduct[] {
        const result: BaseProduct[] = [];
        for (const $part of this.basedOn) {
            if (!!$part.referred) {
                result.push($part.referred);
            }
        }
        return result;
    }
}
