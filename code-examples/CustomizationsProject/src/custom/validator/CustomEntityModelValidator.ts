// Generated by the Freon Language Generator.
import { FreError, FreErrorSeverity } from "@freon4dsl/core";
import { EntityModelDefaultWorker } from "../utils/gen/EntityModelDefaultWorker.js";
import { EntityModelCheckerInterface } from "./gen/EntityModelValidator.js";
import {EntityFunction} from "../language/gen/index.js";

export class CustomEntityModelValidator extends EntityModelDefaultWorker implements EntityModelCheckerInterface {
    errorList: FreError[] = [];

    /**
     * Example of a custom validation. Every EntityFunction with name 'determine' is considered incorrect.
     * @param modelelement
     */
    public execBeforeEntityFunction(modelelement: EntityFunction): boolean {
        if (modelelement.name == "determine") {
            this.errorList.push(
                new FreError(
                    `"determine" is a terrible name for a Function`,
                    modelelement,
                    modelelement.name,
                    FreErrorSeverity.Error
                )
            );
            return true;
        }
        return false;
    }
}
