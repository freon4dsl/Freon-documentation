// Generated by the Freon Language Generator.
import { FreError, FreErrorSeverity } from "@freon4dsl/core";
import { ExpressionsDefaultWorker } from "../utils/gen/ExpressionsDefaultWorker.js";
import { ExpressionsCheckerInterface } from "./gen/ExpressionsValidator.js";

export class CustomExpressionsValidator extends ExpressionsDefaultWorker implements ExpressionsCheckerInterface {
    errorList: FreError[] = [];
}
