import { FreValidator, FreError, FreNode } from '@freon4dsl/core';
import { EntityModelWorker } from '../../utils/gen';
export interface EntityModelCheckerInterface extends EntityModelWorker {
	errorList: FreError[];
}
export declare class EntityModelValidator implements FreValidator {
	validate(modelelement: FreNode, includeChildren?: boolean): FreError[];
}
//# sourceMappingURL=EntityModelValidator.d.ts.map
