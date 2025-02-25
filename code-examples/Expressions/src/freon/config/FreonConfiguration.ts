// Generated by the Freon Language Generator.
import { FreProjection, FreCombinedActions, FreTyper, FreStdlib, FreScoper } from "@freon4dsl/core";
import { CustomExpressionsActions, CustomExpressionsProjection } from "../editor/index.js";
import { CustomExpressionsScoper } from "../scoper/index.js";
import { CustomExpressionsTyperPart } from "../typer/CustomExpressionsTyperPart.js";
import { CustomExpressionsValidator } from "../validator/index.js";
import { CustomExpressionsStdlib } from "../stdlib/CustomExpressionsStdlib.js";
import { ExpressionsCheckerInterface } from "../validator/gen/index.js";

/**
 * Class FreonConfiguration is the place where you can add all your customisations.
 * These will be used through the 'freonConfiguration' constant by any generated
 * part of your language environment.
 */
class FreonConfiguration {
    // add your custom editor projections here
    customProjection: FreProjection[] = [new CustomExpressionsProjection()];
    // add your custom editor actions here
    customActions: FreCombinedActions[] = [new CustomExpressionsActions()];
    // add your custom validations here
    customValidations: ExpressionsCheckerInterface[] = [new CustomExpressionsValidator()];
    // add your custom scopers here
    customScopers: FreScoper[] = [new CustomExpressionsScoper()];
    // add your custom type-providers here
    customTypers: FreTyper[] = [new CustomExpressionsTyperPart()];
    // add extra predefined instances here
    customStdLibs: FreStdlib[] = [new CustomExpressionsStdlib()];
}

export const freonConfiguration = new FreonConfiguration();
