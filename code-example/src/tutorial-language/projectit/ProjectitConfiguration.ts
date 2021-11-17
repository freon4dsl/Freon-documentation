// Generated by the ProjectIt Language Generator.
import { PiProjection, PiActions, PiTyperPart } from "@projectit/core";
import { CustomEntityActions, CustomEntityProjection } from "../editor";
import { CustomEntityTyperPart } from "../typer";
import { CustomEntityValidator } from "../validator";
import { EntityCheckerInterface } from "../validator/gen";

/**
 * Class ProjectitConfiguration is the place where you can add all your customisations.
 * These will be used through the 'projectitConfiguration' constant by any generated
 * part of your language environment.
 */
class ProjectitConfiguration {
    // add your custom editor projections here
    customProjection: PiProjection[] = [new CustomEntityProjection("manual")];
    // add your custom editor actions here
    customActions: PiActions[] = [new CustomEntityActions()];
    // add your custom validations here
    customValidations: EntityCheckerInterface[] = [new CustomEntityValidator()];
    // add your custom type-providers here
    customTypers: PiTyperPart[] = [new CustomEntityTyperPart()];
}

export const projectitConfiguration = new ProjectitConfiguration();
