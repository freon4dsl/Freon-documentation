// Generated by the Freon Language Generator.
import { FreNamedNode, FreStdlib, FreLanguage } from "@freon4dsl/core";
import {
    GenericKind,
    InsurancePartType,
    PercentageType,
    NumberType,
    BooleanType,
    EuroType,
    InsuranceTheme,
    PremiumDays,
} from "../../language/gen/index.js";
import { freonConfiguration } from "../../config/FreonConfiguration.js";
import { ListUtil } from "../../utils/gen/ListUtil.js";

/**
 * Class InsuranceModelStdlib provides an entry point for all predefined elements in language InsuranceModel.
 * It holds all instances of limited concepts as defined in the language definition file.
 *
 * This class uses the singleton pattern to ensure that only one instance of the class is present.
 */
export class InsuranceModelStdlib implements FreStdlib {
    private static stdlib: FreStdlib; // the only instance of this class

    /**
     * This method implements the singleton pattern
     */
    public static getInstance(): FreStdlib {
        if (this.stdlib === undefined || this.stdlib === null) {
            this.stdlib = new InsuranceModelStdlib();
        }
        return this.stdlib;
    }

    public elements: FreNamedNode[] = []; // the predefined elements of language InsuranceModel

    /**
     * A private constructor, as demanded by the singleton pattern,
     * in which the list of predefined elements is filled.
     */
    private constructor() {
        this.elements.push(GenericKind.Set);
        this.elements.push(GenericKind.Sequence);
        this.elements.push(GenericKind.Bag);
        this.elements.push(GenericKind.Collection);
        this.elements.push(InsurancePartType.InsurancePart);
        this.elements.push(PercentageType.Percentage);
        this.elements.push(NumberType.Number);
        this.elements.push(BooleanType.Boolean);
        this.elements.push(EuroType.EUR);
        this.elements.push(InsuranceTheme.HomeTheme);
        this.elements.push(InsuranceTheme.HealthTheme);
        this.elements.push(InsuranceTheme.LegalTheme);
        this.elements.push(PremiumDays.Week);
        this.elements.push(PremiumDays.Month);
        this.elements.push(PremiumDays.Quarter);
        this.elements.push(PremiumDays.Semester);
        this.elements.push(PremiumDays.Year);
        for (const lib of freonConfiguration.customStdLibs) {
            ListUtil.addAllIfNotPresent<FreNamedNode>(this.elements, lib.elements);
        }
    }

    /**
     * Returns the element named 'name', if it can be found in this library.
     * If the element can not be found, 'null' is returned.
     * When 'metatype' is provided, the element is only returned when it is
     * an instance of this metatype.
     * @param name
     * @param metatype
     */
    public find(name: string, metatype?: string): FreNamedNode {
        if (!!name) {
            const possibles = this.elements.filter((elem) => elem.name === name);
            if (possibles.length !== 0) {
                if (metatype) {
                    for (const elem of possibles) {
                        if (FreLanguage.getInstance().metaConformsToType(elem, metatype)) {
                            return elem;
                        }
                    }
                } else {
                    return possibles[0];
                }
            }
        }
        return null;
    }
}
