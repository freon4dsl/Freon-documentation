// Generated by the Freon Language Generator.
import { FreError, FreErrorSeverity } from "@freon4dsl/core";
import { EntityModelDefaultWorker } from "../utils/gen/EntityModelDefaultWorker.js";
import { EntityModelCheckerInterface } from "./gen/EntityModelValidator.js";

export class CustomEntityModelValidator extends EntityModelDefaultWorker implements EntityModelCheckerInterface {
    errorList: FreError[] = [];
}
