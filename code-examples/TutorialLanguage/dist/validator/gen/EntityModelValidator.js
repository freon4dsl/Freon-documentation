import { EntityModelNonOptionalsChecker } from './EntityModelNonOptionalsChecker';
import { EntityModelValidationRulesChecker } from './EntityModelValidationRulesChecker';
import { EntityModelReferenceChecker } from './EntityModelReferenceChecker';
import { EntityModelWalker } from '../../utils/gen';
import { freonConfiguration } from '../../config/FreonConfiguration';
export class EntityModelValidator {
	validate(modelelement, includeChildren = true) {
		const errorlist = [];
		const myWalker = new EntityModelWalker();
		let myChecker = new EntityModelNonOptionalsChecker();
		myChecker.errorList = errorlist;
		myWalker.myWorkers.push(myChecker);
		myChecker = new EntityModelReferenceChecker();
		myChecker.errorList = errorlist;
		myWalker.myWorkers.push(myChecker);
		myChecker = new EntityModelValidationRulesChecker();
		myChecker.errorList = errorlist;
		myWalker.myWorkers.push(myChecker);
		for (let checker of freonConfiguration.customValidations) {
			checker.errorList = errorlist;
			myWalker.myWorkers.push(checker);
		}
		myWalker.walk(modelelement, () => {
			return includeChildren;
		});
		return errorlist;
	}
}
//# sourceMappingURL=EntityModelValidator.js.map
